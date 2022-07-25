// import {bus} from '../../event_bus'
export default {
  methods: {

    // OBSOLETE logout
    logout() {



      // new
      console.log('User Logging out..');
      document.getElementById('loform').submit();
      console.log('Submitted.');

      const _this = this;



      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function (reg) {
          reg.pushManager.getSubscription().then(function (subscription) {
            if (subscription !== null) {
              subscription
                .unsubscribe()
                .then(function (successful) {
                  // You've successfully unsubscribed
                  console.log('Push Notifications unsubscribed.');
                  _this.isLoggingOut = true;
                  // Flag this so that the notificationsSocket doesn't try to reconnect.
                  _this.notificationsSocketDisconnect();
                  document.getElementById('loform').submit();
                })
                .catch(function (e) {
                  // Unsubscription failed
                  console.error('Push Notification unsubscribe error : ' + e);
                });
            } else {
              _this.isLoggingOut = true;
              // Flag this so that the notificationsSocket doesn't try to reconnect.
              _this.notificationsSocketDisconnect();
              document.getElementById('loform').submit();
            }
          });
        });
      }
    },
    getCookie: function (cname) {
      var name = cname + '=';
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    },
    getUserInfoCookie: function () {
      try {


        // if (window.location.origin !== "https://app.lazygenes.com" && window.location.origin !== "https://app.hotkup.com")
        // {
        //   this.loggedInUser = {
        //     userId: localStorage.getItem('id'), // userInfo.id,
        //     firstName: localStorage.getItem('firstName'), // userInfo.firstName,
        //     lastName: localStorage.getItem('lastName'), // userInfo.lastName,
        //     shortName: localStorage.getItem('firstName'), // userInfo.firstName,
        //     username: localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName'), // userInfo.firstName + ' ' + userInfo.lastName,
        //     isInformationFetchComplete: true
        //   };
        // }
        // else
        {

          const encodedUserInfo = this.getCookie('userInfo');
          const decodedUserInfoString = decodeURIComponent(encodedUserInfo);
          const userInfo = JSON.parse(decodedUserInfoString);

          this.loggedInUser = {
            userId: userInfo.id,
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            shortName: userInfo.firstName,
            username: userInfo.firstName + ' ' + userInfo.lastName,
            isInformationFetchComplete: true,
            tenantName: "Spring SPG Dummy Tenant" // userInfo.tenantId.split("#")[1].replaceAll("\+", " ")
          };
        }



        console.log('loggedInUser : ', this.loggedInUser);
        document.querySelector('body').style.display = 'grid';
        // $('#body').fadeIn(300).css('display', 'grid');
      } catch (e) {
        document.querySelector('body').style.display = 'grid';
        // $('#body').fadeIn(300).css('display', 'grid');
        console.error(
          'Unable to identify user session : error - ' +
          e +
          ', redirecting to login page'
        );

        // If we are unable to identify the user session, then we do a post logout manually since this form displays only if a valid user session is found. this.logout() expects formElement with id:loform, For invalid sessions, this returns null, so we inject the form here.
        // const formElement = document.createElement('form');
        //   formElement.setAttribute('action', '/logout');
        //   formElement.setAttribute('method', 'POST');
        //   formElement.setAttribute('id', 'loform');
        //   document.getElementById('body').appendChild(formElement);
        // this.logout();
        alert("error in spg js : " + e);
        window.location = "/login.html";

      }
    },
    getSessionInformation() {
      return new Promise(resolve => {

        // if (window.location.origin !== "https://app.lazygenes.com" && window.location.origin !== "https://app.hotkup.com")
        // {
        //   if (localStorage.getItem('authToken')) {
        //     axios.defaults.headers.common.Authorization = localStorage.getItem('authToken');
        //   }
        //   else {
        //     alert('Invalid Login error');
        //     return false;
        //   }
        // }


        this.getUserInfoCookie();

        const encodedSPR = this.getCookie('spr');
        const decodedSPR = decodeURIComponent(encodedSPR);
        this.showMenu1 = decodedSPR === 'jvsb$kdwbj$matiu';
        this.showMenu2 = decodedSPR === 'jvsb$matiu';

        const encodedICA = this.getCookie('ica');
        const decodedICA = decodeURIComponent(encodedICA);
        this.showMenu3 = decodedICA === 'jvsb$ovuc$matiu';
        resolve('resolved');
      });
    },
    // Obsolete Method
    toggleOnlineStatus: function () {
      console.log(
        'toggleOnlineStatus called ..' + this.userId + '/' + this.username
      );
      this.isOnline = !this.isOnline;
      const _this_component = this;

      // alert(_this_component.userId +"/" + _this_component.username);
      if (!this.isOnline) {
        this.toggleOnlineText = 'OFFLINE';
        this.toggleOnlineCommandText = 'Go Online';
        this.callStatus = 'not-connected';

        this.event_handleToggleOnlineStatus({
          isOnline: false,
          userId: _this_component.userId,
          username: _this_component.username
        });
      } else {
        this.toggleOnlineText = 'ONLINE';
        this.toggleOnlineCommandText = 'Go Offline';

        this.event_handleToggleOnlineStatus({
          isOnline: true,
          userId: _this_component.userId,
          username: _this_component.username
        });
      }
    },
    event_handleToggleOnlineStatus: function (event) {
      if (!event.isOnline && this.signalingSocketObject.socket !== null) {
        // this.cp_endCall();
        this.closeSocketConnection();
        // close the websocket connection.
        this.signalingSocketObject.socket = null;
      } else {
        this.sso_initialize(event);
      }
    },
    // Notification Socket module
    notificationsSocketReconnect: function () {
      // new
      this.notificationSocketReconnectionAttemptCount += 1;

      if (this.notificationSocketReconnectionAttemptCount < 5) {
        this.notificationsSocketConnect();
      }
    },
    notificationsSocketConnect: function () {
      // new
      const _this = this;
      let url = '';
      let socketOpenTime = null;
      let heartbeat_signal_timer = null;

      if (window.location.hostname === 'vc.taskone.app') {
        url = 'wss://discussions.taskone.app/nsocket';
      } else {
        url = 'ws://' + window.location.hostname + ':5050/nsocket';
      }

      if (window.location.hostname.indexOf('ngrok.io') > -1) {
        url = 'wss://c01f120ac195.ngrok.io/nsocket';
      }

      // console.log("connecting to " + url);
      this.notificationsSocket = new WebSocket(url);

      this.notificationsSocket.onopen = function () {
        socketOpenTime = new Date();
        // alert("socket open");
        // _this.logOrange("Socket ID : " + socketOpenTime.getTime() + ", opened @ " + socketOpenTime.toLocaleString());
        // _this.logOrange("Connection Established to Notifications Service.." + url);
        _this.log2Strings('NSocket Service ', 'Connection Established.');
        // document.getElementById("speed_indicator").innerHTML = "socket open";
        heartbeat_signal_timer = setInterval(
          function () {
            // console.log("♥️ ♥️ NotificationsSocket HeartBeat ♥️ ♥️ @" + new Date().toLocaleString() + ", socketID : " + socketOpenTime.getTime());
            var jsonMessage = {
              type: 'heartbeat_signal',
              payload: 'sending a heartbeat_signal'
            };
            _this.notificationsSocket.send(JSON.stringify(jsonMessage, '', ''));
          },
          30000
        );
      };

      this.notificationsSocket.onerror = function (event) {
        // _this.logOrange("Socket Connection Error to " , event);
        _this.log2StringsError(
          'NSocket Service ',
          'Connection Establishment Failed.'
        );

        document.getElementById('speed_indicator').innerHTML = event;
      };

      this.notificationsSocket.onmessage = function (event) {
        try {
          const data = JSON.parse(event.data);
          // console.log("Received msg from notification-service on ws: ", data.type);
          if (data.type === 'msg' || data.type.startsWith('info')) {
            console.log(data.type + ' : ', data);
          } else if (data.type === 'conference-is-live') {
            // Do Nothing since the failed-incoming-call feature.
            return false;

            // If user already inside this conference-view, then don't show notification.
            if (_this.loggedInUser.userId === '5ebd035b57f07906052d9c54') {
              return false;
            }

            console.log(data.type + ' : ', data);

            _this.audioElement = new Audio(
              'resources/audios/traditional_phone.wav'
            );
            // document.getElementById("conferenceCallRingtoneAudio");
            _this.audioElement.play();

            navigator.serviceWorker.addEventListener('message', event => {
              console.log('Received msg from serviceWorker', event);

              if (event.data.msg === 'stopAudio') {
                _this.audioElement.pause();
                console.log(
                  'stopAudio cmd received from sw',
                  _this.audioElement
                );
                // audioElement.pause();
              }
            });

            var globalObject = { test: '123' };
            console.log('globalObject = ', globalObject);

            const conferenceId = data.payload.split('#')[0];
            const conferenceName = data.payload.split('#')[1];
            const notificationData = { conferenceId: conferenceId };

            const options = {
              vibrate: [
                0,
                100,
                200,
                100,
                200,
                100,
                200,
                100,
                200,
                100,
                200,
                100,
                200,
                100,
                200,
                100,
                0,
                100,
                200,
                100,
                200,
                100,
                200
              ],
              sound: 'https://vc.taskone.app/resources/audios/traditional_phone.wav',
              requireInteraction: true,
              body: conferenceName + ' is LIVE now..',
              data: notificationData,
              icon: 'resources/images/icons/icon-152x152c.png',
              badge: 'images/badge.png',
              actions: [
                { action: 'join-conference', title: 'JOIN' },
                { action: 'ignore-conference', title: 'IGNORE' }
              ]
            };

            // serviceWorker.showNotification('Conference is LIVE', options);
            // var notification = new Notification("Conference is LIVE", options);
          } else {
          }
        } catch (e) {
          console.error(e);
        }
      };

      this.notificationsSocket.onclose = function (event) {
        // alert('Info: Closing Socket Connection.');
        window.clearInterval(heartbeat_signal_timer);
        console.log('ALERT: Closing Notifications Socket Connection...');
        _this.logOrange(
          'NSocket ID : ' +
          socketOpenTime.getTime() +
          ', opened @ ' +
          socketOpenTime.toLocaleString() +
          ', closed at : ' +
          new Date().toLocaleString()
        );
        // document.getElementById("speed_indicator").innerHTML = "socket closed";
        if (!_this.isLoggingOut)
        // If the socket is not disconnected via a logout action, then try to reconnect.
        {
          _this.notificationsSocketReconnect();
        }

        window.addEventListener('online', function (e) {
          console.log(
            'Looks like Internet is back again.. attempting socket reconnection!!'
          );
          _this.notificationsSocketConnect();
        });
      };
    },
    notificationsSocketDisconnect: function () {
      if (this.notificationsSocket !== null) {
        this.notificationsSocket.close();
      }
    }
  }
};
