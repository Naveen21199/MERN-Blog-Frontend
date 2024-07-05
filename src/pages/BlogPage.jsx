import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "./BlogPage.css";
import ClockLoader from "react-spinners/ClockLoader";
import axios from "axios";
import { BACKEND_API_URL } from "../helper/helper";
import BlogSlider from "../components/BlogSlider";

function BlogPage() {
  const [blogCreatedAT, setBlogCreatedAT] = useState("");
  const { blogid } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({
    _id: "",
    title: "",
    description: "",
    imageUrl: "",
    paragraph: [],
    category: "",
    owner: "",
    createdAt: "",
    updatedAt: "",
  });
  //get blog by id
  const getBlogById = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_API_URL}/blog/${blogid}`, {
        withCredentials: true,
      });
      setLoading(false);
      if (data.success) {
        setBlog(data.data);
        const formattedDate = formatDate(data.data.createdAt);
        setBlogCreatedAT(formattedDate);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogById();
    window.scroll(0, 0);
  }, []);
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${monthNames[monthIndex]} ${year}`;
  }
  return (
    <div className="blogpage-out">
      {loading && blog._id == "" ? (
        <div className="loaderfullpage">
          <ClockLoader
            color="#36d7b7"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="blogpage">
          <div className="c1">
            <p className="createdat">Created at {blogCreatedAT}</p>
            <p className="title">{blog.title}</p>
            <p className="category">{blog.category}</p>

            {blog.imageUrl.length > 0 && (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                width={100}
                height={100}
                className="blogimg"
                unoptimized
              />
            )}
            <p className="description">{blog.description}</p>
          </div>
          {blog.paragraph.map((para, index) => (
            <div className={index % 2 === 0 ? "c2left" : "c2right"} key={index}>
              {para.imageUrl.length > 0 && (
                <img
                  src={para.imageUrl}
                  alt={blog.title}
                  width={100}
                  height={100}
                  className="paraimg"
                  unoptimized
                />
              )}
              <div>
                <p className="title">{para.title}</p>
                <p className="description">{para.description}</p>
              </div>
            </div>
          ))}
          <BlogSlider />
        </div>
      )}
    </div>
  );
}

export default BlogPage;
