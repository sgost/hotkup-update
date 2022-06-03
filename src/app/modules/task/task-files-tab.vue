<template>

    <!-- <div style="padding: 5px 0px;margin-right:20px;margin-bottom: 10px;display: grid;grid-template-rows: 1fr;place-items: start;border-bottom: 1px solid #d0d0d0;">
        <button v-on:click="openFormTemplateAttachmentModal()"  class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color:#2196f3;border-radius: 3px;min-width: 100px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;display: inline-block;">
            <span uk-icon="icon:plus;ratio:0.65" class="uk-icon" style="">
              <svg width="13" height="13" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="plus">
                <rect x="9" y="1" width="1" height="17"></rect>
                <rect x="1" y="9" width="17" height="1"></rect>
              </svg>
            </span>
            <span style="padding-left: 10px;">Attach File</span>
        </button>
    </div> -->

    <div>
      <div v-show="attachedFiles.length==0" style="text-align:center;border-bottom: 0px;"> No files added </div>
        <div  v-show="attachedFiles.length>0"  class="attachedFile_row" style="background: #f2f2f2;border: 1px solid transparent;border-bottom: 0px;text-transform: uppercase;font-size: 0.55rem;">
            <div  style=";justify-self: end;flex-basis: 35%;">File Name</div>
            <div  style="color: rgb(51, 51, 51);flex-basis: 15%;">Attached on</div>
            <div  style="color: rgb(51, 51, 51);flex-basis: 15%;">Attached by</div>
            <div  style="color: rgb(51, 51, 51);flex-basis: 10%;">Type</div>
            <div  style="color: rgb(51, 51, 51);flex-basis: 10%;">Size</div>
            <div  style="color: rgb(51, 51, 51);flex-basis: 15%;">Actions</div>
        </div>
        <div v-show="attachedFiles.length>0"  class="activity_box" style="width: 100%;box-sizing: border-box;margin-left: 0px;margin-right: 0px;flex-direction: column;">

            <template v-for="attachedFile, idx in attachedFiles">

                <div class="attachedFile_row" >
                  <div style="font-weight:normal;flex-basis: 35%;" >
                    <a>
                    #{{idx + 1}} - {{attachedFile.name}}
                    </a>
                  </div>
                  <div style="color:#333;flex-basis: 15%;">{{attachedFile.createdOn}}</div>
                  <div style="color:#333;flex-basis: 15%;"><span v-if="attachedFile.senderInfo!==undefined && attachedFile.senderInfo!==null">{{attachedFile.senderInfo.split("#")[1]}}</span></div>
                  <div style="flex-basis: 10%;">
                      <span style="xcolor: rgb(46 166 253);text-transform: uppercase;font-size: 0.6rem;letter-spacing: 0.5px;">{{attachedFile.type}}</span>
                  </div>
                  <div style="flex-basis: 10%;">
                      <span style="xcolor: rgb(46 166 253);text-transform: uppercase;font-size: 0.6rem;letter-spacing: 0.5px;">{{attachedFile.size}}</span>
                  </div>
                  <div style="display:flex;column-gap:5px;flex-basis: 15%;">
                      <div uk-tooltip="Click to download file"
                           v-on:click="downloadFile(attachedFile.name)"><a>Download</a></div>
                  </div>
                </div>

            </template>
        </div>

    </div>
</template>

<script>

import userMixinLib from './../../mixins/lib/user_mixin_lib';
import utilsMixinLib from './../../mixins/lib/utils_lib';
import uiListMixinLib from './../../mixins/lib/ui-list.js';
import { bus } from './../../../main.js';

export default {
  mixins: [
    userMixinLib,
    utilsMixinLib,
    uiListMixinLib
  ],
  props: ['id', 'assignees', 'loggedInUser', 'taskSNO'],
  data: function () {
    return {
      attachedFiles: []
    };
  },
  methods: {

    formatBytes (bytes, decimals = 2) {

        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
    fetchAllFilesForTask () {

      this.attachedFiles = [];
      const url = './file-service/files/' + this.id + "/all";
      try {
        // VueJS ajax call-1
        axios.get(process.env.VUE_APP_API_URL + url)
          .then((dataResponse) => {
            console.log('Files List: ', dataResponse);
            const list = dataResponse.data;

            list.forEach((item) => {
              if (item.createdOn !== null) {

                item.createdOn = new Date(item.createdOn).toLocaleString()
                  .slice(0, 17)
                  .replace(',', '')
                  .replace('T', ' ');
              }

              item.size = this.formatBytes(item.size);

              item.hide = false;
              this.attachedFiles.push(item);
            });
          })
          .catch((error) => {
            console.error('fetchingFiles Error : ', error);
          });
      } catch (error) {
        console.error('Unpaginated List data fetch error : ', error);
      }
    },
    downloadFile (doc_id) {
      if (true) // has file download permissions check
      {
        try {
          const url = '/file-uploads/get/' + doc_id + '/download';
          var div = document.createElement('div');
          div.setAttribute('style', 'height:0px;display:none');
          document.body.appendChild(div);
          div.innerHTML = "<iframe width='0' height='0' scrolling='no' frameborder='0' src='" + url + "'></iframe>";
        } catch (e) {
          alert(e);
        }
      }
    }

  },
  created: function () {},
  computed: {
    storeCounter: function () {
      // console.log('Accessing vuex store ', this.$store)
      // console.log('Store data accessed from home page : ' + this.$store.getters.count)
      return this.$store.getters.count;
    }
  },
  mounted: function () {

    this.fetchAllFilesForTask();
  },
  unmounted: function () {



  },
  watch: {
    // Since we are passing an asynced data as 'availableItems', it is necessary to watch this prop when it receives new data.
    id: function (newId, oldId) {
      console.log("id in attachedFiles tab changed from " + oldId + " to " + newId);
      // this.loadSubtasks(); //();
      this.fetchAllFilesForTask();
    }

  }
};

</script>

<style>


  .attachedFile_row{
    position: relative;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50px;
    width:100%;
    box-sizing:border-box;
    -moz-column-gap: 20px;
    column-gap: 20px;
    border-bottom: 1px solid #f3f3f3;
    border-left: 5px solid transparent;
    background-color: rgb(255 255 255);
    font-size: 0.65rem;
  }

  .attachedFile_row:hover{
    border-left: 5px solid rgb(31 105 189);
  }

  .attachedFile_row>div{
    margin-bottom:0px;
  }
</style>
