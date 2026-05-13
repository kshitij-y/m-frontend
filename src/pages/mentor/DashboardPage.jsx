// import Spinner from "../../components/ui/Spinner";

// import StatCard from "../../components/dashboard/StatCard";

// import { useMyMentorships } from "../../features/mentorships/hooks/useMyMentorships";

// import { useMyPlans } from "../../features/mentors/hooks/useMyPlans";

// import { useUpcomingSessions } from "../../features/sessions/hooks/useUpcomingSessions";

// import UpcomingSessionsWidget from "../../features/sessions/components/UpcomingSessionsWidget";

// export default function DashboardPage() {
//   const {
//     data: mentorships,
//     isLoading: mentorshipLoading,
//   } = useMyMentorships();

//   const {
//     data: plans,
//     isLoading: plansLoading,
//   } = useMyPlans();

//   const {
//     data: sessions,
//     isLoading: sessionsLoading,
//     isError: sessionsError,
//   } = useUpcomingSessions();

//   if (
//     mentorshipLoading ||
//     plansLoading
//   ) {
//     return <Spinner />;
//   }

//   const pendingCount =
//     mentorships?.filter(
//       (item) =>
//         item.status === "PENDING"
//     ).length || 0;

//   const activeCount =
//     mentorships?.filter(
//       (item) =>
//         item.status === "ACTIVE"
//     ).length || 0;

//   const upcomingSessionsCount =
//     sessionsLoading || sessionsError
//       ? 0
//       : sessions?.length || 0;

//   return (
//     <div className="space-y-8">
//       <section className="rounded-[32px] bg-gradient-to-r from-[#111827] to-[#1f2937] p-8 text-white shadow-sm">
//         <p className="text-sm text-gray-300">
//           Mentor Workspace
//         </p>

//         <h1 className="mt-3 text-5xl font-bold tracking-tight">
//           Welcome back
//         </h1>

//         <p className="mt-4 max-w-xl text-gray-300">
//           Manage your mentorship business
//           and mentee relationships.
//         </p>
//       </section>

//       <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
//         <StatCard
//           title="Total Bookings"
//           value={mentorships?.length || 0}
//         />
// {/* 
//         <StatCard
//           title="Pending Requests"
//           value={pendingCount}
//         /> */}

//         <StatCard
//           title="Active Mentorships"
//           value={activeCount}
//         />

//         <StatCard
//           title="Upcoming Sessions"
//           value={upcomingSessionsCount}
//         />
//       </section>

//       <section className="rounded-3xl bg-white p-6 shadow-sm">
//         <h2 className="text-2xl font-bold">
//           Upcoming Sessions
//         </h2>

//         <div className="mt-6">
//           <UpcomingSessionsWidget userRole="MENTOR" />
//         </div>
//       </section>

//       <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//         <div className="rounded-3xl bg-white p-6 shadow-sm">
//           <h2 className="text-2xl font-bold">
//             Active Plans
//           </h2>

//           <div className="mt-6 space-y-4">
//             {plans?.map((plan) => (
//               <div
//                 key={plan.id}
//                 className="rounded-2xl border border-gray-100 p-4"
//               >
//                 <p className="font-semibold">
//                   {plan.title}
//                 </p>

//                 <p className="mt-1 text-sm text-gray-500">
//                   ₹{plan.price}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="rounded-3xl bg-white p-6 shadow-sm">
//           <h2 className="text-2xl font-bold">
//             Recent Requests
//           </h2>

//           <div className="mt-6 space-y-4">
//             {mentorships
//               ?.slice(0, 5)
//               .map((item) => (
//                 <div
//                   key={item.id}
//                   className="rounded-2xl border border-gray-100 p-4"
//                 >
//                   <p className="font-semibold">
//                     {item?.mentee?.name}
//                   </p>

//                   <p className="mt-1 text-sm text-gray-500">
//                     {item?.status}
//                   </p>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
