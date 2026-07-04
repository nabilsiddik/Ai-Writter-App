// "use client";

// import { useEffect } from "react";

// export default function ExtensionHandshake() {
//   useEffect(() => {
//     const handleResponse = (event: any) => {
//       const detectedId = event.detail.id;
//       if (detectedId) {
//         window.sessionStorage.setItem("DETECTED_EXT_ID", detectedId);
//         console.log("Extension ID captured:", detectedId);
//       }
//     };

//     window.addEventListener("AICANDY_SEND_ID", handleResponse);

//     const ping = () => {
//       const event = new CustomEvent("AICANDY_PING_EXT");
//       document.dispatchEvent(event);
//     };

//     ping();
//     const retryPing = setTimeout(ping, 1000);

//     return () => {
//       window.removeEventListener("AICANDY_SEND_ID", handleResponse);
//       clearTimeout(retryPing);
//     };
//   }, []);

//   return null;
// }

"use client";

import { useEffect } from "react";

export default function ExtensionHandshake() {
  useEffect(() => {
    const saveId = (id: string) => {
      window.sessionStorage.setItem("DETECTED_EXT_ID", id);
      console.log("✅ Extension ID captured in Storage:", id);
    };

    // 1. Check if the ID is already in the HTML (Injected by extension)
    const existingId = document.documentElement.getAttribute(
      "data-aicandy-extension-id",
    );
    if (existingId) saveId(existingId);

    // 2. Listener for the Extension's response
    const handleResponse = (event: any) => {
      if (event.detail.id) saveId(event.detail.id);
    };

    window.addEventListener("AICANDY_SEND_ID", handleResponse);

    // 3. THE PING: Ask the extension to identify itself
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
