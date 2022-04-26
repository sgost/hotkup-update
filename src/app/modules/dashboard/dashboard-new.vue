<template>
  <div style="position: relative;width: 100%;box-sizing: border-box;padding: 25px;align-items: center;display: flex;background: white;">

    <div class="dashboard-overlay" id="dashboard-overlay" style="transition:0.5s linear;z-index: 2;position: absolute;inset: 0px;display: grid;place-items: center;background: white;opacity: 0.95;">
      Loading charts..
    </div>

    <div class="float-containerx " style="display:grid;grid-template-rows:auto 1fr;z-index: 1;width: 100%;font-size: 0.55rem;align-items: center;row-gap:10px;height:100%;overflow-y:hidden">


        <div style="gap: 20px;display: flex;align-items: center;justify-content: end;font-size: 0.65rem;padding: 5px 20px 15px 19px;border-bottom: 1px solid #e1e1e1;">
          <div class="plain_button" v-on:click="showNewChartPreferenceModal()">
            <span uk-icon="icon:plus;ratio:0.45" class="uk-icon"></span>
            <span> Add New Chart </span>
          </div>
          <div class="plain_button" v-on:click="viewChartPreferencesModal()">
            <span uk-icon="icon:cog;ratio:0.55" class="uk-icon"></span>
            <span> Settings </span>
          </div>
        </div>
        <div style="display:flex;height:100%;overflow-y:hidden">
          <div id="pinned_charts_container" class="custom-scroll-bar" style="width: 100%;display: flex;flex-flow: row wrap;gap: 35px;display: grid;grid-template-columns: 1fr 1fr 1fr;padding: 20px;overflow-y: auto;">



            <template v-for="pinnedChart in chartPreferences">
              <div v-if="pinnedChart.status === 'ENABLED'" class="chart-container">
                  <div class="chart-title">{{pinnedChart.name}}</div>
                  <div class="float-child" style="width: 400px;height: 250px;display: flex;align-items: center;">
                    <canvas v-bind:id="'chart_'+ pinnedChart.id"  width="400" height="250"></canvas>
                  </div>
              </div>
            </template>

            <br>
          </div>
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
                     <div class="depedencytask_row">
                       <div style="font-weight:normal;justify-self: end;">
                         <a v-on:click="viewTask(subtask.id)">#{{subtask.sno}}</a>
                       </div>
                       <div v-on:click="viewTask(subtask.id)" style="cursor:pointer">{{subtask.name}}</div>
                       <div style="color:#333">{{subtask.dueDateInLocalFormat}}</div>
                       <div>
                           <span style="color: rgb(46 166 253);text-transform: uppercase;font-size: 0.6rem;letter-spacing: 0.5px;">{{subtask.status}}</span>
                       </div>
                     </div>
                 </template>
             </div>
         </div>
    </div>

    <div id="view-chart-preferences-modal" class="uk-flex-top" uk-modal>
         <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="width: 60%;font-size: 0.65rem;padding: 35px;">
             <button class="uk-modal-close-default" type="button" uk-close></button>

             <div  v-show="chartPreferences.length>0"  class="depedencytask_row" style="background: #f2f2f2;border: 1px solid transparent;border-bottom: 0px;text-transform: uppercase;font-size: 0.55rem;">
                 <div style=";justify-self: end;">Sno.</div>
                 <div >Chart Preference Name</div>
                 <div >Created on</div>
                 <div  style="color: rgb(51, 51, 51);">Status</div>
                 <!-- <div  style="color: rgb(51, 51, 51);"></div> -->
                 <div  style="color: rgb(51, 51, 51);"></div>
             </div>
             <div v-show="chartPreferences.length>0"  class="subtasks_box">
                 <template v-for="chartPreference, index in chartPreferences">
                     <div class="depedencytask_row">
                       <div style="font-weight:normal;justify-self: end;">
                         <a>#{{++index}}</a>
                       </div>
                       <div style="cursor:pointer">{{chartPreference.name}}</div>
                       <div style="color:#333">{{chartPreference.createdOn}}</div>

                       <div v-if="chartPreference.status === 'DISABLED'" style="color:green;cursor:pointer" v-on:click="changeChartPreferenceStatus(chartPreference.id, 'ENABLED')" >Enable</div>
                       <div v-else style="color:red;cursor:pointer" v-on:click="changeChartPreferenceStatus(chartPreference.id, 'DISABLED')" >Disable</div>
                       <!-- <div style="color:blue" v-on:click="viewChartPreference(chartPreference.id)" >Edit</div> -->
                       <div style="color:red" v-on:click="removeChartPreference(chartPreference.id)" >Remove</div>
                     </div>
                 </template>
             </div>
         </div>
    </div>
    <div id="new-chart-preference-form-modal" class="uk-flex-top" uk-modal>
         <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="display: flex;min-width:75%;width:auto;flex-direction: column;;overflow-y: hidden;font-size: 0.65rem;padding: 0px;border: 0px solid rgba(0, 0, 0, 0.57);">

             <!--<button class="uk-modal-close-default" type="button" uk-close ></button>-->

             <div style="display: flex;font-size: 1rem;margin-bottom: 10px;background: rgb(243, 243, 243);margin-top: 0px;padding: 0px;flex-direction: row-reverse;">

               <button v-on:click="closeNewChartPreferenceModal()" v-bind:uk-tooltip="'Close'"
                 class="uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button subtask-back-button"
                 style="border-radius: 3px;align-self:flex-start">
                 <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"></path><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"></path></svg>
               </button>
               <div style="font-weight: bold;display: flex;align-items: center;flex-grow: 1;justify-content: center;">
                 <span style="font-size: 0.75rem;">New Chart Preference &nbsp; </span>
               </div>

               <hr>

             </div>
             <div style="display: flex;justify-content: center;flex-grow: 1;padding: 0px 0px;">
                 <div style="display:grid;grid-template-rows:1fr;display:flex;flex-grow: 1;overflow-y:hidden">
                   <new-chart-preference-form v-on:signalCloseNewChartPreferenceModal="closeNewChartPreferenceModal()"/>
                 </div>
             </div>

         </div>
     </div>

  </div>
</template>

<script>

import { bus } from './../../../main.js';
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
      chartValues1: [2, 2, 6, 4],
      chartValues2: [1, 6, 2, 1],
      chartValues3: [3, 1, 5, 2],
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

      matchingTasks: [],


      // Chart preferences
      chartPreferences: [],
      pinnedCharts: []
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
    renderCategoryByPriorityAsStackedBarChartSample1 () {

            let chrtData = {
                                matrixData: {
                                  High: {
                                    Bugs: 2,
                                    Enhancements: 1,
                                    Testing: 1
                                  },
                                  Low: {
                                    Bugs: 2,
                                    Testing: 1
                                  },
                                  Medium: {
                                    Enhancements: 2,
                                    Testing: 2
                                  }
                                },
                                hPartitionKeys: ["Bugs", "Testing", "Enhancements"],
                                vPartitionKey: ["High", "Low", "Medium"]
                              };


            chrtData = {
                              matrixData: {
                                High: {
                                  "Application Features": 7,
                                  "Application Bugs": 6
                                },
                                Low: {
                                  "Application Features": 9,
                                  Enhancements: 2,
                                  "Application Bugs": 17
                                },
                                Medium: {
                                  "Application Features": 10,
                                  "Application Bugs": 41
                                },
                                Critical: {
                                  "Application Features": 8,
                                  "Application Bugs": 5
                                },
                                None: {
                                  "Application Features": 7,
                                  Enhancements: 1,
                                  "Application Bugs": 25
                                }
                              },
                              hPartitionKeys: [
                                "Application Features",
                                "Enhancements",
                                "Application Bugs"
                              ],
                              vPartitionKey: [
                                "High",
                                "Low",
                                "Medium",
                                "Critical",
                                "None"
                              ]
                            };

            const twoDimensionalArray = [];
            const hPartitionKeys = chrtData.hPartitionKeys;
            const vPartitionKeys = chrtData.vPartitionKeys;
            const matrixData = chrtData.matrixData;


            const sortKeysInObject = (unsortedObject, sortByProperties) => {

                  // The following code sorts the object's keys in natural order.
                  // return Object.keys(unsortedObject).sort().reduce(
                  //                                                   (obj, key) => {
                  //                                                     obj[key] = unsortedObject[key];
                  //                                                     return obj;
                  //                                                   },
                  //                                                   {}
                  //                                                 );

                  const sortedObject = {};

                  sortByProperties.forEach((key) => {
                    sortedObject[key] = unsortedObject[key];
                  });

                  return sortedObject;
            };


            const verticalArray = [];
            for (const verticalKey in matrixData) {

                // For the barstack chart's series labels [series being in vertical axis]
                verticalArray.push(verticalKey);


                const verticalObject = matrixData[verticalKey];
                // Iterate through the hPartitionKeys to add the "Zero" counts for missing categories
                hPartitionKeys.forEach(hKey => {
                    if (verticalObject[hKey] === null || verticalObject[hKey] === undefined) {
                      verticalObject[hKey] = 0;
                    }
                });
                //  addition of ZERO count for missing value ends here

                // Sort the keys inside the object, so that their extracted values preserve the column order.
                const orderedVerticalKeyValue = sortKeysInObject(verticalObject, hPartitionKeys);
                matrixData[verticalKey] = orderedVerticalKeyValue;
                // sorting ends here

                // Convert object into array
                twoDimensionalArray.push(Object.values(orderedVerticalKeyValue));

            }
            console.log("matrixData " + JSON.stringify(matrixData));
            console.log("verticalArray ", verticalArray);
            console.log("twoDimensionalArray ", twoDimensionalArray);


            const sample2D = [
              [5, 2, 6], // low priority
              [1, 6, 2], // medium priority
              [3, 3, 5] // high priority
            ];

            // Plotting Stacked Bar charts
            this.drawStackedBarCharts("chartSample",
                                          twoDimensionalArray,
                                          [
                                            { color: '#ffa7bd', label: 'High' },
                                            { color: '#c2ffa7', label: 'Low' },
                                            { color: '#a7d4ff', label: 'Medium' },
                                            { color: '#f44336', label: 'Critical' },
                                            { color: '#e6e631', label: 'None' }
                                          ],
                                          hPartitionKeys // ["Inbox", "Sent", "Overdue", "Completed"]
                                      );

            /*
                  API Data Format

                  String[] hPartitionLabels = []; // Example 4 partitions
                  String[] vPartitionLabels = []; // Example 3 partitions

                  dataMatrix = [4x3] matrix;

                  #Sno  #Category         #Priority
                  ---------------------------------
                   1     Bugs             High
                   2     Enhancements     Medium
                   3     Bugs             Low
                   4     Bugs             Low
                   5     Bugs             High
                   6     Enhancements     High
                   7     Testing          High
                   8     Testing          Low
                   9     Testing          Medium
                  10     Testing          Medium
                  11     Enhancements     Medium
                  ----------------------------------


                  Set<String> hPartitionLabels = ["Bugs", "Enhancements", "Testing"];
                  Set<String> vPartitionLabels = ["High", "Medium", "Low"];

                  Algorithm 1
                  -----------
                  Step 1 - For every 'hPartitionLabels', create a jsonEntry in ObjectNode
                    Step 1.1 - For every 'vPartitionLabels', create a jsonEntry within the ObjectNode as nested node.


                  Expected Output
                  ---------------
                  Step 1    - "Bugs" : {}
                  Step 1.1  - "Bugs" : {
                                      "High" : 0,
                                      "Medium" : 0,
                                      "Low" : 0
                                    }
                  Step 1.2  - "Bugs" : {
                                      "High" : 2,
                                      "Medium" : 0,
                                      "Low" : 2
                                    }


                                    ----------- or ------------

                Algorithm 2
                ------------
                  Step 1 - For every 'vPartitionLabels', create an array
                  Step 2 - For every 'hPartitionLabels', push the 'matching count' into the array.

            */
    },
    // Plotting Sample Charts
    drawStackedBarCharts (chartId, seriesData, seriesMetadata, hPartitionLabels) {

        const _this = this;

        try {
            $.jqplot(chartId, seriesData, {
              stackSeries: true,
              animate: !$.jqplot.use_excanvas,
              series: seriesMetadata,
              // seriesColors: ["#ffa7bd", "#a7d4ff", "#c2ffa7", "#e6e631"],
              seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                  varyBarColor: true
                },
                pointLabels: { show: true }
              },
              legend: {
                show: true,
                placement: "outside",
                rendererOptions: {
                  numberRows: 10
                },
                location: "e",
                marginTop: "0px",
                marginRight: "30px",
                borderWidth: "0px",
                borderColor: "red"
              },
              axes: {
                xaxis: {
                  renderer: $.jqplot.CategoryAxisRenderer,
                  ticks: hPartitionLabels
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
            document.querySelector("#chart1")
                    .addEventListener("jqplotDataClick", (e, seriesIndex, pointIndex, data) => {
                      console.log("Chart bar clicked.");
                      _this.openMatchingTasksModal();
                    });

        } catch (e) {
          console.error(e);
        }
    },
    renderCharts () {

      this.renderCategoryByPriorityAsStackedBarChartSample1();


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
        // alert("inside drawChart1");

        try {
            $.jqplot("chartSample", [this.chartValues1, this.chartValues2, this.chartValues3], {
              stackSeries: true,
              animate: !$.jqplot.use_excanvas,
              series: [{ color: '#c2ffa7', label: 'Low' },
                       { color: '#a7d4ff', label: 'Medium' },
                       { color: '#ffa7bd', label: 'High' }],
              // seriesColors: ["#ffa7bd", "#a7d4ff", "#c2ffa7", "#e6e631"],
              seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                  varyBarColor: true
                },
                pointLabels: { show: true }
              },
              legend: {
                show: true,
                placement: "outside",
                rendererOptions: {
                  numberRows: 10
                },
                location: "e",
                marginTop: "0px",
                marginRight: "30px",
                borderWidth: "0px",
                borderColor: "red"
              },
              axes: {
                xaxis: {
                  renderer: $.jqplot.CategoryAxisRenderer,
                  ticks: ["Inbox", "Sent", "Overdue", "Completed"]
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
    },



    // Chart Preference Modal functions

    showNewChartPreferenceModal () {
      UIkit.modal(document.querySelector('#view-chart-preferences-modal')).hide();
      UIkit.modal(document.querySelector('#new-chart-preference-form-modal')).show();
      return false;
    },
    closeNewChartPreferenceModal () {
      UIkit.modal(document.querySelector('#view-chart-preferences-modal')).hide();
      UIkit.modal(document.querySelector('#new-chart-preference-form-modal')).hide();
      return false;
    },
    viewChartPreferencesModal () {
      this.fetchChartPreferences(false);
      UIkit.modal(document.querySelector('#new-chart-preference-form-modal')).hide();
      UIkit.modal(document.querySelector("#view-chart-preferences-modal")).show();
    },
    drawCharts () {

      this.chartPreferences.forEach(chartPreference => {

          if (chartPreference.status === "ENABLED") {
            this.fetchChartData(chartPreference.id);
          }
      });
    },
    changeChartPreferenceStatus (chartPreferenceId, status) {

      const post_url = './dashboard/chart-preferences/change-status';
      console.log('Posting data to : ' + post_url);

      const form = {
        id: chartPreferenceId,
        status: status
      };

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {

          console.log('Task Save Result : ');
          console.log(dataResponse);

          if (dataResponse.data.actionResult === 1) {

            const savedTask = dataResponse.data.bean;

            UIkit.notification(`<div class="taskone-notification">
                                                    <span uk-icon="icon: check;ratio:1"></span>
                                                    <div> Chart Preference's status changed successfully. </div>
                                                </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 5000
            });

            this.fetchChartPreferences(false);
            this.fetchChartData(chartPreferenceId);

          } else {

            const errorMsg = (dataResponse.data).message;
            UIkit.notification("<span uk-icon='icon: warning;ratio:1'></span>" + errorMsg, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });

            document.getElementById('saveChartPreferenceButton').innerHTML = btnText;
            this.enableHTMLElement(document.getElementById('saveChartPreferenceButton'));
            return false;
          }
        })
        .catch(function (errorResponse) {

          // console.log('ERROR MS - ', errorResponse);
          // const exceptionMsg = errorResponse.response.data.exception;

          // https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
          console.log("ERROR MS - ", errorResponse.response);
          const exceptionMsg = errorResponse.response.data.message;

          UIkit.notification("<span uk-icon='icon: warning ;ratio:1'></span> " + exceptionMsg + '.', {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 5000
          });

          return false;
        });


    },
    fetchChartPreferences (drawChartsNow) {

        // Attempting to use Comlink Worker
            const get_url = './dashboard/chart-preferences/list'; // Fetch all chart-preferences
            const callbackFunction = (dataResponse) => {
              console.log(dataResponse);
              this.chartPreferences = dataResponse.bean;

              document.getElementById("dashboard-overlay").style.opacity = 0;
              setTimeout(() => {
                document.getElementById("dashboard-overlay").style.display = "none";
              }, 500);

              if (drawChartsNow) {
                this.drawCharts();
              }

            };
            const callbackError = (error) => {
              console.error('Error in loading chart-preferences');
              console.error(error);
              UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
                status: 'danger',
                pos: 'bottom-left',
                timeout: 5000
              });
            };

            async function sendTaskToWorker () {
                // const remoteFunction = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));
                console.log("Loading chart-preferences using comlink-worker");
                await ComlinkWorker.fetch(process.env.VUE_APP_API_URL + get_url,
                                           Comlink.proxy(callbackFunction),
                                           Comlink.proxy(callbackError));
            }

            sendTaskToWorker();
            return false;
        // Comlink worker ends here
    },
    fetchChartData (id) {

        // Attempting to use Comlink Worker
            const get_url = './dashboard/get-chart-data-by-id/' + id; // Fetch all chart-preferences
            const callbackFunction = (dataResponse) => {
              console.log(dataResponse);
              const chartMatrixData = dataResponse;
              this.renderCategoryByPriorityAsStackedBarChart(chartMatrixData, 'chart_' + id);
            };
            const callbackError = (error) => {
              console.error('Error in loading chart-preferences');
              console.error(error);
              UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
                status: 'danger',
                pos: 'bottom-left',
                timeout: 5000
              });
            };

            async function sendTaskToWorker () {
                // const remoteFunction = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));
                console.log("Loading chart-preferences using comlink-worker");
                await ComlinkWorker.fetch(process.env.VUE_APP_API_URL + get_url,
                                           Comlink.proxy(callbackFunction),
                                           Comlink.proxy(callbackError));
            }

            sendTaskToWorker();
            return false;
        // Comlink worker ends here
    },
    renderCategoryByPriorityAsStackedBarChart (chrtData, chartID) {

            const twoDimensionalArray = [];
            const hPartitionKeys = chrtData.hPartitionKeys;
            const vPartitionKeys = chrtData.vPartitionKeys;
            const matrixData = chrtData.matrixData;


            const sortKeysInObject = (unsortedObject, sortByProperties) => {

                  // The following code sorts the object's keys in natural order.
                  // return Object.keys(unsortedObject).sort().reduce(
                  //                                                   (obj, key) => {
                  //                                                     obj[key] = unsortedObject[key];
                  //                                                     return obj;
                  //                                                   },
                  //                                                   {}
                  //                                                 );

                  const sortedObject = {};

                  sortByProperties.forEach((key) => {
                    sortedObject[key] = unsortedObject[key];
                  });

                  return sortedObject;
            };


            const verticalArray = [];
            // for (const verticalKey in matrixData) {
            //
            //     // For the barstack chart's series labels [series being in vertical axis]
            //     verticalArray.push(verticalKey);
            //
            //
            //     const verticalObject = matrixData[verticalKey];
            //     // Iterate through the hPartitionKeys to add the "Zero" counts for missing categories
            //     hPartitionKeys.forEach(hKey => {
            //         if (verticalObject[hKey] === null || verticalObject[hKey] === undefined) {
            //           verticalObject[hKey] = 0;
            //         }
            //     });
            //     //  addition of ZERO count for missing value ends here
            //
            //     // Sort the keys inside the object, so that their extracted values preserve the column order.
            //     const orderedVerticalKeyValue = sortKeysInObject(verticalObject, hPartitionKeys);
            //     matrixData[verticalKey] = orderedVerticalKeyValue;
            //     // sorting ends here
            //
            //     // Convert object into array
            //     twoDimensionalArray.push(Object.values(orderedVerticalKeyValue));
            //
            // }
            console.log("matrixData " + JSON.stringify(matrixData));
            console.log("verticalArray ", verticalArray);
            console.log("twoDimensionalArray ", twoDimensionalArray);


            const sample2D = [
              [5, 2, 6], // low priority
              [1, 6, 2], // medium priority
              [3, 3, 5] // high priority
            ];

            // Plotting Stacked Bar charts
            // this.drawStackedBarCharts(chartID,
            //                               twoDimensionalArray,
            //                               [
            //                                 { color: '#ffa7bd', label: 'High' },
            //                                 { color: '#c2ffa7', label: 'Low' },
            //                                 { color: '#a7d4ff', label: 'Medium' },
            //                                 { color: '#f44336', label: 'Critical' },
            //                                 { color: '#e6e631', label: 'None' }
            //                               ],
            //                               hPartitionKeys // ["Inbox", "Sent", "Overdue", "Completed"]
            //                           );

            this.renderChartJSExampleWithData(matrixData, chartID);

            /*
                  API Data Format

                  String[] hPartitionLabels = []; // Example 4 partitions
                  String[] vPartitionLabels = []; // Example 3 partitions

                  dataMatrix = [4x3] matrix;

                  #Sno  #Category         #Priority
                  ---------------------------------
                   1     Bugs             High
                   2     Enhancements     Medium
                   3     Bugs             Low
                   4     Bugs             Low
                   5     Bugs             High
                   6     Enhancements     High
                   7     Testing          High
                   8     Testing          Low
                   9     Testing          Medium
                  10     Testing          Medium
                  11     Enhancements     Medium
                  ----------------------------------


                  Set<String> hPartitionLabels = ["Bugs", "Enhancements", "Testing"];
                  Set<String> vPartitionLabels = ["High", "Medium", "Low"];

                  Algorithm 1
                  -----------
                  Step 1 - For every 'hPartitionLabels', create a jsonEntry in ObjectNode
                    Step 1.1 - For every 'vPartitionLabels', create a jsonEntry within the ObjectNode as nested node.


                  Expected Output
                  ---------------
                  Step 1    - "Bugs" : {}
                  Step 1.1  - "Bugs" : {
                                      "High" : 0,
                                      "Medium" : 0,
                                      "Low" : 0
                                    }
                  Step 1.2  - "Bugs" : {
                                      "High" : 2,
                                      "Medium" : 0,
                                      "Low" : 2
                                    }


                                    ----------- or ------------

                Algorithm 2
                ------------
                  Step 1 - For every 'vPartitionLabels', create an array
                  Step 2 - For every 'hPartitionLabels', push the 'matching count' into the array.

            */
    },




    // CHART.js library
    renderChartJSExample () {

      // References
      // https://stackoverflow.com/questions/67789090/show-data-values-in-chart-js-bars-version-3

      const tasksChart3DapiData = [
                                    {
                                      categoryName: "Bugs",
                                      High: 5,
                                      Low: 20,
                                      Overdue: 2,
                                      Open: 3
                                    },
                                    {
                                      categoryName: "Enhancements",
                                      High: 4,
                                      Medium: 12,
                                      Open: 3
                                    },
                                    {
                                      categoryName: "Testing",
                                      High: 11,
                                      Low: 2,
                                      Medium: 2,
                                      Overdue: 5,
                                      Open: 2
                                    }
                                  ];

      const chartGroups = [];
      const criticalPriorityDataSet = [];
      const highPriorityDataSet = [];
      const mediumPriorityDataSet = [];
      const lowPriorityDataSet = [];
      const noPriorityDataSet = [];
      const overdueTasksDataSet = [];
      const openTasksDataSet = [];

      tasksChart3DapiData.forEach(category => {

          chartGroups.push(category.categoryName);

          // No Priority
          if (category["noPriority"] !== undefined && category["noPriority"] !== null) {
            noPriorityDataSet.push(category["noPriority"]);
          }
          else {
            noPriorityDataSet.push(0);
          }

          // Critical Priority
          if (category["Critical"] !== undefined && category["Critical"] !== null) {
            criticalPriorityDataSet.push(category["Critical"]);
          }
          else {
            criticalPriorityDataSet.push(0);
          }

          // High Priority
          if (category["High"] !== undefined && category["High"] !== null) {
            highPriorityDataSet.push(category["High"]);
          }
          else {
            highPriorityDataSet.push(0);
          }

          // Medium Priority
          if (category["Medium"] !== undefined && category["Medium"] !== null) {
            mediumPriorityDataSet.push(category["Medium"]);
          }
          else {
            mediumPriorityDataSet.push(0);
          }

          // Low Priority
          if (category["Low"] !== undefined && category["Low"] !== null) {
            lowPriorityDataSet.push(category["Low"]);
          }
          else {
            lowPriorityDataSet.push(0);
          }

          // Overdue
          if (category["Overdue"] !== undefined && category["Overdue"] !== null) {
            overdueTasksDataSet.push(category["Overdue"]);
          }
          else {
            overdueTasksDataSet.push(0);
          }

          // Open
          if (category["Open"] !== undefined && category["Open"] !== null) {
            openTasksDataSet.push(category["Open"]);
          }
          else {
            openTasksDataSet.push(0);
          }

      });


      const mydatasets = [

        {
          label: "No Priority",
          backgroundColor: "rgba(167,212,255,0.65)",
          borderColor: "rgba(237,212,85,0.85)",
          borderWidth: 0,
          data: noPriorityDataSet, // [1, 2, 3, 6],
          stack: 'Stack 0'
        },
        {
          label: "Low",
          backgroundColor: "rgba(237,212,85,0.65)",
          borderColor: "rgba(237,212,85,0.85)",
          borderWidth: 0,
          data: lowPriorityDataSet, // [7, 9, 4, 4],
          stack: 'Stack 0'
        },
        {
          label: "Medium",
          backgroundColor: "rgba(194,254,167,0.65)",
          borderColor: "rgba(137,112,185,0.85)",
          borderWidth: 0,
          data: mediumPriorityDataSet, // [3, 4, 2, 1],
          stack: 'Stack 0'
        },
        {
          label: "High",
          backgroundColor: "rgba(252,3,98,0.35)",
          borderColor: "rgba(252,3,98,0.85)",
          borderWidth: 0,
          data: highPriorityDataSet, // [3, 5, 2, 4],
          stack: 'Stack 0'
        },
        // {
        //   label: "Open",
        //   backgroundColor: "rgba(139,235,110,0.65)",
        //   borderColor: "rgba(139,235,110,0.85)",
        //   borderWidth: 0,
        //   data: [8, 6, 3, 8],
        //   stack: 'Stack 1'
        // },
        {
          label: "Overdue",
          backgroundColor: "rgba(252,3,98,0.1)",
          borderColor: "rgba(252,3,98,0.25)",
          borderWidth: 1,
          data: overdueTasksDataSet, // [9, 8, 3, 3],
          stack: 'Stack 1'
        }
      ];

      const ctx = document.getElementById('myChart');
      // Chart.register(ChartDataLabels); // first way of registering the plugin, registers them for all your charts

      Chart.defaults.font.size = 10;
      const myChart = new Chart(ctx, {
          type: 'bar',
          plugins: [window.ChartDataLabels], // second way of registering plugin, register plugin for only this chart

          data: {
              // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              // datasets: [{
              //     label: '# of Votes',
              //     data: [12, 19, 3, 5, 2, 3],
              //     backgroundColor: [
              //         'rgba(255, 99, 132, 0.2)',
              //         'rgba(54, 162, 235, 0.2)',
              //         'rgba(255, 206, 86, 0.2)',
              //         'rgba(75, 192, 192, 0.2)',
              //         'rgba(153, 102, 255, 0.2)',
              //         'rgba(255, 159, 64, 0.2)'
              //     ],
              //     borderColor: [
              //         'rgba(255, 99, 132, 1)',
              //         'rgba(54, 162, 235, 1)',
              //         'rgba(255, 206, 86, 1)',
              //         'rgba(75, 192, 192, 1)',
              //         'rgba(153, 102, 255, 1)',
              //         'rgba(255, 159, 64, 1)'
              //     ],
              //     borderWidth: 1
              // }]

              labels: chartGroups, // ["Bugs", "Enhancements", "Testing", "Deployment"],
              datasets: mydatasets
          },
          options: {
              fontSize: 4,
              scaleIntegersOnly: true,
              showDatapoints: true,
              responsive: true,
              interaction: {
                intersect: false
              },
              scales: {
                y: {
                    min: 0,
                    stepSize: 1,
                    beginAtZero: true
                }//,
                // x: {
                //   stacked: true
                // },
                // y: {
                //   stacked: true,
                //   stepSize: 1,
                //   beginAtZero: true,
                //   precision: 0
                // },
                // yAxis: [{
                //     ticks: {
                //         stepSize: 1,
                //         precision: 0
                //     }
                // }]
              },
              onClick (e) {
                const activePoints = myChart.getElementsAtEventForMode(e, 'nearest', {
                                                                                        intersect: true
                                                                                        }, false);
                console.log("activePoints : ", activePoints);
                const [{ index }] = activePoints;
                console.log(activePoints[0].datasetIndex + "," + index + " == " + mydatasets[activePoints[0].datasetIndex].data[index]);

                document.getElementById("chartjsClickedLabel").innerHTML = mydatasets[activePoints[0].datasetIndex].data[index];
              },
              tooltips: {
                 mode: 'label',
                 callbacks: {
                    label: function (tooltipItem, data) {
                       return data.datasets[tooltipItem.datasetIndex].label + ": t" + (tooltipItem.yLabel);
                    }
                 }
              },
              plugins: {
                anchor: 'center',
                tooltip: {
                  position: 'nearest'
                },
                datalabels: {
                   display: true,
                   align: 'center',
                   anchor: 'center',
                   labels: {
                      value: {
                        color: 'rgba(0, 0, 0, 0.25)'
                      }
                  }
                }
             }
          }
      });

      /*
      var numberWithCommas = function (x) {
         return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

      var dataPack1 = [50000, 22000, 26000, 35000, 55000, 55000, 56000, 59000, 60000, 61000, 60100, 62000];

      var dataPack2 = [0, 6000, 13000, 14000, 50060, 20030, 20070, 35000, 41000, 4020, 40030, 70050];

      var dates = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      // Chart.defaults.global.elements.rectangle.backgroundColor = '#FF0000';

      var bar_ctx = document.getElementById('myChart');
      var bar_chart = new Chart(bar_ctx, {
         type: 'bar',
         data: {
            labels: dates,
            datasets: [{
               label: 'SoftEnterprises, Sales',
               data: dataPack1,
               backgroundColor: "rgba(55, 160, 225, 0.7)",
               hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
               hoverBorderWidth: 2,
               hoverBorderColor: 'lightgrey',
               stack: "stack0"
            }, {
               label: 'SmartSystems, Sales',
               data: dataPack2,
               backgroundColor: "rgba(225, 58, 55, 0.7)",
               hoverBackgroundColor: "rgba(225, 58, 55, 0.7)",
               hoverBorderWidth: 2,
               hoverBorderColor: 'lightgrey',
               stack: "stack0"
            }]
         },
         options: {
            tooltips: {
               mode: 'label',
               callbacks: {
                  label: function (tooltipItem, data) {
                     return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
                  }
               }
            },
            scales: {
               xAxes: [{
                  stacked: true,
                  gridLines: {
                     display: false
                  }
               }],
               yAxes: [{
                  stacked: true,
                  ticks: {
                     callback: function (value) {
                        return numberWithCommas(value);
                     }
                  }
               }]
            }, // scales
            legend: {
               display: true
            },
            plugins: {
               datalabels: {
                  display: true,
                  align: 'center',
                  anchor: 'center'
               }
            }
         } // options
      });

      */


    },
    renderChartJSExampleWithData (tasksChart3DapiData, chartId) {


      const chartIdElement = document.getElementById(chartId);

      if (!chartIdElement) {
        return false;
      }

      const chartIdElementID = chartIdElement.getAttribute("id");
      const chartIdElementStyle = chartIdElement.getAttribute("style");
      const chartIdElementParent = chartIdElement.parentElement;

      // If the canvas already exists, then destroy and recreate it
      if (chartIdElement) {

        chartIdElementParent.removeChild(chartIdElement);

        const newCanvas = document.createElement("canvas");
              newCanvas.setAttribute("id", chartIdElementID);
              newCanvas.setAttribute("style", chartIdElementStyle);

        chartIdElementParent.appendChild(newCanvas);
      }


      const _this = this;
      console.log("tasksChart3DapiData = ", tasksChart3DapiData);

      // References
      // https://stackoverflow.com/questions/67789090/show-data-values-in-chart-js-bars-version-3

      const chartGroups = [];
      const criticalPriorityDataSet = [];
      const highPriorityDataSet = [];
      const mediumPriorityDataSet = [];
      const lowPriorityDataSet = [];
      const noPriorityDataSet = [];
      const overdueTasksDataSet = [];
      const openTasksDataSet = [];

      tasksChart3DapiData.forEach(group => {

          chartGroups.push(group.groupName);

          // No Priority
          if (group["No Priority"] !== undefined && group["No Priority"] !== null) {
            noPriorityDataSet.push(group["No Priority"]);
          }
          else {
            noPriorityDataSet.push(0);
          }

          // Critical Priority
          if (group["Critical"] !== undefined && group["Critical"] !== null) {
            criticalPriorityDataSet.push(group["Critical"]);
          }
          else {
            criticalPriorityDataSet.push(0);
          }

          // High Priority
          if (group["High"] !== undefined && group["High"] !== null) {
            highPriorityDataSet.push(group["High"]);
          }
          else {
            highPriorityDataSet.push(0);
          }

          // Medium Priority
          if (group["Medium"] !== undefined && group["Medium"] !== null) {
            mediumPriorityDataSet.push(group["Medium"]);
          }
          else {
            mediumPriorityDataSet.push(0);
          }

          // Low Priority
          if (group["Low"] !== undefined && group["Low"] !== null) {
            lowPriorityDataSet.push(group["Low"]);
          }
          else {
            lowPriorityDataSet.push(0);
          }

          // Overdue
          if (group["OVERDUE"] !== undefined && group["OVERDUE"] !== null) {
            overdueTasksDataSet.push(group["OVERDUE"]);
          }
          else {
            overdueTasksDataSet.push(0);
          }

          // Open
          if (group["OPEN"] !== undefined && group["OPEN"] !== null) {
            openTasksDataSet.push(group["OPEN"]);
          }
          else {
            openTasksDataSet.push(0);
          }

      });


      const mydatasets = [

        {
          label: "No Priority",
          backgroundColor: "rgba(167,212,255,0.65)",
          borderColor: "rgba(237,212,85,0.85)",
          borderWidth: 0,
          data: noPriorityDataSet, // [1, 2, 3, 6],
          stack: 'Stack 0'
        },
        {
          label: "Low",
          backgroundColor: "rgba(237,212,85,0.65)",
          borderColor: "rgba(237,212,85,0.85)",
          borderWidth: 0,
          data: lowPriorityDataSet, // [7, 9, 4, 4],
          stack: 'Stack 0'
        },
        {
          label: "Medium",
          backgroundColor: "rgba(194,254,167,0.65)",
          borderColor: "rgba(137,112,185,0.85)",
          borderWidth: 0,
          data: mediumPriorityDataSet, // [3, 4, 2, 1],
          stack: 'Stack 0'
        },
        {
          label: "High",
          backgroundColor: "rgba(252,3,98,0.35)",
          borderColor: "rgba(252,3,98,0.85)",
          borderWidth: 0,
          data: highPriorityDataSet, // [3, 5, 2, 4],
          stack: 'Stack 0'
        },
        {
          label: "Critical",
          backgroundColor: "rgba(252,3,98,0.65)",
          borderColor: "rgba(252,3,98,0.85)",
          borderWidth: 0,
          data: criticalPriorityDataSet, // [3, 5, 2, 4],
          stack: 'Stack 0'
        },
        // {
        //   label: "Open",
        //   backgroundColor: "rgba(139,235,110,0.65)",
        //   borderColor: "rgba(139,235,110,0.85)",
        //   borderWidth: 0,
        //   data: [8, 6, 3, 8],
        //   stack: 'Stack 1'
        // },
        {
          label: "Overdue",
          backgroundColor: "rgba(252,3,98,0.1)",
          borderColor: "rgba(252,3,98,0.25)",
          borderWidth: 1,
          data: overdueTasksDataSet, // [9, 8, 3, 3],
          stack: 'Stack 1'
        }
      ];

      const ctx = document.getElementById(chartId); // ('myChart');
      // Chart.register(ChartDataLabels); // first way of registering the plugin, registers them for all your charts

      const myChart = new Chart(ctx, {
          type: 'bar',
          plugins: [window.ChartDataLabels], // second way of registering plugin, register plugin for only this chart

          data: {
              // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              // datasets: [{
              //     label: '# of Votes',
              //     data: [12, 19, 3, 5, 2, 3],
              //     backgroundColor: [
              //         'rgba(255, 99, 132, 0.2)',
              //         'rgba(54, 162, 235, 0.2)',
              //         'rgba(255, 206, 86, 0.2)',
              //         'rgba(75, 192, 192, 0.2)',
              //         'rgba(153, 102, 255, 0.2)',
              //         'rgba(255, 159, 64, 0.2)'
              //     ],
              //     borderColor: [
              //         'rgba(255, 99, 132, 1)',
              //         'rgba(54, 162, 235, 1)',
              //         'rgba(255, 206, 86, 1)',
              //         'rgba(75, 192, 192, 1)',
              //         'rgba(153, 102, 255, 1)',
              //         'rgba(255, 159, 64, 1)'
              //     ],
              //     borderWidth: 1
              // }]

              labels: chartGroups, // ["Bugs", "Enhancements", "Testing", "Deployment"],
              datasets: mydatasets
          },
          options: {
              scaleIntegersOnly: true,
              showDatapoints: true,
              responsive: true,
              interaction: {
                intersect: false
              },
              plugins: {
                tooltip: {
                  position: 'average' //,
                  // titleColor: 'red',
                  // yAlign: 'center',
                  // xAlign: 'right'
                }
              },
              scales: {
                x: {
                  // stacked: true
                },
                y: {
                    // stacked: true,
                    min: 0,
                    stepSize: 1,
                    beginAtZero: true
                }
                // x: {
                //   stacked: true
                // },
                // y: {
                //   stacked: true,
                //   stepSize: 1,
                //   beginAtZero: true,
                //   precision: 0
                // },
                // yAxes: [{
                //     ticks: {
                //         stepSize: 1,
                //         precision: 0
                //     }
                // }]
              },
              onClick (e) {
                const activePoints = myChart.getElementsAtEventForMode(e, 'nearest', {
                                                                                        intersect: true
                                                                                        }, false);
                console.log("activePoints : ", activePoints);
                const [{ index }] = activePoints;
                console.log(activePoints[0].datasetIndex + "," + index + " == " + mydatasets[activePoints[0].datasetIndex].data[index]);
                // alert("Data index : " + index + ", Dataset Index : " + activePoints[0].datasetIndex);


                console.log("mydatasets : ", mydatasets);
                console.log("tasksChart3DapiData = ", tasksChart3DapiData);
                console.log("mydatasets : ", (mydatasets[activePoints[0].datasetIndex])["label"]);

                // if (index === 0) {
                //   console.log("tasksByChartTypeGroupAndStatusList : ", tasksByChartTypeGroupAndStatusList[i])
                // }

                console.log("mydatasets : ", (mydatasets[activePoints[0].datasetIndex])["group"]);

                if ((mydatasets[activePoints[0].datasetIndex])["label"] === "Overdue" || (mydatasets[activePoints[0].datasetIndex])["label"] === "Open") {
                  console.log("tasks by status are : ", ((tasksChart3DapiData[index])["tasksByStatusList"])[((mydatasets[activePoints[0].datasetIndex])["label"]).toUpperCase()]);
                  const _matchingTasks = ((tasksChart3DapiData[index])["tasksByStatusList"])[((mydatasets[activePoints[0].datasetIndex])["label"]).toUpperCase()];
                  _this.populateMatchingTasks(_matchingTasks);
                }
                else {
                  console.log("tasks by priority are : ", ((tasksChart3DapiData[index])["tasksByPriorityList"])[(mydatasets[activePoints[0].datasetIndex])["label"]]);
                  const _matchingTasks = ((tasksChart3DapiData[index])["tasksByPriorityList"])[(mydatasets[activePoints[0].datasetIndex])["label"]];
                  _this.populateMatchingTasks(_matchingTasks);
                }




                document.getElementById("chartjsClickedLabel").innerHTML = mydatasets[activePoints[0].datasetIndex].data[index];

              } // ,
             //  tooltips: {
             //     mode: 'label',
             //     callbacks: {
             //        label: function (tooltipItem, data) {
             //           return data.datasets[tooltipItem.datasetIndex].label + ": t" + (tooltipItem.yLabel);
             //        }
             //     }
             //  },
             //  plugins: {
             //    anchor: 'center',
             //    tooltip: {
             //      position: 'nearest'
             //    },
             //    datalabels: {
             //       display: true,
             //       align: 'center',
             //       anchor: 'center',
             //       labels: {
             //          value: {
             //            color: 'rgba(0, 0, 0, 0.25)'
             //          }
             //      }
             //    }
             // }
          }
      });

      /*
      var numberWithCommas = function (x) {
         return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

      var dataPack1 = [50000, 22000, 26000, 35000, 55000, 55000, 56000, 59000, 60000, 61000, 60100, 62000];

      var dataPack2 = [0, 6000, 13000, 14000, 50060, 20030, 20070, 35000, 41000, 4020, 40030, 70050];

      var dates = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      // Chart.defaults.global.elements.rectangle.backgroundColor = '#FF0000';

      var bar_ctx = document.getElementById('myChart');
      var bar_chart = new Chart(bar_ctx, {
         type: 'bar',
         data: {
            labels: dates,
            datasets: [{
               label: 'SoftEnterprises, Sales',
               data: dataPack1,
               backgroundColor: "rgba(55, 160, 225, 0.7)",
               hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
               hoverBorderWidth: 2,
               hoverBorderColor: 'lightgrey',
               stack: "stack0"
            }, {
               label: 'SmartSystems, Sales',
               data: dataPack2,
               backgroundColor: "rgba(225, 58, 55, 0.7)",
               hoverBackgroundColor: "rgba(225, 58, 55, 0.7)",
               hoverBorderWidth: 2,
               hoverBorderColor: 'lightgrey',
               stack: "stack0"
            }]
         },
         options: {
            tooltips: {
               mode: 'label',
               callbacks: {
                  label: function (tooltipItem, data) {
                     return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
                  }
               }
            },
            scales: {
               xAxes: [{
                  stacked: true,
                  gridLines: {
                     display: false
                  }
               }],
               yAxes: [{
                  stacked: true,
                  ticks: {
                     callback: function (value) {
                        return numberWithCommas(value);
                     }
                  }
               }]
            }, // scales
            legend: {
               display: true
            },
            plugins: {
               datalabels: {
                  display: true,
                  align: 'center',
                  anchor: 'center'
               }
            }
         } // options
      });

      */


    },
    populateMatchingTasks (matchingTasks) {

      matchingTasks.forEach(task => {

        if (task.dueDate) {
          task["dueDateInLocalFormat"] = this.convertUTCDateFromServerToLocalDateForDisplayAsDateOnly(task.dueDate);
        }

      });

      this.matchingTasks = matchingTasks;


      UIkit.modal(document.querySelector("#view-tasks-modal")).show();
    },
    viewTask (taskId) {

      bus.emit('viewSubTaskEvent', {
        subTaskId: taskId,
        modalKey: "view_sub_task"
      });
      return false;
    }
    // ,
    // renderChartJSExample2 () {
    //
    //   const DATA_COUNT = 7;
    //   const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};
    //
    //   const labels = Utils.months({count: 7});
    //   const data = {
    //     labels: labels,
    //     datasets: [
    //       {
    //         label: 'Dataset 1',
    //         data: Utils.numbers(NUMBER_CFG),
    //         backgroundColor: Utils.CHART_COLORS.red,
    //         stack: 'Stack 0',
    //       },
    //       {
    //         label: 'Dataset 2',
    //         data: Utils.numbers(NUMBER_CFG),
    //         backgroundColor: Utils.CHART_COLORS.blue,
    //         stack: 'Stack 0',
    //       },
    //       {
    //         label: 'Dataset 3',
    //         data: Utils.numbers(NUMBER_CFG),
    //         backgroundColor: Utils.CHART_COLORS.green,
    //         stack: 'Stack 1',
    //       },
    //     ]
    //   };
    //
    //   const actions = [
    //     {
    //       name: 'Randomize',
    //       handler(chart) {
    //         chart.data.datasets.forEach(dataset => {
    //           dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
    //         });
    //         chart.update();
    //       }
    //     },
    //   ];
    //
    //   const config = {
    //     type: 'bar',
    //     data: data,
    //     options: {
    //       plugins: {
    //         title: {
    //           display: true,
    //           text: 'Chart.js Bar Chart - Stacked'
    //         },
    //       },
    //       responsive: true,
    //       interaction: {
    //         intersect: false,
    //       },
    //       scales: {
    //         x: {
    //           stacked: true,
    //         },
    //         y: {
    //           stacked: true
    //         }
    //       }
    //     }
    //   };
    //
    // }





  },

  mounted () {


    // https://cdn.jsdelivr.net/npm/chart.js@3.3.0/dist/chart.min.js
    // https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.6.0/chart.min.js
    // const chartJSLibrary = document.createElement('script');
    //       chartJSLibrary.setAttribute('src', 'https://cdn.jsdelivr.net/npm/chart.js@3.3.0/dist/chart.min.js');
    // document.head.appendChild(chartJSLibrary);
    //
    // const chartJSDataLabelsLibrary = document.createElement('script');
    //       chartJSDataLabelsLibrary.setAttribute('src', 'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0-rc');
    // document.head.appendChild(chartJSDataLabelsLibrary);


    // this.initChartLibraries();
    this.fetchChartPreferences(true);

    // $.jqplot.config.enablePlugins = true;
    // setTimeout(() => {
    //         this.renderCharts();
    // }, 500);
  }
};
</script>

<style scoped>

  .plain_button {
    padding: 2px 10px;
    border-radius: 3px;
    border: 1px solid gray;
    transition: 0.125s linear;
    cursor:pointer;
  }

  .plain_button:hover {
    background-color:#f0f0f0;
  }

  .plain_button:active {
    transform: scale(0.95);
  }

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
    place-items: center;
    place-content: center;
    border: 1px solid lightgrey;
    max-height: 275px;
  }

  .big-container{
    flex-basis: 67%;
    display: grid;
    place-items: center;
    place-content: center;
  }

  .chart-title {
    font-size: 0.75rem;
    padding: 5px 0px;
    font-weight: bold;
    width: 100%;
    display: flex;
    justify-content: center;
    background: #f0f0f0;
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
    grid-template-columns: 60px 5fr 3fr auto auto auto;
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
