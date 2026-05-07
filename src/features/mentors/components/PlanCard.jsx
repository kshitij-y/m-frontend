export default function PlanCard({
    plan,
    onBook,
}) {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-bold">
                {plan.title}
            </h3>

            <p className="mt-3 text-sm text-gray-500">
                {plan.description}
            </p>

            <div className="mt-6">
                <p className="text-4xl font-bold">
                    ₹{plan.price}
                </p>
            </div>

            <button
                disabled={isPending}
                onClick={() => onBook(plan)}
                className="
                    mt-6 w-full rounded-2xl bg-black px-5 py-3 text-white transition

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                {isPending
                    ? "Booking..."
                    : "Book Mentorship"}
            </button>
        </div>
    );
}