// import Spinner from "../../components/ui/Spinner";
// import EmptyState from "../../components/ui/EmptyState";

// import MentorCard from "../../features/mentors/components/MentorCard";

// import { useMentors } from "../../features/mentors/hooks/useMentors";

// export default function MentorsPage() {
//   const {
//     data: mentors,
//     isLoading,
//     isError,
//   } = useMentors();

//   if (isLoading) {
//     return <Spinner />;
//   }

//   if (isError) {
//     return (
//       <EmptyState
//         title="Failed to load mentors"
//         description="Please try again later."
//       />
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-4xl font-bold tracking-tight">
//           Discover Mentors
//         </h1>

//         <p className="mt-2 text-gray-500">
//           Find experts to guide your journey.
//         </p>
//       </div>

//       {mentors?.length === 0 ? (
//         <EmptyState
//           title="No mentors found"
//           description="No mentors are available right now."
//         />
//       ) : (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//           {mentors.map((mentor) => (
//             <MentorCard
//               key={mentor.id}
//               mentor={mentor}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }