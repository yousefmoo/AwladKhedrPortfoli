"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
  HardHat,
  TrendingUp,
  Droplets,
  FileCheck,
  ExternalLink,
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
} from "lucide-react";

/* ============================================================
   INTERSECTION OBSERVER HOOK FOR SCROLL ANIMATIONS
   ============================================================ */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

/* ============================================================
   SECTION WRAPPER COMPONENT
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
    white: "bg-white",
    gray: "bg-gray-50",
    dark: "bg-slate-850 text-white",
    brick: "bg-gradient-to-br from-brick-700 to-brick-900 text-white",
  };

  return (
    <section id={id} className={`relative py-20 md:py-28 ${bgClasses[bg]} ${className}`}>
      {children}
    </section>
  );
}

/* ============================================================
   ANIMATED SECTION TITLE
   ============================================================ */
function SectionTitle({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  const { ref, isInView } = useInView(0.2);

  return (
    <div ref={ref} className="text-center mb-16">
      <div
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
          light
            ? "bg-white/10 text-white/90"
            : "bg-brick-50 text-brick-700"
        }`}
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out",
        }}
      >
        <Star className="w-4 h-4" />
        <span>{subtitle || "مجموعة أولاد خضر"}</span>
      </div>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
          light ? "text-white" : "text-slate-850"
        }`}
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out 0.1s",
        }}
      >
        {title}
      </h2>
      <div
        className="section-divider mx-auto"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "scaleX(1)" : "scaleX(0)",
          transition: "all 0.6s ease-out 0.2s",
        }}
      />
    </div>
  );
}

/* ============================================================
   STAT CARD
   ============================================================ */
function StatCard({
  icon: Icon,
  value,
  label,
  delay = 0,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.2);

  return (
    <div
      ref={ref}
      className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease-out ${delay}s`,
      }}
    >
      <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-brick-500 to-brick-700 rounded-xl flex items-center justify-center shadow-lg">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{value}</div>
      <div className="text-gray-600 font-medium text-sm md:text-base">{label}</div>
    </div>
  );
}

/* ============================================================
   PRODUCT CARD
   ============================================================ */
function ProductCard({
  title,
  specs,
  icon: Icon,
  color,
  delay = 0,
}: {
  title: string;
  specs: string[];
  icon: React.ElementType;
  color: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.15);

  return (
    <div
      ref={ref}
      className="product-card bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      }}
    >
      <div className={`h-2 ${color}`} />
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shadow-md`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-850">{title}</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Ruler className="w-4 h-4 text-brick-600" />
            <span className="font-semibold">الأبعاد والمواصفات:</span>
          </div>
          {specs.map((spec, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
            >
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-gray-700 text-sm font-medium">{spec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PROJECT CARD
   ============================================================ */
function ProjectCard({
  name,
  client,
  location,
  delay = 0,
}: {
  name: string;
  client: string;
  location?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-brick-200 transition-all duration-300"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.5s ease-out ${delay}s`,
      }}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-brick-50 flex items-center justify-center flex-shrink-0 group-hover:bg-brick-600 transition-colors duration-300">
          <Landmark className="w-5 h-5 text-brick-600 group-hover:text-white transition-colors duration-300" />
        </div>
        <div>
          <h4 className="font-bold text-slate-850 mb-1 group-hover:text-brick-700 transition-colors">
            {name}
          </h4>
          <p className="text-sm text-gray-500">{client}</p>
          {location && (
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CLIENT LOGO / BADGE
   ============================================================ */
function ClientBadge({ name, delay = 0 }: { name: string; delay?: number }) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className="bg-white rounded-lg px-5 py-3 shadow-sm border border-gray-100 text-center font-semibold text-slate-700 hover:shadow-md hover:border-brick-200 transition-all duration-300"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "scale(1)" : "scale(0.9)",
        transition: `all 0.4s ease-out ${delay}s`,
      }}
    >
      {name}
    </div>
  );
}

/* ============================================================
   SPEC METRIC CARD
   ============================================================ */
function SpecMetric({
  icon: Icon,
  label,
  value,
  standard,
  better,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  standard: string;
  better: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.2);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 relative overflow-hidden"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateX(0)" : "translateX(-30px)",
        transition: `all 0.6s ease-out ${delay}s`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brick-500 to-accent-orange" />
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brick-500 to-brick-700 flex items-center justify-center shadow-md">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-slate-850">{label}</h3>
      </div>
      <div className="mb-4">
        <div className="text-3xl font-bold gradient-text mb-1">{value}</div>
        <div className="text-sm text-gray-500">نتائج فحص مختبرات HBRC & AMS</div>
      </div>
      <div className="space-y-2 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">متوسط النتائج:</span>
          <span className="font-bold text-green-600">{better}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">الكود المصري ECP 204:</span>
          <span className="font-medium text-gray-700">{standard}</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN PAGE COMPONENT
   ============================================================ */
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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
    { href: "#contact", label: "تواصل معنا" },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      {/* ============================================================
          HEADER / NAVIGATION
          ============================================================ */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="flex items-center gap-3"
            >
              <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Awlad Khedr Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-lg md:text-xl font-bold leading-tight ${
                    scrolled ? "text-slate-850" : "text-white"
                  }`}
                >
                  أولاد خضر
                </span>
                <span
                  className={`text-xs font-medium ${
                    scrolled ? "text-brick-600" : "text-white/80"
                  }`}
                >
                  Awlad Khedr Group
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`nav-link px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    scrolled
                      ? "text-slate-700 hover:text-brick-600 hover:bg-brick-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/201060507294"
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 ${
                  scrolled
                    ? "bg-gradient-to-r from-brick-600 to-brick-700 text-white shadow-lg shadow-brick-600/25"
                    : "bg-white text-brick-700 shadow-lg"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                واتساب
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  scrolled
                    ? "text-slate-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full right-0 left-0 bg-white shadow-xl border-t border-gray-100 transition-all duration-300 ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="block px-4 py-3 rounded-lg text-slate-700 font-semibold hover:bg-brick-50 hover:text-brick-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/201060507294"
              target="_blank"
              rel="noopener noreferrer"
              className="flex sm:hidden items-center justify-center gap-2 mt-3 px-5 py-3 rounded-xl bg-gradient-to-r from-brick-600 to-brick-700 text-white font-bold shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              تواصل عبر واتساب
            </a>
          </nav>
        </div>
      </header>

      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background: Factory Image */}
        <Image
          src="/images/factory-bg.jpg"
          alt="مصنع أولاد خضر"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        <div className="absolute inset-0 bg-brick-950/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-semibold mb-8 border border-white/10"
            style={{ animation: "fadeInUp 0.8s ease-out forwards" }}
          >
            <Clock className="w-4 h-4" />
            منذ عام 1983م — أكثر من 40 عاماً من الخبرة
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight"
            style={{ animation: "fadeInUp 0.8s ease-out 0.1s forwards", opacity: 0 }}
          >
            أكثر من{" "}
            <span className="gradient-text">40 عاماً</span> من الجودة
            <br />
            والصلابة في تصنيع الطوب
          </h1>

          <p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
            style={{ animation: "fadeInUp 0.8s ease-out 0.2s forwards", opacity: 0 }}
          >
            المورد المعتمد لأكبر المشاريع القومية والهندسية في مصر منذ عام 1983م.
            نصنع الثقة بجودة لا تتنازل ومواصفات تتجاوز المعايير.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            style={{ animation: "fadeInUp 0.8s ease-out 0.3s forwards", opacity: 0 }}
          >
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#portfolio");
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brick-600 to-brick-700 text-white font-bold text-lg shadow-xl shadow-brick-600/30 hover:shadow-2xl hover:shadow-brick-600/40 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Briefcase className="w-5 h-5" />
              تصفح أعمالنا
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              تواصل معنا
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <StatCard
              icon={Clock}
              value="+40"
              label="عاماً من الخبرة"
              delay={0.4}
            />
            <StatCard
              icon={Factory}
              value="+11"
              label="خط إنتاج ومصنع"
              delay={0.5}
            />
            <StatCard
              icon={Landmark}
              value="+50"
              label="مشروع قومي وهندسي"
              delay={0.6}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/50" />
        </div>
      </section>

      {/* ============================================================
          ABOUT US SECTION
          ============================================================ */}
      <Section id="about" bg="gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="عن المجموعة" subtitle="من نحن" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              <div
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
                style={{ animation: "fadeInUp 0.8s ease-out forwards" }}
              >
                <h3 className="text-2xl font-bold text-slate-850 mb-4">
                  رائدة صناعة الطوب في مصر منذ 1983
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  تأسست مجموعة أولاد خضر عام 1983م، وعلى مدار أكثر من أربعة عقود،
                  رسّخت مكانتها كإحدى أكبر وأعرق الشركات المتخصصة في تصنيع وتوريد
                  كافة أنواع الطوب في جمهورية مصر العربية.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  نمتلك شبكة متكاملة من المصانع والخطوط الإنتاجية تغطي كافة احتياجات
                  السوق من الطوب الطفلي والأسمنتي والوردي (الساند لايم) والإنترلوك
                  والبردورات، بمواصفات تقنية تتجاوز متطلبات الكود المصري.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Factory,
                    title: "+5 مصانع طوب طفلي",
                    desc: "طوب أحمر مثقب بأعلى مواصفات",
                  },
                  {
                    icon: Building,
                    title: "+4 مصانع طوب أسمنتي",
                    desc: "بلوك مصمت ومفرغ",
                  },
                  {
                    icon: BrickWall,
                    title: "طوب وردي (ساند لايم)",
                    desc: "إنتاج حديث بتقنيات متطورة",
                  },
                  {
                    icon: Truck,
                    title: "إنترلوك وبردورات",
                    desc: "تشطيبات راقية للمشاريع",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                    style={{
                      opacity: 1,
                      animation: `fadeInUp 0.6s ease-out ${0.2 + i * 0.1}s forwards`,
                    }}
                  >
                    <item.icon className="w-8 h-8 text-brick-600 mb-3" />
                    <h4 className="font-bold text-slate-850 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Affiliated Entities */}
            <div className="space-y-6">
              <div
                className="bg-gradient-to-br from-brick-700 to-brick-900 rounded-2xl p-6 md:p-8 text-white shadow-xl"
                style={{ animation: "fadeInUp 0.8s ease-out 0.3s forwards", opacity: 0 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative w-14 h-14 flex-shrink-0 bg-white rounded-xl p-1">
                    <Image
                      src="/images/logo.png"
                      alt="Awlad Khedr Logo"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <h3 className="text-xl font-bold">سلسلة مصانع المجموعة</h3>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      name: "مصنع أبو رمود",
                      desc: "أحد مصانع الطوب الطفلي في سلسلة المجموعة",
                    },
                    {
                      name: "مصنع الأمانة",
                      desc: "تأسس عام 2020 — خطوط إنتاج حديثة",
                    },
                    {
                      name: "مصنع أبو مزروع",
                      desc: "إنتاج طوب أحمر بمواصفات عالية",
                    },
                    {
                      name: "مصنع المعراج",
                      desc: "خط إنتاج متكامل للطوب الطفلي",
                    },
                    {
                      name: "مصنع عمدة أبو هيكل",
                      desc: "طاقة إنتاجية عالية وجودة ممتازة",
                    },
                    {
                      name: "مصنع العمار",
                      desc: "تخصص في إنتاج الطوب الأحمر المثقب",
                    },
                    {
                      name: "مصنع أبو حنيش",
                      desc: "أحدث إضافات المجموعة الإنتاجية",
                    },
                    {
                      name: "سنجر بريك",
                      desc: "خط إنتاج حديث بتقنيات متطورة",
                    },
                    {
                      name: "سنجر بدوي",
                      desc: "طاقة إنتاجية عالية لتلبية الطلب المتزايد",
                    },
                  ].map((entity, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-accent-orange flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm mb-0.5">{entity.name}</h4>
                        <p className="text-xs text-white/70">{entity.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience badge */}
              <div
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex items-center gap-6"
                style={{ animation: "fadeInUp 0.8s ease-out 0.5s forwards", opacity: 0 }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brick-500 to-brick-700 flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-2xl font-black text-white">40+</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-850 mb-1">
                    عاماً من التميز
                  </h4>
                  <p className="text-gray-500 text-sm">
                    نفخر بتاريخنا العريق وثقة عملائنا في كل مشروع
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          PRODUCTS SECTION
          ============================================================ */}
      <Section id="products" bg="white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="المنتجات والمواصفات"
            subtitle="كتالوج المنتجات"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
            <ProductCard
              title="طوب طفلي مثقب (أحمر)"
              icon={BrickWall}
              color="bg-gradient-to-br from-red-600 to-red-800"
              specs={[
                "25 × 12 × 12 سم — الطوبة الكاملة",
                "25 × 12 × 6 سم — نصف الطوبة",
                "25 × 10 × 12 سم — المقاس البديل",
              ]}
              delay={0}
            />
            <ProductCard
              title="طوب أسمنتي مصمت"
              icon={Building}
              color="bg-gradient-to-br from-gray-600 to-gray-800"
              specs={["25 × 12 × 6 سم — طوب أسمنتي مصمت عالي الجودة"]}
              delay={0.1}
            />
            <ProductCard
              title="بلوك أسمنتي مفرغ"
              icon={Home}
              color="bg-gradient-to-br from-slate-600 to-slate-800"
              specs={[
                "40 × 20 × 20 سم — البلوك الكبير",
                "40 × 20 × 12 سم — البلوك المتوسط",
              ]}
              delay={0.2}
            />
            <ProductCard
              title="طوب وردي وإنترلوك وبردورات"
              icon={Landmark}
              color="bg-gradient-to-br from-pink-500 to-rose-700"
              specs={[
                "طوب وردي (ساند لايم) بأبعاد متنوعة",
                "بديل الوردي — حلول اقتصادية متميزة",
                "إنترلوك — تشطيبات أرضيات خارجية",
                "بردورات — حواف طرق وأرصفة",
              ]}
              delay={0.3}
            />
          </div>

          {/* Note */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-brick-50 text-brick-700 px-6 py-3 rounded-xl font-semibold">
              <Truck className="w-5 h-5" />
              <span>توريد لكافة المشاريع بكميات تجارية — تواصل معنا للاستفسار</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          QUALITY & TECHNICAL SPECS SECTION
          ============================================================ */}
      <Section id="quality" bg="gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="الجودة والمواصفات الفنية"
            subtitle="شهادات واعتمادات"
          />

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
            <SpecMetric
              icon={TrendingUp}
              label="مقاومة الضغط"
              value="> 105 kg/cm²"
              standard="80 kg/cm²"
              better="تتجاوز الكود بنسبة 31%"
              delay={0}
            />
            <SpecMetric
              icon={Droplets}
              label="نسبة امتصاص الماء"
              value="10.6% – 12%"
              standard="16% (حد أقصى)"
              better="أفضل من الحد المسموح بـ 25%"
              delay={0.1}
            />
          </div>

          {/* Standards & Certifications */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Standards */}
            <div
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
              style={{ animation: "fadeInUp 0.8s ease-out forwards" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brick-500 to-brick-700 flex items-center justify-center shadow-md">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-850">
                  الامتثال للمعايير
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    code: "ES 619-48",
                    name: "المواصفة المصرية للطوب الطفلي المثقب",
                  },
                  {
                    code: "ECP 204-2005",
                    name: "كود الخرسانة المسلحة — متطلبات الجدران الحاملة",
                  },
                  {
                    code: "HBRC",
                    name: "المركز القومي لبحوث الإسكان والبناء",
                  },
                  {
                    code: "AMS Lab",
                    name: "تقارير فحص معتمدة من مختبرات AMS",
                  },
                ].map((std, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                  >
                    <Shield className="w-5 h-5 text-brick-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-850">{std.code}</span>
                      <p className="text-sm text-gray-500">{std.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Approvals */}
            <div
              className="bg-gradient-to-br from-slate-850 to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl"
              style={{ animation: "fadeInUp 0.8s ease-out 0.2s forwards", opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent-orange" />
                </div>
                <h3 className="text-xl font-bold">اعتمادات رسمية</h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "الهيئة الهندسية للقوات المسلحة",
                    desc: "اعتماد رسمي كمورد للمشاريع العسكرية والقومية",
                  },
                  {
                    title: "DIAA Consult",
                    desc: "اعتماد استشاري لمشروع رافيل — محور المشير",
                  },
                  {
                    title: "كبرى شركات المقاولات",
                    desc: "مورد معتمد للمقاولون العرب، طلعت مصطفى، وغيرها",
                  },
                ].map((approval, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <CheckCircle className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold mb-1">{approval.title}</h4>
                      <p className="text-sm text-white/60">{approval.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          PORTFOLIO / PROJECTS SECTION
          ============================================================ */}
      <Section id="portfolio" bg="white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="سابقة الأعمال"
            subtitle="مشاريعنا وعملاؤنا"
          />

          {/* Major Clients */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-slate-850 mb-6 text-center">
              كبرى الجهات والشركات التي نتعامل معها
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {[
                "الهيئة الهندسية للقوات المسلحة",
                "المقاولون العرب",
                "طلعت مصطفى (الرحاب)",
                "النصر العامة للمقاولات",
                "السعادة للمقاولات",
                "النوبي للمقاولات",
                "تطوير مصر",
                "EEC Group",
                "National Contracting Co.",
                "شركة الأمانة",
              ].map((client, i) => (
                <ClientBadge key={i} name={client} delay={i * 0.05} />
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h3 className="text-xl font-bold text-slate-850 mb-6 text-center">
              أبرز المشاريع التي تم توريدها
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "مشروع رافيل — محور المشير",
                  client: "DIAA Consult",
                  location: "القاهرة الجديدة",
                },
                {
                  name: "تطوير قناة السويس",
                  client: "الهيئة الهندسية",
                  location: "الإسماعيلية",
                },
                {
                  name: "جامعة الإسماعيلية",
                  client: "جهات حكومية",
                  location: "الإسماعيلية",
                },
                {
                  name: "جامعة مصر (MUST)",
                  client: "جهات تعليمية",
                  location: "6 أكتوبر",
                },
                {
                  name: "جامعة أسيوط التكنولوجية",
                  client: "وزارة التعليم العالي",
                  location: "أسيوط",
                },
                {
                  name: "مستشفى المنصورة Oncology",
                  client: "جهات صحية",
                  location: "المنصورة",
                },
                {
                  name: "مستشفى سوهاج Oncology",
                  client: "جهات صحية",
                  location: "سوهاج",
                },
                {
                  name: "مستشفى العباسية للصحة النفسية",
                  client: "وزارة الصحة",
                  location: "القاهرة",
                },
                {
                  name: "الكوثر الغردقة",
                  client: "تطوير مصر",
                  location: "الغردقة",
                },
                {
                  name: "منتجع فريدة — العين السخنة",
                  client: "استثمار سياحي",
                  location: "العين السخنة",
                },
                {
                  name: "مدينة الرحاب",
                  client: "طلعت مصطفى",
                  location: "القاهرة الجديدة",
                },
                {
                  name: "مشاريع قومية متنوعة",
                  client: "المقاولون العرب",
                  location: "جميع أنحاء مصر",
                },
              ].map((project, i) => (
                <ProjectCard
                  key={i}
                  name={project.name}
                  client={project.client}
                  location={project.location}
                  delay={i * 0.05}
                />
              ))}
            </div>
          </div>

          {/* ── Workers / Team Banner ── */}
          <div className="mt-20 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
            <div className="grid lg:grid-cols-2 min-h-[420px]">

              {/* Left: Image */}
              <div className="relative min-h-[300px] lg:min-h-full">
                <Image
                  src="/images/workers.jpg"
                  alt="فريق عمال مصانع أولاد خضر"
                  fill
                  className="object-cover object-center"
                />
                {/* subtle gradient to blend into right panel */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-850/60 hidden lg:block" />
              </div>

              {/* Right: Content */}
              <div className="bg-gradient-to-br from-slate-850 to-slate-900 flex flex-col justify-center px-8 md:px-12 py-10 text-white">
                <div className="inline-flex items-center gap-2 bg-brick-600/20 text-brick-300 text-xs font-bold px-3 py-1.5 rounded-full mb-5 w-fit border border-brick-500/30">
                  <Users className="w-3.5 h-3.5" />
                  فريقنا الإنساني
                </div>

                <h3 className="text-2xl md:text-3xl font-black mb-4 leading-snug">
                  وراء كل طوبة…<br />
                  <span className="text-brick-400">أيادٍ أمينة ومخلصة</span>
                </h3>

                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                  فريق عمالنا هو سر نجاحنا. بخبرة تمتد لعقود، يحرص كل عامل
                  على تسليم منتج يليق بالمشاريع العملاقة التي نخدمها.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  {[
                    { value: "+40", label: "عاماً من الخبرة" },
                    { value: "+9",  label: "مصانع متكاملة" },
                    { value: "+50", label: "مشروع قومي" },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl md:text-3xl font-black text-brick-400 mb-1">{s.value}</div>
                      <div className="text-xs text-gray-500 leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </Section>

      {/* ============================================================
          CONTACT SECTION
          ============================================================ */}
      <Section id="contact" bg="gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="تواصل معنا" subtitle="نحن هنا لمساعدتك" />

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
                style={{ animation: "fadeInUp 0.8s ease-out forwards" }}
              >
                <h3 className="text-xl font-bold text-slate-850 mb-6">
                  معلومات التواصل
                </h3>

                <div className="space-y-5">
                  <a
                    href="tel:+201060507294"
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-brick-50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brick-500 to-brick-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">اتصل بنا / واتساب</div>
                      <div className="font-bold text-slate-850 text-lg">
                        01060507294
                      </div>
                    </div>
                  </a>

                  <a
                    href="mailto:awlad5edr@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-brick-50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brick-500 to-brick-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">البريد الإلكتروني</div>
                      <div className="font-bold text-slate-850">
                        awlad5edr@gmail.com
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brick-500 to-brick-700 flex items-center justify-center shadow-md flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-2">مواقع المصانع</div>
                      <div className="space-y-1">
                        <div className="font-semibold text-slate-850">
                          • الشوبك الغربي (البدرشين)
                        </div>
                        <div className="font-semibold text-slate-850">
                          • عرب أبو ساعد
                        </div>
                        <div className="font-semibold text-slate-850">
                          • كفر حميد
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
                style={{ animation: "fadeInUp 0.8s ease-out 0.2s forwards", opacity: 0 }}
              >
                <h3 className="text-xl font-bold text-slate-850 mb-4">
                  تابعنا على وسائل التواصل
                </h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.facebook.com/share/14qJfAuzFV7/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1877F2] text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <Facebook className="w-5 h-5" />
                    فيسبوك
                  </a>
                  <a
                    href="https://www.facebook.com/share/19CaBxAqbi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <Instagram className="w-5 h-5" />
                    إنستجرام
                  </a>
                  <a
                    href="https://www.facebook.com/share/19RxudTn9m/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-black text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    تيك توك
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
              style={{ animation: "fadeInUp 0.8s ease-out 0.3s forwards", opacity: 0 }}
            >
              <h3 className="text-xl font-bold text-slate-850 mb-6">
                أرسل استفسارك
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("شكراً لتواصلك معنا! سيتم الرد عليك في أقرب وقت.");
                }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="أدخل اسمك"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brick-500 focus:ring-2 focus:ring-brick-500/20 outline-none transition-all text-right"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01xxxxxxxx"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brick-500 focus:ring-2 focus:ring-brick-500/20 outline-none transition-all text-right"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    الرسالة
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="اكتب استفسارك أو تفاصيل مشروعك هنا..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brick-500 focus:ring-2 focus:ring-brick-500/20 outline-none transition-all resize-none text-right"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-brick-600 to-brick-700 text-white font-bold text-lg shadow-lg shadow-brick-600/25 hover:shadow-xl hover:shadow-brick-600/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  إرسال الاستفسار
                </button>
              </form>

              <div className="mt-6 p-4 rounded-xl bg-brick-50 border border-brick-100">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-brick-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-brick-800 mb-1">
                      تواصل أسرع عبر واتساب
                    </p>
                    <p className="text-sm text-brick-600">
                      اضغط على زر واتساب في الأعلى للتواصل المباشر مع فريق المبيعات
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="bg-slate-850 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="Awlad Khedr Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-lg font-bold">أولاد خضر</div>
                  <div className="text-xs text-gray-400">Awlad Khedr Group</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                أكثر من 40 عاماً من الخبرة في تصنيع وتوريد كافة أنواع الطوب.
                المورد المعتمد لأكبر المشاريع القومية والهندسية في مصر.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4">تواصل معنا</h4>
              <div className="space-y-3">
                <a
                  href="tel:+201060507294"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  01060507294
                </a>
                <a
                  href="mailto:awlad5edr@gmail.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  awlad5edr@gmail.com
                </a>
                <div className="flex items-start gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>الشوبك الغربي (البدرشين) | عرب أبو ساعد | كفر حميد</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Awlad Khedr Group. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/201060507294"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brick-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/14qJfAuzFV7/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-brick-600 to-brick-700 text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </main>
  );
}
