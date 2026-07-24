import { Building2, Wrench, User, ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

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
    },
  ];

  return (
    <section id="services" aria-labelledby="accounts-title" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      
      <div className="container text-center mb-14 relative">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent dark:text-primary text-xs font-semibold mb-5 border border-accent/10">
            <Sparkles className="w-3.5 h-3.5" />
            {t("accounts.title")}
          </div>
          <h2 id="accounts-title" className="font-heading font-extrabold text-3xl md:text-5xl text-foreground mb-4 text-balance">{t("accounts.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">{t("accounts.subtitle")}</p>
        </div>
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl relative">
        {accountTypes.map((type, index) => (
          <article
            key={type.title}
            className={`group relative bg-card rounded-3xl shadow-card border p-7 md:p-8 flex flex-col items-start text-start transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover focus-within:ring-2 focus-within:ring-primary ${index === 1 ? "border-primary/45 md:-translate-y-2" : "border-border/60"}`}
          >
            {index === 1 && <span className="absolute top-5 end-5 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-bold text-foreground">{dir === "rtl" ? "الأكثر طلبًا" : "Most popular"}</span>}
            <div className={`w-18 h-18 rounded-2xl flex items-center justify-center mb-6 ${type.iconBg} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
              <type.icon className="w-9 h-9 text-primary" />
            </div>

            <h3 className="font-heading font-bold text-xl text-foreground mb-2">{type.title}</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed min-h-10">{type.description}</p>

            <ul className="text-sm text-muted-foreground space-y-3 mb-8 w-full">
              {type.features.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <Button
              className="w-full mt-auto gap-2 h-12 font-bold rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300"
              asChild
            >
              <Link to={type.path}>
                <Arrow className="w-4 h-4" />
                {type.buttonLabel}
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AccountTypeCards;
