import { Link } from "react-router-dom";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Boxes,
  ChartColumn,
  CircleGauge,
  Layers3,
  ShieldCheck,
  Truck,
  Warehouse,
} from "lucide-react";

const features = [
  {
    icon: <CircleGauge className="w-7 h-7" />,
    title: "Мониторинг запасов",
    description:
      "Система позволяет отслеживать текущее состояние складских запасов, контролировать изменения и быстро выявлять дефицитные позиции.",
  },
  {
    icon: <Truck className="w-7 h-7" />,
    title: "Управление поступлениями",
    description:
      "Поступления товаров фиксируются в системе и автоматически влияют на актуальные складские остатки.",
  },
  {
    icon: <Layers3 className="w-7 h-7" />,
    title: "Управление категориями и поставщиками",
    description:
      "Удобная работа с категориями товаров и базой поставщиков в единой административной панели.",
  },
  {
    icon: <BarChart3 className="w-7 h-7" />,
    title: "Аналитика и история",
    description:
      "Просмотр истории движения запасов, операций списания и поступления, а также ключевых показателей склада.",
  },
];

const highlights = [
  "Контроль текущих остатков товаров",
  "Быстрый доступ к данным о поставщиках",
  "Мониторинг критически низких запасов",
  "История изменений и движения запасов",
  "Единая панель управления системой",
  "Повышение точности складского учета",
];

const metrics = [
  { value: "24/7", label: "доступ к данным" },
  { value: "100%", label: "контроль операций" },
  { value: "1", label: "единая платформа" },
  { value: "0", label: "лишней путаницы" },
];

const HomePage = () => {
  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-slate-50 to-cyan-50">
        <div className="absolute inset-0 opacity-60">
          <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-cyan-100 blur-3xl" />
          <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-sky-100 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-100 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-4 py-2 text-sm text-cyan-700 shadow-sm mb-6">
                <Warehouse className="w-4 h-4" />
                Система мониторинга складских запасов
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-950">
                Система мониторинга и управления{" "}
                <span className="text-cyan-700">складскими запасами</span>
              </h1>

              <p className="mt-6 text-slate-600 text-base sm:text-lg leading-8 max-w-2xl">
                Современное веб-приложение для контроля складских запасов,
                анализа движения товаров, управления поступлениями и списаниями,
                а также повышения прозрачности складских процессов.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 font-semibold transition-all duration-300 shadow-sm"
                >
                  Войти в систему
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/about-system"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white hover:border-cyan-500 hover:text-cyan-700 px-6 py-3 font-medium text-slate-800 transition-all duration-300"
                >
                  О системе
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {metrics.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-slate-950">
                      {item.value}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        Панель мониторинга запасов
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Ключевые показатели и критические позиции
                      </p>
                    </div>
                    <ChartColumn className="w-8 h-8 text-cyan-600" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="rounded-2xl bg-white border border-slate-200 p-4">
                      <p className="text-sm text-slate-500">Товарных позиций</p>
                      <h4 className="text-2xl font-bold mt-2 text-slate-950">1 248</h4>
                    </div>
                    <div className="rounded-2xl bg-white border border-slate-200 p-4">
                      <p className="text-sm text-slate-500">Поставщиков</p>
                      <h4 className="text-2xl font-bold mt-2 text-slate-950">36</h4>
                    </div>
                    <div className="rounded-2xl bg-white border border-slate-200 p-4">
                      <p className="text-sm text-slate-500">Активных поставок</p>
                      <h4 className="text-2xl font-bold mt-2 text-emerald-600">182</h4>
                    </div>
                    <div className="rounded-2xl bg-white border border-slate-200 p-4">
                      <p className="text-sm text-slate-500">Рисковых позиций</p>
                      <h4 className="text-2xl font-bold mt-2 text-amber-600">47</h4>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900">
                        Критически низкие остатки
                      </p>
                      <AlertCircle className="w-5 h-5 text-rose-500" />
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
                        <span className="text-slate-700">Бумага офисная A4</span>
                        <span className="text-rose-600 font-semibold">Остаток: 6</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
                        <span className="text-slate-700">Маркер складской</span>
                        <span className="text-amber-600 font-semibold">Остаток: 11</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
                        <span className="text-slate-700">Картридж HP</span>
                        <span className="text-rose-600 font-semibold">Остаток: 3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-5 -right-4 hidden md:flex items-center gap-2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-emerald-700 shadow-md">
                <ShieldCheck className="w-5 h-5" />
                Контроль запасов в реальном времени
              </div>

              <div className="absolute -bottom-5 -left-4 hidden md:flex items-center gap-2 rounded-2xl border border-cyan-200 bg-white px-4 py-3 text-cyan-700 shadow-md">
                <Boxes className="w-5 h-5" />
                Централизованное управление складом
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <p className="text-cyan-700 font-medium mb-3">Функциональные возможности</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-950">
              Инструменты для мониторинга и управления складскими запасами
            </h2>
            <p className="text-slate-600 mt-4 leading-8">
              Система помогает контролировать запасы, анализировать движение
              товаров и оперативно принимать решения на основе актуальных данных.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
            {features.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-100">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mt-5 text-slate-950">
                  {item.title}
                </h3>
                <p className="text-slate-600 mt-3 leading-7">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-emerald-700 font-medium mb-3">Структура платформы</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-950">
                Информационная система для контроля складских запасов
              </h2>
              <p className="text-slate-600 mt-4 leading-8">
                Платформа объединяет инструменты мониторинга, управления остатками,
                анализа операций и контроля критических позиций в едином рабочем интерфейсе.
              </p>

              <div className="mt-8 space-y-4">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
                  >
                    <div className="mt-1 w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
                  <Warehouse className="w-10 h-10 text-cyan-700" />
                  <h3 className="text-xl font-semibold mt-4 text-slate-950">
                    Запасы
                  </h3>
                  <p className="text-slate-600 mt-2 leading-7">
                    Отображение актуального количества товаров и контроль критически низких остатков.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
                  <Truck className="w-10 h-10 text-emerald-700" />
                  <h3 className="text-xl font-semibold mt-4 text-slate-950">
                    Поставщики
                  </h3>
                  <p className="text-slate-600 mt-2 leading-7">
                    Работа с поставщиками и учет поставок в единой базе данных.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
                  <Activity className="w-10 h-10 text-amber-600" />
                  <h3 className="text-xl font-semibold mt-4 text-slate-950">
                    Мониторинг
                  </h3>
                  <p className="text-slate-600 mt-2 leading-7">
                    Быстрое выявление рисков, дефицита и изменений в состоянии складских запасов.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
                  <BarChart3 className="w-10 h-10 text-sky-600" />
                  <h3 className="text-xl font-semibold mt-4 text-slate-950">
                    Аналитика
                  </h3>
                  <p className="text-slate-600 mt-2 leading-7">
                    История операций и наглядные показатели для принятия решений.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-cyan-700 font-medium mb-3">Начало работы</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-slate-950">
            Контролируйте складские запасы в удобной и понятной системе
          </h2>
          <p className="text-slate-600 mt-5 text-base md:text-lg leading-8 max-w-3xl mx-auto">
            Платформа помогает организовать мониторинг запасов, снизить риск дефицита,
            повысить прозрачность операций и улучшить общее управление складом.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 font-semibold transition-all duration-300"
            >
              Перейти в систему
            </Link>
            <Link
              to="/contacts"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 hover:border-cyan-500 hover:text-cyan-700 bg-white px-6 py-3 font-medium transition-all duration-300"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;