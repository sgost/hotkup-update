
import * as Comlink from 'comlink';
import { bus } from '../../../main.js';

export default {
  data: function () {
    return {
    };
  },
  methods: {

    viewSubtaskForm (subTaskId, tabToDisplay) {
      this.selectedSubTaskId = subTaskId;
      this.selectedSubTaskTabToDisplay = tabToDisplay;
      UIkit.modal(document.querySelector('#view-subtask-form-modal')).show();
      return false;
    },
    viewRecurringTasksForm (rTaskId) {
      this.selectedRTaskId = rTaskId;
      UIkit.modal(document.querySelector('#view-rtask-form-modal')).show();
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
      UIkit.modal(document.querySelector('#new-recurring-task-form-modal')).hide();
      return false;
    },
    closeRTaskViewModal () {
      UIkit.modal(document.querySelector('#view-rtask-form-modal')).hide();
      return false;
    },
    closeNewRecurringTaskModal () {
      UIkit.modal(document.querySelector('#new-task-form-modal')).hide();
      UIkit.modal(document.querySelector('#new-subtask-form-modal')).hide();
      UIkit.modal(document.querySelector('#view-subtask-form-modal')).hide();
      UIkit.modal(document.querySelector('#task-from-template-modal')).hide();
      UIkit.modal(document.querySelector('#new-recurring-task-form-modal')).hide();
      return false;
    },
    showNewTaskForm (data) {
      console.log('Showing new task form', data);



      this.modalFormKey = data.modalKey;
      console.log("possibleAssignees :: ", data.possibleAssignees);

      this.possibleAssignees = data.possibleAssignees;
      this.possibleFollowers = data.possibleFollowers;

      // this.taskFromChatMessageData = {
      //   subject: data.subject,
      //   description: data.subject,
      //   possibleAssignees: data.possibleAssignees,
      //   possibleFollowers: data.possibleFollowers
      // };

      // If the event was triggered from the chat conversation, only then populate this 'taskFromChatMessageData' property.
      if (data.eventSource === "convertChatMessageToTaskEvent") {
        this.taskFromChatMessageData = data;
        bus.emit('displayNewTaskFormFromConvertToTaskEvent', data);
      }


      console.log("If this is a task created from chat msg, then taskFromChatMessageData = ", this.taskFromChatMessageData);
      UIkit.modal(document.querySelector('#new-task-form-modal')).show();

    },
    showNewRecurringTaskForm (data) {
      console.log('Showing new task form', data);



      this.modalFormKey = data.modalKey;
      console.log("possibleAssignees :: ", data.possibleAssignees);

      this.possibleAssignees = data.possibleAssignees;
      this.possibleFollowers = data.possibleFollowers;

      // this.taskFromChatMessageData = {
      //   subject: data.subject,
      //   description: data.subject,
      //   possibleAssignees: data.possibleAssignees,
      //   possibleFollowers: data.possibleFollowers
      // };

      // If the event was triggered from the chat conversation, only then populate this 'taskFromChatMessageData' property.
      if (data.eventSource === "convertChatMessageToTaskEvent") {
        this.taskFromChatMessageData = data;
        bus.emit('displayNewTaskFormFromConvertToTaskEvent', data);
      }


      console.log("If this is a task created from chat msg, then taskFromChatMessageData = ", this.taskFromChatMessageData);
      UIkit.modal(document.querySelector('#new-recurring-task-form-modal')).show();

    },
    showNewTaskFormFromTemplate (data) {

      this.modalFormKey = "new_template_task";

      console.log("If this is a task created from chat msg, then taskFromChatMessageData = ", this.taskFromChatMessageData);
      UIkit.modal(document.querySelector('#new-task-form-modal')).show();
    },
    showNewScheduledTaskForm (data) {
      console.log('Showing new scheduled task form');

      this.modalFormKey = data.modalKey;

      // Toggle the active state of the list-item
      document.querySelectorAll('.active').forEach(item => item.classList.remove('active'));
      this.isTaskCreationInProcess = true;
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
    },
    showNewRecurringTaskFormObsolete (data) {
      console.log('Showing new recurring task form');
      this.modalFormKey = data.modalKey;

      // Toggle the active state of the list-item
      document.querySelectorAll('.active').forEach(item => item.classList.remove('active'));
      this.isTaskCreationInProcess = true;
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
    },
    showNewSubTaskForm (parentTask) {
      console.log('Showing new-sub-task-form for ParentTask : ', parentTask);
      this.modalFormKey = "new_sub_task";

      this.isTaskChosen = false;
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
    } // ,


  }
};
