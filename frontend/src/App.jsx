import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { appStore, persistor } from "./utils/appStore";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shimmer from "./Components/utils/Shimmer";

const Body = lazy(() => import("./Components/Body"));
const Login = lazy(() => import("./Components/Auth/Login"));
const Profile = lazy(() => import("./Components/Profile/Profile"));
const SignUp = lazy(() => import("./Components/Auth/SignUp"));
const Feed = lazy(() => import("./Components/Page/Feed"));
const ErrorPage = lazy(() => import("./Components/utils/ErrorPage"));
const Home = lazy(() => import("./Components/Page/Home"));
const Connections = lazy(() => import("./Components/Page/Connections"));
const Requests = lazy(() => import("./Components/Page/Requests"));
const AboutMe = lazy(() => import("./Components/Page/AboutMe"));
const Chat = lazy(() => import("./Components/Page/Chat"));
const Projects = lazy(() => import("./Components/Page/Projects"));
const Communitites = lazy(() =>
  import("./Components/Page/Communities/Communitites")
);
const ViewProfile = lazy(() => import("./Components/Profile/ViewProfile"));

function App() {
  return (
    <div className="p-0 m-0 bg-gradient-to-t to-base-300 from-base-accent">
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<Shimmer />}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Body />}>
                  <Route path="/" element={<Feed />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/signUp" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile-view" element={<ViewProfile />} />
                  <Route path="/connections" element={<Connections />} />
                  <Route path="/requests" element={<Requests />} />
                  <Route path="/aboutMe" element={<AboutMe />} />
                  <Route path="/chat/:receiverId" element={<Chat />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/communities" element={<Communitites />} />
                  <Route
                    path="*"
                    element={
                      <ErrorPage
                        errorCode="404"
                        errorMessage="Page not found"
                      />
                    }
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </Suspense>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
