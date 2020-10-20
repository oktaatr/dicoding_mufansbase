importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
if (workbox) {
  console.log('berhasil memasang workbox');
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/klasemensementara.html', revision: '1' },
    { url: '/pages/teamfavorite.html', revision: '1' },
    { url: '/pages/detailteam.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/icon.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/config-sw.js', revision: '1' },
    { url: '/js/controllerdb.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/services.js', revision: '1' },
    { url: '/js/setting-notification.js', revision: '1' },
    { url: '/images/logo.png', revision: '1' },
    { url: '/images/logo_192.png', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1' },


  ]);
  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );


  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
    workbox.strategies.staleWhileRevalidate()
  )

  // Caching Google Fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
    })
  );

} else {
  console.log('ada kesalahan sistem');
}

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: '/images/logo_192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});