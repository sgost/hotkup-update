<template>
<div style="display:flex;align-items:center;justify-content:center;flex-direction: row;min-width: 50px;display:none">
    <img class="uk-border-pill ui-navbar-profile-image" src="https://miro.medium.com/max/1400/0*o0-6o1W1DKmI5LbX.png" width="25" height="25" style="border:1px solid rgb(220 220 220);xbackground: #ffeb3b;padding: 3px;margin-left: 0px;height: 45px;width: 45px;">
</div>
<div class="ui_grid_row list-detail" style=" display: grid; padding: 5px 2px 5px 15px; border-top: 0.5px solid #e5e5e5; border-bottom: 0.5px solid #e5e5e5; margin: 0">
    <div class="list-item-row-1" style="display:flex;column-gap:5px">
        <div class="task-sno">
            <span>Client Id # 14321</span>
        </div>
        <div style="display:flex;column-gap:5px;margin-left:auto;display:none">
            <div style="display: flex;column-gap: 2px;color: #6f6f6f;"><img src="resources/images/attachments.svg" style="height:10px;width:15px"></div>
            <div style="display: flex;column-gap: 2px;color: #6f6f6f;"><img src="resources/images/priority.svg" style="height:12px;width:15px"></div>
        </div>
        <div class="list-item-menu">
            <span uk-icon="icon:more-vertical;ratio:0.55;"></span>
        </div>
    </div>
    <div class="list-item-row-2 task-name" style="place-items: flex-start flex-start;overflow-x: hidden;">
        <p style="margin: 0 0 0px 0;text-overflow: ellipsis;overflow-x: hidden;white-space: nowrap;">{{item.name}} {{item.lastName}}</p>
    </div>
    <div class="list-item-row-3" style="place-items: end flex-start;overflow: hidden;">
        <div style="display: flex;column-gap: 5px;width: 100%;justify-content: space-between;">

            <div style="display:flex;column-gap:5px">
                <img class="uk-border-pill ui-navbar-profile-image" src="https://miro.medium.com/max/1400/0*o0-6o1W1DKmI5LbX.png" width="25" height="25" style="border: 1px solid rgb(220, 220, 220);padding: 0px;margin-left: 0px;height: 20px;width: 20px;">

                <div>
                    <div class="task-created-date" style="font-size: 0.55rem;letter-spacing:0.75px;text-transform: none;color: rgb(152, 152, 152);">{{myOrgName}}</div>
                </div>
            </div>

            <div style="display: flex;column-gap: 2px;">
                <div class="task-created-date" style="display:none;overflow: hidden;max-width: 50%;text-transform: uppercase;white-space: pre;border: 1px solid rgb(239, 239, 239);padding: 2px 10px;border-radius: 20px;" title="Status">ssss</div>

                <!-- <div class="task-created-date critical" style="display:flex;overflow: hidden;text-transform: none;white-space: pre;border: 1px solid rgb(223, 223, 223);border-radius: 20px;background-color: white;color: gray; padding: 0 6px; font-size: 10px">
                    AUG 27</div> -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    bus
} from './../../../main.js';
import userMixinLib from './../../mixins/lib/user_mixin_lib';
import utilsMixinLib from './../../mixins/lib/utils_lib';
import uiListMixinLib from './../../mixins/lib/ui-list.js';

export default {
    mixins: [
        userMixinLib,
        utilsMixinLib,
        uiListMixinLib
    ],
    props: ['id', 'appliedTaskFilter', 'myOrgName', 'item', 'cardActive', 'catIndex', 'uniqueComponentId', 'selectedTask', 'loggedInUser', 'embeddingViewName', 'taskIdToBeViewed', 'isModalViewed'],
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
    unmounted: function () {},
    watch: {

    }
};
</script>

<style scoped>

</style>
