import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import image from "../../images/medicine-bro.png";

const AddMedicine = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const imageStorageKey = "ff702e3741c40ba98a1e3823b0fef1f3";
  const [user] = useAuthState(auth);
  const userInfo = user?.email;

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
          userInfo,
        };
        console.log(medicine);

        // Save medicine information to the database
        const addMedicineResponse = await fetch(
          "https://pharmabuddy.onrender.com/addMedicine",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(medicine),
          }
        );

        if (!addMedicineResponse.ok) {
          throw new Error("Failed to add medicine");
        }

        const addMedicineData = await addMedicineResponse.json();
        console.log(addMedicineData);

        reset(); 
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-transparent">
      <div className="card bg-transparent">
        <div className="card-body">
          <h1
            style={{ fontFamily: "rockwell" }}
            className="text-center text-2xl text-primary font-extrabold"
          >
            ADD <strong>MEDICINE</strong>
          </h1>
          <div className="grid lg:grid-cols-2 gap-5">
            <div>
              <img src={image} alt="" />
            </div>
            <div>
              <form onSubmit={handleSubmit(handleAddMedicine)}>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-primary font-bold text-md">
                      Medicine
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
                      Genre
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
      </div>
    </div>
  );
};

export default AddMedicine;
