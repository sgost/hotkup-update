<template>
<div v-if="isRemindersTabInitialized" style="display: flex;padding: 20px;min-height: 300px;flex-direction: column;">

    <div style="padding: 5px 0px;margin-right:20px;margin-bottom: 10px;display: grid;grid-template-rows: 1fr;place-items: flex-start;border-bottom: 1px solid #d0d0d0;">
        <button v-on:click="openAddReminderModal()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color:#2196f3;border-radius: 3px;min-width: 100px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;display: inline-block;">
            <span uk-icon="icon:plus;ratio:0.65" class="uk-icon" style="">
                <svg width="13" height="13" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="plus">
                    <rect x="9" y="1" width="1" height="17"></rect>
                    <rect x="1" y="9" width="17" height="1"></rect>
                </svg>
            </span>
            <span style="padding-left: 10px;">Add Reminder</span>
        </button>
    </div>
    <div v-if="isRemindersTabInitialized" class="custom-scroll-bar" style="position: relative;flex-grow: 1;">
        <div v-show="reminderList.length==0" style="text-align:center;border-bottom: 0px;" v-on:click="loadPotentialMembersForReminders()"> No reminders added </div>
        <div v-show="reminderList.length>0" style="border-radius: 5px;border: 1px solid rgba(128, 128, 128, 0.25);margin-right: 5px;margin-left: 0px;padding: 1px 1px;">
            <div style="background:rgb(242 242 242 / 23%);border-width:1px 1px 0px;border-top-style:solid;border-right-style:solid;border-bottom-style:initial;border-left-style:solid;border-top-color:transparent;border-right-color:transparent;border-bottom-color:initial;border-left-color:transparent;border-image:initial;text-transform:uppercase;font-size:.5rem;padding: 10px 0px;display:flex;border-bottom:1px solid #d0d0d0;column-gap:20px;font-weight:bold;letter-spacing:1px;">

                <div style="flex:0.25;text-align:right">Sno.</div>
                <div style="flex:4;">
                    Title
                </div>
                <div style="flex:1;">Type</div>
                <div style="flex:2;">Date/Time</div>
                <div style="flex:1;">Actions</div>
            </div>
            <div class="contact_list first_column_scrollable custom-scroll-bar activities_list" style="max-height: 380px; height: fit-content; padding: 0; background-color: rgb(255 255 255 / 75%)">
                <template v-for="item,index in reminderList" :key="index">
                    <div style="position: relative;padding: 10px;min-height: 20px;justify-items: start;column-gap: 20px;background-color: rgb(255 255 255 / 75%);font-size: 0.65rem;display: flex;">

                        <div style="flex:0.25;text-align:right" v-if="item.status==='ELAPSED'">{{index+1}}</div>
                        <div style="flex:0.25;text-align:right;" v-if="item.status!=='ELAPSED' && item.status!=='CANCELLED'">{{index+1}}</div>
                        <div style="flex:0.25;text-align:right;filter: brightness(1.75);" v-if="item.status==='CANCELLED'">{{index+1}}</div>

                        <div style="flex:4;" v-if="item.status==='ELAPSED'">
                            <div><span style="text-decoration: line-through red;">{{item.title}}</span></div>
                            <div style="color: rgb(188 188 188); font-size: 0.55rem;">Reminder set for {{item.usersString}}</div>
                        </div>
                        <div style="flex:4;" v-if="item.status!=='ELAPSED' && item.status!=='CANCELLED'">
                            <div>{{item.title}} &nbsp; &nbsp; &nbsp; &nbsp; </div>
                            <div style="color: rgb(188 188 188); font-size: 0.55rem;">Reminder set for {{item.usersString}}</div>
                        </div>
                        <div style="flex:4;filter: brightness(1.75);" v-if="item.status==='CANCELLED'">
                            <div>{{item.title}} &nbsp; &nbsp; &nbsp; &nbsp;</div>
                            <div style="color: rgb(101, 101, 101); font-size: 0.55rem;">Reminder set for {{item.usersString}}</div>
                        </div>

                        <div style="flex:1;" v-if="item.status==='ELAPSED'">{{item.type}}</div>
                        <div style="flex:1;" v-if="item.status!=='ELAPSED' && item.status!=='CANCELLED'">{{item.type}}</div>
                        <div style="flex:1;filter: brightness(1.75);" v-if="item.status==='CANCELLED'">{{item.type}}</div>

                        <div style="flex:2;" v-if="item.status==='ELAPSED'">{{item.dateTimeFormatted}}</div>
                        <div style="flex:2;" v-if="item.status!=='ELAPSED' && item.status!=='CANCELLED'">{{item.dateTimeFormatted}}</div>
                        <div style="flex:2;filter: brightness(1.75);" v-if="item.status==='CANCELLED'">{{item.dateTimeFormatted}}</div>

                        <!-- <div style="flex:1;" v-if="item.status!=='ELAPSED'"><a v-on:click="updateReminderItem(item)">Edit</a>  |  <a v-on:click="removeReminder(item)">Remove</a></div> Removing after Pawan said 'Cancel will do, no edits required' -->
                                            <div style="flex:1;text-align:center;" v-show="item.status !== 'CANCELLED'"><a v-on:click="cancelReminderItem(item)">Cancel</a></div>
                                            <div style="flex:1;text-align:center;" v-show="item.status == 'CANCELLED'"><a>Cancelled</a></div>
                        <div style="flex:1;" v-if="item.status==='ELAPSED'">
                            <span style="background: #59d059;color: white;padding:4px 10px;border-radius: 20px;font-size: 0.45rem;margin-left: 20px;letter-spacing: 1px;">ELAPSED</span>
                        </div>
                        <div style="flex:1;" v-if="item.status==='CANCELLED'">
                            <span style="filter: brightness(1.75);background: rgb(99 99 99);color: #929292;padding:4px 10px;border-radius: 20px;font-size: 0.45rem;margin-left: 20px;letter-spacing: 1px;">CANCELLED</span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    name: "Table",
    props: ['isRemindersTabInitialized', 'openAddReminderModal', 'loadPotentialMembersForReminders', 'reminderList', 'cancelReminderItem'],
    data() {
        return {

        };
    },
    methods: {

    }
};
</script>
