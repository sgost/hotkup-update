<template>
<div id="form_wrap_total">
<div class="form-main">
    <label class="form_label">Name</label>
    <input class="form_inputs" placeholder="Name" v-model="name"/>
</div>
<div class="form-main">
    <label class="form_label">Email</label>
    <input class="form_inputs"
        placeholder="user@gmail.com" v-model="email"/>
</div>

<div class="form-main">
    <label class="form_label">Phone</label>
    <input class="form_inputs" placeholder="Phone" v-model="phone"/>
</div>

<div class="form-main">
    <label class="form_label">Website</label>
    <input class="form_inputs"
        placeholder="www.user.com" v-model="website"/>
</div>

<div class="form-main">
    <label class="form_label">Parent
        Organization</label>
    <select class="form_inputs" placeholder="Parent
                        Organization" v-model="organisation">
        <option>COKE-COLA</option>
        <option>THUMSUP</option>
        <option>FANTA</option>
        <option>PEPSI</option>
    </select>
</div>

<div class="form-main">
    <label class="form_label">Provience</label>
    <input class="form_inputs"
        placeholder="Provience" v-model="provience" />
</div>
<div class="form-main">
    <label class="form_label" >Address</label>
    <input class="form_inputs" placeholder="Address" v-model="address"/>
</div>
<div class="form-main">
    <label class="form_label">City</label>
    <input class="form_inputs" placeholder="City" v-model="city"/>
</div>
<div class="form-main">
    <label class="form_label">Country</label>
    <input class="form_inputs" placeholder="Country" v-model="country"/>
</div>
<div class="form-main">
    <label class="form_label">Pin</label>
    <input class="form_inputs" placeholder="Pin" v-model="pin" />
</div>

<div id="save_can_btns">
    <button class="save_btn" v-on:click="saveClient">SAVE</button>
    <button class="can_btn uk-modal-close" type="button">CANCEL</button>
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
  addClient: []
  }
  },
 methods: {
    saveClient() {
        console.log('name', this.name)
        let addObj = {
            name: this.name,
            email: this.email,
            phone: this.phone,
            website: this.website,
            organisation: this.organisation,
            provience: this.provience,
            address: this.address,
            city: this.city,
            country: this.country,
            pin: this.pin,
        }
        this.addClient.push(addObj)
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