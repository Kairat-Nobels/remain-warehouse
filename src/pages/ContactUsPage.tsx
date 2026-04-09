import { Mail, MapPin, MessageSquareText, Phone, Send, Clock3 } from "lucide-react";

const contactItems = [
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Телефон",
    value: "+996 708 796 876",
    description: "Связь по вопросам работы платформы и консультациям.",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Электронная почта",
    value: "info@stockvision.kg",
    description: "Для обращений, предложений и уточнения информации.",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Адрес",
    value: "г. Бишкек, Кыргызстан",
    description: "Рабочая точка взаимодействия по проекту.",
  },
  {
    icon: <Clock3 className="w-5 h-5" />,
    title: "Режим связи",
    value: "Пн–Пт, 09:00–18:00",
    description: "Ответы на обращения в рабочее время.",
  },
];

const ContactUsPage = () => {
  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_24%)]" />

        <div className="relative max-w-6xl mx-auto px-4 py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm text-cyan-700 shadow-sm">
              <MessageSquareText className="w-4 h-4" />
              Контактная информация
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight text-slate-950">
              Свяжитесь с нами по вопросам платформы
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Если у вас есть вопросы, предложения или замечания по работе
              системы мониторинга и управления складскими запасами, вы можете
              воспользоваться контактной информацией или отправить сообщение
              через форму обратной связи.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid xl:grid-cols-[0.9fr_1.1fr] gap-8">
          <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Контакты
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Основные каналы связи
            </h2>

            <div className="mt-8 space-y-4">
              {contactItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-cyan-700 shrink-0">
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-slate-800 font-medium">
                        {item.value}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Обратная связь
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Отправить сообщение
            </h2>

            <p className="mt-4 text-slate-600 leading-8">
              Используйте форму ниже, чтобы отправить обращение. Сообщение может
              содержать вопрос о работе системы, предложение по улучшению
              интерфейса или замечание, связанное с функциональностью платформы.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Сообщение отправлено");
              }}
              className="mt-8 space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Имя
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Введите ваше имя"
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="Введите email"
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Тема обращения
                </label>
                <input
                  required
                  type="text"
                  placeholder="Кратко укажите тему"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Сообщение
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Опишите ваш вопрос или предложение"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
              >
                <Send className="w-4 h-4" />
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-950">
            Мы открыты для вопросов и предложений
          </h2>
          <p className="mt-5 max-w-3xl mx-auto text-lg leading-8 text-slate-600">
            Обратная связь помогает улучшать платформу, делать интерфейс удобнее
            и повышать практическую ценность системы для пользователей.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
