import { useState, useRef } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ModalTopUpEnterpin({ setShowModal = () => {}, amount, tax, method }) {
  const { token } = useSelector((state) => state.auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const [pinValues, setPinValues] = useState(["", "", "", "", "", ""]);

  const handleNext = async (e) => {
    e.preventDefault();
    const pin = pinValues.join("");

    if (pin.length < 6) {
      setError("Masukkan 6 digit PIN Anda.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/payment/topup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: Number(amount),
            tax: tax,
            payment_method_id: method,
            pin: pin,
            note: "Topup via Web App",
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "PIN salah atau transaksi gagal");
      }

      // Berhasil -> Buka DOKU Checkout Payment URL di tab baru (Solusi 2)
      if (data?.data?.payment_url) {
        toast.info("Membuka halaman pembayaran di tab baru...");
        setShowModal(false);

        // Buka instruksi / simulator pembayaran di tab baru
        window.open(data.data.payment_url, "_blank");
      } else {
        toast.error("URL Pembayaran tidak ditemukan");
      }
    } catch (err) {
      setError(err.message || "Terjadi kesalahan pada server");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newPin = [...pinValues];
    newPin[index] = value;
    setPinValues(newPin);
    setError("");

    if (value && index < pinValues.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace") {
      if (!pinValues[i] && i > 0) {
        const newPin = [...pinValues];
        newPin[i - 1] = "";
        setPinValues(newPin);
        inputRefs.current[i - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!digits) return;

    const newPin = ["", "", "", "", "", ""];
    digits.split("").forEach((d, i) => (newPin[i] = d));
    setPinValues(newPin);

    setError("");
    const nextIndex = Math.min(digits.length, 5);
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus();
    }
  };

  return (
    <div className="flex justify-center fixed inset-0 bg-black/50 p-5 items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-100 relative">
        <h2 className="text-lg font-semibold mb-4">Top Up Amount</h2>

        <form onSubmit={handleNext} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[29px]">Enter Your Pin 👋</h1>
            <p className="text-gray-500 text-sm">
              Enter Your Pin For Transaction
            </p>
          </div>

          <div className="flex justify-center gap-3 mt-15 mb-15">
            {pinValues.map((value, i) => (
              <input
                key={i}
                type="password"
                maxLength={1}
                inputMode="numeric"
                autoComplete="off"
                ref={(el) => (inputRefs.current[i] = el)}
                value={value}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
                className={`w-10 sm:w-12 h-12 text-center text-2xl outline-none border-b-2 transition-colors duration-200 focus:border-blue-600 ${
                  value ? "border-blue-600" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex gap-3">
            <button
              type="button"
              disabled={loading}
              className="flex-1 p-2 bg-gray-400 text-white rounded-lg cursor-pointer disabled:opacity-50"
              onClick={() => setShowModal(false)}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading || pinValues.join("").length < 6}
              className="flex-1 p-2 bg-blue-600 text-white rounded-lg cursor-pointer disabled:opacity-50"
            >
              {loading ? "Processing..." : "Next"}
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 text-[17px]">
            Forgot Your Pin ?{" "}
            <Link to={"/profile/change-pin"}>
              <span className="cursor-pointer text-blue-700 font-medium">
                Reset
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ModalTopUpEnterpin;
