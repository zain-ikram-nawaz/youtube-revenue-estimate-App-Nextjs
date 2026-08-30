import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "../../lib/db";
import Guide from "../../../models/guide";
import cloudinary from "../../lib/cloudinary";
import { resolveContentImages } from "../../lib/guideImages";
import { getGuides } from "../../hooks/getGuides";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function safeParse(value, fallback = []) {
  try { return JSON.parse(value); }
  catch { return typeof value === "string" && value.trim() ? [value] : fallback; }
}

async function uploadImage(file, folder = "guides") {
  const buf = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, transformation: [{ width: 1200, height: 800, crop: "limit" }, { quality: "auto:good" }, { fetch_format: "auto" }] },
      (err, res) => (err ? reject(err) : resolve(res.secure_url))
    ).end(buf);
  });
}

export async function POST(req) {
  try {
    await connectDB();
    const form = await req.formData();

    const title = form.get("title");
    const content = await resolveContentImages(form, form.get("content") || "");

    let coverImage = "";
    const imgFile = form.get("coverImage");
    if (imgFile && imgFile.size > 0) {
      if (imgFile.size > 5 * 1024 * 1024)
        return NextResponse.json({ success: false, message: "Cover image max 5MB" }, { status: 400 });
      coverImage = await uploadImage(imgFile, "guide-covers");
    }

    const guide = await Guide.create({
      title,
      category: form.get("category"),
      author: form.get("author") || "ChannelIncome Team",
      reviewedBy: form.get("reviewedBy") || "",
      lastReviewedAt: form.get("lastReviewedAt") || undefined,
      status: form.get("status") || "published",
      coverImage,
      coverImageAlt: form.get("coverImageAlt") || title,
      content,
      metaTitle: form.get("metaTitle"),
      metaDescription: form.get("metaDescription"),
      excerpt: form.get("excerpt"),
      tags: safeParse(form.get("tags")),
      keywords: safeParse(form.get("keywords")),
      faqs: safeParse(form.get("faqs")),
      readTime: Number(form.get("readTime")) || 1,
    });

    revalidatePath("/guide");
    if (guide.slug) revalidatePath(`/guide/${guide.slug}`);

    return NextResponse.json({ success: true, guide });
  } catch (err) {
    console.error("POST guide error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 8);
  const data = await getGuides(page, limit);
  return Response.json(data);
}
