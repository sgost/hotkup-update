// Methods related to List functionality on September 21, 2020 by C.Bhaskara Vignesh.

// import {bus} from './../../../admin_super_bundle.js';

export default
{
  data: function () {
    return {
      list: [],
      url: null,
      searchQuery: '',
      pageNumber: 1,
      allRecordsFetched: false,
      isIntersectionObserverFired: false,
      observer: null,
      observerElement: 'isObserver'
    };
  },
  methods: {

    getSearchList () {
      console.log('searching..');
      this.pageNumber = 1;
      this.list = [];
      this.allRecordsFetched = false;
      this.observer.unobserve(document.getElementById(this.observerElement));
      this.isIntersectionObserverFired = false;
      this.getList();
    },
    resetRefreshList () {
      console.log('Refreshing..');
      this.pageNumber = 1;
      this.list = [];
      this.allRecordsFetched = false;
      this.observer.unobserve(document.getElementById(this.observerElement));
      this.isIntersectionObserverFired = false;
      this.getList();
    },
    getList (hasCustomURL) {
      // If all records are fetched, make no calls to the server again.
      if (this.allRecordsFetched) { return false; }

      const searchQuery = (this.searchQuery !== '') ? this.searchQuery : 'all';

      // Custom URL represents a url that is different from the one mentioned in 'updateFetchURL' method.
      // This is used in businessbench's customer list filter by category.
      if (!hasCustomURL) { this.updateFetchURL(); } // Urls can differ from component-to-component..

      //        console.log("Mixing:Retrieving data from : " + this.url);

      // VueJS ajax call-1
      //        console.log("this : ", this);
      // alert(this.http);
      axios.get(process.env.VUE_APP_API_URL + this.url)
        .then((dataResponse) => {
          //                console.log("List: " , dataResponse);
          this.handleData(dataResponse);

          // If there are more records to fetch, then start observing the loadMore-intObsrv-trigger.
          if (!this.isIntersectionObserverFired) {
            this.initLoadMoreIntersectionObserver();
            this.isIntersectionObserverFired = true;
          }
        });
    },
    initLoadMoreIntersectionObserver () {
      // console.log("bus = ", bus);

      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio <= 0) { // If not in view
          //                console.log("Load more is not in view. " + "#" + this.observerElement);
        } else {
          //                console.log("Load more is in view. " + "#" + this.observerElement);
          // observer.unobserve(document.getElementById(observerElement));

          // Increment the current page number
          this.pageNumber += 1;
          this.getList();
        }
      },
      {
        root: null,
        rootMargin: '0px'
      });

      setTimeout(() => {
        this.observer.observe(document.getElementById(this.observerElement));
      }, 1000);
    },
    /* The following methods are for retrieving entire dataset without pagination : Usecase: Dropdowns */
    getUnpaginatedList (listKey, url) {
      //        console.log("Mixin : Retrieving data from : " + url);

      try {
        // VueJS ajax call-1
        axios.get(process.env.VUE_APP_API_URL + url)
          .then((dataResponse) => {
            //                  console.log("List: " , dataResponse);
            this.handleUnpaginatedListData(listKey, dataResponse);
          })
          .catch((error) => {
            this.handleUnpaginatedListDataError(error);
          });
      } catch (error) {
        this.handleUnpaginatedListDataError(error);
      }
    },
    initListLib () {
      console.log('List lib initiated.');
    }

  }
};
