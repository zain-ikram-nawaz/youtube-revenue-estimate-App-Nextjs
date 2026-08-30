import cloudinary from "./cloudinary";

export const MAX_GUIDE_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_CONTENT_IMAGES = 20;

export async function uploadGuideImage(file, folder = "guide-content") {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [
          { width: 1600, height: 1200, crop: "limit" },
          { quality: "auto:good" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => (error ? reject(error) : resolve(result.secure_url))
    ).end(buffer);
  });
}

/**
 * Uploads editor images and swaps attachment:<id> placeholders in Markdown
 * for their permanent Cloudinary URLs.
 */
export async function resolveContentImages(form, content) {
  const rawImages = form.get("contentImages");
  if (!rawImages) return content;

  let images;
  try {
    images = JSON.parse(rawImages);
  } catch {
    throw new Error("Invalid content image data");
  }

  if (!Array.isArray(images) || images.length > MAX_CONTENT_IMAGES) {
    throw new Error(`You can add up to ${MAX_CONTENT_IMAGES} content images`);
  }

  let resolvedContent = content;

  for (const image of images) {
    const id = String(image?.id || "");
    if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
      throw new Error("Invalid content image reference");
    }

    const file = form.get(`contentImage_${id}`);
    if (!file || typeof file === "string" || !file.size) {
      throw new Error("A content image is missing its file");
    }
    if (!String(file.type || "").startsWith("image/")) {
      throw new Error("Content images must be image files");
    }
    if (file.size > MAX_GUIDE_IMAGE_SIZE) {
      throw new Error("Content image max 5MB");
    }

    const url = await uploadGuideImage(file);
    resolvedContent = resolvedContent.split(`attachment:${id}`).join(url);
  }

  return resolvedContent;
}
