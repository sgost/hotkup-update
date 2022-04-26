<template>
    <div style="position:relative">
        <span v-on:click="changeWireframe()" style="position: absolute;right: 5px;top: -15px;opacity: 0;cursor: pointer;">{{wireframeLabel}}</span>
        <form style="width: 90%;margin-top: 15px;padding-top: 10px;padding-right: 30px;padding-left: 30px;margin-left: 0px;"
              class="uk-grid-small search-tasks-form" uk-grid  v-show="wireframe=='existing_format'"
              onsubmit="return false;">

            <!--
            <div class="uk-width-2-3@s uk-first-column ">
                <label class="uk-form-label" v-on:click="showSectionLabels=!showSectionLabels">Task Name *</label>
                <div class="uk-form-controls">
                  <input v-model="taskObject.name" class="uk-input" type="text" placeholder=""  tabindex="1">
                </div>
            </div>
            <div class="uk-width-1-3@s uk-grid-margin">

            </div>
            -->

            <div class="uk-width-1-3@s uk-grid-margin uk-first-column ">
                <div style="height: 70px;">
                    <label class="uk-form-label" >Category *</label>
                    <div class="uk-form-controls">

                          <!--
                          <ui-selectbox v-bind:availableItems="availableCategories"
                                             name="Categories"
                                             tagProperty="name"
                                             displayLabelProps="name"  maxTagsToDisplay="3"
                                             searchProperty="name"
                                             data_tabindex="4"
                                             v-on:selectBoxUpdate="updateCategoriesEmitEvent($event)"/>
                         -->
                         <ui-selectbox v-bind:availableItems="availableCategories"
                                              name="Categories"
                                              tagProperty="name"
                                              displayLabelProps="name" maxTagsToDisplay="3"
                                              searchProperty="name"
                                              data_tabindex="6"
                                              v-on:selectBoxUpdate="updateCategoriesEmitEvent($event)"
                                              allowSingleSelectOnly="true"/>
                    </div>
                </div>
            </div>
            <div class="uk-width-1-3@s uk-grid-margin">
                <!--<label class="uk-form-label" for="form-stacked-text">Status</label>
                <div style="position:relative">
                    <select  v-model="taskObject.status" class="uk-select" tabindex="4">
                        <template v-for="stage in availableCategoryStages">
                            <option v-bind:value="stage.id + '#' + stage.name" v-bind:selected="taskObject.status==stage.id+'#'+stage.name" >{{stage.name}}</option>
                        </template>
                    </select>
                    <div style="position:absolute;right: 7px;top: 9px;pointer-events: none;"><span class="uk-icon" uk-icon="triangle-down"></span></div>
                </div>-->
                <label class="uk-form-label" for="form-stacked-text">Status</label>
                <div style="position:relative">
                    <select  v-model="taskObject.status" class="uk-select"   tabindex="4">
                        <option>Active</option>
                        <option>Completed</option>
                    </select>
                    <div style="position:absolute;right: 7px;top: 9px;pointer-events: none;"><span class="uk-icon" uk-icon="triangle-down"></span></div>
                </div>
            </div>
            <div class="uk-width-1-3@s uk-grid-margin">
                <label class="uk-form-label" for="form-stacked-text">Priority </label>
                <div style="position:relative">
                    <select  v-model="taskObject.priority" class="uk-select"   tabindex="4">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                    </select>
                    <div style="position:absolute;right: 7px;top: 9px;pointer-events: none;"><span class="uk-icon" uk-icon="triangle-down"></span></div>
                </div>
            </div>

            <div class="uk-width-1-3@s uk-grid-margin">
              <div style="height: 70px;">
                   <label class="uk-form-label">Assignee</label>
                   <div class="uk-form-controls">
                       <ui-selectbox v-bind:availableItems="availableAssignees"
                                            name="Assignee"
                                            tagProperty="firstName"
                                            displayLabelProps="firstName,lastName" maxTagsToDisplay="4"
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
                         <ui-selectbox v-bind:availableItems="availableFollowers"
                                              name="Followers"
                                              tagProperty="firstName"
                                              displayLabelProps="firstName,lastName"  maxTagsToDisplay="4"
                                              searchProperty="firstName,lastName"
                                              data_tabindex="3"
                                              v-on:selectBoxUpdate="updateFollowersEmitEvent($event)"/>
                     </div>
                </div>
            </div>
            <div class="uk-width-1-3@s uk-grid-margin">
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

            <div class="uk-width-1-3@s uk-grid-margin" style="height: 70px;">
                <label class="uk-form-label" >Start Date (On/From)</label>
                <div class="uk-form-controls">
                  <input  v-model="taskObject.startDateTimeFrom" class="uk-input" type="date" placeholder="" tabindex="8">
                </div>
            </div>
            <div class="uk-width-1-3@s uk-grid-margin">
                <label class="uk-form-label" >To</label>
                <div class="uk-form-controls">
                  <input  v-model="taskObject.startDateTimeTo" class="uk-input" type="date" placeholder="" tabindex="5">
                </div>
            </div>
            <div class="uk-width-1-3@s uk-grid-margin">
            </div>

            <div class="uk-width-1-3@s uk-grid-margin" style="height: 70px;">
                <label class="uk-form-label" >Due Date (On/From)</label>
                <div class="uk-form-controls">
                  <input  v-model="taskObject.dueDateTimeFrom" class="uk-input" type="date" placeholder="" tabindex="8">
                </div>
            </div>
            <div class="uk-width-1-3@s uk-grid-margin">
                <label class="uk-form-label" >To</label>
                <div class="uk-form-controls">
                  <input  v-model="taskObject.dueDateTimeTo" class="uk-input" type="date" placeholder="" tabindex="5">
                </div>
            </div>
            <div class="uk-width-1-3@s uk-grid-margin">
            </div>

            <div class="uk-width-1-1" style="border-top: 1px solid rgb(236 236 236);padding: 20px 0px;margin: 15px 0px 0px 15px;display: flex;flex-direction: column;">
                <div style="display: flex;place-self:end;column-gap:20px;padding-right: 15px;">
                    <button tabindex="10" id="saveButton" v-on:click="save()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(255 255 255);color: #1f69bd;border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: auto;">
                      <div style="display: grid;grid-template-columns: auto auto;">
                        <div>
                          <span class="lnr lnr-magnifier"></span>
                        </div>
                        <div>&nbsp;&nbsp;&nbsp;Search Tasks</div>
                      </div>
                    </button>
                    <button tabindex="11" id="discardButton" v-on:click="resetSearchFilters()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" data-v-2d9397b1="" style="background-color: rgb(234 234 234);border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: auto;margin-top: 0px;color: #565656;"><div><div >Reset</div></div></button>
                </div>
            </div>
        </form>

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
  props: ['taskInfo'],
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

      taskObject: {},
      taskTransitionUpdate: {},
      doesCategoryHasAdvancedSettings: false
    };
  },
  methods: {
    resetSearchFilters () {
      this.taskObject = {};
      this.taskObject.assigneeIds = [];
      this.taskObject.followerIds = [];
      this.loadPotentialCategories();
      this.loadPotentialUsers();
    },
    save () {
      // if(!this.doValidation())
      //    return false; // stop here if form is invalid.

      const btnText = document.getElementById('saveButton').innerHTML;
      document.getElementById('saveButton').innerHTML = 'Searching..';
      this.disableHTMLElement(document.getElementById('saveButton'));

      const post_url = './tasks/save';
      // console.log("Posting data to : " + post_url);
      // console.log("Before making form-data , " , this.taskObject);
      const form = {
        id: this.taskObject.id,
        name: this.taskObject.name,
        type: this.taskObject.type,
        priority: this.taskObject.priority,
        status: this.taskObject.status,
        description: this.taskObject.description,
        estimatedDuration: this.taskObject.estimatedDuration,
        estimatedDurationUnit: this.taskObject.estimatedDurationUnit,
        assigneeIds: this.taskObject.assigneeIds,
        followerIds: this.taskObject.followerIds,
        categoryIds: this.taskObject.categoryIds,
        labelIds: this.taskObject.labelIds,
        ownerId: this.taskObject.ownerId
        // dependencyTaskIds : this.taskObject["dependencyTaskIds"]
      };

      if (this.taskObject.startDateTimeFrom !== undefined && this.taskObject.startDateTimeFrom !== null && this.taskObject.startDateTimeFrom !== '') {
        form.startDateTimeFrom = new Date(this.taskObject.startDateTimeFrom).toLocaleString();
      }

      if (this.taskObject.startDateTimeTo !== undefined && this.taskObject.startDateTimeTo !== null && this.taskObject.startDateTimeTo !== '') {
        form.startDateTimeTo = new Date(this.taskObject.startDateTimeTo).toLocaleString();
      }

      if (this.taskObject.dueDateTimeFrom !== undefined && this.taskObject.dueDateTimeFrom !== null && this.taskObject.dueDateTimeFrom !== '') {
        form.dueDateTimeFrom = new Date(this.taskObject.dueDateTimeFrom).toLocaleString();
      }

      if (this.taskObject.dueDateTimeTo !== undefined && this.taskObject.dueDateTimeTo !== null && this.taskObject.dueDateTimeTo !== '') {
        form.dueDateTimeTo = new Date(this.taskObject.dueDateTimeTo).toLocaleString();
      }

      if (form.followerIds === null) { form.followerIds = []; }

      // console.log("Category 1 is ", (form["categoryIds"])[0] );

      console.log('Task Search Filter Data : ', form);

      this.$emit('filterTasks', form);
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
      console.log('CategoryIds : ', data);
      if (data != null) { this.taskObject.categoryIds = data.id; } else { this.taskObject.categoryIds = null; }
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

    // This data will be used to filter both members and admins by merging with the result from 'get-associated-people/{workgroup-id}'
    loadPotentialUsers () {
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
      const url = './categories-stages/list/authorised/' + this.taskObject.categoryId; // Fetch all configured stages (If exists in Advanced Settings)
      this.getUnpaginatedList('categoryStages', url); // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
    },

    // Callbacks of loadPotentialUsers function.
    handleUnpaginatedListData (listKey, data) {
      if (listKey === 'potentialUsers') { this.handlePotentialUsers(data); } else if (listKey === 'potentialCategories') { this.handlePotentialCategories(data); } else if (listKey === 'subtasks') { this.handleFetchedSubtasks(data); } else if (listKey === 'categoryStages') { this.handleFetchedCategoryStages(data); }
    },
    handleUnpaginatedListDataError (error) {
      console.error('Unpaginated List data fetch error : ', error);
    },

    // Callbacks
    handlePotentialUsers (dataResponse) {
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
    handlePotentialCategories (dataResponse) {
      // Pass it to the availableAssignees prop to the dropdown.
      // console.log("Potential Categories : ", dataResponse);

      // Load the category stages if exists in the Advanced settings.
      this.loadCategoryStages();

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
      if (availableCategoryStages !== undefined && availableCategoryStages !== null && availableCategoryStages.length === 0) {
        // console.log("Looks like this category has no configured stages, so pulling the default ones.");
        const url = './categories-stages/list/all/5f9b0e223fccaa680945a3c6/' + this.taskObject.categoryId; // Fetch the default stages (If nothing exists in Advanced Settings)
        this.getUnpaginatedList('categoryStages', url); // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
      } else {
        this.doesCategoryHasAdvancedSettings = true;
      }

      this.availableCategoryStages = availableCategoryStages;
      this.loadPotentialUsers();
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

    this.taskObject.assigneeIds = [];
    this.taskObject.followerIds = [];
    this.loadPotentialCategories();
    this.loadPotentialUsers();
  },
  watch: {

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
      font-size: .5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
  }


  .uk-form-label{
      font-size: .56rem;
      text-transform: uppercase;
      letter-spacing: 1px;
  }

  .uk-input, .uk-select:not([multiple]):not([size]) {
      height: 35px;
      vertical-align: middle;
      display: inline-block;
      background: #fbfbfb;
      border-radius: 3px;
  }

  .search-tasks-form .uk-form-label{
    color:white;
  }
</style>
