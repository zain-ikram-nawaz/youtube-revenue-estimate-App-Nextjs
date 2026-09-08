'use client'
import React, { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";

export default function Form({
  channelUrl,
  setChannelUrl,
  loading,
  error,
  handleSubmit,
  setCaptchaToken
}) {

  const [niche, setNiche] = useState("auto");
  const [location, setLocation] = useState("auto");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e, { niche, location });
  };

  return (
    <div className="lg:col-span-8 lg:col-start-1 xl:col-span-10 xl:col-start-2">

      {/* Card */}
      <div className="relative overflow-hidden bg-ink border border-white/10 rounded-3xl p-5 md:p-8 shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(224,32,26,0.22),transparent)]" />

        <form onSubmit={handleFormSubmit} className="relative z-10 space-y-6">

          {/* Title */}
          <div>
            <h2 className="font-display text-lg md:text-xl font-extrabold text-white">
              YouTube Revenue Estimator
            </h2>
            <p className="text-sm text-white/50 mt-1">
              Enter channel details to estimate earnings for 2026
            </p>
          </div>

          {/* Input */}
          <div>
            <label htmlFor="channelUrl" className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
              Channel URL or Name
            </label>

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                id="channelUrl"
                type="text"
                placeholder="Paste URL or @channelname"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full bg-white/5 text-white placeholder:text-white/30 border border-white/15 outline-none focus:border-primary transition-colors"
              />

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-full bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-hover active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Estimate"}
              </button>

            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label htmlFor="contentNiche" className="block text-xs font-bold text-white/60 uppercase mb-2">
                Content Niche
              </label>

              <select
                id="contentNiche"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-3 py-3 rounded-xl bg-white/5 text-white border border-white/15 focus:border-primary outline-none"
              >
                <option className="text-foreground" value="auto">Auto Detect</option>
                <option className="text-foreground" value="finance">Finance</option>
                <option className="text-foreground" value="tech">Technology</option>
                <option className="text-foreground" value="education">Education</option>
                <option className="text-foreground" value="lifestyle">Lifestyle</option>
                <option className="text-foreground" value="entertainment">Entertainment</option>
                <option className="text-foreground" value="kids">Kids</option>
              </select>
            </div>

            <div>
              <label htmlFor="audienceRegion" className="block text-xs font-bold text-white/60 uppercase mb-2">
                Audience Region
              </label>

              <select
                id="audienceRegion"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-3 rounded-xl bg-white/5 text-white border border-white/15 focus:border-primary outline-none"
              >
                <option className="text-foreground" value="auto">Auto Detect</option>
                <option className="text-foreground" value="tier1">Tier 1 (US/UK/CA)</option>
                <option className="text-foreground" value="tier2">Tier 2 (EU/Middle East)</option>
                <option className="text-foreground" value="tier3">Tier 3 (Asia)</option>
              </select>
            </div>

          </div>

          {/* Captcha + Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={setCaptchaToken}
            />

            <p className="text-xs text-white/50 text-center md:text-right max-w-xs">
              AI estimates based on 2026 CPM trends & niche analysis
            </p>

          </div>

        </form>

        {/* Error */}
        {error && (
          <div className="relative z-10 mt-6 p-4 rounded-2xl border border-primary/40 bg-primary/10 text-white flex items-start gap-3">

            <span className="text-primary font-black">!</span>

            <p className="text-sm text-white/80 font-medium">
              {error}
            </p>

          </div>
        )}

      </div>
    </div>
  )
}
