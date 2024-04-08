import useProductsMutation from "@/hooks/useProductsMutation";
import useProductsQuery from "@/hooks/useProductsQuery";
import { ProductsTypes } from "@/interface/data";
import { uploadImage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useProductsQuery(id);
  const [file, setFile] = useState<string>("");
  const [fileGallery, setFileGallery] = useState<any[]>([]);
  const naviage = useNavigate();
  useEffect(() => {
    data && form.reset(data);
  }, [data]);

  const { mutate, form } = useProductsMutation({ action: "UPDATE" });  
  const { data: categories } = useQuery({
    queryKey: ["CATEGORIES_KEY"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/categories");
      return res.json();
    },
  });
  const onSubmit = async (data: ProductsTypes) => {

    const product = { ...data, gallery: fileGallery, image: file };
    console.log(product);
    mutate(product);
    naviage("/admin/products");
  };
  return (
    <>
    <div className="mr-5">
      <div className="flex">
        <h3 className="font-bold uppercase text-2xl">Thêm sản phẩm</h3>
      </div>
      <form className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Tên sản phẩm
            </label>
            <input
              className="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder=" Name*"
              {...form.register("name", {
                minLength: 3,
                maxLength: 30,
                required: true,
              })}
            />
            {form.formState.errors.name && (
              <p className="text-red-600 font-bold m-2">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Danh mục
            </label>
            <select
              className="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              {...form.register("category", { required: true })}
            >
              <option>Mời chọn danh mục</option>
              {categories?.map((item: any, index: number) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            {form.formState.errors.category && (
              <p className="text-red-600 font-bold m-2">
                {form.formState.errors.category.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Giá sản phẩm
            </label>
            <input
              className="w-full bg-white text-gray-900  p-3 rounded-lg focus:outline-none "
              type="number"
              placeholder="Gía*"
              {...form.register("price", { required: true })}
            />
            {form.formState.errors.price && (
              <p className="text-red-600 font-bold m-2">
                {form.formState.errors.price.message}
              </p>
            )}
          </div>
          <div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload file
              </label>

              <input
                className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                accept="image/*"
                {...form.register("image", { required: true })}
                onChange={async (e: any) => {
                  const files = Array.from(e.target.files as FileList);
                  try {
                    const result = await Promise.all(
                      files.map((item: any) => uploadImage(item))
                    );
                    setFile(result[0].url);
                  } catch (error) {
                    console.error("Error uploading files:", error);
                  }
                }}
              />
            </div>

            {form.formState.errors.image && (
              <p className="text-red-600 font-bold m-2">
                {form.formState.errors.image.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 my-5">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Mã giảm giá cho sản phẩm
            </label>
            <input
              className="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Mã giảm giá cho sản phẩm"
              {...form.register("discount", { required: true })}
            />
            {form.formState.errors.discount && (
              <p className="text-red-600 font-bold m-2">
                {form.formState.errors.discount.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Số lượng sản phẩm
            </label>
            <input
              className="w-full bg-white text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Số lượng sản phẩm"
              {...form.register("countInStock", { required: true })}
            />
            {form.formState.errors.countInStock && (
              <p className="text-red-600 font-bold m-2">
                {form.formState.errors.countInStock.message}
              </p>
            )}
          </div>
          <div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Sản phẩm nổi bật
              </p>
              <div className="p-4">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value="true"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  {...form.register("featured")}
                />
                <label
                  htmlFor="link-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
               Sản phẩm nổi bật?
               
                  
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Bộ sưu tập hình ảnh
          </label>
          <input
            className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            multiple
            accept="image/*"
            {...form.register("gallery")}
            onChange={async (e: any) => {
              const files = Array.from(e.target.files as FileList);
              try {
                const result = await Promise.all(
                  files.map((item: any) => uploadImage(item))
                );
                console.log(result);

                setFileGallery(result.map((item) => item.url));
              } catch (error) {
                console.error("Error uploading files:", error);
              }
            }}
          />

          {form.formState.errors.gallery && (
            <p className="text-red-600 font-bold m-2">
              {form.formState.errors.gallery.message}
            </p>
          )}
        </div>
        <div className="my-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Mô tả sản phẩm
          </label>
          <textarea
            placeholder="Message*"
            className="w-full h-32 bg-white text-gray-900 mt-2 rounded-lg focus:outline-none focus:shadow-outline"
            {...form.register("description", { required: true })}
          />
          {form.formState.errors.description && (
            <p className="text-red-600 font-bold m-2">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>
        <p className="text-red-600 font-bold m-2"></p>
        <div className="my-2 w-1/2 lg:w-1/4">
          <button
            className="uppercase text-sm font-bold tracking-wide bg-yellow-700 text-black[#F9F1E7] p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  </>
  );
};
export default Update;
