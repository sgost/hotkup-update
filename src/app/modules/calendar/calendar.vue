<style scoped>

  .uk-dropdown-nav {
      font-size: .975rem;
  }

  .app_container {
    background-color: white;
  }

  .desktop{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 40px 1fr;
    overflow-y: hidden;
    border: 0px solid red;
    padding: 20px 30px;
  }

  .adk_columns{
    grid-template-columns:9fr 1fr 2fr 2fr 20px 4fr;
  }

    .right-panel-containerX{
      margin: 20px;
      border: 1px solid #33333345;
    }

    .counter_label{
      color: white!important;
      background-color: rgb(3, 169, 244)!important;
      border-radius: 10%;
      padding: 2px 5px;
      margin-left: 5px;
      border: 1px solid #8080802e;
    }

    .selected_chat:after{
        content:"";
        position:absolute;
        height:0;
        width:0;
        left:100%;
        top:0;
        border:20px dotted transparent;
        border-left: 20px dotted red;
    }

    .selected_chat_itemX{
      background: #fff !important;
      border-left: 5px solid #3b8eff!important;
    }

    .ui_grid_row{
      border-left: 5px solid transparent;
    }

    .ui_grid_row:hover{
      cursor:pointer;
    }

      .list-row {
        height: 75px;
        grid-template-rows: auto auto;
        border-bottom: .05em solid #e5e5e5;
        background: #fbfbfb;
      }

      .list-row.active {
        border-left: 5px solid #1f69bd;
      }

      .list-row:hover {
        background: #ffffff;
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
        font-size: 0.75rem;
      }

      .list-row .task-status {
        font-weight: bold;
        font-size: 0.5rem;
        letter-spacing: 0.5px;
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

      .or_div::before{
          content: "OR";
          position: absolute;
          width: 40px;
          height: 40px;
          right: auto;
          left: -20px;
          top: 50%;
          z-index: 0;
          background: #696969;
          color: #f7f7f7;
          border: 0 solid red;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
      }

      .calendar{
        display: flex;
        width: 100%;
        box-sizing: border-box;
        transition: .5s linear;
        margin: 0px;
        font-size: 0.675rem;
      }

      .hide-calendar{
        opacity: 0;
      }

      .side-bar-light-calendar-ui {
        /* background: #f9faff; */
        background: #fff;
        color: #333;
        font-size: .5rem;
        border-right: 1px solid #ccc;
        border-top: 1px solid #ccc;
        margin-top: 10px;
        top: 50px;
        border-top-right-radius: 10px;
        min-width: 175px!important;
        padding: 10px 10px;
      }




</style>

<template>

  <div class="app_container" style="background: rgb(255, 255, 255);grid-template-columns:2fr 5fr ;display: flex;box-sizing: border-box;width: 100%;">

      <div id="appSideMenu" class="app-side-menu" style="flex-basis: 10%;position: relative;padding: 0px 0px 0px;overflow-y: hidden;display: flex;flex-direction: column;background: rgb(255, 255, 255);color: rgb(51, 51, 51);">
          <div vv-if="loggedInUser.isInformationFetchComplete"  id="offcanvas-nav" style="height:100%;display: flex;flex-direction:column">

            <div class="uk-offcanvas-bar0 custom-scroll-bar side-bar-light" style="flex-grow:1">

                <div>
                  <div style="min-height: 75px;opacity: 1;display: flex;align-items: center;justify-content: center;">
                      <div style="position:relative">
                        <button id="new_task_button_calendar" v-on:click="sendNewTaskEvent()" xv-on:click="goTo('create-task-page')" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                                style="background-color: #1f69bd;background-color:rgb(37, 139, 255); border-radius: 3px; place-self: center center; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 30px; font-weight: normal !important;;border-bottom-right-radius: 0px;border-top-right-radius: 0px;">
                          <span uk-icon="icon:file-edit;ratio:0.75"></span>
                          <span style="margin-left:5px"> New Task</span>
                        </button>
                        <button v-on:click="handleNewTaskOptionsClick()" xv-on:click="goTo('create-task-page')" class="new_task_options_trigger_button clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                                style="background-color: rgb(37, 139, 255);border-radius: 0px 3px 3px 0px;place-self: center;place-items: center;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-top: 0px;margin-left: 0.045rem;padding: 0px;height: 32px;">
                              <span uk-icon="triangle-down" class="uk-icon" style="pointer-events:none"></span>
                        </button>
                        <div id="new_task_button_calendar_options" class="new_task_options">
                            <div id="menu" class="menu menu_fixed_height">
                                <div v-on:click="createTask('template')"  uk-tooltip="title:Create task from a process template;pos:right">
                                    <span class="lnr lnr-file-empty" style=""></span>
                                    <span style="padding-left: 10px;">Create Task from Template</span>
                                </div>
                                <div v-on:click="createTask('scheduled')" uk-tooltip="title:Create a task that will run once in the future;pos:right">
                                    <ui-icon name="scheduled_tasks" style="color: rgb(0 0 0 / 78%) !important;"/>
                                    <span style="padding-left:10px;">Schedule a Task from Template</span>
                                </div>
                                <div v-on:click="createTask('recurring')" uk-tooltip="title:Create a task that repeats in the future;pos:right">
                                    <ui-icon name="recurring_tasks" style="color: rgb(0 0 0 / 78%) !important;"/>
                                    <span style="padding-left:10px;">Create a Recurring Task from Template</span>
                                </div>
                           </div>
                        </div>
                      </div>
                  </div>

                  <div>
                    <hr>
                  </div>
                </div>
                <ul class="uk-nav uk-nav-default">

                    <li class="uk-active menu-item" id="inbox_menu">
                      <a v-on:click="loadFilteredTasks('inbox','inbox_menu', 'Inbox')" xv-on:click="goToPage('view-task-inbox',{'taskId':'all','subtaskId':'none'})">
                        <span class="lnr lnr-inbox"></span>&nbsp;&nbsp;Inbox
                        <!-- <span class="counter-label" id="inbox_count"></span> -->
                      </a>
                    </li>

                    <!--
                    <li>
                      <a v-on:click="goToPage('view-task-inbox',{})">
                        <span class="lnr lnr-inbox"></span>&nbsp;&nbsp;Inbox-GM
                        <span class="counter-label">(10)</span>
                      </a>
                    </li>

                    <li>
                      <a v-on:click="goToPage('view-private-task-inbox',{})">
                        <span class="lnr lnr-lock"></span>&nbsp;&nbsp;Private Inbox
                        <span class="counter-label">(2)</span>
                      </a>
                    </li>
                    <li class="menu-item" id="draft_tasks_menu">
                      <a v-on:click="loadFilteredTasks('draft','draft_tasks_menu', 'Drafted Tasks')">
                        <span class="lnr lnr-file-empty"></span>&nbsp;&nbsp;Drafts
                      </a>
                    </li>-->
                    <li class="menu-item" id="sent_tasks_menu">
                      <a v-on:click="loadFilteredTasks('sent','sent_tasks_menu', 'Sent Tasks')">
                        <span class="lnr lnr-location"></span>&nbsp;&nbsp;Sent
                        <!-- <span class="counter-label" id="sent_count"></span> -->
                      </a>
                    </li>
                    <li class="menu-item" id="completed_tasks_menu">
                      <a v-on:click="loadFilteredTasks('completed','completed_tasks_menu', 'Completed Tasks')">
                        <span class="lnr lnr-checkmark-circle"></span>&nbsp;&nbsp;Completed
                        <!-- <span class="counter-label" id="completed_count"></span> -->
                      </a>
                    </li>
                    <li class="menu-item" id="overdue_tasks_menu">
                      <a v-on:click="loadFilteredTasks('overdue','overdue_tasks_menu', 'Overdue Tasks')">
                        <span class="lnr lnr-clock"></span>&nbsp;&nbsp;Overdue
                        <!-- <span class="counter-label" id="overdue_count"></span> -->
                      </a>
                    </li>

                    <li class="uk-nav-header sidebar-category-dropdown" style="margin-top: 15px;">
                          <a style="color: #333!important;font-weight: normal!important;font-size: .55rem;">
                            My Categories
                            <span class="counter-label" v-on:click="toggleCategoryMenu()">
                                <span uk-icon="icon:chevron-down;ratio:0.85" id="category_menu_trigger_calendar" class="uk-icon" style="transition: 0.25s linear;"></span>
                            </span>
                          </a>
                    </li>
                    <li class="uk-parent" id="category_submenu_calendar" style="display:none">
                        <ul class="uk-nav-sub" style="max-height: 300px;height: 300px;overflow-y: auto;">
                            <template v-for="category in myCategoriesList">
                                <li class="menu-item" v-bind:id="'cat_' + category.id">
                                  <a v-on:click="loadTasksFromCategory(category)">{{category.name}}
                                    <!-- <span class="counter-label" v-bind:id="'calendar_cat_count_'  + category.id">0</span> -->
                                  </a>
                                </li>
                            </template>
                        </ul>
                    </li>
                </ul>

            </div>


          </div>
      </div>

      <div class="pane-detail-view" style="position:relative;flex-direction: column;flex-basis: 50%;overflow-y: hidden;display: flex;flex-grow: 1;box-sizing: border-box;padding: 40px 0px 0px 0px;margin-bottom: 0px;align-items: center;justify-content: start;">
          <div id="calendar" class="calendar hide-calendar" style="background-color:white;padding-bottom:0px;z-index:2"></div>
          <div style="position:absolute;display:grid;place-items: center;z-index:1;;top: 0px;right: 0px;left: 0px;bottom: 0px;margin: auto;" id="calendar_loading_indicator" >Loading calendar..</div>
      </div>

      <div  class="app-side-menu" style="flex-basis: 25%;position: relative;padding: 15px 0px 0px;overflow-y: hidden;display: flex;flex-direction: column;background: rgb(255, 255, 255);color: rgb(51, 51, 51);border-top-left-radius: 10px;border-left: 1px solid #ccc;border-top: 1px solid #ccc;margin-top: 20px;margin-left: 20px;">
          <div style="padding:10px;display:flex;flex-direction:column;font-size:0.75rem">
              <div>
                <div style="display: flex;gap: 10px;align-items: center;"><div style="background: #4caf50;width:10px;height:10px;border-radius: 50%;"></div> Start Date Elapsed</div>
                <div style="display: flex;gap: 10px;align-items: center;"><div style="background: #f91368;width:10px;height:10px;border-radius: 50%;"></div> Due Date Elapsed</div>
                <div style="display: flex;gap: 10px;align-items: center;"><div style="background: #03a9f4;width:10px;height:10px;border-radius: 50%;"></div> Not Timebound</div>
              </div>
          </div>
      </div>

      <div id="newTaskFromConversationModal" class="uk-flex-top" uk-modal>
          <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="width: 75%;font-size: 0.65rem;padding: 100px;background: rgb(251 251 251 / 5%);background-image: radial-gradient(#ffffff, #ffffffc7);    border-radius: 3px;">
              <button class="uk-modal-close-default" type="button" uk-close></button>
              <div style="font-size: 0.7rem;xbackground: #fbfbfb;;display:grid;grid-template-columns:1fr;width:100%;place-items:start start;overflow-y:auto" class="custom-scroll-bar">
                <div class="stage" style="display:flex;flex-direction:row">

                      <div class="" style="flex-basis: 50%;flex-grow:1;display:flex;align-items: center;padding-top: 30px;padding-bottom:30px;padding-left: 50px;padding-right: 50px;">

                        <form autocomplete="off" class="uk-grid-small uk-grid" uk-grid onsubmit="return false;">

                              <div class="uk-width-1-1 uk-grid-margin uk-first-column " style="z-index: 1;">
                                  <div style="height: 70px;">
                                       <label class="uk-form-label">Category</label>
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

                              <div class="uk-margin uk-grid-margin uk-first-column">
                                  <div class="uk-inline">
                                      <a tabindex="6" id="saveButton1" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(2 119 254); border-radius: 2px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="save('saveButton1')" >
                                        Create Conversation for Category
                                      </a>
                                      &nbsp;&nbsp;&nbsp;
                                      <!--<a tabindex="7" class="clickable-btn uk-button uk-button-danger uk-button-small uk-first-column end-call-button" style="background-color: rgba(253, 253, 253, 0.99); color: rgb(111, 111, 111); border: 1px solid rgb(183, 183, 183); border-radius: 3px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="goBack()" >Exit</a>-->
                                  </div>
                              </div>
                          </form>
                      </div>

                      <div class="or_div" style=";position:relative;flex-basis: 50%;border-left:1px solid #d8d8d8;flex-grow:1;display:flex;padding-top: 30px;padding-bottom:30px;padding-left: 50px;padding-right: 50px;">

                          <form autocomplete="off" class="uk-grid-small uk-grid" uk-grid onsubmit="return false;">

                                <div class="uk-width-1-1 uk-first-column ">
                                    <label class="uk-form-label" for="form-stacked-text">Group Conversation Name</label>
                                    <div class="uk-form-controls">
                                        <div class="uk-inline uk-width-1-1">
                                            <input tabindex="1" id="name" type="text" class="uk-input"  placeholder=""  v-model="newChatConversation.name" style="font-family: Lato;font-weight: 300;" autofocus="true">
                                        </div>
                                    </div>
                                </div>

                                <div class="uk-width-1-1 uk-grid-margin uk-first-column " style="z-index: 1;">
                                    <div style="height: 70px;">
                                         <label class="uk-form-label">Members</label>
                                         <div class="uk-form-controls">
                                             <ui-selectbox v-bind:availableItems="availableMembers"
                                                                  name="Members"
                                                                  tagProperty="firstName"
                                                                  displayLabelProps="firstName,lastName" maxTagsToDisplay="3"
                                                                  searchProperty="firstName,lastName"
                                                                  data_tabindex="4"
                                                                  v-on:selectBoxUpdate="updateMembersEmitEvent($event)"/>
                                         </div>
                                    </div>
                                </div>

                                <div class="uk-margin uk-grid-margin uk-first-column">
                                    <div class="uk-inline">
                                        <a tabindex="6" id="saveButton2" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(2 119 254); border-radius: 2px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="save('saveButton2')" >Create Conversation for Group</a>
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

  </div>

</template>

<script>

import { bus } from './../../../main.js';

import uiListMixinLib from './../../mixins/lib/ui-list.js';
import userMixinLib from './../../mixins/lib/user_mixin_lib';
import utilsMixinLib from './../../mixins/lib/utils_lib';

export default {
  mixins: [
    userMixinLib,
    utilsMixinLib,
    uiListMixinLib
  ],
  props: ['loggedInUser'],
  data: function () {
    return {
      appName: this.$route.params.app_name,
      tab: this.$route.params.tab,
      searchQuery: '',
      conversationPageNumber: 1,
      userId: null,
      my_conference_list: [],
      starred_conferences_list: [],
      availableTasks: [],
      myConversationsList: [],
      newChatConversation: {
        id: 'new',
        name: '',
        status: null,
        memberIds: [],
        categoryId: null
      },
      availableMembers: [],
      availableCategories: [],

      calendar: null,
      tasksList: [],
      taskListName: "Inbox",
      isCategoryFilterOn: false,
      filterByCategoryId: null,
      isTaskFilterOn: false,
      taskFilter: null,

      /* New Task from Template - March 25 2021 */
      newTaskFromTemplate: {},
      matchingTaskTemplates: [],
      chosenTaskTemplate: null,
      chosenTaskCategory: null,
      isCategorySubmenuOpened: false,

      myCategoriesList: [],
      isNewTaskOptionsOpen: false
    };
  },
  methods: {
    initCalendar () {

      const _this = this;

      const calendarEl = document.getElementById('calendar');
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        displayEventTime: false,
        eventLimit: true, // allow "more" link when too many events
        eventLimitText: 'More', // sets the text for more events,
        dayMaxEvents: 3,
        datesSet: function (view, element) {
            // Do something
            console.log("Calendar view changed to ", view, element);

            const isoStart = new Date(view.startStr).toISOString();
            const isoEnd = new Date(view.endStr).toISOString();

            console.log("isoStart : ", isoStart, " isoEnd : ", isoEnd);
            // return false;

            if (_this.calendar !== null) {
              _this.filterByTaskStatus(_this.taskListName, _this.taskFilter, isoStart, isoEnd);
            }

            return true;
        },
        eventClick: function (eventInfo) {
          console.log("Event Info : ", eventInfo);
          _this.viewTask(eventInfo.event.id);
        }
        // views: {
        //   dayGridMonth: {
        //     eventLimit: 6 // adjust to 6 only for timeGridWeek/timeGridDay
        //   }
        // }
      });
      calendar.render();

      calendar.on('dateClick', function (info) {
        // alert('clicked on ' + info.dateStr);
      });

      this.calendar = calendar;

      // this.loadInbox();
      console.log(calendar);
      console.log(calendar.currentData.dateProfile.activeRange.start);
      console.log(calendar.currentData.dateProfile.activeRange.end);
      this.initStartDate = new Date(calendar.currentData.dateProfile.activeRange.start).toISOString();
      this.initEndDate = new Date(calendar.currentData.dateProfile.activeRange.end).toISOString();
      this.loadFilteredTasks('inbox', 'inbox_menu', 'Inbox');
    },
    addToCalendar (item) {

      console.log("item.createdOn " + item.createdOn);

      if (item.createdOn.includes("T")) {
        item.createdOn = new Date(item.createdOn.split("T")[0]).toISOString();
      } else {
        item.createdOn = new Date(item.createdOn.split(" ")[0]).toISOString();
      }

      // item.createdOn = "2021-09-22";
      // console.log("item.createdOn " + item.createdOn);

      // These adjustments needs to be done for the date concepts to work in Mozilla and Chrome in windows.
      if (item.dueDateTime !== null) {
       item.dueDateTime = item.dueDateTime.split(" ")[0];
       item.dueDateTime = item.dueDateTime.replace('T', ' ');
      }

      // These adjustments needs to be done for the date concepts to work in Mozilla and Chrome in windows.
      if (item.startDateTime !== null) {
        item.startDateTime = item.startDateTime.split(" ")[0];
        item.startDateTime = item.startDateTime.replace('T', ' ');
      }

      // console.log(item.dueDateTime);
      // console.log((new Date(item.dueDateTime)));
      // console.log(Date.now());
      // console.log((new Date(item.dueDateTime) < Date.now()));
      // console.log((item.dueDateTime !== null && new Date(item.dueDateTime) < Date.now()));

      if (item.dueDateTime !== null && new Date(item.dueDateTime) < Date.now()) {
        this.calendar.addEvent({
          id: item.id,
          title: ' #Task' + item.sno + ' ' + item.name,
          start: item.createdOn,
          classNames: 'task_event duedate_elapsed_event'
        });
      }
      else if (
                (item.startDateTime !== null && new Date(item.startDateTime) < Date.now()) &&
                (item.dueDateTime !== null && new Date(item.dueDateTime) > Date.now())
              ) {
        this.calendar.addEvent({
          id: item.id,
          title: '#Task' + item.sno + ' ' + item.name,
          start: item.createdOn,
          classNames: 'task_event startdate_elapsed_event'
        });
      }
      else {
        this.calendar.addEvent({
          id: item.id,
          title: '#Task' + item.sno + ' ' + item.name,
          start: item.createdOn,
          classNames: 'task_event normal_event'
        });
      }

    },

    viewTask (taskId) {
      // v-on:click="viewSubTask(subtask.id)"
      bus.emit('viewSubTaskEvent', {
        subTaskId: taskId
      });
      return false;
    },
    updateFetchURL () {
      const searchQuery = (this.searchQuery !== '') ? this.searchQuery : 'all';

      if (this.isCategoryFilterOn) {
        this.url = './tasks/list-by-category/' + this.filterByCategoryId + '/' + this.pageNumber + '/' + searchQuery;
      } else if (this.isTaskFilterOn) {
        this.url = './' + this.api + '/list/' + this.pageNumber + '/' + searchQuery + '/' + this.taskFilter;
      } else {
        this.url = './' + this.api + '/list/' + this.pageNumber + '/' + searchQuery;
      }
    },
    loadInbox (filter) {
      const searchQuery = 'all';
      const url = './tasks/list/1/' + searchQuery;

      try {
        // VueJS ajax call-1
        axios.get(process.env.VUE_APP_API_URL + url)
          .then((dataResponse) => {
            console.log('Tasks List: ', dataResponse);
            const list = dataResponse.data.bean;

            list.forEach((item) => {
              item.createdOnFormatted = this.convertUTCDateFromServerToLocalDate(item.createdOn);
              // console.log('item.createdOn = ', item.createdOn);
              // this.tasksList.push(item);
              this.addToCalendar(item);
            });

            console.log('Tasks List: ', this.tasksList);
          })
          .catch((error) => {
            console.error('loadInbox Error : ', error);
          });
      } catch (error) {
        console.error('Unpaginated loadInbox fetch error : ', error);
      }
    },
    loadFilteredTasks (taskFilterKey, menuFilter, filterName) {
      // this.signalHideChat();

      // If the current view is any other route, then switch to inbox view.
      // if (this.$route.name !== 'view-task-inbox') {
      //   this.$router.push({
      //     name: 'view-task-inbox',
      //     params: {
      //     }
      //   });
      // }

      document.querySelectorAll('.menu-item').forEach((el) => {
        el.classList.remove('uk-active');
        el.classList.remove('selected-menu');
      }
      );
      document.querySelector('#' + menuFilter).classList.add('selected-menu');
      document.querySelector('#' + menuFilter).classList.add('uk-active');
      this.filterByTaskStatus(filterName, taskFilterKey, this.initStartDate, this.initEndDate);
    },
    filterByTaskStatus (filterName, filterKey, startDate, endDate) {

      this.taskListName = filterName;
      this.calendar.removeAllEvents();

      // Update the url assisting data to select filtered tasks.
      // Filter tasks by status and supplied month instead of pagination.
      this.isTaskFilterOn = true;
      this.taskFilter = filterKey;
      this.url = './tasks/list-for-calendar';

      /*

        String query = filter.getQueryString();
        String categoryId = filter.getCategoryId();
        Boolean findByCategory = filter.getFindByCategory();
        String taskFilter = filter.getTaskFilter();
        Boolean findByTaskFilter = filter.getFindByTaskFilter();

      */

      // 2021-04-28T12:35:00.000Z
      this.filter = {
        queryString: "all",
        categoryId: null,
        findByCategory: false,
        findByTaskFilter: false,
        taskFilter: this.taskFilter,
        startDateTimeFrom: startDate, // "2021-05-01T00:00:00.000Z",
        startDateTimeTo: endDate // "2021-05-31T00:00:00.000Z"
      };

      // When findByTaskFilter && findByCategory are both false, then it pulls the list for inbox items.
      if (this.taskFilter === "inbox" || this.taskFilter === "sent" || this.taskFilter === "completed" || this.taskFilter === "overdue" || this.taskFilter === "draft") {
        this.filter.findByTaskFilter = true;
      }


      console.log("Filtering tasks for calendar : ", this.filter.startDateTimeFrom, this.filter.startDateTimeTo);

      axios.post(process.env.VUE_APP_API_URL + this.url, this.filter)
        .then((dataResponse) => {
          console.log('List fetched for page number is : ', dataResponse.data.bean);
          this.handleData(dataResponse);
        });

    },
    filterByCategory (data) {


      this.calendar.removeAllEvents();

      if (data.name == 'all') {
        this.taskListName = 'Inbox';
        this.isCategoryFilterOn = false;
        this.filterByCategoryId = null;
        this.isTaskFilterOn = false;
        this.taskFilter = null;
        this.resetRefreshList();


      } else {
        this.taskListName = data.name;
        this.isCategoryFilterOn = true;
        this.filterByCategoryId = data.id;
        this.isTaskFilterOn = false;
        this.taskFilter = null;
        this.resetRefreshList();


      }
    },
    handleData (dataResponse) {

      console.log("handling response", dataResponse);

      if (dataResponse.data.actionResult === 1) {
        const listOfTasks = (dataResponse.data.bean);// .slice(0, 10);

        // Since we are pulling 20 records per page, then if the resulting size is lesser than 20, then it means
        // no more records are available.
        if (listOfTasks.length < 20) {
          this.allRecordsFetched = true;
        }

        listOfTasks.forEach(task => {
          if (task.createdOn !== null) {
            // task.createdOn = new Date(task.createdOn).toLocaleString()
            //                                          .slice(0, 17)
            //                                          .replace(',', '')
            //                                          .replace('T',' ');

            // Added during "Fix-Date-UTC-Update"
            // task.createdOn = new Date(task.createdOn + " UTC").toLocaleString();
            task.createdOn = this.convertUTCDateFromServerToLocalDate(task.createdOn);

            // const utcFormattedString = task.createdOn
            //                                           .replace(',', '')
            //                                           .replace('T', ' ') +
            //                                           // ' UTC';
            //                                           'Z';
            // console.log("\t\t utcFormattedString = ", utcFormattedString);
            // task.createdOn = (new Intl.DateTimeFormat('en-GB').format(new Date(utcFormattedString)));


          }

          if (task.dueDateTime !== null) {
            // task.dueDateTime = new Date(task.dueDateTime).toLocaleString()
            //                                          .slice(0, 17)
            //                                          .replace(',', '')
            //                                          .replace('T',' ');

            // Added during "Fix-Date-UTC-Update"
            // task.dueDateTime = new Date(task.dueDateTime + " UTC").toLocaleString();
            task.dueDateTime = this.convertUTCDateFromServerToLocalDate(task.dueDateTime);
          }

          if (task.isOnline !== null && task.isOnline === 1) {
            task.isOnline = 'LIVE';
          }

          if (task.createdBy !== null) { task.createdBy = task.createdBy.split('#')[1]; }

          let assigneeListString = '';
          task.assignees.forEach((assignee) => {
            assigneeListString = assignee.firstName + ' ' + assignee.lastName + '<br>' + assigneeListString;
          });
          task.assigneeListString = assigneeListString;

          // To prevent null error in vue-render if the "assigneeIds" prop is null
          if (task.assigneeIds === null) { task.assigneeIds = []; }

          // To prevent null error in vue-render if the "assigneeIds" prop is null
          if (task.followeIds === null) { task.followeIds = []; }

          // To prevent null error in vue-render if the "subTaskIds" prop is null
          if (task.subTaskIds === null) { task.subTaskIds = []; }


          // this.list.push(task);
          console.log("Adding task to calendar : ", task);
          this.addToCalendar(task);
        });

      } else {
        console.error('Error', dataResponse);
        // alert("Error : " + dataResponse)
      }
    },



    sendNewTaskEvent () {
      console.log('Event emitted in bus.', new Date());

      const basicTaskInfo = {
        eventSource: "newTaskFromCalendarView",
        subject: "",
        modalKey: "new_task",
        possibleAssignees: [],
        possibleFollowers: [] // Logically add it later.
      };

      bus.emit('newTaskEvent', basicTaskInfo);
    },
    createTask (taskType) {
      console.log('Creating task of type : ' + taskType);
      console.log('Event emitted in bus.', new Date());

      if (taskType === 'template') { bus.emit('newTemplateTaskEvent', {}); } else if (taskType === 'scheduled') { bus.emit('newScheduledTaskEvent', {}); } else if (taskType === 'recurring') { bus.emit('newRecurringTaskEvent', {}); }

      this.closeNewTaskOptions();
    },
    closeNewTaskOptions () {
      this.isNewTaskOptionsOpen = false;
      // This means, if target on which the click happened is not within the context-menu div, so you can close the context-menu dropdown.
      const primaryButtonOptions = document.getElementById('new_task_button_calendar_options');
      primaryButtonOptions.style.transform = null;

      // Remove click listener
      document.querySelector('body').removeEventListener('click', this.listenForBodyClicks, false);
      console.log('body click event removed.');
    },
    listenForBodyClicks (event) {
      console.log('Body clicked at target ', event.target);

      const foundParent = event.target.closest('.new_task_options');
      const foundTrigger = event.target.closest('.new_task_options_trigger_button'); // The click event on the trigger must also be ignored.

      if (foundParent === null && foundTrigger === null) {
        console.log('Closing menu as the body-click event landed on the body');
        this.closeNewTaskOptions();
      }
    },
    handleNewTaskOptionsClick () {
      console.log('handleNewTaskOptionsClick clicked : ');

      if (!this.isNewTaskOptionsOpen) {
        console.log('body click event added.');
        this.isNewTaskOptionsOpen = true;
        const primaryButtonOptions = document.getElementById('new_task_button_calendar_options');
        primaryButtonOptions.style.transform = 'scale(1)';

        console.log('menu scaled to open.');
        document.querySelector('body').addEventListener('click', this.listenForBodyClicks, false);
      } else {
        this.closeNewTaskOptions();
      }
    },
    toggleCategoryMenu () {
      this.isCategorySubmenuOpened = !this.isCategorySubmenuOpened;

      if (this.isCategorySubmenuOpened) {
        document.querySelector('#category_submenu_calendar').style.display = null;
        document.querySelector('#category_menu_trigger_calendar').style.transform = 'rotateX(-180deg)';
      } else {
        document.querySelector('#category_submenu_calendar').style.display = 'none';
        document.querySelector('#category_menu_trigger_calendar').style.transform = 'rotateX(0deg)';
      }
    },

    fetchMyCategories () {
      return new Promise(resolve => {
        const url = './categories/list/mine';

        try {
          axios.get(process.env.VUE_APP_API_URL + url)
            .then((dataResponse) => {
              // console.log("My Category List: " , dataResponse);
              // this.myCategoriesList = dataResponse.data.bean;

              // dataResponse.data = dataResponse;
              const list = dataResponse.data.bean;

              this.myCategoriesList = [];
              list.forEach((item) => {
                if (item.status === "ACTIVE") {
                  this.myCategoriesList.push(item);
                }
              });

              // this.fetchCategoryTaskCounts(this.myCategoriesList);
              // this.fetchTaskCounts();

              resolve('fetched');
            })
            .catch((error) => {
              console.error('Error while fetching my-categories-list : ', error);

              resolve('fetch my-categories failed');
            });
        } catch (error) {
          console.error('Unpaginated List data fetch error : ', error);
        }
      });
    },


    // remove method
    createNewChatConversation () {
      console.log('newChatEvent received in chat-book.vue component.');
      UIkit.modal(document.querySelector('#newTaskFromConversationModal')).show();
    },
    goToHomePage: function () {
      // $("#app").css("grid-template-rows", "50px 1fr 35px");      // show the footer

      this.$router.push({
        name: 'home-page',
        params: {}
      });
    },
    openChat (conversation) {
      const conversationId = conversation.id;

      if (document.getElementById('chat_' + conversationId) === null) {
        //* This code will add new <chat-detail> component. The <chat-detail> component loads teh chat data on its mounted-method * //
        this.availableTasks.push({
          conversationId: conversationId,
          conversationName: conversation.name,
          categoryId: conversation.categoryId,
          showChat: true
        });
      }

      {
        this.availableTasks.forEach((chat) => {
          const conversationId = chat.conversationId;
          if (document.getElementById('chat_' + conversationId) !== null) { document.getElementById('chat_' + conversationId).classList.add('hideChat'); }
        });

        if (document.getElementById('chat_' + conversationId) !== null) { document.getElementById('chat_' + conversationId).classList.remove('hideChat'); }
      }

      if (document.querySelector('.selected_chat_itemX') !== null) { document.querySelector('.selected_chat_itemX').classList.remove('selected_chat_itemX'); }

      if (document.getElementById('conf_list_item_' + conversationId) !== null) { document.getElementById('conf_list_item_' + conversationId).classList.add('selected_chat_itemX'); }

      // else->navigate to that component.
    },
    refreshMyConversations () {
      this.convesationPageNumber = 1;
      this.myConversationsList = [];
      this.fetchMyConversations();
    },
    fetchMyConversations () {
      console.log('Fetching my conversations...from chat-book');
      // return false;

      return new Promise(resolve => {
        const url = './chat-conversations/list/' + this.conversationPageNumber + '/all';

        try {
          axios.get(process.env.VUE_APP_API_URL + url)
            .then((dataResponse) => {
              // console.log("My Category List: " , dataResponse);
              const myConversationsList = dataResponse.data.bean;
              myConversationsList.forEach((conversation) => {
                conversation.showChat = false;

                this.myConversationsList.push(conversation);
              });
            })
            .catch((error) => {
              console.error('Error while fetching my-conversations-list : ', error);
            });
        } catch (error) {
          console.error('Unpaginated List data fetch error : ', error);
        }
      });
    },

    getCookie: function (cname) {
      var name = cname + '=';
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    },
    save (btnId) {
      // if(!this.doValidation())
      //    return false; // stop here if form is invalid.

      const btnText = document.getElementById(btnId).innerHTML;
      document.getElementById(btnId).innerHTML = 'Saving..';
      this.disableHTMLElement(document.getElementById(btnId));

      const post_url = './chat-conversations/save';
      console.log('Posting data to : ' + post_url);

      const form = {
        id: this.newChatConversation.id,
        name: this.newChatConversation.name,
        categoryId: this.newChatConversation.categoryId,
        involvedMemberIds: this.newChatConversation.memberIds
      };

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {
          console.log('Chat Conversation Registration Result : ');
          console.log(dataResponse);

          if (dataResponse.data.actionResult === 1) {
            this.newWorkgroupInfo = dataResponse.data.bean;

            UIkit.notification(`<div class="taskone-notification">
                                                    <span uk-icon="icon: check;ratio:1"></span>
                                                    <div> New Chat added successfully. </div>
                                                </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 500000
            });

            document.getElementById(btnId).innerHTML = btnText;
            this.enableHTMLElement(document.getElementById(btnId));

            this.$emit('refreshList', {});
            this.refreshMyConversations();

            this.newChatConversation = {
              id: 'new',
              name: '',
              status: null,
              memberIds: [],
              categoryId: null
            };
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

    // Handle the events emitted when selectbox component values are modified.
    updateMembersEmitEvent (data) {
      const memberIds = Array.from(data).map(item => item.id);
      this.newChatConversation.memberIds = memberIds;
    },
    updateCategoryEmitEvent (data) {
      console.log(data);
      if (data != null) { this.newChatConversation.categoryId = data.id; } else { this.newChatConversation.categoryId = null; }
    },

    // This data will be used to filter both members and admins by merging with the result from 'get-associated-people/{workgroup-id}'
    loadPotentialUsers () {
      const url = './workgroups/get-potential-users'; // Fetch all potential members (users)
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
      console.log('Potential Users : ', dataResponse);

      const mapFunction = (user) => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          isSelected: false
        };
      };

      const mappedArrayOfUser = dataResponse.data.bean.map(mapFunction);

      this.availableMembers = mappedArrayOfUser; // When a workgroup is edited, these vals must be merged with existing workgroup members to determine 'isSelected' flag

      console.log('this.availableMembers : ', this.availableMembers);
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
    }
  },
  created: function () {

  },
  mounted: async function () {
    console.log('Calendar-component mounted.');

    // this.loadPotentialUsers();
    // this.loadPotentialCategories();

    // await this.fetchMyConversations();
    setTimeout(() => {
      // $("#app").css("grid-template-rows", "50px 1fr 0px");      // hide the footer
      document.getElementById('calendar').classList.remove('hide-calendar');

      // Lazy initialize the calendar so that it renders properly
      setTimeout(() => this.initCalendar(), 1000);
    }, 150);
    // this.getStarredConferences();

    const result2 = await this.fetchMyCategories();
    console.log('MyCategories fetch result', result2);
  },
  watch: {

    // https://router.vuejs.org/en/advanced/data-fetching.html for more options.
    /*
            // call again the method if the route changes
            '$route': 'fetchData' where fetchData is a method defined above.
        */

    '$route.params.app_name' (newAppName, oldAppName) {
      console.log('AppName changed from ' + oldAppName + ' to ' + newAppName);
      this.appName = newAppName;
    }

  }
};

</script>
