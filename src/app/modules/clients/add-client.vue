<template>
<div id="form_wrap_total">
    <div class="form-main">
        <label class="form_label" v-bind:style="{'color': disColor}">Name</label>
        <input class="form_inputs" placeholder="Name" v-model="name" />
    </div>
    <div class="form-main">
        <label class="form_label" v-bind:style="{'color': disColor}">Email</label>
        <input class="form_inputs" placeholder="user@gmail.com" v-model="email" />
    </div>

    <div class="form-main">
        <label class="form_label" v-bind:style="{'color': disColor}">Phone</label>
        <input class="form_inputs" placeholder="Phone" v-model="phone" />
    </div>

    <div class="form-main">
        <label class="form_label" v-bind:style="{'color': disColor}">Website</label>
        <input class="form_inputs" placeholder="www.user.com" v-model="website" />
    </div>

    <div class="form-main">
        <label class="form_label">Parent
            Organization</label>
        <select class="form_inputs" placeholder="Parent Organization" v-model="organisation">
           <option v-for="(category, index) in  myOrganizationCategories" :key="index" v-bind:value="category.id">{{category.name}}</option>
        </select>
    </div>

    <div class="form-main">
        <label class="form_label" v-bind:style="{'color': disColor}">Provience</label>
        <input class="form_inputs" placeholder="Provience" v-model="provience" />
    </div>
    <div class="form-main">
        <label class="form_label" v-bind:style="{'color': disColor}">Address</label>
        <input class="form_inputs" placeholder="Address" v-model="address" />
    </div>
    <div class="form-main">
        <label class="form_label" v-bind:style="{'color': disColor}">City</label>
        <input class="form_inputs" placeholder="City" v-model="city" />
    </div>
    <div class="form-main">
        <label class="form_label" v-bind:style="{'color': disColor}">Country</label>
        <input class="form_inputs" placeholder="Country" v-model="country" />
    </div>
    <div class="form-main">
        <label class="form_label" v-bind:style="{'color': disColor}">Pin</label>
        <input class="form_inputs" placeholder="Pin" v-model="pin" />
    </div>
    <div id="save_can_btns">
        <button class="save_btn" v-on:click="saveClient()" v-bind:disabled="saveDis()">SAVE</button>
        <button class="can_btn uk-modal-close" type="button">CANCEL</button>
    </div>
</div>
</template>

<script>
export default {
    name: "Table",
    props: ['categoryId', 'getOrgDetails', 'myOrganizationCategories'],
    data () {
        return {
            name: "",
            email: "",
            phone: "",
            website: "",
            organisation: "",
            provience: "",
            address: "",
            city: "",
            country: "",
            pin: "",
            disColor: "",
            orgData: "",
             AllparentOrg: [],

            addClient: [],
            headers: {
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkaXNwbGF5TmFtZSI6IlZpZ25lc2hCaGFza2FyIiwiaXNzIjoiYXV0aDAiLCJyZXFBdXRoVG9rZW4iOiJ7XCJ6elwiOm51bGwsXCJsblwiOlwiQmhhc2thclwiLFwidFwiOlwiNWZkODVmNTViN2JiNjA1ODllM2E5M2RkXCIsXCJmblwiOlwiVmlnbmVzaFwiLFwiZW1cIjpcImNiaGFza2FyYXZpZ25lc2gub2ZmaWNlQGdtYWlsLmNvbVwiLFwicGlkc1wiOltudWxsLFwianZzYiRka2JqXCIsXCJqdnNiJG1hdGl1XCJdLFwidXVpZFwiOlwiNWZkODVmOTdiN2JiNjA1ODllM2E5M2RmXCIsXCJ0YlwiOm51bGx9IiwiZXhwIjoxNjU4MDUwNjA2LCJ1dWlkIjoiNWZkODVmOTdiN2JiNjA1ODllM2E5M2RmIn0.or3xlRbqVM_NeBWskWjsBFl7ZRQx4lHzh6mvMTt4a4E'
            }
        };
    },
    methods: {

        saveDis () {
            let saveDisBtn;
            if (!this.name && !this.email && !this.phone && !this.website && !this.organisation && !this.provience && !this.address && !this.city && !this.country && !this.pin) {
                saveDisBtn = false;
                this.disColor = 'red';
            } else {
                saveDisBtn = false;
                this.disColor = '';
            }
            return saveDisBtn;
        },
        

        // Add All organisation details
        saveClient () {

            alert(this.organisation)
            const newObj = {
                id: 'new',
                tenantId: '61dfe560a4d68d08b821e08c',
                categoryId: this.organisation ,
                name: this.name,
                address: {
                    street: this.address,
                    city: this.city,
                    province: this.provience,
                    zip: this.pin,
                    country: this.country
                },
                status: 'ACTIVE'
            };
            axios({
                    method: 'POST',
                    url: 'https://test.hotkup.com/crm/organizations/save',
                    headers: this.headers,
                    data: newObj
                })
                .then((res) => {
                    this.name = "",
                        this.email = "",
                        this.phone = "",
                        this.website = "",
                        this.organisation = "",
                        this.provience = "",
                        this.address = "",
                        this.city = "",
                        this.country = "",
                        this.pin = "";
                    alert(`${res.data.data.name} added successfully`);
                    this.getOrgDetails();
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
</style>
