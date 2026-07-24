import { motion } from "framer-motion";
import { Shield, Lock, Globe, Zap, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const floatingIcons = [
  { icon: Shield, x: "8%", y: "18%", delay: 0, size: "w-7 h-7" },
  { icon: Lock, x: "88%", y: "25%", delay: 0.8, size: "w-5 h-5" },
  { icon: Globe, x: "78%", y: "72%", delay: 1.6, size: "w-6 h-6" },
  { icon: Zap, x: "15%", y: "75%", delay: 2.4, size: "w-5 h-5" },
];

const particles = Array.from({ length: 20 }, (_, i) => ({
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 6,
}));

const HeroSection = () => {
  const { t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const stats = [
    { value: t("hero.stat1.value"), label: t("hero.stat1.label") },
    { value: t("hero.stat2.value"), label: t("hero.stat2.label") },
    { value: t("hero.stat3.value"), label: t("hero.stat3.label") },
  ];

  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      {/* Multi-layer background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/3 blur-[200px]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/30 pointer-events-none"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, -15, -40, 0],
            opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Floating icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] text-primary/50"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -14, 0], rotate: [0, 3, -2, 0] }}
          transition={{ duration: 4, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <item.icon className={item.size} />
        </motion.div>
      ))}

      <div className="container relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm text-primary text-sm font-medium"
          >
            <div className="relative flex items-center justify-center">
              <Shield className="w-4 h-4 relative z-10" />
              <div className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/40" />
            </div>
            {t("hero.badge")}
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-heading font-extrabold text-4xl md:text-5xl lg:text-7xl text-white leading-[1.15] max-w-4xl"
          >
            {t("hero.title1")}{" "}
            <span className="text-gradient">{t("hero.title2")}</span>
            <br />
            <span className="relative inline-block text-primary">
              Alazab
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-primary/40"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              />
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Button size="lg" className="h-13 px-10 text-base gap-2.5 shadow-lg glow-primary bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl" asChild>
              <Link to="/auth/login">
                {t("hero.cta")}
                <Arrow className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-13 px-10 text-base border-white/15 text-white/80 hover:bg-white/10 hover:border-white/30 hover:text-white rounded-xl" asChild>
              <Link to="/auth/login">{t("nav.login")}</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-10 md:gap-16 mt-12 pt-10 border-t border-white/[0.08]"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.15 }}
                className="text-center"
              >
                <div className="font-heading font-extrabold text-3xl md:text-4xl text-primary">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/40 mt-1.5 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
