import React, { useState } from "react";
import {
    useCreateUserWithEmailAndPassword,
    useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import login from "../../images/banner/login.jpg";
import Loading from "../Shared/Loading";

const PharmacySignup = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [createUserWithEmailAndPassword, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const navigate = useNavigate();
  let signInError;
  const [isTermsChecked, setTermsChecked] = useState(false);
  const imageStorageKey = "ff702e3741c40ba98a1e3823b0fef1f3";

  if (loading || updating) {
    return <Loading />;
  }

  if (error || updateError) {
    signInError = (
      <p className="text-red-500 text-xs mt-1">
        {error?.message || updateError?.message}
      </p>
    );
  }

  const handleSignup = async (data) => {
    if (isTermsChecked) {
      try {
        const authUser = await createUserWithEmailAndPassword(
          data.email,
          data.password
        );
        await updateProfile(authUser.user, {
          displayName: data.name,
        });

        console.log("User registered:", authUser.user);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error during signup:", error);
      }
    } else {
      alert("Please accept the terms and conditions to sign up.");
    }

    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const pharmacySignup = {
            name: data.name,
            role: "pharmacySignup",
            img: imgData.data.url,
            email: data.email,
            location: data.location,
            password: data.password,
          };
          const user = {
            name: data.name,
            email: data.email,
            role: "pharmacySignup",
            img: imgData.data.url,
            password: data.password,
            location: data.location,
          };
          console.log(pharmacySignup);
          console.log(user);

          fetch("https://pharmabuddy.onrender.com/pharmacySignup", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(pharmacySignup),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success(`${data.name} thanks for your registration`);
            });
          fetch("https://pharmabuddy.onrender.com/user", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(user),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success(`${data.name} welcome to Maisha's WORLD`);
            });
        }
      });
    navigate("/");
  };

  return (
    <div className=" pb-32 pt-12">
      <div className="mx-auto lg:max-w-5xl md:max-w-xl sm:max-w">
        <div className="card lg:bg-accent lg:border-secondary lg:border-2 lg:shadow-xl">
          <div className="card-body">
            <h1
              style={{ fontFamily: "arial" }}
              className="text-center text-2xl text-primary font-extrabold"
            >
              Pharmacy Signup
            </h1>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <img className="h-96 ml-10 mt-10" src={login} alt="" />
              </div>
              <div>
                <form onSubmit={handleSubmit(handleSignup)}>
                  {/* name field */}
                  <div className="form-control pt-8 w-full">
                    <label className="label">
                      <span className="label-text text-primary font-bold text-md">
                        Pharmacy Name
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
                        unique: {
                          value: true,
                          message: " Your Email should be unique",
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
                      {errors.email?.type === "unique" && (
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
                  {/* location */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-primary font-bold text-md">
                        Location
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your location"
                      name="location"
                      className="input input-sm input-bordered w-full"
                      {...register("location", {
                        required: {
                          value: true,
                          message: "Location is required",
                        },
                      })}
                    />
                    <label>
                      {errors.location?.type === "required" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.location.message}
                        </span>
                      )}
                    </label>
                  </div>
                  {/* Image upload field */}
                  <div className="form-control  w-full">
                    <label className="label">
                      <span className="label-text text-primary font-bold text-md">
                        Photo
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

                  {/* Password field */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-primary font-bold text-md">
                        New Password
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="input input-sm input-bordered w-full"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 6,
                          message: "Must be 6 characters or longer",
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

                  {/* Confirm Password field */}
                  <div className="form-control w-full pb-11">
                    <label className="label">
                      <span className="label-text text-primary font-bold text-md">
                        Confirm Password
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      className="input input-sm input-bordered w-full"
                      {...register("confirmPassword", {
                        required: {
                          value: true,
                          message: "Password confirmation is required",
                        },
                        validate: (value) =>
                          value === getValues("password") ||
                          "Passwords do not match", // Check if it matches the "password" field
                      })}
                    />
                    <label>
                      {errors.confirmPassword?.type === "required" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.confirmPassword.message}
                        </span>
                      )}
                      {errors.confirmPassword?.type === "validate" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.confirmPassword.message}
                        </span>
                      )}
                    </label>
                  </div>
                  {signInError}
                  <div className="form-control w-full mt-2">
                    <input
                      type="checkbox"
                      className="checkbox"
                      {...register("terms", {
                        required: "You must accept the terms and conditions.",
                      })}
                      checked={isTermsChecked}
                      onChange={() => setTermsChecked(!isTermsChecked)}
                    />
                    <label className="text-xs text-primary">
                      <Link
                        className="text-xs text-primary font-bold underline"
                        to="/terms"
                      >
                        Terms and Conditions
                      </Link>{" "}
                      I agree to the terms and conditions
                    </label>
                  </div>
                  <div className="flex justify-center items-center">
                    <input
                      className={`btn btn-sm text-sm w-1/3 border-secondary text-white font-bold ${
                        isTermsChecked
                          ? "bg-primary hover:bg-secondary"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      value="Signup"
                      type="submit"
                      disabled={!isTermsChecked}
                    />
                  </div>
                </form>
              </div>
            </div>
            <p className="text-center">
              <small className="font-semibold">
                Already have an account at "Pharma-buddy"?
                <Link className="text-primary" to="/login">
                  Login
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacySignup;
