import { useEffect, useRef } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../utils/userSlice";
import { homeSetting } from "../../utils/homeSlice";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { auth, firebase } from "../../utils/firebase";

const FirebaseUIAuth = () => {
  const uiRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const containerId = "firebaseui-auth-container";

    const uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: "/",
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          scopes: ["profile", "email"],
          customParameters: {
            prompt: "select_account",
          },
        },
      ],
      callbacks: {
        signInSuccessWithAuthResult: async (authResult) => {
          try {
            const user = authResult.user;
            const token = await user.getIdToken();

            console.log("Firebase UI Auth Success:", {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            });

            const res = await axios.post(
              BASE_URL + "/login",
              {
                emailId: user.email,
                googleToken: token,
                isGoogleAuth: true,
                userInfo: {
                  uid: user.uid,
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                },
              },
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            dispatch(addUser(res.data));
            dispatch(homeSetting(false));
            navigate("/");

            return false;
          } catch (error) {
            console.error("Error during authentication:", error);
            alert(
              "Authentication failed: " +
                (error.response?.data || error.message)
            );
            return false;
          }
        },
        signInFailure: (error) => {
          console.error("Firebase UI Sign-in failed:", error);
          alert("Sign-in failed: " + error.message);
        },
        uiShown: () => {
          const loader = document.getElementById("loader");
          if (loader) loader.style.display = "none";
        },
      },
    };

    const initializeUI = () => {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error("Firebase UI container not found");
        return;
      }

      try {
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
          ui = new firebaseui.auth.AuthUI(auth);
        }

        uiRef.current = ui;

        ui.reset();
        ui.start(`#${containerId}`, uiConfig);
      } catch (error) {
        console.error("Error initializing Firebase UI:", error);
      }
    };

    const timer = setTimeout(initializeUI, 100);

    return () => {
      clearTimeout(timer);
      if (uiRef.current) {
        try {
          uiRef.current.reset();
        } catch (error) {
          console.error("Error cleaning up Firebase UI:", error);
        }
      }
    };
  }, [dispatch, navigate]);

  return (
    <div className="w-full">
      <div id="loader" className="text-center py-4">
        Loading authentication...
      </div>
      <div id="firebaseui-auth-container" className="w-full"></div>
    </div>
  );
};

export default FirebaseUIAuth;
