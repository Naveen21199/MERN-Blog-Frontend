import React from "react";
import Navbar from "../components/Navbar";
import HomeSlider from "../components/HomeSlider";
import CategoriesSlider from "../components/CategoriesSlider";
import BlogSlider from "../components/BlogSlider";

function Home() {
  return (
    <div>
      {/* <h1>This is home page</h1> */}
      <HomeSlider />
      <CategoriesSlider />
      <BlogSlider />
    </div>
  );
}

export default Home;
