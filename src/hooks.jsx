import { useEffect } from "react";
import { useState } from "react";

const useScript = (src, onLoad) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    const scriptEle = document.createElement("script");
    scriptEle.async = true;
    scriptEle.defer = true;
    scriptEle.type = "text/javascript";
    scriptEle.src = src;
    scriptEle.onload = () => {
      setIsLoaded(true);
    };
    body.appendChild(scriptEle);
    return () => {
      body.removeChild(scriptEle);
    };
  }, [src]);

  useEffect(() => {
    if (!isLoaded) return;
    onLoad();
  }, [isLoaded, onLoad]);

  return isLoaded;
};

const useEvents = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    let ignore = false;
    const fetchAndSetEvents = async () => {
      try {
        const request = {
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: "startTime",
        };
        const response = await window.gapi.client.calendar.events.list(request);
        if (ignore) return;
        setEvents(response.result.items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAndSetEvents();
    return () => {
      ignore = true;
    };
  }, [setEvents]);
  return [events, setEvents];
};

export { useScript, useEvents };
