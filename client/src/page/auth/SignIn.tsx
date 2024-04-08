import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { userSchema } from "@/services/validation";
import { useMutation } from "@tanstack/react-query";
import { UserTypes } from "@/interface/data";
import axios from "axios";
import { useLocalStorage } from "@/hooks/useStorage";
import { useNavigate } from "react-router-dom";
import { set } from "lodash";
const SignIn = () => {
  const [, setUser] = useLocalStorage("user", {});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (formData: UserTypes) => {
      const { data } = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );
      console.log(data);

      return data;
    },
    onSuccess: (data) => {
      setUser(data);
      // navigate('/');
    },
    onError: (error) => console.log(error),
  });
  const navigate = useNavigate();
  const onSubmitUser = (data: UserTypes) => {
    try {
      setUser(data);
      mutate(data);
      setTimeout(() => {
        navigate("/");
      },1000)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed z-50 inset-0 backdrop-sepia-0">
      <div className="w-full  grid justify-center bg-[#FAF3EA] py-[9.5%]">
        <form
          className=" mx-auto bg-white  rounded-xl"
          onSubmit={handleSubmit(onSubmitUser)}
        >
          <div className="text-right ">
            <i className="fa-solid fa-xmark m-2" />
          </div>
          <div className="text-center my-7">
            <h1 className="text-[30px] font-bold text-[#B88E2F]">Login</h1>
          </div>
          <div className="px-20 ">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-[#B88E2F] dark:text-white"
              >
                Username :
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-[#B88E2F] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-28 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email của bạn"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-[#B88E2F] dark:text-white"
              >
                Password :
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-[#B88E2F] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-28 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Mật khẩu của bạn"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className="grid justify-center">
            <button
              type="submit"
              className="text-black bg-[#FAF3EA] hover:bg-[#FAF3EA] focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-10 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-[#FAF3EA] text-[20px] font-bold "
            >
              Login
            </button>
          </div>
          <div className="flex justify-around p-8">
            <button className="text-black border-solid border-[1px] border-[#B88E2F] hover:bg-[#FAF3EA] focus:ring-4 focus:outline-none focus:ring-blue-300 text-[20px] font-bold rounded-lg text-sm w-full sm:w-auto px-10 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-[#FAF3EA] flex">
              <img
                className="w-[20px]"
                src="./src/assets/image/facebook.png"
                alt=""
              />
              <span>Facebook</span>
            </button>
            <button className="text-black border-solid border-[1px] border-[#B88E2F] hover:bg-[#FAF3EA] focus:ring-4 focus:outline-none focus:ring-blue-300 text-[20px] font-bold rounded-lg text-sm w-full sm:w-auto px-10 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-[#FAF3EA] flex ">
              <img
                className="w-[20px]"
                src="./src/assets/image/google.png"
                alt=""
              />{" "}
              <span>Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
