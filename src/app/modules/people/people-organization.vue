<template>
<div class="first_column_scrollable custom-scroll-bar activities_list" style="border-top:0px solid gray;margin-top:10px;position:relative;flex-grow: 1; height: 500px">
    <div id="form_wrap_total">
        <button id="add_client" type="button" v-on:click="getOrgAllDetails()">
        CRM Organization
        </button>

        <div uk-dropdown="mode: click" id="contacts_main">
            <div id="search_field">
                <span uk-icon="search"></span>
                <input type="search" placeholder="Search..." v-on:keyup="searchHooksSubmenu()" v-model="submenuSearchQuery" />
            </div>
            <hr />
            <div id="contacts">
                <span id="contacts_menu" v-show="myOrganizationDetailAll.length === 0">No contacts Found...</span>
                <span id="contacts_menu" v-for="(org, idx) in myOrganizationDetailAll" :key="idx" v-show="myOrganizationDetailAll.length > 0"><input type="checkbox" v-on:click="addCRMContact(org.id)">{{org.name}}</span>
            </div>
        </div>

        <hr />
        <div class="form-main">
            <label class="form_label">Add client under organization</label>
            <select class="form_inputs" placeholder="Hotkup List" v-on:click="getOrgAllDetails()">
                <option v-for="(orgDetails, index) in myOrganizationDetailAll" :key="index">{{orgDetails.name}}</option>
            </select>
        </div>
        <div class="form-main">
            <label class="form_label">Organization
                Name</label>
            <input class="form_inputs" placeholder="Organization Name" v-model="myOrganizationDetail.name" />
        </div>
        <div class="form-main">
            <label class="form_label">Job
                Role
            </label>
            <input class="form_inputs" placeholder="Job Role" v-model="myOrganizationDetail.jobRole" />
        </div>
        <div class="form-main">
            <label class="form_label">Telephone</label>
            <input class="form_inputs" placeholder="Telephone" v-model="myOrganizationDetail.phone" />
        </div>
        <div class="form-main">
            <label class="form_label">Address</label>
            <textarea class="form_textarea" placeholder="Address"></textarea>
        </div>
        <div id="save_can_btns">
            <button class="save_btn" v-on:click="addCRMContact()">SUBMIT</button>
            <button class="can_btn">CANCEL</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Table",
    props: ['item', 'myOrganizationDetail', 'myContactCategories'],
    data() {
        return {
            allOr: [],
            myOrganizationDetailAll: [],
            orgId: '',
            submenuSearchQuery: ''
        };
    },
    methods: {
        getOrgAllDetails() {
            axios({
                    method: 'GET',
                    url: `https://test.hotkup.com/crm/org-contact-link/list-orgs/${this.item.id}/1/all`
                })
                .then((res) => {
                    this.myOrganizationDetailAll = res.data.data;
                })
                .error((res) => console.log(res));
        },

        searchHooksSubmenu() {
            this.myOrganizationDetailAll = [];
            axios({
                method: 'GET',
                url: `https://test.hotkup.com/crm/organizations/list/1/${this.submenuSearchQuery}`
            }).then((res) => {
                this.myOrganizationDetailAll = res.data.data;
                console.log('this.myOrganizationDetailAll', this.myOrganizationDetailAll);
            });
        },
        
        addCRMContact(orgId) {
            const form = {
                id: "New",
                orgId: orgId,
                contactId: this.item.id
            };
            axios({
                    method: 'POST',
                    data: form,
                    url: `https://test.hotkup.com/crm/org-contact-link/add-link`
                })
                .then((res) => {
                    console.log(res);
                })
                .error((res) => console.log(res));
        }
    }
};
</script>

<style scoped>
#form_wrap_total {
    border-radius: 4px;
    padding: 0 11px;
    display: flex;
    flex-direction: column;
}

.form-main {
    display: flex;
    flex-direction: column;
    margin: 23px 0 0 0;
}

.form_label {
    font-size: .66rem;
    line-height: 0;
    color: #333333;
    font-weight: 500;
}

.form-main .form_inputs {
    background: #FFFFFF;
    border: 0.5px solid #CCCCCC;
    border-radius: 4px;
    height: 35px;
    padding: 0 0 0 10px;
    font-size: 13px;
    margin: 10px 0 0 0;
}

.form-main .form_inputs:hover {
    border: 2px solid #1E8BED;
}

.form-main .form_textarea {
    background: #FFFFFF;
    border: 0.5px solid #CCCCCC;
    box-shadow: 0px 0px 5px rgba(25, 39, 67, 0.1);
    border-radius: 8px;
    height: 100px;
    padding: 12px 24px;
    font-size: 16px;
    margin: 10px 0 0 0;
    outline-color: #1E8BED;
}

#save_can_btns {
    display: flex;
    width: fit-content;
    margin: 30px 0 0 auto;
}

#save_can_btns .save_btn {
    background: #1565C0;
    border-radius: 4px;
    padding: 9px 22px;
    font-size: 12px;
    color: #FFFFFF;
    border: none;
    outline: none;
    cursor: pointer;
}

#save_can_btns .can_btn {
    background: white;
    border-radius: 4px;
    padding: 9px 10px;
    font-size: 12px;
    color: #1565C0;
    border: none;
    outline: none;
    margin: 0 0 0 20px;
    cursor: pointer;
}

.form_main_wrapper {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
}

.form_main_wrapper .form-main {
    width: 100%;
}

.form_main_wrapper .form-main:nth-child(2) {
    margin-left: 1rem;
}

#add_client {
    width: 150px;
    margin-left: auto;
    height: 40px;
    background: #0077D7;
    border-radius: 4px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: #FFFFFF;
    border: none;
    outline: none;
    cursor: pointer;
}

#add_client #add_client_span {
    font-size: 17px;
    margin: 0 10px 0 0;
}

#search_field {
    position: relative;
    border: 1px solid rgb(187, 186, 186);
    border-radius: 3px;
    display: flex;
    align-items: center;
    padding: 0.75rem;
}

#search_field input {
    border: none;
    outline: none;
    margin: 0 0 0 0.3rem;
}

#contacts_main {
    min-width: 200px;
    font-size: .75rem;
}

#contacts_main #contacts {
    height: 260px;
    overflow: scroll;
    overflow-x: hidden;
    /* Hide horizontal scrollbar */
}

#contacts_main #contacts #contacts_menu {
    display: flex;
    padding-bottom: 0.5rem;
}

#contacts_main #contacts #contacts_menu input {
    width: 15px;
    height: 15px;
    margin-right: 0.7rem;
}
</style>
