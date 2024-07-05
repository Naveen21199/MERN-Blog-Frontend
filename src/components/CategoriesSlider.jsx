import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination } from "swiper/modules";
import CategoryCard from "./CategoryCard";
import { BACKEND_API_URL } from "../helper/helper";

function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    fetch(`${BACKEND_API_URL}/blogcategories`)
      .then((res) => {
        return res.json();
      })
      .then(async (response) => {
        const tempcat = await Promise.all(
          response.categories.map(async (category) => ({
            name: category,
            path: category,
            bgcolor: "black",
          }))
        );
        setCategories(tempcat);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCategories();
  }, []);
  // const categories = [
  //   {
  //     name: "Category 1",
  //     path: "#",
  //     bgcolor: generate(),
  //   },
  //   {
  //     name: "Category 2",
  //     path: "#",
  //     bgcolor: generate(),
  //   },
  //   {
  //     name: "Category 3",
  //     path: "#",
  //     bgcolor: generate(),
  //   },
  //   {
  //     name: "Category 4",
  //     path: "#",
  //     bgcolor: generate(),
  //   },
  //   {
  //     name: "Category 5",
  //     path: "#",
  //     bgcolor: generate(),
  //   },
  //   {
  //     name: "Category 6",
  //     path: "#",
  //     bgcolor: generate(),
  //   },
  //   {
  //     name: "Category 7",
  //     path: "#",
  //     bgcolor: generate(),
  //   },
  // ];

  // function createHex() {
  //   var hexCode1 = "";
  //   var hexValues1 = "0123456789abcdef";

  //   for (var i = 0; i < 6; i++) {
  //     hexCode1 += hexValues1.charAt(
  //       Math.floor(Math.random() * hexValues1.length)
  //     );
  //   }
  //   return hexCode1;
  // }

  // function generate() {
  //   var deg = Math.floor(Math.random() * 360);

  //   var gradient =
  //     "linear-gradient(" +
  //     deg +
  //     "deg, " +
  //     "#" +
  //     createHex() +
  //     ", " +
  //     "#" +
  //     createHex() +
  //     ")";
  //   return gradient;
  // }
  return (
    <div className="slideout">
      <h1>Categories</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {categories.map((category, index) => {
          return (
            <SwiperSlide>
              <CategoryCard {...category} key={index} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default CategoriesSlider;
