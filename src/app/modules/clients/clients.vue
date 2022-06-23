<template>
 <div class="app_container" style="background: white;grid-template-columns:1fr 2fr 5fr;box-sizing: border-box;width: 100%;">
      <div id="appSideMenu" class="app-side-menu" style="xxflex-basis:10%; margin: 0">
        <div id="menu_main">
        <button id="add_client" v-on:click="popToggle = !popToggle; clientPop = 'clientPopAdd'"><span id="add_client_span">+</span>Add Client</button>

        <p id="cient_categories" v-on:click="CategoriesFun()">Client Categories</p>
   <!-- <a href="#modal-center" uk-toggle>Open</a> -->
        <ul id="client_list" v-show="showCategories">
          <li id="client_people" v-for="(mockdata, index) in mockdata"
              :key="index"  v-on:click="clientNameToggleFun(index)">{{mockdata.name}}<span>({{mockdata.clients.length}})</span></li>
        </ul>
        </div>
      </div>   

<!-- <div id="modal-center" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

        <button class="uk-modal-close-default" type="button" uk-close></button>

    </div>
</div> -->




<!-- Cards Plane -->
      <div id="plane_3">
        <div v-for="(mockdata, index) in mockdata" :key="index" v-show="clientNameToggle === index">
       <h2 id="clients_plane" v-for="(clients, index) in mockdata.clients" :key="index">Clients<span id="clients_plane_span">({{index+1}})</span><img src="https://cdn.onlinewebfonts.com/svg/img_295694.png" id="drop_symbol"></h2>
        </div>
      <div id="plane3_wrapper">


<div id="plane3_card_main" v-for="(mockdata, index) in mockdata" :key="index" v-show="clientNameToggle === index">
    <div id="plane3_card"  v-for="(clients, index) in mockdata.clients" :key="index" v-on:click="cardClientToggle = clients.name" v-bind:class="cardClientToggle === clients.name && 'activePlane3_card'">
     <h3 id="plane3_card_title">{{clients.name}}</h3>
  <h3 id="plane3_taskno">
    <span id="plane3_span">#</span>Client ID: {{clients.id}} </h3>
    <div id="client_plane3_wrap">
      <div id="client_plane3">
        <img src="https://tse4.mm.bing.net/th?id=OIP.mth3YzskjFwKQauFzyafUwHaEK&amp;pid=Api&amp;P=0&amp;w=322&amp;h=181" alt="Time-Circle" id="p3_clint">
        <label id="count_label">{{mockdata.name}}</label></div>
        <div id="plane_month">
          <img src="https://i.ibb.co/R3y0x0Y/Time-Circle.png" alt="Time-Circle" id="p3_time">
          <label id="mon_label">{{clients.month}}</label>
          </div>
          </div>
          </div>
          </div>
       </div>
      </div>
 
<!-- plane4 -->
<div id="no_clients_selected_main" v-show="cardClientToggle === ''">
<p id="no_clients_selected">No clients selected...</p>
</div>
<div v-for="(mockdata, index) in mockdata" :key="index" v-show="clientNameToggle === index" style="width: inherit">
 <div id="plane_4" v-for="(clients, index) in mockdata.clients" :key="index" v-show="cardClientToggle === clients.name">

  <!-- Header -->
<div id="chart_headders">
  <div id="header_wrap">
    <img src="https://tse4.mm.bing.net/th?id=OIP.mth3YzskjFwKQauFzyafUwHaEK&amp;pid=Api&amp;P=0&amp;w=322&amp;h=181" alt="Time-Circle" id="p3_clint">
    <div id="head_prof">
      <h3 id="plane3_taskno">
        <span id="plane3_span">#</span>Client ID: {{clients.id}} </h3>
        <h3 id="plane3_card_title">{{clients.name}}</h3>
        <h2 id="plane3_cate">Category: <span id="plane3_cate_span">{{mockdata.name}}</span>
        </h2>
        </div>
        <button id="add_client" v-on:click="clientPop = 'clientPopEdit'; popToggle = !popToggle">
          <img src="https://i.ibb.co/Lh0dHzg/Stroke-3.png" alt="Stroke-3"></button>
          </div>
          </div>


          <!-- Task Tabs -->

          <div id="tab_switches">
            <ul id="switch_main">
              <li id="switch_tab_title" v-bind:class="tabToggleSwitch === 'Contacts' && 'switch_tab_title'" v-on:click="tabToggleSwitchFun('Contacts')">Contacts</li>
              <li id="switch_tab_title" v-bind:class="tabToggleSwitch === 'Activity' && 'switch_tab_title'" v-on:click="tabToggleSwitchFun('Activity')">Activity</li>
              <li id="switch_tab_title" v-bind:class="tabToggleSwitch === 'About' && 'switch_tab_title'" v-on:click="tabToggleSwitchFun('About')">About</li>
              <li id="switch_tab_title" v-bind:class="tabToggleSwitch === 'Tasks' && 'switch_tab_title'" v-on:click="tabToggleSwitchFun('Tasks')">Tasks</li>
              <li id="switch_tab_title" v-bind:class="tabToggleSwitch === 'Reminders' && 'switch_tab_title'" v-on:click="tabToggleSwitchFun('Reminders')">Reminders</li>    
            </ul>
          </div>








          <!-- contact -->

          <div id="main_container" v-show="tabToggleSwitch === 'Contacts'">
            <button id="add_client">
              <span id="add_client_span">+</span>
              Add Contact
              </button>
              <div class="contact_list">
                <p id="names" v-for="(contact, index) in clients.contact" :key=index>
                  {{contact.name}} <span id="minus">-</span>
                  <span id="designation">{{contact.role}}</span>
                  <span id="plus">+</span></p>
                       </div>
                       </div> 












      <!-- activity -->

         <div id="main_container" v-show="tabToggleSwitch === 'Activity'">
       <div id="comment_main">
           <textarea type="text" id="text_area" v-bind:class="commentBoxHeightToggle === true ? 'text_area' : 'text_area2'"
               v-model="post"
               placeholder="Post Your Comment" v-on:click="commentBoxFun()"></textarea>
           <div id="icons">
               <img src="https://cdn-icons-png.flaticon.com/512/237/237510.png"
                   v-on:click="postData('attach')" />
               <img src="https://icons.iconarchive.com/icons/praveen/minimal-outline/512/gallery-icon.png"
                   v-on:click="postData('png')" />
           </div>
           <div id="buttons">
               <button class="id_btn1"
                   v-on:click="postData">POST
                   COMMENT</button>
               <button class="id_btn2"
                   v-on:click="cancel()">CANCEL</button>
           </div>
       </div>

       <div class="task_container"
           id="task_container">
           <div class="task_wrapper"
               v-on:click="togglestate === 4 ? toggleFun('') : toggleFun(4)"
               v-for="(activity, index) in clients.activity" :key=index
               >
               <p class="token_no">{{index+1}}</p>
               <div class="task_main">
                   <h3 id="h2"
                       >
                       <span
                           style="margin: 0 10px 0 0; color: #000000;">By</span>
                       <span
                           style="font-size: 12px; font-weight: bold;">{{activity.name}}</span><span
                           class="c_type">{{activity.time}}</span><span
                           class="days">{{activity.date}}</span>
                   </h3>
                   <label
                       style="color: black; font-size: 14px; font-weight: 300;"
                       id="employeeNames"
                       v-if=" togglestate !== 4">{{activity.comment}}</label>
                   <div class="task_matter"
                       id="mycomment"
                       v-if="togglestate === 4">
                       <label
                           style="color: black; font-size: 14px; font-weight: 300;"
                           id="employeeNames">
                           dd</label>
                       <img src="https://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/document-icon.png"
                           style="width: 30px; height: 30px"
                           id="inner_icon" />
                   </div>
               </div>
           </div>
       </div>
   </div> 








   <!-- ABOUT Form -->

<div id="main_container_form" v-show="tabToggleSwitch === 'About'">
    <div id="form_wrap_total">
        <div class="form-main">
            <label
                class="form_label">Name</label>
            <input class="form_inputs"
                placeholder="Name" v-bind:value="clients.about.name"/>
        </div>
        <div class="form-main">
            <label
                class="form_label">Email</label>
            <input class="form_inputs"
                placeholder="user@gmail.com" v-bind:value="clients.about.mail"/>
        </div>

        <div class="form-main">
            <label
                class="form_label">Phone</label>
            <input class="form_inputs"
                placeholder="Phone" v-bind:value="clients.about.phone"/>
        </div>

        <div class="form-main">
            <label
                class="form_label">Website</label>
            <input class="form_inputs"
                placeholder="www.user.com" v-bind:value="clients.about.web"/>
        </div>

        <div class="form-main">
            <label class="form_label">Parent
                Organization</label>
            <select class="form_inputs" id="form_inputs"
                placeholder="Parent
            Organization">
                <option>USA</option>
                <option>Canada</option>
                <option>France</option>
                <option>Japan</option>
            </select>
        </div>

        <div class="form-main">
            <label
                class="form_label">Provience</label>
            <input class="form_inputs"
                placeholder="Provience" v-bind:value="clients.about.provience"/>
        </div>
        <div class="form-main">
            <label
                class="form_label">Address</label>
            <input class="form_inputs"
                placeholder="Address" v-bind:value="clients.about.Address"/>
        </div>
        <div class="form-main">
            <label
                class="form_label">City</label>
            <input class="form_inputs"
                placeholder="City" v-bind:value="clients.about.city"/>
        </div>
        <div class="form-main">
            <label
                class="form_label">Country</label>
            <input class="form_inputs"
                placeholder="Country" v-bind:value="clients.about.country"/>
        </div>
        <div class="form-main">
            <label
                class="form_label">Pin</label>
            <input class="form_inputs"
                placeholder="Pin" v-bind:value="clients.about.pin"/>
        </div>

        <div id="save_can_btns">
            <button
                class="save_btn">SAVE</button>
            <button
                class="can_btn">CANCEL</button>
        </div>
    </div>
</div>





<!-- Tasks -->
  <div id="main_container_form" v-show="tabToggleSwitch === 'Tasks'">
<div id="task_form_container">
    <button class="save_btn">ADD
        TASK</button>
    <div id="tasks_title">
        <div id="task_title_tab_main"><span
                id="task_title_tab">Task
                Id</span><span
                id="task_title_tab">Subject</span><span
                id="task_title_tab">Date
                Posted</span><span
                id="task_title_tab">By</span>
        </div>
    </div>

    <div id="tasks_main">
        <div id="tasks_main_tab"
            v-on:click="teskShowPop = true; popToggle = true"  v-for="(tasks, index) in clients.tasks" :key=index>
            <span>#{{tasks.id}}</span>
            <span>{{tasks.desc}}</span>
            <span>{{tasks.date}}</span>
            <span>{{tasks.creator}}</span>
        </div>
    </div>
</div>
</div> 



<!-- Popup -->
   <div id="pop_up_main" v-show="popToggle">
        <div id="pop_up_main_wrapper">
          <img src="https://i.ibb.co/DgkLsSC/Vector.png" alt="Vector" id="modal_close" v-on:click="popToggle = !popToggle">
       

<!-- Popup for add form -->
           <div id="main_container_form"  v-show="clientPop === 'clientPopAdd'">
          <div id="form_wrap_total">
    <div class="form-main" >
            <label
                class="form_label">Name</label>
            <input class="form_inputs"
                placeholder="Name" v-model="name"/>
        </div>
        <div class="form-main">
            <label
                class="form_label">Email</label>
            <input class="form_inputs"
                placeholder="user@gmail.com"  v-model="mail"/>
        </div>

        <div class="form-main">
            <label
                class="form_label">Phone</label>
            <input class="form_inputs"
                placeholder="Phone"  v-model="phone"/>
        </div>

        <div class="form-main">
            <label
                class="form_label">Website</label>
            <input class="form_inputs"
                placeholder="www.user.com" v-model="web"/>
        </div>

        <div class="form-main">
            <label class="form_label">Parent
                Organization</label>
            <select class="form_inputs" id="form_inputs"
                placeholder="Parent
            Organization">
                <option>USA</option>
                <option>Canada</option>
                <option>France</option>
                <option>Japan</option>
            </select>
        </div>

        <div class="form-main">
            <label
                class="form_label">Provience</label>
            <input class="form_inputs"
                placeholder="Provience" v-model="provience"/>
        </div>
        <div class="form-main">
            <label
                class="form_label">Address</label>
            <input class="form_inputs"
                placeholder="Address" v-model="Address"/>
        </div>
        <div class="form-main">
            <label
                class="form_label">City</label>
            <input class="form_inputs"
                placeholder="City" v-model="city"/>
        </div>
        <div class="form-main">
            <label
                class="form_label" >Country</label>
            <input class="form_inputs"
                placeholder="Country" v-model="country"/>
        </div>
        <div class="form-main">
            <label
                class="form_label" >Pin</label>
            <input class="form_inputs"
                placeholder="Pin" v-model="pin"/>
        </div>

        <div id="save_can_btns">
            <button
                class="save_btn" v-on:click="addClient()">SAVE</button>
            <button
                class="can_btn">CANCEL</button>
        </div>
    </div>
             </div>
       
       
       
       
       <!-- pop for edit form -->
        <div id="main_container_form" v-show="clientPop === 'clientPopEdit'">
    <div id="form_wrap_total">
        <div class="form-main">
            <label
                class="form_label">Name</label>
            <input class="form_inputs"
                placeholder="Name" v-bind:value="clients.about.name"/>
        </div>
        <div class="form-main">
            <label
                class="form_label">Email</label>
            <input class="form_inputs"
                placeholder="user@gmail.com" v-bind:value="clients.about.mail"/>
        </div>

        <div class="form-main">
            <label
                class="form_label">Phone</label>
            <input class="form_inputs"
                placeholder="Phone" v-bind:value="clients.about.phone"/>
        </div>

        <div class="form-main">
            <label
                class="form_label">Website</label>
            <input class="form_inputs"
                placeholder="www.user.com" v-bind:value="clients.about.web"/>
        </div>

        <div class="form-main">
            <label class="form_label">Parent
                Organization</label>
            <select class="form_inputs" id="form_inputs"
                placeholder="Parent
            Organization">
                <option>USA</option>
                <option>Canada</option>
                <option>France</option>
                <option>Japan</option>
            </select>
        </div>

        <div class="form-main">
            <label
                class="form_label">Provience</label>
            <input class="form_inputs"
                placeholder="Provience" v-bind:value="clients.about.provience"/>
        </div>
        <div class="form-main">
            <label
                class="form_label">Address</label>
            <input class="form_inputs"
                placeholder="Address" v-bind:value="clients.about.Address"/>
        </div>
        <div class="form-main">
            <label
                class="form_label">City</label>
            <input class="form_inputs"
                placeholder="City" v-bind:value="clients.about.city"/>
        </div>
        <div class="form-main">
            <label
                class="form_label">Country</label>
            <input class="form_inputs"
                placeholder="Country" v-bind:value="clients.about.country"/>
        </div>
        <div class="form-main">
            <label
                class="form_label">Pin</label>
            <input class="form_inputs"
                placeholder="Pin" v-bind:value="clients.about.pin"/>
        </div>

        <div id="save_can_btns">
            <button
                class="save_btn">SAVE</button>
            <button
                class="can_btn">CANCEL</button>
        </div>
    </div>
</div>

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
      showCategories: false,
      tabToggleSwitch: 'Contacts',
      commentBoxHeightToggle: false,
      clientNameToggle: 0,
      cardClientToggle: '',
      popToggle: false,
      clientPop: '',
      teskShowPop: false,
      name: "",
      mail: '',
      phone: '',
      web: '',
      prntOrg: '',
      provience: '',
      Address: '',
      city: '',
      country: '',
      pin: '',
      sameMockData: [],
      mockdata : [
        {name: 'USA',
        clients: [
          {
          name: 'Coco-cola',
          id: '1476',
          month: 'AUG',
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
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Manoj Ponugoti',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
          tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1781,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1782,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1783,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1784,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1785,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
           {
          name: 'Maza',
          id: '1376',
          month: 'AUG',
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
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Manoj Ponugoti',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
          tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
           {
          name: 'Mirinda',
          id: '1276',
          month: 'AUG',
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
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Manoj Ponugoti',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
          tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
           {
          name: 'Fizz',
          id: '1476',
          month: 'AUG',
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
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Manoj Ponugoti',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
          tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
           {
          name: 'Dite Coke',
          id: '1476',
          month: 'AUG',
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
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Manoj Ponugoti',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
          tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
          {
          name: 'Pepsi',
          id: '1479',
          month: 'AUG',
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
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
               tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          }
        ]
        },
        {name: 'France',
        clients: [
          {
          name: 'SipUp',
          id: '1476',
          month: 'AUG',
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
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
               tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
          {
          name: 'Fidisys',
          id: '1479',
          month: 'AUG',
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
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
               tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
          {
          name: 'Mirinda',
          id: '1480',
          month: 'AUG',
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
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
               tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
          },
        ]
        },
        {name: 'Canada',
        clients: [{
          name: 'Coco-cola',
          id: '1476',
          month: 'AUG',
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
          activity: [
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            },
            {
              comment: 'There is a comment',
              name: 'Vignesh Bhasker',
              time: '07:45PM',
              date: '01/05/2022'
            }
          ],
          about: {
            name: 'coco-cola',
            mail: 'coco@gmail.com',
            phone: '9494978553',
            web: 'www.coco.com',
            prntOrg: 'USA',
            provience: 'USA street',
            Address: 'XYZ street',
            city: 'XYZ city',
            country: 'XYZ country',
            pin: 'xyz'
          },
               tasks: [
            {
              id: 1736,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1737,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1738,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1739,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
             {
              id: 1780,
              desc: 'Fixed components at pepsi',
              date: '15/07/22',
              creator: 'Pawan'
            },
          ]
        }]
        }
      ],
      name: "",
    }
  },
  methods: {
   CategoriesFun() {
    this.showCategories = !this.showCategories;
    console.log(  this.showCategories)
   },
   tabToggleSwitchFun(e) {
     this.tabToggleSwitch = e;
   },
   commentBoxFun() {
    this.commentBoxHeightToggle = !this.commentBoxHeightToggle;
    console.log('commentBoxHeightToggle', this.commentBoxHeightToggle)
   },
   clientNameToggleFun(e) {
     this.clientNameToggle = e;
   },
    addClient() {
    const temp = [];
     temp.push({
            name: this.name,
            mail: this.mail,
            phone: this.phone,
            web: this.web,
            prntOrg: this.prntOrg,
            provience: this.provience,
            Address: this.Address,
            city: this.city,
            country: this.country,
            pin: this.pin
      });
      
      this.sameMockData = temp;
   }
  },
};
</script>

<style scoped>
/* side menu main */
#menu_main {
background: #f9faff;
height: 100%;
padding: 18px 26px;
}
#menu_main #add_client {
    width: 171px;
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
    margin: 0 0 31px 0;
}
#menu_main #add_client #add_client_span {
    font-size: 17px;
    margin: 0 10px 0 0;
}
#menu_main #cient_categories{
    color: rgb(51, 51, 51) ;
    font-weight: normal ;
    border: 1px solid rgb(229, 229, 229);
    background-color: rgb(236, 236, 236);
    border-radius: 50px;
    padding: 10px;
    margin: 10px 0;
}
#client_list {
  margin-top: 50px;
  padding: 0;
}
#client_list #client_people{
    display: flex;
    font-size: 14px;
    margin-top: 5px;
    cursor: pointer;
    padding: 10px 5px;
    justify-content: space-between;
}
#client_list #client_people:hover{
background: rgba(249, 246, 246, 0.546);
}








/* plane_3 */
#plane_3 {
  display: flex;
  flex-direction: column;
  padding: 0 15px;
}
#plane_3 #clients_plane {
    width: 119px;
    height: 36px;
    background: #FFFFFF;
    border: 0.5px solid #AAAAAA;
    border-radius: 4px;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0 30px 0;
    display: none;
}
#plane_3 #clients_plane:last-child {
  display: flex;
}
#plane_3 #clients_plane  #drop_symbol {
    width: 10px;
    height: 5px;
    margin: 0 0 0 10px;
}
#plane_3 #plane3_wrapper {
    display: flex;
    flex-direction: column;
    background: #F5FBFF;
    height: 590px;
    gap: 18px;
    padding: 10px;
    overflow: scroll;
    overflow-x: hidden;
}
#plane_3 #plane3_wrapper::-webkit-scrollbar {
  width: 3px;
}
#plane_3 #plane3_wrapper::-webkit-scrollbar-track {
  background: transparent;
}
#plane_3 #plane3_wrapper::-webkit-scrollbar-thumb {
  background: transparent;
}
#plane_3 #plane3_wrapper:hover::-webkit-scrollbar-thumb {
  background: rgba(85, 85, 85, 0.11);
}
#plane_3 #plane3_wrapper #plane3_card {
    background: #FFFFFF;
    box-shadow: 0px 0px 12px rgba(16, 38, 73, 0.06);
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    width: 288px;
    transition: 0.5s ease-in-out;
    margin-top: 20px;
}
#plane_3 #plane3_wrapper .activePlane3_card {
  border: 2px solid #0077D7;
}
#plane_3 #plane3_wrapper #plane3_card #plane3_card_title {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #200E32;
}
#plane_3 #plane3_wrapper #plane3_card #plane3_taskno {
    display: flex;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: #200E32;
    align-items: center;
    margin: 10px 0 14px 0;
}
#plane_3 #plane3_wrapper #plane3_card #plane3_taskno #plane3_span {
    font-weight: bold;
    border: 2px solid #200E32;
    width: 10px;
    height: 10px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 4px 0 0;
}
#client_plane3_wrap {
    display: flex;
    justify-content: space-between;
}
#plane_3 #plane3_wrapper #plane3_card #client_plane3 {
    display: flex;
    align-items: center;
}
#plane_3 #plane3_wrapper #plane3_card #client_plane3 #p3_clint {
    width: 26px;
    height: 26px;
    border-radius: 50px;
    border: 1.5px solid #2196f3;
}
#plane_3 #plane3_wrapper #plane3_card #client_plane3 #count_label {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
    margin: 0 0 0 10px;
}
#plane_3 #plane3_wrapper #plane3_card #plane_month {
    display: flex;
    background: #F2994A;
    border-radius: 3.87335px;
    padding: 1px 7px;
    justify-content: center;
    align-items: center;
}
#plane_3 #plane3_wrapper #plane3_card #plane_month  #mon_label {
    font-weight: 500;
    font-size: 10px;
    line-height: 15px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
    margin: 0 0 0 8px;
}
#plane_3 #plane3_wrapper #plane3_card #plane_month #p3_time {
    width: 11px;
    height: 11px;
}
















/* plane4 */
#plane_4 {
  display: flex;
  width: inherit;
  flex-direction: column;
  width: -webkit-fill-available;
  overflow: hidden;
}
#plane_4 #chart_headders #header_wrap {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 12px 16px 16px;
    background-color: #F5FBFF;
}
#header_wrap #p3_clint {
    width: 105px;
    height: 105px;
}
#p3_clint {
    width: 26px;
    height: 26px;
    border-radius: 50px;
    border: 1.5px solid #2196f3;
}
#head_prof {
    margin: 0 0 0 40px;
}
#plane3_taskno {
    display: flex;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: #200E32;
    align-items: center;
    margin: 10px 0 14px 0;
}
#plane3_taskno #plane3_span {
    font-weight: bold;
    border: 2px solid #200E32;
    width: 10px;
    height: 10px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 4px 0 0;
}
#head_prof #plane3_card_title {
    font-size: 30px;
    font-weight: 700;
    margin: 10px 0 0 0;
}
#plane3_cate {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 24px;
    color: #200E32;
    display: flex;
    align-items: center;
    margin: 15px 0 0 0;
}
#plane3_cate_span {
    background: #E6FCFF;
    border-radius: 4px;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 15px;
    display: flex;
    align-items: center;
    color: #03A1B7;
    margin: 0 0 0 10px;
    padding: 8px 12px;
    border-radius: 7px;
}
#chart_headders #add_client {
    width: 30px;
    border: none;
    outline: none;
    margin: 0 22px 0 auto;
    border-radius: 55px;
    height: 30px;
    cursor: pointer;
    background: #0077D7;
}
#chart_headders #add_client img {
    width: 14px;
}


/* Switch tabs */
#tab_switches {
    background: white !important;
    padding: 10px 10px 0 10px;
    border-top: 1px solid #dae8f9 !important;
    border-bottom: 1px solid #dae8f9 !important;
}
#tab_switches #switch_main {
  display: flex;
  margin: 0;
  padding: 0;
}
#tab_switches #switch_main #switch_tab_title {
  list-style-type:none;
  padding: 0 15px 8px 15px;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
#tab_switches #switch_main .switch_tab_title {
  color: #0077D7;
  border-bottom: 2px solid #0077D7;
}













/* contact */
#main_container {
    padding: 15px;
}
#main_container #add_client {
    width: 150px;
    margin: 0 0 45px auto;
}
#add_client {
    width: 171px;
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
    display: grid !important;
    max-width: 333px !important;
    margin: 15px 0 0 0 !important;
    font-size: 14px !important;
    font-weight: bold !important;
    grid-template-columns: 174px 33px 98px auto !important;
}
#main_container .contact_list #names #designation {
    font-size: 12px;
    font-weight: bold;
    color: #03fcb1;
}
#main_container .contact_list #names #plus {
    background: rgb(37, 139, 255);
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}














/* activity */
#text_area {
    width: -webkit-fill-available;
    border-radius: 3px;
    background: rgb(255, 255, 255);
    transition: all 0.125s linear 0s;
    outline-color: #2196f3;
    padding: 13px 20px 20px 20px;
    border: 0.5px solid #CCCCCC;
    box-shadow: 0px 0px 5px rgba(25, 39, 67, 0.1);
    border-radius: 7px;
    font-size: 14px;
}
.text_area {
   min-height: 113px;
}
.text_area2 {
   min-height: 40px;
}
#icons {
    display: flex;
    margin: 10px 0 0 0;
}
#icons img {
    width: 20px;
    height: 20px;
    cursor: pointer;
}
#icons img:nth-child(2) {
    width: 25px;
    height: 25px;
    margin: 0 0 0 10px;
}
#buttons {
    display: flex;
}
#buttons button {
    margin: 15px 0 0 0;
    background: #1565C0;
    border-radius: 6px;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    color: #FFFFFF;
    border: none;
    outline: none;
    width: 141px;
    height: 37px;
    cursor: pointer;
}
#buttons .id_btn2 {
    margin-left: 10px;
    background: #e5e5e5;
    border-radius: 8px;
    font-style: normal;
    font-weight: 600;
    color: #1565C0;
}
.task_container {
    height: -8px;
    background: #F5FBFF;
    padding: 20px 25px 55px 25px;
    margin: 30px 0 0 0;
    height: 190px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgb(25 39 67 / 10%);
    overflow: overlay;
    overflow-x: hidden;
}
.task_container::-webkit-scrollbar {
  width: 3px;
}
.task_container::-webkit-scrollbar-track {
  background: transparent;
}
.task_container::-webkit-scrollbar-thumb {
  background: transparent;
}
.task_container:hover::-webkit-scrollbar-thumb {
  background: rgba(85, 85, 85, 0.11);
}
.task_wrapper:nth-child(1) {
    padding: 30px 0 0 0;
}
.task_wrapper {
    position: relative;
    border-left: 1px dashed #785e5e;
    padding: 59px 0 0 0;
}
.task_wrapper .token_no {
    text-align: center;
    border-radius: 12px;
    position: absolute;
    color: #ffffff;
    background: #2196f3;
    font-size: .55rem;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    left: -13px;
}
.task_wrapper #h2 {
    font-size: 10px;
    font-weight: normal;
    color: rgb(33, 150, 243);
    position: absolute;
    top: 39px;
    right: 0;
    background: white;
    padding: 10px 5px 10px 26px;
    border-radius: 0 0 3px 20px;
    box-shadow: rgb(0 0 0 / 12%) 5px 7px 10px 0px;
}
.task_main {
    position: relative;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 3px;
    transition: .25s ease-in;
    box-shadow: rgb(0 0 0 / 31%) 5px 7px 10px 0px;
    background-color: white;
    width: fit-content;
    min-width: 300px;
    min-height: 30px;
    margin: 0 0 0 45px;
    cursor: pointer;
}
#outer_icon {
    position: absolute;
    right: -31px;
    width: 17px;
    height: 21px;
}
.task_wrapper h3 .c_type {
    color: rgb(26 29 32 / 85%);
    margin: 0 9px;
}
.task_wrapper h3 .days {
    color: rgb(179, 179, 179);
}

















/* contact form */
#main_container_form {
    background: white;
    border-radius: 30px;
    padding: 14px 0;
    height: 473px;
    overflow: scroll;
    overflow-x: hidden;
}
#main_container_form::-webkit-scrollbar {
  width: 3px;
}
#main_container_form::-webkit-scrollbar-track {
  background: transparent;
}
#main_container_form::-webkit-scrollbar-thumb {
  background: transparent;
}
#main_container_form:hover::-webkit-scrollbar-thumb {
  background: rgba(85, 85, 85, 0.11);
}
#form_wrap_total {
    background: #F5FBFF;
    border-radius: 8px;
    padding: 29px 25px 30px 25px;
    display: flex;
    flex-direction: column;
}
#add_client_modal #form_wrap_total {
    background: #F5FBFF;
    border-radius: 8px;
    padding: 29px 25px 30px 25px;
    display: flex;
    flex-direction: column;
    height: 73vh;
    overflow: scroll;
    overflow-x: hidden;
    width: 72vw;
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
    font-size: 16px;
    line-height: 24px;
    color: #333333;
    font-weight: 500;
}
.form-main .form_inputs {
    background: #FFFFFF;
border: 0.5px solid #CCCCCC;
box-shadow: 0px 0px 5px rgba(25, 39, 67, 0.1);
border-radius: 8px;
height: 17px;
padding: 12px 24px;
font-size: 16px;
margin:  10px 0 0 0;
}

.form-main #form_inputs {
  height: 40px;
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
    border-radius: 8px;
    padding: 12px 80px;
    font-size: 16px;
color: #FFFFFF;
border: none;
outline: none;
margin: 0 30px 0 0;
cursor: pointer;
}
#save_can_btns .can_btn {
    background: white;
    border-radius: 8px;
    padding: 12px 80px;
    font-size: 16px;
color: #1565C0;
border: none;
outline: none;
margin: 0 30px 0 0;
box-shadow: 0px 0px 5px rgba(25, 39, 67, 0.1);
cursor: pointer;
}


















/* Tasks */
#task_form_container {
    background-color: white;
    padding: 22px;
    display: flex;
    flex-direction: column;
}

#task_form_container .save_btn {
    background: #1565C0;
    border-radius: 8px;
    padding: 12px 35px;
    font-size: 12px;
    color: #FFFFFF;
    border: none;
    outline: none;
    cursor: pointer;
    width: 132px;
    margin: 0 0 50px auto;
    font-weight: bold;
}

#tasks_title #task_title_tab_main {
    display: flex;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.2px;
    color: #252733;
    justify-content:space-between;
}

 #task_title_tab_main #task_title_tab {
    background: #F2F3F7;
border-radius: 4px;
padding: 5px 25px;
}

#tasks_main {
    margin: 12px 0 0 0;
    background: #F5FBFF;
    border-radius: 8px;
    padding: 29px 25px 30px 25px;
    display: flex;
    flex-direction: column;
    height: 276px;
    overflow: scroll;
    overflow-x: hidden;
}
#tasks_main::-webkit-scrollbar {
  width: 3px;
}
#tasks_main::-webkit-scrollbar-track {
  background: transparent;
}
#tasks_main::-webkit-scrollbar-thumb {
  background: transparent;
}
#tasks_main:hover::-webkit-scrollbar-thumb {
  background: rgba(85, 85, 85, 0.11);
}
#tasks_main #tasks_main_tab {
    padding: 15px 10px;
    border-bottom: 1px solid #EDEDEE;
    cursor: pointer;
    font-size: 15px;
    display: grid;
    grid-template-columns: 27% 36% 33% 10%;
    font-weight: 500;
}


















/* POPUP */
#pop_up_main {
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #AAAAAA;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    left: 0;
}
#pop_up_main_wrapper {
  width: 90%;
  position: relative;
}
#pop_up_main_wrapper #modal_close {
    position: absolute;
    z-index: 50;
    right: -40px;
    cursor: pointer;
    top: -45px;
}
#pop_up_main #main_container_form {
  padding: 0;
  height: 562px;
}


#no_clients_selected_main {
display: flex;
justify-content: center;
align-items: center;
}
</style>