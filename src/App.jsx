import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./app/router";

import useAuth from "./hooks/useAuth";

function App() {
  const { restoreSession } = useAuth();

  useEffect(() => {
    restoreSession();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;