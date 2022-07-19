<template>
<div class="" style="background:rgb(255, 255, 255, 0);overflow-y:hidden;display: flex;flex-grow: 1;">
    <div class="task_details_container task_view_container">

        <div class="task_view_header">

            <div v-show="showNewSubTaskForm" style="align-self: center;background: transparent;color: white;margin-left: 10px;padding-right:0px;border-radius: 3px;">
                <div class="tab-bar" style="display: flex;column-gap: 12px;background: transparent;height: auto;border-bottom: none;">
                    <button v-bind:uk-tooltip="'Go back to Parent Task - ' + parentTaskName" v-on:click="exitNewSubTaskView()" class="uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button subtask-back-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                            <path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"></path>
                        </svg></button>
                    <div href="#" style="display: flex;column-gap: 10px;font-size: 0.65rem;text-transform: uppercase;place-self: center start;place-items: center;color: white;background: #6eb2ff;padding: 10px;border-radius: 3px;">
                        <span class="tab_icon">
                            <ui-icon name="subtask" size="width:15px;height:15px" /></span><span class="tab_label">New <b>Sub Task</b> for</span>
                    </div>
                </div>
                <div style="text-align: center;padding: 10px 20px 5px 20px;color: rgb(37, 139, 255);place-self: center;">
                    <div style="font-size: .55rem;text-transform: uppercase;font-weight: bold;"> Task </div>
                </div>
            </div>
            <div v-show="viewSubTask" style="align-self: center;background: transparent;color: white;margin-left: 10px;padding-right:0px;border-radius: 3px;">
                <div class="tab-bar" style="display: flex;column-gap: 12px;background: transparent;height: auto;border-bottom: none;">
                    <button v-bind:uk-tooltip="'Go back to Parent Task - ' + parentTaskName" v-on:click="exitSubTaskView()" class="uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button subtask-back-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                            <path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"></path>
                        </svg></button>
                    <div href="#" style="display: flex;column-gap: 10px;font-size: 0.65rem;text-transform: uppercase;place-self: center start;place-items: center;color: white;background: #6eb2ff;padding: 10px;border-radius: 3px;">
                        <span class="tab_icon">
                            <ui-icon name="subtask" size="width:15px;height:15px" /></span><span class="tab_label">Sub Task</span>
                    </div>
                </div>
                <div style="text-align: center;padding: 10px 20px 5px 20px;color: rgb(37, 139, 255);place-self: center;">
                    <div style="font-size: 0.85rem;text-transform: uppercase;font-weight: bold;color: #258bfe;letter-spacing: 1px;"> Task </div>
                    <div> #{{taskObject.sno}}</div>
                </div>

            </div>
            <div v-show="!showNewSubTaskForm && !viewSubTask" style="align-self: center;background: transparent;color: white;margin-left: 10px;padding-right:0px;border-radius: 3px;">
                <div style="text-align: center;padding: 10px 10px 5px 10px;color: rgb(37, 139, 255);place-self: center;">
                    <div style="display:flex;align-items:center;justify-content:center;flex-direction: row;min-width: 80px;">
                        <img v-bind:data-img-id="taskObject.createdById" class="uk-border-pill ui-navbar-profile-image" v-bind:src="'/api/us/profile/get/' + taskObject.createdById" onerror="this.onerror=null;this.src='resources/images/male_default_pic.png';" width="25" height="25" xstyle="border: 2px solid rgb(220, 220, 220);margin-left: 0px;height:100px;width:100px;" style="border: 0px solid rgb(227 227 227);margin-left: 0px;height: 80px;width: 80px;padding: 2px;background: #2020202e;">
                    </div>
                </div>
            </div>

            <div v-show="!showNewSubTaskForm" style="display: flex;flex-direction: column;padding: 5px 0px;margin: 5px 0px;height: fit-content;row-gap: 5px;width: 100%;box-sizing: border-box;padding-top: 10px;">

                <div style="display:flex;width: 100%;position:relative">
                    <div style="flex-grow: 1;display: flex;gap: 5px;flex-direction: column;justify-content: center;">
                        <div style="color: rgb(129, 129, 129);font-weight: bold;font-size: 0.50rem;border-radius: 2px;letter-spacing: 1px;display: flex;align-items: center;">
                            <div style="color: rgb(127, 126, 126);color:rgb(126 126 126);font-weight: normal;font-size: 0.5rem;text-transform: uppercase;letter-spacing: 1px;padding: 0px 0px;font-size: 0.75rem;text-transform: capitalize;font-weight: bold;color: #258bfe;color:rgb(112 112 112);letter-spacing: 1px;">Client Id # 14321 </div>
                            <div style="padding-left:10px;">
                                <div v-if="taskObject.priority!==null && taskObject.dueDateTimeFormatted !==null && taskObject.dueDateTimeFormatted !== undefined && taskObject.priority === 'Critical'" class="task-created-date critical" style="align-items: center;display: flex;overflow: hidden;text-transform: none;white-space: pre;border: 0px solid rgb(239, 239, 239);padding: 2px 10px;border-radius: 20px;background-color: rgba(233, 30, 99, 0.4);color: white;column-gap: 5px;" v-bind:title="taskObject.priority + ' priority, with Due Date - ' + taskObject.dueDateTimeFormatted">
                                    <div>
                                        <svg width="24" height="24" viewBox="0 0 24 24" style="width: 15px;height: 15px;">
                                            <g id="Time_log" data-name="Time log" transform="translate(-11081 2057)">
                                                <g id="Group_1440" data-name="Group 1440" transform="translate(10790.593 -2543.509)">
                                                    <g id="Group_387" data-name="Group 387" transform="translate(292.408 489.509)">
                                                        <g id="Layer_1" data-name="Layer 1">
                                                            <g id="Group_386" data-name="Group 386">
                                                                <path id="Path_243" data-name="Path 243" d="M310.93,494.979a.412.412,0,0,0-.372-.237h-1.212a8.995,8.995,0,1,0-1.054,6.138.818.818,0,1,0-1.416-.819,7.37,7.37,0,1,1,.8-5.32h-1.2a.409.409,0,0,0-.314.672l2.046,2.455a.408.408,0,0,0,.628,0l2.046-2.455A.411.411,0,0,0,310.93,494.979Z" transform="translate(-291.498 -487.379)" fill="currentColor"></path>
                                                                <path id="Path_244" data-name="Path 244" d="M297.921,488.728a.818.818,0,0,0-.819.819v4.963a1.431,1.431,0,0,0,.819,2.605,1.41,1.41,0,0,0,.6-.138l2.846,1.642a.818.818,0,1,0,.817-1.416l-2.848-1.645a1.428,1.428,0,0,0-.6-1.046v-4.965A.82.82,0,0,0,297.921,488.728Zm0,7.568a.613.613,0,1,1,.613-.614A.615.615,0,0,1,297.921,496.3Z" transform="translate(-288.92 -486.682)" fill="currentColor"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                                <rect id="Rectangle_1450" data-name="Rectangle 1450" width="24" height="24" transform="translate(11081 -2057)" fill="none"></rect>
                                            </g>
                                        </svg>
                                    </div>
                                    <div style="display: flex;align-items: center;padding-top: 2px;">
                                        {{taskObject.dueDateTimeFormatted}}
                                    </div>
                                </div>
                                <div v-else-if="taskObject.priority!==null && taskObject.dueDateTimeFormatted !==null && taskObject.dueDateTimeFormatted !== undefined && !taskObject.isRecent && taskObject.priority === 'High'" class="task-created-date" style="align-items: center;display: flex;overflow: hidden;text-transform: none;white-space: pre;border: 0px solid rgb(239, 239, 239);padding: 2px 10px;border-radius: 20px;background-color: orange;color: white;column-gap: 5px;" v-bind:title="taskObject.priority + ' priority, with Due Date - ' + taskObject.dueDateTimeFormatted">

                                    <div>
                                        <svg width="24" height="24" viewBox="0 0 24 24" style="width: 15px;height: 15px;">
                                            <g id="Time_log" data-name="Time log" transform="translate(-11081 2057)">
                                                <g id="Group_1440" data-name="Group 1440" transform="translate(10790.593 -2543.509)">
                                                    <g id="Group_387" data-name="Group 387" transform="translate(292.408 489.509)">
                                                        <g id="Layer_1" data-name="Layer 1">
                                                            <g id="Group_386" data-name="Group 386">
                                                                <path id="Path_243" data-name="Path 243" d="M310.93,494.979a.412.412,0,0,0-.372-.237h-1.212a8.995,8.995,0,1,0-1.054,6.138.818.818,0,1,0-1.416-.819,7.37,7.37,0,1,1,.8-5.32h-1.2a.409.409,0,0,0-.314.672l2.046,2.455a.408.408,0,0,0,.628,0l2.046-2.455A.411.411,0,0,0,310.93,494.979Z" transform="translate(-291.498 -487.379)" fill="currentColor"></path>
                                                                <path id="Path_244" data-name="Path 244" d="M297.921,488.728a.818.818,0,0,0-.819.819v4.963a1.431,1.431,0,0,0,.819,2.605,1.41,1.41,0,0,0,.6-.138l2.846,1.642a.818.818,0,1,0,.817-1.416l-2.848-1.645a1.428,1.428,0,0,0-.6-1.046v-4.965A.82.82,0,0,0,297.921,488.728Zm0,7.568a.613.613,0,1,1,.613-.614A.615.615,0,0,1,297.921,496.3Z" transform="translate(-288.92 -486.682)" fill="currentColor"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                                <rect id="Rectangle_1450" data-name="Rectangle 1450" width="24" height="24" transform="translate(11081 -2057)" fill="none"></rect>
                                            </g>
                                        </svg>
                                    </div>
                                    <div style="display: flex;align-items: center;padding-top: 2px;">
                                        {{taskObject.dueDateTimeFormatted}}
                                    </div>
                                </div>
                                <div v-else-if="taskObject.priority!==null && taskObject.dueDateTimeFormatted !==null && taskObject.dueDateTimeFormatted !== undefined && !taskObject.isRecent && taskObject.priority === 'Medium'" class="task-created-date" style="align-items: center;display: flex;overflow: hidden;text-transform: none;white-space: pre;border: 0px solid rgb(239, 239, 239);padding: 2px 10px;border-radius: 20px;background-color: skyblue;color: white;column-gap: 5px;" v-bind:title="taskObject.priority + ' priority, with Due Date - ' + taskObject.dueDateTimeFormatted">
                                    <div>
                                        <svg width="24" height="24" viewBox="0 0 24 24" style="width: 15px;height: 15px;">
                                            <g id="Time_log" data-name="Time log" transform="translate(-11081 2057)">
                                                <g id="Group_1440" data-name="Group 1440" transform="translate(10790.593 -2543.509)">
                                                    <g id="Group_387" data-name="Group 387" transform="translate(292.408 489.509)">
                                                        <g id="Layer_1" data-name="Layer 1">
                                                            <g id="Group_386" data-name="Group 386">
                                                                <path id="Path_243" data-name="Path 243" d="M310.93,494.979a.412.412,0,0,0-.372-.237h-1.212a8.995,8.995,0,1,0-1.054,6.138.818.818,0,1,0-1.416-.819,7.37,7.37,0,1,1,.8-5.32h-1.2a.409.409,0,0,0-.314.672l2.046,2.455a.408.408,0,0,0,.628,0l2.046-2.455A.411.411,0,0,0,310.93,494.979Z" transform="translate(-291.498 -487.379)" fill="currentColor"></path>
                                                                <path id="Path_244" data-name="Path 244" d="M297.921,488.728a.818.818,0,0,0-.819.819v4.963a1.431,1.431,0,0,0,.819,2.605,1.41,1.41,0,0,0,.6-.138l2.846,1.642a.818.818,0,1,0,.817-1.416l-2.848-1.645a1.428,1.428,0,0,0-.6-1.046v-4.965A.82.82,0,0,0,297.921,488.728Zm0,7.568a.613.613,0,1,1,.613-.614A.615.615,0,0,1,297.921,496.3Z" transform="translate(-288.92 -486.682)" fill="currentColor"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                                <rect id="Rectangle_1450" data-name="Rectangle 1450" width="24" height="24" transform="translate(11081 -2057)" fill="none"></rect>
                                            </g>
                                        </svg>
                                    </div>
                                    <div style="display: flex;align-items: center;padding-top: 2px;">
                                        {{taskObject.dueDateTimeFormatted}}
                                    </div>
                                </div>
                                <div v-else-if="taskObject.priority!==null && taskObject.dueDateTimeFormatted !==null && taskObject.dueDateTimeFormatted !== undefined && !taskObject.isRecent && taskObject.priority === 'Low'" class="task-created-date" style="align-items: center;display: flex;overflow: hidden;text-transform: none;white-space: pre;border: 0px solid rgb(239, 239, 239);padding: 2px 10px;border-radius: 20px;background-color: green;color: white;column-gap: 5px;" v-bind:title="taskObject.priority + ' priority, with Due Date - ' + taskObject.dueDateTimeFormatted">
                                    <div>
                                        <svg width="24" height="24" viewBox="0 0 24 24" style="width: 15px;height: 15px;">
                                            <g id="Time_log" data-name="Time log" transform="translate(-11081 2057)">
                                                <g id="Group_1440" data-name="Group 1440" transform="translate(10790.593 -2543.509)">
                                                    <g id="Group_387" data-name="Group 387" transform="translate(292.408 489.509)">
                                                        <g id="Layer_1" data-name="Layer 1">
                                                            <g id="Group_386" data-name="Group 386">
                                                                <path id="Path_243" data-name="Path 243" d="M310.93,494.979a.412.412,0,0,0-.372-.237h-1.212a8.995,8.995,0,1,0-1.054,6.138.818.818,0,1,0-1.416-.819,7.37,7.37,0,1,1,.8-5.32h-1.2a.409.409,0,0,0-.314.672l2.046,2.455a.408.408,0,0,0,.628,0l2.046-2.455A.411.411,0,0,0,310.93,494.979Z" transform="translate(-291.498 -487.379)" fill="currentColor"></path>
                                                                <path id="Path_244" data-name="Path 244" d="M297.921,488.728a.818.818,0,0,0-.819.819v4.963a1.431,1.431,0,0,0,.819,2.605,1.41,1.41,0,0,0,.6-.138l2.846,1.642a.818.818,0,1,0,.817-1.416l-2.848-1.645a1.428,1.428,0,0,0-.6-1.046v-4.965A.82.82,0,0,0,297.921,488.728Zm0,7.568a.613.613,0,1,1,.613-.614A.615.615,0,0,1,297.921,496.3Z" transform="translate(-288.92 -486.682)" fill="currentColor"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                                <rect id="Rectangle_1450" data-name="Rectangle 1450" width="24" height="24" transform="translate(11081 -2057)" fill="none"></rect>
                                            </g>
                                        </svg>
                                    </div>
                                    <div style="display: flex;align-items: center;padding-top: 2px;">
                                        {{taskObject.dueDateTimeFormatted}}
                                    </div>
                                </div>
                                <div v-else-if="taskObject.dueDateTimeFormatted !==null && taskObject.dueDateTimeFormatted !== undefined " class="task-created-date" style="align-items: center;display: flex;overflow: hidden;text-transform: none;white-space: pre;border: 0px solid rgb(239, 239, 239);padding: 2px 10px;border-radius: 20px;column-gap: 5px;;background-color:#f0f0f0;color: #918e8e" v-bind:title="taskObject.priority + ' priority, with Due Date - ' + taskObject.dueDateTimeFormatted">
                                    <div>
                                        <svg width="24" height="24" viewBox="0 0 24 24" style="width: 15px;height: 15px;">
                                            <g id="Time_log" data-name="Time log" transform="translate(-11081 2057)">
                                                <g id="Group_1440" data-name="Group 1440" transform="translate(10790.593 -2543.509)">
                                                    <g id="Group_387" data-name="Group 387" transform="translate(292.408 489.509)">
                                                        <g id="Layer_1" data-name="Layer 1">
                                                            <g id="Group_386" data-name="Group 386">
                                                                <path id="Path_243" data-name="Path 243" d="M310.93,494.979a.412.412,0,0,0-.372-.237h-1.212a8.995,8.995,0,1,0-1.054,6.138.818.818,0,1,0-1.416-.819,7.37,7.37,0,1,1,.8-5.32h-1.2a.409.409,0,0,0-.314.672l2.046,2.455a.408.408,0,0,0,.628,0l2.046-2.455A.411.411,0,0,0,310.93,494.979Z" transform="translate(-291.498 -487.379)" fill="currentColor"></path>
                                                                <path id="Path_244" data-name="Path 244" d="M297.921,488.728a.818.818,0,0,0-.819.819v4.963a1.431,1.431,0,0,0,.819,2.605,1.41,1.41,0,0,0,.6-.138l2.846,1.642a.818.818,0,1,0,.817-1.416l-2.848-1.645a1.428,1.428,0,0,0-.6-1.046v-4.965A.82.82,0,0,0,297.921,488.728Zm0,7.568a.613.613,0,1,1,.613-.614A.615.615,0,0,1,297.921,496.3Z" transform="translate(-288.92 -486.682)" fill="currentColor"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                                <rect id="Rectangle_1450" data-name="Rectangle 1450" width="24" height="24" transform="translate(11081 -2057)" fill="none"></rect>
                                            </g>
                                        </svg>
                                    </div>
                                    <div style="display: flex;align-items: center;padding-top: 2px;">
                                        {{taskObject.dueDateTimeFormatted}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex;gap: 5px;flex-direction: column;justify-content: flex-start;align-items: flex-end;padding-right: 20px;position: absolute;right: 10px;z-index:10">
                        <div style="padding-top:10px">
                            <div style="display: flex;gap: 10px;width: 100%;">
                                <div>
                                    <span style="user-select: none;" uk-tooltip="Click to edit this task's basic info" v-show="!showTaskInfoContainer" class="uk-button updateTaskInfoTrigger" uk-icon="icon:pencil;ratio:0.85" v-on:click="showTaskInfoContainerDiv()"></span>
                                    <span style="user-select: none;" uk-tooltip="Click to close this task" v-show="showTaskInfoContainer" class="uk-button updateTaskInfoTrigger" uk-icon="icon:chevron-up;ratio:0.85" v-on:click="hideTaskInfoContainer()"></span>
                                </div>
                                <div>
                                    <span style="user-select: none;" uk-tooltip="Click to expand this task window" v-show="!isTaskInfoContainerExpanded" class="uk-button updateTaskInfoTrigger" uk-icon="icon:expand;ratio:0.85" v-on:click="expandOrShrinkTaskInfoContainer()"></span>
                                    <span style="user-select: none;" uk-tooltip="Click to shrink this task window" v-show="isTaskInfoContainerExpanded" class="uk-button updateTaskInfoTrigger" uk-icon="icon:shrink;ratio:0.85" v-on:click="expandOrShrinkTaskInfoContainer()"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="task_title">{{item.firstName}} {{item.lastName}}</div>
                <div style="display:flex;width: 100%;padding-top: 5px;">
                    <div style="flex-grow: 3;display: flex;gap: 20px;flex-direction: row;">
                        <div style="color: rgb(129, 129, 129);font-weight: bold;font-size: 0.5rem;border-radius: 2px;letter-spacing: 1px;display: flex;align-items: center;border: 1px solid #e1e1e1;background-color: rgb(233, 233, 233);">
                            <div style="font-weight: normal;font-size: 0.56rem;text-transform: uppercase;letter-spacing: 1px;padding: 3px 5px 3px 10px;color: #6a6a6a;border-top-left-radius: 3px;border-bottom-left-radius:3px;background-color:rgb(233 233 233)">Category</div>
                            <div>
                                <div style="font-weight: normal;font-size: 0.6rem;text-transform: capitalize;letter-spacing: 1px;padding: 3px 5px;background: rgb(239 239 239);color: #2196f3;;border-top-right-radius: 3px;border-bottom-right-radius:3px;" v-if="taskObject.category!==null && taskObject.category!==undefined">
                                    <span> {{myOrgName}} </span>
                                </div>
                            </div>
                        </div>
                        <div style="color: rgb(129, 129, 129);font-weight: bold;font-size: 0.5rem;border-radius: 2px;letter-spacing: 1px;display: flex;align-items: center;border: 1px solid #e1e1e1;background-color: rgb(233, 233, 233);">
                            <div style="font-weight: normal;font-size: 0.56rem;text-transform: uppercase;letter-spacing: 1px;padding: 3px 5px 3px 10px;color: #6a6a6a;border-top-left-radius: 3px;border-bottom-left-radius:3px;background-color:rgb(233 233 233)">Stage</div>
                            <div>
                                <div v-if="taskObject.stageName!==null && taskObject.stageName!==undefined" style="font-weight: normal;font-size: 0.6rem;text-transform: capitalize;letter-spacing: 1px;padding: 3px 5px;background: rgb(239 239 239);color: #2196f3;;border-top-right-radius: 3px;border-bottom-right-radius:3px;"> {{taskObject.stageName}} </div>
                            </div>
                        </div>
                        <div style="color: rgb(129, 129, 129);font-weight: bold;font-size: 0.5rem;border-radius: 2px;letter-spacing: 1px;display: flex;align-items: center;border: 1px solid #e1e1e1;background-color: rgb(233, 233, 233);">
                            <div style="font-weight: normal;font-size: 0.56rem;text-transform: uppercase;letter-spacing: 1px;padding: 3px 5px 3px 10px;color: #6a6a6a;border-top-left-radius: 3px;border-bottom-left-radius:3px;background-color:rgb(233 233 233)">Assignee</div>
                            <div>
                                <div style="font-weight: normal;font-size: 0.6rem;text-transform: capitalize;letter-spacing: 1px;padding: 3px 5px;background: rgb(239 239 239);color: #2196f3;;border-top-right-radius: 3px;border-bottom-right-radius:3px;"> {{taskObject.assigneesString}} </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Client Edit -->
        <div v-show="showTaskInfoContainer" style="position:relative" class="task-info-container">
            <div class="first_column_scrollable custom-scroll-bar" style="font-size: 0.7rem;position: absolute;left: 35px;right: 35px;top: -1px;opacity: 1;z-index: 100;background: linear-gradient(rgb(254 254 254), rgb(255, 255, 255));border-width: 0px 1px 1px;border-top-style: initial;border-right-style: solid;border-bottom-style: solid;border-left-style: solid;border-top-color: initial;border-right-color: rgb(226, 226, 226);border-bottom-color: rgb(226, 226, 226);border-left-color: rgb(226, 226, 226);border-image: initial;box-shadow: rgba(0, 0, 0, 0.12) 0px 15px 12px 0px;border-radius: 0px 0px 5px 5px;">
                <client-info-tab v-bind:taskInfo="taskObject" v-bind:item="item" />
            </div>
        </div>
        <div v-show="!showNewSubTaskForm" style="display: grid;grid-template-rows: auto 1fr;display: flex;flex-direction: column;flex-grow: 1;overflow-y: hidden;">
            <ul v-bind:id="embeddingViewName + '_switcherTabs'" class="uk-subnav uk-subnav-pill tab-bar" xuk-switcher style="gap: 10px;user-select: none;align-items: center;justify-content: flex-start;column-gap: 30px;">
                <li v-on:click="displayTab($event, 'activity')" class="activity" uk-tooltip="title:Activities;pos:bottom">
                    <a style="pointer-events: none;user-select: none;align-items: center;justify-content: center;">
                        <span class="tab_icon" style="display: flex;column-gap: 5px;align-items: center;position:relative">
                            <ui-icon name="checklist" size="width:15px;height:15px" />
                        </span>
                        <span class="tab_label">Activity</span>
                    </a>
                </li>
                <li v-on:click="displayTab($event, 'Information')" class="information" uk-tooltip="title:Information;pos:bottom">
                    <a style="pointer-events: none;user-select: none;align-items: center;justify-content: center;">
                        <span class="tab_icon" style="display: flex;column-gap: 5px;align-items: center;position:relative">
                            <ui-icon name="activity" size="width:15px;height:15px" />
                        </span>
                        <span class="tab_label">Information</span>
                    </a>
                </li>
                <li v-on:click="displayTab($event, 'organization')" class="organization" uk-tooltip="title:Organization;pos:bottom">
                    <a style="pointer-events: none;user-select: none;align-items: center;justify-content: center;position:relative">
                        <span v-show="taskObject.subTasksCount>0" style="position: absolute;right: -10px;top: -5px;background: rgb(241 241 241);color: #868686;border-radius: 15px;text-align: center;padding: 1px 2px;min-width: 20px;font-size: 0.45rem;">{{taskObject.subTasksCount}}</span>
                        <span class="tab_icon" style="display: flex;column-gap: 5px;align-items: center;position:relative">
                            <ui-icon name="subtask" size="width:15px;height:15px" />
                        </span>
                        <span class="tab_label">Organization </span>
                    </a>
                </li>
                <li v-on:click="displayTab($event, 'reminders')" class="reminders" uk-tooltip="title:Reminders;pos:bottom">
                    <a style="pointer-events: none;user-select: none;align-items: center;justify-content: center;position:relative">
                        <span v-show="taskObject.remindersCount!==undefined && taskObject.remindersCount!==null && taskObject.remindersCount>0" style="position: absolute;right: -10px;top: -5px;background: rgb(241 241 241);color: #868686;border-radius: 15px;text-align: center;padding: 1px 2px;min-width: 20px;font-size: 0.45rem;">{{taskObject.remindersCount}}</span>
                        <span class="tab_icon" style="display: flex;column-gap: 5px;align-items: center;position:relative">
                            <ui-icon name="reminder" size="width:14px;height:14px" />
                        </span>
                        <span class="tab_label">Reminders</span>
                    </a>
                </li>
            </ul>

            <div v-bind:id="embeddingViewName + '_switcherTabsContent'" class="xuk-switcher xuk-switcher-component" style="margin-top: 0px;font-size: 0.7rem;padding:5px 10px;overflow-y: hidden;display: flex;flex-grow: 1;background: rgb(255, 255, 255, 0);touch-action: pan-y pinch-zoom;box-sizing: border-box; min-height: 40rem">

                <!-- CONTACT -->
                <div v-show="selectedTabKey==='Contact'" class="custom-scroll-bar" style="flex-grow: 1;overflow-y: scroll;position: relative;padding: 15px;height: 100%;background: transparent; xbackground:rgba(255, 255, 255, 0.7);box-sizing: border-box;margin-bottom: 10px;">
                    <div class="task-communication" style="min-height:75px">
                        <clients-contacts v-bind:organizationId="item.id" v-bind:categoryId="item.categoryId" />
                    </div>
                </div>

                <div v-show="selectedTabKey==='about'" style=";flex-grow: 1;overflow-y: hidden;position: relative;;height: 100%;background: white;">
                    <div class="task-communication" style="min-height:75px">
                        <clients-about />
                    </div>
                </div>

                <div v-show="selectedTabKey==='activity'" style=";flex-grow: 1;overflow-y: hidden; position: relative;">
                    <people-activity-tab v-bind:embeddingComponentName="embeddingViewName" v-bind:uniqueComponentId=" uniqueComponentId + '_activity_tab'" v-bind:id="taskObject.id" v-bind:taskInfo="taskObject" v-bind:loggedInUser="loggedInUser" />
                </div>

                <div v-show="selectedTabKey==='Information'" style=";flex-grow: 1;overflow-y: hidden; position: relative;">
                    <people-information v-bind:item="item" />
                </div>

                <div v-show="selectedTabKey==='organization'" style=";flex-grow: 1;overflow-y: hidden; position: relative;">
                    <people-organization v-bind:myOrganizationDetail="myOrganizationDetail" />
                </div>

                <div v-show="selectedTabKey === 'reminders'" style="display: flex;flex-direction: column;flex-grow: 1;overflow-y: hidden; position: relative;height: 100%;;background: #ffffffa1;">
                    <people-view-remainders v-bind:isRemindersTabInitialized="isRemindersTabInitialized" v-bind:openAddReminderModal="openAddReminderModal" v-bind:loadPotentialMembersForReminders="loadPotentialMembersForReminders" v-bind:reminderList="reminderList" v-bind:cancelReminderItem="cancelReminderItem" />
                </div>
            </div>
        </div>

        <div v-show="showNewSubTaskForm" style="overflow-y: hidden;display: grid;grid-template-rows: auto 1fr;">

            <div style="overflow-y: hidden;display: grid;">
                <new-subtask-form v-bind:parentTaskId="id" v-bind:resetTime="resetTime" />
            </div>
        </div>

    </div>

    <!-- Add Remainder Modal  -->
    <div v-bind:id="uniqueComponentId + '_add_reminder_modal'" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="width: 60%;font-size: 0.65rem;padding: 35px;border-radius: 5px;">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <form style=";padding-bottom: 50px;width: 100%;place-self: center" onsubmit="console.log('Submitted.');return false;">

                <div style="display: flex;padding: 5px 0px;column-gap: 30px;;margin-right:15px;margin-left:15px;">
                    <div style="flex:1">
                        <label class="uk-form-label">Title</label>
                        <input type="text" v-model="reminderItem.title" class="uk-input" placeholder="Reminder Title" style="border-radius:3px" />
                    </div>
                </div>
                <div style="display: flex;padding: 5px 0px;column-gap: 30px;;margin-right:15px;margin-left:15px;">

                    <div style="height: 70px;flex:1">
                        <label class="uk-form-label">Reminder for</label>
                        <div class="uk-form-controls">
                            <ui-selectbox v-bind:availableItems="availableMembers" name="ReminderMembers" tagProperty="firstName" displayLabelProps="firstName,lastName" maxTagsToDisplay="4" searchProperty="firstName,lastName" data_tabindex="3" v-on:selectBoxUpdate="updateReminderReceiversEmitEvent($event)" />
                        </div>
                    </div>
                    <div style="flex:1">
                        <label class="uk-form-label" for="form-stacked-text">Type </label>
                        <div style="position:relative">
                            <select v-model="reminderItem.type" class="uk-select" tabindex="4">
                                <option>Email</option>
                                <option>App Notification</option>
                            </select>
                            <div style="position:absolute;right: 7px;top: 9px;pointer-events: none;"><span class="uk-icon" uk-icon="triangle-down"></span></div>
                        </div>
                    </div>
                    <div style="flex:1">
                        <label class="uk-form-label">Reminder Date/Time</label>
                        <input type="datetime-local" v-model="reminderItem.dateTime" class="uk-input" style="border-radius:3px" />
                    </div>
                </div>
                <div style="display: flex;padding: 5px 0px;column-gap: 30px;;margin-right:15px;margin-left:15px;">
                    <div style="">
                        <button v-on:click="saveReminder()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color:#2196f3;border-radius: 3px;min-width: 100px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;display: inline-block;">
                            <span style="padding-left: 10px;">{{reminderLabel}}</span>
                        </button>
                    </div>
                    <div style="flex:1">
                    </div>
                </div>
                <br>

            </form>
        </div>
    </div>

</div>
</template>

<script>
import {
    bus
} from './../../../main.js';
import userMixinLib from './../../mixins/lib/user_mixin_lib';
import utilsMixinLib from './../../mixins/lib/utils_lib';
import uiListMixinLib from './../../mixins/lib/ui-list.js';

export default {
    mixins: [
        userMixinLib,
        utilsMixinLib,
        uiListMixinLib
    ],
    props: ['id', 'item', 'myOrgName', 'uniqueComponentId', 'selectedTask', 'loggedInUser', 'embeddingViewName', 'taskIdToBeViewed', 'tabToDisplay', 'isModalViewed'],
    data: function () {
        return {
            // /loggedInUser :  {},
            isTaskInfoContainerExpanded: false,
            taskId: this.$route.params.taskId,
            subtaskId: this.$route.params.subtaskId,
            parentTaskName: null,
            showNewSubTaskForm: false,
            viewSubTask: false,
            taskObject: {
                id: this.id,
                remindersCount: 0,
                timelogsCount: 0,
                transitionCount: 0,
                attachedFormsCount: 0
            },
            taskObjectBeforeChange: {},
            resetTime: {
                time: new Date().getTime()
            },
            showTaskInfoContainer: false,
            preferredTab: 'none',

            // Checklist data
            checklistLabel: 'Add Item',
            checklistItem: {
                actionType: 'NEW',
                activityName: ''
            },

            // Reminders data
            reminderList: [],
            potentialMembersList: [],
            availableMembers: [],
            reminderLabel: 'Add Reminder',
            reminderItem: {
                id: 'New'
            },

            // Hooks data
            customers: [],
            customerBranches: [],
            customerContacts: [],
            customersUnfiltered: [],
            customerBranchesUnfiltered: [],
            customerContactsUnfiltered: [],
            customersNames: '',
            customerBranchesNames: '',
            hooksSubmenuSearchQuery: '',
            hookSubmenuCurrentlySelected: null,
            hookSubmenu: {
                isSubmenuCustomersSelected: false,
                isSubmenuCustomerBranchesSelected: false,
                isSubmenuCustomerContactsSelected: false
            },

            selectedTabKey: 'Contact',
            isActivityTabInitialized: false,
            isSubtasksTabInitialized: false,
            isChecklistsTabInitialized: false,
            isRemindersTabInitialized: false,
            isTransitionsTabInitialized: false,
            isFormsTabInitialized: false,
            isFilesTabInitialized: false,
            isHooksTabInitialized: false,

            // CONTACT 
            contactModal: false,
            headers: {
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkaXNwbGF5TmFtZSI6IlZpZ25lc2hCaGFza2FyIiwiaXNzIjoiYXV0aDAiLCJyZXFBdXRoVG9rZW4iOiJ7XCJ6elwiOm51bGwsXCJsblwiOlwiQmhhc2thclwiLFwidFwiOlwiNWZkODVmNTViN2JiNjA1ODllM2E5M2RkXCIsXCJmblwiOlwiVmlnbmVzaFwiLFwiZW1cIjpcImNiaGFza2FyYXZpZ25lc2gub2ZmaWNlQGdtYWlsLmNvbVwiLFwicGlkc1wiOltudWxsLFwianZzYiRka2JqXCIsXCJqdnNiJG1hdGl1XCJdLFwidXVpZFwiOlwiNWZkODVmOTdiN2JiNjA1ODllM2E5M2RmXCIsXCJ0YlwiOm51bGx9IiwiZXhwIjoxNjU4MDUwNjA2LCJ1dWlkIjoiNWZkODVmOTdiN2JiNjA1ODllM2E5M2RmIn0.or3xlRbqVM_NeBWskWjsBFl7ZRQx4lHzh6mvMTt4a4E'
            },

            //People Organization
            myOrganizationDetail: {},
            getusersList: []
        };
    },
    methods: {

        expandOrShrinkTaskInfoContainer() {

            if (this.isTaskInfoContainerExpanded) {

                this.isTaskInfoContainerExpanded = false;
                document.querySelector(".listOfTasksContainer").style.display = null;
            } else {
                this.isTaskInfoContainerExpanded = true;
                document.querySelector(".listOfTasksContainer").style.display = "none";
            }

        },

        openAddReminderModal() {
            // Clear these fields before attaching a new form-template.
            this.reminderItem = {};
            UIkit.modal(document.querySelector('#' + this.uniqueComponentId + '_add_reminder_modal')).show();
        },
        closeAddReminderModal() {
            UIkit.modal(document.querySelector('#' + this.uniqueComponentId + '_add_reminder_modal')).hide();
        },
        loadCustomerHooks() {
            // Load customers from local-storage
            this.customers = []; // Reset this otherwise, for every task viewed, the dropdown gets populated resulting in unstable duplicates.
            console.log('Customers before localstorage ', this.customers);
            const customers = JSON.parse(localStorage.getItem('customers'));

            // Make a copy from the local-storage data inorder to prevent manipulating the global data.
            // This data will differ for each selected task.
            customers.forEach(customer => {
                if (this.taskObject.customerHookIds !== null) {
                    this.taskObject.customerHookIds.forEach(customerHookData => {
                        if (customerHookData.split('#')[0] === customer.id) {
                            customer.isSelected = true;
                        }
                    });
                }

                this.customers.push(customer);
                this.customersUnfiltered.push(customer);
            });

            console.log('Customers after localstorage fetch ', this.customers);

            const selectedCustomers = this.customers.filter(cust => cust.isSelected);
            const numberOfSelectedCustomers = selectedCustomers.length;
            if (numberOfSelectedCustomers > 0) {
                document.getElementById('selectedHookCustomersBadge').innerHTML = '(' + numberOfSelectedCustomers + ' selected)';
            }

            this.customersNames = selectedCustomers.map(cust => cust.name).join(', ');
        },
        loadCustomerBranchesHooks() {
            // Load customers from local-storage
            this.customerBranches = []; // Reset this otherwise, for every task viewed, the dropdown gets populated resulting in unstable duplicates.
            console.log('Customer Branches before localstorage ', this.customerBranches);
            const customerBranches = JSON.parse(localStorage.getItem('customer_branches'));

            // Make a copy from the local-storage data inorder to prevent manipulating the global data.
            // This data will differ for each selected task.
            customerBranches.forEach(branch => {
                if (this.taskObject.customerBranchHookIds !== null) {
                    this.taskObject.customerBranchHookIds.forEach(customerBranchHookData => {
                        if (customerBranchHookData.split('#')[0] === branch.id) {
                            branch.isSelected = true;
                        }
                    });
                }

                this.customerBranches.push(branch);
                this.customerBranchesUnfiltered.push(branch);
            });
            console.log('Customer branches after localstorage fetch ', this.customerBranches);

            // Update the selected badge
            const selectedCustomerBranches = this.customerBranches.filter(custBranch => custBranch.isSelected);
            const numberOfSelectedCustomerBranches = selectedCustomerBranches.length;
            if (numberOfSelectedCustomerBranches > 0) {
                document.getElementById('selectedHookCustomerBranchesBadge').innerHTML = '(' + numberOfSelectedCustomerBranches + ' selected)';
            }

            this.customerBranchesNames = selectedCustomerBranches.map(custBranch => custBranch.name).join(', ');
        },
        loadCustomerContactsHooks() {
            // Load customers from local-storage
            this.customerContacts = []; // Reset this otherwise, for every task viewed, the dropdown gets populated resulting in unstable duplicates.
            console.log('Customer Contacts before localstorage ', this.customerContacts);
            const customerContacts = JSON.parse(localStorage.getItem('customer-contacts'));

            // Make a copy from the local-storage data inorder to prevent manipulating the global data.
            // This data will differ for each selected task.
            customerContacts.forEach(customerContact => {
                if (this.taskObject.customerContactHookIds !== null) {
                    this.taskObject.customerContactHookIds.forEach(customerContactHookData => {
                        if (customerHookData.split('#')[0] === customerContact.id) {
                            customerContact.isSelected = true;
                        }
                    });
                }

                this.customerContacts.push(customerContact);
                this.customerContactsUnfiltered.push(customerContact);
            });
            console.log('Customer contacts after localstorage fetch ', this.customerContacts);

            const numberOfSelectedCustomerContacts = this.customerContacts.filter(custContact => custContact.isSelected).length;
            if (numberOfSelectedCustomerContacts > 0) {
                document.getElementById('selectedHookCustomerContactsBadge').innerHTML = '(' + numberOfSelectedCustomerContacts + ' selected)';
            }
        },
        searchHooksSubmenu() {
            console.log('hooks submenu query for ' + this.hookSubmenuCurrentlySelected + ' is ' + this.hooksSubmenuSearchQuery);

            if (this.hookSubmenuCurrentlySelected === 'isSubmenuCustomersSelected') {
                if (this.hooksSubmenuSearchQuery.trim() !== '') {
                    this.customers = this.customers.filter(customer => customer.name.toLowerCase().includes(this.hooksSubmenuSearchQuery.toLowerCase()));
                } else {
                    this.customers = this.customersUnfiltered;
                }
            } else if (this.hookSubmenuCurrentlySelected === 'isSubmenuCustomerBranchesSelected') {
                if (this.hooksSubmenuSearchQuery.trim() !== '') {
                    this.customerBranches = this.customerBranches.filter(customerBranch => customerBranch.name.toLowerCase().includes(this.hooksSubmenuSearchQuery.toLowerCase()));
                } else {
                    this.customerBranches = this.customerBranchesUnfiltered;
                }
            } else if (this.hookSubmenuCurrentlySelected === 'isSubmenuCustomerContactsSelected') {
                if (this.hooksSubmenuSearchQuery.trim() !== '') {
                    this.customerContacts = this.customerContacts.filter(customerContact => customerContact.name.toLowerCase().includes(this.hooksSubmenuSearchQuery.toLowerCase()));
                } else {
                    this.customerContacts = this.customerContactsUnfiltered;
                }
            }
        },
        updateCustomerHook(customer) {
            const post_url = './tasks/update-customer-hook';
            const action = customer.isSelected ? 'ADD' : 'REMOVE';

            const form = {
                taskId: this.taskId,
                customerId: customer.id + '#' + customer.name,
                action: action
            };

            console.log('Task CustomerHook Update Data : ', form);
            // return false;

            // VueJS ajax call-1
            axios.post(process.env.VUE_APP_API_URL + post_url, form)
                .then((dataResponse) => {
                    console.log('Task CustomerHook Update Result : ');
                    console.log(dataResponse);

                    if (dataResponse.data.actionResult === 1) {
                        this.newWorkgroupInfo = dataResponse.data.bean;

                        const action = form.action === 'ADD' ? ' added ' : 'removed';

                        /*
                                    Revisit this code-block later (Commented on March 15, 2021)

                                    if(form.action==="ADD"){
                                        customer["isSelected"] = true;
                                        this.currentlySelectedSubtaskForDependencyUpdate["dependencyTaskIds"].push(form.customerId);
                                    }
                                    else if(form.action==="REMOVE"){

                                        customer["isSelected"] = false;

                                        this.currentlySelectedSubtaskForDependencyUpdate["dependencyTaskIds"]
                                            .forEach((dependencyTaskId, index) => {
                                                if(dependencyTaskId === form.dependencyTaskId)
                                                {
                                                    this.currentlySelectedSubtaskForDependencyUpdate["dependencyTaskIds"].splice(index,1);
                                                }
                                        });
                                    }

                                    //Update the labels in the gridrow based on the latest values.
                                    if(this.currentlySelectedSubtaskForDependencyUpdate.dependencyTaskIds===null)
                                    {
                                        this.currentlySelectedSubtaskForDependencyUpdate.dependencyTaskIds=[];
                                    }

                                    if(this.currentlySelectedSubtaskForDependencyUpdate.dependencyTaskIds!==null)
                                    {
                                        let dependencyTasksLabelArray = [];
                                        let dependencyTasksLabel = "none";
                                        this.currentlySelectedSubtaskForDependencyUpdate.dependencyTaskIds.forEach((dTaskId) => {
                                          dependencyTasksLabelArray.push("#" + dTaskId.split("#")[1]);
                                        });

                                        dependencyTasksLabel = dependencyTasksLabelArray.length>0 ? dependencyTasksLabelArray.join(", ") : "none";
                                        this.currentlySelectedSubtaskForDependencyUpdate["dependencyTasksLabel"] = dependencyTasksLabel;
                                    }

                                    */

                        UIkit.notification(`<div class="taskone-notification">
                                                <span uk-icon="icon: check;ratio:1"></span>
                                                <div>Customer Hook was ${action}.</div>
                                            </div>`, {
                            status: 'success',
                            pos: 'bottom-left',
                            timeout: 5000
                        });

                        const selectedCustomers = this.customers.filter(cust => cust.isSelected);
                        const numberOfSelectedCustomers = selectedCustomers.length;
                        if (numberOfSelectedCustomers > 0) {
                            document.getElementById('selectedHookCustomersBadge').innerHTML = '(' + numberOfSelectedCustomers + ' selected)';
                        } else {
                            document.getElementById('selectedHookCustomersBadge').innerHTML = '';
                        }

                        this.customersNames = selectedCustomers.map(cust => cust.name).join(', ');

                        // document.getElementById('saveButton').innerHTML = btnText;
                        // this.enableHTMLElement(document.getElementById('saveButton'));

                        this.$emit('refreshList', {});
                    } else {
                        const errorMsg = (dataResponse.data).message;
                        UIkit.notification("<span uk-icon='icon: warning;ratio:1'></span>" + errorMsg, {
                            status: 'danger',
                            pos: 'bottom-left',
                            timeout: 5000
                        });

                        // document.getElementById('saveButton').innerHTML = btnText;
                        // this.enableHTMLElement(document.getElementById('saveButton'));
                        return false;
                    }
                })
                .catch(function (errorResponse) {
                    console.log('ERROR MS - ', errorResponse);
                    const exceptionMsg = errorResponse.data.exception;

                    UIkit.notification("<span uk-icon='icon: warning ;ratio:1'></span> " + exceptionMsg + '.', {
                        status: 'danger',
                        pos: 'bottom-left',
                        timeout: 500000
                    });
                    return false;
                });
        },
        updateCustomerBranchHook(customerBranch) {
            const post_url = './tasks/update-customer-branch-hook';
            const action = customerBranch.isSelected ? 'ADD' : 'REMOVE';

            const form = {
                taskId: this.taskId,
                customerId: customerBranch.customerId,
                customerBranchId: customerBranch.id + '#' + customerBranch.name,
                action: action
            };

            console.log('Task CustomerBranchHook Update Data : ', form);
            // return false;

            // VueJS ajax call-1
            axios.post(process.env.VUE_APP_API_URL + post_url, form)
                .then((dataResponse) => {
                    console.log('Task CustomerBranchHook Update Result : ');
                    console.log(dataResponse);

                    if (dataResponse.data.actionResult === 1) {
                        this.newWorkgroupInfo = dataResponse.data.bean;

                        const action = form.action === 'ADD' ? ' added ' : 'removed';

                        // Cascading Logic - March 16 2017
                        // When a branch is hooked, automatically check the corresponding branch's customer checkbox in the customer submenu.
                        // This will automatically display the customer as selected.
                        // Confirm the logic with Pawan the following 2 things
                        // 1. Should selecting atleast one branch also make the customer selected.
                        // 2. Should deselecting a customer, deselect all the branches?
                        // How to apply these logics?

                        /*
                                    this.customers.forEach(customer => {
                                      if(customer.id===form.customerId.split("#")[0])
                                      {
                                        if(action === "added")
                                            customer.isSelected = true;
                                        else if(action === "removed")
                                            customer.isSelected = false;
                                      }
                                    });

                                    */

                        /*
                                    Revisit this code-block later (Commented on March 15, 2021)

                                    if(form.action==="ADD"){
                                        customer["isSelected"] = true;
                                        this.currentlySelectedSubtaskForDependencyUpdate["dependencyTaskIds"].push(form.customerId);
                                    }
                                    else if(form.action==="REMOVE"){

                                        customer["isSelected"] = false;

                                        this.currentlySelectedSubtaskForDependencyUpdate["dependencyTaskIds"]
                                            .forEach((dependencyTaskId, index) => {
                                                if(dependencyTaskId === form.dependencyTaskId)
                                                {
                                                    this.currentlySelectedSubtaskForDependencyUpdate["dependencyTaskIds"].splice(index,1);
                                                }
                                        });
                                    }

                                    //Update the labels in the gridrow based on the latest values.
                                    if(this.currentlySelectedSubtaskForDependencyUpdate.dependencyTaskIds===null)
                                    {
                                        this.currentlySelectedSubtaskForDependencyUpdate.dependencyTaskIds=[];
                                    }

                                    if(this.currentlySelectedSubtaskForDependencyUpdate.dependencyTaskIds!==null)
                                    {
                                        let dependencyTasksLabelArray = [];
                                        let dependencyTasksLabel = "none";
                                        this.currentlySelectedSubtaskForDependencyUpdate.dependencyTaskIds.forEach((dTaskId) => {
                                          dependencyTasksLabelArray.push("#" + dTaskId.split("#")[1]);
                                        });

                                        dependencyTasksLabel = dependencyTasksLabelArray.length>0 ? dependencyTasksLabelArray.join(", ") : "none";
                                        this.currentlySelectedSubtaskForDependencyUpdate["dependencyTasksLabel"] = dependencyTasksLabel;
                                    }

                                    */

                        UIkit.notification(`<div class="taskone-notification">
                                                <span uk-icon="icon: check;ratio:1"></span>
                                                <div>Customer Branch Hook was ${action}.</div>
                                            </div>`, {
                            status: 'success',
                            pos: 'bottom-left',
                            timeout: 5000
                        });

                        // Update the selected badge
                        const selectedCustomerBranches = this.customerBranches.filter(custBranch => custBranch.isSelected);
                        const numberOfSelectedCustomerBranches = selectedCustomerBranches.length;
                        if (numberOfSelectedCustomerBranches > 0) {
                            document.getElementById('selectedHookCustomerBranchesBadge').innerHTML = '(' + numberOfSelectedCustomerBranches + ' selected)';
                        } else {
                            document.getElementById('selectedHookCustomerBranchesBadge').innerHTML = '';
                        }

                        this.customerBranchesNames = selectedCustomerBranches.map(custBranch => custBranch.name).join(', ');

                        this.$emit('refreshList', {});
                        // document.getElementById('saveButton').innerHTML = btnText;
                        // this.enableHTMLElement(document.getElementById('saveButton'));
                    } else {
                        const errorMsg = (dataResponse.data).message;
                        UIkit.notification("<span uk-icon='icon: warning;ratio:1'></span>" + errorMsg, {
                            status: 'danger',
                            pos: 'bottom-left',
                            timeout: 5000
                        });

                        // document.getElementById('saveButton').innerHTML = btnText;
                        // this.enableHTMLElement(document.getElementById('saveButton'));
                        return false;
                    }
                })
                .catch(function (errorResponse) {
                    console.log('ERROR MS - ', errorResponse);
                    const exceptionMsg = errorResponse.data.exception;

                    UIkit.notification("<span uk-icon='icon: warning ;ratio:1'></span> " + exceptionMsg + '.', {
                        status: 'danger',
                        pos: 'bottom-left',
                        timeout: 500000
                    });
                    return false;
                });
        },
        showTaskInfoContainerDiv() {
            this.showTaskInfoContainer = true;
            document.querySelector('body').addEventListener('click', this.handleBodyClickEvent, true);
        },
        hideTaskInfoContainer() {
            this.showTaskInfoContainer = false;
            document.querySelector('body').removeEventListener('click', this.handleBodyClickEvent, true);
        },
        handleBodyClickEvent(event) {
            const foundTaskInfoContainer = event.target.closest('.task-info-container');
            if (foundTaskInfoContainer === null) {
                // This means, if target on which the click happened is not within the context-menu div, so you can close the context-menu dropdown.
                this.hideTaskInfoContainer();
            }
        },
        onMenuClick(selectedSubmenuName, label) {
            // Display the relevant submenu list
            this.hookSubmenuCurrentlySelected = selectedSubmenuName;
            document.getElementById('submenu_searchbox').setAttribute('placeholder', 'Search ' + label);
            document.getElementById('menu_slider').style.left = '-100%';

            // If focus is done without settimeout, then the submenu sliding doesn't animate as expected.
            setTimeout(() => document.getElementById('submenu_searchbox').focus(), 300);
        },
        onSubmenuClick() {
            document.getElementById('menu_slider').style.left = '0%';
        },
        cancelChecklistItem(item) {
            // this.checklistLabel = 'Update Item';
            // this.checklistItem = item;
            // this.checklistItem.actionType = 'UPDATE';
            // this.checklistItem.previousActivityName = item.activityName; // This is the key to update

            const post_url = './tasks/save-checklist-item';

            const form = {
                taskId: this.taskId,
                actionType: 'UPDATE_STATUS',
                activityName: item.activityName,
                status: "CANCELLED"
            };

            // VueJS ajax call-1
            axios.post(process.env.VUE_APP_API_URL + post_url, form)
                .then((dataResponse) => {
                    // console.log("Task Save Result : ");
                    // console.log(dataResponse);

                    if (dataResponse.data.actionResult === 1) {
                        item.status = form.status;
                        const notificationLabel = 'Checklist item was cancelled.';

                        if (dataResponse.data.bean.first !== null) {
                            const updatedItem = dataResponse.data.bean.first;

                            this.taskObject.checklist.forEach(item => {
                                if (item.activityName === updatedItem.label) {
                                    item.status = updatedItem.status;
                                    item.updatedBy = updatedItem.updatedBy;
                                    if (item.updatedOn !== null) {
                                        // item.updatedOn = this.convertUTCDateFromServerToLocalDate(item.updatedOn);
                                        item.updatedOnFormatted = dayjs(item.updatedOn + "Z").format('DD/MM/YYYY HH:mm');
                                        item.updatedOnAgo = dayjs(item.updatedOn + "Z").fromNow();
                                        console.log('checklist-item.updatedOn = ', item.updatedOn);
                                    }
                                }
                            });
                        }

                        UIkit.notification(`<div class="taskone-notification">
                                                <span uk-icon="icon: check;ratio:1"></span>
                                                <div> ${notificationLabel} </div>
                                            </div>`, {
                            status: 'success',
                            pos: 'bottom-left',
                            timeout: 5000
                        });

                        // this.$emit("refreshList",{});
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
                        timeout: 5000
                    });

                    document.getElementById('saveButton').innerHTML = btnText;
                    this.enableHTMLElement(document.getElementById('saveButton'));
                    return false;
                });
        },
        updateChecklistItemStatus(item, event) {
            const post_url = './tasks/save-checklist-item';

            const form = {
                taskId: this.taskId,
                actionType: 'UPDATE_STATUS',
                activityName: item.activityName,
                status: (item.status !== 'COMPLETED') ? 'COMPLETED' : 'PENDING'
            };

            // VueJS ajax call-1
            axios.post(process.env.VUE_APP_API_URL + post_url, form)
                .then((dataResponse) => {
                    // console.log("Task Save Result : ");
                    console.log("Checklist Item update : ", dataResponse);

                    if (dataResponse.data.actionResult === 1) {
                        item.status = form.status;
                        this.displayTab(null, this.selectedTabKey);
                        return false;
                        const notificationLabel = 'Checklist item updated.';

                        if (dataResponse.data.bean.first !== null) {
                            const updatedItem = dataResponse.data.bean.first;

                            this.taskObject.checklist.forEach(item => {
                                if (item.activityName === updatedItem.label) {
                                    item.status = updatedItem.status;
                                    item.updatedBy = updatedItem.updatedBy;
                                    if (item.updatedOn !== null) {
                                        // item.updatedOn = this.convertUTCDateFromServerToLocalDate(item.updatedOn);
                                        item.updatedOnFormatted = dayjs(item.updatedOn + "Z").format('DD/MM/YYYY HH:mm');
                                        item.updatedOnAgo = dayjs(item.updatedOn + "Z").fromNow();
                                        console.log('checklist-item.updatedOn = ', item.updatedOn);
                                    }

                                    setTimeout(() => {
                                        event.target.parentElement
                                            .querySelector(".scaleZero")
                                            .classList.remove("scaleZero");
                                    }, 100);

                                }
                            });
                        }

                        UIkit.notification(`<div class="taskone-notification">
                                                <span uk-icon="icon: check;ratio:1"></span>
                                                <div> ${notificationLabel} </div>
                                            </div>`, {
                            status: 'success',
                            pos: 'bottom-left',
                            timeout: 5000
                        });

                        // this.$emit("refreshList",{});
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
                        timeout: 5000
                    });

                    document.getElementById('saveButton').innerHTML = btnText;
                    this.enableHTMLElement(document.getElementById('saveButton'));
                    return false;
                });
        },
        saveChecklistItem() {
            const post_url = './tasks/save-checklist-item';

            const form = {
                taskId: this.taskId,
                actionType: this.checklistItem.actionType,
                activityName: this.checklistItem.activityName,
                previousActivityName: this.checklistItem.previousActivityName
            };

            if (this.checklistItem.activityName === undefined || this.checklistItem.activityName.trim() === "") {

                const errorMsg = "&nbsp;Checklist activity cannot be empty.";
                UIkit.notification("<span uk-icon='icon: warning;ratio:1'></span>" + errorMsg, {
                    status: 'danger',
                    pos: 'bottom-left',
                    timeout: 5000
                });
                return false;
            }

            // VueJS ajax call-1
            axios.post(process.env.VUE_APP_API_URL + post_url, form)
                .then((dataResponse) => {
                    console.log('Task Save Result : ');
                    console.log(dataResponse);

                    if (dataResponse.data.actionResult === 1) {
                        if (dataResponse.data.bean.first !== null) {

                            const addedItem = dataResponse.data.bean.first;

                            // Get the current item from the existing list and update it, otherwise add new item.
                            if (form.actionType === 'NEW') {
                                if (this.taskObject.checklist === null) {
                                    this.taskObject.checklist = [];
                                }

                                this.taskObject.checklist.push({
                                    activityName: addedItem.label,
                                    status: 'NEW'
                                });
                            } else if (form.actionType === 'UPDATE') {
                                // Iterate through the existing items and change its value.
                                this.taskObject.checklist.forEach((item) => {
                                    if (form.previousActivityname === item.activityName) {
                                        item.activityName = addedItem.label;
                                    }
                                });
                            }
                        }

                        this.checklistItem = {
                            actionType: 'NEW'
                        };
                        this.checklistLabel = 'Add Item';

                        const notificationLabel = (this.checklistItem.actionType === 'UPDATE') ? 'Checklist item updated.' : 'Checklist item added.';

                        UIkit.notification(`<div class="taskone-notification">
                                                  <span uk-icon="icon: check;ratio:1"></span>
                                                  <div> ${notificationLabel} </div>
                                              </div>`, {
                            status: 'success',
                            pos: 'bottom-left',
                            timeout: 5000
                        });

                        // this.$emit("refreshList",{});
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
                        timeout: 5000
                    });

                    document.getElementById('saveButton').innerHTML = btnText;
                    this.enableHTMLElement(document.getElementById('saveButton'));
                    return false;
                });
        },

        // Reminders codes
        updateReminderItem(item) {
            this.reminderLabel = 'Update Reminder';
            this.reminderItem = item;
            this.resetReminderPotentialMembers();
        },

        // This data will be used to filter both members and admins by merging with the result from 'get-associated-people/{workgroup-id}'
        loadPotentialMembersForReminders() {
            try {
                // VueJS ajax call-1
                axios.get('https://test.hotkup.com/categories/get-potential-users')
                    .then((dataResponse) => {
                        // console.log("List: " , dataResponse);
                        this.handlePotentialReminderMembers(dataResponse);
                    })
                    .catch((error) => {
                        this.handleUnpaginatedListDataError(error);
                    });
            } catch (error) {
                console.error('Unpaginated List data fetch error : ', error);
            }
        },
        // Callbacks
        handlePotentialReminderMembers(dataResponse) {
            // Pass it to the availableAssignees prop to the dropdown.
            // console.log("Potential members to receive reminders relevant to the category: ", dataResponse);
            alert(1)
            const mapFunction = (user) => {
                return {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isSelected: false
                };
            };

            const mappedArrayOfUser = dataResponse.data.bean.map(mapFunction);
            this.potentialMembersList = mappedArrayOfUser;

            const potentialMembers = [];

            mappedArrayOfUser.forEach((user) => {
                const userObj = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isSelected: false // Set false by default, so that if the category didn't have any member, then all of the available list could be passed to selectbox.
                };

                if (this.reminderItem.userIds !== null && this.reminderItem.userIds !== undefined) {
                    this.reminderItem.userIds.forEach((userId) => {
                        if (user.id === userId) {
                            userObj.isSelected = true;
                        }
                    });
                }
                potentialMembers.push(userObj);
            });

            this.availableMembers = potentialMembers;
            console.log('potentialMembers', potentialMembers)
            console.log('this.availableMembers', this.availableMembers)
            // console.log("this.availableMembers : " , this.availableMembers);
        },
        resetReminderPotentialMembers() {
            const mappedArrayOfUser = this.potentialMembersList;

            const potentialMembers = [];

            mappedArrayOfUser.forEach((user) => {
                const userObj = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isSelected: false // Set false by default, so that if the category didn't have any member, then all of the available list could be passed to selectbox.
                };

                if (this.reminderItem.userIds !== null && this.reminderItem.userIds !== undefined) {
                    this.reminderItem.userIds.forEach((userId) => {
                        if (user.id === userId) {
                            userObj.isSelected = true;
                        }
                    });
                }
                potentialMembers.push(userObj);
            });

            this.availableMembers = potentialMembers;
            // console.log("this.availableMembers : " , this.availableMembers);
        },
        updateReminderReceiversEmitEvent(data) {
            // console.log("--data--" , data);
            const userIds = Array.from(data).map(item => item.id);
            this.reminderItem.userIds = userIds;
        },
        updateReminderStatus(item) {
            const post_url = './reminders/save';

            const form = {
                id: item.id,
                taskId: this.taskId,
                title: reminderItem.title,
                dateTime: reminderItem.dateTime,
                userIds: reminderItem.userIds
            };

            // console.log(form);
            // return false;

            // VueJS ajax call-1
            axios.post(process.env.VUE_APP_API_URL + post_url, form)
                .then((dataResponse) => {
                    // console.log("Reminder Save Result : ");
                    // console.log(dataResponse);

                    if (dataResponse.data.actionResult === 1) {
                        const notificationLabel = 'Checklist item updated.';

                        UIkit.notification(`<div class="taskone-notification">
                                                <span uk-icon="icon: check;ratio:1"></span>
                                                <div> ${notificationLabel} </div>
                                            </div>`, {
                            status: 'success',
                            pos: 'bottom-left',
                            timeout: 5000
                        });

                        // this.$emit("refreshList",{});
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
                        timeout: 5000
                    });

                    document.getElementById('saveButton').innerHTML = btnText;
                    this.enableHTMLElement(document.getElementById('saveButton'));
                    return false;
                });
        },
        saveReminder() {
            const post_url = 'https://test.hotkup.com/crm/org-reminders/save';

            const isNew = this.reminderItem.id == 'New';
            const form = {
                "id": 'New',
                "tenantId": "5fd85f55b7bb60589e3a93dd",
                "orgId": this.item.organizationId,
                "title": this.reminderItem.title,
                "type": "email",
                "assigneeId": "5fd85f97b7bb60589e3a93df#Vignesh Bhaskar",
                "clientTimeZone": "Asia/Calcutta",
                "reminderTime": this.reminderItem.dateTime
            }

            if (this.reminderItem.dateTime) {
                form.dateTime = new Date(this.reminderItem.dateTime).toISOString();
            }

            // console.log(form);
            // return false;

            // VueJS ajax call-1
            axios({
                    method: 'POST',
                    url: post_url,
                    headers: this.headers,
                    data: form
                }).then((dataResponse) => {
                    // console.log("Reminder save Result : ");
                    // console.log(dataResponse);

                    if (dataResponse.data.actionResult === 1) {
                        this.reminderItem = {
                            id: 'New'
                        };
                        // this.reminderItem = {"actionType" : "NEW"};
                        this.reminderLabel = 'Add Reminder';
                        this.resetReminderPotentialMembers();
                        this.loadReminders();
                        this.closeAddReminderModal();

                        const notificationLabel = (isNew) ? 'New Reminder added.' : 'Reminder updated.';

                        UIkit.notification(`<div class="taskone-notification">
                                                  <span uk-icon="icon: check;ratio:1"></span>
                                                  <div> ${notificationLabel} </div>
                                              </div>`, {
                            status: 'success',
                            pos: 'bottom-left',
                            timeout: 5000
                        });

                        // this.$emit("refreshList",{});
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
                        timeout: 5000
                    });

                    document.getElementById('saveButton').innerHTML = btnText;
                    this.enableHTMLElement(document.getElementById('saveButton'));
                    return false;
                });
        },
        cancelReminderItem(item) {
            // this.reminderItem = item;

            const post_url = 'https://test.hotkup.com/crm/organizations/save';
            const form = {
                id: item.id,
                status: "CANCELLED"
            };

            // VueJS ajax call-1
            axios.post(process.env.VUE_APP_API_URL + post_url, form)
                .then((dataResponse) => {
                    // console.log("Reminder save Result : ");
                    // console.log(dataResponse);

                    if (dataResponse.data.status === "SUCCESS") {
                        this.reminderItem = {
                            id: 'New'
                        };
                        this.resetReminderPotentialMembers();
                        this.loadReminders();

                        const notificationLabel = 'Reminder cancelled.';

                        UIkit.notification(`<div class="taskone-notification">
                                                  <span uk-icon="icon: check;ratio:1"></span>
                                                  <div> ${notificationLabel} </div>
                                              </div>`, {
                            status: 'success',
                            pos: 'bottom-left',
                            timeout: 5000
                        });

                        // this.$emit("refreshList",{});
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
                        timeout: 5000
                    });

                    document.getElementById('saveButton').innerHTML = btnText;
                    this.enableHTMLElement(document.getElementById('saveButton'));
                    return false;
                });
        },
        loadReminders() {

            // Attempting to use Comlink Worker
            const get_url = './reminders/list/' + this.taskObject.id; // Fetch all reminders
            const callbackFunction = (dataResponse) => {

                dataResponse.data = dataResponse;

                // Pass it to the availableAssignees prop to the dropdown.
                console.log('Fetched reminders for task id : ', this.taskObject.id, dataResponse);

                this.reminderList = [];
                const reminders = dataResponse.data.bean;

                if (reminders !== null) {
                    this.taskObject.remindersCount = reminders.length;
                } else {
                    this.taskObject.remindersCount = 0;
                }

                reminders.forEach((item) => {

                    if (item.dateTime !== null) {
                        // item.dateTimeFormatted = new Date(item.dateTime).toLocaleString()
                        //                                          .slice(0, 17)
                        //                                          .replace(',', '')
                        //                                          .replace('T',' ');

                        // Added during "Fix-Date-UTC-Update"
                        // item.dateTimeFormatted = new Date(item.dateTime.replace(',', '').replace('T',' ') + " UTC").toLocaleString();
                        // item.dateTimeFormatted = this.convertUTCDateFromServerToLocalDate(item.dateTime);
                        item.dateTimeFormatted = dayjs(item.dateTime + "Z").format('DD/MM/YYYY HH:mm');
                        console.log('reminder-item.dateTime = ', item.dateTime);
                    }

                    item.usersString = item.users.map(user => user.firstName + " " + user.lastName).join(", ");

                    this.reminderList.push(item);
                });
            };
            const callbackError = (error) => {
                console.error('Error in task-view-ms.loadReminders()');
                console.error(error);
                UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
                    status: 'danger',
                    pos: 'bottom-left',
                    timeout: 5000
                });
            };

            async function sendTaskToWorker() {
                // const remoteFunction = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));
                console.log("Loading reminders using comlink-worker");
                await ComlinkWorker.fetch(process.env.VUE_APP_API_URL + get_url,
                    Comlink.proxy(callbackFunction),
                    Comlink.proxy(callbackError));
            }

            sendTaskToWorker();
            return false;
        },
        // Callbacks of loadPotentialMembersForReminders function.
        handleUnpaginatedListData(listKey, data) {
            if (listKey === 'reminders') {
                this.handleFetchedReminders(data);
            } else if (listKey === 'timelogs') {
                this.handleFetchedTimelogs(data);
            } else if (listKey === 'task_transitions') {
                this.handleFetchedTaskTransitions(data);
            }
        },
        handleUnpaginatedListDataError(error) {
            console.error('Unpaginated List data fetch error : ', error);
        },
        displayTab(e, tabKey) {

            // e.preventDefault();
            this.selectedTabKey = tabKey;

            // console.log("embeddingViewName=" + this.embeddingViewName + ", tab=" + this.selectedTabKey);

            // Reset all active tabs
            Array.from(document.querySelectorAll('#' + this.embeddingViewName + '_switcherTabs > li'))
                .forEach(item => item.classList.remove("uk-active"));

            try {
                if (e !== null) {
                    e.target.classList.add("uk-active");
                } else if (e === null && this.selectedTabKey !== null) {
                    document.querySelector('#' + this.embeddingViewName + '_switcherTabs > li.' + this.selectedTabKey)
                        .classList.add("uk-active");
                } else {
                    console.log("No active tab, so making the first one active");
                    (Array.from(document.querySelectorAll('#' + this.embeddingViewName + '_switcherTabs > li'))[0]).classList.add("uk-active");
                }

                if (this.selectedTabKey === 'activity' && !this.isActivityTabInitialized) {
                    this.isActivityTabInitialized = true;
                } else if (this.selectedTabKey === 'organization') {
                    this.getOrgDetails();
                } else if (this.selectedTabKey === 'reminders' && !this.isRemindersTabInitialized) {
                    this.loadPotentialMembersForReminders();
                    this.isRemindersTabInitialized = true;
                }
            } catch (error) {
                console.error("ERROR Info : embeddingViewName=" + this.embeddingViewName + ", tab=" + this.selectedTabKey);
                console.error("error in displayTab :: ", error);
            }
        },

        //Get Organization details
        getOrgDetails() {
            axios({
                    method: 'GET',
                    url: `https://test.hotkup.com/crm/organizations/get/${this.item.organizationId}`,
                })
                .then((res) => {
                    this.myOrganizationDetail = res.data;
                })
                .error((res) => console.log(res));
        },
        getRecord() {

            // Attempting fetch using comlink;

            // Developer notes regarding the usage of Comlink.
            // In the main.js, we are importing Comlink using 'import * as Comlink from "comlink"'
            // After importing, we are storing the Comlink object into the window object
            //    in the following code line
            //    window.Comlink = Comlink
            // Secondly, we are storing a reference of the worker into the window object as well.
            //    window.ComlinkWorker = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));

            if (this.taskObject === undefined || this.taskObject === null) {
                return false;
            } else if (this.taskObject.id === undefined || this.taskObject.id === null) {
                return false;
            }

            const get_url = './tasks/get/' + this.taskObject.id;
            const callbackFunction = (dataResponse) => {

                dataResponse.data = dataResponse;
                if (dataResponse.data.actionResult == 1) {
                    const taskObject = dataResponse.data.bean;
                    taskObject.categoryInfo.name = taskObject.categoryInfo.label;
                    taskObject.category = taskObject.categoryInfo; // v2 schema change (June 7, 2021)

                    // To prevent undefined error in the status's selectbox's v-bind:selected attribute
                    taskObject.statusInfo = taskObject.statusInfo !== null ? taskObject.statusInfo : {};

                    if (taskObject.createdBy !== null) {
                        taskObject.createdById = taskObject.createdBy.split('#')[0];
                        taskObject.createdByName = taskObject.createdBy.split('#')[1];
                    }

                    if (taskObject.createdOn !== null) {
                        // taskObject.createdOn = this.convertUTCDateFromServerToLocalDate(taskObject.createdOn);
                        taskObject.createdOnFormatted = dayjs(taskObject.createdOn + "Z").format('DD/MM/YYYY HH:mm');
                        taskObject.createdOnAgo = dayjs(taskObject.createdOn + "Z").fromNow();
                    }

                    if (taskObject.startDateTime !== null) {
                        // task.dueDateTime = new Date(task.dueDateTime).toLocaleString()
                        //                                          .slice(0, 17)
                        //                                          .replace(',', '')
                        //                                          .replace('T',' ');

                        // Added during "Fix-Date-UTC-Update"
                        // taskObject.dueDateTime = new Date(taskObject.dueDateTime.replace(',', '').replace('T',' ') + " UTC").toLocaleString();
                        taskObject.startDateTime = this.convertUTCDateFromServerToLocalDate(taskObject.startDateTime);
                        console.log('taskObject.startDateTime = ', taskObject.startDateTime);
                    }

                    if (taskObject.dueDateTime !== null) {
                        // task.dueDateTime = new Date(task.dueDateTime).toLocaleString()
                        //                                          .slice(0, 17)
                        //                                          .replace(',', '')
                        //                                          .replace('T',' ');

                        taskObject.dueDateTimeFormatted = dayjs(taskObject.dueDateTime + "Z").format('DD MMM'); // ('DD/MM/YYYY HH:mm');
                        taskObject.dueDateTimeAgo = dayjs(taskObject.dueDateTime + "Z").fromNow();

                        // Added during "Fix-Date-UTC-Update"
                        // taskObject.dueDateTime = new Date(taskObject.dueDateTime.replace(',', '').replace('T',' ') + " UTC").toLocaleString();
                        taskObject.dueDateTime = this.convertUTCDateFromServerToLocalDate(taskObject.dueDateTime);
                        console.log('taskObject.dueDateTime = ', taskObject.dueDateTime);
                    }

                    const categoriesNamesArray = [];
                    if (taskObject.categories !== null && taskObject.categories !== undefined) {
                        taskObject.categories.forEach((cat) => {
                            categoriesNamesArray.push(cat.name);
                        });
                        taskObject.categoriesString = categoriesNamesArray.join(', ');
                    }

                    if (taskObject.category !== null && taskObject.category.preferredTab !== null) {
                        this.preferredTab = taskObject.category.preferredTab;
                        this.displayRelevantTab();
                    }

                    const assigneesNamesArray = [];
                    taskObject.assignees.forEach((assignee) => {
                        assigneesNamesArray.push(assignee.label);
                    });
                    taskObject.assigneesString = assigneesNamesArray.join(', ');

                    if (taskObject.subTaskIds !== null) {
                        taskObject.subTasksCount = taskObject.subTaskIds.length;
                    } else {
                        taskObject.subTasksCount = 0;
                    }

                    if (taskObject.checklist !== null) {

                        let numberOfChecklistItems = 0;

                        taskObject.checklist.forEach(item => {

                            // This condition filters the checklist items only when it belongs to the task's current stage.
                            const isChecklistForThisStage = (item.stageId === null) ||
                                (item.stageId === undefined) ||
                                (item.stageId !== null && taskObject.statusInfo !== null && taskObject.statusInfo.id === item.stageId);

                            if (isChecklistForThisStage) {
                                numberOfChecklistItems += 1;
                            }

                        });

                        taskObject.checklistCount = numberOfChecklistItems; // taskObject.checklist.length;

                        taskObject.checklist.forEach(item => {
                            if (item.updatedOn !== null) {
                                // item.updatedOn = this.convertUTCDateFromServerToLocalDate(item.updatedOn);
                                item.updatedOnFormatted = dayjs(item.updatedOn + "Z").format('DD/MM/YYYY HH:mm');
                                item.updatedOnAgo = dayjs(item.updatedOn + "Z").fromNow();
                                console.log('checklist-item.updatedOn = ', item.updatedOn);
                            }
                        });
                    } else {
                        taskObject.checklistCount = 0;
                    }

                    // Assign the 'attachedFormsCount' prop (double-assignment)
                    taskObject.attachedFormsCount = taskObject.attachedFormsCount;

                    if (taskObject.ownerId !== null) {
                        taskObject.ownedBy = taskObject.ownerId.split('#')[1];
                    }

                    if (taskObject.statusInfo !== null && taskObject.statusInfo !== undefined) {
                        taskObject.stageName = taskObject.statusInfo.label;
                    }

                    this.taskObject = taskObject;
                    this.taskObjectBeforeChange = JSON.parse(JSON.stringify(taskObject));
                    this.loadPotentialMembersForReminders();
                    this.loadReminders();
                    this.loadTimelogs();
                    this.loadTaskTransitions();

                    // Load Hooks
                    this.loadCustomerHooks();
                    this.loadCustomerBranchesHooks();
                    // this.loadCustomerContactsHooks();

                    // Animate show the checkboxes.
                    setTimeout(() => {
                        Array.from(document.querySelectorAll(".scaleZero"))
                            .forEach(checklist => {
                                checklist.classList.remove("scaleZero");
                            });
                    }, 500);
                }
            };
            const callbackError = (error) => {
                console.error('Error in task-view-ms.getRecord()');
                console.error(error);
                UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
                    status: 'danger',
                    pos: 'bottom-left',
                    timeout: 5000
                });
            };

            async function sendTaskToWorker() {
                // const remoteFunction = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));
                await ComlinkWorker.fetch(process.env.VUE_APP_API_URL + get_url,
                    Comlink.proxy(callbackFunction),
                    Comlink.proxy(callbackError));
            }

            sendTaskToWorker();
            // Comlink ends here

            return false;

            axios.get(process.env.VUE_APP_API_URL + get_url)
                .then((dataResponse) => {
                    callbackFunction(dataResponse);
                })
                .catch((error) => {
                    console.log(error);
                    return false;
                });
        },
        openContextMenu(msgId, evt) {
            document.getElementById('ctx_menu_' + msgId).style.top = '30px';

            if (!document.getElementById('ctx_menu_' + msgId).classList.contains('opened')) {
                // document.getElementById("ctx_menu_" + msgId).style.display = "grid";
                document.getElementById('ctx_menu_' + msgId).style.transform = 'scale(1)';
                document.getElementById('ctx_menu_' + msgId).classList.add('opened');
            } else {
                // document.getElementById("ctx_menu_" + msgId).style.display = "none";
                document.getElementById('ctx_menu_' + msgId).style.transform = null;
                document.getElementById('ctx_menu_' + msgId).classList.remove('opened');
            }

            // Add click-listener
            document.querySelector('body').addEventListener('click', this.handleClickEventOnBody, false);

            // document.getElementById("ctx-menu-trigger-" + msgId).style.opacity=1;
        },
        hideContextMenu() {
            document.querySelectorAll('.context-menu').forEach((item) => {
                // item.style.display="none";
                item.style.transform = null;
                item.classList.remove('opened');
            });

            // Remove click listener
            document.querySelector('body').removeEventListener('click', this.handleClickEventOnBody, false);
            document.getElementById('menu_slider').style.left = '0%';
        },
        handleClickEventOnBody(event) {
            const foundParent = event.target.closest('.context-menu');
            if (foundParent === null) {
                // This means, if target on which the click happened is not within the context-menu div, so you can close the context-menu dropdown.
                this.hideContextMenu();
            }
        },
        onCustomerSelect(customerId) {
            // alert("Customer " + customerId + " is selected.");

            this.customers.forEach(customer => {
                if (customer.id === customerId) {
                    customer.isSelected = !customer.isSelected;
                    this.updateCustomerHook(customer);
                }
            });
        },
        onCustomerBranchSelect(customerBranchId) {
            // alert("Customer " + customerId + " is selected.");

            this.customerBranches.forEach(customerBranch => {
                if (customerBranch.id === customerBranchId) {
                    customerBranch.isSelected = !customerBranch.isSelected;
                    this.updateCustomerBranchHook(customerBranch);
                }
            });
        }
    },
    created: function () {},
    computed: {
        storeCounter: function () {
            // console.log('Accessing vuex store ', this.$store)
            // console.log('Store data accessed from home page : ' + this.$store.getters.count);
            return this.$store.getters.count;
        }
    },
    mounted: function () {
        console.log('################ task-view.vue ################' + this.embeddingViewName);

        bus.off("reload_task_details");
        bus.on("reload_task_details", (data) => {
            this.getRecord();
        });

        bus.off("show_task_detail_tab");
        bus.on("show_task_detail_tab", (data) => {

            // Display tab based on eventType
            console.log(data);

            if (data.eventType === "TASK_ACTIVITY_NEW_COMMENT" || data.eventType === "TASK_ACTIVITY_NEW_COMMENT" || data.eventType === "TASK_ACTIVITY_NEW_COMMENT_REPLY") {
                this.displayTab(null, 'activity');
            } else {
                console.error("show_task_detail_tab's on-event's data event type is not handled yet. Handle it in task-view's mounted method for bus.on:show_task_detail_tab", data);
            }

        });

        // alert(this.loggedInUser.userId);

        // console.log("Mounted task-view-ms.vue component " + this.$route.params.taskId);
        // this.$store.commit('increment');
        // this.storeCounter();
        // console.log('Accessing vuex store ', this.$store)
        // console.log('Store data accessed from home page : ' + this.$store.getters.count)
        // console.log('Done.........................')

        // UIkit.switcher(document.getElementById(this.embeddingViewName + '_switcherTabs'), {
        //   beforeshow: function (e) {
        //     alert(e);
        //   }
        // });

        // setTimeout(() => {
        //   UIkit.util.on('.uk-switcher', 'beforeshow', function (ev) {
        //     // this works and stop navigation to next clicked tab
        //       ev.preventDefault();
        //   });
        // }, 500);

        // If this component is used for viewing a task in modal, then ignore loading the details of params.taskId.
        if (this.isModalViewed) {
            return false;
        }

        if (this.$route.params.taskId !== null && this.$route.params.taskId !== undefined) {
            this.viewSubTask = false;
            this.showNewSubTaskForm = false;
            this.parentTaskName = null;
            this.taskObject.id = this.$route.params.taskId;

            this.getRecord();
        }

        if (this.$route.params.subtaskId !== null && this.$route.params.subtaskId !== undefined && this.$route.params.subtaskId !== 'none') {
            this.taskObject.id = this.$route.params.subtaskId;
            UIkit.switcher(document.getElementById(this.embeddingViewName + '_switcherTabs')).show(0);
            this.viewSubTask = true;
            this.showNewSubTaskForm = false;
            this.getRecord();
        }

    },

    unmounted: function () {

        // Remove all modals as they get created everytime in the DOM when this component is mounted again and again.
        // This causes the same DOM element with the same ID to be created multiple times and causes data corruption.
        // Hence all modals mounted by a .vue component must be deleted from the DOM when the .vue component is unmounted.

        const modalIdsToBeDeletedFromDOM = ['#' + this.uniqueComponentId + '_add_reminder_modal'];
        // alert("Unmounting reminder modal " + modalIdsToBeDeletedFromDOM);
        modalIdsToBeDeletedFromDOM.forEach(modalId => {
            const modal = document.querySelector(modalId);
            if (modal !== null) {
                modal.parentElement.removeChild(modal);
                // alert("_add_reminder_modal removed");
            }
        });

    },
    watch: {

        // Since we are passing an asynced data as 'availableItems', it is necessary to watch this prop when it receives new data.
        // selectedTask:function(newTask, oldTask){
        //     console.log("id changed from " + oldTask.id + " to " + newTask.id);
        //     this.taskObject = newTask;
        //     //this.getRecord();
        // },
        'loggedInUser.userId'(newVal, oldVal) {
            console.log(this.loggedInUser.userId);
        },
        'taskIdToBeViewed'(newVal, oldVal) {
            this.viewSubTask = false;
            this.showNewSubTaskForm = false;
            this.parentTaskName = null;
            this.taskObject.id = this.taskIdToBeViewed;
            this.getRecord();

            if (this.tabToDisplay !== null && this.tabToDisplay !== undefined) {
                this.displayTab(null, this.tabToDisplay);
            }
            return false;
        },
        'tabToDisplay'(newVal, oldVal) {

            if (this.tabToDisplay !== null && this.tabToDisplay !== undefined) {
                this.displayTab(null, this.tabToDisplay);
            }

        },
        '$route.params.taskId'(newTaskId, oldTaskId) {
            console.log('Task ID changed from ' + oldTaskId + ' to ' + newTaskId);

            if (newTaskId !== 'none') {
                this.viewSubTask = false;
                this.parentTaskName = null;
                this.taskId = newTaskId;
                this.taskObject.id = newTaskId;

                // Reset the tab-initializations if the selectedTask changes.
                // this.selectedTabKey = 'description';
                this.isActivityTabInitialized = false;
                this.isSubtasksTabInitialized = false;
                this.isChecklistsTabInitialized = false;
                this.isRemindersTabInitialized = false;
                this.isTransitionsTabInitialized = false;
                this.isFormsTabInitialized = false;
                this.isHooksTabInitialized = false;
                console.log("All Tabs initializations are reset. this.selectedTabKey is ", this.selectedTabKey);

                this.getRecord();
            }
        },
        '$route.params.subtaskId'(newSubTaskId, oldSubTaskId) {
            console.log('SubTask ID changed from ' + oldSubTaskId + ' to ' + newSubTaskId + ' in the task-view-ms.vue component.');

            if (newSubTaskId !== 'none') {
                this.parentTaskName = this.taskObject.sno;
                this.taskObject.id = newSubTaskId;
                UIkit.switcher(document.getElementById(this.embeddingViewName + '_switcherTabs')).show(0);
                this.viewSubTask = true;
                this.getRecord();
            }
        }
    }
};
</script>

<style scoped>
.scaleZero {
    transform: scale(0);
}

.uk-subnav-pill>.uk-active>a[data-v-5cb99e14] {
    border-bottom: 2px solid #4698f5 !important;
    color: #4698f5;
    background-color: #fff0 !important;
}

.task_details_container {
    display: grid;
    grid-template-rows: auto auto 1fr;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: hidden;
}

.task_details_container .task_title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #404040;
    padding: 10px;
    margin-left: 15px;
    padding: 0px;
    margin-left: 0px;
    z-index: 1;
}

.task_details_container .task_created_by {
    font-size: 0.65rem;
    font-weight: bold;
}

.task_details_container .task_created_on {
    font-size: 0.55rem;
    font-weight: bold;
}

.tab-bar>li {
    cursor: pointer;
    padding-left: 0px;
    transform-origin: center center;
    transition: 0.1s ease-in;
}

.tab-bar>li:hover:not(.active) {
    cursor: pointer;
    background-color: #f7f7f7;
    border-radius: 4px;
}

.tab-bar>li:active {
    transform: scale(0.95);
}

.tab-bar>li>a {
    display: flex;
    column-gap: 10px;
}

.tab-bar>li .tab_label {
    display: none;
}

.tab-bar>li.uk-active .tab_label {
    display: block !important;
}

.uk-subnav-pill>*>a {
    font-size: 0.55rem !important;
    border-radius: 0px;
    letter-spacing: 0.075rem;
}

.uk-subnav-pill>.uk-active>a {
    border-bottom: 2px solid #4698f5 !important;
    color: #4698f5;
    background-color: #fff !important;
}

.uk-input,
.uk-select:not([multiple]):not([size]) {
    height: 35px;
    vertical-align: middle;
    display: inline-block;
    background: #fbfbfb;
    border-radius: 3px;
}

.uk-grid-small>div {
    margin-bottom: 0px;
}

.uk-form-label {
    font-size: .5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.subtask-back-button {
    background-color: hsl(0deg 1% 72% / 18%);
    border-radius: 50%;
    place-self: center start;
    place-items: center;
    font-size: .65rem;
    line-height: 32px;
    font-weight: 400 !important;
    padding: 0 7px;
    fill: #0de60d;
    color: rgb(255 255 255);
    transition: .25s linear;
}

.subtask-back-button:hover {
    background-color: hsl(0deg 2% 8% / 10%);
}

.subtask-back-button>svg>path {
    background-color: rgb(232 232 232);
    fill: rgb(101 101 101);
}

.subtask-back-button:hover>svg>path {
    fill: rgb(60 60 60);
}

.updateTaskInfoTrigger {
    background: rgb(243 243 243);
    border-radius: 50%;
    padding: 3px;
    cursor: pointer;
    line-height: 0px;
}

.updateTaskInfoTrigger:hover {
    background: #e4e4e4;
}

.opened {
    opacity: 1;
}

.chat-context-menu-trigger {
    color: #6b6b6b;
    position: absolute;
    top: 10px;
    right: 5px;
    font-size: 1.5rem;
    transition: .15s linear;
    padding: 5px;
    border-radius: 50%;
}

.chat-context-menu-trigger:hover {
    cursor: pointer;
    /*color:rgb(240, 80, 110);*/
    transform: scale(1.05);
}

.chat-context-menu {
    display: none;
    position: absolute;
    top: 10px;
    right: 5px;
    font-size: 1.5rem;
    width: 100px;
    height: 150px;
    background-color: #fff;
}

.chat-context-menu-visible {
    display: grid;
}

.context-menu {
    display: none;
    position: absolute;
    right: 0px;
    top: 30px;
    background-color: #ffffff;
    border: 1px solid #cecece;
    border: 1px solid #cecece;
    border-radius: 3px;
    padding: 10px;
    z-index: 2;
    /*filter: drop-shadow(1px 2px 5px #cecece);*/
    color: #6b6b6b;

    display: grid;
    right: 0px;
    transform-origin: right top;
    opacity: 1;
    transform: scale(0);
    transition: 0.125s linear;
    min-width: 200px;
    font-size: 0.75rem;
    box-shadow: rgb(0 0 0 / 12%) 0px 2px 12px 0px;
}

.context-menu>div>div {
    padding: 5px;
    border-radius: 1px;
}

.context-menu>div>div:hover {
    /*background-color:#f0f0f0;
        cursor:pointer;*/
}

.sent-ctx-menu-trigger,
.recd-ctx-menu-trigger {
    padding: 5px;
    border-radius: 50%;
}

.recd-ctx-menu-trigger:hover {
    cursor: pointer;
    xbackground-color: #3269a9fa;
}

.sent-ctx-menu-trigger:hover {
    cursor: pointer;
    background-color: #f0f0f0;
}

.ctx-menu-trigger:active {
    transform: scale(0.85) !important;
}

/* Context sliding menu */

.menu_container {
    position: relative;
    width: 300px;
    height: 300px;
    box-sizing: border-boxX;
    overflow-x: hidden;
}

.menu_slider {
    position: absolute;
    display: flex;
    flex-direction: row;
    left: 0px;
    transition: 0.25s linear;
    width: 100%;
    box-sizing: border-box;
}

.menu {
    xbackground: yellow;
    display: flex;
    flex-direction: column;
    min-width: 100%;
    border: 0px solid red;
    box-sizing: border-box;
}

.submenu {
    xbackground: greenyellow;
    display: flex;
    flex-direction: column;
    min-width: 100%;
    border: 0px solid black;
    box-sizing: border-box;
    padding-top: 10px;
}

.menu_fixed_height {
    height: 250px;
    overflow-y: auto;
}

.submenu_container {
    display: flex;
    flex-direction: column;
    min-width: 100%;
}

.submenu_category {
    display: flex;
    flex-direction: column;
}

.menu>div,
.submenu>div>div {
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: left;
}

.menu>div:hover,
.submenu>div>div:hover {
    background-color: #f0f0f0;
    cursor: pointer;
}

.menu_container ul {
    list-style: none;
}

.menu_container li {
    line-height: 25px;
    list-style: none;
}

.list-item-menu {
    transition: 0.25s linear;
    background-color: rgb(243 243 243);
    border-radius: 50%;
    padding: 5px;
    transform-origin: 50% 50%;
}

.list-item-menu:hover {
    cursor: pointer;
    transform: rotate(90deg);
}
</style>
