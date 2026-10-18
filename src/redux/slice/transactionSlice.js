import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL;
  return url ? url.replace(/\/+$/, "") : "";
};

// Async Thunk untuk mengambil & verifikasi status transaksi
export const fetchTransactionStatus = createAsyncThunk(
  "topUp/fetchTransactionStatus",
  async (invoiceNumber, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      console.log("[Fetch Topup Summary]-User Token: ", token);

      const response = await fetch(
        `${getBaseUrl()}/payment/topup/${invoiceNumber}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return rejectWithValue(
          data?.message || "Gagal memverifikasi status transaksi",
        );
      }

      return data?.data || data;
    } catch (err) {
      return rejectWithValue(
        err.message || "Gagal terhubung ke server backend",
      );
    }
  },
);

const topUpSlice = createSlice({
  name: "topUp",
  initialState: {
    transactionData: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetTopUpState: (state) => {
      state.transactionData = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addAsyncThunk(fetchTransactionStatus, {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.transactionData = action.payload;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.transactionData = null;
      },
    });
  },
});
export const { resetTopUpState } = topUpSlice.actions;
export default topUpSlice.reducer;
