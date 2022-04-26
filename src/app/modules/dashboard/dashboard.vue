<template>
  <div style="position: relative;width: 100%;box-sizing: border-box;padding: 25px;align-items: center;display: flex;">

    <div class="dashboard-overlay" id="dashboard-overlay" style="transition:0.5s linear;z-index: 2;position: absolute;inset: 0px;display: grid;place-items: center;background: white;opacity: 0.95;">
      Loading charts..
    </div>

    <div class="float-container" style="z-index:1;width:100%;font-size:0.55rem;align-items:center;row-gap: 75px;">



        <div class="chart-container">
            <div class="chart-title">Involved Tasks count by status</div>
            <div class="float-child" id="chart0" style="width: 300px; height: 175px"></div>
        </div>

        <div class="chart-container">
            <div class="chart-title">Sent Tasks count by status</div>
            <div class="float-child" id="chartSentTasksCount" style="width: 300px; height: 175px"></div>
        </div>

        <div class="chart-container">
            <div class="chart-title">Task count by filters</div>
            <div class="float-child" id="chart1" style="width: 300px; height: 175px"></div>
        </div>

        <div class="chart-container">
            <div class="chart-title">Task count by priority</div>
            <div class="float-child" id="chart4" style="width: 300px; height: 175px"></div>
        </div>

        <div class="big-container">
            <div class="chart-title">Task count % by category</div>
            <div class="float-child" id="chart3" style="width: 600px; height: 175px"></div>
        </div>


    </div>



    <div id="view-tasks-modal" class="uk-flex-top" uk-modal>
         <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="width: 60%;font-size: 0.65rem;padding: 35px;">
             <button class="uk-modal-close-default" type="button" uk-close></button>

             <div  v-show="matchingTasks.length>0"  class="depedencytask_row" style="background: #f2f2f2;border: 1px solid transparent;border-bottom: 0px;text-transform: uppercase;font-size: 0.55rem;">
                 <div style=";justify-self: end;">Task No.</div>
                 <div >Title</div>
                 <div  style="color: rgb(51, 51, 51);">Due Date</div>
                 <div  style="color: rgb(51, 51, 51);">Status</div>
             </div>
             <div v-show="matchingTasks.length>0"  class="subtasks_box">
                 <template v-for="subtask in matchingTasks">
                     <div v-if="!subtask.willCauseDeadlock"  v-on:click="updateSelectedItem(subtask)"  class="depedencytask_row">
                       <div style="font-weight:normal;justify-self: end;">
                         <a >#{{subtask.sno}}</a>
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

import userMixinLib from './../../mixins/lib/user_mixin_lib';
import utilsMixinLib from './../../mixins/lib/utils_lib';
import uiListMixinLib from './../../mixins/lib/ui-list.js';

export default {
   mixins: [
    userMixinLib,
    utilsMixinLib,
    uiListMixinLib
  ],
  data () {
    return {
      chartLabels: ["Inbox", "Sent", "Overdue", "Completed"],
      chartValues: [2, 2, 6, 4],
      chartStatusLabels: ["Open", "Started", "Overdue", "Closed"],
      chartStatusValues: [2, 2, 6, 4],
      sentChartStatusLabels: ["Open", "Started", "Overdue", "Closed"],
      sentChartStatusValues: [2, 2, 6, 4],
      timeTakenData: {
        expectedCompletionHours: [2, 3, 6, 4],
        actualCompletionHours: [3, 1, 4, 7]
      },
      pieChartData: [
        ["Inbox", 7],
        ["Sent", 13],
        ["Overdue", 14],
        ["Completed", 5]
      ],
      myCategoriesMap: {},
      myCategoriesLabels: [],
      myCategoriesCount: [],
      myCategoriesData: [],
      chartValuesByPriority: [],
      chartLabelsByPriority: [],

      matchingTasks: []
    };
  },

  methods: {
    initChartLibraries () {

      const jqplotJQueryBundle = document.createElement('script');
            jqplotJQueryBundle.setAttribute('src', './resources/js/jqplot/jquery.jqplot.min.js');
            jqplotJQueryBundle.setAttribute("async", "async");

      const barRendererBundle = document.createElement('script');
            barRendererBundle.setAttribute('src', './resources/js/jqplot/plugins/jqplot.barRenderer.js');
            // barRendererBundle.setAttribute("async", "async");

      const categoryAxisRendererBundle = document.createElement('script');
            categoryAxisRendererBundle.setAttribute('src', './resources/js/jqplot/plugins/jqplot.categoryAxisRenderer.js');
            // categoryAxisRendererBundle.setAttribute("async", "async");

      const pointLabelsBundle = document.createElement('script');
            pointLabelsBundle.setAttribute('src', './resources/js/jqplot/plugins/jqplot.pointLabels.js');
            // pointLabelsBundle.setAttribute("async", "async");

      const pieRendererBundle = document.createElement('script');
            pieRendererBundle.setAttribute('src', './resources/js/jqplot/plugins/jqplot.pieRenderer.js');


      const jqplotCSS = document.createElement('link');
            jqplotCSS.setAttribute("rel", "stylesheet");
            jqplotCSS.setAttribute("type", "text/css");
            jqplotCSS.setAttribute("href", "./resources/js/jqplot/jquery.jqplot.css");
            // pieRendererBundle.setAttribute("async", "async");


      document.head.appendChild(jqplotCSS);
      document.head.appendChild(jqplotJQueryBundle);

      let isJQPlotLoaded = false;
      let isJQPlotBarRendererPluginLoaded = false;
      let isJQPlotPieRendererPluginLoaded = false;
      let isJQPlotCategoryAxisRendererPluginLoaded = false;

      const chartLibraryLoader = setInterval(() => {

        if ($.jqplot) {

          isJQPlotLoaded = true;
          console.log("JQPlot lib is loaded.", $.jqplot);
          document.head.appendChild(barRendererBundle);
          document.head.appendChild(categoryAxisRendererBundle);
          document.head.appendChild(pointLabelsBundle);
          document.head.appendChild(pieRendererBundle);
        }

        if ($.jqplot.BarRenderer) {
          isJQPlotBarRendererPluginLoaded = true;
          console.log("JQPlot BarRenderer lib is loaded.");
          // clearInterval(chartLibraryLoader);
        }

        if ($.jqplot.CategoryAxisRenderer) {
          isJQPlotCategoryAxisRendererPluginLoaded = true;
          console.log("JQPlot CategoryAxisRenderer lib is loaded.");
          // clearInterval(chartLibraryLoader);
        }

        if ($.jqplot.PieRenderer) {
          isJQPlotPieRendererPluginLoaded = true;
          console.log("JQPlot PieRenderer lib is loaded.");
          // clearInterval(chartLibraryLoader);
        }

        if (isJQPlotLoaded &&
            isJQPlotBarRendererPluginLoaded &&
            isJQPlotCategoryAxisRendererPluginLoaded &&
            isJQPlotPieRendererPluginLoaded) {
          console.log("All JQPlot libraries are loaded.");
          clearInterval(chartLibraryLoader);
          this.renderCharts();
        }

      }, 200);
    },
    isJQPlotLoaded () {
      this.renderCharts();
    },
    renderCharts () {
      // this.drawChart1();
      // this.drawChart2();
      // this.drawChart3();
      this.fetchMyCategories();

      document.getElementById("dashboard-overlay").style.opacity = 0;
      setTimeout(() => {
        document.getElementById("dashboard-overlay").style.display = "none";
      }, 500);

    },
    drawChart0 () {
        try {
            $.jqplot("chart1", [this.chartValues], {
              animate: !$.jqplot.use_excanvas,
              seriesColors: ["#ffa7bd", "#a7d4ff", "#c2ffa7", "#e6e631"],
              seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                  varyBarColor: true
                },
                pointLabels: { show: true }
              },
              axes: {
                xaxis: {
                  renderer: $.jqplot.CategoryAxisRenderer,
                  ticks: this.chartLabels
                }
              },
              highlighter: { show: false },
              grid: {
                drawBorder: true,
                shadow: false,
                borderWidth: "10px",
                borderColor: "gray"
              }
            });


        } catch (e) {
          console.error(e);
        }
    },
    drawChart1 () {

        const _this = this;
        alert("inside drawChart1");

        try {
            $.jqplot("chart1", [this.chartValues], {
              animate: !$.jqplot.use_excanvas,
              seriesColors: ["#ffa7bd", "#a7d4ff", "#c2ffa7", "#e6e631"],
              seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                  varyBarColor: true
                },
                pointLabels: { show: true }
              },
              axes: {
                xaxis: {
                  renderer: $.jqplot.CategoryAxisRenderer,
                  ticks: this.chartLabels
                }
              },
              highlighter: { show: false },
              grid: {
                drawBorder: true,
                shadow: false,
                borderWidth: "10px",
                borderColor: "gray"
              }
            });


            // $("#chart1").bind(
            //   "jqplotDataClick",
            //   function (ev, seriesIndex, pointIndex, data) {
            //     _this.openMatchingTasksModal();
            //  }
            // );
            alert("events added");
            document.querySelector("#chart1")
                    .addEventListener("jqplotDataClick", (e, seriesIndex, pointIndex, data) => {
                      console.log("Chart bar clicked.");
                      _this.openMatchingTasksModal();
                    });

        } catch (e) {
          console.error(e);
        }
    },
    drawChart2 () {
      $.jqplot(
        "chart2",
        [
          this.timeTakenData.expectedCompletionHours,
          this.timeTakenData.actualCompletionHours
        ],
        {
          seriesDefaults: {
            rendererOptions: {
              smooth: true
            }
          },
          series: [
            {
              lineWidth: 2,
              markerOptions: { style: "diamond" }
            },
            {
              lineWidth: 4,
              markerOptions: { style: "diamond" }
            },
            {
              showLine: false,
              markerOptions: { size: 4, style: "x" }
            },
            {
              markerOptions: { style: "circle" }
            },
            {
              lineWidth: 5,
              markerOptions: { style: "filledSquare", size: 10 }
            }
          ],
          grid: {
            drawBorder: true,
            shadow: false,
            borderWidth: "10px",
            borderColor: "gray"
          }
        }
      );
    },
    drawChart3 () {

        $.jqplot("chart3", [this.pieChartData], {
          // gridPadding: { top: 0, bottom: 0, left: 0, right: 0 },
          seriesColors: ["#ffa7bd", "#a7d4ff", "#c2ffa7", "#e6e631"],
          seriesDefaults: {
            renderer: $.jqplot.PieRenderer,
            trendline: { show: false },
            rendererOptions: { padding: 8, showDataLabels: true }
          },
          legend: {
            show: true,
            placement: "inside",
            rendererOptions: {
              numberRows: 1
            },
            location: "n",
            marginTop: "0px",
            borderWidth: "0px",
            borderColor: "red"
          },
          grid: {
            drawBorder: true,
            shadow: false,
            borderWidth: "10px",
            borderColor: "gray"
          }
        });
    },
    fetchInvolvedTaskCountsByStatus () {

            this.chartStatusValues = [];
            this.chartStatusLabels = [];


            // Attempting to use Comlink Worker
            const get_url = './tasks/involved-tasks-count-by-status';
            const callbackFunction = (dataResponse) => {
              dataResponse.data = dataResponse;
              dataResponse.data.forEach((countObj) => {

                  this.chartStatusValues.push(parseInt(countObj.taskCount));
                  this.chartStatusLabels.push(countObj.filterName + "");
              });

              try
              {
                  $.jqplot("chart0", [this.chartStatusValues], {
                    animate: !$.jqplot.use_excanvas,
                    seriesColors: ["#ffa7bd", "#a7d4ff", "#c2ffa7", "#e6e631"],
                    seriesDefaults: {
                      renderer: $.jqplot.BarRenderer,
                      rendererOptions: {
                        varyBarColor: true
                      },
                      pointLabels: { show: true }
                    },
                    axes: {
                      xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: this.chartStatusLabels
                      }
                    },
                    highlighter: { show: false },
                    grid: {
                      drawBorder: true,
                      shadow: false,
                      borderWidth: "10px",
                      borderColor: "gray"
                    }
                  });
              } catch (e) {
                console.error(e);
              }
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
    fetchSentTaskCountsByStatus () {

            this.sentChartStatusValues = [];
            this.sentChartStatusLabels = [];


            // Attempting to use Comlink Worker
            const get_url = './tasks/sent-tasks-count-by-status';
            const callbackFunction = (dataResponse) => {
              dataResponse.data = dataResponse;
              dataResponse.data.forEach((countObj) => {

                  this.sentChartStatusValues.push(parseInt(countObj.taskCount));
                  this.sentChartStatusLabels.push(countObj.filterName + "");
              });

              try
              {
                  $.jqplot("chartSentTasksCount", [this.sentChartStatusValues], {
                    animate: !$.jqplot.use_excanvas,
                    seriesColors: ["#ffa7bd", "#a7d4ff", "#c2ffa7", "#e6e631"],
                    seriesDefaults: {
                      renderer: $.jqplot.BarRenderer,
                      rendererOptions: {
                        varyBarColor: true
                      },
                      pointLabels: { show: true }
                    },
                    axes: {
                      xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: this.sentChartStatusLabels
                      }
                    },
                    highlighter: { show: false },
                    grid: {
                      drawBorder: true,
                      shadow: false,
                      borderWidth: "10px",
                      borderColor: "gray"
                    }
                  });
              } catch (e) {
                console.error(e);
              }
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
    fetchTaskCountsByPriority () {

            this.chartValuesByPriority = [];
            this.chartLabelsByPriority = [];


            // Attempting to use Comlink Worker
            const get_url = './tasks/tasks-count-by-priority';
            const callbackFunction = (dataResponse) => {
              dataResponse.data = dataResponse;
              dataResponse.data.forEach((countObj) => {

                  this.chartValuesByPriority.push(parseInt(countObj.taskCount));
                  this.chartLabelsByPriority.push(countObj.filterName + "");
              });

              try
              {
                  $.jqplot("chart4", [this.chartValuesByPriority], {
                    animate: !$.jqplot.use_excanvas,
                    seriesColors: ["#ffa7bd", "#a7d4ff", "#c2ffa7", "#e6e631"],
                    seriesDefaults: {
                      renderer: $.jqplot.BarRenderer,
                      rendererOptions: {
                        varyBarColor: true
                      },
                      pointLabels: { show: true }
                    },
                    axes: {
                      xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: this.chartLabelsByPriority
                      }
                    },
                    highlighter: { show: false },
                    grid: {
                      drawBorder: true,
                      shadow: false,
                      borderWidth: "10px",
                      borderColor: "gray"
                    }
                  });
              } catch (e) {
                console.error(e);
              }
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
    fetchTaskCounts () {

            this.chartValues = [];
            this.chartLabels = [];


            // Attempting to use Comlink Worker
            const get_url = './tasks/tasks-count-by-filters';
            const callbackFunction = (dataResponse) => {
              dataResponse.data = dataResponse;
              dataResponse.data.forEach((countObj) => {

                  this.chartValues.push(parseInt(countObj.taskCount));
                  this.chartLabels.push(countObj.filterName + "");
              });

              try
              {
                  $.jqplot("chart1", [this.chartValues], {
                    animate: !$.jqplot.use_excanvas,
                    seriesColors: ["#ffa7bd", "#a7d4ff", "#c2ffa7", "#e6e631"],
                    seriesDefaults: {
                      renderer: $.jqplot.BarRenderer,
                      rendererOptions: {
                        varyBarColor: true
                      },
                      pointLabels: { show: true }
                    },
                    axes: {
                      xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: this.chartLabels
                      }
                    },
                    highlighter: { show: false },
                    grid: {
                      drawBorder: true,
                      shadow: false,
                      borderWidth: "10px",
                      borderColor: "gray"
                    }
                  });

                  const _this = this;

                  $("#chart1").bind(
                    "jqplotDataClick",
                    function (ev, seriesIndex, pointIndex, data) {
                      _this.openMatchingTasksModal();
                   }
                  );
                  // alert("events added");
                  // document.querySelector("#chart1")
                  //         .addEventListener("jqplotDataClick", (e, seriesIndex, pointIndex, data) => {
                  //           console.log("Chart bar clicked.");
                  //           _this.openMatchingTasksModal();
                  //         });
              } catch (e) {
                console.error(e);
              }
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

                console.log("Cat count : ", countObj);
                (this.myCategoriesCount[countObj.id])["count"] = countObj.taskCount;
            });


            for (const [key, value] of Object.entries(this.myCategoriesCount)) {
                console.log("key " + key, value);
                this.myCategoriesData.push([value.name + " (" + value.count + ")", value.count]);
            }


            $.jqplot("chart3", [this.myCategoriesData], {
              // gridPadding: { top: 0, bottom: 0, left: 0, right: 0 },
              seriesColors: ["#ffa7bd", "#a7d4ff", "#c2ffa7", "#e6e631", "#c6e631"],
              seriesDefaults: {
                renderer: $.jqplot.PieRenderer,
                trendline: { show: false },
                // rendererOptions: { padding: 8, showDataLabels: true },
                rendererOptions: {
                  // Put data labels on the pie slices.
                  // By default, labels show the percentage of the slice.
                  showDataLabels: true
                }
              },
              legend: {
                show: true,
                placement: "inside",
                rendererOptions: {
                  numberRows: 10
                },
                location: "e",
                marginTop: "0px",
                marginRight: "30px",
                borderWidth: "0px",
                borderColor: "red"
              },
              grid: {
                drawBorder: true,
                shadow: false,
                borderWidth: "10px",
                borderColor: "gray"
              }
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
                this.myCategoriesCount[item.id] = {
                                                      name: item.name,
                                                      count: 0
                                                  };
                this.myCategoriesList.push(item);
              }
            });

            this.fetchInvolvedTaskCountsByStatus();
            this.fetchSentTaskCountsByStatus();
            this.fetchCategoryTaskCounts(this.myCategoriesList);
            this.fetchTaskCounts();
            this.fetchTaskCountsByPriority();
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

    loadMatchingTasks () {
      try {
        const url = './tasks/list/all-subtasks/' + '6165424ac22b5245d5dae578'; // Fetch all subtasks
        console.log("loading subtasks : " + url);
        this.getUnpaginatedList("subtasks", url); // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
      } catch (e) {
        alert(e);
      }
    },
    // Callbacks of loadPotentialUsers function.
    handleUnpaginatedListData (listKey, data) {
      if (listKey === "subtasks") {
     // console.log("@@@ ", data.data.bean);
        this.handleMatchingTasks(data);
      }
    },
    handleMatchingTasks (dataResponse) {
      // Pass it to the availableAssignees prop to the dropdown.
      // console.log("Potential subtasks : ", dataResponse);

      this.matchingTasks = [];
      const subTasks = dataResponse.data.bean;
      subTasks.forEach((item) => {
        if (item.dueDateTime !== null) {
          item.dueDateTime = this.convertUTCDateFromServerToLocalDate(
            item.dueDateTime
          );
          console.log("item.dueDateTime = ", item.dueDateTime);
        }
        this.matchingTasks.push(item);
        // console.log(" @@@ " + this.matchingTasks);
      });
    },
    openMatchingTasksModal () {
      this.loadMatchingTasks();
      UIkit.modal(document.querySelector("#view-tasks-modal")).show();
    }


  },

  mounted () {

    this.initChartLibraries();
    // $.jqplot.config.enablePlugins = true;
    // setTimeout(() => {
    //         this.renderCharts();
    // }, 500);
  }
};
</script>

<style scoped>
  .float-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .float-child {
    width: 50%;
    float: left;
    padding: 10px;
  }

  .chart-container{
    flex-basis: 33%;
    display: grid;
    place-items: center;
    place-content: center;
  }

  .big-container{
    flex-basis: 67%;
    display: grid;
    place-items: center;
    place-content: center;
  }

  .chart-title {
    font-size: 0.75rem;
    /* font-weight: bold;
    background: #2196f312;*/
    padding: 2px 15px;
  }






  .subtasks_box {
    display: grid;
    -moz-column-gap: 30px;
    column-gap: 30px;
    grid-template-columns: 1fr;
    border: 1px solid transparent;
    border-bottom: 0px;
  }

  .subtask_row {
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

  .subtask_row:hover {
    border-left: 5px solid rgb(31 105 189);
  }

  .subtask_row > div {
    margin-bottom: 5px;
  }

  .depedencytask_row {
    position: relative;
    padding: 5px 10px;
    display: grid;
    align-items: end;
    height: 30px;
    justify-items: start;
    grid-template-columns: 60px 5fr 2fr 1fr;
    -moz-column-gap: 20px;
    column-gap: 20px;
    border-bottom: 1px solid #f3f3f3;
    border-left: 5px solid transparent;
    background-color: rgb(255 255 255);
    font-size: 0.65rem;
  }

  .depedencytask_row:hover {
    border-left: 5px solid transparent;
  }

  .depedencytask_row > div {
    margin-bottom: 5px;
  }
</style>
