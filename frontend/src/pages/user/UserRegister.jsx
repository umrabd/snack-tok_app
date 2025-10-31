import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UserRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [passwordMatch, setPasswordMatch] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fullname = watch("fullname");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // 🔍 check password match
  useEffect(() => {
    if (password && confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(null);
    }
  }, [password, confirmPassword]);

  const onSubmit = async(data, e) => {
    setIsLoading(true);
    // Handle form submission, e.g., send data to backend
    try{

      const response = await axios.post('http://localhost:3000/api/auth/user/register', {
            fullname: fullname,
            email: email,
            password: password
          });
          toast.success("User registered successfully!");

 e.target.reset();
      console.log("User registered successfully:", response.data);
      
    } catch (error) {
      if(error.response){
        setErrorMessage(error.response.data.message);
        toast.error(error.response.data.message);

      }else {
        setErrorMessage("An error occurred. Please try again.");
        toast.error("An error occurred. Please try again.");
      } 
    }
    finally {
      setIsLoading(false);
    }
  };

  // 🧩 disable button if any field empty or password mismatch
  const isButtonDisabled =
    isLoading || !fullname || !email || !password || !confirmPassword || passwordMatch === false;

  return (
    <Layout>
      <section className="flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <Toaster />
          <div className="bg-card rounded-xl shadow-card shadow-lg p-6">
              
            
            <h2 className="text-2xl font-semibold text-text mb-1">
              Create your account
            </h2>
            <p className="text-sm text-muted mb-6">
              Quick and simple registration for snack lovers.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-sm text-muted mb-1 block">Full Name</label>
                <input
                  {...register("fullname", { required: "Full name is required" })}
                  className={`input ${
                    errors.fullname ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Jane Doe"
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>
                )}
              </div>

              {/* Email */}
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
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-muted mb-1 block">Password</label>
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
                 btnText={isLoading ? "Creating account..." : "Create account"}
                disabled={isButtonDisabled}
                className={`w-full py-2 rounded-md font-semibold text-white transition ${
                  isButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:opacity-90"
                }`}
              />

              <div className="flex items-center justify-between text-sm text-muted">
                <span>Already have an account?</span>
                <Link to="/user/login" className="text-primary font-medium">
                  Sign in
                </Link>
              </div>

              <div className="border-t pt-4 text-center text-sm text-muted">
                Are you a food partner?{" "}
                <Link
                  to="/food-partner/register"
                  className="text-primary font-medium"
                >
                  Join here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserRegister;
