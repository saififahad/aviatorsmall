// import React, { useState, useEffect } from 'react';

// const InstallButton = () => {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);

//   useEffect(() => {
//     const handleBeforeInstallPrompt = (event) => {
//       event.preventDefault();
//       setDeferredPrompt(event);
//     };

//     window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

//     return () => {
//       window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
//     };
//   }, []);

//   const handleInstall = () => {
//     if (deferredPrompt) {
//       deferredPrompt.prompt();
//       deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted the install prompt');
//         }
//         setDeferredPrompt(null);
//       });
//     }
//   };

//   return (
//     <button className='install-buttoninstall-button' onClick={handleInstall} style={styles.installButton}>Install App</button>
//   );
// };

// const styles = {
//   installButton: {
//     padding: '10px 20px',
//     fontSize: '16px',
//     backgroundColor: '#ffba00',
//     color: '#000',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     outline: 'none',
//   },
// };

// export default InstallButton;

// import React, { useState, useEffect } from 'react';

// const InstallButton = () => {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);
//   const [showButton, setShowButton] = useState(true);

//   useEffect(() => {
//     const handleBeforeInstallPrompt = (event) => {
//       event.preventDefault();
//       setDeferredPrompt(event);
//     };

//     const detectDevice = () => {
//       const userAgent = navigator.userAgent.toLowerCase();
//       const isMobile = /iphone|ipad|ipod|android|windows phone/.test(userAgent);
//       const isTablet = /ipad|android/.test(userAgent);
//       return !(isMobile || isTablet);
//     };

//     setShowButton(detectDevice());

//     window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

//     // Check if the app is installed as a PWA
//     const mediaQueryList = window.matchMedia('(display-mode: standalone)');
//     const handleMediaQueryChange = (event) => {
//       setShowButton(!event.matches); // Hide the button if the app is installed as a PWA
//     };
//     mediaQueryList.addEventListener('change', handleMediaQueryChange);

//     return () => {
//       window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
//       mediaQueryList.removeEventListener('change', handleMediaQueryChange);
//     };
//   }, []);

//   const handleInstall = () => {
//     if (deferredPrompt) {
//       deferredPrompt.prompt();
//       deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted the install prompt');
//         }
//         setDeferredPrompt(null);
//       });
//     }
//   };

//   if (!showButton) {
//     return null; // Render nothing if not on a laptop/desktop or already installed as PWA
//   }

//   return (
//     <button className='install-buttoninstall-button' onClick={handleInstall} style={styles.installButton}>Install App</button>
//   );
// };

// const styles = {
//   installButton: {
//     padding: '10px 20px',
//     fontSize: '16px',
//     backgroundColor: '#ffba00',
//     color: '#000',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     outline: 'none',
//   },
// };

// export default InstallButton;
import React, { useState, useEffect } from 'react';

const InstallButton = () => {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstallButton(true); // Show install button when app is installable
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        setDeferredPrompt(null);
        setShowInstallButton(false); // Hide install button after user interaction
      });
    }
  };

  return (
    showInstallButton && (
      <button className='install-buttoninstall-button' onClick={handleInstall} style={styles.installButton}>
        Install App
      </button>
    )
  );
};

const styles = {
  installButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#ffba00',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none',
  },
};

export default InstallButton;