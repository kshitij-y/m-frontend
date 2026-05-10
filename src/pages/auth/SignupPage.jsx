import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch } from "react-redux";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Logo from "../../components/ui/Logo";

import { signupSchema } from "../../features/auth/schemas/signupSchema";

import { signupUser } from "../../features/auth/api/signupUser";
import { getCurrentUser } from "../../features/auth/api/getCurrentUser";

import { setUser } from "../../redux/auth/authSlice";

import { getErrorMessage } from "../../utils/getErrorMessage";

export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      role: "MENTEE",
    },
  });

  const onSubmit = async (values) => {
    try {
      setServerError("");

      await signupUser(values);

      localStorage.setItem(
        "pendingVerificationEmail",
        values.email
      );

      navigate("/verify-otp", {
        state: {
          email: values.email,
          purpose: "signup",
        },
      });
    } catch (error) {
      setServerError(
        getErrorMessage(error) || "Signup failed"
      );
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-10">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-120px] left-[-80px] h-[380px] w-[380px] rounded-full bg-indigo-100 blur-3xl opacity-70" />

        <div className="absolute bottom-[-140px] right-[-80px] h-[420px] w-[420px] rounded-full bg-violet-100 blur-3xl opacity-70" />
      </div>
      
      <div className="w-full max-w-xl items-center justify-center">
          <div className="w-fit mx-auto mb-10">
            <Logo />
          </div>

        <div className="rounded-[32px] border border-slate-200/70 bg-white p-8 shadow-xl shadow-slate-200/40 lg:p-10">
          <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Create account
          </h1>

          <p className="mt-[-5px] mb-2 text-base leading-7 text-slate-400">
            Join MentorConnect and start learning from industry
            professionals.
          </p>
        </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" space-y-6"
          >
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create password"
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Account Type
              </label>

              <select
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                {...register("role")}
              >
                <option value="MENTEE">
                  Mentee
                </option>

                <option value="MENTOR">
                  Mentor
                </option>
              </select>

              {errors.role && (
                <p className="text-sm text-rose-500">
                  {errors.role.message}
                </p>
              )}
            </div>

            {serverError && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                {serverError}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 rounded-2xl bg-indigo-600 text-base font-semibold text-white transition hover:bg-indigo-700"
            >
              {isSubmitting
                ? "Creating account..."
                : "Create Account"}
            </Button>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}