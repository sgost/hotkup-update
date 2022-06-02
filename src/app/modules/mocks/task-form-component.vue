<style scoped>

</style>

<template>

    <div v-if="attachmentInfo !== null" class="app_container" style="background-color: whitesmoke;;display: flex;flex-direction:column;box-sizing: border-box;width: 100%;">
      <!--
        finalAttachmentId=[{{finalAttachmentId}}]
        attachmentId = {{attachmentId}}
        <br>
        <br>
        <div>{{attachmentInfo.formStatus}}</div>
      -->
      <div v-if="attachmentInfo.formStatus === 'Submitted'"
          style="border-bottom: 0px solid #e4e4e4; display: flex; flex-direction: column; row-gap: 5px; padding: 10px; font-size: 0.75rem; letter-spacing: 0.05rem;margin-left: 25px;margin-right: 25px;">

          <!-- <div>Current Status -
              <span style="color:green;text-transform:uppercase">{{attachmentInfo.formStatus}}</span>
              <span v-if="currentFormView === 'view_form_data'" style="color:blue;margin-left:20px">(<a v-on:click="currentFormView = 'edit_form_data'">Edit Form</a>)</span>
              <span v-if="currentFormView === 'edit_form_data'" style="color:blue;margin-left:20px">(<a v-on:click="currentFormView = 'view_form_data'">Cancel Edit</a>)</span>
          </div> -->
          <!-- <div>Submitted by - {{attachmentInfo.submitterInfo.split("#")[1]}}</div>
          <div>Submitted on - {{attachmentInfo.formSubmissionDateFormatted}}</div> -->
          <!-- <div class="form_data_display_container" style="margin-top: 10px;padding: 5px;background: whitesmoke;"></div> -->
      </div>

      <div v-if="attachmentInfo.formStatus === 'Submitted'"
           v-bind:data-activity-container-id="activityId">

          <div v-if="currentFormView === 'view_form_data'">
                <view-form-data v-bind:attachmentDataId="attachmentDataRecordId"
                                v-bind:activityId="activityId"
                                v-bind:attachmentId= "attachmentInfo.id"
                                v-on:editForm="currentFormView = 'edit_form_data'"/>
          </div>
          <div v-else-if="currentFormView === 'edit_form_data'">
              <edit-form-data v-bind:attachmentDataId="attachmentDataRecordId"
                                v-bind:activityId="activityId"
                                v-bind:attachmentId= "attachmentInfo.id"
                                v-on:cancelEditForm="handleCancelEditForm()" />
          </div>
      </div>
      <div v-else  v-bind:data-activity-container-id="activityId">
            <div >
                <new-form v-bind:activityId="activityId"
                          v-bind:attachmentInfo="attachmentInfo"
                          v-bind:attachmentId="attachmentInfo.id"
                          v-bind:formTemplateId="attachmentInfo.formTemplateId"
                          v-bind:currentTaskStageId="taskInfo.status"
                          v-bind:attachmentStageId="attachmentInfo.stageId"
                          v-on:cancelEditForm="handleCancelEditForm()"/>
            </div>
            <div></div>
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
  props: ['attachmentId', 'activityId', 'attachmentDataRecordId', 'taskInfo'],
  data: function () {
    return {
      finalAttachmentId: this.attachmentId || this.$route.params.attachmentId,
      resetTime: {
        time: new Date().getTime()
      },
      attachmentInfo: {},
      currentFormView: "new_form"
    };
  },
  methods: {

    handleCancelEditForm () {
      this.currentFormView = "view_form_data";
    },
    getFormAttachment () {


      console.log('getFormAttachment called..');

      const url = './task-service/task-form-attachments/get-form-attachment/' + this.finalAttachmentId;
      try
      {
          axios.get(process.env.VUE_APP_API_URL + url)
               .then((dataResponse) => {
                  this.attachmentInfo = dataResponse.data;

                  // alert("yo : " + this.attachmentInfo.formTemplateId);
                  if (this.attachmentInfo.formStatus === "Submitted")
                  {
                    this.currentFormView = "view_form_data";
                  }

                  if (this.attachmentInfo.formSubmissionDate !== null && this.attachmentInfo.formSubmissionDate !== undefined) {
                    // The conversion below is giving wrong time on the display.
                    // this.attachmentInfo.formSubmissionDate = this.convertUTCDateFromServerToLocalDate(this.attachmentInfo.formSubmissionDate);
                    this.attachmentInfo.formSubmissionDateFormatted = dayjs(this.attachmentInfo.formSubmissionDate).format('DD/MM/YYYY HH:mm'); // ('DD/MM/YYYY HH:mm');
                  }

                  return false;


               })
               .catch((error) => {
                 console.error('FormTemplate Attachment Fetch Error : ', error);
               });
      }
      catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }
    }

  },
  created: function () {

  },
  mounted: function () {
    // alert(this.taskInfo.status + "," + this.attachmentInfo.stageId);
    this.getFormAttachment();
  },
  watch: {
    // 'taskInfo' (newVal, oldVal) {
    //
    //      console.log("watching.." + this.taskInfo.status + "," + this.attachmentInfo.stageId);
    //      this.getFormAttachment();
    // }
  }
};

</script>
