import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import Logo from "../../components/ui/Logo";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { forgotPassword } from "../../features/auth/api/forgotPassword";

import { getErrorMessage } from "../../utils/getErrorMessage";

export default function ForgotPasswordPage() {
    const navigate = useNavigate();

    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (values) => {
        try {
            setServerError("");

            await forgotPassword({
                email: values.email,
            });

            navigate("/reset-password", {
                state: {
                    email: values.email,
                },
            });
        } catch (error) {
            setServerError(
                getErrorMessage(error) ||
                "Failed to send reset OTP"
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
                            Password recovery
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                            Forgot password?
                        </h1>

                        <p className="mt-3 text-base leading-7 text-slate-600">
                            Enter your email address and we&apos;ll send you a
                            verification code to reset your password.
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
                                ? "Sending OTP..."
                                : "Send Reset OTP"}
                        </Button>

                        <p className="text-center text-sm text-slate-500">
                            Remember your password?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-indigo-600 hover:text-indigo-700"
                            >
                                Back to login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}