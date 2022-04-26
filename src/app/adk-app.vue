<template>

    <div class="app-container" data-theme="default" style="position:relative">
      <div id="app-container" class="XXapp-container hide_reveal" style="width: 100% !important;display: flex;flex-direction: column;flex-grow: 9;overflow-y: hidden;" >
            <div class="app_theme activity_background"></div>

            <audio style="display:none" id="chatsound" src="/resources/audios/ding.wav" controls preload="auto" autobuffer></audio>
            <audio style="display:none" id="incoming_call_ringtone" src="/resources/audios/ding.wav" controls preload="auto" loop="" autobuffer></audio>

            <div  v-if="!loggedInUser.isInformationFetchComplete" style="display:grid;place-items:center;place-content:center;background-color:#333;color:whitesmoke"></div>
            <div  v-if="!loggedInUser.isInformationFetchComplete" style="display:grid;place-items:center;place-content:center;background-color:#333;color:whitesmoke">Loading User information..</div>
            <div  v-if="!loggedInUser.isInformationFetchComplete" style="display:grid;place-items:center;place-content:center;background-color:#333;color:whitesmoke"></div>

            <nav v-if="loggedInUser.isInformationFetchComplete" uk-navbar class="uk-navbar-container adk-mobile-navbar app-navbar"
            style="box-shadow: 0 0 4px rgb(0 0 0 / 22%), 0 4px 8px rgb(0 0 0 / 6%);z-index: 3;">

              <div class="uk-navbar-left">

                  <a class="uk-navbar-item" style="padding-right: 0px;padding-left: 25px;" v-on:click="toggleModuleMenu()">

                        <!-- <span v-if="isMobileDevice===true" id="menu_bar" class="uk-margin-small-right" style="color:rgb(79 79 79)" uk-icon="icon:menu;ratio:1.25"></span>
                        <span v-else-if="isMobileDevice===false" id="menu_bar" class="uk-margin-small-right ui-sidemenu-" style="color: rgb(79 79 79)" uk-icon="icon:menu"></span> -->

                        <svg v-show="!moduleMenuCollapsed" style="transition: 0.25s linear;" width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 16H17.3333V13.3333H0V16ZM0 9.33333H13.3333V6.66667H0V9.33333ZM0 0V2.66667H17.3333V0H0ZM24 12.7867L19.2267 8L24 3.21333L22.12 1.33333L15.4533 8L22.12 14.6667L24 12.7867Z" fill="#200E32" style="fill: #b9b9b9;"/>
                        </svg>
                        <svg v-show="moduleMenuCollapsed" width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotateY(180deg);transition: 0.25s linear;">
                              <path d="M0 16H17.3333V13.3333H0V16ZM0 9.33333H13.3333V6.66667H0V9.33333ZM0 0V2.66667H17.3333V0H0ZM24 12.7867L19.2267 8L24 3.21333L22.12 1.33333L15.4533 8L22.12 14.6667L24 12.7867Z" fill="#200E32" style="fill: #b9b9b9;"/>
                        </svg>


                  </a>

                  <a class="uk-navbar-item uk-logo" style="padding-left: 10px;" v-on:click="goToHomePage()">
                      <div style="display: grid;place-items: center;column-gap: 10px;grid-template-rows: auto auto;padding: 5px 10px 5px 0px;border-radius: 3px;margin-left: 25px;">
                          <div style="display: block;">
                            <img src="/resources/images/new_logo_1.svg" style="pointer-events: none;height: 25px;display: block;transform: scale(1);">
                          </div>
                          <!-- <div class="section_label" style="color: rgb(255, 255, 255) !important;font-family: Nunito;font-weight: bold;display: flex;column-gap: 1px;justify-content: center;align-items: flex-end;font-size: 0.55rem;">
                              <div style="user-select: none;color: rgb(122 122 122);padding: 0px 0px 0px 5px;border-radius: 2px;font-weight: bold;font-weight: normal;">{{loggedInUser.tenantName}}</div>
                          </div> -->
                      </div>
                  </a>

                  <div class="task_search_container" style="display:grid;grid-template-rows:1fr auto">
                    <div style="padding: 0px 10px 0px 20px;box-sizing: border-box;position: relative;display: flex;align-items: center;">
                        <span style="position: absolute;left: 30px;top: 10px;color: rgb(159, 159, 159);" uk-icon="icon:search;ratio:0.75"></span>
                        <input tabindex="1" id="taskSearchInput" autocomplete="off" placeholder="Search Tasks"
                                v-model="searchQuery"
                                v-on:keyup.enter="searchTasks($event, false, 'input.enter action')"
                                uk-tooltip="title:Ex. #87, Purchase Laptops..;pos:right"
                                type="text" class="uk-input task-search-input" style="border:0.5px solid #c1c1c112;border-radius: 20px;padding-left: 35px;background-color:#f0f0f0 !important;"/>
                        <span v-show="searchQuery !== ''" v-on:click="clearSearch()" title="Clear" uk-icon="icon:close;ratio:0.75" style="cursor:pointer;position: absolute;right: 30px;top: 10px;color: rgb(159, 159, 159);" class="uk-icon"></span>
                    </div>
                    <div v-if="!showAllResultsInModal && taskList.length > 0" class="auto-suggest-list" style="padding-bottom:5px;box-shadow: 2px 2px 4px rgb(0 0 0 / 12%), 2px 3px 8px rgb(0 0 0 / 0%);background-color: white;min-height: 200px;width:65%;position: absolute;top: 50px;z-index: 1000;border: 1px solid #cdcdcd;border-bottom-left-radius: 3px;border-bottom-right-radius: 3px;border-top: 0px;">
                      <template v-for="task in taskList">
                        <div class="matching-task" v-bind:data-task-id="task.id" v-on:click="viewTask(task.id)">
                          <div style="font-weight:bold">
                            <span v-if="task.isSent" style="font-weight:normal;color:gray">Sent - </span>
                            <span v-else-if="task.isAssigned" style="font-weight:normal;color:gray">Assigned - </span>
                            <span v-else-if="task.isFollowed" style="font-weight:normal;color:gray">Followed - </span>
                            <span >Task#{{task.sno}} - {{task.name}} </span>
                            <span style="font-weight:normal;color:gray"> [ {{task.priority}}, {{task.status}}, {{task.category}}]</span>
                          </div>
                          <div style="font-size: 0.65rem;">{{task.description}}</div>
                          <div style="font-size: 0.65rem;color:#b3b3b3">Assignees &#8594; {{task.assigneeListString}}</div>
                        </div>
                      </template>

                      <div class="matching-task view-all-matching-tasks-button" v-on:click="searchTasks($event, true, 'modal show mouse-click action')" v-show="taskListHasMoreMatchingItems" style="display: flex;flex-direction: column;font-size: 0.75rem;padding: 10px 10px 10px 10px;background: whitesmoke;">
                        <div style="font-weight: normal;cursor: pointer;color: #ababab;">Total matching results are {{taskListTotalMatchingItems}}, see all.</div>
                      </div>

                    </div>
                  </div>

                  <span v-on:click="goToHomePage()" class="app_home_icon uk-icon uk-margin-small-right" uk-icon="icon: home" style="color:#eeeeeeb0;cursor:pointer" title="Go to Home page"></span>

              </div>

              <div class="uk-navbar-right	" style="flex-grow: 1;justify-content: flex-end;">

                  <div class="uk-navbar-item">
                      <div style="color: #f5f5f5c2;font-family: raleway;"  class="welcome-font">
                        <div style="display: flex;flex-direction: row-reverse;justify-content: center;align-items: center;column-gap: 5px;">
                            <span v-if="loggedInUser.username.length < 5">Welcome, </span>
                            <span style="color: rgb(12 12 12);font-family: Nunito;">{{loggedInUser.username}}</span>
                            <div id="notification_rt_status" class="soc_disconnected sc" style="color: rgb(255, 255, 255);font-family: Nunito;width: 10px;height: 10px;border-radius: 50%;content: normal;"></div>
                        </div>
                        <div style="float: right;color: #ac9b9b;text-transform: uppercase;font-size: 0.45rem;letter-spacing: 0.05rem;">
                          {{loggedInUser.tenantName}}
                        </div>

                        <!-- <div style="float: right;">
                          <form id="loform" action="/logout" method="POST">
                            <a v-on:click="logoutFromHere()" style="color: rgb(37 139 254);" class="welcome-font taskone-logout">logout</a>
                          </form>
                        </div> -->
                      </div>
                      <div>
                          <div v-show="!isUserProfilePanelVisible" v-on:click="showUserProfilePanel()" id="user_profile_trigger" class="clickable-btn user_profile_trigger_inactive uk-button" style="color: white;user-select: none;margin-left:10px;padding: 0px;border-radius: 20px;line-height: inherit;">
                            <img class="uk-border-pill ui-navbar-profile-image"  v-bind:data-img-id="loggedInUser.userId" v-bind:src="'/api/us/profile/get/' + loggedInUser.userId"
                              onerror="this.onerror=null;this.src='resources/images/male_default_pic.png';" width="25" height="25"
                              style="border: 2px solid rgb(222 222 222); background: rgb(231, 237, 246); padding:0px; margin-left: 0px;"
                              alt="Border pill">
                          </div>
                          <div v-show="isUserProfilePanelVisible" v-on:click="hideUserProfilePanel()" id="user_profile_trigger_hide" class="clickable-btn user_profile_trigger_inactive uk-button" style="color: white;user-select: none;margin-left:10px;padding: 0px;border-radius: 20px;line-height: inherit;">
                            <img class="uk-border-pill ui-navbar-profile-image" v-bind:data-img-id="loggedInUser.userId" v-bind:src="'/api/us/profile/get/' + loggedInUser.userId"
                              onerror="this.onerror=null;this.src='resources/images/male_default_pic.png';" width="25" height="25"
                              style="border: 2px solid rgb(222 222 222); background: rgb(231, 237, 246); padding:0px; margin-left: 0px;"
                              alt="Border pill">
                          </div>
                    	</div>
                      <div style="position: relative;padding: 0 10px;">

                            <audio style="display:none" id="notification_sound" src="resources/audios/DING.WAV" controls preload="auto" autobuffer></audio>
                            <div v-show="!isNotificationsPanelVisible" v-on:click="showNotificationsPanel()" id="notification_trigger" class="clickable-btn notification_trigger_inactive uk-button" style="color: white;user-select: none;">
                                <svg width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block;fill:#2196f3;">
                                  <g class="style-scope yt-icon">
                                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" class="style-scope yt-icon">
                                    </path>
                                  </g>
                                </svg>
                            </div>
                            <div v-show="isNotificationsPanelVisible" v-on:click="hideNotificationsPanel()" id="notification_trigger" class="clickable-btn notification_trigger_inactive uk-button" style="color: white;user-select: none;">
                                <svg width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block;fill:#2196f3;">
                                  <g class="style-scope yt-icon">
                                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" class="style-scope yt-icon">
                                    </path>
                                  </g>
                                </svg>
                            </div>
                            <span v-show="newNotificationsCounter > 0" style="user-select: none;position: absolute;background: red;color: white;font-size: 0.65rem;padding: 5px;border-radius: 3px;top: 0px;right: 0px;max-width: 15px;height: 15px;text-align: center;">{{newNotificationsCounter}}</span>

                      </div>
                      <!--
                      <div style="position: relative;padding: 0 0px;">
                          <span uk-icon="grid"  v-on:click="toggleAppsPanel()" id="apps_trigger"  class="clickable-btn apps_trigger_inactive uk-button uk-icon" style="padding: 0px 9px;border-radius: 3px;"></span>
                      </div>
                      -->
                  </div>
              </div>
            </nav>

            <div style="display: flex;grid-template-columns: auto auto 1fr;z-index: 2;overflow-y: hidden;flex-grow: 1;">

                <div id="appModuleMenu" class="app-module-menu xisClosed" style="background:rgb(255, 255, 255, 0.65);xpadding-top: 50px;xpadding-bottom: 50px;display: flex;flex-direction:column">
                    <div id="appModuleMenuContent1" class="app-module-menu-content app-modules xisClosed" style="min-width: 65px;background:#fff0;flex-grow:1;box-sizing: border-box;row-gap: 10px;flex-direction: column;justify-content: center;border-right: 1px solid rgb(230, 230, 230);">


                      <div  v-on:click="loadComponent('home')" id="home-module" class="app-modules-active" style=";user-select:none;display: flex;align-items: center;flex-direction: column;font-size: 0.65rem;gap: 5px;">
                          <div style="transform: scale(0.85);border: 3px solid rgb(230 230 230);background: rgb(234 234 234);border-radius: 50%;position: relative;padding:5px;display: flex;">
                            <div style="transform: scale(0.75);border: 2px solid currentColor;border-radius: 50%;position: relative;padding: 0px;display: flex;">
                              <span uk-icon="check" class="uk-icon" style="transform: scale(1);border-radius: 50%;">
                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check">
                                  <polyline fill="none" stroke="#000" stroke-width="3" points="4,10 8,15 25,-5" style="stroke: currentColor;stroke-width: 2;"></polyline>
                                </svg>
                              </span>
                            </div>
                          </div>
                          <div style="transform: scale(0.85);text-transform: uppercase;font-size: 0.45rem;letter-spacing: 1px;font-weight: bold;user-select:none">Tasks</div>
                      </div>
                      <!--
                      <div v-on:click="switchApp('channels')" id="channels_module" style="user-select:none;display: flex;align-items: center;flex-direction: column;font-size: 0.65rem;gap: 5px;">
                          <div style="border: 3px solid rgb(230 230 230);background: rgb(234 234 234);border-radius: 50%;position: relative;padding:7px;display: flex;">
                            <span uk-icon="rss" class="uk-icon" style="transform: scale(0.75);"></span>
                          </div>
                          <div style="text-transform: uppercase;font-size: 0.45rem;letter-spacing: 1px;text-align: center;;user-select:none">Channels</div>
                      </div>
                      -->
                      <div v-on:click="loadComponent('calendar-component')" id="calendar-component-module"  vv-on:click="switchApp('calendar')" style="user-select:none;display: flex;align-items: center;flex-direction: column;font-size: 0.65rem;gap: 5px;">
                          <div style="transform: scale(0.85);border: 3px solid rgb(230 230 230);background: rgb(234 234 234);border-radius: 50%;position: relative;padding:7px;display: flex;">
                            <span uk-icon="calendar" class="uk-icon" style="transform: scale(0.75);"></span>
                          </div>
                          <div style="transform: scale(0.85);text-transform: uppercase;font-size: 0.45rem;letter-spacing: 1px;;user-select:none">Calendar</div>
                      </div>
                      <div v-on:click="loadComponent('task-activity-channel')" id="task-activity-channel-module" style="user-select:none;display: flex;align-items: center;flex-direction: column;font-size: 0.65rem;gap: 5px;">
                          <div style="transform: scale(0.85);border: 3px solid rgb(230 230 230);background: rgb(234 234 234);border-radius: 50%;position: relative;padding:7px;display: flex;">
                            <span uk-icon="rss" class="uk-icon" style="transform: scale(0.75);"></span>
                          </div>
                          <div style="transform: scale(0.85);text-transform: uppercase;font-size: 0.45rem;letter-spacing: 1px;text-align: center;;user-select:none">Channels</div>
                      </div>
                      <div v-on:click="loadComponent('chat-component')" id="chat-component-module" xv-on:clickPrev="signalShowChat('chat_menu')" style="user-select:none;display: flex;align-items: center;flex-direction: column;font-size: 0.65rem;gap: 5px;">
                          <div style="transform: scale(0.85);border: 3px solid rgb(230 230 230);background: rgb(234 234 234);border-radius: 50%;position: relative;padding: 10px;display: flex;">
                            <span class="lnr lnr-bubble" style="transform: scale(1.25);"></span>
                            <span v-if="numberOfUnreadChats > 0" style="user-select: none;position: absolute;background: #f44336;color: white;font-size: 0.65rem;padding: 5px;border-radius: 3px;top: 0px;right: -15px;max-width: 15px;height: 15px;text-align: center;">{{numberOfUnreadChats}}</span>
                          </div>
                          <div style="transform: scale(0.85);text-transform: uppercase;font-size: 0.45rem;letter-spacing: 1px;;user-select:none">Chat</div>
                      </div>
                      <div v-on:click="loadComponent('reports-component')" id="reports-component-module" xv-on:clickPrev="signalShowChat('chat_menu')" style="user-select:none;display: flex;align-items: center;flex-direction: column;font-size: 0.65rem;gap: 5px;">
                          <div style="transform: scale(0.85);border: 3px solid rgb(230 230 230);background: rgb(234 234 234);border-radius: 50%;position: relative;padding: 10px;display: flex;">
                            <span class="lnr lnr-chart-bars" style="transform: scale(1.25);"></span>
                          </div>
                          <div style="transform: scale(0.85);text-transform: uppercase;font-size: 0.45rem;letter-spacing: 1px;;user-select:none">Reports</div>
                      </div>
                      <div v-on:click="loadComponent('dashboard-component')" id="dashboard-component-module" xv-on:clickPrev="signalShowChat('chat_menu')" style="user-select:none;display: flex;align-items: center;flex-direction: column;font-size: 0.65rem;gap: 5px;">
                          <div style="transform: scale(0.85);border: 3px solid rgb(230 230 230);background: rgb(234 234 234);border-radius: 50%;position: relative;padding: 10px;display: flex;">
                            <span class="lnr lnr-pie-chart" style="transform: scale(1.25);"></span>
                          </div>
                          <div style="transform: scale(0.85);text-transform: uppercase;font-size: 0.45rem;letter-spacing: 1px;;user-select:none">Dashboard</div>
                      </div>

                      <!--
                      <div v-on:click="loadComponent('dev-chat-component')" id="dev-chat-component-module" xv-on:xclickPrev="signalShowChat('chat_menu')" style="user-select:none;display: flex;align-items: center;flex-direction: column;font-size: 0.65rem;gap: 5px;">
                          <div style="border: 3px solid rgb(230 230 230);background: rgb(234 234 234);border-radius: 50%;position: relative;padding: 10px;display: flex;">
                            <span class="lnr lnr-bubble" style="transform: scale(1.25);"></span>
                          </div>
                          <div style="text-transform: uppercase;font-size: 0.45rem;letter-spacing: 1px;;user-select:none">DevChat</div>
                      </div>
                      <div v-on:click="testComlink()" id="test-comlink-module" xv-on:xclickPrev="signalShowChat('chat_menu')" style="user-select:none;display: flex;align-items: center;flex-direction: column;font-size: 0.65rem;gap: 5px;">
                          <div style="border: 3px solid rgb(230 230 230);background: rgb(234 234 234);border-radius: 50%;position: relative;padding: 10px;display: flex;">
                            <span class="lnr lnr-bubble" style="transform: scale(1.25);"></span>
                          </div>
                          <div style="text-transform: uppercase;font-size: 0.45rem;letter-spacing: 1px;;user-select:none">Comlink</div>
                      </div>

                      <div v-on:click="switchApp('businessbench')" id="businessbench-component-module" style="user-select:none;display: flex;align-items: center;flex-direction: column;font-size: 0.65rem;gap: 5px;">
                          <div style="border: 3px solid rgb(230 230 230);background: rgb(234 234 234);border-radius: 50%;position: relative;padding:7px;display: flex;">
                            <span uk-icon="world" class="uk-icon" style="transform: scale(0.75);"></span>
                          </div>
                          <div style="text-transform: uppercase;font-size: 0.45rem;letter-spacing: 1px;text-align: center;;user-select:none">Business Bench</div>
                      </div>
                      <div v-on:click="switchApp('dashboard')"  id="dashboard-module"  style="user-select:none;display: flex;align-items: center;flex-direction: column;font-size: 0.65rem;gap: 5px;">
                          <div style="border: 3px solid rgb(230 230 230);background: rgb(234 234 234);border-radius: 50%;position: relative;padding: 10px;display: flex;">
                            <span class="lnr lnr-laptop" style="transform: scale(1.25);"></span>
                          </div>
                          <div style="text-transform: uppercase;font-size: 0.45rem;letter-spacing: 1px;;user-select:none">Dashboard</div>
                      </div>
                    -->
                    </div>
                    <div id="appModuleMenuContent2" class="app-module-menu-content app-modules xisClosed" style="min-width: 65px;background: rgb(252, 252, 252);box-sizing: border-box;row-gap: 20px;flex-direction: column;justify-content: center;border-right: 1px solid rgb(230, 230, 230);">
                      <div v-on:click="loadComponent('my-settings')" id="my-settings-module" style="user-select:none;display: flex;align-items: center;flex-direction: column;font-size: 0.65rem;gap: 5px;">
                          <div style="transform: scale(0.85);border: 3px solid rgb(230 230 230);background: rgb(234 234 234);border-radius: 50%;position: relative;padding:7px;display: flex;">
                            <span uk-icon="cog" class="uk-icon" style="transform: scale(0.75);"></span>
                          </div>
                          <div style="transform: scale(0.85);text-transform: uppercase;font-size: 0.45rem;letter-spacing: 1px;text-align: center;">Settings</div>
                      </div>
                    </div>
                    <!-- <div id="appModuleMenuContent2" class="app-module-menu-content app-modules xisClosed" style="min-width: 65px;background: rgb(252, 252, 252);box-sizing: border-box;row-gap: 20px;flex-direction: column;justify-content: center;border-right: 1px solid rgb(230, 230, 230);">
                      <div v-on:click="switchApp('settings')" style="user-select:none;display: flex;align-items: center;flex-direction: column;font-size: 0.65rem;gap: 5px;">
                          <div style="transform: scale(0.85);border: 3px solid rgb(230 230 230);background: rgb(234 234 234);border-radius: 50%;position: relative;padding:7px;display: flex;">
                            <span uk-icon="cog" class="uk-icon" style="transform: scale(0.75);"></span>
                          </div>
                          <div style="transform: scale(0.85);text-transform: uppercase;font-size: 0.45rem;letter-spacing: 1px;text-align: center;">Settings</div>
                      </div>
                    </div> -->
                </div>
                <div id="appContainer" class="app-container-div">
                    <div id="notificationsPanel" v-show="isNotificationsPanelVisible"  class="notifications_panel xhide_notification_panel" style="display:flex">
                        <notification-panel></notification-panel>
                    </div>
                    <div id="userProfilePanel" v-show="isUserProfilePanelVisible" class="user_profile_panel xhide_user_profile_panel" style="display:flex">
                        <user-profile-panel v-bind:loggedInUser="loggedInUser" v-on:logoutFromHere="logoutFromHere()"></user-profile-panel>
                    </div>

                    <div v-show="!isTaskView" class="keepalive-dynamic-component-tag-div" style="display:flex;width:100%;height:100%;overflow-y:hidden">
                      <keep-alive>
                        <component v-bind:is="currentTabComponent" v-bind:loggedInUser="loggedInUser"></component>
                      </keep-alive>
                    </div>

                    <div v-show="isTaskView" class="router-view-div" style="display:flex;width:100%;height:100%;overflow-y:hidden">
                      <router-view v-if="loggedInUser.isInformationFetchComplete" v-bind:loggedInUser="loggedInUser"></router-view>
                    </div>

                    <!--
                      :key="$route.fullPath"
                    <router-view v-slot="{ Component }">
                      <keep-alive include="['TaskInbox']">
                        <component :is="Component" />
                      </keep-alive>
                    </router-view>

                    <keep-alive  max="5" include="Calendar,ChatBook">
                    </keep-alive>

                    <router-view v-slot="{ Component }" :key="$route.fullPath" v-bind:loggedInUser="loggedInUser">
                       <template v-if="Component.name==='Calendar' || Component.name==='ChatBook'  || Component.name==='TaskInbox' ">
                          <keep-alive include="Calendar,ChatBook">
                            <component :is="Component" :key="$route.fullPath"/>
                          </keep-alive>
                       </template>
                      <template v-else>
                           <component :is="Component" :key="$route.fullPath"/>
                      </template>
                    </router-view>
                    -->
                </div>
            </div>
            <!--
            <div v-if="loggedInUser.isInformationFetchComplete"  class="app_footer">
                <div class="control_bar_buttons" style="float: right;padding-right: 10px;place-self: center end;color: #fff;">Task<span style="color: #23a9ec;">One</span><span style="color: #fff;"> apps</span></div></div>
            </div>
            -->

            <audio style="display:none" id="new_activity_notification_sound" src="resources/audios/new_activity_notification.mp3" controls preload="auto" autobuffer></audio>
            <audio style="display:none" id="new_chat_notification_sound" src="resources/audios/chat2.mp3" controls preload="auto" autobuffer></audio>

            <div class="activity_item_context_menu" style="z-index:100000">
                <ul>
                    <li class="activity_item_context_menu_action" v-on:click="sendActivityContextMenuClickedEvent('reply')">
                        <!-- <span uk-tooltip="Reply to this activity" style="cursor: pointer;" title="" aria-expanded="false" >
                          <svg width="15" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                            <path style="fill:rgb(88 88 88);cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                          </svg>
                        </span> -->
                        <span> Reply to this activity </span>
                    </li>
                    <li class="activity_item_context_menu_action cancel_comment_option hide_display" v-on:click="sendActivityContextMenuClickedEvent('withdraw_comment')">
                        <!--
                            This must only be visible if the activity is of type[comment] and addedBy[loggedInUser]
                            Enable by default and hide it in the menuOpening logic code.
                            i.e Since every action item in this context menu is dependent on the activity-item's data
                                and the user logged in, these action items must have appropriate classes to be identified
                                and shown/hidden based on the logics.
                        -->
                        <!-- <span uk-tooltip="Withdraw this comment" style="cursor: pointer;" title="" aria-expanded="false" >
                          <svg width="15" height="15" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <circle fill="none" stroke="rgb(88 88 88)" stroke-width="1.1" cx="10" cy="10" r="9"></circle>
                              <line fill="none" stroke="rgb(88 88 88)" stroke-width="1.1" x1="4" y1="3.5" x2="16" y2="16.5"></line>
                          </svg>
                        </span> -->
                        <span> Cancel comment </span>
                    </li>
                </ul>
            </div>

            <div class="channel_activity_item_context_menu">
                <ul>
                    <li class="activity_item_context_menu_action" v-on:click="sendChannelActivityContextMenuClickedEvent('reply')">
                        <!-- <span uk-tooltip="Reply to this activity" style="cursor: pointer;" title="" aria-expanded="false" >
                          <svg width="15" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                            <path style="fill:rgb(88 88 88);cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                          </svg>
                        </span> -->
                        <span> Reply to this activity </span>
                    </li>
                    <li class="activity_item_context_menu_action" v-on:click="sendChannelActivityContextMenuClickedEvent('view_task')">
                        <!-- <span uk-tooltip="Reply to this activity" style="cursor: pointer;" title="" aria-expanded="false" >
                          <svg width="15" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                            <path style="fill:rgb(88 88 88);cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                          </svg>
                        </span> -->
                        <span> View Task </span>
                    </li>
                    <li class="activity_item_context_menu_action cancel_comment_option hide_display" v-on:click="sendChannelActivityContextMenuClickedEvent('withdraw_comment')">
                        <!--
                            This must only be visible if the activity is of type[comment] and addedBy[loggedInUser]
                            Enable by default and hide it in the menuOpening logic code.
                            i.e Since every action item in this context menu is dependent on the activity-item's data
                                and the user logged in, these action items must have appropriate classes to be identified
                                and shown/hidden based on the logics.
                        -->
                        <!-- <span uk-tooltip="Withdraw this comment" style="cursor: pointer;" title="" aria-expanded="false" >
                          <svg width="15" height="15" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <circle fill="none" stroke="rgb(88 88 88)" stroke-width="1.1" cx="10" cy="10" r="9"></circle>
                              <line fill="none" stroke="rgb(88 88 88)" stroke-width="1.1" x1="4" y1="3.5" x2="16" y2="16.5"></line>
                          </svg>
                        </span> -->
                        <span> Cancel comment </span>
                    </li>
                </ul>
            </div>

            <!-- <div class="chat_msg_item_context_menu">
                <ul>
                    <li class="chat_msg_item_context_menu_action" v-on:click="sendChatMessageContextMenuClickedEvent('reply')">
                        <span> Reply </span>
                    </li>
                    <li class="chat_msg_item_context_menu_action" v-on:click="sendChatMessageContextMenuClickedEvent('reply_privately')">
                        <span> Reply privately</span>
                    </li>
                    <li class="chat_msg_item_context_menu_action" v-on:click="sendChatMessageContextMenuClickedEvent('convert_to_task')">
                        <span>Convert to Task</span>
                    </li>
                </ul>
            </div> -->

            <div class="chat_conversations_context_menu"></div>
            <div class="chat_msg_item_context_menu"></div>
      </div>
      <div id="loading_spinner" style="display: flex;opacity:1;transition:0.25s linear;position:absolute;top:0px;right:0px;left:0px;bottom:0px;align-items:center;justify-content:center;z-index: 2;">
          <div class="spinner-2" style="box-shadow: rgb(0 0 0 / 18%) 5px 5px 12px 0px;"></div>
      </div>

      <div id="view-matching-tasks-modal" class="uk-flex-top" uk-modal>
         <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="width: 60%;font-size: 0.65rem;padding: 35px;">
             <button class="uk-modal-close-default" type="button" uk-close></button>

             <div style="padding: 10px 0px;font-size: 0.75rem;">Matching tasks are {{taskList.length}}.</div>
             <div  v-show="taskList.length>0"  class="matching_row" style="background: #f2f2f2;border: 1px solid transparent;border-bottom: 0px;text-transform: uppercase;font-size: 0.55rem;">
                 <div style=";justify-self: end">Task No.</div>
                 <div >Title</div>
                 <div  style="color: rgb(51, 51, 51);justify-self: end;padding-right:10px">Priority</div>
                 <div  style="color: rgb(51, 51, 51);justify-self: end;padding-right:10px">Due Date</div>
                 <div  style="color: rgb(51, 51, 51);">Status</div>
             </div>
             <div v-show="taskList.length>0"  class="subtasks_box">
                 <template v-for="subtask in taskList">
                     <div class="matching_row">
                       <div style="font-weight:normal;justify-self: end;align-self: center;">
                         <a v-on:click="viewTask(subtask.id)">#{{subtask.sno}}</a>
                       </div>
                       <div v-on:click="viewTask(subtask.id)" style="cursor:pointer;align-self: center;">{{subtask.name}}</div>
                       <div style=";align-self: center;">{{subtask.priority}}</div>
                       <div style="color:#333;justify-self: end;padding-right:10px;align-self: center;">{{subtask.dueDateInLocalFormat}}</div>
                       <div>
                           <span style=";align-self: center;color: rgb(46 166 253);text-transform: uppercase;font-size: 0.6rem;letter-spacing: 0.5px;">{{subtask.status}}</span>
                       </div>
                     </div>
                 </template>
             </div>
         </div>
    </div>
    </div>
</template>

<script>

  import { defineAsyncComponent } from 'vue';
  import { bus } from './../main.js';
  import userMixinLib from './mixins/lib/user_mixin_lib';
  import utilsMixinLib from './mixins/lib/utils_lib';
  import rsocket from './mixins/lib/rsocket';
  import ComponentA from './../app/modules/test/component-a.vue';
  import ComponentB from './../app/modules/test/component-b.vue';

  import TaskActivityChannel from './../app/modules/channels/task-activity-channel.vue';
  import ChatBook from './../app/modules/chat/chat-book.vue';
  import Calendar from './../app/modules/calendar/calendar.vue';
  import ReportsComponent from './../app/modules/reports/home-page.vue';
  import MySettingsComponent from './../app/modules/user-profile/my-settings.vue';


  import DevChatComponent from './../app/modules/devchat/socket-test.vue';
  import * as Comlink from "comlink";

  // const Dashboard = defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ './../app/modules/dashboard/dashboard.vue'));
  import Dashboard from './../app/modules/dashboard/dashboard-new.vue';

  export default {

  mixins: [userMixinLib, utilsMixinLib, rsocket],
  name: 'app',
  data: function () {
    return {
      searchQuery: "",
      isTaskView: true,
      dynamicComponent: 'ComponentA',
      currentTabComponent: ComponentA,
      isChatViewOn: false,
      loggedInUser: {
        isInformationFetchComplete: false
      },
      isLoggingOut: false,
      isOnline: false,
      toggleOnlineText: 'OFFLINE',
      toggleOnlineCommandText: 'Go Online.',
      chatImage: './files/displayPicture-ff8081813a3a5174013a3a8d71c40002.png',
      hasProfileImage: true,
      uploadedPicId: '',
      showMenu1: false,
      showMenu2: false,
      showMenu3: false,
      isMobileDevice: false,
      resizeTimeout: null,
      notificationsSocket: null,
      notificationSocketReconnectionAttemptCount: 0,

      rsocket: {
        socket: null // This will be populated with the connected socket from the 'connected-rsocket' bus event listener.
      },
      rsocketConnectedNotificationDisplayed: false,
      rsocketDisconnectedNotificationDisplayed: false,
      newNotificationsCounter: 0,

      isUserProfilePanelVisible: false,
      isNotificationsPanelVisible: false,

      numberOfUnreadChats: 0,
      taskList: [],
      taskListTotalMatchingItems: 0,
      taskListHasMoreMatchingItems: false,
      showAllResultsInModal: false,
      currentlyHighlightedMatchingItemIndex: -1,
      moduleMenuCollapsed: false
    };
  },
  mounted: async function () {


    try {


      console.log(process.env);

      // console.log(this.$router.history.current.path);
      console.log(this.$route.path);

      // console.log("adk-app.vue mounted.");

      /* December 5, 2020

          This code is very important. The data declared and assigned within mixins is not reflected reactively to other
          components that import the mixin. So even if the socket is initialzed within the mixin, it needs to be broadcasted to other components
          which wants to use it in its business logic.

          For example, in task-inbox.vue, it uses the rsocket to set the category-channel-id for receiving activity updates.
          In this component, if we don't listen to the bus event ('connected-rsocket') and assign the connected socket,
          the below function 'connectToNotificationSocket' will throw an error as 'socket is null'.

          Hence this assignment in every component is very important and mandatory.
          */
      bus.on('connected-rsocket', (socket) => {
        console.log('connected-rsocket signal received over bus in adk-app.vue');
        this.rsocket.socket = socket;
      });

      bus.on('new-chat-notification', (data) => {
          if (this.numberOfUnreadChats > 10) {
            this.numberOfUnreadChats = '10+';
          } else {
            this.numberOfUnreadChats += 1;
          }
      });

      // Incomplete
      bus.on('new-chat-notification-read', (data) => {

          if (this.numberOfUnreadChats > 10) {
            this.numberOfUnreadChats = '10+';
          } else {
            this.numberOfUnreadChats -= 1;
          }
      });

      // Increment the Notification Label Count
      bus.on('new-notification', (data) => {

        if (this.newNotificationsCounter > 10) {
          this.newNotificationsCounter = '10+';
        } else {
          this.newNotificationsCounter += 1;
        }

        var thissound = document.getElementById('notification_sound');
        thissound.volume = 1;
        thissound.play();
      });

      // Decrement the Notification Label Count when the notification is opened/expanded.
      bus.on('new-notification-read', (data) => {

        if (this.newNotificationsCounter > 0) {
          this.newNotificationsCounter -= 1;
        }

        if (this.newNotificationsCounter > 10) {
          this.newNotificationsCounter = '10+';
        }
      });

      // Receive the chat-message from chat-page.vue component and send it to the server via rsocket.
      bus.on('send-chat-msg-to-server', (data) => {
        this.sendChatMessageToServer(data);
      });

      const sessionInformationResult = await this.getSessionInformation();

      if (sessionInformationResult === 'resolved') {

          const rsocketConnectionResult = await this.connectToRSocket();
          console.log('rsocket-conn : ', rsocketConnectionResult);

          if (rsocketConnectionResult === 'rsocket-connected') {
            if (document.querySelector('#notification_rt_status') !== null)
            { document.querySelector('#notification_rt_status').classList.remove('soc_disconnected'); }

            if (document.querySelector('#notification_rt_status') !== null)
            { document.querySelector('#notification_rt_status').classList.add('soc_connected'); }
          }
          this.connectToNotificationSocket();

          const checkSocketStatus = (socket) => socket.availability();
          setInterval(async () => {

            const socketAvailability = checkSocketStatus(this.rsocket.socket);

            if (socketAvailability === 0) {

              console.error('Looks like the socket connection is closed. Retrying to connect.');

              if (!this.rsocketDisconnectedNotificationDisplayed) {
                UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span> Disconnected from server.", {
                  status: 'danger',
                  pos: 'bottom-left',
                  timeout: 5000
                });
                this.rsocketDisconnectedNotificationDisplayed = true;
                this.rsocketConnectedNotificationDisplayed = false; // Only if this is set to false, its if condition will become true when connected again.
              }

              if (document.querySelector('#notification_rt_status') !== null) {
                document.querySelector('#notification_rt_status').classList.add('soc_disconnected');
              }

              if (document.querySelector('#notification_rt_status') !== null) {
                document.querySelector('#notification_rt_status').classList.remove('soc_connected');
              }

              // Retry connection code to be written here..
              const rsocketConnectionResult = await this.connectToRSocket();
              console.log('rsocket-conn after reattempt : ', rsocketConnectionResult);

              // Once socket connection is restored, connect to the NotificationSocket for receiving regular heartbeats.
              if (rsocketConnectionResult.trim() === 'rsocket-connected.') {
                console.log('Connecting to notification-realtime');
                this.connectToNotificationSocket();
              }
            } else if (socketAvailability === 1) {

              if (!this.rsocketConnectedNotificationDisplayed) {
                UIkit.notification(`<div class="taskone-notification">
                                                 <span uk-icon="icon: link;ratio:1"></span>
                                                 <div> Connected to server. </div>
                                             </div>`, {
                  status: 'success',
                  pos: 'bottom-left',
                  timeout: 5000
                });
                this.rsocketConnectedNotificationDisplayed = true;
                this.rsocketDisconnectedNotificationDisplayed = false; // Only if this is set to false, its if condition will become true when disconnected again.
              }

              if (document.querySelector('#notification_rt_status') !== null) {
                document.querySelector('#notification_rt_status').classList.remove('soc_disconnected');
              }

              if (document.querySelector('#notification_rt_status') !== null) {
                document.querySelector('#notification_rt_status').classList.add('soc_connected');
              }
            }
          }, 5000);

          // Frequent Data Caching APIs
          const result2 = await this.fetchDefaultCategoryForCaching();
          console.log('Tenant defaults ', result2);

          const result = await this.fetchCustomersForCaching();
          console.log('Customers fetch result', result);

          const result3 = await this.fetchCustomerBranchesForCaching();
          console.log('Customer Branches fetch result', result3);
      }


    }
    catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      document.querySelector("#loading_spinner").classList.add('hide_reveal');
      document.querySelector("#loading_spinner").style.display = "none";
      document.querySelector("#app-container").classList.remove("hide_reveal");
    }, 120);
  },
  computed: {
    currentRouteName () {
      return this.$route.name;
    }
  },
  methods: {

    viewTask (taskId) {

      bus.emit('viewSubTaskEvent', {
        subTaskId: taskId,
        modalKey: "view_sub_task"
      });
      return false;
    },
    clearSearch () {


      // display the results container.
      this.searchQuery = "";
      this.taskList = [];
      this.taskListHasMoreMatchingItems = false;
      this.taskListTotalMatchingItems = 0;
    },
    searchTasks (evt, showAllResultsInModal, firesource) {

      // evt.stopPropagation();
      // evt.preventDefault();


      if (!showAllResultsInModal) {
        showAllResultsInModal = false;
        this.showAllResultsInModal = false;
      }
      else {
        this.showAllResultsInModal = true;
      }

      let searchQueryFinal = this.searchQuery;

      if (searchQueryFinal.trim() === "") {
        searchQueryFinal = "all";
      }

      let isTaskNumberSearch = false;
      if (searchQueryFinal.startsWith("#")) {

        const strippedTaskNumber = searchQueryFinal.substring(1);
        const isValidTaskNumber = parseInt(strippedTaskNumber);

        // If its a valid number
        if (!isNaN(isValidTaskNumber)) {
          isTaskNumberSearch = true;
          searchQueryFinal = strippedTaskNumber; // Replace the number without #
        }
      }

      const searchURL = `./tasks/search/${searchQueryFinal}/${showAllResultsInModal}/${isTaskNumberSearch}`;

      // Attempting to use Comlink Worker
          const callbackFunction = (dataResponse) => {

            // display the results container.
            const el = document.querySelector(".auto-suggest-list");
            if (el) {
              el.style.display = null;
            }
            this.taskList = [];
            this.taskListHasMoreMatchingItems = false;
            this.taskListTotalMatchingItems = 0;

            dataResponse.data = dataResponse;

            if (dataResponse.data !== null) {

              const listOfTasks = (dataResponse.data.list);// .slice(0, 10);

              if (dataResponse.data.totalMatchingResults > dataResponse.data.totalDisplayedResults) {
                this.taskListHasMoreMatchingItems = true;
                this.taskListTotalMatchingItems = dataResponse.data.totalMatchingResults;
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

                  task["dueDateInLocalFormat"] = this.convertUTCDateFromServerToLocalDateForDisplayAsDateOnly(task.dueDateTime);

                }

                if (task.isOnline !== null && task.isOnline === 1) {
                  task.isOnline = 'LIVE';
                }

                if (task.createdBy !== null) {
                  task.createdById = task.createdBy.split('#')[0];
                  task.createdByName = task.createdBy.split('#')[1];
                }

                const assigneeListString = '';
                if (task.assignees !== null) {
                  const assigneeNames = [];
                  task.assignees.forEach((assignee) => {
                    assigneeNames.push(assignee.label);
                  });
                  task.assigneeListString = assigneeNames.join(", ");
                }

                // To prevent null error in vue-render if the "assigneeIds" prop is null
                if (task.assigneeIds === null) { task.assigneeIds = []; }

                // To prevent null error in vue-render if the "assigneeIds" prop is null
                if (task.followeIds === null) { task.followeIds = []; }

                // To prevent null error in vue-render if the "subTaskIds" prop is null
                if (task.subTaskIds === null) { task.subTaskIds = []; }

                this.taskList.push(task);
              });


              if (showAllResultsInModal) {
                UIkit.modal(document.querySelector("#view-matching-tasks-modal")).show();
              }



              document.querySelector('body').addEventListener('click', this.handleClickEventOnBody, false);
              document.querySelector('body').addEventListener('keydown', this.handleKeyPress, true);



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
              await ComlinkWorker.fetch(process.env.VUE_APP_API_URL + searchURL,
                                         Comlink.proxy(callbackFunction),
                                         Comlink.proxy(callbackError));
          }

          sendTaskToWorker();

          // setTimeout(() => {
          //   document.querySelector("#tasklist_loading_spinner").classList.remove('hide_reveal');
          //   document.querySelector("#tasklist_loading_spinner").style.display = "flex";
          //   // document.querySelector("#tasklist").classList.add("hide_reveal");
          // }, 500);
          // return false;
      // Comlink worker ends here

    },
    handleKeyPress (event) {

      const matchingTasksLength = document.querySelectorAll('.matching-task').length;

      if (event.key === 'ArrowDown') {

        ++this.currentlyHighlightedMatchingItemIndex;

        if (this.currentlyHighlightedMatchingItemIndex >= matchingTasksLength) {
          this.currentlyHighlightedMatchingItemIndex = 0;
        }

        // console.log("currently highlighted_searched_task item is at " + this.currentlyHighlightedMatchingItemIndex);
      } else if (event.key === 'ArrowUp') {

        --this.currentlyHighlightedMatchingItemIndex;

        if (this.currentlyHighlightedMatchingItemIndex < 0) {
          this.currentlyHighlightedMatchingItemIndex = matchingTasksLength;
        }

        // console.log("currently highlighted_searched_task item is at " + this.currentlyHighlightedMatchingItemIndex);
      }
      else if (event.key === 'Enter') {
        this.handleMatchingTaskOnEnterKeyPress(event);
      }

      // Reset Highlighted option
      document.querySelectorAll('.matching-task').forEach(item => item.classList.remove('highlighted_searched_task'));

      // Add the highlighted_searched_task class to the option div.
      document.querySelectorAll('.matching-task')[this.currentlyHighlightedMatchingItemIndex].classList.add('highlighted_searched_task');
    },
    handleMatchingTaskOnEnterKeyPress (event) {


      const highlightedTaskElement = document.querySelector(".highlighted_searched_task");
      const taskId = highlightedTaskElement.getAttribute("data-task-id");

      const viewAllTasksButtonClicked = highlightedTaskElement.classList.contains("view-all-matching-tasks-button");

      if (viewAllTasksButtonClicked) {
        document.querySelector("#taskSearchInput").blur();
        this.searchTasks(event, true, 'modal show key enter action');
        return false;
      }
      else {
        this.viewTask(taskId);
      }
    },
    handleClickEventOnBody (event) {
      const foundParent = event.target.closest('.task_search_container');
      const foundParentModal = event.target.closest('.uk-modal'); // to detect clicks on the opened modal.
      console.log(foundParent);
      if (foundParent === null && foundParentModal === null) {
         const el = document.querySelector(".auto-suggest-list");
         if (el) {
          el.style.display = 'none';
         }
         document.querySelector('body').removeEventListener('click', this.handleClickEventOnBody, false);
      }
    },
    testReport () {

      const post_url = './reports/generate-test-report';
      const filter = {
                        reportId: "123",
                        filters: [
                          {
                            filterKey: "assignees._id",
                            type: "lov",
                            dataType: "referenceId",
                            listValue: [
                              "5eabd722b632462f1bc9ff79",
                              "5fd85f97b7bb60589e3a93df"
                            ]
                          },
                          {
                            filterKey: "categoryInfo._id",
                            type: "single",
                            dataType: "referenceId",
                            singleValue: "5fd895f509631753035943d9"
                          }
                        ]
                      };
      axios.post(process.env.VUE_APP_API_URL + post_url, filter,
           {
             responseType: 'blob',
             headers: {
                 'Content-Type': 'application/json',
                 Accept: 'application/pdf'
             }
           })
          .then((dataResponse) => {
            console.log('FormTemplate attachment result : ', dataResponse);
             const blob = new Blob([dataResponse.data], { type: dataResponse.headers['content-type'] });
             const url = window.URL.createObjectURL(blob);
             // document.querySelector("#report_render_container").setAttribute("src", url);
             window.open(url);
          })
          .catch(function (errorResponse) {
            console.log('ERROR MS - ', errorResponse.response);
          });

    },
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
    toggleModuleMenu () {

      this.moduleMenuCollapsed = !this.moduleMenuCollapsed;
      document.querySelector("#appModuleMenu").classList.toggle("isClosed");
      document.querySelector("#appModuleMenuContent1").classList.toggle("isClosed");
      document.querySelector("#appModuleMenuContent2").classList.toggle("isClosed");
    },

    sendActivityContextMenuClickedEvent (type) {
      const selectedActivityId = document.querySelector(".activity_item_context_menu").getAttribute("data-selected-activity-id");
      const eventSource = document.querySelector(".activity_item_context_menu").getAttribute("data-event-source");
      bus.emit('onContextMenuClicked', { action: type, selectedActivityId: selectedActivityId, eventSource: eventSource });
    },
    sendChannelActivityContextMenuClickedEvent (type) {
      const selectedActivityId = document.querySelector(".channel_activity_item_context_menu").getAttribute("data-selected-activity-id");
      const eventSource = document.querySelector(".channel_activity_item_context_menu").getAttribute("data-event-source");
      const selectedActivitysTaskId = document.querySelector(".channel_activity_item_context_menu").getAttribute("data-task-id");
      bus.emit('onChannelActivityItemContextMenuClicked', {
        action: type,
        selectedActivityId: selectedActivityId,
        eventSource: eventSource,
        taskId: selectedActivitysTaskId
       });
    },
    sendChatMessageContextMenuClickedEvent (type) {
      const selectedChatConversationId = document.querySelector(".chat_msg_item_context_menu").getAttribute("data-selected-chat-conversation-id");
      const selectedChatMessageId = document.querySelector(".chat_msg_item_context_menu").getAttribute("data-selected-chat-message-id");
      bus.emit('onChatMessageContextMenuClicked', {
        action: type,
        conversationId: selectedChatConversationId,
        selectedChatMessageId: selectedChatMessageId
      });
    },

    loadCompo (num) {
      if (num === 1) { this.currentTabComponent = ComponentA; } else { this.currentTabComponent = ComponentB; }
    },
    loadComponent (name) {
      document.querySelectorAll('.app-modules>div')
        .forEach(div => div.classList.remove('app-modules-active'));

      document.querySelector('#' + name + '-module').classList.add('app-modules-active');

      if (name === 'home') {
        this.isTaskView = true;
      } else if (name === 'calendar-component') {
        this.isTaskView = false;
        this.currentTabComponent = Calendar;
      } else if (name === 'chat-component') {
        this.isTaskView = false;
        this.currentTabComponent = ChatBook;
        this.numberOfUnreadChats = 0;
      } else if (name === 'dev-chat-component') {
        this.isTaskView = false;
        this.currentTabComponent = DevChatComponent;
      } else if (name === 'task-activity-channel') {
        this.isTaskView = false;
        this.currentTabComponent = TaskActivityChannel;
      } else if (name === 'reports-component') {
        this.isTaskView = false;
        this.currentTabComponent = ReportsComponent;
      } else if (name === 'dashboard-component') {
        this.isTaskView = false;
        this.currentTabComponent = Dashboard;
      } else if (name === 'my-settings') {
        this.isTaskView = false;
        this.currentTabComponent = MySettingsComponent;
      }

      // this.toggleModuleMenu();
    },
    switchApp (appName) {
      if (appName === 'settings') { window.location = '/admin'; } else if (appName === 'tasks') { window.location = '/app'; } else if (appName === 'channels') { window.location = '/channels'; } else if (appName === 'calendar') { window.location = '/calendar'; } else if (appName === 'businessbench') { window.location = '/businessbench'; } else if (appName === 'dashboard') { window.location = '/dashboard'; }
    },
    showOrHideChat (menuFilter) {
      if (!this.isChatViewOn) { this.signalShowChat(menuFilter); } else { this.signalHideChat(); }
    },
    signalShowChat (menuFilter) {
      /*
            document.querySelectorAll(".menu-item").forEach((el)=>{
              el.classList.remove("uk-active");
              el.classList.remove("selected-menu");}
            );
            document.querySelector("#" + menuFilter).classList.add("selected-menu");
            document.querySelector("#" + menuFilter).classList.add("uk-active");
            */

      if (!this.isChatViewOn) {
        this.isChatViewOn = true;
        bus.emit('show-chat', {});
      }

      // If the current view is any other route, then switch to inbox view.
      if (this.$route.name !== 'view-task-inbox') {
        this.$router.push({
          name: 'view-task-inbox',
          params: {
          }
        });
      }
    },
    signalHideChat () {
      this.isChatViewOn = false;
      bus.emit('hide-chat', {});
    },


    showUserProfilePanel () {
      this.isUserProfilePanelVisible = true;
      document.querySelector('body').addEventListener('click', this.handleBodyClickEventForUserPanel, true);
    },
    hideUserProfilePanel () {
      this.isUserProfilePanelVisible = false;
      document.querySelector('body').removeEventListener('click', this.handleBodyClickEventForUserPanel, true);
    },
    handleBodyClickEventForUserPanel (event) {
      const foundTaskInfoContainer = event.target.closest('#userProfilePanel');
      if (foundTaskInfoContainer === null) {
        // This means, if target on which the click happened is not within the context-menu div, so you can close the context-menu dropdown.
        this.hideUserProfilePanel();
      }
    },

    obstoggleUserProfilePanel () {

      if (document.querySelector("#userProfilePanel").classList.contains("show_user_profile_panel")) {
        this.hideUserProfilePanel();
      }
      else {
        if (document.querySelector("#userProfilePanel").classList.contains("hide_user_profile_panel")) {
          this.showUserProfilePanel();
        }
        else {
          this.hideUserProfilePanel();
        }
      }
    },
    obsshowUserProfilePanel () {
      this.isUserProfilePanelVisible = true;
      document.querySelector('body').addEventListener('click', this.handleBodyClickEventFromUserProfilePanel, true);
      document.querySelector('#user_profile_trigger').classList.remove('user_profile_trigger_inactive');
      document.querySelector('#user_profile_trigger').classList.add('user_profile_trigger_active');
      document.querySelector('#userProfilePanel').classList.add('show_user_profile_panel');
      document.querySelector('#userProfilePanel').classList.remove('hide_user_profile_panel');
    },
    obshideUserProfilePanel () {

      this.isUserProfilePanelVisible = false;
      document.querySelector('body').removeEventListener('click', this.handleBodyClickEventFromUserProfilePanel, true);
      document.querySelector('#user_profile_trigger').classList.add('user_profile_trigger_inactive');
      document.querySelector('#user_profile_trigger').classList.remove('user_profile_trigger_active');
      document.querySelector('#userProfilePanel').classList.remove('show_user_profile_panel');
      document.querySelector('#userProfilePanel').classList.add('hide_user_profile_panel');
    },
    obshandleBodyClickEventFromUserProfilePanel (event) {
      const foundTaskInfoContainer = event.target.closest('#userProfilePanel');
      const isTrigger = event.target.closest("#user_profile_trigger");
      if (foundTaskInfoContainer === null) {
        // This means, if target on which the click happened is not within the context-menu div, so you can close the context-menu dropdown.
        this.hideUserProfilePanel();
      }
      else if (isTrigger) {
        this.hideUserProfilePanel();
      }
    },

    showNotificationsPanel () {
      this.isNotificationsPanelVisible = true;
      document.querySelector('body').addEventListener('click', this.handleBodyClickEventForNotificationsPanel, true);
    },
    hideNotificationsPanel () {
      this.isNotificationsPanelVisible = false;
      document.querySelector('body').removeEventListener('click', this.handleBodyClickEventForNotificationsPanel, true);
    },
    handleBodyClickEventForNotificationsPanel (event) {
      const foundTaskInfoContainer = event.target.closest('#notificationsPanel');
      if (foundTaskInfoContainer === null) {
        // This means, if target on which the click happened is not within the context-menu div, so you can close the context-menu dropdown.
        this.hideNotificationsPanel();
      }
    },


    obstoggleNotificationsPanel () {
      document.querySelector('#notification_trigger').classList.toggle('notification_trigger_inactive');
      document.querySelector('#notification_trigger').classList.toggle('notification_trigger_active');
      document.querySelector('#notificationsPanel').classList.toggle('show_notification_panel');
      document.querySelector('#notificationsPanel').classList.toggle('hide_notification_panel');

      if (document.querySelector("#notificationsPanel").classList.contains("show_notification_panel")) {
        this.showNotificationsPanel();
      }
      else {
        this.hideNotificationsPanel();
      }
    },
    obsshowNotificationsPanel () {
      document.querySelector('body').addEventListener('click', this.handleBodyClickEventFromNotificationsPanel, true);
    },
    obshideNotificationsPanel () {
      document.querySelector('body').removeEventListener('click', this.handleBodyClickEventFromNotificationsPanel, true);
    },
    obshandleBodyClickEventFromNotificationsPanel (event) {
      const foundTaskInfoContainer = event.target.closest('#notificationsPanel');
      if (foundTaskInfoContainer === null) {
        // This means, if target on which the click happened is not within the context-menu div, so you can close the context-menu dropdown.
        this.toggleNotificationsPanel();
      }
    },
    toggleAppsPanel () {
      document.querySelector('#apps_trigger').classList.toggle('apps_trigger_inactive');
      document.querySelector('#apps_trigger').classList.toggle('apps_trigger_active');
      document.querySelector('#appsPanel').classList.toggle('show_apps_panel');
      document.querySelector('#appsPanel').classList.toggle('hide_apps_panel');
    },

    logoutFromHere () { // new

      // Send the logout-signal to rsocket, so that it notifies other tenant users that this user is going OFFLINE.
      this.sendUserLogoutMessageToServer();

      // Clear local-storage data specific to the loggedInUser.
      localStorage.removeItem("preferredTheme");
      localStorage.removeItem("preferredTaskView");
      localStorage.removeItem("default-category");
      localStorage.removeItem("customers");
      localStorage.removeItem("customer_branches");

      document.getElementById('loform').submit();
    },
    // Any updates received in the rsocket from server, will be sent to the same component from where the rsocket initially
    // registered and connected to.
    // For example, In this adk-app.vue component, on the mounted() listener, we initiated the call for rsocket to connect.
    // from task-inbox, we used the rsocket to connect to a category-channel. But when an update for that category-channel
    // was pushed from server to rsocket, then rsocket cannot invoke a function in the task-inbox to pass those updates.
    // Hence we first receive the update in this adk-app.vue component and then pass it to the task-inbox component via the event-bus.
    // This needs good blogging inorder to avoid confusions with using mixins to centralize certain objects like rsocket.socket.
    sendUpdateToTaskInboxComponent (payload) {
      console.log('task-activity-update payload received in adk-app.vue from rsocket');
      bus.emit('task-activity-update-from-adk-app', payload);
    },

    sendNewChatEvent () {
      console.log('Event emitted in bus.', new Date());
      bus.emit('newChatEvent', {});
    },
    goTo (routeName) {
      document.querySelectorAll('.app-modules>div')
        .forEach(div => div.classList.remove('app-modules-active'));

      document.querySelector('#' + routeName + '-module').classList.add('app-modules-active');

      if (routeName === 'chat-component') {
        this.$router.push('/chat');
      } else if (routeName === 'home') {
        this.$router.push('/');
      } else {
        this.$router.push({
          name: routeName,
          params: {}
        });
      }
    },
    profileImageLoadError () {
      this.hasProfileImage = false;
    },
    uploadPic (fieldName, fileList) {
      const _this_component = this;
      // handle file changes
      const formData = new FormData();
      formData.append('name', this.loggedInUser.userId);

      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });

      // Display the key/value pairs
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      var url = '/profile/upload-my-dp';
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('ENCTYPE', 'multipart/form-data');
      // xhr.setRequestHeader("Content-Type","multipart/form-data;boundary=CUSTOM");
      xhr.send(formData);

      // Setup our listener to process completed requests
      xhr.onload = function () {
        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
          // This will run when the request is successful
          console.log('success!', xhr);
          const savedImageName = xhr.responseText;
          console.log('savedImageName=' + savedImageName);
          _this_component.uploadedPicId = savedImageName;

          // $("#uploadedImage").attr("src",);
          document.querySelector('#uploadedImage', '/api/us/profile/get/' + savedImageName);

          self.postMessage('Processed data from Worker.');
        } else {
          // This will run when it's not
          console.log('The request failed!');
        }

        // This will run either way
        // All three of these are optional, depending on what you're trying to do
        // console.log('This always runs...');
      };
    },
    goToPage: function (pageKey, params, id) {
      this.signalHideChat();

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
    goToHomePage: function () {
      window.location = '/app';
      return false;

      this.$router.push({
        name: 'home-page',
        params: {
        }
      });
    },

    loadFilteredTasks (taskFilter, menuFilter, filterName) {
      this.signalHideChat();

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
      bus.emit('filterByTaskStatus', { key: taskFilter, filterName: filterName });
    },
    loadInbox (filter) {
      this.signalHideChat();

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
      bus.emit('filterByCategory', { name: 'all' });
    },
    fetchDefaultCategoryForCaching () {
      return new Promise(resolve => {
        const url = './categories/get-default-category';

        try {
          axios.get(process.env.VUE_APP_API_URL + url)
            .then((dataResponse) => {
              console.log('Default Category : ', dataResponse);
              localStorage.setItem('default-category', dataResponse.data);
              resolve('fetched');
            })
            .catch((error) => {
              console.error('Error while fetching my-categories-list : ', error);
              resolve('fetch failed');
            });
        } catch (error) {
          console.error('Unpaginated List data fetch error : ', error);
        }
      });
    },
    fetchCustomersForCaching () {
      return new Promise(resolve => {
        const url = './data-caching/customers/list';

        try {
          axios.get(process.env.VUE_APP_API_URL + url)
            .then((dataResponse) => {
              console.log('Customers List: ', dataResponse);
              localStorage.setItem('customers', JSON.stringify(dataResponse.data, null, null));
              resolve('fetched');
            })
            .catch((error) => {
              console.error('Error while fetching my-categories-list : ', error);
              resolve('fetch failed');
            });
        } catch (error) {
          console.error('Unpaginated List data fetch error : ', error);
        }
      });
    },
    fetchCustomerBranchesForCaching () {
      return new Promise(resolve => {
        const url = './data-caching/customer-branches/list';

        try {
          axios.get(process.env.VUE_APP_API_URL + url)
            .then((dataResponse) => {
              console.log('Customer Branches List: ', dataResponse);
              localStorage.setItem('customer_branches', JSON.stringify(dataResponse.data, null, null));
              resolve('fetched');
            })
            .catch((error) => {
              console.error('Error while fetching customer-branches/list : ', error);
              resolve('fetch failed');
            });
        } catch (error) {
          console.error('Unpaginated List data fetch error : ', error);
        }
      });
    }

  },

  created: function () {

  }

};
</script>

<style>

    .highlighted_searched_task {
      background-color: #dff1ff !important;
    }

    .matching_row {
      position: relative;
      padding: 5px 10px;
      display: grid;
      align-items: end;
      height: 30px;
      justify-items: start;
      grid-template-columns: 60px 5fr auto 1fr 1fr;
      -moz-column-gap: 20px;
      column-gap: 20px;
      border-bottom: 1px solid #f3f3f3;
      border-left: 5px solid transparent;
      background-color: rgb(255 255 255);
      font-size: 0.65rem;
    }

    .matching_row:hover {
      border-left: 5px solid transparent;
    }

    .matching_row > div {
      margin-bottom: 5px;
    }
    .matching-task{
      margin: 10px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      font-size: 0.75rem;
      padding: 5px;
      border-radius: 3px;
      transition:0.25s linear;
    }

    .matching-task:hover{
      background-color: #dff1ff !important;
    }

    .matching-task:nth-child(even) {
      background-color: #f2f2f299;
    }

    .matching-task:nth-child(even):hover{
      background-color:#f0f0f0;
    }

    /*
    .fade-enter-active, .fade-leave-active {
      opacity: 1;
      transition: opacity .1s;

    }
    .fade-enter, .fade-leave-active {
      opacity: 0;
    }
    */

    .bright_font{
        color: hsla(0, 100%, 50%, 0.5)!important;
    	font-size: large!important;
    }

    .menulink{
        cursor: pointer;
    }

    .chat_bar_bg{
        background: rgba(27, 28, 29, 0.75)!important;
    }

    .navbar_detail{
        background-color: white;
        color: #333;
        display:grid;
        width: 100%;
        height:50px;
        padding:0px;
        grid-template-columns: 1fr 5fr auto;
        -webkit-box-shadow: 0 0 4px rgba(0,0,0,.32), 0 4px 8px rgba(0,0,0,.12);
        box-shadow: 0 0 4px rgba(0,0,0,.32), 0 4px 8px rgba(0,0,0,.12);
        position: static;
        top: 0;
        width: 100%;
    }

    .logo_image{
        display: block;
        width: 100%;
        height: 35px;
        padding: 0;
        margin: 0;
    }

    .avatar{
        width: 3em !important;
        height: 3em !important;
    }

    .file-upload-wrapper {
      /* position: relative;
      height: 50px; */
      width: 180px;
    }

    .file-upload-wrapper::after {
      content: attr(data-text);
      font-size: 10px;
      position: absolute;
      top: 0;
      left: 0;
      background: #4b4b4bcf;
      padding: 0px 15px;
      display: block;
      width: 100px;
      pointer-events: none;
      z-index: 20;
      height: 30px;
      line-height: 30px;
      color: #fff;
      border-radius: 5px 10px 10px 5px;
      font-weight: 300;
    }

    .file-upload-wrapper::before {
        content: 'Upload';
        position: absolute;
        top: 0;
        right: 0px;
        display: inline-block;
        height: 30px;
        background: #2196F3;
        color: #fff;
        font-weight: 700;
        z-index: 25;
        font-size: 8px;
        line-height: 30px;
        padding: 0px 15px;
        text-transform: uppercase;
        pointer-events: none;
        border-radius: 0 5px 5px 0;
    }

    .file-upload-wrapper:hover {
      &:before {
        background: darken(#4daf7c, 10%);
      }
    }

    .file-upload-wrapper > input {
        opacity: 0;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99;
        height: calc(60px - 20px);
        margin: 0;
        padding: 0;
        display: block;
        cursor: pointer;
        width: 100%;
    }

    .uk-nav-header:not(:first-child) {
        margin-top: 5px;
    }




    .uk-nav-sub a {
        padding: 5px 0;
    }

    .lnr {
      display: inline-block;
      fill: currentColor;
      width: 1em;
      height: 1em;
      vertical-align: -0.05em;
    }

    .counter-label{
      font-size: 0.60rem;
      color: #7d7b7b;
      font-weight: normal;
      letter-spacing: 0.025rem;
      margin-left: auto;
    }

    .uk-navbar-container {
        background: #fbfbfbb8;
        background-image: none!important;
        border-bottom: 0px solid #ccc;
    }


    .app-side-menu-chat-mode{
        height: 100%;display: flex;flex-basis: 0%;
        box-sizing: border-box;
    }



    .app-container-div-chat-mode{
      display: flex;flex-basis: 100%;
      overflow-y: hidden;position: relative;
      box-sizing: border-box;
    }

    .menu{
        display: flex;
        flex-direction: column;
        row-gap: 5px;
        min-width: 100%;
        box-sizing: border-box;
    }

    .menu > div{
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: left;
    }

    .menu > div:hover, .submenu > div > div:hover{
      background-color:#f0f0f0;
      cursor:pointer;
    }

    .new_task_options{
      position: fixed;
      background: #fff;
      width: auto;
      transform-origin: top left;
      opacity: 1;
      transform: scale(0);
      font-size: .75rem;
      z-index: 20;
      transition: 0.15s linear;
      border-radius: 3px;
      padding: 10px;
      border: 1px solid #cecece;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 12%);
    }

    .app-modules > div{
      transition : 0.15s linear;
      cursor:pointer;
      padding: 5px;
      transform: scale(1); /* scale(0.85); */
      color: #646464;
    }

    .app-modules > div:hover > div{  /* Target the inner child icon and scale it */
      transform : scale(1.05);
    }

    .app-modules > div:hover{
      background: #f2f2f2;
      font-weight: bold;
      color: #e35a88;
    }

    .app-modules-active{
      background: #efefef;
      background: #ececec;
    }

    .app-modules-active > div{
      background: #f2f2f2;
      font-weight: bold;
      color: #000000;
    }

    .app-container{
      transition:0.25s linear;
      opacity:1;
    }

    .hide_reveal{
      opacity: 0;
    }

    .spinner-3 {
      width:50px;
      height:50px;
      border-radius:50%;
      border:8px solid;
      border-color:lightblue;
      border-right-color: orange;
      animation:s3 1s infinite linear;
      opacity: 0.5;
    }
    @keyframes s3 {to{transform: rotate(1turn)}}

    .spinner-2 {
      --r1: 154%;
      --r2: 68.5%;
      width:60px;
      height:60px;
      border-radius: 50%;
      border: 1px solid #c7c7c7;
      background:
        radial-gradient(var(--r1) var(--r2) at top   ,#0000 79.5%,#269af2 80%) center left,
        radial-gradient(var(--r1) var(--r2) at bottom,#269af2 79.5%,#0000 80%) center center,
        radial-gradient(var(--r1) var(--r2) at top   ,#0000 79.5%,#269af2 80%) center right,
        #ccc;
      background-size: 50.5% 220%;
      background-position: -100% 0%,0% 0%,100% 0%;
      background-repeat:no-repeat;
      animation:p9 2s infinite linear;
    }
    @keyframes p9 {
        33%  {background-position:    0% 33% ,100% 33% ,200% 33% }
        66%  {background-position: -100%  66%,0%   66% ,100% 66% }
        100% {background-position:    0% 100%,100% 100%,200% 100%}
    }

    .app-module-menu{
      flex-grow: 1;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      transition: all 0.3s linear;
      max-width: 65px;
    }

    .app-module-menu.isClosed{
      flex-grow: 0;
    }

    .app-module-menu-content{
      display: flex;
      flex-direction: column;
      width: 100%;
      opacity: 1;
    }

    .app-module-menu-content.isClosed{
      display:none;
    }

    .apps_trigger_inactive{
      cursor:pointer;
      color: white;
      padding: 7px 7px;
      background: transparent;
      border-radius: 20px;
      background: #1157a7;
      background : rgb(37, 139, 255);
    }

    .apps_trigger_active{
      cursor:pointer;
      color: white;
      padding: 7px 7px;
      border-radius: 20px;
      background: #144d8e;
    }


    .user_profile_trigger_inactive{
      cursor:pointer;
      color: white;
      background: transparent;
      border-radius: 20px;
      background: #1157a7;
      background : rgb(37, 139, 255);
      background: #e7edf6;
    }

    .user_profile_trigger_active{
      cursor:pointer;
      color: white;
      background: #e7edf6;
    }

    .notification_trigger_inactive{
      cursor:pointer;
      color: white;
      padding: 7px 7px;
      background: transparent;
      border-radius: 20px;
      background: #1157a7;
      background : rgb(37, 139, 255);
      background: #e7edf6;
      transition: 0.25s linear;
    }

    .notification_trigger_active:hover, .notification_trigger_inactive:hover,
    .notification_trigger_active:hover, .notification_trigger_inactive:hover
    {
      background: #d0e3ff;
    }

    .notification_trigger_active:active, .notification_trigger_inactive:active,
    .notification_trigger_active:active, .notification_trigger_inactive:active
    {
      background: #d0e3ff;
    }

    .notification_trigger_active{
      cursor:pointer;
      color: white;
      padding: 7px 7px;
      border-radius: 20px;
      background: #e7edf6;
    }

    .show_apps_panel{
      display:flex;
    }

    .hide_apps_panel{
      display:none;
    }


    .show_user_profile_panel{
      display:flex;
    }
    .hide_user_profile_panel{
      display:none;
    }

    .user_profile_panel{
      overflow-y: hidden;
      position: absolute;
      top: 0px;
      right: 2%;
      width: 20%;
      height: 350px;
      border-radius: 0px;
      background-color: #fffffff7;
      z-index: 1000;
      border: 1px solid #8080808a;
      border-top: 0px;
      box-shadow: 0 0 14px 4px rgb(0 0 0 / 28%), 0 4px 8px rgb(0 0 0 / 0%);
      box-shadow: 0 0 4px rgb(0 0 0 / 22%), 0 4px 8px rgb(0 0 0 / 0%);
      border-radius: 0px 0px 4px 4px;
    }

    .user_profile_panel::after {
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        left: -10px;
        right: auto;
        top: 0px;
        bottom: auto;
        border: 22px solid;
        border-color: #fff transparent transparent transparent;
        z-index: -1;
    }

    .show_notification_panel{
      display:flex;
    }
    .hide_notification_panel{
      display:none;
    }

    .notifications_panel{
        overflow-y:hidden;
        position:absolute;
        top:0px;
        right:0px;
        width:25%;
        height:500px;
        background-color: #ffffffed;
        z-index: 1000;
        -webkit-box-shadow: 0 0 4px rgba(0,0,0,.32), 0 4px 8px rgb(0 0 0 / 10%);
        box-shadow: 0 0 4px rgba(0,0,0,.32), 0 4px 8px rgb(0 0 0 / 10%);
        border-radius: 0px 0px 0px 4px;
    }

    .apps_panel{
        overflow-y:hidden;
        position:absolute;
        top:0px;
        right:0px;
        width:30%;
        height:100px;
        background-color:#f3f6f9;
        z-index: 1000;
        -webkit-box-shadow: 0 0 4px rgba(0,0,0,.32), 0 4px 8px rgb(0 0 0 / 10%);
        box-shadow: 0 0 4px rgba(0,0,0,.32), 0 4px 8px rgb(0 0 0 / 10%);
    }

    #msg{
        color:blue
    }

    ul.uk-nav-sub {
        padding: 5px 0 5px 0px;
    }

    .side-bar-light .uk-nav-sub>li.selected-menu>a {
        color: #333!important;
        font-weight: bold!important;
        font-size: .7rem;
    }

    .soc_connected{
      background: greenyellow;
    }

    .soc_disconnected{
      background: red;
    }

    .uk-notification-message-login-color{
      background-color: #4caf50d1;
      color: #fff;
    }

    .uk-notification-message-logout-color{
      background-color: #00000087;
      color: #fff;
    }

</style>
