import {
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";

import ErrorPage from "../pages/ErrorPage";

export default function RouteErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorPage
        title={`${error.status} ${error.statusText}`}
        description={
          error.data?.message ||
          "Route error occurred."
        }
      />
    );
  }

  return (
    <ErrorPage
      title="Application Error"
      description={
        error?.message ||
        "Unexpected error occurred."
      }
    />
  );
}