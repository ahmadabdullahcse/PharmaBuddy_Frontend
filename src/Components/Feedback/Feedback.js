import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Feedback = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    toast.success(`Thank you for your feedback ${data.name}`, {
      position: toast.POSITION.TOP_CENTER,
      onClose: () => {
        reset();
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-8 p-6 bg-white rounded-lg lg:shadow-lg">
        <div>
          <h1
            style={{ fontFamily: "rockwell" }}
            className="text-center text-2xl text-primary font-extrabold"
          >
            Feedback Form
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <label htmlFor="name" className="text-primary font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-2 px-4 py-1 w-full border rounded-md"
              placeholder="Your Name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
            />
            <label>
              {errors.name?.type === "required" && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </label>
          </div>
          <div>
            <label htmlFor="email" className="text-primary font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 px-4 py-1 w-full border rounded-md"
              placeholder="Your Email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Provide a valid email",
                },
              })}
            />
            <label>
              {errors.email?.type === "required" && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </label>
          </div>
          <div>
            <label htmlFor="rating" className="text-primary font-semibold">
              Rating:
            </label>
            <select
              id="rating"
              name="rating"
              required
              className="mt-2 px-4 py-1 w-full border rounded-md"
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>
          <div>
            <label htmlFor="comments" className="text-primary font-semibold">
              Comments or Suggestions:
            </label>
            <textarea
              id="comments"
              name="comments"
              rows="4"
              className="mt-2 px-4 py-2 w-full border rounded-md"
              placeholder="Your Comments or Suggestions"
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 w-full bg-primary hover:bg-secondary text-white font-semibold rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
