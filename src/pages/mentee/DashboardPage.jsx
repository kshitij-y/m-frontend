// import StatCard from "../../components/dashboard/StatCard";
// import UpcomingSessionsWidget from "../../features/sessions/components/UpcomingSessionsWidget";

// import { useMyMentorships } from "../../features/mentorships/hooks/useMyMentorships";

// export default function DashboardPage() {
//   const { data: mentorships } = useMyMentorships();

//   return (
//     <div className="space-y-8">
//       <section className="rounded-[32px] bg-gradient-to-r from-[#111827] to-[#1f2937] p-8 text-white shadow-sm">
//         <p className="text-sm text-gray-300">
//           Good morning 👋
//         </p>

//         <h1 className="mt-3 text-5xl font-bold tracking-tight">
//           Welcome back
//         </h1>

//         <p className="mt-4 max-w-xl text-gray-300">
//           Continue your mentorship journey and
//           track your learning progress.
//         </p>
//       </section>

//       <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
//         <StatCard
//           title="Total Sessions"
//           value="12"
//           subtitle="3 upcoming this week"
//         />

//         <StatCard
//           title="Mentors Connected"
//           value={String(mentorships?.length ?? 0)}
//           subtitle="Across different domains"
//         />

//         <StatCard
//           title="Completed"
//           value="8"
//           subtitle="Strong learning consistency"
//         />
//       </section>

//       <div className="rounded-3xl bg-white p-6 shadow-sm">
//         <h2 className="text-xl font-bold">Upcoming Sessions</h2>

//         <div className="mt-6">
//           <UpcomingSessionsWidget userRole="MENTEE" />
//         </div>
//       </div>
//     </div>
//   );
// }