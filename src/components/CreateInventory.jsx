import { useDispatch, useSelector } from "react-redux";
import { Modal } from "./Modal";
import {
  clearInventoryItem,
  updateInventoryItem,
} from "../app/features/Inventory/inventorySlice";
import {
  useCreateInventoryMutation,
  useUpdateInventoryMutation,
} from "../app/features/Inventory/inventoryApi";
import { useGetProductsQuery } from "../app/features/products/productsApi";

export const CreateInventory = ({ isOpen, setIsOpen }) => {
  const inventory = useSelector((state) => state.inventory);
  const [createInventory, inventoryCreateStatus] = useCreateInventoryMutation();

  const [editInventory, inventoryUpdateStatus] = useUpdateInventoryMutation();

  const dispatch = useDispatch();

  const { data: products = [] } = useGetProductsQuery();

  const handleChange = (e) => {
    var { name, value } = e.target;
    console.log(name,value);

    if (/cost|price|stock/.test(name)) value = parseInt(value);

    dispatch(updateInventoryItem({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inventory._id) {
      editInventory({ id: inventory._id, ...inventory }).unwrap();
    } else {
      createInventory(inventory).unwrap();
    }
    dispatch(clearInventoryItem());
    setIsOpen(false);
  };

  const handleModalClose = (e) => {
    dispatch(clearInventoryItem());
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleModalClose}>
      <span className="text-2xl font-semibold text-gray-900 pb-2">
        Create Inventory
      </span>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          value={inventory?.productId}
          name="productId"
          onChange={handleChange}
          placeholder="Inventory Name"
          className="p-2 border border-gray-900 rounded"
        >
          <option value={null}>SELECT AN OPTION</option>
          {products.map((product, key) => (
            <option value={product._id || product.id}>{product.name}</option>
          ))}
        </select>

        <input
          type="text"
          value={inventory?.unit}
          name="unit"
          onChange={handleChange}
          placeholder="Unit"
          className="p-2 border border-gray-900 rounded"
        />
        <input
          type="text"
          value={inventory?.price}
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="p-2 border border-gray-900 rounded"
        />
        <input
          type="text"
          value={inventory?.stock}
          name="stock"
          onChange={handleChange}
          placeholder="Stock"
          className="p-2 border border-gray-900 rounded"
        />
        <input
          type="text"
          value={inventory?.cost}
          name="cost"
          onChange={handleChange}
          placeholder="Cost"
          className="p-2 border border-gray-900 rounded"
        />
        <input
          type="text"
          value={inventory?.batch}
          name="batch"
          onChange={handleChange}
          placeholder="batch"
          className="p-2 border border-gray-900 rounded"
        />
        <input
          type="text"
          value={inventory?.dateOfPurchase}
          name="dateOfPurchase"
          onChange={handleChange}
          placeholder="date of purchase"
          className="p-2 border border-gray-900 rounded"
        />
        <input
          type="text"
          value={inventory?.dateOfExpiry}
          name="dateOfExpiry"
          onChange={handleChange}
          placeholder="date of expiry"
          className="p-2 border border-gray-900 rounded"
        />
        <textarea
          placeholder="Description"
          value={inventory?.description}
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
