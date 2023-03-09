var version = "v3" // increase for new version
var staticCacheName = version + "_pwa-static";
var dynamicCacheName = version + "_pwa-dynamic";

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    if (!cacheName.startsWith(staticCacheName) &&
                        !cacheName.startsWith(dynamicCacheName)) {
                        return true;
                    }
                }).map(function(cacheName) {
                    console.log('Removing old cache.', cacheName);
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    if (!cacheName.startsWith(staticCacheName) &&
                        !cacheName.startsWith(dynamicCacheName)) {
                        return true;
                    }
                }).map(function(cacheName) {
                    // completely deregister for ios to get changes too
                    console.log('deregistering Serviceworker')
                    if ('serviceWorker' in navigator) {
                        navigator.serviceWorker.getRegistrations().then(function(registrations) {
                            registrations.map(r => {
                                r.unregister()
                            })
                        })
                        window.location.reload(true)
                    }

                    console.log('Removing old cache.', cacheName);
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

if ('serviceWorker' in navigator) {
   await this.setState({ loadingMessage: 'Updating Your Experience' })
   navigator.serviceWorker.getRegistrations().then(function(registrations) {
    registrations.map(r => {
      r.unregister()
    })
   })
   await AsyncStorage.setItem('appVersion', this.state.serverAppVersion)
   window.location.reload(true)
  } 