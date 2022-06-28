<template>

  <div class="app_container" style="background: rgb(255, 255, 255, 0);grid-template-columns:1fr 2fr 5fr;display: flex;box-sizing: border-box;width: 100%;">

    <div id="appSideMenu" class="app-side-menu" style="xxflex-basis:10%;">
        <div vv-if="loggedInUser.isInformationFetchComplete" id="appSideMenuContent" class="app-side-menu-content">
          <div class="uk-offcanvas-bar0 custom-scroll-bar side-bar-light" style="flex-grow:1">

              <div>
                <div style="min-height: 75px;opacity: 1;display: flex;align-items: center;justify-content: center;">
                    <div style="position:relative">
                      <button id="new_task_button" uk-toggle="target: #add-people-modal" class="btn clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                              style="background-color: rgb(37, 139, 255);border-radius: 3px 0px 0px 3px;place-self: center;place-items: center;min-width: 100px;font-size: 0.75rem;line-height: 27px;font-weight: normal !important;text-transform: capitalize;">
                        <span uk-icon="icon:plus;ratio:0.75"></span>
                        <span style="margin-left:5px"> Add Contact</span>
                      </button>


                      <div id="new_task_button_options" class="new_task_options">
                          <div id="menu" class="menu menu_fixed_height">
                              <div v-on:click="createTask('template')"  uk-tooltip="title:Create task from a process template;pos:right">
                                  <span class="lnr lnr-file-empty" style=""></span>
                                  <span style="padding-left: 10px;">Create Task from Template </span>
                              </div>
                              <div xv-on:click="createTask('scheduled')" uk-tooltip="title:Create a task that will run once in the future;pos:right">
                                  <ui-icon name="scheduled_tasks" style="color: rgb(0 0 0 / 78%) !important;"/>
                                  <span style="padding-left:10px;">Schedule a Task <span style="color:#b3b3b3">(Beta)</span></span>
                              </div>
                              <div xv-on:click="createTask('scheduled')" uk-tooltip="title:Create a task from a process template that will run once in the future;pos:right">
                                  <ui-icon name="scheduled_tasks" style="color: rgb(0 0 0 / 78%) !important;"/>
                                  <span style="padding-left:10px;">Schedule a Task from Template <span style="color:#b3b3b3">(Beta)</span></span>
                              </div>
                              <div v-on:click="createTask('recurring')" uk-tooltip="title:Create a task that repeats in the future;pos:right">
                                  <ui-icon name="recurring_tasks" style="color: rgb(0 0 0 / 78%) !important;"/>
                                  <span style="padding-left:10px;">Create a Recurring Task <span style="color:#b3b3b3">(Beta)</span></span>
                              </div>
                              <div xv-on:click="createTask('recurring_task_from_template')" uk-tooltip="title:Create a task from a process template that repeats in the future;pos:right">
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
                  <li class="uk-nav-header sidebar-category-dropdown" style="margin-top: 15px;">
                      <a style="color: #333!important;font-weight: normal!important;" v-on:click="toggleCategoryMenu()">
                        Client Categories
                        <span class="counter-label">
                            <span uk-icon="icon:chevron-down;ratio:0.85" id="category-menu-trigger" class="uk-icon" style="transition: 0.25s linear;color: #cdcdcd;"></span>
                        </span>
                      </a>
                  </li>
                  <li class="uk-parent" id="category-submenu">
                      <ul class="uk-nav-sub custom-scroll-bar" style="max-height: 300px;height: 300px;overflow-y: auto;">
                          <template v-for="(category, index) in myCategoriesList" :key="index">
                              <li class="menu-item" v-bind:id="clientFilter === index && 'activeClient'">
                                <a v-on:click="loadTasksFromCategory(index)">{{category.name}}
                                  <span class="counter-label" v-bind:id="'cat_count_'  + category.id">{{category.clients.length}}</span>
                                </a>
                              </li>
                          </template>
                      </ul>
                  </li>
              </ul>

          </div>
        </div>
    </div>




    <!-- Inbox cards -->

    <div style="display: flex;flex-basis:90%;;transition: transform .3s linear;">
      <div v-for="(category, index) in myCategoriesList" :key="index" v-show="clientFilter === index" class="listOfTasksContainer list-of-tasks-container" >


        <div class="adk_grid_toolbar" style="user-select: none;grid-template-columns: auto 1fr;padding: 0px 0px;height:50px">
          <div style="display: grid; place-self: center flex-start; text-align: left;">
            <div style="align-items:center;display: grid; place-self: center flex-start; padding-left: 0px; padding-right: 20px; color: rgba(61, 61, 61, 0.78) !important; grid-template-columns: auto auto auto; font-size: 0.75rem;">
              <!-- <a class="uk-navbar-item" style="padding-right: 0px;padding-left: 0px;" v-on:click="toggleSideMenu()">
                <span class="uk-margin-small-right" style="color: rgb(103 103 103)" uk-icon="icon:menu;ratio:1.25"></span>
              </a> -->

              <!-- Inbox Title -->
              <span id="taskListName" class="task-list-name" style="">{{taskListName}}</span>
            </div>
          </div>
          <div style="display: grid; gap: 10px; grid-template-columns: auto auto; place-self: center end; text-align: right;">

            <div style="display: flex;column-gap: 10px;">
              <!--<div style="cursor:pointer"><img src="resources/images/all-activities.svg" style="height:15px;width:15px"></div>-->
              <div v-on:click="refreshPaneList()" class="clickable-btn uk-button" style="cursor: pointer;padding: 0 0px;filter: grayscale(1);"><img src="resources/images/refresh.svg" style="pointer-events: none;height:15px;width:15px"></div>
            </div>
          </div>
        </div>
        <div v-if="appliedTaskFilter === 'category'" style="margin-bottom: 15px; padding: 0px 10px 0px 0px; box-sizing: border-box;position:relative ">
            <span style="position:absolute;left:10px;top: 10px;color: #9f9f9f;" uk-icon="icon:search;ratio:0.85"></span>
            <input tabindex="1" id="taskSearchInput" autocomplete="off" placeholder="Search Tasks in this category"
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

                        <div class="adk_grid_list_content custom-scroll-bar" id="taskListIntersectionObserver">
                          <div class="task_inbox_list elastic_scroll_list" >
                          
                            <div v-for="(kk, catIndex) in category.clients" :key="catIndex">
                            <div v-on:click="cardActive = catIndex" v-bind:style="cardActive === catIndex && 'border-left: 2px solid rgb(37, 139, 255)'">
                               <clients-list-item v-bind:item="kk" v-bind:cardActive="cardActive" v-bind:catIndex="catIndex"/>
                            </div>
                            </div>
                       
                          </div>
                        </div>
                  </div>
                </div>
            </div>

      </div>
      <div class="taskDetailContainer task-detail-container" style="width: 100%; background: rgb(246 246 246)" v-for="(category, index) in myCategoriesList" :key="index" v-show="clientFilter === index">
          <div v-for="(catItem, catIndex) in category.clients" :key="catIndex" v-show="cardActive === catIndex" style="width: 100%">
          <div v-show="cardActive !== catIndex" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
              <div style="display: flex;grid-template-rows: 1fr;flex-grow: 1;overflow-y: hidden;align-items: center;justify-content: center;background-color:rgb(255, 255, 255, 0.85), height: 100%;">
                  No Task chosen.
              </div>
          </div>
          <div v-show="cardActive === catIndex" style="display:flex;flex-grow: 1;grid-template-rows:1fr;overflow-y:hidden">
              <client-view-formate v-bind:catItem="catItem" v-bind:categoryMain="category"/>
          </div>
          </div>
      </div>
    </div>

    <!--
    <div class="task_filter_form" v-show="showTaskFilter">
        <div class="first_column_scrollable custom-scroll-bar" style="font-size: 0.7rem;left: 20px;right: 20px;top: -1px;opacity: 1;z-index: 100;background: rgb(31 105 189);border-width: 3px 3px 3px 3px;border-top-style: initial;border-right-style: solid;border-bottom-style: solid;border-left-style: solid;border-top-style: solid;border-top-color: rgb(37, 139, 255);border-right-color: rgb(37, 139, 255);border-bottom-color: rgb(37, 139, 255);border-left-color: rgb(37, 139, 255);border-image: initial;box-shadow: rgba(0, 0, 0, 0.12) 0px 15px 12px 0px;border-radius: 3px;">
            <task-search-modal v-on:filterTasks="filterTasks($event)" />
        </div>
    </div>
    -->

    <div id="new-task-form-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="display: flex;min-width: 75%;max-width: 75% !important;width: auto;flex-direction: column;overflow-y: hidden;font-size: 0.65rem;padding: 0px;border: 0px solid rgba(0, 0, 0, 0.57);">

            <!--<button class="uk-modal-close-default" type="button" uk-close ></button>-->

            <div style="display: flex;font-size: 1rem;margin-bottom: 10px;background: rgb(243, 243, 243);margin-top: 0px;padding: 0px;flex-direction: row-reverse;">

              <button v-on:click="closeNewTaskModal()" v-bind:uk-tooltip="'Close'"
                class="uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button subtask-back-button"
                style="border-radius: 3px;align-self:flex-start">
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"></path><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"></path></svg>
              </button>
              <div style="font-weight: bold;display: flex;align-items: center;flex-grow: 1;justify-content: center;">
                <span style="font-size: 0.75rem;">New Task &nbsp;</span>
                <span v-if="chosenTaskCategory!==null" style="font-size: 0.75rem;color: #a0a0a0;"> for &nbsp;{{chosenTaskCategory.name}}&nbsp; / &nbsp;</span>
                <span v-if="chosenTaskTemplate!==null" style="font-size: 0.75rem;color: #a0a0a0;"> &nbsp;{{chosenTaskTemplate.name}} &nbsp;</span>
              </div>

              <hr>

            </div>
            <div style="display: flex;justify-content: center;flex-grow: 1;padding: 0px 0px;">
                <div v-show="modalFormKey === 'new_task'" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
                  <new-task-form uniqueComponentId="newTaskForm" v-bind:possibleAssignees="possibleAssignees" v-bind:possibleFollowers="possibleFollowers" v-bind:taskFromChatMessageData="taskFromChatMessageData" v-on:refreshList="refreshPaneList()" v-on:signalCloseNewTaskModal="closeNewTaskModal()" v-bind:resetTime="resetTime"/>
                </div>

                <div v-show="modalFormKey === 'new_template_task'" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
                    <new-task-template-form uniqueComponentId="newTaskForm" v-bind:chosenTaskTemplate="chosenTaskTemplate"  v-bind:chosenTaskCategory="chosenTaskCategory" v-on:refreshList="refreshPaneList()" v-on:signalCloseNewTaskModal="closeNewTaskModal()" v-bind:resetTime="resetTime"/>
                </div>
            </div>

        </div>
    </div>
    <div id="new-recurring-task-form-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="display: flex;min-width: 75%;max-width: 75% !important;width: auto;flex-direction: column;overflow-y: hidden;font-size: 0.65rem;padding: 0px;border: 0px solid rgba(0, 0, 0, 0.57);">

            <!--<button class="uk-modal-close-default" type="button" uk-close ></button>-->

            <div style="display: flex;font-size: 1rem;margin-bottom: 10px;background: rgb(243, 243, 243);margin-top: 0px;padding: 0px;flex-direction: row-reverse;">

              <button v-on:click="closeNewTaskModal()" v-bind:uk-tooltip="'Close'"
                class="uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button subtask-back-button"
                style="border-radius: 3px;align-self:flex-start">
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"></path><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"></path></svg>
              </button>
              <div style="font-weight: bold;display: flex;align-items: center;flex-grow: 1;justify-content: center;">
                <span style="font-size: 0.75rem;">New Recurring Task &nbsp;</span>
                <span v-if="chosenTaskCategory!==null" style="font-size: 0.75rem;color: #a0a0a0;"> for &nbsp;{{chosenTaskCategory.name}}&nbsp; / &nbsp;</span>
                <span v-if="chosenTaskTemplate!==null" style="font-size: 0.75rem;color: #a0a0a0;"> &nbsp;{{chosenTaskTemplate.name}} &nbsp;</span>
              </div>

              <hr>

            </div>
            <div style="display: flex;justify-content: center;flex-grow: 1;padding: 0px 0px;">
                <div v-show="modalFormKey === 'new_recurring_task'" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
                  <new-recurring-task-form uniqueComponentId="newTaskForm" v-bind:possibleAssignees="possibleAssignees" v-bind:possibleFollowers="possibleFollowers" v-bind:taskFromChatMessageData="taskFromChatMessageData" v-on:refreshList="refreshPaneList()" v-on:signalCloseNewTaskModal="closeNewRecurringTaskModal()" v-bind:resetTime="resetTime"/>
                </div>

                <div v-show="modalFormKey === 'new_recurring_task_from_template'" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
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
    <div id="view-subtask-form-modal" class="uk-flex-top app-container-modal" data-theme="flutter" uk-modal="stack: true">
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="position:relative;display: flex;min-width:75%;width:auto;flex-direction: column;overflow-y: hidden;font-size: 0.65rem;padding: 0px;border: 0px solid rgba(0, 0, 0, 0.57);min-height: 100%;">

            <!--<button class="uk-modal-close-default" type="button" uk-close ></button>-->

            <button v-on:click="closeNewTaskModal()" v-bind:uk-tooltip="'Close'"
              class="uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button subtask-back-button"
              style="position: absolute;right: 20px;top: 20px;border-radius: 25px;align-self: flex-start;z-index:5">
              <svg width="15" height="15" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"></path><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"></path></svg>
            </button>

            <div style="display: flex;justify-content: center;flex-grow: 1;padding: 10px;border: 10px solid #efefef;box-sizing: border-box;border-radius: 5px;">
                <taskview-format-2 uniqueComponentId="viewSubTaskFormFromTaskInbox" embeddingViewName="view_subtask_modal" v-bind:loggedInUser="loggedInUser" v-bind:taskIdToBeViewed="selectedSubTaskId" v-bind:tabToDisplay="selectedSubTaskTabToDisplay" v-on:refreshList="refreshPaneList()" isModalViewed="true"></taskview-format-2>
            </div>

        </div>
    </div>
    <div id="view-rtask-form-modal" class="uk-flex-top app-container-modal" data-theme="flutter" uk-modal="stack: true">
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="position:relative;display: flex;min-width:75%;width:auto;flex-direction: column;overflow-y: hidden;font-size: 0.65rem;padding: 0px;border: 0px solid rgba(0, 0, 0, 0.57);min-height: 100%;">

            <!--<button class="uk-modal-close-default" type="button" uk-close ></button>-->

            <button v-on:click="closeRTaskViewModal()" v-bind:uk-tooltip="'Close'"
              class="uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button subtask-back-button"
              style="position: absolute;right: 20px;top: 20px;border-radius: 25px;align-self: flex-start;z-index:5">
              <svg width="15" height="15" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"></path><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"></path></svg>
            </button>

            <div style="display: flex;justify-content: center;flex-grow: 1;padding: 10px;border: 10px solid #efefef;box-sizing: border-box;border-radius: 5px;">
                <rtaskview-format-2 uniqueComponentId="viewRecurringTaskFormFromTaskInbox" embeddingViewName="view_rtask_modal" v-bind:loggedInUser="loggedInUser" v-bind:taskIdToBeViewed="selectedRTaskId" v-on:refreshList="refreshPaneList()" isModalViewed="true"></rtaskview-format-2>
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

    <div id="recurring-task-cron-builder-modal" class="uk-flex-top" uk-modal="stack: true">
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="display: flex;min-width:70%;width:auto;flex-direction: column;;overflow-y: hidden;font-size: 0.65rem;padding: 0px;border: 0px solid rgba(0, 0, 0, 0.57);">

            <!--<button class="uk-modal-close-default" type="button" uk-close ></button>-->

            <div style="display: flex;font-size: 1rem;margin-bottom: 10px;background: #f3f3f3;margin-top: 0px;padding: 10px;">

              <button v-on:click="closeCronBuilderFromTemplateModal()" v-bind:uk-tooltip="'Go back'"
                class="uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button subtask-back-button"
                style="border-radius: 3px;align-self:flex-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" >
                  <path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"></path>
                </svg>
              </button>
              <div style="display: flex;align-items: center;flex-grow: 1;justify-content: center;">Build a CRON Expression that runs on a<span style="font-weight: bold;padding-left:5px">{{cronBasis}}</span></div>
              <hr>

            </div>
            <div style="display: flex;flex-direction: column;justify-content: center;flex-grow: 1;padding: 5px 10px 30px 10px;">


              <div uk-tab>
                  <div><a href="#" style="font-size: 0.75rem !important;text-transform: capitalize;" v-on:click="cronBasis = 'Daily basis'">Daily basis</a></div>
                  <div><a href="#" style="font-size: 0.75rem !important;text-transform: capitalize;" v-on:click="cronBasis = 'Weekly basis'">Weekly basis</a></div>
                  <div><a href="#" style="font-size: 0.75rem !important;text-transform: capitalize;" v-on:click="cronBasis = 'Monthly basis'">Monthly basis</a></div>
                  <div><a href="#" style="font-size: 0.75rem !important;text-transform: capitalize;" v-on:click="cronBasis = 'Yearly basis'">Yearly basis</a></div>
              </div>

              <div class="uk-switcher uk-margin" style="font-size: 0.75rem !important;text-transform: capitalize;padding:40px;">
                  <div><cron-builder cronFrequency='daily' /></div>
                  <div><cron-builder cronFrequency='weekly' /></div>
                  <div><cron-builder cronFrequency='monthly' /></div>
                  <div><cron-builder cronFrequency='yearly' /></div>
              </div>


            </div>

        </div>
    </div>

    <div id="confirm-rtask-cancellation-modal" class="uk-flex-top" uk-modal="stack: true">
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="display: flex;min-width:70%;width:auto;flex-direction: column;;overflow-y: hidden;font-size: 0.65rem;padding: 0px;border: 0px solid rgba(0, 0, 0, 0.57);">

            <!--<button class="uk-modal-close-default" type="button" uk-close ></button>-->

            <div style="display: flex;font-size: 1rem;margin-bottom: 10px;background: #f3f3f3;margin-top: 0px;padding: 10px;">

              <button v-on:click="closeRTaskCancellationModal()" v-bind:uk-tooltip="'Go back'"
                class="uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button subtask-back-button"
                style="border-radius: 3px;align-self:flex-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" >
                  <path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"></path>
                </svg>
              </button>
              <div style="display: flex;align-items: center;flex-grow: 1;justify-content: center;">Build a CRON Expression that runs on a<span style="font-weight: bold;padding-left:5px">{{cronBasis}}</span></div>
              <hr>

            </div>
            <div style="display: flex;flex-direction: column;justify-content: center;flex-grow: 1;padding: 5px 10px 30px 10px;">


              <div uk-tab>
                  <div><a href="#" style="font-size: 0.75rem !important;text-transform: capitalize;" v-on:click="cronBasis = 'Daily basis'">Daily basis</a></div>
                  <div><a href="#" style="font-size: 0.75rem !important;text-transform: capitalize;" v-on:click="cronBasis = 'Weekly basis'">Weekly basis</a></div>
                  <div><a href="#" style="font-size: 0.75rem !important;text-transform: capitalize;" v-on:click="cronBasis = 'Monthly basis'">Monthly basis</a></div>
                  <div><a href="#" style="font-size: 0.75rem !important;text-transform: capitalize;" v-on:click="cronBasis = 'Yearly basis'">Yearly basis</a></div>
              </div>

              <div class="uk-switcher uk-margin" style="font-size: 0.75rem !important;text-transform: capitalize;padding:40px;">
                  <div><cron-builder cronFrequency='daily' /></div>
                  <div><cron-builder cronFrequency='weekly' /></div>
                  <div><cron-builder cronFrequency='monthly' /></div>
                  <div><cron-builder cronFrequency='yearly' /></div>
              </div>


            </div>

        </div>
    </div>

  </div>


<!-- ADD client popup -->
<div id="add-people-modal" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <add-people/>
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
  import taskInboxModals from './../../mixins/lib/task_inbox_modals.js';
  import taskInboxComplexFiltering from './../../mixins/lib/task_inbox_complex_filtering.js';

  import * as Comlink from 'comlink';

  export default {
  mixins: [
            uiListMixinLib, utilsMixinLib, userMixinLib, rsocket,
            taskInbox, taskInboxModals, taskInboxComplexFiltering],
  data: function () {
    return {
      cronBasis: 'Weekly basis',
      taskListName: 'Clients', // This is the list's name. Can be ["Inbox", "Sent", "Overdue", "Closed", "Category.."]

      // This is the primary list comprehensive object displaying the tasks.
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

      // These properties are to handle the "Subtask creation" using the modal.
      selectedSubTaskId: null,
      selectedSubTaskTabToDisplay: null,
      selectedTaskForSubtaskCreation: {},

      selectedRTaskId: null,

      loggedInUser: {}, // property to hold information about the logged-in-user.
      searchQuery: '',

      // These properties are related to the task being chosen from the list to be displayed in detail.
      isTaskChosen: false,
      selectedTask: {},
      isTaskCreationInProcess: false,


      modalFormKey: null, // Options can be "new_task", "new_sub_task", "new_scheduled_task", "new_recurring_task", "new_template_task"
      resetTime: {
        time: new Date().getTime()
      },

      appliedTaskFilter: "all", // [Here 'all' refers to 'involved tasks' or 'inbox'], others can be "draft", "sent", "overdue", "closed", "category"
      filterByCategoryId: null, // The category selected on the side-menu

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

     myCategoriesList: [
        {name: 'USA',
        clients: [
          {
          name: 'Coco-cola',
          id: '1476',
          month: 'AUG',
          contact: [
            {
            name: 'Jonatan Cartine',
            role: 'Owner',
            },
            {
            name: 'Sheetal Cartine',
            role: 'Owner',
            },
            {
            name: 'Norries Cartine',
            role: 'Accountant',
            }
          ],
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Manoj Ponugoti',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
          tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1781,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1782,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1783,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1784,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1785,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
           {
          name: 'Maza',
          id: '1376',
          month: 'AUG',
          contact: [
            {
            name: 'Jonatan Cartine',
            role: 'Owner',
            },
            {
            name: 'Sheetal Cartine',
            role: 'Owner',
            },
            {
            name: 'Norries Cartine',
            role: 'Accountant',
            }
          ],
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Manoj Ponugoti',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
          tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
           {
          name: 'Mirinda',
          id: '1276',
          month: 'AUG',
          contact: [
            {
            name: 'Jonatan Cartine',
            role: 'Owner',
            },
            {
            name: 'Sheetal Cartine',
            role: 'Owner',
            },
            {
            name: 'Norries Cartine',
            role: 'Accountant',
            }
          ],
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Manoj Ponugoti',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
          tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
           {
          name: 'Fizz',
          id: '1476',
          month: 'AUG',
          contact: [
            {
            name: 'Jonatan Cartine',
            role: 'Owner',
            },
            {
            name: 'Sheetal Cartine',
            role: 'Owner',
            },
            {
            name: 'Norries Cartine',
            role: 'Accountant',
            }
          ],
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Manoj Ponugoti',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
          tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
           {
          name: 'Dite Coke',
          id: '1476',
          month: 'AUG',
          contact: [
            {
            name: 'Jonatan Cartine',
            role: 'Owner',
            },
            {
            name: 'Sheetal Cartine',
            role: 'Owner',
            },
            {
            name: 'Norries Cartine',
            role: 'Accountant',
            }
          ],
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Manoj Ponugoti',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
          tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
          {
          name: 'Pepsi',
          id: '1479',
          month: 'AUG',
          contact: [
            {
            name: 'Jonatan Cartine',
            role: 'Owner',
            },
            {
            name: 'Sheetal Cartine',
            role: 'Owner',
            },
            {
            name: 'Norries Cartine',
            role: 'Accountant',
            }
          ],
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
               tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          }
        ]
        },
        {name: 'France',
        clients: [
          {
          name: 'SipUp',
          id: '1476',
          month: 'AUG',
          contact: [
            {
            name: 'Jonatan Cartine',
            role: 'Owner',
            },
            {
            name: 'Sheetal Cartine',
            role: 'Owner',
            },
            {
            name: 'Norries Cartine',
            role: 'Accountant',
            }
          ],
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
               tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
          {
          name: 'Fidisys',
          id: '1479',
          month: 'AUG',
          contact: [
            {
            name: 'Jonatan Cartine',
            role: 'Owner',
            },
            {
            name: 'Sheetal Cartine',
            role: 'Owner',
            },
            {
            name: 'Norries Cartine',
            role: 'Accountant',
            }
          ],
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
               tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
          {
          name: 'Mirinda',
          id: '1480',
          month: 'AUG',
          contact: [
            {
            name: 'Jonatan Cartine',
            role: 'Owner',
            },
            {
            name: 'Sheetal Cartine',
            role: 'Owner',
            },
            {
            name: 'Norries Cartine',
            role: 'Accountant',
            }
          ],
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
               tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
        ]
        },
        {name: 'Canada',
        clients: [{
          name: 'Coco-cola',
          id: '1476',
          month: 'AUG',
          contact: [
            {
            name: 'Jonatan Cartine',
            role: 'Owner',
            },
            {
            name: 'Sheetal Cartine',
            role: 'Owner',
            },
            {
            name: 'Norries Cartine',
            role: 'Accountant',
            }
          ],
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
               tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
        }]
        }
      ],
      isNewTaskOptionsOpen: false,

      // This is used when we convert a chat message to a task.
      taskFromChatMessageData: {},
      possibleAssignees: [],
      possibleFollowers: [],



      // clients
      clientFilter: '',
      cardActive: ''
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

    closeCronBuilderFromTemplateModal () {
      UIkit.modal(document.querySelector('#recurring-task-cron-builder-modal')).hide();
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
            const list = dataResponse.data;
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

    searchTasks () {
      this.taskList.allRecordsFetched = false;
      this.taskList.pageNumber = 1;
      this.taskList.list = [];
      this.disableTaskListPaginationIntersectionObserver();
      this.taskList.isIntersectionObserverFired = false;
      this.getTaskList();
    },


    // function copied from adk-app.vue
    loadTasks (taskFilter, menuFilter, filterName) {

      this.$router.push({
        name: "view-task-inbox"
        // params: params
      });

      this.appliedTaskFilter = taskFilter;

      if (taskFilter === "inbox") {

        this.quickFilterOptions = {
                                    statusFilter: false,
                                    involvementFilter: false,
                                    priorityFilter: true,
                                    categoryFilter: true
                                  };
      }
      else if (taskFilter === "sent") {

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

      document.querySelectorAll('.menu-item').forEach((el) => {
          el.classList.remove('uk-active');
          el.classList.remove('selected-menu');
        }
      );
      document.querySelector('#' + menuFilter).classList.add('selected-menu');
      document.querySelector('#' + menuFilter).classList.add('uk-active');
      this.filterByTaskDivision({ key: this.appliedTaskFilter, filterName: filterName });
    },
    filterByTaskDivision (data) {

      this.isTaskChosen = false; // Display detailed task to empty view ("No selected task")
      this.isTaskCreationInProcess = false;
      this.taskListName = data.filterName;
      this.appliedTaskFilter = data.key;
      this.taskFilter = data.key;
      this.filterByCategoryId = null;
      this.refreshPaneList();
    },

    // Functionality to handle "New Task" dropdown option button click begins here..
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
    // Functionality to handle "New Task" dropdown option button click ends here.


    createTask (taskType) {

      console.log('Creating task of type : ' + taskType);
      console.log('Event emitted in bus.', new Date());

      if (taskType === 'template') {
        bus.emit('newTemplateTaskEvent', { modalKey: "new_template_task" });
      }
      else if (taskType === 'scheduled') {
        bus.emit('newScheduledTaskEvent', { modalKey: "new_scheduled_task" });
      }
      else if (taskType === 'recurring') {
        bus.emit('newRecurringTaskEvent', { modalKey: "new_recurring_task" });
      }

      this.closeNewTaskOptions();
    },


    // Filter tasks by selected category begins here
    loadTasksFromCategory (index) {
       this.clientFilter = index;
    },
    filterByCategory (data) {
      this.isTaskChosen = false;
      this.isTaskCreationInProcess = false;

      if (data.name == 'all') {
        this.taskListName = 'Inbox';
        this.appliedTaskFilter = "all";
        this.filterByCategoryId = null;
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
        this.filterByCategoryId = data.id;
        this.appliedTaskFilter = "category";
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
    // Filter tasks by selected category ends here



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
                  task.createdOnFormatted = dayjs(task.createdOn + "Z").format('DD/MM/YYYY HH:mm');
                  task.createdOnAgo = dayjs(task.createdOn + "Z").fromNow();
                  task.isRecent = false;

                  // If this task was created within the previous hour, then mark it as recent.
                  const differenceInMinutes = dayjs().diff(dayjs(task.createdOn + "Z"), 'minute');
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
                  task.dueDateTimeFormatted = dayjs(task.dueDateTime + "Z").format('DD/MM/YYYY HH:mm');
                  task.dueDateTimeAgo = dayjs(task.dueDateTime + "Z").fromNow();
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
    isSocketActive: function () {
      return this.$store.getters.isSocketActive;
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
return false;
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
      // this.connectToTaskActivityInvolvedUserChannel(this.loggedInUser.userId);
    });

    // Close modal event is thrown from the new-task-form as an this.event and not on bus.emit.
    // It will be caught in the <new-task-form's v-on:signalCloseNewTaskModal="closeNewTaskModal()" attribute.
    // So don't write the close-modal event code on bus.
    bus.off('newTaskEvent');
    bus.on('newTaskEvent', (data) => {
      // console.log('Show-New-Task-Form event received in bus.', data);
      this.showNewTaskForm(data); // function is stored in task_inbox_modals.js mixin
    });


    bus.off('newTemplateTaskEvent');
    bus.on('newTemplateTaskEvent', (data) => {
      console.log('Show-New-Template-Task-Form event received in bus.', new Date());
      this.loadAllCategories(); // This function will display the modal window.
    });

    bus.off('newScheduledTaskEvent');
    bus.on('newScheduledTaskEvent', (data) => {
      console.log('Show-New-Scheduled-Task-Form event received in bus.', new Date());
      this.showNewScheduledTaskForm(); // function is stored in task_inbox_modals.js mixin
    });

    bus.off('newRecurringTaskEvent');
    bus.on('newRecurringTaskEvent', (data) => {
      console.log('Show-New-Recurring-Task-Form event received in bus.', new Date());
      this.showNewRecurringTaskForm(data); // function is stored in task_inbox_modals.js mixin
    });

    bus.off('viewSubTaskEvent');
    bus.on('viewSubTaskEvent', (data) => {
      console.log("Received view-subtask event in bus : subTaskId is ", data.subTaskId);
      this.viewSubtaskForm(data.subTaskId, data.tabToDisplay); // function is stored in task_inbox_modals.js mixin
    });


    bus.off('viewRTaskEvent');
    bus.on('viewRTaskEvent', (data) => {
      console.log("Received view-subtask event in bus : subTaskId is ", data.rTaskId);
      this.viewRecurringTasksForm(data.rTaskId); // function is stored in task_inbox_modals.js mixin
    });





    bus.off('newSubTaskEvent');
    bus.on('newSubTaskEvent', (data) => {
      console.log('Show-New-Subtask-Form event received in bus.', new Date());
      this.showNewSubtaskForm(data.parentTask); // function is stored in task_inbox_modals.js mixin
    });

    bus.off('exitNewSubTaskForm');
    bus.on('exitNewSubTaskForm', (data) => {
      this.exitNewSubTaskForm();
    });

    bus.off('discardNewTaskForm');
    bus.on('discardNewTaskForm', (data) => {
      this.isTaskChosen = false;
      this.isTaskCreationInProcess = false;
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



<style scoped>
#activeClient {
  background: #28181808;
}
</style>