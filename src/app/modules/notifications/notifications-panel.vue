<template>

  <div style="position:relative;display: flex;flex-grow: 1;overflow-y: hidden;position: relative;padding:0px;">
    <div class="notifications_panel_bg"></div>
    <div style="z-index: 1;display: flex;overflow-y:hidden;flex-direction: column;flex-grow: 1;">
        <div class="task-list" style="display: flex;justify-content: center;overflow-y:hidden;flex-grow: 1;margin-top: 10px;grid-template-rows: 1fr;background-color:#fff0">
            <div class="adk_grid_list_content custom-scroll-bar" style="width: 100%;display: flex;flex-direction: column;row-gap:10px;;margin-bottom: 10px;">

              <template v-for="notification,idx in notificationsList">

                    <div v-bind:data-index="idx" v-bind:class="{ 'notification_box' : true}" v-bind:id="'notification_' + notification.id" style="position:relative">
                        <div style="xpointer-events:none" v-bind:title="notification.notificationType" v-bind:class="{'new_notification': notification.hide, 'notification_description' : true}" >
                            <div style="font-weight: normal;font-size: 0.55rem;color: rgb(152, 152, 152);padding: 5px 0px;text-align: end;border-top: 0px solid rgb(226, 226, 226);position: absolute;bottom: -5px;right: 10px;">{{notification.createdOn}}</div>
                            <div style="pointer-events:none;flex-grow: 1;width: 100%;">
                                <div class="list-item-row-1 notification_title" style="user-select: none;cursor: pointer;display: flex;justify-content: space-between;column-gap: 5px;border-bottom: 0px solid rgb(232, 232, 232);padding: 0px;padding-bottom: 5px;flex-grow: 1;width: 95%;align-items: center;">
                                    <span v-if="notification.notificationType === 'TASK_INFO_CHANGES'" uk-icon="icon:clock;ratio:0.65" class="uk-icon"></span>
                                    <span v-else-if="notification.notificationType === 'TASK_ACTIVITY_NEW_COMMENT' || notification.notificationType === 'TASK_ACTIVITY_NEW_COMMENT_REPLY'" uk-icon="icon:comment;ratio:0.65" class="uk-icon"></span>
                                    <span v-else uk-icon="icon:mail;ratio:0.65" class="uk-icon"></span>

                                    <div style="flex-grow:1;font-size: 0.7rem;">
                                      {{notification.title}}
                                      <span v-if="notification.isNew!==undefined && notification.isNew===true" class="unread_notification" style="margin-left: 5px;color: #fdfdfd;background: #58af5b;font-size: 0.55rem;padding: 1px 5px;border-radius: 3px;top: 0px;right: 0px;max-width: 15px;height: 10px;text-align: center;user-select: none;">New</span>
                                    </div>
                                </div>
                                <div class="notification_content notification_content_collapsed" style="display: flex;margin-top: 2px;padding: 10px 5px 5px 5px;color: rgb(158, 158, 158);border-bottom: 1px solid #eaeaea;margin-bottom: 10px;">
                                    <div style="white-space: pre-wrap;word-break: break-word;font-size: 0.65rem;line-height: 22px;" v-html="notification.description"></div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex;padding-right: 25px;padding-bottom: 5px;padding-top: 5px;padding-left: 5px;font-size: 0.55rem;box-sizing: border-box;position: absolute;bottom: 0px;left: 15px;line-height: initial;" class="task_view_button  clickable-btn  uk-button notification_content_collapsed">
                            <a v-on:click="handleNotification(notification)">View Task</a>
                        </div>
                    </div>

              </template>
              <div id="isNotificationsListIntersectionObserver"
                   class="ui_grid_row"
                   style="margin: 10px;padding: 7px 12px;border-bottom: 0em solid rgb(229, 229, 229);display: flex;align-items: center;justify-content: center;background: rgb(255 255 255 / 0%);color: rgb(144 144 144);">
                <span style="background: rgb(64 64 64 / 10%);color: rgb(144 144 144);padding: 7px 12px;border-radius: 20px;">No more notifications.</span>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import { Vue } from 'vue';
import { bus } from './../../../main.js';
import uiListMixinLib from './../../mixins/lib/ui-list.js';
import userMixinLib from './../../mixins/lib/user_mixin_lib.js';

export default {
  mixins: [uiListMixinLib, userMixinLib],
  data: function () {
    return {
      api: 'notifications',
      isMobileDevice: true,
      resizeTimeout: null,
      appName: this.$route.params.app_name,
      searchQuery: '',

      resetTime: {
        time: new Date().getTime()
      },

      notificationsList: [],
      currentPageNumberOfNotifications: 1,
      isNotificationListIntersectionObserverFired: false,
      allNotificationsFetched: false

    };
  },
  methods: {
    handleNotification (notification) {
      // alert(notification.title);
      console.log("notification : ", notification);
      // return false;

      if (notification.taskId) {
        bus.emit('show-task-details', {
          taskId: notification.taskId,
          eventType: notification.notificationType
        });
      }
    },
    fetchNotifications () {
      // If all records are fetched, make no calls to the server again.
      if (this.allNotificationsFetched) { return false; }

      const url = './notifications/list/' + this.currentPageNumberOfNotifications + '/all';
      try {
        // VueJS ajax call-1
        axios.get(process.env.VUE_APP_API_URL + url)
          .then((dataResponse) => {
            console.log('Notification List: ', dataResponse);
            const list = dataResponse.data.bean;

            // Since we are pulling 20 records per page, then if the resulting size is lesser than 20, then it means
            // no more records are available.
            if (list.length < 20) {
              this.allNotificationsFetched = true;
            }

            list.forEach((item) => {
              if (item.createdOn !== null) {
                item.createdOn = new Date(item.createdOn).toLocaleString()
                  .slice(0, 17)
                  .replace(',', '')
                  .replace('T', ' ');
              }

              item.hide = false;
              this.notificationsList.push(item);

                // Whenever the notifications are fetched, and if it contains unread notifications, it must be added to the notification-counter.
                if (item.isNew) {
                  // bus.emit('new-notification', {});
                }
            });

            // If there are more records to fetch, then flex-start observing the loadMore-intObsrv-trigger.
            if (!this.isNotificationListIntersectionObserverFired) {
              this.initLoadMoreIntersectionObserverInNotificationsList();
              this.isNotificationListIntersectionObserverFired = true;
            }



          })
          .catch((error) => {
            console.error('fetchNotifications Error : ', error);
          });
      } catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }
    },
    initLoadMoreIntersectionObserverInNotificationsList () {
      // console.log("bus = ", bus);

      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio <= 0) { // If not in view
          console.log('Load more is not in view. ' + '#' + this.observerElement);
        } else {
          console.log('Load more is in view. ' + '#' + this.observerElement);
          // observer.unobserve(document.getElementById(observerElement));

          // Increment the current page number
          this.currentPageNumberOfNotifications += 1;
          this.fetchNotifications();
        }
      },
      {
        root: null,
        rootMargin: '0px'
      });

      setTimeout(() => {
        this.observer.observe(document.getElementById('isNotificationsListIntersectionObserver'));
      }, 1000);
    },
    updateNotificationsList (data) {
      console.log('Received new notification from real-time : ', data);
      data.isNew = true;

      if (data.createdOn !== null) {
        data.createdOn = new Date(data.createdOn).toLocaleString()
          .slice(0, 17)
          .replace(',', '')
          .replace('T', ' ');
      }

      this.notificationsList.unshift(data);
    },
    addEventListenerForNotificationTitleClick (event) {


        if (event.target.classList.contains("notification_description")) {
             event.target
                  .querySelector(".notification_content")
                  .classList
                  .toggle("notification_content_collapsed");

              event.target
                   .parentElement
                   .querySelector(".task_view_button")
                   .classList
                   .toggle("notification_content_collapsed");

              // Remove the "new" label when its opened.
              event.target
                   .querySelector(".unread_notification")
                   .style.display = "none";

            const idx = event.target.getAttribute("data-index");
            const notification = this.notificationsList[parseInt(idx)];
            // this.handleNotification(notification);

            bus.emit('new-notification-read', {});
        }
    }
  },
  created: function () {},
  computed: {
    storeCounter: function () {
      // console.log('Accessing vuex store ', this.$store)
      // console.log('Store data accessed from home page : ' + this.$store.getters.count)
    }
  },
  mounted: function () {
    bus.on('new-notification', (data) => this.updateNotificationsList(data));

    console.log('Fetching notifications..');
    this.fetchNotifications();

    document.querySelector(".notifications_panel")
            .addEventListener("click", this.addEventListenerForNotificationTitleClick);


  },
  watch: {
  }
};

</script>

<style scoped>

  .notifications_panel_bg{
    z-index: 0;
    /*
    background-image: url(https://image.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg);
    filter: blur(0px) opacity(0.75) brightness(1);
    */
    background-image: url(/resources/images/pexels-lukas-317356.jpg);
    filter: blur(20px) opacity(0.25) brightness(1);
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
  }

  .notification_content_collapsed{
    display:none !important;
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

  /* Custom scrollbar style - To be moved to style.css */
  .custom-scroll-bar::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
    scroll-behavior: smooth;
    cursor: pointer;
  }

  .custom-scroll-bar::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  .custom-scroll-bar[data-v-6459955c]::-webkit-scrollbar-thumb {
    background-color: #a8a8a8;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }

  .custom-scroll-bar[data-v-6459955c]::-webkit-scrollbar-track {
    /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
    background-color: #f3f3f3;
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

  .list-row {
    display: grid;
    height: 100px;
    grid-template-rows: auto auto auto;
    margin-right: 10px;
    border: .05em solid #e5e5e5;
    border-left: .05em solid #e5e5e5;
    background: white;
    border-radius: 5px;
  }

  .list-row.active {
    border-left: 5px solid #1f69bd;
  }

  .list-row:hover {
    background: whitesmoke;
  }

  .list-row .task-sno {
    font-size: 0.65rem;
    font-weight: bold;
    font-family: Muli, sans-serif !important;
    color: #8a8a8a;
  }

  .list-row .task-created-date {
    background: #fff4d3;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 0.55rem;
  }

  .list-row .task-name {
    font-size: 0.8rem;
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

      .notification_box{
        display: grid;
        column-gap: 30px;
        grid-template-columns: 1fr;
        margin: 0 10px 0 10px;
        background: #ffffff;
        background: #ffffffa1;
        background: linear-gradient(45deg , white, #ffffffb8);
        border: 1px solid #cacaca5e;
        border-radius: 4px;
        box-shadow: rgb(0 0 0 / 5%) 4px 3px 10px 0px;
        transition:0.15s linear;
        cursor:pointer;
      }

      .notification_box:hover{
        background: #fdffea;
      }

      .new_notification{
          display:none !important;
      }

      .pulse_notification{
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

      .notification_description{
        position: relative;
        padding: 10px 10px 10px 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-radius: 1px;
        transition: 0.25s ease-in;
      }

      .notification_description>div{
        margin-bottom:5px;
      }

      .notification-sno{
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

</style>
