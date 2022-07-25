import { createApp, defineAsyncComponent } from 'vue';

import * as Comlink from 'comlink';
// import './registerServiceWorker';
import router from './router';
import store from './store';
import mitt from 'mitt';
// axios.defaults.withCredentials = true;

// var dayjs = require('dayjs');
import dayjs from 'dayjs'; // ES 2015);

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// import App from './App.vue';
import App from './app/adk-app.vue';
// import ADKHome from './app/adk-home.vue';
// import AdminDashboard from "./components/admin/admin-dashboard.vue"

// UI components
import UIIcon from './app/ui-components/ui-icon.vue';
import UISelectBox from './app/ui-components/ui-selectbox.vue';
import UISelectBox2 from './app/ui-components/ui-selectbox-2.vue';
import UISelectBoxSingle from './app/ui-components/ui-selectbox-single.vue';
import TaskInbox from './app/modules/task/task-inbox.vue';
import TaskActivityChannel from './app/modules/channels/task-activity-channel.vue';

import TaskListItemFormat1 from './app/modules/task/task-list-item-format-1.vue';
import TaskListItemFormat2 from './app/modules/task/task-list-item-format-2.vue';

// import NewTaskForm from './app/new-task-form.vue';

import NewScheduledTaskForm from './app/modules/task/new-scheduled-task-form.vue';
import NewRecurringTaskForm from './app/modules/task/new-recurring-task-form.vue';
import NewTaskTemplateForm from './app/modules/task/new-task-template-form.vue';
// import NewSubTaskForm from './app/modules/task/new-subtask-form.vue';
import TaskViewFormat1 from './app/modules/task/task-view-format-1.vue';
import TaskViewFormat2 from './app/modules/task/task-view-format-2.vue';
import RTaskViewFormat2 from './app/modules/task/rtask-view-format-2.vue';
// import CronBuilder from './app/modules/task/cron-builder.vue';

import TaskSearchModal from './app/modules/task/task-search-modal.vue';
import TaskViewInfoTab from './app/modules/task/task-info-tab.vue';
import TaskViewActivityTab from './app/modules/task/task-activity-tab.vue';
import TaskViewSubtasksTab from './app/modules/task/task-subtasks-tab.vue';
import TaskViewFormsTab from './app/modules/task/task-forms-tab.vue';
import TaskFilesTab from './app/modules/task/task-files-tab.vue';
import ChatBook from './app/modules/chat/chat-book.vue';
import ChatPage from './app/modules/chat/chat-page.vue';
import Calendar from './app/modules/calendar/calendar.vue';
import ComponentA from './app/modules/test/component-a.vue';
import ComponentB from './app/modules/test/component-b.vue';
// import TaskInboxPrivate from './app/wireframes/task-inbox-private.vue';
// import TaskCreate from './app/task-create.vue';
// import PrivateTaskCreate from './app/wireframes/task-create-private.vue';
// import SubTaskCreate from './app/task-create-sub.vue';
// import TaskViewPrivate1 from './app/wireframes/task-view-private-1.vue';
// import TaskViewPrivate2 from './app/wireframes/task-view-private-2.vue';
// import TextAreaComponent from './app/textarea-component.vue';
import NotificationSubscriptionForm from './app/modules/notifications/notification-subscription-form.vue';
import NotificationsPanel from './app/modules/notifications/notifications-panel.vue';
import UserProfilePanel from './app/modules/user-profile/user-profile-panel.vue';



import ActivityFormTab from './app/modules/task/activity-form-tab.vue';

import TaskFormComponent from './app/modules/mocks/task-form-component.vue';
import NewForm from './app/modules/mocks/new-form.vue';
import ViewFormData from './app/modules/mocks/view-form-data.vue';
import EditFormData from './app/modules/mocks/edit-form-data.vue';



import Clients from './app/modules/clients/clients.vue';
import ClientsItem from './app/modules/clients/clients-list-item.vue';
import ClientsViewFormate from './app/modules/clients/client-view-formate.vue';
import ClientsContacts from './app/modules/clients/clients-contacts.vue';
import ClientsActivity from './app/modules/clients/clients-activity-tab.vue';
import ClientsAbout from './app/modules/clients/clients-about.vue';
import ClientsInfo from './app/modules/clients/client-info-tab.vue';
import ClientsAdd from './app/modules/clients/add-client.vue';
import ClientsTasks from './app/modules/clients/clients-subtasks-tab.vue';



import People from './app/modules/people/people.vue';
import PeopleItem from './app/modules/people/people-list-item.vue';
import PeopleViewFormate from './app/modules/people/people-view-formate.vue';
import PeopleActivity from './app/modules/people/people-activity-tab.vue';
import PeopleInformation from './app/modules/people/people-information.vue';
import PeopleOrganization from './app/modules/people/people-organization.vue';
import PeopleAdd from './app/modules/people/add-people.vue';
import PeopleRemainders from './app/modules/people/people-view-remainders.vue';
import PeopleInfo from './app/modules/people/people-info-tab.vue';

export const bus = mitt();

window.Comlink = Comlink;
window.ComlinkWorker = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));
window.axios = require('axios');
dayjs.extend(utc);
dayjs.extend(timezone);
window.dayjs = dayjs;
var relativeTime = require('dayjs/plugin/relativeTime');
// var utc = require('dayjs/plugin/utc');
// var timezone = require('dayjs/plugin/timezone');

window.dayjs.extend(relativeTime);
// window.dayjs.extend(utc);
// window.dayjs.extend(timezone);
// window.timezone = timezone;


// const NewTaskForm = () => import(/* webpackChunkName: "new-task-form" */ './app/modules/task/new-task-form.vue');
const NotificationTypeSubscriptionPage = () => import(/* webpackChunkName: "notification-subscription-page" */ './app/modules/notifications/notification-subscription.vue');
// const Dashboard = defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ './app/modules/dashboard/dashboard.vue'));

const app = createApp(App);

// app.component('dashboard', Dashboard);

app.component('task-list-item-format-1', TaskListItemFormat1);
app.component('task-list-item-format-2', TaskListItemFormat2);
app.component('ui-icon', UIIcon);
app.component('ui-selectbox', UISelectBox);
app.component('ui-selectbox-2', UISelectBox2);
app.component('ui-selectbox-single', UISelectBoxSingle);
app.component('taskview', defineAsyncComponent(() => import(/* webpackChunkName: "task-view-2" */ './app/modules/task/taskview.vue'))); // TaskView);
app.component('taskview-format-1', defineAsyncComponent(() => import(/* webpackChunkName: "task-view-format-12" */ './app/modules/task/task-view-format-1.vue'))); // TaskView);
app.component('taskview-format-2', defineAsyncComponent(() => import(/* webpackChunkName: "task-view-format-22" */ './app/modules/task/task-view-format-2.vue'))); // TaskView);
app.component('rtaskview-format-2', defineAsyncComponent(() => import(/* webpackChunkName: "rtask-view-format-22" */ './app/modules/task/rtask-view-format-2.vue'))); // TaskView);
app.component('task-search-modal', TaskSearchModal);
app.component('task-info-tab', TaskViewInfoTab);
app.component('task-activity-tab', TaskViewActivityTab);
app.component('task-subtasks-tab', TaskViewSubtasksTab);
app.component('task-forms-tab', TaskViewFormsTab);
app.component('task-files-tab', TaskFilesTab);
app.component('new-task-form', defineAsyncComponent(() => import(/* webpackChunkName: "new-task-form-modal" */ './app/modules/task/new-task-form.vue')));
app.component('new-scheduled-task-form', NewScheduledTaskForm);
app.component('new-recurring-task-form', NewRecurringTaskForm);
app.component('new-task-template-form', NewTaskTemplateForm);

app.component('new-chart-preference-form', defineAsyncComponent(() => import(/* webpackChunkName: "new-chart-preference-form" */ './app/modules/dashboard/new-chart-preference-form.vue')));

// app.component('new-subtask-form', NewSubTaskForm);

app.component('notification-panel', NotificationsPanel);
app.component('user-profile-panel', UserProfilePanel);
app.component('notification-subscription-form', NotificationSubscriptionForm);

app.component('chat-book', ChatBook);
app.component('chat-page', ChatPage);

// app.component('vue-textarea', TextAreaComponent);

app.component('component-a', ComponentA);
app.component('component-b', ComponentB);

app.component('cron-builder', defineAsyncComponent(() => import(/* webpackChunkName: "cron-builder" */ './app/modules/task/cron-builder.vue'))); // CronBuilder);


app.component('activity-form-tab', ActivityFormTab);
app.component('task-form-component', TaskFormComponent);
app.component('new-form', NewForm);
app.component('view-form-data', ViewFormData);
app.component('edit-form-data', EditFormData);


app.component('Clients', Clients);
app.component('clients-list-item', ClientsItem);
app.component('client-view-formate', ClientsViewFormate);
app.component('clients-contacts', ClientsContacts);
app.component('clients-activity-tab', ClientsActivity);
app.component('clients-about', ClientsAbout);
app.component('client-info-tab', ClientsInfo);
app.component('clients-subtasks-tab', ClientsTasks);
app.component('add-client', ClientsAdd);





app.component('People', People);
app.component('people-list-item', PeopleItem);
app.component('people-view-formate', PeopleViewFormate);
app.component('people-activity-tab', PeopleActivity);
app.component('people-information', PeopleInformation);
app.component('people-organization', PeopleOrganization);
app.component('add-people', PeopleAdd);
app.component('people-info-tab', PeopleInfo)
app.component('people-view-remainders', PeopleRemainders);
app.use(store)
  .use(router)
  .mount('#app');
