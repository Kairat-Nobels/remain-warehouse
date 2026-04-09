/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Button, Table, Whisper, Tooltip, Tag, Input } from "rsuite";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getProducts, Product } from "../redux/slices/productsSlice";
import { getCategories } from "../redux/slices/categoriesSlice";
import { getSuppliers } from "../redux/slices/suppliersSlice";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import {
  PackagePlus,
  Search,
  Boxes,
  AlertTriangle,
  CircleCheckBig,
  PackageX,
} from "lucide-react";
import "rsuite/dist/rsuite.min.css";
import ProductModalForm from "../components/ProductModalForm";
import DeleteModal from "../components/deleteModal";

const { Column, HeaderCell, Cell } = Table;

const ProductsPage = () => {
  const dispatch = useAppDispatch();

  const { products, isLoading, error } = useAppSelector(
    (state) => state.productsReducer
  );
  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const { suppliers } = useAppSelector((state) => state.suppliersReducer);

  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getSuppliers());
  }, [dispatch]);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((item) => item.id === categoryId);
    return category?.name || "Без категории";
  };

  const getSupplierName = (supplierId: number) => {
    const supplier = suppliers.find((item) => item.id === supplierId);
    return supplier?.name || "Без поставщика";
  };

  const filteredProducts = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return products;

    return products.filter((item) => {
      const categoryName = getCategoryName(item.categoryId).toLowerCase();
      const supplierName = getSupplierName(item.supplierId).toLowerCase();

      return (
        String(item.name).toLowerCase().includes(value) ||
        String(item.article).toLowerCase().includes(value) ||
        String(item.description).toLowerCase().includes(value) ||
        categoryName.includes(value) ||
        supplierName.includes(value)
      );
    });
  }, [products, search, categories, suppliers]);

  const totalUnits = useMemo(
    () => products.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [products]
  );

  const lowStockCount = useMemo(
    () =>
      products.filter(
        (item) =>
          Number(item.quantity) > 0 &&
          Number(item.quantity) <= Number(item.minStock)
      ).length,
    [products]
  );

  const outOfStockCount = useMemo(
    () => products.filter((item) => Number(item.quantity) === 0).length,
    [products]
  );

  const inStockCount = useMemo(
    () => products.filter((item) => Number(item.quantity) > Number(item.minStock))
      .length,
    [products]
  );

  const handleAdd = () => {
    setEditProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleDelete = (product: Product) => {
    setDeleteTarget(product);
  };

  return (
    <div className="text-slate-900">
      <div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-8 mb-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Управление запасами
          </p>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-950">
            Складские позиции и текущее состояние остатков
          </h2>

          <p className="mt-5 max-w-3xl text-slate-600 leading-8">
            Раздел предназначен для ведения базы складских позиций, контроля
            количества единиц, минимального уровня остатков и связей с
            категориями и поставщиками.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              appearance="primary"
              color="cyan"
              size="lg"
              style={{ width: "270px" }}
              onClick={handleAdd}
              className="!rounded-xl"
              startIcon={<PackagePlus size={18} />}
            >
              Добавить позицию
            </Button>

            <div className="w-full sm:max-w-md">
              <Input
                value={search}
                onChange={(value) => setSearch(value)}
                placeholder="Поиск по названию, артикулу, категории..."
                className="!rounded-2xl"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-8">
          <h3 className="text-2xl font-bold text-slate-950">
            Краткая картина по запасам
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-cyan-100 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-100">
                <Boxes className="w-5 h-5" />
              </div>
              <div className="mt-4 text-3xl font-bold text-slate-950">
                {products.length}
              </div>
              <p className="mt-1 text-sm text-slate-500">всего позиций</p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                <CircleCheckBig className="w-5 h-5" />
              </div>
              <div className="mt-4 text-3xl font-bold text-slate-950">
                {inStockCount}
              </div>
              <p className="mt-1 text-sm text-slate-500">в стабильной зоне</p>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 border border-amber-100">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="mt-4 text-3xl font-bold text-amber-600">
                {lowStockCount}
              </div>
              <p className="mt-1 text-sm text-slate-500">низкий остаток</p>
            </div>

            <div className="rounded-2xl border border-rose-100 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-700 border border-rose-100">
                <PackageX className="w-5 h-5" />
              </div>
              <div className="mt-4 text-3xl font-bold text-rose-600">
                {outOfStockCount}
              </div>
              <p className="mt-1 text-sm text-slate-500">нет в наличии</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-4">
            <div className="text-sm text-slate-500">
              Совокупный объем единиц на складе
            </div>
            <div className="mt-2 text-3xl font-bold text-slate-950">
              {totalUnits}
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-[30px] border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          Загрузка данных по запасам...
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
                Реестр складских позиций
              </h3>
              <p className="mt-2 text-slate-500">
                Найдено записей: {filteredProducts.length}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
              <Search className="w-4 h-4" />
              Поиск и контроль остатков
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-slate-200">
            <Table
              data={filteredProducts}
              autoHeight
              bordered
              cellBordered
              wordWrap="break-word"
              hover
            >
              <Column width={70} align="center" fixed>
                <HeaderCell>ID</HeaderCell>
                <Cell dataKey="id" />
              </Column>

              <Column width={100} align="center">
                <HeaderCell>Фото</HeaderCell>
                <Cell>
                  {(rowData: Product) => (
                    <div className="py-2 flex items-center justify-center">
                      <img
                        src={rowData.image || "https://placehold.co/60x60"}
                        alt={rowData.name}
                        className="w-[56px] h-[56px] object-cover rounded-2xl border border-slate-200 bg-slate-50"
                      />
                    </div>
                  )}
                </Cell>
              </Column>

              <Column flexGrow={1.5} minWidth={220}>
                <HeaderCell>Позиция</HeaderCell>
                <Cell dataKey="name" />
              </Column>

              <Column flexGrow={1} minWidth={140}>
                <HeaderCell>Артикул</HeaderCell>
                <Cell dataKey="article" />
              </Column>

              <Column flexGrow={1.2} minWidth={170}>
                <HeaderCell>Категория</HeaderCell>
                <Cell>
                  {(rowData: Product) => getCategoryName(rowData.categoryId)}
                </Cell>
              </Column>

              <Column flexGrow={1.3} minWidth={180}>
                <HeaderCell>Поставщик</HeaderCell>
                <Cell>
                  {(rowData: Product) => getSupplierName(rowData.supplierId)}
                </Cell>
              </Column>

              <Column width={90} align="center">
                <HeaderCell>Ед.</HeaderCell>
                <Cell dataKey="unit" />
              </Column>

              <Column width={120} align="center">
                <HeaderCell>Цена</HeaderCell>
                <Cell>
                  {(rowData: Product) => `${rowData.price} сом`}
                </Cell>
              </Column>

              <Column width={110} align="center">
                <HeaderCell>Остаток</HeaderCell>
                <Cell dataKey="quantity" />
              </Column>

              <Column width={140} align="center">
                <HeaderCell>Мин. уровень</HeaderCell>
                <Cell dataKey="minStock" />
              </Column>

              <Column width={160} align="center">
                <HeaderCell>Статус</HeaderCell>
                <Cell>
                  {(rowData: Product) => {
                    if (Number(rowData.quantity) === 0) {
                      return <Tag color="red">Отсутствует</Tag>;
                    }

                    if (Number(rowData.quantity) <= Number(rowData.minStock)) {
                      return <Tag color="orange">Под наблюдением</Tag>;
                    }

                    return <Tag color="green">Стабильно</Tag>;
                  }}
                </Cell>
              </Column>

              <Column flexGrow={1.8} minWidth={240}>
                <HeaderCell>Описание</HeaderCell>
                <Cell dataKey="description" />
              </Column>

              <Column width={130} align="center" fixed="right">
                <HeaderCell>Действия</HeaderCell>
                <Cell>
                  {(rowData: Product) => (
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
        </div>
      )}

      <ProductModalForm
        open={showModal}
        onClose={() => {
          setEditProduct(null);
          setShowModal(false);
        }}
        productData={editProduct}
      />

      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        id={deleteTarget?.id?.toString() || ""}
        deleteFunc="deleteProduct"
        title="Удалить позицию"
        message={`Вы уверены, что хотите удалить "${deleteTarget?.name}"?`}
      />
    </div>
  );
};

export default ProductsPage;
