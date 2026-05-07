import { useDispatch, useSelector } from "react-redux";

import {
  clearUser,
  setLoading,
  setUser,
} from "../redux/auth/authSlice";

import { getCurrentUser } from "../features/auth/api/getCurrentUser";

export default function useAuth() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const restoreSession = async () => {
    try {
      dispatch(setLoading(true));

      const response = await getCurrentUser();

      dispatch(setUser(response.data));
    } catch (error) {
      dispatch(clearUser());
    }
  };

  return {
    ...auth,
    restoreSession,
  };
}