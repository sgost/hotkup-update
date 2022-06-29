<template>
 <div class="first_column_scrollable custom-scroll-bar activities_list" style="border-top:0px solid gray;margin-top:10px;position:relative;flex-grow: 1; height: 500px">
<div id="form_wrap_total">
<div class="form-main">
    <label class="form_label">Name</label>
    <input class="form_inputs" placeholder="Name" v-model="editClient.name"/>
</div>
<div class="form-main">
    <label class="form_label">Email</label>
    <input class="form_inputs"
        placeholder="user@gmail.com" v-model="editClient.email"/>
</div>

<div class="form-main">
    <label class="form_label">Phone</label>
    <input class="form_inputs" placeholder="Phone" v-model="editClient.phone"/>
</div>

<div class="form-main">
    <label class="form_label">Website</label>
    <input class="form_inputs"
        placeholder="www.user.com" v-model="editClient.website"/>
</div>

<div class="form-main">
    <label class="form_label">Parent
        Organization</label>
    <select class="form_inputs" placeholder="Parent
                        Organization" v-model="editClient.organisation">
        <option>COKE-COLA</option>
        <option>THUMSUP</option>
        <option>FANTA</option>
        <option>PEPSI</option>
    </select>
</div>

<div class="form-main">
    <label class="form_label">Provience</label>
    <input class="form_inputs"
        placeholder="Provience" v-model="editClient.provience" />
</div>
<div class="form-main">
    <label class="form_label" >Address</label>
    <input class="form_inputs" placeholder="Address" v-model="editClient.address"/>
</div>
<div class="form-main">
    <label class="form_label">City</label>
    <input class="form_inputs" placeholder="City" v-model="editClient.city"/>
</div>
<div class="form-main">
    <label class="form_label">Country</label>
    <input class="form_inputs" placeholder="Country" v-model="editClient.country"/>
</div>
<div class="form-main">
    <label class="form_label">Pin</label>
    <input class="form_inputs" placeholder="Pin" v-model="editClient.pin" />
</div>

<div id="save_can_btns">
    <button class="save_btn" v-on:click="saveClient">SAVE</button>
    <button class="can_btn uk-modal-close" type="button">CANCEL</button>
</div>
</div>
</div>
</template>

<script>
export default {
  name: "Table",
  data() {
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
  addClient: [],
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
            pin: '325468',
        }
  }
  },
 methods: {
    saveClient() {
        console.log('name', this.name)
        let addObj = editClient
        this.addClient.push(addObj)

        console.log('addClient', this.addClient)
        console.log('addObj', addObj)
        console.log('editClient', this.editClient)
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
margin:  10px 0 0 0;
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
margin:  10px 0 0 0;
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