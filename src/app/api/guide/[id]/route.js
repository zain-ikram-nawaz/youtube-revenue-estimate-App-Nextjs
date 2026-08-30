import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "../../../lib/db";
import Guide from "../../../../models/guide";
import cloudinary from "../../../lib/cloudinary";
import { resolveContentImages } from "../../../lib/guideImages";

const MAX = 5 * 1024 * 1024;

function safeParse(v, fb = []) {
  try { return JSON.parse(v); } catch { return fb; }
}

async function uploadImage(file, folder = "guide-covers") {
  const buf = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, transformation: [{ width: 1200, height: 800, crop: "limit" }, { quality: "auto:good" }, { fetch_format: "auto" }] },
      (err, res) => (err ? reject(err) : resolve(res.secure_url))
    ).end(buf);
  });
}

function cloudinaryId(url) {
  if (!url) return null;
  const parts = url.split("/");
  const file = parts.pop().split(".")[0];
  const folder = parts.pop();
  return `${folder}/${file}`;
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const existing = await Guide.findById(id);
    if (!existing) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

    const form = await req.formData();
    const title = form.get("title");

    const update = {
      title,
      category: form.get("category"),
      author: form.get("author") || "ChannelIncome Team",
      reviewedBy: form.get("reviewedBy") || "",
      lastReviewedAt: form.get("lastReviewedAt") || undefined,
      status: form.get("status") || "published",
      coverImageAlt: form.get("coverImageAlt") || title,
      content: await resolveContentImages(form, form.get("content") || existing.content),
      metaTitle: form.get("metaTitle"),
      metaDescription: form.get("metaDescription"),
      excerpt: form.get("excerpt"),
      tags: safeParse(form.get("tags")),
      keywords: safeParse(form.get("keywords")),
      faqs: safeParse(form.get("faqs")),
      readTime: Number(form.get("readTime")) || existing.readTime,
    };

    const imgFile = form.get("coverImage");
    if (imgFile && typeof imgFile !== "string" && imgFile.size > 0) {
      if (imgFile.size > MAX) throw new Error("Cover image max 5MB");
      if (existing.coverImage) {
        const oldId = cloudinaryId(existing.coverImage);
        if (oldId) await cloudinary.uploader.destroy(oldId);
      }
      update.coverImage = await uploadImage(imgFile, "guide-covers");
    } else if (form.get("removeCoverImage") === "true") {
      if (existing.coverImage) {
        const oldId = cloudinaryId(existing.coverImage);
        if (oldId) await cloudinary.uploader.destroy(oldId);
      }
      update.coverImage = "";
    } else {
      update.coverImage = form.get("existingCoverImage") || existing.coverImage;
    }

    const updated = await Guide.findByIdAndUpdate(id, update, { new: true });
    revalidatePath("/guide");
    if (updated?.slug) revalidatePath(`/guide/${updated.slug}`);
    return NextResponse.json({ success: true, guide: updated });
  } catch (err) {
    console.error("PUT guide error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const guide = await Guide.findById(id);
    if (!guide) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

    if (guide.coverImage) {
      const pid = cloudinaryId(guide.coverImage);
      if (pid) await cloudinary.uploader.destroy(pid);
    }

    await Guide.findByIdAndDelete(id);
    revalidatePath("/guide");
    if (guide.slug) revalidatePath(`/guide/${guide.slug}`);
    return NextResponse.json({ success: true, message: "Guide deleted" });
  } catch (err) {
    console.error("DELETE guide error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
