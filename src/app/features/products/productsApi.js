import { apiSlice } from "../../apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      transformResponse: (response) => response.data,
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
