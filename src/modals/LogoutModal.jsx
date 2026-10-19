import { GoAlertFill } from "react-icons/go";

function LogoutModal({closeLogoutModal, handleConfirmLogout}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div
            className="fixed inset-0"
            onClick={closeLogoutModal}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl transition-all">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-brand-red mb-4">
              <GoAlertFill size={32} />
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              Konfirmasi Keluar
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Apakah kamu yakin ingin keluar dari sesi akun ini?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={closeLogoutModal}
                className="w-1/2 rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="w-1/2 rounded-lg bg-brand-red py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-95 cursor-pointer shadow-md"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
  )
}

export default LogoutModal