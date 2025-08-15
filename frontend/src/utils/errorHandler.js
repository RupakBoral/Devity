export const handleApiError = (error, navigate) => {
  let errorCode = "500";
  let errorMessage = "Something went wrong";

  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    errorCode = status.toString();

    switch (status) {
      case 400:
        errorMessage = "Bad request";
        break;
      case 401:
        errorMessage = "Unauthorized access";
        break;
      case 403:
        errorMessage = "Access forbidden";
        break;
      case 404:
        errorMessage = "Resource not found";
        break;
      case 500:
        errorMessage = "Server error";
        break;
      default:
        errorMessage = error.response.data?.message || "Request failed";
    }
  } else if (error.request) {
    // Network error
    errorCode = "NETWORK";
    errorMessage = "Network error. Please check your connection.";
  } else {
    // Other error
    errorCode = "ERROR";
    errorMessage = error.message || "An unexpected error occurred";
  }

  // Navigate to error page with error details
  navigate(
    `/error?code=${errorCode}&message=${encodeURIComponent(errorMessage)}`
  );
};

export const handleRouteError = (
  navigate,
  code = "404",
  message = "Page not found"
) => {
  navigate(`/error?code=${code}&message=${encodeURIComponent(message)}`);
};
