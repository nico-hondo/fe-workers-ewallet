import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { CiSearch } from "react-icons/ci";
import { RiDeleteBin6Line, RiHistoryFill, RiWallet3Line } from "react-icons/ri";
import { toast } from "react-toastify";
import ModalHistory from "./ModalHistory";
import { deleteHistory, fetchHistory } from "../../redux/slice/historySlice";

const PAGE_SIZE = 7;

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

// const getAvatarUrl = (avatar) => {
//   if (!avatar) return "";
//   if (/^(https?:|data:)/i.test(avatar)) return avatar;
//   const clean = avatar.replace(/^\/+/, "").replace(/^public\//, "");
//   const baseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
//   return `${baseUrl}/images/${clean.replace(/^image\//, "")}`;
// };

const getTypeLabel = (type) => {
  switch (type) {
    case "transfer_out":
      return "Transfer keluar";
    case "transfer_in":
      return "Transfer masuk";
    case "topup":
      return "Top up";
    default:
      return type || "Transaksi";
  }
};

const isTopup = (type) => String(type).trim().toLowerCase() === "topup";

const formatAmount = (amount) =>
  `Rp${Math.abs(Number(amount) || 0).toLocaleString("id-ID")}`;

function History() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { transactions, meta, loading, deleting, error } = useSelector(
    (state) => state.history,
  );

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const search = searchParams.get("search") || "";
  const totalPages = Math.max(0, Number(meta.total_page) || 0);
  const currentPage = Number(meta.current_page) || page;
  const totalData = Number(meta.total_data) || 0;
  const pageNumbers = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => {
      const firstPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
      return firstPage + index;
    },
  );

  useEffect(() => {
    dispatch(fetchHistory({ page, limit: PAGE_SIZE, search }));
  }, [dispatch, page, search]);

  const updatePage = (nextPage) => {
    const params = new URLSearchParams(searchParams);
    if (nextPage <= 1) params.delete("page");
    else params.set("page", String(nextPage));
    setSearchParams(params);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    const nextSearch = searchInput.trim();
    if (nextSearch) params.set("search", nextSearch);
    else params.delete("search");
    params.delete("page");
    setSearchParams(params);
  };

  const handleConfirmDelete = async () => {
    const idToDelete = deleteTarget?.id || deleteTarget?.ID;
    if (!idToDelete) {
      toast.error("ID transaksi tidak ditemukan");
      return;
    }

    try {
      await dispatch(deleteHistory(idToDelete)).unwrap();
      toast.success("Riwayat transaksi berhasil dihapus");
      setDeleteTarget(null);
      setSelectedTransaction(null);
      if (transactions.length === 1 && currentPage > 1) {
        updatePage(currentPage - 1);
      } else {
        dispatch(fetchHistory({ page, limit: PAGE_SIZE, search }));
      }
    } catch (deleteError) {
      toast.error(deleteError || "Gagal menghapus riwayat transaksi");
    }
  };

  return (
    <main className="md:flex md:flex-col md:gap-6 md:px-10 md:py-7">
      <div className="hidden items-center gap-3 md:flex">
        <RiHistoryFill className="text-xl text-blue-600" />
        <h1 className="font-montserrat text-lg font-bold">
          History Transaction
        </h1>
      </div>

      <header className="shrink-0 bg-brand-primary p-3 text-white lg:hidden">
        History
      </header>

      <div className="p-6 md:border md:border-gray-200 md:p-0">
        <section className="items-center md:mx-8 md:flex md:justify-between">
          <h2 className="font-montserrat text-lg font-medium md:text-base md:font-semibold">
            Find Transaction
          </h2>
          <form
            className="flex pt-2 md:w-80 lg:w-96"
            onSubmit={handleSearch}
            role="search"
          >
            <div className="relative flex w-full items-center overflow-hidden rounded-lg border border-[#E8E8E8]">
              <input
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Enter number or full name"
                aria-label="Cari nama atau nomor telepon"
                className="min-w-0 flex-1 border-none bg-transparent px-5 py-2 outline-none placeholder:text-sm placeholder:text-gray-400"
              />
              <button type="submit" aria-label="Cari transaksi" className="p-3">
                <CiSearch className="h-5 w-5" />
              </button>
            </div>
          </form>
        </section>

        <section className="mt-2 md:mx-8" aria-live="polite">
          {loading ? (
            <p className="py-8 text-center text-gray-500">
              Memuat riwayat transaksi...
            </p>
          ) : error ? (
            <p className="py-8 text-center text-red-600" role="alert">
              {error}
            </p>
          ) : transactions.length > 0 ? (
            <table className="w-full border-separate border-spacing-y-3 md:border-spacing-y-4">
              <tbody>
                {transactions.map((transaction, index) => {
                  const amount = Number(transaction.amount) || 0;
                  const name = transaction.name || "Unknown";
                  // const avatarUrl = getAvatarUrl(transaction.avatar);
                  const rowColor = index % 2 === 0 ? "bg-gray-100" : "bg-white";

                  return (
                    <tr
                      key={transaction.id || index}
                      className="cursor-pointer md:cursor-default"
                      onClick={() => {
                        if (window.innerWidth < 768) {
                          setSelectedTransaction(transaction);
                        }
                      }}
                    >
                      <td
                        className={`hidden w-24 rounded-l p-4 md:table-cell ${rowColor}`}
                      >
                        {isTopup(transaction.type) ? (
                          <div
                            className="flex h-15 w-15 items-center justify-center rounded-xl bg-gray-200 text-gray-700"
                            role="img"
                            aria-label="Top up"
                          >
                            <RiWallet3Line
                              className="h-8 w-8"
                              aria-hidden="true"
                            />
                          </div>
                        ) : transaction.avatar ? (
                          <img
                            src={`${import.meta.env.VITE_API_URL}/${transaction.avatar}`}
                            alt=""
                            className="h-15 w-15 rounded-xl object-cover"
                            onError={(event) => {
                              event.currentTarget.hidden = true;
                            }}
                          />
                        ) : (
                          <div className="flex h-15 w-15 items-center justify-center rounded-xl bg-gray-200 font-semibold text-gray-700">
                            {getInitials(name)}
                          </div>
                        )}
                      </td>
                      <td
                        className={`align-middle rounded-l p-4 md:w-1/3 md:rounded-none ${rowColor}`}
                      >
                        <p className="font-montserrat text-sm font-medium text-gray-700 lg:text-base">
                          {name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 md:hidden">
                          {getTypeLabel(transaction.type)}
                          {transaction.phone ? ` · ${transaction.phone}` : ""}
                        </p>
                      </td>
                      <td
                        className={`hidden p-4 text-sm text-gray-600 md:table-cell md:w-1/3 md:text-base ${rowColor}`}
                      >
                        {transaction.phone || getTypeLabel(transaction.type)}
                      </td>
                      <td className={`p-4 text-right md:text-left ${rowColor}`}>
                        <span
                          className={
                            amount < 0
                              ? "text-sm text-red-500 md:text-base"
                              : "text-sm text-green-600 md:text-base"
                          }
                        >
                          {amount < 0 ? "-" : "+"}
                          {formatAmount(amount)}
                        </span>
                      </td>
                      <td
                        className={`hidden w-16 rounded-r p-4 text-right md:table-cell ${rowColor}`}
                      >
                        <button
                          type="button"
                          aria-label={`Hapus riwayat transaksi ${name}`}
                          className="cursor-pointer text-brand-red hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={deleting}
                          onClick={(event) => {
                            event.stopPropagation();
                            setDeleteTarget(transaction);
                          }}
                        >
                          <RiDeleteBin6Line aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="mt-3 py-8 text-center font-semibold">
              Belum ada riwayat transaksi.
            </p>
          )}
        </section>

        {!loading && !error && totalPages > 0 && (
          <nav
            className="my-10 flex flex-col items-center gap-4 md:mx-10 lg:flex-row lg:justify-between"
            aria-label="Halaman riwayat transaksi"
          >
            <p className="text-xs md:text-sm">
              Halaman {currentPage} dari {totalPages} ({totalData} transaksi)
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <button
                type="button"
                onClick={() => updatePage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="cursor-pointer px-2 py-1 text-gray-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  type="button"
                  aria-current={number === currentPage ? "page" : undefined}
                  onClick={() => updatePage(number)}
                  className={`cursor-pointer px-2 py-1 ${number === currentPage ? "font-semibold text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                >
                  {number}
                </button>
              ))}
              <button
                type="button"
                onClick={() => updatePage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="cursor-pointer px-2 py-1 text-gray-900 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </nav>
        )}
      </div>

      {selectedTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 md:hidden"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white py-6"
            onClick={(event) => event.stopPropagation()}
          >
            <ModalHistory
              customer={selectedTransaction}
              onClose={() => setSelectedTransaction(null)}
              onDelete={() => setDeleteTarget(selectedTransaction)}
            />
          </div>
        </div>
      )}

      {deleteTarget && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-5"
          onClick={() => !deleting && setDeleteTarget(null)}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-history-title"
            className="w-full max-w-sm rounded-xl bg-white p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="delete-history-title"
              className="mb-5 text-base font-semibold"
            >
              Hapus transaksi ini dari riwayat Anda?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="cursor-pointer rounded bg-gray-200 px-5 py-2 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
              >
                Batal
              </button>
              <button
                type="button"
                className="cursor-pointer rounded bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                disabled={deleting}
                onClick={handleConfirmDelete}
              >
                {deleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default History;
