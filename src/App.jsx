import { useState } from "react";
import "./App.css";
import GoogleAuthButton from "./components/GoogleAuthButton";
import EventDashboard from "./components/EventDashboard";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const setIsAuthorizedTrue = () => setIsAuthorized(true);
  const setIsAuthorizedFalse = () => setIsAuthorized(false);

  return (
    <main>
      <h1>App</h1>
      <GoogleAuthButton
        isAuthorized={isAuthorized}
        onSignIn={setIsAuthorizedTrue}
        onSignOut={setIsAuthorizedFalse}
      />
      {isAuthorized && <EventDashboard />}
    </main>
  );
}

export default App;
