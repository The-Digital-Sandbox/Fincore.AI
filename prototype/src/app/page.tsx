"use client";

import { useState } from "react";
import ICloudBackground from "@/components/ICloudBackground";
import PhoneFrame from "@/components/PhoneFrame";
import TopBar from "@/components/TopBar";
import { questions, traitColors } from "@/lib/questions";
import { Camera, ChevronDown, Lock, Mail, PenLine, Shield, Check, ArrowRight, Flashlight, User, Bell, CreditCard, HelpCircle, LogOut, ChevronRight, Settings, X, Send, Paperclip, Sparkles, Mic, ThumbsUp, ThumbsDown, Star, Home as HomeIcon, QrCode, BarChart3, Landmark, Brain, MessageCircle } from "lucide-react";

type Screen =
  | "splash"
  | "login-1" | "login-2" | "login-3" | "login-4"
  | "info"
  | `q${number}`
  | "processing"
  | "results"
  | "profile"
  | "user-profile"
  | "faith"
  | "scan"
  | "scan-result"
  | "scan-result-pro"
  | "banking"
  | "analytics"
  | "brand-asset";

const loginSlides = ["login-1", "login-2", "login-3", "login-4"] as const;
const noNavScreens = new Set(["splash", "brand-asset", "login-1", "login-2", "login-3", "login-4", "info", "processing", "results", "user-profile", "faith", "profile", "scan", "scan-result", "scan-result-pro", "banking", "analytics", ...Array.from({ length: 15 }, (_, i) => `q${i + 1}`)]);
const lightScreens = new Set(["splash", "brand-asset", "login-1", "login-2", "login-3", "login-4", "info", "processing", "results", "profile", "user-profile", "faith", "scan", "scan-result", "scan-result-pro", "banking", "analytics", ...Array.from({ length: 15 }, (_, i) => `q${i + 1}`)]);

const sidebarItems = [
  { section: "Brand", items: [
    { id: "splash", label: "01 Splash Screen" },
    { id: "brand-asset", label: "02 Brand Asset" },
  ]},
  { section: "Onboarding", items: [
    { id: "login-1", label: "03 Login - Slide 1" },
    { id: "login-2", label: "04 Login - Slide 2" },
    { id: "login-3", label: "05 Login - Slide 3" },
    { id: "login-4", label: "06 Login - Sign In" },
    { id: "info", label: "07 Personal Info" },
  ]},
  { section: "Psych Profile", items: Array.from({ length: 15 }, (_, i) => ({
    id: `q${i + 1}`,
    label: `${String(i + 8).padStart(2, "0")} ${questions[i].facet}`,
  }))},
  { section: "Results", items: [
    { id: "processing", label: "23 Processing" },
    { id: "results", label: "24 OCEAN Results" },
  ]},
  { section: "App", items: [
    { id: "profile", label: "25 Profile (Nav)" },
    { id: "user-profile", label: "26 User Profile" },
    { id: "faith", label: "27 Faith Chat" },
    { id: "scan", label: "28 Feels Like Scan" },
    { id: "scan-result", label: "29 Scan Result" },
    { id: "scan-result-pro", label: "30 Scan Result (Pro)" },
    { id: "banking", label: "31 Banking" },
    { id: "analytics", label: "32 Analytics" },
  ]},
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [prevScreen, setPrevScreen] = useState<Screen>("splash");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [openTraits, setOpenTraits] = useState<Set<string>>(new Set());
  const [faithFocused, setFaithFocused] = useState(false);
  const [scanFocused, setScanFocused] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerX, setDrawerX] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [drawerSearchOpen, setDrawerSearchOpen] = useState(false);
  const [drawerSkipAnim, setDrawerSkipAnim] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileAnimating, setProfileAnimating] = useState(false);
  const [drawerSource, setDrawerSource] = useState<"faith" | "scan" | "profile">("scan");
  const [scanTab, setScanTab] = useState(0);
  const [priceEditing, setPriceEditing] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [ratingStars, setRatingStars] = useState(0);
  const [ratingComment, setRatingComment] = useState(false);
  const [altTab, setAltTab] = useState(0);
  const [navExpanded, setNavExpanded] = useState(false);
  const [profilePage, setProfilePage] = useState(0);

  const go = (s: Screen) => { setPrevScreen(screen); setScreen(s); };
  const goFromNav = (s: Screen) => { setNavExpanded(true); go(s); setTimeout(() => setNavExpanded(false), 600); };
  const isLight = lightScreens.has(screen);
  const showNav = !noNavScreens.has(screen);

  return (
    <div className="flex h-screen">
      <ICloudBackground />

      {/* Sidebar */}
      <aside className="w-[290px] glass border-r border-white/40 fixed inset-y-0 left-0 z-[100] overflow-y-auto no-scrollbar p-3">
        <div className="flex items-center gap-3 px-3 pb-5 pt-2">
          <div className="w-[38px] h-[38px] rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-base font-sans">F</div>
          <div>
            <div className="font-sans font-bold text-[17px] text-text-primary tracking-tight">Fincore AI</div>
            <div className="text-[11px] text-text-tertiary">Design Prototype v3</div>
          </div>
        </div>
        {sidebarItems.map((sec) => (
          <div key={sec.section}>
            <div className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider px-3.5 pt-4 pb-1.5">{sec.section}</div>
            {sec.items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "user-profile") { setProfileOpen(true); setProfileAnimating(true); requestAnimationFrame(() => requestAnimationFrame(() => setProfileAnimating(false))); }
                  else { setProfileOpen(false); go(item.id as Screen); }
                }}
                className={`w-full text-left flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-[13.5px] font-medium transition-all mb-[1px] ${
                  (screen === item.id || (item.id === "user-profile" && profileOpen))
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:bg-primary/[0.06] hover:text-text-primary"
                }`}
              >
                <span className={`text-[13px] w-[22px] text-center font-mono ${screen === item.id ? "opacity-100" : "opacity-50"}`}>
                  {item.label.slice(0, 2)}
                </span>
                <span className="truncate">{item.label.slice(3)}</span>
              </button>
            ))}
          </div>
        ))}
      </aside>

      {/* Main */}
      <main className="ml-[290px] flex-1 flex items-center justify-center min-h-screen p-10 relative z-[1]">
        <PhoneFrame statusLight={isLight} showNav={showNav} activeTab={screen === "scan" ? "feels" : screen === "faith" ? "faith" : screen === "profile" ? "home" : "home"} onTabChange={(tab) => {
          if (tab === "feels") go("scan");
          else if (tab === "faith") go("faith");
          else if (tab === "home") go("profile");
        }}>

          {/* SPLASH */}
          {screen === "splash" && (
            <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
              <BlueWaveBg id="splash" animated />
              <div className="z-10 flex items-center overflow-hidden">
                <span className="font-sans text-[52px] font-bold text-white tracking-tight uppercase splash-reveal leading-none">FINCORE</span>
                <span className="font-sans text-[52px] font-bold tracking-tight uppercase splash-reveal-dot leading-none splash-ai-gloss ml-[6px]">AI</span>
              </div>
              <p className="mt-3 text-[15px] text-white/50 z-10 tracking-normal splash-tagline">Reframe your financial decisions</p>
              <div className="w-[60px] h-[1px] bg-white/25 z-10 mt-4 splash-tagline" />
              <p className="mt-3 text-[13px] text-white/35 z-10 tracking-widest uppercase splash-tagline">Make it count</p>
            </div>
          )}

          {screen === "brand-asset" && (
            <div className="h-full flex flex-col relative overflow-hidden bg-[#f2f2f7]">
              <div className="pt-[54px] px-5 pb-3">
                <h2 className="font-sans text-[24px] font-bold text-[#1c1c1e] tracking-tight">Brand Assets</h2>
                <p className="text-[13px] text-[#8e8e93] mt-0.5">Download assets for use across platforms</p>
              </div>
              <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-6 space-y-5">
                {/* App Icon */}
                <div className="bg-white rounded-[24px] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)] flex flex-col items-center">
                  <div className="w-[120px] h-[120px] rounded-[28px] overflow-hidden shadow-[0_8px_30px_rgba(10,111,232,0.3)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/fincore-logo.svg" alt="Fincore App Icon" width={120} height={120} className="block w-full h-full" />
                  </div>
                  <p className="text-[16px] font-semibold text-[#1c1c1e] tracking-tight mt-3">App Icon</p>
                  <p className="text-[12px] text-[#8e8e93]">Full colour with FAI text</p>
                  <div className="flex gap-2.5 mt-3">
                    <a href="/fincore-logo.svg" download="fincore-logo.svg" className="px-4 py-2 rounded-full bg-[#0A6FE8] text-white text-[12px] font-semibold shadow-sm hover:brightness-110 transition-all">SVG</a>
                    <button onClick={() => { const c = document.createElement('canvas'); c.width = 1024; c.height = 1024; const x = c.getContext('2d'); if (!x) return; const i = new Image(); i.onload = () => { x.drawImage(i, 0, 0, 1024, 1024); const a = document.createElement('a'); a.href = c.toDataURL('image/png'); a.download = 'fincore-logo.png'; a.click(); }; i.src = '/fincore-logo.svg'; }} className="px-4 py-2 rounded-full bg-white text-[#0A6FE8] text-[12px] font-semibold shadow-sm border border-[#e5e5ea] hover:bg-[#f5f5f7] transition-all cursor-pointer">PNG</button>
                  </div>
                </div>

                {/* Alternate Logo — White F */}
                <div className="bg-white rounded-[24px] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)] flex flex-col items-center">
                  <div className="w-[120px] h-[120px] rounded-[28px] overflow-hidden shadow-[0_8px_30px_rgba(10,111,232,0.3)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/fincore-logo-white.svg" alt="Fincore White F Logo" width={120} height={120} className="block w-full h-full" />
                  </div>
                  <p className="text-[16px] font-semibold text-[#1c1c1e] tracking-tight mt-3">Alternate Logo</p>
                  <p className="text-[12px] text-[#8e8e93]">White F mark</p>
                  <div className="flex gap-2.5 mt-3">
                    <a href="/fincore-logo-white.svg" download="fincore-logo-white.svg" className="px-4 py-2 rounded-full bg-[#0A6FE8] text-white text-[12px] font-semibold shadow-sm hover:brightness-110 transition-all">SVG</a>
                    <button onClick={() => { const c = document.createElement('canvas'); c.width = 1024; c.height = 1024; const x = c.getContext('2d'); if (!x) return; const i = new Image(); i.onload = () => { x.drawImage(i, 0, 0, 1024, 1024); const a = document.createElement('a'); a.href = c.toDataURL('image/png'); a.download = 'fincore-logo-white.png'; a.click(); }; i.src = '/fincore-logo-white.svg'; }} className="px-4 py-2 rounded-full bg-white text-[#0A6FE8] text-[12px] font-semibold shadow-sm border border-[#e5e5ea] hover:bg-[#f5f5f7] transition-all cursor-pointer">PNG</button>
                  </div>
                </div>

                {/* Background */}
                <div className="bg-white rounded-[24px] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)] flex flex-col items-center">
                  <div className="w-full h-[100px] rounded-[16px] overflow-hidden shadow-[0_4px_16px_rgba(10,111,232,0.2)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/fincore-background.svg" alt="Fincore Background" width={320} height={100} className="block w-full h-full object-cover" />
                  </div>
                  <p className="text-[16px] font-semibold text-[#1c1c1e] tracking-tight mt-3">Background</p>
                  <p className="text-[12px] text-[#8e8e93]">1920x1080 for social media</p>
                  <div className="flex gap-2.5 mt-3">
                    <a href="/fincore-background.svg" download="fincore-background.svg" className="px-4 py-2 rounded-full bg-[#0A6FE8] text-white text-[12px] font-semibold shadow-sm hover:brightness-110 transition-all">SVG</a>
                    <button onClick={() => { const c = document.createElement('canvas'); c.width = 1920; c.height = 1080; const x = c.getContext('2d'); if (!x) return; const i = new Image(); i.onload = () => { x.drawImage(i, 0, 0, 1920, 1080); const a = document.createElement('a'); a.href = c.toDataURL('image/png'); a.download = 'fincore-background.png'; a.click(); }; i.src = '/fincore-background.svg'; }} className="px-4 py-2 rounded-full bg-white text-[#0A6FE8] text-[12px] font-semibold shadow-sm border border-[#e5e5ea] hover:bg-[#f5f5f7] transition-all cursor-pointer">PNG</button>
                  </div>
                </div>

                {/* Typography */}
                <div className="bg-white rounded-[24px] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
                  <p className="text-[16px] font-semibold text-[#1c1c1e] tracking-tight mb-3">Typography</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[11px] font-semibold text-[#8e8e93] uppercase tracking-wider mb-1">Display / Headings</p>
                      <p className="text-[22px] font-bold text-[#1c1c1e] tracking-tight" style={{ fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif" }}>SF Pro Display</p>
                      <p className="text-[12px] text-[#8e8e93] mt-0.5">Weights: Bold (700), Semibold (600)</p>
                    </div>
                    <div className="border-t border-[#e5e5ea] pt-3">
                      <p className="text-[11px] font-semibold text-[#8e8e93] uppercase tracking-wider mb-1">Body / UI Text</p>
                      <p className="text-[18px] font-medium text-[#1c1c1e]" style={{ fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif" }}>SF Pro Text</p>
                      <p className="text-[12px] text-[#8e8e93] mt-0.5">Weights: Medium (500), Regular (400)</p>
                    </div>
                    <div className="border-t border-[#e5e5ea] pt-3">
                      <p className="text-[11px] font-semibold text-[#8e8e93] uppercase tracking-wider mb-1">Fallback Stack</p>
                      <p className="text-[13px] text-[#1c1c1e] font-mono bg-[#f2f2f7] rounded-lg px-3 py-2">-apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, sans-serif</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LOGIN SLIDES */}
          {loginSlides.map((slideId, slideIdx) => (
            screen === slideId && (
              <div key={slideId} className="h-full relative overflow-hidden">
                <BlueWaveBg id="login" animated />
                <div className="absolute top-[58px] inset-x-4 flex gap-1 z-50">
                  {loginSlides.map((_, i) => (
                    <div key={i} className="flex-1 h-[3px] rounded-full bg-white/25 overflow-hidden cursor-pointer" onClick={() => go(loginSlides[i])}>
                      <div className={`h-full bg-white rounded-full ${i < slideIdx ? "w-full" : i === slideIdx ? "story-filling" : "w-0"}`} />
                    </div>
                  ))}
                </div>
                <div className="relative z-10 flex flex-col h-full pt-20 px-5 pb-8">
                  {slideIdx < 3 ? (
                    <>
                      <h1 className="font-sans text-[32px] font-bold text-white leading-[1.15] tracking-tight mb-3">
                        {slideIdx === 0 && <>Psychological<br />Profile</>}
                        {slideIdx === 1 && "Meet Faith"}
                        {slideIdx === 2 && <>Feels Like<br />Pricing</>}
                      </h1>
                      <p className="text-[17px] text-white/65 leading-relaxed mb-7">
                        {slideIdx === 0 && "Discover the psychology behind every financial decision you make."}
                        {slideIdx === 1 && "Your AI companion that adapts to your personality and helps you make better money decisions."}
                        {slideIdx === 2 && "See what purchases really cost you \u2013 personalised to your psychology and finances."}
                      </p>
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full glass-dark flex items-center justify-center">
                          {slideIdx === 0 && <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20"><circle cx="40" cy="40" r="30" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" /><path d="M40 20C40 20 25 32 25 44C25 52 31.5 58 40 58C48.5 58 55 52 55 44C55 32 40 20 40 20Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" /><circle cx="40" cy="38" r="5" fill="white" opacity="0.9" /></svg>}
                          {slideIdx === 1 && <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20"><rect x="12" y="18" width="56" height="44" rx="12" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" /><circle cx="30" cy="38" r="3" fill="rgba(255,255,255,0.5)" /><circle cx="42" cy="38" r="3" fill="rgba(255,255,255,0.5)" /><circle cx="54" cy="38" r="3" fill="rgba(255,255,255,0.5)" /></svg>}
                          {slideIdx === 2 && <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20"><circle cx="40" cy="40" r="28" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" /><text x="40" y="36" textAnchor="middle" fill="white" fontSize="10" fontWeight="600" opacity="0.4">{"\u00A3"}180</text><line x1="24" y1="42" x2="56" y2="42" stroke="rgba(255,255,255,0.2)" strokeWidth="1" /><text x="40" y="56" textAnchor="middle" fill="white" fontSize="18" fontWeight="700">{"\u00A3"}310</text></svg>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        <button onClick={() => go(slideIdx < 2 ? loginSlides[slideIdx + 1] : "login-4")} className="w-full h-[50px] bg-white text-primary rounded-[32px] text-[15px] font-semibold">{slideIdx < 2 ? "Next" : "Get Started"}</button>
                        <button onClick={() => go("login-4")} className="w-full h-[50px] glass-dark rounded-[32px] text-[15px] font-semibold text-white">Sign In</button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <h1 className="font-sans text-[32px] font-bold text-white leading-[1.15] tracking-tight mb-3">Welcome to Fincore</h1>
                        <p className="text-[17px] text-white/65 leading-relaxed">Sign in to get started</p>
                      </div>
                      <div className="flex-1 flex items-center -mt-16">
                      <div className="glass-dark rounded-[28px] p-6 w-full">
                        {[
                          { name: "Google", icon: <svg width="20" height="20" viewBox="0 0 20 20"><path d="M19.6 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.4c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.9-1.7 2.9-4.3 2.9-7.1z" fill="#4285F4" /><path d="M10 20c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H1.1v2.6C2.7 17.8 6.1 20 10 20z" fill="#34A853" /><path d="M4.4 12c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V5.4H1.1C.4 6.8 0 8.4 0 10s.4 3.2 1.1 4.6L4.4 12z" fill="#FBBC05" /><path d="M10 4c1.5 0 2.8.5 3.9 1.5l2.9-2.9C15 .9 12.7 0 10 0 6.1 0 2.7 2.2 1.1 5.4L4.4 8c.8-2.3 3-4.1 5.6-4.1z" fill="#EA4335" /></svg> },
                          { name: "Microsoft", icon: <svg width="20" height="20" viewBox="0 0 20 20"><rect width="9" height="9" fill="#F25022" /><rect x="10.5" width="9" height="9" fill="#7FBA00" /><rect y="10.5" width="9" height="9" fill="#00A4EF" /><rect x="10.5" y="10.5" width="9" height="9" fill="#FFB900" /></svg> },
                          { name: "Apple", icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="#000"><path d="M17.05 13.78c-.32.7-.47 1.01-.88 1.63-.57.87-1.37 1.95-2.37 1.96-.88.01-1.11-.58-2.31-.57-1.19.01-1.44.58-2.33.57-1-.01-1.76-1-2.33-1.86-1.6-2.43-1.77-5.28-.78-6.8.7-1.08 1.81-1.71 2.84-1.71 1.06 0 1.72.58 2.6.58.85 0 1.37-.58 2.6-.58.92 0 1.9.5 2.6 1.36-2.29 1.26-1.92 4.53.36 5.42zM12.98 5.15c.44-.57.78-1.37.66-2.19-.72.05-1.57.51-2.06 1.11-.44.54-.81 1.35-.67 2.14.79.02 1.61-.44 2.07-1.06z" /></svg> },
                        ].map((p) => (
                          <button key={p.name} onClick={() => go("info")} className="w-full flex items-center gap-3.5 px-[18px] h-[50px] bg-white/85 border border-white/90 rounded-[32px] text-[15px] font-medium text-text-primary hover:bg-white hover:shadow-md transition-all mb-2 last:mb-0">
                            <span className="w-[22px] h-[22px] flex items-center justify-center">{p.icon}</span>
                            Continue with {p.name}
                          </button>
                        ))}
                        <div className="flex items-start gap-2.5 mt-4 text-[13px] text-white/75 leading-snug">
                          <div className="w-5 h-5 rounded-md border-2 border-white/50 bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5"><Check size={12} className="text-white" strokeWidth={3} /></div>
                          <span>I agree to the <u>Terms of Service</u> and <u>Privacy Policy</u></span>
                        </div>
                        <div className="mt-3.5 py-3 px-4 bg-white/10 rounded-[32px] text-[13px] text-white/65 text-center font-medium flex items-center justify-center gap-1.5"><Lock size={12} /> Two-factor verification required</div>
                      </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          ))}

          {/* PERSONAL INFO */}
          {screen === "info" && (
            <div className="h-full flex flex-col relative overflow-hidden">
              <BlueWaveBg id="info" animated />
              <div className="flex-1 flex flex-col px-5 pb-8 relative z-10">
                <div className="pt-[54px] pb-4">
                  <div className="flex items-center gap-3">
                    <button onClick={() => go("login-4")} className="w-[42px] h-[42px] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors shrink-0">
                      <ArrowRight size={20} className="text-white rotate-180" />
                    </button>
                    <h2 className="flex-1 font-sans text-[28px] font-bold text-white leading-none tracking-tight">About You</h2>
                  </div>
                  <p className="text-[12px] text-white/50 ml-[55px] -mt-0.5">We just need a few details</p>
                </div>
                <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-6 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  {[{ l: "Full Name", p: "e.g. Jordan Smith" }, { l: "Date of Birth", p: "DD / MM / YYYY" }, { l: "Email", p: "you@email.com" }, { l: "Phone", p: "+44 7XXX XXXXXX" }].map((f) => (
                    <div key={f.l} className="mb-[18px] last:mb-0">
                      <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">{f.l}</label>
                      <input readOnly className="w-full px-[18px] py-[15px] bg-surface border border-black/[0.06] rounded-[32px] text-base text-text-primary outline-none focus:border-primary focus:ring-4 focus:ring-primary/25 placeholder:text-text-tertiary" placeholder={f.p} />
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-4">
                  <button onClick={() => go("q1")} className="w-full h-[50px] bg-white text-primary rounded-[32px] text-[15px] font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.15)]">Continue</button>
                </div>
              </div>
            </div>
          )}

          {/* SURVEY */}
          {questions.map((q) => screen === `q${q.id}` && (
            <div key={q.id} className="h-full flex flex-col relative overflow-hidden">
              <BlueWaveBg id={`q${q.id}`} animated />
              {/* Story progress bars */}
              <div className="absolute top-[54px] inset-x-4 flex gap-1 z-[55]">
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i} className="flex-1 h-[3px] rounded-full bg-white/25 overflow-hidden">
                    <div className={`h-full bg-white rounded-full ${i < q.id - 1 ? "w-full" : i === q.id - 1 ? "story-filling" : "w-0"}`} />
                  </div>
                ))}
              </div>
              <div className="flex-1 flex flex-col pt-[74px] px-5 pb-8 relative z-10">
                <span className="text-[12px] font-semibold text-white/50 mb-3">{q.id} of 15</span>
                <div className="mb-5">
                  <h2 className="font-sans text-[28px] font-bold text-white leading-snug tracking-tight mb-2">{q.text}</h2>
                  <p className="text-[15px] text-white/50">{q.hint}</p>
                </div>
                {/* Multiple choice answers */}
                <div className="flex flex-col gap-2.5">
                  {q.options.map((opt, oi) => {
                    const sel = selectedAnswers[q.id] === oi;
                    return (
                      <button key={oi} onClick={() => setSelectedAnswers((p) => ({ ...p, [q.id]: oi }))} className={`flex items-center gap-3.5 px-[18px] h-[68px] rounded-[32px] border-2 transition-all text-left ${sel ? "border-white bg-white/25" : "border-white/15 bg-white/10 hover:bg-white/15"}`}>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-sans font-semibold text-sm shrink-0 ${sel ? "bg-primary text-white" : "bg-white text-primary"}`}>{String.fromCharCode(65 + oi)}</span>
                        <span className="text-[15px] font-medium text-white leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-2.5 mt-auto pt-5">
                  {q.id > 1 && <button onClick={() => go(`q${q.id - 1}` as Screen)} className="px-5 h-[50px] bg-white/15 border border-white/20 rounded-[32px] text-[15px] font-semibold text-white">Back</button>}
                  <button onClick={() => go(q.id < 15 ? `q${q.id + 1}` as Screen : "processing")} className="flex-1 h-[50px] bg-white text-primary rounded-[32px] text-[15px] font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2">
                    {q.id < 15 ? "Next" : "See My Results"} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* PROCESSING */}
          {screen === "processing" && (
            <div className="h-full flex flex-col items-center text-center px-5 relative overflow-hidden">
              <BlueWaveBg id="proc" animated />
              <div className="flex-1 flex flex-col items-center justify-center z-10">
                <div className="w-[140px] h-[140px] relative mb-8">
                  {[0, 15, 30].map((inset, i) => (
                    <div key={i} className="absolute rounded-full border-2" style={{ inset: `${inset}px`, borderColor: `rgba(86,204,242,${0.3 - i * 0.07})`, animation: `ring-pulse 2s ease-in-out infinite ${i * 0.3}s` }} />
                  ))}
                  <div className="absolute inset-[38px] bg-white/10 backdrop-blur-[10px] rounded-full border border-white/15" />
                </div>
                <h2 className="font-sans text-2xl font-bold text-white mb-2">Analysing Your Mind</h2>
                <p className="text-[15px] text-white/70 mb-8">Building your personalised psychological profile...</p>
                <div className="w-full text-left space-y-2.5">
                  {["Mapping personality traits", "Calculating OCEAN scores", "Analysing financial behaviour", "Generating your profile", "Personalising Faith for you"].map((step, i) => (
                    <div key={step} className={`flex items-center gap-3 text-sm font-medium ${i < 2 ? "text-white" : i === 2 ? "text-white" : "text-white/50"}`}>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[11px] shrink-0 ${i < 2 ? "bg-accent-green border-accent-green text-white" : i === 2 ? "border-accent animate-spin border-t-transparent" : "border-white/40"}`}>
                        {i < 2 && <Check size={11} strokeWidth={3} />}
                      </div>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full pb-8 z-10">
                <button onClick={() => go("results")} className="w-full h-[50px] bg-white text-primary rounded-[32px] text-[15px] font-bold shadow-[0_4px_16px_rgba(0,0,0,0.1)]">View Results</button>
              </div>
            </div>
          )}

          {/* RESULTS */}
          {screen === "results" && (
            <div className="min-h-full relative">
              <div className="absolute inset-0 overflow-hidden"><BlueWaveBg id="results" animated /></div>
              <div className="relative z-10 pb-[30px]">
                <div className="relative z-[100] pt-[54px] px-5 pb-4">
                  <h2 className="font-sans text-[28px] font-bold text-white leading-none tracking-tight">Your Profile</h2>
                  <p className="text-[12px] text-white/50 mt-1">OCEAN Personality Assessment</p>
                </div>
                {/* OCEAN Explanation */}
                <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-5 mx-4 mb-3.5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <h3 className="font-sans text-[15px] font-bold text-text-primary mb-2">What is OCEAN?</h3>
                  <p className="text-[13px] text-text-secondary leading-relaxed">OCEAN is the gold-standard Big Five personality model used by psychologists worldwide. It measures five core traits &mdash; <strong>O</strong>penness, <strong>C</strong>onscientiousness, <strong>E</strong>xtraversion, <strong>A</strong>greeableness, and <strong>N</strong>euroticism &mdash; to understand how your personality shapes your financial decisions.</p>
                </div>
                {/* Scroll nudge */}
                <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-[22px] mx-4 mb-3.5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  {[
                    { trait: "Openness", letter: "O", score: 72, desc: "Your high openness makes you naturally drawn to novelty.", tip: "Channel your love of new things into free experiences.", cost: "1,200", faith: "Faith will flag when novelty bias is driving a purchase." },
                    { trait: "Conscientiousness", letter: "C", score: 45, desc: "Moderate conscientiousness means you sometimes plan and sometimes wing it.", tip: "Automate your finances with standing orders.", cost: "800", faith: "Faith will send gentle nudges." },
                    { trait: "Extraversion", letter: "E", score: 81, desc: "Social situations energise you but can quietly drain your account.", tip: "Suggest free or cheaper social plans first.", cost: "1,800", faith: "Faith will track social spending patterns." },
                    { trait: "Agreeableness", letter: "A", score: 63, desc: "You find it hard to say no \u2013 splitting bills, lending money, buying rounds.", tip: "Practice saying \u201CI\u2019ll get the next one.\u201D", cost: "600", faith: "Faith will help you set boundaries." },
                    { trait: "Neuroticism", letter: "N", score: 38, desc: "You don\u2019t stress about money, but can overlook financial risks.", tip: "Set one review day per month.", cost: "400", faith: "Faith will schedule monthly check-ins." },
                  ].map((t) => {
                    const c = traitColors[t.trait];
                    const open = openTraits.has(t.trait);
                    return (
                      <div key={t.trait} className="mb-[18px] last:mb-0 cursor-pointer" onClick={() => setOpenTraits((prev) => { const n = new Set(prev); n.has(t.trait) ? n.delete(t.trait) : n.add(t.trait); return n; })}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2 font-sans text-[15px] font-semibold text-text-primary">
                            <span className="w-[26px] h-[26px] rounded-lg flex items-center justify-center text-white text-[13px] font-bold" style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}>{t.letter}</span>
                            {t.trait}
                          </div>
                          <span className="text-[13px] font-semibold text-primary">{t.score}th</span>
                        </div>
                        <div className="h-2 bg-surface rounded overflow-hidden"><div className="h-full rounded transition-all duration-700" style={{ width: `${t.score}%`, background: `linear-gradient(90deg, ${c.from}, ${c.to})` }} /></div>
                        <div className="flex items-center gap-1 mt-2 text-xs text-primary font-semibold">See more <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} /></div>
                        {open && (
                          <div className="mt-3 p-4 bg-surface rounded-xl text-[13px] text-text-secondary leading-relaxed space-y-2">
                            <p><strong>Score: {t.score}/100</strong></p>
                            <p>{t.desc}</p>
                            <p><strong>Tip:</strong> {t.tip}</p>
                            <p><strong>Est. cost if unregulated:</strong> ~{"\u00A3"}{t.cost}/year</p>
                            <p><strong>Faith:</strong> {t.faith}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-[22px] mx-4 mb-3.5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <h3 className="font-sans text-[15px] font-bold text-text-primary mb-3">How Faith Will Help You</h3>
                  <div className="p-4 bg-primary-ultra border-l-[3px] border-primary rounded-r-xl text-[13px] text-text-secondary leading-relaxed">
                    Faith will adapt to your communication style, provide guardrails around social spending, and channel your openness into smarter choices.
                  </div>
                </div>
                <div className="px-5 flex flex-col gap-2.5 pb-8">
                  <button className="w-full h-[50px] border-[1.5px] border-white/40 text-white rounded-[32px] text-[15px] font-semibold flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm"><Mail size={16} /> Email Results</button>
                  <button onClick={() => goFromNav("scan")} className="w-full h-[50px] bg-white text-primary rounded-[32px] text-[15px] font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.1)]">Continue to App</button>
                </div>
              </div>
            </div>
          )}

          {/* PROFILE (with navbar) — 2-page carousel */}
          {screen === "profile" && (
            <div className="h-full flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden"><BlueWaveBg id="profile" animated /></div>

              {/* Fixed header */}
              <div className="relative z-[25] pt-[54px] px-5 pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-sans text-[28px] font-bold text-white leading-none tracking-tight">Your Profile</h2>
                    <p className="text-[12px] text-white/50 mt-1">{profilePage === 0 ? "OCEAN Personality Assessment" : "Blueprint"}</p>
                  </div>
                  <button onClick={() => { setProfileAnimating(true); setProfileOpen(true); requestAnimationFrame(() => requestAnimationFrame(() => setProfileAnimating(false))); }} className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[13px] font-semibold ring-[1.5px] ring-white/60 shrink-0 relative overflow-hidden mt-1">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-full pointer-events-none" />
                    JS
                  </button>
                </div>
                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-3">
                  {[0, 1].map((i) => (
                    <button key={i} onClick={() => setProfilePage(i)} className={`rounded-full transition-all duration-300 ${profilePage === i ? "w-[24px] h-[8px] bg-white" : "w-[8px] h-[8px] bg-white/30"}`} />
                  ))}
                </div>
              </div>

              {/* Swipeable pages */}
              <div className="flex-1 relative z-10 overflow-hidden">
                <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${profilePage * 100}%)` }}
                  onTouchStart={(e) => { (e.currentTarget as HTMLElement).dataset.touchX = String(e.touches[0].clientX); }}
                  onTouchEnd={(e) => {
                    const startX = Number((e.currentTarget as HTMLElement).dataset.touchX);
                    const diff = e.changedTouches[0].clientX - startX;
                    if (diff < -50 && profilePage < 1) setProfilePage(1);
                    if (diff > 50 && profilePage > 0) setProfilePage(0);
                  }}
                  onMouseDown={(e) => { (e.currentTarget as HTMLElement).dataset.mouseX = String(e.clientX); }}
                  onMouseUp={(e) => {
                    const startX = Number((e.currentTarget as HTMLElement).dataset.mouseX);
                    const diff = e.clientX - startX;
                    if (diff < -50 && profilePage < 1) setProfilePage(1);
                    if (diff > 50 && profilePage > 0) setProfilePage(0);
                  }}
                >
                  {/* Page 1 — OCEAN Personality Assessment */}
                  <div className="w-full h-full shrink-0 overflow-y-auto hide-scrollbar pb-4" style={{ maskImage: "linear-gradient(to bottom, black 0%, black calc(100% - 40px), transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, black calc(100% - 40px), transparent 100%)" }}>
                    <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-5 mx-4 mb-3.5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                      <h3 className="font-sans text-[15px] font-bold text-text-primary mb-2">What is OCEAN?</h3>
                      <p className="text-[13px] text-text-secondary leading-relaxed">OCEAN is the gold-standard Big Five personality model used by psychologists worldwide. It measures five core traits &mdash; <strong>O</strong>penness, <strong>C</strong>onscientiousness, <strong>E</strong>xtraversion, <strong>A</strong>greeableness, and <strong>N</strong>euroticism &mdash; to understand how your personality shapes your financial decisions.</p>
                    </div>
                    <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-[22px] mx-4 mb-3.5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                      {[
                        { trait: "Openness", letter: "O", score: 72, desc: "Your high openness makes you naturally drawn to novelty.", tip: "Channel your love of new things into free experiences.", cost: "1,200", faith: "Faith will flag when novelty bias is driving a purchase." },
                        { trait: "Conscientiousness", letter: "C", score: 45, desc: "Moderate conscientiousness means you sometimes plan and sometimes wing it.", tip: "Automate your finances with standing orders.", cost: "800", faith: "Faith will send gentle nudges." },
                        { trait: "Extraversion", letter: "E", score: 81, desc: "Social situations energise you but can quietly drain your account.", tip: "Suggest free or cheaper social plans first.", cost: "1,800", faith: "Faith will track social spending patterns." },
                        { trait: "Agreeableness", letter: "A", score: 63, desc: "You find it hard to say no \u2013 splitting bills, lending money, buying rounds.", tip: "Practice saying \u201CI\u2019ll get the next one.\u201D", cost: "600", faith: "Faith will help you set boundaries." },
                        { trait: "Neuroticism", letter: "N", score: 38, desc: "You don\u2019t stress about money, but can overlook financial risks.", tip: "Set one review day per month.", cost: "400", faith: "Faith will schedule monthly check-ins." },
                      ].map((t) => {
                        const c = traitColors[t.trait];
                        const open = openTraits.has(t.trait);
                        return (
                          <div key={t.trait} className="mb-[18px] last:mb-0 cursor-pointer" onClick={() => setOpenTraits((prev) => { const n = new Set(prev); n.has(t.trait) ? n.delete(t.trait) : n.add(t.trait); return n; })}>
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2 font-sans text-[15px] font-semibold text-text-primary">
                                <span className="w-[26px] h-[26px] rounded-lg flex items-center justify-center text-white text-[13px] font-bold" style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}>{t.letter}</span>
                                {t.trait}
                              </div>
                              <span className="text-[13px] font-semibold text-primary">{t.score}th</span>
                            </div>
                            <div className="h-2 bg-surface rounded overflow-hidden"><div className="h-full rounded transition-all duration-700" style={{ width: `${t.score}%`, background: `linear-gradient(90deg, ${c.from}, ${c.to})` }} /></div>
                            <div className="flex items-center gap-1 mt-2 text-xs text-primary font-semibold">See more <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} /></div>
                            {open && (
                              <div className="mt-3 p-4 bg-surface rounded-xl text-[13px] text-text-secondary leading-relaxed space-y-2">
                                <p><strong>Score: {t.score}/100</strong></p>
                                <p>{t.desc}</p>
                                <p><strong>Tip:</strong> {t.tip}</p>
                                <p><strong>Est. cost if unregulated:</strong> ~{"\u00A3"}{t.cost}/year</p>
                                <p><strong>Faith:</strong> {t.faith}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-[22px] mx-4 mb-3.5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                      <h3 className="font-sans text-[15px] font-bold text-text-primary mb-3">How Faith Will Help You</h3>
                      <div className="p-4 bg-primary-ultra border-l-[3px] border-primary rounded-r-xl text-[13px] text-text-secondary leading-relaxed">
                        Faith will adapt to your communication style, provide guardrails around social spending, and channel your openness into smarter choices.
                      </div>
                    </div>
                  </div>

                  {/* Page 2 — Context (blurred + locked) */}
                  <div className="w-full h-full shrink-0 overflow-y-auto hide-scrollbar pb-4 relative">
                    {/* Faux content behind blur */}
                    <div className="mx-4 space-y-3.5">
                      <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <h3 className="font-sans text-[15px] font-bold text-text-primary mb-2">Spending Patterns</h3>
                        <p className="text-[13px] text-text-secondary leading-relaxed">Your personality profile suggests you spend most on social activities and novelty-driven purchases.</p>
                      </div>
                      <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-[22px] border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <h3 className="font-sans text-[15px] font-bold text-text-primary mb-3">Monthly Impact</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between text-[13px]"><span className="text-text-secondary">Weekly spend (impulse)</span><span className="font-semibold text-text-primary">{"\u00A3"}42.60</span></div>
                          <div className="h-1.5 bg-surface rounded-full overflow-hidden"><div className="h-full bg-accent-warm rounded-full w-[65%]" /></div>
                          <div className="flex justify-between text-[13px]"><span className="text-text-secondary">Monthly total</span><span className="font-semibold text-text-primary">{"\u00A3"}183.20</span></div>
                          <div className="h-1.5 bg-surface rounded-full overflow-hidden"><div className="h-full bg-accent-red rounded-full w-[78%]" /></div>
                          <div className="flex justify-between text-[13px]"><span className="text-text-secondary">Annual projection</span><span className="font-semibold text-text-primary">{"\u00A3"}2,198.40</span></div>
                          <div className="h-1.5 bg-surface rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full w-[45%]" /></div>
                        </div>
                      </div>
                      <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-[22px] border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <h3 className="font-sans text-[15px] font-bold text-text-primary mb-3">Your Action Plan</h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-accent-green/20 flex items-center justify-center shrink-0 mt-0.5"><Check size={12} className="text-accent-green" /></div><div><p className="text-[13px] font-semibold text-text-primary">Set weekly spending caps</p><p className="text-[12px] text-text-secondary">Limit impulse spending to {"\u00A3"}25/week</p></div></div>
                          <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5"><Check size={12} className="text-primary" /></div><div><p className="text-[13px] font-semibold text-text-primary">Social spending alerts</p><p className="text-[12px] text-text-secondary">Get notified when social pressure drives purchases</p></div></div>
                          <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-accent-warm/20 flex items-center justify-center shrink-0 mt-0.5"><Check size={12} className="text-accent-warm" /></div><div><p className="text-[13px] font-semibold text-text-primary">Novelty budget</p><p className="text-[12px] text-text-secondary">Channel curiosity into a dedicated exploration fund</p></div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full-screen blur overlay — only visible on Context page */}
              {profilePage === 1 && (
                <>
                  <div className="absolute inset-0 backdrop-blur-[6px] z-20" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.6) 15%, rgba(255,255,255,0.6) 85%, transparent 100%)" }} />
                  <div className="absolute inset-0 z-[21] flex flex-col items-center justify-center text-center px-8">
                    <Lock size={48} className="text-primary mb-3" fill="#005FCC" />
                    <h4 className="text-[20px] font-bold text-text-primary mb-1">Blueprint</h4>
                    <p className="text-[14px] text-text-secondary mb-5 max-w-[260px]">See the full context behind your spending patterns and get a personalised action plan</p>
                    <button className="h-[50px] px-8 bg-primary text-white rounded-[32px] text-[15px] font-semibold shadow-[0_4px_16px_rgba(0,95,204,0.3)]">Upgrade to Unlock</button>
                  </div>
                </>
              )}

              {/* Navbar — same structure as Faith/Scan */}
              <div className="relative z-30 pb-8 pt-2 px-5">
                <div className="liquid-glass rounded-[32px] flex items-center justify-between px-2 h-[50px] relative">
                  <button className="flex flex-col items-center justify-center w-[56px]">
                    <Brain size={18} className="text-white" />
                    <span className="text-[9px] text-white mt-0.5 font-semibold">Profile</span>
                  </button>
                  <button onClick={() => goFromNav("faith")} className="flex flex-col items-center justify-center w-[56px]">
                    <MessageCircle size={18} className="text-white/70" />
                    <span className="text-[9px] text-white/50 mt-0.5">Faith</span>
                  </button>
                  <button onClick={() => goFromNav("scan")} className="flex flex-col items-center justify-center w-[56px]">
                    <Camera size={18} className="text-white/70" />
                    <span className="text-[9px] text-white/50 mt-0.5">Feels Like</span>
                  </button>
                  <button onClick={() => goFromNav("banking")} className="flex flex-col items-center justify-center w-[56px]">
                    <Landmark size={18} className="text-white/70" />
                    <span className="text-[9px] text-white/50 mt-0.5">Banking</span>
                  </button>
                  <button onClick={() => goFromNav("analytics")} className="flex flex-col items-center justify-center w-[56px]">
                    <BarChart3 size={18} className="text-white/70" />
                    <span className="text-[9px] text-white/50 mt-0.5">Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* USER PROFILE */}
          <div className={`absolute inset-0 z-[1001] flex flex-col overflow-y-auto hide-scrollbar`} style={{ transform: profileOpen && !profileAnimating ? "translateX(0)" : "translateX(100%)", transition: profileAnimating ? "none" : "transform 350ms cubic-bezier(0.32, 0.72, 0, 1)", pointerEvents: profileOpen ? "auto" : "none" }}>
              <div className="absolute inset-0 overflow-hidden z-0"><BlueWaveBg id="user-prof" animated /></div>
              <div className="relative z-10 pb-10 flex-1 flex flex-col justify-center">
                {/* Close button — matches header plus button */}
                <button onClick={() => setProfileOpen(false)} className="absolute top-[57px] left-5 w-[38px] h-[38px] rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors z-20">
                  <ArrowRight size={16} className="text-white rotate-180" />
                </button>

                {/* Header */}
                <div className="pt-[100px] pb-4 flex flex-col items-center">
                  <div className="w-[90px] h-[90px] rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[32px] font-bold font-sans shadow-[0_4px_20px_rgba(0,95,204,0.3)] ring-[2px] ring-white/80 mb-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-full pointer-events-none" />
                    JS
                  </div>
                  <h2 className="font-sans text-[22px] font-bold text-white tracking-tight">John Smith</h2>
                  <p className="text-[14px] text-white/40 mt-0.5">john.smith@email.com</p>
                </div>

                {/* Menu sections */}
                <div className="mx-4 space-y-3">
                  {/* Account */}
                  <div className="bg-white/8 rounded-[20px] border border-white/10 overflow-hidden">
                    {[
                      { icon: <User size={18} />, label: "Personal Details", color: "text-primary" },
                      { icon: <Shield size={18} />, label: "Security & Privacy", color: "text-primary" },
                      { icon: <Bell size={18} />, label: "Notifications", color: "text-primary" },
                    ].map((item, i, arr) => (
                      <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors ${i < arr.length - 1 ? "border-b border-white/10" : ""}`}>
                        <div className="w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center text-primary">{item.icon}</div>
                        <span className="flex-1 text-left text-[15px] font-medium text-white/80">{item.label}</span>
                        <ChevronRight size={16} className="text-white/30" />
                      </button>
                    ))}
                  </div>

                  {/* Finance */}
                  <div className="bg-white/8 rounded-[20px] border border-white/10 overflow-hidden">
                    {[
                      { icon: <CreditCard size={18} />, label: "Payment Methods", color: "text-primary" },
                      { icon: <Settings size={18} />, label: "Preferences", color: "text-primary" },
                    ].map((item, i, arr) => (
                      <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors ${i < arr.length - 1 ? "border-b border-white/10" : ""}`}>
                        <div className="w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center text-primary">{item.icon}</div>
                        <span className="flex-1 text-left text-[15px] font-medium text-white/80">{item.label}</span>
                        <ChevronRight size={16} className="text-white/30" />
                      </button>
                    ))}
                  </div>

                  {/* Support */}
                  <div className="bg-white/8 rounded-[20px] border border-white/10 overflow-hidden">
                    <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors">
                      <div className="w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center text-primary"><HelpCircle size={18} /></div>
                      <span className="flex-1 text-left text-[15px] font-medium text-white/80">Help & Support</span>
                      <ChevronRight size={16} className="text-white/30" />
                    </button>
                  </div>

                  {/* Sign out */}
                  <div className="bg-white/8 rounded-[20px] border border-white/10 overflow-hidden">
                    <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors">
                      <div className="w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center"><LogOut size={16} className="text-red-400 ml-0.5" /></div>
                      <span className="flex-1 text-left text-[15px] font-medium text-red-300">Sign Out</span>
                      <ChevronRight size={16} className="text-white/30" />
                    </button>
                  </div>
                </div>
              </div>
          </div>

          {/* FAITH CHAT */}
          {screen === "faith" && (
            <div className="h-full flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden"><BlueWaveBg id="faith" animated /></div>

              {/* Chat header */}
              <div className="relative z-10 pt-[54px] px-5 pb-4">
                <div className="flex items-center gap-3">
                  <button onClick={() => { setDrawerSource("faith"); setDrawerOpen(true); }} className="w-[42px] h-[42px] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
                  </button>
                  <h2 className="flex-1 font-sans text-[28px] font-bold text-white leading-none tracking-tight">Faith</h2>
                  <button onClick={() => { setProfileAnimating(true); setProfileOpen(true); requestAnimationFrame(() => requestAnimationFrame(() => setProfileAnimating(false))); }} className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[13px] font-semibold ring-[1.5px] ring-white/60 shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-full pointer-events-none" />
                    JS
                  </button>
                </div>
                <p className="text-[12px] text-white/50 ml-[55px] -mt-0.5">Your financial AI companion</p>
              </div>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto px-4 pb-4 relative z-10 space-y-4 hide-scrollbar" style={{ maskImage: "linear-gradient(to bottom, black 0%, black calc(100% - 60px), transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, black calc(100% - 60px), transparent 100%)" }}>

                {/* Date divider */}
                <div className="flex items-center justify-center py-2">
                  <span className="text-[11px] font-medium text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full">Today</span>
                </div>

                {/* User message — weekend spending question */}
                <div className="flex justify-end">
                  <div className="max-w-[75%]">
                    <div className="bg-primary rounded-[18px] rounded-br-[4px] px-4 py-3 shadow-[0_1px_6px_rgba(0,95,204,0.2)]">
                      <p className="text-[14px] text-white leading-relaxed">Why do I spend so much on weekends?</p>
                    </div>
                    <span className="text-[10px] text-white/35 mt-1 mr-2 block text-right">9:31 AM</span>
                  </div>
                </div>

                {/* Faith message */}
                <div className="flex gap-2.5 items-end">
                  <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-white text-[14px] font-bold leading-none">F</span>
                  </div>
                  <div className="max-w-[75%]">
                    <div className="bg-white/95 backdrop-blur-xl rounded-[18px] rounded-bl-[4px] px-4 py-3 shadow-[0_1px_6px_rgba(0,0,0,0.06)] border border-white/80">
                      <p className="text-[14px] text-text-primary leading-relaxed">Good morning, John! 👋</p>
                      <p className="text-[14px] text-text-primary leading-relaxed mt-1.5">Based on your <strong>high Extraversion</strong> score, I noticed you tend to spend more on social activities at weekends. Want me to help you set a social budget?</p>
                    </div>
                    <span className="text-[10px] text-white/35 mt-1 ml-2 block">9:32 AM</span>
                  </div>
                </div>

                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-[75%]">
                    <div className="bg-primary rounded-[18px] rounded-br-[4px] px-4 py-3 shadow-[0_1px_6px_rgba(0,95,204,0.2)]">
                      <p className="text-[14px] text-white leading-relaxed">Yeah that would be great! How much am I actually spending?</p>
                    </div>
                    <span className="text-[10px] text-white/35 mt-1 mr-2 block text-right">9:33 AM</span>
                  </div>
                </div>

                {/* Faith message with insight card */}
                <div className="flex gap-2.5 items-end">
                  <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-white text-[14px] font-bold leading-none">F</span>
                  </div>
                  <div className="max-w-[80%]">
                    <div className="bg-white/95 backdrop-blur-xl rounded-[18px] rounded-bl-[4px] px-4 py-3 shadow-[0_1px_6px_rgba(0,0,0,0.06)] border border-white/80">
                      <p className="text-[14px] text-text-primary leading-relaxed">Here&apos;s your social spending breakdown for March:</p>
                      {/* Insight card */}
                      <div className="mt-3 bg-primary-ultra rounded-2xl p-3.5 border border-primary/10">
                        <div className="flex items-center gap-2 mb-2.5">
                          <div className="w-[22px] h-[22px] rounded-md bg-primary/10 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                          </div>
                          <span className="text-[12px] font-bold text-primary">Social Spending — March</span>
                        </div>
                        <div className="space-y-2">
                          {[
                            { label: "Dining out", amount: "£187", pct: 45 },
                            { label: "Drinks & bars", amount: "£124", pct: 30 },
                            { label: "Events & tickets", amount: "£68", pct: 16 },
                            { label: "Other social", amount: "£37", pct: 9 },
                          ].map((item) => (
                            <div key={item.label}>
                              <div className="flex justify-between text-[12px] mb-0.5">
                                <span className="text-text-secondary">{item.label}</span>
                                <span className="font-semibold text-text-primary">{item.amount}</span>
                              </div>
                              <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${item.pct}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-primary/10">
                          <span className="text-[12px] font-bold text-text-primary">Total</span>
                          <span className="text-[15px] font-bold text-primary">£416</span>
                        </div>
                      </div>
                      <p className="text-[14px] text-text-primary leading-relaxed mt-3">That&apos;s <strong>23% above</strong> your average. I&apos;d suggest a weekly cap of £80. Shall I set that up?</p>
                    </div>
                    <span className="text-[10px] text-white/35 mt-1 ml-2 block">9:33 AM</span>
                  </div>
                </div>

                {/* Quick reply suggestions */}
                <div className="flex gap-2 flex-wrap pl-[38px]">
                  {["Yes, set it up", "Show me more detail", "Maybe later"].map((reply) => (
                    <button key={reply} className="px-3.5 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[13px] font-medium text-primary border border-white/80 shadow-sm hover:bg-white transition-colors">
                      {reply}
                    </button>
                  ))}
                </div>

              </div>

              {/* Input bar — GPT style */}
              <div className="relative z-10 pb-8 pt-2 px-5">
                <div className="relative h-[50px]">
                  {/* Navbar — slides in from left */}
                  <div
                    className={`absolute inset-0 liquid-glass rounded-[32px] flex items-center justify-between px-2 transition-all duration-500 ease-out ${navExpanded ? "translate-x-0 opacity-100 z-20" : "-translate-x-full opacity-0 z-0 pointer-events-none"}`}
                    onTouchStart={(e) => { (e.currentTarget as HTMLElement).dataset.swipeX = String(e.touches[0].clientX); }}
                    onTouchEnd={(e) => { const diff = e.changedTouches[0].clientX - Number((e.currentTarget as HTMLElement).dataset.swipeX); if (diff < -60) setNavExpanded(false); }}
                    onMouseDown={(e) => { (e.currentTarget as HTMLElement).dataset.swipeX = String(e.clientX); }}
                    onMouseUp={(e) => { const diff = e.clientX - Number((e.currentTarget as HTMLElement).dataset.swipeX); if (diff < -60) setNavExpanded(false); }}
                  >
                    <button onClick={() => { goFromNav("profile"); }} className="flex flex-col items-center justify-center w-[56px]">
                      <Brain size={18} className="text-white/70" />
                      <span className="text-[9px] text-white/50 mt-0.5">Profile</span>
                    </button>
                    <button onClick={() => { goFromNav("faith"); }} className="flex flex-col items-center justify-center w-[56px]">
                      <MessageCircle size={18} className="text-white" />
                      <span className="text-[9px] text-white mt-0.5 font-semibold">Faith</span>
                    </button>
                    <button onClick={() => { goFromNav("scan"); }} className="flex flex-col items-center justify-center w-[56px]">
                      <Camera size={18} className="text-white/70" />
                      <span className="text-[9px] text-white/50 mt-0.5">Feels Like</span>
                    </button>
                    <button onClick={() => goFromNav("banking")} className="flex flex-col items-center justify-center w-[56px]">
                      <Landmark size={18} className="text-white/70" />
                      <span className="text-[9px] text-white/50 mt-0.5">Banking</span>
                    </button>
                    <button onClick={() => goFromNav("analytics")} className="flex flex-col items-center justify-center w-[56px]">
                      <BarChart3 size={18} className="text-white/70" />
                      <span className="text-[9px] text-white/50 mt-0.5">Analytics</span>
                    </button>
                    <button onClick={() => setNavExpanded(false)} className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-[16px]">
                      <ChevronRight size={14} className="text-white/30" />
                    </button>
                  </div>
                  {/* Input bar */}
                  <div className={`absolute inset-0 flex items-center transition-all duration-500 ease-out ${navExpanded ? "translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"} ${faithFocused ? "gap-0" : "gap-2"}`}>
                    {/* Home button — collapses when focused */}
                    <div className={`shrink-0 overflow-hidden transition-all duration-400 ease-out ${faithFocused ? "w-0 opacity-0" : "w-[42px] opacity-100"}`}>
                      <button onClick={() => setNavExpanded(true)} className="w-[42px] h-[42px] rounded-full liquid-glass flex items-center justify-center">
                        <HomeIcon size={18} className="text-white" />
                      </button>
                    </div>
                    <div onClick={() => !faithFocused && setFaithFocused(true)} className="flex-1 liquid-glass rounded-[32px] flex items-center pl-2 pr-1.5 py-1.5 h-[50px] cursor-text">
                      {/* Plus inside — only when focused */}
                      <div className={`shrink-0 overflow-hidden transition-all duration-400 ease-out ${faithFocused ? "w-[36px] min-w-[36px] mr-1 opacity-100" : "w-0 min-w-0 mr-0 opacity-0"}`}>
                        <button onClick={(e) => { e.stopPropagation(); setFaithFocused(false); }} className="w-[36px] h-[36px] rounded-full bg-white/0 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </button>
                      </div>
                      {!faithFocused && <div className="w-2" />}
                      {faithFocused ? (
                        <input autoFocus onBlur={() => setFaithFocused(false)} className="text-[15px] text-white flex-1 leading-snug bg-transparent outline-none placeholder:text-white/50" placeholder="Ask Faith anything..." />
                      ) : (
                        <span className="text-[15px] text-white/50 flex-1 leading-snug">Ask Faith anything...</span>
                      )}
                      <button className="w-[28px] h-[28px] flex items-center justify-center shrink-0 ml-1">
                        <Mic size={18} className="text-white/50" fill="rgba(255,255,255,0.5)" />
                      </button>
                      <button className="w-[36px] h-[36px] rounded-full bg-primary flex items-center justify-center shrink-0 ml-1">
                        <Send size={14} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCAN (HOME) — Camera-ready barcode scanner */}
          {screen === "scan" && (
            <div className="h-full flex flex-col relative overflow-hidden">
              {/* Wave background */}
              <BlueWaveBg id="scan" animated />

              <TopBar title="Feels Like" onMenuClick={() => { setDrawerSource("scan"); setDrawerOpen(true); }} onAvatarClick={() => { setProfileAnimating(true); setProfileOpen(true); requestAnimationFrame(() => requestAnimationFrame(() => setProfileAnimating(false))); }} />


              <div className="flex-1 flex flex-col items-center justify-center px-5 relative z-10">
                {/* Scan viewfinder — dark window inside */}
                <div className="relative w-[300px] h-[320px] mb-8">
                  {/* Dark camera area inside the brackets */}
                  <div className="absolute inset-[10px] rounded-[18px] bg-[#0d1520]/85 backdrop-blur-sm" />

                  {/* Center crosshair — tap to simulate scan */}
                  <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => go("scan-result")}>
                    <div className="w-[60px] h-[60px] border-2 border-white/20 rounded-xl" />
                  </div>

                  {/* Corner brackets — large and rounded */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 320" fill="none">
                    <path d="M10,60 L10,28 Q10,10 28,10 L60,10" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <path d="M240,10 L272,10 Q290,10 290,28 L290,60" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <path d="M10,260 L10,292 Q10,310 28,310 L60,310" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <path d="M240,310 L272,310 Q290,310 290,292 L290,260" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  </svg>

                  {/* Torch toggle */}
                  <button className="absolute top-[18px] right-[18px] w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center hover:bg-white/25 transition-colors">
                    <Flashlight size={18} className="text-white" />
                  </button>
                </div>

                {/* Instructions */}
                <h2 className="font-sans text-[22px] font-bold text-white tracking-tight mb-2 text-center max-w-[280px]">Scan to start making better financial decisions.</h2>
                <p className="text-[13px] text-white/40 leading-relaxed text-center max-w-[280px]">Point your camera at a barcode or QR code to see what it really costs you.</p>

              </div>

              {/* Manual entry input — pinned to bottom */}
              {/* Input bar — GPT style */}
              <div className="relative z-10 pb-8 pt-2 px-5">
                <div className="relative h-[50px]">
                  {/* Navbar — slides in from left */}
                  <div
                    className={`absolute inset-0 liquid-glass rounded-[32px] flex items-center justify-between px-2 transition-all duration-500 ease-out ${navExpanded ? "translate-x-0 opacity-100 z-20" : "-translate-x-full opacity-0 z-0 pointer-events-none"}`}
                    onTouchStart={(e) => { (e.currentTarget as HTMLElement).dataset.swipeX = String(e.touches[0].clientX); }}
                    onTouchEnd={(e) => { const diff = e.changedTouches[0].clientX - Number((e.currentTarget as HTMLElement).dataset.swipeX); if (diff < -60) setNavExpanded(false); }}
                    onMouseDown={(e) => { (e.currentTarget as HTMLElement).dataset.swipeX = String(e.clientX); }}
                    onMouseUp={(e) => { const diff = e.clientX - Number((e.currentTarget as HTMLElement).dataset.swipeX); if (diff < -60) setNavExpanded(false); }}
                  >
                    <button onClick={() => { goFromNav("profile"); }} className="flex flex-col items-center justify-center w-[56px]">
                      <Brain size={18} className="text-white/70" />
                      <span className="text-[9px] text-white/50 mt-0.5">Profile</span>
                    </button>
                    <button onClick={() => { goFromNav("faith"); }} className="flex flex-col items-center justify-center w-[56px]">
                      <MessageCircle size={18} className="text-white/70" />
                      <span className="text-[9px] text-white/50 mt-0.5">Faith</span>
                    </button>
                    <button onClick={() => { goFromNav("scan"); }} className="flex flex-col items-center justify-center w-[56px]">
                      <Camera size={18} className="text-white" />
                      <span className="text-[9px] text-white mt-0.5 font-semibold">Feels Like</span>
                    </button>
                    <button onClick={() => goFromNav("banking")} className="flex flex-col items-center justify-center w-[56px]">
                      <Landmark size={18} className="text-white/70" />
                      <span className="text-[9px] text-white/50 mt-0.5">Banking</span>
                    </button>
                    <button onClick={() => goFromNav("analytics")} className="flex flex-col items-center justify-center w-[56px]">
                      <BarChart3 size={18} className="text-white/70" />
                      <span className="text-[9px] text-white/50 mt-0.5">Analytics</span>
                    </button>
                    <button onClick={() => setNavExpanded(false)} className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-[16px]">
                      <ChevronRight size={14} className="text-white/30" />
                    </button>
                  </div>
                  {/* Input bar */}
                  <div className={`absolute inset-0 flex items-center transition-all duration-500 ease-out ${navExpanded ? "translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"} ${scanFocused ? "gap-0" : "gap-2"}`}>
                    {/* Home button — collapses when focused */}
                    <div className={`shrink-0 overflow-hidden transition-all duration-400 ease-out ${scanFocused ? "w-0 opacity-0" : "w-[42px] opacity-100"}`}>
                      <button onClick={() => setNavExpanded(true)} className="w-[42px] h-[42px] rounded-full liquid-glass flex items-center justify-center">
                        <HomeIcon size={18} className="text-white" />
                      </button>
                    </div>
                    <div onClick={() => !scanFocused && setScanFocused(true)} className="flex-1 liquid-glass rounded-[32px] flex items-center pl-2 pr-1.5 py-1.5 h-[50px] cursor-text">
                      {/* Plus inside — only when focused */}
                      <div className={`shrink-0 overflow-hidden transition-all duration-400 ease-out ${scanFocused ? "w-[36px] min-w-[36px] mr-1 opacity-100" : "w-0 min-w-0 mr-0 opacity-0"}`}>
                        <button onClick={(e) => { e.stopPropagation(); setScanFocused(false); }} className="w-[36px] h-[36px] rounded-full bg-white/0 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </button>
                      </div>
                      {!scanFocused && <div className="w-2" />}
                      {scanFocused ? (
                        <input autoFocus onBlur={() => setScanFocused(false)} className="text-[15px] text-white flex-1 leading-snug bg-transparent outline-none placeholder:text-white/50" placeholder="Enter Manually" />
                      ) : (
                        <span className="text-[15px] text-white/50 flex-1 leading-snug">Enter Manually</span>
                      )}
                      <button className="w-[28px] h-[28px] flex items-center justify-center shrink-0 ml-1">
                        <Mic size={18} className="text-white/50" fill="rgba(255,255,255,0.5)" />
                      </button>
                      <button className="w-[36px] h-[36px] rounded-full bg-primary flex items-center justify-center shrink-0 ml-1">
                        <Send size={14} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* SCAN RESULT */}
          {screen === "scan-result" && (
            <div className="h-full flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden"><BlueWaveBg id="scan-res" animated /></div>

              {/* Header */}
              <div className="relative z-10 pt-[54px] px-5 pb-4">
                <div className="flex items-center gap-3">
                  <button onClick={() => goFromNav("scan")} className="w-[42px] h-[42px] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors shrink-0">
                    <ArrowRight size={20} className="text-white rotate-180" />
                  </button>
                  <h2 className="flex-1 font-sans text-[28px] font-bold text-white leading-none tracking-tight">Feels Like</h2>
                  <button onClick={() => { setProfileAnimating(true); setProfileOpen(true); requestAnimationFrame(() => requestAnimationFrame(() => setProfileAnimating(false))); }} className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[13px] font-semibold ring-[1.5px] ring-white/60 shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-full pointer-events-none" />
                    JS
                  </button>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pb-8 relative z-10">

                {/* Product card */}
                <div className="bg-white/95 backdrop-blur-xl rounded-[20px] p-4 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-4">
                  <div className="flex gap-4">
                    <div className="w-[90px] h-[90px] rounded-[14px] bg-surface flex items-center justify-center shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/coca-cola.png" alt="Coca-Cola" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-[17px] font-bold text-text-primary leading-tight">Coca-Cola Original</h3>
                      <p className="text-[13px] text-text-tertiary mt-0.5">330ml Can • Tesco</p>
                    </div>
                  </div>
                </div>

                {/* Price section */}
                <div className="mb-4">
                  {priceEditing ? (
                    <div className="bg-white/95 backdrop-blur-xl rounded-[20px] border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4 flex items-center gap-3">
                      <div className="flex-1">
                        <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider block mb-1">Actual Price</span>
                        <div className="flex items-center gap-0.5">
                          <span className="text-[32px] font-bold text-text-primary">{"\u00A3"}</span>
                          <input autoFocus defaultValue="1.00" className="text-[32px] font-bold text-text-primary leading-tight w-[90px] bg-transparent outline-none border-b-2 border-primary" />
                        </div>
                        <span className="text-[12px] text-primary font-semibold mt-0.5 block">press Update to save</span>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <button onClick={() => setPriceEditing(false)} className="h-[38px] px-5 rounded-[32px] bg-primary text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(0,95,204,0.3)]">Update</button>
                        <button onClick={() => setPriceEditing(false)} className="h-[38px] px-5 rounded-[32px] bg-surface text-[13px] font-semibold text-text-secondary">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <div onClick={() => setPriceEditing(true)} className="flex-1 bg-white/95 backdrop-blur-xl rounded-[20px] border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4 text-center cursor-pointer">
                        <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Actual Price</span>
                        <p className="text-[32px] font-bold text-text-primary leading-tight mt-1">{"\u00A3"}1.00</p>
                        <span className="text-[12px] text-primary font-semibold flex items-center justify-center gap-1">
                          <PenLine size={10} /> tap to edit
                        </span>
                      </div>
                      <div className="flex-1 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[20px] border border-white/20 p-4 text-center relative overflow-hidden min-h-[140px]">
                        <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Feels Like</span>
                        <p className="text-[32px] font-bold text-white leading-tight mt-1">{"\u00A3"}3.80</p>
                        <span className="text-[12px] text-accent font-semibold">+{"\u00A3"}2.80</span>
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[6px] rounded-[20px] flex flex-col items-center justify-center px-3">
                          <Lock size={28} className="text-primary mb-1.5" fill="#005FCC" />
                          <span className="text-[13px] font-bold text-text-primary">Feels Like Price</span>
                          <span className="text-[10px] text-text-secondary mt-0.5 text-center">See the real psychological cost of your purchases</span>
                          <button className="mt-2 h-[30px] px-4 bg-primary text-white rounded-full text-[11px] font-semibold">Upgrade to Unlock</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <h4 className="text-[22px] font-bold text-white mb-1 px-1">Reasoning</h4>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mb-3">
                  {[0, 1, 2].map((i) => (
                    <button key={i} onClick={() => setScanTab(i)} className={`rounded-full transition-all duration-300 ${scanTab === i ? "w-[24px] h-[8px] bg-white" : "w-[8px] h-[8px] bg-white/30"}`} />
                  ))}
                </div>

                {/* Psychology carousel */}
                <div className="relative overflow-hidden">
                  <div className="flex gap-3 transition-transform duration-500 ease-out" style={{ transform: `translateX(calc(-${scanTab * 100}% - ${scanTab * 12}px))` }}
                    onTouchStart={(e) => { (e.currentTarget as HTMLElement).dataset.touchX = String(e.touches[0].clientX); }}
                    onTouchEnd={(e) => {
                      const startX = Number((e.currentTarget as HTMLElement).dataset.touchX);
                      const diff = e.changedTouches[0].clientX - startX;
                      if (diff < -50 && scanTab < 2) setScanTab(scanTab + 1);
                      if (diff > 50 && scanTab > 0) setScanTab(scanTab - 1);
                    }}
                    onMouseDown={(e) => { (e.currentTarget as HTMLElement).dataset.mouseX = String(e.clientX); }}
                    onMouseUp={(e) => {
                      const startX = Number((e.currentTarget as HTMLElement).dataset.mouseX);
                      const diff = e.clientX - startX;
                      if (diff < -50 && scanTab < 2) setScanTab(scanTab + 1);
                      if (diff > 50 && scanTab > 0) setScanTab(scanTab - 1);
                    }}
                  >
                    {/* Slide 1 — OCEAN */}
                    <div className="w-full shrink-0 bg-white/95 backdrop-blur-xl p-5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] rounded-[20px]">
                      <h4 className="text-[15px] font-bold text-text-primary mb-3">Psychological</h4>
                      <div className="space-y-3">
                        {[
                          { trait: "Openness", score: 72, insight: "Novelty-seeking makes you grab familiar comforts", from: "#A855F7", to: "#C084FC" },
                          { trait: "Conscientiousness", score: 45, insight: "Lower planning means more spontaneous purchases", from: "#3B82F6", to: "#60A5FA" },
                          { trait: "Extraversion", score: 81, insight: "Social situations trigger impulse buys like this", from: "#FF6B6B", to: "#FF8E8E" },
                          { trait: "Agreeableness", score: 63, insight: "You find it hard to say no to social spending pressure", from: "#F97316", to: "#FB923C" },
                          { trait: "Neuroticism", score: 38, insight: "Low stress about money can lead to overlooking small costs", from: "#14B8A6", to: "#2DD4BF" },
                        ].map((t) => (
                          <div key={t.trait}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[13px] font-semibold text-text-primary">{t.trait}</span>
                              <span className="text-[12px] font-semibold" style={{ color: t.from }}>{t.score}th</span>
                            </div>
                            <div className="h-1.5 bg-surface rounded-full overflow-hidden mb-1.5">
                              <div className="h-full rounded-full" style={{ width: `${t.score}%`, background: `linear-gradient(90deg, ${t.from}, ${t.to})` }} />
                            </div>
                            <p className="text-[12px] text-text-secondary">{t.insight}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-primary-ultra rounded-xl">
                        <p className="text-[13px] text-primary font-medium"><strong>Faith says:</strong> This {"\u00A3"}1 purchase feels like {"\u00A3"}3.80 to your personality. Over a year, that adds up to ~{"\u00A3"}150 in hidden psychological cost.</p>
                      </div>
                    </div>

                    {/* Slide 2 — Financial (locked) */}
                    <div className="w-full shrink-0 bg-white/95 backdrop-blur-xl p-5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] rounded-[20px] relative overflow-hidden">
                      {/* Faux content behind blur */}
                      <div className="space-y-3">
                        <h4 className="text-[15px] font-bold text-text-primary">Monthly Impact</h4>
                        <div className="flex justify-between text-[13px]"><span className="text-text-secondary">Weekly spend (similar items)</span><span className="font-semibold text-text-primary">{"\u00A3"}7.40</span></div>
                        <div className="h-1.5 bg-surface rounded-full overflow-hidden"><div className="h-full bg-accent-warm rounded-full w-[65%]" /></div>
                        <div className="flex justify-between text-[13px]"><span className="text-text-secondary">Monthly total</span><span className="font-semibold text-text-primary">{"\u00A3"}31.80</span></div>
                        <div className="h-1.5 bg-surface rounded-full overflow-hidden"><div className="h-full bg-accent-red rounded-full w-[78%]" /></div>
                        <div className="flex justify-between text-[13px]"><span className="text-text-secondary">Annual projection</span><span className="font-semibold text-text-primary">{"\u00A3"}381.60</span></div>
                        <div className="h-1.5 bg-surface rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full w-[45%]" /></div>
                        <div className="p-3 bg-primary-ultra rounded-xl mt-2">
                          <p className="text-[13px] text-primary font-medium">Redirecting this spend could fund 85% of a weekend trip by December.</p>
                        </div>
                      </div>
                      {/* Blur overlay + CTA */}
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-[6px] z-10 rounded-[20px]" />
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-8">
                        <Lock size={44} className="text-primary mb-3" fill="#005FCC" />
                        <h4 className="text-[17px] font-bold text-text-primary mb-1">Financial Analysis</h4>
                        <p className="text-[13px] text-text-secondary mb-4">See how this purchase impacts your budget and savings goals</p>
                        <button className="h-[50px] px-8 bg-primary text-white rounded-[32px] text-[15px] font-semibold shadow-[0_4px_16px_rgba(0,95,204,0.3)]">Upgrade to Unlock</button>
                      </div>
                    </div>

                    {/* Slide 3 — Blueprint (locked) */}
                    <div className="w-full shrink-0 bg-white/95 backdrop-blur-xl p-5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] rounded-[20px] relative overflow-hidden">
                      {/* Faux content behind blur */}
                      <div className="space-y-3">
                        <h4 className="text-[15px] font-bold text-text-primary">Your Action Plan</h4>
                        <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-accent-green/20 flex items-center justify-center shrink-0 mt-0.5"><Check size={12} className="text-accent-green" /></div><div><p className="text-[13px] font-semibold text-text-primary">Set a weekly drinks budget</p><p className="text-[12px] text-text-secondary">Cap at {"\u00A3"}5/week for impulse beverages</p></div></div>
                        <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5"><Check size={12} className="text-primary" /></div><div><p className="text-[13px] font-semibold text-text-primary">Try the 24-hour rule</p><p className="text-[12px] text-text-secondary">Wait before non-essential purchases</p></div></div>
                        <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-accent-warm/20 flex items-center justify-center shrink-0 mt-0.5"><Check size={12} className="text-accent-warm" /></div><div><p className="text-[13px] font-semibold text-text-primary">Track social triggers</p><p className="text-[12px] text-text-secondary">Log when you buy out of social pressure</p></div></div>
                        <div className="p-3 bg-primary-ultra rounded-xl mt-2">
                          <p className="text-[13px] text-primary font-medium">Following this blueprint could save you {"\u00A3"}840/year.</p>
                        </div>
                      </div>
                      {/* Blur overlay + CTA */}
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-[6px] z-10 rounded-[20px]" />
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-8">
                        <Lock size={44} className="text-primary mb-3" fill="#005FCC" />
                        <h4 className="text-[17px] font-bold text-text-primary mb-1">Spending Blueprint</h4>
                        <p className="text-[13px] text-text-secondary mb-4">Get a personalised action plan to change this habit</p>
                        <button className="h-[50px] px-8 bg-primary text-white rounded-[32px] text-[15px] font-semibold shadow-[0_4px_16px_rgba(0,95,204,0.3)]">Upgrade to Unlock</button>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Alternatives based on OCEAN */}
                {/* Alternatives carousel */}
                <div className="mt-4">
                  <h4 className="text-[22px] font-bold text-white mb-1 px-1">Alternatives</h4>
                  {/* Dot indicators */}
                  <div className="flex justify-center gap-2 mb-3">
                    {[0, 1].map((i) => (
                      <button key={i} onClick={() => setAltTab(i)} className={`rounded-full transition-all duration-300 ${altTab === i ? "w-[24px] h-[8px] bg-white" : "w-[8px] h-[8px] bg-white/30"}`} />
                    ))}
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex gap-3 transition-transform duration-500 ease-out" style={{ transform: `translateX(calc(-${altTab * 100}% - ${altTab * 12}px))` }}
                      onTouchStart={(e) => { (e.currentTarget as HTMLElement).dataset.touchX = String(e.touches[0].clientX); }}
                      onTouchEnd={(e) => {
                        const startX = Number((e.currentTarget as HTMLElement).dataset.touchX);
                        const diff = e.changedTouches[0].clientX - startX;
                        if (diff < -50 && altTab < 1) setAltTab(altTab + 1);
                        if (diff > 50 && altTab > 0) setAltTab(altTab - 1);
                      }}
                      onMouseDown={(e) => { (e.currentTarget as HTMLElement).dataset.mouseX = String(e.clientX); }}
                      onMouseUp={(e) => {
                        const startX = Number((e.currentTarget as HTMLElement).dataset.mouseX);
                        const diff = e.clientX - startX;
                        if (diff < -50 && altTab < 1) setAltTab(altTab + 1);
                        if (diff > 50 && altTab > 0) setAltTab(altTab - 1);
                      }}
                    >
                      {/* Slide 1 — Same store */}
                      <div className="w-full shrink-0 bg-white/95 backdrop-blur-xl rounded-[20px] p-5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <h4 className="text-[15px] font-bold text-text-primary mb-1">Same Store</h4>
                        <p className="text-[12px] text-text-secondary mb-3">Cheaper options at Tesco</p>
                        <div className="space-y-2.5">
                          {[
                            { name: "Tesco Own Cola", price: "0.35", saving: "65%" },
                            { name: "Sparkling Water", price: "0.45", saving: "55%" },
                            { name: "Pepsi Max", price: "0.80", saving: "20%" },
                          ].map((alt) => (
                            <div key={alt.name} className="flex items-center gap-3 p-3 bg-surface rounded-[14px]">
                              <div className="w-[42px] h-[42px] rounded-[10px] bg-white border border-black/5 flex items-center justify-center shrink-0">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#AEAEB2" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-[14px] font-semibold text-text-primary">{alt.name}</span>
                                  <span className="text-[11px] font-semibold text-accent-green">{alt.saving} less</span>
                                </div>
                                <span className="text-[13px] text-text-secondary">{"\u00A3"}{alt.price}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Slide 2 — Other stores */}
                      <div className="w-full shrink-0 bg-white/95 backdrop-blur-xl rounded-[20px] p-5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <h4 className="text-[15px] font-bold text-text-primary mb-1">Other Stores</h4>
                        <p className="text-[12px] text-text-secondary mb-3">Better deals nearby</p>
                        <div className="space-y-2.5">
                          {[
                            { name: "Coca-Cola Original", price: "0.85", saving: "15%", store: "Aldi" },
                            { name: "Coca-Cola Original", price: "0.90", saving: "10%", store: "Lidl" },
                            { name: "Own Brand Cola", price: "0.25", saving: "75%", store: "Aldi" },
                          ].map((alt, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-surface rounded-[14px]">
                              <div className="w-[42px] h-[42px] rounded-[10px] bg-white border border-black/5 flex items-center justify-center shrink-0">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#AEAEB2" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-[14px] font-semibold text-text-primary">{alt.name}</span>
                                  <span className="text-[11px] font-semibold text-accent-green">{alt.saving} less</span>
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[13px] text-text-secondary">{"\u00A3"}{alt.price}</span>
                                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{alt.store}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="text-[22px] font-bold text-white mb-1 px-1 mt-4">Review</h4>

                {/* Star review */}
                <div className="bg-white/95 backdrop-blur-xl rounded-[20px] p-5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mt-2">
                  <h4 className="text-[15px] font-bold text-text-primary mb-1 text-center">Was this helpful?</h4>
                  <p className="text-[12px] text-text-secondary mb-4 text-center">Your feedback helps Faith learn your preferences</p>
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} onClick={() => { setRatingStars(s); if (!ratingComment) setTimeout(() => setRatingComment(true), 800); }} className="transition-transform duration-200 hover:scale-110 cursor-pointer">
                          <Star size={32} className={s <= ratingStars ? "text-primary" : "text-primary/20"} fill={s <= ratingStars ? "#005FCC" : "none"} />
                        </button>
                      ))}
                    </div>
                    {ratingStars > 0 && (
                      <p className="text-[13px] text-text-secondary">
                        {ratingStars <= 2 ? "We\u2019ll improve this for you" : ratingStars <= 4 ? "Thanks for the feedback!" : "Glad you found it helpful!"}
                      </p>
                    )}
                    {ratingComment && (
                      <div className="w-full flex flex-col items-center gap-3 animate-[fadeIn_0.3s_ease-out]">
                        <textarea placeholder="Any additional comments? (optional)" className="w-full h-[80px] p-3 bg-surface border border-black/5 rounded-[16px] text-[13px] text-text-primary outline-none resize-none placeholder:text-text-tertiary focus:border-primary focus:ring-2 focus:ring-primary/20" />
                        <button className="h-[44px] px-8 bg-primary text-white rounded-[32px] text-[14px] font-semibold shadow-[0_4px_16px_rgba(0,95,204,0.3)] cursor-pointer">Submit</button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SCAN RESULT PRO (unlocked) */}
          {screen === "scan-result-pro" && (
            <div className="h-full flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden"><BlueWaveBg id="scan-res-pro" animated /></div>

              {/* Header */}
              <div className="relative z-10 pt-[54px] px-5 pb-4">
                <div className="flex items-center gap-3">
                  <button onClick={() => goFromNav("scan")} className="w-[42px] h-[42px] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors shrink-0">
                    <ArrowRight size={20} className="text-white rotate-180" />
                  </button>
                  <h2 className="flex-1 font-sans text-[28px] font-bold text-white leading-none tracking-tight">Feels Like</h2>
                  <button onClick={() => { setProfileAnimating(true); setProfileOpen(true); requestAnimationFrame(() => requestAnimationFrame(() => setProfileAnimating(false))); }} className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[13px] font-semibold ring-[1.5px] ring-white/60 shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-full pointer-events-none" />
                    JS
                  </button>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pb-8 relative z-10">

                {/* Product card */}
                <div className="bg-white/95 backdrop-blur-xl rounded-[20px] p-4 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-4">
                  <div className="flex gap-4">
                    <div className="w-[90px] h-[90px] rounded-[14px] bg-surface flex items-center justify-center shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/coca-cola.png" alt="Coca-Cola" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-[17px] font-bold text-text-primary leading-tight">Coca-Cola Original</h3>
                      <p className="text-[13px] text-text-tertiary mt-0.5">330ml Can • Tesco</p>
                    </div>
                  </div>
                </div>

                {/* Price section — unlocked with edit */}
                <div className="mb-4">
                  {priceEditing ? (
                    <div className="bg-white/95 backdrop-blur-xl rounded-[20px] border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4 flex items-center gap-3">
                      <div className="flex-1">
                        <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider block mb-1">Actual Price</span>
                        <div className="flex items-center gap-0.5">
                          <span className="text-[32px] font-bold text-text-primary">{"\u00A3"}</span>
                          <input autoFocus defaultValue="1.00" className="text-[32px] font-bold text-text-primary leading-tight w-[90px] bg-transparent outline-none border-b-2 border-primary" />
                        </div>
                        <span className="text-[12px] text-primary font-semibold mt-0.5 block">press Update to save</span>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <button onClick={() => setPriceEditing(false)} className="h-[38px] px-5 rounded-[32px] bg-primary text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(0,95,204,0.3)] cursor-pointer">Update</button>
                        <button onClick={() => setPriceEditing(false)} className="h-[38px] px-5 rounded-[32px] bg-surface text-[13px] font-semibold text-text-secondary cursor-pointer">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <div onClick={() => setPriceEditing(true)} className="flex-1 bg-white/95 backdrop-blur-xl rounded-[20px] border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4 text-center cursor-pointer">
                        <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Actual Price</span>
                        <p className="text-[32px] font-bold text-text-primary leading-tight mt-1">{"\u00A3"}1.00</p>
                        <span className="text-[12px] text-primary font-semibold flex items-center justify-center gap-1">
                          <PenLine size={10} /> tap to edit
                        </span>
                      </div>
                      <div className="flex-1 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[20px] border border-white/20 p-4 text-center">
                        <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Feels Like</span>
                        <p className="text-[32px] font-bold text-white leading-tight mt-1">{"\u00A3"}3.80</p>
                        <span className="text-[12px] text-accent font-semibold">+{"\u00A3"}2.80</span>
                      </div>
                    </div>
                  )}
                </div>

                <h4 className="text-[22px] font-bold text-white mb-1 px-1">Reasoning</h4>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mb-3">
                  {[0, 1, 2].map((i) => (
                    <button key={i} onClick={() => setScanTab(i)} className={`rounded-full transition-all duration-300 ${scanTab === i ? "w-[24px] h-[8px] bg-white" : "w-[8px] h-[8px] bg-white/30"}`} />
                  ))}
                </div>

                {/* Psychology carousel — all unlocked */}
                <div className="relative overflow-hidden">
                  <div className="flex gap-3 transition-transform duration-500 ease-out" style={{ transform: `translateX(calc(-${scanTab * 100}% - ${scanTab * 12}px))` }}
                    onTouchStart={(e) => { (e.currentTarget as HTMLElement).dataset.touchX = String(e.touches[0].clientX); }}
                    onTouchEnd={(e) => {
                      const startX = Number((e.currentTarget as HTMLElement).dataset.touchX);
                      const diff = e.changedTouches[0].clientX - startX;
                      if (diff < -50 && scanTab < 2) setScanTab(scanTab + 1);
                      if (diff > 50 && scanTab > 0) setScanTab(scanTab - 1);
                    }}
                    onMouseDown={(e) => { (e.currentTarget as HTMLElement).dataset.mouseX = String(e.clientX); }}
                    onMouseUp={(e) => {
                      const startX = Number((e.currentTarget as HTMLElement).dataset.mouseX);
                      const diff = e.clientX - startX;
                      if (diff < -50 && scanTab < 2) setScanTab(scanTab + 1);
                      if (diff > 50 && scanTab > 0) setScanTab(scanTab - 1);
                    }}
                  >
                    {/* Slide 1 — OCEAN */}
                    <div className="w-full shrink-0 bg-white/95 backdrop-blur-xl p-5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] rounded-[20px]">
                      <h4 className="text-[15px] font-bold text-text-primary mb-3">Psychological</h4>
                      <div className="space-y-3">
                        {[
                          { trait: "Openness", score: 72, insight: "Novelty-seeking makes you grab familiar comforts", from: "#A855F7", to: "#C084FC" },
                          { trait: "Conscientiousness", score: 45, insight: "Lower planning means more spontaneous purchases", from: "#3B82F6", to: "#60A5FA" },
                          { trait: "Extraversion", score: 81, insight: "Social situations trigger impulse buys like this", from: "#FF6B6B", to: "#FF8E8E" },
                          { trait: "Agreeableness", score: 63, insight: "You find it hard to say no to social spending pressure", from: "#F97316", to: "#FB923C" },
                          { trait: "Neuroticism", score: 38, insight: "Low stress about money can lead to overlooking small costs", from: "#14B8A6", to: "#2DD4BF" },
                        ].map((t) => (
                          <div key={t.trait}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[13px] font-semibold text-text-primary">{t.trait}</span>
                              <span className="text-[12px] font-semibold" style={{ color: t.from }}>{t.score}th</span>
                            </div>
                            <div className="h-1.5 bg-surface rounded-full overflow-hidden mb-1.5">
                              <div className="h-full rounded-full" style={{ width: `${t.score}%`, background: `linear-gradient(90deg, ${t.from}, ${t.to})` }} />
                            </div>
                            <p className="text-[12px] text-text-secondary">{t.insight}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-primary-ultra rounded-xl">
                        <p className="text-[13px] text-primary font-medium"><strong>Faith says:</strong> This {"\u00A3"}1 purchase feels like {"\u00A3"}3.80 to your personality. Over a year, that adds up to ~{"\u00A3"}150 in hidden psychological cost.</p>
                      </div>
                    </div>

                    {/* Slide 2 — Financial (locked) */}
                    <div className="w-full shrink-0 bg-white/95 backdrop-blur-xl p-5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] rounded-[20px] relative overflow-hidden">
                      {/* Faux content behind blur */}
                      <div className="space-y-3">
                        <h4 className="text-[15px] font-bold text-text-primary">Monthly Impact</h4>
                        <div className="flex justify-between text-[13px]"><span className="text-text-secondary">Weekly spend (similar items)</span><span className="font-semibold text-text-primary">{"\u00A3"}7.40</span></div>
                        <div className="h-1.5 bg-surface rounded-full overflow-hidden"><div className="h-full bg-accent-warm rounded-full w-[65%]" /></div>
                        <div className="flex justify-between text-[13px]"><span className="text-text-secondary">Monthly total</span><span className="font-semibold text-text-primary">{"\u00A3"}31.80</span></div>
                        <div className="h-1.5 bg-surface rounded-full overflow-hidden"><div className="h-full bg-accent-red rounded-full w-[78%]" /></div>
                        <div className="flex justify-between text-[13px]"><span className="text-text-secondary">Annual projection</span><span className="font-semibold text-text-primary">{"\u00A3"}381.60</span></div>
                        <div className="h-1.5 bg-surface rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full w-[45%]" /></div>
                        <div className="p-3 bg-primary-ultra rounded-xl mt-2">
                          <p className="text-[13px] text-primary font-medium">Redirecting this spend could fund 85% of a weekend trip by December.</p>
                        </div>
                      </div>
                      {/* Blur overlay + CTA */}
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-[6px] z-10 rounded-[20px]" />
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-8">
                        <Lock size={44} className="text-primary mb-3" fill="#005FCC" />
                        <h4 className="text-[17px] font-bold text-text-primary mb-1">Financial Analysis</h4>
                        <p className="text-[13px] text-text-secondary mb-4">See how this purchase impacts your budget and savings goals</p>
                        <button className="h-[50px] px-8 bg-primary text-white rounded-[32px] text-[15px] font-semibold shadow-[0_4px_16px_rgba(0,95,204,0.3)]">Upgrade to Unlock</button>
                      </div>
                    </div>

                    {/* Slide 3 — Blueprint (locked) */}
                    <div className="w-full shrink-0 bg-white/95 backdrop-blur-xl p-5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] rounded-[20px] relative overflow-hidden">
                      {/* Faux content behind blur */}
                      <div className="space-y-3">
                        <h4 className="text-[15px] font-bold text-text-primary">Your Action Plan</h4>
                        <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-accent-green/20 flex items-center justify-center shrink-0 mt-0.5"><Check size={12} className="text-accent-green" /></div><div><p className="text-[13px] font-semibold text-text-primary">Set a weekly drinks budget</p><p className="text-[12px] text-text-secondary">Cap at {"\u00A3"}5/week for impulse beverages</p></div></div>
                        <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5"><Check size={12} className="text-primary" /></div><div><p className="text-[13px] font-semibold text-text-primary">Try the 24-hour rule</p><p className="text-[12px] text-text-secondary">Wait before non-essential purchases</p></div></div>
                        <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-accent-warm/20 flex items-center justify-center shrink-0 mt-0.5"><Check size={12} className="text-accent-warm" /></div><div><p className="text-[13px] font-semibold text-text-primary">Track social triggers</p><p className="text-[12px] text-text-secondary">Log when you buy out of social pressure</p></div></div>
                        <div className="p-3 bg-primary-ultra rounded-xl mt-2">
                          <p className="text-[13px] text-primary font-medium">Following this blueprint could save you {"\u00A3"}840/year.</p>
                        </div>
                      </div>
                      {/* Blur overlay + CTA */}
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-[6px] z-10 rounded-[20px]" />
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-8">
                        <Lock size={44} className="text-primary mb-3" fill="#005FCC" />
                        <h4 className="text-[17px] font-bold text-text-primary mb-1">Spending Blueprint</h4>
                        <p className="text-[13px] text-text-secondary mb-4">Get a personalised action plan to change this habit</p>
                        <button className="h-[50px] px-8 bg-primary text-white rounded-[32px] text-[15px] font-semibold shadow-[0_4px_16px_rgba(0,95,204,0.3)]">Upgrade to Unlock</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alternatives */}
                <div className="mt-4">
                  <h4 className="text-[22px] font-bold text-white mb-1 px-1">Alternatives</h4>
                  <div className="flex justify-center gap-2 mb-3">
                    {[0, 1].map((i) => (
                      <button key={i} onClick={() => setAltTab(i)} className={`rounded-full transition-all duration-300 ${altTab === i ? "w-[24px] h-[8px] bg-white" : "w-[8px] h-[8px] bg-white/30"}`} />
                    ))}
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex gap-3 transition-transform duration-500 ease-out" style={{ transform: `translateX(calc(-${altTab * 100}% - ${altTab * 12}px))` }}
                      onTouchStart={(e) => { (e.currentTarget as HTMLElement).dataset.touchX = String(e.touches[0].clientX); }}
                      onTouchEnd={(e) => {
                        const startX = Number((e.currentTarget as HTMLElement).dataset.touchX);
                        const diff = e.changedTouches[0].clientX - startX;
                        if (diff < -50 && altTab < 1) setAltTab(altTab + 1);
                        if (diff > 50 && altTab > 0) setAltTab(altTab - 1);
                      }}
                      onMouseDown={(e) => { (e.currentTarget as HTMLElement).dataset.mouseX = String(e.clientX); }}
                      onMouseUp={(e) => {
                        const startX = Number((e.currentTarget as HTMLElement).dataset.mouseX);
                        const diff = e.clientX - startX;
                        if (diff < -50 && altTab < 1) setAltTab(altTab + 1);
                        if (diff > 50 && altTab > 0) setAltTab(altTab - 1);
                      }}
                    >
                      <div className="w-full shrink-0 bg-white/95 backdrop-blur-xl rounded-[20px] p-5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <h4 className="text-[15px] font-bold text-text-primary mb-1">Same Store</h4>
                        <p className="text-[12px] text-text-secondary mb-3">Cheaper options at Tesco</p>
                        <div className="space-y-2.5">
                          {[
                            { name: "Tesco Own Cola", price: "0.35", saving: "65%" },
                            { name: "Sparkling Water", price: "0.45", saving: "55%" },
                            { name: "Pepsi Max", price: "0.80", saving: "20%" },
                          ].map((alt) => (
                            <div key={alt.name} className="flex items-center gap-3 p-3 bg-surface rounded-[14px]">
                              <div className="w-[42px] h-[42px] rounded-[10px] bg-white border border-black/5 flex items-center justify-center shrink-0">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#AEAEB2" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-[14px] font-semibold text-text-primary">{alt.name}</span>
                                  <span className="text-[11px] font-semibold text-accent-green">{alt.saving} less</span>
                                </div>
                                <span className="text-[13px] text-text-secondary">{"\u00A3"}{alt.price}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="w-full shrink-0 bg-white/95 backdrop-blur-xl rounded-[20px] p-5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <h4 className="text-[15px] font-bold text-text-primary mb-1">Other Stores</h4>
                        <p className="text-[12px] text-text-secondary mb-3">Better deals nearby</p>
                        <div className="space-y-2.5">
                          {[
                            { name: "Coca-Cola Original", price: "0.85", saving: "15%", store: "Aldi" },
                            { name: "Coca-Cola Original", price: "0.90", saving: "10%", store: "Lidl" },
                            { name: "Own Brand Cola", price: "0.25", saving: "75%", store: "Aldi" },
                          ].map((alt, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-surface rounded-[14px]">
                              <div className="w-[42px] h-[42px] rounded-[10px] bg-white border border-black/5 flex items-center justify-center shrink-0">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#AEAEB2" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-[14px] font-semibold text-text-primary">{alt.name}</span>
                                  <span className="text-[11px] font-semibold text-accent-green">{alt.saving} less</span>
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[13px] text-text-secondary">{"\u00A3"}{alt.price}</span>
                                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{alt.store}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Star review */}
                <h4 className="text-[22px] font-bold text-white mb-1 px-1 mt-4">Review</h4>
                <div className="bg-white/95 backdrop-blur-xl rounded-[20px] p-5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mt-2">
                  <h4 className="text-[15px] font-bold text-text-primary mb-1 text-center">Was this helpful?</h4>
                  <p className="text-[12px] text-text-secondary mb-4 text-center">Your feedback helps Faith learn your preferences</p>
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} onClick={() => { setRatingStars(s); if (!ratingComment) setTimeout(() => setRatingComment(true), 800); }} className="transition-transform duration-200 hover:scale-110 cursor-pointer">
                          <Star size={32} className={s <= ratingStars ? "text-primary" : "text-primary/20"} fill={s <= ratingStars ? "#005FCC" : "none"} />
                        </button>
                      ))}
                    </div>
                    {ratingStars > 0 && (
                      <p className="text-[13px] text-text-secondary">
                        {ratingStars <= 2 ? "We\u2019ll improve this for you" : ratingStars <= 4 ? "Thanks for the feedback!" : "Glad you found it helpful!"}
                      </p>
                    )}
                    {ratingComment && (
                      <div className="w-full flex flex-col items-center gap-3 animate-[fadeIn_0.3s_ease-out]">
                        <textarea placeholder="Any additional comments? (optional)" className="w-full h-[80px] p-3 bg-surface border border-black/5 rounded-[16px] text-[13px] text-text-primary outline-none resize-none placeholder:text-text-tertiary focus:border-primary focus:ring-2 focus:ring-primary/20" />
                        <button className="h-[44px] px-8 bg-primary text-white rounded-[32px] text-[14px] font-semibold shadow-[0_4px_16px_rgba(0,95,204,0.3)] cursor-pointer">Submit</button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* BANKING (locked) */}
          {screen === "banking" && (
            <div className="h-full flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden"><BlueWaveBg id="banking" animated /></div>
              <div className="relative z-10 pt-[54px] px-5 pb-4">
                <h2 className="font-sans text-[28px] font-bold text-white leading-none tracking-tight">Banking</h2>
                <p className="text-[12px] text-white/50 mt-1">Manage your accounts and cards</p>
              </div>
              <div className="flex-1 relative z-10 px-5">
                <div className="bg-white/95 backdrop-blur-xl rounded-[20px] p-5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-3">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[15px] font-bold text-text-primary">Current Account</span>
                    <span className="text-[20px] font-bold text-text-primary">{"\u00A3"}2,450.80</span>
                  </div>
                  <div className="h-1.5 bg-surface rounded-full overflow-hidden mb-2"><div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-[65%]" /></div>
                  <span className="text-[12px] text-text-secondary">65% of monthly budget remaining</span>
                </div>
                <div className="bg-white/95 backdrop-blur-xl rounded-[20px] p-4 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-3">
                  {["Direct Debit — Netflix", "Card Payment — Tesco", "Transfer — J. Smith"].map((t, i) => (
                    <div key={t} className={`flex justify-between py-3 ${i < 2 ? "border-b border-gray-100" : ""}`}>
                      <span className="text-[13px] text-text-primary">{t}</span>
                      <span className="text-[13px] font-semibold text-text-primary">-{"\u00A3"}{(i + 1) * 12}.99</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Blur overlay — covers full screen including header */}
              <div className="absolute inset-0 backdrop-blur-[6px] z-20 flex flex-col items-center justify-center px-10" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.6) 15%, rgba(255,255,255,0.6) 85%, transparent 100%)" }}>
                <Lock size={44} className="text-primary mb-3" fill="#005FCC" />
                <h4 className="text-[20px] font-bold text-text-primary mb-1">Banking</h4>
                <p className="text-[13px] text-text-secondary mb-5 text-center">Connect your bank accounts and track spending in real time</p>
                <button className="h-[50px] px-8 bg-primary text-white rounded-[32px] text-[15px] font-semibold shadow-[0_4px_16px_rgba(0,95,204,0.3)]">Upgrade to Unlock</button>
              </div>
              {/* Navbar */}
              <div className="relative z-30 pb-8 pt-2 px-5">
                <div className="liquid-glass rounded-[32px] flex items-center justify-between px-2 h-[50px] relative">
                  <button onClick={() => goFromNav("profile")} className="flex flex-col items-center justify-center w-[56px]">
                    <Brain size={18} className="text-white/70" />
                    <span className="text-[9px] text-white/50 mt-0.5">Profile</span>
                  </button>
                  <button onClick={() => goFromNav("faith")} className="flex flex-col items-center justify-center w-[56px]">
                    <MessageCircle size={18} className="text-white/70" />
                    <span className="text-[9px] text-white/50 mt-0.5">Faith</span>
                  </button>
                  <button onClick={() => goFromNav("scan")} className="flex flex-col items-center justify-center w-[56px]">
                    <Camera size={18} className="text-white/70" />
                    <span className="text-[9px] text-white/50 mt-0.5">Feels Like</span>
                  </button>
                  <button className="flex flex-col items-center justify-center w-[56px]">
                    <Landmark size={18} className="text-white" />
                    <span className="text-[9px] text-white mt-0.5 font-semibold">Banking</span>
                  </button>
                  <button onClick={() => goFromNav("analytics")} className="flex flex-col items-center justify-center w-[56px]">
                    <BarChart3 size={18} className="text-white/70" />
                    <span className="text-[9px] text-white/50 mt-0.5">Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ANALYTICS (locked) */}
          {screen === "analytics" && (
            <div className="h-full flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden"><BlueWaveBg id="analytics" animated /></div>
              <div className="relative z-10 pt-[54px] px-5 pb-4">
                <h2 className="font-sans text-[28px] font-bold text-white leading-none tracking-tight">Analytics</h2>
                <p className="text-[12px] text-white/50 mt-1">Financial insights and trends</p>
              </div>
              <div className="flex-1 relative z-10 px-5">
                {/* Faux content */}
                <div className="bg-white/95 backdrop-blur-xl rounded-[20px] p-5 border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-3">
                  <h4 className="text-[15px] font-bold text-text-primary mb-3">Monthly Overview</h4>
                  <div className="flex gap-3 mb-3">
                    <div className="flex-1 p-3 bg-surface rounded-xl text-center">
                      <span className="text-[11px] text-text-tertiary block">Income</span>
                      <span className="text-[18px] font-bold text-accent-green">{"\u00A3"}3,200</span>
                    </div>
                    <div className="flex-1 p-3 bg-surface rounded-xl text-center">
                      <span className="text-[11px] text-text-tertiary block">Spent</span>
                      <span className="text-[18px] font-bold text-accent-red">{"\u00A3"}1,840</span>
                    </div>
                    <div className="flex-1 p-3 bg-surface rounded-xl text-center">
                      <span className="text-[11px] text-text-tertiary block">Saved</span>
                      <span className="text-[18px] font-bold text-primary">{"\u00A3"}1,360</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[["Food & Drink", 35], ["Transport", 20], ["Entertainment", 25], ["Bills", 15]].map(([label, pct]) => (
                      <div key={label as string}>
                        <div className="flex justify-between text-[12px] mb-0.5"><span className="text-text-secondary">{label}</span><span className="font-semibold text-text-primary">{pct}%</span></div>
                        <div className="h-1.5 bg-surface rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${pct}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Blur overlay — covers full screen including header */}
              <div className="absolute inset-0 backdrop-blur-[6px] z-20 flex flex-col items-center justify-center px-10" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.6) 15%, rgba(255,255,255,0.6) 85%, transparent 100%)" }}>
                <Lock size={44} className="text-primary mb-3" fill="#005FCC" />
                <h4 className="text-[20px] font-bold text-text-primary mb-1">Analytics</h4>
                <p className="text-[13px] text-text-secondary mb-5 text-center">Track spending patterns, set budgets, and visualise your financial health</p>
                <button className="h-[50px] px-8 bg-primary text-white rounded-[32px] text-[15px] font-semibold shadow-[0_4px_16px_rgba(0,95,204,0.3)]">Upgrade to Unlock</button>
              </div>
              {/* Navbar */}
              <div className="relative z-30 pb-8 pt-2 px-5">
                <div className="liquid-glass rounded-[32px] flex items-center justify-between px-2 h-[50px] relative">
                  <button onClick={() => goFromNav("profile")} className="flex flex-col items-center justify-center w-[56px]">
                    <Brain size={18} className="text-white/70" />
                    <span className="text-[9px] text-white/50 mt-0.5">Profile</span>
                  </button>
                  <button onClick={() => goFromNav("faith")} className="flex flex-col items-center justify-center w-[56px]">
                    <MessageCircle size={18} className="text-white/70" />
                    <span className="text-[9px] text-white/50 mt-0.5">Faith</span>
                  </button>
                  <button onClick={() => goFromNav("scan")} className="flex flex-col items-center justify-center w-[56px]">
                    <Camera size={18} className="text-white/70" />
                    <span className="text-[9px] text-white/50 mt-0.5">Feels Like</span>
                  </button>
                  <button onClick={() => goFromNav("banking")} className="flex flex-col items-center justify-center w-[56px]">
                    <Landmark size={18} className="text-white/70" />
                    <span className="text-[9px] text-white/50 mt-0.5">Banking</span>
                  </button>
                  <button className="flex flex-col items-center justify-center w-[56px]">
                    <BarChart3 size={18} className="text-white" />
                    <span className="text-[9px] text-white mt-0.5 font-semibold">Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* History drawer — full screen, GPT style */}
          <div
            className="absolute inset-0 z-[1000] flex flex-col overflow-hidden"
            style={{
              transform: drawerOpen ? `translateX(${Math.min(0, drawerX)}px)` : "translateX(-100%)",
              transition: touchStart !== null ? "none" : "transform 350ms cubic-bezier(0.32, 0.72, 0, 1)",
            }}
            onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
            onTouchMove={(e) => {
              if (touchStart === null) return;
              const diff = e.touches[0].clientX - touchStart;
              if (diff < 0) setDrawerX(diff);
            }}
            onTouchEnd={() => {
              if (drawerX < -80) setDrawerOpen(false);
              setDrawerX(0);
              setTouchStart(null);
            }}
            onMouseDown={(e) => setTouchStart(e.clientX)}
            onMouseMove={(e) => {
              if (touchStart === null || e.buttons !== 1) return;
              const diff = e.clientX - touchStart;
              if (diff < 0) setDrawerX(diff);
            }}
            onMouseUp={() => {
              if (drawerX < -80) setDrawerOpen(false);
              setDrawerX(0);
              setTouchStart(null);
            }}
            onMouseLeave={() => {
              if (touchStart !== null) {
                if (drawerX < -80) setDrawerOpen(false);
                setDrawerX(0);
                setTouchStart(null);
              }
            }}
          >
            <div className="absolute inset-0 overflow-hidden z-0"><BlueWaveBg id="drawer" animated /></div>
            {/* Header — matches app header positioning */}
            <div className="relative z-10 pt-[54px] px-5 pb-2">
              <div className="flex items-center gap-3 h-[50px]">
                {drawerSearchOpen ? (
                  <div className="flex-1 h-[50px] rounded-[32px] bg-white/10 border border-white/15 flex items-center pl-2 pr-5 gap-2">
                    <button onClick={() => setDrawerSearchOpen(false)} className="w-[28px] h-[28px] flex items-center justify-center shrink-0">
                      <ArrowRight size={18} className="text-white/50 rotate-180" />
                    </button>
                    <input autoFocus className="text-[15px] text-white flex-1 bg-transparent outline-none placeholder:text-white/30" placeholder="Search" />
                  </div>
                ) : (
                  <>
                    <button onClick={() => setDrawerOpen(false)} className="w-[42px] h-[42px] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors shrink-0">
                      <X size={20} className="text-white" />
                    </button>
                    <h3 className="text-[22px] font-bold text-white tracking-tight flex-1"></h3>
                    <button onClick={() => setDrawerSearchOpen(true)} className="w-[38px] h-[38px] rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Drawer subtitle */}
            <div className="relative z-10 px-5 pb-3">
              <h2 className="font-sans text-[34px] font-bold text-white leading-none tracking-tight">{drawerSource === "faith" ? "History — Faith" : "History — Feels Like"}</h2>
            </div>

            {/* History items */}
            <div className="relative z-10 flex-1 overflow-y-auto hide-scrollbar px-5 space-y-3">
              {(drawerSource === "faith" ? [
                { label: "Today", items: ["Why do I spend so much on weekends?", "Social spending analysis", "Weekly budget check", "Help me save more"] },
                { label: "Yesterday", items: ["Monthly savings goal", "Coffee habit tracker", "Am I overspending?"] },
                { label: "Last 7 days", items: ["OCEAN profile review", "Subscription audit", "Rent vs buy calculator", "Holiday budget planner"] },
              ] : [
                { label: "Today", items: ["Tesco barcode scan", "Amazon impulse buy check"] },
                { label: "Yesterday", items: ["Sainsbury\u2019s grocery scan", "Zara price scan", "Costa coffee scan"] },
                { label: "Last 7 days", items: ["Energy bill comparison", "Car insurance renewal", "Gym membership scan", "Takeaway receipt scan"] },
              ]).map((group) => (
                <div key={group.label}>
                  <span className="text-[18px] font-bold text-white drop-shadow-sm px-1 block mb-2">{group.label}</span>
                  <div className="bg-white/8 rounded-[16px] border border-white/10 overflow-hidden">
                    {group.items.map((t, i) => (
                      <button key={t} className={`w-full px-4 py-3 hover:bg-white/5 transition-colors text-left ${i < group.items.length - 1 ? "border-b border-white/10" : ""}`}>
                        <span className="text-[14px] text-white/70">{t}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* New chat FAB */}
            <div className="absolute bottom-8 right-5 z-10">
              <button onClick={() => setDrawerOpen(false)} className="group h-[50px] rounded-full bg-white/10 border border-white/15 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:bg-primary hover:border-primary transition-all duration-300 px-3.5 gap-0 hover:gap-2 hover:px-5 hover:shadow-[0_4px_24px_rgba(0,95,204,0.4)]">
                {drawerSource === "faith" ? <MessageCircle size={20} className="text-white shrink-0" /> : <Camera size={20} className="text-white shrink-0" />}
                <span className="text-[15px] font-semibold text-white max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300 whitespace-nowrap">{drawerSource === "faith" ? "New Chat" : "New Scan"}</span>
              </button>
            </div>

          </div>

        </PhoneFrame>
      </main>
    </div>
  );
}

/* OCEAN standalone header */
function OceanHeader({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative z-[100] pt-[54px] px-5 pb-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-[42px] h-[42px] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
        </button>
        <h2 className="flex-1 font-sans text-[28px] font-bold text-white leading-none tracking-tight">Your Profile</h2>
      </div>
      <p className="text-[12px] text-white/50 ml-[55px] -mt-0.5">OCEAN Personality Assessment</p>
    </div>
  );
}

/* Reusable blue wave background */
function BlueWaveBg({ id, animated = false }: { id: string; animated?: boolean }) {
  const bands = [
    "M443,-50 C460,250 100,350 -50,550 C-80,650 50,800 -50,902 L443,902 Z",
    "M443,-150 C450,150 50,250 -100,420 C-130,530 30,700 -50,902 L443,902 Z",
    "M443,-250 C440,80 20,170 -150,300 C-180,400 10,580 -50,902 L443,902 Z",
    "M443,400 C350,550 200,750 100,820 C50,860 0,840 -50,902 L443,902 Z",
  ];
  const driftClasses = ["wave-drift-1", "wave-drift-2", "wave-drift-3", "wave-drift-4"];
  const gradIds = [`${id}-arc1`, `${id}-arc2`, `${id}-arc3`, `${id}-arc4`];

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 393 852" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-base`} x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#3CB8F0" />
          <stop offset="50%" stopColor="#0A6FE8" />
          <stop offset="100%" stopColor="#0035A0" />
        </linearGradient>
        <linearGradient id={`${id}-arc1`} x1="0.8" y1="0" x2="0.2" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#A8EAFF" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#70D8FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#5ED4FF" stopOpacity="0.05" />
          {animated && <animateTransform attributeName="gradientTransform" type="translate" values="0 -0.3; 0 0.3; 0 -0.3" dur="6s" repeatCount="indefinite" />}
        </linearGradient>
        <linearGradient id={`${id}-arc2`} x1="0.7" y1="0" x2="0.3" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#6DDDFF" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#44BBFF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1A90FF" stopOpacity="0.05" />
          {animated && <animateTransform attributeName="gradientTransform" type="translate" values="0 0.3; 0 -0.3; 0 0.3" dur="7s" repeatCount="indefinite" />}
        </linearGradient>
        <linearGradient id={`${id}-arc3`} x1="0.6" y1="0" x2="0.4" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#50C8FF" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#2AA0F0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0A6FE8" stopOpacity="0.05" />
          {animated && <animateTransform attributeName="gradientTransform" type="translate" values="0 -0.2; 0 0.4; 0 -0.2" dur="8s" repeatCount="indefinite" />}
        </linearGradient>
        <linearGradient id={`${id}-arc4`} x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#1A5FAA" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#0D4080" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#003070" stopOpacity="0.05" />
          {animated && <animateTransform attributeName="gradientTransform" type="translate" values="0 0.2; 0 -0.3; 0 0.2" dur="5s" repeatCount="indefinite" />}
        </linearGradient>
      </defs>
      <rect width="393" height="852" fill={`url(#${id}-base)`} />
      {bands.map((d, i) => (
        <path key={i} className={animated ? driftClasses[i] : undefined} d={d} fill={`url(#${gradIds[i]})`} />
      ))}
    </svg>
  );
}

