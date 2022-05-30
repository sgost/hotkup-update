// Methods related to Category-Stages functionality on October 27, 2020 by C.Bhaskara Vignesh.

export default
{
  data: function () {
      return {
        categoryStages : [{
            name : "NEW",
            isVisible : true,
            considerCompleted : false,
            assignees : [],
        }],
        categoryStage : {},
        availableAssignees : [],
        availableAssigneesRaw : [],
        constants : {
          MAX_ASSIGNEES_TO_DISPLAY_IN_GRID_ROW : 2
        }
      }
  },
  methods: {

    doCategoryStageValidation(){

        console.log("this.categoryStage = ", this.categoryStage);
        if(this.categoryStage.name.trim()==="")
        {
              UIkit.notification(`<div class="taskone-notification">
                                      <span uk-icon="icon: warning;ratio:1"></span>
                                      <div> Please enter a valid Name. </div>
                                  </div>`, {
                                  status: 'danger',
                                  pos: 'bottom-left',
                                  timeout: 5000
                              });

              return false;
        }
        else if(this.categoryStage.isConsideredComplete===null)
        {
              UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span> Please select a valid complete status.", {
                                  status: 'danger',
                                  pos: 'bottom-left',
                                  timeout: 5000
                              });

              return false;
        }
        // else if(this.categoryStage.assigneeIds.length===0)
        // {
        //       UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span> Please add atleast one assignee.", {
        //                           status: 'danger',
        //                           pos: 'bottom-left',
        //                           timeout: 5000
        //                       });
        //
        //       return false;
        // }
        return true;
    },
    saveCategoryStage(){

        if(!this.doCategoryStageValidation())
            return false; // stop here if form is invalid.


        let btnText = document.getElementById("saveTaskStatusButton").innerHTML;
        document.getElementById("saveTaskStatusButton").innerHTML = "Saving..";
        this.disableHTMLElement(document.getElementById("saveTaskStatusButton"));

        let post_url = "./categories-stages/save";
        console.log("Posting data to : " + post_url);

        let isNewItem = this.categoryStage.id=="new";
        let form = {
            id :      this.categoryStage.id,
            categoryProcessId : this.currentlySelectedCategoryProcess.id,    // The parent category's id (Ref.)
            order : this.categoryStage.order,
            name :   this.categoryStage.name,
            type  :   this.categoryStage.type,
            isVisible :   this.categoryStage.isVisible,
            isConsideredComplete :this.categoryStage.isConsideredComplete,
            assigneeIds : this.categoryStage.assigneeIds,
            estimatedDuration : this.categoryStage.estimatedDuration,
            estimatedDurationUnit : this.categoryStage.estimatedDurationUnit,
        };

        // VueJS ajax call-1
        axios.post(post_url, form)
                  .then((dataResponse) => {

                    console.log("CategoryStage Registration Result : ");
                    console.log(dataResponse);

                    if(dataResponse.data["actionResult"]===1)
                    {
                        this.newCategoryInfo = dataResponse.data["bean"];

                        let successMessage = "";
                        if(isNewItem){

                            successMessage = `<div class="taskone-notification">
                                                    <span uk-icon="icon: check;ratio:1"></span>
                                                    <div> New Status added successfully. </div>
                                              </div>`;
                        }
                        else {

                            successMessage = `<div class="taskone-notification">
                                                    <span uk-icon="icon: check;ratio:1"></span>
                                                    <div> Status modified successfully. </div>
                                              </div>`;
                        }

                        UIkit.notification(successMessage, {
                                            status: 'success',
                                            pos: 'bottom-left',
                                            timeout: 5000
                                        });

                        document.getElementById("saveTaskStatusButton").innerHTML = btnText;
                        this.enableHTMLElement(document.getElementById("saveTaskStatusButton"));


                        //this.$emit("refreshList",{});         // Refresh the List that pulls the category-stages for this category. (To be done..)
                        this.loadCategoryStagesForCategory(this.currentlySelectedCategoryProcess);   // This code will refresh the stages-list.
                        this.discardTransitionStateFormData();

                        this.categoryStage = {
                            id : "new",
                            categoryProcessId : this.currentlySelectedCategoryProcess.id
                        };
                        this.saveTaskStatusButtonLabel = "Add";

                        // Reset the Dropdown with raw-data [Raw data is the plain list of assignees not associated with any categoryStage]
                        this.availableAssignees = [];

                        console.log("this.availableAssignees bf: ", this.availableAssignees);
                        this.availableAssigneesRaw.forEach((item) => {
                            this.availableAssignees.push(item);
                        });
                        console.log("this.availableAssignees af: ", this.availableAssignees);

                    }
                    else
                    {
                        let errorMsg = (dataResponse["data"])["message"];
                        UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + errorMsg, {
                                            status: 'danger',
                                            pos: 'top-right',
                                            timeout: 5000
                                        });


                        document.getElementById("saveTaskStatusButton").innerHTML = btnText;
                        this.enableHTMLElement(document.getElementById("saveTaskStatusButton"));
                        return false;
                    }


            })
            .catch(function(errorResponse) {

                console.log("ERROR MS - ", errorResponse);
                let exceptionMsg = errorResponse.data["exception"];

                UIkit.notification("<span uk-icon='icon: warning ;ratio: 0.75'></span> " + exceptionMsg + ".", {
                                    status: 'danger',
                                    pos: 'top-right',
                                    timeout: 5000
                                });


                document.getElementById("saveTaskStatusButton").innerHTML = btnText;
                this.enableHTMLElement(document.getElementById("saveTaskStatusButton"));
                return false;
            });
    },

    // Handle the events emitted when selectbox component values are modified.
    updateCategoryStageAssigneesEmitEvent(data){
        const assigneeIds = Array.from(data).map(item => item.id);
        this.categoryStage["assigneeIds"] = assigneeIds;
        console.log("updateCategoryStageAssigneesEmitEvent : ", assigneeIds);
    },

    getCategoryStageRecord(){

        let get_url = "./categories-stages/get/" + this.categoryStage.id;

        axios.get(get_url)
                .then((dataResponse) => {
                    if(dataResponse.data["actionResult"]==1)
                    {
                        let categoryStage = dataResponse.data["bean"];
                        this.categoryStage = categoryStage;
                        this.loadPotentialCategoryStageAssignees();
                    }
                })
                .catch((error) => {

                    UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
                                        status: 'danger',
                                        pos: 'bottom-left',
                                        timeout: 5000
                                    });
                    return false;
                });


    },

    // This data will be used to filter assignees by merging with the result from 'get-associated-people/{category-stage-id}'
    loadPotentialCategoryStageAssignees(){
        let url = "./categories-stages/get-potential-users";    // Fetch all potential assignees (users)
        this.getUnpaginatedList("potentialAssignees", url);     // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
    },
    //Callbacks
    handlePotentialAssignees(dataResponse){

        //Pass it to the availableAssignees prop to the dropdown.
        console.log("Potential Assignees : ", dataResponse);

        let mapFunction = (user) => {
            return {
                id        : user.id,
                firstName : user.firstName,
                lastName  : user.lastName,
                isSelected: false
            };
        };

        let mappedArrayOfUser = dataResponse.data.bean.map(mapFunction);
        console.log("this.categoryStage.assignees = ", this.categoryStage.assignees);
        let categoryStageAssignees=[];

        this.availableAssigneesRaw = [];
        mappedArrayOfUser.forEach((user) => {

            let userObj = {
                id : user.id,
                firstName : user.firstName,
                lastName : user.lastName,
                isSelected : false // Set false by default, so that if the category didn't have any member, then all of the available list could be passed to selectbox.
            };

            // For re-use
            this.availableAssigneesRaw.push({
                id : user.id,
                firstName : user.firstName,
                lastName : user.lastName,
                isSelected : false // Set false by default, so that if the category didn't have any member, then all of the available list could be passed to selectbox.
            });

            if(this.categoryStage.assignees!==undefined && this.categoryStage.assignees!==null)
            {
                this.categoryStage.assignees.forEach((assignee) => {
                      if(userObj.id===assignee.id)
                        userObj["isSelected"] = true;
                });
            }

            categoryStageAssignees.push(userObj);
        });

        this.availableAssignees = categoryStageAssignees;
        console.log("this.availableAssignees : ", this.availableAssignees);
    },

    loadCategoryStagesForCategory(categoryProcess){
        let url = "./categories-stages/list/all/" + categoryProcess.id;   // Fetch all potential assignees (users)
        this.getUnpaginatedList("categoryStages", url);                   // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
    },
    handleFetchedCategoryStages(dataResponse){

          let categoryStages = dataResponse.data.bean;

          console.log("---Category Process Transition States are ", categoryStages);

          categoryStages.forEach((categoryStage, i) => {

              let assignees = categoryStage.assignees;

              if(assignees!==null)
              {
                  let assigneeNamesArray = [];
                  assignees.forEach((item, i) => {
                      assigneeNamesArray.push({
                        shortName : item.firstName,
                        hint : item.firstName + " " + item.lastName,
                        isFirsItem : i == 0,
                        isLastItem : i == assignees.length-1       // For csv formatting in the html
                      });
                  });

                  // Display X names + "x items more.." if its more than 3 assignees.
                  if(assigneeNamesArray.length > this.constants.MAX_ASSIGNEES_TO_DISPLAY_IN_GRID_ROW){

                      let moreItems = assigneeNamesArray.slice(this.constants.MAX_ASSIGNEES_TO_DISPLAY_IN_GRID_ROW, assigneeNamesArray.length);
                      let moreItemsHintString = "";
                      moreItems.forEach((item2, i) => {
                          moreItemsHintString += item2.hint + "<br>";
                      });

                      categoryStage["assigneesList"] = assigneeNamesArray.slice(0, this.constants.MAX_ASSIGNEES_TO_DISPLAY_IN_GRID_ROW);      //Add the first X items
                      categoryStage["assigneesList"].push({
                         shortName: moreItems.length + " more..",
                         hint : moreItemsHintString,
                         isFirsItem : false,
                         isLastItem : true
                      }); //Add "x more.." to the first X items.
                  }
                  else {
                    categoryStage["assigneesList"] = assigneeNamesArray;
                  }
              }

          });

          //this.categoryStages = categoryStages;
          this.currentlySelectedCategoryProcess["statuses"] = categoryStages;


    }
  }
}
