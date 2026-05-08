import { Link } from "react-router-dom";

export default function ErrorPage({
  title = "Something went wrong",
  description = "An unexpected error occurred.",
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f7fb] px-6 text-center">
      <div className="max-w-lg rounded-[32px] bg-white p-10 shadow-sm">
        <h1 className="text-5xl font-bold tracking-tight">
          Oops
        </h1>

        <p className="mt-6 text-xl font-medium">
          {title}
        </p>

        <p className="mt-3 text-gray-500">
          {description}
        </p>

        <Link
          to="/"
          className="
            mt-8 inline-flex rounded-2xl bg-black
            px-6 py-3 text-white transition
            hover:opacity-90
          "
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}