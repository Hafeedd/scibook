import { useGetProductsQuery } from "../../app/features/products/productsApi";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";

const Products = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsQuery();

  return (
    <div className="w-full flex flex-col gap-[4rem] text-white">
      <span className="text-4xl pt-5">LIST OF PRODUCTS</span>

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
            <tr
              key={product.id}
              className="border-b border-gray-700 text-center"
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.brand}</td>
              <td className="p-2">{product.productCost}</td>
              <td className="p-2">{product.description}</td>
              <td className="p-2">
                <button className="text-red-500 hover:text-red-700">
                  <AiFillDelete size={25} />
                </button>
              </td>
              <td className="p-2">
                <button className="text-blue-500 hover:text-red-700">
                  <MdModeEdit size={25} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default Products;
