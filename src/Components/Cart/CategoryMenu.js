import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/Slices/CategorySlice";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:5000/medicine")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
        // console.log(uniqueCategories);
      });
  }, []);
  const selectedCategory = useSelector((state) => state.category.category);
  return (
    <div className="ml-6">
      <h3 className="text-xl text-center text-primary mt-16 font-semibold">
        Find According to Category
      </h3>

      <div className="my-5 flex justify-center items-center gap-3 overflow-x-scroll scroll-smooth lg:overflow-x-hidden">
        <button
          onClick={() => dispatch(setCategory("All"))}
          className="px-4 btn-sm mt-3 bg-primary text-accent font-bold rounded-full hover:bg-opacity-80 transition duration-300"
        >
          All
        </button>
        <div className="md:grid-cols-2 sm:grid-cols-1 gap-5 ">
          {categories.map((category, index) => {
            return (
              <button
                onClick={() => dispatch(setCategory(category))}
                key={index}
                className={`px-4 mx-2 btn-sm mt-3 hover:scale-95 bg-primary text-accent font-bold rounded-full hover:bg-opacity-80 transition duration-300 ${
                  selectedCategory === category &&
                  "px-4 btn-sm mt-3xbg-secondary text-black font-bold rounded-full hover:bg-opacity-80 transition duration-300"
                } `}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;
