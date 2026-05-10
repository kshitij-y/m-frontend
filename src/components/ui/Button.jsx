import clsx from "clsx";

export default function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  disabled = false,
  ...props
}) {
  console.log("SUBMIT CALLED BUTTON");
  return (
    <button
      disabled={disabled}
      className={clsx(
        "w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50",

        {
          "bg-black text-white hover:bg-gray-800":
            variant === "primary",

          "border border-gray-300 bg-white text-black hover:bg-gray-100":
            variant === "secondary",

          "bg-red-500 text-white hover:bg-red-600":
            variant === "danger",
        },

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}