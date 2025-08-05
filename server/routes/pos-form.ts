import { Request, Response } from "express";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const formatFormData = (data: any) => {
  return `
    <h2>New Custom Gear Request from Fan Waves POS</h2>
    
    <h3>Customer Information:</h3>
    <ul>
      <li><strong>Name:</strong> ${data.customerName}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Phone:</strong> ${data.phone}</li>
      <li><strong>Preferred Contact:</strong> ${data.preferredContact || "Not specified"}</li>
    </ul>
    
    <h3>Product Request:</h3>
    <ul>
      <li><strong>Product Description:</strong> ${data.productDescription}</li>
      <li><strong>Detailed Description:</strong> ${data.itemDescription || "Not provided"}</li>
      <li><strong>Sizes:</strong> ${data.sizes || "Not specified"}</li>
      <li><strong>Colors:</strong> ${data.colors || "Not specified"}</li>
      <li><strong>Quantity:</strong> ${data.quantity || "1"}</li>
      <li><strong>Budget Range:</strong> ${data.budget || "Not specified"}</li>
    </ul>
    
    <h3>Additional Details:</h3>
    <ul>
      <li><strong>Timeline:</strong> ${data.urgency || "Not specified"}</li>
      <li><strong>Event Date:</strong> ${data.eventDate || "Not specified"}</li>
      <li><strong>Customization Type:</strong> ${data.customizationType || "Not specified"}</li>
      <li><strong>How they heard about us:</strong> ${data.referralSource || "Not specified"}</li>
      <li><strong>Special Requests:</strong> ${data.specialRequests || "None"}</li>
    </ul>
    
    <h3>Submission Details:</h3>
    <ul>
      <li><strong>Submitted:</strong> ${new Date().toLocaleString()}</li>
      <li><strong>Source:</strong> Fan Waves POS Form</li>
      <li><strong>Photo Attached:</strong> ${data.hasPhoto ? "Yes" : "No"}</li>
    </ul>
    
    <hr>
    <p><em>This request was submitted through the Fan Waves POS system. Please respond within 24 hours.</em></p>
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

      // Create email transporter
      const transporter = createTransporter();

      // Prepare email data
      const emailData = {
        ...formData,
        hasPhoto: !!photo,
      };

      const emailHTML = formatFormData(emailData);

      // Email options
      const mailOptions = {
        from: process.env.SMTP_USER || "noreply@fanwaves.fun",
        to: ["team@fanwaves.fun", "team@fanwave.fun"],
        subject: `🏟️ New Custom Gear Request from ${formData.customerName}`,
        html: emailHTML,
        attachments: photo
          ? [
              {
                filename: `customer-photo-${Date.now()}${path.extname(photo.originalname)}`,
                content: photo.buffer,
                contentType: photo.mimetype,
              },
            ]
          : [],
      };

      // Send email
      await transporter.sendMail(mailOptions);

      // Send confirmation email to customer
      const customerConfirmation = {
        from: process.env.SMTP_USER || "noreply@fanwaves.fun",
        to: formData.email,
        subject: "🏟️ Your Fan Waves Custom Gear Request Received",
        html: `
          <h2>Thank you for your custom gear request!</h2>
          <p>Hi ${formData.customerName},</p>
          <p>We've received your request for custom fan gear and our team is already reviewing it. Here's what happens next:</p>
          <ul>
            <li>✅ <strong>Request received</strong> - ${new Date().toLocaleString()}</li>
            <li>🔍 <strong>Review in progress</strong> - Our team will review your specifications</li>
            <li>📞 <strong>Contact within 24 hours</strong> - We'll reach out via ${formData.preferredContact || "email"}</li>
            <li>💎 <strong>Custom quote provided</strong> - Tailored to your specific needs</li>
          </ul>
          
          <h3>Your Request Summary:</h3>
          <p><strong>Product:</strong> ${formData.productDescription}</p>
          <p><strong>Quantity:</strong> ${formData.quantity || "1"}</p>
          <p><strong>Timeline:</strong> ${formData.urgency || "Not specified"}</p>
          
          <p>Questions? Reply to this email or call us directly.</p>
          <p>Thanks for choosing Fan Waves!</p>
          
          <hr>
          <p><small>Fan Waves - Premium Custom Fan Gear<br>
          <a href="https://fanwaves.fun">fanwaves.fun</a> | <a href="https://fanwaves.fun/shop/">Shop Online</a></small></p>
        `,
      };

      await transporter.sendMail(customerConfirmation);

      res.status(200).json({
        success: true,
        message: "Request submitted successfully",
      });
    } catch (error) {
      console.error("POS Form submission error:", error);
      res.status(500).json({
        error: "Failed to submit request",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },
];
