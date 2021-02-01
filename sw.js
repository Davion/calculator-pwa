const staticCascheName = "calculator-app-static-v4";
const assets = [
    "/calculator-pwa/",
    "/calculator-pwa/index.html",
    "/calculator-pwa/css/normalize.css",
    "/calculator-pwa/css/reset.css",
    "/calculator-pwa/css/styles.css",
    "/calculator-pwa/js/main.js",
    "/calculator-pwa/icons/calc-screenshoot.png",
    "https://fonts.googleapis.com/css?family=Roboto:300,400,700"
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(staticCascheName).then(cache => {
        cache.addAll(assets);
        console.log("service worker installed -- assets cached");
      }).catch(err => console.log("issue caching assets on install - ", err))
    );
  });
  
  self.addEventListener("activate", activateEvent => {
    // console.log("service worker activated");
    activateEvent.waitUntil(
      caches.keys().then(keys => {
        console.log("service worker activated");
        return Promise.all(keys
          .filter(key => key !== staticCascheName)
          .map(key => caches.delete(key))
        )
      }).catch(err => console.log("issue getting cacheKeys on activate - ", err))
    );
  });
  
  self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.open(staticCascheName).then(cache => {
        console.log("fetching from service worker");
        return cache.match(fetchEvent.request).then(res => res || fetch(fetchEvent.request)
          .then(networkRes => {
            console.log("puting network response to cache");
            cache.put(fetchEvent.request, networkRes.clone());
            return networkRes;
          })
        ).catch(() => {
          if(fetchEvent.request.url.indexOf(".html") > -1 || fetchEvent.request.url === "https://github.com/Davion"){
            return caches.match("/todo-app-js-pwa/fallback.html");
          }
        })
      }).catch(err => console.log("issue opening cache on fetch", err))
    );
  });