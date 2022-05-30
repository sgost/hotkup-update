importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");
// importScripts("../../../dist/umd/comlink.js");
// import * as Comlink from "comlink";

const worker={
  async remoteFunction(cb) {
    await cb("A string from a worker");
  },
  num : 10,
  async fetch(url, successCallback, errorCallback){
    try
    {

      function blockThread (milliseconds) {
        const start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if (new Date().getTime() - start > milliseconds) {
            break;
          }
        }
      }

      // document.getElementById("body").appendChild(`<div class="pingpong"></div>`);
      // blockThread(500); // Uncomment tis line to see how the webworker blocks, but doesn't block the animation at the UI thread.

      let response = await fetch(url);
      let responseJson= await response.json();
      await successCallback(responseJson);
    }
    catch(error){
      console.log("error");
      await errorCallback(error);
    }
  }
};

Comlink.expose(worker);
