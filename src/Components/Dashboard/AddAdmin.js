import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const AddAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createUserWithEmailAndPassword, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();
  let signInError;

  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    fetch("/admin.json")
      .then((res) => res.json())
      .then((data) => {
        setAdmins(data);
      });
  }, []);
  if (loading) {
    return <Loading></Loading>;
  }

  if (error) {
    signInError = <p className="text-red-500 text-xs mt-1">{error?.message}</p>;
  }

  const handleAddAdmin = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    console.log(data);
    navigate("/dashboard");
  };

  return (
    <div className="lg:flex">
      <div className="lg:w-4/5 px-4 sm:my-16">
        <div className="card bg-transparent border-2 shadow-md">
          <div className="card bg-transparent border-4 shadow-md">
            <div className="card-body">
              <h1
                style={{ fontFamily: "rockwell" }}
                className="text-center text-2xl text-primary font-extrabold"
              >
                ADD <strong>ADMIN</strong>
              </h1>

              <form onSubmit={handleSubmit(handleAddAdmin)}>
                <div className="grid lg:grid-cols-2 pt-5 gap-3">
                  {/* name field */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-primary font-bold text-md">
                        Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      className="input input-sm input-bordered w-full"
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
                  {/* email field */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-primary font-bold text-md">
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="Your email"
                      name="email"
                      className="input input-sm input-bordered w-full "
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                        unique: { value: true },
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
                </div>
                <div className="grid lg:grid-cols-2 pt-5 gap-3">
                  {/* address field */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-primary font-bold text-md">
                        Address
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your address"
                      name="address"
                      className="input input-sm input-bordered w-full"
                      {...register("address", {
                        required: {
                          value: true,
                          message: "address is required",
                        },
                      })}
                    />
                    <label>
                      {errors.address?.type === "required" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.address.message}
                        </span>
                      )}
                    </label>
                  </div>
                  {/* Image upload field */}
                  <div className="form-control  w-full">
                    <label className="label">
                      <span className="label-text text-primary font-bold text-md">
                        photo
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
                {/* Password field */}
                <div className="form-control w-full pb-11">
                  <label className="label">
                    <span className="label-text text-primary font-bold text-md">
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="input input-sm input-bordered w-full "
                    {...register("password", {
                      required: {
                        value: true,
                        message: "password is required",
                      },
                      minLength: {
                        value: 6,
                        message: "Must be 6 characters longer",
                      },
                    })}
                  />
                  <label>
                    {errors.password?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </span>
                    )}
                  </label>
                </div>
                {signInError}
                <div className="flex items-center justify-center">
                  <input
                    className="btn btn-sm text-xs w-1/3 uppercase border-accent text-white font-bold bg-primary"
                    value="Create Admin"
                    type="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-2/5 bg-accent shadow-lg h-screen p-4">
        <h2 className="text-lg text-center text-primary font-bold">
          Existing Admins
        </h2>
        <table className="table-auto mt-4 mx-auto">
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td className="border px-4 py-2">
                  <span className="uppercase font-semibold">{admin.name}</span>
                  <br /> {admin.email}
                </td>
                <td className="border px-4 py-2">
                  <img
                    src={admin.img}
                    alt={admin.name}
                    className="w-20 h-auto rounded-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddAdmin;
