$(document).ready(function() {
		//sdsdsdwewewewewew
        //console.log( "ready!" );
        //$('#body').fadeIn(500).css("display","grid");
});


var serviceWorker = null;

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/Volumes/Work Desk/App Development/Hotkup/hotkup-spg-workspace/taskone-ui/web/htmls/sw.js')
      .then((reg) => {
                //console.log('service worker registered', reg);
    	  serviceWorker = reg;
      })
      .catch((err) => console.log('service worker not registered', err));


}
