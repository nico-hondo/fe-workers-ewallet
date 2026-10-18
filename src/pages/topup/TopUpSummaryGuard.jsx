import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionStatus } from "../../redux/slice/transactionSlice"; 
import TopUpSummary from "./TopUpSummary";

function TopUpSummaryGuard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { transactionData, loading, error } = useSelector(
    (state) => state.topUp
  );

  const invoiceNumber =
    searchParams.get("invoice_number") || searchParams.get("tranx_id");

  console.log(invoiceNumber); 
  useEffect(() => {
    if (!invoiceNumber) {
      navigate("/top-up", { replace: true });
      return;
    }

    dispatch(fetchTransactionStatus(invoiceNumber));
  }, [invoiceNumber, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      navigate("/top-up", { replace: true });
    }
  }, [error, navigate]);

  if (loading || (!transactionData && !error)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white font-montserrat text-sm text-gray-500">
        Memverifikasi status transaksi...
      </div>
    );
  }

  if (!transactionData) return null;

  return (
    <TopUpSummary
      amount={transactionData.amount}
      paymentMethod={transactionData.payment_method}
      currentDate={transactionData.created_at}
      transactionId={transactionData.trx_code}
      status={transactionData.status}
    />
  );
}

export default TopUpSummaryGuard;