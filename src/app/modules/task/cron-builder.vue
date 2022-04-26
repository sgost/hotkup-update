<style scoped>

  .form-inline {
    min-width: 45px;
    display: flex;
  }

  .form-inline label {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: center;
      justify-content: center;
      margin-bottom: 0;
      cursor: pointer;
      user-select:none;

  }

  .form-inline .form-check-input {
      position: relative;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      margin-top: 0;
      margin-right: 0.25rem;
      margin-left: 0;
  }

  .checkbox_container {
    background: whitesmoke;
  }

  .execution_pattern {
    overflow-y: hidden;
  }

  .execution_pattern:hover {
    overflow-y: overlay;
  }
</style>

<template>

  <div style="font-size: 0.7rem;background: rgb(249 250 255);background: #fff;display:grid;grid-template-columns:3fr 2fr;place-items:start start;overflow-y:hidden" class="custom-scroll-bar">

        <div v-if="cronFrequency === 'daily'">
            <form style="width: 90%;margin-top: 0px;padding-top: 0px;padding-right:0px;padding-left: 0px;margin-left: -15px;"
                  class="uk-grid-small uk-grid ui-form" uk-grid onsubmit="return false;">

                  <div class="uk-width-2-3@s" style="margin-top: 0px;">
                      <label class="uk-form-label" for="form-stacked-text">Which Day?</label>
                      <select tabindex="7" class="uk-select" id="daily_basis_frequency" >
                          <option value="Everyday">Everyday</option>
                          <option value="EveryWeekday">Every Weekday</option>
                      </select>
                  </div>
                  <!-- <div class="uk-width-1-3@s" style="margin-top: 0px;">
                      <label class="uk-form-label" for="form-stacked-text">What Time?</label>
                      <input class="uk-input" type="time" id="daily_basis_start_time" placeholder=""  value="10:00" tabindex="8">
                  </div> -->
                  <div class="uk-width-1-3@s" style="margin-top: 0px;display: flex;align-items: flex-end;">
                      <button tabindex="11" id="attachFormTemplateButton" v-on:click="generateDailyCronExpression()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                              style="border: 1px solid rgb(76, 175, 80);border-radius: 3px;background: transparent;min-width: 125px;height: 37px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;color: green;">
                        <div>
                          <div>Generate</div>
                        </div>
                      </button>
                  </div>


            </form>
        </div>

        <div v-else-if="cronFrequency === 'weekly'">
            <form style="width: 100%;margin-top: 0px;padding-top: 0px;padding-right:0px;padding-left: 0px;margin-left: -15px;"
                  class="uk-grid-small uk-grid ui-form" uk-grid onsubmit="return false;">

                  <div class="uk-width-1-1" style="margin-top: 0px;">
                      <label class="uk-form-label" for="form-stacked-text">Which Days?</label>
                      <div style="display: flex;column-gap: 15px;text-transform: none;margin: 0px 0px 10px;border: 1px solid rgb(193, 193, 193);padding: 7px 20px;border-radius: 3px;box-sizing: border-box;" class="days_of_week checkbox_container">
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" v-on:change="generateWeeklyCronExpression()" name="weeklyBasisDaySelection" value="MON">
                                Mon
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" v-on:change="generateWeeklyCronExpression()" name="weeklyBasisDaySelection" value="TUE">
                                Tue
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" v-on:change="generateWeeklyCronExpression()" name="weeklyBasisDaySelection" value="WED">
                                Wed
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" v-on:change="generateWeeklyCronExpression()" name="weeklyBasisDaySelection" value="THU">
                                Thu
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" v-on:change="generateWeeklyCronExpression()" name="weeklyBasisDaySelection" value="FRI">
                                Fri
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" v-on:change="generateWeeklyCronExpression()" name="weeklyBasisDaySelection" value="SAT">
                                Sat
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" v-on:change="generateWeeklyCronExpression()" name="weeklyBasisDaySelection" value="SUN">
                                Sun
                            </label>
                        </div>
                      </div>
                  </div>

                  <!-- <div class="uk-width-1-5@s" style="margin-top: 0px;">
                      <label class="uk-form-label" for="form-stacked-text">What Time?</label>
                      <input class="uk-input" type="time" value="10:00" id="weekly_basis_start_time"  v-on:input="generateWeeklyCronExpression()" placeholder="" tabindex="8">
                  </div> -->

                  <div class="uk-width-1-5@s" style="margin-top: 0px;display:none">
                      <label class="uk-form-label" for="form-stacked-text" style="opacity:0">Gen Button</label>
                      <button tabindex="11" id="attachFormTemplateButton" v-on:click="generateWeeklyCronExpression()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                              style="border: 1px solid rgb(76, 175, 80);border-radius: 3px;background: transparent;min-width: 125px;height: 37px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;color: green;margin-top: 0px;">
                        <div style="">
                          <div>Generate</div>
                        </div>
                      </button>
                  </div>



            </form>
        </div>

        <div v-else-if="cronFrequency === 'monthly'">
            <form style="width: 90%;margin-top: 0px;padding-top: 0px;padding-right:0px;padding-left: 0px;margin-left: -15px;"
                  class="uk-grid-small uk-grid ui-form" uk-grid onsubmit="return false;">

                  <div class="uk-width-1-1" style="margin-top: 0px;">
                      <!-- <label class="uk-form-label" for="form-stacked-text" style="">Which Months? </label> -->
                      <div style="width: fit-content;margin-bottom: 10px;">
                        <select id="monthly_basis_month_selection_option" class="uk-select" v-on:change="updateMonthlyBasisMonthSelectionOption()">
                          <option value="all_months">Run every month</option>
                          <option value="selected_months">Run on selected months only</option>
                        </select>
                      </div>
                      <div style="display:flex;column-gap:15px;row-gap: 5px;flex-flow:wrap;text-transform:none;margin:0px 0px 10px 0px;border:1px solid #c1c1c1;padding:7px 5px;border-radius:3px;font-family:'Nunito';font-size:0.45rem;" class="days_of_week checkbox_container">
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" checked  v-on:change="updateSelectedMonths()" class="form-check-input" name="monthlyBasisMonthSelection" value="JAN">
                                JAN
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" checked v-on:change="updateSelectedMonths()" class="form-check-input" name="monthlyBasisMonthSelection" value="FEB">
                                FEB
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" checked v-on:change="updateSelectedMonths()" class="form-check-input" name="monthlyBasisMonthSelection" value="MAR">
                                MAR
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" checked v-on:change="updateSelectedMonths()" class="form-check-input" name="monthlyBasisMonthSelection" value="APR">
                                APR
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" checked v-on:change="updateSelectedMonths()" class="form-check-input" name="monthlyBasisMonthSelection" value="MAY">
                                MAY
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" checked v-on:change="updateSelectedMonths()" class="form-check-input" name="monthlyBasisMonthSelection" value="JUN">
                                JUN
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" checked v-on:change="updateSelectedMonths()" class="form-check-input" name="monthlyBasisMonthSelection" value="JUL">
                                JUL
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" checked v-on:change="updateSelectedMonths()" class="form-check-input" name="monthlyBasisMonthSelection" value="AUG">
                                AUG
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" checked v-on:change="updateSelectedMonths()" class="form-check-input" name="monthlyBasisMonthSelection" value="SEP">
                                SEP
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" checked v-on:change="updateSelectedMonths()" class="form-check-input" name="monthlyBasisMonthSelection" value="OCT">
                                OCT
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" checked v-on:change="updateSelectedMonths()" class="form-check-input" name="monthlyBasisMonthSelection" value="NOV">
                                NOV
                            </label>
                        </div>
                        <div class="form-inline ">
                            <label class="form-check-label">
                                <input type="checkbox" checked v-on:change="updateSelectedMonths()" class="form-check-input" name="monthlyBasisMonthSelection" value="DEC">
                                DEC
                            </label>
                        </div>
                      </div>
                      <div class="form-inline " style="float:right;display:none">
                          <label class="form-check-label" style="text-transform:lowercase;">
                              <input type="checkbox" v-on:change="selectAllMonths()" class="form-check-input" id="monthlyBasisSelectAllMonths" value="ALL">
                              Select all months
                          </label>
                      </div>
                  </div>
                  <div class="uk-width-1-1" style="margin-top: 20px;">
                      <!-- <label class="uk-form-label" for="form-stacked-text" style="">Which Dates? </label> -->
                      <div style="width: fit-content;margin-bottom: 10px;">
                        <select id="monthly_basis_date_selection_option" class="uk-select" v-on:change="updateMonthlyBasisDateSelectionOption()">
                          <option value="all_dates">Run on all dates</option>
                          <option value="all_weekdays_only">Run on all weekdays</option>
                          <option value="selected_dates">Run on selected dates only</option>
                        </select>
                      </div>
                      <div v-if="monthlyBasis.customDatesSelected" style="display: flex;gap: 5px 15px;flex-flow: wrap;text-transform: none;margin: 0px 0px 10px;border: 1px solid rgb(193, 193, 193);padding: 7px 5px;border-radius: 3px;font-family: Nunito;font-size: 0.45rem;box-sizing: border-box;" class="days_of_week checkbox_container">
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="1">1</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="2">2</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="3">3</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="4">4</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="5">5</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="6">6</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="7">7</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="8">8</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="9">9</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="10">10</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="11">11</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="12">12</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="13">13</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="14">14</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="15">15</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="16">16</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="17">17</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="18">18</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="19">19</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="20">20</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="21">21</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="22">22</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="23">23</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="24">24</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="25">25</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="26">26</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="27">27</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="28">28</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="29">29</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="30">30</label></div>
                        <div class="form-inline form-inline-date"><label class="form-check-label"><input type="checkbox" xchecked  v-on:change="updateSelectedDates()" class="form-check-input" name="monthlyBasisDateSelection" value="31">31</label></div>
                      </div>
                      <div class="form-inline " style="float:right;display:none">
                          <label class="form-check-label" style="text-transform:lowercase;">
                              <input type="checkbox" v-on:change="selectAllDates()" class="form-check-input" id="monthlyBasisSelectAllDates" value="ALL">
                              Select all dates
                          </label>
                      </div>
                  </div>

                  <!-- <div class="uk-width-1-3@s" style="margin-top: 20px;">
                      <label class="uk-form-label" for="form-stacked-text">What Time?</label>
                      <input class="uk-input" type="time" value="10:00" id="monthly_basis_start_time" v-on:input="updateSelectedDates()"  placeholder="" tabindex="8">
                  </div> -->

                  <div class="uk-width-1-3@s" style="margin-top: 20px;display: flex;flex-direction: column;display:none;">
                      <label class="uk-form-label" for="form-stacked-text" style="opacity:0">Gen Button</label>
                      <button tabindex="11" id="attachFormTemplateButton" v-on:click="generateMonthlyCronExpression()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                              style="border: 1px solid rgb(76, 175, 80);border-radius: 3px;background: transparent;min-width: 125px;height: 37px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;color: green;margin-top: 0px;">
                        <div style="">
                          <div>Generate</div>
                        </div>
                      </button>
                  </div>
            </form>
        </div>


        <div class="samples_display" style="border-left: 1px solid rgb(229, 229, 229);flex-grow: 1;padding: 10px;min-height: 300px;display: flex;justify-content: center;align-items: center;width: 75%;box-sizing: border-box;flex-direction: column;">
          <div v-if="isGeneratedExpressionValid === 'valid'" class="uk-width-1-1" style="margin-top: 0px;">
              <label class="uk-form-label" for="form-stacked-text" style="text-transform: capitalize;font-size: 0.65rem;color: black;">Generated Expression</label>
              <div>
                  <div style="background: whitesmoke;padding: 10px;border-radius: 3px;text-transform: none;word-spacing: 10px;">{{generatedExpression}}</div>
                  <hr>
                  <div style="color: #2196f3;">
                    <div style="text-transform: none;border-bottom: 10px solid #2e99f600;">Task will be created in the following times</div>
                    <ol class="execution_pattern custom-scroll-bar" style="height: 200px;font-family: monospace;font-size: 0.55rem;margin-top: 5px;">
                      <li v-for="val in sampleExpressionValues">
                        <span v-if="!val.startsWith('---')">{{val}}</span>
                        <span v-else-if="val.startsWith('---')" style="color: #e91e63;">{{val}}</span>
                      </li>
                    </ol>
                  </div>
              </div>
          </div>
          <div v-if="isGeneratedExpressionValid === 'valid'"  class="uk-width-1-1" style="margin-top: 0px;display: flex;align-items: flex-end;">
              <button tabindex="11" id="attachFormTemplateButton" v-on:click="use()" class="clickable-btn uk-button uk-button-danger uk-button-small uk-grid-margin uk-first-column end-call-button"
                      style="background-color: rgb(76, 175, 80);border-radius: 3px;min-width: 125px;height: 37px;font-size: 0.65rem;line-height: 30px;font-weight: normal !important;flex-grow: 1;text-align: center;justify-content: center;">
                  <div>Use Expression</div>
              </button>
          </div>
          <div v-if="isGeneratedExpressionValid === 'invalid'" class="uk-width-1-1" style="margin-top: 0px;">
              <label class="uk-form-label" for="form-stacked-text">Invalid Expression</label>
              <div>
                  <div style="background: whitesmoke;padding: 10px;border-radius: 3px;text-transform: none;word-spacing: 10px;">{{generatedExpression}}</div>
                  <hr>
                  <div style="color:red">Error is {{errorMessage}}</div>
              </div>
          </div>
          <div v-if="isGeneratedExpressionValid === 'not-generated'" style="display: flex;justify-content: center;align-items: center;flex-grow: 1;width: 100%;height: 100%;text-align: center;line-height: 25px;text-transform: none;flex-direction: column;">
            <div>No sample times to display. </div>
            <div>Please select the day, time to generate sample data.</div>
          </div>
        </div>
  </div>


</template>

<script>

import { bus } from './../../../main.js';
import userMixinLib from './../../mixins/lib/user_mixin_lib';
import utilsMixinLib from './../../mixins/lib/utils_lib';
import uiListMixinLib from './../../mixins/lib/ui-list.js';

export default {

  props: ['cronFrequency'],
  watch: {

  },
  mixins: [
    userMixinLib,
    utilsMixinLib,
    uiListMixinLib
  ],
  data: function () {
    return {
      selectedDefaultTime: "10:00",
      isGeneratedExpressionValid: 'not-generated',
      generatedExpression: null,
      sampleExpressionValues: [],
      errorMessage: "",
      monthlyBasis: {
        selectedMonths: [],
        areAllMonthsSelected: false,
        selectedDates: [],
        areAllDatesSelected: false,
        customDatesSelected: false
      }
    };
  },
  methods: {
    use () {
      bus.emit('cronExpressionGenerated', this.generatedExpression);
    },
    updateMonthlyBasisMonthSelectionOption () {

        const monthly_basis_month_selection_option = document.getElementById("monthly_basis_month_selection_option").value;

        if (monthly_basis_month_selection_option === "all_months") {

            document.getElementsByName("monthlyBasisMonthSelection")
                    .forEach(month => {
                      month.checked = true;
                    });
        }
        else if (monthly_basis_month_selection_option === "selected_months") {

          document.getElementsByName("monthlyBasisMonthSelection")
                  .forEach(month => {
                    month.checked = false;
                  });
        }

    },
    updateMonthlyBasisDateSelectionOption () {

        const monthly_basis_date_selection_option = document.getElementById("monthly_basis_date_selection_option").value;

        if (monthly_basis_date_selection_option === "all_dates") {

            document.getElementsByName("monthlyBasisDateSelection")
                    .forEach(dt => {
                      dt.checked = true;
                    });

          this.monthlyBasis.customDatesSelected = false;
          this.generateMonthlyCronExpression();
        }
        else if (monthly_basis_date_selection_option === "all_weekdays_only") {

            document.getElementsByName("monthlyBasisDateSelection")
                    .forEach(dt => {
                      dt.checked = false;
                    });

          this.monthlyBasis.customDatesSelected = false;
          this.generateMonthlyCronExpression();
        }
        else if (monthly_basis_date_selection_option === "selected_dates") {

          document.getElementsByName("monthlyBasisDateSelection")
                  .forEach(dt => {
                    dt.checked = false;
                  });

          this.monthlyBasis.customDatesSelected = true;
        }

    },
    updateSelectedDates () {

      this.monthlyBasis.selectedDates = [];
      let areAllDatesSelected = true; // By default assume that all months are selected. Then iterate to find if any one is unselected, if yes, then uncheck the 'select all months' checkbox
      document.getElementsByName("monthlyBasisDateSelection")
              .forEach(dt => {

                if (!dt.checked) {
                  areAllDatesSelected = false;
                }
                else {
                  this.monthlyBasis.selectedDates.push(dt.value);
                }
              });

      if (areAllDatesSelected) {
        document.getElementById("monthlyBasisSelectAllDates").checked = true;
        this.monthlyBasis.areAllDatesSelected = true;
        document.getElementById("monthly_basis_date_selection_option").value = "all_dates";
      }
      else {
        document.getElementById("monthlyBasisSelectAllDates").checked = false;
        this.monthlyBasis.areAllDatesSelected = false;
        document.getElementById("monthly_basis_date_selection_option").value = "selected_dates";
      }

      this.updateSelectedMonths();
    },
    updateSelectedMonths () {

      this.monthlyBasis.selectedMonths = [];
      let areAllMonthsSelected = true; // By default assume that all months are selected. Then iterate to find if any one is unselected, if yes, then uncheck the 'select all months' checkbox
      document.getElementsByName("monthlyBasisMonthSelection")
              .forEach(month => {

                if (!month.checked) {
                  areAllMonthsSelected = false;
                }
                else {
                  this.monthlyBasis.selectedMonths.push(month.value);
                }
              });



      if (areAllMonthsSelected) {
        document.getElementById("monthlyBasisSelectAllMonths").checked = true;
        this.monthlyBasis.areAllMonthsSelected = true;
        document.getElementById("monthly_basis_month_selection_option").value = "all_months";
      }
      else {
        document.getElementById("monthlyBasisSelectAllMonths").checked = false;
        this.monthlyBasis.areAllMonthsSelected = false;
        document.getElementById("monthly_basis_month_selection_option").value = "selected_months";
      }

      this.generateMonthlyCronExpression();
    },
    selectAllMonths () {

      if (document.getElementById("monthlyBasisSelectAllMonths").checked) {
        document.getElementsByName("monthlyBasisMonthSelection")
                .forEach(month => {
                  month.checked = true;
                });
      }
      else {
        document.getElementsByName("monthlyBasisMonthSelection")
                .forEach(month => {
                  month.checked = false;
                });
      }

      this.updateSelectedMonths();
    },
    selectAllDates () {

      // alert(document.getElementById("monthlyBasisSelectAllDates").checked);

      if (document.getElementById("monthlyBasisSelectAllDates").checked) {
        document.getElementsByName("monthlyBasisDateSelection")
                .forEach(dt => {
                  dt.checked = true;
                });
      }
      else {
        document.getElementsByName("monthlyBasisDateSelection")
                .forEach(dt => {
                  dt.checked = false;
                });
      }

      this.updateSelectedDates();
    },
    validateExpressionAndGetSamples (expression) {

      // Attempting to use Comlink Worker
          const post_url = './cron-expression/validate'; // Validate expression

          const form = {
            cronExpression: expression
          };

          axios.post(process.env.VUE_APP_API_URL + post_url, form)
            .then((dataResponse) => {
              console.log(dataResponse);
              const hasError = dataResponse.data.hasError;

              if (!hasError) {
                  this.isGeneratedExpressionValid = 'valid';
                  this.sampleExpressionValues = dataResponse.data.sampleDates;
              }
              else {
                this.isGeneratedExpressionValid = 'invalid';
                this.sampleExpressionValues = [];
                this.errorMessage = dataResponse.data.errorMessage;
              }

            });
      // Comlink worker ends here
    },
    generateDailyCronExpression () {

      const dailyFrequency = document.getElementById("daily_basis_frequency").value;
      const dailyStartTime = this.selectedDefaultTime; // document.getElementById("daily_basis_start_time").value;
      const hour = dailyStartTime.split(":")[0];
      const minute = dailyStartTime.split(":")[1];


      let expression = ""; // CRON EXP = "S M H DoM Mo DoW Y";

      if (dailyFrequency === "Everyday") {
          // 0 35 10 ? * * *
          expression = "0 " + minute + " " + hour + " ? * * *";
      }
      else if (dailyFrequency === "EveryWeekday") {
          // 0 35 10 ? * MON-FRI *
          expression = "0 " + minute + " " + hour + " ? * MON-FRI *";
      }

      this.generatedExpression = expression;
      this.validateExpressionAndGetSamples(expression);
    },
    generateWeeklyCronExpression () {

      const weeklyBasisSelectedDays = [];
      document.getElementsByName("weeklyBasisDaySelection").forEach(cb => {
        if (cb.checked) {
            weeklyBasisSelectedDays.push(cb.value);
        }
      });

      const dailyStartTime = this.selectedDefaultTime; // document.getElementById("weekly_basis_start_time").value;
      const hour = dailyStartTime.split(":")[0];
      const minute = dailyStartTime.split(":")[1];


      let expression = ""; // CRON EXP = "S M H DoM Mo DoW Y";
          expression = "0 " + minute + " " + hour + " ? * " + weeklyBasisSelectedDays.join(",") + " *";

      this.generatedExpression = expression;
      this.validateExpressionAndGetSamples(expression);

    },
    generateMonthlyCronExpression () {

      // Create Expression
      let expression = ""; // CRON EXP = "S M H DoM Mo DoW Y";

      const dailyStartTime = this.selectedDefaultTime; // document.getElementById("monthly_basis_start_time").value;
      const hour = dailyStartTime.split(":")[0];
      const minute = dailyStartTime.split(":")[1];

      const monthly_basis_date_selection_option = document.getElementById("monthly_basis_date_selection_option").value;

      if (monthly_basis_date_selection_option === "all_dates") {

          if (this.monthlyBasis.areAllMonthsSelected || this.monthlyBasis.selectedMonths.length === 0) {
            // 0 35 10 ? JAN-DEC * *
            expression = "0 " + minute + " " + hour + " ? JAN-DEC * *";
          }
          else {
            // 0 35 10 ? JAN-DEC * *// 0 35 10 ? JAN,MAR,MAY * *
            expression = "0 " +
                          minute + " " +
                          hour + " " +
                          "?" + " " +
                          this.monthlyBasis.selectedMonths.join(",") + " " +
                          "*" + " " +
                          "*";
          }

      }
      else if (monthly_basis_date_selection_option === "all_weekdays_only") {

          if (this.monthlyBasis.areAllMonthsSelected || this.monthlyBasis.selectedMonths.length === 0) {
            // 0 35 10 ? JAN-DEC * *
            expression = "0 " + minute + " " + hour + " ? JAN-DEC MON-FRI *";
          }
          else {
            // 0 35 10 ? JAN-DEC * *// 0 35 10 ? JAN,MAR,MAY * *
            expression = "0 " +
                          minute + " " +
                          hour + " " +
                          "?" + " " +
                          // "*" + " " +
                          this.monthlyBasis.selectedMonths.join(",") + " " +
                          "MON-FRI" + " " +
                          "*";
          }

      }
      else if (this.monthlyBasis.areAllMonthsSelected || this.monthlyBasis.selectedMonths.length === 0) {

          if (this.monthlyBasis.areAllDatesSelected || this.monthlyBasis.selectedDates.length === 0) {
            // 0 35 10 ? JAN-DEC * *
            expression = "0 " + minute + " " + hour + " ? JAN-DEC * *";
          }
          else {
            // 0 35 10 ? JAN-DEC * *// 0 35 10 ? JAN,MAR,MAY * *
            expression = "0 " +
                          minute + " " +
                          hour + " " +
                          this.monthlyBasis.selectedDates.join(",") + " " +
                          "*" + " " +
                          "?" + " " +
                          "*";
          }

      }
      else if (!this.monthlyBasis.areAllMonthsSelected) {

          if (this.monthlyBasis.areAllDatesSelected || this.monthlyBasis.selectedDates.length === 0) {
            // 0 35 10 ? JAN-DEC * *
            expression = "0 " +
                          minute + " " +
                          hour + " " +
                          "?" + " " +
                          this.monthlyBasis.selectedMonths.join(",") + " " +
                          "*" + " " +
                          "*";
          }
          else {
            // 0 35 10 ? JAN,MAR,MAY * *
            expression = "0 " +
                          minute + " " +
                          hour + " " +
                          this.monthlyBasis.selectedDates.join(",") + " " +
                          this.monthlyBasis.selectedMonths.join(",") + " " +
                          "?" + " " +
                          "*";
          }

      }

      this.generatedExpression = expression;
      this.validateExpressionAndGetSamples(expression);
    }

  },
  created: function () {

  },
  computed: {

  },
  mounted: function () {

    bus.on("setCronExpressionBuilderTime", data => {

      if (data) {
        this.selectedDefaultTime = data.split("T")[1];
      }
    });
  }
};

</script>
