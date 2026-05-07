import { useMutation } from "@tanstack/react-query";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { clearUser } from "../../../redux/auth/authSlice";

import { logoutUser } from "../api/logoutUser";

export function useLogout() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      dispatch(clearUser());

      toast.success("Logged out successfully");

      navigate("/login");
    },

    onError: () => {
      toast.error("Failed to logout");
    },
  });
}