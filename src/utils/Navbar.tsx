import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Orbit, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Главная", path: "/" },
  { label: "О платформе", path: "/about-system" },
  { label: "Контакты", path: "/contacts" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-2xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-6">
          <Link
            to="/"
            onClick={handleCloseMenu}
            className="flex items-center gap-4 min-w-0"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-cyan-700 shadow-sm">
              <Orbit className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="text-sm font-semibold tracking-[0.24em] uppercase text-slate-900">
                Stock Vision
              </div>
              <div className="text-xs text-slate-500 truncate">
                Платформа мониторинга запасов
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive(link.path)
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
            >
              Открыть систему
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <button
            onClick={handleToggleMenu}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition-colors hover:bg-slate-100"
            aria-label="Открыть меню"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-5 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleCloseMenu}
                className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-all ${isActive(link.path)
                  ? "bg-slate-900 text-white"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/login"
              onClick={handleCloseMenu}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-4 py-3 font-semibold text-white transition-all hover:bg-cyan-700"
            >
              Открыть систему
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
