<template>
    <div style="position:relative">
        <span v-on:click="changeWireframe()" style="position: absolute;right: 5px;top: -15px;opacity: 0;cursor: pointer;">{{wireframeLabel}}</span>
        <form style="width: 90%;margin-top: 15px;padding-top: 10px;padding-right: 30px;padding-left: 30px;margin-left: 0px;"
              class="uk-grid-small" uk-grid  v-show="wireframe=='existing_format'"
              onsubmit="return false;">

            <div class="uk-width-2-3@s uk-first-column ">
                <label class="uk-form-label">Task Name *</label>
                <div class="uk-form-controls">
                  <input v-model="taskObject.name" class="uk-input" type="text" placeholder=""  tabindex="1">
                </div>
            </div>
            <div class="uk-width-1-3@s uk-grid-margin">
                <label class="uk-form-label" for="form-stacked-text">Current Stage</label>
                <div style="position:relative">
                    <select  v-model="taskObject.statusInfo.id" class="uk-select" tabindex="4">
                        <template v-for="stage in availableCategoryStages">
                            <!--<option v-bind:value="stage.id + '#' + stage.name" v-bind:selected="taskObject.status==stage.id+'#'+stage.name" >{{stage.name}}</option>-->
                            <option v-bind:value="stage.id">{{stage.name}}</option>
                        </template>
                    </select>
                    <div style="position:absolute;right: 7px;top: 9px;pointer-events: none;"><span class="uk-icon" uk-icon="triangle-down"></span></div>
                </div>
            </div>

            <div class="uk-width-1-3@s uk-grid-margin uk-first-column ">
                <div style="height: 70px;">
                     <label class="uk-form-label">Assignee</label>
                     <div class="uk-form-controls">
                         <ui-selectbox-2 v-bind:availableItems="availableAssignees"
                                              name="Assignee"
                                              tagProperty="firstName"
                                              displayLabelProps="firstName,lastName" maxTagsToDisplay="2"
                                              searchProperty="firstName,lastName"
                                              data_tabindex="2"
                                              v-on:selectBoxUpdate="updateAssigneesEmitEvent($event)"/>
                     </div>
                </div>
            </div>
            <div class="uk-width-1-3@s uk-grid-margin">
              <div style="height: 70px;">
                   <label class="uk-form-label">Followers</label>
                   <div class="uk-form-controls">
                       <ui-selectbox-2 v-bind:availableItems="availableFollowers"
                                            name="Followers"
                                            tagProperty="firstName"
                                            displayLabelProps="firstName,lastName"  maxTagsToDisplay="2"
                                            searchProperty="firstName,lastName"
                                            data_tabindex="3"
                                            v-on:selectBoxUpdate="updateFollowersEmitEvent($event)"/>
                   </div>
              </div>
            </div>
            <div class="uk-width-1-3@s uk-grid-margin">

              <label class="uk-form-label" for="form-stacked-text">Priority *</label>
              <div style="position:relative">
                  <select  v-model="taskObject.priority" class="uk-select"   tabindex="4">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                  </select>
                  <div style="position:absolute;right: 7px;top: 9px;pointer-events: none;"><span class="uk-icon" uk-icon="triangle-down"></span></div>
              </div>
              <!--
                <div style="height: 70px;">
                    <label class="uk-form-label" >Category *</label>
                    <div class="uk-form-controls">

                         <ui-selectbox-single v-bind:availableItems="availableCategories"
                                              name="Categories"
                                              tagProperty="name"
                                              displayLabelProps="name" maxTagsToDisplay="3"
                                              searchProperty="name"
                                              data_tabindex="6"
                                              v-on:selectBoxUpdate="updateCategoryEmitEvent($event)"
                                              allowSingleSelectOnly="true"/>
                    </div>
                </div>-->
            </div>

            <div class="uk-width-1-3@s uk-grid-margin uk-first-column ">
                <label class="uk-form-label" >Start Date (Optional)</label>
                <div class="uk-form-controls">
                  <input id="startDateTimeInput" v-model="taskObject.startDateTime" class="uk-input" type="datetime-local" placeholder="" tabindex="8">
                </div>
            </div>
            <div class="uk-width-1-3@s uk-grid-margin">
                <label class="uk-form-label" >Due Date</label>
                <div class="uk-form-controls">
                  <input id="dueDateTimeInput" v-model="taskObject.dueDateTime" class="uk-input" type="datetime-local" placeholder="" tabindex="5">
                </div>
            </div>
            <div class="uk-width-1-3@s uk-grid-margin">
                <label class="uk-form-label" >Estd. Duration</label>
                <div class="uk-form-controls" style="display: grid;grid-template-columns: 1fr 2fr;">
                  <input  v-model="taskObject.estimatedDuration" onkeypress="return event.charCode >= 48" min="1"  class="uk-input" dir="rtl" type="number" style="border-right: 0px;text-align: right;border: 1px solid #bbbbbb;;border-top-right-radius:0px;border-bottom-right-radius:0px;" tabindex="6">

                  <div style="position:relative">
                      <select v-model="taskObject.estimatedDurationUnit"  class="uk-select" id="form-horizontal-select" style="border-left: 1px;;border-top-left-radius:0px;border-bottom-left-radius:0px;" tabindex="7">
                          <option value="Hours">Hour(s)</option>
                          <option value="Days">Day(s)</option>
                          <option value="Weeks">Week(s)</option>
                      </select>
                      <div style="position:absolute;right: 7px;top: 9px;pointer-events: none;"><span class="uk-icon" uk-icon="triangle-down"></span></div>
                  </div>
                </div>
            </div>

            <!-- <div v-show="showSectionLabels" class="uk-width-1-1 uk-grid-margin uk-first-column " style="border-bottom: 1px solid rgb(236, 236, 236);padding: 10px;line-height: 15px;margin: 15px 0px 5px;position: relative;display: grid;place-items: start start;">
              <span style="position: absolute;top: 12px;left: 10px;color: rgb(199, 195, 195);background: rgb(249, 250, 255);padding-left: 5px;padding-right: 5px;font-size: 0.55rem;text-transform: uppercase;">Optional</span>
            </div>

            <div class="uk-width-1-3@s uk-grid-margin uk-first-column ">
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
            <div class="uk-width-1-3@s uk-grid-margin ">

            </div>
            <div class="uk-width-1-3@s uk-grid-margin">

            </div> -->

            <div class="uk-width-1-1" style="border-top: 1px solid rgb(236 236 236);padding: 20px 0px;margin: 75px 0px 0px 15px;display: flex;flex-direction: column;">
                <div style="display:grid">
                </div>
                <div v-if="hideUpdateButton !== 'true'" style="display: flex;width:100%;place-self:center;padding-right: 15px;">
                    <button tabindex="10" id="saveButton" v-on:click="save()" class="task-update-btn clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column " style="background-color: rgb(37 139 254);border-radius: 20px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: auto;">
                    <div style="display: grid;grid-template-columns: auto auto;place-items: center;">
                      <div>&nbsp;&nbsp;&nbsp;Update Task</div>
                    </div>
                    </button>
                </div>

                <div v-if="hideUpdateButton === 'true'" style="display: flex;width: 100%;place-self: center;padding-right: 15px;justify-content: flex-end;">
                    Recurring Task Templates cannot be updated. It can only be disabled and created newly.
                </div>
            </div>
        </form>

    </div>
</template>

<script>

import { bus } from './../../../main.js';
import userMixinLib from './../../mixins/lib/user_mixin_lib';
import utilsMixinLib from './../../mixins/lib/utils_lib';
import uiListMixinLib from './../../mixins/lib/ui-list.js';

export default {
  mixins: [
    userMixinLib,
    utilsMixinLib,
    uiListMixinLib
  ],
  props: ['taskInfo', 'hideUpdateButton'],
  data: function () {
    return {
      wireframe: 'existing_format',
      wireframeLabel: 'Proposed',
      takeAction: false,
      showSectionLabels: true,
      availableAssignees: [],
      availableFollowers: [],
      availableCategories: [],
      availableCategoryStages: [],
      availableLabels: [],
      availableDependencySubtasks: [],

      taskObject: {
        statusInfo: {}
      },
      taskObjectBeforeChange: {},
      taskTransitionUpdate: {},
      doesCategoryHasAdvancedSettings: false
    };
  },
  methods: {

    changeWireframe () {
      if (this.wireframe === 'existing_format') {
        this.wireframe = 'new_proposal';
        this.wireframeLabel = 'Existing';
      } else if (this.wireframe === 'new_proposal') {
        this.wireframe = 'existing_format';
        this.wireframeLabel = 'Proposed';
      }
    },
    someFunction (elem) { console.log(elem); },
    goToHomePage () {
      this.$router.push({
        name: 'home',
        params: {}
      });
    },
    doValidation () {
      // console.log("this.taskObject = ", this.taskObject);
      if (this.taskObject.name.trim() === '') {
        UIkit.notification(`<div class="taskone-notification">
                                        <span uk-icon="icon: warning;ratio:1"></span>
                                        <div> Please enter a valid Name. </div>
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

      const post_url = './tasks/update';
      // console.log("Posting data to : " + post_url);
      // console.log("Before making form-data , " , this.taskObject);


      const form = {
        id: this.taskObject.id,
        name: this.taskObject.name,
        type: this.taskObject.type,
        priority: this.taskObject.priority,
        statusId: this.taskObject.statusInfo.id,
        description: this.taskObject.description,
        estimatedDuration: this.taskObject.estimatedDuration,
        estimatedDurationUnit: this.taskObject.estimatedDurationUnit,
        assigneeIds: this.taskObject.assigneeIds,
        followerIds: this.taskObject.followerIds,
        categoryId: this.taskObject.categoryId,
        labelIds: this.taskObject.labelIds,
        ownerId: this.taskObject.ownerId,
        clientTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        // dependencyTaskIds : this.taskObject["dependencyTaskIds"]
      };

      if (this.taskObject.startDateTime !== undefined && this.taskObject.startDateTime !== null && this.taskObject.startDateTime !== '') {
        // form["startDateTime"] = new Date(this.taskObject.startDateTime).toLocaleString();

        // Always convert the inputs from browser into UTC timezone and ISO format.
        form.startDateTime = new Date(this.taskObject.startDateTime).toISOString();
      }

      if (this.taskObject.dueDateTime !== undefined && this.taskObject.dueDateTime !== null && this.taskObject.dueDateTime !== '') {
        // form["dueDateTime"] =  new Date(this.taskObject.dueDateTime).toLocaleString();

        // Always convert the inputs from browser into UTC timezone and ISO format.
        form.dueDateTime = new Date(this.taskObject.dueDateTime).toISOString();
      }

      if (form.followerIds === null) { form.followerIds = []; }

      // console.log("Task Form Data : ", form);
      // return false;

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {
          // console.log("Task Save Result : ");
          /// console.log(dataResponse);

          if (dataResponse.data.actionResult === 1) {

            const taskObject = dataResponse.data.bean;


            if (taskObject.startDateTime !== undefined && taskObject.startDateTime !== null) {
              console.log('taskObject.startDateTime before = ' + taskObject.startDateTime);
              taskObject.startDateTime = this.convertUTCDateFromServerToLocalDate(taskObject.startDateTime);
              console.log('taskObject.startDateTime after = ' + taskObject.startDateTime);
            }

            if (taskObject.dueDateTime !== undefined && taskObject.dueDateTime !== null) {
              taskObject.dueDateTime = this.convertUTCDateFromServerToLocalDate(taskObject.dueDateTime);
              console.log('taskObject.dueDateTime = ', taskObject.dueDateTime);
            }
            this.taskObject = taskObject;



            UIkit.notification(`<div class="taskone-notification">
                                                  <span uk-icon="icon: check;ratio:1"></span>
                                                  <div> Task updated successfully. </div>
                                              </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 5000
            });

            document.getElementById('saveButton').innerHTML = btnText;
            this.enableHTMLElement(document.getElementById('saveButton'));

            // Commented on April 28th
            // this.refreshTaskInfo();
            // this.$emit("refreshTaskDetails",{});
            bus.emit("reload_task_details", {});
            bus.emit('updateTaskItemInTheList', this.taskObject);
            bus.emit('refresh-task-counts', {});
          } else {

            // Revert the task to its previous state in case of failures.
            this.taskObject = this.taskObjectBeforeChange;
            const errorMsg = (dataResponse.data).message;
            UIkit.notification(`<div class="taskone-notification">
                                      <span uk-icon='icon: warning;ratio:1'></span>
                                      <div> ${errorMsg} </div>
                                </div>`, {
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

          // Revert the task to its previous state in case of failures.
          this.taskObject = this.taskObjectBeforeChange;

          console.log('ERROR MS - ', errorResponse);
          const exceptionMsg = errorResponse.response.data.exception;

          UIkit.notification(`<div class="taskone-notification">
                                    <span uk-icon='icon: warning;ratio:1'></span>
                                    <div> ${exceptionMsg}</div>
                              </div>`, {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 5000
          });

          document.getElementById('saveButton').innerHTML = btnText;
          this.enableHTMLElement(document.getElementById('saveButton'));
          return false;
        });
    },
    refreshTaskInfo () {
      console.log('Refreshing and getting Task record..');

      const get_url = './tasks/get/' + this.taskObject.id;

      axios.get(process.env.VUE_APP_API_URL + get_url)
        .then((dataResponse) => {
          if (dataResponse.data.actionResult == 1) {
            const taskObject = dataResponse.data.bean;

            taskObject.categoryInfo.name = taskObject.categoryInfo.label;
            taskObject.category = taskObject.categoryInfo; // v2 schema change (June 7, 2021)

            alert(" refreshTaskInfo : " + taskObject.statusInfo);
            // To prevent undefined error in the status's selectbox's v-bind:selected attribute
            taskObject.statusInfo = taskObject.statusInfo !== null ? taskObject.statusInfo : {};

            const categoriesNamesArray = [];

            if (taskObject.categories !== null && taskObject.categories !== undefined) {
              taskObject.categories.forEach((cat) => { categoriesNamesArray.push(cat.name); });
              taskObject.categoriesString = categoriesNamesArray.join(', ');
            }

            const assigneesNamesArray = [];
            taskObject.assignees.forEach((assignee) => { assigneesNamesArray.push(assignee.firstName + ' ' + assignee.lastName); });
            taskObject.assigneesString = assigneesNamesArray.join(', ');

            if (taskObject.subTaskIds !== null) { taskObject.subTasksCount = taskObject.subTaskIds.length; } else { taskObject.subTasksCount = 0; }

            if (taskObject.ownerId !== null) { taskObject.ownedBy = taskObject.ownerId.split('#')[1]; }

            if (taskObject.status !== null && taskObject.status !== undefined) {
              taskObject.stageName = taskObject.status.split('#')[1];
            }

            this.taskObject = taskObject;
            this.loadPotentialUsers(); // To refresh the assignee-dropdown-list values based on task's currentStatus.
          }
        })
        .catch((error) => {
          console.error(error);
          UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 5000
          });
          return false;
        });
    },

    // Handle the events emitted when selectbox component values are modified.
    updateAssigneesEmitEvent (data) {
      const assigneeIds = Array.from(data).map(item => item.id);
      const assigneeNames = Array.from(data).map(item => item.fullLabel);
      this.taskObject.assigneeIds = assigneeIds;
      this.taskObject.assigneeNames = assigneeNames;
    },
    updateFollowersEmitEvent (data) {
      // console.log("--data--" , data);
      const followerIds = Array.from(data).map(item => item.id);
      const followerNames = Array.from(data).map(item => item.fullLabel);

      this.taskObject.followerIds = followerIds;
      this.taskObject.followerNames = followerNames;
    },
    updateCategoryEmitEvent (data) {
      if (data != null) { this.taskObject.categoryId = data.id; } else { this.taskObject.categoryId = null; }

      this.loadCategoryStages();
    },
    updateCategoriesEmitEvent (data) {
      const categoryIds = Array.from(data).map(item => item.id);
      const categoryNames = Array.from(data).map(item => item.fullLabel);
      this.taskObject.categoryIds = categoryIds;
      this.taskObject.categoryNames = categoryNames;
    },
    updateDependencySubtaskEmitEvent (data) {
      const dependencyTaskIds = Array.from(data).map(item => item.id);
      this.taskObject.dependencyTaskIds = dependencyTaskIds;
    },
    getRecord () {
      alert("Getting task record.");
      console.log('Getting Task record..');

      const get_url = './tasks/get/' + this.taskObject.id;
      // console.log("getRecord() ...", get_url);
      axios.get(process.env.VUE_APP_API_URL + get_url)
        .then((dataResponse) => {
          if (dataResponse.data.actionResult == 1) {
            const taskObject = dataResponse.data.bean;

            // Adjust to the new schema changes.

            // To prevent undefined error in the status's selectbox's v-bind:selected attribute
            taskObject.statusInfo = taskObject.statusInfo !== null ? taskObject.statusInfo : {};

            this.taskObject = taskObject;

            // Take a copy to revert back if in case the update task action fails.
            const taskObjectBeforeSavingChanges = JSON.parse(JSON.stringify(this.taskObject));
            this.taskObjectBeforeChange = taskObjectBeforeSavingChanges;



            this.loadPotentialUsers();
            this.loadPotentialCategories();
            this.loadCategoryStages();
          }
        })
        .catch((error) => {
          console.error('Error in getRecord()');
          console.error(error);
          UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 5000
          });
          return false;
        });
    },

    // This data will be used to filter both members and admins by merging with the result from 'get-associated-people/{workgroup-id}'
    loadPotentialUsers () {
      console.log('Loading potential users..');

      let url = '';

      // if(!this.doesCategoryHasAdvancedSettings)
      //     url = "./categories/get-category-members/" + this.taskObject.categoryIds[0];          // Fetch all potential members (users)
      // else
      //     url = "./categories-stages/get-category-stage-members/" + this.taskObject.status;               // Fetch specific members assigned to handle category-stage.

      // Clarify with the boss if assignee values must be the same as configured in stage-members? or is stage-members only used for permission to take that action via selectbox?
      // url = "./categories/get-category-members/" + this.taskObject.categoryId;          // Fetch all members to handle this category.
      url = './categories/get-potential-users'; // Fetch all users of this app. (Assignees can be anyone, category members are configured, so that the app knows who can alter the statuses for the corresponding category.)
      // console.log(" getUnpaginatedList of get-potential-users with url ",  url);
      this.getUnpaginatedList('potentialUsers', url); // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
    },
    // This data will be used to filter both members and admins by merging with the result from 'get-associated-people/{workgroup-id}'
    loadPotentialCategories () {
      const url = './categories/list/all'; // Fetch all potential members (users)
      this.getUnpaginatedList('potentialCategories', url); // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
    },
    loadCategoryStages () {
      if (this.taskObject.processTemplateId !== null && this.taskObject.processTemplateId !== undefined) {
        const url = './categories-stages/list/all/' + this.taskObject.processTemplateId;
        console.log('loadCategoryStages() -> from processTemplateId');
        this.getUnpaginatedList('categoryStages', url); // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
      } else {
        const url = './categories-stages/list/default-statuses/all';
        // let url = "./categories-stages/list/authorised/" + this.taskObject.categoryId;          // Fetch all configured stages (If exists in Advanced Settings)
        console.log('loadCategoryStages() -> default-statuses');
        this.getUnpaginatedList('categoryStages', url); // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
      }
    },

    // Callbacks of loadPotentialUsers function.
    handleUnpaginatedListData (listKey, data) {
      if (listKey === 'potentialUsers') { this.handlePotentialUsers(data); } else if (listKey === 'potentialCategories') { this.handlePotentialCategories(data); } else if (listKey === 'subtasks') { this.handleFetchedSubtasks(data); } else if (listKey === 'categoryStages') { this.handleFetchedCategoryStages(data); }
    },
    handleUnpaginatedListDataError (error) {
      console.error('Unpaginated List data fetch error : ', error);
    },

    // Callbacks
    handlePotentialUsersV1 (dataResponse) {
      // Pass it to the availableAssignees prop to the dropdown.
      // console.log("Potential Users fetched for assignees drop down : ", dataResponse);

      const mapFunction = (user) => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          isSelected: false
        };
      };

      const mappedArrayOfUser = dataResponse.data.bean.map(mapFunction);

      const taskAssignees = [];
      const taskFollowers = [];
      mappedArrayOfUser.forEach((user) => {
        const userObj = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          isSelected: false // Set false by default, so that if the workgroup didn't have any member, then all of the available list could be passed to selectbox.
        };

        if (this.taskObject.assigneeIds !== null) {
          this.taskObject.assigneeIds.forEach((memberId) => {
            if (userObj.id === memberId) { userObj.isSelected = true; }
          });
        }
        taskAssignees.push(userObj);
      });

      mappedArrayOfUser.forEach((user) => {
        const userObj = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          isSelected: false // Set false by default, so that if the category didn't have any member, then all of the available list could be passed to selectbox.
        };

        if (this.taskObject.followerIds !== null) {
          this.taskObject.followerIds.forEach((adminId) => {
            if (user.id === adminId) { userObj.isSelected = true; }
          });
        }
        taskFollowers.push(userObj);
      });

      this.availableAssignees = taskAssignees;
      this.availableFollowers = taskFollowers;

      // console.log("this.availableAssignees : ", this.availableAssignees);
      // console.log("this.availableFollowers : " , this.availableFollowers);
    },
    handlePotentialUsers (dataResponse) {
      // Pass it to the availableMembers prop to the dropdown.
      // console.log("Potential Users : ", dataResponse);


      const disableAcronym = false;
      const mappedArrayOfUser = [];
      const mappedArrayOfFollowers = [];

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
                mappedArrayOfFollowers.push({
                  shortLabel: "Work Groups",
                  fullLabel: "Work Groups",
                  hint: "Work Groups",
                  label: "WG",
                  isCategoryLabel: true
                });
                workgroupsFetchedList.map(workGroupMapFunction).forEach(item => {

                  const assigneeItem = {
                    id: item.id,
                    shortLabel: item.shortLabel,
                    fullLabel: item.fullLabel,
                    hint: item.hint,
                    label: item.label,
                    isSelected: false
                  };

                  const followerItem = {
                    id: item.id,
                    shortLabel: item.shortLabel,
                    fullLabel: item.fullLabel,
                    hint: item.hint,
                    label: item.label,
                    isSelected: false
                  };

                  if (this.taskObject.assigneeIds !== null && this.taskObject.assigneeIds !== undefined) {
                    this.taskObject.assigneeIds.forEach((memberId) => {
                      if (assigneeItem.id === memberId) { assigneeItem.isSelected = true; }
                    });
                  }

                  if (this.taskObject.followerIds !== null && this.taskObject.followerIds !== undefined) {
                    this.taskObject.followerIds.forEach((memberId) => {
                      if (followerItem.id === memberId) { followerItem.isSelected = true; }
                    });
                  }

                  mappedArrayOfUser.push(assigneeItem);
                  mappedArrayOfFollowers.push(followerItem);
                });

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
            mappedArrayOfFollowers.push({
              shortLabel: "Users",
              fullLabel: "Users",
              hint: "Users",
              label: "Users",
              isCategoryLabel: true
            });
            dataResponse.data.bean.map(mapFunction).forEach(item => {

              /*
              this.taskObject.assigneeIds.forEach((memberId) => {
                if (item.id === memberId) { item.isSelected = true; }
              });

              mappedArrayOfUser.push(item);
              */


              const assigneeItem = {
                id: item.id,
                shortLabel: item.shortLabel,
                fullLabel: item.fullLabel,
                hint: item.hint,
                label: item.label,
                isSelected: false
              };

              const followerItem = {
                id: item.id,
                shortLabel: item.shortLabel,
                fullLabel: item.fullLabel,
                hint: item.hint,
                label: item.label,
                isSelected: false
              };

              if (this.taskObject.assigneeIds !== null && this.taskObject.assigneeIds !== undefined) {
                this.taskObject.assigneeIds.forEach((memberId) => {
                  if (assigneeItem.id === memberId) { assigneeItem.isSelected = true; }
                });
              }

              if (this.taskObject.followerIds !== null && this.taskObject.followerIds !== undefined) {
                this.taskObject.followerIds.forEach((memberId) => {
                  if (followerItem.id === memberId) { followerItem.isSelected = true; }
                });
              }

              mappedArrayOfUser.push(assigneeItem);
              mappedArrayOfFollowers.push(followerItem);

            });


            this.availableAssignees = mappedArrayOfUser; // When a category is edited, these vals must be merged with existing category members to determine 'isSelected' flag
            this.availableFollowers = mappedArrayOfFollowers;


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
      // Pass it to the availableAssignees prop to the dropdown.
      // console.log("Potential Categories : ", dataResponse);

      // Load the category stages if exists in the Advanced settings.
      // Commented on April 2, 2021 due to the doubt of causing deadlock loops
      // this.loadCategoryStages();

      const mapFunction = (item) => {
        return {
          id: item.id,
          name: item.name,
          isSelected: false
        };
      };

      const mappedArrayOfCategory = dataResponse.data.bean.map(mapFunction);

      const taskCategories = [];
      mappedArrayOfCategory.forEach((item) => {
        const catObj = {
          id: item.id,
          name: item.name,
          isSelected: false // Set false by default, so that if the workgroup didn't have any member, then all of the available list could be passed to selectbox.
        };

        if (this.taskObject.categoryId !== null) {
          if (catObj.id === this.taskObject.categoryId) { catObj.isSelected = true; }
        }
        taskCategories.push(catObj);
      });

      this.availableCategories = taskCategories;
      // console.log("this.availableAssignees : ", this.availableCategories);
    },
    handleFetchedCategoryStages (dataResponse) {
      // Pass it to the availableAssignees prop to the dropdown.
      // console.log("Fetched Category Stages : ", dataResponse);

      if (dataResponse.data.actionResult === 0) {
        // This condition means that the loggedInUser is not a member of this task's category members or the stage members
        // Hence this person cannot alter the tasks.
        // So display only the current status in the "CURRENT STAGE" dropdown.

        this.availableCategoryStages.push({
          id: this.taskObject.status.split('#')[0],
          name: this.taskObject.status.split('#')[1]
        });
        return false;
      }

      const availableCategoryStages = dataResponse.data.bean;

      // If Advanced Stages aren't configured, then prepopulate common stages of basic settings configured in a specific category entry called "Default Category Stages".
      if (availableCategoryStages.length === 0) {
        console.error('Looks like this category has no configured stages, so pulling the default ones.');
        console.error('This caused a deadlock loop. so commented the 2 lines below in the source.');
        // let url = "./categories-stages/list/all/5f9b0e223fccaa680945a3c6/" + this.taskObject.categoryId;  // Fetch the default stages (If nothing exists in Advanced Settings)
        // this.getUnpaginatedList("categoryStages", url);   // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
      } else {
        this.doesCategoryHasAdvancedSettings = true;
      }

      this.availableCategoryStages = availableCategoryStages;
      // this.loadPotentialUsers();
    },

    loadSiblingTasks () {
      if (this.taskObject.parentTaskId !== undefined && this.taskObject.parentTaskId !== null) {
        try {
          const url = './tasks/list/all-subtasks/' + this.taskObject.parentTaskId; // Fetch all subtasks of this subtask's parent id (Sibling tasks || Parallel Tasks)
          // console.log("loading sibling subtasks : " + url);
          this.getUnpaginatedList('subtasks', url); // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
        } catch (e) {
          alert(e);
        }
      }
    },

    // Callbacks of subtasks function.
    handleFetchedSubtasks (dataResponse) {
      // Pass it to the availableDependencySubtasks prop to the dropdown.
      // console.log("Potential Dependency subtasks (siblings) : ", dataResponse);

      const mapFunction = (item) => {
        return {
          id: item.id,
          sno: item.sno,
          name: item.name,
          isSelected: false
        };
      };

      const mappedArrayOfCategory = dataResponse.data.bean.map(mapFunction);

      const dependencySubtasks = [];
      mappedArrayOfCategory.forEach((item) => {
        const dependencyTaskObj = {
          id: item.id,
          sno: 'Task#' + item.sno,
          name: item.name,
          isSelected: false // Set false by default, so that if the workgroup didn't have any member, then all of the available list could be passed to selectbox.
        };

        if (this.taskObject.dependencyTaskIds !== null) {
          this.taskObject.dependencyTaskIds.forEach((dependencyTaskId) => {
            if (dependencyTaskObj.id === dependencyTaskId) { dependencyTaskObj.isSelected = true; }
          });
        }

        if (dependencyTaskObj.id !== this.taskObject.id) // Ignore the primaryTask from showing up with its sibling tasks in the dependency options.
        { dependencySubtasks.push(dependencyTaskObj); }
      });

      this.availableDependencySubtasks = dependencySubtasks;
      // console.log("this.availableDependencySubtasks : ", this.availableDependencySubtasks);
    }

  },
  created: function () {},
  computed: {
    storeCounter: function () {
      // console.log('Accessing vuex store ', this.$store)
      // console.log('Store data accessed from home page : ' + this.$store.getters.count)
      return this.$store.getters.count;
    },
    createdByInitials: function () {
      // console.log(" computedProp createdByInitials : ", this.taskObject.ownedBy);
      if (this.taskObject.ownedBy) {
        const initialsArray = this.taskObject.ownedBy.split(' ');
        const initials = initialsArray[0][0] + initialsArray[1][0];
        return initials;
      }

      return '';
    }
  },
  mounted: function () {

    // console.log("Mounted task-info-form-tab.vue component");
    // this.$store.commit('increment');
    // this.storeCounter();
    // console.log('Accessing vuex store ', this.$store)
    // console.log('Store data accessed from home page : ' + this.$store.getters.count)
    // console.log('Done.........................')

    var today = new Date().toISOString().split('T')[0] + "T00:00"; // we add "T00:00" for type='datelocal-time'
    document.getElementById("startDateTimeInput").setAttribute('min', today);
    document.getElementById("dueDateTimeInput").setAttribute('min', today);
  },
  watch: {

    hideUpdateButton: function (newVal, oldVal) {
      alert(oldVal + " to " + newVal);
    },
    // Since we are passing an asynced data as 'availableItems', it is necessary to watch this prop when it receives new data.
    taskInfo: function (newTaskObject, oldTaskObject) {
      // console.log("task-info-tab's taskInfo changed from " + oldTaskObject.id + " to " + newTaskObject.id);
      this.taskObject = newTaskObject;

      // Take a copy to revert back if in case the update task action fails.
      const taskObjectBeforeSavingChanges = JSON.parse(JSON.stringify(this.taskObject));
      this.taskObjectBeforeChange = taskObjectBeforeSavingChanges;

      // console.log("this.taskObject = ", this.taskObject);
      this.loadPotentialUsers();
      this.loadPotentialCategories();
      this.loadSiblingTasks();
      this.loadCategoryStages();
      // this.getRecord();
    }
  }
};

</script>

<style scoped>

  .task_details_container {
    display: grid;
    grid-template-rows: auto 1fr;
    overflow-y: hidden;
  }

  .task_details_container .task_title {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .task_details_container .task_created_by {
    font-size: 0.65rem;
    font-weight: bold;
  }

  .task_details_container .task_created_on {
    font-size: 0.65rem;
    font-weight: bold;
  }

  .tab-bar > li > a {
    display: flex;
    column-gap: 10px;
  }

  .tab-bar > li .tab_label {
    display: none;
  }

  .tab-bar > li.uk-active .tab_label {
    display: block !important;
  }

  .uk-subnav-pill > * > a {
    font-size: 0.55rem !important;
    border-radius: 0px;
    letter-spacing: 0.075rem;
  }

  .uk-subnav-pill > .uk-active > a {
    border-bottom: 2px solid #3977ff !important;
    color: #4780ff;
    background-color: white !important;
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
    font-size: .66rem;
    text-transform: capitalize;
    letter-spacing: 1px;
    color: black;
  }


  .uk-input, .uk-select:not([multiple]):not([size]) {
      height: 35px;
      vertical-align: middle;
      display: inline-block;
      background: #fbfbfb;
      border-radius: 3px;
  }

</style>
