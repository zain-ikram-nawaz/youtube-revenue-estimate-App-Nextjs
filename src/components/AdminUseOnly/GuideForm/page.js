/* eslint-disable @next/next/no-img-element -- editor preview supports blob URLs before save */
"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { handleSubmitGuide } from "@/app/hooks/handleSubmit";
import { handleAddTag, handleRemoveTag } from "@/app/hooks/handleTag";
import { handleAddKeyword, handleRemoveKeyword } from "@/app/hooks/handleKeyword";
import { addFAQ, removeFAQ, updateFAQ } from "@/app/hooks/handleFaqs";

const CATEGORIES = [
  "Monetization Basics",
  "Revenue Optimization",
  "Channel Growth",
  "YouTube Analytics",
  "YouTube CPM & RPM",
  "Creator Tools",
];

const EMPTY_FORM = {
  title: "",
  category: "",
  author: "ChannelIncome Team",
  reviewedBy: "",
  lastReviewedAt: "",
  status: "published",
  coverImage: null,
  coverImageAlt: "",
  content: "",
  metaTitle: "",
  metaDescription: "",
  excerpt: "",
  tags: [],
  keywords: [],
  faqs: [],
  contentImages: [],
};

const CHECKLIST_ITEMS = [
  "This post adds information not already covered by an existing guide on this site (no rehashing).",
  "A real person reviewed the content for accuracy before publishing — not just AI output pasted as-is.",
  "Claims/numbers here are current and not copied from another site without adding original analysis.",
];

function insertMarkdown(textarea, before, after = "", placeholder = "text") {
  if (!textarea) return;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.slice(start, end) || placeholder;
  const replacement = before + selected + after;
  const newVal = textarea.value.slice(0, start) + replacement + textarea.value.slice(end);
  // Return new value and cursor position
  return { newVal, cursor: start + before.length + selected.length + after.length };
}

export default function GuideForm({ editData }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [coverPreview, setCoverPreview] = useState(null);
  const [currentTag, setCurrentTag] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activePane, setActivePane] = useState("split"); // "write" | "preview" | "split"
  const [wordCount, setWordCount] = useState(0);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const contentImageInputRef = useRef(null);
  const [contentImagePreviews, setContentImagePreviews] = useState({});

  // Populate form on edit
  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      setFormData({
        title: editData.title || "",
        category: editData.category || "",
        author: editData.author || "ChannelIncome Team",
        reviewedBy: editData.reviewedBy || "",
        lastReviewedAt: editData.lastReviewedAt
          ? new Date(editData.lastReviewedAt).toISOString().slice(0, 10)
          : "",
        status: editData.status || "published",
        coverImage: editData.coverImage || null,
        coverImageAlt: editData.coverImageAlt || "",
        content: editData.content || "",
        metaTitle: editData.metaTitle || "",
        metaDescription: editData.metaDescription || "",
        excerpt: editData.excerpt || "",
        tags: editData.tags || [],
        keywords: editData.keywords || [],
        faqs: editData.faqs || [],
        contentImages: [],
      });
      if (editData.coverImage) setCoverPreview(editData.coverImage);
      setContentImagePreviews({});
    }
  }, [editData]);

  // Word count
  useEffect(() => {
    const words = formData.content.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [formData.content]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((p) => ({ ...p, coverImage: file }));
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleContentImageChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ text: "Please choose an image file.", type: "error" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ text: "Content image max 5MB.", type: "error" });
      return;
    }

    const id = `image-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const previewUrl = URL.createObjectURL(file);
    const alt = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/[\[\]()`]/g, "")
      .trim() || "Article image";
    const textarea = textareaRef.current;
    const start = textarea?.selectionStart ?? formData.content.length;
    const end = textarea?.selectionEnd ?? start;
    const markdown = `![${alt}](attachment:${id})`;
    const newContent = `${formData.content.slice(0, start)}${markdown}${formData.content.slice(end)}`;

    setFormData((previous) => ({
      ...previous,
      content: newContent,
      contentImages: [...(previous.contentImages || []), { id, file, alt }],
    }));
    setContentImagePreviews((previous) => ({ ...previous, [`attachment:${id}`]: previewUrl }));

    setTimeout(() => {
      textarea?.focus();
      textarea?.setSelectionRange(start + markdown.length, start + markdown.length);
    }, 0);
  };

  // Toolbar action
  const applyFormat = useCallback((before, after = "", placeholder = "text") => {
    const ta = textareaRef.current;
    if (!ta) return;
    const result = insertMarkdown(ta, before, after, placeholder);
    if (!result) return;
    setFormData((p) => ({ ...p, content: result.newVal }));
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(result.cursor, result.cursor);
    }, 0);
  }, []);

  const toolbar = [
    { label: "H2", action: () => applyFormat("\n## ", "", "Heading") },
    { label: "H3", action: () => applyFormat("\n### ", "", "Subheading") },
    { label: "B", action: () => applyFormat("**", "**", "bold text"), cls: "font-black" },
    { label: "I", action: () => applyFormat("*", "*", "italic text"), cls: "italic" },
    { label: "•", action: () => applyFormat("\n- ", "", "list item") },
    { label: "1.", action: () => applyFormat("\n1. ", "", "list item") },
    { label: "❝", action: () => applyFormat("\n> ", "", "blockquote") },
    { label: "</>", action: () => applyFormat("\n```\n", "\n```", "code here"), cls: "font-mono text-xs" },
    { label: "🔗", action: () => applyFormat("[", "](url)", "link text") },
    { label: "URL IMG", action: () => applyFormat("![alt](", ")", "image-url"), cls: "text-xs" },
  ];

  const handleSubmit = (e) =>
    handleSubmitGuide({ e, formData, setFormData, setMessage, setIsSubmitting, editId: editData?._id });

  const readTimeEstimate = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-bold text-gray-900">
            {editData?._id ? "Edit Guide" : "New Guide"}
          </h1>
          <span className="text-xs text-gray-400">{wordCount} words · ~{readTimeEstimate} min read</span>
        </div>

        {/* Status + View toggle */}
        <div className="flex items-center gap-3">
          <select
            name="status"
            value={formData.status}
            onChange={handleInput}
            className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white font-semibold"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs">
            {["write", "split", "preview"].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setActivePane(mode)}
                className={`px-3 py-1.5 font-semibold capitalize transition ${
                  activePane === mode ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.title}
            className="px-5 py-1.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition"
          >
            {isSubmitting ? "Saving..." : editData?._id ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      {/* Status message */}
      {message.text && (
        <div className={`mx-6 mt-4 px-4 py-3 rounded-lg text-sm font-medium ${
          message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 space-y-6">

        {/* Title */}
        <input
          name="title"
          value={formData.title}
          onChange={handleInput}
          required
          placeholder="Post title..."
          className="w-full text-3xl font-black text-gray-900 placeholder-gray-300 bg-transparent border-none outline-none resize-none"
        />

        {/* Meta row */}
        <div className="flex flex-wrap gap-3">
          <select
            name="category"
            value={formData.category}
            onChange={handleInput}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
          >
            <option value="">Select category...</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <input
            name="author"
            value={formData.author}
            onChange={handleInput}
            placeholder="Author (use a real name, not just a team name)"
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 w-64"
          />

          <input
            name="reviewedBy"
            value={formData.reviewedBy}
            onChange={handleInput}
            placeholder="Reviewed / fact-checked by"
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 w-56"
          />

          <input
            type="date"
            name="lastReviewedAt"
            value={formData.lastReviewedAt}
            onChange={handleInput}
            title="Last reviewed date"
            className="text-sm border border-gray-200 rounded-lg px-3 py-2"
          />
        </div>

        {/* E-E-A-T / content quality checklist (not enforced — a reminder before publishing) */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs font-bold text-amber-900 mb-2">Before you publish — content quality checklist</p>
          <ul className="space-y-1.5">
            {CHECKLIST_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-amber-900">
                <input type="checkbox" className="mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cover Image */}
        <div className="flex items-start gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Cover Image</label>
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleCoverChange} className="text-xs" />
          </div>
          {coverPreview && (
            <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
              <Image src={coverPreview} alt="cover" fill unoptimized className="object-cover" />
              <button
                type="button"
                onClick={() => { setCoverPreview(null); setFormData((p) => ({ ...p, coverImage: null })); }}
                className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full text-xs flex items-center justify-center"
              >x</button>
            </div>
          )}
          {coverPreview && (
            <input
              name="coverImageAlt"
              value={formData.coverImageAlt}
              onChange={handleInput}
              placeholder="Image alt text (for SEO)"
              className="text-xs border border-gray-200 rounded-lg px-3 py-2 flex-1"
            />
          )}
        </div>

        {/* EDITOR */}
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
          {/* Toolbar */}
          <div className="flex items-center gap-1 px-3 py-2 bg-gray-50 border-b border-gray-200 flex-wrap">
            {toolbar.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={t.action}
                title={t.label}
                className={`px-2.5 py-1 text-sm rounded hover:bg-gray-200 text-gray-700 font-semibold transition ${t.cls || ""}`}
              >
                {t.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => contentImageInputRef.current?.click()}
              title="Upload an image from your computer"
              className="px-2.5 py-1 text-sm rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold transition"
            >
              Upload image
            </button>
            <input
              ref={contentImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleContentImageChange}
              className="hidden"
            />
            <div className="ml-auto text-xs text-gray-400 pr-2">Markdown supported</div>
          </div>

          {/* Panes */}
          <div className={`flex ${activePane === "split" ? "divide-x divide-gray-200" : ""}`}>
            {/* Write pane */}
            {(activePane === "write" || activePane === "split") && (
              <textarea
                ref={textareaRef}
                name="content"
                value={formData.content}
                onChange={handleInput}
                placeholder={`Start writing in Markdown...\n\n## Introduction\n\nYour content here.\n\n## Section 2\n\nMore content.`}
                className={`${activePane === "split" ? "w-1/2" : "w-full"} min-h-[520px] p-5 text-sm font-mono text-gray-800 leading-relaxed outline-none resize-none bg-white`}
              />
            )}

            {/* Preview pane */}
            {(activePane === "preview" || activePane === "split") && (
              <div className={`${activePane === "split" ? "w-1/2" : "w-full"} min-h-[520px] p-5 overflow-y-auto`}>
                {formData.content ? (
                  <div className="prose prose-sm max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:border-b prose-h2:pb-2 prose-h2:border-gray-100 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-green-50 prose-blockquote:py-1">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      urlTransform={(url) => url}
                      components={{
                        img: ({ src, alt, ...props }) => (
                          <img
                            {...props}
                            src={contentImagePreviews[src] || src}
                            alt={alt || "Article image"}
                            className="rounded-lg max-h-80 w-auto object-contain"
                          />
                        ),
                      }}
                    >
                      {formData.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm text-gray-300 italic">Preview will appear here...</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h3 className="text-sm font-bold text-gray-900">SEO &amp; Metadata</h3>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Meta Title <span className="font-normal text-gray-400">({(formData.metaTitle || "").length}/60 chars)</span>
            </label>
            <input name="metaTitle" value={formData.metaTitle} onChange={handleInput}
              placeholder="SEO title (leave blank to use post title)"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Meta Description <span className="font-normal text-gray-400">({(formData.metaDescription || "").length}/160 chars)</span>
            </label>
            <textarea name="metaDescription" value={formData.metaDescription} onChange={handleInput} rows={2}
              placeholder="What this post is about (shown in Google search results)"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Excerpt (card preview)</label>
            <textarea name="excerpt" value={formData.excerpt} onChange={handleInput} rows={2}
              placeholder="Short description shown on the guide listing page"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none" />
          </div>
        </div>

        {/* Tags & Keywords */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input value={currentTag} onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTag(currentTag, formData, setFormData, setCurrentTag); }}}
                placeholder="Add tag + Enter"
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2" />
              <button type="button" onClick={() => handleAddTag(currentTag, formData, setFormData, setCurrentTag)}
                className="px-3 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg">Add</button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(i, formData, setFormData)} className="text-gray-400 hover:text-red-500">x</button>
                </span>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">Keywords (SEO)</label>
            <div className="flex gap-2 mb-2">
              <input value={currentKeyword} onChange={(e) => setCurrentKeyword(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddKeyword(currentKeyword, formData, setFormData, setCurrentKeyword); }}}
                placeholder="Add keyword + Enter"
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2" />
              <button type="button" onClick={() => handleAddKeyword(currentKeyword, formData, setFormData, setCurrentKeyword)}
                className="px-3 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg">Add</button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.keywords.map((kw, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                  {kw}
                  <button type="button" onClick={() => handleRemoveKeyword(i, formData, setFormData)} className="text-blue-400 hover:text-red-500">x</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">FAQs <span className="font-normal text-gray-400 text-xs">(adds structured FAQ schema to Google)</span></h3>
            <button type="button" onClick={() => addFAQ(formData, setFormData)}
              className="px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg">+ Add FAQ</button>
          </div>
          {formData.faqs.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No FAQs yet. Add some to get featured snippets in Google.</p>
          ) : (
            <div className="space-y-4">
              {formData.faqs.map((faq, i) => (
                <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400">FAQ {i + 1}</span>
                    <button type="button" onClick={() => removeFAQ(i, formData, setFormData)}
                      className="text-xs text-red-400 hover:text-red-600 font-medium">Remove</button>
                  </div>
                  <input value={faq.question || ""} onChange={(e) => updateFAQ(i, "question", e.target.value, formData, setFormData)}
                    placeholder="Question" className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2" />
                  <textarea value={faq.answer || ""} onChange={(e) => updateFAQ(i, "answer", e.target.value, formData, setFormData)}
                    placeholder="Answer" rows={2} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom submit */}
        <div className="flex justify-end">
          <button type="submit" disabled={isSubmitting || !formData.title}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-lg">
            {isSubmitting ? "Saving..." : editData?._id ? "Update Guide" : "Publish Guide"}
          </button>
        </div>

      </form>
    </div>
  );
}
