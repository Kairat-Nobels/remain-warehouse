/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Input, SelectPicker, Table, Tag } from "rsuite";
import {
  Filter,
  TrendingUp,
  TrendingDown,
  Boxes,
  CalendarRange,
} from "lucide-react";
import "rsuite/dist/rsuite.min.css";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getReceipts } from "../redux/slices/receiptsSlice";
import { getWriteOffs } from "../redux/slices/writeOffsSlice";
import { getProducts } from "../redux/slices/productsSlice";
import { getSuppliers } from "../redux/slices/suppliersSlice";

const { Column, HeaderCell, Cell } = Table;

type OperationRow = {
  id: string;
  originalId: number;
  type: "receipt" | "writeOff";
  typeLabel: string;
  productId: number;
  supplierId?: number;
  quantity: number;
  amount?: number;
  reason?: string;
  comment: string;
  date: string;
};

const OperationsHistoryPage = () => {
  const dispatch = useAppDispatch();

  const { receipts } = useAppSelector((state) => state.receiptsReducer);
  const { writeOffs } = useAppSelector((state) => state.writeOffsReducer);
  const { products } = useAppSelector((state) => state.productsReducer);
  const { suppliers } = useAppSelector((state) => state.suppliersReducer);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getReceipts());
    dispatch(getWriteOffs());
    dispatch(getProducts());
    dispatch(getSuppliers());
  }, [dispatch]);

  const getProductName = (productId: number) => {
    const product = products.find((item) => Number(item.id) === Number(productId));
    return product?.name || "Неизвестный товар";
  };

  const getSupplierName = (supplierId?: number) => {
    if (!supplierId) return "—";
    const supplier = suppliers.find((item) => Number(item.id) === Number(supplierId));
    return supplier?.name || "Неизвестный поставщик";
  };

  const operations: OperationRow[] = useMemo(() => {
    const mappedReceipts: OperationRow[] = receipts.map((item) => ({
      id: `receipt-${item.id}`,
      originalId: Number(item.id),
      type: "receipt",
      typeLabel: "Поступление",
      productId: Number(item.productId),
      supplierId: Number(item.supplierId),
      quantity: Number(item.quantity),
      amount: Number(item.totalAmount),
      comment: item.comment,
      date: item.date,
    }));

    const mappedWriteOffs: OperationRow[] = writeOffs.map((item) => ({
      id: `writeoff-${item.id}`,
      originalId: Number(item.id),
      type: "writeOff",
      typeLabel: "Списание",
      productId: Number(item.productId),
      quantity: Number(item.quantity),
      reason: item.reason,
      comment: item.comment,
      date: item.date,
    }));

    return [...mappedReceipts, ...mappedWriteOffs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [receipts, writeOffs]);

  const filteredOperations = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return operations.filter((item) => {
      const productName = getProductName(item.productId).toLowerCase();
      const supplierName = getSupplierName(item.supplierId).toLowerCase();
      const comment = String(item.comment || "").toLowerCase();
      const reason = String(item.reason || "").toLowerCase();
      const date = String(item.date || "").toLowerCase();
      const typeLabel = item.typeLabel.toLowerCase();

      const matchesSearch =
        !searchValue ||
        productName.includes(searchValue) ||
        supplierName.includes(searchValue) ||
        comment.includes(searchValue) ||
        reason.includes(searchValue) ||
        date.includes(searchValue) ||
        typeLabel.includes(searchValue);

      const matchesType = !typeFilter || item.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [operations, search, typeFilter, products, suppliers]);

  const typeOptions = [
    { label: "Все операции", value: null },
    { label: "Поступления", value: "receipt" },
    { label: "Списания", value: "writeOff" },
  ];

  const totalReceipts = operations.filter((item) => item.type === "receipt").length;
  const totalWriteOffs = operations.filter((item) => item.type === "writeOff").length;
  const totalMovedUnits = operations.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  return (
    <div className="text-slate-900">
      <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8 mb-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Журнал операций
          </p>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-950">
            История движения складских запасов
          </h2>

          <p className="mt-5 max-w-3xl text-slate-600 leading-8">
            Раздел объединяет входящие и исходящие операции в едином журнале.
            Здесь можно просматривать движение товаров, отслеживать причины
            списаний и анализировать изменения запасов по датам.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <Input
              value={search}
              onChange={(value) => setSearch(value)}
              placeholder="Поиск по товару, поставщику, дате..."
              className="!rounded-2xl"
            />

            <SelectPicker
              data={typeOptions}
              value={typeFilter}
              onChange={(value) => setTypeFilter(value as string | null)}
              style={{ width: "100%" }}
              placeholder="Фильтр по типу операции"
              cleanable
            />
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-8">
          <h3 className="text-2xl font-bold text-slate-950">
            Сводка по операциям
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-100 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="mt-4 text-3xl font-bold text-slate-950">
                {totalReceipts}
              </div>
              <p className="mt-1 text-sm text-slate-500">поступлений</p>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 border border-amber-100">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div className="mt-4 text-3xl font-bold text-slate-950">
                {totalWriteOffs}
              </div>
              <p className="mt-1 text-sm text-slate-500">списаний</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Boxes className="w-4 h-4" />
              Совокупное движение товаров
            </div>
            <div className="mt-2 text-3xl font-bold text-slate-950">
              {totalMovedUnits}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CalendarRange className="w-4 h-4" />
              Назначение раздела
            </div>
            <div className="mt-2 text-base font-medium text-slate-900 leading-7">
              Единый журнал нужен для контроля движения запасов и анализа
              операций склада.
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h3 className="text-2xl font-bold text-slate-950">
              Общий реестр операций
            </h3>
            <p className="mt-2 text-slate-500">
              Найдено записей: {filteredOperations.length}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
            <Filter className="w-4 h-4" />
            Поиск и фильтрация журнала
          </div>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-slate-200">
          <Table
            data={filteredOperations}
            autoHeight
            bordered
            cellBordered
            wordWrap="break-word"
            hover
          >
            <Column width={90} align="center" fixed>
              <HeaderCell>ID</HeaderCell>
              <Cell dataKey="originalId" />
            </Column>

            <Column width={160} align="center">
              <HeaderCell>Тип операции</HeaderCell>
              <Cell>
                {(rowData: OperationRow) =>
                  rowData.type === "receipt" ? (
                    <Tag color="green">Поступление</Tag>
                  ) : (
                    <Tag color="orange">Списание</Tag>
                  )
                }
              </Cell>
            </Column>

            <Column flexGrow={1.8} minWidth={240}>
              <HeaderCell>Товар</HeaderCell>
              <Cell>
                {(rowData: OperationRow) => getProductName(rowData.productId)}
              </Cell>
            </Column>

            <Column flexGrow={1.4} minWidth={220}>
              <HeaderCell>Поставщик</HeaderCell>
              <Cell>
                {(rowData: OperationRow) => getSupplierName(rowData.supplierId)}
              </Cell>
            </Column>

            <Column width={110} align="center">
              <HeaderCell>Кол-во</HeaderCell>
              <Cell dataKey="quantity" />
            </Column>

            <Column width={140} align="center">
              <HeaderCell>Сумма</HeaderCell>
              <Cell>
                {(rowData: OperationRow) =>
                  rowData.type === "receipt" ? `${rowData.amount} сом` : "—"
                }
              </Cell>
            </Column>

            <Column flexGrow={1.2} minWidth={180}>
              <HeaderCell>Причина</HeaderCell>
              <Cell>
                {(rowData: OperationRow) => rowData.reason || "—"}
              </Cell>
            </Column>

            <Column flexGrow={1.6} minWidth={240}>
              <HeaderCell>Комментарий</HeaderCell>
              <Cell dataKey="comment" />
            </Column>

            <Column width={150} align="center">
              <HeaderCell>Дата</HeaderCell>
              <Cell dataKey="date" />
            </Column>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default OperationsHistoryPage;
