/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { loginAdmin } from "../redux/slices/adminSlice";
import { useAppDispatch } from "../hooks/hooks";
import { ArrowRight, LockKeyhole, Orbit, ShieldCheck } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { valid } = useSelector((state: any) => state.adminReducer);

  useEffect(() => {
    if (localStorage.getItem("admin") || valid) {
      navigate("/admin");
    }
  }, [valid, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(loginAdmin(formData));

      if (loginAdmin.fulfilled.match(resultAction)) {
        toast.success("Вход выполнен успешно");
        navigate("/admin");
      } else {
        toast.error("Неверный логин или пароль");
      }
    } catch {
      toast.error("Что-то пошло не так");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm lg:grid-cols-[1fr_0.95fr]">
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef9ff_100%)] p-10">
          <div className="absolute -top-10 -left-10 h-52 w-52 rounded-full bg-cyan-100 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-sky-100 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-cyan-700">
                <Orbit className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
                  Stock Vision
                </div>
                <div className="text-xs text-slate-500">
                  Платформа мониторинга запасов
                </div>
              </div>
            </div>

            <h1 className="mt-10 max-w-xl text-4xl font-bold leading-tight text-slate-950">
              Вход в рабочее пространство системы мониторинга складских запасов
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Авторизация предоставляет доступ к панели мониторинга, управлению
              запасами, операциям движения товаров и аналитическим данным
              платформы.
            </p>
          </div>

          <div className="relative space-y-4">
            <div className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-950">
                  Защищенный доступ
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Вход в систему доступен только пользователю с правами
                  администратора.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                <LockKeyhole className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-950">
                  Централизованное управление
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  После авторизации становится доступна панель управления
                  запасами и ключевыми складскими процессами.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Авторизация
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Вход в систему
              </h2>
              <p className="mt-3 text-slate-600 leading-7">
                Введите учетные данные администратора для продолжения работы.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="login"
                  placeholder="Введите email"
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Пароль
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Введите пароль"
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <button
                type="submit"
                disabled={!formData.login || !formData.password}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Войти в рабочее пространство
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
              Доступ к панели управления предоставляется только авторизованному
              пользователю.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
