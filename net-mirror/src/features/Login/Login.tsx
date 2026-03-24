import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundParticles from "../../shared/components/BackgroundParticles";
import CheckIcon from "../../shared/components/CheckIcon";
import EyeIcon from "../../shared/components/EyeIcon";
import LockIcon from "../../shared/components/LockIcon";
import MailIcon from "../../shared/components/MailIcon";
import SpinnerIcon from "../../shared/components/SpinnerIcon";
import { useAuthStore } from "../../store/useAuthStore";
import type { User } from "../../types/user";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  email: string;
  password: string;
}

interface FieldError {
  email?: string;
  password?: string;
  general?: string;
}

// ─── Input Field ──────────────────────────────────────────────────────────────

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  icon: React.ReactNode;
  autoComplete?: string;
  rightSlot?: React.ReactNode;
  disabled?: boolean;
  onFocus?: () => void;
  placeholder?: string;
}

function InputField({
  id, label, type, value, onChange, error,
  icon, autoComplete, rightSlot, disabled, onFocus, placeholder,
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className="relative">
      <div
        className="relative flex items-center rounded-lg transition-all duration-200"
        style={{
          background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
          border: error
            ? "1.5px solid rgba(239,68,68,0.7)"
            : focused
            ? "1.5px solid rgba(229,9,20,0.6)"
            : "1.5px solid rgba(255,255,255,0.1)",
          boxShadow: focused && !error ? "0 0 0 3px rgba(229,9,20,0.08)" : "none",
        }}
      >
        {/* Left icon */}
        <div
          className="absolute left-3.5 transition-colors duration-200"
          style={{ color: focused ? "rgba(229,9,20,0.8)" : "rgba(255,255,255,0.3)" }}
        >
          {icon}
        </div>

        {/* Floating label */}
        <label
          htmlFor={id}
          className="absolute left-10 transition-all duration-200 select-none cursor-text pointer-events-none"
          style={{
            top: floated ? "6px" : "50%",
            transform: floated ? "translateY(0) scale(0.78)" : "translateY(-50%) scale(1)",
            transformOrigin: "left",
            color: error
              ? "rgba(239,68,68,0.8)"
              : focused
              ? "rgba(229,9,20,0.8)"
              : "rgba(255,255,255,0.35)",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {label}
        </label>

        {/* Input */}
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          disabled={disabled}
          placeholder={floated ? placeholder : ""}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => { setFocused(true); onFocus?.(); }}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent outline-none text-white text-sm"
          style={{
            paddingLeft: "2.5rem",
            paddingRight: rightSlot ? "3rem" : "1rem",
            paddingTop: floated ? "22px" : "14px",
            paddingBottom: "10px",
            caretColor: "#e50914",
          }}
        />

        {/* Right slot */}
        {rightSlot && (
          <div className="absolute right-3.5">{rightSlot}</div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p
          className="text-xs mt-1.5 ml-1"
          style={{
            color: "rgba(239,68,68,0.9)",
            animation: "slideDown 0.2s ease",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Login Component ──────────────────────────────────────────────────────────

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FieldError>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [mounted, setMounted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // ── Validation ──
  const validate = (): boolean => {
    const newErrors: FieldError = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));

    const emailVal = form.email.trim().toLowerCase();
    const passVal = form.password;

    if (emailVal === "admin" && passVal === "admin") {
      setSuccess(true);
      await new Promise((r) => setTimeout(r, 900));
      const user: User = {
        id: "1",
        name: "Admin User",
        email: "admin@netmirror.com",
        avatar: "https://i.pravatar.cc/150?img=3",
        initials: 'A'
      };

      login(user); // ✅ store in Zustand
      navigate("/profiles", { replace: true })
    } else {
      setLoading(false);
      // Shake the form
      if (formRef.current) {
        formRef.current.style.animation = "shake 0.45s cubic-bezier(.36,.07,.19,.97) both";
        setTimeout(() => {
          if (formRef.current) formRef.current.style.animation = "";
        }, 500);
      }
      setErrors({
        general: "Incorrect email or password. Try: admin / admin",
      });
    }
  };

  const updateField = (field: keyof FormState) => (val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (errors.general) setErrors((prev) => ({ ...prev, general: undefined }));
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "#0f0f0f" }}
    >
      <BackgroundParticles />

      {/* Logo */}
      <div
        className="mb-10 relative z-10"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <span
          className="font-black select-none"
          style={{
            color: "#e50914",
            fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
            letterSpacing: "-0.04em",
          }}
        >
          NETMIRROR
        </span>
      </div>

      {/* Card */}
      <div
        ref={formRef}
        className="relative z-10 w-full"
        style={{
          maxWidth: 420,
          padding: "0 16px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
        }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(24,24,24,0.95)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Top red accent line */}
          <div
            className="h-0.5 w-full"
            style={{ background: "linear-gradient(90deg, transparent, #e50914 40%, #e50914 60%, transparent)" }}
          />

          <div className="px-8 pt-8 pb-9">
            {/* Header */}
            <div className="mb-7">
              <h1
                className="text-white font-semibold mb-1.5"
                style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}
              >
                Sign In
              </h1>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                Welcome back. Enter your credentials to continue.
              </p>
            </div>

            {/* General error */}
            {errors.general && (
              <div
                className="mb-5 px-4 py-3 rounded-lg flex items-start gap-3"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  animation: "slideDown 0.25s ease",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(239,68,68,0.9)" strokeWidth={2} strokeLinecap="round" className="mt-0.5 flex-shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(239,68,68,0.9)" }}>
                  {errors.general}
                </p>
              </div>
            )}

            {/* Success banner */}
            {success && (
              <div
                className="mb-5 px-4 py-3 rounded-lg flex items-center gap-3"
                style={{
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  animation: "slideDown 0.25s ease",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(34,197,94,0.9)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-xs" style={{ color: "rgba(34,197,94,0.9)" }}>
                  Login successful! Redirecting to profiles…
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-4">
                {/* Email */}
                <InputField
                  id="email"
                  label="Email or username"
                  type="text"
                  value={form.email}
                  onChange={updateField("email")}
                  error={errors.email}
                  icon={<MailIcon />}
                  autoComplete="username"
                  disabled={loading || success}
                  placeholder="admin"
                  onFocus={() => setErrors((p) => ({ ...p, general: undefined }))}
                />

                {/* Password */}
                <InputField
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={updateField("password")}
                  error={errors.password}
                  icon={<LockIcon />}
                  autoComplete="current-password"
                  disabled={loading || success}
                  placeholder="admin"
                  onFocus={() => setErrors((p) => ({ ...p, general: undefined }))}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="transition-colors duration-150 focus:outline-none"
                      style={{ color: showPassword ? "rgba(229,9,20,0.7)" : "rgba(255,255,255,0.3)" }}
                      tabIndex={-1}
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  }
                />

                {/* Remember me + Forgot */}
                <div className="flex items-center justify-between mt-0.5">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      className="relative w-4 h-4 rounded flex items-center justify-center transition-all duration-150 flex-shrink-0"
                      style={{
                        background: rememberMe ? "#e50914" : "transparent",
                        border: rememberMe ? "1.5px solid #e50914" : "1.5px solid rgba(255,255,255,0.25)",
                      }}
                      onClick={() => setRememberMe(!rememberMe)}
                    >
                      {rememberMe && (
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="1.5 6 4.5 9 10.5 3" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      Remember me
                    </span>
                  </label>

                  <button
                    type="button"
                    className="text-xs transition-colors duration-150 focus:outline-none"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(229,9,20,0.8)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading || success}
                  className="relative w-full rounded-lg font-semibold text-white text-sm transition-all duration-200 overflow-hidden mt-2"
                  style={{
                    padding: "13px",
                    background:
                      loading || success
                        ? "rgba(229,9,20,0.5)"
                        : "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
                    boxShadow:
                      loading || success
                        ? "none"
                        : "0 4px 20px rgba(229,9,20,0.35)",
                    letterSpacing: "0.04em",
                    cursor: loading || success ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && !success) {
                      e.currentTarget.style.boxShadow = "0 6px 28px rgba(229,9,20,0.5)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(229,9,20,0.35)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span className="flex items-center justify-center gap-2.5">
                    {loading && !success && <SpinnerIcon />}
                    {success && <CheckIcon />}
                    {loading && !success
                      ? "Signing in…"
                      : success
                      ? "Redirecting…"
                      : "Sign In"}
                  </span>

                  {/* Shimmer on idle */}
                  {!loading && !success && (
                    <span
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
                        animation: "shimmer 3s infinite",
                      }}
                    />
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                or continue with
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            </div>

            {/* Google SSO button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                padding: "11px",
                background: "rgba(255,255,255,0.04)",
                border: "1.5px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </button>

            {/* Footer hint */}
            <p className="text-center text-xs mt-6" style={{ color: "rgba(255,255,255,0.2)" }}>
              Demo credentials:{" "}
              <span
                className="cursor-pointer transition-colors duration-150"
                style={{ color: "rgba(229,9,20,0.6)" }}
                onClick={() => setForm({ email: "admin", password: "admin" })}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e50914")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(229,9,20,0.6)")}
              >
                click to autofill
              </span>
            </p>
          </div>
        </div>

        {/* Below card note */}
        <p className="text-center text-xs mt-5" style={{ color: "rgba(255,255,255,0.18)" }}>
          By signing in, you agree to NetMirror's{" "}
          <span className="underline cursor-pointer hover:text-white/40 transition-colors">Terms of Use</span>
          {" "}and{" "}
          <span className="underline cursor-pointer hover:text-white/40 transition-colors">Privacy Policy</span>.
        </p>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          60%, 100% { transform: translateX(200%); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-7px); }
          30% { transform: translateX(7px); }
          45% { transform: translateX(-5px); }
          60% { transform: translateX(5px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
        }
      `}</style>
    </div>
  );
}