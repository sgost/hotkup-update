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

  <div style="font-size: 0.7rem;background: rgb(249 250 255);background: #fff;display:grid;grid-template-columns:1fr;width:100%;place-items:start center;overflow-y:hidden" class="custom-scroll-bar">
    <div class="stage custom-scroll-bar" style="min-height: 400px;display: grid;place-items: stretch;height: 100%;grid-template-rows: 1fr;color: rgb(51, 51, 51);overflow-y: auto;display: flex;box-sizing: border-box;">
          <div class="" style="padding-top: 0px;padding-left: 50px;padding-right: 50px;padding-bottom: 50px;box-sizing: border-box;display: flex;justify-content: center;">
                <form  class="uk-grid-small uk-grid ui-form" uk-grid="" style="width: 85%;place-self: start center;" onsubmit="console.log('Submitted.');return false;">


                    <div class="uk-width-1-3@s uk-grid-margin uk-first-column " style="margin-top: 10px;">
                        <div style="height: 70px;">
                             <label class="uk-form-label">Type of Chart</label>
                             <div class="uk-form-controls">
                                 <ui-selectbox-single v-bind:availableItems="typeOfCharts"
                                               v-bind:name=" uniqueComponentId + '_ChartTypes'"
                                                      tagProperty="name"
                                                      disableAcronym="false"
                                                      displayLabelProps="name"
                                                      maxTagsToDisplay="3"
                                                      searchProperty="name"
                                                      data_tabindex="5"
                                                      v-on:selectBoxUpdate="updateChartTypeEmitEvent($event)"
                                                      allowSingleSelectOnly="true"/>
                             </div>
                        </div>
                    </div>
                    <div class="uk-width-2-3@s uk-grid-margin" style="margin-top: 10px;">
                        <label class="uk-form-label" for="form-stacked-text">Chart Name *</label>
                        <input tabindex="3" v-model="chartPreferenceObject.name" type="text" class="uk-input" placeholder="" style="width:100%;border-radius:3px"/>
                    </div>



                    <div v-if="chartPreferenceObject.chartType === 'group-by-assignees'" class="uk-width-1-3@s uk-grid-margin uk-first-column " style="margin-top: 10px;">
                        <div style="height: 70px;">
                             <label class="uk-form-label">Assigned To</label>
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
                    <div v-if="chartPreferenceObject.chartType === 'group-by-assignees'" class="uk-width-1-3@s uk-grid-margin" style="margin-top: 10px;">
                    </div>
                    <div v-if="chartPreferenceObject.chartType === 'group-by-assignees'" class="uk-width-1-3@s uk-grid-margin" style="margin-top: 10px;">
                    </div>

                    <div v-if="chartPreferenceObject.chartType === 'group-by-followers'" class="uk-width-1-3@s uk-grid-margin uk-first-column "  style="margin-top: 10px;">
                        <div style="height: 70px;">
                             <label class="uk-form-label">Followed by</label>
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
                    <div v-if="chartPreferenceObject.chartType === 'group-by-followers'" class="uk-width-1-3@s uk-grid-margin" style="margin-top: 10px;">
                    </div>
                    <div v-if="chartPreferenceObject.chartType === 'group-by-followers'" class="uk-width-1-3@s uk-grid-margin" style="margin-top: 10px;">
                    </div>

                    <div v-if="chartPreferenceObject.chartType === 'group-by-owned'"  class="uk-width-1-3@s uk-grid-margin uk-first-column "  style="margin-top: 10px;">
                        <div style="height: 70px;">
                             <label class="uk-form-label">Sent by</label>
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
                    <div v-if="chartPreferenceObject.chartType === 'group-by-owned'" class="uk-width-1-3@s uk-grid-margin" style="margin-top: 10px;">
                    </div>
                    <div v-if="chartPreferenceObject.chartType === 'group-by-owned'" class="uk-width-1-3@s uk-grid-margin" style="margin-top: 10px;">
                    </div>

                    <div v-if="chartPreferenceObject.chartType === 'group-by-categories'" class="uk-width-1-3@s uk-grid-margin uk-first-column " style="margin-top: 10px;">
                        <div style="height: 70px;">
                             <label class="uk-form-label">Categories</label>
                             <div class="uk-form-controls">
                                 <ui-selectbox v-bind:availableItems="availableCategories"
                                               v-bind:name=" uniqueComponentId + '_NewTaskCategories'"
                                                      tagProperty="name"
                                                      disableAcronym="false"
                                                      displayLabelProps="name"
                                                      maxTagsToDisplay="3"
                                                      searchProperty="name"
                                                      data_tabindex="5"
                                                      v-on:selectBoxUpdate="updateCategoryEmitEvent($event)"/>
                             </div>
                        </div>
                    </div>
                    <div v-if="chartPreferenceObject.chartType === 'group-by-categories'" class="uk-width-1-3@s uk-grid-margin" style="margin-top: 10px;">
                    </div>
                    <div v-if="chartPreferenceObject.chartType === 'group-by-categories'" class="uk-width-1-3@s uk-grid-margin" style="margin-top: 10px;">
                    </div>


                    <div v-if="chartPreferenceObject.chartType === 'group-by-stages'"  class="uk-width-1-3@s uk-grid-margin uk-first-column " style="margin-top: 10px;pointer-events:none;opacity:0.44">
                        <div style="height: 70px;">
                             <label class="uk-form-label">Stages (Coming soon..)</label>
                             <div class="uk-form-controls">
                                 <ui-selectbox v-bind:availableItems="availableCategoriesStages"
                                               v-bind:name=" uniqueComponentId + '_NewTaskCategories'"
                                                      tagProperty="name"
                                                      disableAcronym="false"
                                                      displayLabelProps="name"
                                                      maxTagsToDisplay="3"
                                                      searchProperty="name"
                                                      data_tabindex="5"
                                                      v-on:selectBoxUpdate="updateCategoryEmitEvent($event)"/>
                             </div>
                        </div>
                    </div>
                    <div v-if="chartPreferenceObject.chartType === 'group-by-stages'" class="uk-width-1-3@s uk-grid-margin" style="margin-top: 10px;">
                    </div>
                    <div v-if="chartPreferenceObject.chartType === 'group-by-stages'" class="uk-width-1-3@s uk-grid-margin" style="margin-top: 10px;">
                    </div>

                    <div class="uk-width-1-3@s uk-grid-margin"  style="margin-top: 10px;">
                        <label class="uk-form-label" >Containing Keywords (separate by comma)</label>
                        <div class="uk-form-controls">
                          <input  v-model="chartPreferenceObject.keywords" class="uk-input" type="text" placeholder="" tabindex="9">
                        </div>
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin" style="margin-top: 10px;">
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin" style="margin-top: 10px;">
                    </div>


                    <div v-if="chartPreferenceObject.chartType === 'group-by-priorities'
                              || chartPreferenceObject.chartType === 'group-by-categories'
                              || chartPreferenceObject.chartType === 'group-by-assignees'
                              || chartPreferenceObject.chartType === 'group-by-followers'
                              || chartPreferenceObject.chartType === 'group-by-owned'" class="uk-width-1-3@s uk-grid-margin uk-first-column " style="margin-top: 10px;">
                        <div style="height: 70px;">
                             <label class="uk-form-label">Priorities</label>
                             <div class="uk-form-controls">
                                 <ui-selectbox v-bind:availableItems="availablePriorities"
                                               v-bind:name=" uniqueComponentId + '_Priorities'"
                                                      tagProperty="name"
                                                      disableAcronym="false"
                                                      displayLabelProps="name"
                                                      maxTagsToDisplay="3"
                                                      searchProperty="name"
                                                      data_tabindex="5"
                                                      v-on:selectBoxUpdate="updatePrioritiesEmitEvent($event)"/>
                             </div>
                        </div>
                    </div>
                    <div v-if="chartPreferenceObject.chartType === 'group-by-priorities'
                              || chartPreferenceObject.chartType === 'group-by-categories'
                              || chartPreferenceObject.chartType === 'group-by-assignees'
                              || chartPreferenceObject.chartType === 'group-by-followers'
                              || chartPreferenceObject.chartType === 'group-by-owned'" class="uk-width-1-3@s uk-grid-margin" style="margin-top: 10px;">
                    </div>
                    <div v-if="chartPreferenceObject.chartType === 'group-by-priorities'
                              || chartPreferenceObject.chartType === 'group-by-categories'
                              || chartPreferenceObject.chartType === 'group-by-assignees'
                              || chartPreferenceObject.chartType === 'group-by-followers'
                              || chartPreferenceObject.chartType === 'group-by-owned'" class="uk-width-1-3@s uk-grid-margin" style="margin-top: 10px;">
                    </div>

                    <div v-if="chartPreferenceObject.chartType === 'group-by-startdates'" class="uk-width-1-3@s uk-grid-margin uk-first-column"  style="margin-top: 10px;pointer-events:none;opacity:0.44">
                        <label class="uk-form-label" >Start Date (From)</label>
                        <div class="uk-form-controls">
                          <input  v-model="chartPreferenceObject.startDateTime" class="uk-input" type="datetime-local" placeholder="" tabindex="8">
                        </div>
                    </div>
                    <div v-if="chartPreferenceObject.chartType === 'group-by-startdates'" class="uk-width-1-3@s uk-grid-margin"  style="margin-top: 10px;pointer-events:none;opacity:0.44">
                        <label class="uk-form-label" >Start Date (To)</label>
                        <div class="uk-form-controls">
                          <input  v-model="chartPreferenceObject.dueDateTime" class="uk-input" type="datetime-local" placeholder="" tabindex="9">
                        </div>
                    </div>
                    <div v-if="chartPreferenceObject.chartType === 'group-by-startdates'" class="uk-width-1-3@s uk-grid-margin"  style="margin-top: 10px;pointer-events:none;opacity:0.44">
                    </div>

                    <div v-if="chartPreferenceObject.chartType === 'group-by-duedates'" class="uk-width-1-3@s uk-grid-margin uk-first-column"  style="margin-top: 10px;pointer-events:none;opacity:0.44">
                        <label class="uk-form-label" >Due Date (From)</label>
                        <div class="uk-form-controls">
                          <input  v-model="chartPreferenceObject.startDateTime" class="uk-input" type="datetime-local" placeholder="" tabindex="8">
                        </div>
                    </div>
                    <div v-if="chartPreferenceObject.chartType === 'group-by-duedates'" class="uk-width-1-3@s uk-grid-margin"  style="margin-top: 10px;pointer-events:none;opacity:0.44">
                        <label class="uk-form-label" >Due Date (To)</label>
                        <div class="uk-form-controls">
                          <input  v-model="chartPreferenceObject.dueDateTime" class="uk-input" type="datetime-local" placeholder="" tabindex="9">
                        </div>
                    </div>
                    <div v-if="chartPreferenceObject.chartType === 'group-by-duedates'" class="uk-width-1-3@s uk-grid-margin" style="margin-top: 10px;">

                    </div>

                    <div class="uk-width-1-1 uk-first-column" style="border-top: 0px solid rgb(241, 241, 241);padding: 0px 0px;margin: 0px 0px 0px 15px;display: flex;flex-direction: column;">
                        <div style="display:grid">
                        </div>
                        <div style="margin-top: 30px;display: flex;place-self:end;column-gap:10px;padding-right: 15px;">
                            <button tabindex="11" id="saveChartPreferenceButton" v-on:click="save()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: #2196f3;border-radius:20px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: auto;">
                            <div style="display: grid;grid-template-columns: auto auto;place-items: center;">
                              <div>&nbsp;&nbsp;&nbsp;Save Chart Preference</div>
                            </div>
                            </button>
                            <button tabindex="11" id="discardChartPreferenceButton" v-on:click="discard()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column" style="background-color: rgb(234 234 234);border: 1px solid #d4d4d4;border-radius:20px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: auto;margin-top: 0px;color: #565656;"><div><div >Discard</div></div></button>
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

  props: ['uniqueComponentId', 'resetTime', 'parentTask', 'taskFromChatMessageData'],
  watch: {
    resetTime: function (oldVal, newVal) {
      console.log('resetTime changed = ' + newVal.time);
      this.chartPreferenceObject = {
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

      this.chartPreferenceObject = {
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
      availableCategoriesStages: [],
      availableStatuses: [{
        id: "Open",
        name: "Open",
        isSelected: false
      }, {
        id: "Overdue",
        name: "Overdue",
        isSelected: false
      }, {
        id: "Closed",
        name: "Closed",
        isSelected: false
      }],
      availablePriorities: [{
        id: "Critical",
        name: "Critical",
        isSelected: false
      }, {
        id: "High",
        name: "High",
        isSelected: false
      }, {
        id: "Medium",
        name: "Medium",
        isSelected: false
      }, {
        id: "Low",
        name: "Low",
        isSelected: false
      }],
      typeOfCharts: [{
        id: "group-by-categories",
        name: "Monitor by Categories",
        isSelected: false
      }, {
        id: "group-by-assignees",
        name: "Monitor by Assignees",
        isSelected: false
      }
      //, {
      //   id: "group-by-followers",
      //   name: "Monitor by Followers",
      //   isSelected: false
      // }, {
      //   id: "group-by-owned",
      //   name: "Monitor by Sent tasks",
      //   isSelected: false
      // }, {
      //   id: "group-by-hooks",
      //   name: "Monitor by Hooks",
      //   isSelected: false
      // }
      ],
      defaultStatuses: [],
      chartPreferenceObject: {
        id: 'new',
        name: '',
        assigneeIds: [],
        followerIds: [],
        categoryIds: [],
        priorities: []
      }
    };
  },
  methods: {

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
      alert(this.chartPreferenceObject.assigneeIds);
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
      const url = './categories/list/mine'; // Fetch all potential categories (categories)
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
            dataResponse.data.bean.map(mapFunction).forEach(item => { mappedArrayOfUser.push(item); });


            this.availableAssignees = mappedArrayOfUser; // When a category is edited, these vals must be merged with existing category members to determine 'isSelected' flag
            this.availableFollowers = mappedArrayOfUser;


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

        const isSelected = false;
        if (defaultCategoryIdForTenant) {
          if (defaultCategoryIdForTenant === item.id) {
            // isSelected = true;
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
      // this.chartPreferenceObject.statusId = defaultStageWithLowestOrderNumber.id;
    },

    doValidation () {
      console.log('this.chartPreferenceObject = ', this.chartPreferenceObject);
      if (this.chartPreferenceObject.name.trim() === '') {
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

      // if (this.chartPreferenceObject.assigneeIds.length === 0) {
      //   UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span> Please add atleast one assignee.", {
      //     status: 'danger',
      //     pos: 'bottom-left',
      //     timeout: 5000
      //   });
      //
      //   return false;
      // }

      if (this.chartPreferenceObject.startDateTime !== undefined && this.chartPreferenceObject.startDateTime !== null && this.chartPreferenceObject.startDateTime !== '') {
        if (new Date(this.chartPreferenceObject.startDateTime).toLocaleString() === 'Invalid Date') {
          UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span> Please choose a valid start date.", {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 5000
          });

          return false;
        }
      }

      if (this.chartPreferenceObject.dueDateTime !== undefined && this.chartPreferenceObject.dueDateTime !== null && this.chartPreferenceObject.dueDateTime !== '') {
        if (new Date(this.chartPreferenceObject.dueDateTime).toLocaleString() === 'Invalid Date') {
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

      console.log("this.chartPreferenceObject : ", this.chartPreferenceObject);
      // return false;

      // if (!this.doValidation()) { return false; } // stop here if form is invalid.

      const btnText = document.getElementById('saveChartPreferenceButton').innerHTML;
      document.getElementById('saveChartPreferenceButton').innerHTML = 'Saving..';
      this.disableHTMLElement(document.getElementById('saveChartPreferenceButton'));

      const post_url = './dashboard/chart-preferences/save';
      console.log('Posting data to : ' + post_url);

      const form = {
        id: this.chartPreferenceObject.id,
        name: this.chartPreferenceObject.name,
        chartType: this.chartPreferenceObject.chartType,
        assigneeIds: this.chartPreferenceObject.assigneeIds,
        followerIds: this.chartPreferenceObject.followerIds,
        categoryIds: this.chartPreferenceObject.categoryIds,
        priorities: this.chartPreferenceObject.priorities,
        ownerIds: this.chartPreferenceObject.ownerIds,
        clientTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        keywords: this.chartPreferenceObject.keywords
      };

      if (this.chartPreferenceObject.startDateTime !== undefined && this.chartPreferenceObject.startDateTime !== null && this.chartPreferenceObject.startDateTime !== '') {
        // form["startDateTime"] = new Date(this.chartPreferenceObject.startDateTime).toLocaleString();

        // Always convert the inputs from browser into UTC timezone and ISO format.
        form.startDateTime = new Date(this.chartPreferenceObject.startDateTime).toISOString();
      }

      if (this.chartPreferenceObject.dueDateTime !== undefined && this.chartPreferenceObject.dueDateTime !== null && this.chartPreferenceObject.dueDateTime !== '') {
        // form["dueDateTime"] =  new Date(this.chartPreferenceObject.dueDateTime).toLocaleString();

        // Always convert the inputs from browser into UTC timezone and ISO format.
        form.dueDateTime = new Date(this.chartPreferenceObject.dueDateTime).toISOString();
      }

      console.log('Chart Preference Form Data : ', form);

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {
          console.log('Task Save Result : ');
          console.log(dataResponse);

          if (dataResponse.data.actionResult === 1) {

            const savedTask = dataResponse.data.bean;

            UIkit.notification(`<div class="taskone-notification">
                                                    <span uk-icon="icon: check;ratio:1"></span>
                                                    <div> New Chart Preference added successfully. </div>
                                                </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 5000
            });


            try {

                  document.getElementById('saveChartPreferenceButton').innerHTML = btnText;
                  this.enableHTMLElement(document.getElementById('saveChartPreferenceButton'));
                  this.resetDropdowns(); // This resets all the dropdowns.

                  // this.$emit('refreshList', {}); // is handled by bus.emit('updateTaskItemInTheList')
                  this.$emit('signalCloseNewChartPreferenceModal', {}); // send signal to close this modal

                // Reset the chartPreferenceObject after a task is saved.
                this.chartPreferenceObject = {
                    id: 'new',
                    name: '',
                    assigneeIds: [],
                    followerIds: [],
                    categoryIds: [],
                    priorities: []
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

            document.getElementById('saveChartPreferenceButton').innerHTML = btnText;
            this.enableHTMLElement(document.getElementById('saveChartPreferenceButton'));
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

          document.getElementById('saveChartPreferenceButton').innerHTML = btnText;
          this.enableHTMLElement(document.getElementById('saveChartPreferenceButton'));
          return false;
        });
    },

    // Handle the events emitted when selectbox component values are modified.
    updateAssigneesEmitEvent (data) {
      const assigneeIds = Array.from(data).map(item => item.id);
      this.chartPreferenceObject.assigneeIds = assigneeIds;
    },
    updateFollowersEmitEvent (data) {
      const followerIds = Array.from(data).map(item => item.id);
      this.chartPreferenceObject.followerIds = followerIds;
    },
    updateCategoryEmitEvent (data) {
      const categoryIds = Array.from(data).map(item => item.id);
      this.chartPreferenceObject.categoryIds = categoryIds;
    },
    updateCategoriesEmitEvent (data) {
      const categoryIds = Array.from(data).map(item => item.id);
      this.chartPreferenceObject.categoryIds = categoryIds;
    },
    updatePrioritiesEmitEvent (data) {
      const priorities = Array.from(data).map(item => item.id);
      this.chartPreferenceObject.priorities = priorities;
      console.log("selected priorities are ", priorities);
    },
    updateChartTypeEmitEvent (data) {

      if (data != null) {
        this.chartPreferenceObject.chartType = data.id;
      }
      else {
        this.chartPreferenceObject.chartType = null;
      }
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
    this.loadDefaultStatuses();
  }
};

</script>
