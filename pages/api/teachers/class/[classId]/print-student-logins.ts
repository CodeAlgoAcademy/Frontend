// import { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';

// const serverHttp = axios.create({
//    baseURL: process.env.NEXT_PUBLIC_API_URL,
//    headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//    },
// });

// function extractAccessToken(req: NextApiRequest): string {
//   // Primary method: Authorization header (SECURE)
//   const authHeader = req.headers.authorization;
//   if (authHeader && authHeader.startsWith('Bearer ')) {
//     return authHeader.substring(7);
//   }
  
//   // Fallback: Cookies (also secure)
//   const cookies = req.cookies;
//   if (cookies?.accessToken) {
//     return cookies.accessToken;
//   }
  
//   if (cookies?.token) {
//     return cookies.token;
//   }
  
//   // LAST RESORT: Query parameter (remove this if possible)
//   if (req.query.token) {
//     console.warn('Using token from query parameter - not recommended for production');
//     return req.query.token as string;
//   }
  
//   throw new Error('No access token found in Authorization header or cookies.');
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { classId } = req.query;
  
//   if (!classId || Array.isArray(classId)) {
//     return res.status(400).json({ error: 'Valid classId is required' });
//   }
  
//   try {
//     const accessToken = extractAccessToken(req);
    
//     // Fetch students data
//     const response = await serverHttp.get(`/academics/class/${classId}/student`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
    
//     const studentsData = response.data;
//     const students = studentsData?.students || [];
    
//     if (students.length === 0) {
//       return res.status(404).json({ error: 'No students found for this class' });
//     }

//     // Generate PDF
//     console.log('Generating PDF...');
//     const { jsPDF } = await import('jspdf');
//     const doc = new jsPDF();

//     // Page 1: Master List
//     doc.setFontSize(20);
//     doc.setTextColor(40, 40, 40);
//     doc.text('Codealgo Student List', 20, 30);

//     // Instructions
//     doc.setFontSize(12);
//     doc.setTextColor(80, 80, 80);
//     const instructions = [
//       'These are your students\' unique usernames and passwords to sign in to their Boddle account',
//       'via the app or at play.boddlelearning.com on a computer. These should be kept confidential',
//       'to prevent any unauthorized access.'
//     ];
    
//     instructions.forEach((line, index) => {
//       doc.text(line, 20, 45 + (index * 10));
//     });

//     // Note
//     doc.setTextColor(120, 120, 120);
//     doc.text('**Note -** QR codes can still be used to sign in, even if student log-in info has changed.', 20, 80);

//     // Table headers
//     doc.setFillColor(240, 240, 240);
//     doc.rect(20, 95, 170, 10, 'F');
//     doc.setTextColor(0, 0, 0);
//     doc.setFontSize(11);
//     doc.text('Student Name', 25, 102);
//     doc.text('Username', 90, 102);
//     doc.text('Password', 140, 102);

//     // Student rows
//     let yPosition = 110;
//     students.forEach((student: any, index: number) => {
//       if (yPosition > 270) {
//         doc.addPage();
//         yPosition = 20;
//       }

//       // Alternate row colors
//       doc.setFillColor(index % 2 === 0 ? 250 : 255, 250, 250);
//       doc.rect(20, yPosition - 5, 170, 10, 'F');

//       doc.setTextColor(40, 40, 40);
      
//       // Use safe property access with fallbacks
//       const firstName = student.firstName || student.first_name || 'First';
//       const lastName = student.lastName || student.last_name || 'Last';
//       const username = student.username || student.userName || `user${index + 1}`;
//       const password = student.password || 'password';
      
//       doc.text(`${firstName} ${lastName}`, 25, yPosition);
//       doc.text(username, 90, yPosition);
//       doc.text(password, 140, yPosition);

//       yPosition += 10;
//     });

//     // Individual Student Cards with QR Codes
//     students.forEach((student: any, index: number) => {
//       doc.addPage();
      
//       const firstName = student.firstName || student.first_name || 'First';
//       const lastName = student.lastName || student.last_name || 'Last';
//       const username = student.username || student.userName || `user${index + 1}`;
//       const password = student.password || 'password';
      
//       doc.setFontSize(18);
//       doc.setTextColor(40, 40, 40);
//       doc.text(`${firstName} ${lastName}`, 20, 30);

//       doc.setFontSize(12);
//       doc.setTextColor(80, 80, 80);
//       doc.text('Username', 20, 50);
//       doc.setFontSize(14);
//       doc.setTextColor(0, 0, 0);
//       doc.text(username, 20, 60);

//       doc.setFontSize(12);
//       doc.setTextColor(80, 80, 80);
//       doc.text('Password', 20, 80);
//       doc.setFontSize(14);
//       doc.setTextColor(0, 0, 0);
//       doc.text(password, 20, 90);

//       doc.setFontSize(10);
//       doc.setTextColor(120, 120, 120);
//       doc.text('Log in at play.boddlelearning.com', 20, 110);

//       // QR Code placeholder
//       doc.setDrawColor(200, 200, 200);
//       doc.rect(120, 40, 60, 60);
//       doc.setTextColor(150, 150, 150);
//       doc.text('QR Code', 140, 75);
//     });

//     console.log('PDF generated successfully');
//      const pdfBuffer = doc.output('arraybuffer');
    
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `inline; filename="class-${classId}-student-logins.pdf"`);
//     res.setHeader('Cache-Control', 'no-cache');
    
//     res.send(Buffer.from(pdfBuffer));
    
//   } catch (error: any) {
//     console.error('PDF generation error:', error.message);
    
//     res.status(500).json({ 
//       error: 'Failed to generate PDF',
//       details: error.message,
//     });
//   }
// }


// import { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';

// // Replicate your frontend http service exactly
// const serverHttp = axios.create({
//    baseURL: process.env.NEXT_PUBLIC_API_URL,
//    headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//    },
// });

// // Add response interceptor like your frontend
// serverHttp.interceptors.response.use(
//    (res) => res,
//    (error: any) => {
//       console.error('Server HTTP error:', error.response?.data);
//       return Promise.reject(error);
//    }
// );

// function extractAccessToken(req: NextApiRequest): string {
//   // Try multiple sources
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

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { classId } = req.query;
  
//   console.log('PDF Request - Class ID:', classId);
//   console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
  
//   if (!classId || Array.isArray(classId)) {
//     return res.status(400).json({ error: 'Valid classId is required' });
//   }
  
//   try {
//     const accessToken = extractAccessToken(req);
//     console.log('Token extracted, making API call...');

//     // Test if the token works by making a simple request first
//     const testResponse = await serverHttp.get(`/academics/class/${classId}/student`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     console.log('API call successful, status:', testResponse.status);
    
//     const studentsData = testResponse.data;
//     const students = studentsData?.students || [];
    
//     if (students.length === 0) {
//       return res.status(404).json({ error: 'No students found' });
//     }

//     // Generate PDF
//     console.log('Generating PDF...');
//     const { jsPDF } = await import('jspdf');
    
//     // Use require instead of import to avoid TypeScript issues
//     const QRCode = require('qrcode');
    
//     const doc = new jsPDF();

//     // Page 1: Master List
//     doc.setFontSize(20);
//     doc.setTextColor(40, 40, 40);
//     doc.text('Codealgo Student List', 20, 30);

//     // Instructions
//     doc.setFontSize(12);
//     doc.setTextColor(80, 80, 80);
//     const instructions = [
//       'These are your students\' unique usernames and passwords to sign in to their Boddle account',
//       'via the app or at play.boddlelearning.com on a computer. These should be kept confidential',
//       'to prevent any unauthorized access.'
//     ];
    
//     instructions.forEach((line, index) => {
//       doc.text(line, 20, 45 + (index * 10));
//     });

//     // Note
//     doc.setTextColor(120, 120, 120);
//     doc.text('**Note -** QR codes can still be used to sign in, even if student log-in info has changed.', 20, 80);

//     // Table headers
//     doc.setFillColor(240, 240, 240);
//     doc.rect(20, 95, 170, 10, 'F');
//     doc.setTextColor(0, 0, 0);
//     doc.setFontSize(11);
//     doc.text('Student Name', 25, 102);
//     doc.text('Username', 90, 102);
//     doc.text('Password', 140, 102);

//     // Student rows
//     let yPosition = 110;
//     students.forEach((student: any, index: number) => {
//       if (yPosition > 270) {
//         doc.addPage();
//         yPosition = 20;
//       }

//       // Alternate row colors
//       doc.setFillColor(index % 2 === 0 ? 250 : 255, 250, 250);
//       doc.rect(20, yPosition - 5, 170, 10, 'F');

//       doc.setTextColor(40, 40, 40);
      
//       // Use safe property access with fallbacks
//       const firstName = student.firstName || student.first_name || 'First';
//       const lastName = student.lastName || student.last_name || 'Last';
//       const username = student.username || student.userName || `user${index + 1}`;
//       const password = student.password || 'password';
      
//       doc.text(`${firstName} ${lastName}`, 25, yPosition);
//       doc.text(username, 90, yPosition);
//       doc.text(password, 140, yPosition);

//       yPosition += 10;
//     });

//     // Individual Student Cards with QR Codes
//     for (const student of students) {
//       doc.addPage();
//       const username = student.username || student.userName || 'user';
//       const password = student.password || 'password';

//       // Username
//       doc.setFontSize(12);
//       doc.setTextColor(80, 80, 80);
//       doc.text('Username', 20, 50);
//       doc.setFontSize(14);
//       doc.setTextColor(0, 0, 0);
//       doc.text(username, 20, 60);

//       // Password
//       doc.setFontSize(12);
//       doc.setTextColor(80, 80, 80);
//       doc.text('Password', 20, 80);
//       doc.setFontSize(14);
//       doc.setTextColor(0, 0, 0);
//       doc.text(password, 20, 90);

//       // Login instruction
//       doc.setFontSize(10);
//       doc.setTextColor(120, 120, 120);
//       doc.text('Log in at https://play.codealgoacademy.com/', 20, 110);

//       // Generate QR Code
//       try {
//         // Create login data for QR code - using simple text format
//         const loginData = `username:${username},password:${password},url:https://play.codealgoacademy.com/`;

//         // Generate QR code as data URL with correct options
//         const qrCodeDataUrl = await QRCode.toDataURL(loginData, {
//           width: 180, // Higher resolution for better quality
//           margin: 1,
//           color: {
//             dark: '#000000',
//             light: '#FFFFFF'
//           }
//         });

//         // Add QR code to PDF - the data URL should be a string
//         doc.addImage(qrCodeDataUrl as string, 'PNG', 120, 40, 60, 60);
        
//         // Add label below QR code
//         doc.setFontSize(9);
//         doc.setTextColor(100, 100, 100);
//         doc.text('Scan to login', 140, 105);
        
//       } catch (qrError) {
//         console.error('Error generating QR code:', qrError);
//         // Fallback: Draw placeholder if QR generation fails
//         doc.setDrawColor(200, 200, 200);
//         doc.rect(120, 40, 60, 60);
//         doc.setTextColor(150, 150, 150);
//         doc.text('QR Code', 140, 75);
//         doc.setFontSize(7);
//         doc.text('(Generation failed)', 135, 82);
//       }
//     }

//     console.log('PDF generated successfully');
//     const pdfBuffer = doc.output('arraybuffer');
    
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `inline; filename="class-${classId}-logins.pdf"`);
//     res.send(Buffer.from(pdfBuffer));
    
//   } catch (error: any) {
//     console.error('Full error details:', {
//       message: error.message,
//       status: error.response?.status,
//       data: error.response?.data,
//       url: error.config?.url,
//       headers: error.config?.headers
//     });

//     // Provide more specific error messages
//     if (error.response?.status === 401) {
//       return res.status(401).json({ 
//         error: 'Authentication failed',
//         details: 'The provided token is invalid or expired',
//         apiMessage: error.response?.data
//       });
//     }

//     res.status(500).json({ 
//       error: 'Failed to generate PDF',
//       details: error.message,
//       apiError: error.response?.data
//     });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Replicate your frontend http service exactly
const serverHttp = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
   },
});

// Add response interceptor like your frontend
serverHttp.interceptors.response.use(
   (res) => res,
   (error: any) => {
      console.error('Server HTTP error:', error.response?.data);
      return Promise.reject(error);
   }
);

function extractAccessToken(req: NextApiRequest): string {
  // Try multiple sources
  const sources = [
    () => req.headers.authorization?.replace('Bearer ', ''),
    () => req.cookies?.accessToken,
    () => req.cookies?.token,
    () => req.query.token as string,
  ];

  for (const source of sources) {
    const token = source();
    if (token && typeof token === 'string' && token.length > 10) {
      console.log('Token found from source');
      return token;
    }
  }

  throw new Error('No valid access token found in request.');
}

// Centralized function for name formatting
function formatStudentName(firstName: string, lastName: string, maxLength: number = 20): string {
  const fullName = `${firstName} ${lastName}`;
  return fullName.length > maxLength ? fullName.substring(0, maxLength) + '...' : fullName;
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

    // Test if the token works by making a simple request first
    const testResponse = await serverHttp.get(`/academics/class/${classId}/student`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('API call successful, status:', testResponse.status);
    
    const studentsData = testResponse.data;
    const students = studentsData?.students || [];
    
    if (students.length === 0) {
      return res.status(404).json({ error: 'No students found' });
    }

    // Generate PDF
    console.log('Generating PDF...');
    const { jsPDF } = await import('jspdf');
    
    // Use require instead of import to avoid TypeScript issues
    const QRCode = require('qrcode');
    
    const doc = new jsPDF();

    // Page 1: Master List
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('Codealgo Student List', 20, 30);

    // Instructions
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    const instructions = [
      'These are your students\' unique usernames and passwords to sign in to their Codealgo account',
      'via the app or at https://play.codealgoacademy.com/ on a computer. These should be kept confidential',
      'to prevent any unauthorized access.'
    ];
    
    instructions.forEach((line, index) => {
      doc.text(line, 20, 45 + (index * 10));
    });

    // Note
    doc.setTextColor(120, 120, 120);
    doc.text('**Note -** QR codes can still be used to sign in, even if student log-in info has changed.', 20, 80);

    // Table headers
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 95, 170, 10, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text('Student Name', 25, 102);
    doc.text('Username', 90, 102);
    doc.text('Password', 140, 102);

    // Student rows
    let yPosition = 110;
    students.forEach((student: any, index: number) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      // Alternate row colors
      doc.setFillColor(index % 2 === 0 ? 250 : 255, 250, 250);
      doc.rect(20, yPosition - 5, 170, 10, 'F');

      doc.setTextColor(40, 40, 40);
      
      // Use safe property access with fallbacks
      const firstName = student.firstName || student.first_name || 'First';
      const lastName = student.lastName || student.last_name || 'Last';
      const username = student.username || student.userName || `user${index + 1}`;
      const password = student.password || 'password';
      
      // Use centralized name formatting for table
      const displayName = formatStudentName(firstName, lastName);
      doc.text(displayName, 25, yPosition);
      doc.text(username, 90, yPosition);
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

    for (const student of students) {
      const firstName = student.firstName || student.first_name || 'First';
      const lastName = student.lastName || student.last_name || 'Last';
      const username = student.username || student.userName || 'user';
      const password = student.password || 'password';

      // Check if we need a new page
      if (cardY + cardHeight > 270) {
        doc.addPage();
        cardY = 20;
        cardX = 20;
        cardIndex = 0;
      }

      // Draw card border
      doc.setDrawColor(200, 200, 200);
      doc.rect(cardX, cardY, cardWidth, cardHeight);

      // Student name - use centralized formatting
      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      const displayName = formatStudentName(firstName, lastName, 18);
      doc.text(displayName, cardX + 5, cardY + 8);

      // Username - tighter spacing
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      doc.text('Username:', cardX + 5, cardY + 18);
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(username, cardX + 3, cardY + 23); // Reduced spacing

doc.setDrawColor(180, 180, 180);
doc.setLineWidth(0.5); // Thicker line
doc.setLineDashPattern([3, 2], 0); // 3px dash, 2px gap
doc.line(cardX + 5, cardY + 26, cardX + 40, cardY + 26); // Horizontal dashed line
doc.setLineWidth(0.1); // Reset to default line width
doc.setLineDashPattern([], 0);

      // Password - tighter spacing
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      doc.text('Password:', cardX + 5, cardY + 29); // Reduced spacing
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(password, cardX + 5, cardY + 33); // Reduced spacing

      // Generate and add QR code
      try {
        const loginData = `username:${username},password:${password},url:https://play.codealgoacademy.com/`;
        const qrCodeDataUrl = await QRCode.toDataURL(loginData, {
          width: 120,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });

        // Add QR code to the right side of the card
        doc.addImage(qrCodeDataUrl as string, 'PNG', cardX + 45, cardY + 15, 30, 30);
        
        // QR code label
        doc.setFontSize(6);
        doc.setTextColor(100, 100, 100);
        doc.text('Scan to login', cardX + 50, cardY + 48);
        
      } catch (qrError) {
        console.error('Error generating QR code:', qrError);
        // QR code placeholder
        doc.setDrawColor(200, 200, 200);
        doc.rect(cardX + 45, cardY + 15, 30, 30);
        doc.setTextColor(150, 150, 150);
        doc.setFontSize(6);
        doc.text('QR Code', cardX + 52, cardY + 30);
      }

      // Login URL
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.text('play.codealgoacademy.com', cardX + 5, cardY + 48); // Moved up

      // Move to next card position
      cardIndex++;
      if (cardIndex % cardsPerRow === 0) {
        cardX = 20;
        cardY += cardHeight + 10;
      } else {
        cardX += cardWidth + 10;
      }
    }

    // ========== INDIVIDUAL STUDENT CARDS SECTION ==========
    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('Individual Student Login Cards', 20, 30);
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text('Cut along the dotted lines to distribute individual login cards', 20, 40);

    for (const student of students) {
      doc.addPage();
      
      const firstName = student.firstName || student.first_name || 'First';
      const lastName = student.lastName || student.last_name || 'Last';
      const username = student.username || student.userName || 'user';
      const password = student.password || 'password';

      // Draw cut line around the card
      doc.setDrawColor(150, 150, 150);
      doc.setLineDashPattern([2, 2], 0);
      doc.rect(15, 15, 180, 100);
      doc.setLineDashPattern([], 0);

      // Student name - use centralized formatting
      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      const displayName = formatStudentName(firstName, lastName, 25);
      doc.text(displayName, 20, 35);

      // Username - tighter spacing
      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      doc.text('Username', 20, 48); // Reduced from 50
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(username, 20, 55); // Reduced from 60

      // Password - tighter spacing
      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      doc.text('Password', 20, 65); // Reduced from 75
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(password, 20, 72); // Reduced from 85

      // Login instruction - tighter spacing
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text('Log in at https://play.codealgoacademy.com/', 20, 85); // Reduced from 100

      // Generate QR Code
      try {
        const loginData = `username:${username},password:${password},url:https://play.codealgoacademy.com/`;
        const qrCodeDataUrl = await QRCode.toDataURL(loginData, {
          width: 180,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });

        // Add QR code to PDF
        doc.addImage(qrCodeDataUrl as string, 'PNG', 120, 25, 60, 60);
        
        // Add label below QR code
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text('Scan to login', 140, 90);
        
      } catch (qrError) {
        console.error('Error generating QR code:', qrError);
        // Fallback: Draw placeholder if QR generation fails
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

    // Provide more specific error messages
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