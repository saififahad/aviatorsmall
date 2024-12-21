import React, { useState, useEffect } from "react";

const MainInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <button
      className="install-buttoninstall-button"
      onClick={handleInstall}
      style={styles.installButton}
    >
      Install App
    </button>
  );
};

const styles = {
  installButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#ffba00",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    outline: "none",
  },
};

export default MainInstallButton;
