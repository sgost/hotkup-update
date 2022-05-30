var currentStaticVersion = 'static-v5';

self.addEventListener('install', evt => {
  console.log("service worker has been installed from war", evt);

  evt.waitUntil(
    caches.open(currentStaticVersion)
          .then(function(cache){
              cache.addAll([
                '/home',
                '/resources/js/plugins/app/af702.min.js',
                '/resources/js/plugins/app/chunk-vendors.min.js',
                '/resources/js/plugins/app/chunk-vendors.min.js',
                'https://unpkg.com/comlink/dist/umd/comlink.js',
                '/resources/js/fontawesome/all.js',
                '/resources/js/jquery/jquery-3.1.1.min.js',
                //'/resources/js/momentjs/momentjs.js',
                '/resources/js/uikit-icons.min.js',
                '/resources/js/uikit.min.js',
                '/resources/js/fullcalendar/lib/main.js',
            // css files
                '/resources/css/uikit.min.css',
                'https://cdn.linearicons.com/free/1.0.0/icon-font.min.css',
                '/resources/js/fullcalendar/lib/main.css',
                '/resources/themes/app-skeleton.css',
                '/resources/themes/app.css',
                '/resources/themes/common.css',
                '/resources/themes/grid-list.css',
                'https://fonts.googleapis.com/css?family=Nunito&display=swap',
                '/resources/themes/sd-ui.css',
                '/resources/themes/hd-ui.css',
                '/resources/themes/uhd-ui.css',
                '/resources/themes/mobile-ui.css',
                '/resources/themes/tablet-ui.css',
                '/resources/themes/ld-ui.css',
            // image files
                '/resources/images/new_logo.svg',
                '/resources/images/refresh.svg',
                '/resources/images/pexels-lukas-317356.jpg',
                '/resources/images/pexels-photo-2457284.jpeg',
                // 'https://image.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg',
                '/resources/images/male_default_pic.png',
                '/resources/images/attachments.svg',
                '/resources/images/subtask.svg',
                '/resources/images/priority.svg',

            // Font files
                'https://cdn.linearicons.com/free/1.0.0/Linearicons-Free.woff2',
                'https://fonts.gstatic.com/s/nunito/v16/XRXV3I6Li01BKofINeaB.woff2',
                'https://fonts.gstatic.com/s/nunito/v16/XRXV3I6Li01BKofIOOaBXso.woff2'

            // audio files
                // 'http://localhost:9090/resources/audios/ding.wav',
                // 'http://localhost:9090/resources/audio/new_activity_notification.mp3',
                // 'http://localhost:9090/resources/audio/chat2.mp3',
                // 'http://localhost:9090/resources/audio/DING.WAV'


              ]);
          })
  );
});

self.addEventListener('activate', evt=>{
  console.log("service worker has been activated from war");

  evt.waitUntil(
    caches.keys()
          .then((keyList) => {
              return Promise.all(keyList.map((key) => {
                  if(key !== currentStaticVersion){
                    console.log("[Service worker] :: Removing old cache");
                    return caches.delete(key);
                  }
              }));
          })
  );

});

self.addEventListener('fetch', evt=>{
  // console.log('fetch event from sw', evt);
  evt.respondWith(
    caches.match(evt.request)
          .then((response) => {
              if (response) {
                // console.log("sw:fetch::Fetching from cache: ", evt);
                return response;
              }
              else {
                // console.log("sw:fetch::Fetching from server: ", evt);
                return fetch(evt.request);
              }
          })
  );
});

self.addEventListener('push', function(event) {
	  console.log('[Service Worker] Push Received.',event);
	  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
	  console.log("event.data.json()",event.data.json());

	  const title = 'Hotkup.com';
	  const options = {
	    body: event.data.json().msg,
	    icon: 'resources/images/icons/icon-512x512.png',
	    badge: 'images/badge.png'
	  };

	  event.waitUntil(self.registration.showNotification(title, options));
	});

//
// self.addEventListener('install', evt=>{
//   //console.log("service worker has been installed - static");
// });
//
// self.addEventListener('activate', evt=>{
//   //console.log("service worker has been activated - static");
// });
//
// self.addEventListener('fetch', evt=>{
//   // console.log('fetch event', evt);
// });

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.',event);
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  console.log("event.data.json()",event.data.json());

  clients.openWindow(event.srcElement.location.origin + "/home#/playsound");

  const title = 'Hotkup is live';
  const options = {
    vibrate: [0, 100, 200, 100, 200, 100, 200, 100, 200, 100, 200, 100, 200, 100, 200, 100,0, 100, 200, 100, 200, 100, 200],
    sound : "https://taskone.app/resources/audios/traditional_phone.wav",
    requireInteraction:true,
    body: event.data.json().conferenceName + " is LIVE",
    data : "12345",
    icon: 'resources/images/icons/icon-152x152c.png',
    badge: 'images/badge.png',
    actions: [
       {
             action: 'join-conference',
             title: 'JOIN',
             conferenceId: "123"
       },
       {
             action: 'ignore-conference',
             title: 'IGNORE'
       }]
  };

//  var audioElement = new Media('https://taskone.app/resources/audios/traditional_phone.wav');
//	      audioElement.play();
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  if (!event.action) {
	    // Was a normal notification click
	    console.log('Notification Click.');
	    //alert("Notification Click");
	   return;
	  }

	  switch (event.action) {
	    case 'handle-notification-click':
	      event.notification.close();
	      console.log('User clicked Notification', event);

	      self.clients.matchAll({
	          includeUncontrolled: true,
	          type: 'window',
	        }).then((clients) => {

	        	console.log("clients length : " + clients.length);
	          if (clients && clients.length) {
	            // Send a response - the clients
	            // array is ordered by last focused
	            clients[0].postMessage({"msg":"stopAudio"});
	            console.log("Posted msg from sw to client page");
	          }
	        });

	      //client.postMessage("stopAudio");
	      //console.log("window.globalObject = ", window.globalObject);
	      //console.log("client.globalObject = ", client.globalObject);

	      //clients.openWindow(event.srcElement.location.origin + "/home#/join-" + event.notification.data.conferenceId);
	      break;
	    case 'handle-notification-ignore':
	      console.log('User ignored notification');
	      break;
	    default:
	      console.log(`Unknown action clicked: '${event.action}'`);
	      break;
	  }
});
