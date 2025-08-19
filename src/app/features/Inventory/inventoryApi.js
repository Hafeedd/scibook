import { apiSlice } from "../../apiSlice";

export const inventorysApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventorys: builder.query({
      query: () => "/inventory",
      transformResponse: (response) => response.data,
      providesTags: ["inventory"],
    }),
    createInventory: builder.mutation({
      query: (newInventory) => ({
        url: "/inventory",
        method: "POST",
        body: newInventory,
      }),
      invalidatesTags: ["inventory"],
    }),
    updateInventory: builder.mutation({
      query: ({ id, ...updatedInventory }) => ({
        url: `/inventory/${id}`,
        method: "PUT",
        body: updatedInventory,
      }),
      invalidatesTags: ["inventory"],
    }),
    deleteInventory: builder.mutation({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetInventorysQuery,
  useCreateInventoryMutation,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
} = inventorysApi;
