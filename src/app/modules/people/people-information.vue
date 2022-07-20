<template>
<div class="first_column_scrollable custom-scroll-bar activities_list" style="border-top:0px solid gray;margin-top:10px;position:relative;flex-grow: 1; height: 500px">
    <div id="main_container_form">
        <div id="form_wrap_total">
            <div class="form-main">
                <label class="form_label">First
                    Name</label>
                <input class="form_inputs" placeholder="First Name" v-model="item.firstName" />

            </div>
            <div class="form-main">
                <label class="form_label">Last
                    Name</label>
                <input class="form_inputs" placeholder="Last Name" v-model="item.lastName" />
            </div>
            <div class="form-main">
                <label class="form_label">Email</label>
                <input class="form_inputs" placeholder="user@gmail.com" v-model="item.email" />
            </div>
            <div class="form-main">
                <label class="form_label">Mobile</label>
                <input class="form_inputs" placeholder="Mobile" v-model="item.mobile" />
            </div>
            <div class="form_main_wrapper">
                <div class="form-main">
                    <label class="form_label">Telephone</label>
                    <input class="form_inputs" placeholder="Telephone" />
                </div>
                <div class="form-main">
                    <label class="form_label">Extension</label>
                    <input class="form_inputs" placeholder="Extension"
                    v-model="item.telephoneExt" />
                </div>
            </div>
            <div class="form-main">
                <label class="form_label">Street
                    Name</label>
                <input class="form_inputs" placeholder="Street Name"/>
            </div>
            <div class="form-main">
                <label class="form_label">City</label>
                <input class="form_inputs" placeholder="City" />
            </div>
            <div class="form_main_wrapper">
                <div class="form-main">
                    <label class="form_label">Provience</label>
                    <input class="form_inputs" placeholder="Provience" />
                </div>
                <div class="form-main">
                    <label class="form_label">Pin</label>
                    <input class="form_inputs" placeholder="Pin" />
                </div>
            </div>
            <div id="save_can_btns">
                <button class="save_btn" v-on:click="infoDetails()">UPDATE</button>
                <button class="can_btn">CANCEL</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Table",
    props: ['item'],
    data () {
        return {
            addClient: []
        };
    },
    methods: {
        updateContact () {
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
</style>
