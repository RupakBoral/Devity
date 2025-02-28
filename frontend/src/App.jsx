import Body from "./Components/Body";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import SignUp from "./Components/SignUp";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./Components/Feed";
import Error from "./Components/Error";
import Home from "./Components/Home";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";

function App() {
  return (
    <div>
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
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
