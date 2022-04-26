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
    background: #d4ebff8c !important;
  }

  .list-row:active{
    transform : scale(0.995);
      background: #afd9ff8c !important;
  }

  .list-row:hover .list-item-menu{
    opacity : 1;
  }

  .selected_chat_item{
    background-color: #c4e3ff8c !important;
  }

  .ctx-menu-trigger{
    cursor:pointer;
    transition: 0.15s ease-in;
    opacity: 0;
    transform: translateY(-10px);
  }

  .list-row:hover .ctx-menu-trigger{
    opacity: 1;
    transform: translateY(0px);
  }

  .ctx-menu-trigger:hover {
      cursor: pointer;
      background-color: #e0e0e085;
  }

  .ctx-menu-trigger:active {
      cursor: pointer;
      background-color: #d0d0d085;
      transform: scale(0.75) !important;
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
    padding: 3px 10px 3px 0px;
  }

  .list-row {
    border: .05em solid #e5e5e5;
    /* border-left: 5px solid rgb(37 139 255 / 10%); */
    border-left: .05em solid #e5e5e5;
    /* border-left: .05em solid transparent; */
    /* border-right: .05em solid transparent; */
    border-bottom: none;
    border-right: none;
    border-left: none;
    background: white;
    background: #fcfcfc54;
    border-radius: 0px;
    transition: all 0.2s linear;
    display: flex;
    width: 100%;
    -moz-column-gap: 10px;
    column-gap: 10px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    /* box-shadow: rgb(0 0 0 / 5%) 4px 3px 10px 0px; */
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

    .side-bar-light {
        /* background: #f9faff; */
        background: rgb(255, 255, 255, 0.65);
        color: #484848;
        font-size: .5rem;
        border-right: 1px solid #ccc;
        border-top:none;
        border-top-right-radius:0px;
        margin-top: 0px;
        top: 50px;
        width: 175px!important;
        padding: 10px 10px;
        overflow-y: hidden;
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




    .context-menu{
      position: fixed;
      opacity:0;
      transition:0.10s ease-out;
      transform-origin:top left;
      transform:scale(0);
      pointer-events:none;
      width: 200px;
      max-height: 150px;
      font-size: 0.8rem;
      padding: 9px 0px;
      z-index: 10;
      background: white;
      box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 5px 0px, rgba(0, 0, 0, 0.16) 0px 2px 10px 0px;
      box-shadow: rgb(0 0 0 / 0%) 0px 2px 5px 0px, rgb(0 0 0 / 13%) 0px 2px 10px 0px;
      border-radius: 3px;
      border: 1px solid #e0e0e0;
    }

    .context-menu.is-open{
      opacity:1;
      transform:scale(1);
      pointer-events:all;
    }

    .context-menu div div{
      cursor:pointer;
      padding:5px 15px !important;
    }

    .context-menu div div:hover{
      background-color:#ececec;
      padding:5px 15px !important;
    }



    .contextMenuTrigger{
      border-radius: 50%;
      padding: 3px;
      cursor: pointer;
      line-height: 0;
      transform: scale(1) translateY(-10px);
      opacity: 0;
      user-select:none;
    }

    .contextMenuTrigger:hover{
      background: #e4e4e4;
      transition:0.15s linear;
      transform: scale(1) translateY(0px);
      /* transform: scale(0.9) rotate(0deg); */
    }

    .contextMenuTrigger:active{
      background: #e4e4e4;
      transform:scale(0.75);
    }

    .contextMenuTrigger > svg{
      pointer-events:none;
    }

    .category_item .category_row{
      pointer-events:none;
    }

    .category_item:hover .contextMenuTrigger {
      opacity: 1;
      transform: scale(1) translateY(0px);
    }

    .menu-item{
      user-select: none;
    }
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

                  <li class="uk-active menu-item" id="recent_chats_menu">
                    <a v-on:click="loadFilteredConversations('recent','recent_chats_menu', 'Recent Chats')">
                      <span class="lnr lnr-history"></span>&nbsp;&nbsp;Recent Chats
                      <span class="counter-label" id="recent_chats_count"></span>
                    </a>
                  </li>
                  <li class="menu-item" id="starred_chats_menu">
                    <a v-on:click="loadFilteredConversations('starred','starred_chats_menu', 'Starred Chats')">
                      <span class="lnr lnr-star"></span>&nbsp;&nbsp;Starred Chats
                      <span class="counter-label" id="starred_chats_count"></span>
                    </a>
                  </li>
                  <li class="menu-item" id="one_to_one_chats_menu">
                    <a v-on:click="loadFilteredConversations('one-to-one','one_to_one_chats_menu', 'One-to-One Chats')">
                      <span class="lnr lnr-user"></span>&nbsp;&nbsp;One-to-One Chats
                      <span class="counter-label" id="one_to_one_chats_count"></span>
                    </a>
                  </li>
                  <li class="menu-item" id="category_chats_menu">
                    <a v-on:click="loadFilteredConversations('category-chat','category_chats_menu', 'Category Chats')">
                      <span class="lnr lnr-tag"></span>&nbsp;&nbsp;Category Chats
                      <span class="counter-label" id="category_chats_count"></span>
                    </a>
                  </li>
                  <li class="menu-item" id="group_chats_menu">
                    <a v-on:click="loadFilteredConversations('group-chat','group_chats_menu', 'Group Chats')">
                      <span class="lnr lnr-users"></span>&nbsp;&nbsp;Group Chats
                      <span class="counter-label" id="group_chats_count"></span>
                    </a>
                  </li>
              </ul>

          </div>
        </div>
    </div>

    <div style="display: flex; flex-basis: 90%; transition: transform 0.3s linear 0s;">

      <div class="desktop" style="border-right: 0px solid rgb(204, 204, 204);position: relative;padding: 0px 0px;overflow-y: hidden;display: flex;flex-direction: column;flex-basis: 30%;background: rgb(255 255 255 / 30%);color: rgb(51, 51, 51);">
        <div class="adk_grid_toolbar" style="background-color:rgb(248,248,248,0) !important;user-select: none;grid-template-columns: auto 1fr;padding: 10px 20px 5px;height: 50px;">
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
        <div style="background-color:rgb(248,248,248,0) !important;margin-bottom: 0px;padding: 0px 20px 20px 20px;box-sizing: border-box;position: relative;">
            <span style="position:absolute;left:30px;top: 10px;color: #9f9f9f;" uk-icon="icon:search;ratio:0.85"></span>
            <input tabindex="1" id="chatSearchInput" autocomplete="off" placeholder="Search Chats"
                    v-model="chatSearchQuery"
                    v-on:keyup.enter="searchChatConversations()"
                    type="text" class="uk-input task-search-input" style="border-radius: 20px;padding-left: 40px;"/>
        </div>
        <!--<div><hr></div>-->

        <div style="flex-grow: 1; overflow-y: hidden; position: relative; padding: 0px; height: 100%;">
            <div style="display: flex; flex-direction: column; flex-grow: 1; height: 100%;">
                <div class="task-list pane-list" id="chatlist"
                     xv-on:mousedown="closeCategoryItemContextMenu($event)"
                     v-on:click="handleClickEvents($event)"
                     style="position: relative; font-size: 0.7rem; flex-grow: 1; margin-top: 0px; grid-template-rows: 1fr; background-color: rgba(255, 255, 255, 0);">

                    <div id="chatlist_loading_spinner" style="display: flex;opacity:1;transition:0.25s linear;position:absolute;top:0px;right:0px;left:0px;bottom:0px;align-items:center;justify-content:center;z-index: 2;">
                        <div class="spinner-2"></div>
                    </div>

                    <div class="adk_grid_list_content custom-scroll-bar" style="display: flex;padding-right: 0px;flex-direction: column;">

                      <div style="position:relative;display:flex;width:100%;" class="category_item"
                            v-for="item, index in myConversationsList"
                            v-bind:key="item.id"
                            v-bind:data-item-id="item.id"
                            v-bind:data-starred="item.isStarred"
                            v-bind:data-item-index="index"
                            v-bind:data-item-name="item.name"
                            v-bind:uk-tooltip="'title:' + item.participantNames +';pos:right'">

                        <div class="xui_grid_row list-row xchat_conversation_row"
                             style="padding: 5px 2px 5px 10px;position:relative;min-height: 65px;"
                             v-bind:id="'conf_list_item_' + item.id"
                             v-on:click="openChat($event, item)"
                             v-bind:data-new-msgs-count="item.newMessagesCount"
                             xv-show="filter === item.type">


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
                                     style="border: 1px solid rgb(220, 220, 220); padding: 1px; margin-left: 0px; height: 45px; width: 45px;">

                               <img v-if="item.type==='group-chat'"
                                           src="/resources/images/group.png"
                                           class="uk-border-pill ui-navbar-profile-image"
                                           style="border: 1px solid rgb(228 228 228);padding: 9px;margin-left: 0px;height: 45px;width: 45px;background: white;">

                                <!-- <img v-if="item.type === 'category-chat'"
                                            src="/resources/images/category21.png"
                                            class="uk-border-pill ui-navbar-profile-image"
                                            style="border: 3px solid rgb(228 228 228);padding: 9px;margin-left: 0px;height: 45px;width: 45px;background: white;"> -->
                                <span v-if="item.type === 'category-chat'" uk-icon="tag" class="uk-icon" style="border: 1px solid rgb(228 228 228);background: white;padding: 10px;border-radius: 50%;"></span>

                               <!-- <span v-if="item.type==='group-chat' || item.type === 'category-chat'" class="uk-margin-small-right uk-icon" style="background: rgb(255 255 255);border: 2px solid rgb(234, 234, 234);padding: 3px;border-radius: 50%;width: 55px;height: 35px;display: flex;justify-content: center;align-items: center;">
                                  <svg width="50" height="25" viewBox="-2 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <circle fill="none" stroke="#000" stroke-width="1.1" cx="7.7" cy="8.6" r="3.5"></circle>
                                    <path fill="none" stroke="#000" stroke-width="1.1" d="M1,18.1 C1.7,14.6 4.4,12.1 7.6,12.1 C10.9,12.1 13.7,14.8 14.3,18.3"></path>
                                    <path fill="none" stroke="#000" stroke-width="1.1" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1"></path><path fill="none" stroke="#000" stroke-width="1.1" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1" style="transform: rotateY(180deg) translateX(5px);transform-origin: center;"></path>
                                  </svg>
                               </span> -->
                          </div>
                          <div class="ui_grid_row list-detail" style="display: grid;margin-right: 0px;padding-right: 0px;">
                            <div class="list-item-row-2 task-name" style="color: #000000;place-items: flex-start flex-start;overflow-x: hidden;">
                              <p style="margin: 0 0 0px 0;text-overflow: ellipsis;overflow-x: hidden;white-space: nowrap;font-family: 'Nunito';">{{item.name}}</p>
                            </div>
                            <div class="list-item-row-1" style="display:flex;column-gap:5px">
                              <div class="" style="color: #969696;" v-html="item.lastMessage"></div>
                            </div>
                          </div>
                          <div style="display: flex;flex-direction: column;align-items: flex-end;justify-content: flex-start;margin-right: 10px;min-width: 75px;position: absolute;right: 0px;">
                            <div style="display:flex;column-gap:5px;align-items:center">
                              <div v-show="item.isStarred">
                                  <span uk-icon="ratio:0.65;zicon:star" style="color:rgb(254 215 0)">
                                    <svg width="13" height="13" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="star">
                                      <polygon fill="rgb(254 215 0)" stroke="#000" stroke-width="1.01" points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27"></polygon>
                                    </svg>
                                  </span>
                              </div>
                              <div v-show="item.newMessagesCount > 0" style="padding: 0px;min-width: 25px;height: 12px;text-align: center;border: 1px solid rgb(108 187 92);border-radius: 10%;font-size: 0.55rem;background-color: rgb(24 181 80 / 92%);color: white;display: flex;align-items: center;justify-content: center;">{{item.newMessagesCount}}</div>
                              <div class="task-created-date" style="font-size: 0.55rem;color: rgb(152, 152, 152);font-family: inherit;" v-bind:title="'Last message on ' + item.lastMessageDateTimeAgo" v-if="item.lastMessageDateTimeAgo!==null && item.lastMessageDateTimeAgo!==undefined">{{item.lastMessageDateTimeAgo}}</div>
                            </div>
                            <div>
                              <!--
                              <div v-show="item.newMessagesCount > 0" style="padding: 0.3em 0.8em;text-align: center;background-color: rgb(6, 215, 85);border-radius: 1.1em;font-size: 0.45rem;color: white;display: flex;align-items: center;justify-content: center;">{{item.newMessagesCount}}</div>
                              <div>
                                <span v-bind:id="'ctx-menu-trigger-' + item.id"  v-bind:data-chat-conversation-id="item.id"  class="contextMenuTrigger recd-ctx-menu-trigger ctx-menu-trigger trigger-icon" xv-on:click.stop="openContextMenu(item.id, $event)" uk-icon="ratio:0.65;icon:chevron-down" style="color:#777777">
                                  <svg width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-down" style="pointer-events:none"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                </span>
                              </div> -->
                            </div>
                          </div>
                        </div>

                        <div style="position: absolute;right: 15px;top: 45%;bottom: auto;display: inline-flex;column-gap: 5px;">
                          <span v-bind:id="'ctx-menu-trigger-' + item.id"  v-bind:data-chat-conversation-id="item.id"  class="contextMenuTrigger recd-ctx-menu-trigger ctx-menu-trigger trigger-icon" xv-on:click.stop="openContextMenu(item.id, $event)" uk-icon="ratio:0.65;icon:chevron-down" style="color:#777777">
                            <svg width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-down" style="pointer-events:none"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                          </span>
                        </div>
                      </div>
                      <div id="taskListIntersectionObserver"
                           class="ui_grid_row"
                           style="margin-right: 0px;padding: 7px 12px;border-bottom: 0em solid rgb(229, 229, 229);display: grid;place-items: center;background: rgb(255 255 255 / 5%);color: rgb(158, 158, 158);">
                        <span style="">No more available records.</span>
                      </div>
                    </div>


                </div>
            </div>
        </div>

      </div>

      <div class="pane-detail-view" style="margin-top: 0px;margin-left: 0px;border-left: 1px solid rgb(204, 204, 204);overflow-y: hidden;display: flex;flex-grow: 1;flex-basis: 70%;box-sizing: border-box;background-color: rgba(255, 255, 255, 0);">
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

    <teleport to=".chat_conversations_context_menu">
      <div class="context-menu" id="chatConversationContextMenu" >
          <div style="display: flex;flex-direction: column;font-size: 0.75rem;">
            <div v-if="!isClickedConversationStarred" style="padding:5px;user-select:none" class="context-menu-action-1" v-on:click="starConversation()">Star Conversation</div>
            <div v-if="isClickedConversationStarred" style="padding:5px;user-select:none" class="context-menu-action-1" v-on:click="unstarConversation()">Unstar Conversation</div>
            <div style="padding:5px;user-select:none" class="context-menu-action-1" v-on:click="onContextMenuActionClick(1)">Add Participant</div>
            <!-- <div style="padding:5px;user-select:none" class="context-menu-action-1" v-on:click="onContextMenuActionClick(1)">Delete Conversation</div> -->
          </div>
      </div>
    </teleport>

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

                              <div v-if="!similarGroupConversationsExists" class="uk-margin uk-grid-margin uk-first-column">
                                  <div class="uk-inline">
                                      <a tabindex="6" id="saveButton2" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(2 119 254); border-radius: 2px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="save('saveButton2')" >Create Conversation for Group</a>
                                      &nbsp;&nbsp;&nbsp;
                                      <!--<a tabindex="7" class="clickable-btn uk-button uk-button-danger uk-button-small uk-first-column end-call-button" style="background-color: rgba(253, 253, 253, 0.99); color: rgb(111, 111, 111); border: 1px solid rgb(183, 183, 183); border-radius: 3px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="goBack()" >Exit</a>-->
                                  </div>
                              </div>

                              <div v-if="similarGroupConversationsExists" class="uk-margin uk-grid-margin uk-first-column">
                                  <div class="uk-width-1-1 uk-first-column ">
                                      <div class="uk-form-controls">
                                          <div class="uk-inline uk-width-1-1" style="font-size:0.75rem;font-weight: normal;margin-bottom: 10px;display:flex;">
                                              <div style="display: flex;align-items: center;background: #d8d8d8;padding-left: 10px;padding-right: 10px;border-radius: 3px;">
                                                <span uk-icon="info" style="color: #2196f3;"></span>
                                                <span style="color: #2196f3;margin-left: 5px;">Information : </span>
                                              </div>
                                              <div style="display:flex;flex-direction:column">
                                                <span style="margin-left: 10px;">The following Group Conversations(s) with same members exist. You can click on the conversation name to open it.<br></span>
                                                <div v-for="similarGroupConversation, index in similarGroupConversations" style="margin-left: 30px;">
                                                    <a v-on:click="takeMeToThatGroupChatConversation(similarGroupConversation)" uk-tooltip="title:Open Conversation;pos:right">{{index+1}}. {{similarGroupConversation.name}}</a>
                                                </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="uk-inline">
                                      <a tabindex="6" id="saveButton2Proceed" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: #a7b711;border-radius: 2px;place-self: center start;place-items: center;min-width: 100px;font-size: 0.65rem;line-height: 32px;font-weight: normal !important;margin-top: 0px;" v-on:click="proceedGroupChatCreation()" >It's Okay, Create New Chat Group with same members</a>
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


    <teleport to=".chat_msg_item_context_menu">
        <ul>


            <li class="chat_msg_item_context_menu_action"  v-on:click="sendChatMessageContextMenuClickedEvent('reply')">
              <span> Reply </span>
            </li>
            <li class="chat_msg_item_context_menu_action"  v-on:click="sendChatMessageContextMenuClickedEvent('convert_to_task')">
              <span>Convert to Task</span>
            </li>
            <li v-on:click="sendChatMessageContextMenuClickedEvent('star')" class="chat_msg_item_context_menu_action option_to_star">
              <span> Star Message </span>
            </li>
            <li v-on:click="sendChatMessageContextMenuClickedEvent('unstar')" class="chat_msg_item_context_menu_action option_to_unstar hide_display">
              <span> Unstar Message </span>
            </li>
            <!-- <li class="chat_msg_item_context_menu_action" v-on:click="sendChatMessageContextMenuClickedEvent('reply_privately')">
                <span> Reply privately</span>
            </li> -->
        </ul>
    </teleport>
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
      chatListName: "Chats",
      conversationFilter: "recent",
      clickedConversationId: null,
      isClickedConversationStarred: false,
      isClickedConversationMessageStarred: false,
      chatCreationPromptData: {},
      similarGroupConversationsExists: false,
      similarGroupConversations: []
    };
  },
  methods: {

    // function copied from adk-app.vue
    loadFilteredConversations (filterKey, menuFilter, conversationName) {

      document.querySelectorAll('.menu-item').forEach((el) => {
          el.classList.remove('uk-active');
          el.classList.remove('selected-menu');
        }
      );
      document.querySelector('#' + menuFilter).classList.add('selected-menu');
      document.querySelector('#' + menuFilter).classList.add('uk-active');
      this.filterByConversations({ key: filterKey, filterName: conversationName });
    },
    filterByConversations (data) {
      this.chatListName = data.filterName;

      // Update the url assisting data to select filtered tasks.
      this.isTaskFilterOn = true;
      this.conversationFilter = data.key;
      this.refreshMyConversations(data.key);
      // this.resetRefreshList();

      // Reset ActivityList's data and intersection-observers
      // this.activityList = [];
      // this.currentPageNumberOfActivities = 1;
      // this.isActivityListIntersectionObserverFired = false;
      // this.allActivityRecordsFetched = false;
    },
    sendChatMessageContextMenuClickedEvent (type) {
      const selectedChatConversationId = document.querySelector(".chat_msg_item_context_menu").getAttribute("data-selected-chat-conversation-id");
      const selectedChatMessageId = document.querySelector(".chat_msg_item_context_menu").getAttribute("data-selected-chat-message-id");
      bus.emit('onChatMessageContextMenuClicked', {
        action: type,
        conversationId: selectedChatConversationId,
        selectedChatMessageId: selectedChatMessageId
      });
    },
    starConversation () {

      this.closeCategoryItemContextMenu();
      const url = './chat-conversations/star-conversation';
      const data = {
          id: this.clickedConversationId
      };

      axios.post(url, data)
        .then((dataResponse) => {
          console.log(dataResponse);
          if (dataResponse.data.status === "success") {
            // alert("Reset unread count in the ui via bus-event.");
            // bus.emit('resetUnreadCount', this.conversationId);
            this.myConversationsList.forEach(item => {
              if (item.id === this.clickedConversationId) {
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
    unstarConversation () {

      this.closeCategoryItemContextMenu();
      const url = './chat-conversations/unstar-conversation';
      const data = {
          id: this.clickedConversationId
      };

      axios.post(url, data)
        .then((dataResponse) => {
          console.log(dataResponse);
          if (dataResponse.data.status === "success") {
            // alert("Reset unread count in the ui via bus-event.");
            // bus.emit('resetUnreadCount', this.conversationId);
            this.myConversationsList.forEach(item => {
              if (item.id === this.clickedConversationId) {
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
    handleClickEvents (event) {

      event.stopPropagation();
      event.preventDefault();
      console.log(event.target);

      const openedContextMenu = document.querySelector("#chatConversationContextMenu"); // event.target.closest(".pane-list").querySelector(".context-menu.is-open");
      console.log("opened context menu : ", openedContextMenu);
      if (openedContextMenu !== null && openedContextMenu.classList.contains("is-open")) {
        openedContextMenu.classList.remove("is-open");
        console.log("closing.");
        return false;
      }

      if (event.target.classList.contains("contextMenuTrigger")) {
        this.clickedConversationId = event.target.closest(".category_item").getAttribute("data-item-id");
        this.isClickedConversationStarred = event.target.closest(".category_item").getAttribute("data-starred") === "true";
        this.clickedCategoryName = event.target.closest(".category_item").getAttribute("data-item-name");
        this.clickedCategoryIndex = parseInt(event.target.closest(".category_item").getAttribute("data-item-index"));
        this.openCategoryItemContextMenu(event);
      }
      else if (event.target.classList.contains("category_item")) {

        this.clickedCategoryId = event.target.getAttribute("data-item-id");
        this.clickedCategoryName = event.target.closest(".category_item").getAttribute("data-item-name");
        this.clickedCategoryIndex = parseInt(event.target.getAttribute("data-item-index"));
        this.showDetails(this.clickedCategoryId, this.clickedCategoryIndex);
      }
      else if (event.target.classList.contains("context-menu-action-1")) {
        const clickedCategoryId = this.clickedCategoryId;
        const clickedCategoryIndex = this.clickedCategoryIndex;
        const clickedCategoryName = this.clickedCategoryName;

        // Close the context-menu
        const openedContextMenu = document.querySelector("#chatConversationContextMenu"); // event.target.closest(".pane-list").querySelector(".context-menu.is-open");
        console.log("opened context menu : ", openedContextMenu);
        if (openedContextMenu !== null && openedContextMenu.classList.contains("is-open")) {
          openedContextMenu.classList.remove("is-open");
        }

        // Send to the server
        if (clickedCategoryId !== null) {
          this.setDefaultCategory(clickedCategoryId, clickedCategoryName);
        }
      }

    },
    closeCategoryItemContextMenu (event) {
      console.log("inside close context menu", event);

      // If the mousedown happened on the context-menu item, then don't close the menu.
      if (event !== undefined && event !== null && event.target.classList.contains("context-menu-action-1")) {
        return false;
      }

      const openedContextMenu = document.querySelector("#chatConversationContextMenu"); // event.target.closest(".pane-list").querySelector(".context-menu.is-open");
      console.log("opened context menu : ", openedContextMenu);
      if (openedContextMenu !== null && openedContextMenu.classList.contains("is-open")) {
        openedContextMenu.classList.remove("is-open");
        return false;
      }
    },
    openCategoryItemContextMenu (event) {

      // If target is other than the context-menu trigger, then ignore it.
      if (!event.target.classList.contains("contextMenuTrigger")) {
        this.closeCategoryItemContextMenu(event);
        return false;
      }

      // this.closeCategoryItemContextMenu(event);

      event.stopPropagation();
      event.preventDefault();

      const target = event.target;
      console.log(event);
      const contextMenu = document.querySelector("#chatConversationContextMenu"); // event.target.closest(".pane-list").querySelector(".context-menu");

      // if(contextMenu.classList.contains("is-open")){
      //   contextMenu.classList.remove("is-open");
      //   return false;
      // }

      const position = {
        x: event.clientX, // - contextMenu.getBoundingClientRect().width,
        y: event.clientY + 10
      };

      contextMenu.style.left = position.x - 0 + "px";
      contextMenu.style.top = position.y + "px";

      if (!contextMenu.classList.contains("is-open")) {
        setTimeout(() => {
          contextMenu.classList.add("is-open");
        }, 125);
      }

      document.querySelector('body').addEventListener('click', this.listenForBodyClicksForClosingContextMenu, false);

    },
    listenForBodyClicksForClosingContextMenu (event) {
      console.log('Body clicked at target ', event.target);

      const foundParent = event.target.closest('#chatConversationContextMenu'); // document.querySelector("#chatConversationContextMenu");
      // const foundTrigger = event.target.closest('.new_task_options_trigger_button'); // The click event on the trigger must also be ignored.
      console.log("foundParent : ", foundParent);

      if (foundParent === null) { //  && foundTrigger === null) {
        console.log('Closing menu as the body-click event landed on the body');
        this.closeCategoryItemContextMenu();
      }
    },


    onContextMenuActionClick (msg) {
      // alert("This is a message from within the chat-book.vue component." + msg);
      this.closeCategoryItemContextMenu(null);
    },
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
    openChat (event, conversation) {

        // If the click falls on the context-trigger, then ignore this event.
        if (event !== null && event !== undefined && event.target.classList.contains("contextMenuTrigger")) {
          return false;
        }


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

      if (document.querySelector('.selected_chat_item') !== null) { document.querySelector('.selected_chat_item').classList.remove('selected_chat_item'); }

      if (document.getElementById('conf_list_item_' + conversationId) !== null) {
        document.getElementById('conf_list_item_' + conversationId).classList.add('selected_chat_item');
      }

      // else->navigate to that component.
    },
    refreshMyConversations () {
      this.convesationPageNumber = 1;
      this.myConversationsList = [];
      this.fetchMyConversations();
    },
    checkForSimilarMemberGroup (form) {
      //

      return new Promise(resolve => {
        const post_url = './chat-conversations/check-for-similar-member-group';
        try {
          axios.post(process.env.VUE_APP_API_URL + post_url, form)
            .then((dataResponse) => {
              return resolve(dataResponse.data);
            })
            .catch((error) => {
              console.error('Error while fetching checking for existing group with same members : ', error);
              return reject(error);
            });
        } catch (error) {
          console.error('Unpaginated List data fetch error : ', error);
          return reject(error);
        }
      });
    },
    fetchMyConversations () {

      console.log('Fetching my conversations...from chat-book');
      // return false;

      return new Promise(resolve => {
        const url = './chat-conversations/list/' + this.conversationFilter + '/' + this.conversationPageNumber + '/all';

        try {
          axios.get(process.env.VUE_APP_API_URL + url)
            .then((dataResponse) => {
              // console.log("My Category List: " , dataResponse);
              const myConversationsList = dataResponse.data.bean;

              myConversationsList.forEach((conversation) => {

                if (conversation.starred !== null && conversation.starred.includes(this.loggedInUser.userId)) {
                  conversation.isStarred = true;
                } else {
                  conversation.isStarred = false;
                }

                conversation.showChat = false;
                conversation.newMessagesCount = 0;

                if (conversation.members !== null && conversation.members !== undefined) {
                  conversation.members.forEach(memberInConversation => {
                    if (memberInConversation.id === this.loggedInUser.userId) {
                      conversation.newMessagesCount = memberInConversation.unreadCount;
                    }
                  });
                }

                if (conversation.lastMessage !== null) {

                     // Temporarily
                     let tempTextArea = document.createElement("div");
                         tempTextArea.innerHTML = conversation.lastMessage;
                         conversation.lastMessage = tempTextArea.innerText;
                         tempTextArea = null;

                }

                if (conversation.lastMessage !== null && conversation.lastMessage.length > 50) {
                  conversation.lastMessage = conversation.lastMessage.substr(0, 50) + "..";
                }

                if (conversation.lastMessageTime !== null) {
                  conversation.lastMessageDateTimeFormatted = dayjs(conversation.lastMessageTime + "Z").format('DD/MM/YYYY HH:mm');
                  conversation.lastMessageDateTimeAgo = dayjs(conversation.lastMessageTime + "Z").fromNow();
                }

                if (conversation.type !== "one-to-one" && conversation.involvedMemberNames !== null && conversation.involvedMemberNames !== undefined) {
                  conversation["participantNames"] = conversation.involvedMemberNames.join(", ");
                }
                else {
                  conversation["participantNames"] = conversation.name;
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

    async save (btnId) {
      // if(!this.doValidation())
      //    return false; // stop here if form is invalid.



      const btnText = document.getElementById(btnId).innerHTML;
      document.getElementById(btnId).innerHTML = 'Saving..';
      this.disableHTMLElement(document.getElementById(btnId));



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

      if (form.type === "group-chat") {
        const similarGroupConversations = await this.checkForSimilarMemberGroup(form);



        if (similarGroupConversations !== null && similarGroupConversations.length > 0) {

          this.similarGroupConversations = similarGroupConversations;
          this.similarGroupConversationsExists = true;

          // Pause the saving flow and display to the user "Similar Group exists" and give the 2 following options
          //    1. Open Existing Conversation.
          //    2. Create New Conversation.
          // Temporarily save it and display to user for confirmation.
          this.chatCreationPromptData = {
            form: form,
            btnId: btnId,
            btnText: btnText
          };

          return false;
        }
        else {
          this.createChatConversation(form, btnId, btnText);
        }
      }
      else {
        this.createChatConversation(form, btnId, btnText);
      }

    },

    takeMeToThatGroupChatConversation (similarGroupConversation) {

        this.myConversationsList.push(similarGroupConversation);
        this.openChat(null, similarGroupConversation);
        UIkit.modal(document.querySelector('#newChatConversationModal')).hide();

        this.chatCreationPromptData = {};
        this.similarGroupConversations = [];
        this.similarGroupConversationsExists = false;
    },
    proceedGroupChatCreation () {
        this.createChatConversation(this.chatCreationPromptData.form, this.chatCreationPromptData.btnId, this.chatCreationPromptData.btnText);
        this.chatCreationPromptData = {};
        this.similarGroupConversationsExists = false;
    },
    createChatConversation (form, btnId, btnText) {
      // alert("Creating chat..");

      // VueJS ajax call-1
      const post_url = './chat-conversations/save';
      console.log('Posting data to : ' + post_url);
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

            UIkit.modal(document.querySelector('#newChatConversationModal')).hide();
            this.$emit('refreshList', {});
            this.refreshMyConversations();

            // Assuming the conversation list will be refreshed within a second, the following
            // code opens the new conversation.
            setTimeout(() => {
              this.openChat(null, dataResponse.data.bean);
            }, 1000);

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

      if (data === null || data === undefined) {
        return false;
      }

      try {
        this.newChatConversation.withUserId = data.id;
      }
      catch (e) {
        console.error(e);
      }
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

    bus.on("resetUnreadCount", (data) => {

      const conversationId = data;
      const matchingItem = this.myConversationsList
                               .find(conversation => conversation.id === conversationId);
        matchingItem.newMessagesCount = 0;
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
        let msg = data.message;
        const sender = data.senderInfo.split('#')[1];


        const conversationId = data.conversationId;
        const matchingItem = this.myConversationsList
                               .find(conversation => conversation.id === conversationId);

         if (msg !== null && msg.length > 50) {
           msg = msg.substr(0, 50) + "..";
         }
         matchingItem.lastMessage = sender + " : " + msg;

         // Temporarily
         const tempTextArea = document.createElement("div");
               tempTextArea.innerHTML = matchingItem.lastMessage;
               matchingItem.lastMessage = tempTextArea.innerText;

         let matchingIndex = -1;
         for (const idx in this.myConversationsList) {
           if (data.conversationId === this.myConversationsList[idx]["id"]) {
             matchingIndex = idx;
           }
         }

         // If the current conversation (the logged-in-user is typing on) is already at the top, then ignore it, else send it to the top.
         if (matchingIndex > 0) {

           const recentConversation = this.myConversationsList.splice(matchingIndex, 1)[0];
           const recentConversationCloned = JSON.parse(JSON.stringify(recentConversation));



           console.log("RecentConvo = ", recentConversationCloned, matchingIndex);
           setTimeout(() => {
             this.myConversationsList.unshift(recentConversationCloned);

             setTimeout(() => {
               document.getElementById('conf_list_item_' + recentConversationCloned["id"]).classList.add('selected_chat_item');
             }, 100);

           }, 20);
         }


      }
      else {
        let msg = data.message;
        const sender = data.senderInfo.split('#')[1];


        const conversationId = data.conversationId;
        const matchingItem = this.myConversationsList
                               .find(conversation => conversation.id === conversationId);

          if (msg !== null && msg.length > 50) {
            msg = msg.substr(0, 50) + "..";
          }

          matchingItem.newMessagesCount += 1;
          matchingItem.lastMessage = sender + " : " + msg;

          const tempTextArea = document.createElement("div");
                tempTextArea.innerHTML = matchingItem.lastMessage;
                matchingItem.lastMessage = tempTextArea.innerText;


           let matchingIndex = -1;
           for (const idx in this.myConversationsList) {
             if (data.conversationId === this.myConversationsList[idx]["id"]) {
               matchingIndex = idx;
             }
           }

           const recentConversation = this.myConversationsList.splice(matchingIndex, 1)[0];
           const recentConversationCloned = JSON.parse(JSON.stringify(recentConversation));

           console.log("RecentConvo = ", recentConversationCloned, matchingIndex);
           setTimeout(() => {
             this.myConversationsList.unshift(recentConversationCloned);
           }, 20);

          var newActivitySound = document.querySelector('#new_chat_notification_sound');
              newActivitySound.volume = 1;
              newActivitySound.play();

              if (data.senderInfo.split('#')[0] !== this.loggedInUser.userId) {
                bus.emit('new-chat-notification', {});
              }
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
