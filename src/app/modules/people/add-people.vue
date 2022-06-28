<template>
<div id="main_container_form">
<div id="form_wrap_total">
    <div class="form-main">
        <label class="form_label">First
            Name</label>
        <input class="form_inputs"
            placeholder="First Name" />

    </div>
    <div class="form-main">
        <label class="form_label">Last
            Name</label>
        <input class="form_inputs"
            placeholder="Last Name" />
    </div>
    <div class="form-main">
        <label class="form_label">Email</label>
        <input class="form_inputs"
            placeholder="user@gmail.com" />
    </div>
    <div class="form-main">
        <label class="form_label">Mobile</label>
        <input class="form_inputs"
            placeholder="Mobile" />
    </div>
    <div class="form_main_wrapper">
        <div class="form-main">
            <label class="form_label">Telephone</label>
            <input class="form_inputs"
                placeholder="Telephone" />
        </div>
        <div class="form-main">
            <label class="form_label">Extension</label>
            <input class="form_inputs"
                placeholder="Extension" />
        </div>
    </div>
    <div class="form-main">
        <label class="form_label">Street
            Name</label>
        <input class="form_inputs"
            placeholder="Street Name" />
    </div>
    <div class="form-main">
        <label class="form_label">City</label>
        <input class="form_inputs" placeholder="City" />
    </div>
    <div class="form_main_wrapper">
        <div class="form-main">
            <label class="form_label">Provience</label>
            <input class="form_inputs"
                placeholder="Provience" />
        </div>
        <div class="form-main">
            <label class="form_label">Pin</label>
            <input class="form_inputs"
                placeholder="Pin" />
        </div>
    </div>
    <div id="save_can_btns">
        <button class="save_btn">SAVE</button>
        <button class="can_btn">CANCEL</button>
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

</style>