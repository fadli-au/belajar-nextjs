"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── Types ─── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  opacity: number;
}

/* ─── Data ─── */
const skills = [
  { name: "Next.js", icon: "⚡", color: "#ffffff" },
  { name: "React", icon: "⚛", color: "#61dafb" },
  { name: "TypeScript", icon: "𝙏", color: "#3b82f6" },
  { name: "Tailwind CSS", icon: "🎨", color: "#06b6d4" },
  { name: "Node.js", icon: "🟢", color: "#22c55e" },
  { name: "JavaScript", icon: "𝙅", color: "#eab308" },
  { name: "IoT", icon: "📡", color: "#a855f7" },
  { name: "Git", icon: "🔀", color: "#f97316" },
];

const projects = [
  {
    title: "IoT Pest Repellent",
    description:
      "Smart ultrasonic pest repellent using IoT, solar panel, strobe LED, and predator sound. Combines hardware and software for autonomous operation.",
    tags: ["IoT", "Arduino", "Solar", "Hardware"],
    accent: "#06b6d4",
    icon: "📡",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "WHV Career Planning",
    description:
      "Structured roadmap for Australia WHV — covering certifications, IELTS preparation, and skilled migration pathway planning.",
    tags: ["Planning", "Career", "Australia", "IELTS"],
    accent: "#22c55e",
    icon: "🌏",
    gradient: "from-green-500/20 to-teal-500/20",
  },
  {
    title: "Fullstack Learning Journey",
    description:
      "Personal learning roadmap for becoming a fullstack developer. Tracking progress across backend engineering, APIs, and frontend frameworks.",
    tags: ["Next.js", "Node.js", "MongoDB", "REST API"],
    accent: "#a855f7",
    icon: "🚀",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
];

const timeline = [
  {
    year: "2024",
    title: "Started Fullstack Journey",
    desc: "Began learning Next.js, TypeScript, and backend development.",
    color: "#6366f1",
  },
  {
    year: "2024",
    title: "Built IoT Project",
    desc: "Designed and built solar-powered IoT pest repellent system.",
    color: "#06b6d4",
  },
  {
    year: "2025",
    title: "WHV Research & Planning",
    desc: "Deep research into Australia WHV pathways and migration requirements.",
    color: "#a855f7",
  },
  {
    year: "2026",
    title: "Active Job Hunting",
    desc: "Currently open for opportunities in tech and international roles.",
    color: "#22c55e",
  },
];

/* ─── Particle Canvas ─── */
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let particles: Particle[] = [];
    const colors = ["#6366f1", "#a855f7", "#06b6d4", "#3b82f6"];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      resize();
      particles = Array.from({ length: 70 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "#6366f1";
            ctx.globalAlpha = (1 - dist / 100) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
}

/* ─── 3D Tilt Card ─── */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / rect.height) * 10;
    const ry = (-(e.clientX - cx) / rect.width) * 10;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  };

  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: "transform 0.15s ease-out", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/* ─── Section wrapper with fade-in ─── */
function Section({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </section>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("ahmadilham@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: "#060610",
        color: "#f1f5f9",
        fontFamily: "'Space Grotesk', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ── Navbar ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(6,6,16,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: "18px",
            background: "linear-gradient(135deg,#6366f1,#a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Ahmad Ilham
        </span>
        <div style={{ display: "flex", gap: "28px" }}>
          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: "#94a3b8",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#6366f1")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#94a3b8")
              }
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Hero ── */}
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <ParticleCanvas />

        {/* Background blobs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "5%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "80px 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Left: text */}
          <div>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.35)",
                borderRadius: "999px",
                padding: "6px 16px",
                fontSize: "13px",
                color: "#a5b4fc",
                marginBottom: "28px",
                animation: "fadeInUp 0.6s ease both",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                  animation: "pulse 1.8s ease-in-out infinite",
                  boxShadow: "0 0 8px #22c55e",
                }}
              />
              Available for opportunities
            </div>

            {/* Name */}
            <h1
              style={{
                fontSize: "clamp(42px,6vw,72px)",
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: "16px",
                animation: "fadeInUp 0.6s ease 0.1s both",
              }}
            >
              Hi, I&apos;m{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg,#6366f1 0%,#a855f7 50%,#06b6d4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Ahmad
                <br />
                Ilham
              </span>
            </h1>

            <p
              style={{
                fontSize: "18px",
                color: "#94a3b8",
                marginBottom: "16px",
                fontWeight: 500,
                animation: "fadeInUp 0.6s ease 0.2s both",
              }}
            >
              Fullstack Developer · WHV Pathways · Indonesia 🇮🇩
            </p>

            <p
              style={{
                fontSize: "15px",
                color: "#64748b",
                marginBottom: "40px",
                lineHeight: 1.8,
                maxWidth: "440px",
                animation: "fadeInUp 0.6s ease 0.3s both",
              }}
            >
              Passionate about building cool things on the web, exploring IoT,
              and chasing international career pathways — especially through
              Australia&apos;s WHV program. Currently open to new opportunities.
            </p>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                animation: "fadeInUp 0.6s ease 0.4s both",
              }}
            >
              <a
                href="#projects"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg,#6366f1,#a855f7)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "15px",
                  textDecoration: "none",
                  transition: "opacity 0.2s, transform 0.2s",
                  boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.88";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                }}
              >
                View Projects →
              </a>
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  borderRadius: "10px",
                  background: "transparent",
                  color: "#e2e8f0",
                  fontWeight: 600,
                  fontSize: "15px",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.18)",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "#6366f1";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.18)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                }}
              >
                Contact Me
              </a>
            </div>

            {/* Social links */}
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "32px",
                animation: "fadeInUp 0.6s ease 0.5s both",
              }}
            >
              {[
                { label: "GitHub", href: "https://github.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
                { label: "Email", href: "mailto:ahmadilham@example.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#475569",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#a5b4fc")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "#475569")
                  }
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: photo + floating cards */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Glow ring behind photo */}
            <div
              style={{
                position: "absolute",
                width: "320px",
                height: "320px",
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg, #6366f1, #a855f7, #06b6d4, #6366f1)",
                animation: "spin 8s linear infinite",
                opacity: 0.6,
                filter: "blur(1px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "308px",
                height: "308px",
                borderRadius: "50%",
                background: "#060610",
              }}
            />

            {/* Profile photo */}
            <div
              style={{
                position: "relative",
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                overflow: "hidden",
                zIndex: 2,
              }}
            >
              <Image
                src="/foto.jpg"
                alt="Ahmad Ilham"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            {/* Floating stat cards */}
            <div
              style={{
                position: "absolute",
                top: "0",
                right: "-20px",
                background: "rgba(99,102,241,0.15)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: "14px",
                padding: "14px 18px",
                zIndex: 3,
                animation: "float 3s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#a5b4fc",
                }}
              >
                3+
              </div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>
                Projects Built
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "-20px",
                background: "rgba(168,85,247,0.15)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(168,85,247,0.3)",
                borderRadius: "14px",
                padding: "14px 18px",
                zIndex: 3,
                animation: "float 3.5s ease-in-out 0.5s infinite",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#d8b4fe",
                }}
              >
                WHV
              </div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>
                Australia Goal
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "-10px",
                right: "20px",
                background: "rgba(6,182,212,0.15)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(6,182,212,0.3)",
                borderRadius: "14px",
                padding: "14px 18px",
                zIndex: 3,
                animation: "float 4s ease-in-out 1s infinite",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#67e8f9",
                }}
              >
                IoT
              </div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>
                + Web Dev
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            color: "#475569",
            fontSize: "12px",
            animation: "fadeIn 1s ease 1s both",
          }}
        >
          <span>scroll down</span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, #6366f1, transparent)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* ── About ── */}
      <Section
        id="about"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "120px 24px",
        }}
      >
        <p
          style={{
            color: "#6366f1",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          About Me
        </p>
        <h2
          style={{
            fontSize: "clamp(28px,4vw,48px)",
            fontWeight: 700,
            marginBottom: "48px",
            lineHeight: 1.2,
          }}
        >
          Building bridges between{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#06b6d4,#a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            technology &amp; opportunity
          </span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginBottom: "64px",
          }}
        >
          {/* Career vision card */}
          <TiltCard>
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08))",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "20px",
                padding: "32px",
                height: "100%",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  marginBottom: "16px",
                }}
              >
                🎯
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "12px",
                  color: "#e2e8f0",
                }}
              >
                Career Vision
              </h3>
              <p
                style={{
                  color: "#64748b",
                  lineHeight: 1.8,
                  fontSize: "14px",
                }}
              >
                Building an international career through technology, healthcare,
                and mining support industries — especially in Australia through
                WHV and skilled migration pathways.
              </p>
            </div>
          </TiltCard>

          {/* Current focus card */}
          <TiltCard>
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(6,182,212,0.08), rgba(34,197,94,0.08))",
                border: "1px solid rgba(6,182,212,0.2)",
                borderRadius: "20px",
                padding: "32px",
                height: "100%",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  marginBottom: "16px",
                }}
              >
                🔭
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "12px",
                  color: "#e2e8f0",
                }}
              >
                Current Focus
              </h3>
              <ul
                style={{
                  color: "#64748b",
                  lineHeight: 2,
                  fontSize: "14px",
                  listStyle: "none",
                  padding: 0,
                }}
              >
                {[
                  "Backend & Fullstack Development",
                  "English & IELTS Preparation",
                  "Healthcare Pathway Research",
                  "International Career Preparation",
                ].map((item) => (
                  <li
                    key={item}
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <span style={{ color: "#06b6d4", fontSize: "10px" }}>◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </TiltCard>
        </div>

        {/* Timeline */}
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 700,
            marginBottom: "32px",
            color: "#e2e8f0",
          }}
        >
          My Journey
        </h3>
        <div style={{ position: "relative" }}>
          {/* Line */}
          <div
            style={{
              position: "absolute",
              left: "20px",
              top: "8px",
              bottom: "8px",
              width: "2px",
              background:
                "linear-gradient(to bottom, #6366f1, #a855f7, #06b6d4, #22c55e)",
              borderRadius: "999px",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              paddingLeft: "56px",
            }}
          >
            {timeline.map((item, i) => (
              <div key={i} style={{ position: "relative" }}>
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-44px",
                    top: "4px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: item.color,
                    boxShadow: `0 0 12px ${item.color}`,
                    border: "2px solid #060610",
                  }}
                />
                <div
                  style={{
                    fontSize: "12px",
                    color: item.color,
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  {item.year}
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#e2e8f0",
                    marginBottom: "4px",
                  }}
                >
                  {item.title}
                </div>
                <div style={{ fontSize: "14px", color: "#64748b" }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Skills ── */}
      <Section
        id="skills"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "120px 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              color: "#a855f7",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Tech Stack
          </p>
          <h2
            style={{
              fontSize: "clamp(28px,4vw,48px)",
              fontWeight: 700,
              marginBottom: "48px",
            }}
          >
            Skills &amp;{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#a855f7,#6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Technologies
            </span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: "16px",
            }}
          >
            {skills.map((skill, i) => (
              <TiltCard key={skill.name}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    padding: "24px 16px",
                    textAlign: "center",
                    cursor: "default",
                    transition: "border-color 0.2s",
                    animationDelay: `${i * 0.05}s`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      skill.color + "66";
                    (e.currentTarget as HTMLElement).style.background =
                      skill.color + "11";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.04)";
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "10px" }}>
                    {skill.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#94a3b8",
                    }}
                  >
                    {skill.name}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Projects ── */}
      <Section
        id="projects"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "120px 24px",
        }}
      >
        <p
          style={{
            color: "#06b6d4",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Portfolio
        </p>
        <h2
          style={{
            fontSize: "clamp(28px,4vw,48px)",
            fontWeight: 700,
            marginBottom: "48px",
          }}
        >
          Featured{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#06b6d4,#6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Projects
          </span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {projects.map((project, i) => (
            <TiltCard key={project.title}>
              <div
                style={{
                  background: `linear-gradient(135deg, rgba(${
                    project.accent === "#06b6d4"
                      ? "6,182,212"
                      : project.accent === "#22c55e"
                      ? "34,197,94"
                      : "168,85,247"
                  },0.08), rgba(99,102,241,0.05))`,
                  border: `1px solid ${project.accent}33`,
                  borderRadius: "20px",
                  padding: "32px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    project.accent + "66";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    project.accent + "33";
                }}
              >
                <div
                  style={{
                    fontSize: "36px",
                    marginBottom: "20px",
                    display: "inline-block",
                    animation: "float 3s ease-in-out infinite",
                    animationDelay: `${i * 0.4}s`,
                  }}
                >
                  {project.icon}
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    marginBottom: "12px",
                    color: "#e2e8f0",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#64748b",
                    lineHeight: 1.8,
                    marginBottom: "24px",
                    flex: 1,
                  }}
                >
                  {project.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    marginBottom: "24px",
                  }}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "4px 12px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 600,
                        background: project.accent + "22",
                        border: `1px solid ${project.accent}44`,
                        color: project.accent,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      flex: 1,
                      textAlign: "center",
                      padding: "10px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#94a3b8",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: 600,
                      transition: "background 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                    }}
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* ── Contact ── */}
      <Section
        id="contact"
        style={{
          padding: "120px 24px",
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#22c55e",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Get in Touch
          </p>
          <h2
            style={{
              fontSize: "clamp(28px,4vw,48px)",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            Let&apos;s{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#22c55e,#06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Work Together
            </span>
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "16px",
              lineHeight: 1.8,
              marginBottom: "48px",
            }}
          >
            Open for collaboration, networking, and international opportunities.
            Whether it&apos;s a project, a job offer, or just a chat — I&apos;m
            all ears.
          </p>

          {/* Contact cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            {[
              {
                icon: "📧",
                label: "Email",
                value: "Copy email",
                action: copyEmail,
                color: "#6366f1",
              },
              {
                icon: "💼",
                label: "LinkedIn",
                value: "View profile",
                href: "https://linkedin.com",
                color: "#0077b5",
              },
              {
                icon: "🐙",
                label: "GitHub",
                value: "See code",
                href: "https://github.com",
                color: "#94a3b8",
              },
            ].map((c) => (
              <div
                key={c.label}
                onClick={c.action}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "24px 16px",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s, transform 0.15s",
                  textDecoration: "none",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    c.color + "66";
                  (e.currentTarget as HTMLElement).style.background =
                    c.color + "11";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>
                  {c.icon}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#e2e8f0",
                    marginBottom: "4px",
                  }}
                >
                  {c.label}
                </div>
                <div style={{ fontSize: "12px", color: "#475569" }}>
                  {c.label === "Email" && copied ? "✓ Copied!" : c.value}
                </div>
              </div>
            ))}
          </div>

          <a
            href="mailto:ahmadilham@example.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg,#22c55e,#06b6d4)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              textDecoration: "none",
              boxShadow: "0 4px 24px rgba(34,197,94,0.3)",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.88";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Send me a message →
          </a>
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "32px 24px",
          textAlign: "center",
          color: "#334155",
          fontSize: "13px",
        }}
      >
        <span>
          Built by{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#6366f1,#a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 600,
            }}
          >
            Ahmad Ilham
          </span>{" "}
          · {new Date().getFullYear()} · Next.js + Tailwind
        </span>
      </footer>

      {/* ── Global keyframes ── */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.7); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
