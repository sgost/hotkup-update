<style scoped>

  .side-bar-light .uk-nav-sub>li.selected-menu>a {
      color: #333!important;
      font-weight: bold!important;
      font-size: .7rem;
  }



    .subtasks_box {
      display: grid;
      -moz-column-gap: 30px;
      column-gap: 30px;
      grid-template-columns: 1fr;
      border: 1px solid transparent;
      border-bottom: 0px;
    }

    .subtask_row {
      position: relative;
      padding: 5px 10px;
      display: grid;
      align-items: end;
      height: 30px;
      justify-items: start;
      grid-template-columns: 60px 5fr 2fr 2fr 2fr;
      -moz-column-gap: 20px;
      column-gap: 20px;
      border-bottom: 1px solid #f3f3f3;
      border-left: 5px solid transparent;
      background-color: rgb(255 255 255);
      font-size: 0.65rem;
    }

    .subtask_row:hover {
      border-left: 5px solid rgb(31 105 189);
    }

    .subtask_row > div {
      margin-bottom: 5px;
    }

    .depedencytask_row {
      position: relative;
      padding: 5px 10px;
      display: grid;
      align-items: end;
      height: 30px;
      justify-items: start;
      grid-template-columns: 60px 2fr 1fr 1fr 1fr;
      -moz-column-gap: 20px;
      column-gap: 20px;
      border-bottom: 1px solid #f3f3f3;
      border-left: 5px solid transparent;
      background-color: rgb(255 255 255);
      font-size: 0.65rem;
    }

    .depedencytask_row:hover {
      border-left: 5px solid transparent;
    }

    .depedencytask_row > div {
      margin-bottom: 5px;
    }
</style>

<template>

  <div style="display: flex;flex-grow: 1;overflow-y: hidden;position: relative;" class="user-profile-panel">
    <div style="display: flex; height: 100%;">
      <div id="appSideMenuForMySettings" class="app-side-menu" style="xxflex-basis:10%;">
          <div vv-if="loggedInUser.isInformationFetchComplete" id="appSideMenuContent" class="app-side-menu-content">
            <div class="uk-offcanvas-bar0 custom-scroll-bar side-bar-light" style="flex-grow:1;padding-top:50px">
                <ul class="uk-nav uk-nav-default">


                    <li class="menu-item uk-active selected-menu" id="rtasks_settings_menu" >
                      <a v-on:click="loadMySettingsMenu('rtasks_settings_menu')" uk-tooltip="title:Configure Recurring Tasks;pos:right">
                        <span class="lnr lnr-history" style="transform: rotateY(180deg);"></span>&nbsp;&nbsp;Recurring Tasks
                      </a>
                    </li>
                    <li class="menu-item" id="ui_settings_menu">
                      <a v-on:click="loadMySettingsMenu('ui_settings_menu')" uk-tooltip="title:Configure UI Settings;pos:right">
                        <span class="lnr lnr-select"></span>&nbsp;&nbsp;UI Settings
                      </a>
                    </li>

                    <!--
                    <li class="menu-item" id="draft_tasks_menu">
                      <a v-on:click="loadMySettingsMenu('draft','draft_tasks_menu', 'Drafted Tasks')">
                        <span class="lnr lnr-file-empty"></span>&nbsp;&nbsp;Drafts
                        <span class="counter-label" id="drafts_count"></span>
                      </a>
                    </li>-->
                    <li class="menu-item" id="notifications_settings_menu" >
                      <a v-on:click="loadMySettingsMenu('notifications_settings_menu')" uk-tooltip="title:Configure Notification preferences;pos:right">
                        <span class="lnr lnr-alarm"></span>&nbsp;&nbsp;Notification Settings
                      </a>
                    </li>
                    <li class="menu-item" id="chat_settings_menu">
                      <a v-on:click="loadMySettingsMenu('chat_settings_menu')"  uk-tooltip="title:Chat Settings;pos:right">
                        <span class="lnr lnr-bubble"></span>&nbsp;&nbsp;Chat Settings
                      </a>
                    </li>

                    <li v-if="hasAdminRoles" class="menu-item" style="margin-top:20px">
                      <hr>
                    </li>
                    <li v-if="hasAdminRoles" class="menu-item" id="admin_settings_menu">
                      <a href="/admin"  uk-tooltip="title:Go to Company Settings;pos:right">
                        <span class="lnr lnr-cog"></span>&nbsp;&nbsp;Admin Settings
                      </a>
                    </li>

                </ul>
            </div>
          </div>
      </div>

    </div>
    <div style="display: flex;width: 100%;flex-grow: 1;">
        <div style="margin:50px 50px 0px 50px;display: flex;width: 100%;flex-grow: 1;">
            <div v-if="chosenView === 'ui_settings_menu'" style="display: flex;width: 100%;flex-direction: column;">
                <div>UI Settings</div>
                <div><hr></div>
                <div>Coming soon..</div>
            </div>
            <div v-else-if="chosenView === 'notifications_settings_menu'" style="display: flex;width: 100%;flex-direction: column;">
                <div>Notification Settings</div>
                <div><hr></div>
                <div>Coming soon..</div>
            </div>
            <div v-else-if="chosenView === 'rtasks_settings_menu'" style="display: flex;width: 100%;flex-direction: column;">
                <div>Configured Recurring Tasks</div>
                <div><hr></div>
                <div>

                  <div  v-show="recurringTasks.length>0"  class="depedencytask_row" style="background: #f2f2f2;border: 1px solid transparent;border-bottom: 0px;text-transform: uppercase;font-size: 0.55rem;">
                      <div style=";justify-self: end;">Task No.</div>
                      <div >Title</div>
                      <div  style="color: rgb(51, 51, 51);">Created On</div>
                      <div  style="color: rgb(51, 51, 51);">Next Fire Time</div>
                      <div  style="color: rgb(51, 51, 51);">Options</div>
                  </div>
                  <div v-show="recurringTasks.length>0"  class="subtasks_box">
                      <template v-for="rTask in recurringTasks">
                          <div class="depedencytask_row">
                            <div style="font-weight:normal;justify-self: end;">
                              <a v-on:click="viewTask(rTask.id)">#{{rTask.sno}}</a>
                            </div>
                            <div v-on:click="viewTask(rTask.id)" style="cursor:pointer">{{rTask.name}} {{rTask.state}}</div>
                            <div style="color:#333">{{rTask.createdOnFormatted}}</div>
                            <div>
                                {{rTask.nextFireTimeFormatted}} <span style="margin-left:10px;padding-left:5px;color: rgb(46, 166, 253);text-transform: none;font-size: 0.6rem;letter-spacing: 0.5px;">({{rTask.nextFireTimeAgo}})</span>
                            </div>
                            <div>
                              <span v-if="rTask.state === 'ENABLED' || rTask.state === null"><a v-on:click="disableRTask(rTask.id)">Disable</a> | <a v-on:click="cancelRTask(rTask.id)">Cancel</a></span>
                              <span v-else-if="rTask.state === 'DISABLED'"><a v-on:click="enableRTask(rTask.id)">Enable</a> | <a v-on:click="cancelRTask(rTask.id)">Cancel</a></span>
                              <span v-else-if="rTask.state === 'CANCELLED'">Cancelled</span>
                            </div>
                          </div>
                      </template>
                  </div>
                </div>
            </div>
            <div v-else-if="chosenView === 'chat_settings_menu'" style="display: flex;width: 100%;flex-direction: column;">
                <div>Chat Settings</div>
                <div><hr></div>
                <div>Coming soon..</div>
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
  import * as Comlink from 'comlink';

  export default {
  mixins: [uiListMixinLib, userMixinLib],
  props: ['loggedInUser'],
  data: function () {
    return {
      hasAdminRoles: false,
      chosenView: 'rtasks_settings_menu',
      recurringTasks: new Set()
    };
  },
  methods: {

    loadMySettingsMenu (viewKey) {

      this.chosenView = viewKey;

      document.querySelectorAll('#appSideMenuForMySettings .menu-item').forEach((el) => {
          el.classList.remove('uk-active');
          el.classList.remove('selected-menu');
        }
      );
      document.querySelector('#' + viewKey).classList.add('selected-menu');
      document.querySelector('#' + viewKey).classList.add('uk-active');

    },
    fetchRecurringTasks () {

      const url = './recurring-tasks/list/all';
      try
      {
        // VueJS ajax call-1
        axios.get(process.env.VUE_APP_API_URL + url)
          .then((dataResponse) => {
            console.log('Notification List: ', dataResponse);
            const list = dataResponse.data.bean;

            this.recurringTasks = [];

            list.forEach(task => {

              if (task.createdOn !== null) {
                // task.dueDateTime = new Date(task.dueDateTime).toLocaleString()
                //                                          .slice(0, 17)
                //                                          .replace(',', '')
                //                                          .replace('T',' ');

                // Added during "Fix-Date-UTC-Update"
                // task.dueDateTime = new Date(task.dueDateTime + " UTC").toLocaleString();
                // task.dueDateTime = this.convertUTCDateFromServerToLocalDate(task.dueDateTime);
                task.createdOnFormatted = "";
                task.createdOnFormatted = dayjs(task.createdOn + "Z").format('DD/MM/YYYY HH:mm');
                // task.dueDateTimeAgo = dayjs(task.dueDateTime + "Z").fromNow();
              }

              if (task.nextFireTime !== null) {
                // task.dueDateTime = new Date(task.dueDateTime).toLocaleString()
                //                                          .slice(0, 17)
                //                                          .replace(',', '')
                //                                          .replace('T',' ');

                // Added during "Fix-Date-UTC-Update"
                // task.dueDateTime = new Date(task.dueDateTime + " UTC").toLocaleString();
                // task.dueDateTime = this.convertUTCDateFromServerToLocalDate(task.dueDateTime);
                task.nextFireTimeFormatted = "";
                task.nextFireTimeAgo = "";

                task.nextFireTimeFormatted = dayjs(task.nextFireTime + "Z").format('DD/MM/YYYY HH:mm');
                task.nextFireTimeAgo = dayjs(task.nextFireTime + "Z").fromNow();
              }

              this.recurringTasks.push(task);

            });

          })
          .catch((error) => {
            console.error('fetchNotifications Error : ', error);
          });
      } catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }
    },
    viewTask (taskId) {

      bus.emit('viewRTaskEvent', {
        rTaskId: taskId,
        modalKey: "view_rtask"
      });
      return false;
    },
    updateRTaskState (taskId, state, actionLabel) {

      const post_url = './recurring-tasks/state-change';

      const form = {
        taskId: taskId,
        state: state
      };

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {

            console.log(dataResponse);
            const updatedRTask = {};

            let index = 0;
            let matchingIndex = -1;
            let matchingRTask = {};
            this.recurringTasks
                .forEach(rTask => {

                  if (rTask.id === taskId)
                  {
                    matchingIndex = index;
                    matchingRTask = rTask;
                  }
                  index++;
                });

            if (dataResponse.data.status === "success" && state === "ENABLE") {
              matchingRTask.state = "ENABLED";
            }
            else if (dataResponse.data.status === "success" && state === "DISABLE") {
              matchingRTask.state = "DISABLED";
            }
            else if (dataResponse.data.status === "success" && state === "CANCEL") {
              matchingRTask.state = "CANCELLED";
            }
            else {
              console.log("ELSE BLOCK");
            }

            const matchingRTaskClone = JSON.parse(JSON.stringify(matchingRTask));
            this.recurringTasks[matchingIndex] = matchingRTaskClone;
            console.log('\t replaced at index : ', matchingIndex, matchingRTaskClone);

            const notificationLabel = `Recurring Task Template was ${actionLabel}.`;
            UIkit.notification(`<div class="taskone-notification">
                                                <span uk-icon="icon: check;ratio:1"></span>
                                                <div> ${notificationLabel} </div>
                                            </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 5000
            });
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
    enableRTask (taskId) {
      this.updateRTaskState(taskId, "ENABLE", "enabled");
    },
    disableRTask (taskId) {
      this.updateRTaskState(taskId, "DISABLE", "disabled");
    },
    cancelRTask (taskId) {
      this.updateRTaskState(taskId, "CANCEL", "cancelled");
    },
    confirmRTaskCancellation (taskId) {

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
    // bus.on('new-notification', (data) => this.updateNotificationsList(data));
    console.log('Fetching user settings from browser..');

      const encodedSPR = this.getCookie('spr');
      const decodedSPR = decodeURIComponent(encodedSPR);
      this.showMenu1 = decodedSPR === 'jvsb$kdwbj$matiu';
      this.hasAdminRoles = decodedSPR === 'jvsb$matiu';

      this.fetchRecurringTasks();
    // If localstorage theme doesn't exist, then pull it from the server.
    // if (localStorage.getItem("preferredTheme") === null) {
    //   this.refreshSettings();
    // }
    // else {
    //   this.getUserSettingsStoredInBrowser();
    // }
  },
  watch: {
  }
};

</script>
