<style scoped>

  .conf_card{
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

  .conf_card:hover{
    background-color:whitesmoke;
  }

  .card_button {
      font-size: 0.60rem;
      line-height: 26px !important;
      height: 30px;
      cursor: pointer;
      background-color: #03A9F4;
      padding: 0px 0px !important;
      border: 0.05em solid #03A9F4;
      font-weight: normal !important;
      color: #fdfdfd !important;
      /*transition: all 0.2s linear;*/
      border-radius: 1px;
  }

  .card_button_disabled{
    background-color: #c3c8ca !important;
    border: 0.05em solid #c3c8ca !important;
    pointer-events:none !important;
  }

  .adk_conf_notification{
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

  .shortcut{
    padding: 10px;
    -webkit-user-drag: none;user-drag:none;user-select:none;
  }

  /* Show that pressed effect */
  .shortcut:active{
    cursor:pointer;
  }

  .shortcut *{
    -webkit-user-drag: none;user-drag:none;user-select:none;
  }

  .shortcut:hover{
    background-color: whitesmoke;
    padding: 10px;
    border-radius: 5px;
    cursor:pointer;
    transform: rotate(360);
  }

  .desktop_container_component{

    background: white;
    overflow-x: hidden;
    padding: 0px;
    box-sizing: border-box;
    grid-gap: 0px;
    z-index: 2;
  }

  .uk-form-label{
      font-size: .56rem;
      text-transform: uppercase;
      letter-spacing: 1px;
  }

</style>

<template>

  <div style="font-size: 0.7rem;background: rgb(249 250 255);background: #fff;display:grid;grid-template-columns:1fr;width:100%;place-items:start center;overflow-y:hidden">
    <div class="stage" style="display: grid;place-items: stretch;height:100%;grid-template-rows: 40px 1fr;padding: 15px;overflow-y: hidden;color: rgb(51, 51, 51);">

        <div class="adk_grid_toolbar" style="grid-template-columns:auto 1fr;margin-right: 50px;margin-left: 50px;border-bottom: 1px solid #e0e0e0;">

            <div style="display: grid;place-self: center start;text-align: left;">
                <div style="display:grid;place-self:center start;padding-left:0px;padding-right:20px;color:rgba(61, 61, 61, 0.78) !important;grid-template-columns:auto auto;font-size: 1rem;line-height: 35px;">
                   <span style="font-size: 1rem;font-weight: bold;letter-spacing: 0.5px;display: flex;gap: 10px;flex-direction: row-reverse;align-items: center;">
                    New Scheduled Task <ui-icon name="scheduled_tasks" style="height: 35px;color: rgb(0 0 0 / 78%) !important;"/>
                   </span>
                </div>
            </div>
            <div style="display: grid;grid-gap: 10px;grid-template-columns: auto auto;place-self: center end;text-align: right;">
            </div>
        </div>

        <div  class="custom-scroll-bar" style="padding-top:0px;padding-bottom:50px;padding-left: 50px;padding-right: 50px;">

                <form  class="uk-grid-small uk-grid ui-form" uk-grid="" style="width: 60%;place-self: center;" onsubmit="console.log('Submitted.');return false;">

                    <div class="uk-width-2-3@s uk-grid-margin uk-first-column ">
                        <label class="uk-form-label" for="form-stacked-text">Subject</label>
                        <input tabindex="1" v-model="taskObject.name" type="text" class="uk-input" placeholder="" style="width:100%;border-radius:3px"/>
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin ">
                        <label class="uk-form-label"  uk-tooltip="Select the Date and Time on when this task will be created." style="display: flex;gap: 5px;">
                          <ui-icon name="scheduled_tasks" style="width: 12px;height: 10px;"/> Schedule Date/Time
                        </label>
                        <div class="uk-form-controls">
                          <input v-model="taskObject.scheduledDateTime" class="uk-input" type="datetime-local" placeholder="" tabindex="8">
                        </div>
                    </div>

                    <div class="uk-width-1-1 uk-grid-margin uk-first-column ">
                        <label class="uk-form-label" for="form-stacked-text">Description</label>
                        <textarea tabindex="3" v-model="taskObject.description" class="uk-textarea" rows="7" placeholder="" style="width:100%;border-radius:3px"></textarea>
                    </div>

                    <div class="uk-width-1-3@s uk-grid-margin uk-first-column ">
                        <div style="height: 70px;">
                             <label class="uk-form-label" style="display: flex;gap: 5px;">Category</label>
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
                    <div class="uk-width-1-3@s uk-grid-margin ">
                        <label class="uk-form-label" for="form-stacked-text">Priority</label>
                        <select tabindex="7" v-model="taskObject.priority" class="uk-select" id="form-stacked-select">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Critical</option>
                        </select>
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin ">
                        <label class="uk-form-label" for="form-stacked-text">Status</label>
                        <select  v-model="taskObject.status" class="uk-select" tabindex="2">
                            <option>In progress</option>
                            <option>Completed</option>
                        </select>
                    </div>

                    <div class="uk-width-1-3@s uk-grid-margin uk-first-column ">
                        <div style="height: 70px;">
                             <label class="uk-form-label" style="display: flex;gap: 5px;"><ui-icon name="intermediaries" style="width: 12px;height: 10px;"/>Assignee</label>
                             <div class="uk-form-controls">
                                 <ui-selectbox v-bind:availableItems="availableAssignees"
                                                      name="NewTaskMembers"
                                                      tagProperty="firstName"
                                                      displayLabelProps="firstName,lastName" maxTagsToDisplay="3"
                                                      searchProperty="firstName,lastName"
                                                      data_tabindex="4"
                                                      v-on:selectBoxUpdate="updateAssigneesEmitEvent($event)"/>
                             </div>
                        </div>
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin">
                        <div style="height: 70px;">
                             <label class="uk-form-label" style="display: flex;gap: 5px;"><ui-icon name="intermediaries" style="width: 12px;height: 10px;"/>Followers</label>
                             <div class="uk-form-controls">
                                 <ui-selectbox v-bind:availableItems="availableFollowers"
                                                      name="NewTaskFollowers"
                                                      tagProperty="firstName"
                                                      displayLabelProps="firstName,lastName"  maxTagsToDisplay="4"
                                                      searchProperty="firstName,lastName"
                                                      data_tabindex="3"
                                                      v-on:selectBoxUpdate="updateFollowersEmitEvent($event)"/>
                             </div>
                        </div>
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin ">

                    </div>

                    <div class="uk-width-1-1 uk-grid-margin uk-first-column "><hr></div>
                    <div class="uk-width-1-1 uk-grid-margin uk-first-column " style="margin-bottom: 15px;" v-show="!showExtraOptions"><a v-on:click="showMoreOptions()">Show Advanced Options</a></div>
                    <div class="uk-width-1-1 uk-grid-margin uk-first-column " style="margin-bottom: 15px;" v-show="showExtraOptions"><a v-on:click="hideMoreOptions()">Hide Advanced Options</a></div>

                    <div class="uk-width-1-3@s uk-grid-margin uk-first-column " v-show="showExtraOptions">
                        <label class="uk-form-label" >Due Date</label>
                        <div class="uk-form-controls">
                          <input  v-model="taskObject.dueDateTime" class="uk-input" type="datetime-local" placeholder="" tabindex="8">
                        </div>
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin" v-show="showExtraOptions">
                        <label class="uk-form-label" >Estd. Duration</label>
                        <div class="uk-form-controls" style="display:flex">
                          <input  v-model="taskObject.estDuration" onkeypress="return event.charCode >= 48" min="1"  class="uk-input" dir="rtl" type="number" style="border-right: 0px;text-align:right" tabindex="9">
                          <select v-model="taskObject.estDurationUnit"  class="uk-select" id="form-horizontal-select" style="border-left: 0px;" tabindex="10">
                              <option>Hours</option>
                              <option>Days</option>
                              <option>Weeks</option>
                          </select>
                        </div>
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin" v-show="showExtraOptions">

                    </div>

                    <div class="uk-width-1-3@s uk-grid-margin uk-first-column " v-show="showExtraOptions">
                        <div style="height: 70px;">
                            <label class="uk-form-label" >Labels</label>
                            <div class="uk-form-controls">
                                <ui-selectbox v-bind:availableItems="availableLabels"
                                                     name="Labels"
                                                     tagProperty="name"
                                                     displayLabelProps="name"  maxTagsToDisplay="3"
                                                     searchProperty="name"
                                                     data_tabindex="8"/>
                            </div>
                        </div>
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin " v-show="showExtraOptions">

                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin" v-show="showExtraOptions">

                    </div>

                    <div class="uk-width-1-1"
                         style="border-top: 0px solid rgb(241, 241, 241);padding: 0px 0px;margin: 0px 0px 0px 15px;display: flex;flex-direction: column;">
                        <div style="display:grid">
                        </div>

                        <div style="display: grid;padding:0px;" v-show="showExtraOptions">
                            <div style="    background: white;width:100%;place-self:center;margin-top:20px;border: 1px dashed rgb(189 189 189);height: 70px;display: grid;place-items: center;margin-bottom: 20px;">
                              <div style="display:grid;grid-template-columns:auto auto;place-items:center center;column-gap: 10px;">
                                  <div class="mini-btn">Add Checklist</div>
                                  <div class="mini-btn">Add Form</div>
                              </div>
                            </div>
                        </div>

                        <div style="display: flex;place-self:end;column-gap:20px;padding-right: 15px;">
                            <button tabindex="11" id="saveButton" v-on:click="save()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: #4caf50;border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: auto;">
                            <div style="display: grid;grid-template-columns: auto auto;place-items: center;">
                              <div>
                                <span class="lnr lnr-location"></span>
                              </div>
                              <div>&nbsp;&nbsp;&nbsp;Save Task</div>
                            </div>
                            </button>
                            <button tabindex="11" id="discardButton" v-on:click="discard()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" data-v-2d9397b1="" style="background-color: rgb(234 234 234);border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: auto;margin-top: 0px;color: #565656;"><div><div >Discard</div></div></button>
                        </div>
                    </div>
                </form>

          </div>
      </div>
  </div>
</template>

<script>

import { bus } from './../../../main.js';
import userMixinLib from './../../mixins/lib/user_mixin_lib';
import utilsMixinLib from './../../mixins/lib/utils_lib';
import uiListMixinLib from './../../mixins/lib/ui-list.js';

export default {

  props: ['resetTime'],
  watch: {
    resetTime: function (oldVal, newVal) {
      console.log('resetTime changed = ' + newVal.time);
      this.taskObject = {
        id: 'new',
        name: '',
        description: '',
        assigneeIds: [],
        followerIds: [],
        categoryId: []
      };

      this.availableAssignees = [];
      this.availableFollowers = [];
      this.availableCategories = [];

      // console.log("resetTime this.availableAssignees : ", this.availableAssignees);
      this.loadPotentialUsers();
      this.loadPotentialCategories();
    }
  },
  mixins: [
    userMixinLib,
    utilsMixinLib,
    uiListMixinLib
  ],
  data: function () {
    return {
      showSectionLabels: true,
      isMobileDevice: true,
      resizeTimeout: null,
      appName: this.$route.params.app_name,
      searchQuery: '',
      wsSearchQuery: '',
      ongoingConf: {},
      conference_list: [],
      my_conference_list: [],
      starred_conferences_list: [],
      conf_service_error: '',
      workStatus: '',
      workStatusList: [],
      ws_list_error: '',

      my_whiteboard_docs_list: [],
      wbdocSearchQuery: '',
      isCallActive: false, // If the user is on an active call, it must not show "Join" options
      availableAssignees: [],
      availableFollowers: [],
      availableCategories: [],
      taskObject: {
        id: 'new',
        name: '',
        description: ''

      },
      showExtraOptions: false
    };
  },
  methods: {
    showMoreOptions () {
      this.showExtraOptions = true;
    },
    hideMoreOptions () {
      this.showExtraOptions = false;
    },
    someFunction (elem) {

    },
    discard () {
      bus.emit('discardNewTaskForm', {});
    },
    goToHomePage () {
      this.$router.push({
        name: 'home',
        params: {}
      });
    },
    // This data will be used to filter both members and admins by merging with the result from 'get-associated-people/{category-id}'
    loadPotentialUsers () {
      const url = './categories/get-potential-users'; // Fetch all potential members (users)
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
      // console.log("Potential Users : ", dataResponse);

      const mapFunction = (user) => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          isSelected: false
        };
      };

      const mappedArrayOfUser = dataResponse.data.bean.map(mapFunction);

      this.availableAssignees = mappedArrayOfUser; // When a category is edited, these vals must be merged with existing category members to determine 'isSelected' flag
      this.availableFollowers = mappedArrayOfUser;

      console.log('hpu this.availableAssignees : ', this.availableAssignees);
      // console.log("this.availableFollowers : " , this.availableFollowers);
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
    },

    doValidation () {
      console.log('this.taskObject = ', this.taskObject);
      if (this.taskObject.name.trim() === '') {
        UIkit.notification(`<div class="taskone-notification">
                                          <span uk-icon="icon: warning;ratio:1"></span>
                                          <div> Please enter a valid subject. </div>
                                      </div>`, {
          status: 'danger',
          pos: 'bottom-left',
          timeout: 5000
        });

        return false;
      } else if (this.taskObject.assigneeIds.length === 0) {
        UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span> Please add atleast one assignee.", {
          status: 'danger',
          pos: 'bottom-left',
          timeout: 5000
        });

        return false;
      }

      if (this.taskObject.startDateTime !== undefined && this.taskObject.startDateTime !== null && this.taskObject.startDateTime !== '') {
        if (new Date(this.taskObject.startDateTime).toLocaleString() === 'Invalid Date') {
          UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span> Please choose a valid start date.", {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 5000
          });

          return false;
        }
      }

      if (this.taskObject.dueDateTime !== undefined && this.taskObject.dueDateTime !== null && this.taskObject.dueDateTime !== '') {
        if (new Date(this.taskObject.dueDateTime).toLocaleString() === 'Invalid Date') {
          UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span> Please choose a valid due date.", {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 5000
          });

          return false;
        }
      }

      return true;
    },
    save () {
      if (!this.doValidation()) { return false; } // stop here if form is invalid.

      const btnText = document.getElementById('saveButton').innerHTML;
      document.getElementById('saveButton').innerHTML = 'Saving..';
      this.disableHTMLElement(document.getElementById('saveButton'));

      const post_url = './tasks/save';
      console.log('Posting data to : ' + post_url);

      const form = {
        id: this.taskObject.id,
        name: this.taskObject.name,
        type: this.taskObject.type,
        priority: this.taskObject.priority,
        status: this.taskObject.status,
        description: this.taskObject.description,
        estimatedDuration: this.taskObject.estDuration,
        estimatedDurationUnit: this.taskObject.estDurationUnit,
        assigneeIds: this.taskObject.assigneeIds,
        followerIds: this.taskObject.followerIds,
        categoryId: this.taskObject.categoryId,
        labelIds: this.taskObject.labelIds,
        ownerId: this.taskObject.ownerId
      };

      if (this.taskObject.startDateTime !== undefined && this.taskObject.startDateTime !== null && this.taskObject.startDateTime !== '') {
        form.startDateTime = new Date(this.taskObject.startDateTime).toLocaleString();
      }

      if (this.taskObject.dueDateTime !== undefined && this.taskObject.dueDateTime !== null && this.taskObject.dueDateTime !== '') {
        form.dueDateTime = new Date(this.taskObject.dueDateTime).toLocaleString();
      }

      console.log('Task Form Data : ', form);

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {
          console.log('Task Save Result : ');
          console.log(dataResponse);

          if (dataResponse.data.actionResult === 1) {
            this.newWorkgroupInfo = dataResponse.data.bean;

            UIkit.notification(`<div class="taskone-notification">
                                                    <span uk-icon="icon: check;ratio:1"></span>
                                                    <div> New Task added successfully. </div>
                                                </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 5000
            });

            document.getElementById('saveButton').innerHTML = btnText;
            this.enableHTMLElement(document.getElementById('saveButton'));

            this.$emit('refreshList', {});
          } else {
            const errorMsg = (dataResponse.data).message;
            UIkit.notification("<span uk-icon='icon: warning;ratio:1'></span>" + errorMsg, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });

            document.getElementById('saveButton').innerHTML = btnText;
            this.enableHTMLElement(document.getElementById('saveButton'));
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

          document.getElementById('saveButton').innerHTML = btnText;
          this.enableHTMLElement(document.getElementById('saveButton'));
          return false;
        });
    },

    // Handle the events emitted when selectbox component values are modified.
    updateAssigneesEmitEvent (data) {
      const assigneeIds = Array.from(data).map(item => item.id);
      this.taskObject.assigneeIds = assigneeIds;
    },
    updateFollowersEmitEvent (data) {
      const followerIds = Array.from(data).map(item => item.id);
      this.taskObject.followerIds = followerIds;
    },
    updateCategoryEmitEvent (data) {
      console.log(data);
      if (data != null) { this.taskObject.categoryId = data.id; } else { this.taskObject.categoryId = null; }
    },
    updateCategoriesEmitEvent (data) {
      const categoryIds = Array.from(data).map(item => item.id);
      this.taskObject.categoryIds = categoryIds;
    }

  },
  created: function () {

  },
  computed: {
    storeCounter: function () {
      console.log('Accessing vuex store ', this.$store);
      console.log('Store data accessed from home page : ' + this.$store.getters.count);
    },
    isConferenceCallActive: function () {
      return this.$store.getters.isConferenceCallActive;
    }
  },
  mounted: function () {
    // this.$store.commit('increment');
    // this.storeCounter();
    // console.log("Accessing vuex store ", this.$store);
    // console.log("Store data accessed from home page : " + this.$store.getters.count);
    // console.log("Accessing computed property : " + this.isConferenceCallActive);
    // console.log("Done.");

    this.loadPotentialUsers();
    this.loadPotentialCategories();
  }
};

</script>
