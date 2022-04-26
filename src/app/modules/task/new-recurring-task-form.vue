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

  .uk-form-label {
    font-size: .66rem;
    text-transform: capitalize;
    letter-spacing: 1px;
    color: black;
  }


</style>

<template>

  <div style="font-size: 0.7rem;background: rgb(249 250 255);background: #fff;display:grid;grid-template-columns:1fr;width:100%;place-items:start center;overflow-y:hidden" class="custom-scroll-bar">
    <div class="stage custom-scroll-bar" style="display: grid;place-items: stretch;height: 100%;grid-template-rows: 1fr;color: rgb(51, 51, 51);overflow-y: auto;display: flex;box-sizing: border-box;">
        <div class="" style="padding-top: 0px;padding-left: 50px;padding-right: 50px;padding-bottom: 50px;box-sizing: border-box;display: flex;justify-content: center;">
                <form  class="uk-grid-small uk-grid ui-form" uk-grid="" style="width: 85%;place-self: start center;" onsubmit="console.log('Submitted.');return false;">




                    <div class="uk-width-2-3@s " style="margin-top: 10px;">
                        <div style="height: 70px;">
                             <label class="uk-form-label">Assign To *</label>
                             <div class="uk-form-controls">
                                 <ui-selectbox-2 v-bind:availableItems="availableAssignees"
                                               v-bind:name=" uniqueComponentId + '_NewTaskMembers'"
                                                      tagProperty="firstName"
                                                      displayLabelProps="firstName,lastName" maxTagsToDisplay="2"
                                                      searchProperty="firstName,lastName"
                                                      data_tabindex="1"
                                                      v-on:selectBoxUpdate="updateAssigneesEmitEvent($event)"/>
                             </div>
                        </div>
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin uk-first-column "  style="margin-top: 10px;">

                      <div style="height: 70px;">
                           <label class="uk-form-label">Category</label>
                           <div class="uk-form-controls">
                               <ui-selectbox-single v-bind:availableItems="availableCategories"
                                             v-bind:name=" uniqueComponentId + '_NewTaskCategories'"
                                                    tagProperty="name"
                                                    disableAcronym="false"
                                                    displayLabelProps="name"
                                                    maxTagsToDisplay="3"
                                                    searchProperty="name"
                                                    data_tabindex="5"
                                                    v-on:selectBoxUpdate="updateCategoryEmitEvent($event)"
                                                    allowSingleSelectOnly="true"/>
                           </div>
                      </div>
                    </div>



                    <div class="uk-width-1-1 uk-grid-margin uk-first-column " style="margin-top: 0px;">
                        <label class="uk-form-label" for="form-stacked-text">Subject *</label>
                        <input tabindex="3" v-model="taskObject.name" type="text" class="uk-input" placeholder="" style="width:100%;border-radius:3px"/>
                    </div>


                    <div class="uk-width-1-1 uk-grid-margin uk-first-column " style="margin-top: 0px;">
                        <label class="uk-form-label" for="form-stacked-text">Description *</label>
                        <textarea tabindex="4" v-model="taskObject.description" class="uk-textarea" rows="6" placeholder="" style="width:100%;border-radius:3px"></textarea>
                    </div>




                    <div class="uk-width-1-4@s uk-grid-margin uk-first-column">
                        <label class="uk-form-label"  uk-tooltip="Select the date on which the first task will be created." style="display: flex;gap: 5px;">
                          <ui-icon name="scheduled_tasks" style="width: 12px;height: 10px;"/> Create First Task on *
                        </label>
                        <div class="uk-form-controls">
                          <input v-model="taskObject.scheduledStartDate" class="uk-input" type="datetime-local" placeholder="" tabindex="8">
                        </div>
                    </div>
                    <div class="uk-width-1-4@s uk-grid-margin">
                        <label class="uk-form-label"  uk-tooltip="Select the date on which the first task will be created." style="display: flex;gap: 5px;">
                          <ui-icon name="scheduled_tasks" style="width: 12px;height: 10px;"/> End Task Creation on
                        </label>
                        <div class="uk-form-controls">
                          <input v-model="taskObject.scheduledEndDate" class="uk-input" type="date" placeholder="" tabindex="8">
                        </div>
                    </div>
                    <div class="uk-width-1-4@s uk-grid-margin ">
                        <label class="uk-form-label"  uk-tooltip="Select the recurring interval." style="display: flex;gap: 5px;">
                            <ui-icon name="recurring_tasks" style="width: 12px;height: 10px;"/> Repeat Frequency
                        </label>
                        <div class="uk-form-controls">
                          <select tabindex="7" v-model="repeatPeriod" class="uk-select" id="form-stacked-select">
                              <optgroup label="Minute basis (For Dev Testing only)">
                                <option value="0 0/1 * * * ? *">Every 1 Minute</option>
                                <option value="0 0/2 * * * ? *">Every 2 Minute</option>
                                <option value="0 0/5 * * * ? *">Every 5 Minute</option>
                                <option value="0 0/10 * * * ? *">Every 10 Minute</option>
                              </optgroup>
                              <optgroup label="Daily basis">
                                <option value="? * * *">Every Day</option>
                                <option value="? * MON-FRI *">Every Weekday</option>
                              </optgroup>
                              <optgroup label="Weekly basis">
                                <option value="? * MON *">Every Monday</option>
                              </optgroup>
                              <optgroup label="Monthly basis">
                                <option value="1 * ? *">First date of every month</option>
                                <option value="L * ? *">Last date of every month</option>
                                <!-- <option value="0 0 0 ? * MON#1 *">First Monday of every month</option> -->
                                <option value="1W * ? *">First Weekday of every month</option>
                                <option value="LW * ? *">Last Weekday of every month</option>
                              </optgroup>
                              <!-- <optgroup label="Yearly basis">
                                <option value="every_month">Month</option>
                                <option value="every_year">Year</option>
                              </optgroup> -->
                              <option value="custom_repeat_period" uk-tooltip="Show configuration modal">Custom</option>
                          </select>
                        </div>
                    </div>
                    <div class="uk-width-1-4@s uk-grid-margin ">
                        <label v-if="generatedCronExpression !== null" class="uk-form-label">Generated Cron Expression</label>
                        <div  v-if="generatedCronExpression !== null" class="uk-form-controls">
                            <input v-model="generatedCronExpression" class="uk-input" type="text" readonly disabled placeholder="" tabindex="8">
                        </div>
                    </div>


                    <div class="uk-width-1-1 uk-grid-margin " style="padding-top: 0px;padding-bottom: 0px;">
                      <!-- <hr> -->
                    </div>

                    <div class="uk-width-1-1 uk-grid-margin uk-first-column " style="margin-top: 15px;">
                        <label v-show="!showMoreOptions" class="uk-form-label" for="form-stacked-text" style="text-transform: capitalize;font-size: 0.65rem;"><a v-on:click="showMoreOptions = !showMoreOptions" >Show more options</a></label>
                        <label v-show="showMoreOptions" class="uk-form-label" for="form-stacked-text" style="text-transform: capitalize;font-size: 0.65rem;"><a v-on:click="showMoreOptions = !showMoreOptions" >Hide more options</a></label>
                    </div>

                    <div v-show="showSectionLabels && showMoreOptions" class="uk-width-1-1 uk-grid-margin uk-first-column " style="margin-top: 0px;border-bottom: 1px solid rgb(236, 236, 236);padding: 10px;line-height: 15px;margin: 15px 0px 5px;position: relative;display: grid;place-items: start start;">
                      <span style="position: absolute;top: 12px;left: 10px;color: rgb(199, 195, 195);background: rgb(249, 250, 255);padding-left: 5px;padding-right: 5px;font-size: 0.55rem;text-transform: uppercase;">Optional</span>
                    </div>

                    <div v-show="showMoreOptions" class="uk-width-1-3@s uk-grid-margin uk-first-column " style="margin-top: 10px;">
                        <div style="height: 70px;">
                             <label class="uk-form-label">Followers</label>
                             <div class="uk-form-controls">
                                 <ui-selectbox-2 v-bind:availableItems="availableFollowers"
                                               v-bind:name=" uniqueComponentId + '_NewTaskFollowers'"
                                                      tagProperty="firstName"
                                                      displayLabelProps="firstName,lastName"  maxTagsToDisplay="4"
                                                      searchProperty="firstName,lastName"
                                                      data_tabindex="2"
                                                      v-on:selectBoxUpdate="updateFollowersEmitEvent($event)"/>
                             </div>
                        </div>
                    </div>
                    <div v-show="showMoreOptions"  class="uk-width-1-3@s" style="margin-top: 10px;">
                        <label class="uk-form-label" for="form-stacked-text">Stage</label>
                        <select v-model="taskObject.statusId" class="uk-select" tabindex="6">
                            <template v-for="defaultStatus, idx in defaultStatuses">
                                <option v-bind:value="defaultStatus.id" >{{defaultStatus.name}}</option>
                            </template>
                        </select>
                    </div>
                    <div v-show="showMoreOptions"  class="uk-width-1-3@s" style="margin-top: 10px;">
                        <label class="uk-form-label" for="form-stacked-text">Priority</label>
                        <select tabindex="7" v-model="taskObject.priority" class="uk-select" id="form-stacked-select">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Critical</option>
                        </select>
                    </div>

                    <div v-show="showMoreOptions"  class="uk-width-1-3@s uk-grid-margin" style="margin-top: 0px;">
                        <!-- <label class="uk-form-label" >Due Date</label>
                        <div class="uk-form-controls">
                          <input  v-model="taskObject.dueDateTime" class="uk-input" type="datetime-local" placeholder="" tabindex="9">
                        </div> -->
                        <label class="uk-form-label" >Due Date (#days from start-date)</label>
                        <div class="uk-form-controls" style="display:flex">
                          <input  v-model="taskObject.dueDateDuration" onkeypress="return event.charCode >= 48" min="1"  class="uk-input" dir="rtl" type="number" style="border-right: 0px;border-top-right-radius:0px;border-bottom-right-radius:0px;text-align:right" tabindex="10">
                          <select v-model="taskObject.dueDateDurationUnit"  class="uk-select" id="form-horizontal-select" style="border-top-left-radius:0px;border-bottom-left-radius:0px;" tabindex="11">
                              <option selected value="days">Days</option>
                          </select>
                        </div>
                    </div>
                    <div v-show="showMoreOptions"  class="uk-width-1-3@s uk-grid-margin" style="margin-top: 0px;">
                        <label class="uk-form-label" >Estd. Duration</label>
                        <div class="uk-form-controls" style="display:flex">
                          <input  v-model="taskObject.estDuration" onkeypress="return event.charCode >= 48" min="1"  class="uk-input" dir="rtl" type="number" style="border-right: 0px;border-top-right-radius:0px;border-bottom-right-radius:0px;text-align:right" tabindex="10">
                          <select v-model="taskObject.estDurationUnit"  class="uk-select" id="form-horizontal-select" style="border-top-left-radius:0px;border-bottom-left-radius:0px;" tabindex="11">
                              <option value="hours">Hours</option>
                              <option selected value="days">Days</option>
                              <option value="weeks">Weeks</option>
                          </select>
                        </div>
                    </div>
                    <div v-show="showMoreOptions"  class="uk-width-1-3@s uk-grid-margin" style="margin-top: 0px;">

                    </div>


                    <div class="uk-width-1-3@s uk-grid-margin uk-first-column " style="margin-top: 0px;">

                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin " style="margin-top: 0px;">
                        <!-- <div style="height: 70px;">
                            <label class="uk-form-label" >Labels</label>
                            <div class="uk-form-controls">
                                <ui-selectbox v-bind:availableItems="availableLabels"
                                              v-bind:name=" uniqueComponentId + '_Labels'"
                                                     tagProperty="name"
                                                     displayLabelProps="name"  maxTagsToDisplay="3"
                                                     searchProperty="name"
                                                     data_tabindex="8"/>
                            </div>
                        </div> -->
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin" style="margin-top: 0px;">

                    </div>

                    <div class="uk-width-1-1" style="border-top: 0px solid rgb(241, 241, 241);padding: 0px 0px;margin: 0px 0px 0px 15px;display: flex;flex-direction: column;">
                        <div style="display:grid">
                        </div>

                        <div style="display: grid;padding:0px;display:none">
                            <div style="    background: white;width:100%;place-self:center;margin-top:20px;border: 1px dashed rgb(189 189 189);height: 70px;display: grid;place-items: center;margin-bottom: 20px;">
                              <div style="display:grid;grid-template-columns:auto auto;place-items:center center;column-gap: 10px;">
                                  <div class="mini-btn">Add Checklist</div>
                                  <div class="mini-btn">Add Form</div>
                              </div>
                            </div>
                        </div>

                        <div style="margin-top: 30px;display: flex;place-self:start;column-gap:10px;padding-right: 15px;">
                            <button tabindex="11" id="saveButton" v-on:click="save()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: #2196f3;border-radius:20px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: auto;">
                            <div style="display: grid;grid-template-columns: auto auto;place-items: center;">
                              <div>
                                <span class="lnr lnr-location"></span>
                              </div>
                              <div>&nbsp;&nbsp;&nbsp;Send Task</div>
                            </div>
                            </button>
                            <button tabindex="11" id="discardButton" v-on:click="discard()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column" style="background-color: rgb(234 234 234);border: 1px solid #d4d4d4;border-radius:20px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: auto;margin-top: 0px;color: #565656;"><div><div >Discard</div></div></button>
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

  props: ['uniqueComponentId', 'resetTime', 'parentTask', 'taskFromChatMessageData', 'possibleAssignees', 'possibleFollowers'],
  watch: {
    repeatPeriod: function (newVal, oldVal) {

      if (newVal === 'custom_repeat_period') {
        bus.emit("setCronExpressionBuilderTime", this.taskObject.scheduledStartDate);
        UIkit.modal(document.querySelector('#recurring-task-cron-builder-modal')).show();
        return false;
      }
      else if (newVal === '0 0/1 * * * ? *' || newVal === '0 0/2 * * * ? *' || newVal === '0 0/5 * * * ? *' || newVal === '0 0/10 * * * ? *') {
        // This is only for developer testing.
        this.generatedCronExpression = newVal;
      }
      else {

        if (this.taskObject.scheduledStartDate) {
          const selectedStartTime = this.taskObject.scheduledStartDate.split("T")[1];
          const hours = selectedStartTime.split(":")[0];
          const minutes = selectedStartTime.split(":")[1];

          this.generatedCronExpression = "0 " + minutes + " " + hours + " " + newVal;
        }
        else {
          alert("Select propert start date/time");
        }
      }
    },
    resetTime: function (oldVal, newVal) {
      console.log('resetTime changed = ' + newVal.time);

      this.taskObject = {
        id: 'new',
        name: '',
        description: '',
        priority: "Medium",
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
    },
    parentTask: function (oldVal, newVal) {
      console.log('parentTask changed from ', oldVal, 'to ', newVal);
    },
    taskFromChatMessageData: function (newVal, oldVal) {
      // alert("Got msg from chat");
      console.log('taskFromChatMessageData changed from ', oldVal, 'to ', newVal);
      // return false;

      this.taskObject = {
        id: 'new',
        name: newVal.subject,
        description: newVal.subject,
        priority: "Medium",
        assigneeIds: [],
        followerIds: [],
        categoryId: []
      };
    }
  },
  mixins: [
    userMixinLib,
    utilsMixinLib,
    uiListMixinLib
  ],
  data: function () {
    return {

      repeatPeriod: "none",
      generatedCronExpression: null,

      showSectionLabels: true,
      showMoreOptions: false,
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
      defaultStatuses: [],
      taskObject: {
        id: 'new',
        name: '',
        description: '',
        priority: "Medium",
        assigneeIds: [],
        statusId: null,
        dueDateDurationUnit: "days",
        estDurationUnit: "days"
      }
    };
  },
  methods: {

    handleGeneratedCronExpression (data) {
      console.log("Generated Cron Expression is " + data);
      this.generatedCronExpression = data;
      UIkit.modal(document.querySelector('#recurring-task-cron-builder-modal')).hide();
      return false;
    },
    resetAssigneesDropdown () {

      this.loadPotentialUsers();
      return false;

      const mapFunction = (user) => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          isSelected: false
        };
      };

      const mappedArrayOfUser = this.availableAssignees.map(mapFunction);
      this.availableAssignees = mappedArrayOfUser;

    },
    resetFollowersDropdown () {
      const mapFunction = (user) => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          isSelected: false
        };
      };

      const mappedArrayOfUser = this.availableFollowers.map(mapFunction);
      this.availableFollowers = mappedArrayOfUser;
    },
    resetCategoriesDropdown () {

      // This block is used to pull and display the tenant's default category as the default selected option
      // when a new task is created. (As requested by the UK Client on Oct 22, 2021)
      let defaultCategoryIdForTenant = null;
      if (localStorage.getItem("default-category")) {
        defaultCategoryIdForTenant = localStorage.getItem("default-category");
      }

      const mapFunction = (item) => {

        let isSelected = false;
        if (defaultCategoryIdForTenant) {
          if (defaultCategoryIdForTenant === item.id) {
            isSelected = true;
          }
        }

        return {
          id: item.id,
          name: item.name,
          status: item.status,
          isSelected: isSelected // If the defaultCategoryId in localstorage exists and matches this item, then set it as true.
        };
      };

      const mappedArrayOfCategories = this.availableCategories.map(mapFunction);

      this.availableCategories = mappedArrayOfCategories;
    },

    resetDropdowns () {
      this.resetAssigneesDropdown();
      // this.resetFollowersDropdown(); Followers is also populated in resetAssigneesDropdown's this.loadPotentialUsers() call
      this.resetCategoriesDropdown();
    },
    getSelectedAssignees () {
      alert(this.taskObject.assigneeIds);
    },
    someFunction (elem) {

    },
    discard () {
      // bus.emit('discardNewTaskForm', {});
      this.resetDropdowns();
      this.$emit('signalCloseNewTaskModal', {}); // send signal to close this modal
      return false;
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
    loadDefaultStatuses () {
      const url = './categories-stages/list/default-statuses/all';
      this.getUnpaginatedList('defaultStatuses', url); // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
    },
    // Callbacks of loadPotentialUsers function.
    handleUnpaginatedListData (listKey, data) {
      if (listKey === 'potentialUsers') { this.handlePotentialUsers(data); } else if (listKey === 'potentialCategories') { this.handlePotentialCategories(data); } else if (listKey === 'defaultStatuses') { this.handleDefaultStatuses(data); }
    },
    handleUnpaginatedListDataError (error) {
      console.error('Unpaginated List data fetch error : ', error);
    },

    // Callbacks
    handlePotentialUsers (dataResponse) {
      // Pass it to the availableMembers prop to the dropdown.
      // console.log("Potential Users : ", dataResponse);

      const disableAcronym = false;
      const mappedArrayOfUser = [];

      // Attempting to use Comlink Worker

          const reducer = (accumulator, currentValue) => accumulator + currentValue.charAt(0);
          const workGroupMapFunction = (item) => {

            const acronymArray = item.name.split(" ");
            if (acronymArray.length > 0) {
              item.acronym = acronymArray.reduce(reducer, "");
            }
            else {
              item.acronym = item.substring(0, 3);
            }

            return {
              id: "wg_" + item.id,
              shortLabel: item.acronym.toUpperCase(),
              fullLabel: (item.name),
              hint: item.name,
              label: (disableAcronym) ? (item.name) : (item.acronym).toUpperCase(),
              isSelected: false
            };
          };
          const get_url = './workgroups/list/all'; // Fetch all workgroups
          const callbackFunction = (dataResponse2) => {

            const workgroupsFetchedList = dataResponse2.bean;

            // Add Workgroups to the dropdown

                mappedArrayOfUser.push({
                  shortLabel: "Work Groups",
                  fullLabel: "Work Groups",
                  hint: "Work Groups",
                  label: "WG",
                  isCategoryLabel: true
                });
                workgroupsFetchedList.map(workGroupMapFunction).forEach(item => { mappedArrayOfUser.push(item); });

            // Pass it to the availableAssignees prop to the dropdown.
            // console.log('Fetched workgroups for this user : ', dataResponse);

            // Add Users to the dropdown
            const mapFunction = (user) => {
              return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                shortLabel: (user.firstName.charAt(0) + "" + user.lastName.charAt(0)).toUpperCase(),
                fullLabel: (user.firstName + " " + user.lastName),
                hint: (user.firstName + " " + user.lastName),
                label: (disableAcronym) ? (user.firstName + " " + user.lastName) : (user.firstName.charAt(0) + "" + user.lastName.charAt(0)).toUpperCase(),
                isSelected: false
              };
            };

            mappedArrayOfUser.push({
              shortLabel: "Users",
              fullLabel: "Users",
              hint: "Users",
              label: "Users",
              isCategoryLabel: true
            });
            dataResponse.data.bean.map(mapFunction).forEach(item => {
              mappedArrayOfUser.push(item);
            });

            console.log("mappedArrayOfUser ", mappedArrayOfUser);

            const assigneesFinal = [];
            const followersFinal = [];

            mappedArrayOfUser.forEach(item => {

              const assignee = JSON.parse(JSON.stringify(item)); // A shortcut to create javascript copy of an object.

              // Jan14, 2022 - Bhaskara vignesh.c
              // This block is to automatically populate the passed assignees. It is used in chat option's convert-to-task feature,
              // where we dynamically pass the possible assignees to be pre-populated during task creation modal display.
              if (this.possibleAssignees !== undefined && this.possibleAssignees !== null) {

                this.possibleAssignees.forEach(possibleAssignee => {
                  if (possibleAssignee.id === assignee.id) {
                    assignee.isSelected = true;
                  }
                });
              }

              assigneesFinal.push(assignee);
            });

            mappedArrayOfUser.forEach(item => {
              const follower = JSON.parse(JSON.stringify(item)); // A shortcut to create javascript copy of an object.
              followersFinal.push(follower);
            });



            this.availableAssignees = assigneesFinal; // When a category is edited, these vals must be merged with existing category members to determine 'isSelected' flag
            this.availableFollowers = followersFinal;



            console.log('hpu this.availableAssignees : ', this.availableAssignees);
            // console.log("this.availableFollowers : " , this.availableFollowers);

          };
          const callbackError = (error) => {
            console.error('Error in task-view-ms.loadWorkgroups()');
            console.error(error);
            UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });
          };

          async function sendTaskToWorker () {
              // const remoteFunction = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));
              console.log("Loading workgroups using comlink-worker");
              await ComlinkWorker.fetch(process.env.VUE_APP_API_URL + get_url,
                                         Comlink.proxy(callbackFunction),
                                         Comlink.proxy(callbackError));
          }

          sendTaskToWorker();
      // Comlink worker ends here

    },
    handlePotentialCategories (dataResponse) {
      // Pass it to the availableMembers prop to the dropdown.
      console.log("Potential Categories : ", dataResponse);

      // This block is used to pull and display the tenant's default category as the default selected option
      // when a new task is created. (As requested by the UK Client on Oct 22, 2021)
      let defaultCategoryIdForTenant = null;
      if (localStorage.getItem("default-category")) {
        defaultCategoryIdForTenant = localStorage.getItem("default-category");
      }

      const mapFunction = (item) => {

        let isSelected = false;
        if (defaultCategoryIdForTenant) {
          if (defaultCategoryIdForTenant === item.id) {
            isSelected = true;
          }
        }

        return {
          id: item.id,
          name: item.name,
          status: item.status,
          isSelected: isSelected // If the defaultCategoryId in localstorage exists and matches this item, then set it as true.
        };
      };


      const mappedArrayOfCategories = dataResponse.data.bean.map(mapFunction);
      const filteredArrayOfActiveCategories = mappedArrayOfCategories.filter(item => item.status === "ACTIVE");

      this.availableCategories = filteredArrayOfActiveCategories; // When a category is edited, these vals must be merged with existing category members to determine 'isSelected' flag

      // console.log("this.availableCategories : ", this.availableCategories);
    },
    handleDefaultStatuses (dataResponse) {
      // Pass it to the availableMembers prop to the dropdown.
      // console.log("defaultStatuses : ", dataResponse);


      // This block is used to pull and display the tenant's default category as the default selected option
      // when a new task is created. (As requested by the UK Client on Oct 22, 2021)
      // let defaultCategoryIdForTenant = null;
      // if (localStorage.getItem("default-category")) {
      //   defaultCategoryIdForTenant = localStorage.getItem("default-category");
      // }

      const list = dataResponse.data.bean;

      // Store the first element to compare with.
      const defaultStageWithLowestOrderNumber = list[0];
      this.defaultStatuses = list;
      this.taskObject.statusId = defaultStageWithLowestOrderNumber.id;
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
      }
      else if (this.taskObject.scheduledStartDate === null || this.taskObject.scheduledStartDate === undefined) {

        if (this.generatedCronExpression === null) {
          UIkit.notification(`<div class="taskone-notification">
                                            <span uk-icon="icon: warning;ratio:1"></span>
                                            <div> Please choose a valid Scheduled Start Date. </div>
                                        </div>`, {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 5000
          });

          return false;
        }
      }
      else if (this.repeatPeriod === 'none' || this.repeatPeriod === null) {

        if (this.generatedCronExpression === null) {
          UIkit.notification(`<div class="taskone-notification">
                                            <span uk-icon="icon: warning;ratio:1"></span>
                                            <div> Please choose a valid repeat period. </div>
                                        </div>`, {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 5000
          });

          return false;
        }
      }
      else if (this.repeatPeriod === 'custom_repeat_period') {

        if (this.generatedCronExpression === null) {
          UIkit.notification(`<div class="taskone-notification">
                                            <span uk-icon="icon: warning;ratio:1"></span>
                                            <div> Please choose a valid repeat period. </div>
                                        </div>`, {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 5000
          });

          return false;
        }
      }

      // if (this.taskObject.assigneeIds.length === 0) {
      //   UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span> Please add atleast one assignee.", {
      //     status: 'danger',
      //     pos: 'bottom-left',
      //     timeout: 5000
      //   });
      //
      //   return false;
      // }




      return true;
    },
    save () {

      if (!this.doValidation()) { return false; } // stop here if form is invalid.

      // alert("Form looks good.");
      // return false;

      const btnText = document.getElementById('saveButton').innerHTML;
      document.getElementById('saveButton').innerHTML = 'Saving..';
      this.disableHTMLElement(document.getElementById('saveButton'));

      let post_url = './recurring-tasks/save';
      console.log('Posting data to : ' + post_url);

      const form = {
        id: this.taskObject.id,
        name: this.taskObject.name,
        type: this.taskObject.type,
        priority: this.taskObject.priority,
        statusId: this.taskObject.statusId,
        description: this.taskObject.description,
        dueDateDuration: this.taskObject.dueDateDuration,
        dueDateDurationUnit: this.taskObject.dueDateDurationUnit,
        estimatedDuration: this.taskObject.estDuration,
        estimatedDurationUnit: this.taskObject.estDurationUnit,
        assigneeIds: this.taskObject.assigneeIds,
        categoryId: this.taskObject.categoryId,
        labelIds: this.taskObject.labelIds,
        ownerId: this.taskObject.ownerId,
        clientTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        cronExpression: this.generatedCronExpression
      };

      // If its empty, then its throwing 400 error, trying to set it to null.
      if (form.categoryId.length === 0) {
        form.categoryId = null;
      }

      if (this.taskObject.followerIds && this.taskObject.followerIds.length > 0) { form.followerIds = this.taskObject.followerIds; }



      if (this.taskObject.scheduledStartDate !== undefined && this.taskObject.scheduledStartDate !== null && this.taskObject.scheduledStartDate !== '') {
        // form["dueDateTime"] =  new Date(this.taskObject.dueDateTime).toLocaleString();
        // Always convert the inputs from browser into UTC timezone and ISO format.
        form.scheduledStartDate = new Date(this.taskObject.scheduledStartDate).toISOString();
      }

      if (this.taskObject.scheduledEndDate !== undefined && this.taskObject.scheduledEndDate !== null && this.taskObject.scheduledEndDate !== '') {
        // form["dueDateTime"] =  new Date(this.taskObject.dueDateTime).toLocaleString();
        // Always convert the inputs from browser into UTC timezone and ISO format.
        form.scheduledEndDate = new Date(this.taskObject.scheduledEndDate).toISOString();
      }


      console.log('Task Form Data : ', form);


      if (this.parentTask && this.parentTask.id)
      {
         form.parentTaskId = this.parentTask.id;
         post_url = './recurring-tasks/save';
      }



      // alert("Temporarily disabled by dev");
      // return false;

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {
          console.log('Task Save Result : ');
          console.log(dataResponse);

          if (dataResponse.data.actionResult === 1) {

            const savedTask = dataResponse.data.bean;

            UIkit.notification(`<div class="taskone-notification">
                                                    <span uk-icon="icon: check;ratio:1"></span>
                                                    <div> New Recurring Task Template added successfully. </div>
                                                </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 5000
            });


            try {

                  document.getElementById('saveButton').innerHTML = btnText;
                  this.enableHTMLElement(document.getElementById('saveButton'));
                  this.resetDropdowns(); // This resets all the dropdowns.

                  // this.$emit('refreshList', {}); // is handled by bus.emit('updateTaskItemInTheList')
                  this.$emit('signalCloseNewTaskModal', {}); // send signal to close this modal
                  bus.emit("reload_task_details", {});
                  bus.emit('updateTaskItemInTheList', savedTask);

                // Reset the taskObject after a task is saved.
                this.taskObject = {
                    id: 'new',
                    name: '',
                    description: '',
                    priority: "Medium",
                    assigneeIds: []
                };
            }
            catch (e) {
              alert("Error after task save : " + e);
              console.error(e);
            }


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


          // console.log('ERROR MS - ', errorResponse);
          // const exceptionMsg = errorResponse.response.data.exception;

          // https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
          console.log("ERROR MS - ", errorResponse.response);
          const exceptionMsg = errorResponse.response.data.message;

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

    bus.on('cronExpressionGenerated', data => {
      this.handleGeneratedCronExpression(data);
    });

    bus.on('displayNewTaskFormFromConvertToTaskEvent', data => {

      console.log("taskFromChatMessageData taskFromChatMessageData ", this.taskFromChatMessageData);
      this.loadPotentialUsers();

      this.taskObject = {
        id: 'new',
        name: data.subject,
        description: data.subject,
        priority: "Medium",
        categoryId: []
      };

    });




    this.loadPotentialUsers();
    this.loadPotentialCategories();
    this.loadDefaultStatuses();
  }
};

</script>
