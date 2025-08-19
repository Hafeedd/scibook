import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { CreateInventory } from "../../components/CreateInventory";
import {
  useDeleteInventoryMutation,
  useGetInventorysQuery,
} from "../../app/features/inventory/inventoryApi";
import { usePopupThunk } from "../../hooks/usePopupDispatch";
import { updateInventoryItem } from "../../app/features/inventory/inventorySlice";
import { useDispatch } from "react-redux";

export const Inventory = () => {
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  const dispatch = useDispatch();

  const {
    data: inventory = [],
    isLoading,
    isError,
    refetch,
  } = useGetInventorysQuery();

  const [deleteInventory, deleteInventoryStatus] = useDeleteInventoryMutation();

  const [handleDeleteInventory] = usePopupThunk({
    handleDelete: deleteInventory,
    successMessage: "SUCCESSFULLY DELETED THE INVENTORY",
    warningMessage: "Do you want to delete the inventory",
    refresh: refetch,
  });

  const handleEditOpen = (data) => {
    dispatch(updateInventoryItem({ id: data._id, ...data }));
    setCreateModalIsOpen(true);
  };

  return (
    <div className="w-full flex flex-col gap-[4rem] text-white">
      <div className="flex justify-between items-center pt-4">
        <span className="text-4xl">INVENTORY LIST</span>
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
            <th className="w-[30%] text-start">NAME</th>
            <th>UNIT</th>
            <th>PRICE</th>
            <th>STOCK</th>
            <th>DATE</th>
            <th>EXPIRY</th>
            <th className="w-[10%]" colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((data, index) => {
            const { productName, totalStock, productId, ...unitObjext } = data;
            return (
              <>
                <tr className="text-white font-semibold bg-blue-900 border-t border-black">
                  <td className="text-center p-4">{index + 1}</td>
                  <td colSpan={6}>{productName}</td>
                  <td className="text-center" colSpan={2}>
                    TOTAL STOCK : {totalStock}
                  </td>
                </tr>

                {Object.keys(unitObjext).map((unit, index2) => (
                  <tr
                    key={index2}
                    className="bg-green-200 text-gray-900 text-center"
                  >
                    <td colSpan={2}></td>
                    <td className="border-b border-black">{unit}</td>
                    <td className="border-b border-black">
                      {data[unit].price}
                    </td>
                    <td className="border-b border-black">
                      {data[unit].stock}
                    </td>
                    <td className="border-b border-black">
                      {data[unit].dateOfPurchase}
                    </td>
                    <td className="border-b border-black">
                      {data[unit].dateOfExpiry}
                    </td>
                    <td className="p-2 border-b border-black">
                      <button
                        onClick={() => handleDeleteInventory(data[unit]._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <AiFillDelete size={25} />
                      </button>
                    </td>
                    <td className="p-2 border-b border-black">
                      <button
                        onClick={() =>
                          handleEditOpen({
                            productId: productId,
                            unit,
                            ...data[unit],
                          })
                        }
                        className="text-blue-500 hover:text-red-700"
                      >
                        <MdModeEdit size={25} />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            );
          })}
        </tbody>
        <tbody></tbody>
      </table>
      <CreateInventory
        isOpen={createModalIsOpen}
        setIsOpen={setCreateModalIsOpen}
      />
    </div>
  );
};

export default Inventory;
