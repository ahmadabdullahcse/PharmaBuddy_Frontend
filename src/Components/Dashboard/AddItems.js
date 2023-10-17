import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddItems = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imageStorageKey = "ff702e3741c40ba98a1e3823b0fef1f3";
  const [item, setItem] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    price: "",
    currency: "BDT",
    quantity: "",
    images: "",
    seller: {
      name: "",
      rating: "",
    },
    attributes: [
      {
        name: "",
        value: "",
      },
    ],
    shippingInfo: {
      deliveryTime: "",
      shippingCost: "",
    },
  });

  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...item.attributes];
    updatedAttributes[index][field] = value;
    setItem({
      ...item,
      attributes: updatedAttributes,
    });
  };

  const handleAddAttribute = () => {
    setItem({
      ...item,
      attributes: [
        ...item.attributes,
        {
          name: "",
          value: "",
        },
      ],
    });
  };

  const handleAddMedicine = async (data) => {
    try {
      const image = data.image[0];
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

      const imgResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!imgResponse.ok) {
        throw new Error("Image upload failed");
      }

      const imgData = await imgResponse.json();

      if (imgData.success) {
        const medicine = {
          title: data.title,
          description: data.description,
          img: imgData.data.url,
          category: data.category,
          price: data.price,
          quantity: data.quantity,
          rating: data.rating,
          deliveryTime: data.deliveryTime,
        };

        // Save medicine information to the database
        const response = await fetch("http://localhost:5000/medicine", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(medicine),
        });

        if (response.ok) {
          const result = await response.json();
          toast.success(`${data.title} added`);
        } else {
          throw new Error("Failed to save medicine");
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add medicine");
    }
  };

  return (
    <div className="card bg-transparent border-2 shadow-md">
      <div className="card bg-transparent border-4 shadow-md">
        <div className="card-body">
          <h1
            style={{ fontFamily: "rockwell" }}
            className="text-center text-2xl text-primary font-extrabold"
          >
            ADD <strong>Item</strong>
          </h1>
          <form onSubmit={handleSubmit(handleAddMedicine)}>
            <div className="grid lg:grid-cols-3 gap-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-primary font-bold text-md">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Product title"
                  name="title"
                  className="input input-sm input-bordered w-full"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "title is required",
                    },
                  })}
                />
                <label>
                  {errors.title?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.title.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-primary font-bold text-md">
                    Description
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Product description"
                  name="description"
                  className="input input-sm input-bordered w-full"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "description is required",
                    },
                  })}
                />
                <label>
                  {errors.description?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.description.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-primary font-bold text-md">
                    Category
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Product category"
                  name="category"
                  className="input input-sm input-bordered w-full"
                  {...register("category", {
                    required: {
                      value: true,
                      message: "category is required",
                    },
                  })}
                />
                <label>
                  {errors.category?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.category.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-primary font-bold text-md">
                    Price
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="Product price"
                  name="price"
                  className="input input-sm input-bordered w-full"
                  {...register("price", {
                    required: {
                      value: true,
                      message: "price is required",
                    },
                  })}
                />
                <label>
                  {errors.price?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.price.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-primary font-bold text-md">
                    Quantity
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="Product quantity"
                  name="quantity"
                  className="input input-sm input-bordered w-full"
                  {...register("quantity", {
                    required: {
                      value: true,
                      message: "quantity is required",
                    },
                  })}
                />
                <label>
                  {errors.quantity?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.quantity.message}
                    </span>
                  )}
                </label>
              </div>
              {/* Image upload field */}
              <div className="form-control  w-full">
                <label className="label">
                  <span className="label-text text-primary font-bold text-md">
                    Image
                  </span>
                </label>
                <input
                  type="file"
                  placeholder="Your image"
                  name="image"
                  className="input input-sm input-bordered w-full"
                  {...register("image", {
                    required: {
                      value: true,
                      message: "image is required",
                    },
                  })}
                />
                <label>
                  {errors.image?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.image.message}
                    </span>
                  )}
                </label>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-primary font-bold text-md">
                    Seller Rating
                  </span>
                </label>
                <select
                  id="rating"
                  name="rating"
                  required
                  className="px-4 py-1 w-full border rounded-md"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-primary font-bold text-md">
                    Delivery Time
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Delivery time"
                  name="deliveryTime"
                  className="input input-sm input-bordered w-full"
                  {...register("deliveryTime")}
                />
              </div>
            </div>
            <div className="form-control pt-5 w-full">
              <div className="flex justify-between">
                <h2 className="label-text text-primary font-bold text-md">
                  Pharmacy
                </h2>
                <button
                  type="button"
                  onClick={handleAddAttribute}
                  className="btn btn-sm text-xs w-1/6 uppercase border-accent text-accent font-bold bg-primary"
                >
                  Add Attribute
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {item.attributes.map((attribute, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block">
                      Pharmacy Name
                      <input
                        type="text"
                        value={attribute.name}
                        onChange={(e) =>
                          handleAttributeChange(index, "name", e.target.value)
                        }
                        className="input input-sm input-bordered w-full"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex mt-7 items-center justify-center">
              <button
                type="submit"
                className="btn btn-sm text-xs w-1/3 uppercase border-accent text-accent font-bold bg-primary"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
