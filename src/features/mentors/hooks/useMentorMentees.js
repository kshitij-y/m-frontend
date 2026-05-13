import { useQuery } from "@tanstack/react-query";

import { getMentorMentees } from "../api/getMentorMentees";

import { queryKeys } from "../../../query/queryKeys";


export function useMentorMentees() {
    return useQuery({
        queryKey:
            queryKeys.sessions.mentees,

        queryFn: async () => {
            const response =
                await getMentorMentees();
            console.log(
                "MENTEE RESPONSE:",
                response
            );
            return response.data;
        },
    });
}