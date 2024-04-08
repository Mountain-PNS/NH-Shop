import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/image/Meubel House_Logos-05.png'
import SkinClinic from '../../assets/image/SkinClinic.png'
const Aside = () => {
  return (
    <div className="bg-white flex flex-col items-center h-[681px] w-[250px] m-4 rounded-2xl fixed">
      <div className="">
        <div className="text-5xl m-[50px] flex justify-center">
          <img src={Logo} alt="" />
          <img src={SkinClinic} alt="" />
        </div>
      </div>
      <div className="w-[200px] bg-black h-[1px] my-[20px]" />
      <div className="">
        <ul className="p-0">
          <li className="py-[11px] px-[35px] hover:bg-[#F9F1E7] w-[248px] h-[50px] rounded-xl text-left">
            <i className="fa-brands fa-product-hunt mx-3" />
            <Link
              to="products"
              className="no-underline hover:no-underline font-medium text-base"
            >
              Products
            </Link>
          </li>
          <li className="py-[11px] px-[35px] hover:bg-[#F9F1E7] w-[248px] h-[50px] rounded-xl text-left">
            <i className="fa-solid fa-layer-group mx-3" />
            <Link
              to="categories"
              className="no-underline hover:no-underline font-medium text-base"
            >
              Category
            </Link>
          </li>
          <li className="py-[11px] px-[35px] hover:bg-[#F9F1E7] w-[248px] h-[50px] rounded-xl text-left">
            <i className="fa-solid fa-cart-shopping mx-3" />

            <Link to="order" className="no-underline hover:no-underline font-medium text-base">
              Order
            </Link>
          </li>
          <li className="py-[11px] px-[35px] hover:bg-[#F9F1E7] w-[248px] h-[50px] rounded-xl text-left">
            <i className="fa-solid fa-user mx-3" />
            <a className="no-underline hover:no-underline font-medium text-base">
              Users
            </a>
          </li>
          <li className="py-[11px] px-[35px] hover:bg-[#F9F1E7] w-[248px] h-[50px] rounded-xl text-left">
            <i className="fa-solid fa-gear mx-3" />
            <a className="no-underline hover:no-underline font-medium text-base">
              Setting
            </a>
          </li>
          <li className="py-[11px] px-[35px] hover:bg-[#F9F1E7] w-[248px] h-[50px] rounded-xl text-left">
            <i className="fa-solid fa-share-from-square mx-3" />
            <a className="no-underline hover:no-underline font-medium text-base">
              Back Home
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Aside;
