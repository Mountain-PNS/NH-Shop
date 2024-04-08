import Banner from "@/components/Banner";
import useCart from "@/hooks/useCart";
import { useLocalStorage } from "@/hooks/useStorage";
import { CartTypes } from "@/interface/data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { reduce } from "lodash";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, removeCart, caculateTotal, downToCart, upToCart } =
    useCart();

  return (
    <>
      <Banner />
      <div className="w-[1250px] grid grid-cols-[80%,20%] justify-items-center m-5">
        <div className="">
          <div className="w-[100%]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-[#F9F1E7] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    Tên sản phẩm
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Gía
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tổng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item: CartTypes, index: number) => {
                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="w-[80px] h-[80px] bg-[#F9F1E7] rounded-lg">
                          <img src={item.image} alt="" />
                        </div>
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.name}
                      </th>
                      <td className="px-6 py-4">{item.price}</td>
                      <td className="px-6 py-4">
                        <div
                          className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg"
                          data-hs-input-number
                        >
                          <div className="flex items-center gap-x-1.5">
                            <button
                              type="button"
                              className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                              data-hs-input-number-decrement
                              onClick={() => downToCart.mutate(item.productId)}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <input
                              className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0"
                              type="text"
                              value={item.quantity}
                              data-hs-input-number-input
                            />
                            <button
                              type="button"
                              className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                              data-hs-input-number-increment
                              onClick={() => upToCart.mutate(item.productId)}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {item.price * item.quantity}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => removeCart.mutate(item.productId)}
                        >
                          <i
                            className="fa-solid fa-trash"
                            style={{ color: "#b88e2f" }}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-[#F9F1E7]">
          <div className="text-center">
            <h1 className="py-8 px-10 text-3xl font-semibold">Cart Totals</h1>
            <div className="">
              <div className="flex px-12 ">
                <p className="py-4 px-8 text-base font-medium">Subtotal</p>
                <p className="py-4 px-8 text-[#9F9F9F] font-normal text-base">
                  25.000.000đ
                </p>
              </div>
              <div className="flex px-12 ">
                <p className="py-4 px-8 text-base font-medium">Total</p>
                <p className="py-4 px-8 text-xl font-medium text-[#B88E2F]">
                  {caculateTotal()}.000đ
                </p>
              </div>
            </div>
            <div className="flex justify-center py-10">
              <button className="text-black border-solid border-[1px] border-[#B88E2F] hover:bg-[#FAF3EA] focus:ring-4 focus:outline-none focus:ring-blue-300 text-[20px] font-bold rounded-lg text-sm w-full sm:w-auto px-10 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-[#FAF3EA] flex ">
                <Link to={"/order"}>Check Out</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
