<template>
    <div class="active-border"></div>
    <div style="display:flex;align-items:center;justify-content:center;flex-direction: row;min-width: 50px;display:none">
         <!-- <div v-if="item.createdByName!=='Pawan Bhojanala'" style="letter-spacing: 1px;width: 25px;height: 25px;background-color: rgb(240, 240, 240);padding: 10px;font-weight: bold;color: rgb(51, 51, 51);border-radius: 50%;align-items: center;justify-content: center;display: flex;border: 1px solid #eaeaea;">
            {{(item.createdByName.split(" ")[0])[0]}}{{(item.createdByName.split(" ")[1])[0]}}
         </div>
         <img v-if="item.createdByName==='Pawan Bhojanala'" v-bind:data-img-id="item.createdById" class="uk-border-pill ui-navbar-profile-image"
         v-bind:src="'/api/us/profile/get/' + item.createdById"
         onerror="this.onerror=null;this.src='resources/images/male_default_pic.png';"
         width="25" height="25" alt="Border pill"
         style="border:1px solid rgb(220 220 220);xbackground: #ffeb3b;padding: 3px;margin-left: 0px;height: 45px;width: 45px;"> -->
         <img v-bind:data-img-id="item.createdById" class="uk-border-pill ui-navbar-profile-image"
         v-bind:src="'/api/us/profile/get/' + item.createdById"
         onerror="this.onerror=null;this.src='resources/images/male_default_pic.png';"
         width="25" height="25"
         style="border:1px solid rgb(220 220 220);xbackground: #ffeb3b;padding: 3px;margin-left: 0px;height: 45px;width: 45px;">
    </div>
    <div class="ui_grid_row list-detail" style=" display: grid;">
      <div class="list-item-row-1" style="display:flex;column-gap:5px">
        <div class="task-sno">
          <span v-if="appliedTaskFilter === 'sent' && item.statusCode !== undefined && item.statusCode === 'OVERDUE'" style="color:red">Task #{{item.sno}}</span>
          <span v-else>Task #{{item.sno}}</span>
        </div>
        <div style="display:flex;column-gap:0px;flex-grow: 1;">
          <!-- <span style="font-size: 0.6rem;color:gray">by</span> -->
          <span class="task-list-item-category-label" v-bind:uk-tooltip="item.categoryInfo.label">{{(item.categoryInfo.label.length > 20 ? item.categoryInfo.label.substring(0, 20) + ".." : item.categoryInfo.label)}} </span>
        </div>

        <!-- <div v-if="item.statusInfo !== null" style="display: flex;column-gap: 5px;margin-left: auto;font-size: 0.6rem;color: #5c5c5c;background: #fffad0;padding: 0px 10px;border-radius: 10px;">{{item.statusInfo.label}}</div> -->
        <div style="display:flex;column-gap:5px;margin-left:auto;display:none">
          <div style="display: flex;column-gap: 2px;color: #6f6f6f;"><img src="resources/images/attachments.svg" style="height:10px;width:15px"></div>
          <div v-bind:uk-tooltip="item.assigneeListString" style="display: flex;column-gap: 2px;color: #6f6f6f;"><img src="resources/images/assignee.svg" style="height:12px;width:15px"><sub>{{item.assigneeIds.length}}</sub></div>
          <div style="display: flex;column-gap: 2px;color: #6f6f6f;"><img src="resources/images/subtask.svg" style="height: 12px;width: 15px;color: #d6d6d6;filter: opacity(0.65);"><sub>{{item.subTaskIds.length}}</sub></div>
          <div style="display: flex;column-gap: 2px;color: #6f6f6f;"><img src="resources/images/priority.svg" style="height:12px;width:15px"></div>
        </div>
        <div class="list-item-menu">
          <span uk-icon="icon:more-vertical;ratio:0.55;"></span>
        </div>
      </div>
      <div class="list-item-row-2 task-name" style="place-items: flex-start flex-start;overflow-x: hidden;">
        <p style="margin: 0 0 0px 0;text-overflow: ellipsis;overflow-x: hidden;white-space: nowrap;">{{item.name}}</p>
      </div>
      <div class="list-item-row-3" style="place-items: end flex-start;overflow: hidden;">
        <div style="display: flex;column-gap: 5px;width: 100%;justify-content: space-between;">

          <div style="display:flex;column-gap:5px">
              <img v-bind:data-img-id="item.createdById" class="uk-border-pill ui-navbar-profile-image"
              v-bind:src="'/api/us/profile/get/' + item.createdById"
              onerror="this.onerror=null;this.src='resources/images/male_default_pic.png';"
              width="25" height="25"
              style="border: 1px solid rgb(220, 220, 220);padding: 0px;margin-left: 0px;height: 20px;width: 20px;">

              <div>
                <div class="task-created-date" style="font-size: 0.55rem;letter-spacing:0.75px;text-transform: none;color: rgb(152, 152, 152);" v-bind:title="'created ' + item.createdOnAgo + '..'">{{item.createdByName}}</div>
                <div class="task-created-date" style="display:none;font-size: 0.55rem;letter-spacing:0.75px;text-transform: none;color: rgb(152, 152, 152);" v-bind:title="'created ' + item.createdOnAgo + '..'">{{item.createdOnFormatted}}</div>
              </div>
          </div>

          <div style="display: flex;column-gap: 2px;">

              <span v-if="item.statusInfo !== null" style="display: flex;column-gap: 5px;font-size: 0.6rem;margin-left: 5px;color: rgb(135, 135, 135);border: 1px solid rgb(223, 223, 223);padding: 0px 10px;border-radius: 10px;"  v-bind:uk-tooltip="item.statusInfo.label">{{(item.statusInfo.label.length > 20 ? item.statusInfo.label.substring(0, 20) + ".." : item.statusInfo.label)}}</span>


              <div class="task-created-date" style="display:none;font-size: 0.55rem;letter-spacing:0.75px;text-transform: uppercase;color: rgb(152, 152, 152);" v-bind:title="'created ' + item.createdOnAgo + '..'">{{item.createdOnFormatted}}</div>


              <div style="display:none;" class="task-created-date" title="Due Date" v-if="item.dueDateTime!==null">{{item.dueDateTimeFormatted}}</div>
              <!-- <div class="task-created-date" style="overflow: hidden;max-width: 50%;text-transform: uppercase;white-space: pre;border: 1px solid rgb(239, 239, 239);padding: 2px 10px;background: #27ca27;color: white;border-radius: 20px;" v-if="item.statusInfo!==null && item.isRecent">{{item.statusInfo.label}}</div> -->

              <div class="task-created-date" style="display:none;overflow: hidden;max-width: 50%;text-transform: uppercase;white-space: pre;border: 1px solid rgb(239, 239, 239);padding: 2px 10px;border-radius: 20px;" title="Status" v-if="item.statusInfo!==null && !item.isRecent">{{item.statusInfo.label}}</div>

              <div v-if="item.priority!==null && item.dueDateTimeFormatted !==null && item.dueDateTimeFormatted !== undefined && !item.isRecent && item.priority === 'Critical'" class="task-created-date critical" style="display:flex;overflow: hidden;max-width: 50%;text-transform: none;white-space: pre;border: 0px solid rgb(239, 239, 239);padding: 2px 10px;border-radius: 20px;background-color: rgb(233 30 99 / 40%);color: white;" v-bind:title="item.priority + ' priority, with Due Date - ' + item.dueDateTimeFormatted">
                <svg width="24" height="24" viewBox="0 0 24 24" data-v-0de8d8fb="" style="width: 10px;height: 10px;"><g id="Time_log" data-name="Time log" transform="translate(-11081 2057)" data-v-0de8d8fb=""><g id="Group_1440" data-name="Group 1440" transform="translate(10790.593 -2543.509)" data-v-0de8d8fb=""><g id="Group_387" data-name="Group 387" transform="translate(292.408 489.509)" data-v-0de8d8fb=""><g id="Layer_1" data-name="Layer 1" data-v-0de8d8fb=""><g id="Group_386" data-name="Group 386" data-v-0de8d8fb=""><path id="Path_243" data-name="Path 243" d="M310.93,494.979a.412.412,0,0,0-.372-.237h-1.212a8.995,8.995,0,1,0-1.054,6.138.818.818,0,1,0-1.416-.819,7.37,7.37,0,1,1,.8-5.32h-1.2a.409.409,0,0,0-.314.672l2.046,2.455a.408.408,0,0,0,.628,0l2.046-2.455A.411.411,0,0,0,310.93,494.979Z" transform="translate(-291.498 -487.379)" fill="currentColor" data-v-0de8d8fb=""></path><path id="Path_244" data-name="Path 244" d="M297.921,488.728a.818.818,0,0,0-.819.819v4.963a1.431,1.431,0,0,0,.819,2.605,1.41,1.41,0,0,0,.6-.138l2.846,1.642a.818.818,0,1,0,.817-1.416l-2.848-1.645a1.428,1.428,0,0,0-.6-1.046v-4.965A.82.82,0,0,0,297.921,488.728Zm0,7.568a.613.613,0,1,1,.613-.614A.615.615,0,0,1,297.921,496.3Z" transform="translate(-288.92 -486.682)" fill="currentColor" data-v-0de8d8fb=""></path></g></g></g></g><rect id="Rectangle_1450" data-name="Rectangle 1450" width="24" height="24" transform="translate(11081 -2057)" fill="none" data-v-0de8d8fb=""></rect></g></svg>
              {{item.dueDateTimeFormatted}}</div>
              <div v-else-if="item.priority!==null && item.dueDateTimeFormatted !==null && item.dueDateTimeFormatted !== undefined && !item.isRecent && item.priority === 'High'" class="task-created-date" style="display:flex;overflow: hidden;max-width: 50%;text-transform: none;white-space: pre;border: 0px solid rgb(239, 239, 239);padding: 2px 10px;border-radius: 20px;background-color:orange;color: white" v-bind:title="item.priority + ' priority, with Due Date - ' + item.dueDateTimeFormatted">

                  <svg width="24" height="24" viewBox="0 0 24 24" data-v-0de8d8fb="" style="width: 10px;height: 10px;"><g id="Time_log" data-name="Time log" transform="translate(-11081 2057)" data-v-0de8d8fb=""><g id="Group_1440" data-name="Group 1440" transform="translate(10790.593 -2543.509)" data-v-0de8d8fb=""><g id="Group_387" data-name="Group 387" transform="translate(292.408 489.509)" data-v-0de8d8fb=""><g id="Layer_1" data-name="Layer 1" data-v-0de8d8fb=""><g id="Group_386" data-name="Group 386" data-v-0de8d8fb=""><path id="Path_243" data-name="Path 243" d="M310.93,494.979a.412.412,0,0,0-.372-.237h-1.212a8.995,8.995,0,1,0-1.054,6.138.818.818,0,1,0-1.416-.819,7.37,7.37,0,1,1,.8-5.32h-1.2a.409.409,0,0,0-.314.672l2.046,2.455a.408.408,0,0,0,.628,0l2.046-2.455A.411.411,0,0,0,310.93,494.979Z" transform="translate(-291.498 -487.379)" fill="currentColor" data-v-0de8d8fb=""></path><path id="Path_244" data-name="Path 244" d="M297.921,488.728a.818.818,0,0,0-.819.819v4.963a1.431,1.431,0,0,0,.819,2.605,1.41,1.41,0,0,0,.6-.138l2.846,1.642a.818.818,0,1,0,.817-1.416l-2.848-1.645a1.428,1.428,0,0,0-.6-1.046v-4.965A.82.82,0,0,0,297.921,488.728Zm0,7.568a.613.613,0,1,1,.613-.614A.615.615,0,0,1,297.921,496.3Z" transform="translate(-288.92 -486.682)" fill="currentColor" data-v-0de8d8fb=""></path></g></g></g></g><rect id="Rectangle_1450" data-name="Rectangle 1450" width="24" height="24" transform="translate(11081 -2057)" fill="none" data-v-0de8d8fb=""></rect></g></svg>
                  {{item.dueDateTimeFormatted}}</div>
              <div v-else-if="item.priority!==null && item.dueDateTimeFormatted !==null && item.dueDateTimeFormatted !== undefined && !item.isRecent && item.priority === 'Medium'" class="task-created-date" style="display:flex;overflow: hidden;max-width: 50%;text-transform: none;white-space: pre;border: 0px solid rgb(239, 239, 239);padding: 2px 10px;border-radius: 20px;background-color:skyblue;color: white" v-bind:title="item.priority + ' priority, with Due Date - ' + item.dueDateTimeFormatted">

                  <svg width="24" height="24" viewBox="0 0 24 24" data-v-0de8d8fb="" style="width: 10px;height: 10px;"><g id="Time_log" data-name="Time log" transform="translate(-11081 2057)" data-v-0de8d8fb=""><g id="Group_1440" data-name="Group 1440" transform="translate(10790.593 -2543.509)" data-v-0de8d8fb=""><g id="Group_387" data-name="Group 387" transform="translate(292.408 489.509)" data-v-0de8d8fb=""><g id="Layer_1" data-name="Layer 1" data-v-0de8d8fb=""><g id="Group_386" data-name="Group 386" data-v-0de8d8fb=""><path id="Path_243" data-name="Path 243" d="M310.93,494.979a.412.412,0,0,0-.372-.237h-1.212a8.995,8.995,0,1,0-1.054,6.138.818.818,0,1,0-1.416-.819,7.37,7.37,0,1,1,.8-5.32h-1.2a.409.409,0,0,0-.314.672l2.046,2.455a.408.408,0,0,0,.628,0l2.046-2.455A.411.411,0,0,0,310.93,494.979Z" transform="translate(-291.498 -487.379)" fill="currentColor" data-v-0de8d8fb=""></path><path id="Path_244" data-name="Path 244" d="M297.921,488.728a.818.818,0,0,0-.819.819v4.963a1.431,1.431,0,0,0,.819,2.605,1.41,1.41,0,0,0,.6-.138l2.846,1.642a.818.818,0,1,0,.817-1.416l-2.848-1.645a1.428,1.428,0,0,0-.6-1.046v-4.965A.82.82,0,0,0,297.921,488.728Zm0,7.568a.613.613,0,1,1,.613-.614A.615.615,0,0,1,297.921,496.3Z" transform="translate(-288.92 -486.682)" fill="currentColor" data-v-0de8d8fb=""></path></g></g></g></g><rect id="Rectangle_1450" data-name="Rectangle 1450" width="24" height="24" transform="translate(11081 -2057)" fill="none" data-v-0de8d8fb=""></rect></g></svg>
                  {{item.dueDateTimeFormatted}}</div>
              <div v-else-if="item.priority!==null && item.dueDateTimeFormatted !==null && item.dueDateTimeFormatted !== undefined && !item.isRecent && item.priority === 'Low'" class="task-created-date" style="display:flex;overflow: hidden;max-width: 50%;text-transform: none;white-space: pre;border: 0px solid rgb(239, 239, 239);padding: 2px 10px;border-radius: 20px;background-color:green;color: white" v-bind:title="item.priority + ' priority, with Due Date - ' + item.dueDateTimeFormatted">

                  <svg width="24" height="24" viewBox="0 0 24 24" data-v-0de8d8fb="" style="width: 10px;height: 10px;"><g id="Time_log" data-name="Time log" transform="translate(-11081 2057)" data-v-0de8d8fb=""><g id="Group_1440" data-name="Group 1440" transform="translate(10790.593 -2543.509)" data-v-0de8d8fb=""><g id="Group_387" data-name="Group 387" transform="translate(292.408 489.509)" data-v-0de8d8fb=""><g id="Layer_1" data-name="Layer 1" data-v-0de8d8fb=""><g id="Group_386" data-name="Group 386" data-v-0de8d8fb=""><path id="Path_243" data-name="Path 243" d="M310.93,494.979a.412.412,0,0,0-.372-.237h-1.212a8.995,8.995,0,1,0-1.054,6.138.818.818,0,1,0-1.416-.819,7.37,7.37,0,1,1,.8-5.32h-1.2a.409.409,0,0,0-.314.672l2.046,2.455a.408.408,0,0,0,.628,0l2.046-2.455A.411.411,0,0,0,310.93,494.979Z" transform="translate(-291.498 -487.379)" fill="currentColor" data-v-0de8d8fb=""></path><path id="Path_244" data-name="Path 244" d="M297.921,488.728a.818.818,0,0,0-.819.819v4.963a1.431,1.431,0,0,0,.819,2.605,1.41,1.41,0,0,0,.6-.138l2.846,1.642a.818.818,0,1,0,.817-1.416l-2.848-1.645a1.428,1.428,0,0,0-.6-1.046v-4.965A.82.82,0,0,0,297.921,488.728Zm0,7.568a.613.613,0,1,1,.613-.614A.615.615,0,0,1,297.921,496.3Z" transform="translate(-288.92 -486.682)" fill="currentColor" data-v-0de8d8fb=""></path></g></g></g></g><rect id="Rectangle_1450" data-name="Rectangle 1450" width="24" height="24" transform="translate(11081 -2057)" fill="none" data-v-0de8d8fb=""></rect></g></svg>
                  {{item.dueDateTimeFormatted}}</div>
              <div v-else-if="item.dueDateTimeFormatted !==null && item.dueDateTimeFormatted !== undefined " class="task-created-date" style="display:flex;overflow: hidden;max-width: 50%;text-transform: none;white-space: pre;border: 0px solid rgb(239, 239, 239);padding: 2px 10px;border-radius: 20px;background-color:#f0f0f0;color: #918e8e" v-bind:title="item.priority + ' priority, with Due Date - ' + item.dueDateTimeFormatted">
                <svg width="24" height="24" viewBox="0 0 24 24" data-v-0de8d8fb="" style="width: 10px;height: 10px;"><g id="Time_log" data-name="Time log" transform="translate(-11081 2057)" data-v-0de8d8fb=""><g id="Group_1440" data-name="Group 1440" transform="translate(10790.593 -2543.509)" data-v-0de8d8fb=""><g id="Group_387" data-name="Group 387" transform="translate(292.408 489.509)" data-v-0de8d8fb=""><g id="Layer_1" data-name="Layer 1" data-v-0de8d8fb=""><g id="Group_386" data-name="Group 386" data-v-0de8d8fb=""><path id="Path_243" data-name="Path 243" d="M310.93,494.979a.412.412,0,0,0-.372-.237h-1.212a8.995,8.995,0,1,0-1.054,6.138.818.818,0,1,0-1.416-.819,7.37,7.37,0,1,1,.8-5.32h-1.2a.409.409,0,0,0-.314.672l2.046,2.455a.408.408,0,0,0,.628,0l2.046-2.455A.411.411,0,0,0,310.93,494.979Z" transform="translate(-291.498 -487.379)" fill="currentColor" data-v-0de8d8fb=""></path><path id="Path_244" data-name="Path 244" d="M297.921,488.728a.818.818,0,0,0-.819.819v4.963a1.431,1.431,0,0,0,.819,2.605,1.41,1.41,0,0,0,.6-.138l2.846,1.642a.818.818,0,1,0,.817-1.416l-2.848-1.645a1.428,1.428,0,0,0-.6-1.046v-4.965A.82.82,0,0,0,297.921,488.728Zm0,7.568a.613.613,0,1,1,.613-.614A.615.615,0,0,1,297.921,496.3Z" transform="translate(-288.92 -486.682)" fill="currentColor" data-v-0de8d8fb=""></path></g></g></g></g><rect id="Rectangle_1450" data-name="Rectangle 1450" width="24" height="24" transform="translate(11081 -2057)" fill="none" data-v-0de8d8fb=""></rect></g></svg>
              {{item.dueDateTimeFormatted}}</div>

          </div>
          <!--
            <div class="task-created-date" title="Category" v-if="item.category!==null && item.category!==undefined">{{item.category.name}}</div>
          -->
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
  props: ['id', 'appliedTaskFilter', 'item', 'uniqueComponentId', 'selectedTask', 'loggedInUser', 'embeddingViewName', 'taskIdToBeViewed', 'isModalViewed'],
  data: function () {
    return {

    };
  },
  methods: {

  },
  created: function () {},
  computed: {
    storeCounter: function () {
      // console.log('Accessing vuex store ', this.$store)
      // console.log('Store data accessed from home page : ' + this.$store.getters.count);
      return this.$store.getters.count;
    }
  },
  mounted: function () {

  },
  unmounted: function () {

  },
  watch: {

  }
};

</script>

<style scoped>

</style>
