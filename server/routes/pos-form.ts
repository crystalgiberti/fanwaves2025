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
    ��️ NEW SPECIAL REQUEST FROM FAN WAVES POS
    
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
    try {
      const formData = req.body;
      const photo = req.file;

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

      // Log the form submission (since email isn't configured)
      console.log("🏟️ POS Form Submission Received:");
      console.log("Customer:", formData.customerName);
      console.log("Email:", formData.email);
      console.log("Phone:", formData.phone);
      console.log("Request Type:", formData.requestType);
      console.log("Product Description:", formData.productDescription);
      console.log("Sizes:", formData.sizes);
      console.log("Colors:", formData.colors);
      console.log("Quantity:", formData.quantity);
      console.log("Has Photo:", !!photo);
      console.log("Submitted at:", new Date().toLocaleString());
      console.log("---");

      // Prepare email data for logging
      const emailData = {
        ...formData,
        hasPhoto: !!photo,
        submissionTime: new Date().toLocaleString(),
      };

      const emailContent = formatFormData(emailData);

      // Log what would be emailed
      console.log("📧 Email content that would be sent to team@fanwaves.fun and team@fanwave.fun:");
      console.log(emailContent);
      console.log("=".repeat(80));

      // For now, just return success since the form data is logged
      res.status(200).json({
        success: true,
        message: "Request submitted successfully! Your information has been received and logged.",
        debug: process.env.NODE_ENV === "development" ? {
          submissionLogged: true,
          customerEmail: formData.email,
          timestamp: new Date().toISOString(),
          emailWouldBeSentTo: ["team@fanwaves.fun", "team@fanwave.fun"]
        } : undefined
      });

    } catch (error) {
      console.error("POS Form submission error:", error);
      res.status(500).json({
        error: "Failed to submit request",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },
];
