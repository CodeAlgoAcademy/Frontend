import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { classId } = req.query;
  
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');

    const getStudents = async (id: string) => {
      try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/academics/class/${id}/student`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data?.students || [];
      } catch (error) {
        console.error('Error fetching students:', error);
        throw new Error('Failed to fetch students from API');
      }
    };

    // Fetch real students data
    const students = await getStudents(classId as string);
    console.log('Fetched students:', students);

    if (!students || students.length === 0) {
      return res.status(404).json({ error: 'No students found for this class' });
    }

    // Get class info (you might need to adjust this based on your API)
    const getClassInfo = async (id: string) => {
      try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/academics/class/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const classData = await response.json();
          return {
            className: classData.className || 'Class',
            teacherName: classData.teacherName || 'Teacher'
          };
        }
        
        return {
          className: 'Class',
          teacherName: 'Teacher'
        };
      } catch (error) {
        return {
          className: 'Class',
          teacherName: 'Teacher'
        };
      }
    };

    const classInfo = await getClassInfo(classId as string);

    // Generate PDF
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    // Page 1: Master List
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('Codealgo Student List', 20, 30);

    // Instructions
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text('These are your students\' unique usernames and passwords to sign in to their account', 20, 45);
    doc.text('via the app or at your learning platform. These should be kept confidential', 20, 55);
    doc.text('to prevent any unauthorized access.', 20, 65);

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

    // Student rows - using REAL students data (not mockStudents)
    let yPosition = 110;
    students.forEach((student: any, index: number) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250);
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.rect(20, yPosition - 5, 170, 10, 'F');

      doc.setTextColor(40, 40, 40);
      doc.text(`${student.firstName} ${student.lastName}`, 25, yPosition);
      doc.text(student.username, 90, yPosition);
      doc.text(student.password || "password123", 140, yPosition);

      yPosition += 10;
    });

    // Individual Student Cards with QR Codes - using REAL students data
    students.forEach((student: any, index: number) => {
      doc.addPage();
      
      doc.setFontSize(18);
      doc.setTextColor(40, 40, 40);
      doc.text(`${student.firstName} ${student.lastName}`, 20, 30);

      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      doc.text('Username', 20, 50);
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(student.username, 20, 60);

      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      doc.text('Password', 20, 80);
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(student.password || "password123", 20, 90);

      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text('Log in at your learning platform', 20, 110);

      // QR Code placeholder
      doc.setDrawColor(200, 200, 200);
      doc.rect(120, 40, 60, 60);
      doc.setTextColor(150, 150, 150);
      doc.text('QR Code', 140, 75);
    });

    const pdfBuffer = doc.output('arraybuffer');
    
    // Set headers for PDF response - using REAL classInfo
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${classInfo.className}-student-logins.pdf"`);
    res.setHeader('Cache-Control', 'no-cache');
    
    res.send(Buffer.from(pdfBuffer));
    
  } catch (error: any) {
    console.error('PDF generation error:', error);
    res.status(500).json({ 
      error: `Failed to generate PDF: ${error.message}`,
      details: 'Check the server logs for more information'
    });
  }
}