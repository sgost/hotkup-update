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

  .attachedFormTemplate_row2{
    position: relative;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    -moz-column-gap: 20px;
    column-gap: 20px;
    border-bottom: 1px solid #f3f3f3;
    border-left: 5px solid transparent;
    background-color: rgb(255 255 255);
    font-size: 0.65rem;
  }

  .attachedFormTemplate_row2>div{
    margin-bottom:0px;
  }

</style>

<template>

  <div style="font-size: 0.7rem;background: rgb(249 250 255);background: #fff;display:grid;grid-template-columns:1fr;width:100%;place-items:start center;overflow-y:hidden" class="custom-scroll-bar">
    <div class="stage custom-scroll-bar" style="display: flex;flex-direction: column;place-items: stretch;height: 100%;grid-template-rows: auto 1fr;color: rgb(51, 51, 51);overflow-y: auto;box-sizing: border-box;">
        <div class="" style="padding-top: 0px;padding-bottom: 50px;padding-left: 50px;padding-right: 50px;display: flex;justify-content: center;">

                <form  class="uk-grid-small uk-grid ui-form" uk-grid="" style="width: 85%;place-self: center;" onsubmit="console.log('Submitted.');return false;">
                    <div class="uk-width-2-3@s " style="margin-top: 10px;">
                        <div style="height: 70px;">
                             <label class="uk-form-label">Assign To *</label>
                             <div class="uk-form-controls">
                                 <ui-selectbox v-bind:availableItems="availableAssignees"
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
                             <label class="uk-form-label">Followers</label>
                             <div class="uk-form-controls">
                                 <ui-selectbox v-bind:availableItems="availableFollowers"
                                               v-bind:name=" uniqueComponentId + '_NewTaskFollowers'"
                                                      tagProperty="firstName"
                                                      displayLabelProps="firstName,lastName"  maxTagsToDisplay="4"
                                                      searchProperty="firstName,lastName"
                                                      data_tabindex="2"
                                                      v-on:selectBoxUpdate="updateFollowersEmitEvent($event)"/>
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

                    <div class="uk-width-1-1 uk-grid-margin uk-first-column " style="margin-bottom: 15px;" v-show="!showExtraOptions"><a v-on:click="showMoreOptions()">Show Extra Fields</a></div>
                    <div class="uk-width-1-1 uk-grid-margin uk-first-column " style="margin-bottom: 15px;" v-show="showExtraOptions"><a v-on:click="hideMoreOptions()">Hide Extra Fields</a></div>

                    <div class="uk-width-1-3@s uk-grid-margin uk-first-column " v-show="showExtraOptions" style="margin-top: 0px;">
                        <label class="uk-form-label" for="form-stacked-text">Category</label>
                        <select disabled class="uk-select"  uk-tooltip="The Category cannot be changed once a template is selected.">
                            <option v-if="chosenTaskCategory!==null" v-bind:value="chosenTaskCategory.id" :selected="true">{{chosenTaskCategory.name}}</option>
                        </select>
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin " v-show="showExtraOptions" style="margin-top: 0px;">
                        <label class="uk-form-label" for="form-stacked-text">Priority</label>
                        <select tabindex="3" v-model="taskObject.priority" class="uk-select" id="form-stacked-select">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Critical</option>
                        </select>
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin " v-show="showExtraOptions" style="margin-top: 0px;">
                        <label class="uk-form-label" for="form-stacked-text">Stage</label>
                        <select  v-model="taskObject.status" class="uk-select" tabindex="4">
                            <option v-for="item in templateStatuses" v-bind:value="item.id">{{item.name}}</option>
                        </select>
                    </div>

                    <div class="uk-width-1-3@s uk-grid-margin uk-first-column " v-show="showExtraOptions" style="margin-top: 15px;margin-bottom: 15px;">
                        <label class="uk-form-label" >Due Date</label>
                        <div class="uk-form-controls">
                          <input  v-model="taskObject.dueDateTime" class="uk-input" type="datetime-local" placeholder="" tabindex="7">
                        </div>
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin" v-show="showExtraOptions" style="margin-top: 15px;margin-bottom: 15px;">
                        <label class="uk-form-label" >Estd. Duration</label>
                        <div class="uk-form-controls" style="display:flex">
                          <input  v-model="taskObject.estDuration" onkeypress="return event.charCode >= 48" min="1"  class="uk-input" dir="rtl" type="number" style="border-right: 0px;border-top-right-radius:0px;border-bottom-right-radius:0px;text-align:right" tabindex="8">
                          <select v-model="taskObject.estDurationUnit"  class="uk-select" id="form-horizontal-select" style="border-top-left-radius:0px;border-bottom-left-radius:0px" tabindex="9">
                              <option>Hours</option>
                              <option>Days</option>
                              <option>Weeks</option>
                          </select>
                        </div>
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin " v-show="showExtraOptions" style="margin-top: 0px;margin-bottom: 15px;">
                        <!-- <div style="height: 70px;">
                            <label class="uk-form-label" >Labels</label>
                            <div class="uk-form-controls">
                                <ui-selectbox v-bind:availableItems="availableLabels"
                                                     name="Labels"
                                                     tagProperty="name"
                                                     displayLabelProps="name"  maxTagsToDisplay="3"
                                                     searchProperty="name"
                                                     data_tabindex="10"/>
                            </div>
                        </div> -->
                    </div>
                    <div class="uk-width-1-1 uk-grid-margin uk-first-column " style="margin-top: 0px;"><hr></div>

                    <div class="uk-width-1 uk-grid-margin ">
                          <div v-if="attachedChecklistItems!==null && attachedChecklistItems!==undefined" class="uk-form-label" style="background: rgb(252 255 177);display: inline;padding: 5px 10px;color: #343434;border-radius: 3px;margin-bottom: 10px;">Attached Checklist - {{attachedChecklistItems.length}} items</div>
                          <div v-if="attachedChecklistItems!==null && attachedChecklistItems!==undefined" style="padding-top:10px;">
                            <template v-for="item,index in attachedChecklistItems">
                                <div style="padding: 10px 10px;display: flex;border-bottom: 1px solid #d0d0d0;column-gap: 20px;margin-right: 0px;margin-left: 0px;">
                                    <div style="width:10px">
                                      <div style="border:1px solid #555;height: 15px;width: 15px;cursor:pointer">
                                          <span v-show="item.status==='COMPLETED'" uk-icon="check" style="background: rgb(37, 139, 255);color: white;"></span>
                                      </div>
                                    </div>
                                    <div style="flex-grow:1" v-if="item.status==='COMPLETED'">
                                      {{index+1}}. <span style="text-decoration: line-through red;">{{item.activityName}}</span>
                                    </div>
                                    <div style="flex-grow:1" v-if="item.status!=='COMPLETED'">
                                      {{index+1}}. {{item.activityName}}  [ Stage - {{item.stageName}} ]&nbsp; &nbsp; &nbsp; &nbsp;
                                    </div>
                                    <div v-if="item.status!=='COMPLETED'"  style="min-width:100px;display:none">
                                      <!--
                                        <a v-on:click="updateChecklistItem(item)">Edit</a>&nbsp;|&nbsp;<a v-on:click="removeChecklistItem(item)">Remove</a>
                                      -->
                                    </div>
                                </div>
                            </template>
                          </div>
                          <div v-if="attachedForms!==null && attachedForms!==undefined" class="uk-form-label"><br></div>
                          <div v-if="attachedForms!==null && attachedForms!==undefined" class="uk-form-label"  style="background: rgb(252 255 177);display: inline;padding: 5px 10px;color: #343434;border-radius: 3px;margin-bottom: 10px;">Attached Forms - {{attachedForms.length}} forms</div>
                          <div v-if="attachedForms!==null && attachedForms!==undefined" style="padding-top:10px">
                            <template v-for="attachedFormTemplate,idx in attachedForms">

                                <div class="attachedFormTemplate_row2" >
                                  <div style="font-weight:normal;flex-basis: 100%;" >
                                    <a uk-tooltip="title:Click to edit form attachment info;pos:right" v-on:click="viewFormAttachment(attachedFormTemplate, attachedFormTemplate.formTemplateId, attachedFormTemplate.formTemplateName)">{{idx+1}}. {{attachedFormTemplate.formTemplateName}}</a>
                                  </div>
                                </div>

                            </template>
                          </div>
                          <div class="uk-form-label"><br></div>
                    </div>

                    <div class="uk-width-1-1"
                         style="border-top: 0px solid rgb(241, 241, 241);padding: 0px 0px;margin: 0px 0px 0px 15px;display: flex;flex-direction: column;">
                        <div style="display:grid">
                        </div>

                        <!--
                        <div style="display: grid;padding:0px;" v-show="showExtraOptions">
                            <div style="    background: white;width:100%;place-self:center;margin-top:20px;border: 1px dashed rgb(189 189 189);height: 70px;display: grid;place-items: center;margin-bottom: 20px;">
                              <div style="display:grid;grid-template-columns:auto auto;place-items:center center;column-gap: 10px;">
                                  <div class="mini-btn">Add Checklist</div>
                                  <div class="mini-btn">Add Form</div>
                              </div>
                            </div>
                        </div>
                        -->

                        <div style="display: flex;place-self:end;column-gap:20px;padding-right: 15px;">
                            <button tabindex="11" id="saveButton" v-on:click="save()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: #4caf50;border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: auto;">
                            <div style="display: grid;grid-template-columns: auto auto;place-items: center;">
                              <div>
                                <span class="lnr lnr-location"></span>
                              </div>
                              <div>&nbsp;&nbsp;&nbsp;Send Task</div>
                            </div>
                            </button>
                            <button tabindex="12" id="discardButton" v-on:click="discard()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" data-v-2d9397b1="" style="background-color: rgb(234 234 234);border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: auto;margin-top: 0px;color: #565656;"><div><div >Discard</div></div></button>
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

  props: ['resetTime', 'chosenTaskTemplate', 'chosenTaskCategory'],
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
    },
    chosenTaskCategory: function (newVal, oldVal) {
      console.log('chosenTaskCategory id has changed from ', oldVal, ' to ', newVal);

      if (newVal !== null) {
        this.taskObject.categoryId = newVal.id;
        this.loadTemplateData();
      }
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
      showExtraOptions: false,

      templateStatuses: [],
      attachedChecklistItems: [],
      attachedForms: []
    };
  },
  methods: {

    loadTemplateData () {
      // Fetch the template's configured checklist items
      const url1 = './category-processes/get/' + this.chosenTaskTemplate.id;
      try {
        axios.get(process.env.VUE_APP_API_URL + url1)
          .then((dataResponse) => {
            if (dataResponse.data.actionResult == 1) {
              const categoryProcess = dataResponse.data.bean;
              console.log('loadTemplateData - loading categoryProcess for fetching checklist = ', categoryProcess);

              this.attachedChecklistItems = categoryProcess.checklist;
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
      } catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }

      // Fetch the template's attached forms.
      const url2 = './category-processes/list-attached-forms/' + this.chosenTaskTemplate.id;
      try {
        // VueJS ajax call-1
        axios.get(process.env.VUE_APP_API_URL + url2)
          .then((dataResponse) => {
            this.attachedForms = [];
            console.log('loadTemplateData - FormTemplate Attachment List: ', dataResponse);
            const list = dataResponse.data.bean;

            list.forEach((item) => {
              if (item.createdOn !== null) {
                // item.createdOn = new Date(item.createdOn).toLocaleString()
                //                                          .slice(0, 17)
                //                                          .replace(',', '')
                //                                          .replace('T',' ');

                // Added during "Fix-Date-UTC-Update"
                item.createdOn = new Date(item.createdOn + ' UTC').toLocaleString();
              }

              item.hide = false;
              this.attachedForms.push(item);
            });
          })
          .catch((error) => {
            console.error('FormTemplate Attachment Fetch Error : ', error);
          });
      } catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }

      // Fetch the template's statuses
      const url3 = './categories-stages/list/all/' + this.chosenTaskTemplate.id;
      try {
        // VueJS ajax call-1
        axios.get(process.env.VUE_APP_API_URL + url3)
          .then((dataResponse) => {
            console.log('loadTemplateData - Statuses List: ', dataResponse);
            const list = dataResponse.data.bean;
            this.templateStatuses = list;
          })
          .catch((error) => {
            console.error('FormTemplate Attachment Fetch Error : ', error);
          });
      } catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }
    },
    showMoreOptions () {
      this.showExtraOptions = true;
    },
    hideMoreOptions () {
      this.showExtraOptions = false;
    },
    someFunction (elem) {

    },
    discard () {
      this.$emit('signalCloseNewTaskModal', {}); // send signal to close this modal
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
          status: item.status,
          isSelected: false
        };
      };

      const mappedArrayOfCategories = dataResponse.data.bean.map(mapFunction);
      const filteredArrayOfActiveCategories = mappedArrayOfCategories.filter(item => item.status === "ACTIVE");

      this.availableCategories = filteredArrayOfActiveCategories; // When a category is edited, these vals must be merged with existing category members to determine 'isSelected' flag


      // const mappedArrayOfCategories = dataResponse.data.bean.map(mapFunction);
      // this.availableCategories = mappedArrayOfCategories; // When a category is edited, these vals must be merged with existing category members to determine 'isSelected' flag

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
        categoryId: this.chosenTaskCategory.id,
        processTemplateId: this.chosenTaskTemplate.id,
        labelIds: this.taskObject.labelIds,
        ownerId: this.taskObject.ownerId,
        clientTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };

      // Add the attached checklist
      if (this.attachedChecklistItems !== null && this.attachedChecklistItems !== undefined) {
        // form.checklistItems = this.attachedChecklistItems.map(item => item.activityName);
        form.checklistItems = this.attachedChecklistItems; // Attach the entire checklist itself.
      }

      if (this.attachedForms !== null && this.attachedForms !== undefined) {
        form.attachedFormsList = this.attachedForms.map(item => {

          const itemShort = {
            formTemplateId: item.formTemplateId, // This is for normal forms.
            tabularFormTemplateId: item.tabularFormTemplateId, // This is for Tabular Forms.
            formTemplateName: item.formTemplateName,
            stageId: item.stageId
          };

          return itemShort;
        });
      }

      console.log(form);
      // return false;

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
            this.$emit('signalCloseNewTaskModal', {}); // send signal to close this modal
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
