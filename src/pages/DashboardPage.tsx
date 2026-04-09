import { useEffect, useMemo } from "react";
import { Table, Tag } from "rsuite";
import {
  Activity,
  AlertTriangle,
  Boxes,
  ChartColumn,
  CircleGauge,
  PackageCheck,
  Truck,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getProducts } from "../redux/slices/productsSlice";
import { getCategories } from "../redux/slices/categoriesSlice";
import { getSuppliers } from "../redux/slices/suppliersSlice";
import { getReceipts } from "../redux/slices/receiptsSlice";
import { getWriteOffs } from "../redux/slices/writeOffsSlice";

const { Column, HeaderCell, Cell } = Table;

const DashboardPage = () => {
  const dispatch = useAppDispatch();

  const { products, isLoading: productsLoading } = useAppSelector(
    (state) => state.productsReducer
  );
  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const { suppliers } = useAppSelector((state) => state.suppliersReducer);
  const { receipts } = useAppSelector((state) => state.receiptsReducer);
  const { writeOffs } = useAppSelector((state) => state.writeOffsReducer);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getSuppliers());
    dispatch(getReceipts());
    dispatch(getWriteOffs());
  }, [dispatch]);

  const lowStockProducts = useMemo(
    () =>
      products.filter(
        (item) => Number(item.quantity) <= Number(item.minStock)
      ),
    [products]
  );

  const totalStockUnits = useMemo(
    () =>
      products.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [products]
  );

  const latestReceipts = [...receipts].slice(-4).reverse();
  const latestWriteOffs = [...writeOffs].slice(-4).reverse();

  const overviewCards = [
    {
      title: "Запасы",
      value: products.length,
      note: "товарных позиций в системе",
      icon: <Boxes className="w-5 h-5" />,
      tone: "bg-cyan-50 text-cyan-700 border-cyan-100",
    },
    {
      title: "Категории",
      value: categories.length,
      note: "групп для классификации",
      icon: <ChartColumn className="w-5 h-5" />,
      tone: "bg-violet-50 text-violet-700 border-violet-100",
    },
    {
      title: "Поставщики",
      value: suppliers.length,
      note: "активных контрагентов",
      icon: <Truck className="w-5 h-5" />,
      tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      title: "Единиц на складе",
      value: totalStockUnits,
      note: "суммарный объём запасов",
      icon: <PackageCheck className="w-5 h-5" />,
      tone: "bg-sky-50 text-sky-700 border-sky-100",
    },
  ];

  return (
    <div className="text-slate-900">
      <div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-8 mb-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm text-cyan-700">
            <Activity className="w-4 h-4" />
            Dashboard мониторинга
          </div>

          <h2 className="mt-5 text-3xl md:text-4xl font-bold text-slate-950">
            Контроль состояния складских запасов
          </h2>

          <p className="mt-5 max-w-3xl text-slate-600 leading-8">
            Панель отображает основные показатели системы, текущий статус
            товарных позиций и изменения, связанные с движением запасов.
            Интерфейс помогает быстро оценить ситуацию на складе и обратить
            внимание на критически важные участки.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {overviewCards.map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${card.tone}`}
                  >
                    {card.icon}
                  </div>
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    обзор
                  </span>
                </div>

                <div className="mt-5 text-3xl font-bold text-slate-950">
                  {card.value}
                </div>
                <h3 className="mt-2 text-base font-semibold text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{card.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-amber-100 bg-amber-50 p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-100 bg-white text-amber-600">
            <CircleGauge className="w-6 h-6" />
          </div>

          <h3 className="mt-5 text-2xl font-bold text-slate-950">
            Позиции под наблюдением
          </h3>

          <p className="mt-4 text-slate-700 leading-8">
            Система выявляет товары, у которых остаток приблизился к
            минимальному значению или уже достиг критического уровня.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-white bg-white px-5 py-4">
              <div className="text-sm text-slate-500">Проблемных позиций</div>
              <div className="mt-2 text-3xl font-bold text-amber-600">
                {lowStockProducts.length}
              </div>
            </div>

            <div className="rounded-2xl border border-white bg-white px-5 py-4">
              <div className="text-sm text-slate-500">
                Зарегистрированных поступлений
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-950">
                {receipts.length}
              </div>
            </div>

            <div className="rounded-2xl border border-white bg-white px-5 py-4">
              <div className="text-sm text-slate-500">
                Зарегистрированных списаний
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-950">
                {writeOffs.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-[1fr_0.9fr] gap-8 mb-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-950">
                Критические остатки
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Товары, требующие внимания
              </p>
            </div>
          </div>

          {productsLoading ? (
            <p className="text-slate-500">Загрузка данных...</p>
          ) : lowStockProducts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-500">
              На данный момент все товарные позиции находятся в допустимом
              диапазоне остатка.
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-slate-200">
              <Table
                data={lowStockProducts}
                autoHeight
                bordered
                cellBordered
                wordWrap="break-word"
              >
                <Column width={80} align="center">
                  <HeaderCell>ID</HeaderCell>
                  <Cell dataKey="id" />
                </Column>

                <Column flexGrow={1.5}>
                  <HeaderCell>Наименование</HeaderCell>
                  <Cell dataKey="name" />
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>Артикул</HeaderCell>
                  <Cell dataKey="article" />
                </Column>

                <Column width={120} align="center">
                  <HeaderCell>Остаток</HeaderCell>
                  <Cell dataKey="quantity" />
                </Column>

                <Column width={150} align="center">
                  <HeaderCell>Мин. уровень</HeaderCell>
                  <Cell dataKey="minStock" />
                </Column>

                <Column width={160} align="center">
                  <HeaderCell>Статус</HeaderCell>
                  <Cell>
                    {(rowData) =>
                      Number(rowData.quantity) === 0 ? (
                        <Tag color="red">Отсутствует</Tag>
                      ) : (
                        <Tag color="orange">Низкий остаток</Tag>
                      )
                    }
                  </Cell>
                </Column>
              </Table>
            </div>
          )}
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-950">
            Операционная активность
          </h3>
          <p className="mt-3 text-slate-600 leading-8">
            Последние действия в системе позволяют отследить, как изменяется
            состояние запасов на складе за счёт поступлений и списаний.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <div className="text-sm text-slate-500">Последние поступления</div>
              <div className="mt-2 text-3xl font-bold text-emerald-600">
                {latestReceipts.length}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <div className="text-sm text-slate-500">Последние списания</div>
              <div className="mt-2 text-3xl font-bold text-amber-600">
                {latestWriteOffs.length}
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {latestReceipts.map((item) => (
              <div
                key={`receipt-${item.id}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Поступление</p>
                    <p className="font-semibold text-slate-900 mt-1">
                      Товар ID: {item.productId}
                    </p>
                  </div>
                  <span className="text-emerald-600 font-semibold">
                    +{item.quantity}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-2">{item.date}</p>
              </div>
            ))}

            {latestWriteOffs.map((item) => (
              <div
                key={`writeoff-${item.id}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Списание</p>
                    <p className="font-semibold text-slate-900 mt-1">
                      Товар ID: {item.productId}
                    </p>
                  </div>
                  <span className="text-amber-600 font-semibold">
                    -{item.quantity}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-2">{item.date}</p>
              </div>
            ))}

            {latestReceipts.length === 0 && latestWriteOffs.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-500">
                Операции пока не зарегистрированы.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
