import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { loginSchema } from "../../features/auth/schemas/loginSchema";

import { loginUser } from "../../features/auth/api/loginUser";
import { getCurrentUser } from "../../features/auth/api/getCurrentUser";

import { useDispatch } from "react-redux";
import { setUser } from "../../redux/auth/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    try {
      setServerError("");

      await loginUser(values);

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
          "Login failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="text-gray-500">
            Login to your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
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
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />

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
              ? "Logging in..."
              : "Login"}
          </Button>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-black"
            >
              Signup
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}