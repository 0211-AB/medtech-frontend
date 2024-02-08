import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen/ResetPasswordScreen";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import AuthContext from "./store/AuthContext";
import { useContext } from "react";
import TranscriptDetailScreen from "./screens/TranscriptDetailScreen/TranscriptDetailScreen";
import SettingsScreen from "./screens/SettingsScreen/SettingsScreen";
import UserScreen from "./screens/UserScreen/UserScreen";
import OrgScreen from "./screens/OrgScreen/OrgScreen";
import UploadScreen from "./screens/UploadScreen/UploadScreen";
import PromptScreen from "./screens/PromptScreen.js/PromptsScreen";

function App() {
  const authCtx = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authCtx.isLoggedIn === true ? (
          <HomeScreen />
        ) : (
          <Navigate to="/login" />
        )
        } />
        <Route path="/transcript-details" element={authCtx.isLoggedIn === true ? (
          <TranscriptDetailScreen />
        ) : (
          <Navigate to="/" />
        )
        } />
        <Route path="/settings" element={authCtx.isLoggedIn === true && (authCtx.isAdmin || authCtx.isSuperAdmin) === true ? (
          <SettingsScreen />
        ) : (
          <Navigate to="/" />
        )
        } />
        <Route path="/users" element={authCtx.isLoggedIn === true && (authCtx.isAdmin || authCtx.isSuperAdmin) === true ? (
          <UserScreen />
        ) : (
          <Navigate to="/" />
        )
        } />
        <Route path="/organizations" element={authCtx.isLoggedIn === true && authCtx.isSuperAdmin === true ? (
          <OrgScreen />
        ) : (
          <Navigate to="/" />
        )
        } />
        <Route path="/upload" element={authCtx.isLoggedIn === true ? (
          <UploadScreen />
        ) : (
          <Navigate to="/" />
        )
        } />
        <Route path="/prompt" element={authCtx.isLoggedIn === true && authCtx.isAdmin === true ? (
          <PromptScreen />
        ) : (
          <Navigate to="/" />
        )
        } />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
