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
                <select class="uk-input" v-model="parentOrg">
                    <option selected value="kk">kk</option>
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
                <button v-on:click="updatePeople()" tabindex="10" id="saveButton" class="task-update-btn clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column " style="background-color: rgb(37 139 254);border-radius: 20px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: auto;">
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
            parentOrg: ''
        };
    },
    methods: {

        updatePeople() {
            const obj = {
                id: this.contactDetailsUpdateVariable.id,
                tenantId: "61dfe560a4d68d08b821e08c",
                categoryId: this.parentOrg,
                organizationId: this.contactDetailsUpdateVariable.organizationId,
                firstName: this.contactDetailsUpdateVariable.firstName,
                lastName: this.contactDetailsUpdateVariable.lastName,
                email: this.contactDetailsUpdateVariable.email,
                mobile: this.contactDetailsUpdateVariable.telephone,
                address: {
                    street: this.contactDetailsUpdateVariable.street,
                    city: this.contactDetailsUpdateVariable.city,
                    province: this.contactDetailsUpdateVariable.province,
                    zip: this.contactDetailsUpdateVariable.zip,
                    country: this.contactDetailsUpdateVariable.country
                }
            };
            axios({
                method: 'POST',
                url: 'https://test.hotkup.com/crm/contacts/save',
                data: obj
            }).then((res) => {
                alert(`${res.data.data.firstName + " " + res.data.data.lastName} updated successfully`);
            }).error((err) => {
                console.log(err);
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
