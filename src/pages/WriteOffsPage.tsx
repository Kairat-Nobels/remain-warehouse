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
} from "rsuite";
import { MdDeleteOutline } from "react-icons/md";
import {
  PackageMinus,
  Boxes,
  TrendingDown,
} from "lucide-react";
import "rsuite/dist/rsuite.min.css";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  WriteOff,
  createWriteOff,
  getWriteOffs,
} from "../redux/slices/writeOffsSlice";
import { getProducts } from "../redux/slices/productsSlice";
import DeleteModal from "../components/deleteModal";

const { Column, HeaderCell, Cell } = Table;
const { NumberType, StringType } = Schema.Types;

const model = Schema.Model({
  productId: NumberType().isRequired("Выберите товар"),
  quantity: NumberType()
    .isRequired("Укажите количество")
    .min(1, "Количество должно быть больше 0"),
  reason: StringType().isRequired("Укажите причину"),
  date: StringType().isRequired("Укажите дату"),
  comment: StringType().isRequired("Комментарий обязателен"),
});

const WriteOffModalForm = ({ open, onClose }: any) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<any>(null);

  const { products } = useAppSelector((state) => state.productsReducer);

  const [formValue, setFormValue] = useState<Partial<WriteOff>>({
    productId: undefined,
    quantity: 1,
    reason: "",
    date: new Date().toISOString().split("T")[0],
    comment: "",
  });

  useEffect(() => {
    if (open) {
      setFormValue({
        productId: undefined,
        quantity: 1,
        reason: "",
        date: new Date().toISOString().split("T")[0],
        comment: "",
      });
    }
  }, [open]);

  const productOptions = products.map((item) => ({
    label: `${item.name} (остаток: ${item.quantity})`,
    value: Number(item.id),
  }));

  const handleSubmit = () => {
    if (!formRef.current?.check()) return;

    dispatch(
      createWriteOff({
        productId: Number(formValue.productId),
        quantity: Number(formValue.quantity),
        reason: String(formValue.reason),
        date: String(formValue.date),
        comment: String(formValue.comment),
      })
    );

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <Modal.Header>
        <Modal.Title>Новое списание</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          fluid
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={(value) => setFormValue(value)}
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
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Количество</Form.ControlLabel>
            <Form.Control name="quantity" accepter={Input} type="number" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Причина</Form.ControlLabel>
            <Form.Control name="reason" accepter={Input} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Дата</Form.ControlLabel>
            <Form.Control name="date" accepter={Input} type="date" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Комментарий</Form.ControlLabel>
            <Form.Control name="comment" accepter={Input} />
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

const WriteOffsPage = () => {
  const dispatch = useAppDispatch();

  const { writeOffs } = useAppSelector(
    (state) => state.writeOffsReducer
  );
  const { products } = useAppSelector((state) => state.productsReducer);

  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<WriteOff | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getWriteOffs());
    dispatch(getProducts());
  }, [dispatch]);

  const getProductName = (id: number) => {
    const p = products.find((i) => Number(i.id) === Number(id));
    return p?.name || "Не найден";
  };

  const filtered = useMemo(() => {
    const val = search.toLowerCase();

    return writeOffs.filter(
      (w) =>
        getProductName(w.productId).toLowerCase().includes(val) ||
        w.reason.toLowerCase().includes(val) ||
        w.comment.toLowerCase().includes(val)
    );
  }, [writeOffs, search, products]);

  const totalUnits = useMemo(
    () => writeOffs.reduce((sum, i) => sum + Number(i.quantity), 0),
    [writeOffs]
  );

  return (
    <div className="text-slate-900">

      {/* HEADER */}
      <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8 mb-8">

        <div className="bg-white border rounded-[30px] p-8">
          <h2 className="text-3xl font-bold">
            Списание товаров
          </h2>

          <p className="mt-4 text-slate-600">
            Контроль убытков и списаний со склада.
          </p>

          <div className="mt-6 flex gap-4">
            <Button
              appearance="primary"
              color="red"
              size="lg"
              style={{ width: "270px" }}
              onClick={() => setShowModal(true)}
              startIcon={<PackageMinus size={18} />}
            >
              Списать товар
            </Button>

            <Input
              placeholder="Поиск..."
              value={search}
              onChange={setSearch}
            />
          </div>
        </div>

        {/* STATS */}
        <div className="bg-slate-50 border rounded-[30px] p-8">
          <h3 className="text-xl font-bold">Сводка</h3>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl">
              <TrendingDown />
              <p className="text-2xl font-bold mt-2">
                {writeOffs.length}
              </p>
              <p className="text-sm text-slate-500">операций</p>
            </div>

            <div className="bg-white p-5 rounded-xl">
              <Boxes />
              <p className="text-2xl font-bold mt-2">
                {totalUnits}
              </p>
              <p className="text-sm text-slate-500">списано</p>
            </div>
          </div>

          <div className="mt-4 bg-white p-4 rounded-xl">
            <div className="text-sm text-slate-500">
              Списания уменьшают остаток товара
            </div>
            <div className="mt-2 text-slate-900">
              Контролируйте причины списаний для анализа потерь.
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-[30px] p-6">
        <Table data={filtered} autoHeight bordered cellBordered hover>

          <Column width={80} align="center">
            <HeaderCell>ID</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column flexGrow={1.5}>
            <HeaderCell>Товар</HeaderCell>
            <Cell>
              {(row: WriteOff) => getProductName(row.productId)}
            </Cell>
          </Column>

          <Column width={120}>
            <HeaderCell>Кол-во</HeaderCell>
            <Cell dataKey="quantity" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Причина</HeaderCell>
            <Cell dataKey="reason" />
          </Column>

          <Column width={140}>
            <HeaderCell>Дата</HeaderCell>
            <Cell dataKey="date" />
          </Column>

          <Column flexGrow={1.5}>
            <HeaderCell>Комментарий</HeaderCell>
            <Cell dataKey="comment" />
          </Column>

          <Column width={120} align="center">
            <HeaderCell>Действия</HeaderCell>
            <Cell>
              {(row: WriteOff) => (
                <Button onClick={() => setDeleteTarget(row)}>
                  <MdDeleteOutline />
                </Button>
              )}
            </Cell>
          </Column>

        </Table>
      </div>

      <WriteOffModalForm open={showModal} onClose={() => setShowModal(false)} />

      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        id={deleteTarget?.id?.toString() || ""}
        deleteFunc="deleteWriteOff"
      />
    </div>
  );
};

export default WriteOffsPage;
