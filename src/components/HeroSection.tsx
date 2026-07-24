import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { dir, lang } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const slogan =
    lang === "ar"
      ? "نحن ملتزمون بالحفاظ على منشآتكم بأفضل حال"
      : "We are committed to keeping your facilities in the best condition";

  const subSlogan =
    lang === "ar"
      ? "نظام المصادقة المركزي — بوابة واحدة لجميع منصات وخدمات مجموعة العزب"
      : "Central Authentication — one gateway to all Alazab Group platforms and services";

  return (
    <section aria-labelledby="hero-title" className="relative min-h-[calc(100svh-72px)] w-full overflow-hidden flex items-center">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://assets.mixkit.co/videos/preview/mixkit-modern-buildings-and-a-crane-at-a-construction-site-45478-large.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02063f]/90 via-[#030957]/78 to-[#02053f]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_0%,#030957_88%)] opacity-70" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.08]" />

      {/* Content */}
      <div className="container relative flex flex-col items-center justify-center text-center px-4 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs md:text-sm font-medium mb-7"
        >
          <ShieldCheck className="w-4 h-4 text-primary" />
          {lang === "ar" ? "مجموعة العزب للمقاولات" : "Alazab Contracting Group"}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          id="hero-title"
          className="font-heading font-extrabold text-white text-[2.35rem] sm:text-5xl md:text-6xl lg:text-[4.6rem] leading-[1.14] max-w-5xl text-balance drop-shadow-2xl"
        >
          {slogan}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-6 text-white/75 text-base md:text-xl max-w-2xl leading-relaxed text-balance"
        >
          {subSlogan}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-9 flex w-full sm:w-auto flex-col sm:flex-row gap-3"
        >
          <Button
            size="lg"
            className="h-14 w-full sm:w-auto px-9 text-base gap-2.5 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl shadow-2xl shadow-primary/30"
            asChild
          >
            <Link to="/auth/login">
              {lang === "ar" ? "ابدأ الآن" : "Get Started"}
              <Arrow className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 w-full sm:w-auto px-9 text-base border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/15 hover:border-white/40 rounded-xl"
            asChild
          >
            <a href="#services">
              {lang === "ar" ? "استكشف الخدمات" : "Explore Services"}
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-white/65"
        >
          <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" />{lang === "ar" ? "دخول موحّد وآمن" : "Secure single sign-on"}</span>
          <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" />{lang === "ar" ? "بدون كلمة مرور" : "Passwordless access"}</span>
          <span className="inline-flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" />{lang === "ar" ? "دعم ذكي على مدار الساعة" : "24/7 smart support"}</span>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        aria-hidden="true"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
      >
        <div className="w-1 h-2 rounded-full bg-primary" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
