<template>

  <div class="app_container" style="background: rgb(255, 255, 255, 0);grid-template-columns:1fr 2fr 5fr;display: flex;box-sizing: border-box;width: 100%;">

    <div id="appSideMenu" class="app-side-menu" style="xdisplay:none;">
        <div vv-if="loggedInUser.isInformationFetchComplete"  id="offcanvas-nav" class="app-side-menu-content">
          <div class="uk-offcanvas-bar0 custom-scroll-bar side-bar-light" style="flex-grow:1">

              <div>
                <div style="min-height: 75px;opacity: 1;display: flex;align-items: center;justify-content: center;">
                    <div style="position:relative">
                      <button id="new_task_button" v-on:click="sendNewTaskEvent()" xv-on:click="goTo('create-task-page')" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                              style="background-color: #1f69bd;background-color:rgb(37, 139, 255); border-radius: 3px; place-self: center center; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 30px; font-weight: normal !important;;border-bottom-right-radius: 0px;border-top-right-radius: 0px;">
                        <span uk-icon="icon:file-edit;ratio:0.75"></span>
                        <span style="margin-left:5px"> New Task</span>
                      </button>
                      <button v-on:click="handleNewTaskOptionsClick()" xv-on:click="goTo('create-task-page')" class="new_task_options_trigger_button clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                              style="background-color: rgb(37, 139, 255);background-color:rgb(37, 139, 255);border-radius: 3px;place-self: center;place-items: center;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-top: 0px;margin-left: 0.045rem;padding: 0px;border-bottom-left-radius: 0px;border-top-left-radius: 0px;">
                            <span uk-icon="triangle-down" class="uk-icon" style="pointer-events:none"></span>
                      </button>
                      <div id="new_task_button_options" class="new_task_options">
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

                  <!--
                  <li class="uk-nav-header" style="margin-bottom: 20px;">
                        <a style="color: #333!important;font-weight: normal!important;font-size: .55rem;">
                          Filter by Tasks
                        </a>
                  </li>
                  <li class="uk-active menu-item" id="inbox_menu">
                    <a v-on:click="loadInbox('inbox_menu')" xv-on:click="goToPage('view-task-inbox',{'taskId':'all','subtaskId':'none'})">
                      <span class="lnr lnr-inbox"></span>&nbsp;&nbsp;Inbox
                      <span class="counter-label" id="inbox_count"></span>
                    </a>
                  </li>
                  <li class="menu-item" id="sent_tasks_menu">
                    <a v-on:click="loadFilteredTasks('sent','sent_tasks_menu', 'Sent Tasks')">
                      <span class="lnr lnr-location"></span>&nbsp;&nbsp;Sent
                      <span class="counter-label" id="sent_count"></span>
                    </a>
                  </li>
                  <li class="menu-item" id="overdue_tasks_menu">
                    <a v-on:click="loadFilteredTasks('overdue','overdue_tasks_menu', 'Overdue Tasks')">
                      <span class="lnr lnr-clock"></span>&nbsp;&nbsp;Overdue
                      <span class="counter-label" id="overdue_count"></span>
                    </a>
                  </li>
                  -->

                  <li class="uk-nav-header" style="margin-top: 20px;padding: 0.07rem 0.5rem  !important">
                        <a style="color: #333!important;font-weight: normal!important;font-size: .55rem;">
                          Filter by Tasks
                        </a>
                  </li>
                  <li class="uk-parent">
                      <ul class="uk-nav-sub" style="max-height: 300px;xheight: 300px;overflow-y: auto;overflow-x: clip;">
                          <template v-for="taskFilter in taskFilters">
                              <li class="menu-item" v-bind:id="'cat_' + taskFilter.key">
                                <div style="display: flex;margin-top: 10px;min-height: 0.65rem;gap: 10px;align-items: center" v-on:click="updateActivityFilterForTaskType(taskFilter)" >
                                  <div v-show="taskFilter.isChecked" class="checked_checkbox_small">
                                      <span uk-icon="check" style="color: white;"></span>
                                  </div>
                                  <div v-show="!taskFilter.isChecked" class="unchecked_checkbox_small">
                                  </div>
                                  <div v-bind:uk-tooltip="'title:' + taskFilter.name +';pos:right'" style="user-select:none;font-weight: 400!important;font-size:0.65rem;cursor:pointer;flex: 1 1 0%;white-space: nowrap;text-overflow: clip;">
                                    {{taskFilter.name}}
                                  </div>
                                </div>
                              </li>
                          </template>
                      </ul>
                  </li>
                  <li class="uk-nav-header filter-btn" v-on:click="toggleCategoryFilterMenu()" style="margin-top: 5px;padding: 0.07rem 0.5rem !important;background: transparent;border-bottom: 1px solid #c7c7c7;border-radius: 0px;">
                        <a style="color: #333!important;font-weight: normal!important;font-size: .55rem;">
                          Filter by Category
                          <span class="counter-label filter-btn " style="border-radius: 10px;">
                              <span uk-icon="icon:chevron-down;ratio:0.85" id="category-menu-trigger-in-activity-channel" class="uk-icon" style="transition: 0.25s linear;"></span>
                          </span>
                        </a>
                  </li>
                  <li class="uk-parent" id="category-submenu-in-activity-channel" style="display:none">
                      <ul class="uk-nav-sub" style="max-height: 300px;xheight: 300px;overflow-y: auto;overflow-x: clip;">
                          <template v-for="category in myCategoriesList">
                              <li class="menu-item" v-bind:id="'cat_' + category.id">
                                <div style="display: flex;margin-top: 10px;min-height: 0.65rem;gap: 10px;align-items: center" v-on:click="updateActivityFilterForCategory(category)" >
                                  <div v-show="category.isChecked" class="checked_checkbox_small">
                                      <span uk-icon="check" style="color: white;"></span>
                                  </div>
                                  <div v-show="!category.isChecked" class="unchecked_checkbox_small">
                                  </div>
                                  <div v-bind:uk-tooltip="'title:' + category.name +';pos:right'" style="user-select:none;font-weight: 400!important;font-size: 0.65rem;cursor:pointer;flex: 1 1 0%;white-space: nowrap;text-overflow: clip;">
                                    {{category.name}}
                                  </div>
                                </div>
                              </li>
                          </template>
                      </ul>
                  </li>
                  <li class="uk-nav-header filter-btn" v-on:click="toggleActivityTypeFilterMenu()" style="margin-top: 5px;padding: 0.07rem 0.5rem !important;background: transparent;border-bottom: 1px solid #c7c7c7;border-radius: 0px;">
                        <a style="color: #333!important;font-weight: normal!important;font-size: .55rem;" >
                          Filter by Activity
                          <span class="counter-label filter-btn "  style="border-radius: 10px;">
                              <span uk-icon="icon:chevron-down;ratio:0.85" id="activity-type-menu-trigger" class="uk-icon" style="transition: 0.25s linear;"></span>
                          </span>
                        </a>
                  </li>
                  <li class="uk-parent" id="activity-type-submenu" style="display:none">
                      <ul class="uk-nav-sub" style="max-height: 300px;xheight: 300px;overflow-y: auto;overflow-x: clip;">
                          <template v-for="activityType in activityTypeFilters">
                              <li class="menu-item" v-bind:id="'activity_type_' + activityType.key">
                                <div style="display: flex;margin-top: 10px;min-height: 0.65rem;gap: 10px;align-items: center;" v-on:click="updateActivityFilterForActivityType(activityType)" >
                                  <div v-show="activityType.isChecked"  class="checked_checkbox_small">
                                      <span uk-icon="check" style="color: white;"></span>
                                  </div>
                                  <div v-show="!activityType.isChecked" class="unchecked_checkbox_small">
                                  </div>
                                  <div v-bind:uk-tooltip="'title:' + activityType.name +';pos:right'" style="user-select:none;font-weight: 400!important;font-size: 0.65rem;cursor:pointer;flex: 1 1 0%;white-space: nowrap;text-overflow: clip;">
                                    {{activityType.name}}
                                  </div>
                                </div>
                              </li>
                          </template>
                      </ul>
                  </li>
              </ul>


              <div style="display: flex;align-items: center;justify-content: center;flex-direction:column">
                  <button v-on:click="applySelectedFilters()" class="clickable-btn filter-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                          style="background-color: rgba(33, 150, 243, 0);border-radius: 3px;border: 1px solid rgb(175, 175, 175);color: rgb(117, 117, 117);min-width: 100px;font-size: 0.65rem;line-height: 25px;font-weight: normal !important;display: flex;margin-top: 10px;width: 100%;justify-content: center;">
                          <span style="padding-left: 10px;">Apply Filter</span>
                  </button>
                  <button v-on:click="resetSelectedFilters()" class="clickable-btn filter-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                          style="background-color: rgba(33, 150, 243, 0);border-radius: 3px;border: 1px solid rgb(175, 175, 175);color: rgb(117, 117, 117);min-width: 100px;font-size: 0.65rem;line-height: 25px;font-weight: normal !important;display: flex;margin-top: 10px;width: 100%;justify-content: center;">
                          <span style="padding-left: 10px;">Reset Filter</span>
                  </button>
              </div>


          </div>
          <!--
          <div style="border-right: 1px solid #ccc;">
              <div style="color: #333!important;font-weight: 400!important;font-size: .7rem;display: flex!important;align-items: center;padding: 5px 10px;">
                  <a href="/admin" style="text-decoration:none"><span class="lnr lnr-cog"></span>&nbsp;&nbsp;Settings</a>
              </div>
          </div>
          -->
        </div>
    </div>

    <div  v-show="!isTaskCreationInProcess" class="desktop" style="border-right: 0px solid rgb(204, 204, 204);position: relative;padding: 15px 5px 15px 15px;overflow-y: hidden;display: flex;flex-direction: column;flex-grow: 1;flex-basis: 40%;background: #fff0;color: rgb(51, 51, 51);">
      <div class="adk_grid_toolbar" style="user-select: none;grid-template-columns: auto 1fr;padding: 0px 0px;height:50px">
        <div style="display: grid; place-self: center flex-start; text-align: left;">
          <div style="align-items:center;display: grid; place-self: center flex-start; padding-left: 0px; padding-right: 20px; color: rgba(61, 61, 61, 0.78) !important; grid-template-columns: auto auto auto auto; font-size: 0.75rem;">
            <span style="font-size: 1.15rem;font-weight: bold;letter-spacing: 0.03rem;" id="taskListName">Activity Channels </span>
            <span class="" id="activity_channel_counter" style="transition: all 0.5s linear 0s;margin-left: 5px;">({{activityList.length}})</span>
            <span class="hide_display" id="activity_channel_status" style="transition: all 0.5s linear 0s;background: #a3dc4b;border-radius: 50%;opacity: 1;width: 10px;height: 10px;"></span>
            <!-- <div style="font-size: 0.55rem;font-weight: bold;margin-left: 10px;background-color: rgb(233 30 30 / 69%);padding: 2px 5px;color: white;border-radius: 2px;display: flex;align-items: center;justify-content: center;column-gap: 5px;">
                <span uk-icon="icon:bolt;ratio:0.75" class="uk-icon"></span>
                <span>Live Updates</span>
            </div> -->
          </div>
        </div>
        <div style="display: grid; gap: 10px; grid-template-columns: auto auto; place-self: center end; text-align: right;">

          <div style="display: flex;column-gap: 10px;justify-content: center;align-items: center;">
            <!--<div style="cursor:pointer"><img src="resources/images/all-activities.svg" style="height:15px;width:15px"></div>-->
            <div v-on:click="refreshPaneList()" class="clickable-btn uk-button" style="cursor: pointer;padding: 0 0px;filter: grayscale(1);"><img src="resources/images/refresh.svg" style="pointer-events: none;height:15px;width:15px"></div>

            <div style="position: relative;">
              <div class="chat-context-menu-triggerx" style="user-select: none;">
                <span uk-tooltip="Filter Activities" v-bind:id="'task-activity-ctx-menu-trigger'" class="updateTaskInfoTrigger recd-ctx-menu-trigger" uk-icon="icon:more-verticalx;ratio:0.65" v-on:click.stop="openTaskActivityFilterContextMenu($event)" >
                  <svg xmlns="http://www.w3.org/2000/svg" height="394pt" viewBox="-5 0 394 394.00003" width="394pt" style="fill: #848484;pointer-events: none;height: 15px;width: 15px;color: white;"><path d="m367.820312 0h-351.261718c-6.199219-.0117188-11.878906 3.449219-14.710938 8.960938-2.871094 5.585937-2.367187 12.3125 1.300782 17.414062l128.6875 181.285156c.042968.0625.089843.121094.132812.183594 4.675781 6.3125 7.207031 13.960938 7.21875 21.816406v147.800782c-.027344 4.375 1.691406 8.582031 4.773438 11.6875 3.085937 3.101562 7.28125 4.851562 11.65625 4.851562 2.222656-.003906 4.425781-.445312 6.480468-1.300781l72.3125-27.570313c6.476563-1.980468 10.777344-8.09375 10.777344-15.453125v-120.015625c.011719-7.855468 2.542969-15.503906 7.214844-21.816406.042968-.0625.089844-.121094.132812-.183594l128.691406-181.289062c3.667969-5.097656 4.171876-11.820313 1.300782-17.40625-2.828125-5.515625-8.511719-8.9765628-14.707032-8.964844zm0 0"></path></svg>
                </span>
              </div>
              <div v-bind:id="'task_activity_filter_ctx_menu'" class="context-menu">
                <div style="user-select: none;display: flex;gap: 0px;flex-direction: column;">

                    <div id="menu_container" class="menu_container">

                        <div id="menu_slider" class="menu_slider">
                          <div id="menu" class="menu menu_fixed_height">
                              <div v-on:click="onMenuClick('isTaskFilterSelected', 'Task Filter')">
                                <span uk-icon="ratio:0.7;icon: users" class="uk-icon"></span>
                                <span style="padding-left: 5px;">Filter by Tasks <span id="selectedHookCustomersBadge" style="color:rgb(159 156 156)"></span></span>
                                <span uk-icon="ratio:0.7;icon: chevron-right" class="uk-icon" style="margin-left:auto"></span>
                              </div>
                              <div v-on:click="onMenuClick('isCategoryFilterSelected', 'Category Filter')">
                                <span uk-icon="ratio:0.7;icon: location" class="uk-icon"></span>
                                <span style="padding-left: 5px;">Filter by Categories <span id="selectedHookCustomerBranchesBadge" style="color:rgb(159 156 156)"></span></span>
                                <span uk-icon="ratio:0.7;icon: chevron-right" class="uk-icon" style="margin-left:auto"></span>
                              </div>
                              <div v-on:click="onMenuClick('isActivityTypeFilterSelected', 'Activity Type Filter')">
                                <span uk-icon="ratio:0.7;icon: location" class="uk-icon"></span>
                                <span style="padding-left: 5px;">Filter by Activity Types <span id="selectedHookCustomerBranchesBadge" style="color:rgb(159 156 156)"></span></span>
                                <span uk-icon="ratio:0.7;icon: chevron-right" class="uk-icon" style="margin-left:auto"></span>
                              </div>
                          </div>
                          <div id="submenu" class="submenu_container">
                              <div style="display: flex;gap: 10px;border-bottom: 1px solid #f0f0f0;padding-bottom: 10px;">
                                <button v-bind:uk-tooltip="'Go back'"  v-on:click="onSubmenuClick()" class="uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button subtask-back-button" style="border-radius: 3px;">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" >
                                    <path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"></path>
                                  </svg>
                                </button>
                                <div style="padding-right: 1px;position: relative;border: 1px solid rgb(187, 186, 186);border-radius: 3px;display: inline-flex;flex-direction: row-reverse;column-gap: 10px;">
                                      <input autocomplete="off" type="text" id="submenu_searchbox" v-on:keyup="searchHooksSubmenu()" v-model="hooksSubmenuSearchQuery" class="dropdown_input" style="border: 0px;padding-right: 30px;width: 98%;height: 30px;">
                                      <span uk-icon="icon:search;ratio:0.85" style="display: flex;padding: 5px;user-select: none;align-items: center;justify-content: center;width: 30px;opacity: 0.55;xbackground: #f0f0f0;"></span>
                                </div>
                              </div>
                              <div class="filter_submenu ">

                                <div style="display: flex;flex-direction: column;position: relative;" v-show="hookSubmenuCurrentlySelected === 'isTaskFilterSelected'">
                                    <div class="submenu_category custom-scroll-bar">
                                      <template v-for="taskFilter in taskFilters">
                                        <div v-on:click="updateSelectedTaskFilters(taskFilter.name)" style="display: flex;-moz-column-gap: 10px;column-gap: 10px;cursor: pointer;">
                                          <div>
                                            <div style="border: 1px solid rgb(85, 85, 85); height: 15px; width: 15px; display: grid;">
                                              <span v-show="taskFilter.isSelected"  uk-icon="check" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check">
                                                  <polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline>
                                                </svg>
                                              </span>
                                            </div>
                                          </div>
                                          <div style="padding-left: 5px;">{{taskFilter.name}}</div>
                                        </div>
                                      </template>
                                    </div>
                                    <div class="button-container" style="position: absolute;bottom: 0px;left: auto;right: auto;width: 100%;">
                                        <button v-on:click="getActivitiesByTaskFilter()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                                                style="color: #333;background-color: rgb(255 255 255);border-radius: 3px;border: 1px solid #8e8e8e;place-self: center;place-items: center;margin-top: 10px;width: 100%;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;">
                                            Apply Task Filter
                                        </button>
                                    </div>
                                </div>

                                <div style="display: flex; flex-direction: column; position: relative;" v-show="hookSubmenuCurrentlySelected === 'isCategoryFilterSelected'">
                                    <div class="submenu_category  menu_fixed_height custom-scroll-bar" >
                                      <template v-for="category in myCategoriesList">
                                        <div v-on:click="updateSelectedCategoryFilters(category.id)" style="display: flex;-moz-column-gap: 10px;column-gap: 10px;cursor: pointer;">
                                          <div>
                                            <div style="border: 1px solid rgb(85, 85, 85); height: 15px; width: 15px; display: grid;">
                                              <span v-show="category.isSelected"  uk-icon="check" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check">
                                                  <polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline>
                                                </svg>
                                              </span>
                                            </div>
                                          </div>
                                          <div style="padding-left: 5px;">{{category.name}}</div>
                                        </div>
                                      </template>
                                    </div>
                                    <div class="button-container" style="position: absolute; bottom: 0px; left: auto; right: auto; width: 100%;">
                                        <button v-on:click="getActivitiesByCategoryFilter()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                                                style="color: #333;background-color: rgb(255 255 255);border-radius: 3px;border: 1px solid #8e8e8e;place-self: center;place-items: center;margin-top: 10px;width: 100%;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;">
                                            Apply Category Filter
                                        </button>
                                    </div>
                                </div>

                                <div style="display: flex; flex-direction: column; position: relative;" v-show="hookSubmenuCurrentlySelected === 'isActivityTypeFilterSelected'">
                                    <div class="submenu_category  menu_fixed_height custom-scroll-bar" >
                                      <template v-for="activityType in activityTypeFilters">
                                        <div v-on:click="updateSelectedActivityTypeFilters(activityType.key)" style="display: flex;-moz-column-gap: 10px;column-gap: 10px;cursor: pointer;">
                                          <div>
                                            <div style="border: 1px solid rgb(85, 85, 85); height: 15px; width: 15px; display: grid;">
                                              <span v-show="activityType.isSelected"  uk-icon="check" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check">
                                                  <polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline>
                                                </svg>
                                              </span>
                                            </div>
                                          </div>
                                          <div style="padding-left: 5px;">{{activityType.name}}</div>
                                        </div>
                                      </template>
                                    </div>
                                    <div class="button-container" style="position: absolute; bottom: 0px; left: auto; right: auto; width: 100%;">
                                        <button v-on:click="getActivitiesByActivityTypeFilter()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                                                style="color: #333;background-color: rgb(255 255 255);border-radius: 3px;border: 1px solid #8e8e8e;place-self: center;place-items: center;margin-top: 10px;width: 100%;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;">
                                            Apply Activity Type Filter
                                        </button>
                                    </div>
                                </div>

                              </div>
                          </div>
                        </div>
                    </div>

                </div>
              </div>
            </div>

            <!--<div style="cursor:pointer"><span uk-icon="icon:list;ratio:0.85"></span></div>-->
            <!--<div style="cursor:pointer"><span uk-icon="icon:more;ratio:0.75"></span></div>-->
          </div>
        </div>
      </div>
      <div style="margin-bottom: 15px; padding: 0px 10px 0px 0px; box-sizing: border-box; position: relative;">
          <span style="position:absolute;left:10px;top: 10px;color: #9f9f9f;" uk-icon="icon:search;ratio:0.85"></span>
          <input v-on:keyup.enter="fetchInvolvedTaskActivities(true)" tabindex="1" id="activitySearchInput" placeholder="Search Task activities" v-model="activitySearchQuery" type="text" class="uk-input task-search-input" style="border-radius: 20px;padding-left: 40px;"/>
      </div>
      <!-- <div><hr></div> -->
      <div style="display:flex;flex-grow: 1;overflow-y: hidden;position: relative;padding:0px;">
        <div style="display: flex;flex-direction: column;flex-grow: 1;height: 100%;">
            <div class="task-list" style="flex-grow: 1;font-size: 0.7rem;margin-top: 10px;grid-template-rows: 1fr;background-color: rgb(255, 255, 255, 0);">
                <div class="adk_grid_list_content custom-scroll-bar activities_list_in_channel" style="display: flex;flex-direction: column;row-gap: 10px;">
                  <template v-for="activity,idx in activityList">

                      <!--

                      <div v-on:click="showTaskDetailsOfThisActivity(activity.taskId, activity.id, idx)" v-on:mouseover="markActivityAsRead(activity.id)"  v-bind:class="{'new_activity': activity.hide}"  v-bind:id="'channel_task_activity_' + activity.id"  style="display: flex;background: #fff;padding: 5px 0;" class="channel_activity_box">
                        <div style="display: flex;align-items: self-end;justify-content: center;flex-direction: row;min-width: 50px;padding-top: 20px;padding-left: 15px;">
                             <img class="uk-border-pill ui-navbar-profile-image"
                             src="/api/us/profile/get/5fd85f84b7bb60589e3a93de"
                             onerror="this.onerror=null;this.src='resources/images/male_default_pic.png';"
                             width="25" height="25" alt="Border pill"
                             style="border: 2px solid rgb(220, 220, 220);background: rgb(255, 235, 59);padding: 2px;margin-left: 0px;height: 45px;width: 45px;">
                        </div>
                        <div class="ui_grid_row list-detail" style="display: flex;flex-basis: 80%;">
                            <div style="position: relative;display: flex;flex-direction: column;width: 100%;place-items: flex-start flex-start;">
                                <div  v-bind:class="{'activity_description_large' : true}"  v-bind:id="'channel_task_activity_content_' + activity.id">
                                  <div v-if="activity.type=='NEW_COMMENT'" style="flex-grow: 1; width: 100%;">
                                      <div class="list-item-row-1" style="display: flex;column-gap: 5px;padding: 5px;width: 100%;">
                                        <div class="task-sno" style="white-space: nowrap;color: #2196F3;">
                                          Task #{{activity.taskSno}}
                                        </div>
                                        <div style="font-weight: normal;flex-grow: 1;color: rgb(134, 134, 134);display: flex;"> - &nbsp;<span style="font-weight: normal;color:black">{{activity.createdBy.split("#")[0]}}</span> &nbsp; posted a comment.</div>
                                        <div style="padding:3px">
                                            <div class="reply-btn" v-on:click="openActivityCommentBox(activity.id)">
                                              <span uk-tooltip="Reply to this activity" style="cursor: pointer;" uk-icon="reply" title="" aria-expanded="false" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                                  <path style="fill: #c6c6c6;cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                                </svg>
                                              </span>
                                            </div>
                                        </div>
                                      </div>
                                      <div style="font-weight: normal;font-size: 0.55rem;color: rgb(179, 179, 179);padding: 0px 5px 5px;border-bottom: 1px solid rgb(232, 232, 232);width: 100%;">{{activity.createdOn}}</div>
                                      <div style="display: flex;column-gap: 10px;margin-top: 15px;padding-top: 5px;border-left: 3px solid #75757514;padding: 5px 10px;background: #f7f7f7;border-radius: 0px;transform: translate(-55px);">
                                          <div style="flex-basis: 15px;    min-width: 15px;"><span uk-icon="quote-right" class="uk-icon" style="color: #bdbdbd; "></span></div>
                                          <div style="white-space: pre-wrap;word-break: break-word;">{{activity.comment}}</div>
                                      </div>
                                  </div>
                                  <div v-if="activity.type=='NEW_SUBTASK'" style="flex-grow: 1; width: 100%;">
                                      <div class="list-item-row-1" style="display: flex;column-gap: 5px;padding: 5px;width: 100%;">
                                        <div class="task-sno" style="white-space: nowrap;color: #2196F3;">
                                          Task #{{activity.taskSno}}
                                        </div>
                                        <div style="font-weight: normal;flex-grow: 1;color: rgb(134, 134, 134);display: flex;"> - &nbsp;<span style="font-weight: normal;color:black">{{activity.createdBy.split("#")[0]}}</span> &nbsp; added subtask.</div>
                                        <div style="padding:3px">
                                            <div class="reply-btn" v-on:click="openActivityCommentBox(activity.id)">
                                              <span uk-tooltip="Reply to this activity" style="cursor: pointer;" uk-icon="reply" title="" aria-expanded="false" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                                  <path style="fill: #c6c6c6;cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                                </svg>
                                              </span>
                                            </div>
                                        </div>
                                      </div>
                                      <div style="font-weight: normal;font-size: 0.55rem;color: rgb(179, 179, 179);padding: 0px 5px 5px;border-bottom: 1px solid rgb(232, 232, 232);width: 100%;">{{activity.createdOn}}</div>

                                      <div style=";transform: translate(-55px);display: flex;column-gap: 20px;margin-top: 15px;padding-top: 5px;border-left: 3px solid #75757514;padding: 5px 10px;background: white;border-radius: 0px;">
                                          <div ><a v-on:click="openSubTask(activity.subTask.id)">Task #{{activity.subTask.sno}}</a> {{activity.subTask.name}}</div>
                                      </div>

                                  </div>
                                  <div v-else-if="activity.type=='TASK_INFO_CHANGES'" style="flex-grow: 1; width: 100%;">
                                      <div class="list-item-row-1" style="display: flex;column-gap: 5px;padding: 5px;width: 100%;">
                                        <div class="task-sno" style="white-space: nowrap;color: #2196F3;">
                                          Task #{{activity.taskSno}}
                                        </div>
                                        <div style="font-weight: normal;flex-grow: 1;color: rgb(134, 134, 134);display: flex;"> - &nbsp;<span style="font-weight: normal;color:black">{{activity.createdBy.split("#")[0]}}</span> &nbsp; updated task.</div>
                                        <div style="padding:3px">
                                            <div class="reply-btn" v-on:click="openActivityCommentBox(activity.id)">
                                              <span uk-tooltip="Reply to this activity" style="cursor: pointer;" uk-icon="reply" title="" aria-expanded="false" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                                  <path style="fill: #c6c6c6;cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                                </svg>
                                              </span>
                                            </div>
                                        </div>
                                      </div>
                                      <div style="font-weight: normal;font-size: 0.55rem;color: rgb(179, 179, 179);padding: 0px 5px 5px;border-bottom: 1px solid rgb(232, 232, 232);width: 100%;">{{activity.createdOn}}</div>
                                      <div v-if="activity.propertyChanges!=null" style=";padding-top:10px;font-size: 0.65rem;;transform: translate(-55px);">
                                          <template v-for="propChanged in activity.propertyChanges">
                                              <div v-if="propChanged.label.trim().toLowerCase()==='description'" style="display: flex;flex-direction:column;column-gap: 20px;margin-top: 15px;padding: 5px 10px;border-left: 3px solid #75757514;background: white;border-radius: 0px;flex-direction: column;;;">
                                                  <div v-if="propChanged.to!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.to}}</div>
                                                  <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                                  <div v-else-if="propChanged.referenceLabels!=null">
                                                      <div v-if="propChanged.label=='assignees removed'" style="text-decoration: line-through;text-decoration-color: red;">{{propChanged.referenceLabels.join(", ")}}</div>
                                                      <div v-else>{{propChanged.referenceLabels.join(", ")}}</div>
                                                  </div>
                                              </div>
                                              <div v-else-if="propChanged.label.trim().toLowerCase()!=='description'" style="display:flex;flex-direction:row;column-gap:20px;padding-left:0px;;padding-top: 5px;">
                                                  <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.035rem;;min-width:50px;text-align:left;font-weight: normal;color: gray;min-width: 100px;place-items: center end;">{{propChanged.label}} : </div>
                                                  <div v-if="propChanged.to!=null">{{propChanged.to}}</div>
                                                  <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                                  <div v-else-if="propChanged.referenceLabels!=null">
                                                      <div v-if="propChanged.label=='assignees removed'" style="text-decoration: line-through;text-decoration-color: red;">{{propChanged.referenceLabels.join(", ")}}</div>
                                                      <div v-else>{{propChanged.referenceLabels.join(", ")}}</div>
                                                  </div>
                                              </div>
                                          </template>
                                      </div>
                                  </div>

                                  <div v-else-if="activity.type=='TASK_CHECKLIST_ITEM_ADDED'" style="flex-grow: 1; width: 100%;">
                                      <div class="list-item-row-1" style="display: flex;column-gap: 5px;padding: 5px;width: 100%;">
                                        <div class="task-sno" style="white-space: nowrap;color: #2196F3;">
                                          Task #{{activity.taskSno}}
                                        </div>
                                        <div style="font-weight: normal;flex-grow: 1;color: rgb(134, 134, 134);display: flex;"> - &nbsp;<span style="font-weight: normal;color:black">{{activity.createdBy.split("#")[0]}}</span> &nbsp; added checklist item.</div>
                                        <div style="padding:3px">
                                            <div class="reply-btn" v-on:click="openActivityCommentBox(activity.id)">
                                              <span uk-tooltip="Reply to this activity" style="cursor: pointer;" uk-icon="reply" title="" aria-expanded="false" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                                  <path style="fill: #c6c6c6;cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                                </svg>
                                              </span>
                                            </div>
                                        </div>
                                      </div>
                                      <div style="font-weight: normal;font-size: 0.55rem;color: rgb(179, 179, 179);padding: 0px 5px 5px;border-bottom: 1px solid rgb(232, 232, 232);width: 100%;">{{activity.createdOn}}</div>
                                      <div v-if="activity.checklistItems!=null" style=";transform: translate(-55px);;padding-top:10px;font-size: 0.65rem;">
                                          <template v-for="checklistItem in activity.checklistItems">
                                            <div style="display:flex;flex-direction:row;column-gap:0px;padding-left:0px;;padding-top: 5px;">
                                                <div style="display: flex;column-gap: 20px;margin-top: 0px;padding: 5px 10px;border-left: 3px solid #75757514;background: white;border-radius: 0px;align-items: center;justify-content: center;;;">
                                                    <div style="border: 1px solid rgb(85, 85, 85); height: 10px; width: 10px; display: grid; cursor: pointer;">
                                                      <span uk-icon="check" style="background: rgb(37, 139, 255); color: white; display: none;" class="uk-icon">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg>
                                                      </span>
                                                    </div>
                                                    <div style="flex: 1 1 0%;white-space: pre-wrap;word-break: break-word;">{{checklistItem.label}}</div>
                                                </div>
                                            </div>
                                          </template>
                                      </div>
                                  </div>
                                  <div v-else-if="activity.type=='TASK_CHECKLIST_ITEM_UPDATED'" style="flex-grow: 1; width: 100%;">
                                      <div class="list-item-row-1" style="display: flex;column-gap: 5px;padding: 5px;width: 100%;">
                                        <div class="task-sno" style="white-space: nowrap;color: #2196F3;">
                                          Task #{{activity.taskSno}}
                                        </div>
                                        <div style="font-weight: normal;flex-grow: 1;color: rgb(134, 134, 134);display: flex;"> - &nbsp;<span style="font-weight: normal;color:black">{{activity.createdBy.split("#")[0]}}</span> &nbsp; updated checklist item.</div>
                                        <div style="padding:3px">
                                            <div class="reply-btn" v-on:click="openActivityCommentBox(activity.id)">
                                              <span uk-tooltip="Reply to this activity" style="cursor: pointer;" uk-icon="reply" title="" aria-expanded="false" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                                  <path style="fill: #c6c6c6;cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                                </svg>
                                              </span>
                                            </div>
                                        </div>
                                      </div>
                                      <div style="font-weight: normal;font-size: 0.55rem;color: rgb(179, 179, 179);padding: 0px 5px 5px;border-bottom: 1px solid rgb(232, 232, 232);width: 100%;">{{activity.createdOn}}</div>
                                      <div v-if="activity.checklistItems!=null" style=";transform: translate(-55px);;padding-top:10px;font-size: 0.65rem;">
                                          <template v-for="checklistItem in activity.checklistItems">
                                            <div style="display:flex;flex-direction:row;column-gap:0px;padding-left:0px;;padding-top: 5px;">
                                                <div style="display: flex;column-gap: 20px;margin-top: 0px;padding: 5px 10px;border-left: 3px solid #75757514;background: white;border-radius: 0px;align-items: center;justify-content: center;">
                                                    <div style="border: 1px solid rgb(85, 85, 85); height: 10px; width: 10px; display: grid; cursor: pointer;">
                                                      <span uk-icon="check" style="background: rgb(37, 139, 255); color: white; display: none;" class="uk-icon">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg>
                                                      </span>
                                                    </div>
                                                    <div style="flex: 1 1 0%;white-space: pre-wrap;word-break: break-word;">{{checklistItem.label}}</div>
                                                </div>
                                            </div>
                                          </template>
                                      </div>
                                  </div>
                                  <div v-else-if="activity.type=='TASK_CHECKLIST_ITEM_STATUS_UPDATE'" style="flex-grow: 1; width: 100%;">
                                      <div class="list-item-row-1" style="display: flex;column-gap: 5px;padding: 5px;width: 100%;">
                                        <div class="task-sno" style="white-space: nowrap;color: #2196F3;">
                                          Task #{{activity.taskSno}}
                                        </div>
                                        <div style="font-weight: normal;flex-grow: 1;color: rgb(134, 134, 134);display: flex;"> - &nbsp;<span style="font-weight: normal;color:black">{{activity.createdBy.split("#")[0]}}</span> &nbsp; updated checklist status.</div>
                                        <div style="padding:3px">
                                            <div class="reply-btn" v-on:click="openActivityCommentBox(activity.id)">
                                              <span uk-tooltip="Reply to this activity" style="cursor: pointer;" uk-icon="reply" title="" aria-expanded="false" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                                  <path style="fill: #c6c6c6;cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                                </svg>
                                              </span>
                                            </div>
                                        </div>
                                      </div>
                                      <div style="font-weight: normal;font-size: 0.55rem;color: rgb(179, 179, 179);padding: 0px 5px 5px;border-bottom: 1px solid rgb(232, 232, 232);width: 100%;">{{activity.createdOn}}</div>
                                      <div v-if="activity.checklistItems!=null" style=";transform: translate(-55px);;padding-top:10px;font-size: 0.65rem;">
                                          <template v-for="checklistItem in activity.checklistItems">
                                            <div style="display:flex;flex-direction:row;column-gap:0px;padding-left:0px;;padding-top: 5px;">
                                                <div style="display: flex;column-gap: 20px;margin-top: 0px;padding: 5px 10px;border-left: 3px solid #75757514;background: white;border-radius: 0px;align-items: center;justify-content: center;">
                                                    <div v-if="checklistItem.status==='COMPLETED'" style="border: 1px solid rgb(85, 85, 85); height: 10px; width: 10px; display: grid; cursor: pointer;">
                                                      <span uk-icon="check" style="background: rgb(37, 139, 255); color: white;" class="uk-icon">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg>
                                                      </span>
                                                    </div>
                                                    <div v-else-if="checklistItem.status!=='COMPLETED'" style="border: 1px solid rgb(85, 85, 85); height: 10px; width: 10px; display: grid; cursor: pointer;">
                                                      <span uk-icon="check" style="background: rgb(37, 139, 255); color: white; display: none;" class="uk-icon">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg>
                                                      </span>
                                                    </div>
                                                    <div v-if="checklistItem.status==='COMPLETED'" style="flex: 1 1 0%;text-decoration: line-through red;white-space: pre-wrap;word-break: break-word;">{{checklistItem.label}}</div>
                                                    <div v-else-if="checklistItem.status!=='COMPLETED'" style="flex: 1 1 0%;white-space: pre-wrap;word-break: break-word;">{{checklistItem.label}}</div>
                                                </div>
                                            </div>
                                          </template>
                                      </div>
                                  </div>

                                  <div v-else-if="activity.type=='TASK_REMINDER_ADDED' " style="flex-grow: 1; width: 100%;">
                                      <div class="list-item-row-1" style="display: flex;column-gap: 5px;padding: 5px;width: 100%;">
                                        <div class="task-sno" style="white-space: nowrap;color: #2196F3;">
                                          Task #{{activity.taskSno}}
                                        </div>
                                        <div style="font-weight: normal;flex-grow: 1;color: rgb(134, 134, 134);display: flex;"> - &nbsp;<span style="font-weight: normal;color:black">{{activity.createdBy.split("#")[0]}}</span> &nbsp; added reminder.</div>
                                        <div style="padding:3px">
                                            <div class="reply-btn" v-on:click="openActivityCommentBox(activity.id)">
                                              <span uk-tooltip="Reply to this activity" style="cursor: pointer;" uk-icon="reply" title="" aria-expanded="false" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                                  <path style="fill: #c6c6c6;cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                                </svg>
                                              </span>
                                            </div>
                                        </div>
                                      </div>
                                      <div style="font-weight: normal;font-size: 0.55rem;color: rgb(179, 179, 179);padding: 0px 5px 5px;border-bottom: 1px solid rgb(232, 232, 232);width: 100%;">{{activity.createdOn}}</div>
                                      <div v-if="activity.propertyChanges!=null" style=";transform: translate(-55px);;padding-top:10px;font-size: 0.65rem;">
                                          <template v-for="propChanged in activity.propertyChanges">
                                              <div v-if="propChanged.label.trim().toLowerCase()==='description'" style="display: flex;flex-direction:column;column-gap: 20px;margin-top: 15px;padding: 5px 10px;border-left: 3px solid #75757514;background: white;border-radius: 0px;flex-direction: column;">
                                                  <div v-if="propChanged.to!=null">{{propChanged.to}}</div>
                                                  <div v-else-if="propChanged.toDate!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.toDate}}</div>
                                                  <div v-else-if="propChanged.referenceLabels!=null">
                                                      <div v-if="propChanged.label=='assignees removed'" style="text-decoration: line-through;text-decoration-color: red;">{{propChanged.referenceLabels.join(", ")}}</div>
                                                      <div v-else>{{propChanged.referenceLabels.join(", ")}}</div>
                                                  </div>
                                              </div>
                                              <div v-else-if="propChanged.label.trim().toLowerCase()!=='description'" style="display:flex;flex-direction:row;column-gap:20px;padding-left:0px;;padding-top: 5px;">
                                                  <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.035rem;;min-width:50px;text-align:left;font-weight: normal;color: gray;;min-width: 100px;place-items: center end;">{{propChanged.label}} : </div>
                                                  <div v-if="propChanged.to!=null">{{propChanged.to}}</div>
                                                  <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                                  <div v-else-if="propChanged.referenceLabels!=null">
                                                      <div v-if="propChanged.label=='assignees removed'" style="text-decoration: line-through;text-decoration-color: red;">{{propChanged.referenceLabels.join(", ")}}</div>
                                                      <div v-else>{{propChanged.referenceLabels.join(", ")}}</div>
                                                  </div>
                                              </div>
                                          </template>
                                      </div>
                                  </div>
                                  <div v-else-if="activity.type=='TASK_REMINDER_CHANGES' " style="flex-grow: 1; width: 100%;">
                                      <div class="list-item-row-1" style="display: flex;column-gap: 5px;padding: 5px;width: 100%;">
                                        <div class="task-sno" style="white-space: nowrap;color: #2196F3;">
                                          Task #{{activity.taskSno}}
                                        </div>
                                        <div style="font-weight: normal;flex-grow: 1;color: rgb(134, 134, 134);display: flex;"> - &nbsp;<span style="font-weight: normal;color:black">{{activity.createdBy.split("#")[0]}}</span> &nbsp; updated reminder.</div>
                                        <div style="padding:3px">
                                            <div class="reply-btn" v-on:click="openActivityCommentBox(activity.id)">
                                              <span uk-tooltip="Reply to this activity" style="cursor: pointer;" uk-icon="reply" title="" aria-expanded="false" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                                  <path style="fill: #c6c6c6;cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                                </svg>
                                              </span>
                                            </div>
                                        </div>
                                      </div>
                                      <div style="font-weight: normal;font-size: 0.55rem;color: rgb(179, 179, 179);padding: 0px 5px 5px;border-bottom: 1px solid rgb(232, 232, 232);width: 100%;">{{activity.createdOn}}</div>
                                      <div v-if="activity.propertyChanges!=null" style=";transform: translate(-55px);;padding-top:10px;font-size: 0.65rem;">
                                          <template v-for="propChanged in activity.propertyChanges">
                                              <div v-if="propChanged.label.trim().toLowerCase()==='description'" style="display: flex;flex-direction:column;column-gap: 20px;margin-top: 15px;padding: 5px 10px;border-left: 3px solid #75757514;background: white;border-radius: 0px;flex-direction: column;">
                                                  <div v-if="propChanged.to!=null">{{propChanged.to}}</div>
                                                  <div v-else-if="propChanged.toDate!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.toDate}}</div>
                                                  <div v-else-if="propChanged.referenceLabels!=null">
                                                      <div v-if="propChanged.label=='assignees removed'" style="text-decoration: line-through;text-decoration-color: red;">{{propChanged.referenceLabels.join(", ")}}</div>
                                                      <div v-else>{{propChanged.referenceLabels.join(", ")}}</div>
                                                  </div>
                                              </div>
                                              <div v-else-if="propChanged.label.trim().toLowerCase()!=='description'" style="display:flex;flex-direction:row;column-gap:20px;padding-left:0px;;padding-top: 5px;">
                                                  <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.035rem;;min-width:50px;text-align:left;font-weight: normal;color: gray;min-width: 100px;place-items: center end;">{{propChanged.label}} : </div>
                                                  <div v-if="propChanged.to!=null">{{propChanged.to}}</div>
                                                  <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                                  <div v-else-if="propChanged.referenceLabels!=null">
                                                      <div v-if="propChanged.label=='assignees removed'" style="text-decoration: line-through;text-decoration-color: red;">{{propChanged.referenceLabels.join(", ")}}</div>
                                                      <div v-else>{{propChanged.referenceLabels.join(", ")}}</div>
                                                  </div>
                                              </div>
                                          </template>
                                      </div>
                                  </div>
                                  <div v-else-if="activity.type=='TASK_TIMELOG_ADDED'" style="flex-grow: 1; width: 100%;">
                                      <div class="list-item-row-1" style="display: flex;column-gap: 5px;padding: 5px;width: 100%;">
                                        <div class="task-sno" style="white-space: nowrap;color: #2196F3;">
                                          Task #{{activity.taskSno}}
                                        </div>
                                        <div style="font-weight: normal;flex-grow: 1;color: rgb(134, 134, 134);display: flex;"> - &nbsp;<span style="font-weight: normal;color:black">{{activity.createdBy.split("#")[0]}}</span> &nbsp; added timelog.</div>
                                        <div style="padding:3px">
                                            <div class="reply-btn" v-on:click="openActivityCommentBox(activity.id)">
                                              <span uk-tooltip="Reply to this activity" style="cursor: pointer;" uk-icon="reply" title="" aria-expanded="false" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                                  <path style="fill: #c6c6c6;cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                                </svg>
                                              </span>
                                            </div>
                                        </div>
                                      </div>
                                      <div style="font-weight: normal;font-size: 0.55rem;color: rgb(179, 179, 179);padding: 0px 5px 5px;border-bottom: 1px solid rgb(232, 232, 232);width: 100%;">{{activity.createdOn}}</div>
                                      <div v-if="activity.propertyChanges!=null" style=";transform: translate(-55px);;padding-top:10px;font-size: 0.65rem;">
                                          <template v-for="propChanged in activity.propertyChanges">
                                              <div v-if="propChanged.label.trim().toLowerCase()==='description'" style="display: flex;flex-direction:column;column-gap: 20px;margin-top: 15px;padding: 5px 10px;border-left: 3px solid #75757514;background: white;border-radius: 0px;flex-direction: column;">
                                                  <div v-if="propChanged.to!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.to}}</div>
                                                  <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                              </div>
                                              <div  v-else-if="propChanged.label.trim().toLowerCase()!=='description'" style="display:flex;column-gap:20px;padding-left:0px;;padding-top: 5px;">
                                                  <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.035rem;;min-width:50px;text-align:left;font-weight: normal;color: gray;min-width: 100px;place-items: center end;">{{propChanged.label}} : </div>
                                                  <div v-if="propChanged.to!=null">{{propChanged.to}}</div>
                                                  <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                              </div>
                                          </template>
                                      </div>
                                  </div>
                                  <div v-else-if="activity.type=='TASK_TIMELOG_CHANGES'" style="flex-grow: 1; width: 100%;">
                                      <div class="list-item-row-1" style="display: flex;column-gap: 5px;padding: 5px;width: 100%;">
                                        <div class="task-sno" style="white-space: nowrap;color: #2196F3;">
                                          Task #{{activity.taskSno}}
                                        </div>
                                        <div style="font-weight: normal;flex-grow: 1;color: rgb(134, 134, 134);display: flex;"> - &nbsp;<span style="font-weight: normal;color:black">{{activity.createdBy.split("#")[0]}}</span> &nbsp; updated timelog.</div>
                                        <div style="padding:3px">
                                            <div class="reply-btn" v-on:click="openActivityCommentBox(activity.id)">
                                              <span uk-tooltip="Reply to this activity" style="cursor: pointer;" uk-icon="reply" title="" aria-expanded="false" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                                  <path style="fill: #c6c6c6;cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                                </svg>
                                              </span>
                                            </div>
                                        </div>
                                      </div>
                                      <div style="font-weight: normal;font-size: 0.55rem;color: rgb(179, 179, 179);padding: 0px 5px 5px;border-bottom: 1px solid rgb(232, 232, 232);width: 100%;">{{activity.createdOn}}</div>
                                      <div v-if="activity.propertyChanges!=null" style=";transform: translate(-55px);;padding-top:10px;font-size: 0.65rem;">
                                          <template v-for="propChanged in activity.propertyChanges">
                                              <div v-if="propChanged.label.trim().toLowerCase()==='description'" style="display: flex;flex-direction:column;column-gap: 20px;margin-top: 15px;padding: 5px 10px;border-left: 3px solid #75757514;background: white;border-radius: 0px;flex-direction: column;">
                                                  <div v-if="propChanged.to!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.to}}</div>
                                                  <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                              </div>
                                              <div v-else-if="propChanged.label.trim().toLowerCase()!=='description'" style="display:flex;column-gap:20px;padding-left:0px;;padding-top: 5px;">
                                                  <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.035rem;;min-width:50px;text-align:left;font-weight: normal;color: gray;min-width: 100px;place-items: center end;">{{propChanged.label}} : </div>
                                                  <div v-if="propChanged.to!=null">{{propChanged.to}}</div>
                                                  <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                              </div>
                                          </template>
                                      </div>
                                  </div>

                                </div>

                                <div v-if="activity.replies!==null && activity.replies.length>0" style="display:flex;gap:10px">
                                    <a v-if="activity.replies.length>1" v-on:click="showReplies($event)" style="color: gray;display: flex; align-items: center; justify-content: center; gap: 5px;">
                                      <span style="pointer-events:none;display: flex;align-items: center;"><i data-visualcompletion="css-img" class="hu5pjgll m6k467ps" style="background-image:url('/resources/images/glyph.png');background-position:-18px -290px;background-size:74px 364px;width:16px;height:16px;background-repeat:no-repeat;display:inline-block;filter: opacity(0.2);"></i></span>
                                      <span style="pointer-events:none;"> {{activity.replies.length}} replies </span>
                                    </a>
                                    <a v-if="activity.replies.length===1" v-on:click="showReplies($event)" style="color: gray;display: flex; align-items: center; justify-content: center; gap: 5px;">
                                      <span style="pointer-events:none;display: flex;align-items: center;"><i data-visualcompletion="css-img" class="hu5pjgll m6k467ps" style="background-image:url('/resources/images/glyph.png');background-position:-18px -290px;background-size:74px 364px;width:16px;height:16px;background-repeat:no-repeat;display:inline-block;filter: opacity(0.2);"></i></span>
                                      <span style="pointer-events:none;"> {{activity.replies.length}} reply </span>
                                    </a>
                                    <a v-on:click="openActivityCommentBox(activity.id)" style="color: gray;display: flex;align-items: center;justify-content: center;gap: 5px;">
                                      <span uk-tooltip="Reply to this activity" style="cursor: pointer;color: gray;" title="" aria-expanded="false">
                                        <svg width="15" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                          <path style="fill: #c6c6c6;cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                        </svg>
                                      </span>
                                      <span> Reply </span>
                                    </a>
                                </div>
                                <div style="display: flex;flex-direction: column;width: 100%;justify-content: flex-start;align-items: flex-start;" class="replies hidden" >
                                    <template v-for="reply in activity.replies">
                                          <div style="margin: 5px 0px 5px 0px;padding-right: 10px;padding-bottom: 5px;box-sizing: border-box;border-bottom: 1px solid #eaeaea;display: flex;flex-direction: column;width: 100%;justify-content: flex-start;align-items: flex-start;">
                                            <div style="display: flex;justify-content: space-between;width: 100%;">
                                              <div><b>{{reply.commentedByName}}</b></div>
                                              <div style="font-size: 0.55rem;color: gray;">
                                                {{reply.commentedOn}}
                                              </div>
                                            </div>
                                            <div>
                                              {{reply.comment}}
                                            </div>
                                          </div>
                                    </template>
                                </div>
                                <div v-bind:id="'reply_comment_box_' + activity.id" class="hide_display" style="place-items: flex-start flex-start;width: 100%;flex-direction: column;place-self: flex-start flex-start;">
                                  <div style="display: flex;padding: 5px 10px;place-self: flex-start;width: 100%;box-sizing: border-box;">
                                      <textarea tabindex="3" v-bind:id="'reply_comment_textarea_' + activity.id" class="uk-textarea " rows="3" placeholder="" style="width:100%;border-radius:3px"></textarea>
                                  </div>
                                  <div style="display: flex;padding: 5px 10px;place-self: flex-start;">
                                      <button  v-bind:id="'reply_btn_' + activity.id"  v-on:click="saveActivityComment(activity.id,activity.taskId)" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: #4caf50;border-radius: 3px;place-self: center;place-items: center;min-widthx: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;">
                                          <div style="display: grid;grid-template-columns: auto auto;">
                                            <div>
                                              <span uk-icon="icon:comment;ratio:0.75" class="uk-icon"></span>
                                            </div>
                                            <div>&nbsp;&nbsp;&nbsp;Post Comment</div>
                                          </div>
                                      </button>
                                      <button v-on:click="closeActivityCommentBox(activity.id)" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" data-v-487245b7="" style="background-color: rgb(245 245 245);border-radius: 3px;place-self: center;place-items: center;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-top: 0px;margin-left: 10px;color: grey;border: 1px solid #d8d8d8;"><div style="display: grid; grid-template-columns: auto auto;"><div >Close</div></div></button>
                                  </div>
                                </div>
                            </div>
                        </div>
                      </div>

                      -->


                      <div class="activity_box fade_revealx" style="position:relative"  v-bind:class="{'new_activity': activity.hide}"  v-bind:id="'channel_task_activity_' + activity.id"  >
                          <div style="position: absolute;left: -10px;">

                               <img v-bind:data-img-id="activity.createdById"  class="yoyo uk-border-pill ui-navbar-profile-image"
                                    v-bind:src="'/api/us/profile/get/' + activity.createdById"
                                    onerror="this.onerror=null;this.src='resources/images/male_default_pic.png';"
                                    width="25" height="25"
                                    style="border:1px solid rgb(220 220 220);xbackground: #ffeb3b;padding: 2px;margin-left: 0px;height: 45px;width: 45px;">
                          </div>
                          <div style="display:flex;flex-direction:column;margin-bottom:0px;margin-left: 40px;">

                              <div class="activity_description">
                                <div v-if="activity.type=='NEW_COMMENT'">
                                    <div v-on:click="toggleActivityDetail($event)"  style="padding: 5px;flex-direction: column;cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: flex-start;">
                                      <span v-bind:data-activity-id="activity.id"
                                            v-bind:data-task-id="activity.taskId"
                                            v-bind:data-createdby-id="activity.createdById"
                                            v-bind:data-activity-type="activity.type"
                                            class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                          <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                      </span>
                                      <div>
                                        <span style="color: #2196F3;">Task#{{activity.taskSno}}</span>
                                        <span style="color: rgb(78 78 78 / 77%);letter-spacing: 0.25px;font-weight: bold;"> - {{activity.taskName}}</span>
                                      </div>
                                      <div style="color:gray;font-size: 0.65rem;">
                                        <span style="font-weight: normal;">{{activity.createdBy.split("#")[0]}}</span> commented
                                        <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;"> {{activity.createdOnAgo}}</span>
                                      </div>
                                    </div>
                                    <div  class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;padding-top: 5px;border-left: 3px solid #75757514;padding: 5px 10px;background: white;border-radius: 0px;">
                                        <div style="flex-basis: 15px;    min-width: 15px;"><span uk-icon="quote-right" class="uk-icon" style="color: #bdbdbd; "></span></div>
                                        <div style="white-space: pre-wrap;word-break: break-word;">{{activity.comment}}</div>
                                    </div>
                                    <div class="activity_detail hide_activity_detail" style="font-weight: normal;font-size: 0.75rem;color: rgb(179, 179, 179);margin-top: 15px;margin-bottom: 15px;" v-if="activity.hasAttachments!==null && activity.hasAttachments===true">
                                        <div v-for="attachment in activity.formAttachments">
                                            <div style="display: flex;column-gap: 5px;align-items: center;">
                                              <span uk-tooltip="Upload Document.<br> Only .csv, .xls, .doc, .docx, .pdf files accepted." data-v-6ad5a684="" style="cursor: pointer; display: grid; place-self: center flex-start;" title="" aria-expanded="false"><svg class="svg-inline--fa fa-paperclip fa-w-14" data-v-6ad5a684="" style="padding: 0px; font-size: 12px; color: rgb(141, 124, 124); display: grid; place-self: center;" aria-hidden="true" data-fa-processed="" data-prefix="fas" data-icon="paperclip" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M43.246 466.142c-58.43-60.289-57.341-157.511 1.386-217.581L254.392 34c44.316-45.332 116.351-45.336 160.671 0 43.89 44.894 43.943 117.329 0 162.276L232.214 383.128c-29.855 30.537-78.633 30.111-107.982-.998-28.275-29.97-27.368-77.473 1.452-106.953l143.743-146.835c6.182-6.314 16.312-6.422 22.626-.241l22.861 22.379c6.315 6.182 6.422 16.312.241 22.626L171.427 319.927c-4.932 5.045-5.236 13.428-.648 18.292 4.372 4.634 11.245 4.711 15.688.165l182.849-186.851c19.613-20.062 19.613-52.725-.011-72.798-19.189-19.627-49.957-19.637-69.154 0L90.39 293.295c-34.763 35.56-35.299 93.12-1.191 128.313 34.01 35.093 88.985 35.137 123.058.286l172.06-175.999c6.177-6.319 16.307-6.433 22.626-.256l22.877 22.364c6.319 6.177 6.434 16.307.256 22.626l-172.06 175.998c-59.576 60.938-155.943 60.216-214.77-.485z"></path></svg><!-- <i class="fas fa-paperclip" data-v-6ad5a684="" style="padding: 0px; font-size: 18px; color: rgb(141, 124, 124); display: grid; place-self: center;"></i> --></span>
                                              <span> <a v-on:click="downloadFile(attachment.name)">{{attachment.name}}</a></span>
                                              <span v-if="attachment.size!==null && attachment.size>0" style="font-weight: normal;font-size: 0.55rem;color: rgb(106 119 102);padding-top: 2px;"><a style="color:inherit;text-decoration:none;">{{(attachment.size/1024).toFixed(2)}}Kb</a></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="activity.type=='NEW_SUBTASK'">
                                    <div v-on:click="toggleActivityDetail($event)"  style="padding: 5px;flex-direction: column;cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: flex-start;">
                                      <span v-bind:data-activity-id="activity.id" v-bind:data-task-id="activity.taskId"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                          <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                      </span>
                                      <div>
                                        <span style="color: #2196F3;">Task#{{activity.taskSno}}</span>
                                        <span style="color: rgb(78 78 78 / 77%);letter-spacing: 0.25px;font-weight: bold;"> - {{activity.taskName}}</span>
                                      </div>
                                      <div style="color:gray;font-size: 0.65rem;">
                                        <span style="font-weight: normal;">{{activity.createdBy.split("#")[0]}}</span> added subtask Task#{{activity.subTask.sno}}
                                        <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;">&nbsp;{{activity.createdOnAgo}}</span>
                                      </div>
                                    </div>
                                    <div  class="activity_detail hide_activity_detail" style="column-gap: 20px;margin-top: 15px;margin-bottom: 15px;padding-top: 5px;border-left: 3px solid #75757514;padding: 5px 10px;background: white;border-radius: 0px;">
                                        <div ><a v-on:click="openSubTask(activity.subTask.id)">Task #{{activity.subTask.sno}}</a> {{activity.subTask.name}}</div>
                                    </div>
                                </div>

                                <div v-else-if="activity.type=='NEW_TASK'">
                                    <div v-on:click="toggleActivityDetail($event)"  style="padding: 5px;flex-direction: column;cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: flex-start;">
                                      <span v-bind:data-activity-id="activity.id" v-bind:data-task-id="activity.taskId"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                          <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                      </span>
                                      <div>
                                        <span style="color: #2196F3;">Task#{{activity.taskSno}}</span>
                                        <span style="color: rgb(78 78 78 / 77%);letter-spacing: 0.25px;font-weight: bold;"> - {{activity.taskName}}</span>
                                      </div>
                                      <div style="color:gray;font-size: 0.65rem;">
                                        <span style="font-weight: normal;">{{activity.createdBy.split("#")[0]}}</span> create task
                                        <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;">&nbsp;{{activity.createdOnAgo}}</span>
                                      </div>
                                    </div>
                                    <div v-if="activity.initialPropertyValues!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-right: 15px;margin-bottom: 15px;background: white;border-radius: 0px;align-items: flex-start;display: flex;flex-direction: column;" >
                                        <template v-for="propAdded in activity.initialPropertyValues">
                                            <div v-if="propAdded.label!=='id'" style="display:flex;column-gap:5px;padding-left:30px;;padding-top: 5px;align-items: center;">
                                                <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.055rem;;min-widthxx:150px;text-align:right;min-width:125px;opacity: 0.5;">{{propAdded.label}} - </div>
                                                <div v-if="propAdded.initialValue!==null" style="white-space: pre-wrap;word-break: break-word;">
                                                  <span v-if="propAdded.label==='sno'">Task#{{propAdded.initialValue}}</span>
                                                  <span v-else>{{propAdded.initialValue}}</span>
                                                </div>
                                                <div v-else-if="propAdded.initialDate!==null">{{propAdded.initialDate}}</div>
                                                <div v-else-if="propAdded.embeddedReference!==null">{{propAdded.embeddedReference.label}}</div>
                                                <div v-else-if="propAdded.initialReferences!==null" style="display:flex;column-gap:5px">
                                                    <div v-for="item, idx in propAdded.initialReferences">
                                                      {{item.label}}
                                                      <span v-if="idx < propAdded.initialReferences.length-1">, </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </div>

                                <div v-else-if="activity.type=='TASK_INFO_CHANGES'">
                                    <div v-on:click="toggleActivityDetail($event)"  style="padding: 5px;flex-direction: column;cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: flex-start;">
                                      <span v-bind:data-activity-id="activity.id" v-bind:data-task-id="activity.taskId"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                          <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                      </span>
                                      <div>
                                        <span style="color: #2196F3;">Task#{{activity.taskSno}}</span>
                                        <span style="color: rgb(78 78 78 / 77%);letter-spacing: 0.25px;font-weight: bold;"> - {{activity.taskName}}</span>
                                      </div>
                                      <div style="color:gray;font-size: 0.65rem;">
                                        <span style="font-weight: normal;">{{activity.createdBy.split("#")[0]}}</span> updated task.
                                        <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;">&nbsp;{{activity.createdOnAgo}}</span>
                                      </div>
                                    </div>

                                    <div v-if="activity.propertyChanges!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;align-items: center;" >
                                        <template v-for="propChanged in activity.propertyChanges">
                                            <div style="display:flex;column-gap:5px;padding-left:30px;;padding-top: 5px;align-items: center;">
                                                <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.055rem;;min-width:125px;text-align:right;opacity: 0.5;">{{propChanged.label}} - </div>
                                                <div v-if="propChanged.to!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.to}}</div>
                                                <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                                <div v-else-if="propChanged.referenceLabels!=null">
                                                    <div v-if="propChanged.label=='assignees removed'" style="text-decoration: line-through;text-decoration-color: red;">{{propChanged.referenceLabels.join(", ")}}</div>
                                                    <div v-else>{{propChanged.referenceLabels.join(", ")}}</div>
                                                </div>
                                                <div v-else-if="propChanged.changedReferences!=null" style="display:flex;gap:5px">

                                                    <div v-for="changedObject, idx in propChanged.changedReferences">
                                                        <div v-bind:data-id="changedObject.id">
                                                          {{changedObject.label}}
                                                          <span v-if="idx < propChanged.changedReferences.length-1">, </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </div>

                                <div v-else-if="activity.type=='TASK_CHECKLIST_ITEM_ADDED'" style="flex-grow: 1;width: 100%;">

                                    <div v-on:click="toggleActivityDetail($event)"  style="padding: 5px;flex-direction: column;cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: flex-start;">
                                      <span v-bind:data-activity-id="activity.id" v-bind:data-task-id="activity.taskId"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                          <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                      </span>
                                      <div>
                                        <span style="color: #2196F3;">Task#{{activity.taskSno}}</span>
                                        <span style="color: rgb(78 78 78 / 77%);letter-spacing: 0.25px;font-weight: bold;"> - {{activity.taskName}}</span>
                                      </div>
                                      <div style="color:gray;font-size: 0.65rem;">
                                        <span style="font-weight: normal;">{{activity.createdBy.split("#")[0]}}</span> added checklist item
                                        <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;">&nbsp;{{activity.createdOnAgo}}</span>
                                      </div>
                                    </div>

                                    <div v-if="activity.checklistItems!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;">
                                        <template v-for="checklistItem in activity.checklistItems">
                                          <div style="display:flex;flex-direction:row;column-gap:0px;padding-left:0px;;padding-top: 5px;">
                                              <div style="display: flex;column-gap: 20px;margin-top: 0px;padding: 5px 10px;border-left: 3px solid #75757514;background: white;border-radius: 0px;align-items: center;justify-content: center;">
                                                  <div style="border: 1px solid rgb(85, 85, 85); height: 10px; width: 10px; display: grid; cursor: pointer;">
                                                    <span uk-icon="check" style="background: rgb(31, 105, 189); color: white; display: none;" class="uk-icon">
                                                      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg>
                                                    </span>
                                                  </div><!---->
                                                  <div style="flex: 1 1 0%;">{{checklistItem.label}}</div>
                                              </div>
                                          </div>
                                        </template>
                                    </div>
                                </div>
                                <div v-else-if="activity.type=='TASK_CHECKLIST_ITEM_UPDATED'" style="flex-grow: 1;width: 100%;">
                                    <div v-on:click="toggleActivityDetail($event)"  style="padding: 5px;flex-direction: column;cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: flex-start;">
                                      <span v-bind:data-activity-id="activity.id" v-bind:data-task-id="activity.taskId"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                          <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                      </span>
                                      <div>
                                        <span style="color: #2196F3;">Task#{{activity.taskSno}}</span>
                                        <span style="color: rgb(78 78 78 / 77%);letter-spacing: 0.25px;font-weight: bold;"> - {{activity.taskName}}</span>
                                      </div>
                                      <div style="color:gray;font-size: 0.65rem;">
                                        <span style="font-weight: normal;">{{activity.createdBy.split("#")[0]}}</span> updated checklist item
                                        <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;">&nbsp;{{activity.createdOnAgo}}</span>
                                      </div>
                                    </div>
                                    <div v-if="activity.checklistItems!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;">
                                        <template v-for="checklistItem in activity.checklistItems">
                                          <div style="display:flex;flex-direction:row;column-gap:0px;padding-left:0px;;padding-top: 5px;">
                                              <div style="display: flex;column-gap: 20px;margin-top: 0px;padding: 5px 10px;border-left: 3px solid #75757514;background: white;border-radius: 0px;align-items: center;justify-content: center;">
                                                  <div style="border: 1px solid rgb(85, 85, 85); height: 10px; width: 10px; display: grid; cursor: pointer;">
                                                    <span uk-icon="check" style="background: rgb(31, 105, 189); color: white; display: none;" class="uk-icon">
                                                      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg>
                                                    </span>
                                                  </div><!---->
                                                  <div style="flex: 1 1 0%;">{{checklistItem.label}}</div>
                                              </div>
                                          </div>
                                        </template>
                                    </div>
                                </div>
                                <div v-else-if="activity.type=='TASK_CHECKLIST_ITEM_STATUS_UPDATE'" style="flex-grow: 1;width: 100%;">

                                    <div v-on:click="toggleActivityDetail($event)"  style="padding: 5px;flex-direction: column;cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: flex-start;">
                                      <span v-bind:data-activity-id="activity.id" v-bind:data-task-id="activity.taskId"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                          <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                      </span>
                                      <div>
                                        <span style="color: #2196F3;">Task#{{activity.taskSno}}</span>
                                        <span style="color: rgb(78 78 78 / 77%);letter-spacing: 0.25px;font-weight: bold;"> - {{activity.taskName}}</span>
                                      </div>
                                      <div style="color:gray;font-size: 0.65rem;">
                                        <span style="font-weight: normal;">{{activity.createdBy.split("#")[0]}}</span> updated checklist status
                                        <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;">&nbsp;{{activity.createdOnAgo}}</span>
                                      </div>
                                    </div>
                                    <div v-if="activity.checklistItems!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;">
                                        <template v-for="checklistItem in activity.checklistItems">
                                          <div style="display:flex;flex-direction:row;column-gap:0px;padding-left:0px;;padding-top: 5px;">
                                              <div style="display: flex;column-gap: 20px;margin-top: 0px;padding: 5px 10px;border-left: 3px solid #75757514;background: white;border-radius: 0px;align-items: center;justify-content: center;">
                                                  <div v-if="checklistItem.status==='COMPLETED'" style="border: 1px solid rgb(85, 85, 85); height: 10px; width: 10px; display: grid; cursor: pointer;">
                                                    <span uk-icon="check" style="background: rgb(31, 105, 189); color: white;" class="uk-icon">
                                                      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg>
                                                    </span>
                                                  </div><!---->
                                                  <div v-else-if="checklistItem.status!=='COMPLETED'" style="border: 1px solid rgb(85, 85, 85); height: 10px; width: 10px; display: grid; cursor: pointer;">
                                                    <span uk-icon="check" style="background: rgb(31, 105, 189); color: white; display: none;" class="uk-icon">
                                                      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg>
                                                    </span>
                                                  </div><!---->
                                                  <div v-if="checklistItem.status==='COMPLETED'" style="flex: 1 1 0%;text-decoration: line-through red;">{{checklistItem.label}}</div>
                                                  <div v-else-if="checklistItem.status!=='COMPLETED'" style="flex: 1 1 0%;">{{checklistItem.label}}</div>
                                              </div>
                                          </div>
                                        </template>
                                    </div>
                                </div>

                                <div v-else-if="activity.type=='TASK_REMINDER_ADDED' ">
                                    <div v-on:click="toggleActivityDetail($event)"  style="padding: 5px;flex-direction: column;cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: flex-start;">
                                      <span v-bind:data-activity-id="activity.id" v-bind:data-task-id="activity.taskId"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                          <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                      </span>
                                      <div>
                                        <span style="color: #2196F3;">Task#{{activity.taskSno}}</span>
                                        <span style="color: rgb(78 78 78 / 77%);letter-spacing: 0.25px;font-weight: bold;"> - {{activity.taskName}}</span>
                                      </div>
                                      <div style="color:gray;font-size: 0.65rem;">
                                        <span style="font-weight: normal;">{{activity.createdBy.split("#")[0]}}</span> added reminder
                                        <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;">&nbsp;{{activity.createdOnAgo}}</span>
                                      </div>
                                    </div>
                                    <div v-if="activity.propertyChanges!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;">
                                        <template v-for="propChanged in activity.propertyChanges">
                                            <div style="display:flex;column-gap:20px;padding-left:30px;;padding-top: 5px;">
                                                <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.055rem;;min-widthx:150px;text-align:right">{{propChanged.label}} - </div>
                                                <div v-if="propChanged.to!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.to}}</div>
                                                <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                                <div v-else-if="propChanged.referenceLabels!=null">
                                                    <div v-if="propChanged.label=='assignees removed'" style="text-decoration: line-through;text-decoration-color: red;">{{propChanged.referenceLabels.join(", ")}}</div>
                                                    <div v-else>{{propChanged.referenceLabels.join(", ")}}</div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <div v-else-if="activity.type=='TASK_REMINDER_CHANGES' ">
                                    <div v-on:click="toggleActivityDetail($event)"  style="padding: 5px;flex-direction: column;cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: flex-start;">
                                      <span v-bind:data-activity-id="activity.id" v-bind:data-task-id="activity.taskId"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                          <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                      </span>
                                      <div>
                                        <span style="color: #2196F3;">Task#{{activity.taskSno}}</span>
                                        <span style="color: rgb(78 78 78 / 77%);letter-spacing: 0.25px;font-weight: bold;"> - {{activity.taskName}}</span>
                                      </div>
                                      <div style="color:gray;font-size: 0.65rem;">
                                        <span style="font-weight: normal;">{{activity.createdBy.split("#")[0]}}</span> updated reminder
                                        <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;">&nbsp;{{activity.createdOnAgo}}</span>
                                      </div>
                                    </div>
                                    <div v-if="activity.propertyChanges!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;">
                                        <template v-for="propChanged in activity.propertyChanges">
                                            <div style="display:flex;column-gap:20px;padding-left:30px;;padding-top: 5px;">
                                                <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.055rem;min-widthx:150px;text-align:right">{{propChanged.label}} - </div>
                                                <div v-if="propChanged.to!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.to}}</div>
                                                <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                                <div v-else-if="propChanged.referenceLabels!=null">
                                                    <div v-if="propChanged.label=='assignees removed'" style="text-decoration: line-through;text-decoration-color: red;">{{propChanged.referenceLabels.join(", ")}}</div>
                                                    <div v-else>{{propChanged.referenceLabels.join(", ")}}</div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <div v-else-if="activity.type=='TASK_TIMELOG_ADDED'">
                                    <div v-on:click="toggleActivityDetail($event)"  style="padding: 5px;flex-direction: column;cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: flex-start;">
                                      <span v-bind:data-activity-id="activity.id" v-bind:data-task-id="activity.taskId"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                          <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                      </span>
                                      <div>
                                        <span style="color: #2196F3;">Task#{{activity.taskSno}}</span>
                                        <span style="color: rgb(78 78 78 / 77%);letter-spacing: 0.25px;font-weight: bold;"> - {{activity.taskName}}</span>
                                      </div>
                                      <div style="color:gray;font-size: 0.65rem;">
                                        <span style="font-weight: normal;">{{activity.createdBy.split("#")[0]}}</span> added timelog
                                        <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;">&nbsp;{{activity.createdOnAgo}}</span>
                                      </div>
                                    </div>
                                    <div v-if="activity.propertyChanges!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;">
                                        <template v-for="propChanged in activity.propertyChanges">
                                            <div style="display:flex;column-gap:20px;padding-left:30px;;padding-top: 5px;">
                                                <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.055rem;;min-widthx:150px;text-align:right">{{propChanged.label}} - </div>
                                                <div v-if="propChanged.to!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.to}}</div>
                                                <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <div v-else-if="activity.type=='TASK_TIMELOG_CHANGES'">
                                    <div v-on:click="toggleActivityDetail($event)"  style="padding: 5px;flex-direction: column;cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: flex-start;">
                                      <span v-bind:data-activity-id="activity.id" v-bind:data-task-id="activity.taskId"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                          <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                      </span>
                                      <div>
                                        <span style="color: #2196F3;">Task#{{activity.taskSno}}</span>
                                        <span style="color: rgb(78 78 78 / 77%);letter-spacing: 0.25px;font-weight: bold;"> - {{activity.taskName}}</span>
                                      </div>
                                      <div style="color:gray;font-size: 0.65rem;">
                                        <span style="font-weight: normal;">{{activity.createdBy.split("#")[0]}}</span> updated timelog
                                        <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;">&nbsp;{{activity.createdOnAgo}}</span>
                                      </div>
                                    </div>
                                    <div v-if="activity.propertyChanges!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;">
                                        <template v-for="propChanged in activity.propertyChanges">
                                            <div style="display:flex;column-gap:20px;padding-left:30px;;padding-top: 5px;">
                                                <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.055rem;;min-widthx:150px;text-align:right">{{propChanged.label}} - </div>
                                                <div v-if="propChanged.to!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.to}}</div>
                                                <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                            </div>
                                        </template>
                                    </div>
                                </div>

                                <div v-if="activity.replies===null || activity.replies!==undefined" class="replyToTrigger" style="display:none;gap: 10px;position: absolute;right: -60px;top: 10px;">
                                    <a v-on:click="openActivityCommentBox(activity.id)" style="color: gray;display: flex;align-items: center;justify-content: center;gap: 5px;">
                                      <span uk-tooltip="Reply to this activity" style="cursor: pointer;" title="" aria-expanded="false" >
                                        <svg width="15" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                          <path style="fill:rgb(88 88 88);cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                        </svg>
                                      </span>
                                      <span> Reply </span>
                                    </a>
                                </div>

                              </div>

                              <div v-if="activity.replies!==null && activity.replies!==undefined && activity.replies.length>0" style="display:flex;gap:10px">
                                  <a v-if="activity.replies.length>1" v-on:click="showReplies($event)" style="display: flex; align-items: center; justify-content: center; gap: 5px;">
                                    <span style="pointer-events:none;display: flex;align-items: center;"><i data-visualcompletion="css-img" class="hu5pjgll m6k467ps" style="background-image:url('/resources/images/glyph.png');background-position:-18px -290px;background-size:74px 364px;width:16px;height:16px;background-repeat:no-repeat;display:inline-block;filter: opacity(0.2);"></i></span>
                                    <span style="pointer-events:none;user-select:none"> {{activity.replies.length}} replies </span>
                                  </a>
                                  <a v-if="activity.replies.length===1" v-on:click="showReplies($event)" style="display: flex; align-items: center; justify-content: center; gap: 5px;">
                                    <span style="pointer-events:none;display: flex;align-items: center;"><i data-visualcompletion="css-img" class="hu5pjgll m6k467ps" style="background-image:url('/resources/images/glyph.png');background-position:-18px -290px;background-size:74px 364px;width:16px;height:16px;background-repeat:no-repeat;display:inline-block;filter: opacity(0.2);"></i></span>
                                    <span style="pointer-events:none;user-select:none"> {{activity.replies.length}} reply </span>
                                  </a>
                                  <a v-on:click="openActivityCommentBox(activity.id)" style=";user-select:none;color: gray;display: flex;align-items: center;justify-content: center;gap: 5px;display:none;">
                                    <span uk-tooltip="Reply to this activity" style="cursor: pointer;" title="" aria-expanded="false">
                                      <svg width="15" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                        <path style="fill: gray;cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                      </svg>
                                    </span>
                                    <span > Reply </span>
                                  </a>
                              </div>
                              <div class="replies hidden" >

                                  <div class="reply_tree_trunk"></div>
                                  <template v-for="reply in activity.replies">
                                    <div class="activity_reply">
                                      <div class="reply_tree_branch"></div>
                                      <div style="display: flex;justify-content: start;align-items: center;width: 100%;gap: 10px;margin-bottom: 7px;">
                                        <div style="font-weight: normal;"><span style="color: #3da4f7;">{{reply.commentedByName}}</span></div>
                                        <div style="font-weight: normal; font-size: 0.55rem; color: rgb(179, 179, 179);">
                                          {{reply.commentedOnAgo}}
                                        </div>
                                      </div>
                                      <div>
                                        {{reply.comment}}
                                      </div>
                                    </div>
                                  </template>

                                  <a v-on:click="openActivityCommentBox(activity.id)" style="margin-top:10px;color: gray;display: flex;align-items: center;justify-content: center;gap: 5px;">
                                    <span uk-tooltip="Reply to this activity" style="cursor: pointer;" title="" aria-expanded="false">
                                      <svg width="15" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                        <path style="fill: gray;cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                      </svg>
                                    </span>
                                    <span> Reply to this thread</span>
                                  </a>
                              </div>
                              <div v-bind:id="'reply_comment_box_' + activity.id" class="reply_form hide_display " style="place-items: flex-start;width: 100%;flex-direction: column;place-self: flex-start;margin-left: 15px;margin-top: 5px;">
                                <div style="display: flex;padding: 5px 10px;place-self: flex-start;width: 100%;box-sizing: border-box;">
                                    <textarea tabindex="3" v-bind:id="'reply_comment_textarea_' + activity.id" class="uk-textarea " rows="3" placeholder="" style="width:100%;border-radius:3px"></textarea>
                                </div>
                                <div style="display: flex;padding: 5px 10px;place-self: flex-start;">
                                    <button  v-bind:id="'reply_btn_' + activity.id"  v-on:click="saveActivityComment(activity.id,activity.taskId)" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(255 255 255 / 31%);border-radius: 3px;place-self: center;place-items: center;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;border: 1px solid gray;color: gray;">
                                        <div style="display: grid;grid-template-columns: auto auto;place-items:center">
                                          <div>
                                            <span uk-icon="icon:comment;ratio:0.75" class="uk-icon"></span>
                                          </div>
                                          <div>&nbsp;&nbsp;&nbsp;Post Comment</div>
                                        </div>
                                    </button>
                                    <button v-on:click="closeActivityCommentBox(activity.id)" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" data-v-487245b7="" style="background-color: rgb(245 245 245);border-radius: 3px;place-self: center;place-items: center;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-top: 0px;margin-left: 10px;color: grey;border: 1px solid gray;"><div style="display: grid; grid-template-columns: auto auto;"><div >Cancel</div></div></button>
                                </div>
                              </div>
                          </div>
                      </div>


                  </template>
                  <div id="isActivityListIntersectionObserver"
                       class="ui_grid_row"
                       style="margin-right: 10px;padding: 7px 12px; border-bottom: 0em solid rgb(229, 229, 229); display: grid; place-items: center; background: rgb(255, 255, 255); color: rgb(158, 158, 158);">
                    <span style="">No more activity records.</span>
                  </div>
                </div>
            </div>
        </div>
      </div>

    </div>

    <div class="pane-detail-view" style="position: relative; margin-top: 10px; margin-left: 10px; border-left: 1px solid rgb(204, 204, 204); border-top: 1px solid rgb(204, 204, 204); border-top-left-radius: 10px; overflow-y: hidden; display: flex; flex-grow: 1; flex-basis: 70%; box-sizing: border-box;">

        <div v-show="!isTaskChosen
                  && !displayNewForm
                  && !displayNewSubTaskForm
                  && !displayNewScheduledTaskForm
                  && !displayNewRecurringTaskForm
                  && !displayTaskTemplateForm" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
            <div style="display: flex;grid-template-rows: 1fr;flex-grow: 1;overflow-y: hidden;align-items: center;justify-content: center;">
                No Task chosen.
            </div>
        </div>
        <div v-show="isTaskChosen" style="display:flex;flex-grow: 1;grid-template-rows:1fr;overflow-y:hidden">
            <taskview-format-2 embeddingViewName="task_channel"  v-bind:loggedInUser="loggedInUser" v-bind:id="selectedTask.id" v-bind:selectedTask="selectedTask" v-on:refreshList="refreshPaneList()"></taskview-format-2>
        </div>
    </div>

    <div class="task_filter_form" v-show="showTaskFilter">
        <div class="first_column_scrollable custom-scroll-bar" style="font-size: 0.7rem;left: 20px;right: 20px;top: -1px;opacity: 1;z-index: 100;background: rgb(31 105 189);border-width: 3px 3px 3px 3px;border-top-style: initial;border-right-style: solid;border-bottom-style: solid;border-left-style: solid;border-top-style: solid;border-top-color: rgb(37, 139, 255);border-right-color: rgb(37, 139, 255);border-bottom-color: rgb(37, 139, 255);border-left-color: rgb(37, 139, 255);border-image: initial;box-shadow: rgba(0, 0, 0, 0.12) 0px 15px 12px 0px;border-radius: 3px;">
            <task-search-modal v-on:filterTasks="filterTasks($event)" />
        </div>
    </div>

    <!--
    <div v-show="isChatViewOn" style="display:flex;width:100%">
        <chat-book v-bind:loggedInUser="loggedInUser"></chat-book>
    </div>
    -->

    <div id="task-from-template-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="display: flex;width: 55%;flex-direction: column;;overflow-y: hidden;font-size: 0.65rem;padding: 0px;border: 0px solid rgba(0, 0, 0, 0.57);">

            <!--<button class="uk-modal-close-default" type="button" uk-close ></button>-->

            <div style="display: flex;font-size: 1rem;margin-bottom: 10px;background: #f3f3f3;margin-top: 0px;padding: 10px;">

              <button v-on:click="closeTaskFromTemplateModal()" v-bind:uk-tooltip="'Go back'"
                class="uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button subtask-back-button"
                style="border-radius: 3px;align-self:flex-flex-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" >
                  <path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"></path>
                </svg>
              </button>
              <div style="font-weight: bold;display: flex;align-items: center;flex-grow: 1;justify-content: center;">Pick a Task Template</div>
              <hr>

            </div>
            <div style="display: flex;justify-content: center;flex-grow: 1;padding: 30px 10px;">
              <form style="width: 90%;margin-top: 0px;padding-top: 0px;padding-right:0px;padding-left: 0px;margin-left: -15px;"
                    class="uk-grid-small uk-grid ui-form" uk-grid onsubmit="return false;">

                    <div class="uk-width-1-4@s" style="margin-top: 0px;">
                        <label class="uk-form-label" for="form-stacked-text">Select Category</label>
                        <select tabindex="7" v-model="newTaskFromTemplate.categoryId" class="uk-select" id="form-stacked-select"
                                v-on:change="loadMatchingTaskTemplates()">
                            <option v-for="cat in availableCategories" v-bind:value="cat.id + '#' + cat.name">{{cat.name}}</option>
                        </select>
                    </div>
                    <div class="uk-width-1-2@s" style="margin-top: 0px;">
                        <label class="uk-form-label" for="form-stacked-text">Select Template</label>
                        <select tabindex="7" v-model="newTaskFromTemplate.taskTemplateInfo" class="uk-select" id="form-stacked-select">
                            <option v-for="formTemplate in matchingTaskTemplates" v-bind:value="formTemplate.id + '#' + formTemplate.name">{{formTemplate.name}}</option>
                        </select>
                    </div>
                    <div class="uk-width-1-4@s" style="margin-top: 0px;display: flex;align-items: flex-end;">
                        <button tabindex="11" id="attachFormTemplateButton" v-on:click="closeTaskFromTemplateModal()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(76, 175, 80);border-radius: 3px;min-width: 125px;height: 37px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;">
                          <div style="display: grid;grid-template-columns: auto auto;">
                            <div>&nbsp;&nbsp;&nbsp;Use Template</div>
                          </div>
                        </button>
                    </div>
              </form>
            </div>

        </div>
    </div>
  </div>

</template>

<script>

import { Vue } from 'vue';
import { bus } from './../../../main.js';
import uiListMixinLib from './../../mixins/lib/ui-list.js';
import utilsMixinLib from './../../mixins/lib/utils_lib';
import userMixinLib from './../../mixins/lib/user_mixin_lib.js';
import rsocket from './../../mixins/lib/rsocket';

export default {
  mixins: [uiListMixinLib, utilsMixinLib, userMixinLib, rsocket],
  props: ['loggedInUser'],
  data: function () {
    return {

      hookSubmenuCurrentlySelected: null,
      isActivityListByInvolvedTasksOrCategory: 'involvedTasks',
      activitySearchQuery: '',
      taskListName: 'Inbox',
      // loggedInUser: {},
      api: 'tasks',
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
      isCallActive: false, // If the user is on an active call, it must not show "Join" options,

      shouldCollapseMiddleMessages: false,
      collapseText: 'Show',
      list: [],

      isTaskChosen: false,
      selectedTask: {},
      isTaskCreationInProcess: false,
      displayNewForm: false,
      displayNewSubTaskForm: false,
      displayNewScheduledTaskForm: false,
      displayNewRecurringTaskForm: false,
      displayTaskTemplateForm: false,
      parentTask: {}, // This is used only when creating a new-sub-task
      resetTime: {
        time: new Date().getTime()
      },

      isCategoryFilterOn: false,
      filterByCategoryId: null,

      isTaskFilterOn: false,
      taskFilter: null,

      activityList: [],
      currentPageNumberOfActivities: 1,
      isActivityListIntersectionObserverFired: false,
      allActivityRecordsFetched: false,

      rsocket: {
        socket: null // This will be populated with the connected socket from the 'connected-rsocket' bus event listener.
      },

      categoryChannelConnected: null,
      userInvolvedChannelConnected: null,

      showTaskFilter: false,
      filter: null,

      /* New Task from Template - March 25 2021 */
      newTaskFromTemplate: {},
      availableCategories: [],
      matchingTaskTemplates: [],
      chosenTaskTemplate: null,
      chosenTaskCategory: null,
      isCategorySubmenuOpened: false,
      isActivityTypeSubmenuOpened: false,

      myCategoriesList: [],
      isNewTaskOptionsOpen: false,

      taskFilters: [
        { key: 'inbox', name: 'Inbox', isChecked: true },
        { key: 'sent', name: 'Sent', isChecked: false },
        { key: 'overdue', name: 'Overdue', isChecked: false }
      ],
      activityTypeFilters: [
        { key: 'NEW_TASK', name: 'New Task', isChecked: false },
        { key: 'NEW_SUBTASK', name: 'New SubTask', isChecked: false },
        { key: 'NEW_COMMENT', name: 'New Comments', isChecked: false },
        { key: 'TASK_INFO_CHANGES', name: 'Task Changes', isChecked: false },
        { key: 'TASK_CHECKLIST_ITEM_ADDED', name: 'Checklist Added', isChecked: false },
        { key: 'TASK_CHECKLIST_ITEM_STATUS_UPDATE', name: 'Checklist Status Updated', isChecked: false },
        { key: 'TASK_REMINDER_ADDED', name: 'Reminder Added', isChecked: false },
        { key: 'TASK_TIMELOG_ADDED', name: 'Timelog Added', isChecked: false }
      ]
    };
  },
  methods: {

    // Toggle buttons



    toggleActivityDetail (event) {
      const trigger = event.target;

      // If the dropdown trigger was clicked, then ignore opening the details
      if (event.target.classList.contains("activity_detail_trigger"))
      {
        return false;
      }

      event.target.classList.toggle('flip_vertically');

      const elementTarget = event.target.closest('.activity_description');
      console.log(elementTarget);
      console.log(elementTarget.querySelector('.activity_detail'));

      if (elementTarget.querySelector('.activity_detail') !== null) {
        Array.from(elementTarget.querySelectorAll('.activity_detail'))
             .forEach(hiddenDetail => {
               hiddenDetail.classList.toggle('hide_activity_detail');
             });

      }
    },
    showReplies (event) {
      event.target.parentElement.parentElement.querySelector('.replies').classList.toggle('hidden');
    },
    closeActivityContextMenu () {

        const activityItemContextMenu = document.querySelector('.channel_activity_item_context_menu');
              activityItemContextMenu.classList.remove("opened");
              activityItemContextMenu.style.transform = null;
    },
    openContextMenu (event) {

      const availableActivitiesContainer = document.querySelector('.activities_list_in_channel');
      event.stopPropagation();
      event.preventDefault();

      console.log("target clicked is ", event.target);

      // Ignore this click event as it landed else where.
      if (!event.target.classList.contains("activity_detail_trigger"))
      {
        // Position the context menus
        const primaryButton = event.target;
        const activityItemContextMenu = document.querySelector('.channel_activity_item_context_menu');
              activityItemContextMenu.classList.remove("opened");

        this.closeActivityContextMenu();
        return false;
      }
      else if (event.target.classList.contains("activity_detail_trigger")) {

        // Position the context menus
        const primaryButton = event.target;
        const activityItemContextMenu = document.querySelector('.channel_activity_item_context_menu');


        // close it if its opened.
        if (activityItemContextMenu.classList.contains("opened")) {
          this.closeActivityContextMenu();
          return false;
        }

        this.clickedActivityId = primaryButton.getAttribute("data-activity-id");
        console.log("clickedActivityId : ", this.clickedActivityId);
        activityItemContextMenu.setAttribute("data-selected-activity-id", this.clickedActivityId);
        activityItemContextMenu.setAttribute("data-event-source", "activity-channel");
        activityItemContextMenu.setAttribute("data-task-id", primaryButton.getAttribute("data-task-id"));

        // Show the option of 'Cancel Comment' only if the currently loggedInUser has posted it and only if its of the type "NEW_COMMENT"
        if (primaryButton.getAttribute("data-activity-type") === 'NEW_COMMENT' && primaryButton.getAttribute("data-createdby-id") === this.loggedInUser.userId) {
          activityItemContextMenu.querySelector(".cancel_comment_option").classList.remove("hide_display");
        }
        else {
          activityItemContextMenu.querySelector(".cancel_comment_option").classList.add("hide_display");
        }
        activityItemContextMenu.classList.add("opened");
        const bcr = primaryButton.getBoundingClientRect();
        const menuVerticalGap = document.querySelector("body").getBoundingClientRect().bottom - bcr.bottom;
        const menuHorizontalGap = document.querySelector("body").getBoundingClientRect().right - bcr.right;
        const contextMenuHeight = 200;
        const contextMenuWidth = 150;
        const doesMenuHaveEnoughVerticalVisibleSpace = menuVerticalGap > contextMenuHeight;
        const doesMenuHaveEnoughHorizontalVisibleSpace = menuHorizontalGap > contextMenuWidth;



        // console.log("primaryButton's BCR ", bcr);

        if (doesMenuHaveEnoughVerticalVisibleSpace && doesMenuHaveEnoughHorizontalVisibleSpace)
        {
          activityItemContextMenu.style.transformOrigin = "left top";
          activityItemContextMenu.style.top = bcr.top + bcr.height + 2 + 'px';
          activityItemContextMenu.style.left = bcr.left + 'px';
        }
        else if (!doesMenuHaveEnoughVerticalVisibleSpace && doesMenuHaveEnoughHorizontalVisibleSpace)
        {
          activityItemContextMenu.style.transformOrigin = "left bottom";
          activityItemContextMenu.style.top = bcr.top - contextMenuHeight - 35 + bcr.height + 2 + 'px';
          activityItemContextMenu.style.left = bcr.left + 'px';
        }
        else if (doesMenuHaveEnoughVerticalVisibleSpace && !doesMenuHaveEnoughHorizontalVisibleSpace)
        {
          activityItemContextMenu.style.transformOrigin = "right top";
          activityItemContextMenu.style.top = bcr.top + 2 + 'px';
          activityItemContextMenu.style.left = bcr.left - contextMenuWidth - bcr.width + 'px';
        }
        else if (!doesMenuHaveEnoughVerticalVisibleSpace && !doesMenuHaveEnoughHorizontalVisibleSpace)
        {
          activityItemContextMenu.style.transformOrigin = "right bottom";
          activityItemContextMenu.style.top = bcr.top - contextMenuHeight + 2 + 'px';
          activityItemContextMenu.style.left = bcr.left - contextMenuWidth - bcr.width + 'px';
        }

        console.log("menu bcr : ", bcr);
        console.log("availableActivitiesContainer bcr : ", availableActivitiesContainer.getBoundingClientRect());
        console.log("doesMenuHaveEnoughVerticalVisibleSpace : ", menuVerticalGap, (menuVerticalGap - contextMenuHeight), doesMenuHaveEnoughVerticalVisibleSpace);
        setTimeout(() => {
          activityItemContextMenu.style.opacity = "1";
          activityItemContextMenu.style.transform = "scale(1)";
          activityItemContextMenu.style.display = null;
        }, 150);
      }

    },
    // Handling context menu actions
    handleContextMenuClicked (data) {

        // PROBLEM :
        // Since the context menu bus events send data to both activity-channel.vue and activity-tab.vue,
        // this event gets fired twice, whenever a "replyToActivity" context option is clicked. This results in the unhiding
        // of the activity's reply input box in both activity-channel list and activity-tab-list. This is wrong behavior.
        // If any activity is replied to within the activity-tab's list, then the reply comment box must open only in that tab
        // and not in the activity-channel's list.
        //
        // SOLUTION :
        // When we receive events from the bus here, we check for the source and only if the source matches, then we proceed, else
        // we just ignore the event.
        if (data.eventSource !== 'activity-channel') {
          return false;
        }

        // Don't use state variables such as this.** here within listeners.
        // Because they don't update when the data changes, but component doesn't get reloaded.
        // For example, this.clickedActivityId if passed into handleReplyAction as a parameter,
        //    it only passes the value of this.clickedActivityId when this component was mounted.
        //    it doesn't update that value. So always fire only functions from listeners and let the fired
        //    function extract the current data from within its function body.

        console.log("handleContextMenuClicked this.clickedActivityId received in " + this.embeddingComponentName + " : ", this.clickedActivityId);
        console.log("action data : ", data);

        if (data.action === 'reply') {
          this.handleReplyAction(data);
        } else if (data.action === 'view_task') {
          this.showTaskDetailsOfThisActivity(data.taskId, data.selectedActivityId);
        }
    },
    handleReplyAction (data) {
      console.log("handleReplyAction this.clickedActivityId received in " + this.embeddingComponentName + " : ", this.clickedActivityId);
      console.log("data received via bus selectedActivityId : ", data.selectedActivityId);
      this.openActivityCommentBox(data.selectedActivityId);
      this.closeActivityContextMenu();
    },

    /* Task Activity Filter menu functions begins here */

    openTaskActivityFilterContextMenu (msgId, evt) {
      const contextMenu = document.querySelector('#task_activity_filter_ctx_menu');
      contextMenu.style.top = '30px';

      if (!contextMenu.classList.contains('opened')) {
        // document.getElementById("ctx_menu_" + msgId).style.display = "grid";
        contextMenu.style.transform = 'scale(1)';
        contextMenu.classList.add('opened');
      } else {
        // document.getElementById("ctx_menu_" + msgId).style.display = "none";
        contextMenu.style.transform = null;
        contextMenu.classList.remove('opened');
      }

      // Add click-listener
      document.querySelector('body').addEventListener('click', this.handleClickEventOnBody, false);

      // document.getElementById("ctx-menu-trigger-" + msgId).style.opacity=1;
    },
    hideContextMenu () {
      document.querySelectorAll('.context-menu').forEach((item) => {
        // item.style.display="none";
        item.style.transform = null;
        item.classList.remove('opened');
      });

      // Remove click listener
      document.querySelector('body').removeEventListener('click', this.handleClickEventOnBody, false);
      document.getElementById('menu_slider').style.left = '0%';
    },
    handleClickEventOnBody (event) {
      const foundParent = event.target.closest('.context-menu');
      if (foundParent === null) {
        // This means, if target on which the click happened is not within the context-menu div, so you can close the context-menu dropdown.
        this.hideContextMenu();
      }
    },
    updateSelectedTaskFilters (filterName) {
      // alert("Customer " + customerId + " is selected.");

      this.taskFilters.forEach(filter => {
        if (filter.name === filterName) {
          filter.isSelected = !filter.isSelected;
          // this.updateCustomerHook(customer);
        }
      });
    },
    updateSelectedCategoryFilters (categoryId) {
      // alert("Customer " + customerId + " is selected.");

      this.myCategoriesList.forEach(category => {
        if (category.id === categoryId) {
          category.isSelected = !category.isSelected;
          // this.updateCustomerBranchHook(customerBranch);
        }
      });
    },
    onMenuClick (selectedSubmenuName, label) {
      // Display the relevant submenu list
      this.hookSubmenuCurrentlySelected = selectedSubmenuName;
      document.getElementById('submenu_searchbox').setAttribute('placeholder', 'Search ' + label);
      document.getElementById('menu_slider').style.left = '-100%';

      // If focus is done without settimeout, then the submenu sliding doesn't animate as expected.
      setTimeout(() => document.getElementById('submenu_searchbox').focus(), 300);
    },
    onSubmenuClick () {
      document.getElementById('menu_slider').style.left = '0%';
    },
    getActivitiesByTaskFilter () {
      const filteredTasks = this.taskFilters.filter(task => task.isSelected).map(filter => filter.name);
      console.log('Filtered tasks : ', filteredTasks.join(','));
    },
    getActivitiesByCategoryFilter () {
      const filteredCategories = this.myCategoriesList.filter(cat => cat.isSelected).map(cat => cat.id);
      console.log('Filtered categories : ', filteredCategories.join(','));
    },
    /* Task Activity Filter menu functions ends here */

    goToPage: function (pageKey, params, id) {
      // this.signalHideChat();

      document.querySelectorAll('.menu-item').forEach((el) => {
        el.classList.remove('uk-active');
        el.classList.remove('selected-menu');
      });
      document.querySelector('#' + id).classList.add('uk-active');
      document.querySelector('#' + id).classList.add('selected-menu');

      this.$router.push({
        name: pageKey,
        params: params
      });
    },
    sendNewTaskEvent () {
      console.log('Event emitted in bus.', new Date());

      const basicTaskInfo = {
        eventSource: "newTaskFromChannelsView",
        subject: "",
        modalKey: "new_task",
        possibleAssignees: [],
        possibleFollowers: [] // Logically add it later.
      };

      bus.emit('newTaskEvent', basicTaskInfo);
    },
    // Function not required
    fetchTaskCounts () {
      // http://localhost:9090/tasks/tasks-count-by-category/5f82a94ad0885b18f91b6176,5f85e128212c14629bfad08c

      return new Promise(resolve => {
        const url = './tasks/tasks-count-by-filters';

        try {
          axios.get(process.env.VUE_APP_API_URL + url)
            .then((dataResponse) => {
              console.log('My Task Counts: ', dataResponse);

              dataResponse.data.forEach((countObj) => {
                if (countObj.filterName === 'inbox' && countObj.taskCount > 0) { document.getElementById('inbox_count').innerHTML = '(' + countObj.taskCount + ')'; } else if (countObj.filterName === 'sent' && countObj.taskCount > 0) { document.getElementById('sent_count').innerHTML = '(' + countObj.taskCount + ')'; } else if (countObj.filterName === 'completed' && countObj.taskCount > 0) { document.getElementById('completed_count').innerHTML = '(' + countObj.taskCount + ')'; } else if (countObj.filterName === 'overdue' && countObj.taskCount > 0) { document.getElementById('overdue_count').innerHTML = '(' + countObj.taskCount + ')'; } else { console.error("Filter not configured for '" + countObj.filterName + "'"); }
              });
            })
            .catch((error) => {
              console.error('Error while fetching my-categories-taskcounts : ', error);
            });
        } catch (error) {
          console.error('Unpaginated List data fetch error : ', error);
        }
      });
    },


    toggleCategoryFilterMenu () {
      this.isCategorySubmenuOpened = !this.isCategorySubmenuOpened;

      if (this.isCategorySubmenuOpened) {
        document.querySelector('#category-submenu-in-activity-channel').style.display = null;
        document.querySelector('#category-menu-trigger-in-activity-channel').style.transform = 'rotateX(-180deg)';
      } else {
        document.querySelector('#category-submenu-in-activity-channel').style.display = 'none';
        document.querySelector('#category-menu-trigger-in-activity-channel').style.transform = 'rotateX(0deg)';
      }
    },
    toggleActivityTypeFilterMenu () {
      this.isActivityTypeSubmenuOpened = !this.isActivityTypeSubmenuOpened;

      if (this.isActivityTypeSubmenuOpened) {
        document.querySelector('#activity-type-submenu').style.display = null;
        document.querySelector('#activity-type-menu-trigger').style.transform = 'rotateX(-180deg)';
      } else {
        document.querySelector('#activity-type-submenu').style.display = 'none';
        document.querySelector('#activity-type-menu-trigger').style.transform = 'rotateX(0deg)';
      }
    },

    // Function not required
    fetchCategoryTaskCounts (categoryList) {
      // http://localhost:9090/tasks/tasks-count-by-category/5f82a94ad0885b18f91b6176,5f85e128212c14629bfad08c
      const categoryListCSV = categoryList.map((item) => item.id)
        .join(',');

      return new Promise(resolve => {
        const url = './tasks/tasks-count-by-category/' + categoryListCSV;

        try {
          axios.get(process.env.VUE_APP_API_URL + url)
            .then((dataResponse) => {
              // console.log("My Category Task Counts: " , dataResponse);
              // this.myCategoriesList = dataResponse.data.bean;
              dataResponse.data.forEach((countObj) => {
                document.getElementById('cat_count_' + countObj.id).innerHTML = '(' + countObj.taskCount + ')';
              });
            })
            .catch((error) => {
              console.error('Error while fetching my-categories-taskcounts : ', error);
            });
        } catch (error) {
          console.error('Unpaginated List data fetch error : ', error);
        }
      });
    },

    fetchMyCategories () {
      return new Promise(resolve => {
        const url = './categories/list/mine';

        try {
          axios.get(process.env.VUE_APP_API_URL + url)
            .then((dataResponse) => {
              // console.log("My Category List: " , dataResponse);
              this.myCategoriesList = dataResponse.data.bean;
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

    updateActivityFilterForCategory (categoryPassed) {
      let index = 0;
      let matchingIndex = -1;
      this.myCategoriesList.forEach(category => {
        if (categoryPassed.id === category) {
          matchingIndex = index;
        }
        index++;
      });

      if (categoryPassed.isChecked === undefined || categoryPassed.isChecked === null) { categoryPassed.isChecked = false; }

      categoryPassed.isChecked = !categoryPassed.isChecked;

      if (matchingIndex > -1) { this.myCategoriesList[matchingIndex] = categoryPassed; }
    },
    updateActivityFilterForTaskType (taskTypePassed) {
      let index = 0;
      let matchingIndex = -1;
      this.taskFilters.forEach(taskType => {
        if (taskTypePassed.key === taskType.key) {
          matchingIndex = index;
        }
        index++;
      });

      if (taskTypePassed.isChecked === undefined || taskTypePassed.isChecked === null) { taskTypePassed.isChecked = false; }

      taskTypePassed.isChecked = !taskTypePassed.isChecked;

      if (matchingIndex > -1) { this.taskFilters[matchingIndex] = taskTypePassed; }
    },
    updateActivityFilterForActivityType (activityTypePassed) {
      let index = 0;
      let matchingIndex = -1;
      this.activityTypeFilters.forEach(taskType => {
        if (activityTypePassed.key === taskType.key) {
          matchingIndex = index;
        }
        index++;
      });

      if (activityTypePassed.isChecked === undefined || activityTypePassed.isChecked === null) { activityTypePassed.isChecked = false; }

      activityTypePassed.isChecked = !activityTypePassed.isChecked;

      if (matchingIndex > -1) { this.activityTypeFilters[matchingIndex] = activityTypePassed; }
    },

    // Filter activities by selected filters
    applySelectedFilters () {
      const filteredTasks = this.taskFilters.filter(taskType => taskType.isChecked).map(taskType => taskType.key);
      const filteredCategories = this.myCategoriesList.filter(cat => cat.isChecked).map(cat => cat.id);
      const filteredActivityTypes = this.activityTypeFilters.filter(activityType => activityType.isChecked).map(activityType => activityType.key);

      this.taskFilters.forEach(item => { console.log(item); });
      console.log(filteredTasks, filteredCategories, filteredActivityTypes);

      this.fetchFilteredActivities(true, filteredTasks, filteredCategories, filteredActivityTypes);
    },
    resetSelectedFilters () {
      this.taskFilters.filter(taskType => taskType.isChecked).forEach(taskType => { taskType.isChecked = false; });
      this.myCategoriesList.filter(cat => cat.isChecked).forEach(cat => { cat.isChecked = false; });
      this.activityTypeFilters.filter(activityType => activityType.isChecked).forEach(activityType => { activityType.isChecked = false; });
      // this.fetchInvolvedTaskActivities();
    },
    fetchFilteredActivities (isSearch, filteredTaskTypes, filteredCategories, filteredActivityTypes) {

      this.isActivityListByInvolvedTasksOrCategory = 'involvedTasks';
      if (isSearch) {
        console.log('Searching for activities with keyword : ', this.activitySearchQuery);
        this.isActivityListIntersectionObserverFired = false;
        this.allActivityRecordsFetched = false;
        this.currentPageNumberOfActivities = 1;
        this.activityList = [];

        if (this.observer !== null && document.getElementById('isActivityListIntersectionObserver') !== null) {
          this.observer.unobserve(document.getElementById('isActivityListIntersectionObserver'));
        }
      }

      // Do a post request
      const filterData = {
        filteredTaskTypes: filteredTaskTypes,
        filteredCategories: filteredCategories,
        filteredActivityTypes: filteredActivityTypes,
        pageNumber: this.currentPageNumberOfActivities,
        query: ""
      };

      // If all records are fetched, make no calls to the server again.
      if (this.allActivityRecordsFetched) { return false; }

      const query = (this.activitySearchQuery.trim() === '') ? 'all' : this.activitySearchQuery;
      const url = './task-activity/get-filtered-task-activities/';
      try {
        // VueJS ajax call-1
        axios.post(process.env.VUE_APP_API_URL + url, filterData)
          .then((dataResponse) => {
            console.log('Activity List: ', dataResponse);

            // return false;

            const list = dataResponse.data.list;

            // Since we are pulling 20 records per page, then if the resulting size is lesser than 20, then it means
            // no more records are available.
            if (list.length < 20) {
              this.allActivityRecordsFetched = true;

              // Unobserve it and reset the flag, as it might get triggered unnecessarily.
              this.isActivityListIntersectionObserverFired = false;
              if (this.observer !== null && document.getElementById('isActivityListIntersectionObserver') !== null) {
                this.observer.unobserve(document.getElementById('isActivityListIntersectionObserver'));
              }
            }

            list.forEach((item) => {
              item.taskSno = item.taskInfo.split('~')[0];
              item.taskName = item.taskInfo.split('~')[1];
              item.taskCreatedById = item.taskInfo.split('~')[2].split('#')[0];
              item.taskCreatedBy = item.taskInfo.split('~')[2].split('#')[1];


              item.createdById = item.createdBy.split('#')[1]; // For profile-pic display of the activity's creator.

              if (item.createdOn !== null) {
                // item.createdOn = new Date(item.createdOn).toLocaleString()
                //                                          .slice(0, 17)
                //                                          .replace(',', '')
                //                                          .replace('T',' ');
                // item.createdOn = this.convertUTCDateFromServerToLocalDateForDisplay(item.createdOn);
                item.createdOnFormatted = dayjs(item.createdOn + "Z").format('DD/MM/YYYY HH:mm');
                item.createdOnAgo = dayjs(item.createdOn + "Z").fromNow();
              }

              if (item.replies !== null && item.replies.length > 0) {
                item.replies.forEach(reply => {
                  reply.commentedOn = this.convertUTCDateFromServerToLocalDateForDisplay(reply.commentedOn);
                });
              }

              if (item.propertyChanges !== null) {
                item.propertyChanges.forEach(propChange => {
                  if (propChange.toDate !== null) {
                    // propChange.toDate = new Date(propChange.toDate).toLocaleString()
                    //                                                .slice(0, 17)
                    //                                                .replace(',', '')
                    //                                                .replace('T',' ');

                    propChange.toDate = this.convertUTCDateFromServerToLocalDateForDisplay(propChange.toDate);
                  }

                  // Since the status will contain the hash splitter, we need to extract only the label.
                  if (propChange.label === 'status') {
                    propChange.to = propChange.to.split('#')[1];
                  }
                });
              }

              item.hide = false;
              this.activityList.push(item);
            });

            // If there are more records to fetch, then flex-start observing the loadMore-intObsrv-trigger.
            if (!this.isActivityListIntersectionObserverFired && !this.allActivityRecordsFetched) {

              // Unobserve it and reset the flag, as it might get triggered unnecessarily.
              this.isActivityListIntersectionObserverFired = false;
              if (this.observer !== null && document.getElementById('isActivityListIntersectionObserver') !== null) {
                this.observer.unobserve(document.getElementById('isActivityListIntersectionObserver'));
              }

              // Reobserve
              this.initLoadMoreIntersectionObserverInActivityListForFilteredActivities(false, filteredTaskTypes, filteredCategories, filteredActivityTypes);
              this.isActivityListIntersectionObserverFired = true;
            }
          })
          .catch((error) => {
            console.error('fetchInvolvedTaskActivities Error : ', error);
          });
      } catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }
    },
    initLoadMoreIntersectionObserverInActivityListForFilteredActivities (isSearch, filteredTaskTypes, filteredCategories, filteredActivityTypes) {
      // console.log("bus = ", bus);

      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio <= 0) { // If not in view
          console.log('Load more trigger is not in view. ' + '#' + this.observerElement);
        } else {
          console.log('Load more trigger is in view. ' + '#' + this.observerElement);
          // observer.unobserve(document.getElementById(observerElement));

          // Increment the current page number
          this.currentPageNumberOfActivities += 1;
          // alert("Loading page number " + this.currentPageNumberOfActivities);
          this.fetchFilteredActivities(isSearch, filteredTaskTypes, filteredCategories, filteredActivityTypes);
        }
      },
      {
        root: null,
        rootMargin: '0px'
      });

      setTimeout(() => {
        this.observer.observe(document.getElementById('isActivityListIntersectionObserver'));
      }, 1000);
    },


    closeTaskFromTemplateModal () {
      UIkit.modal(document.querySelector('#task-from-template-modal')).hide();
      this.chosenTaskTemplate = {
        id: this.newTaskFromTemplate.taskTemplateInfo.split('#')[0],
        name: this.newTaskFromTemplate.taskTemplateInfo.split('#')[1]
      };

      this.chosenTaskCategory = {
        id: this.newTaskFromTemplate.categoryId.split('#')[0],
        name: this.newTaskFromTemplate.categoryId.split('#')[1]
      };

      console.log('chosenTaskCategory : ', this.chosenTaskCategory);
      console.log('chosenTaskTemplate : ', this.chosenTaskTemplate);
      this.showNewTaskFormFromTemplate(this.chosenTaskTemplate, this.chosenTaskCategory);
    },
    loadMatchingTaskTemplates () {
      console.log('Loading task templates for ', this.newTaskFromTemplate.categoryId);

      this.matchingTaskTemplates = [];

      const url = './category-processes/list/all/' + this.newTaskFromTemplate.categoryId; // Fetch all potential assignees (users)

      try {
        axios.get(process.env.VUE_APP_API_URL + url)
          .then((dataResponse) => {
            // console.log("My Category List: " , dataResponse);
            const list = dataResponse.data.bean;
            list.forEach((item) => {
              this.matchingTaskTemplates.push(item);
            });
          })
          .catch((error) => {
            console.error('Error while fetching matching-task-templates-list : ', error);
          });
      } catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }
    },
    loadAllCategories () {
      console.log('Fetching all categories');
      // return false;

      if (this.availableCategories.length > 0) {
        UIkit.modal(document.querySelector('#task-from-template-modal')).show();
        return false;
      }

      const url = './categories/list/all';

      try {
        axios.get(process.env.VUE_APP_API_URL + url)
          .then((dataResponse) => {
            // console.log("My Category List: " , dataResponse);
            const list = dataResponse.data.bean;
            list.forEach((item) => {
              this.availableCategories.push(item);
            });

            UIkit.modal(document.querySelector('#task-from-template-modal')).show();
          })
          .catch((error) => {
            console.error('Error while fetching all-categories-list : ', error);
          });
      } catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }
    },
    filterTasks (data) {
      this.filter = data;
      console.log('Received filter data from search-modal ', this.filter);

      console.log('Refreshing..');
      this.pageNumber = 1;
      this.list = [];
      this.allRecordsFetched = false;
      this.observer.unobserve(document.getElementById(this.observerElement));
      this.isIntersectionObserverFired = false;

      this.doComplexFilterSearch();
      this.showTaskFilter = !this.showTaskFilter;
    },
    doComplexFilterSearch () {
      // If all records are fetched, make no calls to the server again.
      if (this.allRecordsFetched) { return false; }

      const url = './tasks/list';
      this.filter.pageNumber = this.pageNumber;

      axios.post(process.env.VUE_APP_API_URL + url, this.filter)
        .then((dataResponse) => {
            console.log('List fetched for page number ', this.pageNumber, ' is : ', dataResponse);
            this.handleData(dataResponse);

            // If there are more records to fetch, then flex-start observing the loadMore-intObsrv-trigger.
            if (!this.isIntersectionObserverFired) {
              this.initLoadMoreIntersectionObserverForComplexFilter();
              this.isIntersectionObserverFired = true;
            }
        });
    },
    initLoadMoreIntersectionObserverForComplexFilter () {
      // console.log("bus = ", bus);

      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio <= 0) { // If not in view
          // console.log("Load more is not in view. " + "#" + this.observerElement);
        } else {
          // console.log("Load more is in view. " + "#" + this.observerElement);
          // observer.unobserve(document.getElementById(observerElement));

          // Increment the current page number
          this.pageNumber += 1;
          this.doComplexFilterSearch();
        }
      },
      {
        root: null,
        rootMargin: '0px'
      });

      setTimeout(() => {
        this.observer.observe(document.getElementById(this.observerElement));
      }, 1000);
    },

    showTaskFilterModal () {
      this.showTaskFilter = !this.showTaskFilter;
    },
    openActivityCommentBox (activityId) {
      document.querySelector('#reply_comment_box_' + activityId).classList.remove('hide_display');
      document.querySelector('#reply_comment_textarea_' + activityId).focus();
    },
    closeActivityCommentBox (activityId) {
      document.querySelector('#reply_comment_box_' + activityId).classList.add('hide_display');
    },
    saveActivityComment (activityId, taskId) {
      const comment = document.querySelector('#reply_comment_textarea_' + activityId).value;
      const btnText = document.querySelector('#reply_btn_' + activityId).innerHTML;

      const post_url = './task-activity/save-comment';

      const form = {
        id: 'New',
        taskId: taskId,
        replyToId: activityId,
        description: comment
        // attachments to follow. (file docs etc..)
      };

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {
          console.log('Task Activity comment save Result : ');
          console.log(dataResponse);

          if (dataResponse.data.id !== null) {
            const notificationLabel = 'New comment added.';

            if (document.querySelector('#reply_comment_textarea_' + activityId) !== null)
            {
              document.querySelector('#reply_comment_textarea_' + activityId).value = "";
              this.closeActivityCommentBox(activityId);
            }

            UIkit.notification(`<div class="taskone-notification">
                                                <span uk-icon="icon: check;ratio:1"></span>
                                                <div> ${notificationLabel} </div>
                                            </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 500000
            });
          } else {
            const errorMsg = (dataResponse.data).message;
            UIkit.notification("<span uk-icon='icon: warning;ratio:1'></span>" + errorMsg, {
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
            timeout: 500000
          });

          document.getElementById('commentButton').innerHTML = btnText;
          this.enableHTMLElement(document.getElementById('commentButton'));
          return false;
        });
    },
    updateCategoryActivitiesChannel (payload) {

      if (payload.data) {
        const item = payload.data;


        item.taskSno = item.taskInfo.split('~')[0];
        item.taskName = item.taskInfo.split('~')[1];
        item.taskCreatedBy = item.taskInfo.split('~')[2].split('#')[1];
        item.createdById = item.createdBy.split('#')[1]; // For profile-pic display of the activity's creator.

        if (item.createdOn !== null) {
          // item.createdOn = new Date(item.createdOn).toLocaleString()
          //   .slice(0, 17)
          //   .replace(',', '')
          //   .replace('T', ' ');
          console.log("item.createdOn = ", item.createdOn);
          // item.createdOn = this.convertUTCDateFromServerToLocalDateForDisplay(item.createdOn);
          item.createdOnFormatted = dayjs(item.createdOn + "Z").format('DD/MM/YYYY HH:mm');
          item.createdOnAgo = dayjs(item.createdOn + "Z").fromNow();
        }

        if (item.propertyChanges !== null) {
          item.propertyChanges.forEach(propChange => {
            if (propChange.toDate !== null) {
              // propChange.toDate = new Date(propChange.toDate).toLocaleString()
              //                                                .slice(0, 17)
              //                                                .replace(',', '')
              //                                                .replace('T',' ');
              //
              propChange.toDate = this.convertUTCDateFromServerToLocalDateForDisplay(propChange.toDate);
            }

            // Since the status will contain the hash splitter, we need to extract only the label.
            if (propChange.label === 'status') {
              propChange.to = propChange.to.split('#')[1];
            }
          });
        }

        // If this comment was added as a reply to an existing activity item, then add
        // it to the activity's replies array, instead of attaching it to the availableActivities.
        if (item.replyToId) {
          item.commentedOn = this.convertUTCDateFromServerToLocalDateForDisplay(item.createdOn);
          item.commentedByName = item.createdBy.split("#")[0];

          // We are deep-cloning here, because this item gets referred in the activity lists of
          // 1. activity-channel.vue
          // 2. TaskInbox's taskView's taskActivity-Tab's list
          // 3. TaskChannel's taskView's taskActivity-Tab's list
          //
          // So when adding replies, it gets added 3 times. Even though the lists are different and the components are different,
          // it is the same object that gets added across 3 lists. Since its the same object, adding a reply to the item from one component
          // from each of the above component makes it 3 additions.
          // For example, all the 3 components listening for 'new-activity' update, updates the replies array of this item.
          //  So the replies array gets populated 3 times.
          // Solution : To fix this, instead of adding the reference that we recieved from the rsocket, we are deep-cloning it.
          const clonedItem = JSON.parse(JSON.stringify(item));

          const matchingActivity = this.activityList.find(activity => activity.id === item.replyToId);

          if (matchingActivity.replies === undefined || matchingActivity.replies === null) {
            matchingActivity.replies = [];
          }

          // Find the activity item and update its 'replies' array.
          this.activityList
              .find(activity => activity.id === item.replyToId)
              .replies
              .push(clonedItem);

          console.log("Added reply entry to existing activity.");
        }
        else {

          // If this is a newly added activity, then add an empty replies array.
          item.replies = [];

          item.hide = true;

          // We are deep-cloning here, because this item gets referred in the activity lists of
          // 1. activity-channel.vue
          // 2. TaskInbox's taskView's taskActivity-Tab's list
          // 3. TaskChannel's taskView's taskActivity-Tab's list
          //
          // So when adding replies, it gets added 3 times. Even though the lists are different and the components are different,
          // it is the same object that gets added across 3 lists. Since its the same object, adding a reply to the item from one component
          // from each of the above component makes it 3 additions.
          // For example, all the 3 components listening for 'new-activity' update, updates the replies array of this item.
          //  So the replies array gets populated 3 times.
          // Solution : To fix this, instead of adding the reference that we recieved from the rsocket, we are deep-cloning it.
          const clonedItem = JSON.parse(JSON.stringify(item));
          this.activityList.unshift(clonedItem);
        }

        var newActivitySound = document.querySelector('#new_activity_notification_sound');
            newActivitySound.volume = 1;
            newActivitySound.play();


        setTimeout(() => {
          // item.hide  = false;
          // Vue.set(this.activityList,0,item);
          // this.$set(this.activityList, 0, item);
          //
          // setTimeout(()=>{
          //   document.querySelectorAll(".new_activity").forEach((el)=>{
          //     el.classList.remove("new_activity");
          //   });
          //
          console.log('Removing new_activity from ' + item.id);
          if (document.getElementById('channel_task_activity_' + item.id) !== null)
          {
            document.getElementById('channel_task_activity_' + item.id).classList.remove('new_activity');
            document.getElementById('channel_task_activity_' + item.id).classList.add('pulse_activity');
          }
          // },2000);
        }, 1000);

        document.getElementById('activity_channel_counter').style.transform = 'rotateX(360deg)';
        setTimeout(() => {
          document.getElementById('activity_channel_counter').style.transform = null;
        }, 2000);
      }
    },
    markActivityAsRead (id) {
      document.getElementById('channel_task_activity_' + id).classList.remove('new_activity');
    },

    async connectToTaskActivityInvolvedUserChannel (userId) {

      const disconnectionFromExistingChannelResult = await this.disconnectFromConnectedCategoryChannel();
      console.log('disconnectionFromExistingChannelResult is ', disconnectionFromExistingChannelResult);

      console.log('Now connecting to activity-channel ', userId);

      if (this.rsocket == null || this.rsocket == undefined) {
        console.error('Rsocket not connected. this.rsocket is ', this.rsocket);
        return false;
      }

      console.log('this.rsocket = ', this.rsocket);
      const socket = this.rsocket.socket;
      const route = 'connect-to-user-involved-task-activities-channel';

      const requestResponseData = {
        metadata: String.fromCharCode(route.length) + route,
        data: { involvedUserId: userId }
      };

      const handleRSocketResponse = (response) => {

        console.log('Connection to activity-channel is complete. Response : ', response);
        // alert("Rsocket connected to : " + route);

        if (response.data.status === 'SUCCESS') {
          document.querySelector('#activity_channel_status').classList.remove('hide_display');
          this.userInvolvedChannelConnected = userId;
        } else {
          document.querySelector('#activity_channel_status').classList.add('hide_display');
        }
      };

      if (socket !== null) {
        socket.requestResponse(requestResponseData)
              .subscribe({
                onComplete: response => handleRSocketResponse(response), // This will be called when the data upstream is all sent.
                onError: error => console.error(error) //
              });
      }
    },
    disconnectFromTaskActivityInvolvedUserChannel (userId) {
      return new Promise((resolve, reject) => {
        if (this.userInvolvedChannelConnected) {
          console.log('Disconnecting from activity-channel ', this.userInvolvedChannelConnected);

          if (this.rsocket == null || this.rsocket == undefined) {
            console.error('Rsocket not connected. this.rsocket is ', this.rsocket);
            return false;
          }

          console.log('this.rsocket = ', this.rsocket);
          const socket = this.rsocket.socket;
          const route = 'disconnect-from-user-involved-task-activities-channel';

          const requestResponseData = {
            metadata: String.fromCharCode(route.length) + route,
            data: { involvedUserId: userId }
          };

          const handleRSocketResponse = (response) => {
            console.log('disconnection from activity-channel is complete. Response : ', response);

            if (response.data.status === 'SUCCESS') {
              document.querySelector('#activity_channel_status').classList.add('hide_display');
              resolve('Disconnected from existing activity-channel-connections was successful.');
            } else {
              console.error('Error during disconnection', response);
              reject('Error during disconnection');
            }
          };

          socket.requestResponse(requestResponseData)
            .subscribe({
              onComplete: response => handleRSocketResponse(response), // This will be called when the data upstream is all sent.
              onError: error => console.error(error) //
            });
        } else {
          resolve('No existing activity-channel-connections found.');
        }
      });
    },
    async connectToCategoryChannel (categoryId) {
      const disconnectionFromExistingChannelResult = await this.disconnectFromConnectedCategoryChannel();
      console.log('disconnectionFromExistingChannelResult is ', disconnectionFromExistingChannelResult);

      console.log('Now connecting to category-channel ', categoryId);

      if (this.rsocket == null || this.rsocket == undefined) {
        console.error('Rsocket not connected. this.rsocket is ', this.rsocket);
        return false;
      }

      console.log('this.rsocket = ', this.rsocket);
      const socket = this.rsocket.socket;
      const route = 'connect-to-category-channel';

      const requestResponseData = {
        metadata: String.fromCharCode(route.length) + route,
        data: { categoryId: categoryId }
      };

      const handleRSocketResponse = (response) => {
        console.log('Connection to category-channel is complete. Response : ', response);

        if (response.data.status === 'SUCCESS') {
          document.querySelector('#activity_channel_status').classList.remove('hide_display');
          this.categoryChannelConnected = categoryId;
        } else {
          document.querySelector('#activity_channel_status').classList.add('hide_display');
        }
      };

      if (socket !== null) {
        socket.requestResponse(requestResponseData)
          .subscribe({
            onComplete: response => handleRSocketResponse(response), // This will be called when the data upstream is all sent.
            onError: error => console.error(error) //
          });
      }
    },
    disconnectFromConnectedCategoryChannel () {
      return new Promise((resolve, reject) => {
        if (this.categoryChannelConnected) {
          console.log('Disconnecting from category-channel ', this.categoryChannelConnected);

          if (this.rsocket == null || this.rsocket == undefined) {
            console.error('Rsocket not connected. this.rsocket is ', this.rsocket);
            return false;
          }

          console.log('this.rsocket = ', this.rsocket);
          const socket = this.rsocket.socket;
          const route = 'disconnect-from-category-channel';

          const requestResponseData = {
            metadata: String.fromCharCode(route.length) + route,
            data: { categoryId: this.categoryChannelConnected }
          };

          const handleRSocketResponse = (response) => {
            console.log('disconnection from category-channel is complete. Response : ', response);

            if (response.data.status === 'SUCCESS') {
              document.querySelector('#activity_channel_status').classList.add('hide_display');
              resolve('Disconnected from existing category-channel-connections was successful.');
            } else {
              console.error('Error during disconnection', response);
              reject('Error during disconnection');
            }
          };

          socket.requestResponse(requestResponseData)
            .subscribe({
              onComplete: response => handleRSocketResponse(response), // This will be called when the data upstream is all sent.
              onError: error => console.error(error) //
            });
        } else {
          resolve('No existing category-channel-connections found.');
        }
      });
    },

    showNewTaskForm () {
      console.log('Showing new task form');
      // Toggle the active state of the list-item
      document.querySelectorAll('.active').forEach(item => item.classList.remove('active'));
      this.isTaskCreationInProcess = true;
      this.isTaskChosen = false;
      this.displayNewForm = true;
      this.displayNewScheduledTaskForm = false;
      this.displayNewRecurringTaskForm = false;
      this.displayTaskTemplateForm = false;
      this.displayNewSubTaskForm = false;
      this.selectedTask = {};

      // This prop is passed to the new-form component, so that the watcher in it resets the form whenever this value changes.
      // Reason : Since the new-form component is alive, any data entered into it stays on the form until its reset.
      // Since we cannot pass events from parent to child to reset the data of the newFormObject={}, without using event-bus,
      // we are just changing the value of a prop, that can be watched everytime when the "New" button is clicked. The watcher resets the newFormObject={}
      // whenever there is a change in this prop's value.
      this.resetTime = {
        time: new Date().getTime()
      };
    },
    showNewTaskFormFromTemplate () {
      console.log('Showing new task form from template');
      // Toggle the active state of the list-item
      document.querySelectorAll('.active').forEach(item => item.classList.remove('active'));
      this.isTaskCreationInProcess = true;
      this.isTaskChosen = false;
      this.displayNewForm = false;
      this.displayNewScheduledTaskForm = false;
      this.displayNewRecurringTaskForm = false;
      this.displayTaskTemplateForm = true;
      this.displayNewSubTaskForm = false;
      this.selectedTask = {};

      // This prop is passed to the new-form component, so that the watcher in it resets the form whenever this value changes.
      // Reason : Since the new-form component is alive, any data entered into it stays on the form until its reset.
      // Since we cannot pass events from parent to child to reset the data of the newFormObject={}, without using event-bus,
      // we are just changing the value of a prop, that can be watched everytime when the "New" button is clicked. The watcher resets the newFormObject={}
      // whenever there is a change in this prop's value.
      this.resetTime = {
        time: new Date().getTime()
      };
    },
    showNewScheduledTaskForm () {
      console.log('Showing new scheduled task form');
      // Toggle the active state of the list-item
      document.querySelectorAll('.active').forEach(item => item.classList.remove('active'));
      this.isTaskCreationInProcess = true;
      this.isTaskChosen = false;
      this.displayNewForm = false;
      this.displayNewScheduledTaskForm = true;
      this.displayNewRecurringTaskForm = false;
      this.displayTaskTemplateForm = false;
      this.displayNewSubTaskForm = false;
      this.selectedTask = {};

      // This prop is passed to the new-form component, so that the watcher in it resets the form whenever this value changes.
      // Reason : Since the new-form component is alive, any data entered into it stays on the form until its reset.
      // Since we cannot pass events from parent to child to reset the data of the newFormObject={}, without using event-bus,
      // we are just changing the value of a prop, that can be watched everytime when the "New" button is clicked. The watcher resets the newFormObject={}
      // whenever there is a change in this prop's value.
      this.resetTime = {
        time: new Date().getTime()
      };
    },
    showNewRecurringTaskForm () {
      console.log('Showing new recurring task form');
      // Toggle the active state of the list-item
      document.querySelectorAll('.active').forEach(item => item.classList.remove('active'));
      this.isTaskCreationInProcess = true;
      this.isTaskChosen = false;
      this.displayNewForm = false;
      this.displayNewScheduledTaskForm = false;
      this.displayNewRecurringTaskForm = true;
      this.displayTaskTemplateForm = false;
      this.displayNewSubTaskForm = false;
      this.selectedTask = {};

      // This prop is passed to the new-form component, so that the watcher in it resets the form whenever this value changes.
      // Reason : Since the new-form component is alive, any data entered into it stays on the form until its reset.
      // Since we cannot pass events from parent to child to reset the data of the newFormObject={}, without using event-bus,
      // we are just changing the value of a prop, that can be watched everytime when the "New" button is clicked. The watcher resets the newFormObject={}
      // whenever there is a change in this prop's value.
      this.resetTime = {
        time: new Date().getTime()
      };
    },
    showNewSubTaskForm (parentTask) {
      console.log('Showing new-sub-task-form for ParentTask : ', parentTask);
      this.isTaskChosen = false;
      this.displayNewForm = false;
      this.displayNewScheduledTaskForm = false;
      this.displayNewRecurringTaskForm = false;
      this.displayTaskTemplateForm = false;
      this.displayNewSubTaskForm = true;
      this.selectedTask = {};
      this.parentTask = parentTask;
      // bus.emit('newSubtasksParentTaskChanged', parentTask);

      // This prop is passed to the new-form component, so that the watcher in it resets the form whenever this value changes.
      // Reason : Since the new-form component is alive, any data entered into it stays on the form until its reset.
      // Since we cannot pass events from parent to child to reset the data of the newFormObject={}, without using event-bus,
      // we are just changing the value of a prop, that can be watched everytime when the "New" button is clicked. The watcher resets the newFormObject={}
      // whenever there is a change in this prop's value.
      this.resetTime = {
        time: new Date().getTime()
      };
    },
    exitNewSubTaskForm () {
      console.log('Exiting new-sub-task-form..');
      this.isTaskChosen = true;
      this.displayNewForm = false;
      this.displayNewScheduledTaskForm = false;
      this.displayNewRecurringTaskForm = false;
      this.displayTaskTemplateForm = false;
      this.displayNewSubTaskForm = false;
    },
    showTaskDetailsOfThisActivity (taskId, activityId) {
      // Toggle the active state of the list-item
      document.querySelectorAll('.active').forEach(item => item.classList.remove('active'));
      document.querySelector('#' + 'channel_task_activity_' + activityId).classList.add('active');

      // this.selectedTask = this.list[idx]
      this.isTaskChosen = true;

      this.$router.push({
        name: 'view-task-inbox-specific-task',
        params: {
          taskId: taskId,
          subtaskId: 'none'
        }
      });

      this.closeActivityContextMenu();

      // alert("Router pushed to " + this.selectedTask.id);
    },
    collapseMiddleMessages () {
      console.log('shouldCollapseMiddleMessages = ' + this.shouldCollapseMiddleMessages);
      this.shouldCollapseMiddleMessages = !this.shouldCollapseMiddleMessages;

      this.collapseText = this.shouldCollapseMiddleMessages ? 'Collapse' : 'Show';
    },
    completeTask () {},

    goTo (routeName) {
      this.$router.push({
        name: routeName,
        params: {}
      });
    },
    goToHomePage () {
      this.$router.push({
        name: 'home',
        params: {}
      });
    },
    updateFetchURL () {
      const searchQuery = (this.searchQuery !== '') ? this.searchQuery : 'all';

      if (this.isCategoryFilterOn) { this.url = './tasks/list-by-category/' + this.filterByCategoryId + '/' + this.pageNumber + '/' + searchQuery; } else if (this.isTaskFilterOn) { this.url = './' + this.api + '/list/' + this.pageNumber + '/' + searchQuery + '/' + this.taskFilter; } else { this.url = './' + this.api + '/list/' + this.pageNumber + '/' + searchQuery; }
    },
    handleData (dataResponse) {
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
            task.createdOn = this.convertUTCDateFromServerToLocalDateForDisplay(task.createdOn);
          }

          if (task.dueDateTime !== null) {
            // task.dueDateTime = new Date(task.dueDateTime).toLocaleString()
            //                                          .slice(0, 17)
            //                                          .replace(',', '')
            //                                          .replace('T',' ');

            // Added during "Fix-Date-UTC-Update"
            // task.dueDateTime = new Date(task.dueDateTime + " UTC").toLocaleString();
            task.dueDateTime = this.convertUTCDateFromServerToLocalDateForDisplay(task.dueDateTime);
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

          this.list.push(task);
        });

        // When the page is refreshed with a valid taskId, then it must display the taskView.
        // Here only the view is displayed.
        // The actual taskInformation will be pulled from the task-view-ms.vue in its mounted() lifecycle hook.
        if (this.$route.params.taskId !== null && this.$route.params.taskId !== undefined && this.$route.params.taskId !== 'all') {
          this.isTaskChosen = true;

          setTimeout(() => {
            const taskId = this.$route.params.taskId;

            // Toggle the active state of the list-item
            document.querySelectorAll('.active').forEach(item => item.classList.remove('active'));
            document.querySelector('#' + 'task_' + taskId).classList.add('active');

            // If the chosen task is not in the visible area, then scroll the list to bring it to the view.
            const target = document.querySelector('#' + 'task_' + taskId);
            target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;
          }, 250);
        }
      } else {
        console.error('Error', dataResponse);
        // alert("Error : " + dataResponse)
      }
    },
    refreshPaneList () {
      console.log('Refresh pane list');
      this.resetRefreshList();
      bus.emit('refresh-task-counts', {});
    },
    fetchInvolvedTaskActivities (isSearch) {
      this.isActivityListByInvolvedTasksOrCategory = 'involvedTasks';
      if (isSearch) {
        console.log('Searching for activities with keyword : ', this.activitySearchQuery);
        this.allActivityRecordsFetched = false;
        this.currentPageNumberOfActivities = 1;
        this.activityList = [];

        if (this.observer !== null && document.getElementById('isActivityListIntersectionObserver') !== null) {
          this.observer.unobserve(document.getElementById('isActivityListIntersectionObserver'));
        }
      }

      // this.filterByCategoryId

      // If all records are fetched, make no calls to the server again.
      if (this.allActivityRecordsFetched) { return false; }

      const query = (this.activitySearchQuery.trim() === '') ? 'all' : this.activitySearchQuery;
      const url = './task-activity/list-by-involved-tasks/' + this.currentPageNumberOfActivities + '/' + query;
      try {
        // VueJS ajax call-1
        axios.get(process.env.VUE_APP_API_URL + url)
          .then((dataResponse) => {
            console.log('Activity List: ', dataResponse);
            const list = dataResponse.data.bean;

            // Since we are pulling 20 records per page, then if the resulting size is lesser than 20, then it means
            // no more records are available.
            if (list.length < 20) {
              this.allActivityRecordsFetched = true;
            }

            list.forEach((item) => {
              item.taskSno = item.taskInfo.split('~')[0];
              item.taskName = item.taskInfo.split('~')[1];
              item.taskCreatedById = item.taskInfo.split('~')[2].split('#')[0];
              item.taskCreatedBy = item.taskInfo.split('~')[2].split('#')[1];


              item.createdById = item.createdBy.split('#')[1]; // For profile-pic display of the activity's creator.

              if (item.createdOn !== null) {
                // item.createdOn = new Date(item.createdOn).toLocaleString()
                //                                          .slice(0, 17)
                //                                          .replace(',', '')
                //                                          .replace('T',' ');
                // item.createdOn = this.convertUTCDateFromServerToLocalDateForDisplay(item.createdOn);
                item.createdOnFormatted = dayjs(item.createdOn + "Z").format('DD/MM/YYYY HH:mm');
                item.createdOnAgo = dayjs(item.createdOn + "Z").fromNow();
              }

              if (item.replies !== null && item.replies.length > 0) {
                item.replies.forEach(reply => {
                  reply.commentedOn = this.convertUTCDateFromServerToLocalDateForDisplay(reply.commentedOn);
                });
              }

              if (item.propertyChanges !== null) {
                item.propertyChanges.forEach(propChange => {
                  if (propChange.toDate !== null) {
                    // propChange.toDate = new Date(propChange.toDate).toLocaleString()
                    //                                                .slice(0, 17)
                    //                                                .replace(',', '')
                    //                                                .replace('T',' ');

                    propChange.toDate = this.convertUTCDateFromServerToLocalDateForDisplay(propChange.toDate);
                  }

                  // Since the status will contain the hash splitter, we need to extract only the label.
                  if (propChange.label === 'status') {
                    propChange.to = propChange.to.split('#')[1];
                  }
                });
              }

              item.hide = false;
              this.activityList.push(item);
            });

            // If there are more records to fetch, then flex-start observing the loadMore-intObsrv-trigger.
            if (!this.isActivityListIntersectionObserverFired) {
              this.initLoadMoreIntersectionObserverInActivityList();
              this.isActivityListIntersectionObserverFired = true;
            }
          })
          .catch((error) => {
            console.error('fetchInvolvedTaskActivities Error : ', error);
          });
      } catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }
    },
    fetchCategoryActivities () {
      // this.filterByCategoryId

      this.isActivityListByInvolvedTasksOrCategory = 'category';

      // If all records are fetched, make no calls to the server again.
      if (this.allActivityRecordsFetched) { return false; }

      const query = (this.activitySearchQuery.trim() === '') ? 'all' : this.activitySearchQuery;
      const url = './task-activity/list-by-category/' + this.filterByCategoryId + '/' + this.currentPageNumberOfActivities + '/' + query;
      try {
        // VueJS ajax call-1
        axios.get(process.env.VUE_APP_API_URL + url)
          .then((dataResponse) => {
            console.log('Activity List: ', dataResponse);
            const list = dataResponse.data.bean;

            // Since we are pulling 20 records per page, then if the resulting size is lesser than 20, then it means
            // no more records are available.
            if (list.length < 20) {
              this.allActivityRecordsFetched = true;
            }

            list.forEach((item) => {
              item.taskSno = item.taskInfo.split('~')[0];
              item.taskName = item.taskInfo.split('~')[1];
              item.taskCreatedBy = item.taskInfo.split('~')[2].split('#')[1];

              if (item.createdOn !== null) {
                // item.createdOn = new Date(item.createdOn).toLocaleString()
                //                                          .slice(0, 17)
                //                                          .replace(',', '')
                //                                          .replace('T',' ');

                item.createdOn = this.convertUTCDateFromServerToLocalDateForDisplay(item.createdOn);
              }

              if (item.propertyChanges !== null) {
                item.propertyChanges.forEach(propChange => {
                  if (propChange.toDate !== null) {
                    // propChange.toDate = new Date(propChange.toDate).toLocaleString()
                    //                                                .slice(0, 17)
                    //                                                .replace(',', '')
                    //                                                .replace('T',' ');
                    propChange.toDate = this.convertUTCDateFromServerToLocalDateForDisplay(propChange.toDate);
                  }

                  // Since the status will contain the hash splitter, we need to extract only the label.
                  if (propChange.label === 'status') {
                    propChange.to = propChange.to.split('#')[1];
                  }
                });
              }

              item.hide = false;
              this.activityList.push(item);
            });

            // If there are more records to fetch, then flex-start observing the loadMore-intObsrv-trigger.
            if (!this.isActivityListIntersectionObserverFired) {
              this.initLoadMoreIntersectionObserverInActivityList();
              this.isActivityListIntersectionObserverFired = true;
            }
          })
          .catch((error) => {
            console.error('fetchCategoryActivities Error : ', error);
          });
      } catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }
    },
    initLoadMoreIntersectionObserverInActivityList () {
      // console.log("bus = ", bus);

      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio <= 0) { // If not in view
          console.log('Load more is not in view. ' + '#' + this.observerElement);
        } else {
          console.log('Load more is in view. ' + '#' + this.observerElement);
          // observer.unobserve(document.getElementById(observerElement));

          // Increment the current page number
          this.currentPageNumberOfActivities += 1;

          if (this.isActivityListByInvolvedTasksOrCategory === 'involvedTasks') { this.fetchInvolvedTaskActivities(); } else { this.fetchCategoryActivities(); }
        }
      },
      {
        root: null,
        rootMargin: '0px'
      });

      setTimeout(() => {
        this.observer.observe(document.getElementById('isActivityListIntersectionObserver'));
      }, 1000);
    },

    // function copied from adk-app.vue
    loadFilteredTasks (taskFilter, menuFilter, filterName) {
      // this.signalHideChat();

      // If the current view is any other route, then switch to inbox view.
      if (this.$route.name !== 'view-task-inbox') {
        this.$router.push({
          name: 'view-task-inbox',
          params: {
          }
        });
      }

      document.querySelectorAll('.menu-item').forEach((el) => {
        el.classList.remove('uk-active');
        el.classList.remove('selected-menu');
      }
      );
      document.querySelector('#' + menuFilter).classList.add('selected-menu');
      document.querySelector('#' + menuFilter).classList.add('uk-active');
      this.filterByTaskStatus({ key: taskFilter, filterName: filterName });
    },
    filterByTaskStatus (data) {
      this.taskListName = data.filterName;
      this.isTaskChosen = false;
      this.isTaskCreationInProcess = false;
      this.displayNewForm = false;
      this.displayNewScheduledTaskForm = false;
      this.displayNewRecurringTaskForm = false;
      this.displayTaskTemplateForm = false;
      this.displayNewSubTaskForm = false;

      // Update the url assisting data to select filtered tasks.
      this.isTaskFilterOn = true;
      this.taskFilter = data.key;

      this.isCategoryFilterOn = false;
      this.filterByCategoryId = null;
      this.resetRefreshList();

      // Reset ActivityList's data and intersection-observers
      this.activityList = [];
      this.currentPageNumberOfActivities = 1;
      this.isActivityListIntersectionObserverFired = false;
      this.allActivityRecordsFetched = false;
    },
    filterByCategory (data) {
      this.isTaskChosen = false;
      this.isTaskCreationInProcess = false;
      this.displayNewForm = false;
      this.displayNewScheduledTaskForm = false;
      this.displayNewRecurringTaskForm = false;
      this.displayTaskTemplateForm = false;
      this.displayNewSubTaskForm = false;

      if (data.name == 'all') {
        this.taskListName = 'Inbox';
        this.isCategoryFilterOn = false;
        this.filterByCategoryId = null;
        this.isTaskFilterOn = false;
        this.taskFilter = null;
        this.resetRefreshList();

        // Reset ActivityList's data and intersection-observers
        this.activityList = [];
        this.currentPageNumberOfActivities = 1;
        this.isActivityListIntersectionObserverFired = false;
        this.allActivityRecordsFetched = false;

        this.fetchInvolvedTaskActivities();
        // When no specific category is clicked, then connect to the rsocket stream and supply the userID.
        this.connectToTaskActivityInvolvedUserChannel(this.loggedInUser.userId);
      } else {
        this.taskListName = data.name;
        this.isCategoryFilterOn = true;
        this.filterByCategoryId = data.id;
        this.isTaskFilterOn = false;
        this.taskFilter = null;
        this.resetRefreshList();

        // Reset ActivityList's data and intersection-observers
        this.activityList = [];
        this.currentPageNumberOfActivities = 1;
        this.isActivityListIntersectionObserverFired = false;
        this.allActivityRecordsFetched = false;
        this.fetchCategoryActivities();

        // When the specific category is clicked, then connect to the rsocket stream and supply the categoryID.
        this.connectToCategoryChannel(this.filterByCategoryId);
      }
    },

    closeNewTaskOptions () {
      this.isNewTaskOptionsOpen = false;
      // This means, if target on which the click happened is not within the context-menu div, so you can close the context-menu dropdown.
      const activityItemContextMenu = document.getElementById('new_task_button_options');
      activityItemContextMenu.style.transform = null;

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
        const activityItemContextMenu = document.getElementById('new_task_button_options');
        activityItemContextMenu.style.transform = 'scale(1)';

        console.log('menu scaled to open.');
        document.querySelector('body').addEventListener('click', this.listenForBodyClicks, false);
      } else {
        this.closeNewTaskOptions();
      }
    },
    createTask (taskType) {
      console.log('Creating task of type : ' + taskType);
      console.log('Event emitted in bus.', new Date());

      if (taskType === 'template') { bus.emit('newTemplateTaskEvent', {}); } else if (taskType === 'scheduled') { bus.emit('newScheduledTaskEvent', {}); } else if (taskType === 'recurring') { bus.emit('newRecurringTaskEvent', {}); }

      this.closeNewTaskOptions();
    },
    loadTasksFromCategory (category) {
      document.querySelectorAll('.menu-item').forEach((el) => { el.classList.remove('uk-active'); el.classList.remove('selected-menu'); });
      document.querySelector('#cat_' + category.id).classList.add('selected-menu');
      bus.emit('filterByCategory', category);
    }

  },
  created: function () {},
  computed: {
    storeCounter: function () {
      // console.log('Accessing vuex store ', this.$store)
      // console.log('Store data accessed from home page : ' + this.$store.getters.count)
    },
    isConferenceCallActive: function () {
      return this.$store.getters.isConferenceCallActive;
    }
  },
  mounted: async function () {
    console.log('########## task-inbox.vue mounted ################');
    // this.$store.commit('increment');
    // this.storeCounter();
    // console.log('Accessing vuex store ', this.$store)
    // console.log('Store data accessed from home page : ' + this.$store.getters.count)
    // console.log('Accessing computed property : ' + this.isConferenceCallActive)
    // console.log('Done.')

    // console.log("Loading Task-Inbox.vue component..");
    this.getList();

    document.querySelector(".activities_list_in_channel")
            .addEventListener("pointerdown", e => this.openContextMenu(e));

    bus.off('onChannelActivityItemContextMenuClicked');
    bus.on('onChannelActivityItemContextMenuClicked', data => this.handleContextMenuClicked(data));

    bus.off('connected-rsocket');
    bus.on('connected-rsocket', (socket) => {
      console.log('connected-rsocket signal received over bus in task-inbox.vue');

      // alert("Received rsocket reconnected after losing connection..");
      // This socket object is received from the connectToRSocket() in rsocket.js.
      this.rsocket.socket = socket;
      // this.getUserInfoCookie(); // Load the user-information into this component's loggedInUser-property.

      this.fetchInvolvedTaskActivities();
      // When no specific category is clicked, then connect to the rsocket stream and supply the userID.
      this.connectToTaskActivityInvolvedUserChannel(this.loggedInUser.userId);
    });

    bus.off('task-activity-update-from-adk-app');
    bus.on('task-activity-update-from-adk-app', (data) => {
      console.log('task-activity-update-from-adk-app payload received in task-inbox.vue', data);
      this.updateCategoryActivitiesChannel(data);
    });

    // bus.off('newTaskEvent');
    // bus.on('newTaskEvent', (data) => {
    //   console.log('Show-New-Task-Form event received in bus.', new Date());
    //   alert("fired in activity-channel.vue");
    //   this.showNewTaskForm();
    // });

    bus.off('newTemplateTaskEvent');
    bus.on('newTemplateTaskEvent', (data) => {
      console.log('Show-New-Template-Task-Form event received in bus.', new Date());
      this.loadAllCategories(); // This function will display the modal window.
    });

    bus.off('newScheduledTaskEvent');
    bus.on('newScheduledTaskEvent', (data) => {
      console.log('Show-New-Scheduled-Task-Form event received in bus.', new Date());
      this.showNewScheduledTaskForm();
    });

    bus.off('newRecurringTaskEvent');
    bus.on('newRecurringTaskEvent', (data) => {
      console.log('Show-New-Recurring-Task-Form event received in bus.', new Date());
      this.showNewRecurringTaskForm();
    });

    bus.off('newSubTaskEvent');
    bus.on('newSubTaskEvent', (data) => {
      console.log('Show-New-Subtask-Form event received in bus.', new Date());
      this.showNewSubTaskForm(data.parentTask);
    });

    bus.off('exitNewSubTaskForm');
    bus.on('exitNewSubTaskForm', (data) => {
      this.exitNewSubTaskForm();
    });

    bus.off('filterByCategory');
    bus.on('filterByCategory', (data) => {
      this.isTaskChosen = false;
      this.isTaskCreationInProcess = false;
      this.displayNewForm = false;
      this.displayNewScheduledTaskForm = false;
      this.displayNewRecurringTaskForm = false;
      this.displayTaskTemplateForm = false;
      this.displayNewSubTaskForm = false;

      if (data.name == 'all') {
        this.taskListName = 'Inbox';
        this.isCategoryFilterOn = false;
        this.filterByCategoryId = null;
        this.isTaskFilterOn = false;
        this.taskFilter = null;
        // this.resetRefreshList();

        // Reset ActivityList's data and intersection-observers
        this.activityList = [];
        this.currentPageNumberOfActivities = 1;
        this.isActivityListIntersectionObserverFired = false;
        this.allActivityRecordsFetched = false;

        this.fetchInvolvedTaskActivities();
        // When no specific category is clicked, then connect to the rsocket stream and supply the userID.
        this.connectToTaskActivityInvolvedUserChannel(this.loggedInUser.userId);
      } else {
        this.taskListName = data.name;
        this.isCategoryFilterOn = true;
        this.filterByCategoryId = data.id;
        this.isTaskFilterOn = false;
        this.taskFilter = null;
        // this.resetRefreshList();

        // Reset ActivityList's data and intersection-observers
        this.activityList = [];
        this.currentPageNumberOfActivities = 1;
        this.isActivityListIntersectionObserverFired = false;
        this.allActivityRecordsFetched = false;
        this.fetchCategoryActivities();

        // When the specific category is clicked, then connect to the rsocket stream and supply the categoryID.
        this.connectToCategoryChannel(this.filterByCategoryId);
      }
    });

    bus.off('filterByTaskStatus');
    bus.on('filterByTaskStatus', (data) => {
      this.taskListName = data.filterName;
      this.isTaskChosen = false;
      this.isTaskCreationInProcess = false;
      this.displayNewForm = false;
      this.displayNewScheduledTaskForm = false;
      this.displayNewRecurringTaskForm = false;
      this.displayTaskTemplateForm = false;
      this.displayNewSubTaskForm = false;

      // Update the url assisting data to select filtered tasks.
      this.isTaskFilterOn = true;
      this.taskFilter = data.key;

      this.isCategoryFilterOn = false;
      this.filterByCategoryId = null;
      this.resetRefreshList();

      // Reset ActivityList's data and intersection-observers
      this.activityList = [];
      this.currentPageNumberOfActivities = 1;
      this.isActivityListIntersectionObserverFired = false;
      this.allActivityRecordsFetched = false;
    });

    bus.off('discardNewTaskForm');
    bus.on('discardNewTaskForm', (data) => {
      this.isTaskChosen = false;
      this.isTaskCreationInProcess = false;
      this.displayNewForm = false;
      this.displayNewScheduledTaskForm = false;
      this.displayNewRecurringTaskForm = false;
      this.displayTaskTemplateForm = false;
      this.displayNewSubTaskForm = false;
    });

    bus.off('refresh-task-counts');
    bus.on('refresh-task-counts', () => {
      this.fetchTaskCounts();
    });

    // When the task is edited on the "details-pane", after the update, that particular task info must be updated
    // in the list, instead of refreshing and retrieving the entire list.
    bus.off('updateTaskItemInTheList');
    bus.on('updateTaskItemInTheList', data => {
      console.log('updateTaskItemInTheList is ', data);

      let index = 0;
      let matchingIndex = -1;
      this.list.forEach(task => {
        if (task.id === data.id) {
          if (data.subTaskIds === null) { data.subTaskIds = []; }

          if (data.createdBy !== null) { data.createdBy = data.createdBy.split('#')[1]; }

          console.log('\t Found matching task item. replacing it with this one : ', data.name);
          matchingIndex = index;
        }
        index++;
      });

      if (matchingIndex > -1) { this.list[matchingIndex] = data; }

      console.log('\t replaced at index : ', matchingIndex);
      // this.list.sort(); //Mutating method.
    });

    const result2 = await this.fetchMyCategories();
    console.log('MyCategories fetch result', result2);

    // Position the context menus
    const primaryButton = document.getElementById('new_task_button');
    const activityItemContextMenu = document.getElementById('new_task_button_options');
    const bcr = primaryButton.getBoundingClientRect();
    // console.log("primaryButton's BCR ", bcr);
    activityItemContextMenu.style.top = bcr.top + bcr.height + 2 + 'px';
    activityItemContextMenu.style.left = bcr.left + 'px';

    // Pull the activity-list
    this.fetchInvolvedTaskActivities();
  },
  watch: {
    myCategoriesList: {

      handler (newValue) {
        console.log('new mycategories-list-value : ', newValue);
      },
      deep: true
    },
    activityList: {

      handler (newValue) {
        // alert("New activity in channels component..");
        console.log('new activityList entry : ', newValue);
      },
      deep: true
    },
    '$route.params.taskId' (newTaskId, oldTaskId) {
      console.log('param-taskId in inbox has changed from ' + oldTaskId + ' to ' + newTaskId);

      if (newTaskId === undefined) {
        this.isTaskChosen = false;
        this.displayNewForm = false;
        this.displayNewScheduledTaskForm = false;
        this.displayNewRecurringTaskForm = false;
        this.displayTaskTemplateForm = false;
        this.selectedTask = {};

        // This prop is passed to the new-form component, so that the watcher in it resets the form whenever this value changes.
        // Reason : Since the new-form component is alive, any data entered into it stays on the form until its reset.
        // Since we cannot pass events from parent to child to reset the data of the newFormObject={}, without using event-bus,
        // we are just changing the value of a prop, that can be watched everytime when the "New" button is clicked. The watcher resets the newFormObject={}
        // whenever there is a change in this prop's value.
        this.resetTime = {
          time: new Date().getTime()
        };
      }

      // if(newTaskId !== "none"){
      //   this.viewSubTask=false;
      //   this.parentTaskName = null;
      //   this.taskObject["id"] = newTaskId;
      //   this.getRecord();
      // }
    }
  }
};

</script>

<style scoped>

  .filter-btn:hover{
    background-color: #e4e4e46b !important;
    border-radius: 1px !important;
  }
  .filter-btn:active{
    transform: scale(0.98);
  }

  .app-side-menu{
    flex-grow: 1;
    box-sizing: border-box;
    height: 100%;
    display: flex;
  	transition: all 0.3s linear;
  }

  .app-side-menu.isClosed{
    flex-grow: 0;
  }

  .app-side-menu-content{
    display: flex;
    flex-direction: column;
    width: 100%;
    opacity: 1;
  }

  .app-side-menu-content.isClosed{
    display:none;
  }

  .hide_display{
    display:none;
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

  .list-item-menu{
    opacity : 0;
    transition:0.25s linear;
    background-color: #eaeaea;
    border-radius: 50%;
    padding: 5px;
    transform-origin:50% 50%;
  }

  .list-row:hover .list-item-menu{
    opacity : 1;
  }

  .list-item-menu:hover{
    cursor:pointer;
    transform: rotate(90deg);
  }

  .list-detail{
    display: grid;
    grid-template-rows: auto auto auto;
    margin-right: 10px;
    background: transparent;
    border-bottom: 0.0em solid rgb(229, 229, 229);
    flex-grow: 1;
    padding: 7px 0px;
  }

  .list-row {
    border: .05em solid #e5e5e5;
    border-left: .05em solid #e5e5e5;
    /* border-left: .05em solid transparent; */
    /* border-right: .05em solid transparent;*/
    background: white;
    background:#fcfcfc;
    border-radius: 0px;
    transition: all 0.2s linear;
    display: flex;
    column-gap: 10px;
    user-select:none;
  }

  .list-row.active {
    border-left: 5px solid #1f69bd;
    border-left: 5px solid rgb(37, 139, 255);
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
    background: transparent;
    padding: 2px 0px;
    border-radius: 3px;
    font-size: 0.45rem;
  }

  .list-row .task-name {
    font-size: .8rem;
    padding-bottom: 5px;
    padding-top: 5px;
    overflow-y: hidden;
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

      .channel_activity_box{

        display: grid;
        -moz-column-gap: 30px;
        column-gap: 0px;
        grid-template-columns: 1fr;
        margin: 0 10px 0 0;
        background: #f9faff;
        border: 1px solid #cacaca;
        border-radius: 5px;
        border-radius: 10px;
        border: .05em solid #e5e5e5;
        border-left: .05em solid #e5e5e5;
        background: #fff;
        height: auto;
        transition: all .2s linear;
      }

      .channel_activity_box:hover{
        background: #faffe8;
      }

      .channel_activity_box.active{
        border-left: 5px solid #258bff;
      }

      .reply-btn{
        opacity:0;
        transition:0.25s linear;
        pointer-events:none;
      }

      .channel_activity_box:hover .reply-btn{
        opacity:1;
        pointer-events:visible;
      }

      .new_activity{
          /* background: #f4fff4 !important; */
      }

      .pulse_activity{
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

      .activity_description_large{
        position: relative;
        padding: 10px 10px 0 10px;
        min-height: 75px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-radius: 3px;
        flex-basis: 100%;
        transition: .25s ease-in;
        box-sizing: border-box;
        width: 100%;
        box-shadow: none;
        background-color: transparent;
      }

      .activity_description>div{
        margin-bottom:5px;
      }

      .activity_description {
        min-height: auto;
      }

      .activity-sno{
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

      .task_filter_form{
          position: absolute;
          top: 50px;
          left: 15px;
          display: flex;
          flex-grow: 1;
          width: 50%;
          height: auto;
          background: #fff;
          box-sizing: border-box;
          opacity: 1;
          z-index: 100;
          border-width: 0px 0px 0px 0px;
          border-top-style: solid;
          border-right-style: solid;
          border-bottom-style: solid;
          border-left-style: solid;
          border-top-color: silver;
          border-right-color: silver;
          border-bottom-color: silver;
          border-left-color: silver;
          border-image: initial;
          box-shadow: 0 15px 12px 0 rgba(0,0,0,.12);
      }

        .subtask-back-button {
            background-color: hsl(0deg 1% 72%/18%);
            border-radius: 50%;
            place-self: center flex-start;
            place-items: center;
            font-size: .65rem;
            line-height: 32px;
            font-weight: 400!important;
            padding: 0 7px;
            fill: #0de60d;
            color: rgb(255 255 255);
            transition: .25s linear;
        }

        .subtask-back-button>svg>path{
            background-color: rgb(232 232 232);
            fill: rgb(101 101 101);
        }

    .side-bar-light .uk-nav-sub>li.selected-menu>a {
        color: #333!important;
        font-weight: bold!important;
        font-size: .7rem;
    }

    #activitySearchInput{
      border-radius: 3px;
      padding-left: 40px;
      background: white;
      transition:0.25s linear;
    }

    #activitySearchInput:active, #activitySearchInput:focus{
      opacity:1;
    }

    .context-menu{
      display:none;
      position:absolute;
      right: 0px;
      top: 30px;
      background-color: #ffffff;
      border: 1px solid #cecece;
      border: 1px solid #cecece;
      border-radius:3px;
      padding: 10px;
      z-index:2;
      /*filter: drop-shadow(1px 2px 5px #cecece);*/
      color: #6b6b6b;

      display: grid;right:0px;
      transform-origin: right top;opacity: 1;
      transform: scale(0);transition: 0.125s linear;
      min-width: 200px;
      font-size: 0.75rem;
      box-shadow: rgb(0 0 0 / 12%) 0px 2px 12px 0px;
    }

    .context-menu>div>div{
      padding:5px;
      border-radius:1px;
    }

    .context-menu>div>div:hover{
      /*background-color:#f0f0f0;
      cursor:pointer;*/
    }

    .sent-ctx-menu-trigger, .recd-ctx-menu-trigger{
      padding:5px;
      border-radius:50%;
    }

    .recd-ctx-menu-trigger:hover{
      cursor: pointer;
      xbackground-color:#3269a9fa;
    }

    .sent-ctx-menu-trigger:hover{
      cursor: pointer;
      background-color:#f0f0f0;
    }

    .ctx-menu-trigger:active{
      transform:scale(0.85) !important;
    }

    /* Context sliding menu */

    .menu_container{
			position: relative;
			width:300px;
			height:300px;
			box-sizing: border-box;
			overflow-x: hidden;
		}

		.menu_slider{
			position: absolute;
			display: flex;
			flex-direction: row;
			left : 0px;
			transition: 0.25s linear;
			width: 100%;
			box-sizing: border-box;
		}

		.menu{
			xbackground: yellow;
			display: flex;
			flex-direction: column;
			min-width: 100%;
			border:0px solid red;
			box-sizing: border-box;
		}

		.filter_submenu{
			xbackground: greenyellow;
			display: flex;
			flex-direction: column;
			min-width: 100%;
			border:0px solid black;
			box-sizing: border-box;
      padding-top: 10px;
		}

		.menu_fixed_height{
			height:220px;
			overflow-y: auto;
		}

    .submenu_container{
      display: flex;
      flex-direction: column;
      min-width: 100%;
    }

    .submenu_category{
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-right: 5px;
      padding-bottom: 50px;
    }

    .menu > div, .filter_submenu > div > div > div{
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: left;
    }

    .menu > div:hover, .filter_submenu > div > div > div:not(.button-container):hover{
      background-color:#f0f0f0;
      cursor:pointer;
    }

    .menu_container ul{
      list-style:none;
    }

    .menu_container li{
      line-height:25px;
      list-style:none;
    }

    .list-item-menu{
      transition:0.25s linear;
      background-color: #eaeaea;
      border-radius: 50%;
      padding: 5px;
      transform-origin:50% 50%;
    }

    .list-item-menu:hover{
      cursor:pointer;
      transform: rotate(90deg);
    }

    .hidden{
      display:none !important;
    }
</style>
