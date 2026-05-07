import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";

import { store } from "./store";
import { queryClient } from "../query/queryClient";

import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-right" />
      </QueryClientProvider>
    </Provider>
  );
}