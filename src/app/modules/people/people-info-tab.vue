<template>
<div style="position:relative">
    <form style="width: 90%;margin-top: 15px;padding-top: 10px;padding-right: 30px;padding-left: 30px;margin-left: 0px;" class="uk-grid-small" uk-grid onsubmit="return false;">

        <div class="uk-width-2-3@s uk-first-column ">
            <label class="uk-form-label">First Name</label>
            <div class="uk-form-controls">
                <input v-model="contactDetailsUpdateVariable.firstName" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-1-3@s uk-grid-margin">
            <label class="uk-form-label" for="form-stacked-text">Last Name</label>
            <div style="position:relative">
                <input v-model="contactDetailsUpdateVariable.lastName" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-2-3@s uk-first-column ">
            <label class="uk-form-label">Email *</label>
            <div class="uk-form-controls">
                <input v-model="contactDetailsUpdateVariable.email" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-1-3@s uk-grid-margin">
            <label class="uk-form-label" for="form-stacked-text">Phone *</label>
            <div style="position:relative">
                <input v-model="contactDetailsUpdateVariable.phone" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-2-3@s uk-first-column ">
            <label class="uk-form-label">Change category *</label>
            <div class="uk-form-controls">
                <select class="uk-input" v-model="parentOrg" v-on:click="getAllParent()">
                    <option v-for="(item, i) in myContactCategories" :key="i" v-bind:value="item.id">{{item.name}}</option>
                </select>
            </div>
        </div>

        <div class="uk-width-1-3@s uk-grid-margin">
            <label class="uk-form-label" for="form-stacked-text">Provience *</label>
            <div style="position:relative">
                <input v-model="contactDetailsUpdateVariable.province" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-2-3@s uk-first-column ">
            <label class="uk-form-label">Address *</label>
            <div class="uk-form-controls">
                <input v-model="contactDetailsUpdateVariable.street" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-1-3@s uk-grid-margin">
            <label class="uk-form-label" for="form-stacked-text">City *</label>
            <div style="position:relative">
                <input v-model="contactDetailsUpdateVariable.city" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-2-3@s uk-first-column ">
            <label class="uk-form-label">Country *</label>
            <div class="uk-form-controls">
                <input v-model="contactDetailsUpdateVariable.country" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-1-3@s uk-grid-margin">
            <label class="uk-form-label" for="form-stacked-text">Zip *</label>
            <div style="position:relative">
                <input v-model="contactDetailsUpdateVariable.zip" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-1-1" style="border-top: 1px solid rgb(236 236 236);padding: 20px 0px;margin: 75px 0px 0px 15px;display: flex;flex-direction: column;">
            <div style="display:grid">
            </div>
            <div style="display: flex;width:100%;place-self:center;padding-right: 15px;">
                <button v-on:click="fetchData()" tabindex="10" id="saveButton" class="task-update-btn clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column " style="background-color: rgb(37 139 254);border-radius: 20px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: auto;">
                    <div style="display: grid;grid-template-columns: auto auto;place-items: center;">
                        <div>&nbsp;&nbsp;&nbsp;Update Contact</div>
                    </div>
                </button>
            </div>

            <!-- <div style="display: flex;width: 100%;place-self: center;padding-right: 15px;justify-content: flex-end;">
                    Recurring Task Templates cannot be updated. It can only be disabled and created newly.
                </div> -->
        </div>
    </form>

</div>
</template>

<script>
export default {

    props: ['taskInfo', 'hideUpdateButton', 'item', 'myContactCategories', 'contactDetailsUpdateVariable', 'myOrgName'],
    data: function () {
        return {
          parentOrg: '',
          AllparentOrg: [],
            editClient: {
                name: "COCO-COLA",
                email: 'coco@gmail.com',
                phone: '9494978552',
                website: 'www.coco.com',
                organisation: 'USA',
                provience: 'XYZ provience',
                address: 'XYZ, street, 2/93, XYZ location',
                city: 'XYZ city',
                country: 'XYZ country',
                pin: '325468'
            }
        };
    },
    methods: {
        fetchData () {
            console.log('item', this.item);
            console.log(this.editClient);

            // API calls here
            this.getCategory();
        },

        getContactCategories () {
             axios({
                    method: 'GET',
                    url: `https://test.hotkup.com/crm/category/get/${this.item.categoryId}`
                }).then((res) => {
                  this.parentOrg = res.data.data.name;
                });
        }
    },
    created: function () {},
    computed: {},
    mounted: function () {
        alert("ss")
    },
    watch: {}
};
</script>

<style scoped>
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

.tab-bar>li>a {
    display: flex;
    column-gap: 10px;
}

.tab-bar>li .tab_label {
    display: none;
}

.tab-bar>li.uk-active .tab_label {
    display: block !important;
}

.uk-subnav-pill>*>a {
    font-size: 0.55rem !important;
    border-radius: 0px;
    letter-spacing: 0.075rem;
}

.uk-subnav-pill>.uk-active>a {
    border-bottom: 2px solid #3977ff !important;
    color: #4780ff;
    background-color: white !important;
}

.uk-input,
.uk-select:not([multiple]):not([size]) {
    height: 35px;
    vertical-align: middle;
    display: inline-block;
    border-radius: 3px;
}

.uk-grid-small>div {
    margin-bottom: 0px;
}

.uk-form-label {
    font-size: .66rem;
    text-transform: capitalize;
    letter-spacing: 1px;
    color: black;
}

.uk-input,
.uk-select:not([multiple]):not([size]) {
    height: 35px;
    vertical-align: middle;
    display: inline-block;
    background: #fbfbfb;
    border-radius: 3px;
}
</style>
