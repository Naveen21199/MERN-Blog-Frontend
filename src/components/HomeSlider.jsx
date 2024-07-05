import React, { useEffect, useState } from "react";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "./HomeSlider";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BACKEND_API_URL } from "../helper/helper";

const width = window.innerWidth;
const height = window.innerHeight;
function HomeSlider() {
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
  useEffect(() => {
    get10Blogs();
  }, []);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {/* <SwiperSlide>
        <img
          src={img1}
          alt=""
          width="100%"
          height={height / 2}
          style={{
            objectFit: "cover",
          }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={img2}
          alt=""
          width="100%"
          height={height / 2}
          style={{
            objectFit: "cover",
          }}
        />
      </SwiperSlide> */}
      {blogs.length > 0 &&
        blogs.map((blog) => {
          return (
            <SwiperSlide>
              <img
                src={blog.imageUrl}
                alt=""
                width={width}
                height={height / 2}
                style={{
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}

export default HomeSlider;
