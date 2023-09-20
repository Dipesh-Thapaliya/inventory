import React from "react";
import { createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducer";
import { useNavigate } from "react-router-dom";

const InventoryContext = createContext();

function InventoryContextProvider({ children }) {
   const [state, dispatch] = useReducer(Reducer, {
      products: [],
      purchase: [],
      sales: [],
      showDropdown: false,
   });

   const navigate = useNavigate();

   //products / add, update, delete, fetch
   const fetchAllProducts = async () => {
      try {
         const response = await fetch(
            `${process.env.REACT_APP_SERVER}/products`
         );
         if (response.status === 200) {
            const data = await response.json();
            dispatch({
               type: "FETCH_ALL_PRODUCTS",
               payload: data,
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   const deleteProduct = async (id) => {
      try {
         const response = await fetch(
            `${process.env.REACT_APP_SERVER}/products/${id}`,
            {
               method: "DELETE",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         if (response.status === 201) {
            const data = await response.json();
            dispatch({
               type: "DELETE_PRODUCT",
               payload: id,
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   const addProduct = async (product) => {
      try {
         const response = await fetch(
            `${process.env.REACT_APP_SERVER}/products`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(product),
            }
         );
         if (response.status === 201) {
            const data = await response.json();
            dispatch({
               type: "ADD_PRODUCT",
               payload: data,
            });
            navigate("/inventory");
         }
      } catch (error) {
         console.log(error);
      }
   };

   const updateProduct = async (product) => {
      try {
         const response = await fetch(
            `${process.env.REACT_APP_SERVER}/products/${product._id}`,
            {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(product),
            }
         );
         if (response.status === 201) {
            const data = await response.json();
            dispatch({
               type: "UPDATE_PRODUCT",
               payload: data,
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   const sellProduct = async (product, quantity) => {
      try {
         let updatedProduct = { quantity: product.quantity - quantity };
         const response = await fetch(
            `${process.env.REACT_APP_SERVER}/products/${product._id}`,
            {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(updatedProduct),
            }
         );
         if (response.status === 201) {
            const data = await response.json();
            dispatch({
               type: "SELL_PRODUCT",
               payload: data,
            });
         }
      } catch (error) {
         console.log(error);
      }
   };
   //purchases
   const fetchAllPurchases = async () => {
      try {
         const response = await fetch(
            `${process.env.REACT_APP_SERVER}/purchased`
         );
         if (response.status === 200) {
            const data = await response.json();
            dispatch({
               type: "FETCH_ALL_PURCHASE",
               payload: data,
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   const addPurchase = async (purchase) => {
      try {
         const response = await fetch(
            `${process.env.REACT_APP_SERVER}/purchased`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(purchase),
            }
         );
         if (response.status === 201) {
            const data = await response.json();
            dispatch({
               type: "ADD_PURCHASE",
               payload: data,
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   //sales
   const fetchAllSales = async () => {
      try {
         const response = await fetch(`${process.env.REACT_APP_SERVER}/sales`);
         if (response.status === 200) {
            const data = await response.json();
            dispatch({
               type: "FETCH_ALL_SALES",
               payload: data,
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   const addSales = async (sales) => {
      try {
         const response = await fetch(`${process.env.REACT_APP_SERVER}/sales`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(sales),
         });
         if (response.status === 201) {
            const data = await response.json();
            dispatch({
               type: "ADD_SALES",
               payload: data,
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   //dropdown
   const changeDropdownState = async () => {
      try {
         dispatch({
            type: "CHANGE_DROPDOWN_STATE",
            payload: !state.showDropdown,
         });
         console.log(!state.showDropdown);
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      fetchAllProducts();

      fetchAllPurchases();
      fetchAllSales();
   }, []);

   return (
      <InventoryContext.Provider
         value={{
            ...state,
            fetchAllProducts,
            deleteProduct,
            addProduct,
            updateProduct,
            fetchAllPurchases,
            addPurchase,
            fetchAllSales,
            addSales,
            sellProduct,
            changeDropdownState,
         }}
      >
         {children}
      </InventoryContext.Provider>
   );
}

export default InventoryContext;
export { InventoryContextProvider };
