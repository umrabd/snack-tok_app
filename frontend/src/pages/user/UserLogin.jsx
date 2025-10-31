import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";

const UserLogin = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Watch email and password to control button state
  const email = watch("email");
  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/auth/user/login", {
        email: data.email,
        password: data.password,
      });

      toast.success("Login successful!");
      reset(); // ✅ clear all fields after successful login
      console.log("Login successful:", response.data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fix: Use watched values instead of `data`
  const isButtonDisabled = !email || !password || isLoading;

  return (
    <Layout>
      <section className="flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-xl shadow-card p-6">
            <h2 className="text-2xl font-semibold text-text mb-1">Welcome back</h2>
            <p className="text-sm text-muted mb-6">
              Sign in to continue to SnackTok.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm text-muted mb-1 block">Email</label>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  className={`input ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-muted mb-1 block">Password</label>
                <input
                  {...register("password", { required: "Password is required" })}
                  type="password"
                  className={`input ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                disabled={isButtonDisabled}
                className={`w-full py-2 rounded-md font-semibold text-white transition ${
                  isButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:opacity-90"
                }`}
                type="submit"
                btnText={isLoading ? "Signing in..." : "Sign in"}
              />

              <div className="flex items-center justify-between text-sm text-muted">
                <span>New here?</span>
                <Link to="/user/register" className="text-primary font-medium">
                  Create account
                </Link>
              </div>

              <div className="border-t pt-4 text-center text-sm text-muted">
                Partner with us?{" "}
                <Link
                  to="/food-partner/login"
                  className="text-primary font-medium"
                >
                  Partner login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ✅ Toast container */}
      <Toaster position="top-center" />
    </Layout>
  );
};

export default UserLogin;
