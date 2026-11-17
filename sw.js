var C="cero-v6",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable-512.png","bg1.jpg","bg2.jpg","bg3.jpg","logo.png","icon-instagram.png","icon-tiktok.png","icon-whatsapp.png","icon-youtube.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){
 var r=e.request,u=new URL(r.url);
 if(r.method!=="GET"||u.origin!==location.origin)return; /* el stream nunca se cachea */
 if(r.mode==="navigate"){e.respondWith(fetch(r).then(function(x){var c=x.clone();caches.open(C).then(function(h){h.put(r,c)});return x}).catch(function(){return caches.match(r).then(function(m){return m||caches.match("index.html")})}));return}
 e.respondWith(caches.match(r).then(function(m){return m||fetch(r)}));
});
