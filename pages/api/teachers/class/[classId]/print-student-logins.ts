import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const serverHttp = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
   },
});

serverHttp.interceptors.response.use(
   (res) => res,
   (error: any) => {
      console.error('Server HTTP error:', error.response?.data);
      return Promise.reject(error);
   }
);

function extractAccessToken(req: NextApiRequest): string {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Fallback to cookies if needed
  const token = req.cookies?.accessToken || req.cookies?.token;
  if (token) return token;
  
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
//       console.log('Token found from source');
//       return token;
//     }
//   }

//   throw new Error('No valid access token found in request.');
// }

function formatStudentName(firstName: string, lastName: string, maxLength: number = 20): string {
  const fullName = `${firstName} ${lastName}`;
  return fullName.length > maxLength ? fullName.substring(0, maxLength) + '...' : fullName;
}

function formatUsername(username: string, maxLength: number = 15): string {
  return username.length > maxLength ? username.substring(0, maxLength) + '...' : username;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { classId } = req.query;
  
  console.log('PDF Request - Class ID:', classId);
  console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
  
  if (!classId || Array.isArray(classId)) {
    return res.status(400).json({ error: 'Valid classId is required' });
  }
  
  try {
    const accessToken = extractAccessToken(req);
    console.log('Token extracted, making API call...');
    
    // Get students data
    const studentsResponse = await serverHttp.get(`/academics/class/${classId}/student`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // Get QR tokens for all students
    const qrTokensResponse = await serverHttp.post(`/academics/class/${classId}/qr-token/`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('API calls successful');
    const studentsData = studentsResponse.data;
    const qrTokensData = qrTokensResponse.data;
    
    const students = studentsData?.students || [];
    const qrLogins = qrTokensData || [];
    
    if (students.length === 0) {
      return res.status(404).json({ error: 'No students found' });
    }
students.forEach((student: { id: any; firstName: any; lastName: any; }, index: any) => {
  console.log(`Student ${index}: ID=${student.id}, Name=${student.firstName} ${student.lastName}`);
});

qrLogins.forEach((qr: { studentId: any; loginUrl: any; }, index: any) => {
  console.log(`QR Login ${index}: StudentID=${qr.studentId}, LoginURL=${qr.loginUrl ? 'EXISTS' : 'MISSING'}`);
});

const mergedStudents = students.map((student: any) => {
  const qrLogin = qrLogins.find((qr: any) => qr.studentId === student.id);
  return {
    ...student,
    loginUrl: qrLogin?.loginUrl || ''
  };
});
    const { jsPDF } = await import('jspdf');
    const QRCode = require('qrcode');
    
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('Codealgo Student List', 20, 30);

    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    const instructions = [
      'These are your students\' unique usernames and passwords to sign in to their Codealgo account',
      'via the app or at https://play.codealgoacademy.com/ on a computer.',
      'These should be kept confidential to prevent any unauthorized access.'
    ];
    
    instructions.forEach((line, index) => {
      doc.text(line, 20, 45 + (index * 10));
    });
 
    doc.setTextColor(120, 120, 120);
    doc.text('**Note -** QR codes can still be used to sign in, even if student log-in info has changed.', 20, 80);

    doc.setFillColor(240, 240, 240);
    doc.rect(20, 95, 170, 10, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text('Student Name', 25, 102);
    doc.text('Username', 90, 102);
    doc.text('Password', 140, 102);

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
      const password = student.password || 'password';
      
      const displayName = formatStudentName(firstName, lastName);
      const formattedUsername = formatUsername(username, 12);
      doc.text(displayName, 25, yPosition);
      doc.text(formattedUsername, 90, yPosition);
      doc.text(password, 140, yPosition);

      yPosition += 10;
    });

    // ========== COMBINED STUDENT CARDS SECTION ==========
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
      const password = student.password || 'password';

      if (cardY + cardHeight > 270) {
        doc.addPage();
        cardY = 20;
        cardX = 20;
        cardIndex = 0;
      }

      // Draw card border
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

      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      doc.text('Password:', cardX + 5, cardY + 29);
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(password, cardX + 5, cardY + 33);

      // Generate and add QR code
try {
  let loginData = student.loginUrl;
  const qrCodeDataUrl = await QRCode.toDataURL(loginData, {
    width: 120,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  });

  console.log('QR code generated successfully!');
  doc.addImage(qrCodeDataUrl as string, 'PNG', cardX + 45, cardY + 15, 30, 30);
  
  doc.setFontSize(6);
  doc.setTextColor(100, 100, 100);
  doc.text('Scan to login', cardX + 50, cardY + 48);
  
} catch (qrError) {
  console.error('QR code generation failed:', qrError);
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

    // ========== INDIVIDUAL STUDENT CARDS SECTION ==========
    // FIXED: Also update this section if you have it
    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('Individual Student Login Cards', 20, 30);
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text('Cut along the dotted lines to distribute individual login cards', 20, 40);

    // FIXED: Use mergedStudents instead of students
    for (const student of mergedStudents) {
      doc.addPage();
      
      const firstName = student.firstName || student.first_name || 'First';
      const lastName = student.lastName || student.last_name || 'Last';
      const username = student.username || student.userName || 'user';
      const password = student.password || 'password';

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
      const formattedUsername = formatUsername(username, 20);
      doc.text(formattedUsername, 20, 55);

      // Password
      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      doc.text('Password', 20, 65);
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(password, 20, 72);

      // Login instruction
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text('Log in at https://play.codealgoacademy.com/', 20, 85);

      // Generate QR Code
      try {
        // FIXED: Use loginUrl from mergedStudents
        const loginData = student.loginUrl;
        const qrCodeDataUrl = await QRCode.toDataURL(loginData, {
          width: 180,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });

        doc.addImage(qrCodeDataUrl as string, 'PNG', 120, 25, 60, 60);

        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text('Scan to login', 140, 90);
        
      } catch (qrError) {
        console.error('Error generating QR code:', qrError);
        doc.setDrawColor(200, 200, 200);
        doc.rect(120, 25, 60, 60);
        doc.setTextColor(150, 150, 150);
        doc.text('QR Code', 140, 55);
        doc.setFontSize(7);
        doc.text('(Generation failed)', 135, 62);
      }
    }

    console.log('PDF generated successfully');
    const pdfBuffer = doc.output('arraybuffer');
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="class-${classId}-logins.pdf"`);
    res.send(Buffer.from(pdfBuffer));
    
  } catch (error: any) {
    console.error('Full error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      headers: error.config?.headers
    });

    if (error.response?.status === 401) {
      return res.status(401).json({ 
        error: 'Authentication failed',
        details: 'The provided token is invalid or expired',
        apiMessage: error.response?.data
      });
    }

    res.status(500).json({ 
      error: 'Failed to generate PDF',
      details: error.message,
      apiError: error.response?.data
    });
  }
}