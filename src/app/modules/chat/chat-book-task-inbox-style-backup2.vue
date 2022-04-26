<style scoped>



  .app-side-menu{
    flex-grow: 1;
    box-sizing: border-box;
    height: 100%;
    display: flex;
  	transition: all 0.3s linear;
  }

  .app-side-menu.isClosed{
    flex-grow: 0;
  }

  .app-side-menu-content{
    display: flex;
    flex-direction: column;
    width: 100%;
    opacity: 1;
  }

  .app-side-menu-content.isClosed{
    display:none;
  }

  .hide_display{
    display:none;
  }

  .conf_card {
    background-color: #fff;
    border-radius: 1px;
    padding: 7px 12px;
    border-bottom: 0.05em solid rgb(229, 229, 229);
    display: inline-block;
    grid-template-columns: 1fr;
    font-weight: 400;
    margin-left: 0px;
    margin-right: 0px;
    position: relative;
    gap: 20px;

    transition: all 0.2s linear;
    border: 0.05em solid #cccaca !important;
    box-shadow: inset rgba(0, 0, 0, 0.08) 0px -1px 7px 0px;
    min-width: 65%;
  }

  .conf_card:hover {
    background-color: whitesmoke;
  }

  .card_button {
    font-size: 0.6rem;
    line-height: 26px !important;
    height: 30px;
    cursor: pointer;
    background-color: #03a9f4;
    padding: 0px 0px !important;
    border: 0.05em solid #03a9f4;
    font-weight: normal !important;
    color: #fdfdfd !important;
    /*transition: all 0.2s linear;*/
    border-radius: 1px;
  }

  .card_button_disabled {
    background-color: #c3c8ca !important;
    border: 0.05em solid #c3c8ca !important;
    pointer-events: none !important;
  }

  .adk_conf_notification {
    background-color: #fff;
    border-radius: 1px;

    padding: 7px 12px;
    border-bottom: 0.05em solid rgb(229, 229, 229);
    display: inline-block;
    grid-template-columns: 1fr;
    font-weight: 400;
    margin-left: 0px;
    margin-right: 0px;
    position: relative;
    gap: 20px;
  }

  .shortcut {
    padding: 10px;
    -webkit-user-drag: none;
    user-drag: none;
    user-select: none;
  }

  /* Show that pressed effect */
  .shortcut:active {
    cursor: pointer;
  }

  .shortcut * {
    -webkit-user-drag: none;
    user-drag: none;
    user-select: none;
  }

  .shortcut:hover {
    background-color: whitesmoke;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transform: rotate(360);
  }

  .desktop_container_component {
    background: white;
    overflow-x: hidden;
    padding: 0px;
    box-sizing: border-box;
    grid-gap: 0px;
    z-index: 2;
  }

  .first_column {
    overflow-x: hidden;
    border-right: 1px solid #cccccc;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
  }

  .first_column_scrollable {
    overflow-y: auto;
  }

  .second_column {
    overflow-x: hidden;
    overflow-y: hidden;
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .back-button {
    background-color: transparent;
    border-radius: 50%;
    place-self: center flex-start;
    place-items: center;
    font-size: 0.65rem;
    line-height: 32px;
    font-weight: normal !important;
    padding: 0px 7px;
    fill: green;
    transition: 0.25s linear;
  }

  .back-button:hover {
    background-color: rgb(210 210 210);
  }

  .back-button > svg > path {
    background-color: rgb(232 232 232);
    fill: rgb(181 181 181);
  }

  .back-button:hover > svg > path {
    fill: rgb(95 95 95);
  }

  .tab-bar {
    padding: 10px 5px 5px;
    color: rgb(51, 51, 51);
    background: white;
    height: 35px;
    margin: 0px;
  }

  .right-panel-header {
    padding: 5px 10px;
    margin-left: 10px;
    margin-right: 10px;
    background: #f5f5f5;
    display: flex !important;
    align-items: center;
    min-height: 25px;
  }

  .right-panel-header > a {
    padding: 5px;
    background: #f3f3f3;
    letter-spacing: 0.025rem;
    margin-left: auto;
    color: #5f5f5f;
  }

  .uk-switcher-component {
    margin-top: 20px;
  }

  .right-panel-list {
    margin: 10px 20px;
  }

  .right-panel-list > ul > li {
    margin-top: 5px;
  }

  .complete_task_btn {
    cursor: pointer;
    padding: 2px 10px !important;
    color: white !important;
    border: 1px solid rgb(240, 80, 110);
    background-color: rgb(240, 80, 110);
    border-radius: 3px;
    place-self: center;
    place-items: center;
    min-width: 100px;
    font-size: 0.65rem;
    font-weight: normal !important;
  }

  .uk-placeholder {
    margin-bottom: 20px;
    padding: 30px 30px;
    background: white;
    border: 1px solid #e5e5e5;
  }


  .task-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 36px 1fr;
    background-color: #fff;
    xbox-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    /* border: 0.01em solid #dadada; */
    overflow-y: hidden;
    border-radius: 3px;
  }

  .list-item-menu{
    opacity : 0;
    transition:0.25s linear;
    background-color: #ffffffa8;
    border-radius: 50%;
    padding: 5px;
    transform-origin:50% 50%;
    position: absolute;
    right: 7px;
    top: 7px;
  }

  .list-row:hover{
    background: #dbecff !important;
  }

  .list-row:active{
    transform : scale(0.98);
  }

  .list-row:hover .list-item-menu{
    opacity : 1;
  }

  .list-item-menu:hover{
    cursor:pointer;
    transform: rotate(90deg);
  }

  .list-detail{
    display: grid;
    max-height: 70px;
    grid-template-rows: auto auto auto;
    margin-right: 10px;
    background: transparent;
    border-bottom: 0.0em solid rgb(229, 229, 229);
    flex-grow: 1;
    padding: 10px 10px 7px 0px;
  }

  .list-row {
    border: .05em solid #e5e5e5;
    /* border-left: 5px solid rgb(37 139 255 / 10%);*/
    border-left: .05em solid #e5e5e5;
    /* border-left: .05em solid transparent; */
    /* border-right: .05em solid transparent;*/
    background: white;
    background:#fcfcfc;
    border-radius: 5px;
    transition: all 0.2s linear;
    display: flex;
    column-gap: 10px;
    user-select:none;
    position:relative;
    box-shadow: rgb(0 0 0 / 5%) 4px 3px 10px 0px;
    transition: 0.1s ease-in;
  }

  .list-row.active {
    /* border-left: 5px solid #1f69bd;
    border-left: 5px solid rgb(37, 139, 255); */
    background: #f0f7ff;
  }

  .active-border{
    position: absolute;
    left: -10px;
    top: 0px;
    bottom: 0px;
    width: 5px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background: rgb(37, 139, 255);
    transition: 0.1s linear;
  }

  .list-row.active .active-border{
    transform: translate(10px);
  }

  .list-row:hover {
    background: #f0f7ff;
  }

  .list-row .task-sno {
    font-size: 0.65rem;
    font-weight: bold;
    font-family: Muli, sans-serif !important;
    color: #8a8a8a;
  }

  .list-row .task-created-date {
    background: #fff4d3;
    background: transparent;
    padding: 2px 0px;
    border-radius: 3px;
    font-size: 0.45rem;
  }

  .list-row .task-name {
    font-size: .8rem;
    padding-bottom: 5px;
    padding-top: 5px;
    overflow-y: hidden;
  }

  .list-row .task-status {
    font-weight: bold;
    font-size: 0.5rem;
    letter-spacing: 0.5px;
  }

  .adk_columns {
    display: grid;
    height: 100px;
    grid-template-rows: auto auto auto auto;
    grid-template-columns: 7fr 3fr 2fr 2fr 20px 2fr;
  }

  .list-item-link {
    color: #6b6b6b !important;
  }
  .list-item-link:hover {
    color: #333 !important;
    text-decoration: none !important;
  }

  .ui_grid_row:hover .list-item-link {
    background: aliceblue;
    color: #333 !important;
  }

    .uk-subnav-pill > * > a {
      font-size: 0.55rem !important;
      border-radius: 0px;
      letter-spacing: 00.055rem;
    }

    .uk-subnav-pill > .uk-active > a {
      border-bottom: 2px solid #4698f5!important;
      color: #4698f5;
      background-color: #fff0!important;
    }

      .new_activity{
          display:none !important;
      }

      .pulse_activity{
          animation-duration: 3s;
          animation-name: pulse;
          animation-iteration-count:  1;
          animation-timing-function : linear;
          animation-fill-mode:forwards;
          -webkit-animation-duration: 3s;
          -webkit-animation-name: pulse;
          -webkit-animation-iteration-count:  1;
          -webkit-animation-timing-function : linear;
          -webkit-animation-fill-mode:forwards;
      }

        @keyframes pulse {
            0% {
                opacity   : 1;
            }
            20% {
                opacity   : 0;
            }
            30% {
                opacity   : 1;
            }
            40% {
                opacity   : 0;
            }
            60% {
                opacity   : 1;
            }
            80% {
                opacity   : 0;
            }
            100% {
                opacity   : 1;
            }
        }

      .activity_description{
        position: relative;
        padding: 10px 10px 0px 10px;
        min-height: 75px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-radius: 3px;
        transition: 0.25s ease-in;
      }

      .activity_description>div{
        margin-bottom:5px;
      }

      .activity-sno{
        top: 45px;
        left: -42px;
        height: 15px;
        width: 20px;
        text-align: center;
        border-radius: 2px;
        position: absolute;
        color: #ffffff;
        background: #8BC34A;
        font-size: .55rem;
      }

      .task_filter_form{
          position: absolute;
          top: 50px;
          left: 15px;
          display: flex;
          flex-grow: 1;
          width: 50%;
          height: auto;
          background: #fff;
          box-sizing: border-box;
          opacity: 1;
          z-index: 100;
          border-width: 0px 0px 0px 0px;
          border-top-style: solid;
          border-right-style: solid;
          border-bottom-style: solid;
          border-left-style: solid;
          border-top-color: silver;
          border-right-color: silver;
          border-bottom-color: silver;
          border-left-color: silver;
          border-image: initial;
          box-shadow: 0 15px 12px 0 rgba(0,0,0,.12);
      }

        .subtask-back-button {
            background-color: hsl(0deg 1% 72%/18%);
            border-radius: 50%;
            place-self: center flex-start;
            place-items: center;
            font-size: .65rem;
            height: 40px;
            width: 40px;
            font-weight: 400!important;
            padding: 0 7px;
            fill: #0de60d;
            color: rgb(255 255 255);
            transition: .25s linear;
        }

        .subtask-back-button>svg>path{
            background-color: rgb(232 232 232);
            fill: rgb(101 101 101);
        }

    .side-bar-light .uk-nav-sub>li.selected-menu>a {
        color: #333!important;
        font-weight: bold!important;
        font-size: .7rem;
    }

    .hide_reveal{
      opacity: 0;
    }

    .spinner-2 {
      width:50px;
      height:50px;
      border-radius:50%;
      border:8px solid;
      border-color:lightblue;
      border-right-color: orange;
      animation:s2 1s infinite linear;
      opacity: 0.5;
    }
    @keyframes s2 {to{transform: rotate(1turn)}}

</style>

<template>

  <div class="app_container" style="background: rgb(255, 255, 255, 0);grid-template-columns: 2fr 5fr;display: flex;box-sizing: border-box;width: 100%;">

    <div id="chatSideMenu" class="app-side-menu" >
        <div vv-if="loggedInUser.isInformationFetchComplete"  id="chatSideMenuContent"  class="app-side-menu-content">
          <div class="uk-offcanvas-bar0 custom-scroll-bar side-bar-light" style="flex-grow:1">

              <div>
                <div style="min-height: 75px;opacity: 1;display: flex;align-items: center;justify-content: center;">
                    <div style="position:relative">
                      <button id="new_task_button_calendar" v-on:click="createChat('one-to-one')" xv-on:click="goTo('create-task-page')" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                              style="background-color: #1f69bd;background-color:rgb(37, 139, 255); border-radius: 3px; place-self: center center; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 30px;height: 32px; font-weight: normal !important;;border-bottom-right-radius: 0px;border-top-right-radius: 0px;">
                        <span class="lnr lnr-bubble" style="transform: scale(1.25);"></span>
                        <span style="margin-left:5px"> New Chat</span>
                      </button>
                      <button v-on:click="handleNewChatOptionsClick()" xv-on:click="goTo('create-task-page')" class="new_task_options_trigger_button clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                              style="background-color: rgb(37, 139, 255);border-radius: 0px 3px 3px 0px;place-self: center;place-items: center;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-top: 0px;margin-left: 0.045rem;padding: 0px;height: 32px;">
                            <span uk-icon="triangle-down" class="uk-icon" style="pointer-events:none"></span>
                      </button>
                      <div id="new_task_button_calendar_options" class="new_task_options">
                          <div id="menu" class="menu menu_fixed_height">
                              <div v-on:click="createChat('one-to-one')"  uk-tooltip="title:Create a chat with an Individual;pos:right">
                                  <span class="lnr lnr-user" style="transform: scale(1);"></span>
                                  <span style="padding-left: 10px;">One-to-One Chat</span>
                              </div>
                              <div v-on:click="createChat('category-chat')" uk-tooltip="title:Create Chat Conversation for a Task Category;pos:right">
                                  <span class="lnr lnr-tag" style="transform: scale(1);"></span>
                                  <span style="padding-left:10px;">Category Chat</span>
                              </div>
                              <div v-on:click="createChat('group-chat')" uk-tooltip="title:Create a Group Chat;pos:right">
                                  <span class="lnr lnr-users" style="transform: scale(1);"></span>
                                  <span style="padding-left:10px;">Group Chat</span>
                              </div>
                         </div>
                      </div>
                    </div>
                </div>
                <div>
                  <hr>
                </div>
              </div>
              <ul class="uk-nav uk-nav-default">

                  <li class="uk-active menu-item" id="inbox_menu">
                    <a v-on:click="loadFilteredTasks('inbox','inbox_menu', 'Inbox')" xv-on:click="goToPage('view-task-inbox',{'taskId':'all','subtaskId':'none'})">
                      <span class="lnr lnr-history"></span>&nbsp;&nbsp;Recent Chats
                      <!-- <span class="counter-label" id="inbox_count"></span> -->
                    </a>
                  </li>

                  <!--
                  <li>
                    <a v-on:click="goToPage('view-task-inbox',{})">
                      <span class="lnr lnr-inbox"></span>&nbsp;&nbsp;Inbox-GM
                      <span class="counter-label">(10)</span>
                    </a>
                  </li>

                  <li>
                    <a v-on:click="goToPage('view-private-task-inbox',{})">
                      <span class="lnr lnr-lock"></span>&nbsp;&nbsp;Private Inbox
                      <span class="counter-label">(2)</span>
                    </a>
                  </li>-->

                  <li class="menu-item" id="overdue_tasks_menu">
                    <a v-on:click="loadFilteredTasks('overdue','overdue_tasks_menu', 'Overdue Tasks')">
                      <span class="lnr lnr-star"></span>&nbsp;&nbsp;Starred Chats
                      <!-- <span class="counter-label" id="overdue_count"></span> -->
                    </a>
                  </li>
                  <li class="menu-item" id="draft_tasks_menu">
                    <a v-on:click="loadFilteredTasks('draft','draft_tasks_menu', 'Drafted Tasks')">
                      <span class="lnr lnr-user"></span>&nbsp;&nbsp;One-to-One Chats
                      <!-- <span class="counter-label" id="drafts_count"></span> -->
                    </a>
                  </li>
                  <li class="menu-item" id="sent_tasks_menu">
                    <a v-on:click="loadFilteredTasks('sent','sent_tasks_menu', 'Sent Tasks')">
                      <span class="lnr lnr-tag"></span>&nbsp;&nbsp;Category Chats
                      <!-- <span class="counter-label" id="sent_count"></span> -->
                    </a>
                  </li>
                  <li class="menu-item" id="completed_tasks_menu">
                    <a v-on:click="loadFilteredTasks('completed','completed_tasks_menu', 'Completed Tasks')">
                      <span class="lnr lnr-users"></span>&nbsp;&nbsp;Group Chats
                      <!-- <span class="counter-label" id="completed_count"></span> -->
                    </a>
                  </li>
              </ul>

          </div>
        </div>
    </div>

    <div style="display: flex; flex-basis: 90%; transition: transform 0.3s linear 0s;">

      <div class="desktop" style="border-right:0px solid #ccc;position: relative;padding: 15px;padding-right: 5px;overflow-y: hidden;display: flex;flex-direction: column;flex-basis: 30%;background: rgb(255, 255, 255, 0);color: rgb(51, 51, 51);">
        <div class="adk_grid_toolbar" style="user-select: none;grid-template-columns: auto 1fr;padding: 0px 0px;height:50px">
          <div style="display: grid; place-self: center flex-start; text-align: left;">
            <div style="align-items:center;display: grid; place-self: center flex-start; padding-left: 0px; padding-right: 20px; color: rgba(61, 61, 61, 0.78) !important; grid-template-columns: auto auto auto; font-size: 0.75rem;">
              <!-- <a class="uk-navbar-item" style="padding-right: 0px;padding-left: 0px;" v-on:click="toggleSideMenu()">
                <span class="uk-margin-small-right" style="color: rgb(103 103 103)" uk-icon="icon:menu;ratio:1.25"></span>
              </a> -->
              <span style="font-size: 1.15rem;font-weight: bold;" id="chatListName">{{chatListName}}</span>
              <span style="font-size: 0.75rem;margin-left: 5px;margin-top: 5px;"></span>
            </div>
          </div>
          <div style="display: grid; gap: 10px; grid-template-columns: auto auto; place-self: center end; text-align: right;">

            <div style="display: flex;column-gap: 10px;">
              <!--<div style="cursor:pointer"><img src="resources/images/all-activities.svg" style="height:15px;width:15px"></div>-->
              <div v-on:click="refreshPaneList()" class="clickable-btn uk-button" style="cursor: pointer;padding: 0 0px;filter: grayscale(1);"><img src="resources/images/refresh.svg" style="pointer-events: none;height:15px;width:15px"></div>

              <!--

              Temporarily disabled by Vignesh on June 10, 2021

              <div v-show="!showTaskFilter" v-on:click="showTaskFilterModal()" class="clickable-btn uk-button" style="cursor: pointer;padding: 0px 5px;filter: grayscale(1);"><img src="resources/images/filter.svg" style="pointer-events: none;height:15px;width:15px"></div>
              <div v-show="showTaskFilter"  v-on:click="showTaskFilterModal()" class="clickable-btn uk-button" style="cursor: pointer;padding: 0px 5px;background: #1f69bd;border-radius: 3px;">
                  <svg xmlns="http://www.w3.org/2000/svg" height="394pt" viewBox="-5 0 394 394.00003" width="394pt" style="fill: white;pointer-events: none;height: 15px;width: 15px;color: white;"><path d="m367.820312 0h-351.261718c-6.199219-.0117188-11.878906 3.449219-14.710938 8.960938-2.871094 5.585937-2.367187 12.3125 1.300782 17.414062l128.6875 181.285156c.042968.0625.089843.121094.132812.183594 4.675781 6.3125 7.207031 13.960938 7.21875 21.816406v147.800782c-.027344 4.375 1.691406 8.582031 4.773438 11.6875 3.085937 3.101562 7.28125 4.851562 11.65625 4.851562 2.222656-.003906 4.425781-.445312 6.480468-1.300781l72.3125-27.570313c6.476563-1.980468 10.777344-8.09375 10.777344-15.453125v-120.015625c.011719-7.855468 2.542969-15.503906 7.214844-21.816406.042968-.0625.089844-.121094.132812-.183594l128.691406-181.289062c3.667969-5.097656 4.171876-11.820313 1.300782-17.40625-2.828125-5.515625-8.511719-8.9765628-14.707032-8.964844zm0 0"></path></svg>
              </div>
              -->

              <!--<div style="cursor:pointer"><span uk-icon="icon:list;ratio:0.85"></span></div>-->
              <!--<div style="cursor:pointer"><span uk-icon="icon:more;ratio:0.75"></span></div>-->
            </div>
          </div>
        </div>
        <div style=" margin-bottom: 15px; padding: 0px 10px 0px 0px; box-sizing: border-box;position:relative ">
            <span style="position:absolute;left:10px;top: 10px;color: #9f9f9f;" uk-icon="icon:search;ratio:0.85"></span>
            <input tabindex="1" id="chatSearchInput" autocomplete="off" placeholder="Search Chats"
                    v-model="chatSearchQuery"
                    v-on:keyup.enter="searchChatConversations()"
                    type="text" class="uk-input task-search-input" style="border-radius: 20px;padding-left: 40px;"/>
        </div>
        <!--<div><hr></div>-->

        <div style="flex-grow: 1;overflow-y: hidden;position: relative;padding: 0px;height: 100%;">
                <div style="display: flex;flex-direction: column;flex-grow: 1;height: 100%;">
                    <div class="task-list" id="chatlist" style="position:relative;font-size: 0.7rem;flex-grow: 1;margin-top: 10px;grid-template-rows: 1fr;background-color:#f2f2f2;background-color:rgb(255, 255, 255, 0)">
                        <div id="chatlist_loading_spinner" style="display: flex;opacity:1;transition:0.25s linear;position:absolute;top:0px;right:0px;left:0px;bottom:0px;align-items:center;justify-content:center;z-index: 2;">
                            <div class="spinner-2"></div>
                        </div>

                        <div class="adk_grid_list_content custom-scroll-bar" style="display: grid;row-gap: 4.5px;align-content: baseline;padding-right:5px;">
                          <div v-for="item,index in myConversationsList"
                               class="xui_grid_row list-row xchat_conversation_row"
                               style="padding: 0px 2px 0px 10px;"
                               v-bind:id="'conf_list_item_' + item.id"
                               v-on:click="openChat(item)"
                               v-bind:data-new-msgs-count="item.newMessagesCount">



                            <div class="active-border"></div>

                            <div style="display:flex;align-items:center;justify-content:center;flex-direction: row;min-width: 50px;">
                                 <!-- <div v-if="item.createdByName!=='Pawan Bhojanala'" style="letter-spacing: 1px;width: 25px;height: 25px;background-color: rgb(240, 240, 240);padding: 10px;font-weight: bold;color: rgb(51, 51, 51);border-radius: 50%;align-items: center;justify-content: center;display: flex;border: 1px solid #eaeaea;">
                                    {{(item.createdByName.split(" ")[0])[0]}}{{(item.createdByName.split(" ")[1])[0]}}
                                 </div>
                                 <img v-if="item.createdByName==='Pawan Bhojanala'" v-bind:data-img-id="item.createdById" class="uk-border-pill ui-navbar-profile-image"
                                 v-bind:src="'/api/us/profile/get/' + item.createdById"
                                 onerror="this.onerror=null;this.src='resources/images/male_default_pic.png';"
                                 width="25" height="25" alt="Border pill"
                                 style="border:1px solid rgb(220 220 220);xbackground: #ffeb3b;padding: 3px;margin-left: 0px;height: 45px;width: 45px;"> -->
                                 <img  v-if="item.type==='one-to-one'"
                                       v-bind:src="'api/us/profile/get/' + item.userId2"
                                       onerror="this.onerror=null;this.src='resources/images/male_default_pic.png';"
                                       class="uk-border-pill ui-navbar-profile-image"
                                       style="border: 1px solid rgb(220, 220, 220); padding: 3px; margin-left: 0px; height: 45px; width: 45px;">

                                 <span v-if="item.type==='group-chat' || item.type === 'category-chat'" class="uk-margin-small-right uk-icon" style="background: rgb(255 255 255);border: 2px solid rgb(234, 234, 234);padding: 3px;border-radius: 50%;width: 35px;height: 35px;display: flex;justify-content: center;align-items: center;">
                                    <svg width="50" height="25" viewBox="-2 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                      <circle fill="none" stroke="#000" stroke-width="1.1" cx="7.7" cy="8.6" r="3.5"></circle>
                                      <path fill="none" stroke="#000" stroke-width="1.1" d="M1,18.1 C1.7,14.6 4.4,12.1 7.6,12.1 C10.9,12.1 13.7,14.8 14.3,18.3"></path>
                                      <path fill="none" stroke="#000" stroke-width="1.1" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1"></path><path fill="none" stroke="#000" stroke-width="1.1" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1" style="transform: rotateY(180deg) translateX(5px);transform-origin: center;"></path>
                                    </svg>
                                 </span>
                            </div>
                            <div class="ui_grid_row list-detail" style=" display: grid;">
                              <div class="list-item-row-2 task-name" style="color: #000000;place-items: flex-start flex-start;overflow-x: hidden;">
                                <p style="margin: 0 0 0px 0;text-overflow: ellipsis;overflow-x: hidden;white-space: nowrap;font-family: 'Nunito';">{{item.name}}</p>
                              </div>
                              <div class="list-item-row-1" style="display:flex;column-gap:5px">
                                <div class="" style="color: #969696;">
                                  {{item.lastMessage}}
                                </div>
                              </div>
                              <div class="list-item-row-3" style="place-items: end flex-start;overflow: hidden;">
                                <div style="display: flex;column-gap: 5px;width: 100%;justify-content: space-between;">
                                  <!-- <div v-for="memberName in item.involvedMemberNames" style="font-size: 0.45rem; text-transform: uppercase; color: rgb(152, 152, 152);" class="task-created-date" title="Due Date">{{memberName}}</div> -->
                                  <div class="task-created-date" style="font-size: 0.55rem;letter-spacing: 0.25px;color: rgb(152, 152, 152);" v-bind:title="'Last message on ' + item.lastMessageDateTimeAgo" v-if="item.lastMessageDateTimeAgo!==null && item.lastMessageDateTimeAgo!==undefined">{{item.lastMessageDateTimeAgo}}</div>
                                </div>
                              </div>
                            </div>

                          </div>
                          <div id="taskListIntersectionObserver"
                               class="ui_grid_row"
                               style="margin-right:0px;padding: 7px 12px; border-bottom: 0em solid rgb(229, 229, 229); display: grid; place-items: center; background: rgb(255, 255, 255); color: rgb(158, 158, 158);">
                            <span style="">No more available records.</span>
                          </div>
                        </div>


                  </div>
                </div>
            </div>

      </div>

      <div class="pane-detail-view" style="margin-top: 10px;margin-left: 10px;border-left: 1px solid rgb(204, 204, 204);border-top: 1px solid rgb(204, 204, 204);border-top-left-radius: 10px;overflow-y: hidden;display: flex;flex-grow: 1;flex-basis: 70%;box-sizing: border-box;background-color:rgb(255, 255, 255, 0)">
          <div style="display: flex; flex-grow: 1; grid-template-rows: 1fr; overflow-y: hidden;">
              <div v-show="!isChatViewOn && openedChats.length>0" class="pane-detail-view" style="flex-basis: 60%;;overflow-y:hidden;display: flex;flex-grow: 1;">
                  <template v-for="conversation in openedChats">
                      <chat-page v-bind:tab="tab" v-bind:showChat="conversation.showChat"
                                 v-bind:loggedInUser="loggedInUser"
                                 v-bind:conversationId="conversation.conversationId"
                                 v-bind:categoryId="conversation.categoryId"
                                 v-bind:conversationName="conversation.conversationName"></chat-page>
                  </template>
              </div>
              <div v-show="!isChatViewOn && openedChats.length===0" class="pane-detail-view" style="background-color: #ffffff8a;flex-basis: 60%;;overflow-y:hidden;display: flex;align-items:center;justify-content:center;flex-grow: 1;">
                  <div style="background: #ffffff00; display: grid; place-content: center; grid-template-rows: auto auto; gap: 20px;">
                    <div style="place-items: center; place-content: center; place-self: center;">
                      <img src="resources/images/chat.svg" style="height: 75px;">
                    </div>
                    <div style="font-size: 1.25rem;">Select a Chat Conversation</div>
                  </div>
              </div>
          </div>
      </div>
    </div>


    <div id="newChatConversationModal" class="uk-flex-top" uk-modal>
          <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="width: 75%;height: 75%;font-size: 0.65rem;padding: 50px;background: radial-gradient(rgb(255, 255, 255), rgba(255, 255, 255, 0.78)) rgba(251, 251, 251, 0.05);border-radius: 3px;">
              <button class="uk-modal-close-default" type="button" uk-close></button>
              <div style="font-size: 0.7rem;display: grid;grid-template-columns: 1fr;width: 100%;place-items: start center;overflow-y: auto;height: 100%;" class="custom-scroll-bar">
                <div class="stage" style="display:flex;flex-direction:row">

                    <div v-if="newChatConversation.chatType==='one-to-one'" class="" style="flex-basis: 50%;flex-grow: 1;display: flex;align-items: center;flex-direction: column;padding: 30px 50px;justify-content: start;">

                      <div style="padding-bottom:50px;">
                        <span style="font-size: 1.5rem;font-weight: bold;border-bottom: 1px solid #d0d0d0;">
                            One-to-One Chat
                        </span>
                      </div>
                      <form autocomplete="off" xclass="uk-grid-small uk-grid" xuk-grid onsubmit="return false;" style="justify-content: center;display: flex;flex-direction: column;align-items: center;">

                            <div class="uk-width-1-1 uk-grid-margin uk-first-column " style="z-index: 1;">
                                <div style="height: 70px;">
                                     <label class="uk-form-label">Name</label>
                                     <div class="uk-form-controls">
                                         <ui-selectbox-single v-bind:availableItems="availableMembers"
                                                              name="Members"
                                                              tagProperty="firstName"
                                                              displayLabelProps="firstName,lastName"
                                                              maxTagsToDisplay="3"
                                                              searchProperty="firstName,lastName"
                                                              data_tabindex="1"
                                                              v-on:selectBoxUpdate="updateMemberSelectedEmitEventForOneToOneChat($event)"
                                                              allowSingleSelectOnly="true"
                                                              disableAcronym="true"
                                                              style="min-width: 400px;"/>
                                     </div>
                                </div>
                            </div>

                            <div class="uk-margin uk-grid-margin uk-first-column">
                                <div class="uk-inline">
                                    <a tabindex="6" id="saveButton1" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(2 119 254); border-radius: 2px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="save('saveButton1')" >
                                      Create Conversation
                                    </a>
                                    &nbsp;&nbsp;&nbsp;
                                    <!--<a tabindex="7" class="clickable-btn uk-button uk-button-danger uk-button-small uk-first-column end-call-button" style="background-color: rgba(253, 253, 253, 0.99); color: rgb(111, 111, 111); border: 1px solid rgb(183, 183, 183); border-radius: 3px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="goBack()" >Exit</a>-->
                                </div>
                            </div>
                        </form>
                    </div>
                    <div v-if="newChatConversation.chatType==='category-chat'" class="" style="flex-basis: 50%;flex-grow:1;display:flex;align-items: center;padding-top: 30px;padding-bottom:30px;padding-left: 50px;padding-right: 50px;">

                        <form autocomplete="off" class="uk-grid-small uk-grid" uk-grid onsubmit="return false;">

                              <div class="uk-width-1-1 uk-grid-margin uk-first-column " style="z-index: 1;">
                                  <div style="height: 70px;">
                                       <label class="uk-form-label">Category</label>
                                       <div class="uk-form-controls">
                                           <ui-selectbox-single v-bind:availableItems="availableCategories"
                                                                name="NewTaskCategories"
                                                                tagProperty="name"
                                                                displayLabelProps="name" maxTagsToDisplay="3"
                                                                searchProperty="name"
                                                                data_tabindex="6"
                                                                v-on:selectBoxUpdate="updateCategoryEmitEvent($event)"
                                                                allowSingleSelectOnly="true"/>
                                       </div>
                                  </div>
                              </div>

                              <div class="uk-margin uk-grid-margin uk-first-column">
                                  <div class="uk-inline">
                                      <a tabindex="6" id="saveButton1" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(2 119 254); border-radius: 2px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="save('saveButton1')" >
                                        Create Conversation for Category
                                      </a>
                                      &nbsp;&nbsp;&nbsp;
                                      <!--<a tabindex="7" class="clickable-btn uk-button uk-button-danger uk-button-small uk-first-column end-call-button" style="background-color: rgba(253, 253, 253, 0.99); color: rgb(111, 111, 111); border: 1px solid rgb(183, 183, 183); border-radius: 3px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="goBack()" >Exit</a>-->
                                  </div>
                              </div>
                          </form>
                      </div>
                    <div v-if="newChatConversation.chatType==='group-chat'"  class="or_divXXX" style=";position:relative;flex-basis: 50%;xborder-left:1px solid #d8d8d8;flex-grow:1;display:flex;padding-top: 30px;padding-bottom:30px;padding-left: 50px;padding-right: 50px;">
                        <form autocomplete="off" class="uk-grid-small uk-grid" uk-grid onsubmit="return false;">

                              <div class="uk-width-1-1 uk-first-column ">
                                  <label class="uk-form-label" for="form-stacked-text">Group Conversation Name</label>
                                  <div class="uk-form-controls">
                                      <div class="uk-inline uk-width-1-1">
                                          <input tabindex="1" id="name" type="text" class="uk-input"  placeholder=""  v-model="newChatConversation.name" style="font-family: Lato;font-weight: 300;" autofocus="true">
                                      </div>
                                  </div>
                              </div>

                              <div class="uk-width-1-1 uk-grid-margin uk-first-column " style="z-index: 1;">
                                  <div style="height: 70px;">
                                       <label class="uk-form-label">Members</label>
                                       <div class="uk-form-controls">
                                           <ui-selectbox v-bind:availableItems="availableMembers"
                                                                name="Members"
                                                                tagProperty="firstName"
                                                                displayLabelProps="firstName,lastName" maxTagsToDisplay="3"
                                                                searchProperty="firstName,lastName"
                                                                data_tabindex="4"
                                                                v-on:selectBoxUpdate="updateMembersEmitEvent($event)"/>
                                       </div>
                                  </div>
                              </div>

                              <div class="uk-margin uk-grid-margin uk-first-column">
                                  <div class="uk-inline">
                                      <a tabindex="6" id="saveButton2" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(2 119 254); border-radius: 2px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="save('saveButton2')" >Create Conversation for Group</a>
                                      &nbsp;&nbsp;&nbsp;
                                      <!--<a tabindex="7" class="clickable-btn uk-button uk-button-danger uk-button-small uk-first-column end-call-button" style="background-color: rgba(253, 253, 253, 0.99); color: rgb(111, 111, 111); border: 1px solid rgb(183, 183, 183); border-radius: 3px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="goBack()" >Exit</a>-->
                                  </div>
                              </div>
                          </form>
                    </div>
                </div>
              </div>
          </div>
      </div>

    <div id="newTaskFromConversationModalFromChatComponent" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="width: 75%;font-size: 0.65rem;padding: 100px;background: rgb(251 251 251 / 5%);background-image: radial-gradient(#ffffff, #ffffffc7);    border-radius: 3px;">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <div style="font-size: 0.7rem;xbackground: #fbfbfb;;display:grid;grid-template-columns:1fr;width:100%;place-items:start start;overflow-y:auto" class="custom-scroll-bar">
              <div class="stage" style="display:flex;flex-direction:row">

                    <div class="" style="flex-basis: 50%;flex-grow:1;display:flex;align-items: center;padding-top: 30px;padding-bottom:30px;padding-left: 50px;padding-right: 50px;">

                      <form autocomplete="off" class="uk-grid-small uk-grid" uk-grid onsubmit="return false;">

                            <div class="uk-width-1-1 uk-grid-margin uk-first-column " style="z-index: 1;">
                                <div style="height: 70px;">
                                     <label class="uk-form-label">Category</label>
                                     <div class="uk-form-controls">
                                         <ui-selectbox-single v-bind:availableItems="availableCategories"
                                                              name="NewTaskCategories"
                                                              tagProperty="name"
                                                              displayLabelProps="name" maxTagsToDisplay="3"
                                                              searchProperty="name"
                                                              data_tabindex="6"
                                                              v-on:selectBoxUpdate="updateCategoryEmitEvent($event)"
                                                              allowSingleSelectOnly="true"/>
                                     </div>
                                </div>
                            </div>

                            <div class="uk-margin uk-grid-margin uk-first-column">
                                <div class="uk-inline">
                                    <a tabindex="6" id="saveButton1" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(2 119 254); border-radius: 2px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="save('saveButton1')" >
                                      Create Conversation for Category
                                    </a>
                                    &nbsp;&nbsp;&nbsp;
                                    <!--<a tabindex="7" class="clickable-btn uk-button uk-button-danger uk-button-small uk-first-column end-call-button" style="background-color: rgba(253, 253, 253, 0.99); color: rgb(111, 111, 111); border: 1px solid rgb(183, 183, 183); border-radius: 3px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="goBack()" >Exit</a>-->
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="or_div" style=";position:relative;flex-basis: 50%;border-left:1px solid #d8d8d8;flex-grow:1;display:flex;padding-top: 30px;padding-bottom:30px;padding-left: 50px;padding-right: 50px;">

                        <form autocomplete="off" class="uk-grid-small uk-grid" uk-grid onsubmit="return false;">

                              <div class="uk-width-1-1 uk-first-column ">
                                  <label class="uk-form-label" for="form-stacked-text">Group Conversation Name</label>
                                  <div class="uk-form-controls">
                                      <div class="uk-inline uk-width-1-1">
                                          <input tabindex="1" id="name" type="text" class="uk-input"  placeholder=""  v-model="newChatConversation.name" style="font-family: Lato;font-weight: 300;" autofocus="true">
                                      </div>
                                  </div>
                              </div>

                              <div class="uk-width-1-1 uk-grid-margin uk-first-column " style="z-index: 1;">
                                  <div style="height: 70px;">
                                       <label class="uk-form-label">Members</label>
                                       <div class="uk-form-controls">
                                           <ui-selectbox v-bind:availableItems="availableMembers"
                                                                name="Members"
                                                                tagProperty="firstName"
                                                                displayLabelProps="firstName,lastName" maxTagsToDisplay="3"
                                                                searchProperty="firstName,lastName"
                                                                data_tabindex="4"
                                                                v-on:selectBoxUpdate="updateMembersEmitEvent($event)"/>
                                       </div>
                                  </div>
                              </div>

                              <div class="uk-margin uk-grid-margin uk-first-column">
                                  <div class="uk-inline">
                                      <a tabindex="6" id="saveButton2" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(2 119 254); border-radius: 2px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="save('saveButton2')" >Create Conversation for Group</a>
                                      &nbsp;&nbsp;&nbsp;
                                      <!--<a tabindex="7" class="clickable-btn uk-button uk-button-danger uk-button-small uk-first-column end-call-button" style="background-color: rgba(253, 253, 253, 0.99); color: rgb(111, 111, 111); border: 1px solid rgb(183, 183, 183); border-radius: 3px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="goBack()" >Exit</a>-->
                                  </div>
                              </div>
                          </form>
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
  mixins: [
    userMixinLib,
    utilsMixinLib,
    uiListMixinLib
  ],
  props: ['loggedInUser'],
  data: function () {
    return {
      appName: this.$route.params.app_name,
      tab: this.$route.params.tab,
      searchQuery: '',
      conversationPageNumber: 1,
      userId: null,
      my_conference_list: [],
      starred_conferences_list: [],
      openedChats: [],
      myConversationsList: [],
      newChatConversation: {
        id: 'new',
        name: '',
        status: null,
        memberIds: [],
        categoryId: null
      },
      availableMembers: [],
      availableCategories: [],
      chatType: "one-to-one",
      chatListName: "Chats"
    };
  },
  methods: {
    toggleChatSideMenu () {
      document.querySelector("#chatSideMenu").classList.toggle("isClosed");
      document.querySelector("#chatSideMenuContent").classList.toggle("isClosed");
    },

    createChat (chatType) {
      console.log('Creating chat of type : ' + chatType);
      console.log('Event emitted in bus.', new Date());
      this.newChatConversation.chatType = chatType;



      UIkit.modal(document.querySelector('#newChatConversationModal')).show();
      this.closeNewChatOptions();
    },
    closeNewChatOptions () {
      this.isNewTaskOptionsOpen = false;
      // This means, if target on which the click happened is not within the context-menu div, so you can close the context-menu dropdown.
      const primaryButtonOptions = document.getElementById('new_task_button_calendar_options');
      primaryButtonOptions.style.transform = null;

      // Remove click listener
      document.querySelector('body').removeEventListener('click', this.listenForBodyClicks, false);
      console.log('body click event removed.');
    },
    listenForBodyClicks (event) {
      console.log('Body clicked at target ', event.target);

      const foundParent = event.target.closest('.new_task_options');
      const foundTrigger = event.target.closest('.new_task_options_trigger_button'); // The click event on the trigger must also be ignored.

      if (foundParent === null && foundTrigger === null) {
        console.log('Closing menu as the body-click event landed on the body');
        this.closeNewChatOptions();
      }
    },
    handleNewChatOptionsClick () {
      console.log('handleNewChatOptionsClick clicked : ');

      if (!this.isNewTaskOptionsOpen) {
        console.log('body click event added.');
        this.isNewTaskOptionsOpen = true;
        const primaryButtonOptions = document.getElementById('new_task_button_calendar_options');
        primaryButtonOptions.style.transform = 'scale(1)';

        console.log('menu scaled to open.');
        document.querySelector('body').addEventListener('click', this.listenForBodyClicks, false);
      } else {
        this.closeNewChatOptions();
      }
    },

    goToHomePage: function () {
      // $("#app").css("grid-template-rows", "50px 1fr 35px");      // show the footer

      this.$router.push({
        name: 'home-page',
        params: {}
      });
    },
    openChat (conversation) {

      const conversationId = conversation.id;

      if (document.getElementById('chat_' + conversationId) === null) {
        //* This code will add new <chat-detail> component. The <chat-detail> component loads teh chat data on its mounted-method * //
        this.openedChats.push({
          conversationId: conversationId,
          conversationName: conversation.name,
          categoryId: conversation.categoryId,
          showChat: true
        });
      }

      {
        this.openedChats.forEach((chat) => {
          const conversationId = chat.conversationId;
          if (document.getElementById('chat_' + conversationId) !== null) { document.getElementById('chat_' + conversationId).classList.add('hideChat'); }
        });

        if (document.getElementById('chat_' + conversationId) !== null) { document.getElementById('chat_' + conversationId).classList.remove('hideChat'); }
      }

      if (document.querySelector('.selected_chat_itemX') !== null) { document.querySelector('.selected_chat_itemX').classList.remove('selected_chat_itemX'); }

      if (document.getElementById('conf_list_item_' + conversationId) !== null) { document.getElementById('conf_list_item_' + conversationId).classList.add('selected_chat_itemX'); }

      // else->navigate to that component.
    },
    refreshMyConversations () {
      this.convesationPageNumber = 1;
      this.myConversationsList = [];
      this.fetchMyConversations();
    },
    fetchMyConversations () {
      console.log('Fetching my conversations...from chat-book');
      // return false;

      return new Promise(resolve => {
        const url = './chat-conversations/list/' + this.conversationPageNumber + '/all';

        try {
          axios.get(process.env.VUE_APP_API_URL + url)
            .then((dataResponse) => {
              // console.log("My Category List: " , dataResponse);
              const myConversationsList = dataResponse.data.bean;
              myConversationsList.forEach((conversation) => {
                conversation.showChat = false;
                conversation.newMessagesCount = 0;


                if (conversation.lastMessageTime !== null) {
                  conversation.lastMessageDateTimeFormatted = dayjs(conversation.lastMessageTime).format('DD/MM/YYYY HH:mm');
                  conversation.lastMessageDateTimeAgo = dayjs(conversation.lastMessageTime).fromNow();
                }

                this.myConversationsList.push(conversation);

                setTimeout(() => {
                  document.querySelector("#chatlist_loading_spinner").classList.add('hide_reveal');
                  document.querySelector("#chatlist_loading_spinner").style.display = "none";
                  // document.querySelector("#chatlist").classList.remove("hide_reveal");
                }, 500);
              });
            })
            .catch((error) => {
              console.error('Error while fetching my-conversations-list : ', error);
            });
        } catch (error) {
          console.error('Unpaginated List data fetch error : ', error);
        }
      });
    },

    save (btnId) {
      // if(!this.doValidation())
      //    return false; // stop here if form is invalid.

      const btnText = document.getElementById(btnId).innerHTML;
      document.getElementById(btnId).innerHTML = 'Saving..';
      this.disableHTMLElement(document.getElementById(btnId));

      const post_url = './chat-conversations/save';
      console.log('Posting data to : ' + post_url);

      const form = {
        id: this.newChatConversation.id,
        type: this.newChatConversation.chatType,
        name: this.newChatConversation.name,
        withUserId: this.newChatConversation.withUserId, // required for one-to-one chat
        categoryId: this.newChatConversation.categoryId, // required for category chat
        involvedMemberIds: this.newChatConversation.memberIds // required for group chat
      };

      if (form.type === "group-chat" && (form.name === null || form.name === undefined || form.name === "")) {
        const errorMsg = " Please provide a valid Group Name";
        UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + errorMsg, {
          status: 'danger',
          pos: 'bottom-left',
          timeout: 5000
        });

        return false;
      }
      else if (form.type === "group-chat" && (form.involvedMemberIds === null || form.involvedMemberIds === undefined || form.involvedMemberIds === [] || form.involvedMemberIds.length <= 2)) {
        const errorMsg = " Please select atleast 3 members of the group";
        UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + errorMsg, {
          status: 'danger',
          pos: 'bottom-left',
          timeout: 5000
        });

        return false;
      }
      else if (form.type === "category-chat" && (form.categoryId === null || form.categoryId === undefined || form.categoryId === "")) {
        const errorMsg = " Please select a Category";
        UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + errorMsg, {
          status: 'danger',
          pos: 'bottom-left',
          timeout: 5000
        });

        return false;
      }
      else if (form.type === "one-to-one" && (form.withUserId === null || form.withUserId === undefined || form.withUserId === "")) {
        const errorMsg = " Please select a User";
        UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + errorMsg, {
          status: 'danger',
          pos: 'bottom-left',
          timeout: 5000
        });

        return false;
      }

      // alert("Creating chat..");

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {
          console.log('Chat Conversation Registration Result : ');
          console.log(dataResponse);

          if (dataResponse.data.actionResult === 1) {
            this.newWorkgroupInfo = dataResponse.data.bean;

            UIkit.notification(`<div class="taskone-notification">
                                                    <span uk-icon="icon: check;ratio:1"></span>
                                                    <div> New Chat added successfully. </div>
                                                </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 500000
            });

            document.getElementById(btnId).innerHTML = btnText;
            this.enableHTMLElement(document.getElementById(btnId));

            this.$emit('refreshList', {});
            this.refreshMyConversations();

            this.newChatConversation = {
              id: 'new',
              name: '',
              status: null,
              memberIds: [],
              categoryId: null
            };
          } else {
            const errorMsg = (dataResponse.data).message;
            UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + errorMsg, {
              status: 'danger',
              pos: 'top-right',
              timeout: 5000
            });

            document.getElementById(btnId).innerHTML = btnText;
            this.enableHTMLElement(document.getElementById(btnId));
            return false;
          }
        })
        .catch(function (errorResponse) {
          console.log('ERROR MS - ', errorResponse);
          const exceptionMsg = errorResponse.response.data.exception;

          UIkit.notification("<span uk-icon='icon: warning ;ratio: 0.75'></span> " + exceptionMsg + '.', {
            status: 'danger',
            pos: 'top-right',
            timeout: 500000
          });

          document.getElementById(btnId).innerHTML = btnText;
          this.enableHTMLElement(document.getElementById(btnId));
          return false;
        });
    },

    // Handle the events emitted when selectbox component values are modified.
    updateMemberSelectedEmitEventForOneToOneChat (data) {
      console.log("One-to-One chat :: ", data);
      this.newChatConversation.withUserId = data.id;
    },
    updateMembersEmitEvent (data) {
      const memberIds = Array.from(data).map(item => item.id);
      this.newChatConversation.memberIds = memberIds;
    },
    updateCategoryEmitEvent (data) {
      console.log(data);
      if (data != null) { this.newChatConversation.categoryId = data.id; } else { this.newChatConversation.categoryId = null; }
    },

    // This data will be used to filter both members and admins by merging with the result from 'get-associated-people/{workgroup-id}'
    loadPotentialUsers () {
      const url = './workgroups/get-potential-users'; // Fetch all potential members (users)
      this.getUnpaginatedList('potentialUsers', url); // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
    },
    // This data will be used to filter both members and admins by merging with the result from 'get-associated-people/{category-id}'
    loadPotentialCategories () {
      const url = './categories/list/all'; // Fetch all potential categories (categories)
      this.getUnpaginatedList('potentialCategories', url); // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
    },

    // Callbacks of loadPotentialUsers function.
    handleUnpaginatedListData (listKey, data) {
      if (listKey === 'potentialUsers') { this.handlePotentialUsers(data); } else if (listKey === 'potentialCategories') { this.handlePotentialCategories(data); }
    },
    handleUnpaginatedListDataError (error) {
      console.error('Unpaginated List data fetch error : ', error);
    },

    // Callbacks
    handlePotentialUsers (dataResponse) {
      // Pass it to the availableMembers prop to the dropdown.
      console.log('Potential Users : ', dataResponse);

      const mapFunction = (user) => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          isSelected: false
        };
      };

      const mappedArrayOfUser = dataResponse.data.bean.map(mapFunction);

      this.availableMembers = mappedArrayOfUser; // When a workgroup is edited, these vals must be merged with existing workgroup members to determine 'isSelected' flag

      console.log('this.availableMembers : ', this.availableMembers);
    },

    handlePotentialCategories (dataResponse) {
      // Pass it to the availableMembers prop to the dropdown.
      // console.log("Potential Categories : ", dataResponse);

      const mapFunction = (item) => {
        return {
          id: item.id,
          name: item.name,
          isSelected: false
        };
      };

      const mappedArrayOfCategories = dataResponse.data.bean.map(mapFunction);

      this.availableCategories = mappedArrayOfCategories; // When a category is edited, these vals must be merged with existing category members to determine 'isSelected' flag

      // console.log("this.availableCategories : ", this.availableCategories);
    }
  },
  created: function () {

  },
  mounted: async function () {

    // 'api/us/profile/get/' + msg.senderInfoId
    // VueJS ajax call-1
    axios.get(process.env.VUE_APP_API_URL + 'api/us/profile/get/5fd85f97b7bb60589e3a93df')
      .then((dataResponse) => {
        console.log('Ajax chat Image is : ', dataResponse);
      })
      .catch(function (errorResponse) {
        console.log('ERROR MS - ', errorResponse);
      });

    bus.on('newChatEvent', (data) => {
      console.log('Show-New-Chat-Form event received in bus.', new Date());
      this.createNewChatConversation();
    });

    // Even if this conversation chats are not loaded, this listener below
    // updates the counter of new messages received since the chat module was opened.
    bus.off("handle-new-chat-message");
    bus.on("handle-new-chat-message", data => {

      // If this was sent by the loggedInUser, then don't update the counter.
      // Counter must get updated only for received messages and not sent ones.
      // So do this check and ignore if true, else update the counter.
      // UPDATED CODE on June 17 2021 by Vignesh
      // UPDATES_COMMENTS
      // When a sender sends the message, the conversation list's latest message doesn't get updated there. Hence the following
      // modifications in the below if condition.
      if (data.senderInfo.split('#')[0] === this.loggedInUser.userId) {
        const msg = data.message;
        const sender = data.senderInfo.split('#')[1];


        const conversationId = data.conversationId;
        const matchingItem = this.myConversationsList
                               .find(conversation => conversation.id === conversationId);
           matchingItem.lastMessage = sender + " :c: " + msg;
      }
      else {
        const msg = data.message;
        const sender = data.senderInfo.split('#')[1];


        const conversationId = data.conversationId;
        const matchingItem = this.myConversationsList
                               .find(conversation => conversation.id === conversationId);

          matchingItem.newMessagesCount += 1;
          matchingItem.lastMessage = sender + " :: " + msg;

          var newActivitySound = document.querySelector('#new_chat_notification_sound');
              newActivitySound.volume = 1;
              newActivitySound.play();
      }

    });

    console.log('Chat-book mounted.');

    this.loadPotentialUsers();
    this.loadPotentialCategories();

    await this.fetchMyConversations();
    setTimeout(() => {
      // $("#app").css("grid-template-rows", "50px 1fr 0px");      // hide the footer
      document.getElementById('conf_book').style.opacity = 1;
    }, 150);
    // this.getStarredConferences();




  },
  watch: {

    // https://router.vuejs.org/en/advanced/data-fetching.html for more options.
    /*
            // call again the method if the route changes
            '$route': 'fetchData' where fetchData is a method defined above.
        */

    '$route.params.app_name' (newAppName, oldAppName) {
      console.log('AppName changed from ' + oldAppName + ' to ' + newAppName);
      this.appName = newAppName;
    }

  }
};

</script>
