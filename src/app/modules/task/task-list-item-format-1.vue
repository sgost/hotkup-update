<template>
    <div class="active-border"></div>
    <div style="display:flex;align-items:center;justify-content:center;flex-direction: row;min-width: 50px;">
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
    <div class="list-detail" style=" display: grid;">
      <div class="list-item-row-1" style="display:flex;column-gap:5px">
        <div class="task-sno">
          <span v-if="appliedTaskFilter === 'sent' && item.statusCode !== undefined && item.statusCode === 'OVERDUE'" style="color:red">Task #{{item.sno}}</span>
          <span v-else>Task #{{item.sno}}</span>
        </div>
        <div style="display:flex;column-gap:2px;flex-grow: 1;">
          <span style="font-size: 0.6rem;color:gray">by</span>
          <span style="font-size: 0.6rem;color:gray">{{item.createdByName}}</span>
        </div>
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
          <div class="task-created-date" style="font-size: 0.55rem;letter-spacing:0.75px;text-transform: uppercase;color: rgb(152, 152, 152);" v-bind:title="'created ' + item.createdOnAgo + '..'">{{item.createdOnFormatted}}</div>
          <div style="display:none;" class="task-created-date" title="Due Date" v-if="item.dueDateTime!==null">{{item.dueDateTimeFormatted}}</div>
          <div class="task-created-date" style="overflow: hidden;max-width: 50%;text-transform: uppercase;white-space: pre;border: 1px solid rgb(239, 239, 239);padding: 2px 10px;background: #27ca27;color: white;border-radius: 20px;" v-if="item.statusInfo!==null && item.isRecent">{{item.statusInfo.label}}</div>
          <div class="task-created-date" style="overflow: hidden;max-width: 50%;text-transform: uppercase;white-space: pre;border: 1px solid rgb(239, 239, 239);padding: 2px 10px;border-radius: 20px;" title="Status" v-if="item.statusInfo!==null && !item.isRecent">{{item.statusInfo.label}}</div>
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
