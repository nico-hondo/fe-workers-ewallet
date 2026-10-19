import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL;
  return url.replace(/\/+$/, "");
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${getBaseUrl()}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        return rejectWithValue(
          data?.message || "Registrasi gagal, silakan periksa data Anda",
        );
      }
      return data;
    } catch (err) {
      return rejectWithValue(
        err.message || "Gagal terhubung ke server backend",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${getBaseUrl()}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return rejectWithValue(data?.message || "Email atau password salah");
      }

      const token = data?.data?.token || data?.token;
      const user = data?.data?.user || data?.user || { email };

      return {
        token,
        user,
        message: data?.message || "Login berhasil!",
      };
    } catch (err) {
      return rejectWithValue(
        err.message || "Gagal terhubung ke server backend",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await fetch(`${getBaseUrl()}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return rejectWithValue(data?.message || "Email atau password salah");
      }

      return data;
    } catch (err) {
      return rejectWithValue(
        err.message || "Gagal terhubung ke server backend",
      );
    }
  },
);

export const sendResetLink = createAsyncThunk(
  "auth/sendResetLink",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${getBaseUrl()}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return rejectWithValue(data?.message || "eror");
      }

      return data;
    } catch (err) {
      return rejectWithValue(
        err.message || "Gagal terhubung ke server backend",
      );
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${getBaseUrl()}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, new_password: password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return rejectWithValue(data?.message || "Gagal memperbarui password");
      }

      return data;
    } catch (err) {
      return rejectWithValue(
        err.message || "Gagal terhubung ke server backend",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    successSetPin: (state) => {
      state.user.has_pin = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addAsyncThunk(registerUser, {
        pending: (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        },
        fulfilled: (state) => {
          state.loading = false;
          state.success = true;
          state.error = null;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload || "Terjadi kesalahan";
        },
      })
      .addAsyncThunk(loginUser, {
        pending: (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.success = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.error = null;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload || "Login gagal";
        },
      })
      .addAsyncThunk(logoutUser, {
        pending: (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        },
        fulfilled: (state) => {
          state.loading = false;
          state.success = true;
          state.token = null;
          state.user = null;
          state.error = null;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload || "Logout gagal";
        },
      })
      .addAsyncThunk(sendResetLink, {
        pending: (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        },
        fulfilled: (state) => {
          state.loading = false;
          state.success = true;
          state.error = null;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload || "Reset Password Gagal";
        },
      })
      .addAsyncThunk(resetPassword, {
        pending: (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        },
        fulfilled: (state) => {
          state.loading = false;
          state.success = true;
          state.error = null;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload || "Reset password gagal";
        },
      });
  },
});

export const { resetAuthState, clearAuth, successSetPin } = authSlice.actions;
export default authSlice.reducer;
