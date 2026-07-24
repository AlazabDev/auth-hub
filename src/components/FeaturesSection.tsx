import { motion } from "framer-motion";
import { Settings, Zap, Users, ShieldCheck, Fingerprint, CloudCog } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    { icon: ShieldCheck, title: t("features.security"), desc: t("features.security.desc") },
    { icon: Zap, title: t("features.speed"), desc: t("features.speed.desc") },
    { icon: Users, title: t("features.ux"), desc: t("features.ux.desc") },
    { icon: Settings, title: t("features.integration"), desc: t("features.integration.desc") },
    { icon: Fingerprint, title: t("features.auth"), desc: t("features.auth.desc") },
    { icon: CloudCog, title: t("features.cloud"), desc: t("features.cloud.desc") },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Dark accent background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-semibold mb-5 border border-primary/20">
            {t("features.badge")}
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-3">{t("features.title")}</h2>
          <p className="text-white/50 max-w-md mx-auto text-lg">{t("features.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.08] p-7 hover:bg-white/[0.08] hover:border-primary/20 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-13 h-13 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-400">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-white mb-2 text-lg">{f.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
