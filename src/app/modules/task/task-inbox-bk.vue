<template>

  <div class="app_container" style="background: rgb(255, 255, 255, 0);grid-template-columns:1fr 2fr 5fr;display: flex;box-sizing: border-box;width: 100%;">

    <div id="appSideMenu" class="app-side-menu" style="xxflex-basis:10%;">
        <div vv-if="loggedInUser.isInformationFetchComplete" id="appSideMenuContent" class="app-side-menu-content">
          <div class="uk-offcanvas-bar0 custom-scroll-bar side-bar-light" style="flex-grow:1">

              <div>
                <div style="min-height: 75px;opacity: 1;display: flex;align-items: center;justify-content: center;">
                    <div style="position:relative">
                      <button id="new_task_button" v-on:click="sendNewTaskEvent($event)" xv-on:click="goTo('create-task-page')" class="btn clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                              style="background-color: #1f69bd;background-color:rgb(37, 139, 255); border-radius: 3px; place-self: center center; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 30px; font-weight: normal !important;;border-bottom-right-radius: 0px;border-top-right-radius: 0px;">
                        <span uk-icon="icon:file-edit;ratio:0.75"></span>
                        <span style="margin-left:5px"> New Task</span>
                      </button>
                      <button v-on:click="handleNewTaskOptionsClick()" xv-on:click="goTo('create-task-page')" class="new_task_options_trigger_button clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                              style="background-color: rgb(37, 139, 255);border-radius: 0px 3px 3px 0px;place-self: center;place-items: center;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-top: 0px;margin-left: 0.045rem;padding: 0px;;">
                            <span uk-icon="triangle-down" class="uk-icon" style="pointer-events:none"></span>
                      </button>
                      <div id="new_task_button_options" class="new_task_options">
                          <div id="menu" class="menu menu_fixed_height">
                              <div v-on:click="createTask('template')"  uk-tooltip="title:Create task from a process template;pos:right">
                                  <span class="lnr lnr-file-empty" style=""></span>
                                  <span style="padding-left: 10px;">Create Task from Template </span>
                              </div>
                              <div xv-on:click="createTask('scheduled')" uk-tooltip="title:Create a task that will run once in the future;pos:right">
                                  <ui-icon name="scheduled_tasks" style="color: rgb(0 0 0 / 78%) !important;"/>
                                  <span style="padding-left:10px;">Schedule a Task from Template <span style="color:#b3b3b3">(Beta)</span></span>
                              </div>
                              <div xv-on:click="createTask('recurring')" uk-tooltip="title:Create a task that repeats in the future;pos:right">
                                  <ui-icon name="recurring_tasks" style="color: rgb(0 0 0 / 78%) !important;"/>
                                  <span style="padding-left:10px;">Create a Recurring Task from Template <span style="color:#b3b3b3">(Beta)</span></span>
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
                    <a v-on:click="loadInbox('inbox_menu')" xv-on:click="goToPage('view-task-inbox',{'taskId':'all','subtaskId':'none'})"  uk-tooltip="title:Assigned or Followed Tasks;pos:right">
                      <span class="lnr lnr-inbox"></span>&nbsp;&nbsp;Inbox
                      <span class="counter-label" id="inbox_count"></span>
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
                  </li>-->
                  <li class="menu-item" id="draft_tasks_menu">
                    <a v-on:click="loadFilteredTasks('draft','draft_tasks_menu', 'Drafted Tasks')">
                      <span class="lnr lnr-file-empty"></span>&nbsp;&nbsp;Drafts
                      <span class="counter-label" id="drafts_count"></span>
                    </a>
                  </li>
                  <li class="menu-item" id="sent_tasks_menu" >
                    <a v-on:click="loadFilteredTasks('sent','sent_tasks_menu', 'Sent Tasks')" uk-tooltip="title:Sent Tasks only;pos:right">
                      <span class="lnr lnr-location"></span>&nbsp;&nbsp;Sent
                      <span class="counter-label" id="sent_count"></span>
                    </a>
                  </li>
                  <li class="menu-item" id="closed_tasks_menu" >
                    <a v-on:click="loadFilteredTasks('closed','closed_tasks_menu', 'Closed Tasks')" uk-tooltip="title:Assigned, Followed & Sent Tasks that are closed;pos:right">
                      <span class="lnr lnr-checkmark-circle"></span>&nbsp;&nbsp;Closed
                      <span class="counter-label" id="closed_count"></span>
                    </a>
                  </li>
                  <li class="menu-item" id="overdue_tasks_menu">
                    <a v-on:click="loadFilteredTasks('overdue','overdue_tasks_menu', 'Overdue Tasks')"  uk-tooltip="title:Assigned, Followed & Sent Tasks that are overdue;pos:right">
                      <span class="lnr lnr-clock"></span>&nbsp;&nbsp;Overdue
                      <span class="counter-label" id="overdue_count"></span>
                    </a>
                  </li>

                  <!-- <li class="menu-item" id="all_tasks_menu">
                    <a v-on:click="loadFilteredTasks('all','all_tasks_menu', 'All Tasks')" xv-on:click="goToPage('view-task-inbox',{'taskId':'all','subtaskId':'none'})">
                      <span class="lnr lnr-layers"></span>&nbsp;&nbsp;All Tasks
                      <span class="counter-label" id="all_tasks_count"></span>
                    </a>
                  </li> -->
                  <!--
                  <li class="menu-item" id="chat_menu">
                    <a v-on:click="signalShowChat('chat_menu')">
                      <span class="lnr lnr-bubble"></span>&nbsp;&nbsp;Chat
                      <span class="counter-label" id="chat_msgs_count"></span>
                    </a>
                  </li>
                  -->
                  <!--
                  <li class="menu-item" id="notification_subsriptions">
                    <a v-on:click="goToPage('notification-subscriptions',{}, 'notification_subsriptions')">
                      <span class="lnr lnr-alarm"></span>&nbsp;&nbsp;Notif. Subscriptions
                    </a>
                  </li>
                  -->

                  <li class="uk-nav-header sidebar-category-dropdown" style="margin-top: 15px;">
                        <a style="color: #333!important;font-weight: normal!important;font-size: .55rem;" v-on:click="toggleCategoryMenu()">
                          My Categories
                          <span class="counter-label">
                              <span uk-icon="icon:chevron-down;ratio:0.85" id="category-menu-trigger" class="uk-icon" style="transition: 0.25s linear;"></span>
                          </span>
                        </a>
                  </li>
                  <li class="uk-parent" id="category-submenu" style="display:none">
                      <ul class="uk-nav-sub custom-scroll-bar" style="max-height: 300px;height: 300px;overflow-y: auto;">
                          <template v-for="category in myCategoriesList">
                              <li class="menu-item" v-bind:id="'cat_' + category.id">
                                <a v-on:click="loadTasksFromCategory(category)">{{category.name}}
                                  <span class="counter-label" v-bind:id="'cat_count_'  + category.id">0</span>
                                </a>
                              </li>
                          </template>
                      </ul>
                  </li>
              </ul>

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

    <div style="display: flex;flex-basis:90%;;transition: transform .3s linear;">
      <div  v-show="!isTaskCreationInProcess" class="listOfTasksContainer" style="border-right:0px solid #ccc;position: relative;padding: 15px;padding-right: 5px;overflow-y: hidden;display: flex;flex-direction: column;flex-basis: 30%;background: rgb(255, 255, 255, 0);color: rgb(51, 51, 51);">

        <!-- Quick filter content -->
        <div class="quick_task_filter" v-show="showTaskFilter">
            <div class="first_column_scrollable custom-scroll-bar" style="padding-right: 5px;font-size: 0.7rem;left: 20px;right: 20px;top: -1px;opacity: 1;z-index: 100;border-radius: 3px;width: 100%;">
                <div class="filters">
                  <div class="filter-section" v-show="quickFilterOptions.statusFilter">
                    <div class="filter-section-label">By Status</div>
                    <!-- <div class="filter-value" v-on:click="filterByInvolvement('Assigned')">Assigned</div>
                    <div class="filter-value" v-on:click="filterByInvolvement('Followed')">Followed</div> -->
                    <div class="filter-value" v-on:click="applyQuickFilter('status', 'Open')">
                      <span v-show="quickFilterValue === 'Open'" uk-icon="icon:check;ratio:0.85" style="margin-right: 5px;" ></span>
                      <span v-show="quickFilterValue !== 'Open'" style="margin-right: 10px;" ></span>
                      Open
                    </div>
                    <div class="filter-value" v-on:click="applyQuickFilter('status', 'Started')">
                      <span v-show="quickFilterValue === 'Started'" uk-icon="icon:check;ratio:0.85" style="margin-right: 5px;" ></span>
                      <span v-show="quickFilterValue !== 'Started'" style="margin-right: 10px;" ></span>
                      Started
                    </div>
                    <div class="filter-value" v-on:click="applyQuickFilter('status', 'Overdue')">
                      <span v-show="quickFilterValue === 'Overdue'" uk-icon="icon:check;ratio:0.85" style="margin-right: 5px;" ></span>
                      <span v-show="quickFilterValue !== 'Overdue'" style="margin-right: 10px;" ></span>
                      Overdue
                    </div>
                    <div class="filter-value" v-on:click="applyQuickFilter('status', 'Closed')">
                      <span v-show="quickFilterValue === 'Closed'" uk-icon="icon:check;ratio:0.85" style="margin-right: 5px;" ></span>
                      <span v-show="quickFilterValue !== 'Closed'" style="margin-right: 10px;" ></span>
                      Closed
                    </div>

                  </div>
                  <div class="filter-section" v-show="quickFilterOptions.involvementFilter">
                    <div class="filter-section-label">By Involvement</div>
                    <!-- <div class="filter-value" v-on:click="filterByInvolvement('Assigned')">Assigned</div>
                    <div class="filter-value" v-on:click="filterByInvolvement('Followed')">Followed</div> -->
                    <div class="filter-value" v-on:click="applyQuickFilter('involvement', 'Assigned / Followed')">
                      <span v-show="quickFilterValue === 'Assigned / Followed'" uk-icon="icon:check;ratio:0.85" style="margin-right: 5px;" ></span>
                      <span v-show="quickFilterValue !== 'Assigned / Followed'" style="margin-right: 10px;" ></span>
                      Assigned / Followed
                    </div>
                    <div class="filter-value" v-on:click="applyQuickFilter('involvement', 'Sent')">
                      <span v-show="quickFilterValue === 'Sent'" uk-icon="icon:check;ratio:0.85" style="margin-right: 5px;" ></span>
                      <span v-show="quickFilterValue !== 'Sent'" style="margin-right: 10px;" ></span>
                      Sent</div>
                  </div>
                  <div class="filter-section" v-show="quickFilterOptions.priorityFilter">
                    <div class="filter-section-label">By Priority</div>
                    <div class="filter-value" v-on:click="applyQuickFilter('priority','Critical')">
                      <span v-show="quickFilterValue === 'Critical'" uk-icon="icon:check;ratio:0.85" style="margin-right: 5px;" ></span>
                      <span v-show="quickFilterValue !== 'Critical'" style="margin-right: 10px;" ></span>
                      Critical</div>
                    <div class="filter-value" v-on:click="applyQuickFilter('priority','High')">
                      <span v-show="quickFilterValue === 'High'" uk-icon="icon:check;ratio:0.85" style="margin-right: 5px;" ></span>
                      <span v-show="quickFilterValue !== 'High'" style="margin-right: 10px;" ></span>
                      High</div>
                    <div class="filter-value" v-on:click="applyQuickFilter('priority','Medium')">
                      <span v-show="quickFilterValue === 'Medium'" uk-icon="icon:check;ratio:0.85" style="margin-right: 5px;" ></span>
                      <span v-show="quickFilterValue !== 'Medium'" style="margin-right: 10px;" ></span>
                      Medium</div>
                    <div class="filter-value" v-on:click="applyQuickFilter('priority','Low')">
                      <span v-show="quickFilterValue === 'Low'" uk-icon="icon:check;ratio:0.85" style="margin-right: 5px;" ></span>
                      <span v-show="quickFilterValue !== 'Low'" style="margin-right: 10px;" ></span>
                      Low</div>
                  </div>
                  <div class="filter-section" v-show="quickFilterOptions.categoryFilter">
                    <div class="filter-section-label">By Category</div>
                    <template v-for="category in myCategoriesList">
                        <div class="filter-value" v-on:click="applyQuickFilter('category', category.name, category.id)">
                          <span v-show="quickFilterValue === category.id" uk-icon="icon:check;ratio:0.85" style="margin-right: 5px;" ></span>
                          <span v-show="quickFilterValue !== category.id" style="margin-right: 10px;" ></span>
                          {{category.name}}</div>
                    </template>
                  </div>
                  <div class="filter-section">
                    <div class="filter-section-label" style="text-align:center"></div>
                    <div class="filter-value" v-on:click="removeQuickFilter()" style="background: #e91e63c7;align-items: center;text-align: center;display: block;color: white;border-radius: 3px;">Remove Filter</div>
                  </div>

                </div>
            </div>
        </div>


        <div class="adk_grid_toolbar" style="user-select: none;grid-template-columns: auto 1fr;padding: 0px 0px;height:50px">
          <div style="display: grid; place-self: center flex-start; text-align: left;">
            <div style="align-items:center;display: grid; place-self: center flex-start; padding-left: 0px; padding-right: 20px; color: rgba(61, 61, 61, 0.78) !important; grid-template-columns: auto auto auto; font-size: 0.75rem;">
              <!-- <a class="uk-navbar-item" style="padding-right: 0px;padding-left: 0px;" v-on:click="toggleSideMenu()">
                <span class="uk-margin-small-right" style="color: rgb(103 103 103)" uk-icon="icon:menu;ratio:1.25"></span>
              </a> -->
              <span style="font-size: 1.15rem;font-weight: bold;" id="taskListName">{{taskListName}}</span>
              <span style="font-size: 0.75rem;margin-left: 5px;margin-top: 5px;opacity: 1;max-width: 125px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" v-bind:uk-tooltip="quickFilterValueLabel" v-show="quickFilterValueLabel !== ''">({{quickFilterValueLabel}})</span>
              <span style="font-size: 0.75rem;margin-left: 5px;margin-top: 5px;opacity:0">({{taskList.list.length}})</span>
            </div>
          </div>
          <div style="display: grid; gap: 10px; grid-template-columns: auto auto; place-self: center end; text-align: right;">

            <div style="display: flex;column-gap: 10px;">
              <!--<div style="cursor:pointer"><img src="resources/images/all-activities.svg" style="height:15px;width:15px"></div>-->
              <div v-on:click="refreshPaneList()" class="clickable-btn uk-button" style="cursor: pointer;padding: 0 0px;filter: grayscale(1);"><img src="resources/images/refresh.svg" style="pointer-events: none;height:15px;width:15px"></div>

              <!--
                Temporarily disabled by Vignesh on June 10, 2021
              -->

              <div v-show="!showTaskFilter" v-on:click="showTaskFilterModal()" class="clickable-btn uk-button" style="cursor: pointer;padding: 0px 5px;filter: grayscale(1);"><img src="resources/images/filter.svg" style="pointer-events: none;height:15px;width:15px"></div>
              <div v-show="showTaskFilter"  v-on:click="showTaskFilterModal()" class="clickable-btn uk-button" style="cursor: pointer;padding: 0px 5px;background: #1f69bd;border-radius: 3px;">
                  <svg xmlns="http://www.w3.org/2000/svg" height="394pt" viewBox="-5 0 394 394.00003" width="394pt" style="fill: white;pointer-events: none;height: 15px;width: 15px;color: white;"><path d="m367.820312 0h-351.261718c-6.199219-.0117188-11.878906 3.449219-14.710938 8.960938-2.871094 5.585937-2.367187 12.3125 1.300782 17.414062l128.6875 181.285156c.042968.0625.089843.121094.132812.183594 4.675781 6.3125 7.207031 13.960938 7.21875 21.816406v147.800782c-.027344 4.375 1.691406 8.582031 4.773438 11.6875 3.085937 3.101562 7.28125 4.851562 11.65625 4.851562 2.222656-.003906 4.425781-.445312 6.480468-1.300781l72.3125-27.570313c6.476563-1.980468 10.777344-8.09375 10.777344-15.453125v-120.015625c.011719-7.855468 2.542969-15.503906 7.214844-21.816406.042968-.0625.089844-.121094.132812-.183594l128.691406-181.289062c3.667969-5.097656 4.171876-11.820313 1.300782-17.40625-2.828125-5.515625-8.511719-8.9765628-14.707032-8.964844zm0 0"></path></svg>
              </div>

              <!--<div style="cursor:pointer"><span uk-icon="icon:list;ratio:0.85"></span></div>-->
              <!--<div style="cursor:pointer"><span uk-icon="icon:more;ratio:0.75"></span></div>-->
            </div>
          </div>
        </div>
        <div style=" margin-bottom: 15px; padding: 0px 10px 0px 0px; box-sizing: border-box;position:relative ">
            <span style="position:absolute;left:10px;top: 10px;color: #9f9f9f;" uk-icon="icon:search;ratio:0.85"></span>
            <input tabindex="1" id="taskSearchInput" autocomplete="off" placeholder="Search Tasks"
                    v-model="taskList.searchQuery"
                    v-on:keyup.enter="searchTasks()"
                    uk-tooltip="Ex. #87, Purchase Laptops.."
                    type="text" class="uk-input task-search-input" style="border-radius: 20px;padding-left: 40px;"/>
        </div>
        <!--<div><hr></div>-->

        <div style="flex-grow: 1;overflow-y: hidden;position: relative;padding: 0px;height: 100%;">
                <div style="display: flex;flex-direction: column;flex-grow: 1;height: 100%;">
                    <div class="task-list" id="tasklist" style="position:relative;font-size: 0.7rem;flex-grow: 1;margin-top: 10px;grid-template-rows: 1fr;background-color:#f2f2f2;background-color:rgb(255, 255, 255, 0)">
                        <div id="tasklist_loading_spinner" style="display: flex;opacity:1;transition:0.25s linear;position:absolute;top:0px;right:0px;left:0px;bottom:0px;align-items:center;justify-content:center;z-index: 2;">
                            <div class="spinner-2"></div>
                        </div>

                        <div class="adk_grid_list_content custom-scroll-bar elastic_scroll_container" >
                          <div class="task_inbox_list elastic_scroll_list" style="transition: 0.55s ease-out;display: grid;row-gap: 4.5px;align-content: baseline;padding-right:5px;">
                            <div v-for="item,index in taskList.list"
                                 :key="item.id"
                                 v-bind:id="'task_' + item.id"
                                 v-on:click="showTaskDetails(item.id,index)"
                                 class="list-row"
                                 style="padding: 0px 2px 0px 10px;">

                              <div class="active-border"></div>

                              <div style="display:flex;align-items:center;justify-content:center;flex-direction: row;min-width: 50px;">
                                   <!-- <div v-if="item.createdByName!=='Pawan Bhojanala'" style="letter-spacing: 1px;width: 25px;height: 25px;background-color: rgb(240, 240, 240);padding: 10px;font-weight: bold;color: rgb(51, 51, 51);border-radius: 50%;align-items: center;justify-content: center;display: flex;border: 1px solid #eaeaea;">
                                      {{(item.createdByName.split(" ")[0])[0]}}{{(item.createdByName.split(" ")[1])[0]}}
                                   </div>
                                   <img v-if="item.createdByName==='Pawan Bhojanala'" v-bind:data-img-id="item.createdById" class="uk-border-pill ui-navbar-profile-image"
                                   v-bind:src="'/api/us/profile/get/' + item.createdById"
                                   onerror="this.onerror=null;this.src='resources/images/male_default_pic.png';"
                                   width="25" height="25" alt="Border pill"
                                   style="border:1px solid rgb(220 220 220);xbackground: #ffeb3b;padding: 3px;margin-left: 0px;height: 45px;width: 45px;"> -->
                                   <img v-bind:data-img-id="item.createdById" class="uk-border-pill ui-navbar-profile-image"
                                   v-bind:src="'/api/us/profile/get/' + item.createdById"
                                   onerror="this.onerror=null;this.src='resources/images/male_default_pic.png';"
                                   width="25" height="25"
                                   style="border:1px solid rgb(220 220 220);xbackground: #ffeb3b;padding: 3px;margin-left: 0px;height: 45px;width: 45px;">
                              </div>
                              <div class="ui_grid_row list-detail" style=" display: grid;">
                                <div class="list-item-row-1" style="display:flex;column-gap:5px">
                                  <div class="task-sno">
                                    <span v-if="taskFilter === 'sent' && item.statusCode !== undefined && item.statusCode === 'OVERDUE'" style="color:red">Task #{{item.sno}}</span>
                                    <span v-else>Task #{{item.sno}}</span>
                                  </div>
                                  <div style="display:flex;column-gap:2px;flex-grow: 1;">
                                    <span style="font-size: 0.6rem;color:gray">by</span>
                                    <span style="font-size: 0.6rem;color:gray">{{item.createdByName}}</span>
                                  </div>
                                  <div style="display:flex;column-gap:5px;margin-left:auto;display:none">
                                    <div style="display: flex;column-gap: 2px;color: #6f6f6f;"><img src="resources/images/attachments.svg" style="height:10px;width:15px"></div>
                                    <div v-bind:uk-tooltip="item.assigneeListString" style="display: flex;column-gap: 2px;color: #6f6f6f;"><img src="resources/images/assignee.svg" style="height:12px;width:15px"><sub>{{item.assigneeIds.length}}</sub></div>
                                    <div style="display: flex;column-gap: 2px;color: #6f6f6f;"><img src="resources/images/subtask.svg" style="height: 12px;width: 15px;color: #d6d6d6;filter: opacity(0.65);"><sub>{{item.subTaskIds.length}}</sub></div>
                                    <div style="display: flex;column-gap: 2px;color: #6f6f6f;"><img src="resources/images/priority.svg" style="height:12px;width:15px"></div>
                                  </div>
                                  <div class="list-item-menu">
                                    <span uk-icon="icon:more-vertical;ratio:0.55;"></span>
                                  </div>
                                </div>
                                <div class="list-item-row-2 task-name" style="place-items: flex-start flex-start;overflow-x: hidden;">
                                  <p style="margin: 0 0 0px 0;text-overflow: ellipsis;overflow-x: hidden;white-space: nowrap;">{{item.name}}</p>
                                </div>
                                <div class="list-item-row-3" style="place-items: end flex-start;overflow: hidden;">
                                  <div style="display: flex;column-gap: 5px;width: 100%;justify-content: space-between;">
                                    <div class="task-created-date" style="font-size: 0.55rem;letter-spacing:0.75px;text-transform: uppercase;color: rgb(152, 152, 152);" v-bind:title="'created ' + item.createdOnAgo + '..'">{{item.createdOnFormatted}}</div>
                                    <div style="display:none;" class="task-created-date" title="Due Date" v-if="item.dueDateTime!==null">{{item.dueDateTimeFormatted}}</div>
                                    <div class="task-created-date" style="overflow: hidden;max-width: 50%;text-transform: uppercase;white-space: pre;border: 1px solid rgb(239, 239, 239);padding: 2px 10px;background: #27ca27;color: white;border-radius: 20px;" v-if="item.statusInfo!==null && item.isRecent">{{item.statusInfo.label}}</div>
                                    <div class="task-created-date" style="overflow: hidden;max-width: 50%;text-transform: uppercase;white-space: pre;border: 1px solid rgb(239, 239, 239);padding: 2px 10px;border-radius: 20px;" title="Status" v-if="item.statusInfo!==null && !item.isRecent">{{item.statusInfo.label}}</div>
                                    <!--
                                      <div class="task-created-date" title="Category" v-if="item.category!==null && item.category!==undefined">{{item.category.name}}</div>
                                    -->
                                  </div>
                                </div>
                              </div>

                            </div>
                            <div id="taskListIntersectionObserver"
                                 class="ui_grid_row"
                                 style="margin-right:0px;padding: 7px 12px; border-bottom: 0em solid rgb(229, 229, 229); display: grid; place-items: center; background: rgb(255, 255, 255); color: rgb(158, 158, 158);">
                              <span style="">No more available records.</span>
                            </div>
                          </div>
                        </div>


                  </div>
                </div>
            </div>

      </div>
      <div class="taskDetailContainer" style="position:relative;margin-top: 10px;margin-left: 10px;border-left: 1px solid rgb(204, 204, 204);border-top: 1px solid rgb(204, 204, 204);border-top-left-radius: 10px;overflow-y: hidden;display: flex;flex-grow: 1;flex-basis: 70%;box-sizing: border-box;">
          <!--<div class="activity_background"></div>-->
          <div v-show="!isTaskChosen
                    && !displayNewForm
                    && !displayNewSubTaskForm
                    && !displayNewScheduledTaskForm
                    && !displayNewRecurringTaskForm
                    && !displayTaskTemplateForm" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
              <div style="display: flex;grid-template-rows: 1fr;flex-grow: 1;overflow-y: hidden;align-items: center;justify-content: center;background-color:rgb(255, 255, 255, 0.85)">
                  No Task chosen.
                  {{quickFilterOptions}}
              </div>
          </div>
          <!-- <div v-show="!isTaskChosen && displayNewForm" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
              <new-task-form v-on:refreshList="refreshPaneList()" v-bind:resetTime="resetTime"/>
          </div>
          <div v-show="!isTaskChosen && displayNewScheduledTaskForm" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
              <new-scheduled-task-form v-on:refreshList="refreshPaneList()" v-bind:resetTime="resetTime"/>
          </div>
          <div v-show="!isTaskChosen && displayNewRecurringTaskForm" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
              <new-recurring-task-form v-on:refreshList="refreshPaneList()" v-bind:resetTime="resetTime"/>
          </div>
          <div v-show="!isTaskChosen && displayTaskTemplateForm" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
              <new-task-template-form v-bind:chosenTaskTemplate="chosenTaskTemplate"  v-bind:chosenTaskCategory="chosenTaskCategory" v-on:refreshList="refreshPaneList()" v-bind:resetTime="resetTime"/>
          </div>
          <div v-show="!isTaskChosen && displayNewSubTaskForm" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
              <new-subtask-form v-bind:parentTask="parentTask" v-bind:resetTime="resetTime"/>
          </div>
          -->
          <div v-show="isTaskChosen" style="display:flex;flex-grow: 1;grid-template-rows:1fr;overflow-y:hidden">
              <taskview embeddingViewName="task_inbox"
                      uniqueComponentId="viewTaskFormFromTaskInbox"
                      v-bind:loggedInUser="loggedInUser"
                      v-bind:id="selectedTask.id"
                      v-bind:selectedTask="selectedTask"
                      v-on:refreshList="refreshPaneList()"
              ></taskview>
          </div>
      </div>
    </div>

    <!-- <div class="task_filter_form" v-show="showTaskFilter">
        <div class="first_column_scrollable custom-scroll-bar" style="font-size: 0.7rem;left: 20px;right: 20px;top: -1px;opacity: 1;z-index: 100;background: rgb(31 105 189);border-width: 3px 3px 3px 3px;border-top-style: initial;border-right-style: solid;border-bottom-style: solid;border-left-style: solid;border-top-style: solid;border-top-color: rgb(37, 139, 255);border-right-color: rgb(37, 139, 255);border-bottom-color: rgb(37, 139, 255);border-left-color: rgb(37, 139, 255);border-image: initial;box-shadow: rgba(0, 0, 0, 0.12) 0px 15px 12px 0px;border-radius: 3px;">
            <task-search-modal v-on:filterTasks="filterTasks($event)" />
        </div>
    </div> -->


    <!--
    <div v-show="isChatViewOn" style="display:flex;width:100%">
        <chat-book v-bind:loggedInUser="loggedInUser"></chat-book>
    </div>
    -->

    <div id="new-task-form-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="display: flex;min-width:75%;width:auto;flex-direction: column;;overflow-y: hidden;font-size: 0.65rem;padding: 0px;border: 0px solid rgba(0, 0, 0, 0.57);">

            <!--<button class="uk-modal-close-default" type="button" uk-close ></button>-->

            <div style="display: flex;font-size: 1rem;margin-bottom: 10px;background: rgb(243, 243, 243);margin-top: 0px;padding: 0px;flex-direction: row-reverse;">

              <button v-on:click="closeNewTaskModal()" v-bind:uk-tooltip="'Close'"
                class="uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button subtask-back-button"
                style="border-radius: 3px;align-self:flex-start">
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"></path><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"></path></svg>
              </button>
              <div style="font-weight: bold;display: flex;align-items: center;flex-grow: 1;justify-content: center;">
                <span style="font-size: 0.75rem;">New Task &nbsp; </span>
                <span v-if="chosenTaskCategory!==null" style="font-size: 0.75rem;color: #a0a0a0;"> for &nbsp;{{chosenTaskCategory.name}}&nbsp; / &nbsp;</span>
                <span v-if="chosenTaskTemplate!==null" style="font-size: 0.75rem;color: #a0a0a0;"> &nbsp;{{chosenTaskTemplate.name}} &nbsp;</span>
              </div>

              <hr>

            </div>
            <div style="display: flex;justify-content: center;flex-grow: 1;padding: 0px 0px;">

                <div v-show="displayNewForm" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
                  <new-task-form uniqueComponentId="newTaskForm" v-bind:taskFromChatMessageData="taskFromChatMessageData" v-on:refreshList="refreshPaneList()" v-on:signalCloseNewTaskModal="closeNewTaskModal()" v-bind:resetTime="resetTime"/>
                </div>

                <div v-show="displayTaskTemplateForm" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
                    <new-task-template-form uniqueComponentId="newTaskForm" v-bind:chosenTaskTemplate="chosenTaskTemplate"  v-bind:chosenTaskCategory="chosenTaskCategory" v-on:refreshList="refreshPaneList()" v-on:signalCloseNewTaskModal="closeNewTaskModal()" v-bind:resetTime="resetTime"/>
                </div>
            </div>

        </div>
    </div>
    <div id="new-subtask-form-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="display: flex;min-width:75%;width:auto;flex-direction: column;;overflow-y: hidden;font-size: 0.65rem;padding: 0px;border: 0px solid rgba(0, 0, 0, 0.57);">

            <!--<button class="uk-modal-close-default" type="button" uk-close ></button>-->

            <div style="display: flex;font-size: 1rem;margin-bottom: 10px;background: rgb(243, 243, 243);margin-top: 0px;padding: 10px;flex-direction: row-reverse;">

              <button v-on:click="closeNewTaskModal()" v-bind:uk-tooltip="'Close'"
                class="uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button subtask-back-button"
                style="border-radius: 3px;align-self:flex-start">
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"></path><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"></path></svg>
              </button>
              <div style="font-weight: bold;display: flex;align-items: center;flex-grow: 1;justify-content: center;">Create a new subtask for - <span style="color:#018fff">&nbsp; #Task{{selectedTaskForSubtaskCreation.sno}}</span></div>
              <hr>

            </div>
            <div style="display: flex;justify-content: center;flex-grow: 1;padding: 0px 0px;">
                <new-task-form uniqueComponentId="newSubTaskForm"  v-bind:parentTask="selectedTaskForSubtaskCreation" v-on:refreshList="refreshPaneList()" v-on:signalCloseNewTaskModal="closeNewTaskModal()" v-bind:resetTime="resetTime"/>
            </div>

        </div>
    </div>
    <div id="view-subtask-form-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="position:relative;display: flex;min-width:75%;width:auto;flex-direction: column;overflow-y: hidden;font-size: 0.65rem;padding: 0px;border: 0px solid rgba(0, 0, 0, 0.57);min-height: 100%;">

            <!--<button class="uk-modal-close-default" type="button" uk-close ></button>-->

            <button v-on:click="closeNewTaskModal()" v-bind:uk-tooltip="'Close'"
              class="uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button subtask-back-button"
              style="position: absolute;right: 20px;top: 20px;border-radius: 25px;align-self: flex-start;z-index:5">
              <svg width="15" height="15" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"></path><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"></path></svg>
            </button>

            <div style="display: flex;justify-content: center;flex-grow: 1;padding: 10px;border: 10px solid #efefef;box-sizing: border-box;border-radius: 5px;">
                <taskview uniqueComponentId="viewSubTaskFormFromTaskInbox" embeddingViewName="view_subtask_modal" v-bind:loggedInUser="loggedInUser" v-bind:taskIdToBeViewed="selectedSubTaskId" v-on:refreshList="refreshPaneList()" isModalViewed="true"></taskview>
            </div>

        </div>
    </div>
    <div id="task-from-template-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="display: flex;min-width:55%;width:auto;flex-direction: column;;overflow-y: hidden;font-size: 0.65rem;padding: 0px;border: 0px solid rgba(0, 0, 0, 0.57);">

            <!--<button class="uk-modal-close-default" type="button" uk-close ></button>-->

            <div style="display: flex;font-size: 1rem;margin-bottom: 10px;background: #f3f3f3;margin-top: 0px;padding: 10px;">

              <button v-on:click="closeTaskFromTemplateModal()" v-bind:uk-tooltip="'Go back'"
                class="uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button subtask-back-button"
                style="border-radius: 3px;align-self:flex-start">
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
                        <button tabindex="11" id="attachFormTemplateButton" v-on:click="pickTemplate()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(76, 175, 80);border-radius: 3px;min-width: 125px;height: 37px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;">
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
  import taskInbox from './../../mixins/lib/task_inbox.js';
  import * as Comlink from 'comlink';

  export default {
  mixins: [uiListMixinLib, utilsMixinLib, userMixinLib, rsocket, taskInbox],
  data: function () {
    return {

      taskList: {
        list: [],
        url: null,
        searchQuery: '',
        pageNumber: 1,
        allRecordsFetched: false,
        isIntersectionObserverFired: false,
        observer: null,
        observerElement: 'taskListIntersectionObserver'
      },

      selectedSubTaskId: null,
      selectedTaskForSubtaskCreation: {},
      taskListName: 'Inbox',
      loggedInUser: {},
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
      quickFilterType: "",
      quickFilterValue: "",
      quickFilterValueLabel: "",
      selectedTaskFilterMenu: "open",
      quickFilterOptions: {
                            statusFilter: false,
                            involvementFilter: false,
                            priorityFilter: true,
                            categoryFilter: true
                          },

      /* New Task from Template - March 25 2021 */
      newTaskFromTemplate: {},
      availableCategories: [],
      matchingTaskTemplates: [],
      chosenTaskTemplate: null,
      chosenTaskCategory: null,
      isCategorySubmenuOpened: false,

      myCategoriesList: [],
      isNewTaskOptionsOpen: false,

      // This is used when we convert a chat message to a task.
      taskFromChatMessageData: {}
    };
  },
  methods: {


    testComlink () {

        // Referenced URLs
        // https://github.com/GoogleChromeLabs/comlink/blob/main/docs/examples/01-simple-example/index.html
        // https://github.com/GoogleChromeLabs/comlink/tree/main/docs/examples/02-callback-example

       const worker = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));

       function callback (value) {
         alert(`Result: ${value}`);
       }

       async function init () {
         // const remoteFunction = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));
         await worker.remoteFunction(Comlink.proxy(callback));
         alert(await worker.age);
       }

       init();
    },

    toggleSideMenu () {
      document.querySelector("#appSideMenu").classList.toggle("isClosed");
      document.querySelector("#appSideMenuContent").classList.toggle("isClosed");
    },
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
    sendNewTaskEvent (e) {
      console.log('Event emitted in bus.', new Date());
      bus.emit('newTaskEvent', {});
    },
    fetchTaskCounts () {

      // Attempting to use Comlink Worker
          const get_url = './tasks/tasks-count-by-filters';
          const callbackFunction = (dataResponse) => {
            dataResponse.data = dataResponse;
            dataResponse.data.forEach((countObj) => {
              if (countObj.filterName === 'Inbox' && countObj.taskCount > 0) {
                document.getElementById('inbox_count').innerHTML = '(' + countObj.taskCount + ')';
              } else if (countObj.filterName === 'All' && countObj.taskCount > 0) {
                // document.getElementById('all_tasks_count').innerHTML = '(' + countObj.taskCount + ')';
              } else if (countObj.filterName === 'Sent' && countObj.taskCount > 0) {
                document.getElementById('sent_count').innerHTML = '(' + countObj.taskCount + ')';
              } else if (countObj.filterName === 'Closed' && countObj.taskCount > 0) {
                document.getElementById('closed_count').innerHTML = '(' + countObj.taskCount + ')';
              } else if (countObj.filterName === 'Overdue' && countObj.taskCount > 0) {
                document.getElementById('overdue_count').innerHTML = '(' + countObj.taskCount + ')';
              } else {
                console.error("Filter not configured for '" + countObj.filterName + "'");
              }
            });
          };
          const callbackError = (error) => {
            console.error('Error in task-inbox.vue fetchTaskCounts()');
            console.error(error);
            UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });
          };

          async function sendTaskToWorker () {
              // const remoteFunction = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));
              console.log("Loading task counts using comlink-worker");
              await ComlinkWorker.fetch(process.env.VUE_APP_API_URL + get_url,
                                         Comlink.proxy(callbackFunction),
                                         Comlink.proxy(callbackError));
          }

          sendTaskToWorker();
          return false;
      // Comlink worker ends here
    },

    toggleCategoryMenu () {

      this.isCategorySubmenuOpened = !this.isCategorySubmenuOpened;

      if (this.isCategorySubmenuOpened) {
        document.querySelector('#category-submenu').style.display = null;
        document.querySelector('#category-menu-trigger').style.transform = 'rotateX(-180deg)';
      } else {
        document.querySelector('#category-submenu').style.display = 'none';
        document.querySelector('#category-menu-trigger').style.transform = 'rotateX(0deg)';
      }
    },
    fetchCategoryTaskCounts (categoryList) {

      if (categoryList.length < 1) {
        return false;
      }

      // Attempting to use Comlink Worker
          const categoryListCSV = categoryList.map((item) => item.id).join(',');
          const get_url = './tasks/tasks-count-by-category/' + categoryListCSV;
          const callbackFunction = (dataResponse) => {
            dataResponse.data = dataResponse;
            dataResponse.data.forEach((countObj) => {
              document.getElementById('cat_count_' + countObj.id).innerHTML = '(' + countObj.taskCount + ')';
            });
          };
          const callbackError = (error) => {
            console.error('Error in task-inbox.vue fetchCategoryTaskCounts()');
            console.error(error);
            UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });
          };

          async function sendTaskToWorker () {
              // const remoteFunction = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));
              console.log("Loading task counts using comlink-worker");
              await ComlinkWorker.fetch(process.env.VUE_APP_API_URL + get_url,
                                         Comlink.proxy(callbackFunction),
                                         Comlink.proxy(callbackError));
          }

          sendTaskToWorker();
          return false;
      // Comlink worker ends here

      // http://localhost:9090/tasks/tasks-count-by-category/5f82a94ad0885b18f91b6176,5f85e128212c14629bfad08c
    },
    fetchMyCategories () {

      // Attempting to use Comlink Worker
          const get_url = './categories/list/mine';
          const callbackFunction = (dataResponse) => {
            dataResponse.data = dataResponse;
            const list = dataResponse.data.bean;

            this.myCategoriesList = [];
            list.forEach((item) => {
              if (item.status === "ACTIVE") {
                this.myCategoriesList.push(item);
              }
            });

            this.fetchCategoryTaskCounts(this.myCategoriesList);
            this.fetchTaskCounts();
          };
          const callbackError = (error) => {
            console.error('Error in task-inbox.vue fetchMyCategories()');
            console.error(error);
            UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });
          };

          async function sendTaskToWorker () {
              // const remoteFunction = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));
              console.log("Loading task counts using comlink-worker");
              await ComlinkWorker.fetch(process.env.VUE_APP_API_URL + get_url,
                                         Comlink.proxy(callbackFunction),
                                         Comlink.proxy(callbackError));
          }

          sendTaskToWorker();
          return false;
      // Comlink worker ends here
    },

    closeTaskFromTemplateModal () {
      UIkit.modal(document.querySelector('#task-from-template-modal')).hide();
    },
    pickTemplate () {
      // UIkit.modal(document.querySelector('#task-from-template-modal')).hide();

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

      // Attempting to use Comlink Worker
          const get_url = './task-service/category-processes/list/all/' + this.newTaskFromTemplate.categoryId;
          const callbackFunction = (dataResponse) => {
            dataResponse.data = dataResponse;
            const list = dataResponse.data.bean;
            list.forEach((item) => {
              this.matchingTaskTemplates.push(item);
            });
          };
          const callbackError = (error) => {
            console.error('Error in task-inbox.vue loadMatchingTaskTemplates()');
            console.error(error);
            UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });
          };

          async function sendTaskToWorker () {
              // const remoteFunction = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));
              console.log("Loading task templates using comlink-worker");
              await ComlinkWorker.fetch(process.env.VUE_APP_API_URL + get_url,
                                         Comlink.proxy(callbackFunction),
                                         Comlink.proxy(callbackError));
          }

          sendTaskToWorker();
          return false;
      // Comlink worker ends here

    },
    loadAllCategories () {
      console.log('Fetching all categories');
      // return false;

      if (this.availableCategories.length > 0) {
        UIkit.modal(document.querySelector('#task-from-template-modal')).show();
        return false;
      }

      // Attempting to use Comlink Worker
          const get_url = './categories/list/all';
          const callbackFunction = (dataResponse) => {
            dataResponse.data = dataResponse;
            const list = dataResponse.data.bean;
            this.availableCategories = [];
            list.forEach((item) => {
              if (item.status === "ACTIVE") {
                this.availableCategories.push(item);
              }
            });

            UIkit.modal(document.querySelector('#task-from-template-modal')).show();
          };
          const callbackError = (error) => {
            console.error('Error in task-inbox.vue loadAllCategories()');
            console.error(error);
            UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });
          };

          async function sendTaskToWorker () {
              // const remoteFunction = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));
              console.log("Loading all categories using comlink-worker");
              await ComlinkWorker.fetch(process.env.VUE_APP_API_URL + get_url,
                                         Comlink.proxy(callbackFunction),
                                         Comlink.proxy(callbackError));
          }

          sendTaskToWorker();
          return false;
      // Comlink worker ends here
    },
    filterTasks (data) {
      this.filter = data;
      console.log('Received filter data from search-modal ', this.filter);

      console.log('Refreshing..');
      this.pageNumber = 1;
      this.list = [];
      this.allRecordsFetched = false;
      if (document.getElementById(this.taskList.observerElement) !== null && document.getElementById(this.taskList.observerElement) !== undefined) {
        this.taskList.observer.unobserve(document.getElementById(this.taskList.observerElement));
      }
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

        if (response.data.status === 'SUCCESS') {
          if (document.querySelector('#activity_channel_status') !== null)
          { document.querySelector('#activity_channel_status').classList.remove('hide_display'); }
          this.userInvolvedChannelConnected = userId;
        } else {
          if (document.querySelector('#activity_channel_status') !== null)
          { document.querySelector('#activity_channel_status').classList.add('hide_display'); }
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
              if (document.querySelector('#activity_channel_status') !== null)
              { document.querySelector('#activity_channel_status').classList.add('hide_display'); }
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
          if (document.querySelector('#activity_channel_status') !== null)
          { document.querySelector('#activity_channel_status').classList.remove('hide_display'); }
          this.categoryChannelConnected = categoryId;
        } else {
          if (document.querySelector('#activity_channel_status') !== null)
          { document.querySelector('#activity_channel_status').classList.add('hide_display'); }
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
              if (document.querySelector('#activity_channel_status') !== null)
              { document.querySelector('#activity_channel_status').classList.add('hide_display'); }
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
    viewSubtaskForm (subTaskId) {
      this.selectedSubTaskId = subTaskId;
      UIkit.modal(document.querySelector('#view-subtask-form-modal')).show();
      return false;
    },
    closeNewSubtaskForm () {
      UIkit.modal(document.querySelector('#new-subtask-form-modal')).hide();
      return false;
    },
    showNewSubtaskForm (parentTask) {
      this.selectedTaskForSubtaskCreation = parentTask;
      UIkit.modal(document.querySelector('#new-subtask-form-modal')).show();
      return false;
    },
    closeNewTaskModal () {
      UIkit.modal(document.querySelector('#new-task-form-modal')).hide();
      UIkit.modal(document.querySelector('#new-subtask-form-modal')).hide();
      UIkit.modal(document.querySelector('#view-subtask-form-modal')).hide();
      UIkit.modal(document.querySelector('#task-from-template-modal')).hide();
      return false;
    },
    showNewTaskForm (data) {
      console.log('Showing new task form');

      this.taskFromChatMessageData = data;
      console.log("If this is a task created from chat msg, then taskFromChatMessageData = ", this.taskFromChatMessageData);
      this.displayNewForm = true;
      this.displayNewScheduledTaskForm = false;
      this.displayNewRecurringTaskForm = false;
      this.displayTaskTemplateForm = false;

      UIkit.modal(document.querySelector('#new-task-form-modal')).show();
      return false;

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

      this.displayNewForm = false;
      this.displayNewScheduledTaskForm = false;
      this.displayNewRecurringTaskForm = false;
      this.displayTaskTemplateForm = true;
      console.log("If this is a task created from chat msg, then taskFromChatMessageData = ", this.taskFromChatMessageData);
      UIkit.modal(document.querySelector('#new-task-form-modal')).show();
      return false;


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
    showTaskByTaskId (taskId, notificationType) {
      this.isTaskChosen = true;

      this.$router.push({
        name: 'view-task-inbox-specific-task',
        params: {
          taskId: taskId,
          subtaskId: 'none'
        }
      });

      setTimeout(() => {
        bus.emit("show_task_detail_tab", {
          eventType: notificationType
        });
      }, 500);
    },
    showTaskDetails (taskId, idx) {
      // Toggle the active state of the list-item
      document.querySelectorAll('.active').forEach(item => item.classList.remove('active'));
      document.querySelector('#' + 'task_' + taskId).classList.add('active');

      this.selectedTask = this.taskList.list[idx];
      this.isTaskChosen = true;

      this.$router.push({
        name: 'view-task-inbox-specific-task',
        params: {
          taskId: this.selectedTask.id,
          subtaskId: 'none'
        }
      });

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

      if (this.isCategoryFilterOn) {
        this.url = './tasks/list-by-category/' + this.filterByCategoryId + '/' + this.pageNumber + '/' + searchQuery;
      } else if (this.isTaskFilterOn) {
        this.url = './' + this.api + '/list/' + this.pageNumber + '/' + searchQuery + '/' + this.taskFilter;
      } else {
        this.url = './' + this.api + '/list/' + this.pageNumber + '/' + searchQuery;
      }
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
            // task.createdOn = this.convertUTCDateFromServerToLocalDate(task.createdOn);
            task.createdOnFormatted = dayjs(task.createdOn).format('DD/MM/YYYY HH:mm');
            task.createdOnAgo = dayjs(task.createdOn).fromNow();


          }

          if (task.dueDateTime !== null) {
            // task.dueDateTime = new Date(task.dueDateTime).toLocaleString()
            //                                          .slice(0, 17)
            //                                          .replace(',', '')
            //                                          .replace('T',' ');

            // Added during "Fix-Date-UTC-Update"
            // task.dueDateTime = new Date(task.dueDateTime + " UTC").toLocaleString();
            // task.dueDateTime = this.convertUTCDateFromServerToLocalDate(task.dueDateTime);
            task.dueDateTimeFormatted = dayjs(task.dueDateTime).format('DD/MM/YYYY HH:mm');
            task.dueDateTimeAgo = dayjs(task.dueDateTime).fromNow();
          }

          if (task.isOnline !== null && task.isOnline === 1) {
            task.isOnline = 'LIVE';
          }

          if (task.createdBy !== null) {

            task.createdById = task.createdBy.split('#')[0];
            task.createdByName = task.createdBy.split('#')[1];
          }

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
    refreshPaneListV1 () {
      console.log('Refresh pane list');
      this.resetRefreshList();
      bus.emit('refresh-task-counts', {});
    },


    searchTasks () {
      this.taskList.allRecordsFetched = false;
      this.taskList.pageNumber = 1;
      this.taskList.list = [];
      if (document.getElementById(this.taskList.observerElement) !== null && document.getElementById(this.taskList.observerElement) !== undefined) {
        this.taskList.observer.unobserve(document.getElementById(this.taskList.observerElement));
      }
      this.taskList.isIntersectionObserverFired = false;

      this.getTaskList();
    },


    // The below 2 functions won't be used in this component.
    fetchCategoryActivities () {
      // this.filterByCategoryId

      // If all records are fetched, make no calls to the server again.
      if (this.allActivityRecordsFetched) { return false; }

      const url = './task-activity/list-by-category/' + this.filterByCategoryId + '/' + this.currentPageNumberOfActivities;
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
                item.createdOn = new Date(item.createdOn).toLocaleString()
                  .slice(0, 17)
                  .replace(',', '')
                  .replace('T', ' ');
              }

              if (item.propertyChanges !== null) {
                item.propertyChanges.forEach(propChange => {
                  if (propChange.toDate !== null) {
                    propChange.toDate = new Date(propChange.toDate).toLocaleString()
                      .slice(0, 17)
                      .replace(',', '')
                      .replace('T', ' ');
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
          this.fetchCategoryActivities();
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

      if (taskFilter === "sent") {

        this.quickFilterOptions = {
                                    statusFilter: false,
                                    involvementFilter: false,
                                    priorityFilter: true,
                                    categoryFilter: true
                                  };
      }
      else if (taskFilter === "closed" || taskFilter === "overdue") {

        this.selectedTaskFilterMenu = taskFilter;
        this.quickFilterOptions = {
                                    statusFilter: false,
                                    involvementFilter: true,
                                    priorityFilter: true,
                                    categoryFilter: true
                                  };
      }

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
      this.refreshPaneList();
      // this.resetRefreshList();

      // Reset ActivityList's data and intersection-observers
      // this.activityList = [];
      // this.currentPageNumberOfActivities = 1;
      // this.isActivityListIntersectionObserverFired = false;
      // this.allActivityRecordsFetched = false;
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
        this.refreshPaneList();
        // this.resetRefreshList();

        // Reset ActivityList's data and intersection-observers
        // this.activityList = [];
        // this.currentPageNumberOfActivities = 1;
        // this.isActivityListIntersectionObserverFired = false;
        // this.allActivityRecordsFetched = false;

        // this.fetchInvolvedTaskActivities(); activities moved to separate component.
        // When no specific category is clicked, then connect to the rsocket stream and supply the userID.
        // this.connectToTaskActivityInvolvedUserChannel(this.loggedInUser.userId);
      } else {
        this.taskListName = data.name;
        this.isCategoryFilterOn = true;
        this.filterByCategoryId = data.id;
        this.isTaskFilterOn = false;
        this.taskFilter = null;
        this.refreshPaneList();
        // this.resetRefreshList();

        // Reset ActivityList's data and intersection-observers
        // this.activityList = [];
        // this.currentPageNumberOfActivities = 1;
        // this.isActivityListIntersectionObserverFired = false;
        // this.allActivityRecordsFetched = false;
        // this.fetchCategoryActivities(); Activities moved to separate component

        // When the specific category is clicked, then connect to the rsocket stream and supply the categoryID.
        // this.connectToCategoryChannel(this.filterByCategoryId);
      }
    },

    loadInbox (filter) {
      // this.signalHideChat();

      // Route --> #/task/inbox/
      console.log('this.$route = ', this.$route);

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
      });
      document.querySelector('#' + filter).classList.add('uk-active');
      document.querySelector('#' + filter).classList.add('selected-menu');

      this.taskListName = 'Inbox';
      this.isCategoryFilterOn = false;
      this.filterByCategoryId = null;
      this.isTaskFilterOn = false;
      this.taskFilter = null;
      this.refreshPaneList();


      this.quickFilterOptions = {
                                  statusFilter: false,
                                  involvementFilter: false,
                                  priorityFilter: true,
                                  categoryFilter: true
                                };
      // bus.emit('filterByCategory', { name: 'all' });
    },

    closeNewTaskOptions () {
      this.isNewTaskOptionsOpen = false;
      // This means, if target on which the click happened is not within the context-menu div, so you can close the context-menu dropdown.
      const primaryButtonOptions = document.getElementById('new_task_button_options');
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
        const primaryButtonOptions = document.getElementById('new_task_button_options');
        primaryButtonOptions.style.transform = 'scale(1)';

        console.log('menu scaled to open.');
        document.querySelector('body').addEventListener('click', this.listenForBodyClicks, false);
      } else {
        this.closeNewTaskOptions();
      }
    },
    createTask (taskType) {

      console.log('Creating task of type : ' + taskType);
      console.log('Event emitted in bus.', new Date());

      if (taskType === 'template') {
        bus.emit('newTemplateTaskEvent', {});
      }
      else if (taskType === 'scheduled') {
        bus.emit('newScheduledTaskEvent', {});
      }
      else if (taskType === 'recurring') {
        bus.emit('newRecurringTaskEvent', {});
      }

      this.closeNewTaskOptions();
    },
    loadTasksFromCategory (category) {
      document.querySelectorAll('.menu-item').forEach((el) => { el.classList.remove('uk-active'); el.classList.remove('selected-menu'); });
      document.querySelector('#cat_' + category.id).classList.add('selected-menu');
      // bus.emit('filterByCategory', category);
      this.filterByCategory(category);


      this.quickFilterOptions = {
                                  statusFilter: true,
                                  involvementFilter: true,
                                  priorityFilter: true,
                                  categoryFilter: false
                                };

    },
    handleScroll (e) {
          // console.log(e);
          // console.log(e.target.scrollTop, e.target.clientHeight, e.target.scrollHeight);

          const list = e.target.querySelector(".elastic_scroll_list");

          if ((e.target.scrollTop + e.target.offsetHeight) >= (e.target.scrollHeight - 0)) {
            console.log("\t Scroll reached the end formula : (e.target.scrollTop + e.target.clientHeight) >= e.target.scrollHeight");
            console.log("\t Scroll reached the end : ", e.target.scrollTop, e.target.clientHeight, e.target.scrollHeight);
            list.classList.add("moveUp");
            setTimeout(() => list.classList.remove("moveUp"), 150);
          }

          if (e.target.scrollTop === 0) {
            console.log("\t Scroll reached the top : ", e.target.scrollTop, e.target.clientHeight, e.target.scrollHeight);
            list.classList.add("moveDown");
            setTimeout(() => list.classList.remove("moveDown"), 150);
          }
    },

    applyQuickFilter (type, value, categoryId) {

        this.quickFilterValue = value;
        this.quickFilterType = type;

        if (type === "involvement") {
          this.quickFilterValueLabel = "Tasks " + value + "";
        } else if (type === "priority") {
          this.quickFilterValueLabel = "Priority - " + value;
        } else if (type === "category") {
          this.quickFilterValueLabel = "Category " + value;
          this.quickFilterValue = categoryId;
        }

        /* Resetting list parameters begins here */
        this.taskList.allRecordsFetched = false;
        this.taskList.pageNumber = 1;
        this.taskList.list = [];
        if (document.getElementById(this.taskList.observerElement) !== null && document.getElementById(this.taskList.observerElement) !== undefined) {
          this.taskList.observer.unobserve(document.getElementById(this.taskList.observerElement));
        }
        this.taskList.isIntersectionObserverFired = false;
        /* Resetting list parameters ends here */

        this.applyQuickFilterToTasks();

    },
    applyQuickFilterToTasks () {

      if (this.taskList.allRecordsFetched) { return false; }

      const pageNumber = this.taskList.pageNumber;
      let searchQuery = (this.taskList.searchQuery !== '') ? this.taskList.searchQuery : 'all';

      if (searchQuery.startsWith("#")) {
        searchQuery = "search_task_number" + searchQuery.split("#")[1];
      }

      // alert(searchQuery);
      let quickFilterInvolvedOrSent = "involved";
      let quickFilterStatus = "open";
      let quickFilterPriority = "all";

      if (this.quickFilterType === "priority") {
        quickFilterPriority = this.quickFilterValue;
      }
      else if (this.quickFilterType === "involvement") {
        quickFilterInvolvedOrSent = this.quickFilterValue === "Sent" ? "sent" : "involved";
      }
      else if (this.quickFilterType === "status") {
        quickFilterStatus = this.quickFilterValue;
      }

      if (this.selectedTaskFilterMenu === "overdue" || this.selectedTaskFilterMenu === "closed") {
        quickFilterStatus = this.selectedTaskFilterMenu;
      }

      const url = `./tasks/filtered-tasks/${quickFilterInvolvedOrSent}/${quickFilterStatus}/${quickFilterPriority}/${searchQuery}/${pageNumber}`;

      // return false;

      // if (this.isCategoryFilterOn) {
      //   url = `./tasks/list-by-category/${this.filterByCategoryId}/${pageNumber}/${searchQuery}`;
      // } else if (this.isTaskFilterOn) {
      //   url = `./tasks/list/${pageNumber}/${searchQuery}/${this.taskFilter}`;
      // } else {
      //   url = `./tasks/list/${pageNumber}/${searchQuery}`;
      // }

      // Attempting to use Comlink Worker
          const get_url = url;
          const callbackFunction = (dataResponse) => {



            dataResponse.data = dataResponse;

            if (dataResponse.data.actionResult === 1) {

              let listOfTasks = (dataResponse.data.bean);// .slice(0, 10);

              if (dataResponse.data.list) {
                listOfTasks = dataResponse.data.list;
              }

              // Since we are pulling 20 records per page, then if the resulting size is lesser than 20, then it means
              // no more records are available.
              if (listOfTasks.length < 20) {
                this.taskList.allRecordsFetched = true;
              }

              listOfTasks.forEach(task => {
                if (task.createdOn !== null) {
                  // task.createdOn = new Date(task.createdOn).toLocaleString()
                  //                                          .slice(0, 17)
                  //                                          .replace(',', '')
                  //                                          .replace('T',' ');

                  // Added during "Fix-Date-UTC-Update"
                  // task.createdOn = new Date(task.createdOn + " UTC").toLocaleString();
                  // task.createdOn = this.convertUTCDateFromServerToLocalDate(task.createdOn);
                  task.createdOnFormatted = dayjs(task.createdOn).format('DD/MM/YYYY HH:mm');
                  task.createdOnAgo = dayjs(task.createdOn).fromNow();
                  task.isRecent = false;

                  // If this task was created within the previous hour, then mark it as recent.
                  const differenceInMinutes = dayjs().diff(dayjs(task.createdOn), 'minute');
                  if (differenceInMinutes <= 59) {
                    task.isRecent = true;
                  }

                }

                if (task.dueDateTime !== null) {
                  // task.dueDateTime = new Date(task.dueDateTime).toLocaleString()
                  //                                          .slice(0, 17)
                  //                                          .replace(',', '')
                  //                                          .replace('T',' ');

                  // Added during "Fix-Date-UTC-Update"
                  // task.dueDateTime = new Date(task.dueDateTime + " UTC").toLocaleString();
                  // task.dueDateTime = this.convertUTCDateFromServerToLocalDate(task.dueDateTime);
                  task.dueDateTimeFormatted = dayjs(task.dueDateTime).format('DD/MM/YYYY HH:mm');
                  task.dueDateTimeAgo = dayjs(task.dueDateTime).fromNow();
                }

                if (task.isOnline !== null && task.isOnline === 1) {
                  task.isOnline = 'LIVE';
                }

                if (task.createdBy !== null) {
                  task.createdById = task.createdBy.split('#')[0];
                  task.createdByName = task.createdBy.split('#')[1];
                }

                let assigneeListString = '';
                if (task.assignees !== null) {
                  task.assignees.forEach((assignee) => {
                    assigneeListString = assignee.firstName + ' ' + assignee.lastName + '<br>' + assigneeListString;
                  });
                  task.assigneeListString = assigneeListString;
                }

                // To prevent null error in vue-render if the "assigneeIds" prop is null
                if (task.assigneeIds === null) { task.assigneeIds = []; }

                // To prevent null error in vue-render if the "assigneeIds" prop is null
                if (task.followeIds === null) { task.followeIds = []; }

                // To prevent null error in vue-render if the "subTaskIds" prop is null
                if (task.subTaskIds === null) { task.subTaskIds = []; }

                this.taskList.list.push(task);
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

                  // Disabled by Vignesh on June 10, 2021
                  // Reason, during paginated scroll, it keeps bumping the scroll to show the selected task, making the scroll movement jittery.
                  // If the chosen task is not in the visible area, then scroll the list to bring it to the view.
                  // const target = document.querySelector('#' + 'task_' + taskId);
                  // target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;

                }, 250);
              }

              // If there are more records to fetch, then start observing the loadMore-intObsrv-trigger.
              if (!this.taskList.isIntersectionObserverFired) {
                this.enableTaskListPaginationIntersectionObserver();
              }
            }
            else {
              console.error('Error', dataResponse);
              // alert("Error : " + dataResponse)
            }


            setTimeout(() => {
              document.querySelector("#tasklist_loading_spinner").classList.add('hide_reveal');
              document.querySelector("#tasklist_loading_spinner").style.display = "none";
              // document.querySelector("#tasklist").classList.remove("hide_reveal");


              Array.from(document.querySelectorAll(".elastic_scroll_container"))
                   .forEach(scrollContainer => {
                        scrollContainer.addEventListener('scroll', (event) => this.handleScroll(event));
                   });
            }, 500);
          };
          const callbackError = (error) => {
            console.error('Error in task-inbox.vue fetchTaskCounts()');
            console.error(error);
            UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });
          };

          async function sendTaskToWorker () {
              // const remoteFunction = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));
              console.log("Loading task counts using comlink-worker");
              await ComlinkWorker.fetch(process.env.VUE_APP_API_URL + get_url,
                                         Comlink.proxy(callbackFunction),
                                         Comlink.proxy(callbackError));
          }

          sendTaskToWorker();

          setTimeout(() => {
            document.querySelector("#tasklist_loading_spinner").classList.remove('hide_reveal');
            document.querySelector("#tasklist_loading_spinner").style.display = "flex";
            // document.querySelector("#tasklist").classList.add("hide_reveal");
          }, 500);
          return false;
      // Comlink worker ends here

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
    // this.getList(); Moved from the confusing ui-list.js functions to the more clearer 'getTaskList()';
    this.getTaskList();

    bus.off('show-task-details');
    bus.on('show-task-details', (data) => {
      this.showTaskByTaskId(data.taskId, data.eventType);
    });

    // bus.off('connected-rsocket');
    bus.on('connected-rsocket', (socket) => {
      console.log('connected-rsocket signal received over bus in task-inbox.vue');

      // alert("Received rsocket connected..");
      this.rsocket.socket = socket;
      this.getUserInfoCookie(); // Load the user-information into this component's loggedInUser-property.

      // this.fetchInvolvedTaskActivities(); activities moved to separate component.
      // When no specific category is clicked, then connect to the rsocket stream and supply the userID.
      this.connectToTaskActivityInvolvedUserChannel(this.loggedInUser.userId);
    });

    // Close modal event is thrown from the new-task-form as an this.event and not on bus.emit.
    // It will be caught in the <new-task-form's v-on:signalCloseNewTaskModal="closeNewTaskModal()" attribute.
    // So don't write the close-modal event code on bus.
    bus.off('newTaskEvent');
    bus.on('newTaskEvent', (data) => {
      console.log('Show-New-Task-Form event received in bus.', new Date());
      this.showNewTaskForm(data);
    });


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

    bus.off('viewSubTaskEvent');
    bus.on('viewSubTaskEvent', (data) => {
      console.log("Received view-subtask event in bus : subTaskId is ", data.subTaskId);
      this.viewSubtaskForm(data.subTaskId);
    });

    bus.off('newSubTaskEvent');
    bus.on('newSubTaskEvent', (data) => {
      console.log('Show-New-Subtask-Form event received in bus.', new Date());
      this.showNewSubtaskForm(data.parentTask);
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
        this.resetRefreshList();

        // Reset ActivityList's data and intersection-observers
        this.activityList = [];
        this.currentPageNumberOfActivities = 1;
        this.isActivityListIntersectionObserverFired = false;
        this.allActivityRecordsFetched = false;

        // this.fetchInvolvedTaskActivities(); activities moved to separate component.
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
        // this.fetchCategoryActivities(); Activities moved to separate component

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
      this.taskList.list.forEach(task => {
        if (task.id === data.id) {
          if (data.subTaskIds === null) { data.subTaskIds = []; }

          // if (data.createdBy !== null) { data.createdBy = data.createdBy.split('#')[1]; }
          if (data.createdBy !== null) {
            data.createdById = data.createdBy.split('#')[0];
            data.createdByName = data.createdBy.split('#')[1];
          }


          console.log('\t Found matching task item. replacing it with this one : ', data.name);
          matchingIndex = index;
        }
        index++;
      });

      this.taskList.list[matchingIndex] = data;
      console.log('\t replaced at index : ', matchingIndex);
      // this.list.sort(); //Mutating method.
    });

    const result2 = await this.fetchMyCategories();
    console.log('MyCategories fetch result', result2);

    // Position the context menus
    const primaryButton = document.getElementById('new_task_button');
    const primaryButtonOptions = document.getElementById('new_task_button_options');
    const bcr = primaryButton.getBoundingClientRect();
    // console.log("primaryButton's BCR ", bcr);
    primaryButtonOptions.style.top = bcr.top + bcr.height + 2 + 'px';
    primaryButtonOptions.style.left = bcr.left + 'px';



  },
  unmounted: function () {

    // Remove all modals as they get created everytime in the DOM when this component is mounted again and again.
    // This causes the same DOM element with the same ID to be created multiple times and causes data corruption.
    // Hence all modals mounted by a .vue component must be deleted from the DOM when the .vue component is unmounted.

    const modalIdsToBeDeletedFromDOM = ["new-task-form-modal",
                                        "new-subtask-form-modal",
                                        "view-subtask-form-modal",
                                        "task-from-template-modal"
                                       ];
    alert("Unmounting task modals " + modalIdsToBeDeletedFromDOM);
    modalIdsToBeDeletedFromDOM.forEach(modalId => {
        const modal = document.querySelector(modalId);
        if (modal !== null) {
          modal.parentElement.removeChild(modal);
          // alert("_add_reminder_modal removed");
        }
    });

  },
  beforeUnmount () {
      bus.all.delete('connected-rsocket');
  },
  watch: {
    list: {

      handler (newValue) {
        console.log('new list : ', newValue);
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
    background-color: #ffffffa8;
    border-radius: 50%;
    padding: 5px;
    transform-origin:50% 50%;
    position: absolute;
    right: 7px;
    top: 7px;
  }

  .list-row:hover{
    background: #dbecff !important;
  }

  .list-row:active{
    transform : scale(0.98);
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
    max-height: 70px;
    grid-template-rows: auto auto auto;
    margin-right: 10px;
    background: transparent;
    border-bottom: 0.0em solid rgb(229, 229, 229);
    flex-grow: 1;
    padding: 10px 10px 7px 0px;
  }

  .list-row {
    border: .05em solid #e5e5e5;
    /* border-left: 5px solid rgb(37 139 255 / 10%);*/
    border-left: .05em solid #e5e5e5;
    /* border-left: .05em solid transparent; */
    /* border-right: .05em solid transparent;*/
    background: white;
    background:#fcfcfc;
    border-radius: 5px;
    transition: all 0.2s linear;
    display: flex;
    column-gap: 10px;
    user-select:none;
    position:relative;
    box-shadow: rgb(0 0 0 / 5%) 4px 3px 10px 0px;
    transition: 0.1s ease-in;
  }

  .list-row.active {
    /* border-left: 5px solid #1f69bd;
    border-left: 5px solid rgb(37, 139, 255); */
    background: #f0f7ff;
  }

  .active-border{
    position: absolute;
    left: -10px;
    top: 0px;
    bottom: 0px;
    width: 5px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background: rgb(37, 139, 255);
    transition: 0.1s linear;
  }

  .list-row.active .active-border{
    transform: translate(10px);
  }

  .list-row:hover {
    background: #f0f7ff;
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

      .new_activity{
          display:none !important;
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

      .activity_description{
        position: relative;
        padding: 10px 10px 0px 10px;
        min-height: 75px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-radius: 3px;
        transition: 0.25s ease-in;
      }

      .activity_description>div{
        margin-bottom:5px;
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
            height: 40px;
            width: 40px;
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

    .hide_reveal{
      opacity: 0;
    }

    .spinner-2 {
      width:50px;
      height:50px;
      border-radius:50%;
      border:8px solid;
      border-color:lightblue;
      border-right-color: orange;
      animation:s2 1s infinite linear;
      opacity: 0.5;
    }
    @keyframes s2 {to{transform: rotate(1turn)}}


    .quick_task_filter{
      border-radius: 3px;
      position: absolute;
      top: 50px;
      right: 0px;
      display: flex;
      flex-grow: 1;
      width: auto;
      min-width: 200px;
      padding: 10px 10px;
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
      -o-border-image: initial;
      border-image: initial;
      box-shadow: 0 15px 12px 0 rgb(0 0 0 / 12%);
      height: 250px;
    }

    .filters{
      display: flex;
      flex-direction: column;
    }

    .filter-section{
      display: flex;
      flex-direction: column;
    }

    .filter-section-label{
      font-size: 0.45rem;
      color: gray;
      background: #efefef;
      padding: 5px 10px;
      text-transform: uppercase;
      letter-spacing: 0.555px;
      margin-top:5px;
      margin-bottom:5px;
    }

    .filter-value{
      display: flex;
      padding: 5px 0px;
      text-align: right;
      color: black;
    }

    .filter-value:hover{
      background: #2196f326;
      cursor:pointer;
      border-radius:3px
    }

    .filter-value:active{
      cursor: pointer;
      transform: scale(0.95);
    }

    .custom-scroll-bar{
      overflow-y: hidden;
    }

    .custom-scroll-bar:hover{
      overflow-y: auto !important;
    }
</style>
