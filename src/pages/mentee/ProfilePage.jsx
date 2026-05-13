// import { useEffect } from "react";

// import { useForm } from "react-hook-form";

// import Spinner from "../../components/ui/Spinner";
// import Input from "../../components/ui/Input";
// import Button from "../../components/ui/Button";
// import Card from "../../components/ui/Card";
// import EmptyState from "../../components/ui/EmptyState";

// import { useMyProfile } from "../../features/users/hooks/useMyProfile";

// import { useUpdateProfile } from "../../features/users/hooks/useUpdateProfile";

// export default function ProfilePage() {
//   const {
//     data: profile,
//     isLoading,
//     isError,
//   } = useMyProfile();

//   const {
//     mutateAsync: updateProfile,
//     isPending,
//   } = useUpdateProfile();

//   const {
//     register,
//     handleSubmit,
//     reset,
//   } = useForm();

//   useEffect(() => {
//     if (profile) {
//       reset({
//         name: profile.name || "",
//         email: profile.email || "",
//       });
//     }
//   }, [profile, reset]);

//   const onSubmit = async (values) => {
//     await updateProfile(values);
//   };

//   if (isLoading) {
//     return <Spinner />;
//   }

//   if (isError || !profile) {
//     return (
//       <EmptyState
//         title="Failed to load profile"
//         description="Please try again later."
//       />
//     );
//   }

//   return (
//     <div className="mx-auto max-w-3xl">
//       <Card>
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold tracking-tight">
//             My Profile
//           </h1>

//           <p className="mt-2 text-gray-500">
//             Manage your personal information.
//           </p>
//         </div>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-6"
//         >
//           <Input
//             label="Full Name"
//             {...register("name")}
//           />

//           <Input
//             label="Email"
//             type="email"
//             {...register("email")}
//           />

//           <Button
//             type="submit"
//             disabled={isPending}
//           >
//             {isPending
//               ? "Saving..."
//               : "Save Changes"}
//           </Button>
//         </form>
//       </Card>
//     </div>
//   );
// }