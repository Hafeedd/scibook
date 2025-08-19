import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../app/features/products/productsApi";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { CreateProduct } from "../../components/CreateProduct";
import { useState } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../app/features/products/productsSlice";
import { usePopupThunk } from "../../hooks/usePopupDispatch";

const Products = () => {
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  const dispatch = useDispatch();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsQuery();

  const [deleteProduct, deleteProductStatus] = useDeleteProductMutation();

  const [handleDeleteProduct] = usePopupThunk({
    handleDelete: deleteProduct,
    successMessage: "SUCCESSFULLY DELETED THE PRODUCT",
    warningMessage: "Do you want to delete the product",
    refresh: refetch,
  });

  const handleEditOpen = (data) => {
    dispatch(updateProduct({ id: data._id, ...data }));
    setCreateModalIsOpen(true);
  };

  return (
    <div className="w-full flex flex-col gap-[4rem] text-white">
      <div className="flex justify-between items-center pt-4">
        <span className="text-4xl">PRODUCTS LIST</span>
        <MdOutlineCreateNewFolder
          className="text-gray-900 cursor-pointer hover:text-gray-100"
          size={40}
          onClick={() => setCreateModalIsOpen(true)}
        />
      </div>

      <table className="w-full border-gray-900 common-table">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th>SL</th>
            <th>NAME</th>
            <th>BRAND</th>
            <th>COST</th>
            <th>DESCRIPTION</th>
            <th className="w-[10%]" colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b border-gray-700 text-center">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.brand}</td>
              <td className="p-2">{product.productCost}</td>
              <td className="p-2">{product.description}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDeleteProduct(product._id, product.name)}
                  className="text-red-500 hover:text-red-700"
                >
                  <AiFillDelete size={25} />
                </button>
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleEditOpen(product)}
                  className="text-blue-500 hover:text-red-700"
                >
                  <MdModeEdit size={25} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tbody></tbody>
      </table>
      <CreateProduct
        isOpen={createModalIsOpen}
        setIsOpen={setCreateModalIsOpen}
      />
    </div>
  );
};

export default Products;
