import { useState } from "react";
import "./App.css";
import GoogleAuthButton from "./components/GoogleAuthButton";
import EventList from "./components/EventList";

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
      {isAuthorized && <EventList />}
    </main>
  );
}

export default App;
