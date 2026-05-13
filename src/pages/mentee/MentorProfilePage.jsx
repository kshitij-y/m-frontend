// import { useParams } from "react-router-dom";

// import Spinner from "../../components/ui/Spinner";
// import EmptyState from "../../components/ui/EmptyState";

// import PlanCard from "../../features/mentors/components/PlanCard";

// import { useMentor } from "../../features/mentors/hooks/useMentor";
// import { useMentorPlans } from "../../features/mentors/hooks/useMentorPlans";

// import { useBookMentorship } from "../../features/mentorships/hooks/useBookMentorship";

// export default function MentorProfilePage() {
//   const { id } = useParams();

//   const {
//     bookMentorship,
//     isPending,
//   } = useBookMentorship();

//   const {
//     data: mentor,
//     isLoading: mentorLoading,
//   } = useMentor(id);

//   const {
//     data: plans,
//     isLoading: plansLoading,
//   } = useMentorPlans(id);

//   if (mentorLoading || plansLoading) {
//     return <Spinner />;
//   }

//   if (!mentor) {
//     return (
//       <EmptyState
//         title="Mentor not found"
//         description="This mentor does not exist."
//       />
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <section className="rounded-[32px] bg-white p-8 shadow-sm">
//         <div className="flex items-start gap-6">
//           <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black text-3xl font-bold text-white">
//             {mentor.name?.charAt(0)}
//           </div>

//           <div>
//             <h1 className="text-4xl font-bold">
//               {mentor.name}
//             </h1>

//             <p className="mt-2 text-lg text-gray-500">
//               {mentor?.mentorProfile?.headline ||
//                 "Mentor"}
//             </p>

//             <p className="mt-5 max-w-3xl text-gray-600">
//               {mentor?.mentorProfile?.about ||
//                 "No bio available."}
//             </p>

//             <div className="mt-6 flex flex-wrap gap-2">
//               {mentor?.mentorProfile?.expertise?.map((item) => (
//                 <span
//                   key={item.id}
//                   className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600"
//                 >
//                   {item.name}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section>
//         <div className="mb-6">
//           <h2 className="text-3xl font-bold">
//             Mentorship Plans
//           </h2>

//           <p className="mt-2 text-gray-500">
//             Choose a mentorship plan that fits your goals.
//           </p>
//         </div>

//         {!plans || plans.length === 0 ? (
//           <EmptyState
//             title="No plans available"
//             description="This mentor has not published plans yet."
//           />
//         ) : (
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//             {plans.map((plan) => (
//               <PlanCard
//                 key={plan.id}
//                 plan={plan}
//                 isPending={isPending}
//                 onBook={() =>
//                   bookMentorship({
//                     mentorId: mentor.id,
//                     planId: plan.id,
//                   })
//                 }
//               />
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }