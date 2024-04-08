import Loading from "@/components/Loading";
import useProductsMutation from "@/hooks/useProductsMutation";
import useProductsQuery from "@/hooks/useProductsQuery";
import { ProductsTypes } from "@/interface/data";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const ListProducts = () => {
  const { data , isLoading} = useProductsQuery();
 const {mutate} =  useProductsMutation({action : "DELETE"})
 const { data: categories } = useQuery({
  queryKey: ["CATEGORIES_KEY"],
  queryFn: async () => {
    const res = await fetch("http://localhost:8000/api/categories");
    return res.json();
  },
});

  if(isLoading) return <Loading/>
  return (
    <>
      <div>
        <div className="">
          <Link to="add">
            <button
              type="button"
              className="text-white bg-[#B22222] hover:bg-[#B22222] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Thêm
            </button>
          </Link>
        </div>
        <table className="w-[1192px] divide-y divide-gray-200 mb-6 mr-6">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Danh mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gía
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hình ảnh
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mô tả
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((item:ProductsTypes, index : number) => {
              return (
                <tr className="" key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{categories?.map((category:any)=>(
                  category._id === item.category ? category.name : ""
                ))  }</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={item.image} width="50px" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`${item._id}`}>
                    <button className="p-2 ">
                    <i className="fa-solid fa-pen-to-square" style={{color: '#2b72ee'}} />

                    </button>
                  </Link>
                  <button className=" p-2 "
                  onClick={()=>mutate(item)}>
              <i className="fa-solid fa-trash" style={{color: '#f11e1e'}} />

                  </button>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListProducts;
