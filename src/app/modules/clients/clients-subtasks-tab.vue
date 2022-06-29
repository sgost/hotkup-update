<template>
    <div>
      <div v-show="availableSubtasks.length==0" style="text-align:center;border-bottom: 0px;"> No subtasks added </div>
      <div  v-show="availableSubtasks.length>0"  class="subtask_row" style="background: #f2f2f2;border: 1px solid transparent;border-bottom: 0px;text-transform: uppercase;font-size: 0.55rem;">
          <div style=";justify-self: end;">Task No.</div>
          <div >Title</div>
          <div >Dependency Tasks</div>
          <div  style="color: rgb(51, 51, 51);">Due Date</div>
          <div  style="color: rgb(51, 51, 51);">Status</div>
      </div>
      <div v-show="availableSubtasks.length>0"  class="subtasks_box">

          <template v-for="subtask in availableSubtasks">

              <div class="subtask_row" >
                <div style="font-weight:normal;justify-self: end;"><a v-on:click="viewSubTask(subtask.id)">#{{subtask.sno}}</a></div>
                <div style="cursor:pointer" v-on:click="viewSubTask(subtask.id)">{{subtask.name}}</div>
                <div v-on:click="openDependencyModalForSubTask(subtask)" style="display:flex;column-gap:5px">
                    <div uk-tooltip="Click to view and update dependency tasks" v-show="subtask.dependencyTasksLabel!='none'"><a>{{subtask.dependencyTasksLabel}}</a></div>
                    <div uk-tooltip="Click to add dependency tasks" v-show="subtask.dependencyTasksLabel=='none'"><a>+ Add</a></div>
                </div>
                <div style="color:#333">{{subtask.dueDateTime}}</div>
                <div>
                    <span v-if="subtask.statusInfo!==null && subtask.statusInfo.label=='In progress'" style="color: rgb(46 166 253);text-transform: uppercase;font-size: 0.6rem;letter-spacing: 0.5px;">{{subtask.statusInfo.label}}</span>
                    <span v-else-if="subtask.statusInfo!==null && subtask.statusInfo.label=='Completed'" style="color:rgb(39 199 0);text-transform: uppercase;font-size: 0.6rem;letter-spacing: 0.5px;">{{subtask.statusInfo.label}}</span>
                    <span v-else-if="subtask.statusInfo!==null" style="color: rgb(46 166 253);text-transform: uppercase;font-size: 0.6rem;letter-spacing: 0.5px;">{{subtask.statusInfo.label}}</span>
                </div>
              </div>

          </template>
      </div>

      <div id="dependency-subtasks-modal" class="uk-flex-top" uk-modal>
          <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="width: 60%;font-size: 0.65rem;padding: 35px;">
              <button class="uk-modal-close-default" type="button" uk-close></button>

              <div  v-show="availableSubtasks.length>0"  class="depedencytask_row" style="background: #f2f2f2;border: 1px solid transparent;border-bottom: 0px;text-transform: uppercase;font-size: 0.55rem;">
                  <div>
                  </div>
                  <div style=";justify-self: end;">Task No.</div>
                  <div >Title</div>
                  <div  style="color: rgb(51, 51, 51);">Due Date</div>
                  <div  style="color: rgb(51, 51, 51);">Status</div>
              </div>
              <div v-show="availableSubtasks.length>0"  class="subtasks_box">
                  <template v-for="subtask in availableDependencySubtasks">
                      <div v-if="!subtask.willCauseDeadlock"  v-on:click="updateSelectedItem(subtask)"  class="depedencytask_row">
                        <div>
                          <div style="border:1px solid #555;height: 15px;width: 15px;display: grid;cursor:pointer">
                            <span v-show="subtask.isSelected" uk-icon="check" style="background: #1f69bd;color: white;"></span>
                          </div>
                        </div>
                        <div style="font-weight:normal;justify-self: end;">
                          <a>#{{subtask.sno}}</a>
                        </div>
                        <div style="cursor:pointer">{{subtask.name}}</div>
                        <div style="color:#333">{{subtask.createdOn}}</div>
                        <div>
                            <span v-if="subtask.status=='In progress'" style="color: rgb(46 166 253);text-transform: uppercase;font-size: 0.6rem;letter-spacing: 0.5px;">{{subtask.status}}</span>
                            <span v-else-if="subtask.status=='Completed'" style="color:rgb(39 199 0);text-transform: uppercase;font-size: 0.6rem;letter-spacing: 0.5px;">{{subtask.status}}</span>
                            <span v-else style="color: rgb(46 166 253);text-transform: uppercase;font-size: 0.6rem;letter-spacing: 0.5px;">{{subtask.status.split("#")[1]}}</span>
                        </div>
                      </div>
                      <div v-if="subtask.willCauseDeadlock" style="filter: opacity(0.5);" class="depedencytask_row">
                        <div v-bind:uk-tooltip="'This will cause deadlock. This task #'+ subtask.sno +' is already dependent on #' + currentlySelectedSubtaskForDependencyUpdate.sno " >
                          <div style="border: 1px solid rgb(226 226 226);height: 15px;width: 15px;display: grid;cursor: pointer;">
                            <span v-show="subtask.isSelected" uk-icon="close" style="background: #1f69bd;color: white;"></span>
                          </div>
                        </div>
                        <div v-bind:uk-tooltip="'This will cause deadlock. This task #'+ subtask.sno +' is already dependent on #' + currentlySelectedSubtaskForDependencyUpdate.sno "  style="font-weight:normal;justify-self: end;">
                          <a>#{{subtask.sno}}</a>
                        </div>
                        <div v-bind:uk-tooltip="'This will cause deadlock. This task #'+ subtask.sno +' is already dependent on #' + currentlySelectedSubtaskForDependencyUpdate.sno " style="cursor:pointer">{{subtask.name}}</div>
                        <div style="color:#333">{{subtask.createdOn}}</div>
                        <div>
                            <span v-if="subtask.status=='In progress'" style="color: rgb(46 166 253);text-transform: uppercase;font-size: 0.6rem;letter-spacing: 0.5px;">{{subtask.status}}</span>
                            <span v-else-if="subtask.status=='Completed'" style="color:rgb(39 199 0);text-transform: uppercase;font-size: 0.6rem;letter-spacing: 0.5px;">{{subtask.status}}</span>
                            <span v-else style="color: rgb(46 166 253);text-transform: uppercase;font-size: 0.6rem;letter-spacing: 0.5px;">{{subtask.status.split("#")[1]}}</span>
                        </div>
                      </div>
                  </template>
              </div>
          </div>
      </div>
    </div>
</template>

<script>

import userMixinLib from '../../mixins/lib/user_mixin_lib';
import utilsMixinLib from '../../mixins/lib/utils_lib';
import uiListMixinLib from '../../mixins/lib/ui-list.js';
import { bus } from '../../../main.js';

export default {
  mixins: [
    userMixinLib,
    utilsMixinLib,
    uiListMixinLib
  ],
  props: ['id'],
  data: function () {
    return {
      availableSubtasks: [],
      availableDependencySubtasks: [],
      currentlySelectedSubtaskForDependencyUpdate: null
    };
  },
  methods: {
    someFunction (elem) { console.log(elem); },
    goToHomePage () {
      this.$router.push({
        name: 'home',
        params: {}
      });
    },
    viewSubTask (subTaskId) {
      // v-on:click="viewSubTask(subtask.id)"
      bus.emit('viewSubTaskEvent', {
        subTaskId: subTaskId,
        modalKey: "view_sub_task"
      });
      return false;

      // obsoleting the below and showing it in modal
      this.$router.push({
        name: 'view-task-inbox',
        params: {
          taskId: this.$route.params.taskId,
          subtaskId: subTaskId
        }
      });
    },
    loadSubtasks () {
      try {
        const url = './tasks/list/all-subtasks/' + this.id; // Fetch all subtasks
        // console.log("loading subtasks : " + url);
        this.getUnpaginatedList('subtasks', url); // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
      } catch (e) {
        alert(e);
      }
    },

    // Callbacks of loadPotentialUsers function.
    handleUnpaginatedListData (listKey, data) {
      if (listKey === 'subtasks') { this.handleFetchedSubtasks(data); } else if (listKey === 'dependency_subtasks') { this.handleFetchedDependencySubtasks(data); }
    },
    handleUnpaginatedListDataError (error) {
      console.error('Unpaginated List data fetch error : ', error);
    },
    handleFetchedSubtasks (dataResponse) {
      // Pass it to the availableAssignees prop to the dropdown.
      // console.log("Potential subtasks : ", dataResponse);

      this.availableSubtasks = [];
      const subTasks = dataResponse.data.bean;
      subTasks.forEach((item) => {

        if (item.dueDateTime !== null) {
          item.dueDateTime = this.convertUTCDateFromServerToLocalDate(item.dueDateTime);
          console.log('item.dueDateTime = ', item.dueDateTime);
        }


        // Update the labels in the gridrow based on the latest values.
        if (item.dependencyTaskIds === null) {
          item.dependencyTaskIds = [];
        }

        if (item.dependencyTaskIds !== null) {
          const dependencyTasksLabelArray = [];
          let dependencyTasksLabel = 'none';
          item.dependencyTaskIds.forEach((dTaskId) => {
            dependencyTasksLabelArray.push('#' + dTaskId.split('#')[1]);
          });

          dependencyTasksLabel = dependencyTasksLabelArray.length > 0 ? dependencyTasksLabelArray.join(', ') : 'none';
          item.dependencyTasksLabel = dependencyTasksLabel;
        } else {
          item.dependencyTasksLabel = 'none';
        }

        this.availableSubtasks.push(item);
      });
    },

    openDependencyModalForSubTask (subTask) {
      this.currentlySelectedSubtaskForDependencyUpdate = subTask;
      // console.log("SubTasks's dependency tasks are : ", subTask["dependencyTaskIds"]);  //These items must be checked when displaying the list in modal.
      this.availableDependencySubtasks = [];
      const dependencyTaskIds = subTask.dependencyTaskIds;

      this.availableSubtasks.forEach((item) => {
        if (subTask.id !== item.id) {
          let willCauseDeadlock = false;

          // Deadlock scenario handling.
          // Check for deadlocking scenario where #T2 is dependent on #T1, then T1's dependency list must not show '#T2'. Otherwise it will cause a deadlock.
          if (item.dependencyTaskIds.includes(subTask.id + '#' + subTask.sno)) {
            willCauseDeadlock = true;
            item.isSelected = false;
            item.willCauseDeadlock = true; // label this to show it cannot be selected.
            this.availableDependencySubtasks.push(item);
          }

          if (!willCauseDeadlock) {
            // Iterate through this selected task's existing dependency tasks and then show the checkbox as checked.
            let isDependentTask = false;

            if (dependencyTaskIds !== null) {
              dependencyTaskIds.forEach((dependencyTaskId) => {
                if ((item.id + '#' + item.sno) === dependencyTaskId) {
                  isDependentTask = true;
                }
              });
            }

            item.isSelected = isDependentTask; // make this true if this taskid is present in the dependencytaskIds
            item.willCauseDeadlock = false;
            this.availableDependencySubtasks.push(item);
          }
        }
      });

      UIkit.modal(document.querySelector('#dependency-subtasks-modal')).show();
    },

    updateSelectedItem (dependencySubtask) {
      const action = dependencySubtask.isSelected ? 'REMOVE' : 'ADD';

      // Change the 'isSelected' state to give immediate feedback and once again update the state after the response is received from the server.;
      if (action === 'ADD') {
        dependencySubtask.isSelected = true;
      } else if (action === 'REMOVE') {
        dependencySubtask.isSelected = false;
      }

      this.updateDependencyTask(this.currentlySelectedSubtaskForDependencyUpdate.id, dependencySubtask, action);
    },
    updateDependencyTask (taskId, dependencySubtask, action) {
      const post_url = './tasks/update-dependency-task';

      const form = {
        taskId: taskId,
        dependencyTaskId: dependencySubtask.id + '#' + dependencySubtask.sno,
        action: action
      };

      console.log('Task Dependency Update Data : ', form);
      // return false;

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {
          console.log('Task Dependency Update Result : ');
          console.log(dataResponse);

          if (dataResponse.data.actionResult === 1) {
            this.newWorkgroupInfo = dataResponse.data.bean;

            const action = form.action === 'ADD' ? ' added ' : 'removed';

            if (form.action === 'ADD') {
              dependencySubtask.isSelected = true;
              this.currentlySelectedSubtaskForDependencyUpdate.dependencyTaskIds.push(form.dependencyTaskId);
            } else if (form.action === 'REMOVE') {
              dependencySubtask.isSelected = false;

              this.currentlySelectedSubtaskForDependencyUpdate.dependencyTaskIds
                .forEach((dependencyTaskId, index) => {
                  if (dependencyTaskId === form.dependencyTaskId) {
                    this.currentlySelectedSubtaskForDependencyUpdate.dependencyTaskIds.splice(index, 1);
                  }
                });
            }

            // Update the labels in the gridrow based on the latest values.
            if (this.currentlySelectedSubtaskForDependencyUpdate.dependencyTaskIds === null) {
              this.currentlySelectedSubtaskForDependencyUpdate.dependencyTaskIds = [];
            }

            if (this.currentlySelectedSubtaskForDependencyUpdate.dependencyTaskIds !== null) {
              const dependencyTasksLabelArray = [];
              let dependencyTasksLabel = 'none';
              this.currentlySelectedSubtaskForDependencyUpdate.dependencyTaskIds.forEach((dTaskId) => {
                dependencyTasksLabelArray.push('#' + dTaskId.split('#')[1]);
              });

              dependencyTasksLabel = dependencyTasksLabelArray.length > 0 ? dependencyTasksLabelArray.join(', ') : 'none';
              this.currentlySelectedSubtaskForDependencyUpdate.dependencyTasksLabel = dependencyTasksLabel;
            }

            UIkit.notification(`<div class="taskone-notification">
                                                <span uk-icon="icon: check;ratio:1"></span>
                                                <div>Dependency task was ${action}.</div>
                                            </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 500000
            });

            document.getElementById('saveButton').innerHTML = btnText;
            this.enableHTMLElement(document.getElementById('saveButton'));

            this.$emit('refreshList', {});
          } else {
            const errorMsg = (dataResponse.data).message;
            UIkit.notification("<span uk-icon='icon: warning;ratio:1'></span>" + errorMsg, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });

            document.getElementById('saveButton').innerHTML = btnText;
            this.enableHTMLElement(document.getElementById('saveButton'));
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
          return false;
        });
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
    this.loadSubtasks();
    // console.log("Mounted task-info-form-tab.vue component");
    // this.$store.commit('increment');
    // this.storeCounter();
    // console.log('Accessing vuex store ', this.$store)
    // console.log('Store data accessed from home page : ' + this.$store.getters.count)
    // console.log('Done.........................')

    bus.on('refreshSubTasksList', (data) => {
      this.loadSubtasks();
    });

    bus.off("reload_task_details");
    bus.on("reload_task_details", (data) => {
      this.loadSubtasks();
    });
  },
  watch: {
    // Since we are passing an asynced data as 'availableItems', it is necessary to watch this prop when it receives new data.
    id: function (newId, oldId) {
      this.loadSubtasks();
    },
    '$route.params.subtaskId' (newSubTaskId, oldSubTaskId) {
      console.log('SubTask ID changed from ' + oldSubTaskId + ' to ' + newSubTaskId + ' in the forms/task/task-subtasks-tab.vue component.');
    }
  }
};

</script>

<style scoped>

  .task_details_container {
    display: grid;
    grid-template-rows: auto 1fr;
    overflow-y: hidden;
  }

  .task_details_container .task_title {
    font-size: 1.25rem;
    font-weight: bold;
    padding: 0px;
    margin-left: 0px;
  }

  .task_details_container .task_created_by {
    font-size: 0.65rem;
    font-weight: bold;
  }

  .task_details_container .task_created_on {
    font-size: 0.65rem;
    font-weight: bold;
  }

  .tab-bar > li > a {
    display: flex;
    column-gap: 10px;
  }

  .tab-bar > li .tab_label {
    display: none;
  }

  .tab-bar > li.uk-active .tab_label {
    display: block !important;
  }

  .uk-subnav-pill > * > a {
    font-size: 0.55rem !important;
    border-radius: 0px;
    letter-spacing: 0.075rem;
  }

  .uk-subnav-pill > .uk-active > a {
    border-bottom: 2px solid #3977ff !important;
    color: #4780ff;
    background-color: white !important;
  }

  .uk-input, .uk-select:not([multiple]):not([size]) {
      height: 35px;
      vertical-align: middle;
      display: inline-block;
      border-radius: 3px;
  }

  .uk-grid-small > div{
    margin-bottom:0px;
  }

  .uk-form-label {
      font-size: .5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
  }

  .subtasks_box{
    display: grid;
    -moz-column-gap: 30px;
    column-gap: 30px;
    grid-template-columns: 1fr;
    border: 1px solid transparent;
    border-bottom: 0px;
  }

  .subtask_row{
    position: relative;
    padding: 5px 10px;
    display: grid;
    align-items: end;
    height: 30px;
    justify-items: start;
    grid-template-columns: 60px 5fr 2fr 2fr 2fr;
    -moz-column-gap: 20px;
    column-gap: 20px;
    border-bottom: 1px solid #f3f3f3;
    border-left: 5px solid transparent;
    background-color: rgb(255 255 255);
    font-size: 0.65rem;
  }

  .subtask_row:hover{
    border-left: 5px solid rgb(31 105 189);
  }

  .subtask_row>div{
    margin-bottom:5px;
  }

  .depedencytask_row{
    position: relative;
    padding: 5px 10px;
    display: grid;
    align-items: end;
    height: 30px;
    justify-items: start;
    grid-template-columns: 20px 60px 5fr 2fr 1fr;
    -moz-column-gap: 20px;
    column-gap: 20px;
    border-bottom: 1px solid #f3f3f3;
    border-left: 5px solid transparent;
    background-color: rgb(255 255 255);
    font-size: 0.65rem;
  }

  .depedencytask_row:hover{
    border-left: 5px solid transparent;
  }

  .depedencytask_row>div{
    margin-bottom:5px;
  }

  .ui-selectbox-option {
    display: flex;
    column-gap: 10px;
    cursor: pointer;
    padding: 5px;
  }

  .ui-selectbox-option:hover {
    background-color: #f0f0f0;
  }

</style>
