import axios from "axios";
import { calculateReadTime } from "./readTime";

export const handleSubmitGuide = async ({
  e,
  formData,
  setFormData,
  setMessage,
  setIsSubmitting,
  editId = null,
}) => {
  e.preventDefault();
  setIsSubmitting(true);
  setMessage({ text: "", type: "" });

  try {
    const readTime = calculateReadTime(formData.content || "");
    const data = new FormData();

    // Append cover image file only if new file selected
    if (formData.coverImage instanceof File) {
      data.append("coverImage", formData.coverImage, formData.coverImage.name);
    } else if (typeof formData.coverImage === "string") {
      data.append("existingCoverImage", formData.coverImage);
    } else if (editId) {
      // coverImage explicitly cleared by the user
      data.append("removeCoverImage", "true");
    }

    // Content images are uploaded with the guide so unfinished/removed images
    // never need to be stored separately. The API replaces these placeholders
    // in Markdown with their permanent Cloudinary URLs.
    const pendingContentImages = (formData.contentImages || []).filter(({ id }) =>
      formData.content.includes(`attachment:${id}`)
    );
    pendingContentImages.forEach(({ id, file }) => {
      data.append(`contentImage_${id}`, file, file.name);
    });
    data.append(
      "contentImages",
      JSON.stringify(pendingContentImages.map(({ id, alt }) => ({ id, alt })))
    );

    // All other text fields
    const skip = ["coverImage", "contentImages", "tags", "keywords", "faqs"];
    Object.keys(formData).forEach((key) => {
      if (skip.includes(key)) return;
      data.append(key, formData[key] ?? "");
    });

    data.append("tags", JSON.stringify(formData.tags || []));
    data.append("keywords", JSON.stringify(formData.keywords || []));
    data.append("faqs", JSON.stringify(formData.faqs || []));
    data.append("readTime", readTime);

    const url = editId ? `/api/guide/${editId}` : "/api/guide";
    const method = editId ? "put" : "post";

    const response = await axios[method](url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const savedGuide = response.data?.guide;
    if (editId && savedGuide) {
      setFormData((previous) => ({
        ...previous,
        content: savedGuide.content || "",
        coverImage: savedGuide.coverImage || null,
        contentImages: [],
      }));
    }

    setMessage({
      text: editId ? "Guide updated successfully!" : "Guide published successfully!",
      type: "success",
    });

    if (!editId) {
      setFormData({
        title: "", category: "", author: "ChannelIncome Team", reviewedBy: "", lastReviewedAt: "", status: "published",
        coverImage: null, coverImageAlt: "", content: "",
        metaTitle: "", metaDescription: "", excerpt: "",
        tags: [], keywords: [], faqs: [], contentImages: [],
      });
    }
  } catch (err) {
    console.error("Submit error:", err);
    setMessage({ text: err.response?.data?.message || "Error saving guide.", type: "error" });
  } finally {
    setIsSubmitting(false);
  }
};
