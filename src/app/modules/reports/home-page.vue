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
                        <span style="margin-left:5px"> New Report</span>
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
              <ul class="uk-nav uk-nav-default report-group-list">


                  <template v-for="reportGroup in availableReportGroups">
                      <li class="menu-item" v-bind:id="'report_group_' + reportGroup.id">
                        <a v-on:click="loadReportsForReportGroup(reportGroup)" xv-on:click="goToPage('view-task-inbox',{'taskId':'all','subtaskId':'none'})">
                          <span class="lnr lnr-chart-bars"></span>&nbsp;&nbsp;{{reportGroup.name}}
                        </a>
                      </li>
                  </template>

                  <!-- <li class="uk-parent" id="category-submenu" style="display:none">
                      <ul class="uk-nav-sub" style="max-height: 300px;height: 300px;overflow-y: auto;">

                      </ul>
                  </li> -->
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
      <div  v-show="true" class="listOfTasksContainer" style="border-right:0px solid #ccc;position: relative;padding: 15px;padding-right: 5px;overflow-y: hidden;display: flex;flex-direction: column;flex-basis: 30%;background: rgb(255, 255, 255, 0);color: rgb(51, 51, 51);">
        <div class="adk_grid_toolbar" style="user-select: none;grid-template-columns: auto 1fr;padding: 0px 0px;height:50px">
          <div style="display: grid; place-self: center flex-start; text-align: left;">
            <div style="align-items:center;display: grid; place-self: center flex-start; padding-left: 0px; padding-right: 20px; color: rgba(61, 61, 61, 0.78) !important; grid-template-columns: auto auto auto; font-size: 0.75rem;">
              <!-- <a class="uk-navbar-item" style="padding-right: 0px;padding-left: 0px;" v-on:click="toggleSideMenu()">
                <span class="uk-margin-small-right" style="color: rgb(103 103 103)" uk-icon="icon:menu;ratio:1.25"></span>
              </a> -->
              <span style="font-size: 1.15rem;font-weight: bold;" id="reportGroupName">{{reportGroupName}}</span>
              <span style="font-size: 0.75rem;margin-left: 5px;margin-top: 5px;">({{availableReports.list.length}})</span>
            </div>
          </div>
          <div style="display: grid; gap: 10px; grid-template-columns: auto auto; place-self: center end; text-align: right;">

            <div style="display: flex;column-gap: 10px;">
              <!--<div style="cursor:pointer"><img src="resources/images/all-activities.svg" style="height:15px;width:15px"></div>-->
              <div v-on:click="refreshPaneList()" class="clickable-btn uk-button" style="cursor: pointer;padding: 0 0px;filter: grayscale(1);"><img src="resources/images/refresh.svg" style="pointer-events: none;height:15px;width:15px"></div>

              <!--

              Temporarily disabled by Vignesh on June 10, 2021

              <div v-show="!showTaskFilter" v-on:click="showTaskFilterModal()" class="clickable-btn uk-button" style="cursor: pointer;padding: 0px 5px;filter: grayscale(1);"><img src="resources/images/filter.svg" style="pointer-events: none;height:15px;width:15px"></div>
              <div v-show="showTaskFilter"  v-on:click="showTaskFilterModal()" class="clickable-btn uk-button" style="cursor: pointer;padding: 0px 5px;background: #1f69bd;border-radius: 3px;">
                  <svg xmlns="http://www.w3.org/2000/svg" height="394pt" viewBox="-5 0 394 394.00003" width="394pt" style="fill: white;pointer-events: none;height: 15px;width: 15px;color: white;"><path d="m367.820312 0h-351.261718c-6.199219-.0117188-11.878906 3.449219-14.710938 8.960938-2.871094 5.585937-2.367187 12.3125 1.300782 17.414062l128.6875 181.285156c.042968.0625.089843.121094.132812.183594 4.675781 6.3125 7.207031 13.960938 7.21875 21.816406v147.800782c-.027344 4.375 1.691406 8.582031 4.773438 11.6875 3.085937 3.101562 7.28125 4.851562 11.65625 4.851562 2.222656-.003906 4.425781-.445312 6.480468-1.300781l72.3125-27.570313c6.476563-1.980468 10.777344-8.09375 10.777344-15.453125v-120.015625c.011719-7.855468 2.542969-15.503906 7.214844-21.816406.042968-.0625.089844-.121094.132812-.183594l128.691406-181.289062c3.667969-5.097656 4.171876-11.820313 1.300782-17.40625-2.828125-5.515625-8.511719-8.9765628-14.707032-8.964844zm0 0"></path></svg>
              </div>
              -->

              <!--<div style="cursor:pointer"><span uk-icon="icon:list;ratio:0.85"></span></div>-->
              <!--<div style="cursor:pointer"><span uk-icon="icon:more;ratio:0.75"></span></div>-->
            </div>
          </div>
        </div>
        <div style=" margin-bottom: 15px; padding: 0px 10px 0px 0px; box-sizing: border-box;position:relative ">
            <span style="position:absolute;left:10px;top: 10px;color: #9f9f9f;" uk-icon="icon:search;ratio:0.85"></span>
            <input tabindex="1" id="taskSearchInput" autocomplete="off" placeholder="Search Reports"
                    v-model="availableReports.searchQuery"
                    v-on:keyup.enter="searchTasks()"
                    type="text" class="uk-input task-search-input" style="border-radius: 20px;padding-left: 40px;"/>
        </div>
        <!--<div><hr></div>-->

        <div style="flex-grow: 1;overflow-y: hidden;position: relative;padding: 0px;height: 100%;">
                <div style="display: flex;flex-direction: column;flex-grow: 1;height: 100%;">
                    <div class="task-list" id="tasklist" style="position:relative;font-size: 0.7rem;flex-grow: 1;margin-top: 10px;grid-template-rows: 1fr;background-color:#f2f2f2;background-color:rgb(255, 255, 255, 0)">
                        <div id="reportslist_loading_spinner" style="display: flex;opacity:1;transition:0.25s linear;position:absolute;top:0px;right:0px;left:0px;bottom:0px;align-items:center;justify-content:center;z-index: 2;">
                            <div class="spinner-2"></div>
                        </div>

                        <div class="adk_grid_list_content custom-scroll-bar elastic_scroll_container" >
                          <div class="task_inbox_list elastic_scroll_list" style="transition: 0.55s ease-out;display: grid;row-gap: 4.5px;align-content: baseline;padding-right:5px;">
                            <div v-for="item,index in availableReports.list"
                                 :key="item.id"
                                 v-bind:id="'report_' + item.id"
                                 v-on:click="loadReportFilters(item,index)"
                                 class="list-row"
                                 style="padding: 0px 2px 0px 10px;">

                              <div class="active-border"></div>

                              <div class=" list-detail" style=" display: grid;">
                                <div class="list-item-row-2 task-name" style="place-items: flex-start flex-start;overflow-x: hidden;">
                                  <p style="margin: 0 10px 0px 10px;text-overflow: ellipsis;overflow-x: hidden;white-space: nowrap;">{{index+1}}. {{item.name}}</p>
                                </div>
                              </div>

                            </div>
                            <div id="availableReportsIntersectionObserver"
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
          <div v-show="!isReportChosen" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
              <div style="display: flex;grid-template-rows: 1fr;flex-grow: 1;overflow-y: hidden;align-items: center;justify-content: center;background-color:rgb(255, 255, 255, 0.85)">
                  No Report chosen.
              </div>
          </div>
          <div v-show="isReportChosen" style="display:flex;flex-grow: 1;grid-template-rows:1fr;overflow-y:hidden">
            <div class="" style="background:rgb(255, 255, 255, 0.9);overflow-y:hidden;display: flex;flex-grow: 1;">
              <div class="task_details_container task_view_container" style="width: 100%;padding:15px">
                <div class="task_title" style=";padding-top:5px;padding-bottom:10px">Report - {{selectedReport.name}}</div>
                <div class="report_container" style="display: grid;grid-template-rows: auto 1fr;display: flex;flex-direction: column;flex-grow: 1;overflow-y: hidden;">

                      <div style="display:flex;" class="report-tab-bar">
                          <div style="flex-grow:1">
                            <ul  v-bind:id="embeddingViewName + '_switcherTabs'" class="uk-subnav uk-subnav-pill " xuk-switcher style="gap: 10px;user-select: none;align-items: center;justify-content: flex-start;column-gap: 10px;margin-left: -10px;">
                              <!--<li uk-tooltip="title:Task Info;pos:bottom"><a href="#"><span class="tab_icon"><ui-icon name="info" size="width:15px;height:15px"/></span><span class="">Task Info</span></a></li>-->
                              <li v-on:click="displayTab($event, 'filters_tab')" class="uk-active filters_tab" uk-tooltip="title:Report Filters;pos:bottom" style="margin-left:0px;">
                                <a style="display: flex;pointer-events: none;user-select: none;align-items: center;justify-content: center;" >
                                  <span class="tab_icon" style="display: flex;column-gap: 5px;align-items: center;">
                                    <ui-icon name="description" size="width:15px;height:15px"/>
                                  </span>
                                  <span class="" style="margin-left:10px;"> Filters</span>
                                </a>
                              </li>
                              <li v-on:click="displayTab($event, 'report_display_tab')" class="report_display_tab" uk-tooltip="title:Generated Report;pos:bottom" style="padding-left: 0px;">
                                  <a style="display: flex;pointer-events: none;user-select: none;align-items: center;justify-content: center;" >
                                    <span class="tab_icon"  style="display: flex;column-gap: 5px;align-items: center;position:relative">
                                        <ui-icon name="activity" size="width:15px;height:15px"/>
                                    </span>
                                    <span class="tab_label" style="margin-left:10px;"> Generated Report</span>
                                  </a>
                              </li>
                            </ul>
                          </div>
                          <div v-show="isReportGenerated" style="display: flex;column-gap: 5px;">
                            <a tabindex="6" id="saveButton" v-on:click="downloadReport($event)"  class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(2, 119, 254);border-radius: 2px;place-self: center start;place-items: center;min-width: 100px;font-size: 0.65rem;line-height:32px;font-weight: normal !important;display: flex;color: white;" >
                              <ui-icon name="download" size="width:15px;height:15px" uk-tooltip="title:Download Report;pos:bottom"/>
                              <span class="tab_label" style="margin-left:5px;">Download Report</span>
                            </a>
                            <span>
                              <select class="uk-select" v-model="reportFormatToDownload">
                                  <option value="pdf">PDF</option>
                                  <option value="excel">Excel</option>
                              </select>
                            </span>
                          </div>
                      </div>
                      <div  v-bind:id="embeddingViewName + '_switcherTabsContent'"  class="xuk-switcher xuk-switcher-component" style="position:relative;margin-top: 0px;font-size: 0.7rem;padding:5px 10px;overflow-y: hidden;display: flex;flex-grow: 1;background: rgb(255, 255, 255, 0);touch-action: pan-y pinch-zoom;box-sizing: border-box;">

                        <div xv-show="selectedTabKey==='filters_tab'" class="custom-scroll-bar filters_tab_container" style="position: absolute;inset: 10px;visibility:visible;flex-grow: 1;overflow-y: scroll;padding: 35px 5px;height: 100%;background: rgba(255, 255, 255, 0.7);box-sizing: border-box;margin-bottom: 10px;">
                            <div class="task-communication" style="min-height:75px">
                                <!--<label class="uk-form-label" style="font-size: 0.56rem;text-transform: uppercase;font-weight: bold;letter-spacing: 1px;text-decoration: underline;">Task Description</label>-->
                                <div style="padding-left: 0px;padding-top: 10px;padding-bottom: 25px;white-space: pre-line;">
                                  <div class="report-parameters-section">

                                      <form autocomplete="off" class="uk-grid-small uk-grid" uk-grid onsubmit="return false;">


                                          <template v-for="reportParameter in selectedReportParameters">

                                              <template v-if="reportParameter.type==='multiple'">
                                                  <div class="uk-width-1-2@s uk-grid-margin uk-first-column ">
                                                      <label class="uk-form-label" for="form-stacked-text">{{reportParameter.filterName}} </label>
                                                      <div class="uk-form-controls">
                                                          <div class="uk-inline uk-width-1-1" v-if="reportParameter.dataType==='string'">
                                                              <input tabindex="3" v-bind:id="'reportInput_' + reportParameter.filterKey" v-bind:data-filter-key="reportParameter.filterKey" type="text" class="uk-input reportInput"  placeholder="" style="font-family: Lato;font-weight: 300;" autofocus="true">
                                                          </div>
                                                          <div class="uk-inline uk-width-1-1" v-if="reportParameter.dataType==='number'">
                                                              <input tabindex="3" v-bind:id="'reportInput_' + reportParameter.filterKey" v-bind:data-filter-key="reportParameter.filterKey" type="number" class="uk-input reportInput"  placeholder="" style="font-family: Lato;font-weight: 300;text-align:right" autofocus="true">
                                                          </div>
                                                          <div class="uk-inline uk-width-1-1" v-if="reportParameter.dataType==='LocalDateTime' && reportParameter.type==='single'">
                                                              <input tabindex="3" v-bind:id="'reportInput_' + reportParameter.filterKey" v-bind:data-filter-key="reportParameter.filterKey" type="text" class="uk-input reportInput"  placeholder="" style="font-family: Lato;font-weight: 300;" autofocus="true">
                                                          </div>
                                                          <!-- Date type handling begins here -->
                                                          <div class="uk-inline uk-width-1-1" v-if="reportParameter.dataType==='LocalDateTime' && reportParameter.type==='single'">
                                                              <input tabindex="3" v-bind:id="'reportInput_' + reportParameter.filterKey" v-bind:data-filter-key="reportParameter.filterKey" type="text" class="uk-input reportInput"  placeholder="" style="font-family: Lato;font-weight: 300;" autofocus="true">
                                                          </div>
                                                          <!-- Date type handling is complete -->
                                                          <div class="uk-inline uk-width-1-1" v-if="reportParameter.dataType==='referenceId'">
                                                              <ui-selectbox v-bind:availableItems="reportParameter.list"
                                                                                    name="Roles"
                                                                                    v-if="reportParameter.type==='multiple'"
                                                                                    v-bind:id="'reference_list_' + reportParameter.filterKey"
                                                                                    v-bind:tagProperty="reportParameter.tagProperty"
                                                                                    v-bind:displayLabelProps="reportParameter.displayProperties" maxTagsToDisplay="3"
                                                                                    searchProperty="name"
                                                                                    data_tabindex="4"
                                                                                    disableAcronym="true"
                                                                                    v-on:selectBoxUpdate="updateReferenceIds($event, reportParameter.filterKey)"/>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div class="uk-width-1-2@s uk-grid-margin"></div>
                                              </template>
                                              <template v-if="reportParameter.type==='range'">

                                                  <div class="uk-width-1-1 dateTimeRange" style="display: inline-flex;column-gap: 10px;" v-bind:data-filter-key="reportParameter.filterKey">
                                                      <div class="uk-width-1-3@s uk-grid-margin uk-first-column ">
                                                          <label class="uk-form-label" for="form-stacked-text">{{reportParameter.filterName}} (From)</label>
                                                          <div class="uk-form-controls">
                                                            <input tabindex="3" v-bind:id="'reportInput_' + reportParameter.filterKey + '_from'"  type="date" class="uk-input reportInput fromDateTime"  placeholder="" style="font-family: Lato;font-weight: 300;" autofocus="true">
                                                          </div>
                                                      </div>
                                                      <div class="uk-width-1-3@s uk-grid-margin" style="margin-top: 0px;">
                                                          <label class="uk-form-label" for="form-stacked-text"> (To)</label>
                                                          <div class="uk-form-controls">
                                                            <input tabindex="3" v-bind:id="'reportInput_' + reportParameter.filterKey + '_to'"  type="date" class="uk-input reportInput toDateTime"  placeholder="" style="font-family: Lato;font-weight: 300;" autofocus="true">
                                                          </div>
                                                      </div>
                                                      <div class="uk-width-1-3@s uk-grid-margin  "></div>
                                                      <!-- Date type handling begins here -->
                                                  </div>
                                              </template>
                                              <template v-if="reportParameter.type==='single'">
                                                  <div class="uk-width-1-3@s uk-grid-margin uk-first-column ">
                                                      <label class="uk-form-label" for="form-stacked-text">{{reportParameter.filterName}}</label>
                                                      <div class="uk-form-controls">
                                                        <input v-if="reportParameter.dataType==='string'" tabindex="3" v-bind:id="'reportInput_' + reportParameter.filterKey" v-bind:data-filter-key="reportParameter.filterKey" type="text" class="uk-input reportInput stringInput"  placeholder="" style="font-family: Lato;font-weight: 300;" autofocus="true">
                                                        <input v-if="reportParameter.dataType==='number'" tabindex="3" v-bind:id="'reportInput_' + reportParameter.filterKey" v-bind:data-filter-key="reportParameter.filterKey" type="number" class="uk-input reportInput numberInput"  placeholder="" style="font-family: Lato;font-weight: 300;text-align:right" autofocus="true">
                                                        <ui-selectbox-single v-bind:availableItems="reportParameter.list"
                                                                             name="Roles"
                                                                             v-if="reportParameter.dataType==='referenceId'"
                                                                             v-bind:id="'reference_list_' + reportParameter.filterKey"
                                                                             v-bind:tagProperty="reportParameter.tagProperty"
                                                                             v-bind:displayLabelProps="reportParameter.displayProperties" maxTagsToDisplay="3"
                                                                             searchProperty="name"
                                                                             data_tabindex="4"
                                                                             disableAcronym="true"
                                                                             v-on:selectBoxUpdate="updateReferenceId($event, reportParameter.filterKey)"/>
                                                        <select v-if="reportParameter.dataType==='selectBox'" class="uk-select reportInput selectBoxInput" v-bind:data-filter-key="reportParameter.filterKey"  style="font-family: Lato;font-weight: 300;height: 35px;">
                                                           <option value="all">All</option>
                                                           <template v-for="option in reportParameter.selectBoxOptions">
                                                             <option v-bind:value="option.id">{{option.label}}</option>
                                                           </template>
                                                        </select>
                                                      </div>
                                                  </div>
                                                  <div class="uk-width-2-3@s uk-grid-margin"></div>
                                              </template>

                                          </template>

                                          <div style="display:none;" class="download_report_filter_form">
                                              <form method="POST" id="reportDownloadForm"  target="report_render_container" v-bind:action="'./reports/download-test-report/' + reportFormatToDownload">
                                                  <input type="text" id="filterQueryForReportDownload" name="reportFilterMapDataString"/>
                                              </form>
                                          </div>
                                          <div class="uk-margin uk-grid-margin uk-first-column">
                                              <div class="uk-inline">
                                                  <a tabindex="6" id="saveButton" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(2 119 254); border-radius: 2px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="generateReport()" >Generate Report</a>
                                                  &nbsp;&nbsp;&nbsp;
                                                  <a tabindex="6" id="saveButton2" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="display: inline-flex;;background-color: rgb(2 119 254); border-radius: 2px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;margin-top: 0px;" v-on:click="downloadReport($event)" >
                                                    <ui-icon name="download" size="width:15px;height:15px" uk-tooltip="title:Download Report;pos:bottom"/>
                                                    <span class="tab_label" style="margin-left:5px">Download Report</span>
                                                  </a>
                                                  <!--<a tabindex="7" class="clickable-btn uk-button uk-button-danger uk-button-small uk-first-column end-call-button" style="background-color: rgba(253, 253, 253, 0.99); color: rgb(111, 111, 111); border: 1px solid rgb(183, 183, 183); border-radius: 3px; place-self: center start; place-items: center; min-width: 100px; font-size: 0.65rem; line-height: 32px; font-weight: normal !important;" v-on:click="goBack()" >Exit</a>-->
                                              </div>
                                          </div>
                                      </form>


                                  </div>
                                </div>
                            </div>
                        </div>
                        <div xv-show="selectedTabKey==='report_display_tab'" class="custom-scroll-bar report_display_tab_container" style="position: absolute;inset: 0px;visibility:hidden;flex-grow: 1;overflow-y: hidden;padding: 10px;height: 100%;background: rgba(255, 255, 255, 0.7);box-sizing: border-box;margin-top: 10px;margin-bottom: 10px;">
                            <div class="task-communication" style="min-height:75px;height: 100%;">
                                <!--<label class="uk-form-label" style="font-size: 0.56rem;text-transform: uppercase;font-weight: bold;letter-spacing: 1px;text-decoration: underline;">Task Description</label>-->
                                <div style="padding-left: 0px;padding-top: 10px;padding-bottom: 25px;white-space: pre-line;height: 100%;">
                                  <iframe id="report_render_container" name="report_render_container" style="width: 100%;height: calc(100% + 40px);margin-top: -50px;box-sizing: border-box;"></iframe>
                                </div>
                            </div>
                        </div>
                      </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>

  </div>
</template>

<script>

import userMixinLib from './../../mixins/lib/user_mixin_lib';
import utilsMixinLib from './../../mixins/lib/utils_lib';
import uiListMixinLib from './../../mixins/lib/ui-list.js';
import { bus } from './../../../main.js';

export default {
  mixins: [
    userMixinLib,
    utilsMixinLib,
    uiListMixinLib
  ],
  props: ['id', 'assignees', 'loggedInUser'],
  data: function () {
    return {
        availableReportGroups: [],
        availableReports: {
          list: []
        },
        reportGroupName: "",
        isReportChosen: false,
        selectedReport: {},
        selectedReportParameters: [],
        embeddingViewName: "reportsGeneratorModule",
        selectedTabKey: "filters_tab",
        reportFilterReferenceLists: {
          emptyList: []
        },
        reportFilterData: {},
        filterArray: new Map(),
        isReportGenerated: false,
        reportFormatToDownload: "pdf"
    };
  },
  methods: {

    generateReport () {

      this.displayTab(null, 'report_display_tab');
      UIkit.switcher(document.getElementById(this.embeddingViewName + '_switcherTabs')).show(1);

          Array.from(document.querySelectorAll(".stringInput"))
               .forEach(reportInput => {

                   const id = reportInput.getAttribute("id");
                   const filterKey = reportInput.getAttribute("data-filter-key");
                   this.reportFilterData[filterKey] = reportInput.value;

                   this.filterArray.set(filterKey, {
                       filterKey: filterKey,
                       type: "single",
                       dataType: "string",
                       singleValue: reportInput.value
                   });

                   // form.dueDateTime = new Date(this.taskObject.dueDateTime).toISOString();
               });

           Array.from(document.querySelectorAll(".selectBoxInput"))
                .forEach(reportInput => {

                    const id = reportInput.getAttribute("id");
                    const filterKey = reportInput.getAttribute("data-filter-key");
                    this.reportFilterData[filterKey] = reportInput.value;

                    this.filterArray.set(filterKey, {
                        filterKey: filterKey,
                        type: "single",
                        dataType: "selectBox",
                        singleValue: reportInput.value
                    });

                    // form.dueDateTime = new Date(this.taskObject.dueDateTime).toISOString();
                });



           Array.from(document.querySelectorAll(".numberInput"))
                .forEach(reportInput => {

                    const id = reportInput.getAttribute("id");
                    const filterKey = reportInput.getAttribute("data-filter-key");
                    this.reportFilterData[filterKey] = reportInput.value;

                    this.filterArray.set(filterKey, {
                        filterKey: filterKey,
                        type: "number",
                        dataType: "number",
                        singleValue: reportInput.value
                    });

                    // form.dueDateTime = new Date(this.taskObject.dueDateTime).toISOString();
                });

           // Handle DateRange inputs
           Array.from(document.querySelectorAll(".dateTimeRange"))
                .forEach(dateTimeRangeContainer => {

                    const from = dateTimeRangeContainer.querySelector(".fromDateTime");
                    const to = dateTimeRangeContainer.querySelector(".toDateTime");
                    const filterKey = dateTimeRangeContainer.getAttribute("data-filter-key");
                    // this.reportFilterData[filterKey] = reportInput.value;

                    console.log("from.value = ", from.value);
                    console.log("to.value = ", to.value);

                    if (from.value !== undefined && to.value !== undefined && from.value !== "" && to.value !== "") {

                      this.filterArray.set(filterKey, {
                          filterKey: filterKey,
                          type: "range",
                          dataType: "LocalDateTime",
                          dateRangeValue: {
                            from: new Date(from.value).toISOString(),
                            to: new Date(to.value).toISOString()
                          }
                      });
                    }
                    // form.dueDateTime = new Date(this.taskObject.dueDateTime).toISOString();
                });



           const filters = [];
           this.filterArray.forEach((value, key, map) => {
             filters.push(value);
           });

           const filterDataJsonString = JSON.stringify(this.reportFilterData);

           const post_url = './reports/generate-test-report/';
           console.log('Saving new form-template-data to : ' + post_url);

           const form = {
             reportId: this.reportFilterData.id,
             reportName: this.reportFilterData.name,
             reportFileName: this.reportFilterData.reportFileName,
             filters: filters,
             clientTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
           };

           console.log('Data to be submitted is ', form);
           console.log("form : " + JSON.stringify(form));
           axios.post(process.env.VUE_APP_API_URL + post_url, form,
               {
                 responseType: 'blob',
                 headers: {
                     'Content-Type': 'application/json',
                     Accept: 'application/pdf'
                 }
               })
               .then((dataResponse) => {
                 console.log('FormTemplate attachment result : ', dataResponse);
                  const blob = new Blob([dataResponse.data], { type: dataResponse.headers['content-type'], title: "My Tasks" });
                  blob.name = "Yoyo";
                  const url = window.URL.createObjectURL(blob);
                  document.querySelector("#report_render_container").title = "My Tasks";
                  document.querySelector("#report_render_container").setAttribute("src", url);
                  this.isReportGenerated = true;
                  // window.open(url);
               })
               .catch(function (errorResponse) {
                 console.log('ERROR MS - ', errorResponse.response);
               });
    },
    downloadReport (event) {

      // this.displayTab(null, 'report_display_tab');
      // UIkit.switcher(document.getElementById(this.embeddingViewName + '_switcherTabs')).show(1);

      Array.from(document.querySelectorAll(".reportInput"))
           .forEach(reportInput => {

               const id = reportInput.getAttribute("id");
               const filterKey = reportInput.getAttribute("data-filter-key");
               this.reportFilterData[filterKey] = reportInput.value;

               // this.filterArray.set(filterKey, {
               //     filterKey: filterKey,
               //     type: "single",
               //     dataType: "string",
               //     singleValue: reportInput.value
               // });

           });

           const filters = [];
           this.filterArray.forEach((value, key, map) => {
             filters.push(value);
           });

           const form = {
             reportId: this.reportFilterData.id,
             reportName: this.reportFilterData.name,
             reportFileName: this.reportFilterData.reportFileName,
             filters: filters,
             clientTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
           };

           const filterDataJsonString = JSON.stringify(form);
           event.target.closest(".report_container").querySelector("#filterQueryForReportDownload").value = filterDataJsonString;
           event.target.closest(".report_container").querySelector("#reportDownloadForm").submit();

           // try {
           //   const url = '/chat-conversations/get/' + doc_id + '/download';
           //   var div = document.createElement('div');
           //   div.setAttribute('style', 'height:0px;display:none');
           //   document.body.appendChild(div);
           //   div.innerHTML = "<iframe width='0' height='0' scrolling='no' frameborder='0' src='" + url + "'></iframe>";
           // } catch (e) {
           //   alert(e);
           // }

    },
    async loadReferenceList (url, reportParameterFilterKey) {

      const response = await fetch(url);
      const responseJson = await response.json();
      // this.reportFilterReferenceLists.emptyList = responseJson.bean;
      // document.querySelector("#" + 'reference_list_' + reportParameterFilterKey);

      return new Promise((resolve, reject) => {
          try {
            resolve(responseJson.bean);
          }
          catch (error) {
            console.error('Unpaginated List data fetch error : ', error);
            reject(error);
          }
      });

    },
    updateReferenceId (data, key) {

        if (data != null) {
          this.reportFilterData[key] = data.id;

          this.filterArray.set(key, {
              filterKey: key,
              type: "single",
              dataType: "referenceId",
              singleValue: data.id
          });
        }
        else {
          this.reportFilterData[key] = null;
          this.filterArray.delete(key);
        }


    },
    updateReferenceIds (data, key) {

        if (data != null) {

          this.reportFilterData[key] = Array.from(data).map(item => item.id);

          this.filterArray.set(key, {
              filterKey: key,
              type: "multiple",
              dataType: "referenceId",
              listValue: Array.from(data).map(item => item.id)
          });
        }
        else {
          this.reportFilterData[key] = null;
          this.filterArray.delete(key);
        }


    },

    displayTab (e, tabKey) {
      // e.preventDefault();
      this.selectedTabKey = tabKey;


      if (tabKey === 'report_display_tab') {

        // this.isReportGenerated = true;
        document.querySelector(".report_display_tab_container").style.visibility = "visible";
        document.querySelector(".filters_tab_container").style.visibility = "hidden";
      }
      else {
        // this.isReportGenerated = false;
        document.querySelector(".report_display_tab_container").style.visibility = "hidden";
        document.querySelector(".filters_tab_container").style.visibility = "visible";
      }


      // Reset all active tabs
      Array.from(document.querySelectorAll('#' + this.embeddingViewName + '_switcherTabs > li'))
           .forEach(item => item.classList.remove("uk-active"));

      if (e !== null)
      {
        e.target.classList.add("uk-active");
      }
      else if (e === null && this.selectedTabKey !== null) {

        document.querySelector('#' + this.embeddingViewName + '_switcherTabs > li.' + this.selectedTabKey)
                .classList.add("uk-active");
      }
      else
      {
        console.log("No active tab, so making the first one active");
        (Array.from(document.querySelectorAll('#' + this.embeddingViewName + '_switcherTabs > li'))[0]).classList.add("uk-active");
      }

      // alert("Going to activity Tab");
      // UIkit.switcher(document.getElementById(this.embeddingViewName + '_switcherTabs')).show(6);
    },
    async getAllReportGroups () {
      const url = "./report-groups/list/all/1";
      const response = await fetch(url);
      const responseJson = await response.json();
      this.availableReportGroups = responseJson;

      setTimeout(() => {
        if (this.availableReportGroups.length > 0) {
          this.loadReportsForReportGroup(this.availableReportGroups[0]);
        }
      }, 500);
    },
    async loadReportsForReportGroup (reportGroup) {

      document.querySelectorAll('.report-group-list > .menu-item').forEach((el) => {
        el.classList.remove('uk-active');
        el.classList.remove('selected-menu');
      });
      document.querySelector('#' + 'report_group_' + reportGroup.id).classList.add('uk-active');
      document.querySelector('#' + 'report_group_' + reportGroup.id).classList.add('selected-menu');

      this.reportGroupName = reportGroup.name;

      setTimeout(() => {
        document.querySelector("#reportslist_loading_spinner").classList.remove('hide_reveal');
        document.querySelector("#reportslist_loading_spinner").style.display = "flex";
        // document.querySelector("#tasklist").classList.add("hide_reveal");
      }, 500);

      const url = "./reports/list/by-report-group/" + reportGroup.id;
      const response = await fetch(url);
      const responseJson = await response.json();
      this.availableReports = {
        list: responseJson
      };



      setTimeout(() => {
        document.querySelector("#reportslist_loading_spinner").classList.add('hide_reveal');
        document.querySelector("#reportslist_loading_spinner").style.display = "none";
        // document.querySelector("#tasklist").classList.remove("hide_reveal");


        Array.from(document.querySelectorAll(".elastic_scroll_container"))
             .forEach(scrollContainer => {
                  scrollContainer.addEventListener('scroll', (event) => this.handleScroll(event));
             });
      }, 500);
    },
    loadReportFilters (selectedReport, index) {

      document.querySelector(".filters_tab_container").classList.add("fade_out");

      setTimeout(() => {
        this.isReportChosen = true;
        this.selectedReport = selectedReport;
        this.selectedReportParameters = [];
        this.isReportGenerated = false;
        this.displayTab(null, 'filters_tab');
        this.filterArray = new Map();

        this.reportFilterData["id"] = selectedReport["id"];
        this.reportFilterData["name"] = selectedReport["name"];
        this.reportFilterData["reportFileName"] = selectedReport["reportFileName"];

        document.querySelectorAll('.active').forEach(item => item.classList.remove('active'));
        document.querySelector('#' + 'report_' + selectedReport.id).classList.add('active');

        const selectedReportParametersString = selectedReport.reportParametersJson;
        console.log("selectedReportParametersString = ", selectedReportParametersString);
        const selectedReportParameters = JSON.parse(selectedReportParametersString);

        // load report filter parameters.
        selectedReportParameters.forEach(async (reportParameter) => {

            console.log("reportParameter", reportParameter);

            if (reportParameter.dataType === "referenceId") {

                const list = await this.loadReferenceList(reportParameter.referencedEntityURL);
                console.log("list : ", list);
                reportParameter.list = list;

                reportParameter.tagProperty = reportParameter.referencedEntitiesDisplayLabels[0];
                reportParameter.displayProperties = reportParameter.referencedEntitiesDisplayLabels.join(",");
                console.log("\t\treportParameter.tagProperty", reportParameter.tagProperty);
                console.log("\t\treportParameter.displayProperties", reportParameter.displayProperties);
            }

            this.selectedReportParameters.push(reportParameter);
        });

        // this.selectedReportParameters = selectedReportParameters;
        setTimeout(() => {
          document.querySelector(".filters_tab_container").style.transition = "0.25s linear";
          document.querySelector(".filters_tab_container").classList.remove("fade_out");
        }, 250);
      }, 250);
    }
  },
  created: function () {},
  computed: {
    storeCounter: function () {
      // console.log('Accessing vuex store ', this.$store)
      // console.log('Store data accessed from home page : ' + this.$store.getters.count)
      return this.$store.getters.count;
    }
  },
  mounted: function () {
    this.getAllReportGroups();
  },
  watch: {

  }
};

</script>

<style style="scoped">

  .filters_tab_container{
  }

  .fade_out{
    opacity: 0;
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

  .report-tab-bar {
    padding: 10px 5px 5px;
    color: rgb(51, 51, 51);
    background: white;
    height: 35px;
    margin: 0px;

    padding: 10px 5px 5px;
    color: rgb(51, 51, 51);
    background: rgb(255, 255, 255, 0.88);
    height: 35px;
    margin: 0px;
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 4px;
    border: 1px solid #d0d0d0;
    z-index: 0;
  }

  .report-tab-bar > li > a {
      display: flex;
      -moz-column-gap: 10px;
      column-gap: 10px;
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

  .list-row.active {
    /* border-left: 5px solid #1f69bd;
    border-left: 5px solid rgb(37, 139, 255); */
    background: #f0f7ff;
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

</style>
