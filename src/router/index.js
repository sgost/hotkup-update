import { createRouter, createWebHashHistory } from 'vue-router';
// import Home from '../views/Home.vue';

import App from './../app/adk-app.vue';
// import ADKHome from './../app/adk-home.vue';

// UI components
import UIIcon from './../app/ui-components/ui-icon.vue';
import UISelectBox from './../app/ui-components/ui-selectbox.vue';
import UISelectBoxSingle from './../app/ui-components/ui-selectbox-single.vue';

// import TaskInboxGM from "./../app/wireframes/task-inbox-gmail.vue"; /* Not used in app, but can stay for reference of layouts. */
// import TaskViewGM from "./../app/wireframes/task-view-gmail.vue";

import TaskInbox from './../app/modules/task/task-inbox.vue';
import TaskActivityChannel from './../app/modules/channels/task-activity-channel.vue';
import NewTaskForm from './../app/modules/task/new-task-form.vue';
import NewChartPreferenceForm from './../app/modules/dashboard/new-chart-preference-form.vue';
import CronBuilder from './../app/modules/task/cron-builder.vue';

import NewScheduledTaskForm from './../app/modules/task/new-scheduled-task-form.vue';
import NewRecurringTaskForm from './../app/modules/task/new-recurring-task-form.vue';
import NewTaskTemplateForm from './../app/modules/task/new-task-template-form.vue';
// import NewSubTaskForm from './../app/modules/task/new-subtask-form.vue';
import TaskSearchModal from './../app/modules/task/task-search-modal.vue';
import TaskViewInfoTab from './../app/modules/task/task-info-tab.vue';
import TaskViewActivityTab from './../app/modules/task/task-activity-tab.vue';
import TaskViewSubtasksTab from './../app/modules/task/task-subtasks-tab.vue';
import TaskViewFormsTab from './../app/modules/task/task-forms-tab.vue';

import ChatBook from './../app/modules/chat/chat-book.vue';
import ChatPage from './../app/modules/chat/chat-page.vue';

import Calendar from './../app/modules/calendar/calendar.vue';

import ComponentA from './../app/modules/test/component-a.vue';
import ComponentB from './../app/modules/test/component-b.vue';

// import TaskInboxPrivate from './../app/wireframes/task-inbox-private.vue';
// import TaskCreate from './../app/task-create.vue';
// import PrivateTaskCreate from './../app/wireframes/task-create-private.vue';
// import SubTaskCreate from './../app/task-create-sub.vue';
// import TaskViewPrivate1 from './../app/wireframes/task-view-private-1.vue';
// import TaskViewPrivate2 from './../app/wireframes/task-view-private-2.vue';

// import TextAreaComponent from './../app/textarea-component.vue';
import NotificationSubscriptionForm from './../app/modules/notifications/notification-subscription-form.vue';

import NotificationsPanel from './../app/modules/notifications/notifications-panel.vue';


import TaskFormComponent from './../app/modules/mocks/task-form-component.vue';
import MockNewForm from './../app/modules/mocks/new-form.vue';
import MockEditFormData from './../app/modules/mocks/edit-form-data.vue';
import MockViewFormData from './../app/modules/mocks/view-form-data.vue';

const NotificationTypeSubscriptionPage = () => import(/* webpackChunkName: "notification-subscription-page" */ './../app/modules/notifications/notification-subscription.vue');



const routesObsolete = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const routes = [
  {
    path: '/',
    name: 'home',
    component: TaskInbox
  },
  {
    path: '/new-form/:attachmentId',
    name: 'new-form',
    component: MockNewForm
  },
  {
    path: '/edit-form-data/:attachmentDataId',
    name: 'edit-form-data',
    component: MockEditFormData
  },
  {
    path: '/view-form-data/:attachmentDataId',
    name: 'view-form-data',
    component: MockViewFormData
  },
  {
    path: '/view-form/:attachmentId',
    name: 'view-form',
    component: TaskFormComponent
  },

  // Task Pages
  {
    path: '/task/inbox/',
    name: 'view-task-inbox',
    component: TaskInbox
  },
  {
    path: '/task/inbox/:taskId/:subtaskId',
    name: 'view-task-inbox-specific-task',
    component: TaskInbox
  },
  // {
  //   path: '/task/new/',
  //   name: 'create-new-task',
  //   component: NewTaskForm
  // },
  // {
  //   path: '/task/new-subtask/',
  //   name: 'create-new-subtask',
  //   component: NewSubTaskForm
  // },
  // {
  //   path: '/task-private/new/',
  //   name: 'create-private-task-page',
  //   component: PrivateTaskCreate
  // },
  // {
  //   path: '/task-sub/new/',
  //   name: 'create-sub-task-page',
  //   component: SubTaskCreate
  // },
  // {
  //   path: '/task/123/view',
  //   name: 'view-task-page',
  //   component: TaskView
  // },
  // {
  //     path : "/task/inbox-gm",
  //     name : "view-task-inbox",
  //     component : TaskInboxGM
  // },
  // {
  //   path: '/task/private-inbox',
  //   name: 'view-private-task-inbox',
  //   component: TaskInboxPrivate
  // },
  // {
  //   path: '/private-task/123a/view',
  //   name: 'view-privatetask1-page',
  //   component: TaskViewPrivate1
  // },
  // {
  //   path: '/private-task/123b/view',
  //   name: 'view-privatetask2-page',
  //   component: TaskViewPrivate2
  // },

  // Chat Component Routes
  {
    path: '/chat',
    name: 'chat-component',
    component: ChatBook
  },

  // Calendar Component Routes
  {
    path: '/calendar',
    name: 'calendar-component',
    component: Calendar
  },

  // NotificationTypeSubscriptionPage Management
  {
    path: '/notification-subscriptions',
    name: 'notification-subscriptions',
    component: NotificationTypeSubscriptionPage
  },

  {
    path: '/ca',
    name: 'ca',
    component: ComponentA
  },
  {
    path: '/cb',
    name: 'cb',
    component: ComponentB
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
