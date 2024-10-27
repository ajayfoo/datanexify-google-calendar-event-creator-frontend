import { useRef } from "react";
import { useScript } from "../../hooks";
import PropTypes from "prop-types";

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = `https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events`;

async function initializeGapiClient() {
  await window.gapi.client.init({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
}

function gapiLoaded() {
  window.gapi.load("client", initializeGapiClient);
}

function GoogleAuthButton({ isAuthorized, onSignIn, onSignOut }) {
  const isGApiLoaded = useScript(
    import.meta.env.VITE_GOOGLE_API_LIB_URL,
    gapiLoaded
  );
  const isGisLoaded = useScript(
    import.meta.env.VITE_GOOGLE_GIS_CLIENT_URL,
    gisLoaded
  );
  const tokenClient = useRef(null);

  function gisLoaded() {
    const newTokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: SCOPES,
      callback: "", // defined later
    });
    tokenClient.current = newTokenClient;
    // TODO: do something here
  }

  function handleAuthClick() {
    tokenClient.current.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      onSignIn();
    };

    if (window.gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.current.requestAccessToken({ prompt: "consent" });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.current.requestAccessToken({ prompt: "" });
    }
  }

  function handleSignoutClick() {
    const token = window.gapi.client.getToken();
    if (token !== null) {
      window.gapi.client.setToken("");
    }
    onSignOut();
  }

  if (isAuthorized) {
    return (
      <button type="button" onClick={handleSignoutClick}>
        Sign Out
      </button>
    );
  }
  return isGApiLoaded && isGisLoaded ? (
    <button type="button" onClick={handleAuthClick}>
      Authorize
    </button>
  ) : (
    "Loading"
  );
}

GoogleAuthButton.propTypes = {
  isAuthorized: PropTypes.bool,
  onSignIn: PropTypes.func,
  onSignOut: PropTypes.func,
};

export default GoogleAuthButton;
