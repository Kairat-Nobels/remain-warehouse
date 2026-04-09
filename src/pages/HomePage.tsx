import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BellRing,
  Boxes,
  ChartColumnBig,
  CircleAlert,
  PackageSearch,
  ShieldCheck,
  Truck,
  Waves,
} from "lucide-react";

const indicators = [
  {
    title: "Текущий статус запасов",
    text: "Платформа показывает актуальное состояние складских ресурсов и помогает быстро находить проблемные позиции.",
    icon: <Activity className="w-6 h-6" />,
  },
  {
    title: "Контроль поступлений",
    text: "Все поступления фиксируются в системе и формируют прозрачную картину пополнения запасов.",
    icon: <Truck className="w-6 h-6" />,
  },
  {
    title: "История движения",
    text: "Изменения остатков и операции по товарам сохраняются для последующего анализа и контроля.",
    icon: <ChartColumnBig className="w-6 h-6" />,
  },
];

const monitorCards = [
  {
    title: "Критический остаток",
    value: "12 позиций",
    note: "требуют быстрого внимания",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
    icon: <CircleAlert className="w-5 h-5" />,
  },
  {
    title: "Активные поставки",
    value: "28 заявок",
    note: "на контроле системы",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    icon: <Truck className="w-5 h-5" />,
  },
  {
    title: "Позиции под наблюдением",
    value: "63 товара",
    note: "динамика остатков отслеживается",
    color: "text-cyan-700",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
    icon: <PackageSearch className="w-5 h-5" />,
  },
];

const capabilities = [
  "мониторинг текущих остатков",
  "контроль критически низких запасов",
  "учет поступлений и списаний",
  "работа с поставщиками и категориями",
  "просмотр истории операций",
  "централизованное управление складской информацией",
];

const HomePage = () => {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_55%,#eef9ff_100%)]" />
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-100/70 blur-3xl" />
        <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
              <Waves className="w-4 h-4 text-cyan-700" />
              Интеллектуальный контроль складских запасов
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight text-slate-950">
              Мониторинг запасов и управление складскими ресурсами
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Веб-платформа предназначена для наблюдения за состоянием запасов,
              контроля движения товаров и повышения прозрачности процессов,
              связанных с управлением складскими ресурсами.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white px-6 py-3 font-semibold transition-all duration-300"
              >
                Открыть систему
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/about-system"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white hover:border-slate-400 px-6 py-3 font-medium text-slate-800 transition-all duration-300"
              >
                Подробнее о платформе
              </Link>
            </div>
          </div>

          <div className="mt-14 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Панель наблюдения
                  </p>
                  <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-950">
                    Общая картина состояния склада
                  </h2>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                  данные под контролем
                </div>
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-5">
                {indicators.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 text-cyan-700">
                      {item.icon}
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-slate-600 leading-7">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {monitorCards.map((item) => (
                <div
                  key={item.title}
                  className={`rounded-[28px] border ${item.border} ${item.bg} p-6`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      {item.title}
                    </p>
                    <div className={`${item.color}`}>{item.icon}</div>
                  </div>

                  <div className={`mt-4 text-3xl font-bold ${item.color}`}>
                    {item.value}
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid xl:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Назначение платформы
            </p>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-950">
              Система для контроля запасов и управления движением товаров
            </h2>

            <p className="mt-6 text-slate-600 leading-8">
              Платформа ориентирована на работу с актуальным состоянием запасов
              и помогает пользователю не просто хранить сведения о товарах, а
              видеть текущую ситуацию на складе, находить риски и реагировать на
              изменения без лишней ручной путаницы.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              <BellRing className="w-4 h-4 text-cyan-700" />
              акцент на контроль, прозрачность и своевременное реагирование
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {capabilities.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-100">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <p className="text-slate-700 leading-7">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Практический эффект
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-950">
              Что дает внедрение системы в складскую работу
            </h2>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-950">01</h3>
              <p className="mt-4 text-slate-700 leading-8">
                Повышается прозрачность управления запасами и снижается риск
                потери актуальной информации о состоянии склада.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-950">02</h3>
              <p className="mt-4 text-slate-700 leading-8">
                Пользователь быстрее выявляет позиции с низким остатком и может
                своевременно планировать дальнейшие действия.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-950">03</h3>
              <p className="mt-4 text-slate-700 leading-8">
                История операций и единая база данных упрощают анализ движения
                товаров и поддержку управленческих решений.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
          Начало работы
        </p>

        <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-slate-950">
          Используйте платформу для более точного контроля складских запасов
        </h2>

        <p className="mt-6 text-slate-600 text-lg leading-8 max-w-3xl mx-auto">
          Система помогает организовать мониторинг запасов, повысить
          предсказуемость складских процессов и упростить управление движением
          товаров в едином цифровом пространстве.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 font-semibold transition-all duration-300"
          >
            Войти в систему
          </Link>
          <Link
            to="/contacts"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white hover:border-slate-400 px-6 py-3 font-medium text-slate-800 transition-all duration-300"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
