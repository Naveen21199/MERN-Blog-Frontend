import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_API_URL } from "../helper/helper";
import { AiFillCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import ClockLoader from "react-spinners/ClockLoader";

function AddBlog() {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    image: File || null,
    imageUrl: "",
    paragraph: [],
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [paragraphForm, setParagraphForm] = useState({
    title: "",
    description: "",
    image: File | null,
    imageUrl: "",
    position: "",
    createdAt: null,
  });

  //get blog categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_API_URL}/blogCategories`);
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  //check login
  const checkLogin = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_API_URL}/auth/checklogin`, {
        withCredentials: true,
      });
      if (data.ok) {
      } else {
        window.location.href = "/signin";
      }
    } catch (error) {
      console.log(error);
      window.location.href = "/signin";
    }
  };

  useEffect(() => {
    checkLogin();
    getCategories();
  }, []);

  // push paragraph to blog
  const pushParagraphToBlog = () => {
    let tempPg = paragraphForm;
    tempPg.createdAt = new Date().getTime();

    setBlog({
      ...blog,
      paragraph: [...blog.paragraph, paragraphForm],
    });

    const nextPostion = parseInt(paragraphForm.position) + 1;
    setParagraphForm({
      ...paragraphForm,
      title: "",
      description: "",
      position: nextPostion,
      createdAt: null,
    });
  };

  //delete paragraph from blog
  const deleteParagraph = () => {
    const updatedParagraph = blog.paragraph.filter(
      (p) => p.createdAt !== paragraph.createdAt
    );
    setBlog({ ...blog, paragraph: updatedParagraph });
  };
  const sortParagraphs = (a, b) => {
    if (String(a.position) === String(b.position)) {
      return b.createdAt - a.createdAt;
    }
    return String(a.position).localeCompare(String(b.position));
  };

  const uploadImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append("myimage", image);

      const response = await fetch(`${BACKEND_API_URL}/image/uploadimage`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        // You can handle the response data here or return it to the caller.
        return data.imageUrl;
      } else {
        // Handle the case where the request failed (e.g., server error)
        console.error("Failed to upload the image.");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };
  const uploadBlog = async () => {
    checkLogin();
    if (!blog.title || !blog.description || !blog.category) {
      // toast("Fill in all required fields");
      alert("Fill in all required fields");
      return;
    }
    setLoading(true);
    let tempblog = blog;
    if (blog.image) {
      let imgUrl = await uploadImage(blog.image);
      tempblog.imageUrl = imgUrl;
    }
    for (let i = 0; i < tempblog.paragraph.length; i++) {
      let tempimg = tempblog.paragraph[i].image;
      if (tempimg) {
        let imgURL = await uploadImage(tempimg);
        tempblog.paragraph[i].imageUrl = imgURL;
      }
    }
    const { data } = await axios.post(
      `${BACKEND_API_URL}/blog/create`,
      { ...tempblog },
      { withCredentials: true }
    );
    if (data.success) {
      toast("Blog added successfully");
      setLoading(false);
    } else {
      toast("failed to create blog");
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="loaderfullpage">
          <ClockLoader
            color="#36d7b7"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <div
        className="addblog_in"
        //  style={{ background: "black" }}
      >
        <h1 className="head1">Add blog</h1>
        <form
          style={{
            width: "70%",
            minWidth: "250px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="forminput_cont">
            <label>Blog Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={blog.title}
              onChange={(e) => {
                setBlog({ ...blog, title: e.target.value });
              }}
            />
          </div>

          <div className="forminput_cont">
            <label>Blog Category</label>
            <select
              value={blog.category} // Set the selected category value
              onChange={(e) => setBlog({ ...blog, category: e.target.value })} // update the selected category
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="forminput_cont">
            <label>Blog Description</label>
            <textarea
              placeholder="Description"
              value={blog.description}
              onChange={(e) =>
                setBlog({ ...blog, description: e.target.value })
              }
            />
          </div>

          <div className="forminput_cont">
            <label>Blog Image</label>
            <input
              type="file"
              onChange={(e) => {
                const selectedImage = e.target.files?.[0]; // Get the selected image file
                if (selectedImage) {
                  setBlog({ ...blog, image: selectedImage }); // Update the paragraphImage state with the URL
                }
              }}
            />
          </div>
          <div className="blogtempparagraphs">
            {blog.paragraph.sort(sortParagraphs).map((para) => (
              <div key={String(para.createdAt)}>
                <AiFillCloseCircle
                  className="closebtn"
                  onClick={() => {
                    deleteParagraph(para);
                  }}
                />
                <div className="section1">
                  <h1>{para.title}</h1>
                  <p>{para.description}</p>
                </div>
                {para.image && (
                  <img
                    src={URL.createObjectURL(para.image)}
                    alt={`Image for ${para.title}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="paragraph">
            <div className="forminput_cont">
              <label>Paragraph Position</label>
              <input
                type="number"
                value={paragraphForm.position}
                placeholder="Enter paragraph Position"
                onChange={(e) =>
                  setParagraphForm({
                    ...paragraphForm,
                    position: e.target.value,
                  })
                }
              />
            </div>

            <div className="forminput_cont">
              <label>Paragraph Title</label>
              <input
                type="text"
                value={paragraphForm.title}
                placeholder="Enter paragraph Title"
                onChange={(e) =>
                  setParagraphForm({ ...paragraphForm, title: e.target.value })
                }
              />
            </div>
            <div className="forminput_cont">
              <label>Paragraph Description</label>
              <textarea
                placeholder="Enter Paragraph Description"
                value={paragraphForm.description}
                onChange={(e) =>
                  setParagraphForm({
                    ...paragraphForm,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="forminput_cont">
              <label>Paragraph Image</label>
              <input
                type="file"
                id="pgimg"
                onChange={(e) => {
                  const selectedImage = e.target.files?.[0]; // Get the selected image file
                  if (selectedImage) {
                    // const imageUrl = URL.createObjectURL(selectedImage); // Create a URL for the selected image
                    setParagraphForm({
                      ...paragraphForm,
                      image: selectedImage,
                    }); // Update the paragraphImage state with the URL
                  }
                }}
              />
            </div>

            <button
              type="button"
              className="main_button"
              onClick={(e) => {
                e.preventDefault(); // Prevent the default form submission
                pushParagraphToBlog();
              }}
            >
              Add Paragraph To Blog
            </button>
          </div>
          <button
            type="submit"
            className="main_button"
            onClick={(e) => {
              e.preventDefault();
              uploadBlog();
            }}
          >
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddBlog;
