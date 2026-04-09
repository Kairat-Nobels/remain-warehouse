/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Button, Table, Tooltip, Whisper, Input } from "rsuite";
import { MdDeleteOutline } from "react-icons/md";
import {
  MessageSquare,
  Mail,
  Search,
  Inbox,
  CalendarDays,
} from "lucide-react";
import "rsuite/dist/rsuite.min.css";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Feedback, getFeedback } from "../redux/slices/feedbackSlice";
import DeleteModal from "../components/deleteModal";

const { Column, HeaderCell, Cell } = Table;

const FeedbackPage = () => {
  const dispatch = useAppDispatch();
  const { feedback, isLoading, error } = useAppSelector(
    (state) => state.feedbackReducer
  );

  const [deleteTarget, setDeleteTarget] = useState<Feedback | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getFeedback());
  }, [dispatch]);

  const filteredFeedback = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return feedback;

    return feedback.filter((item) => {
      return (
        String(item.name).toLowerCase().includes(value) ||
        String(item.email).toLowerCase().includes(value) ||
        String(item.message).toLowerCase().includes(value) ||
        String(item.createdAt).toLowerCase().includes(value)
      );
    });
  }, [feedback, search]);

  const handleDelete = (item: Feedback) => {
    setDeleteTarget(item);
  };

  return (
    <div className="text-slate-900">
      <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8 mb-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Входящие обращения
          </p>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-950">
            Сообщения из формы обратной связи
          </h2>

          <p className="mt-5 max-w-3xl text-slate-600 leading-8">
            Раздел отображает обращения, отправленные через контактную форму.
            Здесь можно просматривать входящие сообщения и поддерживать
            актуальность списка обращений.
          </p>

          <div className="mt-8 w-full sm:max-w-md">
            <Input
              value={search}
              onChange={(value) => setSearch(value)}
              placeholder="Поиск по имени, email, сообщению..."
              className="!rounded-2xl"
            />
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-8">
          <h3 className="text-2xl font-bold text-slate-950">
            Краткая сводка
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-cyan-100 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-100">
                <Inbox className="w-5 h-5" />
              </div>
              <div className="mt-4 text-3xl font-bold text-slate-950">
                {feedback.length}
              </div>
              <p className="mt-1 text-sm text-slate-500">всего сообщений</p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                <Search className="w-5 h-5" />
              </div>
              <div className="mt-4 text-3xl font-bold text-slate-950">
                {filteredFeedback.length}
              </div>
              <p className="mt-1 text-sm text-slate-500">в текущем списке</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Mail className="w-4 h-4" />
              Назначение раздела
            </div>
            <div className="mt-2 text-base font-medium text-slate-900 leading-7">
              Обращения позволяют отслеживать сообщения пользователей и
              контролировать входящую коммуникацию в системе.
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays className="w-4 h-4" />
              Данные обращений
            </div>
            <div className="mt-2 text-base font-medium text-slate-900 leading-7">
              Каждое сообщение содержит имя, email, текст обращения и дату
              отправки.
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-[30px] border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          Загрузка сообщений...
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
                Реестр обращений
              </h3>
              <p className="mt-2 text-slate-500">
                Найдено записей: {filteredFeedback.length}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
              <MessageSquare className="w-4 h-4" />
              Просмотр и управление сообщениями
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-slate-200">
            <Table
              data={filteredFeedback}
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

              <Column flexGrow={1.1} minWidth={180}>
                <HeaderCell>Имя</HeaderCell>
                <Cell dataKey="name" />
              </Column>

              <Column flexGrow={1.4} minWidth={220}>
                <HeaderCell>Email</HeaderCell>
                <Cell dataKey="email" />
              </Column>

              <Column flexGrow={2} minWidth={320}>
                <HeaderCell>Сообщение</HeaderCell>
                <Cell dataKey="message" />
              </Column>

              <Column width={160} align="center">
                <HeaderCell>Дата</HeaderCell>
                <Cell dataKey="createdAt" />
              </Column>

              <Column width={130} align="center" fixed="right">
                <HeaderCell>Действия</HeaderCell>
                <Cell>
                  {(rowData: Feedback) => (
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

          {filteredFeedback.length === 0 && (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-500">
              По вашему запросу сообщения не найдены.
            </div>
          )}
        </div>
      )}

      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        id={deleteTarget?.id?.toString() || ""}
        deleteFunc="deleteFeedback"
        title="Удалить сообщение"
        message={`Вы уверены, что хотите удалить сообщение от "${deleteTarget?.name}"?`}
      />
    </div>
  );
};

export default FeedbackPage;
