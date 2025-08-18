import { lazy, useEffect, useState } from "react";
import "./App.css";
import { useGetProductsQuery } from "./app/features/products/productsApi";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./app/components/Layout/Layout";

const Products = lazy(() => import("./pages/Products"));

function App() {
  const {
    data: items = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsQuery();

  console.log(items);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={<Products/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
