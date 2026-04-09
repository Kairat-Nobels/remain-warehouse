/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Schema,
  SelectPicker,
  Table,
  Tooltip,
  Whisper,
} from "rsuite";
import { MdDeleteOutline } from "react-icons/md";
import {
  Inbox,
  TrendingUp,
  PackageCheck,
  CalendarRange,
} from "lucide-react";
import "rsuite/dist/rsuite.min.css";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  Receipt,
  createReceipt,
  getReceipts,
} from "../redux/slices/receiptsSlice";
import { getProducts } from "../redux/slices/productsSlice";
import { getSuppliers } from "../redux/slices/suppliersSlice";
import DeleteModal from "../components/deleteModal";

const { Column, HeaderCell, Cell } = Table;
const { NumberType, StringType } = Schema.Types;

const model = Schema.Model({
  productId: NumberType().isRequired("Выберите товар"),
  supplierId: NumberType().isRequired("Выберите поставщика"),
  quantity: NumberType("Количество должно быть числом")
    .isRequired("Укажите количество")
    .min(1, "Количество должно быть больше 0"),
  price: NumberType("Цена должна быть числом")
    .isRequired("Укажите цену")
    .min(0, "Цена не может быть отрицательной"),
  date: StringType().isRequired("Укажите дату"),
  comment: StringType().isRequired("Укажите комментарий"),
});

const ReceiptModalForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<any>(null);

  const { products } = useAppSelector((state) => state.productsReducer);
  const { suppliers } = useAppSelector((state) => state.suppliersReducer);

  const [formValue, setFormValue] = useState<Partial<Receipt>>({
    productId: undefined,
    supplierId: undefined,
    quantity: 1,
    price: 0,
    totalAmount: 0,
    date: new Date().toISOString().split("T")[0],
    comment: "",
  });

  useEffect(() => {
    if (open) {
      setFormValue({
        productId: undefined,
        supplierId: undefined,
        quantity: 1,
        price: 0,
        totalAmount: 0,
        date: new Date().toISOString().split("T")[0],
        comment: "",
      });
    }
  }, [open]);

  const productOptions = products.map((item) => ({
    label: item.name,
    value: Number(item.id),
  }));

  const supplierOptions = suppliers.map((item) => ({
    label: item.name,
    value: Number(item.id),
  }));

  const handleChange = (value: Partial<Receipt>) => {
    const quantity = Number(value.quantity || 0);
    const price = Number(value.price || 0);

    setFormValue({
      ...value,
      totalAmount: quantity * price,
    });
  };

  const handleSubmit = () => {
    if (!formRef.current?.check()) return;

    const payload: Receipt = {
      productId: Number(formValue.productId),
      supplierId: Number(formValue.supplierId),
      quantity: Number(formValue.quantity),
      price: Number(formValue.price),
      totalAmount: Number(formValue.quantity) * Number(formValue.price),
      date: String(formValue.date),
      comment: String(formValue.comment || "").trim(),
    };

    dispatch(createReceipt(payload));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <Modal.Header>
        <Modal.Title>Новое поступление</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          fluid
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={(value) => handleChange(value as Partial<Receipt>)}
        >
          <Form.Group>
            <Form.ControlLabel>Товар</Form.ControlLabel>
            <SelectPicker
              data={productOptions}
              value={formValue.productId as number}
              onChange={(value) =>
                setFormValue((prev) => ({
                  ...prev,
                  productId: Number(value),
                }))
              }
              style={{ width: "100%" }}
              placeholder="Выберите товар"
              cleanable={false}
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Поставщик</Form.ControlLabel>
            <SelectPicker
              data={supplierOptions}
              value={formValue.supplierId as number}
              onChange={(value) =>
                setFormValue((prev) => ({
                  ...prev,
                  supplierId: Number(value),
                }))
              }
              style={{ width: "100%" }}
              placeholder="Выберите поставщика"
              cleanable={false}
            />
          </Form.Group>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Group>
              <Form.ControlLabel>Количество</Form.ControlLabel>
              <Form.Control name="quantity" accepter={Input} type="number" min={1} />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Цена за единицу</Form.ControlLabel>
              <Form.Control name="price" accepter={Input} type="number" min={0} />
            </Form.Group>
          </div>

          <Form.Group>
            <Form.ControlLabel>Дата</Form.ControlLabel>
            <Form.Control name="date" accepter={Input} type="date" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Комментарий</Form.ControlLabel>
            <Form.Control name="comment" accepter={Input} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Итоговая сумма</Form.ControlLabel>
            <Input
              value={String(
                Number(formValue.quantity || 0) * Number(formValue.price || 0)
              )}
              readOnly
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button appearance="subtle" onClick={onClose}>
          Отмена
        </Button>
        <Button appearance="primary" onClick={handleSubmit}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ReceiptsPage = () => {
  const dispatch = useAppDispatch();

  const { receipts, isLoading, error } = useAppSelector(
    (state) => state.receiptsReducer
  );
  const { products } = useAppSelector((state) => state.productsReducer);
  const { suppliers } = useAppSelector((state) => state.suppliersReducer);

  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Receipt | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getReceipts());
    dispatch(getProducts());
    dispatch(getSuppliers());
  }, [dispatch]);

  const getProductName = (productId: number) => {
    const product = products.find((item) => Number(item.id) === Number(productId));
    return product?.name || "Неизвестный товар";
  };

  const getSupplierName = (supplierId: number) => {
    const supplier = suppliers.find((item) => Number(item.id) === Number(supplierId));
    return supplier?.name || "Неизвестный поставщик";
  };

  const filteredReceipts = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return receipts;

    return receipts.filter((item) => {
      const productName = getProductName(item.productId).toLowerCase();
      const supplierName = getSupplierName(item.supplierId).toLowerCase();

      return (
        productName.includes(value) ||
        supplierName.includes(value) ||
        String(item.comment).toLowerCase().includes(value) ||
        String(item.date).toLowerCase().includes(value)
      );
    });
  }, [receipts, search, products, suppliers]);

  const totalReceiptsAmount = useMemo(
    () =>
      receipts.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0),
    [receipts]
  );

  const totalReceiptsUnits = useMemo(
    () => receipts.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [receipts]
  );

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleDelete = (receipt: Receipt) => {
    setDeleteTarget(receipt);
  };

  return (
    <div className="text-slate-900">
      <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8 mb-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Движение запасов
          </p>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-950">
            Регистрация поступлений на склад
          </h2>

          <p className="mt-5 max-w-3xl text-slate-600 leading-8">
            Раздел используется для фиксации новых поставок, обновления
            складских остатков и сохранения информации о движении товаров
            по входящим операциям.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              appearance="primary"
              color="cyan"
              size="lg"
              style={{ width: "310px" }}
              onClick={handleAdd}
              className="!rounded-2xl"
              startIcon={<Inbox size={16} />}
            >
              Добавить поступление
            </Button>

            <div className="w-full sm:max-w-md">
              <Input
                value={search}
                onChange={(value) => setSearch(value)}
                placeholder="Поиск по товару, поставщику, комментарию..."
                className="!rounded-2xl"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-8">
          <h3 className="text-2xl font-bold text-slate-950">
            Сводка по поступлениям
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-100 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="mt-4 text-3xl font-bold text-slate-950">
                {receipts.length}
              </div>
              <p className="mt-1 text-sm text-slate-500">всего операций</p>
            </div>

            <div className="rounded-2xl border border-cyan-100 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-100">
                <PackageCheck className="w-5 h-5" />
              </div>
              <div className="mt-4 text-3xl font-bold text-slate-950">
                {totalReceiptsUnits}
              </div>
              <p className="mt-1 text-sm text-slate-500">единиц поступило</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-4">
            <div className="text-sm text-slate-500">Общая сумма поступлений</div>
            <div className="mt-2 text-3xl font-bold text-slate-950">
              {totalReceiptsAmount} сом
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CalendarRange className="w-4 h-4" />
              Актуальные входящие операции
            </div>
            <div className="mt-2 text-base font-medium text-slate-900 leading-7">
              Каждое новое поступление автоматически увеличивает остаток товара
              на складе.
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-[30px] border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          Загрузка поступлений...
        </div>
      ) : error ? (
        <div className="rounded-[30px] border border-rose-200 bg-rose-50 p-6 text-rose-600 shadow-sm">
          {error}
        </div>
      ) : (
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="overflow-hidden rounded-[24px] border border-slate-200">
            <Table
              data={filteredReceipts}
              autoHeight
              bordered
              cellBordered
              wordWrap="break-word"
              hover
            >
              <Column width={90} align="center" fixed>
                <HeaderCell>ID</HeaderCell>
                <Cell dataKey="id" />
              </Column>

              <Column flexGrow={1.6} minWidth={240}>
                <HeaderCell>Товар</HeaderCell>
                <Cell>
                  {(rowData: Receipt) => getProductName(rowData.productId)}
                </Cell>
              </Column>

              <Column flexGrow={1.4} minWidth={220}>
                <HeaderCell>Поставщик</HeaderCell>
                <Cell>
                  {(rowData: Receipt) => getSupplierName(rowData.supplierId)}
                </Cell>
              </Column>

              <Column width={110} align="center">
                <HeaderCell>Кол-во</HeaderCell>
                <Cell dataKey="quantity" />
              </Column>

              <Column width={130} align="center">
                <HeaderCell>Цена</HeaderCell>
                <Cell>
                  {(rowData: Receipt) => `${rowData.price} сом`}
                </Cell>
              </Column>

              <Column width={150} align="center">
                <HeaderCell>Сумма</HeaderCell>
                <Cell>
                  {(rowData: Receipt) => `${rowData.totalAmount} сом`}
                </Cell>
              </Column>

              <Column width={150} align="center">
                <HeaderCell>Дата</HeaderCell>
                <Cell dataKey="date" />
              </Column>

              <Column flexGrow={1.5} minWidth={220}>
                <HeaderCell>Комментарий</HeaderCell>
                <Cell dataKey="comment" />
              </Column>

              <Column width={130} align="center" fixed="right">
                <HeaderCell>Действия</HeaderCell>
                <Cell>
                  {(rowData: Receipt) => (
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <Whisper
                        placement="top"
                        trigger="hover"
                        speaker={<Tooltip>Удалить</Tooltip>}
                      >
                        <Button
                          appearance="subtle"
                          onClick={() => handleDelete(rowData)}
                        >
                          <MdDeleteOutline color="#dc2626" size={20} />
                        </Button>
                      </Whisper>
                    </div>
                  )}
                </Cell>
              </Column>
            </Table>
          </div>
        </div>
      )}

      <ReceiptModalForm
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />

      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        id={deleteTarget?.id?.toString() || ""}
        deleteFunc="deleteReceipt"
        title="Удалить поступление"
        message={`Вы уверены, что хотите удалить поступление #${deleteTarget?.id}?`}
      />
    </div>
  );
};

export default ReceiptsPage;
