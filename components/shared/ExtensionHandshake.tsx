"use client";

import { useEffect } from "react";

export default function ExtensionHandshake() {
  useEffect(() => {
    const saveId = (id: string) => {
      window.sessionStorage.setItem("DETECTED_EXT_ID", id);
    };

    const existingId = document.documentElement.getAttribute(
      "data-aicandy-extension-id",
    );
    if (existingId) saveId(existingId);

    const handleResponse = (event: any) => {
      if (event.detail.id) saveId(event.detail.id);
    };

    window.addEventListener("AICANDY_SEND_ID", handleResponse);

    const ping = () => {
      document.dispatchEvent(new CustomEvent("AICANDY_PING_EXT"));
    };

    ping();
    const retryPing = setTimeout(ping, 1000);

    return () => {
      window.removeEventListener("AICANDY_SEND_ID", handleResponse);
      clearTimeout(retryPing);
    };
  }, []);

  return null;
}
