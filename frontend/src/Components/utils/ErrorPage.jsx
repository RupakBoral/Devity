/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ errorCode, errorMessage }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full rounded-lg shadow-md p-8 text-center bg-secondary">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-red-400 mb-2">{errorCode}</h1>
          <h2 className="text-xl font-semibold text-gray-200 mb-4">
            {errorMessage}
          </h2>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </button>

          <button
            onClick={handleGoBack}
            className="cursor-pointer w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
