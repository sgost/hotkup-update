<template>
    <div id="main_container">
      <button id="add_client" uk-toggle="target: #modal-center">
              <span id="add_client_span">+</span>
         Add Contact
         </button>
         <div class="contact_list">
           <p id="names" v-for="(contact, index) in contact" :key=index>
             {{contact.name}} <span id="minus">-</span>
             <span id="designation">{{contact.role}}</span>
        <span id="plus">+</span></p>
        </div>
        </div> 


        <div id="modal-center" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

        <button class="uk-modal-close-default" type="button" uk-close></button>

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

    </div>
</div>
</template>

<script>
export default {
  name: "Table",
  data() {
  return {
    contact: [
            {
            name: 'Jonatan Cartine',
            role: 'Owner',
            },
            {
            name: 'Sheetal Cartine',
            role: 'Owner',
            },
            {
            name: 'Norries Cartine',
            role: 'Accountant',
            }
          ],
  }
  },
 methods: {

 }
};
</script>

<style scoped>
#main_container {
    padding: 15px;
}
#main_container #add_client {
    width: 150px;
    margin: 0 0 45px auto;
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
#main_container .contact_list #names {
    display: grid;
    max-width: 333px;
    margin: 15px 0 0 0;
    font-size: 14px;
    font-weight: bold;
    grid-template-columns: 174px 33px 98px auto;
}
#main_container .contact_list #names #designation {
    font-size: 12px;
    font-weight: bold;
    color: #03fcb1;
}


/* contact */

#main_container .contact_list #names {
    display: grid !important;
    max-width: 333px !important;
    margin: 15px 0 0 0 !important;
    font-size: 14px !important;
    font-weight: bold !important;
    grid-template-columns: 174px 33px 98px auto !important;
}

#main_container #add_client {
    width: 150px;
    margin: 0 0 45px auto;
}

#main_container .contact_list #names #designation {
    font-size: 12px;
    font-weight: bold;
    color: #03fcb1;
}


#main_container .contact_list #names #plus{
    background: rgb(37, 139, 255);
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* contact form */
#add_client_modal #main_container_form {
    width: fit-content;
}

#main_container_form {
    background: white;
    border-radius: 30px;
}
#form_wrap_total {
    display: flex;
    flex-direction: column;
}
#add_client_modal #form_wrap_total::-webkit-scrollbar {
    display: none;
}
.form_main_wrapper {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
}
.form-main {
    display: flex;
    flex-direction: column;
    margin: 23px 0 0 0;
}
.form_label {
    font-size: 11px;
    line-height: 4px;
    color: #333333;
    font-weight: 500;
}
.form-main .form_inputs {
    background: #FFFFFF;
    border: 0.5px solid #CCCCCC;
    box-shadow: 0px 0px 5px rgba(25, 39, 67, 0.1);
    border-radius: 8px;
    height: 33px;
    padding: 0 0 0 7px;
    font-size: 11px;
    margin: 10px 0 0 0;
}

.form-main .form_inputs:hover {
    border: 2px solid #1E8BED;
}

.form-main .form_textarea {
border: 0.5px solid #CCCCCC;
box-shadow: 0px 0px 5px rgba(25, 39, 67, 0.1);
border-radius: 8px;
height: 100px;
padding: 12px 24px;
font-size: 16px;
margin:  10px 0 0 0;
outline-color: #1E8BED;
}

.form_main_wrapper .form-main {
    width: 49%;
}
.form_main_wrapper .form-main:nth-child(2) {
    width: 49%;
    margin-left:1%;
}
#save_can_btns {
    display: flex;
    width: fit-content;
    margin: 30px 0 0 auto;
}
#save_can_btns .save_btn {
    background: #1565C0;
    border-radius: 6px;
    padding: 8px 36px;
    font-size: 11px;
    color: #FFFFFF;
    border: none;
    outline: none;
    margin: 0 23px 0 0;
    cursor: pointer;
}
#save_can_btns .can_btn {
    background: white;
    border-radius: 6px;
    padding: 8px 36px;
    font-size: 11px;
    color: #1565C0;
    border: none;
    outline: none;
    margin: 0;
    box-shadow: 0px 0px 5px rgba(25, 39, 67, 0.1);
    cursor: pointer;
}










#client_container {
padding: 48px 20px 10px 20px;
}
#search_main {
    display: flex;
}
#search_main .search_button {
    width: 142px;
    /* height: 48px; */
    background: #3751FF;
    box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
    border-radius: 8px;
    font-size: 14px;
    line-height: 20px;
    color: #FFFFFF;
    cursor: pointer;
    outline: none;
    border: none;
    margin: 0 0 0 18px;
}
#search_main .search_input {
    width: 100%;
    border-radius: 3px;
    background: rgb(255, 255, 255);
    transition: all 0.125s linear 0s;
    outline-color: #2196f3;
    padding: 13px 20px 13px 20px;
    border: 0.5px solid #CCCCCC;
    box-shadow: 0px 0px 5px rgba(25, 39, 67, 0.1);
    border-radius: 7px;
    font-size: 17px;
    outline-color: #3751FF;
}
#client_data_main {
    margin: 64px 0 0 0;
    background-color: #F5FBFF;
    box-shadow: 0px 0px 5px rgb(25 39 67 / 10%);
    border-radius: 10px;
    padding: 40px 16px;
}
#client_data_main .clint_name_main {
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 35px;
    color: #000000c2;
    background: white;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.14), 0px 18px 40px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    padding: 14px;
    margin-top: 10px;
    cursor: pointer;
    transition: 0.5s ease-in-out;
}
#client_data_main .clint_name_main:hover {
    box-shadow:  0px 0px 1px rgba(0, 0, 0, 0.14);
}

#client_data_main .clint_name_main #no_clint {
    width: 20px;
    height: 20px;
    color: #0C1EFF;
    background: #F2F3FF;
    border-radius: 8px;
    padding: 10px;
    margin: 0 24px 0 0;
    font-size: 16px;
}
</style>