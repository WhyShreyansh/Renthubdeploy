// ---------------------------------------------------------------------------
// config.js  — auto-detects environment and sets window.BACKEND_URL
// This file must be loaded FIRST in every HTML page, before api.js.
// ---------------------------------------------------------------------------
(function () {
  const hostname = window.location.hostname;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    window.BACKEND_URL = 'http://localhost:5000';
  } else {
    window.BACKEND_URL = 'https://renthubdeploy-2.onrender.com';
  }
})();
