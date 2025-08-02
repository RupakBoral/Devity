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

const FirebaseUISignUp = () => {
  const uiRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const containerId = "firebaseui-signup-container";

    const uiConfig = {
      signInFlow: "popup",
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

            console.log("Firebase UI SignUp Success:", {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            });

            const res = await axios.post(
              BASE_URL + "/signup",
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

            dispatch(addUser(res.data.data || res.data));
            dispatch(homeSetting(false));
            navigate("/");

            return false;
          } catch (error) {
            console.error("Error during signup:", error);
            if (
              error.response?.status === 400 &&
              error.response?.data?.includes("User already exists")
            ) {
              try {
                const loginRes = await axios.post(
                  BASE_URL + "/login",
                  {
                    emailId: authResult.user.email,
                    googleToken: await authResult.user.getIdToken(),
                    isGoogleAuth: true,
                    userInfo: {
                      uid: authResult.user.uid,
                      displayName: authResult.user.displayName,
                      photoURL: authResult.user.photoURL,
                    },
                  },
                  {
                    withCredentials: true,
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                dispatch(addUser(loginRes.data));
                dispatch(homeSetting(false));
                navigate("/");
                return false;
              } catch (loginError) {
                console.error("Error during auto-login:", loginError);
                alert("Authentication failed. Please try again.");
                return false;
              }
            } else {
              alert(
                "Signup failed: " + (error.response?.data || error.message)
              );
            }
            return false;
          }
        },
        signInFailure: (error) => {
          console.error("Firebase UI Sign-up failed:", error);
          alert("Sign-up failed: " + error.message);
        },
        uiShown: () => {
          const loader = document.getElementById("signup-loader");
          if (loader) loader.style.display = "none";
        },
      },
    };

    const initializeUI = () => {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error("Firebase UI signup container not found");
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
        console.error("Error initializing Firebase UI signup:", error);
      }
    };

    const timer = setTimeout(initializeUI, 100);

    return () => {
      clearTimeout(timer);
      if (uiRef.current) {
        try {
          uiRef.current.reset();
        } catch (error) {
          console.error("Error cleaning up Firebase UI signup:", error);
        }
      }
    };
  }, [dispatch, navigate]);

  return (
    <div className="w-full">
      <div id="signup-loader" className="text-center py-4">
        Loading authentication...
      </div>
      <div id="firebaseui-signup-container" className="w-full"></div>
    </div>
  );
};

export default FirebaseUISignUp;
