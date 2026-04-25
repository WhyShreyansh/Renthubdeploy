// ---------------------------------------------------------------------------
// config.js  — auto-detects environment and sets window.BACKEND_URL
// This file must be loaded FIRST in every HTML page, before api.js.
// ---------------------------------------------------------------------------
(function () {
  const hostname = window.location.hostname;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Local development
    window.BACKEND_URL = 'http://localhost:5000';
  } else {
    // Production — replace this with your actual Render backend URL
    // e.g. https://rental-app-backend.onrender.com
    window.BACKEND_URL = 'REPLACE_WITH_RENDER_BACKEND_URL';
  }
})();
