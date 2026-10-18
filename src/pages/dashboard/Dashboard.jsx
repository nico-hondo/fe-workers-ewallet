import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router";
import { LuSend } from "react-icons/lu";
import { MdOutlineAddCard } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { FiDownload, FiUpload } from "react-icons/fi"; // Ikon tambahan untuk Income & Expense
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

ChartJS.defaults.font.family = "Montserrat, Inter, sans-serif";
ChartJS.defaults.color = "#4f5665";

const COLOR_INCOME = "#2563eb";
const COLOR_EXPENSE = "#d00000";

const DUMMY_BALANCE = 120000;

const DUMMY_TRANSACTIONS = [
  { id: 1, contact_name: "Robert Fox", transaction_type: "Transfer", original_amount: 50000 },
  { id: 2, contact_name: "Floyd Miles", transaction_type: "Send", original_amount: 50000 },
  { id: 3, contact_name: "Ujang", transaction_type: "Send", original_amount: 50000 },
  { id: 4, contact_name: "Raulemons", transaction_type: "Transfer", original_amount: 50000 },
  { id: 5, contact_name: "Reiva", transaction_type: "Transfer", original_amount: 50000 },
  { id: 6, contact_name: "Thobie", transaction_type: "Send", original_amount: 50000 },
  { id: 7, contact_name: "Buzjany", transaction_type: "Transfer", original_amount: 50000 },
  { id: 8, contact_name: "Adisurya", transaction_type: "Send", original_amount: 50000 },
  { id: 9, contact_name: "Miguelle", transaction_type: "Transfer", original_amount: 50000 },
];

const DUMMY_CHART = {
  seven_days: {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    expense_data: [0, 0, 0, 0, 0, 0, 0],
    income_data: [12000, 2000, 92000, 29000, 42000, 20000, 12000],
  },
  five_weeks: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    expense_data: [40000, 35000, 50000, 30000, 45000],
    income_data: [60000, 50000, 55000, 48000, 70000],
  },
  twelve_months: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    expense_data: [120000, 90000, 150000, 80000, 110000, 95000, 130000, 100000, 140000, 125000, 90000, 160000],
    income_data: [200000, 180000, 220000, 170000, 210000, 190000, 230000, 200000, 240000, 215000, 180000, 250000],
  },
};

const Avatar = ({ name, isBank }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center font-semibold text-xs ${
        isBank ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
      }`}
    >
      {initials}
    </div>
  );
};

const Dashboard = () => {
  const profile = useSelector((state) => state.user?.profile)

  const apiBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
  const displayName = profile?.fullName || "User";
  const userPhoto = profile?.avatar
    ? `${apiBaseUrl}/${profile.avatar.replace(/^\/+/, "")}`
    : "image-profile";

  const balance = DUMMY_BALANCE;
  const transactions = DUMMY_TRANSACTIONS;

  const [filter, setFilter] = useState("Income");
  const [range, setRange] = useState("seven_days");

  const chart = DUMMY_CHART[range];

  const handleDropDownRange = (event) => setRange(event.target.value);
  const handleDropDownFilter = (event) => setFilter(event.target.value);

  const allDatasets = [
    {
      label: "Expense",
      data: chart.expense_data,
      backgroundColor: COLOR_EXPENSE,
      borderRadius: 4,
    },
    {
      label: "Income",
      data: chart.income_data,
      backgroundColor: COLOR_INCOME,
      borderRadius: 4,
    },
  ];

  const filteredDatasets =
    filter === "All"
      ? allDatasets
      : allDatasets.filter((d) => d.label === filter);

  const data = {
    labels: chart.labels,
    datasets: filteredDatasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Disembunyikan sesuai dengan gambar 2
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 25000,
          callback: (value) => (value === 100000 ? "100.000+" : value),
        },
        grid: { color: "#f3f4f6" },
        border: { dash: [4, 4] },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  const income = 2120000;
  const expense = 200000;

  const selectClass =
    "bg-gray-100 text-gray-700 text-xs py-2 px-3 rounded-lg focus:outline-none cursor-pointer";

  return (
    <section className="font-montserrat text-gray-800 max-w-350 mx-auto pb-10 md:pb-0 md:p-6">
      
      {/* Header Khusus Tampilan Mobile */}
      <div className="block md:hidden bg-brand-primary text-white pt-6 pb-16 px-5 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 border-2 border-white/20">
            <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs text-blue-100">Hello,</p>
            <h1 className="text-sm font-medium">{displayName}</h1>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-0 -mt-10 md:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Kolom Kiri - Dashboard Content */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Tampilan Metric Cards - Mobile: Floating Combined Card */}
            {/* Floating Card */}
            <div className="relative z-10 -mt-3 mx-4 block md:hidden bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
              <div className="grid grid-cols-3 gap-2 text-center pb-3 border-b border-gray-100">
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">Balance</p>
                  <p className="font-bold text-xs sm:text-sm text-gray-900 mt-1">
                    Rp.{balance.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">Income</p>
                  <p className="font-bold text-xs sm:text-sm text-gray-900 mt-1">
                    Rp.{income.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">Expense</p>
                  <p className="font-bold text-xs sm:text-sm text-gray-900 mt-1">
                    Rp.{expense.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-3">
                <div />
                <div className="flex items-center justify-center gap-1 text-[10px] text-emerald-500 font-semibold">
                  <span>+11.01%</span>
                  <FaArrowTrendUp size={10} />
                </div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-rose-500 font-semibold">
                  <span>-5.06%</span>
                  <FaArrowTrendDown size={10} />
                </div>
              </div>
            </div>

            {/* Tampilan Metric Cards - Desktop: 3 Separate Cards */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-100 rounded-lg p-5 bg-white shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <IoWalletOutline className="text-lg" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">Balance</span>
                </div>
                <div>
                  <div className="font-semibold text-xl text-gray-900 mb-1">
                    Rp{balance.toLocaleString("id-ID")}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                    <span>+2%</span>
                    <FaArrowTrendUp />
                    <span className="text-gray-400 font-normal">3 Days Ago</span>
                  </div>
                </div>
              </div>

              {/* Card Income */}
              <div className="border border-gray-100 rounded-lg p-5 bg-white shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FiDownload className="text-lg" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">Income</span>
                </div>
                <div>
                  <div className="font-semibold text-xl text-gray-900 mb-1">
                    Rp{income.toLocaleString("id-ID")}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                    <span>+11.01%</span>
                    <FaArrowTrendUp />
                  </div>
                </div>
              </div>

              {/* Card Expense */}
              <div className="border border-gray-100 rounded-lg p-5 bg-white shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FiUpload className="text-lg" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">Expense</span>
                </div>
                <div>
                  <div className="font-semibold text-xl text-gray-900 mb-1">
                    Rp{expense.toLocaleString("id-ID")}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
                    <span>-5.06%</span>
                    <FaArrowTrendDown />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Fast Service Row */}
            <div className="md:border md:border-gray-100 md:rounded-lg p-0 md:p-5 bg-transparent md:bg-white md:shadow-sm flex items-center justify-between">
              <span className="hidden md:inline font-semibold text-sm text-gray-800">Fast Service</span>
              <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                <Link
                  to="/top-up"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-3.5 md:py-3 rounded-xl md:rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm md:shadow-none"
                >
                  <MdOutlineAddCard className="text-base" />
                  <span>Top Up</span>
                </Link>
                <Link
                  to="/transfer"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-3.5 md:py-3 rounded-xl md:rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm md:shadow-none"
                >
                  <LuSend className="text-base" />
                  <span>Transfer</span>
                </Link>
              </div>
            </div>

            {/* 3. Financial/Income Chart Section */}
            <div className="md:border md:border-gray-100 md:rounded-lg p-0 md:p-6 bg-transparent md:bg-white md:shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold md:font-semibold text-base md:text-sm text-gray-900 md:text-gray-800">
                  Income Chart
                </h2>
                <div className="flex gap-2">
                  <select value={filter} onChange={handleDropDownFilter} className={selectClass}>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                    <option value="All">All</option>
                  </select>
                  <select value={range} onChange={handleDropDownRange} className={selectClass}>
                    <option value="seven_days">7 Days</option>
                    <option value="five_weeks">5 Weeks</option>
                    <option value="twelve_months">12 Months</option>
                  </select>
                </div>
              </div>
              <div className="h-64 w-full">
                <Bar data={data} options={options} />
              </div>
            </div>

          </div>

          {/* Kolom Kanan - Transaction History */}
          <div className="lg:col-span-4 mt-2 md:mt-0">
            <div className="md:border md:border-gray-100 md:rounded-lg p-0 md:p-5 bg-transparent md:bg-white md:shadow-sm flex flex-col h-full">
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-bold md:font-semibold text-base md:text-sm text-gray-900 md:text-gray-800">
                  Transaction History
                </h2>
                <Link
                  to="/history"
                  className="text-xs text-blue-600 font-medium hover:underline"
                >
                  See All
                </Link>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto max-h-145 pr-1">
                {transactions.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-1"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={item.contact_name}
                        isBank={item.transaction_type === "Topup"}
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs text-gray-900">
                          {item.contact_name}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {item.transaction_type}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        item.transaction_type === "Send"
                          ? "text-rose-500"
                          : "text-emerald-500"
                      }`}
                    >
                      {item.transaction_type === "Send" ? "-" : "+"}Rp
                      {item.original_amount.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Dashboard;