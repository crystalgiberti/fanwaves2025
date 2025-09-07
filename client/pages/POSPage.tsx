import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Upload,
  Mail,
  Phone,
  User,
  Package,
  Palette,
  Ruler,
  Hash,
  Camera,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  customerName: string;
  email: string;
  phone: string;
  requestType: string;
  productDescription: string;
  itemDescription: string;
  sizes: string[];
  colors: string[];
  quantity: number;
  urgency: string;
  budget: string;
  preferredContact: string;
  eventDate?: string;
  customizationType: string;
  referralSource: string;
  specialRequests: string;
}

const POSPage = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<FormData>({
    customerName: "",
    email: "",
    phone: "",
    requestType: "",
    productDescription: "",
    itemDescription: "",
    sizes: [],
    colors: [],
    quantity: 1,
    urgency: "",
    budget: "",
    preferredContact: "",
    eventDate: "",
    customizationType: "",
    referralSource: "",
    specialRequests: "",
  });

  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
    "Youth S",
    "Youth M",
    "Youth L",
    "One Size",
  ];
  const colors = [
    "Black",
    "White",
    "Navy",
    "Red",
    "Royal Blue",
    "Forest Green",
    "Maroon",
    "Orange",
    "Purple",
    "Gold",
    "Silver",
    "Gray",
    "Pink",
    "Teal",
    "Custom Color",
  ];

  const handleSizeToggle = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(newSizes);
    setFormData((prev) => ({ ...prev, sizes: newSizes }));
  };

  const handleColorToggle = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    setSelectedColors(newColors);
    setFormData((prev) => ({ ...prev, colors: newColors }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "Photo uploaded",
        description: `${file.name} is ready to send`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.customerName ||
      !formData.email ||
      !formData.phone ||
      !formData.productDescription
    ) {
      toast({
        title: "Missing required fields",
        description: "Please fill out all required fields (marked with *).",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = new FormData();

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        // Skip arrays and handle separately
        if (Array.isArray(value)) return;
        if (value !== undefined && value !== null) {
          payload.append(key, String(value));
        }
      });

      // Append arrays
      if (selectedSizes.length > 0)
        payload.append("sizes", JSON.stringify(selectedSizes));
      if (selectedColors.length > 0)
        payload.append("colors", JSON.stringify(selectedColors));

      // Append photo if present
      if (uploadedFile) {
        payload.append("photo", uploadedFile, uploadedFile.name);
      }

      const res = await fetch("/api/pos-form", {
        method: "POST",
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to submit request");
      }

      setIsSubmitted(true);
      toast({
        title: "Request submitted",
        description:
          data?.message ||
          "Your request has been submitted. We'll contact you within 24 hours.",
      });
    } catch (err: any) {
      console.error("POS form submission failed:", err);
      toast({
        title: "Submission failed",
        description:
          err?.message ||
          "There was an error submitting your request. Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Card className="glass-card text-center">
            <CardContent className="pt-8 pb-8">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-white mb-4">
                Email Client Opened!
              </h1>
              <p className="text-gray-300 mb-6">
                Your email client should have opened with your request
                pre-filled. Please send the email to complete your submission.
                Our team will respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline" className="glass-button">
                  <Link to="/">Return to Home</Link>
                </Button>
                <Button asChild className="glass-button-primary">
                  <a
                    href="https://fanwaves.fun/shop/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Browse Shop <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Special Request Form
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Can't find your size or color? Want something custom? Need it
            shipped? We've got you covered!
          </p>
          <Badge variant="secondary" className="glass-badge text-lg px-4 py-2">
            <Star className="mr-2 h-4 w-4" />
            Premium Fan Gear Specialists
          </Badge>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer Information */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="mr-2 h-5 w-5" />
                Customer Information
              </CardTitle>
              <CardDescription className="text-gray-300">
                Let us know how to reach you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName" className="text-white">
                    Full Name *
                  </Label>
                  <Input
                    id="customerName"
                    className="glass-input"
                    placeholder="Your full name"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        customerName: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="glass-input"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-white">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="glass-input"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="preferredContact" className="text-white">
                  Preferred Contact Method
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      preferredContact: value,
                    }))
                  }
                >
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="How should we contact you?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="text">Text Message</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Product Request */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Product Request
              </CardTitle>
              <CardDescription className="text-gray-300">
                Tell us what you're looking for
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-white">Type of Request *</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, requestType: value }))
                  }
                >
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="What type of request is this?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="out-of-stock">
                      Out of Stock Item - Need Different Size/Color
                    </SelectItem>
                    <SelectItem value="not-in-store">
                      Item Not Available In Store - Need Shipped
                    </SelectItem>
                    <SelectItem value="custom-design">
                      Custom Design/Personalization
                    </SelectItem>
                    <SelectItem value="bulk-order">Bulk/Team Order</SelectItem>
                    <SelectItem value="special-request">
                      Special Request/Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="productDescription" className="text-white">
                  What are you looking for? *
                </Label>
                <Textarea
                  id="productDescription"
                  className="glass-input min-h-[100px]"
                  placeholder="Describe the item you want (e.g., Dallas Cowboys #4 jersey in size Large, team hat in navy blue, etc.)"
                  value={formData.productDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      productDescription: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="itemDescription" className="text-white">
                  Detailed Description
                </Label>
                <Textarea
                  id="itemDescription"
                  className="glass-input min-h-[100px]"
                  placeholder="Any specific details: player name/number, materials, delivery preferences, rush order needs, etc."
                  value={formData.itemDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      itemDescription: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Photo Upload */}
              <div>
                <Label className="text-white">Reference Photo</Label>
                <div className="mt-2">
                  <label className="glass-button cursor-pointer inline-flex items-center">
                    <Camera className="mr-2 h-4 w-4" />
                    {uploadedFile
                      ? uploadedFile.name
                      : "Upload Photo (Optional)"}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <Label className="text-white flex items-center mb-3">
                  <Ruler className="mr-2 h-4 w-4" />
                  Size(s) Needed
                </Label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <Badge
                      key={size}
                      variant={
                        selectedSizes.includes(size) ? "default" : "outline"
                      }
                      className={`cursor-pointer transition-all ${
                        selectedSizes.includes(size)
                          ? "glass-badge-active"
                          : "glass-badge-inactive"
                      }`}
                      onClick={() => handleSizeToggle(size)}
                    >
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <Label className="text-white flex items-center mb-3">
                  <Palette className="mr-2 h-4 w-4" />
                  Color(s) Preferred
                </Label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <Badge
                      key={color}
                      variant={
                        selectedColors.includes(color) ? "default" : "outline"
                      }
                      className={`cursor-pointer transition-all ${
                        selectedColors.includes(color)
                          ? "glass-badge-active"
                          : "glass-badge-inactive"
                      }`}
                      onClick={() => handleColorToggle(color)}
                    >
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="quantity"
                    className="text-white flex items-center"
                  >
                    <Hash className="mr-2 h-4 w-4" />
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    className="glass-input"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        quantity: parseInt(e.target.value) || 1,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="budget" className="text-white">
                    Budget Range
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, budget: value }))
                    }
                  >
                    <SelectTrigger className="glass-input">
                      <SelectValue placeholder="Budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-50">Under $50</SelectItem>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="100-200">$100 - $200</SelectItem>
                      <SelectItem value="200-500">$200 - $500</SelectItem>
                      <SelectItem value="500-plus">$500+</SelectItem>
                      <SelectItem value="discuss">Let's discuss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Additional Details</CardTitle>
              <CardDescription className="text-gray-300">
                Help us serve you better
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="urgency" className="text-white">
                    Timeline Needed
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, urgency: value }))
                    }
                  >
                    <SelectTrigger className="glass-input">
                      <SelectValue placeholder="When do you need this?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="1-week">Within 1 week</SelectItem>
                      <SelectItem value="2-weeks">2-3 weeks</SelectItem>
                      <SelectItem value="month">Within a month</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="eventDate" className="text-white">
                    Event Date (if applicable)
                  </Label>
                  <Input
                    id="eventDate"
                    type="date"
                    className="glass-input"
                    value={formData.eventDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        eventDate: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="customizationType" className="text-white">
                  Service Needed
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      customizationType: value,
                    }))
                  }
                >
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="What service do you need?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ship-to-me">
                      Ship item to me (no customization)
                    </SelectItem>
                    <SelectItem value="name-number">Name & Number</SelectItem>
                    <SelectItem value="logo">Custom Logo</SelectItem>
                    <SelectItem value="embroidery">Embroidery</SelectItem>
                    <SelectItem value="screen-print">
                      Screen Printing
                    </SelectItem>
                    <SelectItem value="heat-press">Heat Press</SelectItem>
                    <SelectItem value="patches">Patches</SelectItem>
                    <SelectItem value="rush-shipping">Rush Shipping</SelectItem>
                    <SelectItem value="other">Other (specify below)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="referralSource" className="text-white">
                  How did you hear about us?
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, referralSource: value }))
                  }
                >
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tent-event">
                      Visiting your tent/booth
                    </SelectItem>
                    <SelectItem value="website">Found our website</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="word-of-mouth">Word of mouth</SelectItem>
                    <SelectItem value="google">Google Search</SelectItem>
                    <SelectItem value="repeat-customer">
                      Returning customer
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="specialRequests" className="text-white">
                  Special Requests or Notes
                </Label>
                <Textarea
                  id="specialRequests"
                  className="glass-input"
                  placeholder="Any special instructions, delivery preferences, or additional information..."
                  value={formData.specialRequests}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      specialRequests: e.target.value,
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Button
                  type="submit"
                  size="lg"
                  className="glass-button-primary w-full md:w-auto text-lg px-8 py-3"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Send Email Request
                </Button>
                <p className="text-sm text-gray-400">
                  We'll get back to you within 24 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Quick Links */}
        <div className="mt-8 text-center">
          <p className="text-gray-300 mb-4">Or browse our current inventory:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="glass-button">
              <Link to="/collections">
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Collections
              </Link>
            </Button>
            <Button asChild className="glass-button-primary">
              <a
                href="https://fanwaves.fun/shop/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop Online <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSPage;
