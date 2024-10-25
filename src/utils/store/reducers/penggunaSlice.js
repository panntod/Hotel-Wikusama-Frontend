import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../../constants";

export const getAllPengguna = createAsyncThunk(
  "pengguna/getAllPengguna",
  async () => {
    const URL = `${BASE_API}/user/getAllData`;
    try {
      const data = await axios.get(URL);
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
          message: res.message,
          data: res.data,
        });
      }
    } catch (err) {
      return Promise.resolve({
        status: "error",
        message: err.response.data.message,
      });
    }
  },
);

export const searchPengguna = createAsyncThunk(
  "pengguna/searchPengguna",
  async (value) => {
    const URL = `${BASE_API}/user/search/${value}`;
    try {
      const data = await axios.get(URL);
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
          message: res.message,
          data: res.data,
        });
      }
    } catch (err) {
      return Promise.resolve({
        status: "error",
        message: err.response.data.message,
      });
    }
  },
);

export const addPengguna = createAsyncThunk(
  "pengguna/addPengguna",
  async (values) => {
    const URL = `${BASE_API}/user/register`;
    try {
      const data = await axios.post(URL, values);
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
          message: res.message,
          data: res.data,
        });
      }
    } catch (err) {
      return Promise.resolve({
        status: "error",
        message: err.response.data.message,
      });
    }
  },
);

export const updatePengguna = createAsyncThunk(
  "pengguna/updatePengguna",
  async ({ values, id }) => {
    const URL = `${BASE_API}/user/edit/${id}`;
    try {
      const data = await axios.patch(URL, values);
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
          message: res.message,
          data: res.data,
        });
      }
    } catch (err) {
      return Promise.resolve({
        status: "error",
        message: err.response.data.message,
      });
    }
  },
);

export const deletePengguna = createAsyncThunk(
  "pengguna/deletePengguna",
  async (id) => {
    const URL = `${BASE_API}/user/delete/${id}`;
    try {
      const data = await axios.delete(URL);
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
          message: res.message,
          data: id,
        });
      }
    } catch (err) {
      alert(err.response.data.message);
      return Promise.resolve({
        status: "error",
        message: err.response.data.message,
      });
    }
  },
);

const penggunaAdapter = createEntityAdapter({
  selectId: (pengguna) => pengguna.id_user,
});

const penggunaSlice = createSlice({
  name: "pengguna",
  initialState: penggunaAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getAllPengguna.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        penggunaAdapter.setAll(state, action.payload.data);
      }
    });
    builder.addCase(searchPengguna.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        penggunaAdapter.setAll(state, action.payload.data);
      }
    });
    builder.addCase(addPengguna.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        penggunaAdapter.addOne(state, action.payload.data);
      }
    });
    builder.addCase(updatePengguna.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        penggunaAdapter.updateOne(state, {
          id: action.payload.data.id_user,
          changes: action.payload.data,
        });
      }
    });
    builder.addCase(deletePengguna.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        penggunaAdapter.removeOne(state, action.payload.data);
      }
    });
  },
});

export const penggunaSelectors = penggunaAdapter.getSelectors(
  (state) => state.pengguna,
);

export default penggunaSlice.reducer;
