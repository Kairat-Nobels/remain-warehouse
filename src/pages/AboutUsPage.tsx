import {
  Activity,
  BadgeCheck,
  ChartNoAxesCombined,
  FolderKanban,
  Radar,
  ScanLine,
  Sparkles,
} from "lucide-react";

const coreBlocks = [
  {
    icon: <Radar className="w-6 h-6" />,
    title: "Наблюдение за запасами",
    text: "Платформа позволяет отслеживать изменения остатков и формировать актуальное представление о состоянии склада.",
  },
  {
    icon: <FolderKanban className="w-6 h-6" />,
    title: "Управление данными",
    text: "Система объединяет сведения о товарах, категориях, поставщиках и операциях в единой цифровой среде.",
  },
  {
    icon: <ChartNoAxesCombined className="w-6 h-6" />,
    title: "Аналитическая поддержка",
    text: "История изменений и текущие показатели помогают оценивать складские процессы и принимать решения.",
  },
];

const tasks = [
  "контроль текущих остатков товаров",
  "управление категориями и поставщиками",
  "фиксация поступлений и списаний",
  "выявление критически низких запасов",
  "ведение единой истории движения товаров",
  "повышение прозрачности складских процессов",
];

const technologies = ["React", "Redux Toolkit", "Tailwind CSS", "Mokky.dev API"];

const AboutUsPage = () => {
  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.10),transparent_30%),radial-gradient(circle_at_left,rgba(16,185,129,0.08),transparent_26%)]" />

        <div className="relative max-w-6xl mx-auto px-4 py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm text-cyan-700 shadow-sm">
              <Activity className="w-4 h-4" />
              О платформе
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight text-slate-950">
              Система мониторинга и управления складскими запасами
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-3xl">
              Проект представляет собой веб-платформу, предназначенную для
              контроля состояния складских запасов, регистрации движения
              товаров и повышения качества управления ресурсами в организации.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="rounded-[30px] border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Концепция
            </div>

            <h2 className="mt-5 text-3xl font-bold text-slate-950">
              Назначение и идея системы
            </h2>

            <div className="mt-6 space-y-5 text-slate-600 leading-8">
              <p>
                Основная идея проекта заключается в создании удобной цифровой
                среды, в которой информация о складских запасах представлена
                в целостном и наглядном виде. Пользователь получает доступ к
                данным о текущих остатках, движении товаров и связанных
                операциях через единый интерфейс.
              </p>

              <p>
                В отличие от простого хранения записей, система ориентирована
                на мониторинг: она помогает своевременно замечать изменения,
                выявлять дефицитные позиции и поддерживать более устойчивое
                управление складскими ресурсами.
              </p>
            </div>
          </div>

          <div className="rounded-[30px] border border-cyan-100 bg-cyan-50 p-8 md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-100 bg-white text-cyan-700 shadow-sm">
              <Sparkles className="w-7 h-7" />
            </div>

            <h2 className="mt-5 text-3xl font-bold text-slate-950">
              Практическая ценность
            </h2>

            <p className="mt-5 text-slate-700 leading-8">
              Платформа может использоваться как инструмент цифрового контроля
              запасов, позволяющий сократить риск ошибок, повысить прозрачность
              операций и упростить работу с данными о складских ресурсах.
            </p>

            <div className="mt-6 space-y-3">
              {tasks.slice(0, 3).map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-cyan-100 bg-white px-4 py-4"
                >
                  <BadgeCheck className="w-5 h-5 text-cyan-700 mt-0.5 shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Подход
            </div>

            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-slate-950">
              Как система помогает контролировать складские запасы
            </h2>

            <p className="mt-5 text-slate-600 leading-8">
              Платформа строится вокруг постоянного анализа состояния запасов.
              Она не просто хранит данные, а делает их полезными для ежедневной
              работы: позволяет отслеживать изменения, видеть текущую картину
              склада и быстрее реагировать на отклонения.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {coreBlocks.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-cyan-700">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-600 leading-7">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-[30px] border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
            <h2 className="text-3xl font-bold text-slate-950">
              Ключевые задачи платформы
            </h2>

            <div className="mt-6 space-y-4">
              {tasks.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                >
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-cyan-700">
              <ScanLine className="w-7 h-7" />
            </div>

            <h2 className="mt-5 text-3xl font-bold text-slate-950">
              Технологическая основа
            </h2>

            <p className="mt-5 text-slate-600 leading-8">
              Для реализации платформы используются современные инструменты
              клиентской разработки, позволяющие создавать удобный интерфейс,
              организовывать централизованное управление данными и обеспечивать
              стабильную работу пользовательской части системы.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
              Платформа ориентирована на практическое применение и может
              использоваться как цифровой инструмент мониторинга складских
              ресурсов.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
