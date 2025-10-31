import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const FoodPartnerRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [passwordMatch, setPasswordMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const location = watch("location");
  const phone = watch("phone");
  const contactName = watch("contactName");

  // 🔍 Check password match
  useEffect(() => {
    if (password && confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(null);
    }
  }, [password, confirmPassword]);

  // 🧩 Disable button if any field empty or password mismatch
  const isButtonDisabled =
    isLoading ||
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    !location ||
    !contactName ||
    passwordMatch === false;

  const onSubmit = async (data, e) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/register",
        {
          name: name,
          email: email,
          password: password,
          location: location,
          phoneNumber: phone,
          contactName: contactName,

        }
      );

      toast.success("Food partner registered successfully!");
      console.log("Registration successful:", response.data);

      e.target.reset(); // ✅ Clear all fields
    } catch (error) {
      console.log(error)
      if (error.response) {
        setErrorMessage(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
         setErrorMessage("An error occurred. Please try again.");
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <Toaster />
          <div className="bg-card rounded-xl shadow-card p-6">
            <h2 className="text-2xl font-semibold text-text mb-1">
              Partner sign up
            </h2>
            <p className="text-sm text-muted mb-6">
              Register your business to sell on SnackTok.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Business Name */}
              <div>
                <label className="text-sm text-muted mb-1 block">
                  Business name
                </label>
                <input
                  {...register("name", { required: "Business name is required" })}
                  className={`input ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Tasty Bites LLC"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-muted mb-1 block">
                  Contact email
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  className={`input ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="owner@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Contact Name + Phone */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-muted mb-1 block">
                    Contact Name
                  </label>
                  <input
                    {...register("contactName", {
                      required: "Contact name is required",
                    })}
                    className={`input ${
                      errors.contactName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.contactName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">
                    Phone (optional)
                  </label>
                  <input
                    {...register("phone")}
                    type="text"
                    className="input"
                    placeholder="+92 300 0000000"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm text-muted mb-1 block">Location</label>
                <input
                  {...register("location", { required: "Location is required" })}
                  type="text"
                  className={`input ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="123 Snack St, Food City"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-muted mb-1 block">
                    Password
                  </label>
                  <input
                    {...register("password", { required: "Password is required" })}
                    type="password"
                    placeholder="••••••••"
                    className={`input ${
                      passwordMatch === false
                        ? "border-red-500"
                        : passwordMatch === true
                        ? "border-green-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">
                    Confirm Password
                  </label>
                  <input
                    {...register("confirmPassword", {
                      required: "Confirm your password",
                    })}
                    type="password"
                    placeholder="••••••••"
                    className={`input ${
                      passwordMatch === false
                        ? "border-red-500"
                        : passwordMatch === true
                        ? "border-green-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
              </div>

              {/* Password Error */}
              {passwordMatch === false && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                btnText={isLoading ? "Creating account..." : "Create partner account"}
                disabled={isButtonDisabled}
                className={`w-full py-2 rounded-md font-semibold text-white transition ${
                  isButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:opacity-90"
                }`}
              />

              {/* Links */}
              <div className="flex items-center justify-between text-sm text-muted">
                <span>Already partner?</span>
                <Link
                  to="/food-partner/login"
                  className="text-primary font-medium"
                >
                  Sign in
                </Link>
              </div>

              <div className="border-t pt-4 text-center text-sm text-muted">
                Want a user account?{" "}
                <Link to="/user/register" className="text-primary font-medium">
                  User signup
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FoodPartnerRegister;
