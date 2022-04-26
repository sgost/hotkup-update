<template>

  <div style="width:100%">
    <div class="ui-selectbox" v-bind:id="name + '_selectbox' " style="width:100%" >

      <div style="width:100%">
        <div style="display: flex;flex-direction:column">

          <div v-on:click="showListOptions(false, $event)" data-tag="selectbox" style="overflow-y:hidden" class="ui-selectbox-border" v-bind:id="name + '_selectbox_container'" v-bind:tabindex="$attrs.data_tabindex">

            <!-- Show this chipslist when the selectbox is blurred -->
            <div v-show="!showOptions" class="ui-chips-list condensed_list"  data-tag="chips_list" >
                <template v-bind:key="item" v-for="item in condensedItems.items">
          		      <div class="ui-chips-item-2">

                				<div v-if="item.isHintChip" v-bind:uk-tooltip="condensedItems.hintString" class="hinting-chip">{{item.label}}</div>
                        <div v-else v-bind:uk-tooltip="item.hint">{{item.label}}</div>

                        <!-- Don't display the delete 'x' if its a hinting-chip -->
                				<div v-if="item.isHintChip" class="delete-chips-item-2"></div>
                        <div v-else class="delete-chips-item-2" v-bind:uk-tooltip="'Remove ' + item.hint" v-on:click="removeFromSelectedList(item.setItem)">x</div>
          		      </div>
      	        </template>
            </div>

            <!-- Show this chipslist when the selectbox is focussed -->
            <div v-show="showOptions" class="ui-chips-list" data-tag="chips_list_short" >
                <template v-bind:key="item.id" v-for="item in newlySelectedItems">
          		      <div class="ui-chips-item-2">
                				<div>{{item.shortLabel}}</div>
                				<div class="delete-chips-item-2" v-bind:uk-tooltip="'Remove' + item.shortLabel" v-on:click="removeFromSelectedList(item)"><span>x</span></div>
          		      </div>
      	        </template>
              <input type="text" data-tag="search_input" autocomplete="off" v-on:input="doSearch()" v-model="searchText" v-bind:id="name + '_selectbox_search'" class="dropdown_input">
            </div>
            <div data-tag="trigger" style="" class="ui-selectbox-dropdown-trigger">
              <span uk-icon="triangle-down" style="pointer-events:none" ></span>
            </div>
          </div>
        </div>

        <div v-show="showOptions" v-bind:id="name + '_selectbox_options'" class="ui-selectbox-options-container custom-scroll-bar">
          <template v-bind:key="name + '_' + item.id" v-for="item in availableItemsFormattedForOptionsDisplay">
            <div v-show="item.visible" v-bind:data-key="name + '_' + item.id" v-bind:data-id="item.id" v-bind:class="{'ui-selectbox-option' : true, 'is_visible':item.visible}"  v-on:click="addToSelectedList($event, item)">
                <div>
                  <!--<input type="checkbox"  v-bind:id="name + '_' + item.id"  v-bind:name="name + '_' + item.id" :checked="item.isSelected" readonly>-->
                  <div style="border:1px solid #555;height: 15px;width: 15px;display: grid;"><span v-show="item.isSelected" uk-icon="check"></span></div>
                </div>
                <div style="user-select:none">{{item.fullLabel}}</div>
            </div>
          </template>
        </div>
      </div>

    </div>
  </div>

</template>

<script>

export default {
  props: {
    allowSingleSelectOnly: Boolean,
    name: String,
    maxTagsToDisplay: Number,
    availableItems: Array,
    displayLabelProps: Array,
    tagProperty: String,
    searchProperty: String,
    disableAcronym: Boolean // This prop if TRUE, then instead of displaying the acronym on the tag as labels, it will display the supplied tagProperty value of the item.
  },
  computed: {
    condensedItems: function () {
      const selectedSet = this.newlySelectedItems;
      const sizeOfList = selectedSet.size;
      const maxLabelsToDisplay = this.maxTagsToDisplay;
      const remainingLabels = sizeOfList - maxLabelsToDisplay;

      Set.prototype.getByIndex = function (index) {
        return [...this][index];
      }; // https://stackoverflow.com/questions/44715210/how-to-get-index-based-value-from-set/44715657

      const array = [];
      let remainingNames = '';
      const returnData = {};
      if (remainingLabels > 0) {
        const arrayOfSet = Array.from(selectedSet);

        // First N chips based on maxTagsToDisplay
        for (let i = 0; i < maxLabelsToDisplay; i++) {
          const selectedItem = arrayOfSet[i];
          const itemHintString = this.constructLabelFromDisplayLabelProps(selectedItem);
          const itemInitials = (this.disableAcronym) ? this.getTagProperty(selectedItem) : this.getAcronym(itemHintString);

          // console.log("Condensed Label fn running : " + itemHintString + " , initials : " + itemInitials);

          array.push({
            isHintChip: false,
            label: itemInitials,
            hint: itemHintString,
            setItem: selectedItem // This prop is set because the removeSelectedItem requires the entire set object.
          });
        }

        // Remaining N chips based on subtraction of maxTagsToDisplay
        // The "Chip" which will display more items label and the tooltip hint.
        array.push({
          isHintChip: true,
          label: remainingLabels + ' more..'
        });

        // To display the tooltip on the "N more.." tag, we construct the string with the remaining items
        for (let i = maxLabelsToDisplay; i < selectedSet.size; i++) {
          const selectedItem = arrayOfSet[i];
          const itemHintString = this.constructLabelFromDisplayLabelProps(selectedItem);
          remainingNames += itemHintString + '<br>';
        }

        // Items and Tooltips returned.
        returnData.items = array;
        returnData.hintString = remainingNames;
      } else {
        selectedSet.forEach(item => {
          const hintString = this.constructLabelFromDisplayLabelProps(item);

          array.push({
            isHintChip: false,
            label: (this.disableAcronym) ? this.getTagProperty(item) : this.getAcronym(hintString),
            hint: hintString, // item.firstName + " " + item.lastName,
            setItem: item // This prop is set because the removeSelectedItem requires the entire set object.
          });
        });

        returnData.items = array;
        returnData.hintString = '';
      }

      return returnData;
    }

  },
  data: function () {
    return {
      isSingleSelectOnly: !!((this.allowSingleSelectOnly != undefined && this.allowSingleSelectOnly)),
      newlySelectedItems: new Set(),
      newlySelectedItemsCondensed: new Set(), // This set has the same values, but only the initials.
      showOptions: false,
      displayLabelPropsArray: this.displayLabelProps.split(','),
      searchText: '',
      mutableCopyOfAvailableItems: new Set(),
      availableItemsFormattedForOptionsDisplay: new Set(),
      searchPropertyArray: this.searchProperty.split(','),
      currentlyHighlightedOptionItem: -1,
      attributes: this.$attrs
    };
  },
  methods: {
    // This function constructs the label string from passed displayLabelProps.
    constructLabelFromDisplayLabelProps (item) {
      let hintString = '';
      this.displayLabelPropsArray.forEach(labelProp => {
        hintString = hintString + item[labelProp] + ' ';
      });
      hintString = hintString.trim();
      return hintString;
    },

    getTagProperty (item) {
      return item[this.tagProperty];
    },
    getAcronym (str) {
      // Converts 'Bhaskara Vignesh into BV'

      const strArray = str.split(' ');
      let initials = '';

      strArray.forEach(item => {
        initials += item[0];
      });

      return initials.toUpperCase();
    },
    handleClickEventOnBody (event) {
      const foundParent = event.target.closest('#' + this.name + '_selectbox');
      if (foundParent === null) {
        // This means the target on which the click happened is not within the ui-selectbox div, so you can close the listOptions dropdown.
        // alert("body click suggests to close dropdown");
        this.showListOptions(false, null, true);
      }
    },
    handleKeyPress (event) {
      console.log('Key pressed..', event);

      if (event.key === 'ArrowDown') {
        console.log('Handle keyboard arrow down..' + this.currentlyHighlightedOptionItem);

        // Reset Highlighted option
        document
          .querySelectorAll('#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible')
          .forEach(item => item.classList.remove('highlighted'));

        this.currentlyHighlightedOptionItem += 1;

        // Reset if it has reached the last child
        if (
          this.currentlyHighlightedOptionItem >=
            document.querySelectorAll('#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible').length
        ) {
          this.currentlyHighlightedOptionItem = 0;
          // Focus 1st option
        }

        // Add the highlighted class to the option div.
        document
          .querySelectorAll('#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible')
          [this.currentlyHighlightedOptionItem].classList.add('highlighted');

        // document.querySelectorAll("#" + this.name + "_selectbox_options > .ui-selectbox-option.is_visible")[this.currentlyHighlightedOptionItem]
        //        .scrollIntoView();

        const target = document.querySelectorAll('#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible')[this.currentlyHighlightedOptionItem];
        target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;
      } else if (event.key === 'ArrowUp') {
        console.log('Handle keyboard arrow up..' + this.currentlyHighlightedOptionItem);

        // Reset Highlighted option
        document
          .querySelectorAll('#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible')
          .forEach(item => item.classList.remove('highlighted'));

        this.currentlyHighlightedOptionItem -= 1;

        // Reset if it has reached the first child, then highlight the last option for circularity
        if (this.currentlyHighlightedOptionItem < 0) {
          this.currentlyHighlightedOptionItem =
              document.querySelectorAll('#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible').length -
              1;
          // Focus last option
        }

        // Add the highlighted class to the option div.
        document
          .querySelectorAll('#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible')
          [this.currentlyHighlightedOptionItem].classList.add('highlighted');

        // document.querySelectorAll("#" + this.name + "_selectbox_options > .ui-selectbox-option.is_visible")[this.currentlyHighlightedOptionItem].scrollIntoView();

        const target = document.querySelectorAll(
          '#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible'
        )[this.currentlyHighlightedOptionItem];
        target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;
      } else if (event.key === 'Enter') {
        // alert("Selected option is index : " + this.currentlyHighlightedOptionItem);
        // Here instead of using the currentlyHighlightedOptionItem's index, get the data-id attribute.

        // Add the highlighted class to the option div.
        const highlightedElement = document.querySelector(
          '#' + this.name + '_selectbox_options > .ui-selectbox-option.is_visible.highlighted'
        );
        if (highlightedElement !== null) {
          const highlightedOptionId = (highlightedElement.getAttribute('data-id'));
          const localFilter = function (item) {
            console.log('Checking if ' + item.id + ' === ' + highlightedOptionId);
            return item.id === highlightedOptionId;
          };

          const filteredArray = Array.from(this.availableItemsFormattedForOptionsDisplay).filter(localFilter);
          console.log(filteredArray);
          const selectedItem = filteredArray[0];
          console.log('Selected Item via keypress enter is ', selectedItem);
          this.addToSelectedList(null, selectedItem);
        }
      } else if (event.key === 'Escape' || event.key === 'Tab') {
        this.showListOptions(false);
        document.querySelector('#' + this.name + '_selectbox_container').focus();
      }

      event.stopPropagation();
    },
    showListOptions (val, event, forceCloseOptions) {

      if (forceCloseOptions) {
        this.showOptions = false;

        // Remove click listener
        document.querySelector('body').removeEventListener('click', this.handleClickEventOnBody, false);
        // Remove Keypress-Listener
        document.querySelector('body').removeEventListener('keydown', this.handleKeyPress, false);

        // console.log("Removed body-click-event listeners..");
        document.querySelector('#' + this.name + '_selectbox').style.zIndex = null;

        return false;
      }

      // If its options are already open and then the dropdown trigger is clicked, then it must close the dropdown.
      // To check if the 'dropdown-trigger' was clicked, we verify the event.target's data-tag attribute
      if (this.showOptions) {

        if (event.target.getAttribute("data-tag") === "trigger" || event.target.getAttribute("data-tag") === "selectbox") {
          this.showOptions = false;

          // Remove click listener
          document.querySelector('body').removeEventListener('click', this.handleClickEventOnBody, false);
          // Remove Keypress-Listener
          document.querySelector('body').removeEventListener('keydown', this.handleKeyPress, false);

          // console.log("Removed body-click-event listeners..");
          document.querySelector('#' + this.name + '_selectbox').style.zIndex = null;

          return false;
        }
      }

      // alert(event.target.localName + " -> " + event.target.getAttribute("data-tag") + " -> " + forceCloseOptions);


      const foundParent = event.target.closest('#' + this.name + '_selectbox');
      if (foundParent !== null) {
        // alert("selectbox is in open-state");
        // This means the target on which the click happened is not within the ui-selectbox div, so you can close the listOptions dropdown.
        // this.showListOptions(false);

        // If the options are being displayed, then ignore this second click
        if (this.showOptions) {
          return false;
        }
      }

      if (val === false) {
        this.showOptions = !this.showOptions;
      }
      else {
        this.showOptions = true;
      }

      if (this.showOptions) {
        setTimeout(() => {
          // Focus the input on opened
          // alert(document.getElementById(this.name + '_selectbox_search').getAttribute("id"));
          document.getElementById(this.name + '_selectbox_search').focus();
        }, 200);

        // Add click-listener
        document.querySelector('body').addEventListener('click', this.handleClickEventOnBody, false);
        // Add Keypress-Listener
        document.querySelector('body').addEventListener('keydown', this.handleKeyPress, false);

        // console.log("Added body-click-event listeners..");
        document.querySelector('#' + this.name + '_selectbox').style.zIndex = 100;
      } else {
        // Remove click listener
        document.querySelector('body').removeEventListener('click', this.handleClickEventOnBody, false);
        // Remove Keypress-Listener
        document.querySelector('body').removeEventListener('keydown', this.handleKeyPress, false);

        // console.log("Removed body-click-event listeners..");
        document.querySelector('#' + this.name + '_selectbox').style.zIndex = null;
      }
    },
    addToSelectedList (event, item) {

      if (event !== null) {
        event.stopPropagation();
      }

      console.log('Item selected :', item, 'isSingleSelectOnly = ', this.isSingleSelectOnly);
      // console.log("Item selected's state : " + item.isSelected)
      // console.log(item['shortLabel'] + ' selected in selectbox ' + this.name)

      // console.log('Before Processing..')
      // console.log(this.newlySelectedItems.size)
      // console.log(this.newlySelectedItems);

      if (this.isSingleSelectOnly) {
        // December 5, 2020
        // For single-select-only selectbox, just reset the set() items. Its not efficient solution, but a temporary hack.
        // Either create a single-select selectbox component or improve upon this codebase, which needs removal of "Set()" datatype.
        // I guess its better to provide a separate component as combining the logics would make it cumbersome.
        // this.newlySelectedItems.forEach((setItem) => {
        //   setItem.isSelected=false;
        // });

        if (item.isSelected !== true) {
          // this.newlySelectedItems = new Set();
          this.newlySelectedItems.add(item);
          item.isSelected = true;
          this.$emit('selectBoxUpdate', this.newlySelectedItems);
        } else {
          this.removeFromSelectedList(item);
        }
      } else {
        if (item.isSelected !== true) {
          // item.firstName = "Mutatable..";
          this.newlySelectedItems.add(item);
          item.isSelected = true;
          this.$emit('selectBoxUpdate', this.newlySelectedItems);
        } else {
          this.removeFromSelectedList(item);
        }
      }

      // console.log('After processing..')
      // console.log("Item selected's state : " + item.isSelected)
      // console.log(this.newlySelectedItems.size)
      // console.log(this.newlySelectedItems)

      document.getElementById(this.name + '_selectbox_search').focus();
    },
    removeFromSelectedList (itemToBeRemoved) {
      this.newlySelectedItems.forEach(item => {
        if (item.id === itemToBeRemoved.id) {
          this.newlySelectedItems.delete(item);
          item.isSelected = false;
          this.$emit('selectBoxUpdate', this.newlySelectedItems);
        }
      });
    },
    formatAvailableItems () {
      const formattedItems = new Set();

      const filteredItems = this.mutableCopyOfAvailableItems; // : Array.from(this.mutableCopyOfAvailableItems).filter(searchFilter);

      // console.log("Filter Query : ", this.searchText);
      // console.log("Filtered Items : ", filteredItems);

      filteredItems.forEach(item => {
        const itemCopy = { ...item }; // This is the most important line of code. If we don't do a copy of the item, then any change made to this item here, will
        // change the item in the parent component as all the objects are passed by reference.
        // Cloning of the "availableItems" didn't work as expected because cloning happens only at the top level and not deeply.
        // So instead of deep-cloning the array, we are cloning the item individually and putting it into a new array.

        itemCopy.inputName = this.name;
        itemCopy.fullLabel = this.constructLabelFromDisplayLabelProps(itemCopy);
        itemCopy.shortLabel = itemCopy[this.tagProperty];
        itemCopy.visible = true; // Toggle this property if user's search doesn't match this item to hide/show in the list-options.
        formattedItems.add(itemCopy);
      });

      // console.log("formattedItems: ", formattedItems);
      return formattedItems;
    },
    doSearch: function () {
      console.log('handleSearch computed property is running.. for component : ', this.name);

      this.searchText = this.searchText.trim();

      if (this.searchText.trim() === '') {
        // If the searchquery is empty,then make all elements visible in the option
        Array.from(this.availableItemsFormattedForOptionsDisplay).forEach(item => {
          item.visible = true;
        });

        return false;
      }

      // Here we are looking for non-matching items, to change their visibility to 'hide'
      Array.from(this.availableItemsFormattedForOptionsDisplay).forEach(item => {
        let doesMatchSearch = false;
        this.searchPropertyArray.forEach(searchProp => {
          if (item[searchProp].toLowerCase().includes(this.searchText.toLowerCase())) {
            doesMatchSearch = true;
          }
        });

        if (!doesMatchSearch)
        // If neither of the supplied searchprops match for the item, then mark them as visible=false
        { item.visible = false; } else item.visible = true;
      });
    },
    handleOnElementFocus (event) {
      console.log(this.name + ' selectbox focussed : ', event);
      event.target.addEventListener('keydown', this.handleKeyDownOnSelectWhenFocussed, false);
    },
    handleOnElementBlur (event) {
      console.log(this.name + ' selectbox focussed out : ', event);
      event.target.removeEventListener('keydown', this.handleKeyDownOnSelectWhenFocussed, false);

      // Close the options-pane if opened-state.
      // if(this.showOptions)
      //    this.showListOptions(false);
    },
    handleKeyDownOnSelectWhenFocussed (event) {
      if (event.key === 'ArrowDown') {
        // Open if the options-pane is closed-state
        if (!this.showOptions) this.showListOptions(true);
      }
    },

    handleAvailableItems () {
      // Reset the set before adding the newly available items.
      this.newlySelectedItems = new Set();
      this.mutableCopyOfAvailableItems = new Set();

      // Automatically add selected tags when this component is loaded with existing selected values.
      // console.log("Mounted availableItemsFormattedForOptionsDisplay : ", this.availableItemsFormattedForOptionsDisplay);
      const selectedItemsOnly = item => item.isSelected; // Filter to select only the selected items.

      // Make a mutable copy of the supplied array as modification of the supplied array's items would have global consequences (pass-by-reference)
      Array.from(this.availableItems)
           .forEach(item => this.mutableCopyOfAvailableItems.add(item));

      // Format the availableItems and create a different set. with additional properties like 'shortLabel', 'isVisible' etc..
      this.availableItemsFormattedForOptionsDisplay = this.formatAvailableItems();

      Array.from(this.availableItemsFormattedForOptionsDisplay)
          .filter(selectedItemsOnly)
          .forEach(item => this.newlySelectedItems.add(item));

      // ------ Remove these event listeners when the component is destroyed ---------------
    }
  },
  created: function () {},
  mounted: function () {
    // alert(this.attributes);
    // console.log('attributes = ', this.attributes)
    // console.log('availableItems = ', this.availableItems);

    if (this.availableItems !== undefined && this.availableItems.length > 0) {
      this.handleAvailableItems();
      this.$emit('selectBoxUpdate', this.newlySelectedItems);
    }

    // Fire an event when the selectbox is focussed to add/remove arrowKeydown Events (To open the options pane)
    document
      .querySelector('#' + this.name + '_selectbox_container')
      .addEventListener('focus', this.handleOnElementFocus, false);

    // Fire an event when the selectbox is outOfFocus to add/remove arrowKeydown Events (To open the options pane)
    document
      .querySelector('#' + this.name + '_selectbox_container')
      .addEventListener('blur', this.handleOnElementBlur, false);
  },
  watch: {

    // Since we are passing an asynced data as 'availableItems', it is necessary to watch this prop when it receives new data.
    availableItems: function (newAvailableItems, oldAvailableItems) {
      console.log('availableItems of ' + this.name + ' changed from ' + oldAvailableItems.length + ' to ' + newAvailableItems.length);
      if (newAvailableItems !== undefined && newAvailableItems.length > 0) {
        this.handleAvailableItems();
        this.$emit('selectBoxUpdate', this.newlySelectedItems);
      }
    }
  }
};

</script>

<style scoped>

  .ui-selectbox {
    position: relative;
    background: white;
    background: #fbfbfb;
  }

  .ui-selectbox-dropdown-trigger {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 25px;
    min-height: 25px;
    margin-left: auto;
    background: #fff;
    background: #fbfbfb;
    border-radius: 2px;
    cursor: pointer;
    transition: .2s linear;
  }

  .ui-selectbox-dropdown-trigger:hover {
    background: #dedede;
  }

  .ui-selectbox-options-container {
    position: absolute;
    left: 0;
    right: 0;
    background-color: #ffffff;
    border: 1px solid #d8d8d8;
    border-top: 0px;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.32), 0px 6px 14px 0px rgb(0 0 0 / 14%);
    max-height: 200px;
    overflow-y: auto;
    z-index: 100;
  }

  .ui-selectbox-option {
    display: flex;
    column-gap: 10px;
    cursor: pointer;
    padding: 5px;
  }

  .ui-selectbox-option:hover {
    background-color: #f0f0f0;
  }

  .ui-chips-list {
    display: flex;
    column-gap: 5px;
    flex-wrap: wrap;
    row-gap: 5px;
    padding: 5px;
  }

  .ui-chips-item {
    background-color: #e6e6e6 !important;
    color: #696969;
    border: 1px solid #b1b1b1;
    white-space: pre-line !important;
    border-radius: 11px;
    font-weight: normal;
    display: flex;
    font-size: 0.65rem;
    column-gap: 10px;
    padding: 2px 10px 2px 10px;
  }

  .delete-chips-item {
    cursor: pointer;
    margin-left: auto;
  }

  .ui-chips-item-2 {
    color: #696969;
    white-space: pre-line !important;
    font-weight: 400;
    display: flex;
    font-size: 0.65rem;
  }

  .ui-chips-item-2 div:nth-child(1) {
    text-transform: uppercase;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border: 1px solid #bdbdbd;
    border-right: 0;
    padding: 0px 5px 0px 10px;
    xbackground-color: #e6e6e6 !important;
    font-size: 0.55rem;
    letter-spacing: 1px;
    cursor: default;
    height: 22px;
    display: grid;
    place-content: center;
    background: #f2f2f2;
  }

  .delete-chips-item-2 {
    cursor: pointer;
    margin-left: auto;
    text-transform: uppercase;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border: 1px solid #bdbdbd;
    border-left: 0;
    xbackground-color: #bdbdbd !important;
    font-size: 0.45rem;
    align-content: center;
    height: 22px;
    width: 22px;
    display: grid;
    place-items: center;
    background: #f2f2f2;
  }

  .dropdown_input {
    /*
    flex-basis: 50px;
    min-width: 50px;
    flex: 1;
    border: 0px;
    background: whitesmoke;
    border-radius: 2px;
    padding: 0px 10px;
    min-height: 25px;
    */

    flex-basis: 30px;
    flex: 1;
    border: 0;
    background: #f5f5f5;
    border-radius: 2px;
    padding: 0 10px;
    min-height: 25px;
    min-width: 50px;
    width: 100%;
  }

  .dropdown_input:active {
    outline: 0px;
    border-bottom: 1px solid #0077ff;
    border: 0px;
  }

  .dropdown_input:focus {
    outline: 0px;
    border-bottom: 1px solid #0077ff;
    border: 0px;
  }

  .hinting-chip {
    cursor: pointer;
  }

  .highlighted {
    background-color: #f5f5f5 !important;
  }

  .ui-selectbox-border {
    display: flex;
    border: 1px solid;
    border-color: #bdbdbd;
    min-height: 35px;
    box-sizing: border-box;
    border-radius: 3px;
  }

  .ui-selectbox-border:focus {
    outline: 0;
    border-color: #1e87f0 !important;
  }

</style>
