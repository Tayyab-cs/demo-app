import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_COLORS_URI } from "../../api/endPoints.js";
import enUS from "antd/locale/en_US";

const OLD_COLORS = [
  {
    _id: "123456789d0",
    name: "default",
    hex: "#ffffff",
    isDelete: false,
  },
  {
    _id: "987654321r0",
    name: "random",
    hex: () => "#" + Math.floor(Math.random() * 16777215).toString(16),
    isDelete: false,
  },
];

export const fetchColors = createAsyncThunk("colors/fetchColors", async () => {
  const response = await axios.get(FETCH_COLORS_URI);
  return response.data.result.data;
});

export const colorSlice = createSlice({
  name: "color",
  initialState: {
    activeColor: {
      _id: "noId",
      name: "no color selected",
      hex: "#ffffff",
      isDelete: false,
    },
    colorsList: [],
    count: 0,
    darkMode: false,
    locale: enUS,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveColor: (state, action) => {
      state.activeColor = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.loading = false;
        state.colorsList = [...OLD_COLORS, ...action.payload];
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setActiveColor,
  setColorsList,
  setCount,
  setDarkMode,
  setLocale,
} = colorSlice.actions;
export default colorSlice.reducer;
