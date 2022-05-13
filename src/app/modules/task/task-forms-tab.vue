<template>

    <div style="padding: 5px 0px;margin-right:20px;margin-bottom: 10px;display: grid;grid-template-rows: 1fr;place-items: start;border-bottom: 1px solid #d0d0d0;">
        <button v-on:click="openFormTemplateAttachmentModal()"  class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color:#2196f3;border-radius: 3px;min-width: 100px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;display: inline-block;">
            <span uk-icon="icon:plus;ratio:0.65" class="uk-icon" style="">
              <svg width="13" height="13" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="plus">
                <rect x="9" y="1" width="1" height="17"></rect>
                <rect x="1" y="9" width="17" height="1"></rect>
              </svg>
            </span>
            <span style="padding-left: 10px;">Attach Form</span>
        </button>
    </div>

    <div>
      <div v-show="attachedForms.length==0" style="text-align:center;border-bottom: 0px;"> No forms added </div>
        <div  v-show="attachedForms.length>0"  class="attachedFormTemplate_row" style="background: #f2f2f2;border: 1px solid transparent;border-bottom: 0px;text-transform: uppercase;font-size: 0.55rem;">
            <div  style=";justify-self: end;flex-basis: 25%;">Form Name</div>
            <div  style="color: rgb(51, 51, 51);flex-basis: 15%;">Attached on</div>
            <div  style="color: rgb(51, 51, 51);flex-basis: 15%;">Attached by</div>
            <div  style="color: rgb(51, 51, 51);flex-basis: 15%;">Assigned to</div>
            <div  style="color: rgb(51, 51, 51);flex-basis: 15%;">Status</div>
            <div  style="color: rgb(51, 51, 51);flex-basis: 15%;">Actions</div>
        </div>
        <div v-show="attachedForms.length>0"  class="activity_box" style="width: 100%;box-sizing: border-box;margin-left: 0px;margin-right: 0px;flex-direction: column;">

            <template v-for="attachedFormTemplate in attachedForms">

                <div class="attachedFormTemplate_row" >
                  <div style="font-weight:normal;flex-basis: 25%;" >
                    <a v-if="attachedFormTemplate.formStatus!=='Submitted'" uk-tooltip="Edit Form Attachment" v-on:click="openFormTemplateAttachmentModalForModification(attachedFormTemplate, attachedFormTemplate.formTemplateId, attachedFormTemplate.formTemplateName)">
                      {{attachedFormTemplate.formTemplateName}}
                    </a>
                    <div v-else-if="attachedFormTemplate.formStatus==='Submitted'" style="" uk-tooltip="This form is submitted and hence cannot be edited.">
                      <span uk-icon="icon:check;ratio:0.65" style="color:green"></span> &nbsp;
                      <span>{{attachedFormTemplate.formTemplateName}}</span>
                    </div>
                    <div style="margin-top: 5px;">
                      <span v-if="attachedFormTemplate.stageName !== null" style="margin-left: 0px;background: rgb(227, 227, 227);padding: 3px 5px 3px 3px;border-radius: 4px;font-size: 0.45rem;text-transform: uppercase;letter-spacing: 1px;">Stage - {{attachedFormTemplate.stageName}}</span>
                    </div>
                  </div>
                  <div style="color:#333;flex-basis: 15%;">{{attachedFormTemplate.createdOn}}</div>
                  <div style="color:#333;flex-basis: 15%;"><span v-if="attachedFormTemplate.attachedByInfo!==undefined && attachedFormTemplate.attachedByInfo!==null">{{attachedFormTemplate.attachedByInfo.split("#")[1]}}</span></div>
                  <div style="color:#333;flex-basis: 15%;">
                    <span v-if="attachedFormTemplate.assigneeInfo!==undefined && attachedFormTemplate.assigneeInfo!==null && attachedFormTemplate.assigneeInfo!=='any'">{{attachedFormTemplate.assigneeInfo.split("#")[1]}}</span>
                    <span v-if="attachedFormTemplate.assigneeInfo!==undefined && attachedFormTemplate.assigneeInfo!==null && attachedFormTemplate.assigneeInfo==='any'">Any</span>
                  </div>
                  <div style="flex-basis: 15%;">
                      <span v-if="attachedFormTemplate.formStatus=='In progress'" style="color: rgb(46 166 253);text-transform: uppercase;font-size: 0.6rem;letter-spacing: 0.5px;">Pending</span>
                      <span v-else-if="attachedFormTemplate.formStatus=='Submitted'" style="color: rgb(63 183 34);text-transform: uppercase;font-size: 0.6rem;letter-spacing: 0.5px;font-weight: bold;">{{attachedFormTemplate.formStatus}}</span>
                  </div>
                  <div v-if="!attachedFormTemplate.isTabularForm" style="display:flex;column-gap:5px;flex-basis: 15%;">
                      <div uk-tooltip="Click to view Form" v-show="attachedFormTemplate.formStatus!=='Submitted'" v-on:click="viewForm(attachedFormTemplate.id, attachedFormTemplate.formTemplateId, attachedFormTemplate.formTemplateName, attachedFormTemplate, false )"><a>Submit Form</a></div>
                      <div uk-tooltip="Click to view Form Data" v-show="attachedFormTemplate.formStatus==='Submitted'" v-on:click="viewFormData(attachedFormTemplate.id, attachedFormTemplate.formTemplateId, attachedFormTemplate.formTemplateName, attachedFormTemplate )"><a>View Data</a></div>
                      <!-- <div uk-tooltip="Download PDF" v-show="attachedFormTemplate.formStatus==='Submitted'" v-on:click="viewFormData(attachedFormTemplate.id, attachedFormTemplate.formTemplateId, attachedFormTemplate.formTemplateName, attachedFormTemplate )"> | <a><span uk-icon="icon:download;ratio:0.65"></span></a></div> -->
                  </div>
                  <div v-if="attachedFormTemplate.isTabularForm" style="display:flex;column-gap:5px;flex-basis: 15%;">
                      <div uk-tooltip="Click to view Tabular Form" v-show="attachedFormTemplate.formStatus!=='Submitted'" v-on:click="viewForm(attachedFormTemplate.id, attachedFormTemplate.tabularFormTemplateId, attachedFormTemplate.formTemplateName, attachedFormTemplate, true )"><a>Submit Form</a></div>
                      <div uk-tooltip="Click to view Tabular Form Data" v-show="attachedFormTemplate.formStatus==='Submitted'" v-on:click="viewTabularFormData(attachedFormTemplate.id, attachedFormTemplate.tabularFormTemplateId, attachedFormTemplate.formTemplateName, attachedFormTemplate )"><a>View Data</a></div>
                      <!-- <div uk-tooltip="Download PDF" v-show="attachedFormTemplate.formStatus==='Submitted'" v-on:click="viewTabularFormData(attachedFormTemplate.id, attachedFormTemplate.tabularFormTemplateId, attachedFormTemplate.formTemplateName, attachedFormTemplate )"> | <a><span uk-icon="icon:download;ratio:0.65"></span></a></div> -->
                  </div>
                </div>

            </template>
        </div>

      <div id="form-template-attachment-modal" class="uk-flex-top" uk-modal style="transition: 0.5s linear">
          <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="min-width:70%;width:auto;font-size: 0.65rem;padding: 35px;">
              <button class="uk-modal-close-default" type="button" uk-close></button>

              <form style="width: 90%;margin-top: 15px;padding-top: 10px;padding-right: 30px;padding-left: 0px;margin-left: -15px;"
                    class="uk-grid-small uk-grid ui-form" uk-grid onsubmit="return false;">
                    <div class="uk-width-1-3@s uk-grid-margin uk-first-column ">
                        <label class="uk-form-label" for="form-stacked-text">Form Template</label>
                        <select tabindex="7" v-model="newFormTemplate.formTemplateInfo" class="uk-select" id="form-stacked-select">
                            <optgroup label="Forms">
                              <option v-for="formTemplate in formTemplatesList" v-bind:value="'form_#' + formTemplate.id + '#' + formTemplate.name">{{formTemplate.name}}</option>
                            </optgroup>
                            <optgroup label="Tabular Forms">
                              <option v-for="formTemplate in tabularFormTemplatesList" v-bind:value="'tabular_form#' + formTemplate.id + '#' + formTemplate.name">{{formTemplate.name}}</option>
                            </optgroup>
                        </select>
                    </div>
                    <div class="uk-width-1-3@s uk-grid-margin uk-first-column ">
                        <label class="uk-form-label" for="form-stacked-text">Assignee</label>
                        <select tabindex="7" v-model="newFormTemplate.assigneeInfo" class="uk-select" id="form-stacked-select">
                            <option value="any" selected="selected">Any</option>
                            <option v-for="assignee in assignees" v-bind:value="assignee.id + '#' + assignee.firstName + ' ' + assignee.lastName">{{assignee.firstName}} {{assignee.lastName}}</option>
                        </select>
                    </div>

                    <div style="display: flex;place-self:end;column-gap:20px;padding-right: 15px;">
                        <button tabindex="11" id="attachFormTemplateButton" v-on:click="attachFormToThisTask()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: #4caf50;border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: auto;">
                        <div style="display: grid;grid-template-columns: auto auto;">
                          <div>&nbsp;&nbsp;&nbsp;Attach Form</div>
                        </div>
                        </button>
                        <button tabindex="11" id="discardButton" v-on:click="closeFormTemplateAttachmentModal()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" data-v-2d9397b1="" style="background-color: rgb(234 234 234);border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: auto;margin-top: 0px;color: #565656;"><div><div >Discard</div></div></button>
                    </div>

              </form>
          </div>
      </div>

      <div id="form-template-render-container-modal" class="uk-flex-top" uk-modal style="transition: 0.5s linear">
          <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="min-width:70%;width:auto;font-size: 0.65rem;padding: 35px;border-radius: 3px;">
              <button class="uk-modal-close-default" type="button" uk-close></button>

              <div v-show="!isFormTemplateRendered" style="display:flex;align-items:center;justify-content:center"> Form is loading.. </div>
              <div v-show="isFormTemplateRendered" class="form-container" style="background-color:#fff" id="form-container-for-printing">

                  <div class="ndropzone_row ndraggable_row" >
                    <div class="ndropzone" style="border-bottom: 1px solid #d4d4d4;margin-bottom: 10px;border-radius: 0px;">
                      <div class="ndraggable field text-input-element form-element" style="position:relative;">
                        <div style="width:fit-content;">
                          <div class="label field-label textinput-label" style="font-size: .75rem;font-weight: bold !important;">
                              <span>{{attachmentFormTemplateNameToBeEdited}} - {{taskSNO}}</span>
                              <a class="hide-during-print" v-on:click="downloadEmptyFormAsPDF('form-container-for-printing', $event)" style="font-size: 0.45rem;margin-left: 10px;">(Download Empty Form PDF)</a>
                              <span style="font-size: 0.55rem;font-weight: normal !important;padding-left: 20px;" v-if="currentFormToBeSubmitted.formStatus!=='Submitted' && currentFormToBeSubmitted.assigneeInfo!=='any' && currentFormToBeSubmitted.assigneeInfo!==undefined && currentFormToBeSubmitted.assigneeInfo!==null">Assigned to : {{currentFormToBeSubmitted.assigneeInfo.split("#")[1]}}</span>
                              <span style="font-size: 0.55rem;font-weight: normal !important;padding-left: 20px;" v-if="currentFormToBeSubmitted.formStatus==='Submitted' && currentFormToBeSubmitted.submitterInfo!==undefined && currentFormToBeSubmitted.submitterInfo!==null">Submitted by : {{currentFormToBeSubmitted.submitterInfo.split("#")[1]}}</span>

                          </div>
                          <div style="visibility: hidden;display:flex;flex-direction:column;display:none" class="show-during-print" >
                            <span style="font-size: 0.55rem;text-transform: none;">PDF generated on {{reportGeneratedOnForPDFPrinting}}</span>
                            <span style="font-size: 0.55rem;text-transform: none;">PDF generated by {{loggedInUser.username}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="edit_form_template_container" style="display: flex;flex-direction: column;width: 100%;">
                      <!-- Here is where the form-template will be rendered -->
                  </div>
                  <div class="ndropzone_row ndraggable_row hide-during-print" style="margin-top:10px;align-items: start;justify-content: start;">
                    <div class="ndropzone ndraggable field text-input-element form-element"  style="display: flex!important;place-self:end;column-gap:20px;padding-right: 15px;">
                        <button tabindex="10" id="formSubmitButton" v-on:click="submitFormAttachment()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(76, 175, 80);border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;color: white;">Submit</button>
                        <button tabindex="11" id="discardFormDataButton" v-on:click="closeFormAttachmentModal()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(234, 234, 234);border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-top: 0px;color: rgb(86, 86, 86);"><div><div >Close</div></div></button>
                    </div>
                  </div>
              </div>
          </div>
      </div>

      <div id="tabular-form-template-render-container-modal" class="uk-flex-top" uk-modal style="">
          <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="transition: 0.5s linear;font-family:Nunito;min-width:70%;width:auto;font-size: 0.65rem;padding: 35px;border-radius: 3px;">
              <button class="uk-modal-close-default" type="button" uk-close></button>

              <div v-show="!isFormTemplateRendered" style="display:flex;align-items:center;justify-content:center"> Form is loading.. </div>
              <div v-show="isFormTemplateRendered" class="tabular-form-container" id="tabular-form-container-for-printing">

                  <div class="ndropzone_row ndraggable_row">
                    <div class="ndropzone" style="border-bottom: 1px solid rgb(212, 212, 212);border-radius: 0px;align-items: center;justify-content: center;display: flex;margin: 0px;padding-bottom: 10px;">
                      <div class="ndraggable field text-input-element form-element" style="position:relative;">
                        <div style="width:fit-content;">
                          <!-- <div class="label field-label textinput-label" style="font-size: .75rem;font-weight: bold !important;">
                              <span>{{attachmentFormTemplateNameToBeEdited}} </span>
                              <a v-on:click="downloadEmptyFormAsPDF('edit_tabular_form_template_container')" style="font-size: 0.45rem;margin-left: 10px;">(Download Empty Form PDF)</a>
                              <span style="font-size: 0.55rem;font-weight: normal !important;padding-left: 20px;" v-if="currentFormToBeSubmitted.formStatus!=='Submitted' && currentFormToBeSubmitted.assigneeInfo!=='any' && currentFormToBeSubmitted.assigneeInfo!==undefined && currentFormToBeSubmitted.assigneeInfo!==null">Assigned to : {{currentFormToBeSubmitted.assigneeInfo.split("#")[1]}}</span>
                              <span style="font-size: 0.55rem;font-weight: normal !important;padding-left: 20px;" v-if="currentFormToBeSubmitted.formStatus==='Submitted' && currentFormToBeSubmitted.submitterInfo!==undefined && currentFormToBeSubmitted.submitterInfo!==null">Submitted by : {{currentFormToBeSubmitted.submitterInfo.split("#")[1]}}</span>
                          </div> -->
                          <div class="label field-label textinput-label" style="font-size: .75rem;font-weight: bold !important;">
                              <span>{{attachmentFormTemplateNameToBeEdited}} - {{taskSNO}}</span>
                              <a class="hide-during-print" v-on:click="downloadEmptyFormAsPDF('tabular-form-container-for-printing', $event)" style="font-size: 0.45rem;margin-left: 10px;">(Download Empty Form PDF)</a>
                              <span style="font-size: 0.55rem;font-weight: normal !important;padding-left: 20px;" v-if="currentFormToBeSubmitted.formStatus!=='Submitted' && currentFormToBeSubmitted.assigneeInfo!=='any' && currentFormToBeSubmitted.assigneeInfo!==undefined && currentFormToBeSubmitted.assigneeInfo!==null">Assigned to : {{currentFormToBeSubmitted.assigneeInfo.split("#")[1]}}</span>
                              <span style="font-size: 0.55rem;font-weight: normal !important;padding-left: 20px;" v-if="currentFormToBeSubmitted.formStatus==='Submitted' && currentFormToBeSubmitted.submitterInfo!==undefined && currentFormToBeSubmitted.submitterInfo!==null">Submitted by : {{currentFormToBeSubmitted.submitterInfo.split("#")[1]}}</span>

                          </div>
                          <div style="visibility: hidden;display:flex;flex-direction:column;display:none" class="show-during-print" >
                            <span style="font-size: 0.55rem;text-transform: none;">PDF generated on {{reportGeneratedOnForPDFPrinting}}</span>
                            <span style="font-size: 0.55rem;text-transform: none;">PDF generated by {{loggedInUser.username}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="edit_tabular_form_template_container" style="display: flex;flex-direction: column;width: 100%;">
                      <!-- Here is where the form-template will be rendered -->
                      <div id="tablePreview" style="transition:0.25s linear">
                          <div v-show="tableColumnsArray.length === 0" style="display:grid;place-content:center;">
                            Form is Loading..
                          </div>
                          <form autocomplete="off">
                            <div style="display: flex;column-gap: 10px;background-color: whitesmoke;text-transform: none;font-weight: bold;letter-spacing: 1px;">
                                <template v-for="item in tableColumnsArray">
                                    <div v-if="item.type==='number'" v-bind:style="'text-align: right;min-width:' + item.minWidth + ';padding: 5px;'">{{item.label}}</div>
                                    <div v-else v-bind:style="'min-width:' + item.minWidth + ';padding: 5px;'">{{item.label}}</div>
                                </template>
                            </div>
                            <template v-for="row in rowsArray">
                              <div v-bind:data-row-key="row.key" class="table_row" style="display:flex;column-gap:10px;">
                                  <template v-for="item in tableColumnsArray">
                                      <div v-if="item.type==='text'" v-bind:style="'width:' + item.minWidth + ';padding: 5px;'">
                                          <input v-on:input="populateTabularFormData($event)" data-type="text" v-bind:data-column-key="item.name" type="text" class="textbox form-input-element" v-bind:style="'outline: 0px;border: 0px;border-bottom: 1px solid black;width:' + item.minWidth" v-bind:id="'column_' + item.name" />
                                      </div>
                                      <div v-if="item.type==='date'" v-bind:style="'width:' + item.minWidth + ';padding: 5px;'">
                                          <input v-on:input="populateTabularFormData($event)" data-type="date" v-bind:data-column-key="item.name" type="date" class="textbox form-input-element" v-bind:style="'outline: 0px;border: 0px;border-bottom: 1px solid black;width:' + item.minWidth" v-bind:id="'column_' + item.name" />
                                      </div>
                                      <div v-if="item.type==='datetime-local'" v-bind:style="'width:' + item.minWidth + ';padding: 5px;'">
                                          <input v-on:input="populateTabularFormData($event)" data-type="datetime-local" v-bind:data-column-key="item.name" type="datetime-local" class="textbox form-input-element" v-bind:style="'outline: 0px;border: 0px;border-bottom: 1px solid black;width:' + item.minWidth" v-bind:id="'column_' + item.name" />
                                      </div>
                                      <div v-if="item.type==='integer'" v-bind:style="'width:' + item.minWidth + ';padding: 5px;'">
                                          <input v-on:input="populateTabularFormData($event)" data-type="integer" min="0" v-bind:data-column-key="item.name" type="number" class="textbox form-input-element" v-bind:style="'outline: 0px;border: 0px;border-bottom: 1px solid black;text-align: right;width:' + item.minWidth" v-bind:id="'column_' + item.name" />
                                      </div>
                                      <div v-if="item.type==='float'" v-bind:style="'width:' + item.minWidth + ';padding: 5px;'">
                                          <input v-on:input="populateTabularFormData($event)" data-type="float" min="0" v-bind:data-column-key="item.name" type="number" class="textbox form-input-element" v-bind:style="'outline: 0px;border: 0px;border-bottom: 1px solid black;text-align: right;width:' + item.minWidth" v-bind:id="'column_' + item.name" />
                                      </div>
                                  </template>
                              </div>
                            </template>
                          </form>
                      </div>

                  </div>
                  <div class="mini-btn hide-during-print" id="duplicateRowButton"  v-on:click="duplicateRow()" style="margin-top: 25px;user-select: none;display: flex;align-items: center;">
                    <span uk-icon="icon:plus;ratio:0.55" class="uk-icon"></span>
                    <span style="margin-left:7px;">Add Row</span>
                  </div>
                  <!-- <div class="mini-btn" id="clearRowButton"  v-on:click="clearRows()" style="margin-top: 25px;user-select: none;display: flex;align-items: center;">Clear Rows</div> -->

                  <div class="ndropzone_row ndraggable_row hide-during-print" style="margin-top:10px;align-items: start;justify-content: start;">
                    <div class="ndropzone ndraggable field text-input-element form-element"  style="display: flex!important;place-self:end;column-gap:20px;padding-right: 15px;">
                        <button tabindex="10" id="tabularFormSubmitButton" v-on:click="submitTabularFormAttachment()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(76, 175, 80);border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;color: white;">Submit</button>
                        <button tabindex="11" id="discardTabularFormDataButton" v-on:click="closeTabularFormAttachmentModal()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(234, 234, 234);border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-top: 0px;color: rgb(86, 86, 86);"><div><div >Close</div></div></button>
                    </div>
                  </div>
              </div>
          </div>
      </div>
      <div id="tabular-form-display-data-modal" class="uk-flex-top" uk-modal style="transition: 0.5s linear">
          <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="font-family:Nunito;min-width:70%;width:auto;font-size: 0.65rem;padding: 35px;border-radius: 3px;">
              <button class="uk-modal-close-default" type="button" uk-close></button>

              <div v-show="!isFormTemplateRendered" style="display:flex;align-items:center;justify-content:center"> Form is loading.. </div>
              <div v-show="isFormTemplateRendered" class="tabular-form-container">

                  <div class="ndropzone_row ndraggable_row">
                    <div class="ndropzone" style="border-bottom: 1px solid rgb(212, 212, 212);border-radius: 0px;align-items: center;justify-content: center;display: flex;margin: 0px;padding-bottom: 10px;">
                      <div class="ndraggable field text-input-element form-element" style="position:relative;">
                        <div style="width:fit-content;">
                          <div class="label field-label textinput-label" style="font-size: .75rem;font-weight: bold !important;">
                              <span>{{attachmentFormTemplateNameToBeEdited}} - {{taskSNO}}</span>
                              <span style="font-size: 0.55rem;font-weight: normal !important;padding-left: 20px;" v-if="currentFormToBeSubmitted.formStatus!=='Submitted' && currentFormToBeSubmitted.assigneeInfo!=='any' && currentFormToBeSubmitted.assigneeInfo!==undefined && currentFormToBeSubmitted.assigneeInfo!==null">Assigned to : {{currentFormToBeSubmitted.assigneeInfo.split("#")[1]}}</span>
                              <span style="font-size: 0.55rem;font-weight: normal !important;padding-left: 20px;" v-if="currentFormToBeSubmitted.formStatus==='Submitted' && currentFormToBeSubmitted.submitterInfo!==undefined && currentFormToBeSubmitted.submitterInfo!==null">Submitted by : {{currentFormToBeSubmitted.submitterInfo.split("#")[1]}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="edit_tabular_form_template_container" style="display: flex;flex-direction: column;width: 100%;">
                      <!-- Here is where the form-template will be rendered -->
                      <div id="tableDataPreview" style="transition:0.5s linear">
                          <div style="display: flex;column-gap: 10px;background-color: whitesmoke;text-transform: none;font-weight: bold;letter-spacing: 1px;">
                              <template v-for="item in tableColumnsArray">
                                  <div v-if="item.type==='integer' || item.type==='float' || item.type==='date' || item.type==='datetime-local'" v-bind:style="'text-align: right;min-width:' + item.minWidth + ';padding: 5px;'">{{item.label}}</div>
                                  <div v-else v-bind:style="'min-width:' + item.minWidth + ';padding: 5px;'">{{item.label}}</div>
                              </template>
                          </div>
                          <template v-for="row in rowsArray">
                            <div v-bind:data-row-key="row.key" class="table_row" style="display:flex;column-gap:10px;">
                                <template v-for="item in row.columnData">
                                    <div v-if="item.type==='integer' || item.type==='float'" v-bind:style="'text-align: right;width:' + item.minWidth + ';padding: 10px  5px;'">
                                        {{item.value}}
                                    </div>
                                    <div v-else-if="item.type==='datetime-local'" v-bind:style="'text-align: right;width:' + item.minWidth + ';padding: 10px  5px;'">
                                        {{item.parsedDateTime}}
                                    </div>
                                    <div v-else-if="item.type==='date'" v-bind:style="'text-align: right;width:' + item.minWidth + ';padding: 10px  5px;'">
                                        {{item.parsedDate}}
                                    </div>
                                    <div v-else v-bind:style="'text-align: left;width:' + item.minWidth + ';padding: 10px 5px;'">
                                        {{item.value}}
                                    </div>
                                </template>
                            </div>
                          </template>
                      </div>

                  </div>
                  <!-- <div class="mini-btn" id="clearRowButton"  v-on:click="clearRows()" style="margin-top: 25px;user-select: none;display: flex;align-items: center;">Clear Rows</div> -->

                  <div class="ndropzone_row ndraggable_row" style="margin-top:10px;align-items: start;justify-content: start;">
                    <div class="ndropzone ndraggable field text-input-element form-element"  style="display: flex!important;place-self:end;column-gap:20px;padding-right: 15px;">
                        <!-- <button tabindex="10" id="tabularFormSubmitButton" v-on:click="submitTabularFormAttachment()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(76, 175, 80);border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;">Submit</button> -->
                        <button tabindex="11" id="discardTabularFormDataButton2" v-on:click="closeTabularFormDataRenderModal()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(234, 234, 234);border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-top: 0px;color: rgb(86, 86, 86);"><div><div >Close</div></div></button>
                    </div>
                  </div>
              </div>
          </div>
      </div>

      <div class="container form-pallete" style="display:none;flex-grow: 1;border-left: 1px solid rgb(226 226 226);padding-left: 10px;">
          <div class="ndraggable field text-input-element"  style="position:relative">
              <div style="width: fit-content;"><div class="label field-label textinput-label">Field Name</div></div>
              <div><input type="text" name="field1" class="textbox form-input-element"/></div>
          </div>
          <div class="ndraggable field number-input-element"  style="position:relative">
              <div style="width: fit-content;"><div class="label field-label textinput-label">Field Name</div></div>
              <div><input type="number" name="field1" class="textbox form-input-element" style="text-align:right"/></div>
          </div>
          <div class="ndraggable field table-input-element" style="position:relative;margin-top: 20px;margin-left:0px;">
              <div style="width: fit-content;"><div class="label field-label textarea-label" contenteditable="false" >Table</div></div>
              <div>
                <div class="table form-input-element" data-type="table" style="font-size: 0.55rem;border: 0px solid #e0e0e0;">
                  <div class="table-header" style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr;justify-items: center;column-gap: 10px;background-color: #e0e0e0;text-transform: none;font-weight: bold;letter-spacing: 1px;">
                    <div>Col 1</div>
                    <div>Col 2</div>
                    <div>Col 3</div>
                  </div>
                  <div class="table-body">
                    <div class="table-sample-row" style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr;justify-items: center;border: 1px solid #e0e0e0;">
                      <div>data</div>
                      <div>data</div>
                      <div>data</div>
                      <div>data</div>
                      <div>data</div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          <div class="ndraggable field text-area-element"  style="position:relative">
              <div style="width: fit-content;"><div class="label field-label textarea-label">Field Name</div></div>
              <div><textarea name="field2" class="textarea form-input-element"></textarea></div>
          </div>
          <div class="ndraggable field date-input-element"  style="position:relative">
              <div style="width: fit-content;"><div class="label field-label date-label">Field Name</div></div>
              <div><input type="date" name="field3" class="textbox form-input-element"/></div>
          </div>
          <div class="ndraggable field  checkbox-input-element"  style="position:relative">
               <div style="width: fit-content;"><div class="label field-label checkbox-label">Field Name</div></div>
               <div style="display:flex;gap:10px;width:100%;padding:10px 10px 10px 10px;box-sizing:border-box;flex-wrap:wrap;border:1px solid #767676;background: white;border-radius: 2px;" class="form-input-element" data-checkbox-name="Checkbox "></div>
          </div>
          <div class="ndraggable field  radio-input-element"  style="position:relative">
               <div style="width: fit-content;"><div class="label field-label checkbox-label">Field Name</div></div>
               <div style="display:flex;gap:10px;width:100%;padding:10px 10px 10px 10px;box-sizing:border-box;flex-wrap:wrap;border:1px solid #767676;background: white;border-radius: 2px;" class="form-input-element" data-checkbox-name="Radio "></div>
          </div>
      </div>

    </div>
</template>

<script>

import userMixinLib from './../../mixins/lib/user_mixin_lib';
import utilsMixinLib from './../../mixins/lib/utils_lib';
import uiListMixinLib from './../../mixins/lib/ui-list.js';
import { bus } from './../../../main.js';

export default {
  mixins: [
    userMixinLib,
    utilsMixinLib,
    uiListMixinLib
  ],
  props: ['id', 'assignees', 'loggedInUser', 'taskSNO'],
  data: function () {
    return {
      isFormTemplateRendered: false,
      newFormTemplate: {
        assigneeInfo: 'any'
      },
      formTemplatesList: [],
      tabularFormTemplatesList: [],
      attachedForms: [],
      availableDependencySubtasks: [],
      currentlySelectedSubtaskForDependencyUpdate: null,
      attachmentIdToBeEdited: null,
      attachmentFormTemplateIdToBeEdited: null,
      attachmentFormTemplateNameToBeEdited: null,
      formTemplateObject: {},

      chosenFormDataMap: {},

      currentFormToBeSubmitted: {},

      columnNumber: 0,
      tableColumns: {},
      tableColumnsArray: [],
      tableColumnTypes: {},
      rowNumber: 0,
      tableRows: {},
      rowsArray: [],
      tabularFormDataObject: {},
      tabularFormDataArray: [],
      reportGeneratedOnForPDFPrinting: "",
      tabularFormsMap: {},
      tabularFormsSchemaMap: {},
      hybridFormTableDataArrayMap: {},
      hybridFormTableDataArrayFinalizedMap: {}
    };
  },
  methods: {

    loadTableInFormField (fieldInfo, dropzone) {

      const template = `<form autocomplete="off">
        <div style="display: flex;column-gap: 10px;background-color: whitesmoke;text-transform: none;font-weight: bold;letter-spacing: 1px;">
            <template v-for="item in tableColumnsArray">
                <div v-if="item.type==='number'" v-bind:style="'text-align: right;min-width:' + item.minWidth + ';padding: 5px;'">{{item.label}}</div>
                <div v-else v-bind:style="'min-width:' + item.minWidth + ';padding: 5px;'">{{item.label}}</div>
            </template>
        </div>
        <template v-for="row in rowsArray">
          <div v-bind:data-row-key="row.key" class="table_row" style="display:flex;column-gap:10px;">
              <template v-for="item in tableColumnsArray">
                  <div v-if="item.type==='text'" v-bind:style="'width:' + item.minWidth + ';padding: 5px;'">
                      <input v-on:input="populateTabularFormData($event)" data-type="text" v-bind:data-column-key="item.name" type="text" class="textbox form-input-element" v-bind:style="'outline: 0px;border: 0px;border-bottom: 1px solid black;width:' + item.minWidth" v-bind:id="'column_' + item.name" />
                  </div>
                  <div v-if="item.type==='date'" v-bind:style="'width:' + item.minWidth + ';padding: 5px;'">
                      <input v-on:input="populateTabularFormData($event)" data-type="date" v-bind:data-column-key="item.name" type="date" class="textbox form-input-element" v-bind:style="'outline: 0px;border: 0px;border-bottom: 1px solid black;width:' + item.minWidth" v-bind:id="'column_' + item.name" />
                  </div>
                  <div v-if="item.type==='datetime-local'" v-bind:style="'width:' + item.minWidth + ';padding: 5px;'">
                      <input v-on:input="populateTabularFormData($event)" data-type="datetime-local" v-bind:data-column-key="item.name" type="datetime-local" class="textbox form-input-element" v-bind:style="'outline: 0px;border: 0px;border-bottom: 1px solid black;width:' + item.minWidth" v-bind:id="'column_' + item.name" />
                  </div>
                  <div v-if="item.type==='integer'" v-bind:style="'width:' + item.minWidth + ';padding: 5px;'">
                      <input v-on:input="populateTabularFormData($event)" data-type="integer" min="0" v-bind:data-column-key="item.name" type="number" class="textbox form-input-element" v-bind:style="'outline: 0px;border: 0px;border-bottom: 1px solid black;text-align: right;width:' + item.minWidth" v-bind:id="'column_' + item.name" />
                  </div>
                  <div v-if="item.type==='float'" v-bind:style="'width:' + item.minWidth + ';padding: 5px;'">
                      <input v-on:input="populateTabularFormData($event)" data-type="float" min="0" v-bind:data-column-key="item.name" type="number" class="textbox form-input-element" v-bind:style="'outline: 0px;border: 0px;border-bottom: 1px solid black;text-align: right;width:' + item.minWidth" v-bind:id="'column_' + item.name" />
                  </div>
              </template>
          </div>
        </template>
      </form>`;




      const columnTemplate = `<div v-if="item.type==='number'" v-bind:style="'text-align: right;min-width:' + item.minWidth + ';padding: 5px;'">{{item.label}}</div>
                              <div v-else v-bind:style="'min-width:' + item.minWidth + ';padding: 5px;'">{{item.label}}</div>`;

      const columnInputTemplate = `<div v-bind:data-row-key="row.key" class="table_row" style="display:flex;column-gap:10px;">
              <template v-for="item in tableColumnsArray">
                  <div v-if="item.type==='text'" v-bind:style="'width:' + item.minWidth + ';padding: 5px;'">
                      <input v-on:input="populateTabularFormData($event)" data-type="text" v-bind:data-column-key="item.name" type="text" class="textbox form-input-element" v-bind:style="'outline: 0px;border: 0px;border-bottom: 1px solid black;width:' + item.minWidth" v-bind:id="'column_' + item.name" />
                  </div>
                  <div v-if="item.type==='date'" v-bind:style="'width:' + item.minWidth + ';padding: 5px;'">
                      <input v-on:input="populateTabularFormData($event)" data-type="date" v-bind:data-column-key="item.name" type="date" class="textbox form-input-element" v-bind:style="'outline: 0px;border: 0px;border-bottom: 1px solid black;width:' + item.minWidth" v-bind:id="'column_' + item.name" />
                  </div>
                  <div v-if="item.type==='datetime-local'" v-bind:style="'width:' + item.minWidth + ';padding: 5px;'">
                      <input v-on:input="populateTabularFormData($event)" data-type="datetime-local" v-bind:data-column-key="item.name" type="datetime-local" class="textbox form-input-element" v-bind:style="'outline: 0px;border: 0px;border-bottom: 1px solid black;width:' + item.minWidth" v-bind:id="'column_' + item.name" />
                  </div>
                  <div v-if="item.type==='integer'" v-bind:style="'width:' + item.minWidth + ';padding: 5px;'">
                      <input v-on:input="populateTabularFormData($event)" data-type="integer" min="0" v-bind:data-column-key="item.name" type="number" class="textbox form-input-element" v-bind:style="'outline: 0px;border: 0px;border-bottom: 1px solid black;text-align: right;width:' + item.minWidth" v-bind:id="'column_' + item.name" />
                  </div>
                  <div v-if="item.type==='float'" v-bind:style="'width:' + item.minWidth + ';padding: 5px;'">
                      <input v-on:input="populateTabularFormData($event)" data-type="float" min="0" v-bind:data-column-key="item.name" type="number" class="textbox form-input-element" v-bind:style="'outline: 0px;border: 0px;border-bottom: 1px solid black;text-align: right;width:' + item.minWidth" v-bind:id="'column_' + item.name" />
                  </div>
              </template>
          </div>`;

      const tableId = fieldInfo.tableId;
      const fieldKey = fieldInfo.name;
      const get_url = './task-service/task-form-attachments/get-tabular-form/' + tableId;

      // Create this object to store tabular data for every table field.
      this.tabularFormsMap[fieldKey] = {};
      this.tabularFormsSchemaMap[fieldKey] = {};


      axios.get(process.env.VUE_APP_API_URL + get_url)
            .then((dataResponse) => {
              if (dataResponse.data.actionResult == 1) {


                const formTemplateObject = dataResponse.data.bean;
                // this.formTemplateObject = formTemplateObject;

                console.log('Tabular Form Template fetched is ', formTemplateObject);
                console.log("Table " + formTemplateObject.name + " will be injected into dropzone ", dropzone);


                let columnHeaderTemplateHTML = "";
                let columnInputTemplateHTML = "";
                const rowKey = "row_1";

                formTemplateObject.columns.forEach(columnMetadata => {

                    const columnKey = columnMetadata.name;
                    const columnType = columnMetadata.type;
                    const columnLabel = columnMetadata.label;
                    const columnMinWidth = columnMetadata.minWidth;

                    // Store the columnKey=columnType in the tabularFormsSchemaMap to be later used in the code.
                    (this.tabularFormsSchemaMap[fieldKey])[columnKey] = columnType;

                    // Construct each column header here.
                    if (columnType === "integer" || columnType === "bigdecimal" || columnType === "number" || columnType === "float") {
                        columnHeaderTemplateHTML += `<div style="text-align: right;min-width:${columnMinWidth};padding: 5px;">${columnLabel}</div>`;
                    }
                    else {
                      columnHeaderTemplateHTML += `<div style="min-width:${columnMinWidth};padding: 5px;">${columnLabel}</div>`;
                    }

                    // Construct each column input here for a single row.
                    if (columnType === "text") {

                        columnInputTemplateHTML += `<div style="width:${columnMinWidth};padding: 5px;">
                                                        <input data-type="text" data-column-key="${columnKey}" type="text" class="textbox form-input-element" style="outline: 0px;border: 0px;border-bottom: 1px solid black;width:${columnMinWidth}" id="column_${columnKey}" />
                                                    </div>`;
                    }
                    else if (columnType === "date") {

                        columnInputTemplateHTML += `<div style="width:${columnMinWidth};padding: 5px;">
                                                        <input data-type="date" data-column-key="${columnKey}" type="date" class="textbox form-input-element" style="outline: 0px;border: 0px;border-bottom: 1px solid black;width:${columnMinWidth}" id="column_${columnKey}" />
                                                    </div>`;
                    }
                    else if (columnType === "datetime-local") {

                        columnInputTemplateHTML += `<div style="width:${columnMinWidth};padding: 5px;">
                                                        <input data-type="datetime-local" data-column-key="${columnKey}" type="datetime-local" class="textbox form-input-element" style="outline: 0px;border: 0px;border-bottom: 1px solid black;width:${columnMinWidth}" id="column_${columnKey}" />
                                                    </div>`;
                    }
                    else if (columnType === "integer") {

                        columnInputTemplateHTML += `<div style="width:${columnMinWidth};padding: 5px;">
                                                        <input data-type="integer" min="0" data-column-key="${columnKey}" type="number" class="textbox form-input-element" style="outline: 0px;border: 0px;border-bottom: 1px solid black;text-align: right;width:${columnMinWidth}" id="column_${columnKey}" />
                                                    </div>`;
                    }
                    else if (columnType === "float") {

                        columnInputTemplateHTML += `<div style="width:${columnMinWidth};padding: 5px;">
                                                        <input data-type="float" min="0" data-column-key="${columnKey}" type="number" class="textbox form-input-element" style="outline: 0px;border: 0px;border-bottom: 1px solid black;text-align: right;width:${columnMinWidth}" id="column_${columnKey}" />
                                                    </div>`;
                    }

                });

                const tableFormHTML = `<form autocomplete="off" >
                  <div style="display: flex;column-gap: 10px;background-color: whitesmoke;text-transform: none;font-weight: bold;letter-spacing: 1px;">
                      ${columnHeaderTemplateHTML}
                  </div>
                  <div data-row-key="${rowKey}" class="table_row" style="display:flex;column-gap:10px;">
                      ${columnInputTemplateHTML}
                  </div>
                </form>
                <div class="mini-btn hide-during-print duplicate-row-button" style="margin-top: 25px;user-select: none;display: flex;align-items: center;max-width: 70px;margin-right: auto;margin-left: auto;">
                  <span uk-icon="icon:plus;ratio:0.55" class="uk-icon"></span>
                  <span style="margin-left:7px;">Add Row</span>
                </div>`;

                dropzone.querySelector(".table").innerHTML = tableFormHTML;
                // Add Input event listeners here..
                setTimeout(() => {
                  Array.from(dropzone.querySelectorAll(".form-input-element"))
                       .forEach(inputElement => {

                          inputElement.addEventListener('input', e => {
                              this.populateTabularFormDataForHybridForm(e, fieldKey, dropzone.querySelector(".table").getAttribute("data-table-id"));
                          });

                          inputElement.setAttribute("data-evt-listener-added", "true");
                       });

                       // Add event listener to duplicate row button
                       dropzone.querySelector(".duplicate-row-button")
                               .addEventListener('click', e => {
                                  this.addRowToTableInHybridForm(e, fieldKey, dropzone);
                               });
                }, 500);

                return false;

                // Reset the form's innerHTML before adding the currently selected record's fields.
                // const form = document.querySelector('#edit_tabular_form_template_container');
                // form.innerHTML = '';

                this.tableColumnsArray = this.formTemplateObject.columns;

                // Store the columnTypes metadata for later use while submitting the form data
                this.tableColumnsArray.forEach(col => {
                  this.tableColumnTypes[col.name] = col.type;
                });

                // Add minimum of 3 rows.
                // this.duplicateRow();
                // this.duplicateRow();
                // this.duplicateRow();

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

    async downloadEmptyFormAsPDF (divId, evt) {

      this.reportGeneratedOnForPDFPrinting = new Date().toLocaleString();

      const generateReportBtnLabel = evt.target.innerHTML;
      evt.target.innerHTML = "Generating pdf..";
      // alert(evt.target.innerHTML);

      Array.from(document.querySelectorAll(".hide-during-print"))
           .forEach(el => { el.style.visibility = "hidden"; });
      Array.from(document.querySelectorAll(".show-during-print"))
           .forEach(el => { el.style.visibility = null; });

        const fileName = this.attachmentFormTemplateNameToBeEdited + ".pdf";
        const opt = {
                  margin: 0.5,
                  filename: fileName,
                  image: { type: 'jpeg', quality: 0.98 },
                  html2canvas: { scale: 1 },
                  pagebreak: { mode: ['css'] },
                  jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
                };

        await html2pdf().set(opt).from(document.getElementById(divId)).save();
        Array.from(document.querySelectorAll(".hide-during-print"))
             .forEach(el => { el.style.visibility = null; });

        Array.from(document.querySelectorAll(".show-during-print"))
             .forEach(el => { el.style.visibility = "hidden"; });

        evt.target.innerHTML = generateReportBtnLabel;
    },
    populateTabularFormData (evt) {

      // new Date(this.taskObject.startDateTime).toISOString();

      const targetElement = evt.target;
      const columnKey = targetElement.getAttribute("data-column-key");
      const rowKey = targetElement.closest(".table_row").getAttribute("data-row-key");

      const doesRowExist = this.tabularFormDataObject[rowKey] !== undefined;

      if (doesRowExist) {

        const existingRow = this.tabularFormDataObject[rowKey];

        if (targetElement.getAttribute("data-type") === "integer") {
          existingRow[columnKey] = parseInt(targetElement.value);
        }
        else if (targetElement.getAttribute("data-type") === "float") {
          existingRow[columnKey] = parseFloat(targetElement.value);
        }
        else if (targetElement.getAttribute("data-type") === "date") {
          existingRow[columnKey] = new Date(targetElement.value).toISOString();
        }
        else if (targetElement.getAttribute("data-type") === "datetime-local") {
          existingRow[columnKey] = new Date(targetElement.value).toISOString();
        }
        else {
          existingRow[columnKey] = targetElement.value;
        }

      } else {

        const newColumn = {};

          if (targetElement.getAttribute("data-type") === "integer") {
            newColumn[columnKey] = parseInt(targetElement.value);
          }
          else if (targetElement.getAttribute("data-type") === "float") {
            newColumn[columnKey] = parseFloat(targetElement.value);
          }
          else if (targetElement.getAttribute("data-type") === "date") {
            newColumn[columnKey] = new Date(targetElement.value).toISOString();
          }
          else if (targetElement.getAttribute("data-type") === "datetime-local") {
            newColumn[columnKey] = new Date(targetElement.value).toISOString();
          }
          else {
            newColumn[columnKey] = targetElement.value;
          }

        this.tabularFormDataObject[rowKey] = newColumn;
      }

      // console.log(this.tabularFormDataObject);
      this.convertTabularFormDataToArrayData();
    },
    convertTabularFormDataToArrayData () {

      this.tabularFormDataArray = [];
      const tabularFormDataObject = this.tabularFormDataObject;
      console.log("tabularFormDataObject ", this.tabularFormDataObject);

      for (var key in tabularFormDataObject) {
        if (tabularFormDataObject.hasOwnProperty(key)) {
          var val = tabularFormDataObject[key];
          this.tabularFormDataArray.push(val);
        }
      }

      console.log("tabularFormDataArray ", this.tabularFormDataArray);
    },
    populateTabularFormDataForHybridForm (evt, fieldKey, tableId) {

      // new Date(this.taskObject.startDateTime).toISOString();

      const targetElement = evt.target;
      const columnKey = targetElement.getAttribute("data-column-key");
      const rowKey = targetElement.closest(".table_row").getAttribute("data-row-key");

      const tabularFormDataObject = this.tabularFormsMap[fieldKey];



      const doesRowExist = tabularFormDataObject[rowKey] !== undefined;

      if (doesRowExist) {

        const existingRow = tabularFormDataObject[rowKey];

        if (targetElement.getAttribute("data-type") === "integer") {
          existingRow[columnKey] = parseInt(targetElement.value);
        }
        else if (targetElement.getAttribute("data-type") === "float") {
          existingRow[columnKey] = parseFloat(targetElement.value);
        }
        else if (targetElement.getAttribute("data-type") === "date") {
          existingRow[columnKey] = new Date(targetElement.value).toISOString();
        }
        else if (targetElement.getAttribute("data-type") === "datetime-local") {
          existingRow[columnKey] = new Date(targetElement.value).toISOString();
        }
        else {
          existingRow[columnKey] = targetElement.value;
        }

      } else {

        const newColumn = {};

          if (targetElement.getAttribute("data-type") === "integer") {
            newColumn[columnKey] = parseInt(targetElement.value);
          }
          else if (targetElement.getAttribute("data-type") === "float") {
            newColumn[columnKey] = parseFloat(targetElement.value);
          }
          else if (targetElement.getAttribute("data-type") === "date") {
            newColumn[columnKey] = new Date(targetElement.value).toISOString();
          }
          else if (targetElement.getAttribute("data-type") === "datetime-local") {
            newColumn[columnKey] = new Date(targetElement.value).toISOString();
          }
          else {
            newColumn[columnKey] = targetElement.value;
          }

        tabularFormDataObject[rowKey] = newColumn;
      }

      console.log("this.tabularFormsMap ", this.tabularFormsMap);
      this.convertTabularFormDataToArrayDataForHybridForm(tabularFormDataObject, fieldKey, tableId);
    },
    convertTabularFormDataToArrayDataForHybridForm (tabularFormDataObject, fieldKey, tableId) {

      this.hybridFormTableDataArrayMap[fieldKey] = [];
      // this.tabularFormDataArray = [];
      // const tabularFormDataObject = tabularFormDataObject;
      console.log("converting tabularFormDataObject ", tabularFormDataObject);

      for (var key in tabularFormDataObject) {
        if (tabularFormDataObject.hasOwnProperty(key)) {
          var val = tabularFormDataObject[key];
          this.hybridFormTableDataArrayMap[fieldKey].push(val);
        }
      }

      console.log("tabularFormDataArray ", this.hybridFormTableDataArrayMap[fieldKey]);
      const tabularFormSchemaMap = this.tabularFormsSchemaMap[fieldKey];

      const tableData = [];

      /*
          [
              [{name:"column_1", value="abc"},{name:"column_2", value="def"},{name:"column_3", value="11"},{..},{..}],
              [{},{},{},{},{}],
              [{},{},{},{},{}],
              [{},{},{},{},{}]
          ]

      */

      // console.log("tableColumnTypes : ", this.tableColumnTypes);
      // return false;

      let index = 0;
      this.hybridFormTableDataArrayMap[fieldKey].forEach(rowObject => {

        index = index + 1;

        const rowArray = [];

        for (var key in rowObject) {

          if (rowObject.hasOwnProperty(key)) {

            var columnValue = rowObject[key];
            console.log("columnValue ", columnValue, " rowObject : ", rowObject);

            const columnInfo = {
              name: key,
              value: columnValue,
              type: tabularFormSchemaMap[key] // "string" // this.tableColumnTypes[key]
            };

            columnInfo[key] = columnValue; // This field=value assignment is required for mongoDB querying and its important.

            rowArray.push(columnInfo);
          }
        }

        tableData.push(rowArray);

      });

      this.hybridFormTableDataArrayFinalizedMap[fieldKey] = {
        tableId: tableId,
        tableData: tableData
      };

    },
    clearRows () {
      this.tableColumnsArray = [];
      this.rowsArray = [];
      this.rowNumber = 0;
      this.columnNumber = 0;
      this.tableRows = {};
      return false;
    },
    duplicateRow () {



      this.rowNumber = ++this.rowNumber;
      const rowNumber = this.rowNumber;
      const rowId = "row_" + rowNumber;
      this.tableRows[rowId] = {
        key: rowId
      };

      this.rowsArray = [];
      const tableRowsObj = this.tableRows;

      for (var key in tableRowsObj) {
        if (tableRowsObj.hasOwnProperty(key)) {
          var val = tableRowsObj[key];
          this.rowsArray.push(val);
        }
      }
    },
    addRowToTableInHybridForm (evt, fieldKey, dropzone) {

      const existingNumberOfTableRows = evt.target.closest(".table").querySelectorAll(".table_row").length;

      const rowToBeAddedToTableDiv = evt.target.closest(".table").querySelector(".table_row");
      const firstChild = rowToBeAddedToTableDiv;

      const duplicateRow = document.createElement('div');
            duplicateRow.innerHTML = firstChild.outerHTML;

            rowToBeAddedToTableDiv.parentElement.appendChild(duplicateRow);

            // Change the row-key number for the newly added row.
            duplicateRow.children[0].setAttribute("data-row-key", `row_${existingNumberOfTableRows + 1}`);

      setTimeout(() => {
          Array.from(dropzone.querySelectorAll(".form-input-element"))
               .forEach(inputElement => {

                    if (inputElement.getAttribute("data-evt-listener-added") === null || inputElement.getAttribute("data-evt-listener-added") === undefined) {

                      inputElement.addEventListener('input', e => {
                          this.populateTabularFormDataForHybridForm(e, fieldKey, dropzone.querySelector(".table").getAttribute("data-table-id"));
                      });

                      inputElement.setAttribute("data-evt-listener-added", "true");
                    }
               });
      }, 500);
    },
    submitFormAttachment () {
      // btnId = formSubmitButton

      const fields = [];

      document.querySelectorAll('#edit_form_template_container .form-input-element')
        .forEach((field, fieldIndex) => {

          // Ignore inputs from table oriented fields.
          if (field.closest(".table") === undefined || field.closest(".table") === null) {

            const fieldInfo = {};
            fieldInfo.name = field.name || field.getAttribute('data-key'); // For inputs like textbox, the name attribute will be present. For inputs like checkbox where the options are many, we use a 'div' with attribute 'data-key' and 'data-type'
            fieldInfo.type = field.type || field.getAttribute('data-type');
            fieldInfo.value = field.value;

            if (field.getAttribute('data-type') === 'checkbox' || field.getAttribute('data-type') === 'radio') {
              const selectedCheckboxArrayValues = [];
              const selectedCheckboxArray = document.querySelectorAll('input[name="' + fieldInfo.name + '"]:checked');
              selectedCheckboxArray.forEach(selected => selectedCheckboxArrayValues.push(selected.value));
              fieldInfo.value = selectedCheckboxArrayValues.join(',');
            }

            fields.push(fieldInfo);
          }

        });

      const post_url = './task-service/task-form-attachments-data/save';
      console.log('Saving new form-template-data to : ' + post_url);


      const form = {
        id: 'new', // Since we only allow the form to be submitted once and not update data, we comment the below line and use only 'new' instead.
        // id: (this.chosenFormDataMap.id !== undefined && this.chosenFormDataMap.id !== null) ? this.chosenFormDataMap.id : 'new',
        taskId: this.id, // TaskID provided from the props by the enclosing parent component.
        taskFormAttachmentId: this.attachmentIdToBeEdited,
        taskFormTemplateId: this.attachmentFormTemplateIdToBeEdited,
        taskFormTemplateName: this.attachmentFormTemplateNameToBeEdited,
        fields: fields,
        tabularFieldsDataMap: this.tabularFormsMap,
        clientTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };


      const tabularFormsMap = this.hybridFormTableDataArrayFinalizedMap;
      for (var key in tabularFormsMap) {
        if (tabularFormsMap.hasOwnProperty(key)) {
          var val = tabularFormsMap[key];
          console.log(val);

          form.fields.push({
            name: key,
            type: "table",
            tableId: val.tableId,
            tableData: val.tableData
          });
        }
      }

      console.log("Form Data: ", form);
      // return false;

      const btnText = document.getElementById('formSubmitButton').innerHTML;
      document.getElementById('formSubmitButton').innerHTML = (form.id === 'new') ? 'Saving..' : 'Updating..';
      this.disableHTMLElement(document.getElementById('formSubmitButton'));

      console.log('Data to be submitted is ', form);

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {
          console.log('FormTemplate attachment result : ', dataResponse);

          document.getElementById('formSubmitButton').innerHTML = btnText;
          this.enableHTMLElement(document.getElementById('formSubmitButton'));

          if (dataResponse.data.actionResult === 1) {
            this.newTenantUserInfo = dataResponse.data.bean;

            const resultMessage = (form.id === 'new') ? 'Form data saved successfully' : 'Form data updated successfully';
            UIkit.notification(`<div class="taskone-notification">
                                              <span uk-icon="icon: check;ratio:1"></span>
                                              <div> ${resultMessage} </div>
                                          </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 5000
            });

            document.getElementById('attachFormTemplateButton').innerHTML = btnText;
            this.enableHTMLElement(document.getElementById('attachFormTemplateButton'));
            document.getElementById('formSubmitButton').style.display = "none";

            this.closeFormTemplateAttachmentModal();
            this.fetchFormTemplatesAttachedToTask();
            // this.$emit("refreshList",{});
          } else if (dataResponse.data.actionResult === 0 && dataResponse.data.message !== null) {
            const errorMsg = (dataResponse.data).message;
            UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + errorMsg, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });

            document.getElementById('attachFormTemplateButton').innerHTML = btnText;
            this.enableHTMLElement(document.getElementById('attachFormTemplateButton'));
            return false;
          } else if (dataResponse.data.actionResult === 0 && dataResponse.data.exception !== null) {
            const errorMsg = (dataResponse.data).exception;
            UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + errorMsg, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });

            document.getElementById('attachFormTemplateButton').innerHTML = btnText;
            this.enableHTMLElement(document.getElementById('attachFormTemplateButton'));
            return false;
          }
        })
        .catch(function (errorResponse) {
          // https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
          console.log('ERROR MS - ', errorResponse.response);
          const exceptionMsg = errorResponse.response.data.exception;

          UIkit.notification("<span uk-icon='icon: warning ;ratio: 0.75'></span> " + exceptionMsg + '.', {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 5000
          });

          document.getElementById('attachFormTemplateButton').innerHTML = btnText;
          this.enableHTMLElement(document.getElementById('attachFormTemplateButton'));
          return false;
        });
    },
    submitTabularFormAttachment () {
      // btnId = tabularFormSubmitButton

      const post_url = './task-service/task-tabular-form-attachments-data/save';
      console.log('Saving new form-template-data to : ' + post_url);

      const tableData = [];

      /*
          [
              [{name:"column_1", value="abc"},{name:"column_2", value="def"},{name:"column_3", value="11"},{..},{..}],
              [{},{},{},{},{}],
              [{},{},{},{},{}],
              [{},{},{},{},{}]
          ]

      */

      // console.log("tableColumnTypes : ", this.tableColumnTypes);
      // return false;

      let index = 0;
      this.tabularFormDataArray.forEach(rowObject => {

        index = index + 1;

        const rowArray = [];

        for (var key in rowObject) {

          if (rowObject.hasOwnProperty(key)) {

            var columnValue = rowObject[key];
            console.log("columnValue ", columnValue, " rowObject : ", rowObject);

            const columnInfo = {
              name: key,
              value: columnValue,
              type: this.tableColumnTypes[key]
            };

            columnInfo[key] = columnValue; // This field=value assignment is required for mongoDB querying and its important.

            rowArray.push(columnInfo);
          }
        }

        tableData.push(rowArray);

      });

      const form = {
        id: (this.chosenFormDataMap.id !== undefined && this.chosenFormDataMap.id !== null) ? this.chosenFormDataMap.id : 'new',
        taskId: this.id, // TaskID provided from the props by the enclosing parent component.
        taskFormAttachmentId: this.attachmentIdToBeEdited,
        taskTabularFormTemplateId: this.attachmentFormTemplateIdToBeEdited,
        taskFormTemplateName: this.attachmentFormTemplateNameToBeEdited,
        tableData: tableData,
        clientTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };

      const btnText = document.getElementById('tabularFormSubmitButton').innerHTML;
      document.getElementById('tabularFormSubmitButton').innerHTML = (form.id === 'new') ? 'Saving..' : 'Updating..';
      this.disableHTMLElement(document.getElementById('tabularFormSubmitButton'));

      console.log('Data to be submitted is ', form);
      // return false;

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {
          console.log('FormTemplate attachment result : ', dataResponse);

          document.getElementById('tabularFormSubmitButton').innerHTML = btnText;
          this.enableHTMLElement(document.getElementById('tabularFormSubmitButton'));

          if (dataResponse.data.actionResult === 1) {
            this.newTenantUserInfo = dataResponse.data.bean;

            const resultMessage = (form.id === 'new') ? 'Tabular Form data saved successfully' : 'Tabular Form data updated successfully';
            UIkit.notification(`<div class="taskone-notification">
                                              <span uk-icon="icon: check;ratio:1"></span>
                                              <div> ${resultMessage} </div>
                                          </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 5000
            });


            document.getElementById('tabularFormSubmitButton').style.display = "none";
            this.closeFormTemplateAttachmentModal();
            this.fetchFormTemplatesAttachedToTask();

            // this.$emit("refreshList",{});
          } else if (dataResponse.data.actionResult === 0 && dataResponse.data.message !== null) {
            const errorMsg = (dataResponse.data).message;
            UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + errorMsg, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });

            return false;
          } else if (dataResponse.data.actionResult === 0 && dataResponse.data.exception !== null) {
            const errorMsg = (dataResponse.data).exception;
            UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + errorMsg, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });

            return false;
          }
        })
        .catch(function (errorResponse) {
          // https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
          console.log('ERROR MS - ', errorResponse.response);
          const exceptionMsg = errorResponse.response.data.exception;

          UIkit.notification("<span uk-icon='icon: warning ;ratio: 0.75'></span> " + exceptionMsg + '.', {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 5000
          });

          document.getElementById('tabularFormSubmitButton').innerHTML = btnText;
          this.enableHTMLElement(document.getElementById('tabularFormSubmitButton'));
          return false;
        });
    },
    viewFormData (attachmentId, formTemplateId, attachedFormTemplateName, attachedFormTemplate) {
      // currentFormToBeSubmitted.assigneeInfo.split("#")[1]

      this.currentFormToBeSubmitted = attachedFormTemplate;


      /*
      Lock the form and don't allow it to be updated once submitted

      if (this.loggedInUser.userId !== this.currentFormToBeSubmitted.assigneeInfo.split('#')[0]) {
        document.getElementById('formSubmitButton').setAttribute('disabled', 'disabled');
      } else {
        document.getElementById('formSubmitButton').removeAttribute('disabled');
        document.getElementById('formSubmitButton').innerHTML = 'Update';
      }
      */
      document.getElementById('formSubmitButton').style.display = "none";

      console.log('Loading form-template-attachment.. ' + attachmentId + ' ' + formTemplateId);
      this.attachmentIdToBeEdited = attachmentId;
      this.attachmentFormTemplateIdToBeEdited = formTemplateId;
      this.attachmentFormTemplateNameToBeEdited = attachedFormTemplateName;
      UIkit.modal(document.querySelector('#form-template-render-container-modal')).show();
      // this.getFormTemplateMetadata(formTemplateId);

      // API http://localhost:9090/task-form-attachments-data/get-by-attachment/600649f64a576b43899d0001

      const get_url = './task-service/task-form-attachments-data/get-by-attachment/' + attachmentId;

      axios.get(process.env.VUE_APP_API_URL + get_url)
        .then((dataResponse) => {
          if (dataResponse.data.actionResult == 1) {
            const formDataMap = dataResponse.data.bean;
            this.chosenFormDataMap = formDataMap;

            console.log('Form Data fetched is ', this.chosenFormDataMap);

            let formHTML = "";
            this.chosenFormDataMap.rows.forEach(row => {

                const fieldsInRow = row.fields;

                let fieldsHTML = "";
                fieldsInRow.forEach(field => {

                   if (field.type !== "table") {
                       const fieldHTML = `<div style='display:flex;'>
                                              <div style="min-width:100px;text-align:right;padding:5px;font-weight:bold">${field.label}</div>
                                              <div style="min-width:100px;text-align:left;;padding:5px;padding-left:20px">${this.chosenFormDataMap[field.name].value}</div>
                                          </div>`;

                      fieldsHTML = fieldsHTML + fieldHTML;
                   }
                   else if (field.type === "table") {

                     // Step 1 - Construct the Table Header
                     let tableHeaderColumns = ``;
                     const tableSchemaKey = field.name + "TableSchema";
                     const tableSchemaData = this.chosenFormDataMap[tableSchemaKey];
                     const tableData = this.chosenFormDataMap[field.name];
                     const tableHeaderColumnsWidthMap = {};

                           tableSchemaData.forEach(columnHeader => {
                              tableHeaderColumns = tableHeaderColumns + `<div style='padding: 5px;min-width:${columnHeader.minWidth}'>${columnHeader.label}</div>`;
                              tableHeaderColumnsWidthMap[columnHeader.name] = columnHeader.minWidth;
                           });

                     const tableHeaderHTML = `<div class='table-header' style='background-color: #eeeeee;display: flex;padding: 5px;'>${tableHeaderColumns}</div>`;

                     // Step 2 - Construct the Table Data
                     let tableDataHTML = ``;

                          tableData.forEach(row => {

                              let columnString = ``;
                              row.forEach(col => {
                                  columnString = columnString + `<div style='min-width:${tableHeaderColumnsWidthMap[col.name]};padding: 5px;'>${col.value}</div>`;
                              });

                              const rowHTML = `<div style='display: flex;padding: 5px;'>${columnString}</div>`;

                              tableDataHTML = tableDataHTML + rowHTML;
                          });

                      let tableHTML = tableHeaderHTML + tableDataHTML;
                          tableHTML = `<div style='padding: 0px;'>${tableHTML}</div>`; //

                      const fieldHTML = `<div style='display:flex;'>
                                             <div style="min-width:100px;text-align:right;padding:5px;font-weight:bold">${field.label}</div>
                                             <div style="min-width:100px;text-align:left;;padding:5px;padding-left:20px">${tableHTML}</div>
                                         </div>`;

                      fieldsHTML = fieldsHTML + fieldHTML;
                   }

                });

                const rowHTML = `<div style='display:flex;padding:10px;'>${fieldsHTML}</div>`;
                formHTML = formHTML + rowHTML;




            });
            document.querySelector('#edit_form_template_container').innerHTML = formHTML;
            this.isFormTemplateRendered = true;
            return false;


            // Reset the form's innerHTML before adding the currently selected record's fields.
            const form = document.querySelector('#edit_form_template_container');
            // Render the values for the .form-input-elements here using the above Map.

            document.querySelectorAll('#edit_form_template_container .form-input-element')
              .forEach((field, fieldIndex) => {

                const fieldInfo = {};
                fieldInfo.name = field.name || field.getAttribute('data-key'); // For inputs like textbox, the name attribute will be present. For inputs like checkbox where the options are many, we use a 'div' with attribute 'data-key' and 'data-type'
                fieldInfo.type = field.type || field.getAttribute('data-type');
                fieldInfo.value = field.value;

                if (this.chosenFormDataMap[fieldInfo.name] !== null && this.chosenFormDataMap[fieldInfo.name] !== undefined) {
                    const fieldValueToBePopulated = this.chosenFormDataMap[fieldInfo.name].value;

                    if (fieldInfo.type === 'text' || fieldInfo.type === 'number' || fieldInfo.type === 'date' || fieldInfo.type === 'datetime-local') {
                      document.querySelector('#edit_form_template_container input[name="' + fieldInfo.name + '"]').value = fieldValueToBePopulated;
                    } else if (fieldInfo.type === 'textarea') {
                      document.querySelector('#edit_form_template_container textarea[name="' + fieldInfo.name + '"]').innerHTML = fieldValueToBePopulated;
                    } else if (fieldInfo.type === 'checkbox') {
                      // Handled in the below block since its structure is different.
                    }
                }

              });

            // Checkbox values handled here..
            Object.keys(this.chosenFormDataMap).forEach(key => {
              console.log(this.chosenFormDataMap[key]);
              if (this.chosenFormDataMap[key].hasOwnProperty('type') && ((this.chosenFormDataMap[key]).type === 'checkbox' || (this.chosenFormDataMap[key]).type === 'radio')) {
                const checkboxName = (this.chosenFormDataMap[key]).name;
                const checkboxValues = (this.chosenFormDataMap[key]).value;
                console.log(checkboxValues);

                if (checkboxValues) {
                  checkboxValues.split(',').forEach(checkboxVal => {
                    console.log('query is ' + 'input[value="' + checkboxVal + '"]');
                    if (document.querySelector('#edit_form_template_container input[value="' + checkboxVal + '"]') !== null) {
                      document.querySelector('#edit_form_template_container input[value="' + checkboxVal + '"]').checked = true;
                    }
                  });
                }

              }
            });
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
    viewTabularFormData (attachmentId, formTemplateId, attachedFormTemplateName, attachedFormTemplate) {
      // currentFormToBeSubmitted.assigneeInfo.split("#")[1]

      this.currentFormToBeSubmitted = attachedFormTemplate;

      /*
      Lock the form and don't allow it to be updated once submitted

      if (this.currentFormToBeSubmitted.assigneeInfo !== null && this.loggedInUser.userId !== this.currentFormToBeSubmitted.assigneeInfo.split('#')[0]) {
        document.getElementById('tabularFormSubmitButton').setAttribute('disabled', 'disabled');
      } else {
        document.getElementById('tabularFormSubmitButton').removeAttribute('disabled');
        document.getElementById('tabularFormSubmitButton').innerHTML = 'Update';
      }
      */
      document.getElementById('tabularFormSubmitButton').style.display = "none";

      console.log('Loading tabular-form-template-attachment.. ' + attachmentId + ' ' + formTemplateId);
      this.attachmentIdToBeEdited = attachmentId;
      this.attachmentFormTemplateIdToBeEdited = formTemplateId;
      this.attachmentFormTemplateNameToBeEdited = attachedFormTemplateName;
      UIkit.modal(document.querySelector('#tabular-form-display-data-modal')).show();
      // this.getTabularFormTemplateMetadata(formTemplateId);

      // API http://localhost:9090/task-form-attachments-data/get-by-attachment/600649f64a576b43899d0001

      const get_url = './task-service/task-tabular-form-attachments-data/get-by-attachment/' + attachmentId;

      axios.get(process.env.VUE_APP_API_URL + get_url)
        .then((dataResponse) => {
          if (dataResponse.data.actionResult == 1) {
            const formDataMap = dataResponse.data.bean;
            console.log('Tabular Form Data fetched is ', formDataMap);
            const tableData = formDataMap["tableData"];
            const tableDataForQuerying = formDataMap["tableDataForQuerying"];
            const columns = formDataMap["columns"];

            this.clearRows();
            this.tableColumnsArray = columns;

            const tableColumnObj = {};
            this.tableColumnsArray.forEach(columnMetadata => {
              tableColumnObj[columnMetadata["name"]] = columnMetadata;
            });


            if (tableDataForQuerying) {

                tableDataForQuerying.forEach((rowObject, idx) => {

                    this.rowNumber = ++this.rowNumber;
                    const rowNumber = this.rowNumber;
                    const rowId = "row_" + rowNumber;
                    const columnArray = [];

                    for (var key in rowObject) {

                        var columnValue = rowObject[key];
                        const columnMetadata = tableColumnObj[key];

                        const columnInfo = {
                          name: key,
                          value: columnValue,
                          type: columnMetadata["type"],
                          minWidth: columnMetadata["minWidth"]
                        };

                        if (columnInfo.type === "datetime-local") {
                          // columnInfo["parsedDate"] = columnInfo.value + " tbp";
                          // columnInfo["parsedDateTime"] = this.convertUTCDateFromServerToLocalDate(columnInfo.value);
                          columnInfo["parsedDateTime"] = dayjs(columnInfo.value + "Z").format('DD/MM/YYYY HH:mm');
                        }
                        else if (columnInfo.type === "date") {
                          // columnInfo["parsedDate"] = columnInfo.value + " tbp";
                          // columnInfo["parsedDate"] = this.convertUTCDateFromServerToLocalDate(columnInfo.value).split("T")[0];
                          columnInfo["parsedDate"] = dayjs(columnInfo.value + "Z").format('DD/MM/YYYY');
                        }

                        columnArray.push(columnInfo);
                    }

                    this.rowsArray.push({
                      key: rowId,
                      columnData: columnArray
                    });

                });
            }

            /*

              tableData.forEach((rowArray, idx) => {

                this.rowNumber = ++this.rowNumber;
                const rowNumber = this.rowNumber;
                const rowId = "row_" + rowNumber;
                // this.tableRows[rowId] = {
                //   key: rowId,
                //   columnData: rowArray
                // };

                rowArray.forEach(column => {

                    const columnMetadata = tableColumnObj[column["name"]];
                    column["type"] = columnMetadata["type"];
                    column["minWidth"] = columnMetadata["minWidth"];

                });

                this.rowsArray.push({
                  key: rowId,
                  columnData: rowArray
                });

              });

            */

            this.isFormTemplateRendered = true;
            console.log("Fetched Tabular data converted to rowsArray : ", this.rowsArray);

            return false;

            // Reset the form's innerHTML before adding the currently selected record's fields.
            const form = document.querySelector('#edit_form_template_container');
            // Render the values for the .form-input-elements here using the above Map.

            document.querySelectorAll('#edit_form_template_container .form-input-element')
              .forEach((field, fieldIndex) => {
                const fieldInfo = {};
                fieldInfo.name = field.name || field.getAttribute('data-key'); // For inputs like textbox, the name attribute will be present. For inputs like checkbox where the options are many, we use a 'div' with attribute 'data-key' and 'data-type'
                fieldInfo.type = field.type || field.getAttribute('data-type');
                fieldInfo.value = field.value;

                const fieldValueToBePopulated = this.chosenFormDataMap[fieldInfo.name].value;

                if (fieldInfo.type === 'text' || fieldInfo.type === 'date' || fieldInfo.type === 'datetime-local') {
                  document.querySelector('#edit_form_template_container input[name="' + fieldInfo.name + '"]').value = fieldValueToBePopulated;
                } else if (fieldInfo.type === 'textarea') {
                  document.querySelector('#edit_form_template_container textarea[name="' + fieldInfo.name + '"]').innerHTML = fieldValueToBePopulated;
                } else if (fieldInfo.type === 'checkbox') {
                  // Handled in the below block since its structure is different.
                }
              });

            // Checkbox values handled here..
            Object.keys(this.chosenFormDataMap).forEach(key => {
              console.log(this.chosenFormDataMap[key]);
              if (this.chosenFormDataMap[key].hasOwnProperty('type') && (this.chosenFormDataMap[key]).type === 'checkbox') {
                const checkboxName = (this.chosenFormDataMap[key]).name;
                const checkboxValues = (this.chosenFormDataMap[key]).value;
                console.log(checkboxValues);
                checkboxValues.split(',').forEach(checkboxVal => {
                  console.log('query is ' + 'input[value="' + checkboxVal + '"]');

                  if (document.querySelector('#edit_form_template_container input[value="' + checkboxVal + '"]') !== null) {
                    document.querySelector('#edit_form_template_container input[value="' + checkboxVal + '"]').checked = true;
                  }
                });
              }
            });
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
    viewForm (attachmentId, formTemplateId, attachedFormTemplateName, attachedFormTemplate, isTabularForm) {


      this.currentFormToBeSubmitted = attachedFormTemplate;
      console.log("currentTaskID = ", this.id);
      console.log("attachmentId = ", attachmentId);
      console.log("formTemplateId = ", formTemplateId);
      console.log("this.attachmentIdToBeEdited = ", this.attachmentIdToBeEdited);
      console.log('currentFormToBeSubmitted = ', this.currentFormToBeSubmitted);

      if (this.currentFormToBeSubmitted.assigneeInfo === 'any') {
        if (!isTabularForm) {
          document.getElementById('formSubmitButton').style.display = null;
          document.getElementById('formSubmitButton').removeAttribute('disabled');
          document.getElementById('formSubmitButton').innerHTML = 'Submit';
        }
        else if (isTabularForm) {
          document.getElementById('tabularFormSubmitButton').style.display = null;
          document.getElementById('tabularFormSubmitButton').removeAttribute('disabled');
          // document.getElementById('tabularFormSubmitButton').innerHTML = 'Update';
        }
      }
      else if (this.currentFormToBeSubmitted.assigneeInfo !== null &&
           this.loggedInUser.userId !== this.currentFormToBeSubmitted.assigneeInfo.split('#')[0]) {
        if (!isTabularForm) {
          document.getElementById('formSubmitButton').style.display = null;
          document.getElementById('formSubmitButton').setAttribute('disabled', 'disabled');
          document.getElementById('formSubmitButton').innerHTML = 'Submit';
        }
        else if (isTabularForm) {
          document.getElementById('tabularFormSubmitButton').style.display = null;
          document.getElementById('tabularFormSubmitButton').setAttribute('disabled', 'disabled');
          document.getElementById('tabularFormSubmitButton').innerHTML = 'Submit (No Permission)';
        }
      } else {

        if (!isTabularForm) {
          document.getElementById('formSubmitButton').style.display = null;
          document.getElementById('formSubmitButton').removeAttribute('disabled');
          document.getElementById('formSubmitButton').innerHTML = 'Submit';
        }
        else if (isTabularForm) {
          document.getElementById('tabularFormSubmitButton').style.display = null;
          document.getElementById('tabularFormSubmitButton').removeAttribute('disabled');
          // document.getElementById('tabularFormSubmitButton').innerHTML = 'Update';
        }
      }

      console.log('Loading form-template-attachment.. ' + attachmentId + ' ' + formTemplateId);
      this.attachmentIdToBeEdited = attachmentId;
      this.attachmentFormTemplateIdToBeEdited = formTemplateId;
      this.attachmentFormTemplateNameToBeEdited = attachedFormTemplateName;
      this.chosenFormDataMap = {};


      if (!isTabularForm) {
        UIkit.modal(document.querySelector('#form-template-render-container-modal')).show();
        this.getFormTemplateMetadata(formTemplateId);
      }
      else if (isTabularForm) {

        UIkit.modal(document.querySelector('#tabular-form-template-render-container-modal')).show();
        this.getTabularFormTemplateMetadata(formTemplateId);
      }

      // Render the form in modal here..
      setTimeout(() => {
      }, 5000);
    },
    closeFormAttachmentModal () {
      UIkit.modal(document.querySelector('#form-template-render-container-modal')).hide();
    },
    closeTabularFormAttachmentModal () {
      UIkit.modal(document.querySelector('#tabular-form-template-render-container-modal')).hide();
    },
    closeTabularFormDataRenderModal () {
      UIkit.modal(document.querySelector('#tabular-form-display-data-modal')).hide();
    },
    getFormTemplateMetadata (formTemplateId) {
      const get_url = './task-service/task-form-attachments/get-form/' + formTemplateId;

      axios.get(process.env.VUE_APP_API_URL + get_url)
        .then((dataResponse) => {
          if (dataResponse.data.actionResult == 1) {
            const formTemplateObject = dataResponse.data.bean;
            this.formTemplateObject = formTemplateObject;

            console.log('Form Template fetched is ', this.formTemplateObject);

            // Reset the form's innerHTML before adding the currently selected record's fields.
            const form = document.querySelector('#edit_form_template_container');
            form.innerHTML = '';

            this.name = this.formTemplateObject.name;
            const rows = this.formTemplateObject.rows;
            rows.forEach((row) => {
              this.addRowForExistingFormTemplate(row, row.fields.length, row.rowNumber);
            });

            this.isFormTemplateRendered = true;
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
    getTabularFormTemplateMetadata (formTemplateId) {

      const tablePreviewDiv = document.querySelector('#tablePreview');
            tablePreviewDiv.style.transform = "scale(0)";
      this.clearRows();

      const get_url = './task-service/task-form-attachments/get-tabular-form/' + formTemplateId;


      axios.get(process.env.VUE_APP_API_URL + get_url)
        .then((dataResponse) => {
          if (dataResponse.data.actionResult == 1) {


            const formTemplateObject = dataResponse.data.bean;
            this.formTemplateObject = formTemplateObject;

            console.log('Tabular Form Template fetched is ', this.formTemplateObject);

            // Reset the form's innerHTML before adding the currently selected record's fields.
            // const form = document.querySelector('#edit_tabular_form_template_container');
            // form.innerHTML = '';

            this.tableColumnsArray = this.formTemplateObject.columns;

            // Store the columnTypes metadata for later use while submitting the form data
            this.tableColumnsArray.forEach(col => {
              this.tableColumnTypes[col.name] = col.type;
            });

            // Add minimum of 3 rows.
            this.duplicateRow();
            this.duplicateRow();
            this.duplicateRow();

            this.name = this.formTemplateObject.name;
            this.isFormTemplateRendered = true;

            setTimeout(() => {
              tablePreviewDiv.style.transform = "scale(1)";
            }, 500);
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
    addRowForExistingFormTemplate (row, numberOfColumns, rowNumber) {
      // Skip row adding if there are no fields in it
      if (numberOfColumns === 0) { return false; }

      const form = document.querySelector('#edit_form_template_container');
      let formChildrenLength = form.children.length;

      let template = '';
      const rowDivElement = document.createElement('div');
        rowDivElement.classList.add('ndropzone_row');
        rowDivElement.classList.add('ndraggable_row');
        rowDivElement.setAttribute('id', `row_${rowNumber}`);
        rowDivElement.setAttribute('data-row', ++formChildrenLength);

      if (numberOfColumns === 1) {
        template = '<div class="ndropzone" data-column="1"></div>';
        rowDivElement.innerHTML = template;
      } else if (numberOfColumns === 2) {
        template = `<div class="ndropzone" data-column="1"></div>
                          <div class="ndropzone" data-column="2"></div>`;
        rowDivElement.innerHTML = template;
      } else if (numberOfColumns === 3) {
        template = `<div class="ndropzone" data-column="1"></div>
                          <div class="ndropzone" data-column="2"></div>
                          <div class="ndropzone" data-column="3"></div>`;
        rowDivElement.innerHTML = template;
      }

      form.appendChild(rowDivElement);
      this.renderFields(`row_${rowNumber}`, row);
    },
    renderFields (rowId, rowData) {
      const dropzones = document.getElementById(rowId).querySelectorAll('.ndropzone');
      console.log('Dropzones in row id : ', rowId, ' are ', dropzones);
      console.log('rowData = ', rowData);

      if (rowData.fields.length === 1) {
        this.cloneAndAppend(rowData.fields[0], dropzones[0]);
      } else if (rowData.fields.length === 2) {
        this.cloneAndAppend(rowData.fields[0], dropzones[0]);
        this.cloneAndAppend(rowData.fields[1], dropzones[1]);
      } else if (rowData.fields.length === 3) {
        this.cloneAndAppend(rowData.fields[0], dropzones[0]);
        this.cloneAndAppend(rowData.fields[1], dropzones[1]);
        this.cloneAndAppend(rowData.fields[2], dropzones[2]);
      }
    },
    cloneAndAppend (fieldInfo, dropzone) {
      const _this = this;

      console.log("cloneAndAppend : fieldInfo : ", fieldInfo);
      let elementSelector = null;
      const fieldType = fieldInfo.type;
      const fieldName = fieldInfo.name;
      const fieldLabel = fieldInfo.label;

      if (fieldType === 'text') {
        elementSelector = '.form-pallete .text-input-element';
      }
      else if (fieldType === 'number') {
        elementSelector = '.form-pallete .number-input-element';
      }
      else if (fieldType === 'textarea') {
        elementSelector = '.form-pallete .text-area-element';
      }
      else if (fieldType === 'date') {
        elementSelector = '.form-pallete .date-input-element';
      }
      else if (fieldType === 'datetime-local') {
        elementSelector = '.form-pallete .date-input-element';
      }
      else if (fieldType === 'checkbox') {
        elementSelector = '.form-pallete .checkbox-input-element';
      }
      else if (fieldType === 'radio') {
        elementSelector = '.form-pallete .radio-input-element';
      }
      else if (fieldType === "table") {
          elementSelector = ".form-pallete .table-input-element";
      }

      const fieldToBeCloned = document.querySelector(elementSelector);
      // console.log("Item type to be cloned is ", fieldType, fieldToBeCloned);
      var cln = fieldToBeCloned.cloneNode(true);
      cln.classList.add('form-element');

      const appendedItem = dropzone.appendChild(cln);
      console.log('Appended Item ', appendedItem);
      console.log("yo", fieldType, fieldName);

      // If FieldLabel is undefined or null, then we convert the field's name attribute to a Label Formatted String with spaces.
      // Convert underscores to spaces for Labels and also capitalize the first letter
      const fieldNameLabel = fieldName.split("_")
                                      .filter(labelWord => labelWord != "")
                                      .map((labelWord) => labelWord[0].toUpperCase() + '' + labelWord.substring(1, labelWord.length)).join(' ');

      // Find the newly added input element and alter its label and attributes to match the fieldInfo's information.
      const closestInputElement = appendedItem.querySelector('.form-input-element');
      const closestInputElementLabel = appendedItem.querySelector('.field-label');
      console.log('closestInputElement ', closestInputElement);
      closestInputElement.setAttribute('name', fieldName);
      closestInputElement.setAttribute('data-name', fieldNameLabel);

      if (fieldType === 'datetime-local') {
        closestInputElement.setAttribute('type', 'datetime-local');
      }

      if (fieldLabel === undefined || fieldLabel === null) { closestInputElementLabel.innerHTML = fieldNameLabel; } else { closestInputElementLabel.innerHTML = fieldLabel; }

      if (fieldType === 'checkbox' || fieldType === 'radio') {
        closestInputElement.setAttribute('data-key', fieldName); // since its multiple option element.
        closestInputElement.setAttribute('data-name', fieldLabel);
        closestInputElement.setAttribute('data-type', fieldType);
        closestInputElement.setAttribute('data-checkbox-name', fieldLabel);

        // First remove the existing default option checkboxes
        const existingDefaultOptions = closestInputElement.querySelectorAll('.checkbox-option');
        console.log('Existing default options are ', existingDefaultOptions);
        existingDefaultOptions.forEach((optionElement) => optionElement.parentElement.removeChild(optionElement));

        // Second, add the options based on this field's options metadata
        //

        const checkboxOptions = fieldInfo.options;

        // When a checkbox's option label is changed, then its corresponding input[type="checkbox"]'s value must be updated with the label

        const addCheckboxOptionLabelAsCheckboxValue = function (e) {
          console.log('Checkbox Option Label edited.');

          const checkboxOptionContainerElement = e.target.parentElement;

          if (checkboxOptionContainerElement.classList.contains('checkbox-option')) {
            const closestCheckboxOptionInputElement = checkboxOptionContainerElement.querySelector('.checkbox-option-element');
            const optionName = e.target.innerHTML.replace(/\s/g, '_').toLowerCase();
            closestCheckboxOptionInputElement.setAttribute('value', optionName);
          }
        };

        checkboxOptions.forEach((option) => {
          const parentElement = closestInputElement;
          const siblingElementToInsertBefore = closestInputElement.querySelector('.new-checkbox-option-button');
          console.log('siblingElement is ', siblingElementToInsertBefore);

          const newCheckboxOption = document.createElement('div');
          newCheckboxOption.setAttribute('class', 'checkbox-option');
          newCheckboxOption.setAttribute('data-option', 'Option');
          newCheckboxOption.setAttribute('style', 'display:flex');
          newCheckboxOption.innerHTML = `<div class="checkbox-option-label">${option.label}</div>
                                                       <input type="${fieldType}" name="${fieldName}" value="${option.value}" style="cursor:pointer" class="checkbox-option-element"/>`;

          parentElement.appendChild(newCheckboxOption);
          parentElement.insertBefore(newCheckboxOption, siblingElementToInsertBefore);
          console.log('New option is added to this ' + fieldType);
        });
      }
      else if (fieldType === "table") {

        console.log("Field type is table");
        closestInputElement.setAttribute("data-table-id", fieldInfo.tableId);
        this.loadTableInFormField(fieldInfo, dropzone);

      }
    },

    openFormTemplateAttachmentModalForModification (attachmentInfo, attachedFormTemplateId, attachedFormTemplateName) {
      this.attachmentIdToBeEdited = attachmentInfo.id;
      this.newFormTemplate.formTemplateInfo = attachedFormTemplateId + '#' + attachedFormTemplateName;
      this.newFormTemplate.assigneeInfo = attachmentInfo.assigneeInfo;
      UIkit.modal(document.querySelector('#form-template-attachment-modal')).show();
    },
    openFormTemplateAttachmentModal () {
      // Clear these fields before attaching a new form-template.
      this.attachmentIdToBeEdited = null;
      this.newFormTemplate.formTemplateInfo = null;
      this.newFormTemplate.assigneeInfo = 'any';
      this.attachmentFormTemplateIdToBeEdited = null;
      this.attachmentFormTemplateNameToBeEdited = null;

      UIkit.modal(document.querySelector('#form-template-attachment-modal')).show();
    },
    closeFormTemplateAttachmentModal () {
      UIkit.modal(document.querySelector('#form-template-attachment-modal')).hide();
      UIkit.modal(document.querySelector('#form-template-render-container-modal')).hide();
      UIkit.modal(document.querySelector('#tabular-form-template-render-container-modal')).hide();

    },
    attachFormToThisTask () {
      const btnText = document.getElementById('attachFormTemplateButton').innerHTML;
      document.getElementById('attachFormTemplateButton').innerHTML = 'Saving..';
      this.disableHTMLElement(document.getElementById('attachFormTemplateButton'));

      const post_url = './task-service/task-form-attachments/attach';
      console.log('Saving new form-template to : ' + post_url);

      const form = {
        id: (this.attachmentIdToBeEdited === undefined || this.attachmentIdToBeEdited === null) ? 'new' : this.attachmentIdToBeEdited,
        taskId: this.id, // TaskID provided from the props by the enclosing parent component.
        formTemplateName: this.newFormTemplate.formTemplateInfo.split('#')[2],
        assigneeInfo: this.newFormTemplate.assigneeInfo
      };

      // The below logic determines if the attached form is just a normal_form or a tabular_form.
      // While rendering the form for submission or viewing data,
      //       if formTemplateId is not null, then its a normal_form render
      //    or if tabularFormTemplateId is not null, then its a tabular_form render
      const formType = this.newFormTemplate.formTemplateInfo.startsWith("tabular_form") ? "tabular_form" : "form";
      if (formType === "tabular_form") {
        form["tabularFormTemplateId"] = this.newFormTemplate.formTemplateInfo.split('#')[1];
      } else {
        form["formTemplateId"] = this.newFormTemplate.formTemplateInfo.split('#')[1];
      }

      console.log("Form attached to task is ", form);

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {
          console.log('FormTemplate attachment result : ');
          console.log(dataResponse);

          if (dataResponse.data.actionResult === 1) {
            this.newTenantUserInfo = dataResponse.data.bean;

            UIkit.notification(`<div class="taskone-notification">
                                                <span uk-icon="icon: check;ratio:1"></span>
                                                <div> Form Template attached successfully. </div>
                                            </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 5000
            });

            document.getElementById('attachFormTemplateButton').innerHTML = btnText;
            this.enableHTMLElement(document.getElementById('attachFormTemplateButton'));

            this.closeFormTemplateAttachmentModal();
            this.fetchFormTemplatesAttachedToTask();
            // this.$emit("refreshList",{});
          } else if (dataResponse.data.actionResult === 0 && dataResponse.data.message !== null) {
            const errorMsg = (dataResponse.data).message;
            UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + errorMsg, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });

            document.getElementById('attachFormTemplateButton').innerHTML = btnText;
            this.enableHTMLElement(document.getElementById('attachFormTemplateButton'));
            return false;
          } else if (dataResponse.data.actionResult === 0 && dataResponse.data.exception !== null) {
            const errorMsg = (dataResponse.data).exception;
            UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + errorMsg, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });

            document.getElementById('attachFormTemplateButton').innerHTML = btnText;
            this.enableHTMLElement(document.getElementById('attachFormTemplateButton'));
            return false;
          }
        })
        .catch(function (errorResponse) {
          // https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
          console.log('ERROR MS - ', errorResponse.response);
          const exceptionMsg = errorResponse.response.data.exception;

          UIkit.notification("<span uk-icon='icon: warning ;ratio: 0.75'></span> " + exceptionMsg + '.', {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 5000
          });

          document.getElementById('attachFormTemplateButton').innerHTML = btnText;
          this.enableHTMLElement(document.getElementById('attachFormTemplateButton'));
          return false;
        });
    },
    loadSubtasks () {
      try {
        const url = './task-service/tasks/list/all-attachedFormTemplates/' + this.id; // Fetch all attachedFormTemplates
        // console.log("loading attachedFormTemplates : " + url);
        this.getUnpaginatedList('attachedFormTemplates', url); // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
      } catch (e) {
        alert(e);
      }
    },

    fetchAllFormTemplates () {
      const url = './task-service/task-form-attachments/list-all-forms/all';
      try {
        // VueJS ajax call-1
        axios.get(process.env.VUE_APP_API_URL + url)
          .then((dataResponse) => {
            console.log('Forms List: ', dataResponse);
            const list = dataResponse.data.bean;

            list.forEach((item) => {
              if (item.createdOn !== null) {
                item.createdOn = new Date(item.createdOn).toLocaleString()
                  .slice(0, 17)
                  .replace(',', '')
                  .replace('T', ' ');
              }

              item.hide = false;
              this.formTemplatesList.push(item);
            });
          })
          .catch((error) => {
            console.error('fetchNotifications Error : ', error);
          });
      } catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }
    },
    fetchAllTabularFormTemplates () {
      const url = './task-service/task-form-attachments/list-all-tabular-forms/all';
      try {
        // VueJS ajax call-1
        axios.get(process.env.VUE_APP_API_URL + url)
          .then((dataResponse) => {
            console.log('Tabular Forms List: ', dataResponse);
            const list = dataResponse.data.bean;

            list.forEach((item) => {
              if (item.createdOn !== null) {
                item.createdOn = new Date(item.createdOn).toLocaleString()
                  .slice(0, 17)
                  .replace(',', '')
                  .replace('T', ' ');
              }

              item.hide = false;
              this.tabularFormTemplatesList.push(item);
            });
          })
          .catch((error) => {
            console.error('fetchNotifications Error : ', error);
          });
      } catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }
    },
    fetchFormTemplatesAttachedToTask () {
      console.log('fetchFormTemplatesAttachedToTask called..');

      const url = './task-service/task-form-attachments/list-attached-forms/' + this.id;
      try {
        // VueJS ajax call-1
        axios.get(process.env.VUE_APP_API_URL + url)
          .then((dataResponse) => {
            this.attachedForms = [];
            console.log('FormTemplate Attachment List: ', dataResponse);
            const list = dataResponse.data.bean;

            list.forEach((item) => {
              if (item.createdOn !== null) {
                item.createdOn = new Date(item.createdOn).toLocaleString()
                  .slice(0, 17)
                  .replace(',', '')
                  .replace('T', ' ');
              }

              item.hide = false;
              this.attachedForms.push(item);
            });
          })
          .catch((error) => {
            console.error('FormTemplate Attachment Fetch Error : ', error);
          });
      } catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }
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

    this.fetchAllFormTemplates();
    this.fetchAllTabularFormTemplates();
    this.fetchFormTemplatesAttachedToTask();

    // this.loadSubtasks();
    console.log("Mounted task-info-form-tab.vue component for taskId = " + this.id);
    // this.$store.commit('increment');
    // this.storeCounter();
    // console.log('Accessing vuex store ', this.$store)
    // console.log('Store data accessed from home page : ' + this.$store.getters.count)
    // console.log('Done.........................')

    bus.on('refreshSubTasksList', (data) => {
      this.fetchFormTemplatesAttachedToTask();
    });
  },
  unmounted: function () {

    // Remove all modals as they get created everytime in the DOM when this component is mounted again and again.
    // This causes the same DOM element with the same ID to be created multiple times and causes data corruption.
    // Hence all modals mounted by a .vue component must be deleted from the DOM when the .vue component is unmounted.

    const modalIdsToBeDeletedFromDOM = ["#form-template-render-container-modal",
                                        "#tabular-form-template-render-container-modal",
                                        "#form-template-attachment-modal",
                                        "#tabular-form-display-data-modal"];

    modalIdsToBeDeletedFromDOM.forEach(modalId => {
        const modal = document.querySelector(modalId);
        if (modal !== null) {
          modal.parentElement.removeChild(modal);
        }
    });

  },
  watch: {
    // Since we are passing an asynced data as 'availableItems', it is necessary to watch this prop when it receives new data.
    id: function (newId, oldId) {
      console.log("id in attachedFormTemplates tab changed from " + oldId + " to " + newId);
      // this.loadSubtasks(); //();
      this.fetchFormTemplatesAttachedToTask();
    },
    'loggedInUser.userId' (newVal, oldVal) {
      console.log(this.loggedInUser.userId);
    },
    '$route.params.attachedFormTemplateId' (newSubTaskId, oldSubTaskId) {
      console.log('SubTask ID changed from ' + oldSubTaskId + ' to ' + newSubTaskId + ' in the forms/task/task-attachedFormTemplates-tab.vue component.');
    }
  }
};

</script>

<style>

  input{
      font-family: 'Nunito', sans-serif;
  }

  .task_details_container {
    display: grid;
    grid-template-rows: auto 1fr;
    overflow-y: hidden;
  }

  .task_details_container .task_title {
    font-size: 1.25rem;
    font-weight: bold;
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

  .attachedFormTemplate_row{
    position: relative;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50px;
    width:100%;
    box-sizing:border-box;
    -moz-column-gap: 20px;
    column-gap: 20px;
    border-bottom: 1px solid #f3f3f3;
    border-left: 5px solid transparent;
    background-color: rgb(255 255 255);
    font-size: 0.65rem;
  }

  .attachedFormTemplate_row:hover{
    border-left: 5px solid rgb(31 105 189);
  }

  .attachedFormTemplate_row>div{
    margin-bottom:0px;
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

  /* Form styles copied from edit-form-maker.vue */

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
        font-size: .56rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .form-container{
        background-color: #f7f7f7;
        padding: 1rem;
        border: 1px solid #e2e2e2;
        display: grid;
        height: auto;
        border-radius: 3px;
        min-height: 100px;
        place-items: start;
        place-self: stretch;
    }

    .tabular-form-container{
        background-color: #fff;
        padding: 1rem;
        border: 1px solid #e2e2e2;
        display: grid;
        height: auto;
        border-radius: 3px;
        min-height: 100px;
        place-items: center;
        place-self: stretch;
    }

    .container .ndraggable{
      margin: 10px;
      padding: 5px 10px 5px 40px;
      border-radius: 3px;
      box-sizing: border-box;
      display: flex;
    }

    .form-container .ndraggable{
      padding: 10px;
      box-sizing: border-box;
      display: flex;
    }

    .ndropzone_row{
      display: flex;
      position: relative;
      width: 100%;
      box-sizing: border-box;
    }

    .ndropzone{
        position: relative;
        margin: 0px 10px;
        border:0px dashed transparent;
        flex-grow:1;
        flex-basis: 50%;
        height: auto;
        min-height: 50px;
        justify-self: stretch;
        border-radius: 3px;
    }

    .dropzone-hovered{
      border:1px dashed black;
    }

    .textbox{
        height:35px;
        width: 100%;
        box-sizing: border-box;
    }

    .textarea{
        height:100px;
        width: 100%;
        box-sizing: border-box;
    }

    .field{
      display: grid !important;
      grid-template-rows: auto 1fr;
      place-content: stretch;
    }

    .label{
      cursor:text;
      color: gray;
      font-weight: 200 !important;
      padding:5px 0px;
      font-size: .56rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      user-select : none;
    }

    input:focus {
        outline: 0px solid red;
    }

    ::placeholder {
        color:#bfb8b8;
    }

    .developer-data{
      display: grid;
      grid-template-rows:1fr 1fr;

    }

    .output{
      width: 100%;
      height: 100%;
    }

    .output{
      width: 400px;
      height: 300px;
      border: 1px solid black;
      background-color: #f9ffa5;
      padding: 10px;
      overflow-y: scroll;
      overflow-x: scroll;
      margin: 10px;
      box-sizing: border-box;
      white-space: pre;
    }

    .form-container .drag-icon{
      display:none !important;
    }

    .form-pallete .remove-field-icon{
      display:none !important;
    }

    .form-container .remove-field-icon{
      display:block !important;
    }

    .form-pallete .edit-field-icon{
      display:none !important;
    }

    .form-container .edit-field-icon{
      display:block !important;
    }

    .form-pallete .add-checkbox-option-button{
      display:none !important;
    }

    .form-container .add-checkbox-option-button{
      display:flex !important;
    }

</style>
