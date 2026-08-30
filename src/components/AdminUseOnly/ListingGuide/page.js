"use client"
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function ListingGuide({ data, role, setEditData, setActiveTab, setGuides }) {
  const [deletingId, setDeletingId] = useState(null);

  // ✅ FIX: Data ko serialize aur reverse karne ka sahi tariqa
  const safeData = useMemo(() => {
    if (!data) return [];
    // Pehle data ko JSON string bana kar wapis parse karein taake Dates/ObjectIds plain strings ban jayen
    const parsed = JSON.parse(JSON.stringify(data));
    return [...parsed].reverse().slice(0, 8);
  }, [data]);

  const SaveEditData = (item) => {
    setEditData(item);
    setActiveTab("guides");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    setDeletingId(id);
    try {
      const response = await axios.delete(`/api/guide/${id}`);
      if (response.data.success) {
        if (setGuides) {
          setGuides((prev) => prev.filter((g) => g._id !== id));
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (!safeData || safeData.length === 0) {
    return (
      <div className="py-20 text-center bg-white rounded-lg border border-dashed border-slate-200">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No Guides Found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
      {safeData.map((guide) => (
        <div key={guide._id} className="group relative bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">

          {/* Action Buttons (Floating) - Clean BigBear Style */}
          {role && (
            <div className="absolute top-2 right-2 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => SaveEditData(guide)}
                className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur shadow-sm text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
              >
                <i className="fas fa-edit text-[10px]"></i>
              </button>
              <button
                onClick={() => handleDelete(guide._id)}
                disabled={deletingId === guide._id}
                className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur shadow-sm text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
              >
                {deletingId === guide._id ? (
                  <i className="fas fa-spinner fa-spin text-[10px]"></i>
                ) : (
                  <i className="fas fa-trash text-[10px]"></i>
                )}
              </button>
            </div>
          )}

          {/* Image Section */}
          <div className="relative h-40 w-full bg-slate-100 overflow-hidden">
            <Image
              src={guide?.coverImage || guide?.thumbnail || "/icon.png"}
              alt={guide?.title}
              fill
              unoptimized
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute bottom-2 left-2">
              <span className="bg-slate-900/80 backdrop-blur-md text-[8px] font-black text-white px-2 py-0.5 rounded uppercase tracking-widest">
                {guide?.category || "General"}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4">
            <Link href={`/guide/${guide.slug}`}>
              <h3 className="text-sm font-bold text-slate-800 leading-tight mb-2 hover:text-blue-600 transition-colors line-clamp-2 uppercase tracking-tight">
                {guide?.title}
              </h3>
            </Link>

            <p className="text-[11px] text-slate-500 line-clamp-2 mb-4 leading-relaxed">
              {guide?.metaDescription}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                {new Date(guide?.createdAt).toLocaleDateString("en-GB")}
              </span>
              <Link
                href={`/guide/${guide.slug}`}
                className="text-[9px] font-black text-blue-500 uppercase tracking-widest hover:underline"
              >
                View Guide →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
