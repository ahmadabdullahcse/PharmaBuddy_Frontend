import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from "../../redux/Slices/CartSlice";
import { toast } from "react-toastify";

const ItemCard = ({ id, images, title, price, qty }) => {
  const dispatch = useDispatch();
  const notify = () => {
    toast.success(
      `${title} Removed!`,
      {
        icon: "👋",
      },
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
  };
  return (
    <div className="flex gap-2 shadow-md rounded-lg h-20 p-4 mb-5 bg-accent border-secondary border-2">
      <MdDelete
        onClick={() => {
          dispatch(removeFromCart({ id, images, title, price, qty }));
          notify();
        }}
        className="absolute right-7 text-primary cursor-pointer"
      />
      <img src={images} alt="" className="w-[50px] h-[50px] " />
      <div className="leading-5">
        <h2 className="font-bold text-xs text-black">{title}</h2>
        <div className="flex justify-between ">
          <span className="text-primary font-bold">₹{price}</span>
          <div className="flex justify-center items-center gap-2 absolute right-7">
            <AiOutlineMinus
              onClick={() =>
                qty > 1 ? dispatch(decrementQty({ id })) : (qty = 0)
              }
              className="border-2 border-primary text-primary mt-4 hover:text-accent hover:bg-primary hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer"
            />
            <span className="mt-4">{qty}</span>
            <AiOutlinePlus
              onClick={() =>
                qty >= 1 ? dispatch(incrementQty({ id })) : (qty = 0)
              }
              className="border-2 border-primary text-primary mt-4 hover:text-accent hover:bg-primary hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
