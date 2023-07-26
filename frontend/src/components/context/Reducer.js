export default function Reducer(state, action) {
   switch (action.type) {
      case "FETCH_ALL_PRODUCTS":
         return {
            ...state,
            products: action.payload,
         };

      case "DELETE_PRODUCT":
         return {
            ...state,
            products: state.products.filter(
               (product) => product._id !== action.payload
            ),
         };

      case "ADD_PRODUCT":
         return {
            ...state,
            products: [...state.products, action.payload],
         };

      case "UPDATE_PRODUCT":
         return {
            ...state,
            products: state.products.map((product) =>
               product._id === action.payload._id ? action.payload : product
            ),
         };

      //purchase
      case "FETCH_ALL_PURCHASE":
         return {
            ...state,
            purchase: action.payload,
         };

      case "ADD_PURCHASE":
         return {
            ...state,
            purchase: [...state.purchase, action.payload],
         };

      //sales
      case "FETCH_ALL_SALES":
         return {
            ...state,
            sales: action.payload,
         };

      case "ADD_SALES":
         return {
            ...state,
            sales: [...state.sales, action.payload],
         };

      default:
         return state;
   }
}