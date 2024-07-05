import React from "react";
import "./BlogCard.css";
function BlogCard({ title, imageUrl, _id }) {
  return (
    <div
      className="blogcard"
      onClick={() => {
        window.location.href = `/blogpage/${_id}`;
      }}
    >
      <div
        className="blogimg"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <p
        style={{
          color: "red",
          fontSize: "15px",
        }}
      >
        {title}
      </p>
    </div>
  );
}

export default BlogCard;
