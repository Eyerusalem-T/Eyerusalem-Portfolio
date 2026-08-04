import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ExternalLink,
  Check,
  Menu,
  X,
  Send,
  Layers,
  Server,
  Database,
  Cloud,
  Search,
  PenTool,
  Code2,
  TestTube2,
  Rocket,
  Wrench,
  Diamond,
  ArrowRightCircle,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import resumePDF from "./resume.pdf";

/* ---------------- helpers ---------------- */
function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function Counter({ to, suffix = "", duration = 1200 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setVal(to);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(eased * to));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* rotating role headline */
const ROLES = [
  "Junior Full-Stack Developer",
  "Junior Software Engineer",
  "Junior Mobile Developer",
];
function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="role-rotate-wrap">
      <span className="role-rotate" key={i}>
        {ROLES[i]}
      </span>
    </span>
  );
}

/* ---------------- data ---------------- */
const TECH_META = {
  React: { abbr: "R", color: "#61DAFB" },
  "Next.js": { abbr: "NX", color: "#E8EAED" },
  TypeScript: { abbr: "TS", color: "#3178C6" },
  JavaScript: { abbr: "JS", color: "#F0DB4F" },
  "Node.js": { abbr: "N", color: "#8CC84B" },
  "nest.js": { abbr: "NJ", color: "#E0234E" },
  Django: { abbr: "DJ", color: "#3EA23E" },
  Prisma: { abbr: "PR", color: "#5A67D8" },
  PostgreSQL: { abbr: "PG", color: "#4169E1" },
  MySQL: { abbr: "MY ", color: "#4DB33D" },
  Python: { abbr: "PY", color: "#FFD43B" },
  Git: { abbr: "GIT", color: "#F05032" },
  Docker: { abbr: "DK", color: "#2496ED" },
  Figma: { abbr: "FG", color: "#F24E1E" },
  "Vs Code": { abbr: "VC", color: "#007ACC" },
};

function TechTile({ name }) {
  const meta = TECH_META[name] || {
    abbr: name.slice(0, 2).toUpperCase(),
    color: "#34D8A6",
  };
  return (
    <div className="tech-tile">
      <div
        className="tech-ic"
        style={{
          color: meta.color,
          borderColor: `${meta.color}33`,
          background: `${meta.color}14`,
        }}
      >
        {meta.abbr}
      </div>
      <span>{name}</span>
    </div>
  );
}

const TECH_GROUPS = [
  {
    title: "Frontend",
    icon: Layers,
    items: ["React", "Next.js", "TypeScript", "JavaScript"],
  },
  {
    title: "Backend",
    icon: Server,
    items: ["Django", "Node.js", "Python", "nest.js"],
  },
  {
    title: "Database & ORM",
    icon: Database,
    items: ["PostgreSQL", "Prisma", "MySQL"],
  },
  { title: "Tools", icon: Cloud, items: ["Git", "Docker", "Figma", "Vs Code"] },
];

const PROCESS = [
  {
    title: "Discover",
    icon: Search,
    desc: "Understand the users, the constraints, and what success looks like.",
  },
  {
    title: "Design",
    icon: PenTool,
    desc: "Map data models and screens before a line of code is written.",
  },
  {
    title: "Develop",
    icon: Code2,
    desc: "Build in small, reviewed increments — API first, UI close behind.",
  },
  {
    title: "Test",
    icon: TestTube2,
    desc: "Manual and automated checks on the paths that actually matter.",
  },
  {
    title: "Deploy",
    icon: Rocket,
    desc: "Ship behind a checklist, monitor the first hours closely.",
  },
  {
    title: "Maintain",
    icon: Wrench,
    desc: "Fix, tune, and extend based on how it's really being used.",
  },
];

const PROJECTS = [
  {
    name: "Tutor Connect",
    tagline: "Connecting students with tutors, without the back-and-forth",
    desc: "A platform built to make finding and booking a tutor simple for students, and simple for tutors to be found. It replaces manual matching with a searchable, self-serve flow from both sides.",
    flow: [
      "Client (Next.js)",
      "Next.js API Routes",
      "Prisma ORM",
      "PostgreSQL",
    ],
    features: [
      "Student & tutor profiles",
      "Search and browse available tutors",
      "Booking flow between student and tutor",
      "Data modeled and queried through Prisma",
    ],
    stack: ["Next.js", "Prisma", "PostgreSQL"],
  },
  {
    name: "Baltina shopping",
    tagline: "Full-stack marketplace for Ethiopian baltina products",
    desc: "An e-commerce platform focused on making Ethiopian baltina products easy to access online. The full shopping journey — browsing, purchasing, and payment — happens end-to-end on the site.",
    flow: [
      "Client (Next.js)",
      "Nest.js API Routes",
      "Prisma ORM",
      "PostgreSQL",
    ],
    features: [
      "Product browsing & shopping flow",
      "Purchase and checkout process",
      "Payment handled within the site",
      "Sales-side data managed through Prisma & PostgreSQL",
    ],
    stack: ["Nest.js", "Prisma", "PostgreSQL"],
  },
  {
    name: "Job Board",
    tagline: "Where companies post roles and job seekers apply",
    desc: "A job board connecting three sides of the hiring process: companies posting open roles for free, and job seekers browsing and applying directly through the platform.",
    flow: ["Client (React / Next.js)", "Django REST API", "Database"],
    features: [
      "Companies post job openings for free",
      "Job seekers browse open positions",
      "Direct application flow",
      "Separate experiences for company & applicant",
    ],
    stack: ["React", "Django", "Python", "nest.js"],
  },
];

/* ---------------- architecture diagram ---------------- */
function ArchDiagram({ flow }) {
  return (
    <div className="arch">
      <div className="arch-row">
        {flow.map((node, i) => (
          <React.Fragment key={node}>
            <div className="arch-node">{node}</div>
            {i < flow.length - 1 && (
              <ArrowRightCircle size={16} className="arch-arrow" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ---------------- main ---------------- */
export default function PortfolioPro() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  // Point this at your deployed backend once it's live.
  const API_URL = "https://portfolio-backend-s7qz.onrender.com";

  const onField = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = useCallback(async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus({ state: "err", msg: "Please fill in every field." });
      return;
    }
    setStatus({ state: "sending", msg: "" });
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus({
        state: "ok",
        msg: "Message sent — I'll reply by email soon.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus({
        state: "err",
        msg: "Backend not connected yet — see the setup notes below the form.",
      });
    }
  }, [form]);

  const p = PROJECTS[activeProject];

  return (
    <div className="pf-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');

        .pf-root{
          --bg:#080B0A; --surface:#0F1614; --surface-2:#151E1B; --line:#1E2A26;
          --text:#EAF2EF; --muted:#7D9089; --mint:#34D8A6; --mint-dim:rgba(52,216,166,0.12);
          --mint-soft:rgba(52,216,166,0.06); --amber:#F5B461; --red:#F0665E;
          --mono:'JetBrains Mono', ui-monospace, monospace; --sans:'Inter', system-ui, sans-serif;
          background:var(--bg); color:var(--text); font-family:var(--sans); line-height:1.6;
          position:relative; isolation:isolate; overflow-x:hidden; min-height:100vh;
        }
        .pf-root *{box-sizing:border-box;}
        .pf-root a{color:inherit; text-decoration:none;}
        .pf-root ::selection{background:var(--mint-dim); color:var(--mint);}
        .pf-root :focus-visible{outline:2px solid var(--mint); outline-offset:3px; border-radius:4px;}
        @media (prefers-reduced-motion: reduce){ .pf-root *{animation-duration:0.01ms !important; transition-duration:0.01ms !important;} }

        .bg-grid{position:absolute; inset:0; z-index:-2;
          background-image:linear-gradient(rgba(52,216,166,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(52,216,166,0.035) 1px, transparent 1px);
          background-size:44px 44px;
          mask-image:radial-gradient(ellipse 75% 55% at 50% 0%, #000 40%, transparent 100%);}
        .glow{position:absolute; border-radius:50%; filter:blur(100px); z-index:-1; opacity:0.28;}
        .glow-a{width:460px; height:460px; background:#34D8A6; top:-140px; right:-80px; animation:float1 15s ease-in-out infinite;}
        .glow-b{width:380px; height:380px; background:#2E6E5C; bottom:5%; left:-120px; animation:float2 18s ease-in-out infinite;}
        @keyframes float1{0%,100%{transform:translate(0,0);} 50%{transform:translate(-30px,40px);}}
        @keyframes float2{0%,100%{transform:translate(0,0);} 50%{transform:translate(40px,-30px);}}

        .wrap{max-width:1140px; margin:0 auto; padding:0 24px;}
        section{padding:100px 0; position:relative;}
        @media (max-width:720px){ section{padding:60px 0;} }
        .eyebrow{font-family:var(--mono); font-size:12.5px; color:var(--mint); letter-spacing:0.14em; text-transform:uppercase; display:flex; align-items:center; gap:8px;}
        h1,h2,h3{font-family:var(--sans); font-weight:800; letter-spacing:-0.02em; line-height:1.15; margin:0;}
        .section-head{margin-bottom:44px; max-width:640px;}
        .section-head h2{font-size:clamp(26px,3.6vw,36px); margin-top:12px;}
        .section-head p{color:var(--muted); margin-top:14px; font-size:15.5px;}
        .reveal{opacity:0; transform:translateY(22px); transition:opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1);}
        .reveal-visible{opacity:1; transform:translateY(0);}

        /* nav */
        .pf-header{position:sticky; top:0; z-index:100; background:rgba(8,11,10,0.78); backdrop-filter:blur(14px); border-bottom:1px solid var(--line);}
        .nav{max-width:1140px; margin:0 auto; padding:16px 24px; display:flex; align-items:center; justify-content:space-between;}
        .logo{display:flex; align-items:center; gap:10px; font-family:var(--mono); font-weight:700; font-size:15px; letter-spacing:0.06em;}
        .logo-mark{width:26px; height:26px; border-radius:7px; background:linear-gradient(135deg,var(--mint),#1E7A5E); display:flex; align-items:center; justify-content:center; color:#052018;}
        .nav-links{display:flex; gap:32px; font-family:var(--mono); font-size:13.5px;}
        .nav-links a{color:var(--muted); transition:color .2s;}
        .nav-links a:hover{color:var(--mint);}
        .nav-cta{font-family:var(--mono); font-size:12.5px; color:#052018; background:var(--mint); padding:9px 18px; border-radius:7px; font-weight:700; border:1px solid var(--mint); transition:all .2s; cursor:pointer;}
        .nav-cta:hover{background:transparent; color:var(--mint); transform:translateY(-1px);}
        .burger{display:none; background:none; border:none; color:var(--text); cursor:pointer;}
        @media (max-width:820px){
          .nav-links{position:fixed; top:65px; left:0; right:0; background:var(--surface); border-bottom:1px solid var(--line); flex-direction:column; gap:0; max-height:0; overflow:hidden; transition:max-height .35s ease;}
          .nav-links.open{max-height:320px;}
          .nav-links a{padding:16px 24px; border-top:1px solid var(--line);}
          .nav-cta{display:none;}
          .burger{display:flex;}
        }

        /* hero */
        .hero{padding:120px 0 70px; text-align:center;}
        .hero-badge{display:inline-flex; align-items:center; gap:8px; font-family:var(--mono); font-size:12px; color:var(--mint); background:var(--mint-soft); border:1px solid rgba(52,216,166,0.25); padding:6px 14px; border-radius:20px; margin-bottom:22px;}
        .hero-badge .dot{width:6px; height:6px; border-radius:50%; background:var(--mint); animation:pulse 2s ease-in-out infinite;}
        @keyframes pulse{0%,100%{opacity:1;} 50%{opacity:0.35;}}
        .hero h1{font-size:clamp(28px,4.6vw,46px); max-width:820px; margin:0 auto 6px;}
        .role-rotate-wrap{display:inline-block; min-height:1.2em; vertical-align:top; overflow:hidden;}
        .role-rotate{display:inline-block; color:transparent; background:linear-gradient(90deg,#34D8A6,#8CF0CE); -webkit-background-clip:text; background-clip:text; animation:roleFade 2.4s ease;}
        @keyframes roleFade{
          0%{opacity:0; transform:translateY(10px);}
          12%{opacity:1; transform:translateY(0);}
          85%{opacity:1; transform:translateY(0);}
          100%{opacity:0; transform:translateY(-10px);}
        }
        .hero-sub{color:var(--muted); font-size:16px; max-width:600px; margin:22px auto 34px; line-height:1.7;}
        .hero-actions{display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-bottom:52px;}
        .btn{font-family:var(--mono); font-size:13.5px; font-weight:600; padding:13px 22px; border-radius:8px; display:inline-flex; align-items:center; gap:8px; transition:transform .18s, background .2s, color .2s, border-color .2s, box-shadow .2s; border:1px solid transparent; cursor:pointer;}
        .btn:hover{transform:translateY(-2px);}
        .btn-primary{background:var(--mint); color:#052018;}
        .btn-primary:hover{background:#59e3bb; box-shadow:0 10px 30px -8px rgba(52,216,166,0.5);}
        .btn-ghost{border-color:var(--line); color:var(--text); background:transparent;}
        .btn-ghost:hover{border-color:var(--mint); color:var(--mint);}

        .hero-stats{display:flex; justify-content:center; gap:46px; flex-wrap:wrap;}
        .stat b{display:block; font-size:22px; font-weight:800;}
        .stat span{font-family:var(--mono); font-size:12px; color:var(--muted);}

        /* card shell */
        .card{background:var(--surface); border:1px solid var(--line); border-radius:16px;}
        .card-bar{background:var(--surface-2); padding:11px 16px; display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--line); border-radius:16px 16px 0 0;}
        .card-dot{width:9px; height:9px; border-radius:50%;}
        .card-dot.r{background:#F0665E;} .card-dot.y{background:#F5B461;} .card-dot.g{background:#34D8A6;}
        .card-bar-title{margin-left:6px; font-family:var(--mono); font-size:12px; color:var(--muted);}

        /* arch diagram */
        .arch{background:var(--surface-2); border:1px solid var(--line); border-radius:10px; padding:16px;}
        .arch-row{display:flex; align-items:center; gap:8px; flex-wrap:wrap;}
        .arch-node{font-family:var(--mono); font-size:12px; color:var(--text); background:var(--bg); border:1px solid var(--line); padding:8px 12px; border-radius:8px; white-space:nowrap;}
        .arch-arrow{color:var(--mint); flex-shrink:0;}

        /* about + experience */
        .about-grid{display:grid; grid-template-columns:1.1fr 0.9fr; gap:40px; align-items:start;}
        @media (max-width:800px){ .about-grid{grid-template-columns:1fr;} }
        .about-text p{color:var(--muted); font-size:15.5px; margin-bottom:14px;}
        .about-text strong{color:var(--text);}
        .edu-card{padding:24px;}
        .edu-card-head{display:flex; align-items:center; gap:10px; color:var(--mint); margin-bottom:12px;}
        .edu-card h3{font-size:18px; margin-bottom:4px;}
        .edu-card .sub{color:var(--muted); font-family:var(--mono); font-size:12.5px; margin-bottom:14px;}
        .edu-list{list-style:none; font-size:14px; color:var(--muted); padding:0; margin:0;}
        .edu-list li{padding:8px 0; border-top:1px dashed var(--line); display:flex; gap:8px;}
        .edu-list li:first-child{border-top:none;}
        .edu-list li::before{content:"▸"; color:var(--mint);}

        .exp-card{padding:26px; margin-top:22px;}
        .exp-head{display:flex; justify-content:space-between; align-items:flex-start; gap:14px; flex-wrap:wrap; margin-bottom:14px;}
        .exp-head-left{display:flex; align-items:center; gap:12px;}
        .exp-icon{width:38px; height:38px; border-radius:10px; background:var(--mint-dim); color:var(--mint); display:flex; align-items:center; justify-content:center; flex-shrink:0;}
        .exp-role{font-size:17px; font-weight:800;}
        .exp-company{font-family:var(--mono); font-size:12.5px; color:var(--muted);}
        .exp-badge{font-family:var(--mono); font-size:11px; color:var(--mint); background:var(--mint-dim); padding:4px 10px; border-radius:20px; white-space:nowrap;}
        .exp-list{list-style:none; padding:0; margin:0; display:grid; gap:9px;}
        .exp-list li{font-size:14px; color:var(--text); display:flex; gap:9px; align-items:flex-start;}
        .exp-list li svg{color:var(--mint); flex-shrink:0; margin-top:2px;}
        .exp-skills{display:flex; gap:8px; flex-wrap:wrap; margin-top:16px;}

        /* project tabs */
        .tabs{display:flex; gap:10px; margin-bottom:26px; flex-wrap:wrap;}
        .tab-btn{font-family:var(--mono); font-size:13px; padding:11px 20px; border-radius:9px; border:1px solid var(--line); background:var(--surface); color:var(--muted); cursor:pointer; transition:all .2s; display:flex; align-items:center; gap:10px;}
        .tab-btn:hover{color:var(--text); border-color:var(--mint);}
        .tab-btn.active{color:#052018; background:var(--mint); border-color:var(--mint); font-weight:700;}
        .tab-btn .idx{font-size:10.5px; opacity:0.7;}

        .pr-card{padding:32px;}
        .pr-title h3{font-size:22px; margin-bottom:4px;}
        .pr-tagline{color:var(--muted); font-size:13.5px; font-family:var(--mono); margin-bottom:18px;}
        .pr-desc{color:var(--muted); font-size:14.5px; margin:18px 0 20px; max-width:760px;}
        .pr-features{list-style:none; display:grid; grid-template-columns:1fr 1fr; gap:10px 20px; margin:22px 0; padding:0;}
        @media (max-width:600px){ .pr-features{grid-template-columns:1fr;} }
        .pr-features li{font-size:13.5px; color:var(--text); display:flex; gap:9px; align-items:flex-start;}
        .pr-features li svg{color:var(--mint); flex-shrink:0; margin-top:2px;}
        .pr-stack{display:flex; gap:8px; flex-wrap:wrap; margin-bottom:22px;}
        .tag{font-family:var(--mono); font-size:11.5px; color:var(--mint); background:var(--mint-dim); padding:5px 11px; border-radius:6px;}
        .pr-links{display:flex; gap:18px; font-family:var(--mono); font-size:12.5px;}
        .pr-links a{color:var(--muted); display:flex; align-items:center; gap:6px; border-bottom:1px solid transparent; transition:color .2s, border-color .2s;}
        .pr-links a:hover{color:var(--mint); border-color:var(--mint);}

        /* tech grid */
        .tech-groups{display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:18px;}
        .tech-card{padding:20px;}
        .tech-card-head{display:flex; align-items:center; gap:10px; margin-bottom:16px; color:var(--mint);}
        .tech-card-head h4{font-family:var(--mono); font-size:12.5px; text-transform:uppercase; letter-spacing:0.06em; color:var(--text);}
        .tech-tiles{display:grid; grid-template-columns:1fr 1fr; gap:10px;}
        .tech-tile{display:flex; align-items:center; gap:9px; font-size:12.5px; color:var(--text); background:var(--surface-2); border:1px solid var(--line); border-radius:8px; padding:8px 10px; transition:border-color .2s, transform .2s;}
        .tech-tile:hover{border-color:var(--mint); transform:translateY(-2px);}
        .tech-ic{width:24px; height:24px; border-radius:6px; border:1px solid; display:flex; align-items:center; justify-content:center; font-family:var(--mono); font-size:9.5px; font-weight:700; flex-shrink:0;}

        /* process */
        .process-row{display:grid; grid-template-columns:repeat(6,1fr); gap:14px;}
        @media (max-width:900px){ .process-row{grid-template-columns:repeat(3,1fr);} }
        @media (max-width:560px){ .process-row{grid-template-columns:repeat(2,1fr);} }
        .process-step{padding:20px 16px; text-align:center;}
        .process-num{font-family:var(--mono); font-size:11px; color:var(--muted); margin-bottom:10px;}
        .process-ic{width:38px; height:38px; border-radius:10px; background:var(--mint-dim); color:var(--mint); display:flex; align-items:center; justify-content:center; margin:0 auto 12px;}
        .process-step h4{font-size:14px; margin-bottom:6px;}
        .process-step p{font-size:12px; color:var(--muted); line-height:1.5;}

        /* CTA + contact */
        .cta{text-align:center; padding-bottom:16px;}
        .cta h2{font-size:clamp(26px,4.2vw,38px); margin-bottom:14px;}
        .cta p{color:var(--muted); max-width:480px; margin:0 auto 30px;}
        .contact-grid{display:grid; grid-template-columns:0.9fr 1.1fr; gap:44px;}
        @media (max-width:800px){ .contact-grid{grid-template-columns:1fr;} }
        .contact-info p{color:var(--muted); margin-bottom:24px; font-size:14.5px; max-width:400px;}
        .contact-channels{display:flex; flex-direction:column; gap:12px;}
        .channel{display:flex; align-items:center; gap:12px; font-family:var(--mono); font-size:13.5px; color:var(--text); padding:13px 15px; border-radius:10px; transition:border-color .2s, transform .15s;}
        .channel svg{color:var(--mint); flex-shrink:0;}
        .channel:hover{border-color:var(--mint); transform:translateX(4px);}
        .commit-box{overflow:hidden;}
        .form-body{padding:24px;}
        .field{margin-bottom:16px;}
        .field label{display:block; font-family:var(--mono); font-size:12px; color:var(--muted); margin-bottom:8px;}
        .field label::before{content:"$ "; color:var(--mint);}
        .field input, .field textarea{width:100%; background:var(--bg); border:1px solid var(--line); color:var(--text); padding:12px 14px; border-radius:8px; font-family:var(--sans); font-size:14px; transition:border-color .2s;}
        .field textarea{resize:vertical; min-height:110px;}
        .field input:focus, .field textarea:focus{border-color:var(--mint); outline:none;}
        .submit-row{display:flex; align-items:center; gap:16px; flex-wrap:wrap;}
        .form-status{font-family:var(--mono); font-size:12.5px;}
        .form-status.ok{color:var(--mint);} .form-status.err{color:var(--amber);}
        .setup-note{font-family:var(--mono); font-size:11.5px; color:var(--muted); margin-top:16px; padding-top:16px; border-top:1px dashed var(--line); line-height:1.6;}

        /* footer */
        .pf-footer{border-top:1px solid var(--line); padding:34px 0;}
        .footer-row{display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;}
        .footer-row p{font-family:var(--mono); font-size:12px; color:var(--muted);}
        .footer-social{display:flex; gap:16px;}
        .footer-social a{color:var(--muted); transition:color .2s, transform .2s; display:flex;}
        .footer-social a:hover{color:var(--mint); transform:translateY(-2px);}
      `}</style>

      <div className="bg-grid" />
      <div className="glow glow-a" />
      <div className="glow glow-b" />

      <header className="pf-header">
        <nav className="nav">
          <div className="logo">
            <div className="logo-mark">
              <Diamond size={13} strokeWidth={3} />
            </div>
            Eyerusalem T/Birhan
          </div>
          <div className={`nav-links ${navOpen ? "open" : ""}`}>
            <a href="#experience" onClick={() => setNavOpen(false)}>
              Experience
            </a>
            <a href="#projects" onClick={() => setNavOpen(false)}>
              Projects
            </a>
            <a href="#stack" onClick={() => setNavOpen(false)}>
              Stack
            </a>
            <a href="#contact" onClick={() => setNavOpen(false)}>
              Contact
            </a>
          </div>
          <a href="#contact" className="nav-cta">
            Hire Me
          </a>
          <button
            className="burger"
            aria-label="Toggle menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((o) => !o)}
          >
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="hero wrap" id="top">
          <h1>
            Hi, I'm Eyerusalem — <br />
            <RotatingRole />
          </h1>
          <p className="hero-sub">
            Software Engineering student at Addis Ababa University, passionate
            about using technology to solve real-world problems. I'm especially
            drawn to Frontend development,Backend development,Artificial
            Intelligence — and I like building things that actually get used.
          </p>
          <div className="hero-actions">
            <a
              href="https://github.com/Eyerusalem-T"
              className="btn btn-primary"
            >
              View projects <ArrowRight size={16} />
            </a>
            <a href={resumePDF} className="btn btn-ghost">
              Download résumé
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <b>
                <Counter to={3} />
              </b>
              <span>real client projects</span>
            </div>
            <div className="stat">
              <b>Pitron Tech</b>
              <span>Backend developer</span>
            </div>
            <div className="stat">
              <b>AAU</b>
              <span>software engineering</span>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="wrap" id="about">
          <Reveal className="section-head">
            <p className="eyebrow">About</p>
            <h2>A bit about how I work.</h2>
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-text">
              <p>
                I'm a{" "}
                <strong>
                  Software Engineering student at Addis Ababa University
                </strong>
                , with a strong foundation in programming and software
                development. I'm interested in areas like Frontend Developer,
                Backend Developer, and Artificial Intelligence.
              </p>
              <p>
                I thrive on collaborating with teams to build innovative
                solutions, and I'm always looking to expand my skill set. My
                goal is to contribute to impactful projects that improve user
                experience and push technology forward.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="card edu-card">
                <div className="edu-card-head">
                  <GraduationCap size={20} />
                  <p className="eyebrow" style={{ margin: 0 }}>
                    Education
                  </p>
                </div>
                <h3>Addis Ababa University</h3>
                <p className="sub">B.Sc. in Software Engineering</p>
                <ul className="edu-list">
                  <li>Programming & Software Development</li>
                  <li>Artificial Intelligence</li>
                  <li>Web Development</li>
                  <li>Cyber Security</li>
                  <li>Mobile Development</li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* EXPERIENCE */}
          <Reveal delay={80}>
            <div className="card exp-card" id="experience">
              <div className="exp-head">
                <div className="exp-head-left">
                  <div className="exp-icon">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <div className="exp-role">Backend Developer</div>
                    <div className="exp-company">Pitron Tech Solutions</div>
                  </div>
                </div>
                <span className="exp-badge">Experience</span>
              </div>
              <ul className="exp-list">
                <li>
                  <Check size={15} />
                  Worked as a backend developer across several real client
                  projects
                </li>
                <li>
                  <Check size={15} />
                  Built and maintained backend logic, data models, and APIs for
                  production use
                </li>
                <li>
                  <Check size={15} />
                  Collaborated closely with frontend and product teams to ship
                  features
                </li>
                <li>
                  <Check size={15} />
                  Strengthened communication and teamwork skills working in a
                  professional team setting
                </li>
              </ul>
              <div className="exp-skills">
                <span className="tag">Backend Development</span>
                <span className="tag">Communication</span>
                <span className="tag">Teamwork</span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* PROJECTS */}
        <section className="wrap" id="projects">
          <Reveal className="section-head">
            <p className="eyebrow">Projects</p>
            <h2>Real projects for real problems.</h2>
          </Reveal>

          <Reveal className="tabs">
            {PROJECTS.map((proj, i) => (
              <button
                key={proj.name}
                className={`tab-btn ${activeProject === i ? "active" : ""}`}
                onClick={() => setActiveProject(i)}
              >
                <span className="idx">0{i + 1}</span>
                {proj.name}
              </button>
            ))}
          </Reveal>

          <Reveal key={p.name} className="card pr-card">
            <div className="pr-title">
              <h3>{p.name}</h3>
              <p className="pr-tagline">{p.tagline}</p>
            </div>
            <p className="pr-desc">{p.desc}</p>
            <ArchDiagram flow={p.flow} />
            <ul className="pr-features">
              {p.features.map((f) => (
                <li key={f}>
                  <Check size={15} />
                  {f}
                </li>
              ))}
            </ul>
            <div className="pr-stack">
              {p.stack.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <div className="pr-links">
              <a href="#">
                <ExternalLink size={14} />
                Live demo
              </a>
              <a href="https://github.com/Eyerusalem-T">
                <ExternalLink size={14} />
                Source
              </a>
            </div>
          </Reveal>
        </section>

        {/* TECH STACK */}
        <section className="wrap" id="stack">
          <Reveal className="section-head">
            <p className="eyebrow">Stack</p>
            <h2>Skillset & tools.</h2>
          </Reveal>
          <div className="tech-groups">
            {TECH_GROUPS.map((g, i) => (
              <Reveal key={g.title} delay={i * 70}>
                <div className="card tech-card">
                  <div className="tech-card-head">
                    <g.icon size={18} />
                    <h4>{g.title}</h4>
                  </div>
                  <div className="tech-tiles">
                    {g.items.map((it) => (
                      <TechTile key={it} name={it} />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Workflow</p>
            <h2>Process & flow.</h2>
          </Reveal>
          <Reveal>
            <div className="process-row">
              {PROCESS.map((step, i) => (
                <div className="card process-step" key={step.title}>
                  <div className="process-num">0{i + 1}</div>
                  <div className="process-ic">
                    <step.icon size={18} />
                  </div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* CTA + CONTACT */}
        <section className="wrap" id="contact">
          <Reveal className="cta">
            <h2>Let's build something reliable.</h2>
            <p>
              Have a project in mind, or an opening for a junior developer? My
              inbox is open.
            </p>
          </Reveal>
          <div className="contact-grid">
            <Reveal className="contact-info">
              <p>
                Messages sent through this form are saved and emailed to me
                directly — I reply from my own inbox, usually within a day.
              </p>
              <div className="contact-channels">
                <a
                  className="card channel"
                  href="mailto:eyerusalem0201@gmail.com"
                >
                  <Mail size={17} />
                  eyerusalem0201@gmail.com
                </a>
                <a
                  className="card channel"
                  href="https://github.com/Eyerusalem-T"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={17} />
                  github.com/Eyerusalem-T
                </a>
                <a
                  className="card channel"
                  href="https://www.linkedin.com/in/eyerusalem21/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={17} />
                  linkedin.com/in/eyerusalem21
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="card commit-box">
                <div className="card-bar">
                  <span className="card-bar-title">contact me</span>
                </div>
                <div className="form-body">
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={onField}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onField}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={onField}
                      placeholder="Tell me about the project or opportunity..."
                    />
                  </div>
                  <div className="submit-row">
                    <button
                      className="btn btn-primary"
                      onClick={submit}
                      disabled={status.state === "sending"}
                    >
                      <Send size={15} />
                      {status.state === "sending"
                        ? "sending..."
                        : "send message"}
                    </button>
                    {status.msg && (
                      <span className={`form-status ${status.state}`}>
                        {status.state === "ok"
                          ? "✓ "
                          : status.state === "err"
                            ? "✗ "
                            : ""}
                        {status.msg}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="pf-footer">
        <div className="wrap footer-row">
          <p>© {new Date().getFullYear()} Eyerusalem T/Birhan.</p>
          <div className="footer-social">
            <a
              href="https://github.com/Eyerusalem-T"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/eyerusalem21/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a href="mailto:eyerusalem0201@gmail.com" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
