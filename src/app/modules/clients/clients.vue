<template>
<div class="app_container" style="background: rgb(255, 255, 255, 0);grid-template-columns:1fr 2fr 5fr;display: flex;box-sizing: border-box;width: 100%;">

    <div id="appSideMenu" class="app-side-menu" style="xxflex-basis:10%;">
        <div vv-if="loggedInUser.isInformationFetchComplete" id="appSideMenuContent" class="app-side-menu-content">
            <div class="uk-offcanvas-bar0 custom-scroll-bar side-bar-light" style="flex-grow:1">

                <div>
                    <div style="min-height: 75px;opacity: 1;display: flex;align-items: center;justify-content: center;">
                        <div style="position:relative">
                            <button id="new_task_button" uk-toggle="target: #add-client-modal" class="btn clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(37, 139, 255);border-radius: 3px 0px 0px 3px;place-self: center;place-items: center;min-width: 100px;font-size: 0.75rem;line-height: 27px;font-weight: normal !important;text-transform: capitalize;">
                                <span uk-icon="icon:plus;ratio:0.75"></span>
                                <span style="margin-left:5px" v-on:click="addOrgDetails()"> Add Client</span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <hr>
                    </div>
                </div>
                <ul class="uk-nav uk-nav-default">
                    <li class="uk-nav-header sidebar-category-dropdown" style="margin-top: 15px;">
                        <a style="color: #333!important;font-weight: normal!important;" v-on:click="getCategories()">
                            Client Categories
                            <span class="counter-label">
                                <span v-bind:uk-icon="catOpen ? 'icon:chevron-down;ratio:0.85' : 'icon:chevron-up;ratio:0.85'" id="category-menu-trigger" class="uk-icon" style="transition: 0.25s linear;color: #cdcdcd;"></span>
                            </span>
                        </a>
                    </li>
                    <li class="uk-parent" id="category-submenu" v-show="catOpen">
                        <ul class="uk-nav-sub custom-scroll-bar" style="max-height: 300px;height: 300px;overflow-y: auto;">
                            <template v-for="(category, index) in myOrganizationCategories" :key="index">
                                <li class="menu-item" v-bind:id="clientFilter === category.id && 'activeClient'">
                                    <a v-on:click="loadTasksFromCategory(category.id, category.name)">{{category.name}}
                                        <span class="counter-label" v-bind:id="'cat_count_'  + category.id">({{clientFilter === category.id? myCategorieOrganizations.length : "03"}})</span>
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
        <div class="listOfTasksContainer list-of-tasks-container">

            <div class="adk_grid_toolbar" style="user-select: none;grid-template-columns: auto 1fr;padding: 0px 0px;height:50px">
                <div style="display: grid; place-self: center flex-start; text-align: left;">
                    <div style="align-items:center;display: grid; place-self: center flex-start; padding-left: 0px; padding-right: 20px; color: rgba(61, 61, 61, 0.78) !important; grid-template-columns: auto auto auto; font-size: 0.75rem;">

                        <!-- Inbox Title -->
                        <span id="taskListName" class="task-list-name" style="">Inbox</span>
                    </div>
                </div>
                <div style="display: grid; gap: 10px; grid-template-columns: auto auto; place-self: center end; text-align: right;">
                    <div style="display: flex;column-gap: 10px;">
                        <div v-on:click="getOrgDetails(categoryId)" class="clickable-btn uk-button" style="cursor: pointer;padding: 0 0px;filter: grayscale(1);"><img src="resources/images/refresh.svg" style="pointer-events: none;height:15px;width:15px"></div>
                    </div>
                </div>
            </div>
            <div v-if="appliedTaskFilter === 'category'" style="margin-bottom: 15px; padding: 0px 10px 0px 0px; box-sizing: border-box;position:relative ">
                <span style="position:absolute;left:10px;top: 10px;color: #9f9f9f;" uk-icon="icon:search;ratio:0.85"></span>
                <input tabindex="1" id="taskSearchInput" autocomplete="off" placeholder="Search Tasks in this category" v-model="taskList.searchQuery" v-on:keyup.enter="searchTasks()" uk-tooltip="Ex. #87, Purchase Laptops.." type="text" class="uk-input task-search-input" style="border-radius: 20px;padding-left: 40px;" />
            </div>

            <div style="flex-grow: 1;overflow-y: hidden;position: relative;padding: 0px;height: 100%;">
                <div style="display: flex;flex-direction: column;flex-grow: 1;height: 100%;">
                    <div class="task-list" id="tasklist" style="position:relative;font-size: 0.7rem;flex-grow: 1;margin-top: 10px;grid-template-rows: 1fr;background-color:#f2f2f2;background-color:rgb(255, 255, 255, 0)">

                        <div class="adk_grid_list_content custom-scroll-bar" id="taskListIntersectionObserver">
                            <div class="task_inbox_list elastic_scroll_list">
                                <p v-show="myCategorieOrganizations.length === 0">No Organizations...</p>
                                <div v-for="(item, index) in myCategorieOrganizations" :key="index">
                                    <div v-on:click="cardSetItem(index, item)" v-bind:style="cardActive === index && 'border-left: 2px solid rgb(37, 139, 255)'">
                                        <clients-list-item v-bind:item="item" v-bind:myOrgName="myOrgName" v-bind:cardActive="cardActive" v-bind:catIndex="index" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="taskDetailContainer task-detail-container" style="width: 100%; background: rgb(246 246 246)">
            <div style="width: 100%">
                <div v-show="mySelectedOrgDetail.name == ''" style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
                    <div style="display: flex;grid-template-rows: 1fr;flex-grow: 1;overflow-y: hidden;align-items: center;justify-content: center;background-color:rgb(255, 255, 255, 0.85), height: 100%;">
                        No Task chosen.
                    </div>
                </div>
                <div v-show="mySelectedOrgDetail.name !== ''" style="display:flex;flex-grow: 1;grid-template-rows:1fr;overflow-y:hidden">
                    <client-view-formate v-bind:item="mySelectedOrgDetail" v-bind:myOrgName="myOrgName" />
                </div>
            </div>
        </div>
    </div>
</div>

<!-- ADD client popup -->
<div id="add-client-modal" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <add-client v-bind:categoryId="categoryId" v-bind:getOrgDetails="getOrgDetails" v-bind:myOrganizationCategories="myOrganizationCategories" />
    </div>
</div>
</template>

<script>
import {
    Vue
} from 'vue';
import {
    bus
} from './../../../main.js';
import uiListMixinLib from './../../mixins/lib/ui-list.js';
import utilsMixinLib from './../../mixins/lib/utils_lib';
import userMixinLib from './../../mixins/lib/user_mixin_lib.js';
import rsocket from './../../mixins/lib/rsocket';

import taskInbox from './../../mixins/lib/task_inbox.js';
import taskInboxModals from './../../mixins/lib/task_inbox_modals.js';
import taskInboxComplexFiltering from './../../mixins/lib/task_inbox_complex_filtering.js';
import axios from 'axios';

export default {
    mixins: [
        uiListMixinLib, utilsMixinLib, userMixinLib, rsocket,
        taskInbox, taskInboxModals, taskInboxComplexFiltering
    ],
    data: function () {
        return {
            taskListName: 'Clients', // This is the list's name. Can be ["Inbox", "Sent", "Overdue", "Closed", "Category.."]

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

            /* New Task from Template - March 25 2021 */
            newTaskFromTemplate: {},
            availableCategories: [],
            matchingTaskTemplates: [],
            chosenTaskTemplate: null,
            chosenTaskCategory: null,
            isCategorySubmenuOpened: false,

            selectedTabKey: '',

            // clients
            clientFilter: 0,
            cardActive: '',
            categoryId: '',
            headers: {
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkaXNwbGF5TmFtZSI6IlZpZ25lc2hCaGFza2FyIiwiaXNzIjoiYXV0aDAiLCJyZXFBdXRoVG9rZW4iOiJ7XCJ6elwiOm51bGwsXCJsblwiOlwiQmhhc2thclwiLFwidFwiOlwiNWZkODVmNTViN2JiNjA1ODllM2E5M2RkXCIsXCJmblwiOlwiVmlnbmVzaFwiLFwiZW1cIjpcImNiaGFza2FyYXZpZ25lc2gub2ZmaWNlQGdtYWlsLmNvbVwiLFwicGlkc1wiOltudWxsLFwianZzYiRka2JqXCIsXCJqdnNiJG1hdGl1XCJdLFwidXVpZFwiOlwiNWZkODVmOTdiN2JiNjA1ODllM2E5M2RmXCIsXCJ0YlwiOm51bGx9IiwiZXhwIjoxNjU4MDUwNjA2LCJ1dWlkIjoiNWZkODVmOTdiN2JiNjA1ODllM2E5M2RmIn0.or3xlRbqVM_NeBWskWjsBFl7ZRQx4lHzh6mvMTt4a4E'
            },
            myOrganizationCategories: [],
            myCategorieOrganizations: [],
            myOrgName: '',
            mySelectedOrgDetail: {
                  name: ''
            }, // getting one organization detail

            // Client Contact Details
            myClientContacts: [],
            catOpen: false
        };
    },
    methods: {

        toggleSideMenu() {
            document.querySelector("#appSideMenu").classList.toggle("isClosed");
            document.querySelector("#appSideMenuContent").classList.toggle("isClosed");
        },

        // Add categories
        addCatrgories() {
            const obj = {
                id: "new",
                tenantId: "61dfe560a4d68d08b821e08c",
                name: "India",
                status: "ACTIVE"
            };
            axios({
                method: 'POST',
                url: 'https://test.hotkup.com/crm/category/list/1/save',
                headers: this.headers,
                data: obj
            }).then((res) => {
                console.log('res', res);
            });
        },

        // Get categories
        getCategories() {
            axios({
                method: 'GET',
                url: 'https://test.hotkup.com/crm/category/list/1/all',
                headers: this.headers
            }).then((res) => {
                console.log('res', res);
                this.catOpen = !this.catOpen;
                this.myOrganizationCategories = res.data.data;
            });
        },

        loadTasksFromCategory(id, name) {
            this.clientFilter = id;
            this.categoryId = id;
            this.myOrgName = name;
            this.getOrgDetails(id);
        },

        // Getting All organisation details
        getOrgDetails(id) {
            axios({
                    method: 'GET',
                    url: `https://test.hotkup.com/crm/organizations/list/` + (id != '' ? `${id}/1/all` : `/1/all`)
                })
                .then((res) => {
                    console.log("res", res);
                    this.myCategorieOrganizations = res.data.data;
                })
                .error((res) => console.log(res));
        },

        // Getting dynamic org details on selection
        cardSetItem(index, item) {
            this.cardActive = index; // active tab selection
            axios({
                    method: 'GET',
                    url: `https://test.hotkup.com/crm/organizations/get/${item.id}`,
                    headers: this.headers
                })
                .then((res) => {
                    const newData = res.data;
                    const obId = newData.id;
                    const objcate = newData.categoryId;
                    const objname = newData.name;
                    const objStreet = newData.address.street;
                    const objcity = newData.address.city;
                    const objprovince = newData.address.province;
                    const objzip = newData.address.zip;
                    const objcountry = newData.address.country;

                    this.mySelectedOrgDetail = {
                        id: obId,
                        categoryId: objcate,
                        name: objname,
                        street: objStreet,
                        city: objcity,
                        province: objprovince,
                        zip: objzip,
                        country: objcountry
                    };
                    console.log('this.mySelectedOrgDetail', this.mySelectedOrgDetail);
                })
                .error((res) => console.log(res));
        }
    },
    created: function () {},
    computed: {},
    mounted: async function () {
    },
    unmounted: function () {},
    beforeUnmount() {
        bus.all.delete('connected-rsocket');
    },
    watch: {
        list: {
            deep: true
        }
    }
};
</script>

<style scoped>
.app-side-menu.isClosed {
    flex-grow: 0;
}

.app-side-menu-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    opacity: 1;
}

.app-side-menu-content.isClosed {
    display: none;
}

.hide_display {
    display: none;
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

.back-button>svg>path {
    background-color: rgb(232 232 232);
    fill: rgb(181 181 181);
}

.back-button:hover>svg>path {
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

.right-panel-header>a {
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

.right-panel-list>ul>li {
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
    background-image: -webkit-linear-gradient(45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent);
}

.custom-scroll-bar[data-v-6459955c]::-webkit-scrollbar-track {
    /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
    background-color: #f3f3f3;
}

.list-item-menu {
    opacity: 0;
    transition: 0.25s linear;
    background-color: #ffffffa8;
    border-radius: 50%;
    padding: 5px;
    transform-origin: 50% 50%;
    position: absolute;
    right: 7px;
    top: 7px;
}

.list-row:hover {
    background: #dbecff !important;
}

.list-row:active {
    transform: scale(0.98);
}

.list-row:hover .list-item-menu {
    opacity: 1;
}

.list-item-menu:hover {
    cursor: pointer;
    transform: rotate(90deg);
}

.list-row.active .active-border {
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

.uk-subnav-pill>*>a {
    font-size: 0.55rem !important;
    border-radius: 0px;
    letter-spacing: 00.055rem;
}

.uk-subnav-pill>.uk-active>a {
    border-bottom: 2px solid #4698f5 !important;
    color: #4698f5;
    background-color: #fff0 !important;
}

.new_activity {
    display: none !important;
}

.pulse_activity {
    animation-duration: 3s;
    animation-name: pulse;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    -webkit-animation-duration: 3s;
    -webkit-animation-name: pulse;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-timing-function: linear;
    -webkit-animation-fill-mode: forwards;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    20% {
        opacity: 0;
    }

    30% {
        opacity: 1;
    }

    40% {
        opacity: 0;
    }

    60% {
        opacity: 1;
    }

    80% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.activity_description {
    position: relative;
    padding: 10px 10px 0px 10px;
    min-height: 75px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 3px;
    transition: 0.25s ease-in;
}

.activity_description>div {
    margin-bottom: 5px;
}

.activity-sno {
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

.task_filter_form {
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
    box-shadow: 0 15px 12px 0 rgba(0, 0, 0, .12);
}

.subtask-back-button {
    background-color: hsl(0deg 1% 72%/18%);
    border-radius: 50%;
    place-self: center flex-start;
    place-items: center;
    font-size: .65rem;
    height: 40px;
    width: 40px;
    font-weight: 400 !important;
    padding: 0 7px;
    fill: #0de60d;
    color: rgb(255 255 255);
    transition: .25s linear;
}

.subtask-back-button>svg>path {
    background-color: rgb(232 232 232);
    fill: rgb(101 101 101);
}

.side-bar-light .uk-nav-sub>li.selected-menu>a {
    color: #333 !important;
    font-weight: bold !important;
    font-size: .7rem;
}

.hide_reveal {
    opacity: 0;
}

.spinner-2 {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 8px solid;
    border-color: lightblue;
    border-right-color: orange;
    animation: s2 1s infinite linear;
    opacity: 0.5;
}

@keyframes s2 {
    to {
        transform: rotate(1turn)
    }
}

.quick_task_filter {
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

.filters {
    display: flex;
    flex-direction: column;
}

.filter-section {
    display: flex;
    flex-direction: column;
}

.filter-section-label {
    font-size: 0.45rem;
    color: gray;
    background: #efefef;
    padding: 5px 10px;
    text-transform: uppercase;
    letter-spacing: 0.555px;
    margin-top: 5px;
    margin-bottom: 5px;
}

.filter-value {
    display: flex;
    padding: 5px 0px;
    text-align: right;
    color: black;
}

.filter-value:hover {
    background: #2196f326;
    cursor: pointer;
    border-radius: 3px
}

.filter-value:active {
    cursor: pointer;
    transform: scale(0.95);
}

.custom-scroll-bar {
    overflow-y: hidden;
}

.custom-scroll-bar:hover {
    overflow-y: auto !important;
}
</style><style scoped>
#activeClient {
    background: #28181808;
}
</style>
