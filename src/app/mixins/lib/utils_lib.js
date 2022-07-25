
import * as Comlink from 'comlink';

export default {
  data: function () {
    return {
    };
  },
  methods: {

    // Elastic scroll begins here..
    handleScroll(e) {
      // console.log(e);
      // console.log(e.target.scrollTop, e.target.clientHeight, e.target.scrollHeight);

      const list = e.target.querySelector(".elastic_scroll_list");

      if ((e.target.scrollTop + e.target.offsetHeight) >= (e.target.scrollHeight - 0)) {
        console.log("\t Scroll reached the end formula : (e.target.scrollTop + e.target.clientHeight) >= e.target.scrollHeight");
        console.log("\t Scroll reached the end : ", e.target.scrollTop, e.target.clientHeight, e.target.scrollHeight);
        list.classList.add("moveUp");
        setTimeout(() => list.classList.remove("moveUp"), 150);
      }

      if (e.target.scrollTop === 0) {
        console.log("\t Scroll reached the top : ", e.target.scrollTop, e.target.clientHeight, e.target.scrollHeight);
        list.classList.add("moveDown");
        setTimeout(() => list.classList.remove("moveDown"), 150);
      }
    },
    addRippleEffect(e) {

      console.log("Rippling..");

      // Create span element
      const ripple = document.createElement("span");

      // Add ripple class to span
      ripple.classList.add("ripple");

      // Add span to the button
      e.target.appendChild(ripple);

      // Get position of X
      const x = e.clientX - e.target.offsetLeft;

      // Get position of Y
      const y = e.clientY - e.target.offsetTop;

      // Position the span element
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      // Remove span after 0.3s
      setTimeout(() => {
        // ripple.remove();
      }, 300);
    },
    convertUTCDateFromServerToLocalDateForDisplayAsDateOnly(utcDateString) {

      const utcFormattedString = utcDateString
        .replace(',', '')
        .replace('T', ' ') +
        // ' UTC';
        'Z';
      const localDateString = new Date(utcFormattedString).toLocaleString('en-UK');

      // Convert from "01/05/2021, 09:00:00" to "2021-05-01T03:36:00";
      const dateString = localDateString.split(',')[0];
      const timeString = localDateString.split(',')[1].trim();

      return dateString.split('/')[2] +
        '-' +
        dateString.split('/')[1] +
        '-' +
        dateString.split('/')[0];
    },
    convertUTCDateFromServerToLocalDateForDisplay(utcDateString) {

      const utcFormattedString = utcDateString
        .replace(',', '')
        .replace('T', ' ') +
        // ' UTC';
        'Z';
      const localDateString = new Date(utcFormattedString).toLocaleString('en-UK');

      // Convert from "01/05/2021, 09:00:00" to "2021-05-01T03:36:00";
      const dateString = localDateString.split(',')[0];
      const timeString = localDateString.split(',')[1].trim();

      return dateString.split('/')[2] +
        '-' +
        dateString.split('/')[1] +
        '-' +
        dateString.split('/')[0] +
        ' ' +
        timeString;
    },
    convertUTCDateFromServerToLocalDate(utcDateString) { // 2021-09-23 13:31:54

      console.log("\t\t utcDateString = ", utcDateString);
      const utcFormattedString = utcDateString
        .replace(',', '')
        .replace('T', ' ') +
        // ' UTC';
        'Z';
      console.log("\t\t utcFormattedString = ", utcFormattedString);
      const localDateString = new Date(utcFormattedString).toLocaleString('en-UK');
      console.log("\t\t localDateString = ", localDateString);

      // return localDateString;

      // Convert from "01/05/2021, 09:00:00" to "2021-05-01T03:36:00";
      const dateString = localDateString.split(',')[0];
      const timeString = localDateString.split(',')[1].trim();

      return dateString.split('/')[2] +
        '-' +
        ((dateString.split('/')[1].length < 2 && parseInt(dateString.split('/')[1]) < 10) ? ('0' + dateString.split('/')[1]) : dateString.split('/')[1]) +
        '-' +
        ((dateString.split('/')[0].length < 2 && parseInt(dateString.split('/')[0]) < 10) ? ('0' + dateString.split('/')[0]) : dateString.split('/')[0]) +
        'T' +
        timeString;
    },
    checkIfMobile() {
      const ua = navigator.userAgent;
      const browser = /Edge\/\d+/.test(ua)
        ? 'ed'
        : /MSIE 9/.test(ua)
          ? 'ie9'
          : /MSIE 10/.test(ua)
            ? 'ie10'
            : /MSIE 11/.test(ua)
              ? 'ie11'
              : /MSIE\s\d/.test(ua)
                ? 'ie?'
                : /rv\:11/.test(ua)
                  ? 'ie11'
                  : /Firefox\W\d/.test(ua)
                    ? 'ff'
                    : /Chrom(e|ium)\W\d|CriOS\W\d/.test(ua)
                      ? 'gc'
                      : /\bSafari\W\d/.test(ua)
                        ? 'sa'
                        : /\bOpera\W\d/.test(ua)
                          ? 'op'
                          : /\bOPR\W\d/i.test(ua)
                            ? 'op'
                            : typeof MSPointerEvent !== 'undefined'
                              ? 'ie?'
                              : '';
      const os = /Windows NT 10/.test(ua)
        ? 'win10'
        : /Windows NT 6\.0/.test(ua)
          ? 'winvista'
          : /Windows NT 6\.1/.test(ua)
            ? 'win7'
            : /Windows NT 6\.\d/.test(ua)
              ? 'win8'
              : /Windows NT 5\.1/.test(ua)
                ? 'winxp'
                : /Windows NT [1-5]\./.test(ua)
                  ? 'winnt'
                  : /Mac/.test(ua)
                    ? 'mac'
                    : /Linux/.test(ua) ? 'linux' : /X11/.test(ua) ? 'nix' : '';
      const touch = 'ontouchstart' in document.documentElement;
      const mobile = /IEMobile|Windows Phone|Lumia/i.test(ua)
        ? 'w'
        : /iPhone|iP[oa]d/.test(ua)
          ? 'i'
          : /Android/.test(ua)
            ? 'a'
            : /BlackBerry|PlayBook|BB10/.test(ua)
              ? 'b'
              : /Mobile Safari/.test(ua)
                ? 's'
                : /webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(ua)
                  ? 1
                  : 0;
      const tablet = /Tablet|iPad/i.test(ua);

      // console.log("ua = " + ua);
      // console.log("browser = " + browser);
      // console.log("os = " + os);
      // console.log("touch = " + touch);
      // console.log("mobile = " + mobile);
      // console.log("tablet = " + tablet);
      this.isMobileDevice = mobile !== 0;
    },
    doNetworkSpeedTest: function () {
    },
    enableHTMLElement: function (elem) {
      elem.removeAttribute('disabled');
    },
    disableHTMLElement: function (elem) {
      elem.setAttribute('disabled', 'disabled');
    },
    logOrange: function (msg) {
      console.log('%c ' + msg, 'background: orange; color: white');
    },
    logBlue: function (msg) {
      console.log('%c ' + msg, 'background: #03A9F4; color: white');
    },
    logGreen: function (msg) {
      console.log('%c ' + msg, 'background: #8BC34A; color: white');
    },
    log2Strings: function (str1, str2) {
      console.log(
        `%c ${str1} %c ${str2} %c`,
        'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#03a9f4 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent'
      );
    },
    log2StringsError: function (str1, str2) {
      console.log(
        `%c ${str1} %c ${str2} %c`,
        'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#e91e63 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent'
      );
    }
  }
};
