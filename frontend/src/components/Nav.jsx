import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
export default function Nav() {
   return (
      <nav className="bg-[#9DB2BF] h-20 ">
         <div className="w-3/4 flex justify-between items-center mx-auto">
            <div>
               <Link to={"/"}>
                  <img src={logo} alt="logo" className="h-16 rounded-full " />
               </Link>
            </div>
            <div className="text-xl font-semibold">
               {/* <Link to="/inventory"> Inventory</Link> */}
            </div>
         </div>
      </nav>
   );
}
