<style scoped>
  .hidden{
    display:none !important;
  }
</style>

<template>

  <div class="app_container" style="background: rgb(255, 255, 255);grid-template-columns: 2fr 5fr;display: flex;box-sizing: border-box;width: 100%;">
      <div style="display: flex;padding: 20px;box-sizing: border-box;column-gap: 50px;width: 100%;">
        <div style="flex-grow:1;flex-basis:30%;">
          <b>Developers Chat Test UI</b>
          Socket Address
          <input type="text" id="socketAddress" value="wss://rt.lazygenes.com/rsocket" placeholder="Socket Address"/>
          <hr>
          <input type="text" id="sender" value="" placeholder="Your name"/>
          <button id="socketConnectButton" v-on:click="connect()" style="margin-left:20px">1. Connect to Socket</button>
          <div id="connectToSocketResult"></div>
          <br>
          <br>
          <button disabled id="connectToChatChannel" v-on:click="connectToChatChannel()">2. Connect to Chat Channel</button>

          <hr>
          <div style="display:flex;flex-direction:column" class="hidden" id="chatbox">
              <textarea id="msg" rows="10" v-on:keyup.enter="sendMessageToChatChannel()"></textarea>
              <br>
              <button id="sendButton" v-on:click="sendMessageToChatChannel()">3. Send</button>
          </div>
        </div>
        <div class="chats" style="flex-grow: 2;flex-basis: 70%;background: black;color: navajowhite;">
          <template v-for="msg in msgs">
            <div>{{msg}}</div>
          </template>
        </div>
      </div>
  </div>

</template>

<script>

import { bus } from './../../../main.js';

import uiListMixinLib from './../../mixins/lib/ui-list.js';
import userMixinLib from './../../mixins/lib/user_mixin_lib';
import utilsMixinLib from './../../mixins/lib/utils_lib';

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

export default {
  mixins: [
    userMixinLib,
    utilsMixinLib,
    uiListMixinLib
  ],
  props: ['loggedInUser'],
  data: function () {
    return {
        sender: null,
        rsocket: {},
        msgs: []
    };
  },
  methods: {
      // 0 - Connection checker in loop
      checkSocketStatus () {

        const checkSocketStatusFn = (socket) => socket.availability();

        setInterval(async () => {
          const socketAvailability = checkSocketStatusFn(this.socket);
          if (socketAvailability === 0) {

            console.error('Looks like the socket connection is closed. Retrying to connect.');
            document.querySelector("#connectToSocketResult").innerHTML = "Socket disconnected, retrying connection..";
            document.querySelector("#connectToChatChannel").addAttribute("disabled");
            document.querySelector("#chatbox").classList.add("hidden");

            // Retry connection code to be written here..
            const rsocketConnectionResult = await this.connect();
            console.log('rsocket-conn after reattempt : ', rsocketConnectionResult);
          }
          else if (socketAvailability === 1) {
            // console.log("Socket is connected.");
          }
        }, 5000);
      },

      // 1
      async connect () {

        this.sender = document.querySelector("#sender").value;
        const rsocketConnectionResult = await this.connectToSocket();
        console.log('rsocket-conn : ', rsocketConnectionResult);
        document.querySelector("#connectToSocketResult").innerHTML = rsocketConnectionResult;

        if (rsocketConnectionResult === "rsocket-connected.") {
          document.querySelector("#connectToChatChannel").removeAttribute("disabled");
          this.checkSocketStatus();
        }
      },

      // 2
      connectToSocket () {
          // connect-to-chat-channel
          // get-number-of-connected-clients  --> number-of-connected-clients
          // send-message-to-chat-channel   --> new-msg-update

          // private String message;
	        // private String status;
	        // private String name;

          const _this = this;
          let socketAddress = 'ws://' + window.location.hostname + ':9000/rsocket';

          if (window.location.hostname.includes('lazygenes.com')) {
            socketAddress = 'wss://rt.lazygenes.com/rsocket';
          }

          const addr = document.querySelector("#socketAddress").value;
          if (addr.trim() !== "") {
            socketAddress = addr;
          }

          console.log('connecting rocket...' + socketAddress);

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

                if (payload.metadata == 'new-msg-update') {
                  this.processMessageFromServer(payload);
                }
                else if (payload.metadata === 'number-of-connected-clients')
                {
                  // update the connected clients count.
                }
                else {
                  console.log("Unknown type returned from server");
                }
              }
            }
          });

          return new Promise((resolve, reject) => {
            client.connect().subscribe({
              onComplete: socket => {
                console.log('connected socket : ', socket);
                console.log('connected socket : ', socket.connectionStatus());
                this.socket = socket;
                resolve('rsocket-connected.');
              },
              onError: error => {
                console.log('got connection error');
                console.error(error);
                reject('rsocket-connection error');
              },
              onSubscribe: subscription => {
                // call subscription.cancel() to abort
                console.log("client.connect().subscribe's onSubscribe : ", subscription);
              }
            });
          });
      },

      // 3 - Connect to a specific channel using the socket.
      connectToChatChannel () {

        const socket = this.socket;
        const route = 'connect-to-chat-channel';

        console.log('socket availability : ' + socket.availability());
        console.log('socket connectionStatus : ' + socket.connectionStatus());

        const requestResponseData = {
          metadata: String.fromCharCode(route.length) + route,
          data: { userId: this.loggedInUser.userId }
        };

        const handleRSocketResponse = (response) => {
          console.log("RSocket's notification socket sent complete response : ", response);
          document.querySelector("#chatbox").classList.remove("hidden");
        };

        socket.requestResponse(requestResponseData)
          .subscribe({
            onSubscribe: sub => {
              console.log('Chat-channel subscription successful ', sub);
            },
            onComplete: response => handleRSocketResponse(response), // This will be called when the data upstream is all sent.
            onError: error => console.error(error) //
          });
      },

      // 4 - Send the message to the connected chat channel via the socket
      sendMessageToChatChannel () {

        const msg = document.querySelector("#msg").value;

        const socket = this.socket;
        const route = 'send-message-to-chat-channel';

        console.log('socket availability : ' + socket.availability());
        console.log('socket connectionStatus : ' + socket.connectionStatus());

        const requestResponseData = {
          metadata: String.fromCharCode(route.length) + route,
          data: {
            message: this.sender + " : " + msg,
            name: this.sender
          }
        };

        const handleRSocketResponse = (response) => {
          console.log("RSocket's chat-channel-send complete response : ", response);
          document.querySelector("#msg").value = "";
        };

        socket.requestResponse(requestResponseData)
          .subscribe({
            onSubscribe: sub => {
              console.log('Chat-channel msg sent ', sub);
            },
            onComplete: response => handleRSocketResponse(response), // This will be called when the data upstream is all sent.
            onError: error => console.error(error) //
          });
      },

      // 5 - Process incoming message received from the socket
      processMessageFromServer (payload) {
        console.log("Payload from server : ", payload);
        this.msgs.push(payload.data.title);
      }
  },
  created: function () {

  },
  mounted: async function () {

  },
  watch: {

  }
};

</script>
