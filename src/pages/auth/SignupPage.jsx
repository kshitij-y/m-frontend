import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch } from "react-redux";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { signupSchema } from "../../features/auth/schemas/signupSchema";

import { signupUser } from "../../features/auth/api/signupUser";
import { getCurrentUser } from "../../features/auth/api/getCurrentUser";

import { setUser } from "../../redux/auth/authSlice";

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

      const response = await getCurrentUser();

      dispatch(setUser(response.data));

      if (response.data.role === "MENTOR") {
        navigate("/mentor/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setServerError(
        getErrorMessage(error) ||
          "Signup failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="text-gray-500">
            Start your mentorship journey
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="Full Name"
            placeholder="Enter your name"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Email"
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
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>

            <select
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
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
              <p className="text-sm text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>

          {serverError && (
            <div className="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-500">
              {serverError}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Creating account..."
              : "Signup"}
          </Button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black"
            >
              Login
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}