import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const FoodPartnerLogin = () => {

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

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

  const onSubmit = async (data, e) => {
    setIsLoading(true);
    try{
      const response = await axios.post("http://localhost:3000/api/auth/foodpartner/login", {
        email: email,
        password: password,
      })
      toast.success("Login successful!");
      e.target.reset();
    console.log("Login successful:", response.data);
    }catch(error){
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
  }

   const isButtonDisabled = !email || !password || isLoading;


  return (
    <Layout>
      <section className="flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-xl shadow-card p-6">
            <h2 className="text-2xl font-semibold text-text mb-1">Partner login</h2>
            <p className="text-sm text-muted mb-6">Access your vendor dashboard.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm text-muted mb-1 block">Email</label>
                <input {...register("email", {required: "Email is required"})} type="email" className="input" placeholder="partner@example.com" />
              </div>

              <div>
                <label className="text-sm text-muted mb-1 block">Password</label>
                <input {...register("password", {required: "Password is required"})} type="password" className="input" placeholder="••••••••" />
              </div>

              <Button type="submit"  disabled={isButtonDisabled}  className={`w-full py-2 rounded-md font-semibold text-white transition ${
                  isButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:opacity-90"
                }`} btnText={isLoading ? "Signing in..." : "Sign in"}/>

              <div className="flex items-center justify-between text-sm text-muted">
                <span>Need an account?</span>
                <Link to="/food-partner/register" className="text-primary font-medium">Create partner account</Link>
              </div>

              <div className="border-t pt-4 text-center text-sm text-muted">
                User? <Link to="/user/login" className="text-primary font-medium">User login</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FoodPartnerLogin;