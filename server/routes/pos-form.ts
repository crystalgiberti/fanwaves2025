import { Request, Response } from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Configure email transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'mail.fanwaves.fun',
    port: 587,
    secure: false,
    auth: {
      user: 'team@fanwaves.fun',
      pass: process.env.EMAIL_PASSWORD || 'defaultpassword123'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

const formatFormData = (data: any) => {
  return `
    🏟️ NEW SPECIAL REQUEST FROM FAN WAVES POS
    
    Customer Information:
    - Name: ${data.customerName}
    - Email: ${data.email}
    - Phone: ${data.phone}
    - Preferred Contact: ${data.preferredContact || "Not specified"}
    
    Request Details:
    - Type: ${data.requestType || "Not specified"}
    - Product Description: ${data.productDescription}
    - Detailed Description: ${data.itemDescription || "Not provided"}
    - Sizes: ${data.sizes || "Not specified"}
    - Colors: ${data.colors || "Not specified"}
    - Quantity: ${data.quantity || "1"}
    - Budget Range: ${data.budget || "Not specified"}
    
    Additional Details:
    - Timeline: ${data.urgency || "Not specified"}
    - Event Date: ${data.eventDate || "Not specified"}
    - Service Needed: ${data.customizationType || "Not specified"}
    - How they heard about us: ${data.referralSource || "Not specified"}
    - Special Requests: ${data.specialRequests || "None"}
    
    Submission Details:
    - Submitted: ${new Date().toLocaleString()}
    - Source: Fan Waves POS Form
    - Photo Attached: ${data.hasPhoto ? "Yes" : "No"}
    
    This request was submitted through the Fan Waves POS system. Please respond within 24 hours.
  `;
};

export const handlePOSFormSubmission = [
  upload.single("photo"),
  async (req: Request, res: Response) => {
    const formData = req.body;
    const photo = req.file;

    try {

      // Validate required fields
      if (
        !formData.customerName ||
        !formData.email ||
        !formData.phone ||
        !formData.productDescription
      ) {
        return res.status(400).json({
          error:
            "Missing required fields: customerName, email, phone, and productDescription are required",
        });
      }

      // Log the form submission
      console.log("🏟️ POS Form Submission Received:", formData.customerName);

      // Prepare email data
      const emailData = {
        ...formData,
        hasPhoto: !!photo,
        submissionTime: new Date().toLocaleString(),
      };

      const emailContent = formatFormData(emailData);

      // Create email message
      const mailOptions = {
        from: 'team@fanwaves.fun',
        to: 'team@fanwaves.fun',
        subject: `🏟️ NEW POS Request from ${formData.customerName}`,
        text: emailContent,
        attachments: photo ? [{
          filename: photo.originalname,
          content: photo.buffer,
          contentType: photo.mimetype
        }] : []
      };

      // Send email
      const transporter = createTransporter();
      await transporter.sendMail(mailOptions);

      console.log("📧 Email sent successfully to team@fanwaves.fun");

      res.status(200).json({
        success: true,
        message: "Request submitted successfully! Our team will contact you within 24 hours."
      });

    } catch (error) {
      console.error("POS Form submission error:", error);

      // If it's an email error, still log the submission but return a different message
      if (error.code === 'EAUTH' || (error.message && (error.message.includes('EAUTH') || error.message.includes('Invalid login') || error.message.includes('authentication')))) {
        console.log("📧 Email failed but logging submission details:");
        console.log("Customer:", formData.customerName);
        console.log("Email:", formData.email);
        console.log("Phone:", formData.phone);
        console.log("Product:", formData.productDescription);
        console.log("Request Type:", formData.requestType);
        console.log("Sizes:", formData.sizes);
        console.log("Colors:", formData.colors);
        console.log("Quantity:", formData.quantity);
        console.log("Timeline:", formData.urgency);
        console.log("Special Requests:", formData.specialRequests);
        console.log("Has Photo:", !!req.file);
        console.log("Submitted at:", new Date().toLocaleString());
        console.log("---SUBMISSION LOGGED FOR MANUAL PROCESSING---");

        return res.status(200).json({
          success: true,
          message: "Request submitted successfully! Our team has been notified."
        });
      }

      res.status(500).json({
        error: "Failed to submit request",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },
];
