<template>
<div style="position:relative">
    <span style="position: absolute;right: 5px;top: -15px;opacity: 0;cursor: pointer;">pppppppppp</span>
    <form style="width: 90%;margin-top: 15px;padding-top: 10px;padding-right: 30px;padding-left: 30px;margin-left: 0px;" class="uk-grid-small" uk-grid onsubmit="return false;">

        <div class="uk-width-2-3@s uk-first-column ">
            <label class="uk-form-label">Name *</label>
            <div class="uk-form-controls">
                <input v-model="item.name" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-1-3@s uk-grid-margin">
            <label class="uk-form-label" for="form-stacked-text">Email *</label>
            <div style="position:relative">
                <input v-model="editClient.email" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-2-3@s uk-first-column ">
            <label class="uk-form-label">Phone</label>
            <div class="uk-form-controls">
                <input v-model="editClient.phone" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-1-3@s uk-grid-margin">
            <label class="uk-form-label" for="form-stacked-text">Website *</label>
            <div style="position:relative">
                <input v-model="editClient.website" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-2-3@s uk-first-column ">
            <label class="uk-form-label">Parent Organization *</label>
            <div class="uk-form-controls">
                <select class="uk-input" v-model="parentOrg" v-on:click="getAllParent()" v-bind:value="parentOrg">
                    <option v-for="(item, i) in AllparentOrg" :key="i" v-bind:value="item.name">{{item.name}}</option>
                </select>
            </div>
        </div>

        <div class="uk-width-1-3@s uk-grid-margin">
            <label class="uk-form-label" for="form-stacked-text">Provience *</label>
            <div style="position:relative">
                <input v-model="item.provience" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-2-3@s uk-first-column ">
            <label class="uk-form-label">Address *</label>
            <div class="uk-form-controls">
                <input v-model="item" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-1-3@s uk-grid-margin">
            <label class="uk-form-label" for="form-stacked-text">City *</label>
            <div style="position:relative">
                <input v-model="item.city" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-2-3@s uk-first-column ">
            <label class="uk-form-label">Country *</label>
            <div class="uk-form-controls">
                <input v-model="item.country" class="uk-input" type="text" placeholder="">
            </div>
        </div>

        <div class="uk-width-1-3@s uk-grid-margin">
            <label class="uk-form-label" for="form-stacked-text">Email *</label>
            <div style="position:relative">
                <input v-model="editClient.pin" class="uk-input" type="text" placeholder="">
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

    props: ['taskInfo', 'hideUpdateButton', 'item', 'myOrgName'],
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
        fetchData() {
            console.log('item', this.item);
            console.log(this.editClient);

            // API calls here
            this.getCategory();
        },

        getCategory() {
            axios({
                method: 'GET',
                url: `https://test.hotkup.com/crm/category/get/${this.item.categoryId}`
            }).then((res) => {
                this.parentOrg = res.data.data.name;
            });
        },
        getAllParent() {
            axios({
                method: 'GET',
                url: `https://test.hotkup.com/crm/category/list/1/all`
            }).then((res) => {
                this.AllparentOrg = res.data.data;
            });
        }
    },
    created: function () {},
    computed: {},
    mounted: function () {},
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
