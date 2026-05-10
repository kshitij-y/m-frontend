import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import Logo from "../../components/ui/Logo";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { verifySignupOtp } from "../../features/auth/api/verifySignupOtp";
import { getCurrentUser } from "../../features/auth/api/getCurrentUser";

import { setUser } from "../../redux/auth/authSlice";

import { getErrorMessage } from "../../utils/getErrorMessage";

export default function OtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [serverError, setServerError] = useState("");

  const email = location.state?.email;
  const purpose = location.state?.purpose;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
  if (!email || !purpose) {
    navigate("/signup", {
      replace: true,
    });
  }
}, [email, purpose, navigate]);

  const onSubmit = async (values) => {
    try {
      setServerError("");

      // SIGNUP FLOW
      if (purpose === "signup") {
        await verifySignupOtp({
          email,
          otp: values.otp,
        });

        const response = await getCurrentUser();

        dispatch(setUser(response.data));

        if (response.data.role === "MENTOR") {
          if (!response.data.onboardingCompleted) {
            navigate("/mentor/onboarding");
          } else {
            navigate("/mentor/dashboard");
          }
        } else {
          navigate("/dashboard");
        }

        return;
      }

      if (purpose === "reset-password") {
        navigate("/reset-password", {
          state: {
            email,
            otp: values.otp,
          },
        });

        return;
      }
    } catch (error) {
      setServerError(
        getErrorMessage(error) || "OTP verification failed"
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
              Verification required
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Verify OTP
            </h1>

            <p className="mt-3 text-base leading-7 text-slate-600">
              Enter the 6-digit verification code sent to:
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              {email}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 space-y-6"
          >
            <Input
              label="Verification Code"
              placeholder="Enter 6-digit OTP"
              error={errors.otp?.message}
              {...register("otp", {
                required: "OTP is required",
                minLength: {
                  value: 6,
                  message: "OTP must be 6 digits",
                },
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
                ? "Verifying..."
                : "Verify OTP"}
            </Button>

            <p className="text-center text-sm text-slate-500">
              Wrong email?{" "}
              <Link
                to="/signup"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Go back
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}