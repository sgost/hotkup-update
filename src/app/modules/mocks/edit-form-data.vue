<style scoped>

</style>

<template>

    <div v-bind:data-form-container-id="finalAttachmentDataId" class="app_container" style="background-color: whitesmoke;;display: flex;box-sizing: border-box;width: 100%;">
      <div class="form-container" style="background-color:#fff" id="form-container-for-printing">

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
                </div>
              </div>
            </div>
          </div>
          <div class="edit_form_template_container" style="display: flex;flex-direction: column;width: 100%;">
              <!-- Here is where the form-template will be rendered -->
          </div>
          <div class="ndropzone_row ndraggable_row hide-during-print" style="margin-top:10px;align-items: start;justify-content: start;">
            <div class="ndropzone ndraggable field text-input-element form-element"  style="display: flex!important;place-self:end;column-gap:20px;padding-right: 15px;">
                <button tabindex="10" id="formSubmitButton" v-on:click="submitFormAttachment()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(76, 175, 80);border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;color: white;">Submit</button>
                <button tabindex="11" id="discardFormDataButton" v-on:click="cancelEdit()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(234, 234, 234);border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-top: 0px;color: rgb(86, 86, 86);"><div><div >Close</div></div></button>
            </div>
          </div>
      </div>

      <hr>

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
  props: ['attachmentDataId', 'activityId', 'attachmentId'],
  data: function () {
    return {
      attachmentDataIdViaURLParam: this.$route.params.attachmentDataId,
      finalAttachmentDataId: (this.attachmentDataId !== undefined && this.attachmentDataId !== null && this.attachmentDataId !== "") ? this.attachmentDataId : this.$route.params.attachmentDataId,
      resetTime: {
        time: new Date().getTime()
      },
      attachmentInfo: {},
      currentFormToBeSubmitted: {},


      chosenFormDataMap: {},
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

    cancelEdit () {
      this.$emit("cancelEditForm", {});
    },


    loadFormData () {

      const get_url = './task-service/task-form-attachments/get-form-data/' + this.finalAttachmentDataId;
      axios.get(get_url)
           .then((dataResponse) => {
              this.attachmentInfo = dataResponse.data.bean;
              this.currentFormToBeSubmitted = dataResponse.data.bean;

              const attachedFormTemplate = this.attachmentInfo;
              this.viewForm(attachedFormTemplate.id, attachedFormTemplate.templateId, attachedFormTemplate.templateName, attachedFormTemplate, false);

           });
    },
    viewForm (attachmentId, formTemplateId, attachedFormTemplateName, attachedFormTemplate, isTabularForm) {


      this.currentFormToBeSubmitted = attachedFormTemplate;
      console.log("currentTaskID = ", this.id);
      console.log("attachmentId = ", attachmentId);
      console.log("formTemplateId = ", formTemplateId);
      console.log("this.attachmentIdToBeEdited = ", attachmentId);
      console.log('currentFormToBeSubmitted = ', this.currentFormToBeSubmitted);

      console.log('Loading form-template-attachment.. ' + attachmentId + ' ' + formTemplateId);
      this.attachmentIdToBeEdited = attachmentId;
      this.attachmentFormTemplateIdToBeEdited = formTemplateId;
      this.attachmentFormTemplateNameToBeEdited = attachedFormTemplateName;
      this.chosenFormDataMap = {};


      if (!isTabularForm) {
        // UIkit.modal(document.querySelector('#form-template-render-container-modal')).show();
        this.getFormTemplateMetadata(formTemplateId);
      }
      else if (isTabularForm) {

        // UIkit.modal(document.querySelector('#tabular-form-template-render-container-modal')).show();
        this.getTabularFormTemplateMetadata(formTemplateId);
      }

      // Render the form in modal here..
      setTimeout(() => {
      }, 5000);
    },
    getFormTemplateMetadata (formTemplateId) {

      this.showTemplate = 'form-template-render-container-modal';
      // alert(formTemplateId);
      console.log('formTemplateId', formTemplateId);

      // Reset the form's innerHTML before adding the currently selected record's fields.
      const form = document.querySelector('[data-form-container-id="' + this.finalAttachmentDataId + '"]')
                           .querySelector('.edit_form_template_container');
      form.innerHTML = '';

      // this.name = this.formTemplateObject.name;
      // let rows = this.formTemplateObject.rows;

      const rows = this.attachmentInfo.rows;
      rows.forEach((row) => {
        this.addRowForExistingFormTemplate(row, row.fields.length, row.rowNumber);
      });

      this.isFormTemplateRendered = true;

    },
    addRowForExistingFormTemplate (row, numberOfColumns, rowNumber) {

      // Skip row adding if there are no fields in it
      if (numberOfColumns === 0) { return false; }

      // const form = document.querySelector('#edit_form_template_container');
      const form = document.querySelector('[data-form-container-id="' + this.finalAttachmentDataId + '"]')
                           .querySelector('.edit_form_template_container');

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

      const dropzones = document.querySelector('[data-form-container-id="' + this.finalAttachmentDataId + '"]')
                                .querySelector("#" + rowId)
                                .querySelectorAll('.ndropzone');

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

      const fieldToBeCloned = document.querySelector('[data-form-container-id="' + this.finalAttachmentDataId + '"]')
                                      .querySelector(elementSelector);
      // console.log("Item type to be cloned is ", fieldType, fieldToBeCloned);
      var cln = fieldToBeCloned.cloneNode(true);
      cln.classList.add('form-element');

      const appendedItem = dropzone.appendChild(cln);
      console.log('Appended Item ', appendedItem);

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

      // Added by Vignesh on May 25, 2022
      if (fieldType === 'text') {
        closestInputElement.value = (this.attachmentInfo[fieldName])["value"];
      }

      if (fieldType === 'textarea') {
        closestInputElement.value = (this.attachmentInfo[fieldName])["value"];
      }

      if (fieldType === 'datetime-local') {
        closestInputElement.setAttribute('type', 'datetime-local');
        closestInputElement.value = (this.attachmentInfo[fieldName])["value"];
      }

      if (fieldLabel === undefined || fieldLabel === null) {
        closestInputElementLabel.innerHTML = fieldNameLabel;
      }
      else {
        closestInputElementLabel.innerHTML = fieldLabel;
      }

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


        // The following 2 lines are added by Vignesh on May 25
        const checkboxSelectedValues = (this.attachmentInfo[fieldName])["value"];
        const checkboxSelectedValuesArray = checkboxSelectedValues.split(",");

        checkboxOptions.forEach((option) => {

          const parentElement = closestInputElement;
          const siblingElementToInsertBefore = closestInputElement.querySelector('.new-checkbox-option-button');
          console.log('siblingElement is ', siblingElementToInsertBefore);

          const newCheckboxOption = document.createElement('div');
          newCheckboxOption.setAttribute('class', 'checkbox-option');
          newCheckboxOption.setAttribute('data-option', 'Option');
          newCheckboxOption.setAttribute('style', 'display:flex');


          const isSelected = checkboxSelectedValuesArray.includes(option.value);

          if (isSelected) {
            newCheckboxOption.innerHTML = `<div class="checkbox-option-label">${option.label}</div>
                                           <input type="${fieldType}" name="${fieldName}" value="${option.value}" style="cursor:pointer" class="checkbox-option-element" checked/>`;
          }
          else {
            newCheckboxOption.innerHTML = `<div class="checkbox-option-label">${option.label}</div>
                                           <input type="${fieldType}" name="${fieldName}" value="${option.value}" style="cursor:pointer" class="checkbox-option-element"/>`;
          }

          parentElement.appendChild(newCheckboxOption);
          parentElement.insertBefore(newCheckboxOption, siblingElementToInsertBefore);
          console.log('New option is added to this ' + fieldType);
        });
      }
      else if (fieldType === "table") {
        closestInputElement.setAttribute("data-table-id", fieldInfo.tableId);
        this.loadTableInFormField(fieldInfo, dropzone);
      }
    },

    // Tabular Forms
    loadTableInFormField (fieldInfo, dropzone) {

      // alert("Loading table");
      console.log("fieldInfo ", fieldInfo);

      const numberOfRowsInTable = this.attachmentInfo[fieldInfo["name"]].length;
      console.log("This table contains " + numberOfRowsInTable + " rows");
      console.log("Table data is ", this.attachmentInfo[fieldInfo["name"]]);
      const tableData = this.attachmentInfo[fieldInfo["name"]];

      const template = `<form autocomplete="off">
        <div style="display: flex;column-gap: 10px;background-color: #dccfcf;text-transform: none;font-weight: bold;letter-spacing: 1px;">
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
      // const get_url = './task-tabular-form-templates/get/' + tableId;
      const get_url = './task-service/task-form-attachments/get-tabular-form/' + tableId;


      // Create this object to store tabular data for every table field.
      this.tabularFormsMap[fieldKey] = {};
      this.tabularFormsSchemaMap[fieldKey] = {};

      {

        let columnHeaderTemplateHTML = "";
        let columnInputTemplateHTML = "";

        // Construct the columns for a single row and store in variable 'columnInputTemplateHTML'
        const availableColumnsInTable = this.attachmentInfo[fieldInfo["name"] + "TableSchema"];
              availableColumnsInTable.forEach(columnMetadata => {

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


        // Construct the rows by injecting the above constructed 'columnInputTemplateHTML' based on the number of available table rows
        let rowsHTML = "";
        tableData.forEach((row, i) => {

            const currentRowKey = i + 1;
            const columnsForCurrentRow = `<div data-row-key="${currentRowKey}" class="table_row" style="display:flex;column-gap:10px;">
                                        ${columnInputTemplateHTML}
                                    </div>`;

            rowsHTML = rowsHTML + columnsForCurrentRow;

        });


        const tableFormHTML = `<form autocomplete="off" >
          <div style="display: flex;column-gap: 10px;background-color: #dccfcf;text-transform: none;font-weight: bold;letter-spacing: 1px;">
              ${columnHeaderTemplateHTML}
          </div>
          ${rowsHTML}
        </form>
        <div class="mini-btn hide-during-print duplicate-row-button" style="margin-top: 25px;user-select: none;display: flex;align-items: center;max-width: 70px;margin-right: auto;margin-left: auto;">
          <span uk-icon="icon:plus;ratio:0.55" class="uk-icon"></span>
          <span style="margin-left:7px;">Add Row</span>
        </div>`;

        dropzone.querySelector(".table").innerHTML = tableFormHTML;


        // After constructing the required table from the schema, now populate the table values.
        tableData.forEach((row, i) => {

            const currentRowKey = i + 1;

            const rowElement = document.querySelector('[data-form-container-id="' + this.finalAttachmentDataId + '"]')
                                       .querySelector('[data-row-key="' + currentRowKey + '"');
            // console.log("row :: ", row);

            row.forEach((column, i) => {
                // console.log("   column :: ", column.name, column.value);
                const currentColumnKey = "column_" + (i + 1);
                const correspondingColumnElement = rowElement.querySelector('[data-column-key="' + currentColumnKey + '"]');
                // console.log("   columnElement :: ", correspondingColumnElement);
                correspondingColumnElement.value = column.value;

                this.populateTabularFormDataForHybridFormForExistingData(correspondingColumnElement, currentColumnKey, currentRowKey, fieldKey, dropzone.querySelector(".table").getAttribute("data-table-id"));

            });


        });

        // Add Input event listeners here for editing purpose..
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

            // Commented and updated the next line by Vignesh on May 25, 2022
            // duplicateRow.children[0].setAttribute("data-row-key", `row_${existingNumberOfTableRows + 1}`);
            duplicateRow.children[0].setAttribute("data-row-key", `${existingNumberOfTableRows + 1}`);

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
    populateTabularFormDataForHybridFormForExistingData (targetElement, columnKey, rowKey, fieldKey, tableId) {

      // new Date(this.taskObject.startDateTime).toISOString();

      // const targetElement = evt.target;
      // const columnKey = targetElement.getAttribute("data-column-key");
      // const rowKey = targetElement.closest(".table_row").getAttribute("data-row-key");

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

    submitFormAttachment () {
      // btnId = formSubmitButton

      const fields = [];

      const formContainer = // document.querySelector('[data-activity-container-id="' + this.activityId + '"]')
                           document.querySelectorAll('.edit_form_template_container .form-input-element');

      // document.querySelectorAll('#edit_form_template_container')
      formContainer.forEach((field, fieldIndex) => {

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
        // id: this.finalAttachmentDataId, // Since we only allow the form to be submitted once and not update data, we comment the below line and use only 'new' instead.
        // id: (this.chosenFormDataMap.id !== undefined && this.chosenFormDataMap.id !== null) ? this.chosenFormDataMap.id : 'new',
        taskId: this.attachmentInfo.taskId, // TaskID provided from the props by the enclosing parent component.
        taskFormAttachmentId: this.attachmentId, // this.attachmentIdToBeEdited,
        taskFormTemplateId: this.attachmentInfo.templateId, // this.attachmentFormTemplateIdToBeEdited,
        taskFormTemplateName: this.attachmentInfo.templateName, // this.attachmentFormTemplateNameToBeEdited,
        fields: fields,
        tabularFieldsDataMap: this.tabularFormsMap,
        clientTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        isEditOperation: true,
        editedDataRecordId: this.finalAttachmentDataId
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
    }



  },
  created: function () {

  },
  mounted: function () {
    this.loadFormData();
  },
  watch: {

  }
};

</script>
