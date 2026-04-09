/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Schema,
  Table,
} from "rsuite";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import {
  Truck,
  Building2,
  Users,
} from "lucide-react";
import "rsuite/dist/rsuite.min.css";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  Supplier,
  createSupplier,
  getSuppliers,
  updateSupplier,
} from "../redux/slices/suppliersSlice";
import DeleteModal from "../components/deleteModal";

const { Column, HeaderCell, Cell } = Table;
const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Укажите название поставщика"),
  contactPerson: StringType().isRequired("Контактное лицо"),
  phone: StringType().isRequired("Телефон"),
  email: StringType().isEmail("Email некорректен").isRequired("Email"),
  address: StringType().isRequired("Адрес"),
});

const SupplierModalForm = ({ open, onClose, supplierData }: any) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<any>(null);

  const [formValue, setFormValue] = useState<any>({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (supplierData) {
      setFormValue(supplierData);
    } else {
      setFormValue({
        name: "",
        contactPerson: "",
        phone: "",
        email: "",
        address: "",
      });
    }
  }, [supplierData, open]);

  const handleSubmit = () => {
    if (!formRef.current?.check()) return;

    if (supplierData?.id) {
      dispatch(updateSupplier({ id: supplierData.id, updatedData: formValue }));
    } else {
      dispatch(createSupplier(formValue));
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <Modal.Header>
        <Modal.Title>
          {supplierData ? "Редактировать" : "Новый поставщик"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          fluid
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={(v) => setFormValue(v)}
        >
          <Form.Group>
            <Form.ControlLabel>Название</Form.ControlLabel>
            <Form.Control name="name" accepter={Input} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Контактное лицо</Form.ControlLabel>
            <Form.Control name="contactPerson" accepter={Input} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Телефон</Form.ControlLabel>
            <Form.Control name="phone" accepter={Input} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name="email" accepter={Input} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Адрес</Form.ControlLabel>
            <Form.Control name="address" accepter={Input} />
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

const SuppliersPage = () => {
  const dispatch = useAppDispatch();
  const { suppliers } = useAppSelector(
    (state) => state.suppliersReducer
  );

  const [showModal, setShowModal] = useState(false);
  const [editSupplier, setEditSupplier] = useState<Supplier | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Supplier | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getSuppliers());
  }, [dispatch]);

  const filtered = useMemo(() => {
    const val = search.toLowerCase();
    return suppliers.filter(
      (s) =>
        s.name.toLowerCase().includes(val) ||
        s.contactPerson.toLowerCase().includes(val)
    );
  }, [suppliers, search]);

  return (
    <div className="text-slate-900">

      {/* HEADER */}
      <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8 mb-8">

        <div className="bg-white border rounded-[30px] p-8">
          <h2 className="text-3xl font-bold">
            Управление поставщиками
          </h2>

          <p className="mt-4 text-slate-600">
            Контроль поставщиков, контактных данных и логистики.
          </p>

          <div className="mt-6 flex gap-4">
            <Button
              appearance="primary"
              color="cyan"
              onClick={() => {
                setEditSupplier(null);
                setShowModal(true);
              }}
              startIcon={<Truck size={18} />}
            >
              Добавить
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
          <h3 className="text-xl font-bold">Статистика</h3>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl">
              <Users />
              <p className="text-2xl font-bold mt-2">
                {suppliers.length}
              </p>
              <p className="text-sm text-slate-500">Поставщиков</p>
            </div>

            <div className="bg-white p-5 rounded-xl">
              <Building2 />
              <p className="text-2xl font-bold mt-2">
                {filtered.length}
              </p>
              <p className="text-sm text-slate-500">В списке</p>
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

          <Column flexGrow={1}>
            <HeaderCell>Компания</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Контакт</HeaderCell>
            <Cell dataKey="contactPerson" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Телефон</HeaderCell>
            <Cell dataKey="phone" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Адрес</HeaderCell>
            <Cell dataKey="address" />
          </Column>

          <Column width={120} align="center">
            <HeaderCell>Действия</HeaderCell>
            <Cell>
              {(row: Supplier) => (
                <div className="flex justify-center gap-2">
                  <Button appearance="subtle" onClick={() => setEditSupplier(row)}>
                    <MdEdit color="#0f766e" size={20} />
                  </Button>
                  <Button appearance="subtle" onClick={() => setDeleteTarget(row)}>
                    <MdDeleteOutline color="#dc2626" size={20} />
                  </Button>
                </div>
              )}
            </Cell>
          </Column>

        </Table>
      </div>

      {/* MODALS */}
      <SupplierModalForm
        open={showModal || !!editSupplier}
        onClose={() => {
          setShowModal(false);
          setEditSupplier(null);
        }}
        supplierData={editSupplier}
      />

      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        id={deleteTarget?.id?.toString() || ""}
        deleteFunc="deleteSupplier"
      />
    </div>
  );
};

export default SuppliersPage;