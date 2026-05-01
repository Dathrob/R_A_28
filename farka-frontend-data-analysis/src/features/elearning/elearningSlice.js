import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../services/api";
// Base API URL
const API_URL = "http://localhost:8000/api";

export const fetchCourses = createAsyncThunk("elearning/fetchCourses", async () => {
  const res = await axios.get(`${API_URL}/courses`);
  return res.data;
});

export const fetchEnrollments = createAsyncThunk("elearning/fetchEnrollments", async () => {
  const res = await axios.get(`${API_URL}/enrollments`);
  return res.data;
});

export const createEnrollment = createAsyncThunk("elearning/createEnrollment", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_URL}/enrollments`, data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to create enrollment");
  }
});
 


export const createCourse = createAsyncThunk("elearning/createCourse", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_URL}/courses`, data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to create course");
  }
});

export const deleteCourse = createAsyncThunk("elearning/deleteCourse", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/courses/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete course");
  }
});

const onlineCoursesSlice = createSlice({
  name: "elearning",
  initialState: {   
    courses: [],
    enrollments: [],
    currentCertificate: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      // Create Course
      .addCase(createCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete Course
      .addCase(deleteCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = state.courses.filter(course => course.id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch Enrollments
      .addCase(fetchEnrollments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.enrollments = action.payload;
      })
      .addCase(fetchEnrollments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      // Create Enrollment
      .addCase(createEnrollment.pending, (state) => {
        state.status = "loading";
        state.currentCertificate = null;
      })
      .addCase(createEnrollment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.enrollments.push(action.payload.enrollment);
        state.currentCertificate = action.payload.certificate;
      })
      .addCase(createEnrollment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default onlineCoursesSlice.reducer;