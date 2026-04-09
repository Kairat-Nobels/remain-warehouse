/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Schema,
  Table,
  Tooltip,
  Whisper,
} from "rsuite";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import {
  FolderPlus,
  Layers3,
  Search,
  FolderTree,
  Tag,
} from "lucide-react";
import "rsuite/dist/rsuite.min.css";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  Category,
  createCategory,
  getCategories,
  updateCategory,
} from "../redux/slices/categoriesSlice";
import DeleteModal from "../components/deleteModal";

const { Column, HeaderCell, Cell } = Table;
const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Укажите название категории"),
});

const CategoryModalForm = ({
  open,
  onClose,
  categoryData,
}: {
  open: boolean;
  onClose: () => void;
  categoryData: Category | null;
}) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<any>(null);
  const [formValue, setFormValue] = useState<Partial<Category>>({ name: "" });

  useEffect(() => {
    if (categoryData) {
      setFormValue({ name: categoryData.name });
    } else {
      setFormValue({ name: "" });
    }
  }, [categoryData, open]);

  const handleSubmit = () => {
    if (!formRef.current?.check()) return;

    const payload: Category = {
      name: String(formValue.name || "").trim(),
    };

    if (categoryData?.id) {
      dispatch(
        updateCategory({
          id: Number(categoryData.id),
          updatedData: payload,
        })
      );
    } else {
      dispatch(createCategory(payload));
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="xs">
      <Modal.Header>
        <Modal.Title>
          {categoryData ? "Редактировать категорию" : "Добавить категорию"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          fluid
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={(value) => setFormValue(value as Partial<Category>)}
        >
          <Form.Group>
            <Form.ControlLabel>Название категории</Form.ControlLabel>
            <Form.Control name="name" accepter={Input} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <div className="flex items-center justify-end gap-3">
          <Button appearance="subtle" onClick={onClose}>
            Отмена
          </Button>
          <Button appearance="primary" onClick={handleSubmit}>
            {categoryData ? "Сохранить" : "Добавить"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const { categories, isLoading, error } = useAppSelector(
    (state) => state.categoriesReducer
  );

  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const filteredCategories = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return categories;

    return categories.filter((item) =>
      String(item.name).toLowerCase().includes(value)
    );
  }, [categories, search]);

  const handleAdd = () => {
    setEditCategory(null);
    setShowModal(true);
  };

  const handleEdit = (category: Category) => {
    setEditCategory(category);
    setShowModal(true);
  };

  const handleDelete = (category: Category) => {
    setDeleteTarget(category);
  };

  return (
    <div className="text-slate-900">
      <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8 mb-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Структура запасов
          </p>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-950">
            Категории складских позиций
          </h2>

          <p className="mt-5 max-w-3xl text-slate-600 leading-8">
            Раздел используется для организации товарных позиций по
            смысловым группам. Категории помогают поддерживать более удобную
            структуру данных и упрощают работу с запасами в системе.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              appearance="primary"
              color="cyan"
              size="lg"
              style={{ width: "280px" }}
              onClick={handleAdd}
              className="!rounded-2xl"
              startIcon={<FolderPlus size={18} />}
            >
              Добавить категорию
            </Button>

            <div className="w-full sm:max-w-md">
              <Input
                value={search}
                onChange={(value) => setSearch(value)}
                placeholder="Поиск по названию категории..."
                className="!rounded-2xl"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-8">
          <h3 className="text-2xl font-bold text-slate-950">
            Краткая информация
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-cyan-100 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-100">
                <Layers3 className="w-5 h-5" />
              </div>
              <div className="mt-4 text-3xl font-bold text-slate-950">
                {categories.length}
              </div>
              <p className="mt-1 text-sm text-slate-500">всего категорий</p>
            </div>

            <div className="rounded-2xl border border-violet-100 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-700 border border-violet-100">
                <FolderTree className="w-5 h-5" />
              </div>
              <div className="mt-4 text-3xl font-bold text-slate-950">
                {filteredCategories.length}
              </div>
              <p className="mt-1 text-sm text-slate-500">отображается сейчас</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-4">
            <div className="text-sm text-slate-500">Назначение раздела</div>
            <div className="mt-2 text-base font-medium text-slate-900 leading-7">
              Формирование понятной структуры для контроля и распределения
              складских позиций по тематическим группам.
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-[30px] border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          Загрузка категорий...
        </div>
      ) : error ? (
        <div className="rounded-[30px] border border-rose-200 bg-rose-50 p-6 text-rose-600 shadow-sm">
          {error}
        </div>
      ) : (
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <h3 className="text-2xl font-bold text-slate-950">
                Реестр категорий
              </h3>
              <p className="mt-2 text-slate-500">
                Найдено записей: {filteredCategories.length}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
              <Search className="w-4 h-4" />
              Поиск и управление категориями
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-slate-200">
            <Table
              data={filteredCategories}
              autoHeight
              bordered
              cellBordered
              wordWrap="break-word"
              hover
            >
              <Column width={100} align="center" fixed>
                <HeaderCell>ID</HeaderCell>
                <Cell dataKey="id" />
              </Column>

              <Column flexGrow={1.5} minWidth={260}>
                <HeaderCell>Название категории</HeaderCell>
                <Cell dataKey="name" />
              </Column>

              <Column width={180} align="center">
                <HeaderCell>Тип записи</HeaderCell>
                <Cell>
                  {() => <Tag color="blue">Категория</Tag>}
                </Cell>
              </Column>

              <Column width={140} align="center" fixed="right">
                <HeaderCell>Действия</HeaderCell>
                <Cell>
                  {(rowData: Category) => (
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <Whisper
                        placement="top"
                        trigger="hover"
                        speaker={<Tooltip>Редактировать</Tooltip>}
                      >
                        <Button
                          appearance="subtle"
                          onClick={() => handleEdit(rowData)}
                        >
                          <MdEdit color="#0f766e" size={20} />
                        </Button>
                      </Whisper>

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

          {filteredCategories.length === 0 && (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-500">
              По вашему запросу категории не найдены.
            </div>
          )}
        </div>
      )}

      <CategoryModalForm
        open={showModal}
        onClose={() => {
          setEditCategory(null);
          setShowModal(false);
        }}
        categoryData={editCategory}
      />

      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        id={deleteTarget?.id?.toString() || ""}
        deleteFunc="deleteCategory"
        title="Удалить категорию"
        message={`Вы уверены, что хотите удалить категорию "${deleteTarget?.name}"?`}
      />
    </div>
  );
};

export default CategoriesPage;
