import { useContext } from "react";
import { Link } from "react-router-dom";

import InventoryContext from "../context/InventoryContext";
import SaleProduct from "../modal/SaleProduct";

import { FaEdit, FaTrash } from "react-icons/fa";

export default function Inventory() {
   const { products } = useContext(InventoryContext);
   return (
      <div>
         <div className="flex justify-end mx-5">
            <Link
               to={"/inventory/add"}
               className="bg-[#94a3b8] px-4 py-2 rounded-sm text-white"
            >
               add
            </Link>
         </div>
         <table className="w-full table-fixed">
            <thead className="bg-slate-700 text-white h-16 text-xl">
               <tr>
                  <th className="font-medium">sn</th>
                  <th className="font-medium">name</th>
                  <th className="font-medium">quantity</th>
                  <th className="font-medium">price</th>
                  <th className="font-medium">action</th>
               </tr>
            </thead>
            <tbody className="text-md">
               {products.map((product, index) => {
                  return (
                     <tr
                        key={product._id}
                        className="odd:bg-gray-200 even:bg-gray-300"
                     >
                        <td className="text-center py-3">{index + 1}</td>
                        <td className="text-center py-3">{product.name}</td>
                        <td className="text-center py-3">{product.quantity}</td>
                        <td className="text-center py-3">{product.price}</td>
                        <td className="text-center py-3">
                           <div className="flex justify-center gap-2">
                              <Link to={`/inventory/edit/${product._id}`}>
                                 <FaEdit className="text-blue-500 transition-all duration-150 hover:scale-125" />
                              </Link>
                              <SaleProduct quntity={product.quantity} />
                              <FaTrash className="text-red-500 hover:cursor-pointer transition-all duration-150 hover:scale-125" />
                           </div>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
}
