<template>

  <div style="display: flex;flex-grow: 1;overflow-y: hidden;position: relative;" class="user-profile-panel">
    <div style="display: flex;overflow-y: hidden;flex-direction: column;flex-grow: 1;position: relative;box-sizing: border-box;overflow-x: hidden;">
        <div class="scroll_container" id="profile_settings_scroll_container">
            <div class="custom-scroll-bar main-menu" style="min-width: 100%;display: flex;flex-direction: column;row-gap:0px;;margin-bottom: 10px;">
                <div xv-on:click="openMenu('edit-profile')" style="justify-content: center;background: rgb(240, 240, 240);border-radius: 5px;display: flex;flex-direction: column;">
                    <div style="display: inline-flex;gap: 10px;align-items: center;">
                      <span>{{loggedInUser.email}}</span>
                    </div>
                    <div>
                      <div style="justify-content: center;display: flex;">
                        <form id="loform" action="/logout" method="POST">
                          <a v-on:click="logoutFromHere()" style="color: rgb(37 139 254);" class="welcome-font taskone-logout">logout</a>
                        </form>
                      </div>
                    </div>
                </div>
                <div v-on:click="openMenu('edit-profile')">
                    <div style="display: inline-flex;gap: 10px;align-items: center;">
                      <span uk-icon="ratio:0.85;icon:user" class="uk-icon"></span>
                      <span>Change Profile Photo</span>
                    </div>
                    <div>
                      <span uk-icon="icon:chevron-down;ratio:0.85" class="uk-icon" style="transition: all 0.25s linear 0s;transform:rotate(-90deg)"></span>
                    </div>
                </div>
                <div v-on:click="openMenu('change-password')">
                  <div style="display: inline-flex;gap: 10px;align-items: center;">
                    <span uk-icon="ratio:0.85;icon:lock" class="uk-icon"></span>
                    <span>Change Password</span>
                  </div>
                  <div>
                    <span uk-icon="icon:chevron-down;ratio:0.85" class="uk-icon" style="transition: all 0.25s linear 0s;transform:rotate(-90deg)"></span>
                  </div>
                </div>
                <div v-on:click="openMenu('default-theme')">
                  <div style="display: inline-flex;gap: 10px;align-items: center;">
                    <span uk-icon="ratio:0.85;icon:image" class="uk-icon"></span>
                    <span>Default Theme</span>
                  </div>
                  <div>
                    <span uk-icon="icon:chevron-down;ratio:0.85" class="uk-icon" style="transition: all 0.25s linear 0s;transform:rotate(-90deg)"></span>
                  </div>
                </div>
                <div v-on:click="openMenu('notification-settings')">
                  <div style="display: inline-flex;gap: 10px;align-items: center;">
                    <span uk-icon="ratio:0.85;icon:bell" class="uk-icon"></span>
                    <span>Notification Settings</span>
                  </div>
                  <div>
                    <span uk-icon="icon:chevron-down;ratio:0.85" class="uk-icon" style="transition: all 0.25s linear 0s;transform:rotate(-90deg)"></span>
                  </div>
                </div>
                <div v-on:click="openMenu('task-settings')">
                  <div style="display: inline-flex;gap: 10px;align-items: center;">
                    <span uk-icon="ratio:0.85;icon:settings" class="uk-icon"></span>
                    <span>Task Settings</span>
                  </div>
                  <div>
                    <span uk-icon="icon:chevron-down;ratio:0.85" class="uk-icon" style="transition: all 0.25s linear 0s;transform:rotate(-90deg)"></span>
                  </div>
                </div>
            </div>
            <div id="submenu" class="sub-menu" style="min-width: 100%;">
                <div v-if="menu==='edit-profile'"  style="justify-content: normal;">
                    <div class="sub-menu-title-bar">
                      <div class="icon uk-button" v-on:click="goToFirstMenuPage()">
                        <span uk-icon="icon: arrow-left;ratio:1" class="uk-icon" style="transition: all 0.25s linear 0s;"></span>
                      </div>
                      <div style="display: inline-flex;gap: 10px;align-items: center;">
                        <span>Upload Profile Photo</span>
                      </div>
                    </div>
                    <div class="sub-menu-content " style="display: flex;position: relative;align-items: center;flex-direction: column;justify-content: center;row-gap: 20px;padding: 20px;">

                        <div id="uploadingProfilePictureStatus" class="profile-picture-uploading-overlay hide_display">Uploading photo..</div>

                        <div>
                          <img class="uk-border-pill ui-navbar-profile-image" v-bind:data-img-id="loggedInUser.userId"  v-bind:src="'/api/us/profile/get/' + loggedInUser.userId"
                            onerror="this.onerror=null;this.src='resources/images/male_default_pic.png';" width="100" height="100"
                            style="border: 2px solid rgb(222, 222, 222);background: rgb(231, 237, 246);padding: 3px;margin-left: 0px;min-height: 100px;min-width: 100px;">
                        </div>
                        <div class="upload-profile-picture-btn" style="user-select:none;" >
                          <div class="file-upload-wrapper" data-text="Upload new photo">
                            <input name="file" type="file" id="fileUploadForm" v-on:change="uploadPic($event.target.name, $event.target.files);" class="file-upload-field" value="">
                          </div>
                        </div>
                    </div>
                </div>
                <div v-if="menu==='change-password'">
                    <div class="sub-menu-title-bar">
                      <div class="icon uk-button" v-on:click="goToFirstMenuPage()">
                        <span uk-icon="icon: arrow-left;ratio:1" class="uk-icon" style="transition: all 0.25s linear 0s;"></span>
                      </div>
                      <div style="display: inline-flex;gap: 10px;align-items: center;">
                        <span>Change Password</span>
                      </div>
                    </div>
                    <div class="sub-menu-content custom-scroll-bar" id="changePasswordContainer" style="padding: 15px 10px;">
                        <form style="width: 100%;margin-top: 0px;padding-top: 0px;padding-right: 0px;padding-left: 0px;margin-left: 0px;box-sizing: border-box;"
                            class="uk-grid-small" uk-grid autocomplete="off" onsubmit="return false;">

                          <div class="uk-width-1-1 uk-first-column ">
                              <label class="uk-form-label">Current Password</label>
                              <div class="uk-form-controls">
                                <input v-model="passwordReset.current" class="uk-input" type="password" placeholder=""  tabindex="1">
                              </div>
                          </div>

                          <div class="uk-width-1-1 uk-first-column ">
                              <label class="uk-form-label">New Password</label>
                              <div class="uk-form-controls">
                                <input v-model="passwordReset.new" class="uk-input" type="password" placeholder=""  tabindex="1">
                              </div>
                          </div>
                          <div class="uk-width-1-1 uk-first-column ">
                              <label class="uk-form-label">Confirm New Password</label>
                              <div class="uk-form-controls">
                                <input v-model="passwordReset.newConfirmed" class="uk-input" type="password" placeholder=""  tabindex="1">
                              </div>
                          </div>

                          <div class="uk-width-1-1 uk-first-column ">
                              <button v-on:click="changePassword()" class="change-password-btn">Change Password</button>
                          </div>
                        </form>
                    </div>
                </div>
                <div v-if="menu==='default-theme'" style="justify-content: normal;">
                    <div class="sub-menu-title-bar">
                      <div class="icon uk-button" v-on:click="goToFirstMenuPage()">
                        <span uk-icon="icon: arrow-left;ratio:1" class="uk-icon" style="transition: all 0.25s linear 0s;"></span>
                      </div>
                      <div style="display: inline-flex;gap: 10px;align-items: center;">
                        <span>Choose Theme</span>
                      </div>
                    </div>
                    <div class="sub-menu-content custom-scroll-bar theme-selector" style="padding:10px 10px">
                        <div style="display: flex;flex-direction: column;width: 100%;">
                          <div v-on:click="selectTheme('outlook', $event)" style="display: inline-flex;column-gap: 20px;padding: 7px 10px;justify-content: space-between;flex-direction: row-reverse;align-items: center;">
                              <div  style="pointer-events:none" class="theme_checkbox" v-bind:class="{ selected: preferredTheme==='outlook' }" title="" aria-expanded="false">
                                <span uk-icon="check" style="color: white;" class="uk-icon"></span>
                              </div>
                              <div style="pointer-events:none">Plain Theme</div>
                          </div>
                          <div v-on:click="selectTheme('mild', $event)" style="display: inline-flex;column-gap: 20px;padding: 7px 10px;justify-content: space-between;flex-direction: row-reverse;align-items: center;">
                              <div  style="pointer-events:none" class="theme_checkbox" v-bind:class="{ selected: preferredTheme==='mild' }" title="" aria-expanded="false">
                                <span uk-icon="check" style="color: white;" class="uk-icon"></span>
                              </div>
                              <div style="pointer-events:none">Mild Theme</div>
                          </div>
                          <div v-on:click="selectTheme('glass', $event)" style="display: inline-flex;column-gap: 20px;padding: 7px 10px;justify-content: space-between;flex-direction: row-reverse;align-items: center;">
                              <div  style="pointer-events:none" class="theme_checkbox" v-bind:class="{ selected: preferredTheme==='glass' }" title="" aria-expanded="false">
                                <span uk-icon="check" style="color: white;" class="uk-icon"></span>
                              </div>
                              <div style="pointer-events:none">Glass Desk Theme</div>
                          </div>
                          <div v-on:click="selectTheme('abstract', $event)" style="display: inline-flex;column-gap: 20px;padding: 7px 10px;justify-content: space-between;flex-direction: row-reverse;align-items: center;">
                              <div  style="pointer-events:none" class="theme_checkbox" v-bind:class="{ selected: preferredTheme==='abstract' }" title="" aria-expanded="false">
                                <span uk-icon="check" style="color: white;" class="uk-icon"></span>
                              </div>
                              <div style="pointer-events:none">Abstract Theme</div>
                          </div>
                          <div v-on:click="selectTheme('flutter', $event)" style="display: inline-flex;column-gap: 20px;padding: 7px 10px;justify-content: space-between;flex-direction: row-reverse;align-items: center;">
                              <div  style="pointer-events:none" class="theme_checkbox" v-bind:class="{ selected: preferredTheme==='flutter' }" title="" aria-expanded="false">
                                <span uk-icon="check" style="color: white;" class="uk-icon"></span>
                              </div>
                              <div style="pointer-events:none">Flutter Theme</div>
                          </div>
                          <div v-on:click="selectTheme('dark', $event)" style="display: inline-flex;column-gap: 20px;padding: 7px 10px;justify-content: space-between;flex-direction: row-reverse;align-items: center;">
                              <div  style="pointer-events:none" class="theme_checkbox" v-bind:class="{ selected: preferredTheme==='dark' }" title="" aria-expanded="false">
                                <span uk-icon="check" style="color: white;" class="uk-icon"></span>
                              </div>
                              <div style="pointer-events:none">Dark Theme <span style="color:#b3b3b3">(Coming soon..)</span></div>
                          </div>
                        </div>
                    </div>
                </div>
                <div v-if="menu==='notification-settings'" style="justify-content: normal;">
                    <div class="sub-menu-title-bar">
                      <div class="icon uk-button" v-on:click="goToFirstMenuPage()">
                        <span uk-icon="icon: arrow-left;ratio:1" class="uk-icon" style="transition: all 0.25s linear 0s;"></span>
                      </div>
                      <div style="display: inline-flex;gap: 10px;align-items: center;">
                        <span>Notification Settings</span>
                      </div>
                    </div>
                    <div class="sub-menu-content custom-scroll-bar">
                        Coming soon..
                    </div>
                </div>
                <div v-if="menu==='task-settings'" style="justify-content: normal;">
                    <div class="sub-menu-title-bar">
                      <div class="icon uk-button" v-on:click="goToFirstMenuPage()">
                        <span uk-icon="icon: arrow-left;ratio:1" class="uk-icon" style="transition: all 0.25s linear 0s;"></span>
                      </div>
                      <div style="display: inline-flex;gap: 10px;align-items: center;">
                        <span>Task Settings</span>
                      </div>
                    </div>
                    <div class="sub-menu-content custom-scroll-bar theme-selector" style="padding:10px 10px">
                        <div style="display: flex;flex-direction: column;width: 100%;">
                          <div v-on:click="selectTaskViewMode('tab_view', $event)" style="display: inline-flex;column-gap: 20px;padding: 10px 10px;justify-content: space-between;flex-direction: row-reverse;align-items: center;">
                              <div  style="pointer-events:none" class="task_view_checkbox" v-bind:class="{ selected: preferredTaskView==='tab_view' }" title="" aria-expanded="false">
                                <span uk-icon="check" style="color: white;" class="uk-icon"></span>
                              </div>
                              <div style="pointer-events:none">Tab View</div>
                          </div>
                          <div v-on:click="selectTaskViewMode('scroll_view', $event)" style="display: inline-flex;column-gap: 20px;padding: 10px 10px;justify-content: space-between;flex-direction: row-reverse;align-items: center;">
                              <div  style="pointer-events:none" class="task_view_checkbox" v-bind:class="{ selected: preferredTaskView==='scroll_view' }"  title="" aria-expanded="false">
                                <span uk-icon="check" style="color: white;" class="uk-icon"></span>
                              </div>
                              <div style="pointer-events:none">Scroll View <span style="color:#b3b3b3">(Coming soon..)</span></div>
                          </div>
                          <div v-on:click="selectTaskViewMode('summary_view', $event)" style="display: inline-flex;column-gap: 20px;padding: 10px 10px;justify-content: space-between;flex-direction: row-reverse;align-items: center;">
                              <div  style="pointer-events:none" class="task_view_checkbox" v-bind:class="{ selected: preferredTaskView==='summary_view' }"  title="" aria-expanded="false">
                                <span uk-icon="check" style="color: white;" class="uk-icon"></span>
                              </div>
                              <div style="pointer-events:none">Summary View <span style="color:#b3b3b3">(Coming soon..)</span></div>
                          </div>
                        </div>
                    </div>
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
  import * as Comlink from 'comlink';

  export default {
  mixins: [uiListMixinLib, userMixinLib],
  props: ['loggedInUser'],
  data: function () {
    return {
      menu: "edit-profile",
      passwordReset: {},
      preferredTheme: null,
      preferredTaskView: null,
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

    logoutFromHere () {
      this.$emit('logoutFromHere');
    },
    /* Profile picture upload */
    uploadPic (fieldName, fileList) {
      const _this_component = this;
      // handle file changes
      const formData = new FormData();
      formData.append('name', this.loggedInUser.userId);

      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });

      // Display the key/value pairs
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      var url = '/profile/upload-my-dp';
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('ENCTYPE', 'multipart/form-data');
      // xhr.setRequestHeader("Content-Type","multipart/form-data;boundary=CUSTOM");
      xhr.send(formData);

      document.querySelector("#uploadingProfilePictureStatus").classList.remove("hide_display");

      // Setup our listener to process completed requests
      xhr.onload = function () {
        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
          // This will run when the request is successful
          console.log('success!', xhr);
          const savedImageName = xhr.responseText;
          console.log('savedImageName=' + savedImageName);
          _this_component.uploadedPicId = savedImageName;

          // $("#uploadedImage").attr("src",);
          document.querySelector('#uploadedImage', '/api/us/profile/get/' + savedImageName);

          Array.from(document.querySelectorAll(".ui-navbar-profile-image"))
               .forEach(profilePic => {

                 // Ignore images other than this user
                 if (profilePic.getAttribute("data-img-id") !== savedImageName) {
                   return false;
                 }

                  // Gracefully hide the picture
                  profilePic.style.opacity = 0;

                  // Remove the existing picture
                  setTimeout(() => {

                    profilePic.setAttribute("src", null);

                    setTimeout(() => {

                      // Replace it with new picture
                      profilePic.setAttribute("src", '/api/us/profile/get/' + savedImageName);
                      document.querySelector("#uploadingProfilePictureStatus").classList.add("hide_display");

                      // Gracefully reveal the picture
                      setTimeout(() => {
                        profilePic.style.opacity = 1;

                      }, 500);

                    }, 500);
                  }, 500);

               });

          self.postMessage('Processed data from Worker.');
        } else {
          // This will run when it's not
          console.log('The request failed!');
          document.querySelector("#uploadingProfilePictureStatus").classList.add("hide_display");
        }

        // This will run either way
        // All three of these are optional, depending on what you're trying to do
        // console.log('This always runs...');
      };
    },

    /* Retrieve settings from local-storage */
    getUserSettingsStoredInBrowser () {


      this.preferredTheme = localStorage.getItem("preferredTheme");
      this.preferredTaskView = localStorage.getItem("preferredTaskView");

      console.log("Browser store preferredTheme is ", this.preferredTheme);
      console.log("Browser store preferredTaskView is ", this.preferredTaskView);

      // By default set the plain theme if the user has no preferred theme.
      if (this.preferredTheme === null || this.preferredTheme === undefined) {

        this.preferredTheme = 'flutter'; // 'mild';

        const post_url = './users/update-settings';
        const data = {
          name: "preferredTheme",
          stringValue: this.preferredTheme
        };

        axios.post(process.env.VUE_APP_API_URL + post_url, data)
          .then((dataResponse) => {
              if (dataResponse.data.actionResult === 1) {

              }
          })
          .catch(function (errorResponse) {
            console.log('ERROR MS - ', errorResponse);
            const exceptionMsg = errorResponse.response.data.exception;
            return false;
          });

      }

      if (this.preferredTheme === 'outlook') {

        document.querySelector(".app-container").setAttribute("data-theme", "default");

        document.querySelector(".app_theme").classList.remove("activity_background");
        document.querySelector(".app_theme").classList.remove("activity_background_abstract");
        document.querySelector(".app_theme").classList.remove("activity_background_flutter");
        document.querySelector(".app_theme").classList.remove("activity_background_mild");

      }
      else if (this.preferredTheme === 'mild') {
        document.querySelector(".app-container").setAttribute("data-theme", "mild");

        document.querySelector(".app_theme").classList.remove("activity_background");
        document.querySelector(".app_theme").classList.remove("activity_background_abstract");
        document.querySelector(".app_theme").classList.remove("activity_background_flutter");
        document.querySelector(".app_theme").classList.add("activity_background_mild");
      }
      else if (this.preferredTheme === 'glass') {
        document.querySelector(".app-container").setAttribute("data-theme", "glass");

        document.querySelector(".app_theme").classList.remove("activity_background_abstract");
        document.querySelector(".app_theme").classList.remove("activity_background_mild");
        document.querySelector(".app_theme").classList.remove("activity_background_flutter");
        document.querySelector(".app_theme").classList.add("activity_background");
      }
      else if (this.preferredTheme === 'abstract') {

        document.querySelector(".app-container").setAttribute("data-theme", "abstract");

        document.querySelector(".app_theme").classList.remove("activity_background");
        document.querySelector(".app_theme").classList.remove("activity_background_mild");
        document.querySelector(".app_theme").classList.remove("activity_background_flutter");
        document.querySelector(".app_theme").classList.add("activity_background_abstract");
      }
      else if (this.preferredTheme === 'flutter') {

        document.querySelector(".app-container").setAttribute("data-theme", "flutter");

        document.querySelector(".app_theme").classList.remove("activity_background");
        document.querySelector(".app_theme").classList.remove("activity_background_mild");
        document.querySelector(".app_theme").classList.add("activity_background_flutter");
      }
    },
    // Store the user-settings in the localstorage and fetch only if its unavailable.
    refreshSettings () {

      // Attempting to use Comlink Worker
          const get_url = "./users/get-settings";
          const callbackFunction = (dataResponse) => {
            console.log("user-settings-retrieved : ", dataResponse);
            localStorage.setItem("preferredTheme", dataResponse.preferredTheme);
            localStorage.setItem("preferredTaskView", dataResponse.preferredTaskView);

            // Invoke this function to set the data for these preferred properties
            // to pull the data from the localstorage. This ensures that the preferred options are first saved
            // into the local storage, then displayed in the UI component, whenever there is a change.
            this.getUserSettingsStoredInBrowser();
          };
          const callbackError = (error) => {
            console.error('Error in fetching user settings.');
            console.error(error);
            // UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
            //   status: 'danger',
            //   pos: 'bottom-left',
            //   timeout: 5000
            // });
          };

          async function sendTaskToWorker () {
              // const remoteFunction = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));
              console.log("Fetching user-settings using comlink-worker");
              await ComlinkWorker.fetch(process.env.VUE_APP_API_URL + get_url,
                                         Comlink.proxy(callbackFunction),
                                         Comlink.proxy(callbackError));
          }

          sendTaskToWorker();
          return false;
      // Comlink worker ends here
    },
    openMenu (menuKey) {
      this.menu = menuKey;
      document.querySelector("#profile_settings_scroll_container").style.left = "-100%";

      setTimeout(() => {
        if (this.menu === 'change-password') {
          document.querySelector("#userProfilePanel").style.height = "380px";
          document.querySelector("#changePasswordContainer").style.height = "auto";
        }
        else {
          document.querySelector("#userProfilePanel").style.height = null;
          if (document.querySelector("#changePasswordContainer") !== null) {
            document.querySelector("#changePasswordContainer").style.height = null;
          }
        }
      }, 150);

    },
    goToFirstMenuPage () {
      document.querySelector("#profile_settings_scroll_container").style.left = "0%";
    },
    selectTheme (themeKey, event) {
      Array.from(document.querySelectorAll(".theme_checkbox")).forEach(item => item.classList.remove("selected"));
      event.target.querySelector(".theme_checkbox").classList.add("selected");

      if (themeKey === 'outlook') {
        document.querySelector(".app_theme").classList.remove("activity_background");
        document.querySelector(".app_theme").classList.remove("activity_background_abstract");
        document.querySelector(".app_theme").classList.remove("activity_background_mild");
      }
      else if (themeKey === 'mild') {
        document.querySelector(".app_theme").classList.remove("activity_background");
        document.querySelector(".app_theme").classList.remove("activity_background_abstract");
        document.querySelector(".app_theme").classList.add("activity_background_mild");
      }
      else if (themeKey === 'glass') {
        document.querySelector(".app_theme").classList.remove("activity_background_abstract");
        document.querySelector(".app_theme").classList.remove("activity_background_mild");
        document.querySelector(".app_theme").classList.add("activity_background");
      }
      else if (themeKey === 'abstract') {
        document.querySelector(".app_theme").classList.remove("activity_background");
        document.querySelector(".app_theme").classList.remove("activity_background_mild");
        document.querySelector(".app_theme").classList.add("activity_background_abstract");
      }
      else if (themeKey === 'dark') {
        // document.querySelector(".app_theme").classList.remove("activity_background");
        // document.querySelector(".app_theme").classList.add("activity_background_dark");

        const errorMsg = "  Dark mode will be available soon.";
        UIkit.notification(`<div class="taskone-notification">
                                              <span uk-icon="icon: info;ratio:1"></span>
                                              <div> ${errorMsg}. </div>
                                          </div>`, {
          status: 'danger',
          pos: 'bottom-left',
          timeout: 5000
        });
        return false;
      }

      const post_url = './users/update-settings';
      const data = {
        name: "preferredTheme",
        stringValue: themeKey
      };

      axios.post(process.env.VUE_APP_API_URL + post_url, data)
        .then((dataResponse) => {
            if (dataResponse.data.actionResult === 1) {
              UIkit.notification(`<div class="taskone-notification">
                                                    <span uk-icon="icon: check;ratio:1"></span>
                                                    <div> Preferred Theme updated. </div>
                                                </div>`, {
                status: 'success',
                pos: 'bottom-left',
                timeout: 1500
              });

              // Refresh the user-settings with new values.
              this.refreshSettings();
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
    selectTaskViewMode (taskViewKey, event) {

      if (taskViewKey === 'scroll_view' || taskViewKey === 'summary_view') {
        const modeName = taskViewKey === 'scroll_view' ? "Scroll view" : "Summary view";
        const errorMsg = modeName + " will be available soon.";
        UIkit.notification("<span uk-icon='icon: info;ratio:1'></span>" + errorMsg, {
          status: 'danger',
          pos: 'bottom-left',
          timeout: 5000
        });
        return false;
      }


      Array.from(document.querySelectorAll(".task_view_checkbox")).forEach(item => item.classList.remove("selected"));
      event.target.querySelector(".task_view_checkbox").classList.add("selected");

      const post_url = './users/update-settings';
      const data = {
        name: "preferredTaskView",
        stringValue: taskViewKey
      };

      axios.post(process.env.VUE_APP_API_URL + post_url, data)
        .then((dataResponse) => {
            if (dataResponse.data.actionResult === 1) {
              UIkit.notification(`<div class="taskone-notification">
                                                    <span uk-icon="icon: check;ratio:1"></span>
                                                    <div> Preferred Task-view updated. </div>
                                                </div>`, {
                status: 'success',
                pos: 'bottom-left',
                timeout: 5000
              });

              // Refresh the user-settings with new values.
              this.refreshSettings();
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
    changePassword () {

        const post_url = './users/update-password';
        const data = {
          oldPassword: this.passwordReset.current,
          newPassword: this.passwordReset.new,
          confirmNewPassword: this.passwordReset.newConfirmed
        };

        axios.post(process.env.VUE_APP_API_URL + post_url, data)
          .then((dataResponse) => {
              if (dataResponse.data.status === "SUCCESS") {
                UIkit.notification(`<div class="taskone-notification">
                                                      <span uk-icon="icon: check;ratio:1"></span>
                                                      <div> Password updated. Please re-login.</div>
                                                  </div>`, {
                  status: 'success',
                  pos: 'bottom-left',
                  timeout: 5000
                });

                // Refresh the user-settings with new values.
                this.refreshSettings();
              }
              else {
                UIkit.notification("<span uk-icon='icon: warning ;ratio:1'></span> " + dataResponse.data.message + '.', {
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
      this.notificationsList.unshift(data);
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

    // If localstorage theme doesn't exist, then pull it from the server.
    if (localStorage.getItem("preferredTheme") === null) {
      this.refreshSettings();
    }
    else {
      this.getUserSettingsStoredInBrowser();
    }
  },
  watch: {
  }
};

</script>

<style scoped>

  .profile-picture-uploading-overlay{
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fffffff2;
    z-index: 2;
    opacity: 1;
    transition:0.25s linear;
  }

  .scroll_container{
    left: 0%;
    position: absolute;
    display: flex;
    flex-direction: row;
    transition: all 0.25s linear 0s;
    width: 100%;
    box-sizing: border-box;
  }

  .user-profile-panel{
    padding:0px;
    box-sizing: border-box;
  }

  .main-menu{
    display: flex;
    width: 100%;
    box-sizing: border-box;
    font-size: 0.80rem;
    margin:10px 0px;
  }

  .main-menu > div{
    display: flex;
    justify-content: space-between;
    transition: 0.125s linear;
    padding: 15px 20px;
    border-bottom: 0px solid #f3f3f3;
    margin: 0px 5px;
    background:white;
    user-select:none;
  }

  .main-menu > div:hover, .theme-selector > div > div:hover{
    background-color: #f0f0f066;
    cursor:pointer;
    border-radius: 4px;
  }

  .main-menu > div:active, .theme-selectorX > div > div:active{
    background-color: #f0f0f0;
    transform: scale(0.98);
  }

  .sub-menu {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      font-size: 0.80rem;
      margin:0px 0px;
  }

  .sub-menu > div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: 0.125s linear;
    padding:0px;
    border-bottom: 0px solid #f3f3f3;
    margin: 0px 0px;
    background:white;
    width:100%;
  }

  .sub-menu-title-bar{
    display: flex;
    gap: 10px;
    transition: 0.125s linear;
    padding: 15px 0px;
    border-bottom: 0px solid #f3f3f3;
    margin: 0px 0px;
    background: #f9f8f7;
    font-size: 1rem;
    user-select:none;
  }

  .sub-menu-title-bar > .icon{
    margin-left: 20px;
    background-color:#8080800d;
    padding: 3px;
    border-radius: 20px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8c8c8c;
    transition: 0.15s linear;
    transform-origin: center center;
  }

  .sub-menu-title-bar > .icon:hover {
    margin-left: 20px;
    background-color: #8080803b;
  }

  .sub-menu-title-bar > .icon:active {
    transform: scale(0.98);
  }

  .sub-menu-content custom-scroll-bar{
    display: flex;
    flex-grow:1;
    padding: 15px 20px;
    margin: 0px 5px;
    height: 175px;
    overflow-y: hidden;
  }

  .sub-menu-content custom-scroll-bar:hover {
    overflow-y: auto;
  }

  .theme-selector .selected{
    opacity: 1 !important;
    border: 1px solid rgb(70 189 26);
    background: rgb(122, 209, 90) !important;
    height: 25px;
    width: 25px;
    display: flex;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
  }

  .theme-selector > div > div .theme_checkbox,
  .theme-selector > div > div .task_view_checkbox {
    opacity: 0.1;
    border: 1px solid rgb(70 189 26);
    background: rgb(122, 209, 90);
    height: 25px;
    width: 25px;
    display: flex;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    transition: 0.25s linear;
  }

  .theme-selector > div > div:hover .theme_checkbox,
  .theme-selector > div > div:hover .task_view_checkbox {
    opacity: 0.5;
  }


  .upload-profile-picture-btn{
    border: 0px solid #d0d0d0;
    border-radius: 4px;
    color: gray;
    transition: 0.1s linear;
    cursor: pointer;
    height: 30px;
    filter: opacity(0.85);
    box-sizing: border-box;
  }

  .change-password-btn{
    border: 1px solid #258bfe;
    background: #258bfe;
    border-radius: 4px;
    color: white;
    transition: 0.1s linear;
    cursor: pointer;
    width: 100%;
    padding: 10px 20px;
    margin-top: 10px;
  }

  .change-password-btn:active {
      cursor: pointer;
      transform: scale(0.95);
  }

  .upload-profile-picture-btn:hover{
    background-color: #f3f2f1;
    filter: opacity(1);
  }

  .upload-profile-picture-btn:active{
    transform:scale(0.98);
    background-color: #f3f2f1;
    filter: opacity(1);
  }

  .hide_display{
    display:none ;
    opacity: 0;
  }

  .fade_reveal{
    opacity:1;
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
        display: grid;column-gap: 30px;grid-template-columns: 1fr;
        margin: 0 10px 0 10px;
        background: white;
        border: 1px solid #cacaca;
        border-radius: 1px;
      }

      .notification_box:hover{
        background: #faffe8;
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
        padding: 10px 10px 0px 10px;
        min-height: 75px;
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
