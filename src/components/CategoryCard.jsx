import React from "react";
import "./CategoryCard.css";
function CategoryCard({ name, path, bgcolor }) {
  return (
    <div className="categorycard">
      <p
        style={{
          fontSize: "18px",
        }}
      >
        {name}
      </p>
    </div>
  );
}

export default CategoryCard;
