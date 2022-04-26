<style scoped>
</style>

<template>

  <div class="lazy-genes-ui-icon">

    <div v-if="name=='download'" class="ui-icon">
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" v-bind:style="size">
          <polyline fill="none" stroke="currentColor" points="14,10 9.5,14.5 5,10"></polyline>
          <rect x="3" y="17" width="13" height="1" stroke="none" fill="currentColor" ></rect>
          <line fill="none" stroke="currentColor" x1="9.5" y1="13.91" x2="9.5" y2="3"></line>
      </svg>
    </div>

    <div v-if="name=='activity'" class="ui-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" v-bind:style="size">
            <g id="Activity" transform="translate(-10949 2065)">
              <rect id="Rectangle_1446" data-name="Rectangle 1446" width="24" height="24" transform="translate(10949 -2065)" fill="none"/>
              <g id="Group_1444" data-name="Group 1444" transform="translate(10699.087 -2584.553)">
                <circle id="Ellipse_100" data-name="Ellipse 100" cx="1.204" cy="1.204" r="1.204" transform="translate(252.936 524.553)" fill="currentColor"/>
                <rect id="Rectangle_1344" data-name="Rectangle 1344" width="15.389" height="2.218" rx="1.109" transform="translate(256.443 524.648)" fill="currentColor"/>
                <rect id="Rectangle_1345" data-name="Rectangle 1345" width="14.183" height="1.608" rx="0.751" transform="translate(257.443 528.806)" fill="currentColor"/>
                <circle id="Ellipse_101" data-name="Ellipse 101" cx="1.227" cy="1.227" r="1.227" transform="translate(252.913 531.95)" fill="currentColor"/>
                <rect id="Rectangle_1346" data-name="Rectangle 1346" width="15.389" height="2.218" rx="1.109" transform="translate(256.443 532.063)" fill="currentColor"/>
                <rect id="Rectangle_1347" data-name="Rectangle 1347" width="14.183" height="1.608" rx="0.751" transform="translate(257.443 536.163)" fill="currentColor"/>
              </g>
            </g>
          </svg>
    </div>

    <div v-if="name=='hooks'" class="ui-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 18" v-bind:style="size">
        <g id="View_hook" data-name="View hook" transform="translate(-3140 502)" >
          <g id="Group_1485" data-name="Group 1485" transform="translate(16.5 -62)" >
            <path id="Path_2566" data-name="Path 2566" d="M3115-445.109h6.05" transform="translate(19.257 10.841)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.3" ></path>
            <g id="Group_1484" data-name="Group 1484" transform="translate(1.632 0.639)" >
              <path id="Path_2569" data-name="Path 2569" d="M3115-444.815h6" transform="translate(8.5 9.757)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.3" ></path>
              <path id="Path_2570" data-name="Path 2570" d="M0,0H5.884" transform="translate(3126.5 -438) rotate(90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.3" ></path>
            </g>
            <path id="Path_2567" data-name="Path 2567" d="M3115-445.109h12.87" transform="translate(12.437 15.841)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.3" ></path>
            <path id="Path_2568" data-name="Path 2568" d="M3115-445.109h12.87" transform="translate(12.437 20.841)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.3" ></path>
          </g>
          <rect id="Rectangle_1455" data-name="Rectangle 1455" width="18" height="18" transform="translate(3140 -502)" fill="none" ></rect>
        </g>
      </svg>
    </div>

    <div v-else-if="name=='info'" class="ui-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" v-bind:style="size">
            <g id="Task_info" data-name="Task info" transform="translate(-11026 1943)">
              <g id="information" transform="translate(11029 -1940)">
                <path id="Path_2561" data-name="Path 2561" d="M9,0a9,9,0,1,0,9,9A9.01,9.01,0,0,0,9,0ZM9,16.364A7.364,7.364,0,1,1,16.364,9,7.372,7.372,0,0,1,9,16.364Z" fill="currentColor"/>
                <path id="Path_2562" data-name="Path 2562" d="M146.093,70a1.091,1.091,0,1,0,1.091,1.091A1.092,1.092,0,0,0,146.093,70Z" transform="translate(-137.093 -66.182)" fill="currentColor"/>
                <path id="Path_2563" data-name="Path 2563" d="M150.818,140a.818.818,0,0,0-.818.818v4.909a.818.818,0,1,0,1.636,0v-4.909A.818.818,0,0,0,150.818,140Z" transform="translate(-141.818 -132.364)" fill="currentColor"/>
              </g>
              <rect id="Rectangle_1452" data-name="Rectangle 1452" width="24" height="24" transform="translate(11026 -1943)" fill="none"/>
            </g>
          </svg>
    </div>

    <div v-else-if="name=='history'" class="ui-icon">
        <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="history" v-bind:style="size">
          <polyline  fill="currentColor" points="1 2 2 2 2 6 6 6 6 7 1 7 1 2"></polyline>
          <path fill="none" stroke="currentColor" stroke-width="1.1" d="M2.1,6.548 C3.391,3.29 6.746,1 10.5,1 C15.5,1 19.5,5 19.5,10 C19.5,15 15.5,19 10.5,19 C5.5,19 1.5,15 1.5,10">
          </path>
          <rect x="9" y="4" width="1" height="7" stroke="currentColor"></rect>
          <path fill="none" stroke="currentColor" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"></path>
        </svg>
    </div>

    <div v-else-if="name=='description'" class="ui-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" v-bind:style="size">
              <g id="Description" transform="translate(-11015 2067)">
                <g id="Description_" data-name="Description " transform="translate(11012.388 -2073)">
                  <g id="Group_449" data-name="Group 449" transform="translate(4.612 12)">
                    <g id="Group_444" data-name="Group 444" transform="translate(0 0)">
                      <g id="Group_443" data-name="Group 443">
                        <rect id="Rectangle_811" data-name="Rectangle 811" width="20" height="1.678" fill="currentColor"/>
                      </g>
                    </g>
                    <g id="Group_446" data-name="Group 446" transform="translate(0 5.338)">
                      <g id="Group_445" data-name="Group 445">
                        <rect id="Rectangle_812" data-name="Rectangle 812" width="15.785" height="1.678" fill="currentColor"/>
                      </g>
                    </g>
                    <g id="Group_448" data-name="Group 448" transform="translate(0 10.675)">
                      <g id="Group_447" data-name="Group 447">
                        <rect id="Rectangle_813" data-name="Rectangle 813" width="11.238" height="1.678" fill="currentColor"/>
                      </g>
                    </g>
                  </g>
                </g>
                <rect id="Rectangle_1448" data-name="Rectangle 1448" width="24" height="24" transform="translate(11015 -2067)" fill="none"/>
              </g>
            </svg>
    </div>

    <div v-else-if="name=='tasks'" class="ui-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" v-bind:style="size">
              <path fill="none" stroke="currentColor" stroke-width="1.1" d="M17.5,3.71 L17.5,7.72 C17.5,7.96 17.4,8.2 17.21,8.39 L8.39,17.2 C7.99,17.6 7.33,17.6 6.93,17.2 L2.8,13.07 C2.4,12.67 2.4,12.01 2.8,11.61 L11.61,2.8 C11.81,2.6 12.08,2.5 12.34,2.5 L16.19,2.5 C16.52,2.5 16.86,2.63 17.11,2.88 C17.35,3.11 17.48,3.4 17.5,3.71 L17.5,3.71 Z"></path>
              <circle cx="14" cy="6" r="1"></circle>
        </svg>
    </div>

    <div v-else-if="name=='subtask'" class="ui-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" v-bind:style="size">
              <g id="Subtask" transform="translate(-13297 3128)">
                <g id="Group_1278" data-name="Group 1278" transform="translate(13297.068 -3126)">
                  <g id="Group_1066" data-name="Group 1066" transform="translate(-0.068)">
                    <g id="Rectangle_1210" data-name="Rectangle 1210" fill="currentColor" stroke="currentColor" stroke-width="1.3">
                      <rect width="10.667" height="5.333" rx="1" stroke="none"/>
                      <rect x="0.65" y="0.65" width="9.367" height="4.033" rx="0.35" fill="none"/>
                    </g>
                    <g id="Rectangle_1211" data-name="Rectangle 1211" transform="translate(5.333 7.111)" fill="none" stroke="currentColor" stroke-width="1.3">
                      <rect width="10.667" height="5.333" rx="1" stroke="none"/>
                      <rect x="0.65" y="0.65" width="9.367" height="4.033" rx="0.35" fill="none"/>
                    </g>
                    <path id="Path_2237" data-name="Path 2237" d="M6104.391-1831v5.3h3.358" transform="translate(-6102.363 1835.715)" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.3"/>
                  </g>
                </g>
                <rect id="Rectangle_1324" data-name="Rectangle 1324" width="16" height="16" transform="translate(13297 -3128)" fill="none"/>
              </g>
              </svg>
    </div>

    <div v-else-if="name=='recurring_tasks'" class="ui-icon">
        <svg stroke="currentColor" width="16" height="16" viewBox="0 0 1024 1024" v-bind:style="size" xmlns="http://www.w3.org/2000/svg">
          <path class="path1" fill="currentColor" d="M1016.501 442.698c-9.997-9.997-26.206-9.997-36.203 0l-58.832 58.832c-2.63-105.486-44.947-204.27-119.835-279.16-77.362-77.365-180.222-119.97-289.63-119.97-152.28 0-291.122 83.699-362.342 218.435-6.606 12.499-1.83 27.989 10.669 34.597 12.498 6.606 27.989 1.83 34.597-10.669 62.33-117.914 183.826-191.163 317.077-191.163 194.014 0 352.501 154.966 358.224 347.619l-58.522-58.522c-9.997-9.997-26.206-9.997-36.203 0-9.998 9.998-9.998 26.206 0 36.205l102.4 102.4c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499l102.4-102.4c9.998-9.997 9.998-26.205 0-36.203z"></path>
          <path class="path2" fill="currentColor" d="M863.674 668.566c-12.502-6.603-27.99-1.832-34.597 10.669-62.328 117.915-183.826 191.165-317.077 191.165-194.016 0-352.502-154.966-358.224-347.621l58.522 58.522c5 5 11.55 7.499 18.102 7.499s13.102-2.499 18.102-7.499c9.997-9.997 9.997-26.206 0-36.203l-102.4-102.4c-9.998-9.997-26.206-9.997-36.205 0l-102.4 102.4c-9.997 9.997-9.997 26.206 0 36.203s26.206 9.997 36.205 0l58.83-58.832c2.63 105.488 44.946 204.272 119.835 279.162 77.365 77.363 180.224 119.97 289.632 119.97 152.28 0 291.12-83.699 362.342-218.435 6.608-12.501 1.829-27.99-10.669-34.598z"></path>
        </svg>
    </div>

    <div v-else-if="name=='contacts'" class="ui-icon">
        <svg stroke="currentColor" width="16" height="16" viewBox="0 0 1024 1024" v-bind:style="size" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" class="path1" d="M947.2 921.6h-870.4c-42.347 0-76.8-34.451-76.8-76.8v-665.6c0-42.347 34.453-76.8 76.8-76.8h870.4c42.349 0 76.8 34.453 76.8 76.8v665.6c0 42.349-34.451 76.8-76.8 76.8zM76.8 153.6c-14.115 0-25.6 11.485-25.6 25.6v665.6c0 14.115 11.485 25.6 25.6 25.6h870.4c14.115 0 25.6-11.485 25.6-25.6v-665.6c0-14.115-11.485-25.6-25.6-25.6h-870.4z"></path><path class="path2" d="M486.4 307.2h-307.2c-14.138 0-25.6-11.462-25.6-25.6s11.462-25.6 25.6-25.6h307.2c14.138 0 25.6 11.462 25.6 25.6s-11.462 25.6-25.6 25.6z"></path>
          <path fill="currentColor" class="path3" d="M486.4 460.8h-307.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h307.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"></path><path class="path4" d="M486.4 563.2h-307.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h307.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"></path><path class="path5" d="M486.4 665.6h-307.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h307.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"></path>
          <path fill="currentColor" class="path6" d="M435.2 768h-256c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h256c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"></path><path class="path7" d="M918.677 335.043l-41.646-30.258-15.909-48.957h-51.475l-41.646-30.258-41.645 30.258h-51.475l-15.909 48.957-41.646 30.258 15.909 48.957-15.909 48.957 41.646 30.259 6.752 20.774c-0.077 0.794-0.123 1.597-0.123 2.41v256c0 10.355 6.237 19.69 15.803 23.651 9.568 3.965 20.578 1.77 27.899-5.55l58.698-58.698 58.699 58.699c4.898 4.899 11.443 7.501 18.107 7.499 3.298 0 6.624-0.637 9.79-1.949 9.566-3.963 15.803-13.298 15.803-23.653v-256c0-0.813-0.046-1.616-0.122-2.41l6.752-20.774 41.646-30.259-15.91-48.957 15.91-48.957zM677.514 354.6l25.010-18.17 9.554-29.4h30.912l25.011-18.173 25.011 18.171h30.912l9.554 29.4 25.010 18.17-9.554 29.402 9.554 29.4-25.010 18.171-9.554 29.4h-30.912l-25.011 18.173-25.011-18.171h-30.912l-9.554-29.4-25.010-18.171 9.554-29.402-9.554-29.4zM786.101 647.499c-9.997-9.997-26.206-9.997-36.203 0l-33.098 33.098v-168.426h9.555l41.645 30.258 41.645-30.256h9.555v168.426l-33.099-33.099z"></path>
        </svg>
    </div>

    <div v-else-if="name=='intermediaries'" class="ui-icon">
        <svg stroke="currentColor" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle fill="none" stroke="currentColor" stroke-width="1.1" cx="7.7" cy="8.6" r="3.5"></circle>
          <path fill="none" stroke="currentColor" stroke-width="1.1" d="M1,18.1 C1.7,14.6 4.4,12.1 7.6,12.1 C10.9,12.1 13.7,14.8 14.3,18.3"></path>
          <path fill="none" stroke="currentColor" stroke-width="1.1" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1"></path>
        </svg>
    </div>

    <div v-else-if="name=='scheduled_tasks'" class="ui-icon">
        <svg  width="16" height="16" viewBox="0 0 20 20" v-bind:style="size" xmlns="http://www.w3.org/2000/svg">
          <polyline points="19 2 18 2 18 6 14 6 14 7 19 7 19 2" fill="currentColor" ></polyline>
          <path fill="none" stroke="currentColor" stroke-width="1.1" d="M18,6.548 C16.709,3.29 13.354,1 9.6,1 C4.6,1 0.6,5 0.6,10 C0.6,15 4.6,19 9.6,19 C14.6,19 18.6,15 18.6,10"></path>
          <rect x="9" y="4" width="1" height="7"  fill="currentColor" ></rect>
          <path d="M13.018,14.197 L9.445,10.625" fill="none" stroke="currentColor" stroke-width="1.1"></path>
        </svg>
    </div>

    <div v-else-if="name=='files'" class="ui-icon">
        <svg  width="16" height="16" viewBox="0 0 20 20" v-bind:style="size"> xmlns="http://www.w3.org/2000/svg">
          <rect fill="none" stroke="currentColor" width="13" height="17" x="3.5" y="1.5"></rect>
          <path stroke="currentColor" d="M14.65 11.67c-.48.3-1.37-.19-1.79-.37a4.65 4.65 0 0 1 1.49.06c.35.1.36.28.3.31zm-6.3.06l.43-.79a14.7 14.7 0 0 0 .75-1.64 5.48 5.48 0 0 0 1.25 1.55l.2.15a16.36 16.36 0 0 0-2.63.73zM9.5 5.32c.2 0 .32.5.32.97a1.99 1.99 0 0 1-.23 1.04 5.05 5.05 0 0 1-.17-1.3s0-.71.08-.71zm-3.9 9a4.35 4.35 0 0 1 1.21-1.46l.24-.22a4.35 4.35 0 0 1-1.46 1.68zm9.23-3.3a2.05 2.05 0 0 0-1.32-.3 11.07 11.07 0 0 0-1.58.11 4.09 4.09 0 0 1-.74-.5 5.39 5.39 0 0 1-1.32-2.06 10.37 10.37 0 0 0 .28-2.62 1.83 1.83 0 0 0-.07-.25.57.57 0 0 0-.52-.4H9.4a.59.59 0 0 0-.6.38 6.95 6.95 0 0 0 .37 3.14c-.26.63-1 2.12-1 2.12-.3.58-.57 1.08-.82 1.5l-.8.44A3.11 3.11 0 0 0 5 14.16a.39.39 0 0 0 .15.42l.24.13c1.15.56 2.28-1.74 2.66-2.42a23.1 23.1 0 0 1 3.59-.85 4.56 4.56 0 0 0 2.91.8.5.5 0 0 0 .3-.21 1.1 1.1 0 0 0 .12-.75.84.84 0 0 0-.14-.25z">
          </path>
        </svg>
    </div>

    <div v-else-if="name=='checklist'" class="ui-icon">

      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" v-bind:style="size">
        <g id="Checklist" transform="translate(-11076 1977)">
          <g id="Group_1443" data-name="Group 1443" transform="translate(-140.104 150.173)">
            <path id="Path_2380" data-name="Path 2380" d="M11224.493-2115.7l3.567,3.568,8.385-8.384" transform="translate(-0.292 -0.143)" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <path id="Path_2381" data-name="Path 2381" d="M8779.2-479.173h-10.1v14.745h14.878v-8.281" transform="translate(2452 -1643)" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/>
          </g>
          <rect id="Rectangle_1451" data-name="Rectangle 1451" width="24" height="24" transform="translate(11076 -1977)" fill="none"/>
        </g>
      </svg>

    </div>

    <div v-else-if="name=='reminder'" class="ui-icon">
      <svg version="1.1" x="0px" y="0px" viewBox="0 0 515.1 515.1" style="enable-background:new 0 0 515.1 515.1;" xml:space="preserve" v-bind:style="size">
          <g id="access-alarms">
            <path fill="currentColor" d="M512.55,99.45L395.25,0L362.1,38.25l117.3,99.45L512.55,99.45z M153,40.8L119.85,2.55L2.55,99.45L35.7,137.7L153,40.8z
               M270.3,158.1h-38.25v153l119.85,73.951l20.4-30.602l-102-61.199V158.1z M257.55,56.1c-127.5,0-229.5,102-229.5,229.5
              c0,127.5,102,229.5,229.5,229.5s229.5-102,229.5-229.5C487.05,158.1,385.05,56.1,257.55,56.1z M257.55,464.1
              c-99.45,0-178.5-79.049-178.5-178.5c0-99.45,79.05-178.5,178.5-178.5s178.5,79.05,178.5,178.5
              C436.05,385.051,357,464.1,257.55,464.1z"/>
          </g>
        </svg>
    </div>

    <div v-else-if="name=='timelog'" class="ui-icon">

        <svg  width="24" height="24" viewBox="0 0 24 24" v-bind:style="size">
            <g id="Time_log" data-name="Time log" transform="translate(-11081 2057)">
              <g id="Group_1440" data-name="Group 1440" transform="translate(10790.593 -2543.509)">
                <g id="Group_387" data-name="Group 387" transform="translate(292.408 489.509)">
                  <g id="Layer_1" data-name="Layer 1">
                    <g id="Group_386" data-name="Group 386">
                      <path id="Path_243" data-name="Path 243" d="M310.93,494.979a.412.412,0,0,0-.372-.237h-1.212a8.995,8.995,0,1,0-1.054,6.138.818.818,0,1,0-1.416-.819,7.37,7.37,0,1,1,.8-5.32h-1.2a.409.409,0,0,0-.314.672l2.046,2.455a.408.408,0,0,0,.628,0l2.046-2.455A.411.411,0,0,0,310.93,494.979Z" transform="translate(-291.498 -487.379)" fill="currentColor"/>
                      <path id="Path_244" data-name="Path 244" d="M297.921,488.728a.818.818,0,0,0-.819.819v4.963a1.431,1.431,0,0,0,.819,2.605,1.41,1.41,0,0,0,.6-.138l2.846,1.642a.818.818,0,1,0,.817-1.416l-2.848-1.645a1.428,1.428,0,0,0-.6-1.046v-4.965A.82.82,0,0,0,297.921,488.728Zm0,7.568a.613.613,0,1,1,.613-.614A.615.615,0,0,1,297.921,496.3Z" transform="translate(-288.92 -486.682)" fill="currentColor"/>
                    </g>
                  </g>
                </g>
              </g>
              <rect id="Rectangle_1450" data-name="Rectangle 1450" width="24" height="24" transform="translate(11081 -2057)" fill="none"/>
            </g>
        </svg>

    </div>

    <div v-else-if="name=='forms'" class="ui-icon">

        <svg  width="24" height="24" viewBox="0 0 24 24" v-bind:style="size">
            <path fill="none" stroke="#000" d="M5,18.5 C4.2,18.5 3.5,17.8 3.5,17 L3.5,3 C3.5,2.2 4.2,1.5 5,1.5 L16,1.5 C16.8,1.5 17.5,2.2 17.5,3 L17.5,17 C17.5,17.8 16.8,18.5 16,18.5 L5,18.5 L5,18.5 L5,18.5 Z"></path>
            <circle cx="10.5" cy="16.3" r=".8"></circle>
        </svg>

    </div>

  </div>

</template>

<script>

export default {
  props: ['name', 'size'],
  data: function () {
    return {};
  },
  methods: {},
  created: function () {},
  computed: {},
  mounted: function () {},
  watch: {}
};

</script>
