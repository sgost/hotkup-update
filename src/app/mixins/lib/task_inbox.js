
import * as Comlink from 'comlink';
import { bus } from '../../../main.js';

export default {
  data: function () {
    return {
    };
  },
  methods: {

    // Utility methods.

    enableTaskListPaginationIntersectionObserver () {

      this.taskList.observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio <= 0) {
          // If not in view

        } else {
          // observer.unobserve(document.getElementById(observerElement));

          // Pull more data only if all records are not fetched.
          if (this.taskList.allRecordsFetched === false)
          {
            // Increment the current page number
            this.taskList.pageNumber += 1;
            this.getTaskList();
          }
        }
      },
      {
        root: null,
        rootMargin: '0px'
      });

      setTimeout(() => {
        this.taskList.observer.observe(document.getElementById(this.taskList.observerElement));
        this.taskList.isIntersectionObserverFired = true;
      }, 1000);
    },

    disableTaskListPaginationIntersectionObserver () {

        if (document.getElementById(this.taskList.observerElement) !== null && document.getElementById(this.taskList.observerElement) !== undefined) {
          this.taskList.observer.unobserve(document.getElementById(this.taskList.observerElement));
        }
    },

    // Utility methods ends here.

    // Writing the new TaskList function
    refreshPaneList () {

        // alert('Refresh tasks list');
        this.taskList.allRecordsFetched = false;
        this.taskList.pageNumber = 1;
        this.taskList.list = [];

        this.disableTaskListPaginationIntersectionObserver();
        this.taskList.isIntersectionObserverFired = false;
        this.getTaskList();

        bus.emit('refresh-task-counts', {});
    },

    getTaskList () {

      if (this.taskList.allRecordsFetched) { return false; }

      const pageNumber = this.taskList.pageNumber;
      let searchQuery = (this.taskList.searchQuery !== '') ? this.taskList.searchQuery : 'all';

      if (searchQuery.startsWith("#")) {
        searchQuery = "search_task_number" + searchQuery.split("#")[1];
      }

      // alert(searchQuery);
      let url = `./tasks/list/${pageNumber}/${searchQuery}`;

      if (this.appliedTaskFilter === "category") { // (this.isCategoryFilterOn) {
        url = `./tasks/list-by-category/${this.filterByCategoryId}/${pageNumber}/${searchQuery}`;
      } else if (this.appliedTaskFilter === "inbox" || this.appliedTaskFilter === "sent" || this.appliedTaskFilter === "overdue" || this.appliedTaskFilter === "closed") { // (this.isTaskFilterOn) {
        url = `./tasks/list/${pageNumber}/${searchQuery}/${this.appliedTaskFilter}`; // ${this.taskFilter}`;
      } else {
        url = `./tasks/list/${pageNumber}/${searchQuery}`;
      }

      // Attempting to use Comlink Worker
          const get_url = url;
          const callbackFunction = (dataResponse) => {

            dataResponse.data = dataResponse;

            if (dataResponse.data.actionResult === 1) {

              const listOfTasks = (dataResponse.data.bean);// .slice(0, 10);

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
                  task.dueDateTimeFormatted = dayjs(task.dueDateTime + "Z").format('DD MMM'); // ('DD/MM/YYYY HH:mm');
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

    } // ,





  }
};
