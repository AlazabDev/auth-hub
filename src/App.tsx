import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
const AzaBotWidget = lazy(() => import("@/components/AzaBot/AzaBotWidget"));
const Index = lazy(() => import("./pages/Index.tsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.tsx"));
const SignupPage = lazy(() => import("./pages/SignupPage.tsx"));
const AuthLoginPage = lazy(() => import("./pages/auth/AuthLoginPage.tsx"));
const CheckEmailPage = lazy(() => import("./pages/auth/CheckEmailPage.tsx"));
const VerifyPage = lazy(() => import("./pages/auth/VerifyPage.tsx"));
const SuccessPage = lazy(() => import("./pages/auth/SuccessPage.tsx"));
const SettingsPage = lazy(() => import("./pages/auth/SettingsPage.tsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const AppFallback = () => (
  <div className="min-h-screen bg-background grid place-items-center" role="status" aria-label="جارٍ تحميل الصفحة">
    <div className="flex flex-col items-center gap-4">
      <img src="/brands/android-chrome-192x192.png" alt="" className="h-16 w-16 rounded-2xl shadow-card" />
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-1/2 rounded-full bg-primary animate-pulse" />
      </div>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<AppFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup/:type" element={<SignupPage />} />
                <Route path="/auth/login" element={<AuthLoginPage />} />
                <Route path="/auth/check-email" element={<CheckEmailPage />} />
                <Route path="/auth/verify" element={<VerifyPage />} />
                <Route path="/auth/success" element={<SuccessPage />} />
                <Route path="/auth/settings" element={<SettingsPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Suspense fallback={null}>
              <AzaBotWidget />
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
