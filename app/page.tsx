"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Award,
  CheckCircle,
  Shield,
  Building,
  Truck,
  Menu,
  X,
  ChevronDown,
  Factory,
  TrendingUp,
  Droplets,
  FileCheck,
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  BrickWall,
  Landmark,
  Home,
  Ruler,
  Star,
  Clock,
  Users,
  Briefcase,
  ArrowUp,
  Sun,
  Moon,
  RotateCcw,
  Maximize2,
  Layers,
  Calculator,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/* ============================================================
   INTERSECTION OBSERVER HOOK
   ============================================================ */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isInView };
}

/* ============================================================
   3D TILT CARD WRAPPER
   ============================================================ */
function Tilt3DCard({
  children,
  className = "",
  intensity = 12,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [intensity, -intensity]);
  const rotateY = useTransform(x, [-100, 100], [-intensity, intensity]);
  const spring = { damping: 25, stiffness: 400 };
  const sRotateX = useSpring(rotateX, spring);
  const sRotateY = useSpring(rotateY, spring);
  const scale = useSpring(1, spring);

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        style={{ rotateX: sRotateX, rotateY: sRotateY, scale, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left - rect.width / 2);
          y.set(e.clientY - rect.top - rect.height / 2);
          scale.set(1.02);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); scale.set(1); }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ============================================================
   FLOATING PARTICLES (HERO)
   ============================================================ */
const PARTICLE_COLORS = [
  "rgba(178,59,35,0.7)",
  "rgba(249,115,22,0.6)",
  "rgba(255,255,255,0.4)",
  "rgba(178,59,35,0.4)",
  "rgba(249,115,22,0.3)",
];

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        top: `${10 + Math.random() * 80}%`,
        size: Math.random() * 8 + 3,
        color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, backgroundColor: p.color }}
          animate={{ y: [0, -120, 0], x: [0, 25, 0], opacity: [0, 0.9, 0], scale: [0.5, 1.3, 0.5] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   3D HERO ORBS
   ============================================================ */
function HeroOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute rounded-full"
        style={{ background: "radial-gradient(circle, rgba(178,59,35,0.35) 0%, transparent 70%)", width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500, top: "5%", left: "-5%" }}
        animate={{ x: [0, 40, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.28) 0%, transparent 70%)", width: "35vw", height: "35vw", maxWidth: 420, maxHeight: 420, top: "25%", right: "-5%" }}
        animate={{ x: [0, -35, 0], y: [0, 55, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ background: "radial-gradient(circle, rgba(178,59,35,0.22) 0%, transparent 70%)", width: "25vw", height: "25vw", maxWidth: 320, maxHeight: 320, bottom: "15%", left: "25%" }}
        animate={{ x: [0, 20, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}

/* ============================================================
   SECTION WRAPPER
   ============================================================ */
function Section({
  id,
  children,
  className = "",
  bg = "white",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bg?: "white" | "gray" | "dark" | "brick";
}) {
  const bgClasses = {
    white: "bg-white dark:bg-[#0d121f]",
    gray: "bg-gray-50 dark:bg-[#090d16]",
    dark: "bg-slate-850 dark:bg-[#06090f] text-white",
    brick: "bg-gradient-to-br from-brick-700 to-brick-900 text-white",
  };
  return (
    <section id={id} className={`relative py-20 md:py-28 transition-colors duration-300 ${bgClasses[bg]} ${className}`}>
      {children}
    </section>
  );
}

/* ============================================================
   SECTION TITLE
   ============================================================ */
function SectionTitle({ title, subtitle, light = false }: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  const { ref, isInView } = useInView(0.2);
  return (
    <div ref={ref} className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
          light ? "bg-white/10 text-white/90" : "bg-brick-50 dark:bg-brick-950/60 text-brick-700 dark:text-brick-400 border border-brick-200 dark:border-brick-800/40"
        }`}
      >
        <Star className="w-4 h-4 text-accent-orange" />
        <span>{subtitle || "مجموعة أولاد خضر"}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-3xl md:text-4xl lg:text-5xl font-black mb-4 ${light ? "text-white" : "text-slate-850 dark:text-white"}`}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="section-divider mx-auto"
      />
    </div>
  );
}

/* ============================================================
   STAT CARD — 3D TILT
   ============================================================ */
function StatCard({ icon: Icon, value, label, delay = 0 }: {
  icon: React.ElementType;
  value: string;
  label: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.2);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      <Tilt3DCard className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 md:p-8 text-center shadow-lg border border-white/20 dark:border-slate-800 hover:shadow-2xl hover:border-brick-500/40 transition-all duration-300 cursor-pointer h-full">
        <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-brick-500 to-brick-700 rounded-xl flex items-center justify-center shadow-lg shadow-brick-600/30">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="text-3xl md:text-4xl font-black gradient-text mb-2">{value}</div>
        <div className="text-gray-600 dark:text-gray-300 font-medium text-sm md:text-base">{label}</div>
      </Tilt3DCard>
    </motion.div>
  );
}

/* ============================================================
   PRODUCT CARD — 3D FLIP
   ============================================================ */
function ProductCard({ title, specs, icon: Icon, color, delay = 0, description }: {
  title: string;
  specs: string[];
  icon: React.ElementType;
  color: string;
  delay?: number;
  description?: string;
}) {
  const { ref, isInView } = useInView(0.15);
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
      className="flip-card h-72 md:h-80 cursor-pointer select-none"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`flip-card-inner${flipped ? " flipped" : ""}`}>
        {/* FRONT */}
        <div className="flip-card-front bg-white dark:bg-slate-900 shadow-xl border border-gray-100 dark:border-slate-800 flex flex-col justify-between">
          <div className={`h-2 ${color}`} />
          <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 text-center gap-3">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${color} flex items-center justify-center shadow-xl`}>
              <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-850 dark:text-white">{title}</h3>
            {description && <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">{description}</p>}
            <div className="flex items-center gap-1.5 text-xs text-brick-600 dark:text-brick-400 font-semibold mt-2 bg-brick-50 dark:bg-brick-950/60 px-3 py-1.5 rounded-full border border-brick-200 dark:border-brick-800/50">
              <span>اضغط لعرض المواصفات</span>
              <motion.span animate={{ rotate: [0, 20, 0] }} transition={{ duration: 1, repeat: Infinity }}>↩</motion.span>
            </div>
          </div>
        </div>
        {/* BACK */}
        <div className={`flip-card-back ${color} flex flex-col p-5 md:p-6 justify-between shadow-2xl`}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Icon className="w-6 h-6 text-white" />
              <h3 className="text-base md:text-lg font-bold text-white">{title}</h3>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-xs mb-3">
              <Ruler className="w-4 h-4" />
              <span className="font-semibold">الأبعاد والمواصفات القياسية:</span>
            </div>
            <div className="space-y-2">
              {specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <CheckCircle className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="text-white text-xs md:text-sm font-medium">{spec}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center text-xs text-white/80 mt-2 border-t border-white/25 pt-2">اضغط للرجوع إلى الواجهة</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   PROJECT CARD — 3D TILT
   ============================================================ */
function ProjectCard({ name, client, location, delay = 0 }: {
  name: string;
  client: string;
  location?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.1);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <Tilt3DCard intensity={8} className="group bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-xl hover:border-brick-400 dark:hover:border-brick-500/50 transition-all duration-300 cursor-pointer h-full">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-brick-50 dark:bg-brick-950/60 flex items-center justify-center flex-shrink-0 group-hover:bg-brick-600 transition-colors duration-300">
            <Landmark className="w-5 h-5 text-brick-600 dark:text-brick-400 group-hover:text-white transition-colors duration-300" />
          </div>
          <div>
            <h4 className="font-bold text-slate-850 dark:text-white mb-1 group-hover:text-brick-600 dark:group-hover:text-brick-400 transition-colors">{name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{client}</p>
            {location && (
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-400 dark:text-gray-500">
                <MapPin className="w-3 h-3 text-brick-500" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>
      </Tilt3DCard>
    </motion.div>
  );
}

/* ============================================================
   CLIENT BADGE
   ============================================================ */
function ClientBadge({ name, delay = 0 }: { name: string; delay?: number }) {
  const { ref, isInView } = useInView(0.1);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.06, y: -4 }}
      className="bg-white dark:bg-slate-900 rounded-xl px-4 py-3 shadow-sm border border-gray-100 dark:border-slate-800 text-center font-semibold text-slate-700 dark:text-gray-200 hover:shadow-md hover:border-brick-400 dark:hover:border-brick-500/50 transition-all duration-300 cursor-default text-xs md:text-sm"
    >
      {name}
    </motion.div>
  );
}

/* ============================================================
   SPEC METRIC CARD — 3D TILT
   ============================================================ */
function SpecMetric({ icon: Icon, label, value, standard, better, delay = 0 }: {
  icon: React.ElementType;
  label: string;
  value: string;
  standard: string;
  better: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.2);
  return (
    <Tilt3DCard intensity={6}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-slate-800 relative overflow-hidden cursor-pointer h-full"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brick-500 to-accent-orange" />
        <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-brick-50 dark:bg-brick-950/40 opacity-40" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brick-500 to-brick-700 flex items-center justify-center shadow-md flex-shrink-0">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-850 dark:text-white">{label}</h3>
          </div>
          <div className="mb-4">
            <div className="text-3xl font-black gradient-text mb-1">{value}</div>
            <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">نتائج فحص مختبرات HBRC & AMS</div>
          </div>
          <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-gray-500 dark:text-gray-400">متوسط النتائج:</span>
              <span className="font-bold text-green-600 dark:text-green-400">{better}</span>
            </div>
            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-gray-500 dark:text-gray-400">الكود المصري ECP 204:</span>
              <span className="font-medium text-gray-700 dark:text-gray-300">{standard}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Tilt3DCard>
  );
}

/* ============================================================
   INTERACTIVE 3D BRICK SHOWCASE COMPONENT
   ============================================================ */
type BrickType = "red_clay" | "cement_solid" | "sand_lime" | "cement_hollow";

interface BrickConfig {
  name: string;
  subtitle: string;
  colorFront: string;
  colorSide: string;
  colorTop: string;
  texture: string;
  hasHoles: boolean;
  dimensions: string;
  weight: string;
  strength: string;
  absorption: string;
}

const BRICK_CONFIGS: Record<BrickType, BrickConfig> = {
  red_clay: {
    name: "طوب طفلي أحمر مثقب",
    subtitle: "المواصفة القياسية المصرية ES 619 — مقاومة ضغط فائقة",
    colorFront: "linear-gradient(135deg, #B23B23 0%, #8E2B18 100%)",
    colorSide: "linear-gradient(135deg, #9a3320 0%, #742213 100%)",
    colorTop: "linear-gradient(135deg, #c4472f 0%, #a43822 100%)",
    texture: "brick-pattern",
    hasHoles: true,
    dimensions: "25 × 12 × 12 سم",
    weight: "3.4 كجم",
    strength: "> 105 kg/cm²",
    absorption: "11.2%",
  },
  cement_solid: {
    name: "طوب أسمنتي مصمت",
    subtitle: "صلابة فائقة للأعمال الإنشائية والجدران الحاملة",
    colorFront: "linear-gradient(135deg, #4b5563 0%, #374151 100%)",
    colorSide: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
    colorTop: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
    texture: "",
    hasHoles: false,
    dimensions: "25 × 12 × 6 سم",
    weight: "4.1 كجم",
    strength: "> 120 kg/cm²",
    absorption: "9.5%",
  },
  sand_lime: {
    name: "طوب وردي (ساند لايم)",
    subtitle: "واجهات معمارية راقية وتشطيبات هندسية متميزة",
    colorFront: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
    colorSide: "linear-gradient(135deg, #be123c 0%, #9f1239 100%)",
    colorTop: "linear-gradient(135deg, #fb7185 0%, #e11d48 100%)",
    texture: "",
    hasHoles: false,
    dimensions: "25 × 12 × 12 سم",
    weight: "3.8 كجم",
    strength: "> 115 kg/cm²",
    absorption: "10.0%",
  },
  cement_hollow: {
    name: "بلوك أسمنتي مفرغ",
    subtitle: "عزل حراري وصوتي عالي مع خفة في الوزن",
    colorFront: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
    colorSide: "linear-gradient(135deg, #475569 0%, #334155 100%)",
    colorTop: "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)",
    texture: "",
    hasHoles: true,
    dimensions: "40 × 20 × 20 سم",
    weight: "14.5 كجم",
    strength: "> 75 kg/cm²",
    absorption: "8.8%",
  },
};

function Interactive3DBrick() {
  const [selectedType, setSelectedType] = useState<BrickType>("red_clay");
  const [rotX, setRotX] = useState(-18);
  const [rotY, setRotY] = useState(38);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showPressureTest, setShowPressureTest] = useState(false);
  const [scale, setScale] = useState(1);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const currentConfig = BRICK_CONFIGS[selectedType];

  useEffect(() => {
    if (!isAutoRotate) return;
    const interval = setInterval(() => {
      setRotY((prev) => (prev + 0.6) % 360);
    }, 24);
    return () => clearInterval(interval);
  }, [isAutoRotate]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    setIsAutoRotate(false);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setRotY((prev) => prev + dx * 0.7);
    setRotX((prev) => Math.max(-60, Math.min(60, prev - dy * 0.7)));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Dimensions in pixels for realistic 3D cuboid
  const width = 230;   // 25 cm
  const height = 110;  // 12 cm
  const depth = 110;   // 12 cm

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        title="فحص قالب الطوب التفاعلي 3D"
        subtitle="معاينة ثلاثية الأبعاد للمواصفات الهندسية"
      />

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Controls & Specs Column */}
        <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-850 dark:text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-brick-600" />
              اختر نوع الطوب للمعاينة ثلاثية الأبعاد
            </h3>

            <div className="grid grid-cols-2 gap-2 mb-6">
              {(Object.keys(BRICK_CONFIGS) as BrickType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 border ${
                    selectedType === type
                      ? "bg-brick-600 text-white border-brick-600 shadow-md shadow-brick-600/30"
                      : "bg-gray-50 dark:bg-slate-800 text-slate-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-brick-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {BRICK_CONFIGS[type].name.split(" ")[0] + " " + (BRICK_CONFIGS[type].name.split(" ")[1] || "")}
                </button>
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-100 dark:border-slate-800 pt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">النوع:</span>
                <span className="font-bold text-slate-850 dark:text-white">{currentConfig.name}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">الأبعاد القياسية:</span>
                <span className="font-mono font-bold text-brick-600 dark:text-brick-400">{currentConfig.dimensions}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">مقاومة الضغط الفعلي:</span>
                <span className="font-bold text-green-600 dark:text-green-400">{currentConfig.strength}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">نسبة الامتصاص:</span>
                <span className="font-bold text-slate-700 dark:text-gray-300">{currentConfig.absorption}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">الوزن التقريبي:</span>
                <span className="font-bold text-slate-700 dark:text-gray-300">{currentConfig.weight}</span>
              </div>
            </div>

            {/* Quick interactive buttons */}
            <div className="flex flex-wrap gap-2 pt-5 border-t border-gray-100 dark:border-slate-800">
              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  isAutoRotate
                    ? "bg-brick-50 dark:bg-brick-950/60 text-brick-700 dark:text-brick-300 border-brick-300 dark:border-brick-800"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700"
                }`}
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotate ? "animate-spin" : ""}`} />
                {isAutoRotate ? "دوران تلقائي: مفعل" : "دوران يدوي"}
              </button>

              <button
                onClick={() => setShowDimensions(!showDimensions)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  showDimensions
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700"
                }`}
              >
                <Ruler className="w-3.5 h-3.5" />
                المقاسات الهندسية
              </button>

              <button
                onClick={() => setShowPressureTest(!showPressureTest)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  showPressureTest
                    ? "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                اختبار الضغط الافتراضي
              </button>
            </div>
          </div>
        </div>

        {/* 3D Model Stage Column */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div
            className="relative h-[380px] sm:h-[440px] md:h-[480px] bg-gradient-to-b from-gray-100 to-gray-200 dark:from-slate-900/90 dark:to-[#090d16] rounded-3xl border border-gray-200/80 dark:border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center select-none cursor-grab active:cursor-grabbing brick-3d-scene"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* Ambient Lighting & Glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(249,115,22,0.15),transparent_70%)]" />
            <div className="absolute top-4 right-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-gray-300 pointer-events-none border border-black/5 dark:border-white/10 shadow-sm flex items-center gap-1.5">
              <span>اسحب بالماوس أو اللمس للتدوير 360°</span>
            </div>

            {/* Pressure Test Indicator */}
            <AnimatePresence>
              {showPressureTest && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-4 left-4 z-20 bg-slate-900/90 text-white backdrop-blur-md px-4 py-2.5 rounded-xl border border-green-500/40 shadow-xl"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-bold text-green-400">اختبار كسر الضغط HBRC:</span>
                  </div>
                  <div className="text-lg font-black text-white font-mono">112.4 kg/cm²</div>
                  <div className="text-[10px] text-gray-300">الكود المصري: 80 kg/cm² (ناجح بتفوق)</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3D CUBOID BRICK */}
            <div
              className="brick-3d-container"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`,
              }}
            >
              {/* FRONT FACE (Width x Height) */}
              <div
                className="brick-3d-face rounded-sm flex items-center justify-center"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  background: currentConfig.colorFront,
                  transform: `translateZ(${depth / 2}px)`,
                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.35)",
                }}
              >
                <div className="text-white/40 font-black text-xs tracking-widest uppercase pointer-events-none">
                  AWLAD KHEDR
                </div>
                {showDimensions && (
                  <div className="absolute bottom-2 text-[10px] text-white/90 bg-black/40 px-2 py-0.5 rounded font-mono">
                    25 cm
                  </div>
                )}
              </div>

              {/* BACK FACE (Width x Height) */}
              <div
                className="brick-3d-face rounded-sm"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  background: currentConfig.colorFront,
                  transform: `rotateY(180deg) translateZ(${depth / 2}px)`,
                  boxShadow: "inset 0 0 25px rgba(0,0,0,0.45)",
                }}
              />

              {/* TOP FACE (Width x Depth) with PERFORATION HOLES */}
              <div
                className="brick-3d-face rounded-sm p-2 flex items-center justify-around"
                style={{
                  width: `${width}px`,
                  height: `${depth}px`,
                  background: currentConfig.colorTop,
                  transform: `rotateX(90deg) translateZ(${height / 2}px)`,
                  boxShadow: "inset 0 0 15px rgba(0,0,0,0.25)",
                }}
              >
                {currentConfig.hasHoles && (
                  <div className="w-full h-full grid grid-rows-2 grid-cols-5 gap-1.5 p-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-full shadow-inner border border-black/40"
                        style={{
                          background: "radial-gradient(circle, #2b0b06 0%, #000 80%)",
                          boxShadow: "inset 0 3px 5px rgba(0,0,0,0.9)",
                        }}
                      />
                    ))}
                  </div>
                )}
                {showDimensions && (
                  <div className="absolute top-2 left-2 text-[10px] text-white/90 bg-black/40 px-2 py-0.5 rounded font-mono">
                    12 cm
                  </div>
                )}
              </div>

              {/* BOTTOM FACE (Width x Depth) with HOLES */}
              <div
                className="brick-3d-face rounded-sm p-2 flex items-center justify-around"
                style={{
                  width: `${width}px`,
                  height: `${depth}px`,
                  background: currentConfig.colorTop,
                  transform: `rotateX(-90deg) translateZ(${height / 2}px)`,
                  boxShadow: "inset 0 0 30px rgba(0,0,0,0.6)",
                }}
              >
                {currentConfig.hasHoles && (
                  <div className="w-full h-full grid grid-rows-2 grid-cols-5 gap-1.5 p-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-full shadow-inner border border-black/50"
                        style={{
                          background: "radial-gradient(circle, #1a0603 0%, #000 80%)",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT FACE (Depth x Height) */}
              <div
                className="brick-3d-face rounded-sm flex items-center justify-center"
                style={{
                  width: `${depth}px`,
                  height: `${height}px`,
                  background: currentConfig.colorSide,
                  transform: `rotateY(90deg) translateZ(${width - depth / 2}px)`,
                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.4)",
                }}
              >
                {showDimensions && (
                  <div className="text-[10px] text-white/90 bg-black/40 px-2 py-0.5 rounded font-mono">
                    12 cm
                  </div>
                )}
              </div>

              {/* LEFT FACE (Depth x Height) */}
              <div
                className="brick-3d-face rounded-sm flex items-center justify-center"
                style={{
                  width: `${depth}px`,
                  height: `${height}px`,
                  background: currentConfig.colorSide,
                  transform: `rotateY(-90deg) translateZ(${depth / 2}px)`,
                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.4)",
                }}
              />
            </div>

            {/* Simulated Shadow Under Brick */}
            <div
              className="absolute bottom-10 w-48 h-8 rounded-full bg-black/25 dark:bg-black/60 blur-md pointer-events-none"
              style={{
                transform: `scale(${scale * (1 + rotX * 0.005)})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PROJECT COST & INSTANT QUOTE ESTIMATOR (PRICE OVER / LUXURY)
   ============================================================ */
function ProjectQuoteEstimator() {
  const [projectType, setProjectType] = useState("national");
  const [brickGrade, setBrickGrade] = useState("clay_super");
  const [quantity, setQuantity] = useState(50); // in thousands (50k)
  const [destination, setDestination] = useState("القاهرة الجديدة / العاصمة الإدارية");

  const projectTypes = [
    { id: "national", name: "مشروع قومي / جهات حكومية", multiplier: 1.0, badge: "اعتماد رسمي مباشر" },
    { id: "compound", name: "كمبوند وأبراج استثمارية", multiplier: 1.05, badge: "توريد أسطول كامل" },
    { id: "villas", name: "فيلات وقصور خاصة", multiplier: 1.1, badge: "فرز أول فاخر A+" },
    { id: "commercial", name: "مقاولات عامة وتجاري", multiplier: 1.0, badge: "أسعار مصنع بالجملة" },
  ];

  const brickGrades = [
    { id: "clay_super", name: "طوب طفلي مثقب درجة أولى أ (ECP 204)", base: 1850 },
    { id: "cement_solid", name: "طوب أسمنتي مصمت فائق التحمل", base: 1950 },
    { id: "sand_lime", name: "طوب وردي ساند لايم فاخر للواجهات", base: 2600 },
    { id: "interlock", name: "إنترلوك وبردورات للأرضيات الخارجية", base: 2200 },
  ];

  const totalBricks = quantity * 1000;
  const currentGrade = brickGrades.find((g) => g.id === brickGrade) || brickGrades[0];
  const currentProject = projectTypes.find((p) => p.id === projectType) || projectTypes[0];

  // Estimated trailer trucks (approx 10,000 bricks per trailer)
  const estimatedTrucks = Math.ceil(totalBricks / 10000);

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم، أود طلب عرض أسعار رسمي معتمد من مجموعة أولاد خضر:\n- نوع المشروع: ${currentProject.name}\n- نوع الطوب: ${currentGrade.name}\n- الكمية المطلوبة: ${totalBricks.toLocaleString()} طوبة (${quantity} ألف)\n- موقع التوريد: ${destination}\n\nيرجى إرسال عرض السعر المعتمد مع شهادات الجودة.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        title="حاسبة المشروعات والتسعير الفوري المعتمد"
        subtitle="خدمة كبار العملاء والمشاريع الكبرى"
      />

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Estimator Configuration */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-850 dark:text-white mb-2 flex items-center gap-2">
                <Building className="w-4 h-4 text-brick-600" />
                تصنيف المشروع الهندسي
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {projectTypes.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setProjectType(pt.id)}
                    className={`p-3 rounded-xl text-right text-xs sm:text-sm font-bold transition-all border ${
                      projectType === pt.id
                        ? "bg-brick-50 dark:bg-brick-950/60 border-brick-600 text-brick-700 dark:text-brick-300 shadow-sm"
                        : "bg-gray-50 dark:bg-slate-800/60 border-gray-200 dark:border-slate-700 text-slate-700 dark:text-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <div>{pt.name}</div>
                    <span className="text-[10px] text-brick-600 dark:text-brick-400 font-normal">
                      {pt.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-850 dark:text-white mb-2 flex items-center gap-2">
                <BrickWall className="w-4 h-4 text-brick-600" />
                نوع ومواصفة الطوب المطلوبة
              </label>
              <div className="space-y-2">
                {brickGrades.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setBrickGrade(bg.id)}
                    className={`w-full p-3 rounded-xl text-right text-xs sm:text-sm font-semibold transition-all border flex items-center justify-between ${
                      brickGrade === bg.id
                        ? "bg-brick-50 dark:bg-brick-950/60 border-brick-600 text-brick-700 dark:text-brick-300 shadow-sm"
                        : "bg-gray-50 dark:bg-slate-800/60 border-gray-200 dark:border-slate-700 text-slate-700 dark:text-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <span>{bg.name}</span>
                    <CheckCircle2
                      className={`w-4 h-4 ${brickGrade === bg.id ? "text-brick-600" : "text-transparent"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-slate-850 dark:text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-brick-600" />
                  حجم التوريد المطلوب (بالألف طوبة)
                </label>
                <span className="font-mono text-base font-black text-brick-600 dark:text-brick-400">
                  {totalBricks.toLocaleString()} طوبة ({quantity} ألف)
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brick-600"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>10 آلاف (حد أدنى)</span>
                <span>100 ألف</span>
                <span>250 ألف</span>
                <span>500 ألف+ (عقود كبرى)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-850 dark:text-white mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brick-600" />
                موقع التوريد والمشروع
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-850 dark:text-white text-sm font-semibold outline-none focus:border-brick-500"
              >
                <option value="القاهرة الجديدة / العاصمة الإدارية">القاهرة الجديدة / العاصمة الإدارية الجديدة</option>
                <option value="مدينة 6 أكتوبر / الشيخ زايد">مدينة 6 أكتوبر / الشيخ زايد</option>
                <option value="الساحل الشمالي / العلمين الجديدة">الساحل الشمالي / العلمين الجديدة</option>
                <option value="محافظة الجيزة / البدرشين / دهشور">محافظة الجيزة / البدرشين / دهشور</option>
                <option value="محافظات القناة / الإسماعيلية / السويس">محافظات القناة / الإسماعيلية / السويس</option>
                <option value="محافظات الدلتا والإسكندرية">محافظات الدلتا والإسكندرية</option>
                <option value="محافظات الصعيد">محافظات الصعيد</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Official Quote Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brick-600/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brick-500/20 text-brick-300 text-xs font-bold border border-brick-500/30 mb-5">
              <Zap className="w-3.5 h-3.5 text-accent-orange" />
              تسعير مباشر معتمد من المصنع
            </div>

            <h3 className="text-2xl font-black mb-2">ملخص طلب التسعير المعتمد</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
              يتم إعداد عروض الأسعار مع تطبيق أفضل الخصومات للكميات والمشاريع الاستراتيجية.
            </p>

            <div className="space-y-3.5 bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">إجمالي الكمية:</span>
                <span className="font-bold text-white font-mono">{totalBricks.toLocaleString()} طوبة</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">عدد سيارات النقل التقديري:</span>
                <span className="font-bold text-accent-orange font-mono">~ {estimatedTrucks} تريلا هيدروليكية</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">درجة الاعتماد:</span>
                <span className="font-bold text-green-400">مطابق لكود ECP 204 للمشاريع القومية</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">الفحص المعملي:</span>
                <span className="font-bold text-white">شهادات مختبرات HBRC مجانية</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">معدل كسر التوريد:</span>
                <span className="font-bold text-green-400">&lt; 0.5% (الأدنى هندسياً)</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <CheckCircle className="w-4 h-4 text-accent-orange flex-shrink-0" />
                <span>أولوية فورية في جدول الإنتاج والتوريد اليومي</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <CheckCircle className="w-4 h-4 text-accent-orange flex-shrink-0" />
                <span>أسطول نقل خاص مجهز برافعات هيدروليكية للتفريغ السليم</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <CheckCircle className="w-4 h-4 text-accent-orange flex-shrink-0" />
                <span>تسهيلات تعاقدية للمشاريع الكبرى والمقاولات الاستراتيجية</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <motion.a
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={`https://wa.me/201060507294?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-brick-600 to-brick-700 hover:from-brick-500 hover:to-brick-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-brick-600/30 flex items-center justify-center gap-2 text-center"
            >
              <MessageCircle className="w-5 h-5" />
              طلب عرض أسعار معتمد عبر واتساب (مباشر)
            </motion.a>

            <a
              href="tel:+201101909046"
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors text-center border border-white/10"
            >
              <Phone className="w-4 h-4 text-accent-orange" />
              الاتصال بمسؤول تسعير المشاريع: 01101909046
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN HOMEPAGE COMPONENT
   ============================================================ */
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("ak_theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("ak_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("ak_theme", "light");
      }
      return next;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "الرئيسية" },
    { href: "#about", label: "عن المجموعة" },
    { href: "#products", label: "المنتجات" },
    { href: "#quality", label: "الجودة والمواصفات" },
    { href: "#portfolio", label: "سابقة الأعمال" },
    { href: "#3d-brick", label: "معاينة 3D" },
    { href: "#calculator", label: "حاسبة الأسعار" },
    { href: "#info", label: "معلومات" },
    { href: "#contact", label: "تواصل معنا" },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen transition-colors duration-300">
      {/* ============================================================
          HEADER
          ============================================================ */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg py-3 border-b border-gray-100 dark:border-slate-800"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
              className="flex items-center gap-3 group"
            >
              <motion.div
                whileHover={{ scale: 1.08, rotateY: 15 }}
                transition={{ type: "spring", stiffness: 400 }}
                style={{ perspective: "400px" }}
                className="relative w-12 h-12 md:w-14 md:h-14 p-1.5 rounded-2xl bg-white/10 dark:bg-slate-800/60 backdrop-blur-md border border-white/20 dark:border-slate-700 shadow-md group-hover:border-brick-500/50 group-hover:shadow-brick-600/20 transition-all duration-300 flex-shrink-0 flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/images/logo.png"
                    alt="Awlad Khedr Logo"
                    fill
                    className="object-contain drop-shadow-md"
                    priority
                  />
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span
                  className={`text-base sm:text-lg md:text-xl font-bold leading-tight ${
                    scrolled ? "text-slate-850 dark:text-white" : "text-white"
                  }`}
                >
                  أولاد خضر
                </span>
                <span
                  className={`text-[10px] sm:text-xs font-medium ${
                    scrolled ? "text-brick-600 dark:text-brick-400" : "text-white/80"
                  }`}
                >
                  Awlad Khedr Group
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className={`nav-link px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                    scrolled
                      ? "text-slate-700 dark:text-gray-300 hover:text-brick-600 dark:hover:text-brick-400 hover:bg-brick-50 dark:hover:bg-slate-800"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions: Theme Toggle + WhatsApp + Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Dark / Night Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                title={isDark ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"}
                className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
                  scrolled
                    ? "bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700"
                    : "bg-white/15 text-white border-white/20 hover:bg-white/25"
                }`}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5 text-amber-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5 text-slate-700 dark:text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Direct WhatsApp CTA */}
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/201060507294"
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-md ${
                  scrolled
                    ? "bg-gradient-to-r from-brick-600 to-brick-700 text-white shadow-brick-600/25"
                    : "bg-white text-brick-700"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                واتساب
              </motion.a>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`xl:hidden p-2 rounded-lg transition-colors flex items-center justify-center w-10 h-10 ${
                  scrolled ? "text-slate-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800" : "text-white hover:bg-white/10"
                }`}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden absolute top-full right-0 left-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl border-t border-gray-100 dark:border-slate-800 overflow-hidden"
            >
              <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="flex items-center px-4 py-3 rounded-lg text-slate-700 dark:text-gray-200 font-bold hover:bg-brick-50 dark:hover:bg-slate-800 hover:text-brick-700 dark:hover:text-brick-400 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}

                <div className="pt-3 border-t border-gray-100 dark:border-slate-800 grid grid-cols-2 gap-2">
                  <a
                    href="tel:+201060507294"
                    className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold"
                  >
                    <Phone className="w-3.5 h-3.5 text-brick-600" />
                    01060507294
                  </a>
                  <a
                    href="tel:+201101909046"
                    className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold"
                  >
                    <Phone className="w-3.5 h-3.5 text-brick-600" />
                    01101909046
                  </a>
                </div>

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  href="https://wa.me/201060507294"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mt-3 px-5 py-3 rounded-xl bg-gradient-to-r from-brick-600 to-brick-700 text-white font-bold shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  تواصل عبر واتساب
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/factory-bg.jpg"
          alt="مصنع أولاد خضر"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85" />
        <div className="absolute inset-0 bg-brick-950/35" />
        <HeroOrbs />
        <FloatingParticles />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/95 text-xs sm:text-sm font-semibold mb-8 border border-white/15 shadow-xl"
          >
            <Clock className="w-4 h-4 text-accent-orange" />
            منذ عام 1983م — أكثر من 40 عاماً من الخبرة والريادة
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight"
          >
            أكثر من <span className="shimmer-text">40 عاماً</span> من الجودة
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            والصلابة في تصنيع وتوريد الطوب
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
          >
            المورد المعتمد لأكبر المشاريع القومية والعسكرية والهندسية في جمهورية مصر العربية.
            نصنع الثقة بجودة لا تقبل المساومة وأسطول نقل مباشر لموقعك.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16"
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              href="#calculator"
              onClick={(e) => { e.preventDefault(); scrollToSection("#calculator"); }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brick-600 to-brick-700 hover:from-brick-500 hover:to-brick-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-brick-600/35 flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              حاسبة الأسعار وطلب تسعير معتمد
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              href="#3d-brick"
              onClick={(e) => { e.preventDefault(); scrollToSection("#3d-brick"); }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md text-white font-bold text-base sm:text-lg border border-white/25 hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <Layers className="w-5 h-5 text-accent-orange" />
              فحص الطوب بتقنية 3D
            </motion.a>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <StatCard icon={Clock} value="+40" label="عاماً من الريادة" delay={0.4} />
            <StatCard icon={Factory} value="+11" label="خط إنتاج ومصنع" delay={0.5} />
            <StatCard icon={Landmark} value="+50" label="مشروع قومي واستراتيجي" delay={0.6} />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </section>

      {/* ============================================================
          ABOUT SECTION
          ============================================================ */}
      <Section id="about" bg="gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="عن المجموعة" subtitle="من نحن" />
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div className="space-y-6">
              <Tilt3DCard intensity={5} className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-slate-800 cursor-pointer">
                <h3 className="text-2xl font-black text-slate-850 dark:text-white mb-4">
                  رائدة صناعة الطوب في مصر منذ 1983
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
                  تأسست مجموعة أولاد خضر عام 1983م، وعلى مدار أكثر من أربعة عقود،
                  رسّخت مكانتها كإحدى أكبر وأعرق المجموعات الصناعية المتخصصة في تصنيع وتوريد
                  كافة أنواع الطوب في جمهورية مصر العربية.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                  نمتلك شبكة متكاملة من المصانع والخطوط الإنتاجية المتطورة تغطي كافة احتياجات
                  السوق من الطوب الطفلي والأسمنتي والوردي (الساند لايم) والإنترلوك
                  والبردورات، بمواصفات قياسية تتجاوز متطلبات الكود المصري للهندسة المدنية.
                </p>
              </Tilt3DCard>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Factory, title: "+5 مصانع طوب طفلي", desc: "طوب أحمر مثقب بأعلى مواصفات كود ECP 204" },
                  { icon: Building, title: "+4 مصانع طوب أسمنتي", desc: "بلوك مصمت ومفرغ عالي التحمل" },
                  { icon: BrickWall, title: "طوب وردي (ساند لايم)", desc: "إنتاج حديث للواجهات المعمارية الراقية" },
                  { icon: Truck, title: "إنترلوك وبردورات", desc: "تشطيبات أرضيات متينة للكمبوندات والطرق" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md hover:border-brick-200 dark:hover:border-brick-800 transition-all duration-300 cursor-pointer"
                  >
                    <item.icon className="w-8 h-8 text-brick-600 dark:text-brick-400 mb-3" />
                    <h4 className="font-bold text-slate-850 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-gradient-to-br from-brick-700 via-brick-800 to-brick-950 rounded-2xl p-6 md:p-8 text-white shadow-xl border border-brick-600/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative w-14 h-14 p-2 flex-shrink-0 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 shadow-lg flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image src="/images/logo.png" alt="Awlad Khedr Logo" fill className="object-contain drop-shadow-sm" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">سلسلة مصانع وخطوط إنتاج المجموعة</h3>
                    <p className="text-xs text-white/70">طاقات إنتاجية ضخمة تغطي كافة المحافظات</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { name: "مصنع أبو رمود", desc: "أحد أقدم وأكبر مصانع الطوب الطفلي في سلسلة المجموعة" },
                    { name: "مصنع الأمانة", desc: "تأسس عام 2020 — خطوط أوتوماتيكية حديثة" },
                    { name: "مصنع أبو مزروع", desc: "إنتاج الطوب الأحمر المثقب بمواصفات المشروعات القومية" },
                    { name: "مصنع المعراج", desc: "خط إنتاج متكامل بطاقة استيعابية عالية" },
                    { name: "مصنع عمدة أبو هيكل", desc: "طاقة إنتاجية ضخمة وجودة فرز أول دائم" },
                    { name: "مصنع العمار", desc: "تخصص هندسي في إنتاج الطوب الأحمر المثقب" },
                    { name: "مصنع أبو حنيش", desc: "أحدث إضافات المجموعة لتلبية الطلب المتزايد" },
                    { name: "سنجر بريك", desc: "خط إنتاج متطور بتقنيات تجفيف وحرق حراري دقيقة" },
                    { name: "سنجر بدوي", desc: "تجهيزات حديثة لتوريدات المشروعات الكبرى" },
                  ].map((entity, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 text-accent-orange flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm mb-0.5">{entity.name}</h4>
                        <p className="text-[11px] sm:text-xs text-white/75">{entity.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Experience badge with 3D spin */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-800 flex items-center gap-6"
              >
                <motion.div
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ perspective: "300px", transformStyle: "preserve-3d" }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-brick-500 to-brick-700 flex items-center justify-center shadow-xl flex-shrink-0"
                >
                  <span className="text-2xl font-black text-white">40+</span>
                </motion.div>
                <div>
                  <h4 className="text-xl font-bold text-slate-850 dark:text-white mb-1">عاماً من التميز والريادة</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                    نفخر بتاريخنا العريق وثقة كبرى شركات المقاولات والهيئات الاستشارية في كل مشروع.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          PRODUCTS SECTION
          ============================================================ */}
      <Section id="products" bg="white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="المنتجات والمواصفات الفنية" subtitle="كتالوج المنتجات المعيارية" />
          <p className="text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-10 -mt-8">
            🔄 اضغط على أي بطاقة لعرض الأبعاد والمواصفات القياسية التفصيلية
          </p>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            <ProductCard
              title="طوب طفلي مثقب (أحمر)"
              icon={BrickWall}
              color="bg-gradient-to-br from-red-600 to-red-800"
              description="الطوب الأحمر المثقب بأعلى مواصفات الجودة المصرية ES 619 وكود الخرسانة ECP 204"
              specs={[
                "25 × 12 × 12 سم — الطوبة الكاملة (الأكثر طلباً)",
                "25 × 12 × 6 سم — نصف الطوبة للربط الإنشائي",
                "25 × 10 × 12 سم — المقاس البديل للمشاريع الخاصة",
              ]}
              delay={0}
            />
            <ProductCard
              title="طوب أسمنتي مصمت"
              icon={Building}
              color="bg-gradient-to-br from-gray-600 to-gray-800"
              description="طوب أسمنتي مصمت عالي الكثافة ومقاوم للرطوبة والأحمال الهندسية العالية"
              specs={["25 × 12 × 6 سم — طوب أسمنتي مصمت بأعلى مقاومة كسر"]}
              delay={0.1}
            />
            <ProductCard
              title="بلوك أسمنتي مفرغ"
              icon={Home}
              color="bg-gradient-to-br from-slate-600 to-slate-800"
              description="بلوك مفرغ للجدران الإنشائية، القواطع، والحوائط العازلة للصوت والحرارة"
              specs={[
                "40 × 20 × 20 سم — البلوك الكبير للمباني الخارجية",
                "40 × 20 × 12 سم — البلوك المتوسط للقواطع الداخلية",
              ]}
              delay={0.2}
            />
            <ProductCard
              title="طوب وردي وإنترلوك وبردورات"
              icon={Landmark}
              color="bg-gradient-to-br from-rose-600 to-red-900"
              description="تشطيبات معمارية فاخرة للواجهات الخارجية، اللاندسكيب، والأرصفة"
              specs={[
                "طوب وردي (ساند لايم) بأبعاد متنوعة للواجهات الفاخرة",
                "بديل الوردي — حلول اقتصادية معمارية متميزة",
                "إنترلوك عالي التحمل — تشطيبات أرضيات ولاندسكيب",
                "بردورات طرق وأرصفة بمختلف المقاسات",
              ]}
              delay={0.3}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              className="inline-flex items-center gap-2 bg-brick-50 dark:bg-slate-900 text-brick-700 dark:text-brick-400 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm border border-brick-200 dark:border-slate-800 shadow-sm"
            >
              <Truck className="w-5 h-5 text-brick-600" />
              <span>توريد فوري لكافة المشروعات الاستراتيجية بكميات تجارية وأسطول خاص</span>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* ============================================================
          QUALITY SECTION
          ============================================================ */}
      <Section id="quality" bg="gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="الجودة والمواصفات الفنية" subtitle="شهادات معتمدة وتقارير معملية" />

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
            <SpecMetric
              icon={TrendingUp}
              label="مقاومة كسر الضغط"
              value="> 105 kg/cm²"
              standard="80 kg/cm²"
              better="تتجاوز متطلبات الكود بنسبة 31%"
              delay={0}
            />
            <SpecMetric
              icon={Droplets}
              label="نسبة امتصاص الماء"
              value="10.6% – 12%"
              standard="16% (حد أقصى مسموح به)"
              better="أفضل من الحد المسموح بـ 25%"
              delay={0.1}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Standards */}
            <Tilt3DCard intensity={4} className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-slate-800 cursor-pointer h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brick-500 to-brick-700 flex items-center justify-center shadow-md">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-850 dark:text-white">الامتثال للمواصفات والأكواد</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">فحوصات دورية ومطابقة تامة</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { code: "ES 619-48", name: "المواصفة القياسية المصرية للطوب الطفلي المثقب" },
                  { code: "ECP 204-2005", name: "كود الخرسانة المسلحة — متطلبات الجدران الحاملة والقواطع" },
                  { code: "HBRC", name: "تقارير فحص معتمدة من المركز القومي لبحوث الإسكان والبناء" },
                  { code: "AMS Lab", name: "تقارير فحص وضغط دورية معتمدة من مختبرات AMS الدولية" },
                ].map((std, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-800/60 hover:bg-brick-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-brick-200 dark:hover:border-slate-700"
                  >
                    <Shield className="w-5 h-5 text-brick-600 dark:text-brick-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-850 dark:text-white text-sm">{std.code}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{std.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Tilt3DCard>

            {/* Approvals */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 rounded-2xl p-6 md:p-8 text-white shadow-xl border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-accent-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">اعتمادات رسمية واستشارية</h3>
                    <p className="text-xs text-gray-400">سجل حافل بالثقة في المشروعات الكبرى</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "الهيئة الهندسية للقوات المسلحة", desc: "اعتماد رسمي كمورد للمشاريع القومية والعسكرية الإنشائية" },
                    { title: "DIAA Consult الاستشاري", desc: "اعتماد استشاري رسمي لمشروع رافيل — محور المشير طنطاوي" },
                    { title: "كبرى شركات المقاولات العملاقة", desc: "مورد معتمد لشركة المقاولون العرب، طلعت مصطفى، تطوير مصر" },
                  ].map((approval, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      whileHover={{ x: -4 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <CheckCircle className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm mb-1">{approval.title}</h4>
                        <p className="text-xs text-white/60 leading-relaxed">{approval.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          PORTFOLIO SECTION
          ============================================================ */}
      <Section id="portfolio" bg="white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="سابقة الأعمال" subtitle="مشاريعنا وعملاؤنا" />

          {/* Clients */}
          <div className="mb-16">
            <h3 className="text-lg md:text-xl font-bold text-slate-850 dark:text-white mb-6 text-center">
              كبرى الجهات والشركات التي نعتز بالتعاون معها
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {[
                "الهيئة الهندسية للقوات المسلحة", "المقاولون العرب", "طلعت مصطفى (الرحاب)",
                "النصر العامة للمقاولات", "السعادة للمقاولات", "النوبي للمقاولات",
                "تطوير مصر", "EEC Group", "National Contracting Co.", "شركة الأمانة للمقاولات",
              ].map((client, i) => (
                <ClientBadge key={i} name={client} delay={i * 0.04} />
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-850 dark:text-white mb-6 text-center">
              أبرز المشاريع التي تم توريدها
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "مشروع رافيل — محور المشير", client: "DIAA Consult", location: "القاهرة الجديدة" },
                { name: "تطوير قناة السويس", client: "الهيئة الهندسية", location: "الإسماعيلية" },
                { name: "جامعة الإسماعيلية الأهلية", client: "جهات حكومية", location: "الإسماعيلية" },
                { name: "جامعة مصر للعلوم (MUST)", client: "جهات تعليمية", location: "6 أكتوبر" },
                { name: "جامعة أسيوط التكنولوجية", client: "وزارة التعليم العالي", location: "أسيوط" },
                { name: "مستشفى المنصورة للأورام Oncology", client: "جهات صحية", location: "المنصورة" },
                { name: "مستشفى سوهاج للأورام", client: "جهات صحية", location: "سوهاج" },
                { name: "مستشفى العباسية للصحة النفسية", client: "وزارة الصحة", location: "القاهرة" },
                { name: "كمبوند الكوثر الغردقة", client: "تطوير مصر", location: "الغردقة" },
                { name: "منتجع فريدة — العين السخنة", client: "استثمار سياحي", location: "العين السخنة" },
                { name: "مدينة الرحاب", client: "مجموعة طلعت مصطفى", location: "القاهرة الجديدة" },
                { name: "مشاريع قومية وإسكان اجتماعي", client: "المقاولون العرب", location: "محافظات مصر" },
              ].map((project, i) => (
                <ProjectCard
                  key={i}
                  name={project.name}
                  client={project.client}
                  location={project.location}
                  delay={i * 0.04}
                />
              ))}
            </div>
          </div>

          {/* Workers Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-20 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800"
          >
            <div className="grid lg:grid-cols-2 min-h-[440px]">
              <div className="relative w-full h-[320px] sm:h-[380px] md:h-[440px] lg:h-full min-h-[300px] overflow-hidden">
                <Image
                  src="/images/workers.jpg"
                  alt="فريق عمال مصانع أولاد خضر"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-slate-900/70 pointer-events-none" />
              </div>
              <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 flex flex-col justify-center px-8 md:px-12 py-10 text-white">
                <div className="inline-flex items-center gap-2 bg-brick-600/20 text-brick-300 text-xs font-bold px-3 py-1.5 rounded-full mb-5 w-fit border border-brick-500/30">
                  <Users className="w-3.5 h-3.5" />
                  فريقنا الإنساني
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 leading-snug">
                  وراء كل طوبة…<br />
                  <span className="text-brick-400">أيادٍ أمينة ومخلصة</span>
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed mb-8">
                  فريق عمالنا وخبرائنا هو سر نجاحنا الحقيقي. بخبرة تمتد لعقود، يحرص كل مهندس وفني وعامل
                  على فحص وتسليم منتج يليق بالمشاريع الكبرى التي نخدمها في جميع أنحاء مصر.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  {[
                    { value: "+40", label: "عاماً من الخبرة" },
                    { value: "+9", label: "مصانع متكاملة" },
                    { value: "+50", label: "مشروع قومي" },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl md:text-3xl font-black text-brick-400 mb-1">{s.value}</div>
                      <div className="text-xs text-gray-500 leading-tight">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ============================================================
          INTERACTIVE 3D BRICK SHOWCASE (LAST OF THE WEB)
          ============================================================ */}
      <Section id="3d-brick" bg="gray" className="overflow-hidden">
        <Interactive3DBrick />
      </Section>

      {/* ============================================================
          PROJECT COST ESTIMATOR (PRICE OVER / VALUE ESCALATOR)
          ============================================================ */}
      <Section id="calculator" bg="white">
        <ProjectQuoteEstimator />
      </Section>

      {/* ============================================================
          CONTACT SECTION
          ============================================================ */}
      <Section id="contact" bg="gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="تواصل معنا" subtitle="نحن في خدمتكم على مدار الساعة" />
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <Tilt3DCard intensity={5} className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-slate-800 cursor-pointer">
                <h3 className="text-xl font-bold text-slate-850 dark:text-white mb-6">قنوات الاتصال المباشرة</h3>
                <div className="space-y-4">
                  {/* Phone 1 */}
                  <motion.a
                    href="tel:+201060507294"
                    whileHover={{ x: -4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/60 hover:bg-brick-50 dark:hover:bg-slate-800 transition-colors group border border-transparent hover:border-brick-200 dark:hover:border-slate-700"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brick-500 to-brick-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">الخط الساخن / واتساب للمبيعات</div>
                      <div className="font-bold text-slate-850 dark:text-white text-base sm:text-lg font-mono">01060507294</div>
                    </div>
                  </motion.a>

                  {/* Phone 2 (Added as requested) */}
                  <motion.a
                    href="tel:+201101909046"
                    whileHover={{ x: -4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/60 hover:bg-brick-50 dark:hover:bg-slate-800 transition-colors group border border-transparent hover:border-brick-200 dark:hover:border-slate-700"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brick-600 to-brick-800 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">إدارة المشاريع والتوريدات الكبرى</div>
                      <div className="font-bold text-slate-850 dark:text-white text-base sm:text-lg font-mono">01101909046</div>
                    </div>
                  </motion.a>

                  {/* Email (Updated to khedrawlad@gmail.com) */}
                  <motion.a
                    href="mailto:khedrawlad@gmail.com"
                    whileHover={{ x: -4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/60 hover:bg-brick-50 dark:hover:bg-slate-800 transition-colors group border border-transparent hover:border-brick-200 dark:hover:border-slate-700"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brick-500 to-brick-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">البريد الإلكتروني الرسمي</div>
                      <div className="font-bold text-slate-850 dark:text-white text-sm sm:text-base font-mono">khedrawlad@gmail.com</div>
                    </div>
                  </motion.a>

                  {/* Locations */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/60 border border-transparent">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brick-500 to-brick-700 flex items-center justify-center shadow-md flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">مواقع المصانع وساحات التحميل</div>
                      <div className="space-y-1 text-xs sm:text-sm font-semibold text-slate-850 dark:text-gray-200">
                        <div>• الشوبك الغربي — مركز البدرشين (الجيزة)</div>
                        <div>• منطقة مصانع عرب أبو ساعد</div>
                        <div>• كفر حميد — خطوط الإنتاج الحديثة</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt3DCard>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-slate-800"
              >
                <h3 className="text-lg font-bold text-slate-850 dark:text-white mb-4">تابعنا على المنصات الاجتماعية</h3>
                <div className="flex flex-wrap gap-2.5">
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href="https://www.facebook.com/share/14qJfAuzFV7/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2] text-white font-semibold text-xs sm:text-sm hover:shadow-lg transition-shadow"
                  >
                    <Facebook className="w-4 h-4" />
                    فيسبوك
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href="https://www.facebook.com/share/19CaBxAqbi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold text-xs sm:text-sm hover:shadow-lg transition-shadow"
                  >
                    <Instagram className="w-4 h-4" />
                    إنستجرام
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href="https://www.facebook.com/share/19RxudTn9m/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black dark:bg-slate-800 text-white font-semibold text-xs sm:text-sm hover:shadow-lg transition-shadow border border-white/10"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                    تيك توك
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Quick Contact & Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-slate-800 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-850 dark:text-white mb-2">أرسل استفسارك مباشرة</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">سيقوم فريق المبيعات الفنية بالتواصل معك خلال ساعات العمل الرسمية</p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("شكراً لتواصلك مع مجموعة أولاد خضر! سيقوم فريق المبيعات بالرد على طلبك في أقرب وقت.");
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-gray-300 mb-1.5">الاسم بالكامل أو اسم الشركة</label>
                    <input
                      type="text"
                      required
                      placeholder="أدخل اسمك أو اسم شركة المقاولات"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-850 dark:text-white focus:border-brick-500 focus:ring-2 focus:ring-brick-500/20 outline-none transition-all text-right text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-gray-300 mb-1.5">رقم الهاتف أو الواتساب</label>
                    <input
                      type="tel"
                      required
                      placeholder="01xxxxxxxx"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-850 dark:text-white focus:border-brick-500 focus:ring-2 focus:ring-brick-500/20 outline-none transition-all text-right text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-gray-300 mb-1.5">تفاصيل الاستفسار والكمية التقريبية</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="اذكر نوع الطوب والكمية المطلوبة وموقع المشروع..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-850 dark:text-white focus:border-brick-500 focus:ring-2 focus:ring-brick-500/20 outline-none transition-all resize-none text-right text-sm"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brick-600 to-brick-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-brick-600/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    إرسال الاستفسار الآن
                  </motion.button>
                </form>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-brick-50 dark:bg-brick-950/40 border border-brick-100 dark:border-brick-900/50">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-brick-600 dark:text-brick-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-brick-800 dark:text-brick-300 mb-0.5">تواصل فوري عبر واتساب</p>
                    <p className="text-[11px] sm:text-xs text-brick-600 dark:text-brick-400">
                      يمكنك التواصل مباشرة مع مسؤولي المبيعات عبر الأرقام: 01060507294 أو 01101909046
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          INFO SECTION
          ============================================================ */}
      <Section id="info" bg="white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="معلومات" subtitle="لقاءاتنا وأنشطتنا" />

          <div className="grid sm:grid-cols-2 gap-6 md:gap-10 justify-items-center">
            {/* Card 1 — لقائنا مع قناة الشمس */}
            <motion.a
              href="https://www.facebook.com/share/v/1DRutzfE7D/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative w-full max-w-sm rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/shams-channel.jpg"
                  alt="لقائنا مع قناة الشمس"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#1877F2]/90 flex items-center justify-center shadow-2xl">
                    <svg className="w-7 h-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Label */}
              <div className="bg-white dark:bg-slate-900 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#1877F2] flex items-center justify-center flex-shrink-0">
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">شاهد على فيسبوك</span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-850 dark:text-white leading-snug">
                  لقائنا مع قناة الشمس
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  اضغط لمشاهدة الفيديو كاملاً على فيسبوك
                </p>
              </div>
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brick-500 to-accent-orange" />
            </motion.a>

            {/* Card 2 — لقائنا مع الوفد الصيني */}
            <motion.a
              href="https://www.facebook.com/share/r/1cSN8thcaK/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative w-full max-w-sm rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/chinese-delegation.jpg"
                  alt="لقائنا مع الوفد الصيني"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#1877F2]/90 flex items-center justify-center shadow-2xl">
                    <svg className="w-7 h-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Label */}
              <div className="bg-white dark:bg-slate-900 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#1877F2] flex items-center justify-center flex-shrink-0">
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">شاهد على فيسبوك</span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-850 dark:text-white leading-snug">
                  لقائنا مع الوفد الصيني
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  اضغط لمشاهدة الفيديو كاملاً على فيسبوك
                </p>
              </div>
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brick-500 to-accent-orange" />
            </motion.a>
          </div>
        </div>
      </Section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="bg-slate-900 dark:bg-[#06080d] text-white py-12 md:py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ rotateY: 20, scale: 1.08 }}
                  style={{ perspective: "400px" }}
                  className="relative w-12 h-12 md:w-14 md:h-14 p-1.5 rounded-2xl bg-white/10 dark:bg-slate-800/60 backdrop-blur-md border border-white/15 dark:border-slate-700 shadow-md flex-shrink-0 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image src="/images/logo.png" alt="Awlad Khedr Logo" fill className="object-contain" />
                  </div>
                </motion.div>
                <div>
                  <div className="text-lg font-bold">أولاد خضر</div>
                  <div className="text-xs text-gray-400">Awlad Khedr Group</div>
                </div>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                أكثر من 40 عاماً من الخبرة والصلابة في تصنيع وتوريد كافة أنواع الطوب بجودة معتمدة
                لأكبر المشروعات القومية والهندسية في مصر.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base sm:text-lg mb-4 text-white">روابط سريعة</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                      className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm inline-block hover:translate-x-[-3px] transition-transform duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-base sm:text-lg mb-4 text-white">بيانات التواصل المعتمدة</h4>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <a href="tel:+201060507294" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono">
                  <Phone className="w-4 h-4 text-brick-500" /> 01060507294
                </a>
                <a href="tel:+201101909046" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono">
                  <Phone className="w-4 h-4 text-brick-500" /> 01101909046
                </a>
                <a href="mailto:khedrawlad@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono">
                  <Mail className="w-4 h-4 text-brick-500" /> khedrawlad@gmail.com
                </a>
                <div className="flex items-start gap-2 text-gray-400 pt-1">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-brick-500" />
                  <span>الشوبك الغربي (البدرشين) | عرب أبو ساعد | كفر حميد</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs text-center sm:text-right">
              © 2026 مجموعة أولاد خضر لتصنيع وتوريد الطوب (Awlad Khedr Group). جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.2, y: -2 }}
                href="https://wa.me/201060507294"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brick-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, y: -2 }}
                href="https://www.facebook.com/share/14qJfAuzFV7/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================================
          SCROLL TO TOP BUTTON (WITH GLOW)
          ============================================================ */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-brick-600 to-brick-700 text-white shadow-2xl flex items-center justify-center animate-pulse-glow border border-white/20"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
