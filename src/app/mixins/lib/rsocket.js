
import { bus } from '../../../main.js';

import {
  RSocketClient,
  JsonSerializer,
  IdentitySerializer,
  JsonSerializers,
  BufferEncoders,
  encodeAndAddCustomMetadata,
  encodeAndAddWellKnownMetadata,
  TEXT_PLAIN,
  MESSAGE_RSOCKET_COMPOSITE_METADATA,
  MESSAGE_RSOCKET_ROUTING
} from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import { Flowable, Single } from 'rsocket-flowable';

export default {
  data: function () {
    return {
    };
  },
  methods: {

    connectToRSocket () {
      const _this = this;
      let socketAddress = 'ws://' + window.location.hostname + ':9000/rsocket';

      // Testing temporarily with the production c
      // socketAddress = 'wss://rt.hotkup.com/rsocket';

      if (window.location.hostname.includes('lazygenes.com')) {
        socketAddress = 'wss://rt.lazygenes.com/rsocket';
      }
      else if (window.location.hostname.startsWith('test.hotkup.com')) {
        socketAddress = 'wss://rttest.hotkup.com/rsocket';
      }
      else if (window.location.hostname.includes('hotkup.com')) {
        socketAddress = 'wss://rt.hotkup.com/rsocket';
      }
      else if (window.location.hostname.includes('ngrok.io')) {
        socketAddress = 'wss://7cfb19c89aa0.ngrok.io/rsocket';
      }

      console.log('connecting rsocket 2022...' + socketAddress);

      const client = new RSocketClient({
        transport: new RSocketWebSocketClient({
          url: socketAddress
        }),
        serializers: { // send/receive JSON objects instead of strings/buffers
          data: JsonSerializer,
          metadata: IdentitySerializer
        },
        setup: {
          dataMimeType: 'application/json',
          keepAlive: 3600000, // 3600000 = 8hrs  // When this time elapses without any data, then server throws this exception :: io.rsocket.exceptions.ConnectionErrorException: No keep-alive acks for 100000 ms
          lifetime: 3600000,
          metadataMimeType: 'message/x.rsocket.routing.v0'
        },
        responder: {
          fireAndForget: (payload) => {

             console.log("Message pushed from server, ", payload);
            // if(payload.metadata.get(Metadata.ROUTE) == "send.to.location") {
            //     const radar = payload.data;
            //     this.map.panTo([radar.location.lat, radar.location.lng]);
            // }
            if (payload.metadata == 'user-login-status-message') {
              // Handle other tenant user's onlineStatus change here.
              console.log("User Login Status changed : ", payload);

              if (payload.data.onlineStatus === "ONLINE") {
                  UIkit.notification(`<div class="taskone-notification">
                                                          <span uk-icon="icon: sign-in;ratio:1"></span>
                                                          <div> ${payload.data.username} is online. </div>
                                                      </div>`, {
                    status: 'login-color',
                    pos: 'bottom-left',
                    timeout: 5000
                  });
              }
              else if (payload.data.onlineStatus === "OFFLINE") {
                  UIkit.notification(`<div class="taskone-notification">
                                                          <span uk-icon="icon: sign-out;ratio:1"></span>
                                                          <div> ${payload.data.username} is offline. </div>
                                                      </div>`, {
                    status: 'logout-color',
                    pos: 'bottom-left',
                    timeout: 5000
                  });
              }
            }
            else if (payload.metadata == 'new-notification-update') {
              const notification = payload.data;
              console.log('New Notification :', notification);

              // Send an event to the notifications-panel component.
              bus.emit('new-notification', notification);

              if (window.Notification && Notification.permission !== 'denied') {
                Notification.requestPermission((status) => { // status is "granted", if accepted by user
                  var n = new Notification(notification.title, {
                    body: notification.description,
                    icon: '/resources/images/taskone-logo.png', // optional,
                    requireInteraction: true,
                    renotify: true,
                    tag: notification.id
                  });
                });
              }
            } else if (payload.metadata == 'task-activity-update') {
              console.log("task-activity-update received from rsocket : ", payload);

              // alert("task-activity-update emitted");
              // this.updateCategoryActivitiesChannel(payload); // This call won't work. since we initialized this rsocket from adk-app.vue, it sees functions from only those components.
              this.sendUpdateToTaskInboxComponent(payload);
            } else if (payload.metadata == 'new-chat-message') {
              // this.updateCategoryActivitiesChannel(payload); // This call won't work. since we initialized this rsocket from adk-app.vue, it sees functions from only those components.
              this.processIncomingChatMessage(payload);

              // Show messages to other peers (Not to the sender himself)
              if (payload.data.senderInfo.split('#')[0] !== this.loggedInUser.userId) {
                bus.emit('new-chat-notification', {});
              }
            }
          }
        }
      });

      return new Promise((resolve, reject) => {
        client.connect().subscribe({
          onComplete: socket => {
            console.log('connected socket : ', socket);
            console.log('connected socket : ', socket.connectionStatus());
            document.querySelector('#notification_rt_status').classList.remove('hide_display');
            bus.emit('connected-rsocket', socket); // Broadcast it to all components, so that, that component which needs rsocket can listen to this 'event' and store it locally on their dataset for future use.
            resolve('rsocket-connected.');
          },
          onError: error => {
            console.log('got connection error');
            console.error(error);

            document.querySelector('#notification_rt_status').classList.add('hide_display');
            reject('rsocket-connection error');
          },
          onSubscribe: subscription => {
            // call subscription.cancel() to abort
            console.log("client.connect().subscribe's onSubscribe : ", subscription);
          }
        });
      });
    },
    printSocketStatus () {
      const socket = this.rsocket.socket;
      console.log('socket availability : ', socket.availability());
      console.log('socket connectionStatus : ', socket.connectionStatus());
    },
    connectToNotificationSocket () {
      console.log('Logged in user ', this.loggedInUser, this.rsocket);

      const socket = this.rsocket.socket;
      const route = 'connect-to-realtime-notifications';

      console.log('socket availability : ' + socket.availability());
      console.log('socket connectionStatus : ' + socket.connectionStatus());

      const requestResponseData = {
        metadata: String.fromCharCode(route.length) + route,
        data: { userId: this.loggedInUser.userId }
      };

      const handleRSocketResponse = (response) => {
        console.log("RSocket's notification socket sent complete response : ", response);
      };

      socket.requestResponse(requestResponseData)
        .subscribe({
          onSubscribe: sub => {
            console.log('Notification subscription successful ', sub);
          },
          onComplete: response => handleRSocketResponse(response), // This will be called when the data upstream is all sent.
          onError: error => console.error(error) //
        });
    },
    sendUserLogoutMessageToServer () {
      console.log('Sending logout-message:: Logged in user ', this.loggedInUser, this.rsocket);

      const socket = this.rsocket.socket;
      const route = 'user-login-status-notification';

      console.log('socket availability : ' + socket.availability());
      console.log('socket connectionStatus : ' + socket.connectionStatus());

      const logoutData = {};
            logoutData.userId = this.loggedInUser.userId;
            logoutData.onlineStatus = "OFFLINE";

      const requestResponseData = {
        metadata: String.fromCharCode(route.length) + route,
        data: logoutData
      };

      const handleRSocketResponse = (response) => {
        console.log("RSocket's chat socket sent complete response : ", response);
      };

      socket.requestResponse(requestResponseData)
        .subscribe({
          onSubscribe: sub => {
            console.log('Chat subscription successful ', sub);
          },
          onComplete: response => handleRSocketResponse(response), // This will be called when the data upstream is all sent.
          onError: error => console.error(error) //
        });
    },
    sendChatMessageToServer (chatData) {
      console.log("chatdata format : ", chatData);
      console.log('Logged in user ', this.loggedInUser, this.rsocket, chatData);

      const socket = this.rsocket.socket;
      const route = 'send-chat-message';

      console.log('socket availability : ' + socket.availability());
      console.log('socket connectionStatus : ' + socket.connectionStatus());

      chatData.userId = this.loggedInUser.userId;

      const requestResponseData = {
        metadata: String.fromCharCode(route.length) + route,
        data: chatData
      };

      const handleRSocketResponse = (response) => {
        console.log("RSocket's chat socket sent complete response : ", response);
      };

      socket.requestResponse(requestResponseData)
        .subscribe({
          onSubscribe: sub => {
            console.log('Chat subscription successful ', sub);
          },
          onComplete: response => handleRSocketResponse(response), // This will be called when the data upstream is all sent.
          onError: error => console.error(error) //
        });
    },
    processIncomingChatMessage (payload) {
      console.log('New Incoming Chat message ', payload);
      bus.emit('handle-new-chat-message', payload.data);
    }

  }
};
