import { motion } from "framer-motion";
import { Building2, Wrench, User, ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const AccountTypeCards = () => {
  const { t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const accountTypes = [
    {
      icon: Building2,
      title: t("accounts.company"),
      description: t("accounts.company.desc"),
      features: [t("accounts.company.f1"), t("accounts.company.f2"), t("accounts.company.f3")],
      buttonLabel: t("accounts.company.btn"),
      path: "/auth/login",
      gradient: "from-primary/20 to-primary/5",
      iconBg: "bg-primary/15",
    },
    {
      icon: Wrench,
      title: t("accounts.technician"),
      description: t("accounts.technician.desc"),
      features: [t("accounts.technician.f1"), t("accounts.technician.f2"), t("accounts.technician.f3")],
      buttonLabel: t("accounts.technician.btn"),
      path: "/auth/login",
      gradient: "from-accent/20 to-accent/5",
      iconBg: "bg-accent/15 dark:bg-primary/15",
    },
    {
      icon: User,
      title: t("accounts.client"),
      description: t("accounts.client.desc"),
      features: [t("accounts.client.f1"), t("accounts.client.f2"), t("accounts.client.f3")],
      buttonLabel: t("accounts.client.btn"),
      path: "/auth/login",
      gradient: "from-primary/20 to-primary/5",
      iconBg: "bg-primary/15",
      featured: true,
    },
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      
      <div className="container text-center mb-14 relative">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent dark:text-primary text-xs font-semibold mb-5 border border-accent/10">
            <Sparkles className="w-3.5 h-3.5" />
            {t("accounts.title")}
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground mb-3">{t("accounts.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">{t("accounts.subtitle")}</p>
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl relative"
      >
        {accountTypes.map((type, index) => (
          <motion.div
            key={type.title}
            variants={item}
            className={`group relative bg-card rounded-2xl shadow-card border border-border/50 p-8 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-card-hover ${type.featured ? 'md:-mt-4 md:mb-4 ring-1 ring-primary/20' : ''}`}
          >
            {type.featured && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-md">
                ⭐ الأكثر طلباً
              </div>
            )}

            <div className={`w-18 h-18 rounded-2xl flex items-center justify-center mb-6 ${type.iconBg} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
              <type.icon className="w-9 h-9 text-primary" />
            </div>

            <h3 className="font-heading font-bold text-xl text-foreground mb-2">{type.title}</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{type.description}</p>

            <ul className="text-sm text-muted-foreground space-y-3 mb-8 w-full">
              {type.features.map((f) => (
                <li key={f} className="flex items-center gap-3 justify-center">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <Button
              className={`w-full mt-auto gap-2 h-12 font-bold rounded-xl transition-all duration-300 ${
                type.featured
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg glow-primary'
                  : 'bg-accent text-accent-foreground hover:bg-accent/90'
              }`}
              asChild
            >
              <Link to={type.path}>
                <Arrow className="w-4 h-4" />
                {type.buttonLabel}
              </Link>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AccountTypeCards;
