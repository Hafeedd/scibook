import { useDispatch, useSelector } from "react-redux";
import { Modal } from "./Modal";
import {
  clearProduct,
  updateProduct,
} from "../app/features/products/productsSlice";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../app/features/products/productsApi";

export const CreateProduct = ({ isOpen, setIsOpen }) => {
  const product = useSelector((state) => state.product);
  const [createProduct, productCreateStatus] = useCreateProductMutation();

  const [editProduct, productUpdateStatus] = useUpdateProductMutation();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    var { name, value } = e.target;

    if(name === "productCost")
        value = parseInt(value)

    dispatch(updateProduct({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product._id) {
      editProduct({ id: product._id, ...product }).unwrap();
    } else {
      console.log(product);
      createProduct(product).unwrap();
    }
    dispatch(clearProduct());
    setIsOpen(false);
  };

  const handleModalClose = (e) =>{
    dispatch(clearProduct())
    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleModalClose}>
      <span className="text-2xl font-semibold text-gray-900 pb-2">
        Create Product
      </span>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={product?.name}
          name="name"
          onChange={handleChange}
          placeholder="Product Name"
          className="p-2 border border-gray-900 rounded"
        />
        <input
          type="text"
          value={product?.brand}
          name="brand"
          onChange={handleChange}
          placeholder="Brand"
          className="p-2 border border-gray-900 rounded"
        />
        <input
          type="number"
          value={product?.productCost}
          name="productCost"
          onChange={handleChange}
          placeholder="Purchase Cost"
          className="p-2 border border-gray-900 rounded"
        />
        <textarea
          placeholder="Description"
          value={product?.description}
          name="description"
          onChange={handleChange}
          className="p-2 border border-gray-900 rounded"
          rows="4"
        ></textarea>
        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            value="clear"
            onClick={() => setIsOpen(false)}
            className="bg-blue-500 w-full hover:bg-blue-200 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};
