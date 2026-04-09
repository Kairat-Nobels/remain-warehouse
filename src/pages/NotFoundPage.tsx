import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-xl text-center">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100 text-rose-500">
            <AlertCircle size={28} />
          </div>
        </div>

        {/* CODE */}
        <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mt-4">
          Страница не найдена
        </h2>

        {/* TEXT */}
        <p className="text-slate-600 text-base md:text-lg mt-4 leading-7">
          Запрашиваемая страница отсутствует или была удалена.
          Проверьте адрес или вернитесь на главную страницу.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium transition"
          >
            На главную
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium transition"
          >
            Войти в систему
          </Link>
        </div>

        {/* FOOTER */}
        <p className="text-xs text-slate-400 mt-10">
          STOCK VISION • Система мониторинга склада
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
