import Body from "./Components/Body";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Profile from "./Components/Profile/Profile";
import SignUp from "./Components/Auth/SignUp";
import { Provider } from "react-redux";
import { appStore, persistor } from "./utils/appStore";
import Feed from "./Components/Page/Feed";
import Error from "./Components/utils/Error";
import Home from "./Components/Page/Home";
import Connections from "./Components/Page/Connections";
import Requests from "./Components/Page/Requests";
import AboutMe from "./Components/Page/AboutMe";
import Chat from "./Components/Page/Chat";
import Projects from "./Components/Page/Projects";
import Communitites from "./Components/Page/Communitites";
import { PersistGate } from "redux-persist/integration/react";
import ViewProfile from "./Components/Profile/ViewProfile";

function App() {
  return (
    <div className="p-0 m-0">
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/" element={<Feed />} />
                <Route path="/home" element={<Home />} />
                <Route path="/error" element={<Error />} />
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
              </Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
