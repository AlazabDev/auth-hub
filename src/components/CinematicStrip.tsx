import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const brands = [
  { name: "العزب", logo: "/brands/logo1.png", url: "https://alazab.com" },
  { name: "UberFix", logo: "/brands/logo2.png", url: "https://uberfix.alazab.com" },
  { name: "Luxury Finishing", logo: "/brands/logo3.png", url: "https://luxury-finishing.alazab.com" },
  { name: "Brand Identity", logo: "/brands/logo4.png", url: "https://brand-identity.alazab.com" },
  { name: "لبن العصفور", logo: "/brands/laban-alasfour.png", url: "https://laban-alasfour.alazab.com" },
  { name: "Alazab Group", logo: "/brands/logo5.png", url: "https://alazab.com" },
];

const CinematicStrip = () => {
  const { t } = useLanguage();
  const doubled = [...brands, ...brands];

  return (
    <section id="platforms" className="py-20 overflow-hidden relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background pointer-events-none" />

      <div className="container text-center mb-14 relative">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/8 text-accent dark:text-primary text-xs font-semibold mb-5 border border-accent/10">
            {t("platforms.badge")}
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground mb-3">
            {t("platforms.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            {t("platforms.subtitle")}
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-strip w-max hover:[animation-play-state:paused]">
          {doubled.map((brand, i) => (
            <a
              key={`${brand.name}-${i}`}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-6 group"
            >
              <div className="w-52 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/40 p-6 flex flex-col items-center gap-4 transition-all duration-500 group-hover:shadow-card-hover group-hover:-translate-y-2 group-hover:border-primary/30 group-hover:bg-card">
                <div className="w-20 h-20 rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-16 w-16 object-contain opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
                <span className="text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  {brand.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CinematicStrip;
