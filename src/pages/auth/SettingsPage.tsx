import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Mail, Smartphone, Lock, ArrowLeft, ArrowRight,
  ExternalLink, CheckCircle2, XCircle, Clock, AlertTriangle, Settings as SettingsIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

type ProviderStatus = "active" | "inactive" | "unsupported" | "comingSoon";

interface ProviderRow {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  status: ProviderStatus;
  brandColor: string;
}

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#25D366">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
  </svg>
);

const StatusBadge = ({ status, t }: { status: ProviderStatus; t: (k: string) => string }) => {
  const config = {
    active: { icon: CheckCircle2, label: t("settings.status.active"), cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
    inactive: { icon: XCircle, label: t("settings.status.inactive"), cls: "bg-muted text-muted-foreground border-border" },
    unsupported: { icon: AlertTriangle, label: t("settings.status.unsupported"), cls: "bg-destructive/10 text-destructive border-destructive/20" },
    comingSoon: { icon: Clock, label: t("settings.status.comingSoon"), cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  }[status];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.cls}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
};

const SettingsPage = () => {
  const { t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowRight : ArrowLeft;

  const providers: ProviderRow[] = [
    { key: "settings.method.email", icon: Mail, status: "active", brandColor: "bg-primary/10" },
    { key: "settings.method.phone", icon: Smartphone, status: "active", brandColor: "bg-blue-500/10" },
    { key: "settings.method.google", icon: GoogleIcon, status: "active", brandColor: "bg-card" },
    { key: "settings.method.apple", icon: AppleIcon, status: "inactive", brandColor: "bg-foreground/5" },
    { key: "settings.method.facebook", icon: FacebookIcon, status: "comingSoon", brandColor: "bg-[#1877F2]/10" },
    { key: "settings.method.whatsapp", icon: WhatsAppIcon, status: "unsupported", brandColor: "bg-[#25D366]/10" },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />

      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm relative z-10">
        <div className="container max-w-5xl py-5 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Arrow className="w-4 h-4" />
            {t("auth.back")}
          </Link>
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-primary" />
            <h1 className="font-heading font-bold text-foreground">{t("settings.title")}</h1>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl py-10 relative z-10 space-y-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-strong rounded-2xl p-6 border border-border/50 flex flex-col md:flex-row md:items-center gap-4 justify-between"
        >
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-foreground mb-1">{t("settings.title")}</h2>
            <p className="text-muted-foreground text-sm">{t("settings.subtitle")}</p>
          </div>
          <Button asChild className="gap-2">
            <a href="https://lovable.dev/projects/7c862ca7-0c75-4c9c-865e-302892e38c85" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              {t("settings.openCloud")}
            </a>
          </Button>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-5 border border-amber-500/30 bg-amber-500/5 flex gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-foreground mb-1 text-sm">{t("settings.note.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("settings.note.body")}</p>
          </div>
        </motion.div>

        {/* Providers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden"
        >
          <div className="p-5 border-b border-border/50">
            <h3 className="font-heading font-bold text-lg text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              {t("settings.providers")}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{t("settings.providers.desc")}</p>
          </div>
          <ul className="divide-y divide-border/50">
            {providers.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.li
                  key={p.key}
                  initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${p.brandColor} border border-border/50`}>
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">{t(p.key)}</p>
                  </div>
                  <StatusBadge status={p.status} t={t} />
                </motion.li>
              );
            })}
          </ul>
        </motion.section>

        {/* Security */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden"
        >
          <div className="p-5 border-b border-border/50">
            <h3 className="font-heading font-bold text-lg text-foreground flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              {t("settings.security")}
            </h3>
          </div>
          <ul className="divide-y divide-border/50">
            <li className="flex items-center gap-4 p-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20">
                <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">{t("settings.security.hibp")}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t("settings.security.hibp.desc")}</p>
              </div>
              <StatusBadge status="active" t={t} />
            </li>
            <li className="flex items-center gap-4 p-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-muted border border-border/50">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">{t("settings.security.confirm")}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t("settings.security.confirm.desc")}</p>
              </div>
              <StatusBadge status="inactive" t={t} />
            </li>
          </ul>
        </motion.section>
      </main>
    </div>
  );
};

export default SettingsPage;
