import { builder } from "@builder.io/react";

// Register your Fan Waves design system
builder.init("87091a742c05463799bae52525d7477c");

// Register design tokens for Builder.io editor
builder.set("designTokens", {
  colors: [
    { name: "Fan Blue Primary", value: "#3b82f6" },
    { name: "Electric Blue", value: "#00d4ff" },
    { name: "Team Red", value: "#dc2626" },
    { name: "Team Green", value: "#16a34a" },
    { name: "Team Orange", value: "#ea580c" },
  ],
  spacing: [
    { name: "Small", value: "8px" },
    { name: "Medium", value: "16px" },
    { name: "Large", value: "24px" },
    { name: "XL", value: "32px" },
  ],
  fontFamily: [
    { name: "System", value: "system-ui, sans-serif" },
    { name: "Heading", value: "Inter, sans-serif" },
  ],
  borderRadius: [
    { name: "Small", value: "4px" },
    { name: "Medium", value: "8px" },
    { name: "Large", value: "12px" },
    { name: "Full", value: "9999px" },
  ],
});

// Register content models
builder.set("models", [
  {
    name: "page",
    fields: [
      {
        name: "title",
        type: "string",
        required: true,
      },
      {
        name: "description",
        type: "string",
      },
      {
        name: "keywords",
        type: "string",
      },
    ],
  },
  {
    name: "hero-section",
    fields: [
      {
        name: "title",
        type: "string",
        required: true,
      },
      {
        name: "subtitle",
        type: "string",
      },
      {
        name: "backgroundImage",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
      },
      {
        name: "ctaText",
        type: "string",
        defaultValue: "Shop Now",
      },
      {
        name: "ctaLink",
        type: "url",
      },
    ],
  },
]);

export { builder };
