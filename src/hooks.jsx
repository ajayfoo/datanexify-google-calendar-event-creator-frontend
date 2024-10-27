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

export { useScript };
