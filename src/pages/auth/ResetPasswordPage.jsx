import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useForm } from "react-hook-form";

import Logo from "../../components/ui/Logo";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { resetPassword } from "../../features/auth/api/resetPassword";

import { getErrorMessage } from "../../utils/getErrorMessage";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [serverError, setServerError] = useState("");

  const email = location.state?.email || "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email,
    },
  });

  const password = watch("newPassword");

  const onSubmit = async (values) => {
    try {
      setServerError("");

      await resetPassword({
        email: values.email,
        otp: values.otp,
        newPassword: values.newPassword,
      });

      navigate("/login");
    } catch (error) {
      setServerError(
        getErrorMessage(error) ||
          "Password reset failed"
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

      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Logo />
        </div>

        {/* Card */}
        <div className="rounded-[32px] border border-slate-200/70 bg-white p-8 shadow-xl shadow-slate-200/40 lg:p-10">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />
              Secure account recovery
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Reset password
            </h1>

            <p className="mt-3 text-base leading-7 text-slate-600">
              Enter the OTP sent to your email and create a new
              password.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 space-y-6"
          >
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
              })}
            />

            <Input
              label="OTP Code"
              placeholder="Enter 6-digit OTP"
              error={errors.otp?.message}
              {...register("otp", {
                required: "OTP is required",
              })}
            />

            <Input
              label="New Password"
              type="password"
              placeholder="Create new password"
              error={errors.newPassword?.message}
              {...register("newPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message:
                    "Password must be at least 8 characters",
                },
              })}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm new password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password ||
                  "Passwords do not match",
              })}
            />

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
                ? "Resetting password..."
                : "Reset Password"}
            </Button>

            <p className="text-center text-sm text-slate-500">
              Back to{" "}
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