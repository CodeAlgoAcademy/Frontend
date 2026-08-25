import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import zlib from 'zlib';

// prod-api sits behind a proxy that gzip/brotli-encodes responses. axios in
// Node does not auto-decompress, so without this the body arrives as raw
// compressed bytes and `response.data` is never valid JSON.
function decompress(data: any, headers: any): Buffer | string {
  if (data && typeof data === 'object' && !Buffer.isBuffer(data)) return data;
  const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
  const enc = headers && (headers['content-encoding'] || headers['Content-Encoding']);
  try {
    if (enc === 'gzip' || enc === 'x-gzip') return zlib.gunzipSync(buf as unknown as Uint8Array);
    if (enc === 'deflate') return zlib.inflateSync(buf as unknown as Uint8Array);
    if (enc === 'br') return zlib.brotliDecompressSync(buf as unknown as Uint8Array);
  } catch {
    /* fall through to raw text */
  }
  return buf;
}

const serverHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Ask for uncompressed bodies so axios (Node) doesn't get gzip/brotli bytes.
    'Accept-Encoding': 'identity',
  },
  transformResponse: [
    (data: any, headers: any) => {
      const dec = decompress(data, headers);
      const text = Buffer.isBuffer(dec) ? dec.toString('utf8') : String(dec);
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    },
  ],
});
const BASE_URL = process.env.URL_GAME;

serverHttp.interceptors.response.use(
  (res) => res,
  (error: any) => Promise.reject(error)
);

function extractAccessToken(req: NextApiRequest): string {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  throw new Error('No valid access token found');
}

// function extractAccessToken(req: NextApiRequest): string {
//   const sources = [
//     () => req.headers.authorization?.replace('Bearer ', ''),
//     () => req.cookies?.accessToken,
//     () => req.cookies?.token,
//     () => req.query.token as string,
//   ];

//   for (const source of sources) {
//     const token = source();
//     if (token && typeof token === 'string' && token.length > 10) {
//       return token;
//     }
//   }

//   throw new Error('No valid access token found in request.');
// }

function formatStudentName(firstName: string, lastName: string, maxLength: number = 20): string {
  const fullName = `${firstName} ${lastName}`;
  return fullName.length > maxLength ? fullName.substring(0, maxLength) + '...' : fullName;
}

// A username is a credential a child has to type, so it is never shortened.
// This used to cut anything over 12 characters and append an ellipsis, which
// printed a login that cannot work onto the handout the teacher gives out.
// Long ones are set smaller instead so they still fit the column.
function usernameFontSize(username: string, base: number, maxChars: number): number {
  if (username.length <= maxChars) return base;
  return Math.max(6, Math.round((base * maxChars) / username.length));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { classId } = req.query;

  if (!classId || Array.isArray(classId)) {
    return res.status(400).json({ error: 'Valid classId is required' });
  }

  try {
    const accessToken = extractAccessToken(req);

    // Get students data
    const studentsResponse = await serverHttp.get(`/academics/class/${classId}/student`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Get QR tokens for all students
    const qrTokensResponse = await serverHttp.get(`/academics/class/${classId}/student/qr`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const studentsData = studentsResponse.data;
    const qrTokensData = qrTokensResponse.data;

    const students = studentsData?.students || [];
    const qrLogins = Array.isArray(qrTokensData)
      ? qrTokensData
      : (qrTokensData?.results || []);

    // The PDF is built from the QR endpoint (it carries qr_secret + login URL),
    // so gate on that. Fall back to the class roster if the QR endpoint returned
    // nothing, so the sheet still renders names/usernames.
    let mergedStudents = qrLogins.map((qr: any) => {
      return {
        ...qr,
        loginUrl: `${BASE_URL}?token=${qr.qr_secret}`,
        // loginUrl: `https://play.codealgoacademy.com?token=${qr.qr_secret}`,
        // Alternative:
        // loginUrl: `https://play.codealgoacademy.com/login/qrcode?token=${qr.qr_secret}`
      };
    });

    if (mergedStudents.length === 0 && students.length > 0) {
      mergedStudents = students.map((s: any) => ({
        ...s,
        qr_secret: s.qr_secret || '',
        loginUrl: s.qr_secret ? `${BASE_URL}?token=${s.qr_secret}` : '',
      }));
    }

    if (mergedStudents.length === 0) {
      return res.status(404).json({
        error: 'No students found',
        details: `students=${students.length}, qrLogins=${qrLogins.length}`,
      });
    }

    const { jsPDF } = await import('jspdf');
    const QRCode = require('qrcode');

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('Codealgo Student List', 20, 30);

    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    const instructions = [
      "These are your students' unique usernames to sign in to their Codealgo account",
      'via the app or at https://play.codealgoacademy.com/ on a computer.',
      'Students can sign in by scanning the QR code on their login card.',
      'These should be kept confidential to prevent any unauthorized access.',
    ];
    instructions.forEach((line, index) => {
      doc.text(line, 20, 45 + index * 10);
    });

    doc.setTextColor(120, 120, 120);
    doc.text(
      '**Note -** QR codes can still be used to sign in, even if student log-in info has changed.',
      20,
      80
    );

    doc.setFillColor(240, 240, 240);
    doc.rect(20, 95, 170, 10, 'F');
     doc.setTextColor(0, 0, 0);
     doc.setFontSize(11);
     doc.text('Student Name', 25, 102);
     doc.text('Username', 90, 102);

    let yPosition = 110;
    mergedStudents.forEach((student: any, index: number) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFillColor(index % 2 === 0 ? 250 : 255, 250, 250);
      doc.rect(20, yPosition - 5, 170, 10, 'F');
      doc.setTextColor(40, 40, 40);

      const firstName = student.firstName || student.first_name || 'First';
      const lastName = student.lastName || student.last_name || 'Last';
      const username = student.username || student.userName || `user${index + 1}`;

      const displayName = formatStudentName(firstName, lastName);

      doc.text(displayName, 25, yPosition);
      doc.setFontSize(usernameFontSize(username, 11, 20));
      doc.text(username, 90, yPosition);
      doc.setFontSize(11);

      yPosition += 10;
    });

    // ========== COMBINED STUDENT CARDS ==========
    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('Student Login Cards', 20, 30);

    let cardX = 20;
    let cardY = 50;
    const cardWidth = 85;
    const cardHeight = 70;
    const cardsPerRow = 2;
    let cardIndex = 0;

    for (const student of mergedStudents) {
      const firstName = student.firstName || student.first_name || 'First';
      const lastName = student.lastName || student.last_name || 'Last';
      const username = student.username || student.userName || 'user';

      if (cardY + cardHeight > 270) {
        doc.addPage();
        cardY = 20;
        cardX = 20;
        cardIndex = 0;
      }

      doc.setDrawColor(200, 200, 200);
      doc.rect(cardX, cardY, cardWidth, cardHeight);

      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      const displayName = formatStudentName(firstName, lastName, 18);
      doc.text(displayName, cardX + 5, cardY + 8);

      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      doc.text('Username:', cardX + 5, cardY + 18);
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(username, cardX + 3, cardY + 23);

      try {
        const loginData = student.loginUrl;
        const qrCodeDataUrl = await QRCode.toDataURL(loginData, {
          width: 120,
          margin: 1,
          color: { dark: '#000000', light: '#FFFFFF' },
        });
        doc.addImage(qrCodeDataUrl as string, 'PNG', cardX + 45, cardY + 15, 30, 30);
        doc.setFontSize(6);
        doc.setTextColor(100, 100, 100);
        doc.text('Scan to login', cardX + 50, cardY + 48);
      } catch {
        doc.setDrawColor(200, 200, 200);
        doc.rect(cardX + 45, cardY + 15, 30, 30);
        doc.setTextColor(150, 150, 150);
        doc.setFontSize(6);
        doc.text('QR Failed', cardX + 50, cardY + 30);
      }

      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.text('play.codealgoacademy.com', cardX + 5, cardY + 48);

      cardIndex++;
      if (cardIndex % cardsPerRow === 0) {
        cardX = 20;
        cardY += cardHeight + 10;
      } else {
        cardX += cardWidth + 10;
      }
    }

    // ========== INDIVIDUAL CARDS ==========
    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('Individual Student Login Cards', 20, 30);
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text('Cut along the dotted lines to distribute individual login cards', 20, 40);

    for (const student of mergedStudents) {
      doc.addPage();

      const firstName = student.firstName || student.first_name || 'First';
      const lastName = student.lastName || student.last_name || 'Last';
      const username = student.username || student.userName || 'user';

      doc.setDrawColor(150, 150, 150);
      doc.setLineDashPattern([2, 2], 0);
      doc.rect(15, 15, 180, 100);
      doc.setLineDashPattern([], 0);

      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      const displayName = formatStudentName(firstName, lastName, 25);
      doc.text(displayName, 20, 35);

      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      doc.text('Username', 20, 48);
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(usernameFontSize(username, 14, 26));
      doc.text(username, 20, 55);

      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text('Log in at https://play.codealgoacademy.com/', 20, 85);

      try {
        const loginData = student.loginUrl;
        const qrCodeDataUrl = await QRCode.toDataURL(loginData, {
          width: 180,
          margin: 1,
          color: { dark: '#000000', light: '#FFFFFF' },
        });
        doc.addImage(qrCodeDataUrl as string, 'PNG', 120, 25, 60, 60);
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text('Scan to login', 140, 90);
      } catch {
        doc.setDrawColor(200, 200, 200);
        doc.rect(120, 25, 60, 60);
        doc.setTextColor(150, 150, 150);
        doc.text('QR Code', 140, 55);
        doc.setFontSize(7);
        doc.text('(Generation failed)', 135, 62);
      }
    }

    const pdfBuffer = doc.output('arraybuffer');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="class-${classId}-logins.pdf"`);
    res.send(Buffer.from(pdfBuffer));
  } catch (error: any) {
    if (error.response?.status === 401) {
      return res.status(401).json({
        error: 'Authentication failed',
        details: 'The provided token is invalid or expired',
        apiMessage: error.response?.data,
      });
    }

    res.status(500).json({
      error: 'Failed to generate PDF',
      details: error.message,
      apiError: error.response?.data,
    });
  }
}
