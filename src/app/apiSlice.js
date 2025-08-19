import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../config";
import { ErrorToast } from "../components/CustomToast";

// A common function to handle API errors
const handleApiError = (error) => {
  if (error?.status === 401) {
    console.error("Unauthorized: Please login again");
    // Example: logout user
  } else if (error?.status === 400) {
    console.error(
      "Bad request:",
      error?.data?.message || "Something went wrong"
    );
    const errorMessage = error?.data?.message?.message?.[0] || "Request failed";
    ErrorToast.fire({ title: errorMessage, icon: "error" });
  } else {
    console.error("Unexpected error:", error);
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithErrorHandler = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    handleApiError(result.error);
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandler,
  tagTypes: ["product", "inventory", "Invoices"], // Add your entities
  endpoints: () => ({}),
});
