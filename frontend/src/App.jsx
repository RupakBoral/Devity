import Body from "./Components/Body";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Profile from "./Components/Profile/Profile";
import SignUp from "./Components/Auth/SignUp";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./Components/Page/Feed";
import Error from "./Components/utils/Error";
import Home from "./Components/Page/Home";
import Connections from "./Components/Page/Connections";
import Requests from "./Components/Page/Requests";
import AboutMe from "./Components/Page/AboutMe";
import Chat from "./Components/Page/Chat";
import Projects from "./Components/Page/Projects";

function App() {
  return (
    <div className="p-0 m-0">
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/home" element={<Home />} />
              <Route path="/error" element={<Error />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/aboutMe" element={<AboutMe />} />
              <Route path="/chat/:receiverId" element={<Chat />} />
              <Route path="/projects" element={<Projects />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
