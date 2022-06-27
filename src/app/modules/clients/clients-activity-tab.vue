<template>
    <div style="display: flex;flex-direction: column;flex-grow: 1;max-width: 100%;box-sizing: border-box;">

      <div style="padding: 5px 0px;margin-right: 20px;margin-bottom: 0px;display: grid;display:none;grid-template-rows: 1fr;place-items: flex-end;border-bottom: 0px solid rgb(208, 208, 208);">
          <button v-on:click="openPostCommentModal()"  class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color:#2196f3;border-radius: 3px;min-width: 100px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;display: inline-block;">
              <span uk-icon="icon:plus;ratio:0.65" class="uk-icon" style="">
                <svg width="13" height="13" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="plus">
                  <rect x="9" y="1" width="1" height="17"></rect>
                  <rect x="1" y="9" width="17" height="1"></rect>
                </svg>
              </span>
              <span style="padding-left: 10px;">Add comment</span>
          </button>
      </div>
      <div style="padding: 5px 0px;margin-right: 0px;margin-bottom: 0px;display: grid;grid-template-rows: 1fr;place-items: flex-start;border-bottom: 0px solid rgb(208, 208, 208);">
            <form  class="uk-grid-small uk-grid ui-form activity-comment-container" uk-grid="" style=";padding-bottom: 50px;width: 100%;place-self: center" onsubmit="console.log('Submitted.');return false;">
                <div class="uk-width-1-1" style="margin-top: 0px;position:relative">
                    <div>
                      <!-- <label class="uk-form-label" for="form-stacked-text" v-on:click="focusOn()">Post a comment <span style="text-transform:none;display:none">mentionedPeople are {{mentionedPeopleIds}} and mentionSearchKeyword is {{mentionSearchKeyword}}</span> </label> -->
                      <!-- <textarea tabindex="3" v-on:keydown="mentionListener($event)" v-model="taskActivityComment.description" class="uk-textarea" rows="3" placeholder="" style="width:100%;border-radius:3px"></textarea> -->
                      <div tabindex="3" id="ce_editor" contenteditable="true" v-on:focus="toggleCommentOptions(true, $event)" xv-on:blur="toggleCommentOptions(false)" v-on:keydown="mentionListener($event)" v-on:keyup="storeDescription($event)" class="uk-textarea dull-text" rows="3" placeholder="" style="width:100%;border-radius:3px;min-height:35px;background: #ffffff;transition: all 0.125s linear 0s;" >Post a comment..</div>
                      <div id="formattedContent" style="display:none"></div>
                      <div style="display:none"> {{formattedComment}}</div>
                    </div>
                    <div style="display:flex;width:100%;position:absolute" id="mentionListDropdownContainer">
                      <div class="mentionListDropdown hide_display custom-scroll-bar" v-on:mouseover="highlightMentionedOption($event)" v-on:click="handleMentionSelectionByMouseClick($event)">
                        <div class="mentionListItem" v-for="user in availableAssignees" v-bind:data-user-id="user.id" v-bind:data-user-firstname="user.firstName">
                          <div>{{user.firstName}} {{user.lastName}}</div>
                        </div>
                      </div>
                    </div>
                </div>

                <!-- <div>windowSelectionCache = {{windowSelectionCache}}</div> -->
                <div class="uk-width-1-1" style="display:none;margin-top: 5px;">
                    Description : {{taskActivityComment.description}}
                </div>


                <div v-if="showCommentOptions" class="uk-width-1-1" style="margin-top: 5px;">
                    <div class="attachments">

                      <div style="padding: 0px 0px;display: flex;height: fit-content;column-gap: 15px;">

                            <span uk-tooltip="Upload Document.<br> Only .csv, .xls, .xlsx, .doc, .docx, .pdf files accepted." v-on:click="uploadFileType('other')" style="cursor:pointer;display: grid; place-self: center flex-start;">
                              <i class="fas fa-paperclip" style="padding: 0px;font-size: 18px;color: rgb(141, 124, 124);display: grid;place-self: center;"></i>
                            </span>
                            <span uk-tooltip="Upload Image" v-on:click="uploadFileType('image')" style="cursor:pointer;display: grid; place-self: flex-start;">
                              <i class="fas fa-image" style="padding: 0px;font-size: 22px;color: rgb(141, 124, 124);display: grid;place-self: center;"></i>
                            </span>
                      </div>
                      <div v-show="isFileChosen" style="overflow-x: hidden;display: flex;flex-direction: column;row-gap: 5px;margin-top: 5px;">
                          <div v-for="selectedFile,index in chosenFiles" style="display: flex;column-gap: 5px;background: white;width: max-content;padding: 2px 10px;border-radius: 25px;border: 1px solid #8080804a;">
                              <div style="overflow-x: hidden;" v-on:click="alterArrayObjectValue()">{{selectedFile.name}}</div>
                              <div v-show="selectedFile.isUploaded===null || selectedFile.isUploaded===false" uk-tooltip="Remove File" v-on:click="removeAttachedFileAtIndex(index)" style="place-self: center flex-start;">
                                  <svg width="15" height="15" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="close" style="  background: white;border-radius: 50%;padding: 2px;cursor:pointer" >
                                      <path fill="none" stroke="red" stroke-width="1.06" d="M16,16 L4,4"></path>
                                      <path fill="none" stroke="red" stroke-width="1.06" d="M16,4 L4,16"></path>
                                  </svg>
                              </div>
                              <div v-show="selectedFile.isUploaded!==null && selectedFile.isUploaded" uk-tooltip="File uploaded" v-on:click="removeAttachedFileAtIndex(index)" style="place-self: center flex-start;">
                                  <svg width="15" height="15" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check"><polyline fill="none" stroke="#47adf9" stroke-width="2" points="4,10 8,15 17,4"></polyline></svg>
                              </div>
                          </div>
                      </div>

                      <div obsolete v-show="uploadActivityFile" style="position: absolute;bottom: 120px;right: 0px;left: 0px;height: 40px;z-index: 3;background: #4040408f;padding: 10px;border-bottom: 1px solid rgb(216, 216, 216);display: grid;grid-gap: 10px;place-content: center;">
                          <div v-show="!isFileChosen" id="fileUploadContainer" data-text="Choose File"  class="file-upload-wrapper" style="position: relative;height: 30px;width: 200px;">
                              <input multiple name="file" type="file" v-bind:id=" uniqueComponentId + '_fileUploadForm'" value="" v-on:change="onFileChosenImpl($event);" class="activity-tab file-upload-field" style="height: 30px;">
                          </div>
                          <div v-show="isFileChosen" style="overflow-x: hidden;display: grid;place-items: center;grid-template-columns: 1fr 50px;">
                              <div v-for="selectedFile,index in chosenFiles">
                                <div style="overflow-x: hidden;width: 100%;">{{selectedFile.name}}</div>
                                <div v-on:click="removeAttachedFile(index)">
                                    <span uk-icon="close" style="font-weight: bold;color: red;background: white;border-radius: 50%;padding: 5px;"></span>
                                </div>
                                <div >
                                    <span uk-icon="check" style="font-weight: bold;color: white;background: green;border-radius: 50%;padding: 5px;"></span>
                                </div>
                              </div>
                          </div>
                      </div>

                    </div>
                </div>
                <div v-if="showCommentOptions" class="uk-width-1-1" style="border-top: 0px solid rgb(241, 241, 241);padding: 20px 0px 0px;margin: 0px 0px 0px 15px;display: flex;flex-direction: column;">

                    <div style="display: flex;width:100%;place-self:center;">
                        <button v-bind:disabled="isFileUploading" tabindex="111" id="commentButton" v-on:click="saveActivityComment(null, null, $event)" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: #4caf50;border-radius: 3px;place-self: center;place-items: center;min-widthx: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;color: white;">
                          <div style="display: flex;justify-content: center;align-items: center;">
                            <div>
                              <span uk-icon="icon:comment;ratio:0.75" class="uk-icon"></span>
                            </div>
                            <div>&nbsp;&nbsp;&nbsp;Post Comment</div>
                            <div v-show="isFileUploading" style="margin-left: 10px;"><img src="/resources/images/processing.gif" style="height: 15px;background: white;"></div>
                          </div>
                        </button>
                        <!-- <button v-bind:disabled="isFileUploading" tabindex="111" id="sendEmailButton" v-on:click="sendEmailFromTemplate()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: #4caf50;border-radius: 3px;place-self: center;place-items: center;min-widthx: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;color: white;">
                          <div style="display: flex;justify-content: center;align-items: center;">
                            <div>
                              <span uk-icon="icon:comment;ratio:0.75" class="uk-icon"></span>
                            </div>
                            <div>&nbsp;&nbsp;&nbsp;Send Email</div>
                            <div v-show="isFileUploading" style="margin-left: 10px;"><img src="/resources/images/processing.gif" style="height: 15px;background: white;"></div>
                          </div>
                        </button> -->
                        <button tabindex="11" id="discardButton" v-on:click="toggleCommentOptions(false, $event)" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" data-v-2d9397b1="" style="background-color: rgb(234 234 234);border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: 10px;margin-top: 0px;color: #565656;"><div><div >Cancel</div></div></button>
                    </div>
                </div>
            </form>

      </div>

      <!--
      <div id="post-comment-modal" class="uk-flex-top" uk-modal>
          <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" style="width: 60%;font-size: 0.65rem;padding: 35px;border-radius: 5px;">
              <button class="uk-modal-close-default" type="button" uk-close></button>
              <form  class="uk-grid-small uk-grid ui-form" uk-grid="" style=";padding-bottom: 50px;width: 100%;place-self: center" onsubmit="console.log('Submitted.');return false;">
                      <div class="uk-width-1-1" style="margin-top: 0px;position:relative">
                          <div>
                            <label class="uk-form-label" for="form-stacked-text" v-on:click="focusOn()">Post a comment <span style="text-transform:none;display:nonex">mentionedPeople are {{mentionedPeopleIds}} and mentionSearchKeyword is {{mentionSearchKeyword}}</span> </label>
                            <div tabindex="3" id="ce_editor" contenteditable="true" v-on:focus="yoyo()" v-on:keydown="mentionListener($event)" v-on:keyup="storeDescription($event)" class="uk-textarea" rows="3" placeholder="" style="width:100%;border-radius:3px;min-height:75px"></div>
                            <div id="formattedContent" style="display:none"></div>
                            <div> {{formattedComment}}</div>
                          </div>
                          <div style="display:flex;width:100%;position:absolute" id="mentionListDropdownContainer">
                            <div class="mentionListDropdown hide_display custom-scroll-bar" v-on:click="handleMentionSelectionByMouseClick($event)">
                              <div class="mentionListItem" v-for="user in availableAssignees" v-bind:data-user-id="user.id" v-bind:data-user-firstname="user.firstName">
                                <div>{{user.firstName}} {{user.lastName}}</div>
                              </div>
                            </div>
                          </div>
                      </div>

                      <div class="uk-width-1-1" style="display:none;margin-top: 5px;">
                          Description : {{taskActivityComment.description}}
                      </div>


                      <div class="uk-width-1-1" style="margin-top: 5px;">
                          <div class="attachments">

                            <div style="padding: 0px 0px;display: flex;height: fit-content;column-gap: 15px;">

                                  <span uk-tooltip="Upload Document.<br> Only .csv, .xls, .xlsx, .doc, .docx, .pdf files accepted." v-on:click="uploadFileType('other')" style="cursor:pointer;display: grid; place-self: center flex-start;">
                                    <i class="fas fa-paperclip" style="padding: 0px;font-size: 18px;color: rgb(141, 124, 124);display: grid;place-self: center;"></i>
                                  </span>
                                  <span uk-tooltip="Upload Image" v-on:click="uploadFileType('image')" style="cursor:pointer;display: grid; place-self: flex-start;">
                                    <i class="fas fa-image" style="padding: 0px;font-size: 22px;color: rgb(141, 124, 124);display: grid;place-self: center;"></i>
                                  </span>
                            </div>
                            <div v-show="isFileChosen" style="overflow-x: hidden;display: flex;flex-direction: column;row-gap: 5px;margin-top: 5px;">
                                <div v-for="selectedFile,index in chosenFiles" style="display:flex;column-gap:5px;">
                                    <div style="overflow-x: hidden;" v-on:click="alterArrayObjectValue()">{{selectedFile.name}}</div>
                                    <div v-show="selectedFile.isUploaded===null || selectedFile.isUploaded===false" uk-tooltip="Remove File" v-on:click="removeAttachedFileAtIndex(index)" style="place-self: center flex-start;">
                                        <svg width="15" height="15" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="close" style="  background: white;border-radius: 50%;padding: 2px;cursor:pointer" >
                                            <path fill="none" stroke="red" stroke-width="1.06" d="M16,16 L4,4"></path>
                                            <path fill="none" stroke="red" stroke-width="1.06" d="M16,4 L4,16"></path>
                                        </svg>
                                    </div>
                                    <div v-show="selectedFile.isUploaded!==null && selectedFile.isUploaded" uk-tooltip="File uploaded" v-on:click="removeAttachedFileAtIndex(index)" style="place-self: center flex-start;">
                                        <svg width="15" height="15" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check"><polyline fill="none" stroke="#47adf9" stroke-width="2" points="4,10 8,15 17,4"></polyline></svg>
                                    </div>
                                </div>
                            </div>

                            <div obsolete v-show="uploadActivityFile" style="position: absolute;bottom: 120px;right: 0px;left: 0px;height: 40px;z-index: 3;background: #4040408f;padding: 10px;border-bottom: 1px solid rgb(216, 216, 216);display: grid;grid-gap: 10px;place-content: center;">
                                <div v-show="!isFileChosen" id="fileUploadContainer" data-text="Choose File"  class="file-upload-wrapper" style="position: relative;height: 30px;width: 200px;">
                                    <input multiple name="file" type="file" v-bind:id=" uniqueComponentId + '_fileUploadForm'" value="" v-on:change="onFileChosenImpl($event);" class="activity-tab file-upload-field" style="height: 30px;">
                                </div>
                                <div v-show="isFileChosen" style="overflow-x: hidden;display: grid;place-items: center;grid-template-columns: 1fr 50px;">
                                    <div v-for="selectedFile,index in chosenFiles">
                                      <div style="overflow-x: hidden;width: 100%;">{{selectedFile.name}}</div>
                                      <div v-on:click="removeAttachedFile(index)">
                                          <span uk-icon="close" style="font-weight: bold;color: red;background: white;border-radius: 50%;padding: 5px;"></span>
                                      </div>
                                      <div >
                                          <span uk-icon="check" style="font-weight: bold;color: white;background: green;border-radius: 50%;padding: 5px;"></span>
                                      </div>
                                    </div>
                                </div>
                            </div>

                          </div>
                      </div>
                      <div class="uk-width-1-1" style="border-top: 0px solid rgb(241, 241, 241);padding: 20px 0px 0px;margin: 0px 0px 0px 15px;display: flex;flex-direction: column;">

                          <div style="display: flex;width:100%;place-self:center;">
                              <button v-bind:disabled="isFileUploading" tabindex="111" id="commentButton" v-on:click="saveActivityComment()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: #4caf50;border-radius: 3px;place-self: center;place-items: center;min-widthx: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;color: white;">
                                <div style="display: flex;justify-content: center;align-items: center;">
                                  <div>
                                    <span uk-icon="icon:comment;ratio:0.75" class="uk-icon"></span>
                                  </div>
                                  <div>&nbsp;&nbsp;&nbsp;Post Comment</div>
                                  <div v-show="isFileUploading" style="margin-left: 10px;"><img src="/resources/images/processing.gif" style="height: 15px;background: white;"></div>
                                </div>
                              </button>
                              <button tabindex="11" id="discardButton" v-on:click="closePostCommentModal()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" data-v-2d9397b1="" style="background-color: rgb(234 234 234);border-radius: 3px;place-self: center;place-items: center;min-width: 125px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-left: 10px;margin-top: 0px;color: #565656;"><div><div >Cancel</div></div></button>
                          </div>
                      </div>
                  </form>
          </div>
      </div>
      -->

      <div style="display:flex;justify-content:flex-end">
        <div v-on:click="showDetailEvents()" class="hotkup-toggle-btn">
          <div style="text-transform: uppercase;letter-spacing: 0.02rem;font-size: 0.55rem;">Show Details</div>
          <div class="toggle-button activity_details_toggle_button">
            <div></div>
          </div>
        </div>
      </div>
      <div class="first_column_scrollable custom-scroll-bar activities_list" style="border-top:0px solid gray;margin-top:10px;position:relative;flex-grow: 1;" v-on:clickXX="openContextMenu($event)" >

          <template v-for="activity,idx in availableActivities">

                <div class="activity_box fade_reveal" >
                    <div style="border-right:1px dashed #cecece"></div>

                    <div style="display:flex;flex-direction:column;margin-bottom: 20px;">

                        <div class="activity_description">
                          <!-- <div> {{activity.type}} </div> -->
                          <!-- <div> {{activity.id}} </div> -->


                          <div v-if="activity.type=='NEW_COMMENT'">
                              <span class="activity-sno">{{activity.reversedSno}}</span>

                              <div  v-on:click="toggleActivityDetail($event)"  style="cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: center;" >
                                <span style="font-weight: normal;color: #2196F3;">{{activity.createdBy.split("#")[0]}}</span> &nbsp; commented
                                <span v-if="activity.comment!==null" v-html="'&nbsp;' + activity.commentHint.substring(0, 30) + '..'" ></span>
                                <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;" v-bind:title="activity.createdOnFormatted" v-bind:originalDate="activity.createdOn">&nbsp; {{activity.createdOnAgo}}</span>
                                <span v-bind:data-activity-id="activity.id"
                                      v-bind:data-task-id="activity.taskId"
                                      v-bind:data-createdby-id="activity.createdById"
                                      v-bind:data-activity-type="activity.type"
                                      class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                  <svg style="pointer-events: none;" width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                </span>
                              </div>
                              <div  class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;padding-top: 5px;border-left: 3px solid coral;padding: 5px 10px;background: white;border-radius: 0px;">
                                  <div style="flex-basis: 15px;    min-width: 15px;"><span uk-icon="quote-right" class="uk-icon" style="color: #bdbdbd; "></span></div>
                                  <div style="white-space: pre-wrap;word-break: break-word;" v-html="activity.comment"></div>
                              </div>
                              <div class="activity_detail hide_activity_detail" style="font-weight: normal;font-size: 0.75rem;color: rgb(179, 179, 179);margin-top: 15px;margin-bottom: 15px;" v-if="activity.hasAttachments!==null && activity.hasAttachments===true">
                                  <div v-for="attachment in activity.formAttachments">
                                      <div style="display: flex;column-gap: 5px;align-items: center;">
                                        <span uk-tooltip="Upload Document.<br> Only .csv, .xls, .xlsx, .doc, .docx, .pdf files accepted." data-v-6ad5a684="" style="cursor: pointer; display: grid; place-self: center flex-start;" title="" aria-expanded="false"><svg class="svg-inline--fa fa-paperclip fa-w-14" data-v-6ad5a684="" style="padding: 0px; font-size: 12px; color: rgb(141, 124, 124); display: grid; place-self: center;" aria-hidden="true" data-fa-processed="" data-prefix="fas" data-icon="paperclip" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M43.246 466.142c-58.43-60.289-57.341-157.511 1.386-217.581L254.392 34c44.316-45.332 116.351-45.336 160.671 0 43.89 44.894 43.943 117.329 0 162.276L232.214 383.128c-29.855 30.537-78.633 30.111-107.982-.998-28.275-29.97-27.368-77.473 1.452-106.953l143.743-146.835c6.182-6.314 16.312-6.422 22.626-.241l22.861 22.379c6.315 6.182 6.422 16.312.241 22.626L171.427 319.927c-4.932 5.045-5.236 13.428-.648 18.292 4.372 4.634 11.245 4.711 15.688.165l182.849-186.851c19.613-20.062 19.613-52.725-.011-72.798-19.189-19.627-49.957-19.637-69.154 0L90.39 293.295c-34.763 35.56-35.299 93.12-1.191 128.313 34.01 35.093 88.985 35.137 123.058.286l172.06-175.999c6.177-6.319 16.307-6.433 22.626-.256l22.877 22.364c6.319 6.177 6.434 16.307.256 22.626l-172.06 175.998c-59.576 60.938-155.943 60.216-214.77-.485z"></path></svg><!-- <i class="fas fa-paperclip" data-v-6ad5a684="" style="padding: 0px; font-size: 18px; color: rgb(141, 124, 124); display: grid; place-self: center;"></i> --></span>
                                        <span> <a v-on:click="downloadFile(attachment.name)">{{attachment.name}}</a></span>
                                        <span v-if="attachment.size!==null && attachment.size>0" style="font-weight: normal;font-size: 0.55rem;color: rgb(106 119 102);padding-top: 2px;">
                                          <a style="color:inherit;text-decoration:none;">{{attachment.formattedSize}}</a>
                                        </span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div v-if="activity.type=='NEW_SUBTASK'">
                              <span class="activity-sno">{{activity.reversedSno}}</span>
                              <div  v-on:click="toggleActivityDetail($event)"  style="cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: center;">
                                <span style="font-weight: normal;color: #2196F3;">{{activity.createdBy.split("#")[0]}}</span> &nbsp;  added subtask Task#{{activity.subTask.sno}}.
                                <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;" v-bind:title="activity.createdOnFormatted">&nbsp; {{activity.createdOnAgo}}</span>
                                <span v-bind:data-activity-id="activity.id"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                  <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                </span>
                              </div>

                              <div  class="activity_detail hide_activity_detail" style="column-gap: 20px;margin-top: 15px;margin-bottom: 15px;padding-top: 5px;border-left: 3px solid coral;padding: 5px 10px;background: white;border-radius: 0px;">
                                  <div ><a v-on:click="openSubTask(activity.subTask.id)">Task #{{activity.subTask.sno}}</a> {{activity.subTask.name}}</div>
                              </div>
                          </div>

                          <div v-else-if="activity.type=='NEW_TASK'">
                              <span class="activity-sno">{{activity.reversedSno}}</span>
                              <div v-on:click="toggleActivityDetail($event)"  style="cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: center;">
                                <span style="font-weight: normal;color: #2196F3;">{{activity.createdBy.split("#")[1]}}</span> &nbsp; created task.
                                <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;" v-bind:title="activity.createdOnFormatted">&nbsp; {{activity.createdOnAgo}}</span>
                                <span v-bind:data-activity-id="activity.id"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                  <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                </span>
                              </div>

                              <div v-if="activity.initialPropertyValues!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-right: 15px;margin-bottom: 15px;background: white;border-radius: 0px;align-items: flex-start;display: flex;flex-direction: column;" >
                                  <template v-for="propAdded in activity.initialPropertyValues">
                                      <div v-if="propAdded.label!=='id'" style="display:flex;column-gap:5px;padding-left:30px;;padding-top: 5px;align-items: center;">
                                          <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.055rem;;min-widthxx:150px;text-align:right;min-width:125px;opacity: 0.5;">{{propAdded.label}} - </div>
                                          <div v-if="propAdded.initialValue!==null" style="white-space: pre-wrap;word-break: break-word;">
                                            <span v-if="propAdded.label==='sno'">Task#{{propAdded.initialValue}}</span>
                                            <span v-else>{{propAdded.initialValue}}</span>
                                          </div>
                                          <div v-else-if="propAdded.initialDate!==null">{{propAdded.initialDate}}</div>
                                          <div v-else-if="propAdded.embeddedReference!==null">{{propAdded.embeddedReference.label}}</div>
                                          <div v-else-if="propAdded.initialReferences!==null" style="display:flex;column-gap:5px">
                                              <div v-for="item, idx in propAdded.initialReferences">
                                                {{item.label}}
                                                <span v-if="idx < propAdded.initialReferences.length-1">, </span>
                                              </div>
                                          </div>
                                      </div>
                                  </template>
                              </div>
                          </div>


                          <div v-else-if="showActivityDetails && activity.type=='TASK_INFO_CHANGES'">
                              <span class="activity-sno">{{activity.reversedSno}}</span>
                              <div v-on:click="toggleActivityDetail($event)"  style="cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: center;">
                                <span style="font-weight: normal;color: #2196F3;">{{activity.createdBy.split("#")[0]}}</span> &nbsp; updated task.
                                <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;" v-bind:title="activity.createdOnFormatted">&nbsp; {{activity.createdOnAgo}}</span>
                                <span v-bind:data-activity-id="activity.id"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                  <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                </span>
                              </div>

                              <div v-if="activity.propertyChanges!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;align-items: center;" >
                                  <template v-for="propChanged in activity.propertyChanges">
                                      <div style="display:flex;column-gap:5px;padding-left:30px;;padding-top: 5px;align-items: center;">
                                          <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.055rem;;min-width:125px;text-align:right;opacity: 0.5;">{{propChanged.label}} - </div>
                                          <div v-if="propChanged.to!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.to}}</div>
                                          <div v-if="propChanged.fromObjectValue!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.fromObjectValue.label}}</div>
                                          <div v-if="propChanged.toObjectValue!=null" style="white-space: pre-wrap;word-break: break-word;"> &#8594; {{propChanged.toObjectValue.label}}</div>

                                          <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                          <div v-else-if="propChanged.referenceLabels!=null">
                                              <div v-if="propChanged.label=='assignees removed'" style="text-decoration: line-through;text-decoration-color: red;">{{propChanged.referenceLabels.join(", ")}}</div>
                                              <div v-else>{{propChanged.referenceLabels.join(", ")}}</div>
                                          </div>
                                          <div v-else-if="propChanged.changedReferences!=null" style="display:flex;gap:5px">

                                              <div v-for="changedObject, idx in propChanged.changedReferences">
                                                  <div v-bind:data-id="changedObject.id">
                                                    {{changedObject.label}}
                                                    <span v-if="idx < propChanged.changedReferences.length-1">, </span>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </template>
                              </div>
                          </div>

                          <div v-else-if="showActivityDetails && activity.type=='TASK_CHECKLIST_ITEM_ADDED'" style="flex-grow: 1;width: 100%;">
                              <span class="activity-sno">{{activity.reversedSno}}</span>
                              <div v-on:click="toggleActivityDetail($event)"  class="list-item-row-1" style="cursor:pointer;user-select:none;font-weight: normal; position: relative; min-height: 35px; display: flex; justify-content:flex-start; align-items: center;">
                                <div style="font-weight: normal;flex-grow: 1;display: flex;align-items: center;">
                                  <span style="font-weight: normal;color: #2196F3;">{{activity.createdBy.split("#")[0]}}</span> &nbsp;added checklist item.
                                  <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;" v-bind:title="activity.createdOnFormatted" v-bind:originalDate="activity.createdOn">&nbsp; {{activity.createdOnAgo}}</span>
                                  <span v-bind:data-activity-id="activity.id"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                    <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                  </span>
                                </div>
                              </div>
                              <div v-if="activity.checklistItems!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;">
                                  <template v-for="checklistItem in activity.checklistItems">
                                    <div style="display:flex;flex-direction:row;column-gap:0px;padding-left:0px;;padding-top: 5px;">
                                        <div style="display: flex;column-gap: 20px;margin-top: 0px;padding: 5px 10px;border-left: 3px solid coral;background: white;border-radius: 0px;align-items: center;justify-content: center;">
                                            <div style="border: 1px solid rgb(85, 85, 85); height: 10px; width: 10px; display: grid; cursor: pointer;">
                                              <span uk-icon="check" style="background: rgb(31, 105, 189); color: white; display: none;" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg>
                                              </span>
                                            </div><!---->
                                            <div style="flex: 1 1 0%;">{{checklistItem.label}}</div>
                                        </div>
                                    </div>
                                  </template>
                              </div>
                          </div>
                          <div v-else-if="showActivityDetails && activity.type=='TASK_CHECKLIST_ITEM_UPDATED'" style="flex-grow: 1;width: 100%;">
                              <span class="activity-sno">{{activity.reversedSno}}</span>
                              <div v-on:click="toggleActivityDetail($event)"  class="list-item-row-1" style="cursor:pointer;user-select:none;font-weight: normal; position: relative; min-height: 35px; display: flex; justify-content:flex-start; align-items: center;">
                                <div style="font-weight: normal;flex-grow: 1;display: flex;align-items: center;">
                                  <span style="font-weight: normal;color: #2196F3;">{{activity.createdBy.split("#")[0]}}</span> &nbsp; updated checklist item.
                                  <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;" v-bind:title="activity.createdOnFormatted">&nbsp; {{activity.createdOnAgo}}</span>
                                  <span v-bind:data-activity-id="activity.id"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                    <svg style="pointer-events: none;" width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                  </span>
                                </div>
                              </div>
                              <div v-if="activity.checklistItems!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;">
                                  <template v-for="checklistItem in activity.checklistItems">
                                    <div style="display:flex;flex-direction:row;column-gap:0px;padding-left:0px;;padding-top: 5px;">
                                        <div style="display: flex;column-gap: 20px;margin-top: 0px;padding: 5px 10px;border-left: 3px solid coral;background: white;border-radius: 0px;align-items: center;justify-content: center;">
                                            <div style="border: 1px solid rgb(85, 85, 85); height: 10px; width: 10px; display: grid; cursor: pointer;">
                                              <span uk-icon="check" style="background: rgb(31, 105, 189); color: white; display: none;" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg>
                                              </span>
                                            </div><!---->
                                            <div style="flex: 1 1 0%;">{{checklistItem.label}}</div>
                                        </div>
                                    </div>
                                  </template>
                              </div>
                          </div>
                          <div v-else-if="showActivityDetails && activity.type=='TASK_CHECKLIST_ITEM_STATUS_UPDATE'" style="flex-grow: 1;width: 100%;">
                              <span class="activity-sno">{{activity.reversedSno}}</span>
                              <div  v-on:click="toggleActivityDetail($event)" class="list-item-row-1" style="cursor:pointer;user-select:none;font-weight: normal; position: relative; min-height: 35px; display: flex; justify-content:flex-start; align-items: center;">
                                <div style="font-weight: normal;flex-grow: 1;display: flex;align-items: center;">
                                  <span style="font-weight: normal;color: #2196F3;">{{activity.createdBy.split("#")[0]}}</span> &nbsp;updated checklist status.
                                  <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;" v-bind:title="activity.createdOnFormatted">&nbsp; {{activity.createdOnAgo}}</span>
                                  <span v-bind:data-activity-id="activity.id"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                    <svg style="pointer-events: none;" width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                  </span>
                                </div>
                              </div>
                              <div v-if="activity.checklistItems!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;">
                                  <template v-for="checklistItem in activity.checklistItems">
                                    <div style="display:flex;flex-direction:row;column-gap:0px;padding-left:0px;;padding-top: 5px;">
                                        <div style="display: flex;column-gap: 20px;margin-top: 0px;padding: 5px 10px;border-left: 3px solid coral;background: white;border-radius: 0px;align-items: center;justify-content: center;">
                                            <div v-if="checklistItem.status==='COMPLETED'" style="border: 1px solid rgb(85, 85, 85); height: 10px; width: 10px; display: grid; cursor: pointer;">
                                              <span uk-icon="check" style="background: rgb(31, 105, 189); color: white;" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg>
                                              </span>
                                            </div><!---->
                                            <div v-else-if="checklistItem.status!=='COMPLETED'" style="border: 1px solid rgb(85, 85, 85); height: 10px; width: 10px; display: grid; cursor: pointer;">
                                              <span uk-icon="check" style="background: rgb(31, 105, 189); color: white; display: none;" class="uk-icon">
                                                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg>
                                              </span>
                                            </div><!---->
                                            <div v-if="checklistItem.status==='COMPLETED'" style="flex: 1 1 0%;text-decoration: line-through red;">{{checklistItem.label}}</div>
                                            <div v-else-if="checklistItem.status!=='COMPLETED'" style="flex: 1 1 0%;">{{checklistItem.label}}</div>
                                        </div>
                                    </div>
                                  </template>
                              </div>
                          </div>

                          <div v-else-if="showActivityDetails && activity.type=='TASK_REMINDER_ADDED' ">
                              <span class="activity-sno">{{activity.reversedSno}}</span>
                              <div v-on:click="toggleActivityDetail($event)"  style="cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: center;">
                                <span style="font-weight: normal;color: #2196F3;">{{activity.createdBy.split("#")[0]}}</span> &nbsp; added reminder.
                                <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;" v-bind:title="activity.createdOnFormatted">&nbsp; {{activity.createdOnAgo}}</span>
                                <span v-bind:data-activity-id="activity.id"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                  <svg style="pointer-events: none;" width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                </span>
                              </div>
                              <div v-if="activity.propertyChanges!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;">
                                  <template v-for="propChanged in activity.propertyChanges">
                                      <div style="display:flex;column-gap:20px;padding-left:30px;;padding-top: 5px;">
                                          <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.055rem;;min-widthx:150px;text-align:right">{{propChanged.label}} - </div>
                                          <div v-if="propChanged.to!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.to}}</div>
                                          <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                          <div v-else-if="propChanged.referenceLabels!=null">
                                              <div v-if="propChanged.label=='assignees removed'" style="text-decoration: line-through;text-decoration-color: red;">{{propChanged.referenceLabels.join(", ")}}</div>
                                              <div v-else>{{propChanged.referenceLabels.join(", ")}}</div>
                                          </div>
                                      </div>
                                  </template>
                              </div>
                          </div>
                          <div v-else-if="showActivityDetails && activity.type=='TASK_REMINDER_CHANGES' ">
                              <span class="activity-sno">{{activity.reversedSno}}</span>
                              <div v-on:click="toggleActivityDetail($event)"  style="cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: center;">
                                <span style="font-weight: normal;color: #2196F3;">{{activity.createdBy.split("#")[0]}}</span> &nbsp; updated reminder.
                                <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;" v-bind:title="activity.createdOnFormatted">&nbsp; {{activity.createdOnAgo}}</span>
                                <span v-bind:data-activity-id="activity.id"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                  <svg style="pointer-events: none;"  width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                </span>
                              </div>
                              <div v-if="activity.propertyChanges!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;">
                                  <template v-for="propChanged in activity.propertyChanges">
                                      <div style="display:flex;column-gap:20px;padding-left:30px;;padding-top: 5px;">
                                          <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.055rem;min-widthx:150px;text-align:right">{{propChanged.label}} - </div>
                                          <div v-if="propChanged.to!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.to}}</div>
                                          <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                          <div v-else-if="propChanged.referenceLabels!=null">
                                              <div v-if="propChanged.label=='assignees removed'" style="text-decoration: line-through;text-decoration-color: red;">{{propChanged.referenceLabels.join(", ")}}</div>
                                              <div v-else>{{propChanged.referenceLabels.join(", ")}}</div>
                                          </div>
                                      </div>
                                  </template>
                              </div>
                          </div>
                          <div v-else-if="showActivityDetails && activity.type=='TASK_TIMELOG_ADDED'">
                              <span class="activity-sno">{{activity.reversedSno}}</span>
                              <div v-on:click="toggleActivityDetail($event)"  style="cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: center;">
                                <span style="font-weight: normal;color: #2196F3;">{{activity.createdBy.split("#")[0]}}</span> &nbsp; added timelog.
                                <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;" v-bind:title="activity.createdOnFormatted">&nbsp; {{activity.createdOnAgo}}</span>
                                <span v-bind:data-activity-id="activity.id"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                  <svg style="pointer-events: none;" width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                </span>
                              </div>
                              <div v-if="activity.propertyChanges!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;">
                                  <template v-for="propChanged in activity.propertyChanges">
                                      <div style="display:flex;column-gap:20px;padding-left:30px;;padding-top: 5px;">
                                          <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.055rem;;min-widthx:150px;text-align:right">{{propChanged.label}} - </div>
                                          <div v-if="propChanged.to!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.to}}</div>
                                          <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                      </div>
                                  </template>
                              </div>
                          </div>
                          <div v-else-if="showActivityDetails && activity.type=='TASK_TIMELOG_CHANGES'">
                              <span class="activity-sno">{{activity.reversedSno}}</span>
                              <div v-on:click="toggleActivityDetail($event)"  style="cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: center;">
                                <span style="font-weight: normal;color: #2196F3;">{{activity.createdBy.split("#")[0]}}</span> &nbsp; updated timelog.
                                <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;" v-bind:title="activity.createdOnFormatted">&nbsp; {{activity.createdOnAgo}}</span>
                                <span v-bind:data-activity-id="activity.id"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                  <svg style="pointer-events: none;" width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                </span>
                              </div>
                              <div v-if="activity.propertyChanges!=null" class="activity_detail hide_activity_detail" style="gap: 7px 10px;margin-top: 15px;margin-bottom: 15px;background: white;border-radius: 0px;">
                                  <template v-for="propChanged in activity.propertyChanges">
                                      <div style="display:flex;column-gap:20px;padding-left:30px;;padding-top: 5px;">
                                          <div style="text-transform: uppercase;font-size: .55rem!important;border-radius: 0;letter-spacing: 0.055rem;;min-widthx:150px;text-align:right">{{propChanged.label}} - </div>
                                          <div v-if="propChanged.to!=null" style="white-space: pre-wrap;word-break: break-word;">{{propChanged.to}}</div>
                                          <div v-else-if="propChanged.toDate!=null">{{propChanged.toDate}}</div>
                                      </div>
                                  </template>
                              </div>
                          </div>

                          <div v-else-if="activity.type=='TASK_FORM_ATTACHED'">
                              <span class="activity-sno">{{activity.reversedSno}}</span>
                              <div v-on:click="toggleActivityDetail($event)"  style="cursor:pointer;user-select:none;font-weight: normal;position: relative;min-height: 35px;display: flex;justify-content:flex-start;align-items: center;">
                                <span style="font-weight: normal;color: #2196F3;">{{activity.createdBy.split("#")[0]}}</span> &nbsp; {{activity.typeLabel}}
                                <span style="font-weight: normal;font-size: 0.55rem;;color: #b3b3b3;" v-bind:title="activity.createdOnFormatted">&nbsp; {{activity.createdOnAgo}}</span>
                                <span v-bind:data-activity-id="activity.id"  class="openActivityDetailTrigger activity_detail_trigger"  style="user-select: none;" title="" aria-expanded="false">
                                  <svg style="pointer-events: none;" width="17" height="17" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>
                                </span>
                              </div>
                              <div class="just_for_debugging">{{activity.formAttachmentInfo}} </div>

                              <!-- This is the new task-form-component for embedding forms within activity tab. -->
                              <!-- Added by Vignesh on May 27, 2022 -->
                              <task-form-component v-bind:attachmentId="activity.formAttachmentInfo.id"
                                                   v-bind:activityId="activity.id"
                                                   v-bind:taskInfo="taskInfo"
                                                   v-bind:attachmentDataRecordId="activity.formAttachmentInfo.attachmentDataRecordId"/>

                              <!--
                              <activity-form-tab v-bind:loggedInUser="loggedInUser"
                                                 v-bind:taskId="id"
                                                 v-bind:activityId="activity.id"
                                                 v-bind:attachmentId="activity.formAttachmentInfo.id"
                                                 v-bind:formID="activity.formAttachmentInfo.templateId"
                                                 v-bind:formName="activity.formAttachmentInfo.name"/>
                               -->
                          </div>

                          <div v-if="activity.replies===null || activity.replies!==undefined" class="replyToTrigger" style="display:none;gap: 10px;position: absolute;right: -60px;top: 10px;">
                              <a v-on:click="openActivityCommentBox(activity.id)" style="color: gray;display: flex;align-items: center;justify-content: center;gap: 5px;">
                                <span uk-tooltip="Reply to this activity" style="cursor: pointer;" title="" aria-expanded="false" >
                                  <svg width="15" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                    <path style="fill:rgb(88 88 88);cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                  </svg>
                                </span>
                                <span> Reply </span>
                              </a>
                          </div>

                        </div>

                        <div v-if="activity.replies!==null && activity.replies!==undefined && activity.replies.length>0" style="display:flex;gap:10px">
                            <a v-if="activity.replies.length>1" v-on:click="showReplies($event)" style="display: flex; align-items: center; justify-content: center; gap: 5px;">
                              <span style="pointer-events:none;display: flex;align-items: center;"><i data-visualcompletion="css-img" class="hu5pjgll m6k467ps" style="background-image:url('/resources/images/glyph.png');background-position:-18px -290px;background-size:74px 364px;width:16px;height:16px;background-repeat:no-repeat;display:inline-block;filter: opacity(0.2);"></i></span>
                              <span style="pointer-events:none;user-select:none"> {{activity.replies.length}} replies </span>
                            </a>
                            <a v-if="activity.replies.length===1" v-on:click="showReplies($event)" style="display: flex; align-items: center; justify-content: center; gap: 5px;">
                              <span style="pointer-events:none;display: flex;align-items: center;"><i data-visualcompletion="css-img" class="hu5pjgll m6k467ps" style="background-image:url('/resources/images/glyph.png');background-position:-18px -290px;background-size:74px 364px;width:16px;height:16px;background-repeat:no-repeat;display:inline-block;filter: opacity(0.2);"></i></span>
                              <span style="pointer-events:none;user-select:none"> {{activity.replies.length}} reply </span>
                            </a>
                            <a v-on:click="openActivityCommentBox(activity.id)" style=";user-select:none;color: gray;display: flex;align-items: center;justify-content: center;gap: 5px;display:none;">
                              <span uk-tooltip="Reply to this activity" style="cursor: pointer;" title="" aria-expanded="false">
                                <svg width="15" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                  <path style="fill: gray;cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                </svg>
                              </span>
                              <span > Reply </span>
                            </a>
                        </div>
                        <div class="replies hidden" >

                            <div class="reply_tree_trunk"></div>
                            <template v-for="reply in activity.replies">
                              <div class="activity_reply">
                                <div class="reply_tree_branch"></div>
                                <div style="display: flex;justify-content: start;align-items: center;width: 100%;gap: 10px;margin-bottom: 7px;">
                                  <div style="font-weight: normal;"><span style="color: #3da4f7;">{{reply.commentedByName}}</span></div>
                                  <div style="font-weight: normal; font-size: 0.55rem; color: rgb(179, 179, 179);">
                                    {{reply.commentedOnAgo}}
                                  </div>
                                </div>
                                <div>
                                  {{reply.comment}}
                                </div>
                              </div>
                            </template>

                            <a v-on:click="openActivityCommentBox(activity.id)" style="margin-top:10px;color: gray;display: flex;align-items: center;justify-content: center;gap: 5px;">
                              <span uk-tooltip="Reply to this activity" style="cursor: pointer;" title="" aria-expanded="false">
                                <svg width="15" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="reply">
                                  <path style="fill: gray;cursor:pointer" d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z"></path>
                                </svg>
                              </span>
                              <span> Reply to this thread</span>
                            </a>
                        </div>
                        <div v-bind:id="'activity_reply_comment_box_' + activity.id" class="reply_form hide_display " style="place-items: flex-start flex-start;width: 100%;flex-direction: column;place-self: flex-start flex-start;margin-left: 50px;margin-top: 5px;">
                          <div style="display: flex;padding: 5px 10px;place-self: flex-start;width: 100%;box-sizing: border-box;">
                              <textarea tabindex="3" v-bind:id="'activity_reply_comment_textarea_' + activity.id" class="uk-textarea " rows="3" placeholder="" style="width:100%;border-radius:3px"></textarea>
                          </div>
                          <div style="display: flex;padding: 5px 10px;place-self: flex-start;">
                              <button  v-bind:id="'activity_reply_btn_' + activity.id"  v-on:click="saveActivityComment(activity.id, activity.taskId, $event)" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" style="background-color: rgb(255 255 255 / 31%);border-radius: 3px;place-self: center;place-items: center;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;border: 1px solid gray;color: gray;">
                                  <div style="display: grid;grid-template-columns: auto auto;place-items:center">
                                    <div>
                                      <span uk-icon="icon:comment;ratio:0.75" class="uk-icon"></span>
                                    </div>
                                    <div>&nbsp;&nbsp;&nbsp;Post Comment</div>
                                  </div>
                              </button>
                              <button v-on:click="closeActivityCommentBox(activity.id)" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button" data-v-487245b7="" style="background-color: rgb(245 245 245);border-radius: 3px;place-self: center;place-items: center;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;margin-top: 0px;margin-left: 10px;color: grey;border: 1px solid gray;"><div style="display: grid; grid-template-columns: auto auto;"><div >Cancel</div></div></button>
                          </div>
                        </div>
                    </div>
                </div>
          </template>

          <div v-bind:id="embeddingComponentName + '_spinner'" style="opacity:1;transition:0.25s linear;display:none;position:absolute;top:0px;right:0px;left:0px;bottom:0px;align-items:center;justify-content:center">
              <div class="spinner-2"></div>
          </div>
      </div>
    </div>
</template>

<script>

import userMixinLib from './../../mixins/lib/user_mixin_lib';
import utilsMixinLib from './../../mixins/lib/utils_lib';
import uiListMixinLib from './../../mixins/lib/ui-list.js';
import { bus } from './../../../main.js';
import { ref } from 'vue';

export default {
  mixins: [
    userMixinLib,
    utilsMixinLib,
    uiListMixinLib
  ],
  props: ['id', 'uniqueComponentId', 'embeddingComponentName', 'loggedInUser', 'taskInfo'],
  data: function () {
    return {
      showActivityDetails: false,
      loggedInUserx: {},
      taskActivityComment: {},
      availableActivities: [],
      chosenFiles: [],
      numberOfUploadedFiles: 0,
      isFileChosen: false,
      chosenFileName: null,
      isFileUploading: false,
      uploadActivityFile: false,
      currentlyUploadedFile: null,
      clickedActivityId: null,
      availableAssigneesComplete: [],
      availableAssignees: [],
      isMentionsListOpen: false,
      currentlyHighlightedOptionItem: -1,
      currentlyHighlightedOptionId: null,
      currentlyHighlightedOptionName: null,
      justMentioned: false, // To check if a user was just mentioned to trigger the focus to next element
      mentionedPeople: [], // obsolete and replaced with 'mentionedPeopleIds' which is the latest and better version of extracting the mentioned values.
      mentionedPeopleIds: [],
      isMentionSymbolPressed: false,
      mentionSearchKeyword: "",
      windowSelectionCache: {

      },
      currentFocusOnDOMText: "",
      lastFocusNode: null,
      lastFocusOffset: -1,
      clonedRange: null,
      formattedComment: "",
      showCommentOptions: false
    };
  },
  methods: {

    showDetailEvents () {

      this.showActivityDetails = !this.showActivityDetails;
      const btn = document.querySelector(".activity_details_toggle_button");

      if (this.showActivityDetails) {
        btn.classList.add("on");
      }
      else {
        btn.classList.remove("on");
      }

    },

    // /get-one-to-one-chat
    async getOneToOneChatOrCreateNew (withUserId) {

        const form = {
          id: "new",
          type: "one-to-one",
          name: null,
          withUserId: withUserId, // required for one-to-one chat
          categoryId: null, // required for category chat
          involvedMemberIds: null // required for group chat,
        };


        // VueJS ajax call-1
        const post_url = './chat-conversations/save';
        console.log('Posting data to : ' + post_url);

        return new Promise((resolve, reject) => {
            axios.post(process.env.VUE_APP_API_URL + post_url, form)
              .then((dataResponse) => {
                  console.log('Chat Conversation Registration Result : ');
                  console.log(dataResponse);
                  resolve(dataResponse.data.bean.id);
                  // UIkit.modal(document.querySelector('#newChatConversationModal')).hide();
                  // this.$emit('refreshList', {});
                  // this.refreshMyConversations();

              })
              .catch(function (errorResponse) {
                console.log('ERROR MS - ', errorResponse);
                const exceptionMsg = errorResponse.response.data.exception;
                reject(exceptionMsg);
              });
        });

    },
    toggleCommentOptions (showOption, event) {

      const parentContainer = event.target.closest(".activity-comment-container");

      if (!showOption && this.formattedComment === "") {
        this.showCommentOptions = false;
        parentContainer.querySelector("#ce_editor").innerHTML = "Post a comment..";
        parentContainer.querySelector("#ce_editor").style.minHeight = "35px";
        parentContainer.querySelector("#ce_editor").classList.add("dull-text");
      }
      else if (showOption) {
        this.showCommentOptions = true;

        if (parentContainer.querySelector("#ce_editor").innerHTML === "Post a comment..") {
          parentContainer.querySelector("#ce_editor").innerHTML = "";
          parentContainer.querySelector("#ce_editor").style.minHeight = "75px";
          parentContainer.querySelector("#ce_editor").classList.remove("dull-text");
        }
      }
      else {
        console.log("Comment text exists, so cannot hide the comment box options.");
      }

    },
    yoyo () {

      return false;

      console.log("ce_editor focussed.");
      try {

        console.log("1 ", window.getSelection());
        console.log("1 ", window.getSelection().focusNode);
        console.log("2 ", window.getSelection().rangeCount);
        // console.log("3 ", window.getSelection().getRangeAt(0));

        // if (window.getSelection() && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).parentNode && window.getSelection().getRangeAt(0).parentNode.id === "ce_editor") {
        if (window.getSelection().focusNode.id === "ce_editor") {

          this.currentFocusOnDOMText = window.getSelection().getRangeAt(0).startContainer.data + " -- " + new Date();
        }
        else {
          this.currentFocusOnDOMText = "selection-outside-ce-editor" + " -- " + new Date();
        }
      }
      catch (e) {
        console.error(e);
        this.currentFocusOnDOMText = "invalid-selection" + " -- " + new Date();
      }
    },
    focusOn () {
      const p = document.getElementById("ce_editor");
      // p.focus();
      // alternatively use setTimeout(() => { p.focus(); }, 0);
      // this is enough to focus an empty element (at least in Chrome)

      if (p.hasChildNodes()) { // if the element is not empty
        const s = window.getSelection();
        const r = document.createRange();
        const e = p.childElementCount > 0 ? p.lastChild : p;
        r.setStart(e, 1);
        r.setEnd(e, 1);
        s.removeAllRanges();
        s.addRange(r);
        p.focus();
        // postMentionedNode.focus();
        // spaceNode.focus();
      }
    },
    updateMentionedPeople () {
      this.mentionedPeopleIds = Array.from(document.querySelector("#ce_editor").querySelectorAll(".mention-node"))
                                     .map(el => el.getAttribute("data-user-id"))
                                     .map(id => id.split("#")[0]);
    },
    mentionListener (event) {
      const description = event;
      // console.log(description);

      // Use this at the end when u want to save this comment
      // this.taskActivityComment.description = event.target.innerHTML;



      if (this.isMentionsListOpen && (event.key === 'BackspaceDDD' || event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter')) {
        this.handleKeyPress(event);
        return false;
      }

      // Handle "backspace" keys to delete mentioned data
      if (event.key === 'Backspace') {

        const sel = window.getSelection();
        const range = sel.getRangeAt(0);
        console.log(range); // .previousSibling.remove();
        // This code removes the previous "@" text [we are adding the blue colored @ along with the mentioned value]
        // This code below removes the last character '@' and puts the text back into the node.
        console.log(range);

        // Delete the mentioned node only if the range's startContainer has a 'mention-node' class.
        if (range.startContainer.parentElement && range.startContainer.parentElement.classList && range.startContainer.parentElement.classList.contains("mention-node")) {

            // range.startContainer.remove();
            console.log("element to delete is ", range.startContainer.parentElement);
            // range.startContainer.parentElement.remove();
            range.startContainer.parentElement.outerHTML = "&nbsp;";

            // reset mention search keyword.
            this.mentionSearchKeyword = "";

          setTimeout(() => {
            this.mentionedPeople = Array.from(document.querySelectorAll(".mention-node")).map(mNode => mNode.getAttribute("data-user-id"));
            // Since a mentioned person is removed, update the array.
            this.updateMentionedPeople();
          }, 100);

        }
        else {

          if (this.isMentionSymbolPressed) {

              console.log("backspaced pressed when mentioning is on: ", event);
              this.mentionSearchKeyword = this.mentionSearchKeyword.substring(0, this.mentionSearchKeyword.length - 1);
              console.log("Mention search string is now " + this.mentionSearchKeyword);

              this.mentionSearchKeyword = this.mentionSearchKeyword.toLowerCase();

              console.log("mentionedSearchKeyword is ", this.mentionSearchKeyword, this.availableAssigneesComplete);
              console.log("Filtered items are : ", this.availableAssigneesComplete
                                            .filter(assignee => assignee.firstName.toLowerCase().startsWith(this.mentionSearchKeyword) ||
                                                                assignee.lastName.toLowerCase().startsWith(this.mentionSearchKeyword)));
              this.availableAssignees = this.availableAssigneesComplete
                                            .filter(assignee => assignee.firstName.toLowerCase().startsWith(this.mentionSearchKeyword) ||
                                                                assignee.lastName.toLowerCase().startsWith(this.mentionSearchKeyword));

              // If the filtered list shows only one value, then highlight it by default.
              if (this.availableAssignees.length === 1) {

                  // Focus 1st option
                  this.currentlyHighlightedOptionItem = 0;

                  // Add the highlighted class to the option div.
                  if (document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem] !== undefined) {
                    document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem].classList.add('highlighted');
                  }

                  // document.querySelectorAll("#" + this.name + "_selectbox_options > .ui-selectbox-option.is_visible")[this.currentlyHighlightedOptionItem]
                  //        .scrollIntoView();

                  const target = document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem];
                  if (target !== undefined) {
                      target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;
                  }

                  if (document.querySelector(".mentionListDropdown > div.highlighted") !== null) {
                    this.currentlyHighlightedOptionId = document.querySelector(".mentionListDropdown > div.highlighted").getAttribute("data-user-id");
                    this.currentlyHighlightedOptionName = document.querySelector(".mentionListDropdown > div.highlighted").getAttribute("data-user-firstname");
                  }

              }
          }
        }

        this.formatContent();
        return false;

      }

      if (this.isMentionSymbolPressed) {

          const isNumber = function (evt) {
              // evt = (evt) ? evt : window.event;
              var charCode = (evt.which) ? evt.which : evt.keyCode;
              if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                  return false;
              }
              return true;
          };

          const isAlfa = function (evt) {

              // evt = (evt) ? evt : window.event;
              var charCode = (evt.which) ? evt.which : evt.keyCode;
              // if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
              //     return false;
              // }
              // return true;

              return (charCode >= 65 && charCode <= 90);
          };

          // Search only by Alphabets
          if (isAlfa(event)) {
              console.log("alpha : ", event);
              this.mentionSearchKeyword = this.mentionSearchKeyword + event.key;
              this.mentionSearchKeyword = this.mentionSearchKeyword.toLowerCase();

              console.log("mentionedSearchKeyword is ", this.mentionSearchKeyword, this.availableAssigneesComplete);
              console.log("Filtered items are : ", this.availableAssigneesComplete
                                            .filter(assignee => assignee.firstName.toLowerCase().startsWith(this.mentionSearchKeyword) ||
                                                                assignee.lastName.toLowerCase().startsWith(this.mentionSearchKeyword)));
              this.availableAssignees = this.availableAssigneesComplete
                                            .filter(assignee => assignee.firstName.toLowerCase().startsWith(this.mentionSearchKeyword) ||
                                                                assignee.lastName.toLowerCase().startsWith(this.mentionSearchKeyword));

              // If the filtered list shows only one value, then highlight it by default.
              if (this.availableAssignees.length === 1) {

                  // Focus 1st option
                  this.currentlyHighlightedOptionItem = 0;

                  // Add the highlighted class to the option div.
                  document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem].classList.add('highlighted');

                  // document.querySelectorAll("#" + this.name + "_selectbox_options > .ui-selectbox-option.is_visible")[this.currentlyHighlightedOptionItem]
                  //        .scrollIntoView();

                  const target = document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem];
                  target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;

                  this.currentlyHighlightedOptionId = document.querySelector(".mentionListDropdown > div.highlighted").getAttribute("data-user-id");
                  this.currentlyHighlightedOptionName = document.querySelector(".mentionListDropdown > div.highlighted").getAttribute("data-user-firstname");


              }


          }
          else {
            // Ignore shift key since as soon as the '@' is pressed, the input will likely to be beginning with a 'Shift+ Alphabet' for searching.
            if (!event.shiftKey) {
              this.mentionSearchKeyword = "";
              this.isMentionSymbolPressed = false;
              this.availableAssignees = this.availableAssigneesComplete;
            }
          }

          this.windowSelectionCache = window.getSelection();
          // this.windowSelectionCache.rangeCount = window.getSelection().rangeCount;
          // this.windowSelectionCache.rangeCountAt = window.getSelection().getRangeAt(0);
      }

      if (event.key === "@") {

        this.isMentionSymbolPressed = true;

        // event.preventDefault();

        //
        // const mentionedNode = document.createElement('span');
        //   mentionedNode.style.color = "#2196f3";
        //   mentionedNode.classList.add("mentioned");
        //   mentionedNode.classList.add("mention-node");
        //   mentionedNode.innerHTML = "@";
        //
        //   const sel = window.getSelection();
        //   if (sel.rangeCount)
        //   {
        //      let range = sel.getRangeAt(0);
        //      console.log("range : ", range);
        //
        //       let nextTextNodeAfterMentionNode = document.createElement('span');
        //         nextTextNodeAfterMentionNode.classList.add('space');
        //         nextTextNodeAfterMentionNode.classList.add('text-node');
        //         nextTextNodeAfterMentionNode.innerHTML = "&nbsp;";
        //
        //         range.collapse(false);
        //         range.insertNode(nextTextNodeAfterMentionNode);
        //         range.insertNode(mentionedNode);
        //         range = range.cloneRange();
        //         range.selectNodeContents(mentionedNode);
        //         range.collapse(false);
        //       sel.removeAllRanges();
        //       sel.addRange(range);
        //
        //       nextTextNodeAfterMentionNode = range.endContainer.nextElementSibling;
        //       const nextRange = document.createRange();
        //         nextRange.setStart(nextTextNodeAfterMentionNode, 1);
        //         nextRange.setEnd(nextTextNodeAfterMentionNode, 1);
        //
        //       window.getSelection().removeAllRanges();
        //       window.getSelection().addRange(nextRange);
        //
        //      nextTextNodeAfterMentionNode.addEventListener("input", (e) => console.log("mention changed " + e));
        //   }

        // console.log(window.getSelection().getRangeAt(0), window.getSelection().getRangeAt(0).getBoundingClientRect());
        // if (window.getSelection().getRangeAt(0)) {
        //   const rangeCursorPosition = window.getSelection().getRangeAt(0).getBoundingClientRect();
        //   const ce_editor = document.querySelector("#ce_editor").getBoundingClientRect();
        //   document.querySelector("#mentionListDropdownContainer").style.top = (rangeCursorPosition.y - ce_editor.y + 80) + "px";
        //   document.querySelector("#mentionListDropdownContainer").style.left = (rangeCursorPosition.x - ce_editor.x + 30) + "px";
        // }

        // Reset the filtered listOfAssignees to its "listAllValues" state.
        this.availableAssignees = this.availableAssigneesComplete;
        document.querySelector(".mentionListDropdown").classList.remove("hide_display");
        this.isMentionsListOpen = true;

        try {

          console.log("1 ", window.getSelection());
          console.log("2 ", window.getSelection().focusNode);
          console.log("3 ", window.getSelection().rangeCount);
          if (window.getSelection() && window.getSelection().rangeCount > 0) {
            console.log("4 ", window.getSelection().getRangeAt(0));
          }

          // this.lastFocusNode = window.getSelection().focusNode;
          this.lastFocusOffset = window.getSelection().getRangeAt(0).startOffset;
          this.lastFocusNode = window.getSelection().getRangeAt(0).startContainer;

          // if (window.getSelection() && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).parentNode && window.getSelection().getRangeAt(0).parentNode.id === "ce_editor") {
          // if (window.getSelection().focusNode.id === "ce_editor") {
          //
          //   this.currentFocusOnDOMText = window.getSelection().getRangeAt(0).startContainer.data + " -- " + new Date();
          // }
          // else {
          //   this.currentFocusOnDOMText = "selection-outside-ce-editor" + " -- " + new Date();
          // }
        }
        catch (e) {
          console.error(e);
          // this.currentFocusOnDOMText = "invalid-selection" + " -- " + new Date();
        }
      }
      else if (!this.isMentionSymbolPressed) { // Hide the display only when the isMentionSymbolPressed is false
        document.querySelector(".mentionListDropdown").classList.add("hide_display");
        this.isMentionsListOpen = false;

      }

      this.formatContent();

    },
    storeDescription (event) {
      // Use this at the end when u want to save this comment
      // this.taskActivityComment.description = event.target.innerHTML;
      this.taskActivityComment.description = this.formattedComment;
    },
    handleKeyPressV1 (event) {

      // Keep this function for reference
      const insertNodeAtCaret = function (node) {
          if (typeof window.getSelection != "undefined") {
              var sel = window.getSelection();
              if (sel.rangeCount) {
                  var range = sel.getRangeAt(0);
                  range.collapse(false);
                  range.insertNode(node);
                  range = range.cloneRange();
                  range.selectNodeContents(node);
                  range.collapse(false);
                  sel.removeAllRanges();
                  sel.addRange(range);
              }
          } else if (typeof document.selection != "undefined" && document.selection.type != "Control") {
              var html = (node.nodeType == 1) ? node.outerHTML : node.data;
              var id = "marker_" + ("" + Math.random()).slice(2);
              html += '<span id="' + id + '"></span>';
              var textRange = document.selection.createRange();
              textRange.collapse(false);
              textRange.pasteHTML(html);
              var markerSpan = document.getElementById(id);
              textRange.moveToElementText(markerSpan);
              textRange.select();
              markerSpan.parentNode.removeChild(markerSpan);
          }
      };
      console.log('Key pressed..', event);

      event.preventDefault();

      if (event.key === 'ArrowDown') {

        console.log('Handle keyboard arrow down..' + this.currentlyHighlightedOptionItem);

        // Reset Highlighted option
        document
          // .querySelectorAll('#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible')
          .querySelectorAll('.mentionListDropdown > div')
          .forEach(item => item.classList.remove('highlighted'));

        this.currentlyHighlightedOptionItem += 1;

        // Reset if it has reached the last child
        if (this.currentlyHighlightedOptionItem >= document.querySelectorAll('.mentionListDropdown > div').length) {
          this.currentlyHighlightedOptionItem = 0;
          // Focus 1st option
        }

        // Add the highlighted class to the option div.
        document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem].classList.add('highlighted');

        // document.querySelectorAll("#" + this.name + "_selectbox_options > .ui-selectbox-option.is_visible")[this.currentlyHighlightedOptionItem]
        //        .scrollIntoView();

        const target = document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem];
        target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;

        this.currentlyHighlightedOptionId = document.querySelector(".mentionListDropdown > div.highlighted").getAttribute("data-user-id");
        this.currentlyHighlightedOptionName = document.querySelector(".mentionListDropdown > div.highlighted").getAttribute("data-user-firstname");
      }
      else if (event.key === 'ArrowUp') {

        console.log('Handle keyboard arrow up..' + this.currentlyHighlightedOptionItem);

        // Reset Highlighted option
        document
          .querySelectorAll('.mentionListDropdown > div')
          .forEach(item => item.classList.remove('highlighted'));

        this.currentlyHighlightedOptionItem -= 1;

        // Reset if it has reached the first child, then highlight the last option for circularity
        if (this.currentlyHighlightedOptionItem < 0) {
          this.currentlyHighlightedOptionItem = document.querySelectorAll('.mentionListDropdown > div').length - 1;
          // Focus last option
        }

        // Add the highlighted class to the option div.
        document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem].classList.add('highlighted');

        // document.querySelectorAll("#" + this.name + "_selectbox_options > .ui-selectbox-option.is_visible")[this.currentlyHighlightedOptionItem].scrollIntoView();

        const target = document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem];
        target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;

        this.currentlyHighlightedOptionId = document.querySelector(".mentionListDropdown > div.highlighted").getAttribute("data-user-id");
        this.currentlyHighlightedOptionName = document.querySelector(".mentionListDropdown > div.highlighted").getAttribute("data-user-firstname");
      }
      else if (event.key === 'Enter') {
        // alert("Selected option is index : " + this.currentlyHighlightedOptionItem);
        // Here instead of using the currentlyHighlightedOptionItem's index, get the data-id attribute.

        // Add the highlighted class to the option div.
        const highlightedElement = document.querySelector('.mentionListDropdown > div.highlighted');
        this.currentlyHighlightedOptionId = highlightedElement.getAttribute("data-user-id");
        this.currentlyHighlightedOptionName = highlightedElement.getAttribute("data-user-firstname");

        if (highlightedElement !== null) {

          // event.target.innerHTML = event.target.innerHTML + "<span class='mentioned' style='color: #2196f3;'>" + this.currentlyHighlightedOptionName + "</span> ";
          const mentionedNode = document.createElement('span');
            mentionedNode.style.color = "#2196f3";
            mentionedNode.classList.add("mentioned");
            mentionedNode.classList.add("mention-node");
            mentionedNode.setAttribute("data-user-id", this.currentlyHighlightedOptionId + "#" + this.currentlyHighlightedOptionName);
            mentionedNode.innerHTML = "@" + this.currentlyHighlightedOptionName + "";

            let sel = window.getSelection();
            console.log("window.getSelection on enter button = ", window.getSelection().focusNode.className);

            if (sel.rangeCount)
            {
               let range = sel.getRangeAt(0);
               console.log("range : ", range);

                let nextTextNodeAfterMentionNode = document.createElement('span');
                  nextTextNodeAfterMentionNode.classList.add('space');
                  nextTextNodeAfterMentionNode.classList.add('text-node');
                  nextTextNodeAfterMentionNode.innerHTML = "&nbsp;";

                  range.collapse(false);

                  // If its a textnode, then insert it adjacent to the text, otherwise insert it as a siblingElement
                  if (range.startContainer.nodeName === "#text" && !range.startContainer.parentElement.classList.contains("space")) {
                    range.insertNode(nextTextNodeAfterMentionNode);
                    range.insertNode(mentionedNode);
                  }
                  else {
                    range.startContainer.parentElement.insertAdjacentElement('afterend', nextTextNodeAfterMentionNode);
                    range.startContainer.parentElement.insertAdjacentElement('afterend', mentionedNode);
                  }

                  this.clonedRange = range.cloneRange();
                  range = range.cloneRange();
                  range.selectNodeContents(mentionedNode);
                  range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);

                sel = window.getSelection();
                range = sel.getRangeAt(0);
                console.log(range); // .previousSibling.remove();


                // This code removes the previous "@" text [we are adding the blue colored @ along with the mentioned value]
                // This code below removes the last character '@' and puts the text back into the node.
                // The previousSibling's textContent must also replace the 'searched characters' stored in 'this.mentionSearchKeyword'
                console.log("replace this --" + range.startContainer.previousSibling.textContent + "--");
                range.startContainer.previousSibling.textContent = range.startContainer.previousSibling.textContent.substring(0, (range.startContainer.previousSibling.textContent.length - this.mentionSearchKeyword.length - 1));
                // range.startContainer.previousSibling.textContent = range.startContainer.previousSibling.textContent.substring(0, (range.startContainer.previousSibling.textContent.length - 1));



                console.log("range after: ", range);
                nextTextNodeAfterMentionNode = range.endContainer.nextElementSibling;
                const nextRange = document.createRange();
                  nextRange.setStart(nextTextNodeAfterMentionNode, 1);
                  nextRange.setEnd(nextTextNodeAfterMentionNode, 1);

                window.getSelection().removeAllRanges();
                window.getSelection().addRange(nextRange);

               nextTextNodeAfterMentionNode.addEventListener("input", (e) => console.log("mention changed " + e));
            }

            event.preventDefault();
            event.stopPropagation();
            document.querySelector(".mentionListDropdown").classList.add("hide_display");
            this.isMentionsListOpen = false;
            this.currentlyHighlightedOptionItem = 0;

            // Reset Highlighted option
                document
                  // .querySelectorAll('#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible')
                  .querySelectorAll('.mentionListDropdown > div')
                  .forEach(item => item.classList.remove('highlighted'));

                // Add the highlighted class to the option div.
                document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem].classList.add('highlighted');
            // Reset Highlighted option ends here

            this.mentionedPeople = Array.from(document.querySelectorAll(".mention-node")).map(mNode => mNode.getAttribute("data-user-id"));
            this.isMentionSymbolPressed = false;
            this.mentionSearchKeyword = "";
            this.updateMentionedPeople(); // Since a mentioned person is added, update the array.

            return false;
        }
      }
      else if (event.key === 'Escape' || event.key === 'Tab')
      {
        this.showListOptions(false);
        document.querySelector('#' + this.name + '_selectbox_container').focus();
      }

      event.stopPropagation();
    },
    handleKeyPress (event) {

      console.log('Key pressed..', event);
      event.preventDefault();
      const editor = document.getElementById("ce_editor");

      if (event.key === 'ArrowDown') {

        console.log('Handle keyboard arrow down..' + this.currentlyHighlightedOptionItem);

        // Reset Highlighted option
        document
          // .querySelectorAll('#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible')
             .querySelectorAll('.mentionListDropdown > div')
             .forEach(item => item.classList.remove('highlighted'));

        this.currentlyHighlightedOptionItem += 1;

        // Reset if it has reached the last child
        if (this.currentlyHighlightedOptionItem >= document.querySelectorAll('.mentionListDropdown > div').length) {
          this.currentlyHighlightedOptionItem = 0; // Focus 1st option
        }

        // Add the highlighted class to the option div.
        document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem].classList.add('highlighted');

        // document.querySelectorAll("#" + this.name + "_selectbox_options > .ui-selectbox-option.is_visible")[this.currentlyHighlightedOptionItem]
        //        .scrollIntoView();

        const target = document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem];
        target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;

        this.currentlyHighlightedOptionId = document.querySelector(".mentionListDropdown > div.highlighted").getAttribute("data-user-id");
        this.currentlyHighlightedOptionName = document.querySelector(".mentionListDropdown > div.highlighted").getAttribute("data-user-firstname");
      }
      else if (event.key === 'ArrowUp') {

        console.log('Handle keyboard arrow up..' + this.currentlyHighlightedOptionItem);

        // Reset Highlighted option
        document
          .querySelectorAll('.mentionListDropdown > div')
          .forEach(item => item.classList.remove('highlighted'));

        this.currentlyHighlightedOptionItem -= 1;

        // Reset if it has reached the first child, then highlight the last option for circularity
        if (this.currentlyHighlightedOptionItem < 0) {
          this.currentlyHighlightedOptionItem = document.querySelectorAll('.mentionListDropdown > div').length - 1;
          // Focus last option
        }

        // Add the highlighted class to the option div.
        document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem].classList.add('highlighted');

        // document.querySelectorAll("#" + this.name + "_selectbox_options > .ui-selectbox-option.is_visible")[this.currentlyHighlightedOptionItem].scrollIntoView();

        const target = document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem];
        target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;

        this.currentlyHighlightedOptionId = document.querySelector(".mentionListDropdown > div.highlighted").getAttribute("data-user-id");
        this.currentlyHighlightedOptionName = document.querySelector(".mentionListDropdown > div.highlighted").getAttribute("data-user-firstname");
      }
      else if (event.key === 'Enter') {

          // alert("Selected option is index : " + this.currentlyHighlightedOptionItem);
          // Here instead of using the currentlyHighlightedOptionItem's index, get the data-id attribute.

          // Add the highlighted class to the option div.
          const highlightedElement = document.querySelector('.mentionListDropdown > div.highlighted');
          this.currentlyHighlightedOptionId = highlightedElement.getAttribute("data-user-id");
          this.currentlyHighlightedOptionName = highlightedElement.getAttribute("data-user-firstname");

          if (highlightedElement !== null) {

             const mentionedNode = document.createElement('span');
                   mentionedNode.style.color = "#2196f3";
                   mentionedNode.classList.add("mentioned");
                   mentionedNode.classList.add("mention-node");
                   mentionedNode.setAttribute("data-user-id", this.currentlyHighlightedOptionId + "#" + this.currentlyHighlightedOptionName);
                   mentionedNode.innerHTML = "@" + this.currentlyHighlightedOptionName + "";

             let nextTextNodeAfterMentionNode = document.createElement('span');
                 nextTextNodeAfterMentionNode.classList.add('space');
                 nextTextNodeAfterMentionNode.classList.add('text-node');
                 nextTextNodeAfterMentionNode.innerHTML = "&nbsp;";

   					 const nextTextNodeAfterMentionNode2 = document.createElement('span');
    				 			 nextTextNodeAfterMentionNode2.classList.add('space');
    				 			 nextTextNodeAfterMentionNode2.classList.add('text-node');
    				 			 nextTextNodeAfterMentionNode2.innerHTML = "";

             const hasChildNodes = editor.hasChildNodes();
			 		   let lastChildInsideEditor = !editor.hasChildNodes() ? editor : (editor.lastElementChild !== null) ? editor.lastElementChild : editor.lastChild;

 				 		 // This is to find the node where the current cursor is placed while keying in the '@' key.
 				 		 if (this.lastFocusNode !== null) {
 				 			 lastChildInsideEditor = this.lastFocusNode;
 				 			 console.log("using the lastFocusNode : ", this.lastFocusNode);
 				 		 }

             // Handle the case when there is no children inside editor  (CASE 1)
						 if (!hasChildNodes) {
							 editor.appendChild(mentionedNode);
							 editor.appendChild(nextTextNodeAfterMentionNode);
							 console.log("Appended as the first child to editor.");
							 // const action = document.createElement('li');
							 // 		   action.innerHTML = "CASE 1 - appended as the first child to editor";
							 // document.getElementById("history").appendChild(action);

						 }
						 else if (hasChildNodes) { // CASE 2 - If there are child nodes inside the editor.

							 		// Case 2A - If there is a lastFocusNode indicating the location where '@' key was pressed.
									// Case 2B -

									if (this.lastFocusNode !== null && this.lastFocusOffset > -1) {

										lastChildInsideEditor = this.lastFocusNode;
										console.log("Inserting at location " + this.lastFocusOffset + " in the node ", lastChildInsideEditor);
										const range = document.createRange();
												range.setStart(lastChildInsideEditor, this.lastFocusOffset);
				 				 			  range.setEnd(lastChildInsideEditor, this.lastFocusOffset);
												console.log("range at which to insert new nodes : ", range);

												// editor.appendChild(mentionedNode);
				 							  // editor.appendChild(nextTextNodeAfterMentionNode);

												range.insertNode(nextTextNodeAfterMentionNode2);
												range.insertNode(nextTextNodeAfterMentionNode);
				 				 			 	range.insertNode(mentionedNode);


												// range.startContainer.textContent = range.startContainer.textContent.substring(1, (range.startContainer.textContent.length - 1 - 1));
												// range.startContainer.previousSibling.textContent = range.startContainer.previousSibling.textContent.substring(0, (range.startContainer.previousSibling.textContent.length - 1 - 1));


										this.lastFocusNode = null;
										this.lastFocusOffset = -1;

										nextTextNodeAfterMentionNode = mentionedNode.nextSibling; // range.endContainer.nextElementSibling;
										console.log("nextTextNodeAfterMentionNode.previousSibling ", nextTextNodeAfterMentionNode.previousSibling.previousSibling);
										console.log("nextTextNodeAfterMentionNode.previousSibling.textContent = '" + nextTextNodeAfterMentionNode.previousSibling.previousSibling.textContent + "'");
										console.log("nextTextNodeAfterMentionNode.previousSibling.textContent after removing @ = '" + nextTextNodeAfterMentionNode.previousSibling.previousSibling.textContent.substring(0, (nextTextNodeAfterMentionNode.previousSibling.previousSibling.textContent.length - this.mentionSearchKeyword.length - 1)) + "'");
										// nextTextNodeAfterMentionNode.previousSibling.previousSibling.textContent = nextTextNodeAfterMentionNode.previousSibling.previousSibling.textContent.substring(0, (nextTextNodeAfterMentionNode.previousSibling.previousSibling.textContent.length - this.mentionSearchKeyword.length - 1));

										console.log("nextTextNodeAfterMentionNode.nextSibling ", nextTextNodeAfterMentionNode.nextSibling);
										console.log("nextTextNodeAfterMentionNode.nextSibling.textContent = '" + nextTextNodeAfterMentionNode.nextSibling.textContent + "'");
										console.log("nextTextNodeAfterMentionNode.nextSibling.textContent after removing @ = '" + nextTextNodeAfterMentionNode.nextSibling.textContent.substring(1, (nextTextNodeAfterMentionNode.nextSibling.textContent.length - this.mentionSearchKeyword.length - 1)) + "'");
										nextTextNodeAfterMentionNode.nextSibling.nextSibling.nextSibling.nextSibling.textContent = nextTextNodeAfterMentionNode.nextSibling.textContent.substring(1, (nextTextNodeAfterMentionNode.nextSibling.nextSibling.nextSibling.nextSibling.textContent.length - this.mentionSearchKeyword.length - 1));
				 				 		const nextRange = document.createRange();
				 				 			 nextRange.setStartAfter(nextTextNodeAfterMentionNode2);
											 console.log("nextRange : ", nextRange);
											 // nextRange.startContainer.textContent = nextRange.startContainer.textContent.substring(0, (nextRange.startContainer.textContent.length - 1 - 1));

					 				 		 window.getSelection().removeAllRanges();
					 				 		 window.getSelection().addRange(nextRange);

                       /*
											 // const action = document.createElement('li');
											 // 		   action.innerHTML = "CASE2A";
											 // document.getElementById("history").appendChild(action);

                       this.clonedRange = range.cloneRange();
                       range = range.cloneRange();
                       range.selectNodeContents(mentionedNode);
                       range.collapse(false);

            					 let sel = window.getSelection();
                       sel.removeAllRanges();
                       sel.addRange(range);

                       sel = window.getSelection();
                       range = sel.getRangeAt(0);
                       console.log(range); // .previousSibling.remove();


                       // This code removes the previous "@" text [we are adding the blue colored @ along with the mentioned value]
                       // This code below removes the last character '@' and puts the text back into the node.
                       // The previousSibling's textContent must also replace the 'searched characters' stored in 'this.mentionSearchKeyword'
                       console.log("replace this --" + range.startContainer.previousSibling.textContent + "--");
                       range.startContainer.previousSibling.textContent = range.startContainer.previousSibling.textContent.substring(0, (range.startContainer.previousSibling.textContent.length - this.mentionSearchKeyword.length - 1));
                       // range.startContainer.previousSibling.textContent = range.startContainer.previousSibling.textContent.substring(0, (range.startContainer.previousSibling.textContent.length - 1));



                       console.log("range after: ", range);
                       nextTextNodeAfterMentionNode = range.endContainer.nextElementSibling;
                         nextRange = document.createRange();
                         nextRange.setStart(nextTextNodeAfterMentionNode, 1);
                         nextRange.setEnd(nextTextNodeAfterMentionNode, 1);

                       window.getSelection().removeAllRanges();
                       window.getSelection().addRange(nextRange);

                      nextTextNodeAfterMentionNode.addEventListener("input", (e) => console.log("mention changed " + e));
                      */
									}
									else {
										console.log("No range data to insert.");
									}

                  event.preventDefault();
                  event.stopPropagation();
                  document.querySelector(".mentionListDropdown").classList.add("hide_display");
                  this.isMentionsListOpen = false;
                  this.currentlyHighlightedOptionItem = 0;

                  // Reset Highlighted option
                      document
                        // .querySelectorAll('#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible')
                        .querySelectorAll('.mentionListDropdown > div')
                        .forEach(item => item.classList.remove('highlighted'));

                      // Add the highlighted class to the option div.
                      document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem].classList.add('highlighted');
                  // Reset Highlighted option ends here

                  this.mentionedPeople = Array.from(document.querySelectorAll(".mention-node")).map(mNode => mNode.getAttribute("data-user-id"));
                  this.isMentionSymbolPressed = false;
                  this.mentionSearchKeyword = "";
                  this.updateMentionedPeople(); // Since a mentioned person is added, update the array.

                  this.formatContent();
                  return false;


						 }

          }
      }
      else if (event.key === 'Escape' || event.key === 'Tab') {
        this.showListOptions(false);
        document.querySelector('#' + this.name + '_selectbox_container').focus();
      }

      event.stopPropagation();

    },
    formatContent () {

      const editor = document.getElementById("ce_editor");
      const editorHTML = editor.innerHTML;
      const formattedContent = document.getElementById("formattedContent");

      formattedContent.innerHTML = editor.innerHTML;

      formattedContent.querySelectorAll(".mention-node")
                      .forEach(mentionedNode => {
                         console.log(mentionedNode);
                         const dataUserId = mentionedNode.getAttribute("data-user-id").split("#")[0];
                         mentionedNode.innerText = `<mention id="${dataUserId}">${mentionedNode.innerText}</mention>`;
                      });
      this.formattedComment = formattedContent.innerText;
      return false;
    },
    highlightMentionedOption (event) {

        if (event.target.classList.contains("mentionListItem")) {

          console.log('Mouseover highlight..' + this.currentlyHighlightedOptionItem);

          // Reset Highlighted option
          document
            // .querySelectorAll('#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible')
               .querySelectorAll('.mentionListDropdown > div')
               .forEach(item => item.classList.remove('highlighted'));

          // this.currentlyHighlightedOptionItem += 1;
          //
          // // Reset if it has reached the last child
          // if (this.currentlyHighlightedOptionItem >= document.querySelectorAll('.mentionListDropdown > div').length) {
          //   this.currentlyHighlightedOptionItem = 0; // Focus 1st option
          // }

          // Add the highlighted class to the option div.
          event.target.classList.add('highlighted');

          // document.querySelectorAll("#" + this.name + "_selectbox_options > .ui-selectbox-option.is_visible")[this.currentlyHighlightedOptionItem]
          //        .scrollIntoView();

          // const target = document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem];
          // target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;

          this.currentlyHighlightedOptionId = document.querySelector(".mentionListDropdown > div.highlighted").getAttribute("data-user-id");
          this.currentlyHighlightedOptionName = document.querySelector(".mentionListDropdown > div.highlighted").getAttribute("data-user-firstname");
        }
    },
    handleMentionSelectionByMouseClick (event) {


        const editor = document.getElementById("ce_editor");
        // alert("Selected option is index : " + this.currentlyHighlightedOptionItem);
        // Here instead of using the currentlyHighlightedOptionItem's index, get the data-id attribute.

        // Add the highlighted class to the option div.
        const highlightedElement = document.querySelector('.mentionListDropdown > div.highlighted');
        this.currentlyHighlightedOptionId = highlightedElement.getAttribute("data-user-id");
        this.currentlyHighlightedOptionName = highlightedElement.getAttribute("data-user-firstname");

        if (highlightedElement !== null) {

           const mentionedNode = document.createElement('span');
                 mentionedNode.style.color = "#2196f3";
                 mentionedNode.classList.add("mentioned");
                 mentionedNode.classList.add("mention-node");
                 mentionedNode.setAttribute("data-user-id", this.currentlyHighlightedOptionId + "#" + this.currentlyHighlightedOptionName);
                 mentionedNode.innerHTML = "@" + this.currentlyHighlightedOptionName + "";

           let nextTextNodeAfterMentionNode = document.createElement('span');
               nextTextNodeAfterMentionNode.classList.add('space');
               nextTextNodeAfterMentionNode.classList.add('text-node');
               nextTextNodeAfterMentionNode.innerHTML = "&nbsp;";

           const nextTextNodeAfterMentionNode2 = document.createElement('span');
                 nextTextNodeAfterMentionNode2.classList.add('space');
                 nextTextNodeAfterMentionNode2.classList.add('text-node');
                 nextTextNodeAfterMentionNode2.innerHTML = "";

           const hasChildNodes = editor.hasChildNodes();
           let lastChildInsideEditor = !editor.hasChildNodes() ? editor : (editor.lastElementChild !== null) ? editor.lastElementChild : editor.lastChild;

           // This is to find the node where the current cursor is placed while keying in the '@' key.
           if (this.lastFocusNode !== null) {
             lastChildInsideEditor = this.lastFocusNode;
             console.log("using the lastFocusNode : ", this.lastFocusNode);
           }

           // Handle the case when there is no children inside editor  (CASE 1)
           if (!hasChildNodes) {
             editor.appendChild(mentionedNode);
             editor.appendChild(nextTextNodeAfterMentionNode);
             console.log("Appended as the first child to editor.");
             // const action = document.createElement('li');
             // 		   action.innerHTML = "CASE 1 - appended as the first child to editor";
             // document.getElementById("history").appendChild(action);

           }
           else if (hasChildNodes) { // CASE 2 - If there are child nodes inside the editor.

                // Case 2A - If there is a lastFocusNode indicating the location where '@' key was pressed.
                // Case 2B -

                if (this.lastFocusNode !== null && this.lastFocusOffset > -1) {

                  lastChildInsideEditor = this.lastFocusNode;
                  console.log("Inserting at location " + this.lastFocusOffset + " in the node ", lastChildInsideEditor);
                  const range = document.createRange();
                      range.setStart(lastChildInsideEditor, this.lastFocusOffset);
                      range.setEnd(lastChildInsideEditor, this.lastFocusOffset);
                      console.log("range at which to insert new nodes : ", range);

                      // editor.appendChild(mentionedNode);
                      // editor.appendChild(nextTextNodeAfterMentionNode);

                      range.insertNode(nextTextNodeAfterMentionNode2);
                      range.insertNode(nextTextNodeAfterMentionNode);
                      range.insertNode(mentionedNode);


                      // range.startContainer.textContent = range.startContainer.textContent.substring(1, (range.startContainer.textContent.length - 1 - 1));
                      // range.startContainer.previousSibling.textContent = range.startContainer.previousSibling.textContent.substring(0, (range.startContainer.previousSibling.textContent.length - 1 - 1));


                  this.lastFocusNode = null;
                  this.lastFocusOffset = -1;

                  nextTextNodeAfterMentionNode = mentionedNode.nextSibling; // range.endContainer.nextElementSibling;
                  console.log("nextTextNodeAfterMentionNode.previousSibling ", nextTextNodeAfterMentionNode.previousSibling.previousSibling);
                  console.log("nextTextNodeAfterMentionNode.previousSibling.textContent = '" + nextTextNodeAfterMentionNode.previousSibling.previousSibling.textContent + "'");
                  console.log("nextTextNodeAfterMentionNode.previousSibling.textContent after removing @ = '" + nextTextNodeAfterMentionNode.previousSibling.previousSibling.textContent.substring(0, (nextTextNodeAfterMentionNode.previousSibling.previousSibling.textContent.length - this.mentionSearchKeyword.length - 1)) + "'");
                  // nextTextNodeAfterMentionNode.previousSibling.previousSibling.textContent = nextTextNodeAfterMentionNode.previousSibling.previousSibling.textContent.substring(0, (nextTextNodeAfterMentionNode.previousSibling.previousSibling.textContent.length - this.mentionSearchKeyword.length - 1));

                  console.log("nextTextNodeAfterMentionNode.nextSibling ", nextTextNodeAfterMentionNode.nextSibling);
                  console.log("nextTextNodeAfterMentionNode.nextSibling.textContent = '" + nextTextNodeAfterMentionNode.nextSibling.textContent + "'");
                  console.log("nextTextNodeAfterMentionNode.nextSibling.textContent after removing @ = '" + nextTextNodeAfterMentionNode.nextSibling.textContent.substring(1, (nextTextNodeAfterMentionNode.nextSibling.textContent.length - this.mentionSearchKeyword.length - 1)) + "'");
                  nextTextNodeAfterMentionNode.nextSibling.nextSibling.nextSibling.nextSibling.textContent = nextTextNodeAfterMentionNode.nextSibling.textContent.substring(1, (nextTextNodeAfterMentionNode.nextSibling.nextSibling.nextSibling.nextSibling.textContent.length - this.mentionSearchKeyword.length - 1));
                  const nextRange = document.createRange();
                     nextRange.setStartAfter(nextTextNodeAfterMentionNode2);
                     console.log("nextRange : ", nextRange);
                     // nextRange.startContainer.textContent = nextRange.startContainer.textContent.substring(0, (nextRange.startContainer.textContent.length - 1 - 1));

                     window.getSelection().removeAllRanges();
                     window.getSelection().addRange(nextRange);

                     /*
                     // const action = document.createElement('li');
                     // 		   action.innerHTML = "CASE2A";
                     // document.getElementById("history").appendChild(action);

                     this.clonedRange = range.cloneRange();
                     range = range.cloneRange();
                     range.selectNodeContents(mentionedNode);
                     range.collapse(false);

                     let sel = window.getSelection();
                     sel.removeAllRanges();
                     sel.addRange(range);

                     sel = window.getSelection();
                     range = sel.getRangeAt(0);
                     console.log(range); // .previousSibling.remove();


                     // This code removes the previous "@" text [we are adding the blue colored @ along with the mentioned value]
                     // This code below removes the last character '@' and puts the text back into the node.
                     // The previousSibling's textContent must also replace the 'searched characters' stored in 'this.mentionSearchKeyword'
                     console.log("replace this --" + range.startContainer.previousSibling.textContent + "--");
                     range.startContainer.previousSibling.textContent = range.startContainer.previousSibling.textContent.substring(0, (range.startContainer.previousSibling.textContent.length - this.mentionSearchKeyword.length - 1));
                     // range.startContainer.previousSibling.textContent = range.startContainer.previousSibling.textContent.substring(0, (range.startContainer.previousSibling.textContent.length - 1));



                     console.log("range after: ", range);
                     nextTextNodeAfterMentionNode = range.endContainer.nextElementSibling;
                       nextRange = document.createRange();
                       nextRange.setStart(nextTextNodeAfterMentionNode, 1);
                       nextRange.setEnd(nextTextNodeAfterMentionNode, 1);

                     window.getSelection().removeAllRanges();
                     window.getSelection().addRange(nextRange);

                    nextTextNodeAfterMentionNode.addEventListener("input", (e) => console.log("mention changed " + e));
                    */
                }
                else {
                  console.log("No range data to insert.");
                }

                event.preventDefault();
                event.stopPropagation();
                document.querySelector(".mentionListDropdown").classList.add("hide_display");
                this.isMentionsListOpen = false;
                this.currentlyHighlightedOptionItem = 0;

                // Reset Highlighted option
                    document
                      // .querySelectorAll('#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible')
                      .querySelectorAll('.mentionListDropdown > div')
                      .forEach(item => item.classList.remove('highlighted'));

                    // Add the highlighted class to the option div.
                    document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem].classList.add('highlighted');
                // Reset Highlighted option ends here

                this.mentionedPeople = Array.from(document.querySelectorAll(".mention-node")).map(mNode => mNode.getAttribute("data-user-id"));
                this.isMentionSymbolPressed = false;
                this.mentionSearchKeyword = "";
                this.updateMentionedPeople(); // Since a mentioned person is added, update the array.

                this.formatContent();
                return false;


           }

        }

    },

    handleMentionSelectionByMouseClickObsolete (event) {

        // console.log("window.getSelection on mouse click = ", window.getSelection());
        // return false;

        if (!event.target.classList.contains("mentionListItem")) {
          return false;
        }

        // Add the highlighted class to the option div.
        const highlightedElement = document.querySelector('.mentionListDropdown > div.highlighted');
        this.currentlyHighlightedOptionId = highlightedElement.getAttribute("data-user-id");
        this.currentlyHighlightedOptionName = highlightedElement.getAttribute("data-user-firstname");

        if (highlightedElement !== null) {

          // event.target.innerHTML = event.target.innerHTML + "<span class='mentioned' style='color: #2196f3;'>" + this.currentlyHighlightedOptionName + "</span> ";
          const mentionedNode = document.createElement('span');
            mentionedNode.style.color = "#2196f3";
            mentionedNode.classList.add("mentioned");
            mentionedNode.classList.add("mention-node");
            mentionedNode.setAttribute("data-user-id", this.currentlyHighlightedOptionId + "#" + this.currentlyHighlightedOptionName);
            mentionedNode.innerHTML = "@" + this.currentlyHighlightedOptionName + "";

            let sel = window.getSelection();


            /*
                const p = document.getElementById("ce_editor");
                // p.focus();
                // alternatively use setTimeout(() => { p.focus(); }, 0);
                // this is enough to focus an empty element (at least in Chrome)

                if (p.hasChildNodes()) { // if the element is not empty
                  const s = window.getSelection();
                  const r = document.createRange();
                  const e = p.childElementCount > 0 ? p.lastChild : p;
                  console.log("e = ", e);
                  r.setStart(e, 1);
                  r.setEnd(e, 1);
                  s.removeAllRanges();
                  s.addRange(r);
                  p.focus();
                  // postMentionedNode.focus();
                  // spaceNode.focus();

                  sel = s;
                }
            */

            console.log("rangeCount is ", this.windowSelectionCache.rangeCount);
            if (true) // (sel.rangeCount)
            {
               let range = this.clonedRange; // sel.getRangeAt(0);
               console.log("range : ", range);

                let nextTextNodeAfterMentionNode = document.createElement('span');
                  nextTextNodeAfterMentionNode.classList.add('space');
                  nextTextNodeAfterMentionNode.classList.add('text-node');
                  nextTextNodeAfterMentionNode.innerHTML = "&nbsp;";

                  range.collapse(false);

                  // If its a textnode, then insert it adjacent to the text, otherwise insert it as a siblingElement
                  if (range.startContainer.nodeName === "#text" && !range.startContainer.parentElement.classList.contains("space")) {
                    range.insertNode(nextTextNodeAfterMentionNode);
                    range.insertNode(mentionedNode);
                  }
                  else {
                    range.startContainer.parentElement.insertAdjacentElement('afterend', nextTextNodeAfterMentionNode);
                    range.startContainer.parentElement.insertAdjacentElement('afterend', mentionedNode);
                  }

                  range = range.cloneRange();
                  range.selectNodeContents(mentionedNode);
                  range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);

                sel = window.getSelection();
                range = sel.getRangeAt(0);
                console.log(range); // .previousSibling.remove();


                // This code removes the previous "@" text [we are adding the blue colored @ along with the mentioned value]
                // This code below removes the last character '@' and puts the text back into the node.
                // The previousSibling's textContent must also replace the 'searched characters' stored in 'this.mentionSearchKeyword'
                console.log("replace this --" + range.startContainer.previousSibling.textContent + "--");
                range.startContainer.previousSibling.textContent = range.startContainer.previousSibling.textContent.substring(0, (range.startContainer.previousSibling.textContent.length - this.mentionSearchKeyword.length - 1));
                // range.startContainer.previousSibling.textContent = range.startContainer.previousSibling.textContent.substring(0, (range.startContainer.previousSibling.textContent.length - 1));



                console.log("range after: ", range);
                nextTextNodeAfterMentionNode = range.endContainer.nextElementSibling;
                const nextRange = document.createRange();
                  nextRange.setStart(nextTextNodeAfterMentionNode, 1);
                  nextRange.setEnd(nextTextNodeAfterMentionNode, 1);

                window.getSelection().removeAllRanges();
                window.getSelection().addRange(nextRange);

               nextTextNodeAfterMentionNode.addEventListener("input", (e) => console.log("mention changed " + e));
            }

            event.preventDefault();
            event.stopPropagation();
            document.querySelector(".mentionListDropdown").classList.add("hide_display");
            this.isMentionsListOpen = false;
            this.currentlyHighlightedOptionItem = 0;

            // Reset Highlighted option
                document
                  // .querySelectorAll('#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible')
                  .querySelectorAll('.mentionListDropdown > div')
                  .forEach(item => item.classList.remove('highlighted'));

                // Add the highlighted class to the option div.
                document.querySelectorAll('.mentionListDropdown > div')[this.currentlyHighlightedOptionItem].classList.add('highlighted');
            // Reset Highlighted option ends here

            this.mentionedPeople = Array.from(document.querySelectorAll(".mention-node")).map(mNode => mNode.getAttribute("data-user-id"));
            this.isMentionSymbolPressed = false;
            this.mentionSearchKeyword = "";
            this.updateMentionedPeople(); // Since a mentioned person is added, update the array.
            return false;
        }
    },
    loadAssignees () {

        // Attempting to use Comlink Worker
            const get_url = './categories/get-potential-users'; // Fetch all reminders
            const callbackFunction = (dataResponse) => {
              // dataResponse.data = dataResponse;
              // console.log(dataResponse.bean);
              this.availableAssignees = dataResponse.bean;
              this.availableAssigneesComplete = dataResponse.bean;
            };
            const callbackError = (error) => {
              console.error('Error in loading users');
              console.error(error);
              UIkit.notification("<span uk-icon='icon: warning;ratio: 0.75'></span>" + error, {
                status: 'danger',
                pos: 'bottom-left',
                timeout: 5000
              });
            };

            async function sendTaskToWorker () {
                // const remoteFunction = Comlink.wrap(new Worker("resources/js/comlink-worker.js"));
                console.log("Loading reminders using comlink-worker");
                await ComlinkWorker.fetch(process.env.VUE_APP_API_URL + get_url,
                                           Comlink.proxy(callbackFunction),
                                           Comlink.proxy(callbackError));
            }

            sendTaskToWorker();
            return false;
        // Comlink worker ends here
    },

    showReplies (event) {
      event.target.parentElement.parentElement.querySelector('.replies').classList.toggle('hidden');
    },
    openActivityCommentBox (activityId) {
      console.log("Opening comment box for activityId : ", activityId, document.querySelector('#activity_reply_comment_box_' + activityId));
      document.querySelector('#activity_reply_comment_box_' + activityId).classList.remove('hide_display');
      document.querySelector('#activity_reply_comment_textarea_' + activityId).focus();
    },
    closeActivityCommentBox (activityId) {
      if (document.querySelector('#activity_reply_comment_box_' + activityId) !== null) {
        document.querySelector('#activity_reply_comment_box_' + activityId).classList.add('hide_display');
      }
    },

    openPostCommentModal () {
      // Clear these fields before attaching a new form-template.
      this.taskActivityComment = {};
      this.loadAssignees();
      UIkit.modal(document.querySelector('#post-comment-modal')).show();
    },
    closePostCommentModal () {
      UIkit.modal(document.querySelector('#post-comment-modal')).hide();
    },
    toggleActivityDetail (event) {
      const trigger = event.target;

      // If the dropdown trigger was clicked, then ignore opening the details
      if (event.target.classList.contains("activity_detail_trigger"))
      {
        return false;
      }

      event.target.classList.toggle('flip_vertically');

      const elementTarget = event.target.closest('.activity_description');
      console.log(elementTarget);
      console.log(elementTarget.querySelector('.activity_detail'));

      if (elementTarget.querySelector('.activity_detail') !== null) {
        Array.from(elementTarget.querySelectorAll('.activity_detail'))
             .forEach(hiddenDetail => {
               hiddenDetail.classList.toggle('hide_activity_detail');
             });

      }
    },
    closeActivityContextMenu () {

        const primaryButtonOptions = document.querySelector('.activity_item_context_menu');
              primaryButtonOptions.classList.remove("opened");
              primaryButtonOptions.style.transform = null;
    },
    openContextMenu (event) {

      const availableActivitiesContainer = event.target.closest('.activities_list');


      console.log("target clicked is ", event.target);

      // Ignore this click event as it landed else where.
      if (!event.target.classList.contains("activity_detail_trigger"))
      {
        // Position the context menus
        const primaryButton = event.target;
        const primaryButtonOptions = document.querySelector('.activity_item_context_menu');
              primaryButtonOptions.classList.remove("opened");

              // event.stopPropagation();
              // event.preventDefault();
        this.closeActivityContextMenu();
        return false;
      }
      else if (event.target.classList.contains("activity_detail_trigger")) {

        event.stopPropagation();
        event.preventDefault();
        // Position the context menus
        const primaryButton = event.target;
        const primaryButtonOptions = document.querySelector('.activity_item_context_menu');


        // close it if its opened.
        if (primaryButtonOptions.classList.contains("opened")) {
          this.closeActivityContextMenu();
          return false;
        }

        this.clickedActivityId = primaryButton.getAttribute("data-activity-id");
        console.log("clickedActivityId : ", this.clickedActivityId);
        primaryButtonOptions.setAttribute("data-selected-activity-id", this.clickedActivityId);
        primaryButtonOptions.setAttribute("data-event-source", "activity-tab");

        // alert(this.loggedInUser.userId + " ==== " + primaryButton.getAttribute("data-createdby-id"));

        // Show the option of 'Cancel Comment' only if the currently loggedInUser has posted it and only if its of the type "NEW_COMMENT"
        if (primaryButton.getAttribute("data-activity-type") === 'NEW_COMMENT' && primaryButton.getAttribute("data-createdby-id") === this.loggedInUser.userId) {
          primaryButtonOptions.querySelector(".cancel_comment_option").classList.remove("hide_display");
        }
        else {
          primaryButtonOptions.querySelector(".cancel_comment_option").classList.add("hide_display");
        }

        primaryButtonOptions.classList.add("opened");
        const bcr = primaryButton.getBoundingClientRect();
        const menuVerticalGap = document.querySelector("body").getBoundingClientRect().bottom - bcr.bottom;
        const menuHorizontalGap = document.querySelector("body").getBoundingClientRect().right - bcr.right;
        const contextMenuHeight = 200;
        const contextMenuWidth = 150;
        const doesMenuHaveEnoughVerticalVisibleSpace = menuVerticalGap > contextMenuHeight;
        const doesMenuHaveEnoughHorizontalVisibleSpace = menuHorizontalGap > contextMenuWidth;



        // console.log("primaryButton's BCR ", bcr);

        if (doesMenuHaveEnoughVerticalVisibleSpace && doesMenuHaveEnoughHorizontalVisibleSpace)
        {
          primaryButtonOptions.style.transformOrigin = "left top";
          primaryButtonOptions.style.top = bcr.top + bcr.height + 2 + 'px';
          primaryButtonOptions.style.left = bcr.left + 'px';
        }
        else if (!doesMenuHaveEnoughVerticalVisibleSpace && doesMenuHaveEnoughHorizontalVisibleSpace)
        {
          primaryButtonOptions.style.transformOrigin = "left bottom";
          primaryButtonOptions.style.top = bcr.top - contextMenuHeight - 35 + bcr.height + 2 + 'px';
          primaryButtonOptions.style.left = bcr.left + 'px';
        }
        else if (doesMenuHaveEnoughVerticalVisibleSpace && !doesMenuHaveEnoughHorizontalVisibleSpace)
        {
          primaryButtonOptions.style.transformOrigin = "right top";
          primaryButtonOptions.style.top = bcr.top + 2 + 'px';
          primaryButtonOptions.style.left = bcr.left - contextMenuWidth - bcr.width + 'px';
        }
        else if (!doesMenuHaveEnoughVerticalVisibleSpace && !doesMenuHaveEnoughHorizontalVisibleSpace)
        {
          primaryButtonOptions.style.transformOrigin = "right bottom";
          primaryButtonOptions.style.top = bcr.top - contextMenuHeight + 2 + 'px';
          primaryButtonOptions.style.left = bcr.left - contextMenuWidth - bcr.width + 'px';
        }

        console.log("menu bcr : ", bcr);
        console.log("availableActivitiesContainer bcr : ", availableActivitiesContainer.getBoundingClientRect());
        console.log("doesMenuHaveEnoughVerticalVisibleSpace : ", menuVerticalGap, (menuVerticalGap - contextMenuHeight), doesMenuHaveEnoughVerticalVisibleSpace);
        setTimeout(() => {
          primaryButtonOptions.style.opacity = "1";
          primaryButtonOptions.style.transform = "scale(1)";
          primaryButtonOptions.style.display = null;
        }, 150);
      }

    },
    alterArrayObjectValue () {
      // this.chosenFiles[0].isUploaded = true;
    },

    // Handling File uploads
    uploadFileType (fileType) {
      if (fileType === 'image') {
        document.getElementById(this.uniqueComponentId + '_fileUploadForm').setAttribute('accept', 'image/*');
      }
      else {
        document.getElementById(this.uniqueComponentId + '_fileUploadForm').setAttribute('accept', '.csv, .xls, .doc, .docx, .docx, .xlsx, .pdf');
      }

      document.getElementById(this.uniqueComponentId + '_fileUploadForm').value = '';
      document.getElementById(this.uniqueComponentId + '_fileUploadForm').click();
    },

    removeAttachedFile () {
      this.uploadActivityFile = false;
      this.isFileChosen = false;
      this.chosenFileName = 'Not chosen';
      this.isFileUploading = false;
    },
    removeAttachedFileAtIndex (index) {
      this.chosenFiles.splice(index, 1);

      if (this.chosenFiles.length === 0) {
        this.uploadActivityFile = false;
        this.isFileChosen = false;
        this.chosenFileName = 'Not chosen';
        this.isFileUploading = false;
      }
    },

    onFileChosenImpl (event) {
      this.chosenFiles = [];

      const fileList = event.target.files; // document.getElementById(this.uniqueComponentId + '_fileUploadForm').files;

      console.log('FileList : ', fileList);

      fileList.forEach((selectedFile) => {
        const fileName = selectedFile.name;

        if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.svg') ||
                 fileName.endsWith('.bmp') || fileName.endsWith('.jpeg') ||
                 fileName.endsWith('.csv') || fileName.endsWith('.xls') || fileName.endsWith('.xlsx') || fileName.endsWith('.txt') ||
                 fileName.endsWith('.doc') || fileName.endsWith('.docx') || fileName.endsWith('.pdf')) {
          this.isFileChosen = true;

          this.chosenFiles.push({
            name: selectedFile.name,
            file: selectedFile,
            attachment: null,
            isUploaded: false
          });
        } else {
          this.isFileChosen = false;
          alert('File Type not accepted.');
        }
      });
    },

    async uploadFileBeforePostingComment () {
      // Don't activate this button if a file is being uploaded, this is to prevent user from clickjacking while a file is being uploaded.
      if (this.isFileUploading) {
        alert('File upload is in progress, pls wait.');
        return false;
      }

      if (this.isFileChosen) {
        // Upload File first
        const fileList = document.getElementById(this.uniqueComponentId + '_fileUploadForm').files;

        if (!fileList.length) return;

        this.isFileUploading = true;

        const getFileInfoIndexInList = (fileName) => {
          let index = -1;
          this.chosenFiles.forEach((item, idx) => {
            if (item.name === fileName) { index = idx; }
          });
          return index;
        };

        for (let i = 0; i < this.chosenFiles.length; i++) {
          const fileToUploadMetadata = this.chosenFiles[i];
          const uploadResponse = await this.uploadFile(fileToUploadMetadata.file);
          console.log('Got fileupload promise response for file : ', fileToUploadMetadata.name, ' response : ', uploadResponse);
          const fileInfo = JSON.parse(uploadResponse.responseText);
          const attachment = (fileInfo.bean);
          console.log('attachment info ', attachment);
          fileToUploadMetadata.attachment = attachment;
          this.numberOfUploadedFiles += 1;
          this.chosenFiles[i].isUploaded = true;

          /*
                          To test array reactivity.
                          const fileToUploadMetadataProxy = new Proxy(fileToUploadMetadata, {
                            get(target, key, receiver) {
                              return Reflect.get(target, key, receiver);
                            },
                            set(target, key, val, receiver) {
                              return Reflect.set(target, key, val, receiver);
                            }
                          });

                          const reactiveFileInfo = ref(this.chosenFiles[i]);
                          reactiveFileInfo.isUploaded = true;

                          let index = getFileInfoIndexInList(fileToUploadMetadata.name);
                          if(index > -1)
                          {
                              //newAgendaMsg = Object.assign({}, newAgendaMsg, {});
                              //Vue.set(this.chosenFiles, index, fileToUploadMetadata);
                              //this.set(this.chosenFiles, index, fileToUploadMetadata);
                              console.log("Next tick ran...");
                          }
                          */
        }

        this.isFileUploading = false;
        this.uploadActivityFile = false;
        this.isFileChosen = false;

        return new Promise(resolve => {
          resolve('File uploaded successfully.');
        }, reject => {
          reject('File upload Error.');
        });
      }
    },
    uploadFile (fileToUpload) {
      return new Promise(resolve => {
        const _this_component = this;
        // handle file changes
        const formData = new FormData();

        formData.append('file', fileToUpload, fileToUpload.name);
        formData.append('name', fileToUpload.name);
        formData.append('taskId', _this_component.id);
        formData.append('senderInfo', _this_component.loggedInUser.userId + '#' + _this_component.loggedInUser.username);

        var url = '/file-uploads/upload';
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('ENCTYPE', 'multipart/form-data');
        // xhr.setRequestHeader("Content-Type","multipart/form-data;boundary=CUSTOM");
        xhr.send(formData);

        // Setup our listener to process completed requests
        xhr.onload = function () {
          // Process our return data
          if (xhr.status >= 200 && xhr.status < 300) {
            // This will run when the request is successful
            console.log('file upload success!', xhr);

            resolve(xhr);

            /*
                  let savedImageName = xhr["responseText"];
                  console.log("savedImageName=" + savedImageName);
                  _this_component.uploadedPicId = savedImageName;
                  $("#uploadedImage").attr("src","/api/us/profile/get/" + savedImageName);

                  self.postMessage("Processed data from Worker.");
                  */
          } else {
            // This will run when it's not
            console.log('The request failed!');
          }

          // This will run either way
          // All three of these are optional, depending on what you're trying to do
          // console.log('This always runs...');
        };
      }, reject => {
        reject('File upload Error.');
      });
    },

    someFunction (elem) { console.log(elem); },
    goToHomePage () {
      this.$router.push({
        name: 'home',
        params: {}
      });
    },

    sendEmailFromTemplate () {
      const form = {
        template: document.getElementById("ce_editor").innerText
      };

      const post_url = './email/send-mail';
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {
          console.log(dataResponse);
          // alert(dataResponse);
        })
        .catch(function (errorResponse) {
          console.log('ERROR MS - ', errorResponse);
          const exceptionMsg = errorResponse.response.data.exception;
          alert(errorResponse);
        });
    },
    async sendToChatConversation (mentionedPeopleIds, activityInfo) {

      for (const idx in mentionedPeopleIds) {
        const mentionedPeopleId = mentionedPeopleIds[idx];

        const conversationId = await this.getOneToOneChatOrCreateNew(mentionedPeopleId);
        // alert("conversationId for " + mentionedPeopleId + " is " + conversationId);

        const chatMsg = {
          messageType: "COMMENT_MENTIONED_CHAT_NOTIFICATION",
          extra: activityInfo.taskId, // Here we pass this task's ID as the extra parameter for reference purpose. This id will be used to load the task's comments from the chat screen.
          message: activityInfo.description,
          conversationId: conversationId,
          acknowledgementStatusId: new Date().getTime()
        };

        console.log(chatMsg, " with atttachment");
        bus.emit('send-chat-msg-to-server', chatMsg);
      };

    },
    async saveActivityComment (activityId, taskId, event) {


      // setTimeout(() => {
      //   this.closePostCommentModal(); // If opened.
      // }, 2000);
      // return false;


      if (this.isFileChosen) {
        console.log('File is uploading..');
        await this.uploadFileBeforePostingComment();
        console.log('File is uploaded.');

        if (this.numberOfUploadedFiles < this.chosenFiles.length) {
          const numberOfFilesNotUploaded = parseInt(this.chosenFiles.length) - parseInt(this.numberOfUploadedFiles);
          alert(numberOfFilesNotUploaded + ' files were not uploaded. The comment will not be saved.');
          return false;
        }
      }

      console.log('Posting comment..');
      let btnText = event.target.innerHTML;

      const post_url = './task-activity/save-comment';

      const isNew = this.taskActivityComment.id == 'New';
      const form = {
        id: this.taskActivityComment.id,
        taskId: this.id,
        description: this.taskActivityComment.description
        // attachments to follow. (file docs etc..)
      };


      // Attach the mentioned people in this comment.
      if (this.mentionedPeopleIds !== null && this.mentionedPeopleIds.length > 0) {
        form["mentionedPeopleIds"] = this.mentionedPeopleIds;
      }


      // If the reply was made to a specific activity, then add it here.
      if (activityId) {
        const comment = document.querySelector('#activity_reply_comment_textarea_' + activityId).value;
        btnText = document.querySelector('#activity_reply_btn_' + activityId).innerHTML;
        form.replyToId = activityId;
        form.description = comment;
      }

      if (form.description.trim() === "") {
        return false;
      }

      if (this.chosenFiles !== null && this.chosenFiles.length > 0) {
        form.attachments = [];

        this.chosenFiles.forEach((uploadedFile) => {
          const attachment = {
            id: uploadedFile.attachment.id,
            name: uploadedFile.attachment.fileName,
            size: uploadedFile.attachment.fileSize,
            type: uploadedFile.attachment.fileType
          };

          form.attachments.push(attachment); // Later cater for multiple-file uploads.
        });
      }

      console.log(form);
      // return false;

      // VueJS ajax call-1
      axios.post(process.env.VUE_APP_API_URL + post_url, form)
        .then((dataResponse) => {
          console.log('Task Activity comment save Result : ');
          console.log(dataResponse);

          if (dataResponse.data.id !== null) {
            const item = dataResponse.data;

            /*
            This gets updated via the listener from realtime-socket.

            // If this comment was added as a reply to an existing activity item, then add
            // it to the activity's replies array, instead of attaching it to the availableActivities.
            if (activityId) {
              item.commentedOn = this.convertUTCDateFromServerToLocalDateForDisplay(item.createdOn);
              item.commentedByName = item.createdBy.split("#")[0];

              // Find the activity item and update its 'replies' array.
              this.availableActivities
                  .find(activity => activity.id === activityId)
                  .replies
                  .push(item);

              console.log("Added reply");
            }
            else {
              // If this is a newly added activity, then add an empty replies array.
              item.replies = [];
              item.reversedSno = this.availableActivities.length + 1;
              this.availableActivities.unshift(item);
            }

            */

            if (document.querySelector('#activity_reply_comment_textarea_' + activityId) !== null && document.querySelector('#activity_reply_comment_textarea_' + activityId) !== undefined) {
              document.querySelector('#activity_reply_comment_textarea_' + activityId).value = "";
            }

            this.taskActivityComment = { id: 'New' };
            document.querySelector("#ce_editor").innerHTML = "";

            // Reset attachment parameters.
            this.uploadActivityFile = false;
            this.isFileChosen = false;
            this.chosenFileName = 'Not chosen';
            this.isFileUploading = false;
            this.chosenFiles = [];
            this.numberOfUploadedFiles = 0;
            this.currentlyUploadedFile = null;

            const notificationLabel = (isNew) ? 'New comment added.' : 'Comment updated.';

            UIkit.notification(`<div class="taskone-notification">
                                                  <span uk-icon="icon: check;ratio:1"></span>
                                                  <div> ${notificationLabel} </div>
                                              </div>`, {
              status: 'success',
              pos: 'bottom-left',
              timeout: 5000
            });

            // Attach the mentioned people in this comment.
            if (this.mentionedPeopleIds !== null && this.mentionedPeopleIds.length > 0) {
              const msg = "";
              this.sendToChatConversation(this.mentionedPeopleIds, form);
              this.mentionedPeopleIds = [];
            }



            // this.closePostCommentModal(); // If opened.
            // this.closeActivityCommentBox(activityId);
            // this.$emit("refreshList",{});
          } else {

            const errorMsg = (dataResponse.data).message;
            UIkit.notification("<span uk-icon='icon: warning;ratio:1'></span>" + errorMsg, {
              status: 'danger',
              pos: 'bottom-left',
              timeout: 5000
            });
            return false;
          }
        })
        .catch(function (errorResponse) {
          console.log('ERROR MS - ', errorResponse);
          const exceptionMsg = errorResponse.response.data.exception;

          UIkit.notification("<span uk-icon='icon: warning ;ratio:1'></span> " + exceptionMsg + '.', {
            status: 'danger',
            pos: 'bottom-left',
            timeout: 500000
          });

          event.target.innerHTML = btnText;
          this.enableHTMLElement(event.target);
          return false;
        });
    },
    formatBytes (bytes, decimals = 2) {

        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
    },
    loadTaskActivities () {
      try {
        document.querySelector("#" + this.embeddingComponentName + '_spinner').classList.remove('fade_reveal');
        document.querySelector("#" + this.embeddingComponentName + '_spinner').style.display = "flex";
        const url = './task-activity/list/all/' + this.id; // Fetch all task activities
        // console.log("loading activities : " + url);
        this.getUnpaginatedList('activities', url); // This lib call will fire the callback "handleUnpaginatedListData" when it completes.
      } catch (e) {
        alert(e);
      }
    },

    // Callbacks of loadPotentialUsers function.
    handleUnpaginatedListData (listKey, data) {
      if (listKey === 'activities') { this.handleFetchedActivities(data); }
    },
    handleUnpaginatedListDataError (error) {
      console.error('Unpaginated List data fetch error : ', error);
    },
    handleFetchedActivities (dataResponse) {
      // Pass it to the availableAssignees prop to the dropdown.
      console.log("availableActivities : ", dataResponse);


      // alert("Before resetting this.availableActivities" + this.availableActivities.length);
      this.availableActivities = [];
      // alert("After resetting this.availableActivities" + this.availableActivities.length);
      const availableActivities = dataResponse.data.bean;
      let totalActivitiesFetched = availableActivities.length;
      console.log("totalActivitiesFetched : ", totalActivitiesFetched);
      availableActivities.forEach((item) => {

        item.createdById = item.createdBy.split('#')[1]; // For profile-pic display of the activity's creator or to compute the 'Cancel Comment' permission.

        if (item.createdOn !== null) {
          // item.createdOn = new Date(item.createdOn).toLocaleString()
          //                                          .slice(0, 17)
          //                                          .replace(',', '')
          //                                          .replace('T',' ');

          // item.createdOn = this.convertUTCDateFromServerToLocalDateForDisplay(item.createdOn);
          item.createdOnFormatted = dayjs(item.createdOn + "Z").format('DD/MM/YYYY HH:mm');
          item.createdOnAgo = dayjs(item.createdOn + "Z").fromNow();
        }

        if (item.replies !== null && item.replies.length > 0) {
          item.replies.forEach(reply => {
            // reply.commentedOn = this.convertUTCDateFromServerToLocalDateForDisplay(reply.commentedOn);
            reply.commentedOnFormatted = dayjs(reply.commentedOn + "Z").format('DD/MM/YYYY HH:mm');
            reply.commentedOnAgo = dayjs(reply.commentedOn + "Z").fromNow();
          });
        }

        if (item.propertyChanges !== null) {
          item.propertyChanges.forEach(propChange => {
            if (propChange.toDate !== null) {
              // propChange.toDate = new Date(propChange.toDate).toLocaleString()
              //                                                .slice(0, 17)
              //                                                .replace(',', '')
              //                                                .replace('T',' ');

              propChange.toDate = this.convertUTCDateFromServerToLocalDateForDisplay(propChange.toDate);
            }

            // Since the status will contain the hash splitter, we need to extract only the label.
            if (propChange.label === 'status') {
              propChange.to = propChange.to.split('#')[1];
            }
          });
        }

        item.reversedSno = totalActivitiesFetched;
        totalActivitiesFetched--;
        console.log("activity added is ", item);

        // Format the mentions. (14th Feb 2022)
        if (item.comment !== null) {
            const comment = item.comment;
            const formattedComment = comment.replaceAll('<mention', '<span class="mentioned-node"').replaceAll('</mention>', '</span>');
            item.comment = formattedComment;

            let tempDiv = document.createElement('div');
                tempDiv.innerHTML = item.comment;
                item.commentHint = tempDiv.innerText;
                tempDiv = null;
        }

        // Format the file attached size if comment contains any file.
        if (item.formAttachments && item.formAttachments.length > 0) {

          const fileAttachments = item.formAttachments;
          const fileAttachmentsWithFormattedSize = [];

          fileAttachments.forEach((item, i) => {
              item.formattedSize = this.formatBytes(item.size);
              fileAttachmentsWithFormattedSize.push(item);
          });

          item.formAttachments = fileAttachmentsWithFormattedSize;
        }

        this.availableActivities.push(item);
      });




      document.querySelector(".activities_list")
              .addEventListener("click", e => {

                  if (e.target.classList.contains("mentioned-node")) {
                    const profileId = e.target.getAttribute("id");
                    e.target.setAttribute("uk-tooltip", e.target.innerHTML);
                    alert("Profile of " + e.target.innerHTML + " will be loaded.");
                  }
              });

      // Wait for 500ms for vue to load the list into the DOM, otherwise the selectors will be empty.
      // Remove this class so that it fades in into opacity:1
      setTimeout(() => {


             Array.from(document.querySelectorAll(".activity_box.fade_reveal"))
                  .forEach(item => item.classList.remove("fade_reveal"));


             if (document.querySelectorAll(".mentioned-node") !== null) {

                 document.querySelectorAll(".mentioned-node")
                         .forEach(mention => {
                               mention.setAttribute("uk-tooltip", mention.innerHTML);
                         });
             }

      }, 500);

      document.querySelector("#" + this.embeddingComponentName + '_spinner').classList.add('fade_reveal');
      document.querySelector("#" + this.embeddingComponentName + '_spinner').style.display = "none";
    },
    updateTaskActivitiesList (payload, taskId) {

      // alert("taskId at the time of bus registration is :" + taskId);

      if (payload.data) {
        const item = payload.data;


        item.taskSno = item.taskInfo.split('~')[0];
        item.taskName = item.taskInfo.split('~')[1];
        item.taskCreatedBy = item.taskInfo.split('~')[2].split('#')[1];

        if (item.createdOn !== null) {
          // item.createdOn = new Date(item.createdOn).toLocaleString()
          //   .slice(0, 17)
          //   .replace(',', '')
          //   .replace('T', ' ');
          console.log("item.createdOn = ", item.createdOn);
          // item.createdOn = this.convertUTCDateFromServerToLocalDateForDisplay(item.createdOn);

          item.createdOnFormatted = dayjs(item.createdOn + "Z").format('DD/MM/YYYY HH:mm');
          item.createdOnAgo = dayjs(item.createdOn + "Z").fromNow();
        }

        if (item.propertyChanges !== null) {
          item.propertyChanges.forEach(propChange => {
            if (propChange.toDate !== null) {
              // propChange.toDate = new Date(propChange.toDate).toLocaleString()
              //                                                .slice(0, 17)
              //                                                .replace(',', '')
              //                                                .replace('T',' ');
              //
              propChange.toDate = this.convertUTCDateFromServerToLocalDateForDisplay(propChange.toDate);
            }

            // Since the status will contain the hash splitter, we need to extract only the label.
            if (propChange.label === 'status') {
              propChange.to = propChange.to.split('#')[1];
            }
          });
        }

        // If this comment was added as a reply to an existing activity item, then add
        // it to the activity's replies array, instead of attaching it to the availableActivities.
        if (item.replyToId) {
          // item.commentedOn = this.convertUTCDateFromServerToLocalDateForDisplay(item.commentedOn);
          item.commentedOnFormatted = dayjs(item.commentedOn + "Z").format('DD/MM/YYYY HH:mm');
          item.commentedOnAgo = dayjs(item.commentedOn + "Z").fromNow();

          item.commentedByName = item.createdBy.split("#")[0];

          console.log("Existing activities: ", this.availableActivities);
          console.log("Looking for activity id to which replies must be added: ", item.replyToId);
          console.log("Existing replies in availableActivities: ", this.availableActivities
                 .find(activity => activity.id === item.replyToId));


          const matchingActivity = this.availableActivities.find(activity => activity.id === item.replyToId);

          if (matchingActivity.replies === undefined || matchingActivity.replies === null) {
            matchingActivity.replies = [];
          }

          console.log("Existing replies length in availableActivities: ", this.availableActivities
              .find(activity => activity.id === item.replyToId)
              .replies.length);

          // Find the activity item and update its 'replies' array.
          this.availableActivities
              .find(activity => activity.id === item.replyToId)
              .replies
              .push(item);

          console.log("Added reply entry to existing activity.");
        }
        else {

          // If this is a newly added activity, then add an empty replies array.
          item.replies = [];
          item.hide = true;

          // We are deep-cloning here, because this item gets referred in the activity lists of
          // 1. activity-channel.vue
          // 2. TaskInbox's taskView's taskActivity-Tab's list
          // 3. TaskChannel's taskView's taskActivity-Tab's list
          //
          // So when adding replies, it gets added 3 times. Even though the lists are different and the components are different,
          // it is the same object that gets added across 3 lists. Since its the same object, adding a reply to the item from one component
          // from each of the above component makes it 3 additions.
          // For example, all the 3 components listening for 'new-activity' update, updates the replies array of this item.
          //  So the replies array gets populated 3 times.
          // Solution : To fix this, instead of adding the reference that we recieved from the rsocket, we are deep-cloning it.

          const clonedItem = JSON.parse(JSON.stringify(item));
                clonedItem.reversedSno = this.availableActivities.length + 1;


          let tempDiv = document.createElement('div');
              tempDiv.innerHTML = clonedItem.comment;
              clonedItem.commentHint = tempDiv.innerText;
              tempDiv = null;

          this.availableActivities.unshift(clonedItem);

          setTimeout(() => {
            Array.from(document.querySelectorAll(".activity_box.fade_reveal"))
                 .forEach(item => item.classList.remove("fade_reveal"));
          }, 500);
        }

        var newActivitySound = document.querySelector('#new_activity_notification_sound');
            newActivitySound.volume = 1;
            newActivitySound.play();

        return false;

        setTimeout(() => {
          // item.hide  = false;
          // Vue.set(this.availableActivities,0,item);
          // this.$set(this.availableActivities, 0, item);
          //
          // setTimeout(()=>{
          //   document.querySelectorAll(".new_activity").forEach((el)=>{
          //     el.classList.remove("new_activity");
          //   });
          //
          console.log('Removing new_activity from ' + item.id);
          if (document.getElementById('channel_task_activity_' + item.id) !== null)
          {
            // document.getElementById('channel_task_activity_' + item.id).classList.remove('new_activity');
            document.getElementById('channel_task_activity_' + item.id).classList.add('pulse_activity');
          }
          // },2000);
        }, 1000);

        document.getElementById('activity_channel_counter').style.transform = 'rotateX(360deg)';
        setTimeout(() => {
          document.getElementById('activity_channel_counter').style.transform = null;
        }, 2000);
      }
    },

    // Handling context menu actions
    handleContextMenuClicked (data) {

        // PROBLEM :
        // Since the context menu bus events send data to both activity-channel.vue and activity-tab.vue,
        // this event gets fired twice, whenever a "replyToActivity" context option is clicked. This results in the unhiding
        // of the activity's reply input box in both activity-channel list and activity-tab-list. This is wrong behavior.
        // If any activity is replied to within the activity-tab's list, then the reply comment box must open only in that tab
        // and not in the activity-channel's list.
        //
        // SOLUTION :
        // When we receive events from the bus here, we check for the source and only if the source matches, then we proceed, else
        // we just ignore the event.
        if (data.eventSource !== 'activity-tab') {
          return false;
        }

        // Don't use state variables such as this.** here within listeners.
        // Because they don't update when the data changes, but component doesn't get reloaded.
        // For example, this.clickedActivityId if passed into handleReplyAction as a parameter,
        //    it only passes the value of this.clickedActivityId when this component was mounted.
        //    it doesn't update that value. So always fire only functions from listeners and let the fired
        //    function extract the current data from within its function body.

        console.log("handleContextMenuClicked this.clickedActivityId received in " + this.embeddingComponentName + " : ", this.clickedActivityId);
        console.log("action data : ", data);

        if (data.action === 'reply') {
          this.handleReplyAction(data);
        }
    },
    handleReplyAction (data) {
      console.log("handleReplyAction this.clickedActivityId received in " + this.embeddingComponentName + " : ", this.clickedActivityId);
      console.log("data received via bus selectedActivityId : ", data.selectedActivityId);
      this.openActivityCommentBox(data.selectedActivityId);
      this.closeActivityContextMenu();
    }
  },
  // created: function () {},
  created () {

    // bus.on('task-activity-update-from-adk-app', (data) => {
    //   console.log('task-activity-update-from-adk-app payload received in task-activity-tab.vue', this.availableActivities);
    //   alert(this.availableActivities.length);
    //   this.updateTaskActivitiesList(data, this.id);
    // });

    bus.on('task-activity-update-from-adk-app', (data) => {
      // alert("task-activity-update received in task-activity-tab.vue");
      this.updateTaskActivitiesList(data, this.id);
    });
  },
  beforeUnmount () {
      // bus.all.delete('task-activity-update-from-adk-app');

      // bus.all.delete('task-activity-update-from-adk-app', (data) => this.updateTaskActivitiesList(data, this.id));
      bus.all.delete('task-activity-update-from-adk-app');
  },
  computed: {
    storeCounter: function () {
      // console.log('Accessing vuex store ', this.$store)
      // console.log('Store data accessed from home page : ' + this.$store.getters.count)
      return this.$store.getters.count;
    }
  },
  mounted: function () {
    // console.log("Mounted task-info-form-tab.vue component");
    // this.$store.commit('increment');
    // this.storeCounter();
    // console.log('Accessing vuex store ', this.$store)
    // console.log('Store data accessed from home page : ' + this.$store.getters.count)
    // console.log('Done.........................')

    document.querySelectorAll(".activities_list")
            .forEach(list => {
              list.addEventListener("pointerdown", e => this.openContextMenu(e));
            });

    // this.getUserInfoCookie(); // Load the user-information into this component's loggedInUser-property.
    this.loadTaskActivities();

    this.loadAssignees();

    bus.all.delete('onTaskActivityTabClicked');
    bus.on('onTaskActivityTabClicked', data => {
      alert("Task activities tab was clicked. You can pull the activities list here.");
    });

    bus.all.delete('onContextMenuClicked');
    bus.on('onContextMenuClicked', data => this.handleContextMenuClicked(data));

    // Receive the activity update from channel here.
    // bus.all.delete('task-activity-update-from-adk-app');
    // bus.on('task-activity-update-from-adk-app', (data) => {
    //   console.log('task-activity-update-from-adk-app payload received in task-activity-tab.vue', this.availableActivities);
    //   alert(this.availableActivities.length);
    //   this.updateTaskActivitiesList(data, this.id);
    // });

  },
  watch: {
    // https://router.vuejs.org/en/advanced/data-fetching.html for more options.
    /*
              // call again the method if the route changes
              '$route': 'fetchData' where fetchData is a method defined above.
          */
    // Since we are passing an asynced data as 'availableItems', it is necessary to watch this prop when it receives new data.
    id: function (newId, oldId) {
      console.log("id in activities tab changed from " + oldId + " to " + newId);
      this.loadTaskActivities(); // ();
    },
    '$route.params.app_name' (newAppName, oldAppName) {
      console.log('AppName changed from ' + oldAppName + ' to ' + newAppName);
      this.appName = newAppName;
    },
    /* Watch for any new availableActivities items added or updated. */
    availableActivities: {

      handler (newValue) {
        // alert("New activity activity-tab component..");
        console.log('new availableActivities entry : ', newValue);


      },
      deep: true
    }
  }
};

</script>

<style scoped>

  .hotkup-toggle-btn {
    display: flex;gap: 5px;
    cursor: pointer;justify-content: flex-end;
    user-select: none;align-items: center;
    padding: 0px 10px;border-radius: 3px;
    transition:0.25s ease-in;
  }

  .hotkup-toggle-btn:hover{
    xbackground: #f0f0f0;
  }

  .toggle-button{
    border-radius: 50px;
    height: 20px;
    width: 40px;
    background-color: #f0f0f0;
    border: 1px solid #80808087;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition:0.25s ease-in;
    cursor: pointer;
  }

  .toggle-button > div{
    position: absolute;
    transition: 0.25s ease-in;
    border-radius: 30px;
    height: 10px;
    width: 10px;
    background-color: #ffffff;
    border: 1px solid #808080b3;
    padding: 2px;
    margin-left: 3px;
    margin-right: 3px;
  }

  .toggle-button.on {
    background-color: #8bc34a;
  }

  .toggle-button.on > div {
    margin-left: 20px;
  }

  .activities_list{
    overflow-x: hidden;
  }

  .activities_list:hover{
    overflow-x: auto;
  }

  .just_for_debugging{
    display: none;
  }

  .dull-text{
    color: #8080809c;
    background: #ffffff !important;
    min-height: 30px !important;
    border-radius: 5px !important;
    margin-top: 15px;
    margin-bottom: 15px;
    padding-left: 20px;
    border: 0.5px solid #ffffff;
    border-bottom: 1px solid #8080804f;
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  }

  .activity-sno{
    top: 0px;
    left: -40px;
    height: 20px;
    width: 20px;
    text-align: center;
    border-radius: 2px;
    position: absolute;
    color: #ffffff;
    background: #8BC34A;
    font-size: .55rem;
  }

  .activity_description{
    position: relative;
    padding: 0px 10px 0px 10px;
    min-height: 75px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 3px;
    transition: 0.25s ease-in;
  }

  .activity_description>div{
    margin-bottom:5px;
  }


  .activity_description{
      min-height: auto;
  }

  .mentioned{
    color: #2196f3;
  }

  .mentionListDropdown{
    position: absolute;
    top: -1px;
    left: 5px;
    right: 20px;
    display: flex;
    /* width: 25%; */
    flex-direction: column;
    z-index: 2;
    background: white;
    box-sizing: border-box;
    border: 1px solid #cecece;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
  }

  .mentionListDropdown > div{
    display:flex;
    width:100%;
    padding:15px 15px;
    box-sizing: border-box;
    transition: 0.125s ease-out;
  }

  .mentionListDropdown > div:hover{
    background-color:#f0f0f0;
    cursor:pointer;
  }

  .mentionListDropdown > div.highlighted {
    /* background-color:#f0f0f0; */
    background-color: #258bfe;
    color: white;
  }

  .spinner-2 {
    width:50px;
    height:50px;
    border-radius:50%;
    border:8px solid;
    border-color:lightblue;
    border-right-color: orange;
    animation:s2 1s infinite linear;
    opacity: 0.5;
  }
  @keyframes s2 {to{transform: rotate(1turn)}}

  .hide_display{
    display:none;
  }

  .hidden{
    display:none !important;
  }

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

  .tab-bar > li > a {
    display: flex;
    column-gap: 10px;
  }

  .tab-bar > li .tab_label {
    display: none;
  }

  .tab-bar > li.uk-active .tab_label {
    display: block !important;
  }

  .uk-subnav-pill > * > a {
    font-size: 0.55rem !important;
    border-radius: 0px;
    letter-spacing: 00.055rem;
  }

  .uk-subnav-pill > .uk-active > a {
    border-bottom: 2px solid #3977ff !important;
    color: #4780ff;
    background-color: white !important;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .uk-input, .uk-select:not([multiple]):not([size]) {
      height: 35px;
      vertical-align: middle;
      display: inline-block;
      border-radius: 3px;
  }

  .uk-grid-small > div{
    margin-bottom:0px;
  }

  .uk-form-label {
      font-size: .5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
  }

  .first_column_scrollable {
      overflow: scroll;
      max-height: 350px;
  }

</style>
