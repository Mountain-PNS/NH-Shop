import Banner from "@/components/Banner";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import New from "@/components/New";
import Shop from "@/components/Shop";
import useAuthState from "@/hooks/useAuthState";
import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="">
        <Banner />
        <New featured={true} />
        <Shop />
        <Blog />
      </div>
    </>
  );
};

export default HomePage;
