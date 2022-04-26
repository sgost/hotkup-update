<style scoped>
  .uk-dropdown-nav {
      font-size: .975rem;
  }

  .uk-input, .uk-select:not([multiple]):not([size]) {
      height: 35px;
      vertical-align: middle;
      display: inline-block;
      border-radius: 3px;
  }

  .uk-grid-small > div{
    margin-bottom:0px;
  }

  .uk-form-label {
      font-size: .56rem;
      text-transform: uppercase;
      letter-spacing: 1px;
  }

</style>

<template>

    <div style="font-size: 0.7rem;background: rgb(251, 251, 251);display: flex;flex-direction: column;overflow-y: auto;" class="custom-scroll-bar">

      <div class="stage" style="display: flex;place-items: stretch;flex-direction: column;padding: 15px;overflow-y: hidden;color: rgb(51, 51, 51);">

          <div class="adk_grid_toolbar" style="grid-template-columns:auto 1fr;margin-right: 50px;margin-left: 50px;border-bottom: 1px solid #e0e0e0;">

              <div style="display: grid;place-self: center start;text-align: left;">
                  <div style="display:grid;place-self:center start;padding-left:0px;padding-right:20px;color:rgba(61, 61, 61, 0.78) !important;grid-template-columns:auto auto;font-size: 1rem;line-height: 35px;">
                     <span style="font-size: 1rem; font-weight: bold;letter-spacing:0.5px">
                      Notification Subscription Options
                     </span>
                  </div>
              </div>
              <div style="display: grid;grid-gap: 10px;grid-template-columns: auto auto;place-self: center end;text-align: right;">
              </div>
          </div>

          <div class="" style="padding-top: 30px;padding-left: 50px;padding-right: 50px;">

            <form autocomplete="off" class="uk-grid-small uk-grid" uk-grid onsubmit="return false;">

                <div class="uk-width-1 uk-first-column ">
                    <label class="uk-form-label" for="form-stacked-text">Notification Event</label>
                    <div class="uk-form-controls">
                        <div class="uk-inline uk-width-1-1">
                            <input readonly tabindex="1" id="name" type="text" class="uk-input"  placeholder=""  v-model="selectedNotificationType.name" style="font-family: Lato;font-weight: 300;" autofocus="true">
                        </div>
                    </div>
                </div>

                <div class="uk-margin uk-grid-margin uk-first-column">
                    <div v-show="!notificationSubscriptionObject.subscriptionStatus" class="uk-inline">
                        <a tabindex="6" id="subscriptionButton" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: #4CAF50; border-radius: 2px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="subscribeOrCancel(true)" >Subscribe</a>
                        &nbsp;&nbsp;&nbsp;
                        <!--<a tabindex="7" class="clickable-btn uk-button uk-button-danger uk-button-small uk-first-column end-call-button" style="background-color: rgba(253, 253, 253, 0.99); color: rgb(111, 111, 111); border: 1px solid rgb(183, 183, 183); border-radius: 3px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="goBack()" >Exit</a>-->
                    </div>
                    <div v-show="notificationSubscriptionObject.subscriptionStatus" class="uk-inline">
                        <a tabindex="6" id="subscriptionCancelButton" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: #ff617f; border-radius: 2px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="subscribeOrCancel(false)" >Unsubscribe</a>
                        &nbsp;&nbsp;&nbsp;
                        <!--<a tabindex="7" class="clickable-btn uk-button uk-button-danger uk-button-small uk-first-column end-call-button" style="background-color: rgba(253, 253, 253, 0.99); color: rgb(111, 111, 111); border: 1px solid rgb(183, 183, 183); border-radius: 3px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="goBack()" >Exit</a>-->
                    </div>
                </div>
              </form>

            </div>

            <div class="" style="padding-top: 30px;padding-left: 50px;padding-right: 50px;">

              <div class=""><hr></div>
              <div class=""><a v-on:click="openAdvancedSettings()">Advanced Settings</a></div>
              <div class="" v-show="showAdvancedSettings">
                  <br>
                  <div class="category-stage-row" style="align-items: center;border: 1px solid transparent;border-bottom: 0px;">
                    <form autocomplete="off" class="uk-grid-small uk-grid" uk-grid onsubmit="return false;">

                        <div class="uk-width-1@s uk-grid-margin uk-first-column ">
                            <label class="uk-form-label" for="form-stacked-text">Email(s) to be notified</label>
                            <div class="uk-form-controls">
                                <div class="uk-inline uk-width-1-1">
                                    <textarea tabindex="3" type="text" class="uk-textarea"  placeholder="Please use csv format."  v-model="notificationSubscriptionObject.emails"
                                     style="font-family: Lato;font-weight: 300;" autofocus="true" rows="3" >
                                    </textarea>
                                </div>
                            </div>
                        </div>

                        <div class="uk-width-1@s uk-grid-margin uk-first-column ">
                            <label class="uk-form-label" for="form-stacked-text">Phone Number(s) to be notified</label>
                            <div class="uk-form-controls">
                                <div class="uk-inline uk-width-1-1">
                                    <textarea tabindex="3" type="text" class="uk-textarea"  placeholder="Please use csv format."  v-model="notificationSubscriptionObject.phoneNumbers"
                                     style="font-family: Lato;font-weight: 300;" autofocus="true" rows="3" >
                                    </textarea>
                                </div>
                            </div>
                        </div>

                        <div class="uk-margin uk-grid-margin uk-first-column">
                            <div class="uk-inline">
                                <a tabindex="6" id="saveButton" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(2 119 254); border-radius: 2px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="saveSettings()" >Save Settings</a>
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
</template>

<script>

import userMixinLib from './../../mixins/lib/user_mixin_lib';
import utilsMixinLib from './../../mixins/lib/utils_lib';
import uiListMixinLib from './../../mixins/lib/ui-list.js';

export default {
  mixins: [
    userMixinLib,
    utilsMixinLib,
    uiListMixinLib
  ],
  props: ['selectedNotificationType'],
  data: function () {
    return {
      notificationTypeId: this.selectedNotificationType.id,
      appName: 'taskone',
      tenantName: this.$route.params.tenant_name,
      notificationTypeObject: {
        id: this.id,
        name: '',
        eventCode: null,
        status: null,
        titleTemplate: null,
        descriptionTemplate: null
      },
      notificationSubscriptionObject: {
        id: 'new',
        name: '',
        emails: '',
        phoneNumbers: '',
        subscriptionStatus: false
      },
      availableMembers: [],
      availableAdmins: [],
      ifSubscribed: false,
      showAdvancedSettings: false
    };
  },
  methods: {
    // CategoryStages related codes
    openAdvancedSettings () {
      this.showAdvancedSettings = !this.showAdvancedSettings;
    },
    goBack () {
      this.$router.push({
        name: 'notification-event-types-list',
        params: {
        }
      });
    },
    doValidation () {
      console.log('this.notificationTypeObject = ', this.notificationTypeObject);
      if (this.notificationTypeObject.name.trim() === '') {
        UIkit.notification(`<div class="taskone-notification">
                                              <span uk-icon="icon: warning;ratio:1"></span>
                                              <div> Please enter a valid Name. </div>
                                          </div>`, {
          status: 'danger',
          pos: 'bottom-left',
          timeout: 500000
        });

        return false;
      } else if (this.notificationTypeObject.eventCode.trim() === '') {
        UIkit.notification(`<div class="taskone-notification">
                                              <span uk-icon="icon: warning;ratio:1"></span>
                                              <div> Please enter a valid event code. </div>
                                          </div>`, {
          status: 'danger',
          pos: 'bottom-left',
          timeout: 500000
        });

        return false;
      } else if (this.notificationTypeObject.status === null) {
        UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span> Please select a valid Type.", {
          status: 'danger',
          pos: 'bottom-left',
          timeout: 5000
        });

        return false;
      } else if (this.notificationTypeObject.titleTemplate.trim() === '') {
        UIkit.notification(`<div class="taskone-notification">
                                              <span uk-icon="icon: warning;ratio:1"></span>
                                              <div> Please enter a valid title. </div>
                                          </div>`, {
          status: 'danger',
          pos: 'bottom-left',
          timeout: 500000
        });

        return false;
      } else if (this.notificationTypeObject.descriptionTemplate.trim() === '') {
        UIkit.notification(`<div class="taskone-notification">
                                              <span uk-icon="icon: warning;ratio:1"></span>
                                              <div> Please enter a valid description. </div>
                                          </div>`, {
          status: 'danger',
          pos: 'bottom-left',
          timeout: 500000
        });

        return false;
      }

      return true;
    },
    async subscribeOrCancel (hasSubscribed) {
      // If this is the first time subscription, then a record needs to be saved.
      if (this.notificationSubscriptionObject.id === 'new') {
        this.notificationSubscriptionObject.id = await this.saveSettings();
        console.log('Saved the new subscription and got its id as ', this.notificationSubscriptionObject.id);
      }

      const btnId = (hasSubscribed) ? 'subscriptionButton' : 'subscriptionCancelButton';
      const btnText = document.getElementById(btnId).innerHTML;
      document.getElementById(btnId).innerHTML = (hasSubscribed) ? 'Subscribing..' : 'Unsubscribing..';
      this.disableHTMLElement(document.getElementById(btnId));

      const post_url = './notification-subscriptions/' + ((hasSubscribed) ? 'subscribe' : 'unsubscribe');
      console.log('Posting data to : ' + post_url);

      const form = {
        id: this.notificationSubscriptionObject.id,
        eventTypeId: this.selectedNotificationType.id,
        status: hasSubscribed
      };

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {
          console.log('NotificationSubscription Registration Result : ');
          console.log(dataResponse);

          if (dataResponse.data.actionResult === 1) {
            this.notificationSubscriptionObject.subscriptionStatus = hasSubscribed;

            UIkit.notification(`<div class="taskone-notification">
                                                        <span uk-icon="icon: check;ratio:1"></span>
                                                        <div>${(this.notificationSubscriptionObject.subscriptionStatus) ? 'Subscription was successful' : 'Subscription was cancelled.'}</div>
                                                    </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 500000
            });

            document.getElementById(btnId).innerHTML = btnText;
            this.enableHTMLElement(document.getElementById(btnId));
            this.$emit('refreshList', {});
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
    saveSettings () {
      return new Promise((resolve, reject) => {
        const btnText = document.getElementById('saveButton').innerHTML;
        document.getElementById('saveButton').innerHTML = 'Saving..';
        this.disableHTMLElement(document.getElementById('saveButton'));

        const post_url = './notification-subscriptions/save';
        console.log('Posting data to : ', post_url, this.notificationSubscriptionObject);

        const form = {
          id: this.notificationSubscriptionObject.id,
          eventTypeId: this.selectedNotificationType.id,
          emailIds: this.notificationSubscriptionObject.emails,
          mobileNumbers: this.notificationSubscriptionObject.phoneNumbers
        };

        // VueJS ajax call-1
        axios.post(process.env.VUE_APP_API_URL + post_url, form)
          .then((dataResponse) => {
            console.log('NotificationSubscription Registration Result : ');
            console.log(dataResponse);

            if (dataResponse.data.actionResult === 1) {
              const notificationSubscriptionObject = dataResponse.data.bean;
              notificationSubscriptionObject.subscriptionStatus = notificationSubscriptionObject.subscribed;
              notificationSubscriptionObject.emails = notificationSubscriptionObject.emailIds;
              notificationSubscriptionObject.phoneNumbers = notificationSubscriptionObject.mobileNumbers;

              this.notificationSubscriptionObject = notificationSubscriptionObject;

              UIkit.notification(`<div class="taskone-notification">
                                                          <span uk-icon="icon: check;ratio:1"></span>
                                                          <div> Settings was saved successfully. </div>
                                                      </div>`, {
                status: 'success',
                pos: 'bottom-left',
                timeout: 500000
              });

              document.getElementById('saveButton').innerHTML = btnText;
              this.enableHTMLElement(document.getElementById('saveButton'));
              // this.$emit("refreshList",{});
              console.log('saveSettings promise resolved.');
              resolve(this.notificationSubscriptionObject.id);
            } else {
              const errorMsg = (dataResponse.data).message;
              UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + errorMsg, {
                status: 'danger',
                pos: 'top-right',
                timeout: 5000
              });

              document.getElementById('saveButton').innerHTML = btnText;
              this.enableHTMLElement(document.getElementById('saveButton'));
              console.log('saveSettings promise rejected.');
              reject();
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

            document.getElementById('saveButton').innerHTML = btnText;
            this.enableHTMLElement(document.getElementById('saveButton'));
            reject();
          });
      });
    },

    // Handle the events emitted when selectbox component values are modified.
    updateMembersEmitEvent (data) {
      const memberIds = Array.from(data).map(item => item.id);
      this.notificationTypeObject.memberIds = memberIds;
    },
    updateAdminsEmitEvent (data) {
      const adminIds = Array.from(data).map(item => item.id);
      this.notificationTypeObject.adminIds = adminIds;
    },
    getRecord () {
      const get_url = './notification-subscriptions/get/' + this.selectedNotificationType.id;

      axios.get(process.env.VUE_APP_API_URL + get_url)
        .then((dataResponse) => {
          console.log('Notification Subscription', dataResponse);
          if (dataResponse.data.actionResult == 1) {
            const notificationSubscriptionObject = dataResponse.data.bean;
            notificationSubscriptionObject.subscriptionStatus = notificationSubscriptionObject.subscribed;
            notificationSubscriptionObject.emails = notificationSubscriptionObject.emailIds;
            notificationSubscriptionObject.phoneNumbers = notificationSubscriptionObject.mobileNumbers;
            this.notificationSubscriptionObject = notificationSubscriptionObject;
          } else if (dataResponse.data.actionResult == -1) {
            const notificationSubscriptionObject = {
              id: 'new',
              emails: '',
              phoneNumbers: '',
              subscriptionStatus: false
            };
            this.notificationSubscriptionObject = notificationSubscriptionObject;
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
    }

  },
  mounted: function () {

  },
  created: function () {
    console.log('Edit notificationType form');
  },
  watch: {

    // Since we are passing an asynced data as 'availableItems', it is necessary to watch this prop when it receives new data.
    'selectedNotificationType.id': function (newId, oldId) {
      console.log('id changed from ' + oldId + ' to ' + newId);
      this.getRecord();
    }
  }
};

</script>
