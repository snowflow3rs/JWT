import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerUser } from "../redux/apiRequest";
const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //method of formilk
  const formilk = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
    },
    // use Yup validation
    validationSchema: Yup.object({
      name: Yup.string()
        .required("* Required")
        .min(4, "Must be at least 4 characters"),
      email: Yup.string()
        .required("* Required")
        .matches(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("* Required")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Password must be 7-19 characters and contain at least one letter, one number and a special character"
        ),
      confirmpassword: Yup.string()
        .required("* Required")
        .oneOf([Yup.ref("password"), null], "Password must match the password"),
      phone: Yup.string()
        .required("* Required")
        .matches(
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
          "Must be a valid phone number"
        ),
    }),
    onSubmit: (values) => {
      const newUser = {
        email: values.email,
        username: values.name,
        password: values.password,
      };

      registerUser(newUser, dispatch, navigate);
    },
  });

  return (
    <div className=" h-screen bg-white-cus items-center flex justify-center scroll-smooth leading-normal px-2 py-1 font-sora">
      <div className="rounded-[14px] p-[2rem] bg-white min-w-[500px] shadow-md ">
        <header className="text-purple-cus font-bold text-[1.5rem] text-center">
          Sign up
        </header>
        <form
          action=""
          onSubmit={formilk.handleSubmit}
          className="flex flex-col gap-5 mt-[1.5rem] font-semibold text-[1rem]"
        >
          {/* name */}
          <label className="mt-[1rem]">Your Name</label>
          <input
            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formilk.values.name}
            onChange={formilk.handleChange}
          />
          {formilk.errors.name && (
            <p className="text-[0.75rem] max-w-[100%] text-red">
              {formilk.errors.name}
            </p>
          )}
          {/* email */}
          <label className="mt-[1rem]">Your Email</label>
          <input
            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formilk.values.email}
            onChange={formilk.handleChange}
          />
          {formilk.errors.email && (
            <p className="text-[0.75rem] max-w-[100%] text-red">
              {formilk.errors.email}
            </p>
          )}
          {/* phone */}
          <label className="mt-[1rem]">Your Phone</label>
          <input
            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone"
            value={formilk.values.phone}
            onChange={formilk.handleChange}
          />
          {formilk.errors.phone && (
            <p className="text-[0.75rem] max-w-[100%] text-red">
              {formilk.errors.phone}
            </p>
          )}
          {/* ps */}
          <label className="mt-[1rem]">Your Password</label>
          <input
            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
            type="text"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formilk.values.password}
            onChange={formilk.handleChange}
          />
          {formilk.errors.password && (
            <p className="text-[0.75rem] max-w-[100%] text-red">
              {formilk.errors.password}
            </p>
          )}
          {/* cps */}
          <label className="mt-[1rem]">Your Confirm Password</label>
          <input
            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
            type="text"
            id="confirmpassword"
            name="confirmpassword"
            placeholder="Enter your confirm password"
            value={formilk.values.confirmpassword}
            onChange={formilk.handleChange}
          />
          {formilk.errors.confirmpassword && (
            <p className="text-[0.75rem] max-w-[100%] text-red">
              {formilk.errors.confirmpassword}
            </p>
          )}
          <button
            className="p-[0.5rem] cursor-pointer bg-blue text-white outline-none rounded-[24px] text-[1rem] self-end  "
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
