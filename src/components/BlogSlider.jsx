import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import BlogCard from "./BlogCard";
import axios from "axios";
import { BACKEND_API_URL } from "../helper/helper";
function BlogSlider() {
  const [blogs, setBlogs] = useState([]);

  const get10Blogs = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_API_URL}/blog`, {
        withCredentials: true,
      });
      if (data.success) {
        setBlogs(data.data.blogs);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const blogs = [
  //   {
  //     name: "Blog 1",
  //     path: "#",
  //     bgcolor: "black",
  //   },
  //   {
  //     name: "Blog 2",
  //     path: "#",
  //     bgcolor: "black",
  //   },
  //   {
  //     name: "Blog 3",
  //     path: "#",
  //     bgcolor: "black",
  //   },
  //   {
  //     name: "Blog 4",
  //     path: "#",
  //     bgcolor: "black",
  //   },
  //   {
  //     name: "Blog 5",
  //     path: "#",
  //     bgcolor: "black",
  //   },
  //   {
  //     name: "Blog 6",
  //     path: "#",
  //     bgcolor: "black",
  //   },
  //   {
  //     name: "Blog 7",
  //     path: "#",
  //     bgcolor: "black",
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
  useEffect(() => {
    get10Blogs();
  }, []);
  return (
    <div className="sliderout">
      <h1>Latest Blogs</h1>
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
        {blogs.map((blog, index) => {
          return (
            <SwiperSlide>
              <BlogCard {...blog} key={index} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default BlogSlider;
