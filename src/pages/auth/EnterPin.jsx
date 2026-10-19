import { useEffect, useState } from "react";
import walletIcon from "../../assets/wallet-icon.png";
import enterIcon from "../../assets/enter-pin.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { successSetPin } from "../../redux/slice/authSlice";

function EnterPin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.has_pin) {
      navigate("/dashboard", { replace: true });
      return;
    }

    if (!user) {
      navigate("/auth", { replace: true });
      return;
    }
  }, [navigate, user]);

  const [pin, setPin] = useState("");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pin.length < 6) {
      alert("Harap masukkan 6 digit PIN secara lengkap.");
      return;
    }
    console.log("PIN yang dimasukkan:", pin);

    // logic untuk menyimpan pin ke database
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/pin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pin: pin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message);
      }

      if (data.success) {
        dispatch(successSetPin())
        navigate("/dashboard", { replace: true });
        return;
      }
    } catch (err) {
      return err.message || "Terjadi kesalahan pada server";
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col md:flex-row justify-center items-stretch bg-brand-secondary font-montserrat">
      <section className="w-full md:w-1/2 flex-1 flex flex-col justify-center gap-6 px-8 md:px-16 lg:px-24 py-12 bg-brand-primary md:rounded-tr-3xl md:rounded-br-3xl z-10 shadow-xl">
        <div className="flex gap-2.5 items-center">
          <img
            src={walletIcon}
            alt="e-wallet icon"
            className="object-contain"
            width={30}
          />
          <h1 className="text-blue-600 text-xl font-bold">E-Wallet</h1>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-200">
            Enter Your Pin 👋
          </h2>
          <p className="text-gray-300 text-xs md:text-sm">
            Please save your pin because this so important.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-2">
          <div className="relative flex w-full max-w-md gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`flex h-14 min-w-0 flex-1 items-center justify-center border-b-2 transition-colors ${
                  pin.length === index ? "border-blue-600" : "border-gray-200"
                }`}
              >
                <span className="text-2xl font-bold text-gray-200">
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
              className="absolute inset-0 h-full w-full cursor-text opacity-0"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={pin.length !== 6}
            className="h-11 w-full max-w-md cursor-pointer rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
          >
            Submit
          </button>
        </form>
      </section>
      <section className="hidden md:flex md:w-1/2 bg-brand-secondary justify-center p-8 relative overflow-hidden">
        <img
          src={enterIcon}
          alt="enter-pin-illustration"
          className="max-w-md lg:max-w-lg w-full object-contain z-10"
        />
      </section>
    </main>
  );
}

export default EnterPin;