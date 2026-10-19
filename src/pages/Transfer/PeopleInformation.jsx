import { useState } from "react";
import { FiSend, FiStar, FiX } from "react-icons/fi";
import { VscVerified } from "react-icons/vsc";
import { CiMoneyCheck1 } from "react-icons/ci";
import { useSelector } from "react-redux";

// const navigation = [
//   { name: "Dashboard", icon: FiGrid },
//   { name: "Transfer", icon: FiSend },
//   { name: "History", icon: FiClock },
//   { name: "Top Up", icon: FiPlusCircle },
//   { name: "Profile", icon: FiUser },
// ];

function PeopleInformation({
  contact,
  amount,
  setAmount,
  notes,
  setNotes,
  onTransferSuccess,
  onFinishSuccess,
  onSendAgain,
  onBackDashboard,
}) {
  const [favorites, setFavorites] = useState([]);
  const [modalPin, setModalPin] = useState(false);
  const [pin, setPin] = useState("");
  const [resultModal, setResultModal] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { token } = useSelector((state) => state.auth);

  const handleConfirmPin = async () => {
    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiver_id: contact.id,
          amount: Number(amount),
          pin,
          note: notes,
        }),
      });
      const json = await res.json();

      if (!json.success) throw new Error(json.message);
      onTransferSuccess(json.data);
      setResultModal("success");
    } catch (err) {
      setErrorMsg(err.message);
      setResultModal("failed");
    } finally {
      setPin("");
      setModalPin(false);
      setSubmitting(false);
    }
  };

  const toggleFavorites = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="relative mx-auto flex h-dvh w-full flex-col bg-white lg:h-auto lg:min-h-screen">
      <header className="bg-brand-primary p-3 text-white h-14 flex items-center lg:hidden">
        Transfer
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto bg-white p-6 lg:overflow-visible lg:px-10 lg:py-7">
        {/*STEPPER DESKTOP */}
        <div className="mb-6 hidden lg:block">
          <div className="flex items-center gap-3">
            <FiSend size={20} className="text-blue-600" />
            <h2 className="text-lg font-bold font-montserrat text-brand-secondary">
              Transfer Money
            </h2>
          </div>

          <div className="mt-5 flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-500 text-white">
                1
              </span>
              <span className="text-gray-500">Find People</span>
            </div>

            <div className="w-16 border-t border-dashed border-gray-300" />

            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary text-white">
                2
              </span>
              <span className="text-brand-primary">Set Nominal</span>
            </div>

            <div className="w-16 border-t border-dashed border-gray-300" />

            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-500 text-white">
                3
              </span>
              <span className="text-gray-500">Finish</span>
            </div>
          </div>
        </div>

        {/*CARD DESKTOP */}
        <div className="lg:rounded-md lg:border lg:border-gray-200 lg:p-5">
          <h3 className="mb-3 font-bold text-brand-secondary lg:text-sm">
            People Information
          </h3>

          {contact && (
            <div
              key={contact.id}
              className="flex items-center justify-between rounded-md px-3 py-3 bg-brand-primary/5 lg:px-4"
            >
              <button
                type="button"
                className="flex flex-1 items-center gap-5 text-left"
              >
                <div className="flex h-17 w-17 shrink-0 items-center justify-center rounded-md bg-blue-100 text-sm font-semibold text-brand-primary">
                  {contact.avatar ? (
                    <img
                      src={contact.avatar}
                      alt=""
                      className="h-full w-full rounded-md object-cover"
                    />
                  ) : (
                    (contact.fullname ?? "?").charAt(0).toUpperCase()
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-brand-secondary">
                    {contact.fullname ?? "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {contact.phone ?? "-"}
                  </p>
                  <div className="bg-brand-primary rounded-lg text-brand-gray h-4 flex items-center p-1.5 gap-2 w-fit lg:p-4">
                    <VscVerified size={14} />
                    <span className="text-[10px] lg:text-[14px] text-brand-gray">
                      Verified
                    </span>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleFavorites(contact.id)}
                className="cursor-pointer"
              >
                <FiStar
                  size={25}
                  className={
                    favorites.includes(contact.id)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  }
                />
              </button>
            </div>
          )}

          <div className="flex flex-col gap-3 mt-5">
            <p className="font-bold text-brand-secondary lg:text-sm">Amount</p>
            <p className="text-sm leading-relaxed text-gray-500 lg:text-xs">
              Type the amount you want to transfer and then press continue to
              the next steps.
            </p>
            <div className="flex h-11 items-center rounded-xl border border-gray-300 lg:rounded-md">
              <CiMoneyCheck1
                size={30}
                className="ml-3 shrink-0 text-gray-500"
              />
              <span className="text-sm text-brand-secondary pl-2">Rp</span>

              <input
                type="text"
                inputMode="numeric"
                value={amount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .replace(/^0+(?=\d)/, "");

                  setAmount(value);
                }}
                placeholder="Enter Nominal Transfer"
                className="h-11 w-full p-3 outline-none placeholder:text-gray-400 lg:text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-3">
            <p className="font-bold text-brand-secondary lg:text-sm">Notes</p>
            <p className="text-sm leading-relaxed text-gray-500 lg:text-xs">
              You can add some notes for this transfer such as payment coffee or
              something.
            </p>
            <div>
              <textarea
                placeholder="Enter Some Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="h-42.5 w-full resize-none rounded-xl border border-gray-300 p-3 outline-none placeholder:text-gray-400 lg:h-35 lg:text-sm lg:rounded-md"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!amount || Number(amount) <= 0) {
                alert("Masukkan nominal transfer terlebih dahulu");
                return;
              }
              setModalPin(true);
            }}
            className="mt-4 h-11 w-full cursor-pointer rounded-xl bg-brand-primary text-white hover:opacity-90 lg:rounded-md"
          >
            Submit & Transfer
          </button>
        </div>
      </main>

      {/* <nav className="mt-auto grid shrink-0 grid-cols-5 border-t border-gray-100 bg-white px-2 py-3 lg:hidden">
        {navigation.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className={`flex flex-col items-center justify-center gap-1 ${
              name === "Transfer" ? "text-brand-primary" : "text-gray-400"
            }`}
          >
            <Icon size={19} />
            <span className="text-[10px]">{name}</span>
          </div>
        ))}
      </nav> */}

      {/* Pin Modal */}
      {modalPin && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="flex w-full max-w-87.5 min-h-125 max-h-[calc(100dvh-32px)] flex-col overflow-y-auto rounded-xl bg-brand-gray p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-brand-secondary">
                TRANSFER TO {(contact?.fullname ?? "").toUpperCase()}
              </p>
              <button
                type="button"
                onClick={() => {
                  setModalPin(false);
                  setPin("");
                }}
                className="cursor-pointer text-gray-500 hover:text-red-500"
              >
                <FiX size={24} />
              </button>
            </div>

            <hr className="my-3 border-gray-200" />

            <h3 className="mt-3 text-lg font-medium">Enter Your Pin 👋</h3>

            <p className="mt-3 text-sm font-light">
              Enter Your Pin For Transaction
            </p>

            <div className="relative mt-12 flex w-full gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={`flex h-16 min-w-0 flex-1 items-center justify-center border-b-2 ${
                    pin.length === index
                      ? "border-brand-primary"
                      : "border-gray-200"
                  }`}
                >
                  <span className="text-3xl font-medium text-brand-secondary">
                    {pin[index] ? "•" : ""}
                  </span>
                </div>
              ))}

              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6 digit PIN"
                className="absolute inset-0 h-full w-full cursor-text opacity-0"
              />
            </div>

            <button
              type="button"
              disabled={pin.length !== 6 || submitting}
              onClick={handleConfirmPin}
              className="mt-auto h-11 w-full shrink-0 cursor-pointer rounded-md bg-brand-primary text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Next"}
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              Forgot Your Pin? <span className="text-brand-primary">Reset</span>
            </p>
          </div>
        </div>
      )}

      {/* MODAL SUCCESS & FAILED */}
      {resultModal && (
        <div className="absolute inset-x-0 top-0 bottom-16.25 z-50 flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-4 lg:inset-0">
          <div className="flex w-full max-w-87.5 flex-col rounded-xl bg-white p-4 shadow-lg lg:max-w-92.5">
            <p className="border-b border-gray-200 pb-3 text-xs font-medium text-brand-secondary">
              TRANSFER TO {(contact?.fullname ?? "").toUpperCase()}
            </p>

            <div className="mt-5 flex items-center justify-center">
              <img
                src={
                  resultModal === "success"
                    ? "/modalSucces.svg"
                    : "/modalFailed.svg"
                }
                alt={
                  resultModal === "success"
                    ? "Transfer Success"
                    : "Transfer Failed"
                }
                className="h-47.5 w-full object-contain lg:h-42.5"
              />
            </div>

            <h3 className="mt-5 text-center text-lg font-semibold text-brand-secondary">
              {resultModal === "success" ? (
                <>
                  Yeay Transfer <span className="text-green-500">Success</span>
                </>
              ) : (
                <>
                  Oops Transfer <span className="text-red-500">Failed</span>
                </>
              )}
            </h3>

            <p className="mt-4 text-center text-xs text-gray-500">
              {resultModal === "success"
                ? "Thank you for using this application for your financial"
                : errorMsg ||
                  "Sorry, there is an issue with your transfer. Try again later!"}
            </p>

            {/* PRIMARY BUTTON */}
            <button
              type="button"
              onClick={() => {
                if (resultModal === "success") {
                  setResultModal(null);
                  onFinishSuccess();
                } else {
                  setResultModal(null);
                  setPin("");
                  setModalPin(true);
                }
              }}
              className="mt-5 h-11 w-full cursor-pointer rounded-md bg-brand-primary text-sm text-white hover:opacity-90"
            >
              {resultModal === "success" ? "Done" : "Try Again"}
            </button>

            {/* SECONDARY BUTTON */}
            <button
              type="button"
              disabled={resultModal === "failed" && !onBackDashboard}
              onClick={() => {
                if (resultModal === "success") {
                  setResultModal(null);
                  onSendAgain();
                } else {
                  setResultModal(null);
                  onBackDashboard();
                }
              }}
              className="mt-3 h-11 w-full cursor-pointer rounded-md border border-brand-primary bg-white text-sm text-brand-primary hover:bg-brand-primary/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {resultModal === "success"
                ? "Transfer Again"
                : "Back To Dashboard"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PeopleInformation;
