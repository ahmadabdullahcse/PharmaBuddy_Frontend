import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import auth from "../../firebase.init";
import eye from "../../images/eye-svgrepo-com.svg";
import eyeClose from "../../images/eye-close-svgrepo-com.svg";
import { toast } from "react-toastify";
import login from "../../images/banner/login.jpg";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loggedUser, setLoggedUser] = useState([]);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [selectedRole, setSelectedRole] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  let signInError;
  const navigate = useNavigate();
  const location = useLocation();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => {
        setLoggedUser(data);
      });
  }, []);
  let from = location.state?.from?.pathname || "/";

  if (loading) {
    return <Loading></Loading>;
  }

  if (error) {
    signInError = <p className="text-red-500 text-xs mt-1">{error?.message}</p>;
  }

  if (user) {
    navigate(from, { replace: true });
  }

  const onSubmit = (data) => {
    const matchingUser = loggedUser.find(
      (sysUser) => sysUser.email === data.email && sysUser.role === data.role
    );
    console.log(data);
    if (matchingUser) {
      signInWithEmailAndPassword(data.email, data.password);
      localStorage.setItem("userRole", data.role);
    } else {
      toast.error(
        `${data.email} or ${data.role} is invalid. Please check it again`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
    const userRole = localStorage.getItem("userRole");
    navigate(`/`);
  };

  return (
    <div className=" pb-32 pt-16">
      <div className="mx-auto max-w-4xl">
        <div className="card bg-accent border-secondary border-4 shadow-xl">
          <div>
            <div className="card-body">
              <h1
                style={{ fontFamily: "rockwell" }}
                className="text-center text-2xl text-primary font-extrabold"
              >
                LOGIN
              </h1>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <img src={login} alt="" />
                </div>
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-primary font-bold text-md">
                          Select your Role
                        </span>
                      </label>
                      <select
                        name="role"
                        className="input input-sm input-bordered w-full"
                        {...register("role", {
                          required: {
                            value: true,
                            message: "Role is required",
                          },
                        })}
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                      <label>
                        {errors.role?.type === "required" && (
                          <span className="text-red-500 text-xs mt-1">
                            {errors.role.message}
                          </span>
                        )}
                      </label>
                    </div>
                    {/* Password field */}
                    <div className="form-control w-full pb-4">
                      <label className="label">
                        <span className="label-text text-primary font-bold text-md">
                          Password
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type={passwordVisible ? "text" : "password"}
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
                        <button
                          type="button"
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 focus:outline-none"
                          onClick={togglePasswordVisibility}
                        >
                          {passwordVisible ? (
                            <img
                              className="fa fa-eye w-4 text-gray-500"
                              src={eye}
                              alt=""
                            />
                          ) : (
                            <img
                              className="fa fa-eye w-4 text-gray-500"
                              src={eyeClose}
                              alt=""
                            />
                          )}
                        </button>
                      </div>
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
                    <p className="text-left">
                      <small className="font-semibold">
                        <Link className="text-primary" to="/register">
                          Forgot password?
                        </Link>
                      </small>
                    </p>
                    {signInError}
                    <input
                      className="btn btn-sm text-xs w-full border-secondary text-accent font-bold bg-primary"
                      value="LOGIN"
                      type="submit"
                    />
                    <p className="text-center">
                      <small className="font-semibold">
                        New to "Maker's Mosaic"?
                        <br />
                        <Link className="text-primary" to="/signup">
                          Create new account
                        </Link>
                      </small>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
