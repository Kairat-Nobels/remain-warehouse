import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Orbit,
  Phone,
  Radar,
} from "lucide-react";

const quickLinks = [
  { label: "Главная", path: "/" },
  { label: "О платформе", path: "/about-system" },
  { label: "Контакты", path: "/contacts" },
  { label: "Политика конфиденциальности", path: "/privacy-policy" },
];

const systemLinks = [
  "Мониторинг запасов",
  "Контроль критических остатков",
  "История движения товаров",
  "Управление поставками",
];

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
          <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-10">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-cyan-700">
                  <Orbit className="w-5 h-5" />
                </div>

                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
                    Stock Vision
                  </div>
                  <div className="text-sm text-slate-500">
                    Платформа мониторинга запасов
                  </div>
                </div>
              </div>

              <p className="mt-6 max-w-xl text-slate-600 leading-8">
                Цифровая платформа для мониторинга и управления складскими
                запасами, ориентированная на прозрачность процессов, контроль
                движения товаров и повышение точности работы с данными.
              </p>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm text-cyan-700">
                <Radar className="w-4 h-4" />
                наблюдение за состоянием запасов в единой системе
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Открыть систему
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contacts"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  Связаться с нами
                </Link>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Разделы
                </h4>
                <ul className="mt-5 space-y-3">
                  {quickLinks.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="text-slate-700 transition hover:text-cyan-700"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Возможности
                </h4>
                <ul className="mt-5 space-y-3">
                  {systemLinks.map((item) => (
                    <li key={item} className="text-slate-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:col-span-2">
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Контактные данные
                </h4>

                <div className="mt-5 grid md:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-cyan-700" />
                      <span className="text-sm text-slate-700">
                        Бишкек, Кыргызстан
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-cyan-700" />
                      <span className="text-sm text-slate-700">
                        info@stockvision.kg
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-cyan-700" />
                      <span className="text-sm text-slate-700">
                        +996 708 796 876
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-500">
                  Платформа предназначена для повышения прозрачности складских
                  процессов и улучшения качества управления запасами в
                  организации.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Stock Vision. Все права защищены.</p>
            <p>Система мониторинга и управления складскими запасами</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
