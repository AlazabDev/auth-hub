import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUp, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logoLight from "@/assets/az-w.png.asset.json";

const Footer = () => {
  const { t } = useLanguage();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer id="contact" className="relative bg-accent text-white pt-20 pb-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logoLight.url} alt="Alazab" className="w-14 h-14 object-contain drop-shadow-lg" />
              <div>
                <h3 className="font-heading font-bold text-xl text-white">العزب</h3>
                <p className="text-xs text-white/40">{t("nav.subtitle")}</p>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">{t("footer.desc")}</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold mb-6 text-primary text-lg">{t("footer.services")}</h4>
            <ul className="space-y-3.5 text-sm">
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"><ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />{t("footer.services.1")}</a></li>
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"><ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />{t("footer.services.2")}</a></li>
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"><ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />{t("footer.services.3")}</a></li>
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"><ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />{t("footer.services.4")}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-bold mb-6 text-primary text-lg">{t("footer.support")}</h4>
            <ul className="space-y-3.5 text-sm">
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors duration-300">{t("footer.support.1")}</a></li>
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors duration-300">{t("footer.support.2")}</a></li>
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors duration-300">{t("footer.support.3")}</a></li>
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors duration-300">{t("footer.support.4")}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold mb-6 text-primary text-lg">{t("footer.contact")}</h4>
            <div className="space-y-4 text-sm">
              <a href="tel:+966123456789" className="flex items-center gap-3 text-white/40 hover:text-primary transition-colors duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:border-primary/30 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span dir="ltr">+966 12 345 6789</span>
              </a>
              <a href="mailto:info@alazab.com" className="flex items-center gap-3 text-white/40 hover:text-primary transition-colors duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:border-primary/30 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span>info@alazab.com</span>
              </a>
              <div className="flex items-center gap-3 text-white/40">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span>{t("footer.location")}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-white/[0.08] pt-8 flex items-center justify-between">
          <p className="text-sm text-white/25">
            {t("footer.rights")} © {new Date().getFullYear()} Alazab
          </p>
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-all duration-300 hover:-translate-y-1 border border-primary/10"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
