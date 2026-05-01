import { useState, useEffect, useRef } from "react";
import {
  Home, Archive, Briefcase, Package, Heart, Star, MapPin, Phone,
  Mail, Instagram, Facebook, ChevronDown, Check, Sparkles, Leaf,
  Clock, RefreshCw, Calendar, Gift, Tag, ShoppingBag, ArrowRight,
  Menu, X
} from "lucide-react";

/* ─── Google Fonts: Cormorant Garamond (display) + DM Sans (body) ─── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: #faf9f6; color: #2c2c2c; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-8px); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    .animate-fadeUp   { animation: fadeUp  0.8s ease both; }
    .animate-fadeIn   { animation: fadeIn  0.6s ease both; }
    .animate-float    { animation: float   4s ease-in-out infinite; }

    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-500 { animation-delay: 0.5s; }

    .font-display { font-family: 'Cormorant Garamond', serif; }
    .font-body    { font-family: 'DM Sans', sans-serif; }

    .nav-link {
      position: relative; font-size: 0.85rem; letter-spacing: 0.08em;
      text-transform: uppercase; font-weight: 500; color: #2c2c2c;
      text-decoration: none; padding-bottom: 2px;
      transition: color 0.2s;
    }
    .nav-link::after {
      content: ''; position: absolute; bottom: 0; left: 0;
      width: 0; height: 1px; background: #7a9b76;
      transition: width 0.3s ease;
    }
    .nav-link:hover::after { width: 100%; }
    .nav-link:hover { color: #7a9b76; }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: #7a9b76; color: #fff; border: none; cursor: pointer;
      padding: 14px 32px; border-radius: 2px; font-family: 'DM Sans', sans-serif;
      font-size: 0.85rem; font-weight: 500; letter-spacing: 0.1em;
      text-transform: uppercase; text-decoration: none;
      transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
      box-shadow: 0 4px 18px rgba(122,155,118,0.3);
    }
    .btn-primary:hover {
      background: #5f7d5b; transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(122,155,118,0.4);
    }
    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: #7a9b76;
      border: 1.5px solid #7a9b76; cursor: pointer;
      padding: 13px 30px; border-radius: 2px; font-family: 'DM Sans', sans-serif;
      font-size: 0.85rem; font-weight: 500; letter-spacing: 0.1em;
      text-transform: uppercase; text-decoration: none;
      transition: all 0.25s;
    }
    .btn-outline:hover { background: #7a9b76; color: #fff; transform: translateY(-2px); }

    .service-card {
      background: #fff; border: 1px solid #e8e3d8; border-radius: 3px;
      padding: 32px 28px; transition: all 0.35s ease;
      position: relative; overflow: hidden;
    }
    .service-card::before {
      content: ''; position: absolute; top: 0; left: 0;
      width: 3px; height: 0; background: #7a9b76;
      transition: height 0.35s ease;
    }
    .service-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.08); border-color: #c8d9c5; }
    .service-card:hover::before { height: 100%; }

    .package-card {
      border-radius: 3px; padding: 40px 32px;
      transition: all 0.35s ease; position: relative; overflow: hidden;
    }
    .package-card:hover { transform: translateY(-8px); box-shadow: 0 24px 60px rgba(0,0,0,0.1); }

    .section-label {
      font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
      font-weight: 600; color: #7a9b76; display: flex; align-items: center; gap: 8px;
    }
    .section-label::before {
      content: ''; display: inline-block; width: 28px; height: 1px; background: #7a9b76;
    }

    .divider {
      width: 48px; height: 2px;
      background: linear-gradient(90deg, #7a9b76, #b5c7b2);
      margin: 0 auto; border-radius: 99px;
    }

    .pain-card {
      padding: 32px; border-radius: 3px; background: rgba(255,255,255,0.7);
      border: 1px solid rgba(232,227,216,0.6); backdrop-filter: blur(8px);
      transition: all 0.3s ease;
    }
    .pain-card:hover { background: rgba(255,255,255,0.95); box-shadow: 0 12px 40px rgba(0,0,0,0.06); }

    .perk-item {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 20px; border-radius: 3px; transition: background 0.25s;
    }
    .perk-item:hover { background: rgba(122,155,118,0.06); }

    input, textarea, select {
      font-family: 'DM Sans', sans-serif;
      width: 100%; padding: 13px 16px;
      background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2);
      border-radius: 2px; color: #fff; font-size: 0.9rem; outline: none;
      transition: border-color 0.25s;
    }
    input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.45); }
    input:focus, textarea:focus { border-color: rgba(255,255,255,0.6); }

    .hero-img-placeholder {
      background: linear-gradient(135deg, #e8f0e6 0%, #d4e2d0 40%, #c2d4bd 100%);
      position: relative; overflow: hidden;
    }
    .hero-img-placeholder::after {
      content: ''; position: absolute; inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237a9b76' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    .grain {
      position: relative;
    }
    .grain::before {
      content: ''; position: absolute; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none; z-index: 1; opacity: 0.4;
    }
  `}</style>
);

/* ─── Decorative leaf SVG ─── */
const LeafDeco = ({ style = {}, opacity = 0.12 }) => (
  <svg viewBox="0 0 120 120" style={{ position: "absolute", pointerEvents: "none", ...style }} opacity={opacity}>
    <path d="M60 10 C90 10, 110 40, 110 60 C110 80, 90 110, 60 110 C30 110, 10 80, 10 60 C10 40, 30 10, 60 10Z"
      fill="#7a9b76" />
    <path d="M60 10 L60 110" stroke="#5f7d5b" strokeWidth="1.5" fill="none" opacity="0.4" />
    <path d="M60 40 L80 30" stroke="#5f7d5b" strokeWidth="1" fill="none" opacity="0.3" />
    <path d="M60 55 L85 50" stroke="#5f7d5b" strokeWidth="1" fill="none" opacity="0.3" />
    <path d="M60 70 L80 72" stroke="#5f7d5b" strokeWidth="1" fill="none" opacity="0.3" />
  </svg>
);

/* ─── HERO IMAGE PLACEHOLDER ─── */
const HeroImage = () => (
  <div className="hero-img-placeholder" style={{ width: "100%", height: "100%", minHeight: 480, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
    <LeafDeco style={{ top: -20, right: -20, width: 140, height: 140 }} opacity={0.15} />
    <LeafDeco style={{ bottom: 20, left: -10, width: 100, height: 100, transform: "rotate(120deg)" }} opacity={0.1} />
    <div style={{ zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(122,155,118,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Home size={32} color="#5f7d5b" />
      </div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#5f7d5b", fontStyle: "italic", opacity: 0.8 }}>
        A beautifully organized home
      </p>
    </div>
  </div>
);

/* ─── NAV ─── */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "Services", href: "#services" },
    { label: "Packages", href: "#packages" },
    { label: "About", href: "#difference" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "14px 0" : "22px 0",
      background: scrolled ? "rgba(250,249,246,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(232,227,216,0.8)" : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "#7a9b76", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Leaf size={15} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 600, color: "#2c2c2c", lineHeight: 1 }}>
                Sarah's Sorted Spaces
              </div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#7a9b76", fontWeight: 600, marginTop: 2 }}>
                Professional Organizing
              </div>
            </div>
          </div>
        </a>
        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }} className="desktop-nav">
          {links.map(l => (
            <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a href="#contact" className="btn-primary" style={{ padding: "10px 22px", fontSize: "0.78rem" }}>Book a Consult</a>
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer" }} className="mobile-menu-btn">
          {open ? <X size={24} color="#2c2c2c" /> : <Menu size={24} color="#2c2c2c" />}
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div style={{ background: "#faf9f6", borderTop: "1px solid #e8e3d8", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {links.map(l => (
            <a key={l.label} href={l.href} className="nav-link" onClick={() => setOpen(false)} style={{ fontSize: "1rem", padding: "6px 0" }}>{l.label}</a>
          ))}
          <a href="#contact" className="btn-primary" onClick={() => setOpen(false)} style={{ marginTop: 8, justifyContent: "center" }}>Book a Consult</a>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: block !important; } }
      `}</style>
    </nav>
  );
};

/* ─── HERO ─── */
const Hero = () => (
  <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 24px 80px", background: "linear-gradient(165deg, #f7f5f0 0%, #eef4ec 55%, #f0ede7 100%)", position: "relative", overflow: "hidden" }}>
    <LeafDeco style={{ top: -60, right: "8%", width: 320, height: 320 }} opacity={0.07} />
    <LeafDeco style={{ bottom: -80, left: "2%", width: 260, height: 260, transform: "rotate(200deg)" }} opacity={0.05} />
    <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
      {/* Left */}
      <div className="animate-fadeUp">
        <div className="section-label animate-fadeUp" style={{ marginBottom: 24 }}>
          Howard County, MD
        </div>
        <h1 className="font-display animate-fadeUp delay-100" style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)", lineHeight: 1.12, fontWeight: 300, color: "#1e2820", marginBottom: 24, letterSpacing: "-0.01em" }}>
          Your Home,{" "}
          <em style={{ fontStyle: "italic", color: "#7a9b76" }}>Beautifully</em>{" "}
          Sorted.
        </h1>
        <p className="animate-fadeUp delay-200" style={{ fontSize: "1.1rem", lineHeight: 1.75, color: "#5a5a5a", marginBottom: 16, fontWeight: 300, maxWidth: 480 }}>
          Reclaim your peace of mind and the spaces you love. Sarah's Sorted Spaces
          transforms chaos into calm, one room at a time.
        </p>
        <p className="animate-fadeUp delay-300" style={{ fontSize: "0.9rem", color: "#8a8a8a", marginBottom: 40, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>
          Serving Elkridge · Columbia · Ellicott City & beyond
        </p>
        <div className="animate-fadeUp delay-400" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href="#contact" className="btn-primary">
            Book a Consultation <ArrowRight size={15} />
          </a>
          <a href="#services" className="btn-outline">
            Explore Services
          </a>
        </div>
        <div className="animate-fadeUp delay-500" style={{ marginTop: 48, display: "flex", gap: 32 }}>
          {[["500+", "Spaces Organized"], ["5★", "Average Rating"], ["8+", "Years Experience"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 600, color: "#7a9b76" }}>{n}</div>
              <div style={{ fontSize: "0.75rem", color: "#8a8a8a", letterSpacing: "0.05em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Right: image */}
      <div className="animate-fadeIn delay-300" style={{ borderRadius: 3, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.1)" }}>
        <HeroImage />
      </div>
    </div>
    <a href="#why" style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", color: "#7a9b76", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase" }} className="animate-float">
      <span>Scroll</span>
      <ChevronDown size={16} />
    </a>
    <style>{`
      @media (max-width: 900px) {
        #hero > div { grid-template-columns: 1fr !important; }
        #hero > div > div:last-child { display: none; }
      }
    `}</style>
  </section>
);

/* ─── WHY SECTION ─── */
const PainPoints = () => {
  const items = [
    { icon: <Archive size={24} color="#7a9b76" />, title: "The Sunday Dread", body: "That sinking feeling when you can't find what you need, and getting out the door turns into a morning battle every single day." },
    { icon: <Heart size={24} color="#7a9b76" />, title: "The Mental Load", body: "When clutter fills your physical space, it fills your mind too — stealing focus, energy, and the simple pleasure of being at home." },
    { icon: <Sparkles size={24} color="#7a9b76" />, title: "The Revolving Door", body: "You've organized before, but without sustainable systems, clutter always creeps back. You deserve solutions that actually last." },
    { icon: <Home size={24} color="#7a9b76" />, title: "A Home That Works for You", body: "When your home runs smoothly, everything else does too. Imagine starting each day with clarity, calm, and confidence." },
  ];
  return (
    <section id="why" style={{ padding: "100px 24px", background: "#f2f5f0", position: "relative", overflow: "hidden" }}>
      <LeafDeco style={{ top: -40, right: -40, width: 280, height: 280 }} opacity={0.06} />
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>The Why</div>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#1e2820", marginBottom: 20, lineHeight: 1.2 }}>
            Clutter costs more than{" "}
            <em style={{ color: "#7a9b76", fontStyle: "italic" }}>space</em>
          </h2>
          <div className="divider" />
          <p style={{ marginTop: 24, maxWidth: 600, margin: "24px auto 0", color: "#5a5a5a", lineHeight: 1.8, fontSize: "1.05rem", fontWeight: 300 }}>
            It costs time, clarity, and peace of mind. A thoughtfully organized home isn't a luxury — it's the foundation of a calmer, more intentional life.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {items.map((item, i) => (
            <div key={i} className="pain-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div style={{ width: 48, height: 48, background: "rgba(122,155,118,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                {item.icon}
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 600, color: "#1e2820", marginBottom: 10 }}>{item.title}</h3>
              <p style={{ color: "#6a6a6a", lineHeight: 1.75, fontSize: "0.93rem", fontWeight: 300 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── SERVICES ─── */
const Services = () => {
  const residential = [
    { icon: <Home size={22} color="#7a9b76" />, title: "Kitchen & Pantry", desc: "From expired pantry goods to perfectly labeled zones — a kitchen that makes cooking a joy, not a challenge." },
    { icon: <Archive size={22} color="#7a9b76" />, title: "The Closet Edit", desc: "Curated, categorized, and beautifully arranged. Wake up every morning knowing exactly where everything lives." },
    { icon: <Heart size={22} color="#7a9b76" />, title: "Family Hubs", desc: "Playrooms, mudrooms, and command centers built for real family life — functional, durable, and easy to maintain." },
  ];
  const specialized = [
    { icon: <Briefcase size={22} color="#c8956a" />, title: "Home Office & Digital Org", desc: "Streamlined systems for paperwork, cables, files, and digital folders. Focus better, stress less." },
    { icon: <Package size={22} color="#c8956a" />, title: "Move Management", desc: "Full-service packing and unpacking with strategic placement from day one. Move in, settle in — instantly." },
    { icon: <Star size={22} color="#c8956a" />, title: "Life Transitions", desc: "Nursery prep, downsizing, senior moves, and estate edits. Compassionate support during life's biggest changes." },
  ];
  return (
    <section id="services" style={{ padding: "100px 24px", background: "#faf9f6", position: "relative" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>The Zones</div>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#1e2820", marginBottom: 20, lineHeight: 1.2 }}>
            Every space, <em style={{ color: "#7a9b76", fontStyle: "italic" }}>perfectly sorted</em>
          </h2>
          <div className="divider" />
        </div>
        {/* Residential */}
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7a9b76" }}>Residential Zones</span>
            <div style={{ flex: 1, height: 1, background: "#e8e3d8" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {residential.map((s, i) => (
              <div key={i} className="service-card">
                <div style={{ width: 44, height: 44, background: "rgba(122,155,118,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  {s.icon}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: "#1e2820", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "#6a6a6a", fontSize: "0.9rem", lineHeight: 1.75, fontWeight: 300 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Specialized */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#c8956a" }}>Specialized Services</span>
            <div style={{ flex: 1, height: 1, background: "#e8e3d8" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {specialized.map((s, i) => (
              <div key={i} className="service-card" style={{ "--accent": "#c8956a" }}>
                <div style={{ width: 44, height: 44, background: "rgba(200,149,106,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  {s.icon}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: "#1e2820", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "#6a6a6a", fontSize: "0.9rem", lineHeight: 1.75, fontWeight: 300 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── PACKAGES ─── */
const Packages = () => {
  const pkgs = [
    {
      tier: "The Refresh",
      sub: "A focused reset",
      duration: "4 Hours",
      price: "Starting at $280",
      desc: "Perfect for tackling one specific area — a closet, pantry, or home office — and creating immediate, visible change.",
      features: ["One focused zone or room", "Systems & solutions setup", "Product recommendations", "Donation bag organization", "Same-day results"],
      bg: "#f2f5f0",
      border: "#c8d9c5",
      badge: null,
    },
    {
      tier: "The Transformation",
      sub: "The complete experience",
      duration: "Full Day (8 hrs)",
      price: "Starting at $560",
      desc: "A full day devoted to multiple spaces, tackling the areas that matter most and building systems that genuinely last.",
      features: ["2–3 rooms or zones", "Full sorting & purge session", "Custom systems built in place", "Donation drop-off included", "Personalized maintenance guide"],
      bg: "#2c3a2c",
      border: "#3d4f3d",
      badge: "Most Popular",
    },
    {
      tier: "The Maintenance",
      sub: "Lasting order",
      duration: "Quarterly Check-ins",
      price: "Starting at $199/qtr",
      desc: "A subscription partnership to keep your home running beautifully through every season, transition, and busy stretch of life.",
      features: ["Quarterly 2-hour sessions", "Priority booking access", "Seasonal swap & refresh", "Text support between visits", "Annual deep-dive session"],
      bg: "#f7f0e8",
      border: "#e8d8c4",
      badge: null,
    },
  ];
  return (
    <section id="packages" style={{ padding: "100px 24px", background: "linear-gradient(165deg, #eef4ec 0%, #f7f5f0 100%)", position: "relative", overflow: "hidden" }}>
      <LeafDeco style={{ bottom: -60, right: -40, width: 300, height: 300 }} opacity={0.07} />
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>Investment</div>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#1e2820", marginBottom: 20, lineHeight: 1.2 }}>
            Choose your <em style={{ color: "#7a9b76", fontStyle: "italic" }}>path to peace</em>
          </h2>
          <div className="divider" />
          <p style={{ marginTop: 24, maxWidth: 520, margin: "24px auto 0", color: "#5a5a5a", lineHeight: 1.8, fontWeight: 300 }}>
            Every package includes a free 20-minute phone consultation to ensure it's the perfect fit.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {pkgs.map((p, i) => (
            <div key={i} className="package-card" style={{ background: p.bg, border: `1px solid ${p.border}`, position: "relative" }}>
              {p.badge && (
                <div style={{ position: "absolute", top: -1, right: 28, background: "#7a9b76", color: "#fff", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "0 0 4px 4px" }}>
                  {p.badge}
                </div>
              )}
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: p.bg === "#2c3a2c" ? "rgba(255,255,255,0.5)" : "#8a8a8a", fontWeight: 600, marginBottom: 6 }}>
                  {p.sub}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.7rem", fontWeight: 600, color: p.bg === "#2c3a2c" ? "#e8f4e5" : "#1e2820", marginBottom: 4 }}>{p.tier}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <Clock size={13} color={p.bg === "#2c3a2c" ? "#9ab897" : "#7a9b76"} />
                  <span style={{ fontSize: "0.8rem", color: p.bg === "#2c3a2c" ? "#9ab897" : "#7a9b76", fontWeight: 500 }}>{p.duration}</span>
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, color: p.bg === "#2c3a2c" ? "#c5e0c2" : "#7a9b76", marginBottom: 12 }}>{p.price}</div>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: p.bg === "#2c3a2c" ? "rgba(255,255,255,0.65)" : "#6a6a6a", fontWeight: 300 }}>{p.desc}</p>
              </div>
              <div style={{ borderTop: `1px solid ${p.border}`, paddingTop: 24, marginBottom: 28 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                    <Check size={14} color={p.bg === "#2c3a2c" ? "#7a9b76" : "#7a9b76"} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: "0.87rem", color: p.bg === "#2c3a2c" ? "rgba(255,255,255,0.75)" : "#5a5a5a", fontWeight: 300, lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" className={p.bg === "#2c3a2c" ? "btn-primary" : "btn-outline"} style={{ width: "100%", justifyContent: "center" }}>
                Book This Package
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── WHITE GLOVE DIFFERENCE ─── */
const Difference = () => {
  const perks = [
    { icon: <ShoppingBag size={20} color="#7a9b76" />, title: "Personal Shopping", body: "Need bins, baskets, or organizers? Sarah sources and purchases products on your behalf — perfectly sized, beautifully coordinated." },
    { icon: <Tag size={20} color="#7a9b76" />, title: "Custom Labeling", body: "Handcrafted labels using premium materials — clear, cohesive, and designed to match your home's aesthetic." },
    { icon: <Gift size={20} color="#7a9b76" />, title: "Donation Drop-Offs", body: "Don't worry about what to do with the things you let go. We handle drop-offs to local charities on your behalf, free of charge." },
    { icon: <RefreshCw size={20} color="#7a9b76" />, title: "Seasonal Refreshes", body: "Twice-yearly wardrobe swaps and storage rotations to keep your systems running beautifully all year long." },
    { icon: <Calendar size={20} color="#7a9b76" />, title: "Product Returns", body: "Bought something that doesn't work? We'll return or exchange it so you don't have to think twice." },
    { icon: <Sparkles size={20} color="#7a9b76" />, title: "Maintenance Plans", body: "Ongoing support so you never slip back into chaos. Check-in sessions to tweak, refresh, and reset your systems." },
  ];
  return (
    <section id="difference" style={{ padding: "100px 24px", background: "#faf9f6" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <div>
          <div className="section-label" style={{ marginBottom: 20 }}>The White Glove Difference</div>
          <h2 className="font-display" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 300, color: "#1e2820", lineHeight: 1.2, marginBottom: 24 }}>
            More than organizing.<br />
            <em style={{ color: "#7a9b76", fontStyle: "italic" }}>A full-service experience.</em>
          </h2>
          <div style={{ width: 48, height: 2, background: "linear-gradient(90deg, #7a9b76, #b5c7b2)", marginBottom: 28 }} />
          <p style={{ color: "#5a5a5a", lineHeight: 1.85, fontSize: "1rem", fontWeight: 300, marginBottom: 24 }}>
            Sarah's Sorted Spaces goes far beyond sorting and folding. Every project
            includes thoughtful extras that make the experience seamless, personal, and
            genuinely delightful.
          </p>
          <p style={{ color: "#5a5a5a", lineHeight: 1.85, fontSize: "1rem", fontWeight: 300, marginBottom: 36 }}>
            You'll never feel like a project. You'll feel like a priority.
          </p>
          <div style={{ background: "#f2f5f0", borderRadius: 3, padding: "24px 28px", borderLeft: "3px solid #7a9b76" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#2c3a2c", lineHeight: 1.7, fontStyle: "italic" }}>
              "I don't just organize your home — I build the systems that let you keep
              it that way, because that's where the real transformation happens."
            </p>
            <p style={{ marginTop: 12, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7a9b76" }}>
              — Sarah, Founder
            </p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
          {perks.map((p, i) => (
            <div key={i} className="perk-item" style={{ borderRadius: 3 }}>
              <div style={{ width: 40, height: 40, background: "rgba(122,155,118,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {p.icon}
              </div>
              <div>
                <h4 style={{ fontSize: "0.92rem", fontWeight: 600, color: "#1e2820", marginBottom: 4 }}>{p.title}</h4>
                <p style={{ fontSize: "0.82rem", color: "#7a7a7a", lineHeight: 1.65, fontWeight: 300 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 900px) { #difference > div { grid-template-columns: 1fr !important; gap: 40px !important; } #difference > div > div:last-child { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
};

/* ─── LOCAL SECTION ─── */
const Local = () => {
  const areas = ["Elkridge", "Columbia", "Ellicott City", "Clarksville", "Laurel", "Fulton", "Jessup", "Savage", "Woodstock", "Catonsville"];
  return (
    <section style={{ padding: "80px 24px", background: "linear-gradient(165deg, #2c3a2c 0%, #1e2820 100%)", position: "relative", overflow: "hidden" }}>
      <LeafDeco style={{ top: -60, right: -40, width: 340, height: 340 }} opacity={0.08} />
      <LeafDeco style={{ bottom: -60, left: -20, width: 260, height: 260, transform: "rotate(180deg)" }} opacity={0.06} />
      <div style={{ maxWidth: 1160, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <div className="section-label" style={{ justifyContent: "center", color: "#9ab897", marginBottom: 20 }}>
          <span style={{ background: "#9ab897", display: "inline-block", width: 28, height: 1 }} />
          Local & Rooted
        </div>
        <h2 className="font-display" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 300, color: "#e8f4e5", marginBottom: 20, lineHeight: 1.2 }}>
          Proudly serving{" "}
          <em style={{ color: "#9ab897", fontStyle: "italic" }}>Howard County</em>{" "}
          & surrounding communities
        </h2>
        <div style={{ width: 48, height: 2, background: "linear-gradient(90deg, #7a9b76, #9ab897)", margin: "0 auto 32px" }} />
        <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 540, margin: "0 auto 40px", fontWeight: 300, fontSize: "0.95rem" }}>
          Sarah grew up in Howard County and knows these neighborhoods personally.
          Every home she organizes becomes part of a community she genuinely cares about.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 40 }}>
          {areas.map(a => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 2, padding: "8px 16px" }}>
              <MapPin size={12} color="#9ab897" />
              <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>{a}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>
          Not seeing your area? Reach out — we travel for the right project.
        </p>
      </div>
    </section>
  );
};

/* ─── CONTACT / FOOTER ─── */
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <footer id="contact" style={{ background: "#1e2820", padding: "100px 24px 60px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, marginBottom: 80 }}>
          {/* Left info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{ width: 36, height: 36, background: "#7a9b76", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Leaf size={16} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: "#e8f4e5", lineHeight: 1 }}>Sarah's Sorted Spaces</div>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#7a9b76", marginTop: 3 }}>Professional Organizing</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.85, fontWeight: 300, fontSize: "0.9rem", marginBottom: 36, maxWidth: 360 }}>
              Helping Howard County families create homes that feel as good as they look — one beautifully sorted space at a time.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
              {[
                { icon: <Phone size={14} color="#7a9b76" />, text: "(443) 555-0192" },
                { icon: <Mail size={14} color="#7a9b76" />, text: "hello@sarahssortedspaces.com" },
                { icon: <MapPin size={14} color="#7a9b76" />, text: "Howard County, MD" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {item.icon}
                  <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>{item.text}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { icon: <Instagram size={16} />, label: "Instagram" },
                { icon: <Facebook size={16} />, label: "Facebook" },
              ].map(({ icon, label }) => (
                <button key={label} title={label} style={{ width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = "#7a9b76"; e.currentTarget.style.color = "#9ab897"; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>
          {/* Form */}
          <div>
            <div className="section-label" style={{ color: "#9ab897", marginBottom: 16 }}>
              <span style={{ background: "#9ab897", display: "inline-block", width: 28, height: 1 }} />
              Get in Touch
            </div>
            <h2 className="font-display" style={{ fontSize: "clamp(1.7rem, 3vw, 2.3rem)", fontWeight: 300, color: "#e8f4e5", marginBottom: 28, lineHeight: 1.2 }}>
              Ready to reclaim your{" "}
              <em style={{ color: "#9ab897", fontStyle: "italic" }}>peace?</em>
            </h2>
            {sent ? (
              <div style={{ background: "rgba(122,155,118,0.15)", border: "1px solid rgba(122,155,118,0.3)", borderRadius: 3, padding: 32, textAlign: "center" }}>
                <div style={{ width: 56, height: 56, background: "rgba(122,155,118,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <Check size={24} color="#9ab897" />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#e8f4e5", marginBottom: 10 }}>Message Received!</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", lineHeight: 1.75 }}>
                  Thank you for reaching out. Sarah will be in touch within 24 hours to schedule your free consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <input name="name" placeholder="Your Name" value={form.name} onChange={handle} required />
                  <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handle} required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handle} />
                  <select name="service" value={form.service} onChange={handle} style={{ appearance: "none" }}>
                    <option value="" disabled style={{ color: "#2c2c2c" }}>Service Interest</option>
                    <option style={{ color: "#2c2c2c" }}>The Refresh (4 hrs)</option>
                    <option style={{ color: "#2c2c2c" }}>The Transformation (Full Day)</option>
                    <option style={{ color: "#2c2c2c" }}>The Maintenance Subscription</option>
                    <option style={{ color: "#2c2c2c" }}>Kitchen & Pantry</option>
                    <option style={{ color: "#2c2c2c" }}>Closet Edit</option>
                    <option style={{ color: "#2c2c2c" }}>Move Management</option>
                    <option style={{ color: "#2c2c2c" }}>Other / Not Sure</option>
                  </select>
                </div>
                <textarea name="message" placeholder="Tell me a little about your space and what you're hoping for..." rows={4} value={form.message} onChange={handle} style={{ resize: "vertical" }} />
                <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                  Send Message <ArrowRight size={15} />
                </button>
                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>
                  Your information is kept completely private. Expect a reply within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Sarah's Sorted Spaces. All rights reserved. Howard County, MD.
          </p>
          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.25)", fontStyle: "italic" }}>
            Calm begins at home.
          </p>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { #contact > div > div:first-of-type { grid-template-columns: 1fr !important; gap: 48px !important; } #contact > div > div:first-of-type > div:last-child > form > div:first-child, #contact > div > div:first-of-type > div:last-child > form > div:nth-child(2) { grid-template-columns: 1fr !important; } }`}</style>
    </footer>
  );
};

/* ─── ROOT ─── */
export default function App() {
  return (
    <>
      <FontLoader />
      <Nav />
      <Hero />
      <PainPoints />
      <Services />
      <Packages />
      <Difference />
      <Local />
      <Contact />
    </>
  );
}
