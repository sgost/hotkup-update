<style scoped>
  .uk-dropdown-nav {
      font-size: .975rem;
  }

  .desktop{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 40px 1fr;
    overflow-y: hidden;
    border: 0px solid red;
    padding: 20px 30px;
  }

  .adk_columns{
    grid-template-columns:9fr 1fr 2fr 2fr 20px 4fr;
  }

  .chat_detail_container{
      border: 0px solid rgba(51,51,51,.27);
      display: flex;
      overflow-y: hidden;
      grid-template-rows: 50px 1fr;
      z-index: 2;
      width: 100%;
  }

  .chat_container{
      height: 100%;
      padding:  0px;
      box-sizing: border-box;
      font-size: 0.65rem;
      ;display: flex;box-sizing: border-box;width: 100%;
  }

  .hideChat{
    display:none;
  }

  .agenda-context-menu-trigger{
    color: #d4d4d4;
    position: absolute;
    bottom: 0px;
    right: 5px;
    font-size: 1.5rem;
    transition: .15s linear;
  }

  .agenda-context-menu-trigger:hover{
    cursor:pointer;
    color:rgb(240, 80, 110);
    transform: scale(1.05);
  }

  .agenda-context-menu-trigger:active{
    cursor:pointer;
    color:rgb(240, 80, 110);
    transform: scale(0.85);
  }

  /* Show that pressed effect */
  .uk-button:active{
    cursor:pointer;
    transform: scale(0.95);
  }

  .receivedMessage>div{
    width: fit-content;
    min-width: 250px;
    max-width: 65%;
    justify-self: start;padding-left: 20px;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .reply-btn{
    place-self:center start;
    padding-left:20px;
    opacity:0.15;
  }

  .reply-btn:hover{
    opacity:1;
    cursor:pointer;
    transform: scale(1.1);
  }

  .reply-cancel-btn{
    opacity:1;
    padding: 2px;
  }

  .reply-cancel-btn:hover{
    opacity: 1;
    cursor: pointer;
    transform: scale(1.1);
    background: #e0e0e0;
    border-radius: 50%;
    padding: 2px;
  }

  .sentMessage>div{
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    /* min-width: 250px; */
    max-width: 65%;
    justify-self: flex-end;
    text-align: right;
    display: flex;
  }

  .left-bubble-container::after {
    top:25px!important;
    top:0px!important;
  }

  .trigger-icon>svg{
    pointer-events:none !important;
  }

  .chat-context-menu-trigger{
    color: #6b6b6b;
    position: absolute;
    top: -5px;
    right: 5px;
    font-size: 1.5rem;
    transition: .15s linear;
    padding: 0px;
    border-radius: 0%;
    opacity:0;
  }

  .chat-context-menu-trigger:hover{
    cursor:pointer;
    transform: scale(1.05);
    opacity:1;
    background: linear-gradient(90deg, #f7f7f7, #f7f7f7);
  }

  .left-bubble-container:hover .chat-context-menu-trigger, .left-bubble-container-consecutive:hover .chat-context-menu-trigger{
    opacity:1;
    transform: translateY(10px);
    background: linear-gradient(90deg, #ffffffdb, #f7f7f7);
  }

  .right-bubble-container:hover .chat-context-menu-trigger{
    opacity:1;
    transform: translateY(10px);
    background: linear-gradient(90deg, #e3fbd4, #e3fbd4);
    background: linear-gradient(90deg, #c6efff, #c6efff);
  }

  .chat-context-menu{
    display:none;
    position: absolute;
    top: 10px;
    right: 5px;
    font-size: 1.5rem;
    width:100px;
    height:150px;
    background-color:#fff;
  }

  .chat-context-menu-visible{
    display:grid;
  }

  .msg_delete_overlay{
    display: none;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: -10px;
    place-content: center;
    background: #ffffffde;
    border: 1px solid #c3c3c3;
  }

  .msg_delete_overlay-show{
    display:grid;
  }

  .file-info-card{
      display: grid;
      grid-gap: 10px;
      margin-top: 0px;
      margin-left: 20px;
      margin-bottom: 30px;
  }

  .file-info-card > div{
      width: fit-content;
      min-width: 250px;
      max-width: 65%;
      justify-self: center;
  }

  .agenda-card{
    display: grid;
    grid-gap: 10px;
    margin-bottom: 20px;
    margin-right: 0px !important;
  }

  .agenda-card>div{
    width: fit-content;
    min-width: 250px;
    max-width: 100%;
    justify-self: start;padding-left: 0px;
    display: grid;
    grid-template-columns: 1fr auto;
    background: white;
    filterX: drop-shadow(1px 0px 5px #02020226);
  }

  .task-card{
      display: grid;
      grid-gap: 10px;
      margin-bottom: 40px;
      margin-right: 0px !important;
  }

  .task-card>div{
    width: fit-content;
    min-width: 250px;
    max-width: 100%;
    justify-self: start;padding-left: 0px;
    display: grid;
    grid-template-columns: 1fr auto;
    background: white;
    filterX: drop-shadow(1px 0px 5px #02020226);
  }

  /* .custom-scroll-bar{
    scroll-behavior: smooth;
    overflow-y:auto;
  }

  .custom-scroll-bar::-webkit-scrollbar {
      width: 10px;
      background-color: transparent;
      scroll-behavior: smooth;
      cursor:pointer;
  }

  .custom-scroll-bar::-webkit-scrollbar-thumb {
      background-color: #91ccfb;
      background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
  }

  .custom-scroll-bar::-webkit-scrollbar-track {
      /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); /
      background-color: #f7f7f7;
  } */

  .clickable-btn:active{
    z-index:2;
    transform:scale(0.95);
  }

  .priority{
    border-radius: 50%;
    width: 10px;
    height: 10px;
    text-transform: uppercase;
    align-self: center;
  }

  .high-priority{background-color: rgb(253 0 105);}
  .medium-priority{background-color: rgb(4 253 0);}
  .low-priority{background-color: rgb(255 248 20);}

  .context-menu{
    display:none;
    position:absolute;
    right: 0px;
    top: 40px;
    background-color:white;
    border: 1px solid #cecece;
    border-radius:3px;
    padding: 10px;
    z-index:2;
    cursor:pointer;
    /*filter: drop-shadow(1px 2px 5px #cecece);*/
    color: #6b6b6b;

    display: grid;top: 35px;right: 15px;

    min-width: 150px;
    transform-origin: right top;opacity: 1;
    transform: scale(0);transition: 0.125s linear;
  }

  .context-menu>div>div{
    padding:5px;
    border-radius:1px;
  }

  .context-menu>div>div:hover{
    background-color:#f0f0f0;
    cursor:pointer;
  }

  .sent-ctx-menu-trigger, .recd-ctx-menu-trigger{
    padding:3px;
    border-radius:0%;
  }

  .recd-ctx-menu-trigger:hover{
    cursor: pointer;
    background-color:#e0e0e085;
  }

  .recd-ctx-menu-trigger:active{
    cursor: pointer;
    background-color:#d0d0d085;
  }

  .sent-ctx-menu-trigger:hover{
    cursor: pointer;
    background: #b8e7f9;
  }

  .sent-ctx-menu-trigger:active{
    cursor: pointer;
    background-color:#b2e4f7;
  }

  .ctx-menu-trigger:active{
    transform:scale(0.85) !important;
  }

  .agenda-card>div .ctx-menu-trigger{
      opacity : 0;
      transition:0.1s linear;
  }

  .agenda-card>div:hover .ctx-menu-trigger{
      opacity : 1;
  }

  .opened{
    opacity:1;
  }

  .searchbox{
    z-index: 2; /* When no-results overlay is applied, then the searchbox goes behind the 100% overlay. */
  }

  .searchbox > input{
    transition: 0.25s linear;
  }

  .searchbox > input:focus{
    background: white !important;
  }
  .uk-form-label{
  }

  .filter-label{
    text-align: right;
    line-height: 25px;
    font-size: .70rem;
    font-family: 'Nunito', sans-serif;
    color: #33333366;
    place-self: end;
  }

  .filter-header{
    height: 40px;
    margin-bottom:20px;
    background: whitesmoke;
    display: grid;
    place-items: center;
    font-weight: bold;
    letter-spacing: 1px;
    word-spacing: 0px;
    font-size: 0.55rem;
    color: gray;
    text-transform: uppercase;
  }

  .oct-checkbox{
    background-size: contain;
    border: 0.05rem solid #e5e5e5;
    width: 20px;
    height: 20px;
    border-radius: 2px;
  }

  .oct-checkbox:checked{
    border: 3px solid #1e89de;
  }

</style>

<template>

    <div  class="chat_container"  style="width: 100%;" v-bind:id="'chat_' + conversationId" v-bind:class="{hideChat: !showChat}">
        <div class="chat_detail_container" style="width: 100%;">
          <div style="overflow-y: hidden;width: 100%;">
                <div style="position: relative;border-top: 0px solid rgb(240, 240, 240);height: 100%;display: grid;grid-template-rows: 1fr 120px;overflow-y: hidden;">

                  <div style="position:absolute;top:0px;left:0px;bottom:0px;right:0px;border: 0px solid red;background-color: #ffffff7a;background-image: linear-gradient(180deg, white, transparent);height:45px;z-index: 1000;pointer-events: none;"></div>

                  <div v-if="discussionMessages.length==0" style="background: white; display: grid; place-content: center;grid-template-rows:auto auto;grid-gap:20px">
                      <div style="place-items: center;place-content: center;place-self: center;">
                         <img src="resources/images/chat.svg" style="height: 75px;">
                      </div>
                      <div style="font-size: 1.25rem;">Start a chat on {{conversationName}} <span v-if="categoryId!==null"> category.</span></div>
                  </div>

                  <div v-else-if="discussionMessages.length>0"   v-bind:id="'discussions_list_' + conversationId"  class="custom-scroll-bar " style="margin-right:2px;border: 0px solid red;overflow-y: auto;padding: 10px 30px 50px 10px;xbackground-color: #f3f3f3;xbackground-image: url('resources/images/paper.jpg');box-sizing: border-box;">
                          <!-- <div class="activity_background" style="z-index: -1;"></div> -->

                          <div v-if="!isFullDiscussionHistoryLoaded" v-on:click="getChatMessages(conversationId)" style="display: grid;place-items: center;margin: 0px 0px 10px 0px;">
                              <span style="background: rgb(105, 169, 243);padding: 3px 10px;border-radius: 15px;cursor: pointer;user-select: none;z-index: 1001;color: white;" class="clickable-btn ">Load previous messages..</span>
                          </div>



                          <template v-for="msg in discussionMessages" >
                          <div style="transition: 0.1s linear;transform: translate(0px, 20px);"
                               v-bind:data-starred="msg.isStarred"
                               v-bind:id="'chat_msg_' + msg.id"
                               v-bind:class="{'chat_msg': true, 'receivedMessage': (msg.isReceived && !msg.isConsecutiveMessage), 'sentMessage': !msg.isReceived, 'receivedMessageConsecutive': (msg.isReceived && msg.isConsecutiveMessage) }">

                                <div v-if="msg.type==='info#new_joinee'"  style="display: none;">
                                  <div style="display: grid;place-items: center;margin: 0px 0px 5px 0px;">
                                      <span style="background: ghostwhite;padding: 3px;padding-left: 15px;padding-right: 15px;border-radius: 15px;cursor: pointer;">{{msg.message}}</span>
                                  </div>
                                </div>

                                <div v-else>
                                  <div v-if="msg.isReceived==true" style="width: 100%;position: relative;display: grid;grid-template-columns: 0px auto;">
                                      <div style="user-select:none">
                                          <!--
                                            <img v-bind:src="'api/us/profile/get/' + msg.senderInfoId" style="background-color:white;object-fit: cover;height: 50px;width: 50px;;border-radius: 50%;border: 2px solid #ffffff;filter: drop-shadow(1px 2px 4px #0202024f);">
                                          -->
                                       </div>

                                      <template v-if="msg.attachment===null || msg.attachment===undefined">
                                          <div v-bind:data-received="msg.isConsecutiveMessage" v-bind:class="{ 'left-bubble-container': !msg.isConsecutiveMessage , 'left-bubble-container-consecutive': msg.isConsecutiveMessage }" class="chat-msg " style="line-height: 22px;padding: 0px 5px;padding-bottom: 10px;text-align: left;overflow-wrap: break-word;white-space: pre-wrap;">
                                              <div style="display: flex;column-gap: 10px;">
                                                  <div v-bind:id="'msg_content_' + msg.id"  style="display:grid;row-gap: 10px;">
                                                      <div style=";font-size: 0.65rem;">{{msg.message}}</div>
                                                      <div v-if="msg.replyToInfo!==null && msg.replyToInfo!==undefined" v-on:click="goToMessage(msg.replyToInfo.id)" style="user-select:none;display: grid;grid-template-rows: auto auto;background: aliceblue;padding: 5px 10px;border: 1px solid #eaeaea;cursor:pointer;color: gray;border-radius: 1px;">
                                                        <div style="font-weight:bold">{{msg.replyToInfo.senderInfoName}}</div>
                                                        <div style="font-weight:normal">{{msg.replyToInfo.message}}</div>
                                                      </div>
                                                  </div>
                                                  <div style="padding-top: 0px;min-width: 45px;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;column-gap: 5px;">
                                                      <span class="date" style="rgb(241, 240, 240);color: #b5b5b5;font-family: Lato, &quot;Helvetica Neue&quot;, Arial, Helvetica, sans-serif;display: grid;place-content: center end;font-size:0.57rem;">{{msg.time}}</span>
                                                      <span v-show="msg.isStarred" zuk-icon="ratio:0.65;icon:star" style="color: rgb(254, 215, 0);line-height: 0px;">
                                                        <svg width="13" height="13" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="star">
                                                          <polygon fill="rgb(254 215 0)" stroke="rgb(254, 215, 0)" stroke-width="1.01" points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27"></polygon>
                                                        </svg>
                                                      </span>
                                                  </div>
                                              </div>

                                              <div class="chat-context-menu-trigger">
                                                <span v-bind:id="'ctx-menu-trigger-' + msg.id"  v-bind:data-chat-message-id="msg.id"  class="recd-ctx-menu-trigger ctx-menu-trigger trigger-icon" xv-on:click.stop="openContextMenu(msg.id, $event)" uk-icon="ratio:0.85;icon:chevron-down" style="color:#777777">
                                                  <svg width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-down" style="pointer-events:none">
                                                    <polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline>
                                                  </svg>
                                                </span>
                                              </div>

                                              <div v-if="!msg.isDeleted" v-bind:id="'ctx_menu_' + msg.id" class="context-menu">
                                                <div style="user-select: none;display: flex;gap: 0px;flex-direction: column;">
                                                    <div v-on:click="replyToMessage(msg)">
                                                      <span uk-icon="ratio:0.7;icon: trash" class="uk-icon"></span>
                                                      <span style="padding-left: 5px;"> Reply</span>
                                                    </div>
                                                    <div v-on:click="convertMsgToTask(msg)">
                                                      <span uk-icon="ratio:0.7;icon:tag" class="uk-icon"></span>
                                                      <span style="padding-left: 5px;"> Convert to Task </span>
                                                    </div>
                                                </div>
                                              </div>

                                          </div>
                                          <div v-if="!msg.isConsecutiveMessage" style="position: absolute;top: -20px;left:0px;font-weight: bold;color: #0000007a;" title="" aria-expanded="false">{{msg.senderInfo}}</div>
                                      </template>
                                      <template v-else-if="msg.attachment!==null">
                                        <div class="chat-msg left-bubble-container" style="padding-bottom:0px">

                                              <div v-bind:id="'msg_content_' + msg.id"  style="line-height: 22px;padding: 0px 5px;padding-bottom: 10px;text-align: left;overflow-wrap: break-word;white-space: pre-wrap;padding-bottom:10px;row-gap: 10px;">

                                                <div v-if="msg.messageType === 'COMMENT_MENTIONED_CHAT_NOTIFICATION'" v-on:click="openViewTaskModal(msg.taskId)" style="user-select: none;display: grid;grid-template-rows: auto auto;background: none;padding: 5px 0px;border-bottom: 1px solid rgb(179 179 179);cursor: pointer;border-radius: 1px;">
                                                  <div style="font-weight:bold">{{msg.taskSno}}
                                                  </div>
                                                </div>

                                                <div style=";font-size: 0.65rem;">{{msg.message}}</div>
                                                <div v-if="msg.replyToInfo!==null && msg.replyToInfo!==undefined" v-on:click="goToMessage(msg.replyToInfo.id)" style="user-select:none;display: grid;grid-template-rows: auto auto;background: aliceblue;padding: 5px 10px;border: 1px solid #eaeaea;cursor:pointer;color: gray;border-radius: 1px;">
                                                  <div style="font-weight:bold">{{msg.replyToInfo.senderInfoName}}</div>
                                                  <div style="font-weight:normal">{{msg.replyToInfo.message}}</div>
                                                </div>

                                                <div v-if="msg.messageType === 'COMMENT_MENTIONED_CHAT_NOTIFICATION'" v-on:click="openTaskActivityModal(msg.taskId)" style="user-select: none;display: flex;grid-template-rows: auto;background: rgb(149 211 113);padding: 5px 10px;border: 1px solid rgb(146 211 108);cursor: pointer;border-radius: 33px;width: fit-content;color: rgb(255 255 255);font-weight: normal;place-self: flex-end;margin-bottom: 5px;">
                                                  <div style="font-weight:normal" >View Comment</div>
                                                </div>
                                              </div>

                                              <div v-if="!msg.isDeleted" v-bind:id="'ctx_menu_' + msg.id" class="context-menu">
                                                <div style="user-select: none;display: flex;gap: 0px;flex-direction: column;">
                                                    <div v-on:click="replyToMessage(msg)">
                                                      <span uk-icon="ratio:0.7;icon: trash" class="uk-icon"></span>
                                                      <span style="padding-left: 5px;"> Reply</span>
                                                    </div>
                                                </div>
                                              </div>

                                              <div style="position: absolute;top: -20px;left: 0px;font-weight: bold;color: #0000007a;" title="" aria-expanded="false">{{msg.senderInfo}}</div>
                                              <div style="display: grid;grid-template-rows: 4fr auto;">
                                                  <div style="">

                                                      <div v-if="msg.attachment.type==='jpg' || msg.attachment.type==='jpeg' ||  msg.attachment.type==='png' || msg.attachment.type==='svg' " style="text-align: center;">
                                                          <a target="_blank" v-bind:href="'/chat-conversations/get/' + msg.attachment.full_name + '/preview'">
                                                              <img v-bind:src="'/chat-conversations/get/' + msg.attachment.full_name + '/preview'"
                                                              class="image-preview"/>
                                                          </a>
                                                      </div>
                                                      <div v-else-if="msg.attachment.type==='pdf' " style="text-align: center;">
                                                          <a target="_blank" v-bind:href="'/chat-conversations/get/' + msg.attachment.full_name + '/preview'">
                                                              <img v-bind:src="'/chat-conversations/get/thumbnail_' + msg.attachment.id + '.jpg/preview'"
                                                              class="image-preview"/>
                                                          </a>
                                                      </div>

                                                      <div style="padding-top:20px;text-align: center;">
                                                        <span v-bind:uk-tooltip="msg.attachment.full_name" style="cursor:pointer;color: white;">File Name : {{msg.attachment.name}}
                                                        &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                        <a  v-bind:uk-tooltip="'Download File - ' + msg.attachment.full_name" v-on:click="downloadFile(msg.attachment.full_name)"><span uk-icon="cloud-download" style="color:white"></span> </a>
                                                      </div>
                                                  </div>
                                                  <div style="padding-top: 0px;min-width: 45px;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;column-gap: 5px;">
                                                      <span class="date" style="color: #b5b5b5;rgb(241, 240, 240);font-family: Lato, &quot;Helvetica Neue&quot;, Arial, Helvetica, sans-serif;display: grid;place-content: center end;    font-size: 0.70rem;">{{msg.time}}</span>
                                                      <span v-show="msg.isStarred" zuk-icon="ratio:0.65;icon:star" style="color: rgb(254, 215, 0);line-height: 0px;">
                                                        <svg width="13" height="13" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="star"><polygon fill="rgb(254 215 0)" stroke="rgb(254, 215, 0)" stroke-width="1.01" points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27"></polygon></svg>
                                                      </span>
                                                  </div>
                                              </div>
                                        </div>
                                      </template>

                                      <!--
                                      <div style="position: absolute;height: 25px !important;width: 25px !important;top: -15px;left: -10px;">
                                          <img src="resources/images/male_default_pic.png" class="right floated mini ui image customer_picture_chat" style="border:1px solid rgb(208, 208, 208);height: 25px !important;width: 25px !important;background: rgb(245, 245, 245);border-radius: 50%;">
                                      </div>-->
                                  </div>
                                  <div v-else-if="msg.isSent==true"  style="width: 100%">

                                      <template v-if="msg.attachment===null || msg.attachment===undefined">
                                          <div class="chat-msg right-bubble-container" style="line-height: 22px;padding: 0px 5px;padding-bottom: 10px;text-align: left;overflow-wrap: break-word;white-space: pre-wrap;">
                                                <div style="display: flex;column-gap: 10px;">
                                                    <div  v-bind:id="'msg_content_' + msg.id" style="display:grid;row-gap: 10px;">
                                                      <div v-if="msg.messageType === 'COMMENT_MENTIONED_CHAT_NOTIFICATION'" v-on:click="openViewTaskModal(msg.taskId)" style="user-select: none;display: grid;grid-template-rows: auto auto;background: none;padding: 5px 0px;border-bottom: 1px solid rgb(179 179 179);cursor: pointer;border-radius: 1px;">
                                                        <div style="font-weight:bold">{{msg.taskSno}}
                                                        </div>
                                                      </div>
                                                      <div style=";font-size: 0.65rem;white-space: pre-wrap;word-break: break-word;"  v-html="msg.message"></div>
                                                      <div v-if="msg.replyToInfo!==null && msg.replyToInfo!==undefined" v-on:click="goToMessage(msg.replyToInfo.id)" style="user-select: none;display: grid;grid-template-rows: auto auto;background: none;padding: 5px 0px;border-bottom: 1px solid rgb(179 179 179);cursor: pointer;border-radius: 1px;">
                                                        <div style="font-weight:bold">{{msg.replyToInfo.senderInfoName}}</div>
                                                        <div style="font-weight:normal">{{msg.replyToInfo.message}}</div>
                                                      </div>
                                                      <div v-if="msg.messageType === 'COMMENT_MENTIONED_CHAT_NOTIFICATION'" v-on:click="openTaskActivityModal(msg.taskId)" style="user-select: none;display: flex;grid-template-rows: auto;background: rgb(149 211 113);padding: 5px 10px;border: 1px solid rgb(146 211 108);cursor: pointer;border-radius: 33px;width: fit-content;color: rgb(255 255 255);font-weight: normal;place-self: flex-end;margin-bottom: 5px;">
                                                        <div style="font-weight:normal" >View Comment</div>
                                                      </div>

                                                    </div>
                                                    <div style="padding-top: 0px;min-width: 45px;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;column-gap: 5px;">
                                                      <span class="date" style="color: #b5b5b5;rgb(241, 240, 240);font-family: Lato, &quot;Helvetica Neue&quot;, Arial, Helvetica, sans-serif;display: grid;place-content: center end;font-size:0.57rem;">{{msg.time}}</span>
                                                      <span v-bind:id="'chat_msg_status_unsaved_' + msg.id" style="line-height: 0px;display:none" uk-icon="ratio:0.55;icon:clock" class="uk-icon">
                                                        <svg width="11" height="11" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="clock">
                                                            <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"></circle>
                                                            <rect x="9" y="4" width="1" height="7"></rect>
                                                            <path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"></path>
                                                        </svg>
                                                      </span>
                                                      <span v-bind:id="'chat_msg_status_saved_' + msg.id" style="line-height: 0px;display:none" uk-icon="ratio:0.55;icon:clock" class="uk-icon">
                                                        <svg width="11" height="11" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="clock">
                                                            <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"></circle>
                                                            <rect x="9" y="4" width="1" height="7"></rect>
                                                            <path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"></path>
                                                        </svg>
                                                      </span>
                                                      <span v-bind:id="'chat_msg_status_read_' + msg.id" style="line-height: 0px;display:none" uk-icon="ratio:0.55;icon:clock" class="uk-icon">
                                                        <svg width="11" height="11" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="clock">
                                                            <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"></circle>
                                                            <rect x="9" y="4" width="1" height="7"></rect>
                                                            <path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"></path>
                                                        </svg>
                                                      </span>
                                                      <span v-show="msg.isStarred" zuk-icon="ratio:0.65;icon:star" style="color: rgb(254, 215, 0);line-height: 0px;">
                                                        <svg width="13" height="13" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="star"><polygon fill="rgb(254 215 0)" stroke="rgb(254, 215, 0)" stroke-width="1.01" points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27"></polygon></svg>
                                                      </span>
                                                    </div>

                                                    <div v-bind:id="'msg_delete_menu_' + msg.id " class="msg_delete_overlay">
                                                        <div style="display:grid;grid-template-columns:auto auto;place-items:center;grid-gap:20px">

                                                            <button v-on:click="deleteMessage(msg.id, true)" class="uk-button uk-button-danger uk-button-small uk-first-column end-call-button" style="background-color: rgb(240, 80, 110); border-radius: 3px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;"><span> Delete</span></button>

                                                            <button v-on:click="deleteMessage(msg.id, false)" class="uk-button uk-button-danger uk-button-small uk-first-column end-call-button" style="background-color: rgb(255 255 255);border-radius: 3px;place-self: center start;border: 1px solid gray;color: gray;place-items: center;min-width: 100px;font-size: 0.65rem;line-height: 32px;font-weight: normal !important;"><span> Cancel</span></button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!--
                                                <div class="chat-context-menu-trigger" v-on:click="showDeleteMessageOption(msg.id)">
                                                  <span uk-icon="icon: trash"></span>
                                                </div>
                                                -->

                                                <div class="chat-context-menu-trigger">
                                                  <span v-bind:id="'ctx-menu-trigger-' + msg.id" v-bind:data-chat-message-id="msg.id" class="sent-ctx-menu-trigger ctx-menu-trigger trigger-icon uk-icon" xv-on:click.stop="openContextMenu(msg.id, $event)" uk-icon="ratio:0.85;icon:chevron-down" style="color: rgb(119, 119, 119);">
                                                    <svg width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-down">
                                                      <polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline>
                                                    </svg>
                                                  </span>
                                                </div>

                                                <div v-if="!msg.isDeleted" v-bind:id="'ctx_menu_' + msg.id" class="context-menu">
                                                  <div style="user-select: none;display: flex;gap: 0px;flex-direction: column;">
                                                      <div v-on:click="editChatMessage(msg)">
                                                        <span uk-icon="ratio:0.7;icon: file-edit" class="uk-icon"></span>
                                                        <span style="padding-left: 5px;"> Edit</span>
                                                      </div>
                                                      <div v-on:click="convertMsgToTask(msg)">
                                                        <span uk-icon="ratio:0.7;icon:tag" class="uk-icon"></span>
                                                        <span style="padding-left: 5px;"> Convert to Task </span>
                                                      </div>
                                                      <div v-on:click="showDeleteMessageOption(msg.id)">
                                                        <span uk-icon="ratio:0.7;icon: trash" class="uk-icon"></span>
                                                        <span style="padding-left: 5px;"> Delete</span>
                                                      </div>
                                                  </div>
                                              </div>

                                          </div>
                                      </template>
                                      <template v-else-if="msg.attachment!==null">
                                        <div class="chat-msg right-bubble-container" style="padding-bottom:0px">

                                            <!--
                                            <div class="chat-context-menu-trigger" v-on:click="showDeleteMessageOption(msg.id)">
                                              <span uk-icon="icon: trash"></span>
                                            </div>
                                            -->

                                            <div class="chat-context-menu-trigger">
                                              <span v-bind:id="'ctx-menu-trigger-' + msg.id" v-bind:data-chat-message-id="msg.id" class="sent-ctx-menu-trigger ctx-menu-trigger trigger-icon uk-icon" xv-on:click.stop="openContextMenu(msg.id, $event)" uk-icon="ratio:0.85;icon:chevron-down" style="color: rgb(119, 119, 119);">
                                                <svg width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-down">
                                                  <polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline>
                                                </svg>
                                              </span>
                                            </div>

                                            <div v-if="!msg.isDeleted" v-bind:id="'ctx_menu_' + msg.id" class="context-menu">
                                              <div style="user-select: none;display: flex;gap: 0px;flex-direction: column;">
                                                  <div v-on:click="editChatMessage(msg)">
                                                    <span uk-icon="ratio:0.7;icon: file-edit" class="uk-icon"></span>
                                                    <span style="padding-left: 5px;"> Edit</span>
                                                  </div>
                                                  <div v-on:click="showDeleteMessageOption(msg.id)">
                                                    <span uk-icon="ratio:0.7;icon: trash" class="uk-icon"></span>
                                                    <span style="padding-left: 5px;"> Delete</span>
                                                  </div>
                                              </div>
                                          </div>

                                            <div v-bind:id="'msg_delete_menu_' + msg.id " class="msg_delete_overlay">
                                                <div style="display:grid;grid-template-columns:auto auto;place-items:center;grid-gap:20px">

                                                    <button v-on:click="deleteMessage(msg.id, true)" class="uk-button uk-button-danger uk-button-small uk-first-column end-call-button" style="background-color: rgb(240, 80, 110); border-radius: 3px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;"><span> Delete</span></button>

                                                    <button v-on:click="deleteMessage(msg.id, false)" class="uk-button uk-button-danger uk-button-small uk-first-column end-call-button" style="background-color: rgb(255 255 255);border-radius: 3px;place-self: center start;border: 1px solid gray;color: gray;place-items: center;min-width: 100px;font-size: 0.65rem;line-height: 32px;font-weight: normal !important;"><span> Cancel</span></button>
                                                </div>
                                            </div>

                                            <div  v-bind:id="'msg_content_' + msg.id" style="padding-bottom:10px;display:grid;row-gap: 10px;">
                                              <div style=";font-size: 0.65rem;">{{msg.message}}</div>
                                              <div v-if="msg.replyToInfo!==null && msg.replyToInfo!==undefined" v-on:click="goToMessage(msg.replyToInfo.id)" style="user-select: none;display: grid;grid-template-rows: auto auto;background: none;padding: 5px 0px;border-bottom: 1px solid rgb(179 179 179);cursor: pointer;border-radius: 1px;">
                                                <div style="font-weight:bold">{{msg.replyToInfo.senderInfoName}}</div>
                                                <div style="font-weight:normal">{{msg.replyToInfo.message}}</div>
                                              </div>
                                            </div>
                                            <div style="display: grid;grid-template-rows: 4fr auto;">
                                                <div style="">

                                                    <div v-if="msg.attachment.type==='jpg' || msg.attachment.type==='jpeg' ||  msg.attachment.type==='png' || msg.attachment.type==='svg' " style="text-align: center;">
                                                        <a target="_blank" v-bind:href="'/chat-conversations/get/' + msg.attachment.full_name + '/preview'">
                                                            <img v-bind:src="'/chat-conversations/get/' + msg.attachment.full_name + '/preview'"
                                                            class="image-preview"/>
                                                        </a>
                                                    </div>
                                                    <div v-else-if="msg.attachment.type==='pdf' " style="text-align: center;">
                                                        <a target="_blank" v-bind:href="'/chat-conversations/get/' + msg.attachment.full_name + '/preview'">
                                                            <img v-bind:src="'/chat-conversations/get/thumbnail_' + msg.attachment.id + '.jpg/preview'"
                                                            class="image-preview"/>
                                                        </a>
                                                    </div>

                                                    <div style="padding-top:20px;text-align: center;">
                                                      <span v-bind:uk-tooltip="msg.attachment.full_name" style="cursor:pointer;color: gray;">File Name : {{msg.attachment.name}}
                                                      &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                      <a  v-bind:uk-tooltip="'title:Download File' + ';pos: left'" v-on:click="downloadFile(msg.attachment.full_name)"><span uk-icon="cloud-download"></span> </a>
                                                    </div>
                                                </div>
                                                <div style="padding-top: 0px;min-width: 45px;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;column-gap: 5px;">
                                                    <span class="date" style="color: rgba(0, 0, 0, 0.4);color: #b5b5b5;font-family: Lato, &quot;Helvetica Neue&quot;, Arial, Helvetica, sans-serif;display: grid;place-content: center end;">{{msg.time}}</span>
                                                    <span v-show="msg.isStarred" zuk-icon="ratio:0.65;icon:star" style="color: rgb(254, 215, 0);line-height: 0px;">
                                                      <svg width="13" height="13" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="star"><polygon fill="rgb(254 215 0)" stroke="rgb(254, 215, 0)" stroke-width="1.01" points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27"></polygon></svg>
                                                    </span>
                                                </div>
                                            </div>
                                      </div>
                                      </template>

                                     <!--
                                    <div style="position: absolute;height: 25px !important;width: 25px !important;top: -10px;right: -10px;">
                                        <img src="resources/images/male_default_pic.png" class="right floated mini ui image customer_picture_chat" style="border:1px solid rgb(208, 208, 208);height: 25px !important;width: 25px !important;background: #fff6ae;border-radius: 50%;">
                                    </div>-->
                                  </div>

                                  <!-- <div v-if="msg.isReceived==true" class="reply-btn">
                                    <span  uk-tooltip="Reply to this Message" v-on:click="replyToMessage(msg)" uk-icon="reply"></span>
                                  </div> -->
                                </div>

                          </div>
                        </template>

                  </div>

                  <section v-bind:id="'messageBoxSection_' + conversationId" class="ui form" style="border-top: 1px solid rgb(216, 216, 216);background-color: rgb(255 255 255 / 65%);padding-bottom: 15px;padding-left: 30px;padding-right: 30px;box-sizing: border-box;position: relative;display: grid;grid-template-rows: auto;min-height: 110px;max-height: 125px;overflow-y: hidden;">

                      <div style="padding: 10px 5px;display: grid;grid-template-columns: 20px 20px 1fr;height:30px;column-gap: 15px;height: fit-content;">

                        <span uk-tooltip="Upload Document.<br> Only .csv, .xls, .doc, .docx, .pdf files accepted." v-on:click="uploadFileType('other')" style="cursor:pointer;display: grid; place-self: center start;">
                          <i class="fas fa-paperclip" style="font-size: 16px;color: rgb(141, 124, 124);display: grid;place-self: center;"></i>
                        </span>
                        <span uk-tooltip="Upload Image" v-on:click="uploadFileType('image')" style="cursor:pointer;display: grid; place-self: start;">
                          <i class="fas fa-image" style="font-size: 30px;color: rgb(141, 124, 124);display: grid;place-self: center;"></i>
                        </span>

                        <div v-show="isDiscussionFileChosen" style="overflow-x: hidden;display: grid;grid-template-columns: auto 1fr;column-gap: 10px;">
                            <div style="overflow-x: hidden;width: 100%;place-self: center;color:#575757">File Chosen : {{chosenDiscussionFileName}}</div>
                            <div uk-tooltip="Cancel File upload" v-on:click="removeDiscussionFile()" style="place-self: center start;">
                                <svg width="15" height="15" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="close" style="  background: white;border-radius: 50%;padding: 2px;cursor:pointer" >
                                    <path fill="none" stroke="red" stroke-width="1.06" d="M16,16 L4,4"></path>
                                    <path fill="none" stroke="red" stroke-width="1.06" d="M16,4 L4,16"></path>
                                </svg>
                            </div>
                        </div>

                      </div>

                      <div style="height: fit-content;position: absolute;bottom: 10px;left: 30px;right: 30px;">
                          <div style="display: grid;grid-template-columns: 1fr;grid-gap: 5px;position:relative">
                            <textarea v-bind:id="'discussionMessageBox_' + conversationId" v-bind:placeholder="'Type a message and hit enter. Use (Shift + Enter) to add a multi-line message.'"
                                      class="uk-textarea" style="height: 35px; color: rgb(49, 49, 49); border: 0.05em solid rgb(183, 182, 182); border-radius: 5px; max-height: 80px; bottom: 0px; width: inherit; min-height: 56px !important;    background: white;"
                                      v-model="discussionUserText"
                                      v-on:keyup.enter="sendChatMessage($event, 'discussionMessageBox_' + conversationId)"></textarea>
                            <div v-on:click="sendChatMessage($event, 'discussionMessageBox_' + conversationId)" style="display: grid;place-content: center;color: white;place-self: end center;place-items: center;background-color: rgb(31 189 104);border-radius: 38px;width: 40px;height: 40px;position: absolute;right: 0px;top: -30px;">
                              <span class="uk-icon" style="cursor: pointer;">
                                <div v-show="isFileUploading" uk-spinner></div>
                                <svg v-show="!isFileUploading" viewBox="0 0 20 25" width="20" height="20">
                                  <path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
                                </svg>
                              </span>
                            </div>
                          </div>
                      </div>
                  </section>

                  <div v-show="uploadDiscussionFile" style="position: absolute;bottom: 120px;right: 0px;left: 0px;height: 40px;z-index: 3;background: rgb(253 253 253);padding: 10px;border-bottom: 1px solid rgb(216, 216, 216);display: grid;grid-gap: 10px;place-content: center;">
                        <div v-show="!isDiscussionFileChosen" v-bind:id="conversationId + '_discussionFileUploadContainer'" data-text="Choose File"  class="file-upload-wrapper" style="position: relative;height: 30px;width: 200px;">
                            <input name="file" type="file" v-bind:id="conversationId + '_discussionFileUploadForm'" value="" v-on:change="onFileChosenImpl2($event);" class="file-upload-field" style="height: 30px;">
                        </div>
                        <div v-show="isDiscussionFileChosen" style="overflow-x: hidden;display: grid;place-items: center;grid-template-columns: 1fr 50px;">
                            <div style="overflow-x: hidden;width: 100%;">File Chosen : {{chosenDiscussionFileName}}</div>
                            <div v-on:click="removeDiscussionFile()">
                                <span uk-icon="close" style="font-weight: bold;color: red;background: white;border-radius: 50%;padding: 5px;"></span>
                            </div>

                        </div>
                  </div>

                  <div v-show="replyToMsg" style="position: absolute;bottom: 120px;right: 0px;left: 0px;z-index: 3;padding: 10px 10px 10px 50px;border-bottom: 1px solid rgb(216, 216, 216);border-top: 1px solid rgb(189, 189, 189);display: grid;gap: 10px;background: linear-gradient(45deg, rgb(68, 136, 214), #e2e2e200) rgb(115 115 115);color: rgb(232, 232, 232);grid-template-columns: auto 1fr auto;">

                        <div style="display: flex;justify-content: center;align-items: center;">
                                <span uk-tooltip="Reply to this Message" uk-icon="reply" title="" aria-expanded="false" class="uk-icon"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply"><path d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path></svg></span>
                        </div>
                        <div>
                            <div style="font-weight:bold;display:grid;grid-template-columns:auto 1fr">
                                <div style="place-items:center end" v-if="replyToMsgDetail!==undefined && replyToMsgDetail!==null">{{replyToMsgDetail.senderInfoName}}</div>
                            </div>
                            <div style="padding:0px;display:grid;grid-template-columns:1fr auto">
                                <div v-if="replyToMsgDetail!==undefined && replyToMsgDetail!==null">{{replyToMsgDetail.message}}</div>
                            </div>
                        </div>
                        <div style="place-self: center end;padding: 0px 30px;">
                            <span uk-tooltip="Cancel Reply" v-on:click="cancelMessageReply()" class="reply-cancel-btn" uk-icon="close"></span>
                        </div>
                  </div>

                </div>
              </div>

        </div>


    </div>

</template>

<script>

import { bus } from './../../../main.js';

import uiListMixinLib from './../../mixins/lib/ui-list.js';
import userMixinLib from './../../mixins/lib/user_mixin_lib';
import utilsMixinLib from './../../mixins/lib/utils_lib';

export default {
  props: ['loggedInUser', 'conversationId', 'conversationName', 'categoryId', 'showChat', 'tab'],
  data: function () {
    return {
      discussionSocket: null,
      discussionMessages: [],
      discussionsPageNumber: 1,
      isFullDiscussionHistoryLoaded: false,
      discussionUserText: '',
      searchQuery: '',

      conferenceName: '',
      isAlreadyOpen: 0,
      prevChosenFileType: 'other',
      uploadDiscussionFile: false,
      isDiscussionFileChosen: false,
      chosenDiscussionFileName: 'No File chosen',
      chosenFileType: 'other',
      isFileUploading: false,

      replyToMsg: false,
      replyToMsgDetail: {},

      categoryObject: {},
      categoryAssigneeIds: [],
      categoryFollowerIds: [],
      userImageMapCache: new Map(),
      clickedChatMessageId: null,
      isClickedConversationMessageStarred: false,
      otherMembers: [],
      members: []
    };
  },
  methods: {

    openViewTaskModal (taskId) {

      bus.emit('viewSubTaskEvent', {
        subTaskId: taskId,
        modalKey: "view_sub_task",
        tabToDisplay: "description"
      });
      return false;
    },
    openTaskActivityModal (taskId) {

      bus.emit('viewSubTaskEvent', {
        subTaskId: taskId,
        modalKey: "view_sub_task",
        tabToDisplay: "activity"
      });
      return false;
    },

    /*

        attachment
          name
          full_name
          type
          id


        if (msg.attachment !== undefined && msg.attachment !== null) {
          msg.attachment.full_name = msg.attachment.name;
          const attachmentNameLength = msg.attachment.name.length;
          if (attachmentNameLength > 15) {
            msg.attachment.name = msg.attachment.name.substr(0, 15) +
                                                                    '..' +
                                                                    msg.attachment.name.substr(attachmentNameLength - 6, attachmentNameLength);
          }
        }

        <div v-if="msg.attachment.type==='jpg' || msg.attachment.type==='jpeg' ||  msg.attachment.type==='png' || msg.attachment.type==='svg' " style="text-align: center;">
            <a target="_blank" v-bind:href="'/chat-conversations/get/' + msg.attachment.full_name + '/preview'">
                <img v-bind:src="'/chat-conversations/get/' + msg.attachment.full_name + '/preview'"
                class="image-preview"/>
            </a>
        </div>
        <div v-else-if="msg.attachment.type==='pdf' " style="text-align: center;">
            <a target="_blank" v-bind:href="'/chat-conversations/get/' + msg.attachment.full_name + '/preview'">
                <img v-bind:src="'/chat-conversations/get/thumbnail_' + msg.attachment.id + '.jpg/preview'"
                class="image-preview"/>
            </a>
        </div>

        <div style="padding-top:20px;text-align: center;">
          <span v-bind:uk-tooltip="msg.attachment.full_name" style="cursor:pointer;color: white;">File Name : {{msg.attachment.name}}
          &nbsp;&nbsp;&nbsp;&nbsp;</span>
          <a  v-bind:uk-tooltip="'Download File - ' + msg.attachment.full_name" v-on:click="downloadFile(msg.attachment.full_name)"><span uk-icon="cloud-download" style="color:white"></span> </a>
        </div>


    */
    checkForLineBreaks (a, b) {
      console.error("This method needs to be implemented.");
    },
    async sendChatMessage (evt, chatInputId) {

      // If the enter was pressed along with shift-key, then it must not send the message, but go to a newline.
      if (evt.shiftKey) {
        return false;
      }

      // Don't activate this button if a file is being uploaded, this is to prevent user from clickjacking while a file is being uploaded.
      if (this.isFileUploading) {
        alert('File upload is in progress, pls wait.');
        return false;
      }

      if (this.isDiscussionFileChosen) {
        // Upload File first
        const fileList = document.getElementById(this.conversationId + '_discussionFileUploadForm').files;

        if (!fileList.length) return;

        this.isFileUploading = true;
        const uploadResponse = await this.uploadFile(fileList);
        console.log('Got fileupload promise response : ', uploadResponse);
        const fileInfo = JSON.parse(uploadResponse.responseText);

        if (fileInfo.actionResult === 1) {
          const attachment = (fileInfo.bean);
          if (this.discussionUserText.trim() !== '') {

            const msg = document.querySelector('#' + chatInputId).value;
            evt.preventDefault();
            evt.stopPropagation();
            document.querySelector('#' + chatInputId).focus();
            console.log('document.getElementById(evt.target.id)', document.querySelector('#' + chatInputId));


            // attachment
            //   name
            //   full_name
            //   type
            //   id

            const chatMsg = {
              message: msg,
              conversationId: this.conversationId,
              acknowledgementStatusId: new Date().getTime(),
              attachment: {
                id: attachment.id,
                name: attachment.fileName,
                size: attachment.fileSize,
                type: attachment.fileType
              }
            };

            if (this.replyToMsgDetail !== null && this.replyToMsgDetail !== undefined &&
                this.replyToMsgDetail.id !== undefined && this.replyToMsgDetail.id !== null) {
              chatMsg.replyTo = this.replyToMsgDetail;
            }
            console.log(chatMsg, " with atttachment");
            bus.emit('send-chat-msg-to-server', chatMsg);

            this.isFileUploading = false;
            this.uploadDiscussionFile = false;
            this.isDiscussionFileChosen = false;
            this.isAlreadyOpen = 0;
            this.discussionUserText = '';

            $('#attachmentContainer').css('bottom', 50);

            setTimeout(() => {
              this.checkForLineBreaks('discussionMessageBox_' + this.conversationId, 'messageBoxSection_' + this.conversationId);
            }, 100);
          }
        } else {
          alert('File upload error.');
        }
      } else {

        if (this.discussionUserText.trim() !== '') {


          const msg = document.querySelector('#' + chatInputId).value;
          evt.preventDefault();
          evt.stopPropagation();
          document.querySelector('#' + chatInputId).focus();
          this.discussionUserText = '';
          // console.log('document.getElementById(evt.target.id)', document.querySelector('#' + chatInputId));

          //
          // const msg = evt.target.value;
          // evt.preventDefault();
          // evt.stopPropagation();
          // document.getElementById(evt.target.id).focus();
          // console.log('document.getElementById(evt.target.id)', document.getElementById(evt.target.id));

          const chatMsg = {
            message: msg,
            acknowledgementStatusId: new Date().getTime(),
            conversationId: this.conversationId
          };

          if (this.replyToMsgDetail !== null && this.replyToMsgDetail !== undefined &&
                             this.replyToMsgDetail.id !== undefined && this.replyToMsgDetail.id !== null) {
            chatMsg.replyTo = this.replyToMsgDetail;
          }
          bus.emit('send-chat-msg-to-server', chatMsg);
          setTimeout(() => {
            this.checkForLineBreaks('discussionMessageBox_' + this.conversationId, 'messageBoxSection_' + this.conversationId);
          }, 100);
        }
      }

      // Bring focus back to the chat-input box
      document.getElementById('discussionMessageBox_' + this.conversationId).focus();

      setTimeout(() => {
        this.cancelMessageReply();// If any reply was done, clear it.
        document.getElementById('discussions_list_' + this.conversationId).scrollTop = document.getElementById('discussions_list_' + this.conversationId).scrollHeight;
      }, 100);
    },
    handleNewChatMessage (data) {
      // If the new message doesn't belong to this conversation, then do not handle it.
      if (data.conversationId !== this.conversationId) { return false; }

      // console.log('loggedInUser is ', this.loggedInUser);
      console.log("received new msg : ", data);



      const newMsg = {
        id: data.id,
        type: data.type,
        message: data.message,
        messageType: data.messageType,
        extra: data.extra,
        senderInfoId: data.senderInfo.split('#')[0],
        senderInfo: data.senderInfo.split('#')[1],
        time: data.createdOn.split('T')[1].split(':')[0] + ':' + data.createdOn.split('T')[1].split(':')[1],
        isSent: data.senderInfo.split('#')[0] === this.loggedInUser.userId,
        isReceived: data.senderInfo.split('#')[0] !== this.loggedInUser.userId,
        replyTo: data.replyTo
      };

      if (data.extra !== null && data.extra !== undefined) {
        newMsg["taskSno"] = "Task#" + data.extra.split("~")[1];
        newMsg["taskId"] = data.extra.split("~")[0];
      }

      if (data.replyTo !== null && data.replyTo !== undefined) {
        newMsg.replyToInfo = {
          id: data.replyTo.id, // split("#")[0],
          senderInfo: data.replyTo.senderInfo, // .split('#')[1], // split("#")[2],
          message: data.replyTo.message // split("#")[3]
        };
      }

      if (data.attachment !== null) {
        const attachment = {};
          attachment.id = data.attachment.id;
          attachment.type = data.attachment.type;
          attachment.size = data.attachment.size;
          attachment.full_name = data.attachment.name;

          const attachmentNameLength = data.attachment.name.length;
          if (attachmentNameLength > 15) {
            attachment.name = data.attachment.name.substr(0, 15) +
                              '..' +
                              data.attachment.name.substr(attachmentNameLength - 6, attachmentNameLength);
          }

          newMsg.attachment = attachment;
      }


      const formattedComment = newMsg.message.replaceAll('<mention', '<span class="mentioned-node"').replaceAll('</mention>', '</span>');
      newMsg.message = formattedComment;

      this.discussionMessages.push(newMsg);

      if (newMsg.isReceived) {
         // Load the senderImage after DOM updates, so give it 0.5seconds
         // setTimeout(() => this.fetchUserImage(newMsg.senderInfoId, newMsg.id), 500);
         // console.log('discussionMessages : ', this.discussionMessages);
      }



    },
    getChatConversationInfo (conversationId) {

      const url = './chat-conversations/get/' + conversationId;
      console.log("Retrieving data from : " + url);

      try
      {
        axios.get(process.env.VUE_APP_API_URL + url)
          .then((dataResponse) => {
              console.debug('Conversation Info Result : ', dataResponse);

              const conversationInfo = dataResponse.data.bean;
              const members = conversationInfo.members;
              const otherMembers = [];

              members.forEach(member => {
                if (member.id !== this.loggedInUser.userId) {
                  otherMembers.push(member);
                }
              });

              this.otherMembers = otherMembers;
              this.members = members;

          })
          .catch((error) => {
              console.error('Error while fetching my-conversations-list : ', error);
          });
      }
      catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }
    },
    getChatMessages (conversationId) {

      const url = './chat-conversations/' + conversationId + '/' + this.discussionsPageNumber;
      console.log("Retrieving data from : " + url);

      try {
        axios.get(process.env.VUE_APP_API_URL + url)
          .then((dataResponse) => {
            console.debug('ConversationMessages Result : ', dataResponse);
            // console.log(dataResponse.data["bean"]);

            if (dataResponse.data.actionResult === 1) {
              if (dataResponse.data.bean.length == 0) {
                this.isFullDiscussionHistoryLoaded = true;
              }

              let previousMessage = dataResponse.data.bean[1];

              dataResponse.data.bean// .reverse()
                .forEach(msg => {});

              for (let i = 0; i < dataResponse.data.bean.length; i++) {

                const msg = dataResponse.data.bean[i];

                // console.log("Chat msg : ", msg);
                if (msg.createdOn !== null && msg.createdOn !== '') {
                  msg.time = msg.createdOn.split('T')[1].split(':')[0] + ':' + msg.createdOn.split('T')[1].split(':')[1];
                }

                if (msg.senderInfo !== null && msg.senderInfo !== '' && msg.senderInfo.split('#')[0] === this.loggedInUser.userId) {
                  msg.isSent = true;
                }
                else {
                  msg.isReceived = true;
                }

                if (msg.extra !== null && msg.extra !== undefined) {
                  msg["taskSno"] = "Task#" + msg.extra.split("~")[1];
                  msg["taskId"] = msg.extra.split("~")[0];
                }

                msg.senderInfoId = msg.senderInfo.split('#')[0];
                msg.senderInfo = msg.senderInfo.split('#')[1];

                if (msg.replyTo !== undefined && msg.replyTo !== null && msg.replyTo.id !== null) {
                  msg.replyToInfo = {
                    id: msg.replyTo.id, // split("#")[0],
                    senderInfo: msg.replyTo.senderInfo, // split("#")[2],
                    senderInfoName: msg.replyTo.senderInfo.name, // msg.replyTo.senderInfo.split('#')[1], // split("#")[2],
                    message: msg.replyTo.message // split("#")[3]
                  };
                }

                if (msg.attachment !== undefined && msg.attachment !== null) {
                  msg.attachment.full_name = msg.attachment.name;
                  const attachmentNameLength = msg.attachment.name.length;
                  if (attachmentNameLength > 15) {
                    msg.attachment.name = msg.attachment.name.substr(0, 15) +
                                                                            '..' +
                                                                            msg.attachment.name.substr(attachmentNameLength - 6, attachmentNameLength);
                  }
                }

                if (msg.type !== 'info#new_joinee' && msg.message.trim() !== '') {


                    // Consecutive Message Finder Logic
                    msg.isConsecutiveMessage = false; // Just initialize with a false for v-if's
                    if (previousMessage !== null && previousMessage !== undefined) {

                      // If this message was sent consecutively by the same sender, then mark the current message as "isConsecutiveMessage",
                      // So that we can style it without the bubble's ::after triangle css
                      if (previousMessage.senderInfo.split('#')[0] === msg.senderInfoId) {
                        msg.isConsecutiveMessage = true;
                      }

                      // msg.message = previousMessage.senderInfo.split('#')[0] + " :: " + msg.senderInfoId + " :: " + previousMessage.message.substr(0, 20) + " ... " + msg.message;
                    }


                    if (msg.starred !== null && msg.starred.includes(this.loggedInUser.userId)) {
                      msg.isStarred = true;
                    } else {
                      msg.isStarred = false;
                    }

                    const formattedComment = msg.message.replaceAll('<mention', '<span class="mentioned-node"').replaceAll('</mention>', '</span>');
                    msg.message = formattedComment;

                    this.discussionMessages.unshift(msg);

                    if (msg.isReceived) {
                       // this.fetchUserImage(msg.senderInfoId, msg.id);
                    }

                 }
                 else
                 {
                   console.log(msg, " was not pushed");
                 }

                 if ((i + 2) < dataResponse.data.bean.length) {
                    previousMessage = dataResponse.data.bean[i + 2];
                 }
              }

              if (this.discussionsPageNumber === 1) {
                // this.updateChatScrollBar('discussions_list_' + this.conversationId);
              }

              this.discussionsPageNumber += 1;


            } else {
              console.error('Error', dataResponse);
              alert('Error : ' + dataResponse);
            }
          })
          .catch((error) => {
            console.error('Error while fetching my-conversations-list : ', error);
          });
      } catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }
    },
    replyToMessage () {

      const msg = this.selectedMessage;
      this.replyToMsg = true;

      // alert(msg.senderInfo);
      console.log(msg);

      this.replyToMsgDetail = {
        id: msg.id,
        senderInfo: {
          id: msg.senderInfoId,
          name: msg.senderInfo
        },
        senderInfoName: msg.senderInfo,
        message: msg.message
      };

      const textareaId = 'discussionMessageBox_' + this.conversationId;
      document.querySelector("#" + textareaId).focus();

      this.hideContextMenu();
    },
    cancelMessageReply () {
      this.replyToMsg = false;
      this.replyToMsgDetail = {};
    },
    convertToTask () {
      // this.convertMsgToTask(data);
      const msg = this.selectedMessage;
      console.log('msg to be converted is ', msg);

      const basicTaskInfo = {
        subject: msg.message,
        chatMessageId: msg.id,
        ownerId: msg.senderInfoId,
        isTriggeredFromChatScreen: true,
        modalKey: "new_task"
      };

      this.hideContextMenu();
      // console.log('Event emitted in bus.', new Date(), data);
      bus.emit('newTaskEvent', basicTaskInfo);
    },
    starConversationMessage () {

      this.hideContextMenu();
      const url = './chat-conversations/star-conversation-msg';
      const data = {
          id: this.clickedChatMessageId
      };

      axios.post(url, data)
        .then((dataResponse) => {
          console.log(dataResponse);
          if (dataResponse.data.status === "success") {
            // alert("Reset unread count in the ui via bus-event.");
            // bus.emit('resetUnreadCount', this.conversationId);
            this.discussionMessages.forEach(item => {
              if (item.id === this.clickedChatMessageId) {
                  item.isStarred = true;
              }
            });
          }
        })
        .catch(function (errorResponse) {
          console.log('ERROR MS - ', errorResponse);
          const exceptionMsg = errorResponse.response.data.exception;
        });
    },
    unstarConversationMessage () {

      this.hideContextMenu();
      const url = './chat-conversations/unstar-conversation-msg';
      const data = {
          id: this.clickedChatMessageId
      };

      axios.post(url, data)
        .then((dataResponse) => {
          console.log(dataResponse);
          if (dataResponse.data.status === "success") {
            // alert("Reset unread count in the ui via bus-event.");
            // bus.emit('resetUnreadCount', this.conversationId);
            this.discussionMessages.forEach(item => {
              if (item.id === this.clickedChatMessageId) {
                  item.isStarred = false;
              }
            });
          }
        })
        .catch(function (errorResponse) {
          console.log('ERROR MS - ', errorResponse);
          const exceptionMsg = errorResponse.response.data.exception;
        });
    },

    // Handling File uploads
    uploadFileType (fileType) {
      if (fileType === 'image') {
        document.getElementById(this.conversationId + '_discussionFileUploadForm').setAttribute('accept', 'image/*');
      }
      else {
        document.getElementById(this.conversationId + '_discussionFileUploadForm').setAttribute('accept', '.csv, .xls, .doc, .docx, .pdf');
      }

      document.getElementById(this.conversationId + '_discussionFileUploadForm').value = '';
      document.getElementById(this.conversationId + '_discussionFileUploadForm').click();
    },
    onFileChosenImpl2 (event) {
      const fileList = event.target.files; // document.getElementById(this.conversationId + '_discussionFileUploadForm').files;
      const fileName = fileList[0].name;

      if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.svg') ||
               fileName.endsWith('.bmp') || fileName.endsWith('.jpeg') ||
               fileName.endsWith('.csv') || fileName.endsWith('.xls') || fileName.endsWith('.txt') ||
               fileName.endsWith('.doc') || fileName.endsWith('.docx') || fileName.endsWith('.pdf')) {
        this.isDiscussionFileChosen = true;
        this.chosenDiscussionFileName = fileList[0].name;
      } else {
        this.isDiscussionFileChosen = false;
        alert('File Type not accepted.');
      }
    },
    removeDiscussionFile () {
      const _this_component = this;

      _this_component.uploadDiscussionFile = false;
      _this_component.isDiscussionFileChosen = false;
      _this_component.chosenDiscussionFileName = 'Not chosen';
      _this_component.isFileUploading = false;
    },
    uploadFile (fileList) {
      return new Promise(resolve => {
        const _this_component = this;
        // handle file changes
        const formData = new FormData();

        formData.append('file', fileList[0], fileList[0].name);
        formData.append('name', fileList[0].name);
        formData.append('conversationId', _this_component.conversationId);
        formData.append('senderInfo', _this_component.loggedInUser.userId + '#' + _this_component.loggedInUser.username);

        var url = process.env.VUE_APP_API_URL + 'chat-conversations/upload';
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('ENCTYPE', 'multipart/form-data');
        // xhr.setRequestHeader('Authorization', localStorage.getItem('authToken'));
        // xhr.setRequestHeader("Content-Type","multipart/form-data;boundary=CUSTOM");
        xhr.send(formData);

        // Setup our listener to process completed requests
        xhr.onload = function () {
          // Process our return data
          if (xhr.status >= 200 && xhr.status < 300) {
            // This will run when the request is successful
            console.log('file upload success!', xhr);

            resolve(xhr);

            /*
                    let savedImageName = xhr["responseText"];
                    console.log("savedImageName=" + savedImageName);
                    _this_component.uploadedPicId = savedImageName;
                    $("#uploadedImage").attr("src","/api/us/profile/get/" + savedImageName);

                    self.postMessage("Processed data from Worker.");
                    */
          } else {
            // This will run when it's not
            console.log('The request failed!');
          }

          // This will run either way
          // All three of these are optional, depending on what you're trying to do
          // console.log('This always runs...');
        };
      }, reject => {
        reject('File upload Error.');
      });
    },
    downloadFile (doc_id) {
      const _this_component = this;
      if (true) // has file download permissions check
      {
        try {
          const url = '/chat-conversations/get/' + doc_id + '/download';
          var div = document.createElement('div');
          div.setAttribute('style', 'height:0px;display:none');
          document.body.appendChild(div);
          div.innerHTML = "<iframe width='0' height='0' scrolling='no' frameborder='0' src='" + url + "'></iframe>";
        } catch (e) {
          alert(e);
        }
      }
    },
    oldOpenContextMenu (msgId, evt) {
      // if(this.msg.isDeleted)
      //   return false;

      document.querySelectorAll('.context-menu').forEach((item) => {
        // item.style.display="none";
        if (item.getAttribute('id') !== 'ctx_menu_' + msgId) {
          item.classList.remove('opened');
        }
      });
      // document.querySelectorAll(".ctx-menu-trigger").forEach((item)=>{ item.style.opacity=0; });

      const differenceFromBottom = document.getElementById('discussions_list_' + this.conversationId).parentElement.scrollHeight -
                                   document.getElementById(msgId).getBoundingClientRect().top;

      if (differenceFromBottom < 150) {
        document.getElementById('ctx_menu_' + msgId).style.top = '-60px';
      } else {
        document.getElementById('ctx_menu_' + msgId).style.top = '40px';
      }

      if (!document.getElementById('ctx_menu_' + msgId).classList.contains('opened')) {
        // document.getElementById("ctx_menu_" + msgId).style.display = "grid";
        document.getElementById('ctx_menu_' + msgId).style.transform = 'scale(1)';
        document.getElementById('ctx_menu_' + msgId).classList.add('opened');
      } else {
        // document.getElementById("ctx_menu_" + msgId).style.display = "none";
        document.getElementById('ctx_menu_' + msgId).style.transform = null;
        document.getElementById('ctx_menu_' + msgId).classList.remove('opened');
      }

      // Add click-listener
      document.querySelector('body').addEventListener('click', this.handleClickEventOnBody, false);

      // document.getElementById("ctx-menu-trigger-" + msgId).style.opacity=1;
    },
    hideContextMenu () {
      console.log('hideContextMenu called..');
      document.querySelectorAll('.chat_msg_item_context_menu').forEach((item) => {
        item.style.display = 'none';
        item.classList.remove('opened');
      });

      // Remove click listener
      document.querySelector('body').removeEventListener('click', this.handleClickEventOnBody, false);
    },
    handleClickEventOnBody (event) {
      const foundParent = event.target.closest('.chat_msg_item_context_menu');
      if (foundParent === null) {
        // This means, if target on which the click happened is not within the context-menu div, so you can close the context-menu dropdown.
        this.hideContextMenu();
      }
    },

    // Handling Msg-To-Task conversions
    fetchCategoryInfo () {
      // populate categoryAssigneeIds and categoryFollowerIds

      const get_url = './categories/get/' + this.categoryId;

      axios.get(process.env.VUE_APP_API_URL + get_url)
        .then((dataResponse) => {
          if (dataResponse.data.actionResult == 1) {
            const categoryObject = dataResponse.data.bean;
            this.categoryObject = categoryObject;
            this.categoryAssigneeIds = this.categoryObject.memberIds;
            console.log('Category information is ', categoryObject);
          }
        })
        .catch((error) => {
          UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 5000
          });
          return false;
        });
    },
    convertMsgToTask () {

      const msg = this.selectedMessage;
      console.log('msg to be converted is ', msg);

      const basicTaskInfo = {
        subject: msg.message,
        chatMessageId: msg.id,
        ownerId: msg.senderInfoId
      };

      console.log('Converted Task Info is ', basicTaskInfo);

      this.save(basicTaskInfo);
    },
    save (basicTaskInfo) {
      const post_url = './tasks/save';
      console.log('Posting data to : ' + post_url);

      const form = {
        id: 'new',
        name: basicTaskInfo.subject,
        type: null,
        priority: null,
        status: null,
        description: basicTaskInfo.subject,
        estimatedDuration: null,
        estimatedDurationUnit: null,
        assigneeIds: this.categoryObject.memberIds,
        followerIds: [basicTaskInfo.ownerId],
        categoryId: this.categoryId,
        ownerId: basicTaskInfo.ownerId
      };

      console.log('Task Form Data : ', form);

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {
          console.log('Converted Task Save Result : ');
          console.log(dataResponse);

          if (dataResponse.data.actionResult === 1) {
            const taskInfo = dataResponse.data.bean;

            UIkit.notification(`<div class="taskone-notification">
                                                    <span uk-icon="icon: check;ratio:1"></span>
                                                    <div> Chat Msg converted to Task#${taskInfo.sno}. </div>
                                                </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 5000
            });

            this.$emit('refreshList', {});
          } else {
            const errorMsg = (dataResponse.data).message;
            UIkit.notification("<span uk-icon='icon: warning;ratio:1'></span>" + errorMsg, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });

            return false;
          }
        })
        .catch(function (errorResponse) {
          console.log('ERROR MS - ', errorResponse);
          const exceptionMsg = errorResponse.response.data.exception;

          UIkit.notification("<span uk-icon='icon: warning ;ratio:1'></span> " + exceptionMsg + '.', {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 5000
          });

          return false;
        });
    },
    fetchUserImage (userId, selectorId) {

        // const m = new Map();
        //   m.set(userId, "abc");
        //   console.log("m : ", m.has(userId));

        // Check in the local component cache-map if there is a matching blobURL for this userId.
        // console.log(userId, this.userImageMapCache);
        // console.log("1. key_" + userId, this.userImageMapCache.has("key_" + userId));
        if (this.userImageMapCache.has("key_" + userId)) {
          if (document.querySelector(`#chat_msg_${selectorId} img`)) {
            const objectURL = this.userImageMapCache.get("key_" + userId);
            // console.log(selectorId, " loading image from cache : ", objectURL);
            document.querySelector(`#chat_msg_${selectorId} img`).setAttribute("src", objectURL);
            console.log("No redundant fetching : Loading image from cache map");
          }
          return false;
        }

        fetch(process.env.VUE_APP_API_URL + 'api/us/profile/get/' + userId)
        .then((response) => {
          return response.blob();
        })
        .then((myBlob) => {

            console.log("Fetched image from server for " + userId);
            if (this.userImageMapCache.has("key_" + userId)) {

              if (document.querySelector(`#chat_msg_${selectorId} img`)) {
                const objectURL = this.userImageMapCache.get("key_" + userId);
                console.log("loading existing objectURL image from cache : ", objectURL);
                document.querySelector(`#chat_msg_${selectorId} img`).src = objectURL;
              }
              return false;
            }

            var objectURL = URL.createObjectURL(myBlob);
            console.log(selectorId, document.querySelector(`#chat_msg_${selectorId} img`));

            if (document.querySelector(`#chat_msg_${selectorId} img`)) {
              document.querySelector(`#chat_msg_${selectorId} img`).src = objectURL;
            }

            this.userImageMapCache.set("key_" + userId, objectURL);
            console.log("2. key_" + userId, this.userImageMapCache.has("key_" + userId));
        });

    },

    toggleActivityDetail (event) {
      const trigger = event.target;

      // If the dropdown trigger was clicked, then ignore opening the details
      if (event.target.classList.contains("activity_detail_trigger"))
      {
        return false;
      }

      event.target.classList.toggle('flip_vertically');

      const elementTarget = event.target.closest('.activity_description');
      console.log(elementTarget);
      console.log(elementTarget.querySelector('.activity_detail'));

      if (elementTarget.querySelector('.activity_detail') !== null) { elementTarget.querySelector('.activity_detail').classList.toggle('hide_activity_detail'); }
    },
    // Handling context menu actions
    handleChatMessageContextMenuClicked (data) {

        // Don't use state variables such as this.** here within listeners.
        // Because they don't update when the data changes, but component doesn't get reloaded.
        // For example, this.clickedChatMessageId if passed into handleReplyAction as a parameter,
        //    it only passes the value of this.clickedChatMessageId when this component was mounted.
        //    it doesn't update that value. So always fire only functions from listeners and let the fired
        //    function extract the current data from within its function body.

        console.log("handleChatMessageContextMenuClicked this.clickedChatMessageId received in " + this.embeddingComponentName + " : ", this.clickedChatMessageId);
        console.log("action data : ", data);

        if (data.action === 'reply') {
          this.replyToMessage(data);
        }
        else if (data.action === 'reply_privately') {
          this.handleReplyPrivatelyAction(data);
        }
        else if (data.action === 'star') {
          this.starConversationMessage(data);
        }
        else if (data.action === 'unstar') {
          this.unstarConversationMessage(data);
        }
        else if (data.action === 'convert_to_task') {

          // this.convertMsgToTask(data);
          const msg = this.selectedMessage;
          console.log('msg to be converted is ', msg);

          const basicTaskInfo = {
            eventSource: "convertChatMessageToTaskEvent",
            subject: msg.message,
            chatMessageId: msg.id,
            ownerId: msg.senderInfoId,
            modalKey: "new_task",
            possibleAssignees: this.otherMembers,
            possibleFollowers: [] // Logically add it later.
          };

          console.log('Event emitted in bus.', new Date(), data);
          bus.emit('newTaskEvent', basicTaskInfo);
        }

        this.closeChatMessageContextMenu();
    },
    handleReplyAction (data) {
      console.log("handleReplyAction this.clickedChatMessageId received in " + this.embeddingComponentName + " : ", this.clickedChatMessageId);
      console.log("data received via bus selectedActivityId : ", data.selectedActivityId);
      this.openActivityCommentBox(data.selectedActivityId);
      this.closeChatMessageContextMenu();
    },
    closeChatMessageContextMenu () {

        const chatMessageContextMenu = document.querySelector('.chat_msg_item_context_menu');
              chatMessageContextMenu.classList.remove("opened");
              chatMessageContextMenu.style.transform = null;
    },

    openContextMenu (event) {

      const availableActivitiesContainer = document.querySelector("#" + 'discussions_list_' + this.conversationId);
      event.stopPropagation();
      event.preventDefault();

      console.log("target clicked is ", event.target);

      // Ignore this click event as it landed else where.
      if (!event.target.classList.contains("ctx-menu-trigger"))
      {
        // Position the context menus
        const primaryButton = event.target;
        const chatMessageContextMenu = document.querySelector('.activity_item_context_menu');
              chatMessageContextMenu.classList.remove("opened");

        this.closeChatMessageContextMenu();
        return false;
      }
      else if (event.target.classList.contains("ctx-menu-trigger")) {

        // Position the context menus
        const primaryButton = event.target;
        const chatMessageContextMenu = document.querySelector('.chat_msg_item_context_menu');



        // close it if its opened.
        if (chatMessageContextMenu.classList.contains("opened")) {
          this.closeChatMessageContextMenu();
          return false;
        }

        this.clickedChatMessageId = primaryButton.getAttribute("data-chat-message-id");
        this.isClickedConversationMessageStarred = event.target.closest(".chat_msg").getAttribute("data-starred") === "true";
        this.selectedMessage = this.discussionMessages.find(item => item.id === this.clickedChatMessageId);
        console.log("clickedChatMessageId : ", this.clickedChatMessageId);
        console.log("selectedMessage : ", this.selectedMessage);
        chatMessageContextMenu.setAttribute("data-selected-chat-message-starred", this.isClickedConversationMessageStarred);
        chatMessageContextMenu.setAttribute("data-selected-chat-message-id", this.clickedChatMessageId);
        chatMessageContextMenu.setAttribute("data-selected-chat-conversation-id", this.conversationId);

        // This code block toggles the context menu options based on this selected message's isStarred flag.
        if (this.isClickedConversationMessageStarred) {
          document.querySelector(".option_to_star").classList.add('hide_display');
          document.querySelector(".option_to_unstar").classList.remove('hide_display');
        }
        else {
          document.querySelector(".option_to_unstar").classList.add('hide_display');
          document.querySelector(".option_to_star").classList.remove('hide_display');
        }

        chatMessageContextMenu.classList.add("opened");
        const bcr = primaryButton.getBoundingClientRect();
        const menuVerticalGap = document.querySelector("body").getBoundingClientRect().bottom - bcr.bottom;
        const menuHorizontalGap = document.querySelector("body").getBoundingClientRect().right - bcr.right;
        const contextMenuHeight = 200;
        const contextMenuWidth = 150;
        const doesMenuHaveEnoughVerticalVisibleSpace = menuVerticalGap > contextMenuHeight;
        const doesMenuHaveEnoughHorizontalVisibleSpace = menuHorizontalGap > contextMenuWidth;



        // console.log("primaryButton's BCR ", bcr);

        if (doesMenuHaveEnoughVerticalVisibleSpace && doesMenuHaveEnoughHorizontalVisibleSpace)
        {
          chatMessageContextMenu.style.transformOrigin = "left top";
          chatMessageContextMenu.style.top = bcr.top + bcr.height + 2 + 'px';
          chatMessageContextMenu.style.left = bcr.left + 'px';
        }
        else if (!doesMenuHaveEnoughVerticalVisibleSpace && doesMenuHaveEnoughHorizontalVisibleSpace)
        {
          chatMessageContextMenu.style.transformOrigin = "left bottom";
          chatMessageContextMenu.style.top = bcr.top - contextMenuHeight - 35 + bcr.height + 2 + 'px';
          chatMessageContextMenu.style.left = bcr.left + 'px';
        }
        else if (doesMenuHaveEnoughVerticalVisibleSpace && !doesMenuHaveEnoughHorizontalVisibleSpace)
        {
          chatMessageContextMenu.style.transformOrigin = "right top";
          chatMessageContextMenu.style.top = bcr.top + 2 + 'px';
          chatMessageContextMenu.style.left = bcr.left - contextMenuWidth - bcr.width + 'px';
        }
        else if (!doesMenuHaveEnoughVerticalVisibleSpace && !doesMenuHaveEnoughHorizontalVisibleSpace)
        {
          chatMessageContextMenu.style.transformOrigin = "right bottom";
          chatMessageContextMenu.style.top = bcr.top - contextMenuHeight + 2 + 'px';
          chatMessageContextMenu.style.left = bcr.left - contextMenuWidth - bcr.width + 'px';
        }

        console.log("menu bcr : ", bcr);
        console.log("availableActivitiesContainer bcr : ", availableActivitiesContainer.getBoundingClientRect());
        console.log("doesMenuHaveEnoughVerticalVisibleSpace : ", menuVerticalGap, (menuVerticalGap - contextMenuHeight), doesMenuHaveEnoughVerticalVisibleSpace);
        setTimeout(() => {
          chatMessageContextMenu.style.opacity = "1";
          chatMessageContextMenu.style.transform = "scale(1)";
          chatMessageContextMenu.style.display = null;
        }, 150);
      }

    }

  },
  created: function () {

  },
  mounted: async function () {



    bus.on('handle-new-chat-message', (data) => {
      this.handleNewChatMessage(data);
    });

    console.log('Chat-page mounted.');


    this.getChatConversationInfo(this.conversationId);
    this.getChatMessages(this.conversationId);

    setTimeout(() => {

        console.log('discussions_list_' + this.conversationId);
        document.getElementById('discussions_list_' + this.conversationId)
                .addEventListener("pointerdown", e => {
                  console.log("discussions_list clicked : ", e);
                  this.openContextMenu(e);
                });

        document.getElementById('discussions_list_' + this.conversationId)
                .addEventListener("scroll", e => {

                    if ((e.target.scrollTop + e.target.offsetHeight) >= (e.target.scrollHeight - 0)) {

                      // alert("User has reached the end of messages.");
                      // Send a post message to signal that the currently loggedInUser has read all messages of this conversationId.
                      // Data to be passed is just the conversationId;

                      const url = './chat-conversations/update-read-count';
                      const data = {
                          id: this.conversationId
                      };

                      axios.post(url, data)
                        .then((dataResponse) => {
                          console.log(dataResponse);
                          if (dataResponse.data.status === "success") {
                            // alert("Reset unread count in the ui via bus-event.");
                            bus.emit('resetUnreadCount', this.conversationId);
                          }
                        })
                        .catch(function (errorResponse) {
                          console.log('ERROR MS - ', errorResponse);
                          const exceptionMsg = errorResponse.response.data.exception;
                        });

                    }
                });


    }, 1000);

    if (this.categoryId) { this.fetchCategoryInfo(); }

    bus.off('onChatMessageContextMenuClicked');
    bus.on('onChatMessageContextMenuClicked', data => {

      // If the context menu was clicked in another chat-conversation, then ignore it.
      if (data.conversationId === this.conversationId)
        { this.handleChatMessageContextMenuClicked(data); }

    });


  },
  watch: {

  }
};

</script>
