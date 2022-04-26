
import * as Comlink from 'comlink';
import { bus } from '../../../main.js';

export default {
  data: function () {
    return {
    };
  },
  methods: {

    showTaskFilterModal () {
      this.showTaskFilter = !this.showTaskFilter;
    },
    filterTasks (data) {
      this.filter = data;
      console.log('Received filter data from search-modal ', this.filter);

      console.log('Refreshing..');
      this.pageNumber = 1;
      this.list = [];
      this.allRecordsFetched = false;
      if (document.getElementById(this.taskList.observerElement) !== null && document.getElementById(this.taskList.observerElement) !== undefined) {
        this.taskList.observer.unobserve(document.getElementById(this.taskList.observerElement));
      }
      this.isIntersectionObserverFired = false;

      this.doComplexFilterSearch();
      this.showTaskFilter = !this.showTaskFilter;
    },
    doComplexFilterSearch () {
      // If all records are fetched, make no calls to the server again.
      if (this.allRecordsFetched) { return false; }

      const url = './tasks/list';
      this.filter.pageNumber = this.pageNumber;

      axios.post(process.env.VUE_APP_API_URL + url, this.filter)
        .then((dataResponse) => {
          console.log('List fetched for page number ', this.pageNumber, ' is : ', dataResponse);
          this.handleData(dataResponse);

          // If there are more records to fetch, then flex-start observing the loadMore-intObsrv-trigger.
          if (!this.isIntersectionObserverFired) {
            this.initLoadMoreIntersectionObserverForComplexFilter();
            this.isIntersectionObserverFired = true;
          }
        });
    },
    initLoadMoreIntersectionObserverForComplexFilter () {
      // console.log("bus = ", bus);

      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio <= 0) { // If not in view
          // console.log("Load more is not in view. " + "#" + this.observerElement);
        } else {
          // console.log("Load more is in view. " + "#" + this.observerElement);
          // observer.unobserve(document.getElementById(observerElement));

          // Increment the current page number
          this.pageNumber += 1;
          this.doComplexFilterSearch();
        }
      },
      {
        root: null,
        rootMargin: '0px'
      });

      setTimeout(() => {
        this.observer.observe(document.getElementById(this.observerElement));
      }, 1000);
    } // ,


  }
};
