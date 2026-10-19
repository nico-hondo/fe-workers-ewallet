import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoKeypad,
  IoMailOutline,
} from "react-icons/io5";
import walletIcon from "../../assets/wallet-icon.png";
import loginIcon from "../../assets/login-icon.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetAuthState } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    dispatch(resetAuthState());
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  const onSubmit = async (data) => {
    const { email, password } = data;

    const action = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(action)) {
      console.log(action.payload);
      toast.dismiss();
      toast.success(action.payload?.message || "Login Berhasil!", {
        position: "top-center",
        autoClose: 1000,
      });
      setTimeout(() => {
        if (action.payload.user.has_pin) {
          navigate("/dashboard");
          return
        }
        navigate("/auth/set-pin")
      }, 1500);
    } else if (loginUser.rejected.match(action)) {
      toast.dismiss();
      toast.error(
        action.payload || "Login gagal, periksa email dan password Anda.",
        {
          position: "top-center",
          autoClose: 1000,
        },
      );
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col md:flex-row justify-center items-stretch bg-brand-secondary">
      <section className="w-full md:w-1/2 flex-1 flex flex-col justify-center gap-4 px-6 md:px-12 lg:px-16 py-8 overflow-y-auto md:rounded-tr-3xl md:rounded-br-3xl bg-brand-primary">
        <div className="grid gap-3">
          <div className="flex gap-2 items-center">
            <img src={walletIcon} alt="e-wallet icon workers" width={30} />
            <h1 className="text-blue-600 text-[20px] font-medium">E-Wallet</h1>
          </div>
          <h2 className="text-[18px] md:text-2xl font-medium text-gray-300">
            Hello Welcome Back 👋
          </h2>
          <p className="text-gray-400 font-montserrat text-xs md:text-sm">
            Fill out the form correctly or you can login with several option.
          </p>
          <div className="w-full flex md:grid gap-3 mt-1">
            <div className="w-full h-12 flex-1 flex gap-3 items-center justify-center border rounded-full text-xl cursor-pointer bg-gray-50 hover:bg-gray-200">
              <FcGoogle />
              <span className="hidden md:flex font-montserrat text-sm font-medium">
                Google
              </span>
            </div>
            <div className="w-full h-12 flex-1 flex gap-3 items-center justify-center border border-gray-300 rounded-full text-xl cursor-pointer bg-gray-50 hover:bg-gray-200">
              <FaFacebook className="text-blue-700" />
              <span className="hidden md:flex font-montserrat text-sm font-medium">
                Facebook
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <hr className="w-full border-gray-700" />
            <span className="text-gray-600">Or</span>
            <hr className="w-full border-gray-700" />
          </div>
        </div>

        {error && (
          <div className="p-3 text-xs text-red-300 bg-red-950/40 border border-red-500 rounded-lg">
            {error}
          </div>
        )}

        <form
          className="grid gap-3"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid gap-2">
            <label htmlFor="email" className="font-medium text-gray-200">
              Email
            </label>
            <div className="relative">
              <IoMailOutline className="absolute top-4 left-3 text-md text-gray-800" />
              <input
                id="email"
                name="email"
                type="email"
                className="w-full h-12 border rounded-lg bg-gray-50 pl-10 pr-4 placeholder:text-sm placeholder:text-gray-400 focus:outline-blue-500 text-gray-800"
                placeholder="Enter Your Email"
                {...register("email", {
                  required: "Email wajib diisi",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Format email tidak valid",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-[11px]">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="font-medium text-gray-200">
                Password
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                Forgot Password ?
              </Link>
            </div>
            <div className="relative">
              <IoKeypad className="absolute top-4 left-3 text-md text-gray-800" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full h-12 border rounded-lg bg-gray-50 pl-10 pr-10 placeholder:text-sm placeholder:text-gray-400 focus:outline-blue-500 text-gray-800"
                placeholder="Enter Your Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters required",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-lg top-4 text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none"
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-[11px]">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="grid text-center gap-2 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Sedang Masuk..." : "Login"}
            </button>
            <p className="text-gray-300 font-montserrat text-sm">
              Not Have an Account?{" "}
              <Link
                to="/auth/register"
                className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </section>

      <section className="hidden md:flex md:w-1/2 bg-brand-secondary items-center justify-center p-8 relative">
        <img
          src={loginIcon}
          alt="login-icon"
          className="max-w-lg w-full object-contain"
        />
        <div className="w-50 h-50 absolute top-30 right-0 rounded-full bg-white opacity-2"></div>
        <div className="w-80 h-80 absolute bottom-20 left-0 rounded-full bg-white opacity-2"></div>
      </section>
    </main>
  );
}

export default Login;
