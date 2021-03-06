const projectsContainer = document.querySelector('.projects-list-container');

const tags = {
  localstorage: {
    name: 'LocalStorage',
    svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 6C20 3.832 16.337 2 12 2C7.663 2 4 3.832 4 6V8C4 10.168 7.663 12 12 12C16.337 12 20 10.168 20 8V6ZM12 19C7.663 19 4 17.168 4 15V18C4 20.168 7.663 22 12 22C16.337 22 20 20.168 20 18V15C20 17.168 16.337 19 12 19Z" fill="black"/><path d="M20 10C20 12.168 16.337 14 12 14C7.663 14 4 12.168 4 10V13C4 15.168 7.663 17 12 17C16.337 17 20 15.168 20 13V10Z" fill="black" /></svg>',
  },
  ui: {
    name: 'UI Change',
    svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.332 8.668C16.1982 8.64201 17.0203 8.27961 17.6239 7.65767C18.2274 7.03573 18.565 6.20316 18.565 5.3365C18.565 4.46985 18.2274 3.63728 17.6239 3.01534C17.0203 2.3934 16.1982 2.031 15.332 2.005H8.66797C7.80171 2.031 6.97963 2.3934 6.37608 3.01534C5.77252 3.63728 5.43495 4.46985 5.43495 5.3365C5.43495 6.20316 5.77252 7.03573 6.37608 7.65767C6.97963 8.27961 7.80171 8.64201 8.66797 8.668C7.79413 8.68314 6.9612 9.0409 6.34859 9.66422C5.73598 10.2875 5.3927 11.1265 5.3927 12.0005C5.3927 12.8745 5.73598 13.7135 6.34859 14.3368C6.9612 14.9601 7.79413 15.3179 8.66797 15.333C7.7984 15.3543 6.97162 15.7147 6.36413 16.3373C5.75665 16.9598 5.41661 17.7952 5.41661 18.665C5.41661 19.5348 5.75665 20.3702 6.36413 20.9927C6.97162 21.6153 7.7984 21.9757 8.66797 21.997C9.55168 21.9965 10.399 21.6451 11.0238 21.0201C11.6486 20.3952 11.9997 19.5477 12 18.664V8.668H15.332Z" fill="black"/><path d="M15.332 15.332C17.1722 15.332 18.664 13.8402 18.664 12C18.664 10.1598 17.1722 8.668 15.332 8.668C13.4918 8.668 12 10.1598 12 12C12 13.8402 13.4918 15.332 15.332 15.332Z" fill="black"/></svg>',
  },
  video: {
    name: 'HTML5 Video API',
    svg:
      '<svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 0V20H26V0H0ZM3.18812 3.24196H22.8119V16.7581H3.18812V3.24196ZM10.0833 5.5952V14.5985L17.7417 10.0839L10.0833 5.5952V5.5952Z" fill="black" /> </svg>',
  },
  volume: {
    name: 'Volume Control',
    svg:
      ' <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M15.0012 9C15.0012 6.50391 13.4754 4.36641 11.3098 3.46289L10.7332 4.84805C12.3574 5.52656 13.5 7.12969 13.5 9C13.5 10.8738 12.3574 12.4734 10.7297 13.152L11.3063 14.5371C13.4754 13.6336 15.0012 11.4961 15.0012 9ZM11.9988 9C11.9988 7.75195 11.2359 6.6832 10.1531 6.2332L9.57656 7.61836C10.118 7.84336 10.4977 8.37773 10.4977 9.00352C10.4977 9.62578 10.118 10.1602 9.57656 10.3887L10.1531 11.7738C11.2359 11.3168 11.9988 10.248 11.9988 9V9ZM12.4629 0.692578L11.8828 2.07773C14.5934 3.20625 16.4988 5.87812 16.4988 9C16.4988 12.1184 14.5934 14.7937 11.8828 15.9223L12.4594 17.3074C15.7148 15.9504 18 12.7441 18 9C18 5.25586 15.7148 2.04961 12.4629 0.692578V0.692578ZM0 5.24883V12.7477H2.99883L8.25117 18V0L2.99883 5.24883H0Z" fill="black" /></svg>',
  },
  dom: {
    name: 'D.O.M.',
    svg:
      '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 0H18V18H0V0ZM16.525 13.707C16.394 12.886 15.859 12.196 14.273 11.552C13.721 11.293 13.108 11.114 12.924 10.698C12.856 10.45 12.846 10.316 12.89 10.169C13.003 9.685 13.577 9.54 14.027 9.674C14.32 9.764 14.59 9.989 14.759 10.35C15.534 9.843 15.534 9.843 16.075 9.506C15.872 9.192 15.771 9.055 15.636 8.92C15.163 8.392 14.533 8.122 13.51 8.145L12.982 8.212C12.475 8.336 11.991 8.607 11.699 8.966C10.844 9.934 11.091 11.621 12.126 12.32C13.149 13.085 14.647 13.253 14.838 13.973C15.018 14.851 14.186 15.132 13.363 15.031C12.756 14.895 12.418 14.592 12.047 14.029L10.675 14.817C10.832 15.176 11.012 15.334 11.282 15.649C12.587 16.965 15.85 16.898 16.435 14.895C16.456 14.828 16.615 14.367 16.491 13.658L16.525 13.707V13.707ZM9.788 8.273H8.102C8.102 9.726 8.095 11.171 8.095 12.627C8.095 13.551 8.142 14.399 7.991 14.66C7.744 15.177 7.105 15.111 6.816 15.019C6.519 14.873 6.368 14.67 6.193 14.378C6.146 14.3 6.111 14.232 6.098 14.232L4.73 15.076C4.959 15.549 5.293 15.955 5.724 16.213C6.365 16.596 7.226 16.72 8.128 16.518C8.716 16.348 9.223 15.999 9.486 15.459C9.87 14.762 9.788 13.906 9.785 12.95C9.793 11.409 9.785 9.867 9.785 8.315L9.788 8.273Z" fill="black"/> </svg> ',
  },
  api: {
    name: 'Data from API',
    svg:
      '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0)"> <path d="M11 16.6964C12.9005 16.6875 14.6407 15.6296 15.5233 13.9464H6.47675C7.35937 15.6296 9.09952 16.6875 11 16.6964V16.6964Z" fill="black"/> <path d="M12.5714 7.66072C12.571 7.22696 12.2194 6.87544 11.7857 6.87501H10.6071V8.44644H11.7857C12.2194 8.44601 12.571 8.09448 12.5714 7.66072Z" fill="black"/> <path d="M7.46429 7.72475L7.09265 8.83929H7.83594L7.46429 7.72475Z" fill="black"/> <path d="M4.32147 13.9464C3.92676 13.945 3.53355 13.8977 3.14978 13.8054L1.93683 14.3051L2.90974 16.6644L4.56807 15.9796C4.73803 15.9096 4.93382 15.9667 5.0395 16.1171C5.52379 16.8088 6.12548 17.4104 6.81729 17.8946C6.9683 18.0002 7.02559 18.1966 6.95503 18.3667L6.27059 20.0214L8.62813 20.9988L9.31315 19.3431C9.38363 19.1727 9.56316 19.0742 9.74475 19.1064C10.5748 19.2543 11.4246 19.2531 12.2542 19.103C12.4359 19.0706 12.6157 19.1686 12.6868 19.3389L13.3754 20.9974L15.7297 20.0212L15.0449 18.3625C14.9744 18.1918 15.0324 17.9951 15.1841 17.8899C15.8762 17.4081 16.4776 16.8078 16.9606 16.1166C17.0662 15.9661 17.2622 15.9092 17.4321 15.9797L19.0899 16.6656L20.0681 14.3068L19.1861 13.9396C19.1418 13.9412 19.0984 13.9463 19.0538 13.9463H16.3936C15.4597 16.0934 13.3414 17.482 11 17.482C8.65871 17.482 6.54035 16.0934 5.60651 13.9463L4.32147 13.9464Z" fill="black"/> <path d="M4.32143 13.1607H19.0536C20.6808 13.1607 22 11.8416 22 10.2143C22 8.58702 20.6808 7.26786 19.0536 7.26786H19.0143C18.8478 7.26786 18.6993 7.16285 18.6439 7.00583C18.115 5.50586 16.6926 4.50668 15.1022 4.51786C15.0638 4.51786 15.0256 4.51806 14.9875 4.52073C14.8151 4.5317 14.6555 4.42981 14.5929 4.26887C13.8374 2.28775 11.9362 0.979622 9.81595 0.982013C7.69567 0.984404 5.79746 2.29682 5.04645 4.27963C4.98378 4.44627 4.81671 4.54977 4.6396 4.53169C4.53384 4.52174 4.42765 4.51713 4.32143 4.51786C1.93477 4.51786 0 6.45263 0 8.83929C0 11.2259 1.93477 13.1607 4.32143 13.1607V13.1607ZM13.75 6.08929H16.1071C16.3241 6.08929 16.5 6.26518 16.5 6.48215C16.5 6.69912 16.3241 6.875 16.1071 6.875H15.3214V10.8036H16.1071C16.3241 10.8036 16.5 10.9795 16.5 11.1964C16.5 11.4134 16.3241 11.5893 16.1071 11.5893H13.75C13.533 11.5893 13.3571 11.4134 13.3571 11.1964C13.3571 10.9795 13.533 10.8036 13.75 10.8036H14.5357V6.875H13.75C13.533 6.875 13.3571 6.69912 13.3571 6.48215C13.3571 6.26518 13.533 6.08929 13.75 6.08929ZM10.2143 6.08929H11.7857C12.6536 6.08929 13.3571 6.79284 13.3571 7.66072C13.3571 8.5286 12.6536 9.23215 11.7857 9.23215H10.6071V11.1964C10.6071 11.4134 10.4313 11.5893 10.2143 11.5893C9.99732 11.5893 9.82143 11.4134 9.82143 11.1964V6.48215C9.82143 6.26518 9.99732 6.08929 10.2143 6.08929ZM6.30587 4.39356C7.17117 1.7978 9.33688 1.76786 9.42857 1.76786C9.64554 1.76733 9.82186 1.94279 9.82239 2.15976C9.82292 2.37673 9.64747 2.55304 9.4305 2.55358C9.35432 2.55472 7.73072 2.60363 7.05127 4.64216C7.00687 4.77532 6.8948 4.87466 6.75728 4.90278C6.61976 4.9309 6.47768 4.88352 6.38457 4.77848C6.29146 4.67345 6.26146 4.52672 6.30587 4.39356ZM5.52015 11.0721L7.09158 6.35785C7.09457 6.34885 7.10156 6.3428 7.10514 6.33428C7.14765 6.24045 7.22286 6.1653 7.31673 6.12288C7.32521 6.11938 7.33115 6.11247 7.33999 6.10952C7.35462 6.1068 7.36941 6.10496 7.38426 6.10402C7.43683 6.0908 7.49186 6.0908 7.54443 6.10402C7.55924 6.10495 7.57399 6.10677 7.58859 6.10948C7.59743 6.11243 7.60332 6.1193 7.6118 6.1228C7.70562 6.16533 7.78082 6.24046 7.82344 6.33424C7.82701 6.34284 7.834 6.34889 7.83699 6.35781L9.40842 11.0721C9.47707 11.2779 9.36585 11.5004 9.16001 11.5691C8.95418 11.6377 8.73166 11.5265 8.66301 11.3207L8.09777 9.625H6.8308L6.26556 11.3207C6.19691 11.5266 5.9744 11.6378 5.76856 11.5691C5.56272 11.5005 5.4515 11.278 5.52015 11.0721V11.0721ZM2.81388 5.64367C2.9408 5.58371 3.09007 5.59601 3.20547 5.67594C3.32086 5.75588 3.38484 5.8913 3.37332 6.0312C3.36179 6.1711 3.2765 6.29423 3.14958 6.35419C2.18909 6.80979 1.57535 7.77623 1.57143 8.83929C1.56902 9.46474 1.78381 10.0716 2.17914 10.5563C2.27069 10.665 2.29638 10.8147 2.24632 10.9477C2.19626 11.0808 2.07825 11.1764 1.93774 11.1978C1.79722 11.2191 1.65612 11.163 1.56876 11.0508C0.888151 10.2083 0.632571 9.09974 0.875613 8.04429C1.11865 6.98883 1.83334 6.10367 2.81388 5.64367V5.64367Z" fill="black"/> </g> <defs> <clipPath id="clip0"> <rect width="22" height="22" fill="white"/> </clipPath> </defs> </svg>',
  },
  async: {
    name: 'Async/Await',
    svg:
      '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.4062 14.7057H11.8142V9.5C11.8142 9.40547 11.7369 9.32812 11.6424 9.32812H10.3533C10.2588 9.32812 10.1814 9.40547 10.1814 9.5V14.7057H8.59373C8.44979 14.7057 8.37029 14.8711 8.45838 14.9828L10.8646 18.0271C10.8807 18.0477 10.9012 18.0643 10.9247 18.0757C10.9482 18.0872 10.9739 18.0931 11 18.0931C11.0261 18.0931 11.0518 18.0872 11.0753 18.0757C11.0987 18.0643 11.1193 18.0477 11.1353 18.0271L13.5416 14.9828C13.6297 14.8711 13.5502 14.7057 13.4062 14.7057V14.7057Z" fill="black"/> <path d="M17.4324 7.87832C16.4484 5.28301 13.9412 3.4375 11.0043 3.4375C8.06738 3.4375 5.56016 5.28086 4.57617 7.87617C2.73496 8.35957 1.375 10.0375 1.375 12.0312C1.375 14.4053 3.29785 16.3281 5.66973 16.3281H6.53125C6.62578 16.3281 6.70312 16.2508 6.70312 16.1562V14.8672C6.70312 14.7727 6.62578 14.6953 6.53125 14.6953H5.66973C4.9457 14.6953 4.26465 14.4074 3.75762 13.8854C3.25273 13.3654 2.98418 12.665 3.00781 11.9389C3.02715 11.3717 3.22051 10.8389 3.5707 10.3898C3.92949 9.93223 4.43223 9.59922 4.99082 9.45098L5.80508 9.23828L6.10371 8.45195C6.28848 7.96211 6.54629 7.50449 6.8707 7.08984C7.19097 6.67886 7.57035 6.31759 7.99648 6.01777C8.87949 5.39688 9.91934 5.06816 11.0043 5.06816C12.0893 5.06816 13.1291 5.39688 14.0121 6.01777C14.4396 6.31855 14.8178 6.67949 15.1379 7.08984C15.4623 7.50449 15.7201 7.96426 15.9049 8.45195L16.2014 9.23613L17.0135 9.45098C18.1779 9.76465 18.9922 10.8238 18.9922 12.0312C18.9922 12.7424 18.715 13.4127 18.2123 13.9154C17.9658 14.1634 17.6725 14.36 17.3494 14.4939C17.0264 14.6278 16.68 14.6962 16.3303 14.6953H15.4688C15.3742 14.6953 15.2969 14.7727 15.2969 14.8672V16.1562C15.2969 16.2508 15.3742 16.3281 15.4688 16.3281H16.3303C18.7021 16.3281 20.625 14.4053 20.625 12.0312C20.625 10.0396 19.2693 8.36387 17.4324 7.87832Z" fill="black"/> </svg> ',
  },
  array: {
    name: 'Array Methods',
    svg:
      '<svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0.96875 0.625L0.3125 1.28125V15.7188L0.96875 16.375H4.25V15.0625H1.625V1.9375H4.25V0.625H0.96875ZM18.0312 16.375L18.6875 15.7188V1.28125L18.0312 0.625H14.75V1.9375H17.375V15.0625H14.75V16.375H18.0312Z" fill="black"/> </svg> ',
  },
  animation: {
    name: 'Animation',
    svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4 2C2.89 2 2 2.89 2 4V14H4V4H14V2H4ZM8 6C6.89 6 6 6.89 6 8V18H8V8H18V6H8ZM12 10C10.89 10 10 10.89 10 12V20C10 21.11 10.89 22 12 22H20C21.11 22 22 21.11 22 20V12C22 10.89 21.11 10 20 10H12Z" fill="black"/> </svg> ',
  },
  svg: {
    name: 'Custom SVG',
    svg:
      '<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M19.6875 15.0938H15.75C15.4019 15.0938 15.0681 14.9555 14.8219 14.7093C14.5758 14.4632 14.4375 14.1293 14.4375 13.7812V7.21875C14.4375 6.87065 14.5758 6.53681 14.8219 6.29067C15.0681 6.04453 15.4019 5.90625 15.75 5.90625H19.6875V7.21875H15.75V13.7812H18.375V11.1562H17.0625V9.84375H19.6875V15.0938Z" fill="black"/> <path d="M11.8125 5.90625L10.5 14.4375L9.1875 5.90625H7.875L9.52875 15.0938H11.4712L13.125 5.90625H11.8125Z" fill="black"/> <path d="M5.25 15.0938H1.3125V13.7812H5.25V11.1562H2.625C2.2769 11.1562 1.94306 11.018 1.69692 10.7718C1.45078 10.5257 1.3125 10.1918 1.3125 9.84375V7.21875C1.3125 6.87065 1.45078 6.53681 1.69692 6.29067C1.94306 6.04453 2.2769 5.90625 2.625 5.90625H6.5625V7.21875H2.625V9.84375H5.25C5.5981 9.84375 5.93194 9.98203 6.17808 10.2282C6.42422 10.4743 6.5625 10.8082 6.5625 11.1562V13.7812C6.5625 14.1293 6.42422 14.4632 6.17808 14.7093C5.93194 14.9555 5.5981 15.0938 5.25 15.0938Z" fill="black"/> </svg> ',
  },
  grid: {
    name: 'CSS Grid',
    svg:
      '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 1.375H1.375V20.625H8.25V1.375ZM20.625 1.375H13.75V8.25H20.625V1.375ZM20.625 13.75H13.75V20.625H20.625V13.75ZM0 1.375C0 1.01033 0.144866 0.660591 0.402728 0.402728C0.660591 0.144866 1.01033 0 1.375 0L8.25 0C8.61467 0 8.96441 0.144866 9.22227 0.402728C9.48013 0.660591 9.625 1.01033 9.625 1.375V20.625C9.625 20.9897 9.48013 21.3394 9.22227 21.5973C8.96441 21.8551 8.61467 22 8.25 22H1.375C1.01033 22 0.660591 21.8551 0.402728 21.5973C0.144866 21.3394 0 20.9897 0 20.625V1.375ZM12.375 1.375C12.375 1.01033 12.5199 0.660591 12.7777 0.402728C13.0356 0.144866 13.3853 0 13.75 0L20.625 0C20.9897 0 21.3394 0.144866 21.5973 0.402728C21.8551 0.660591 22 1.01033 22 1.375V8.25C22 8.61467 21.8551 8.96441 21.5973 9.22227C21.3394 9.48013 20.9897 9.625 20.625 9.625H13.75C13.3853 9.625 13.0356 9.48013 12.7777 9.22227C12.5199 8.96441 12.375 8.61467 12.375 8.25V1.375ZM13.75 12.375C13.3853 12.375 13.0356 12.5199 12.7777 12.7777C12.5199 13.0356 12.375 13.3853 12.375 13.75V20.625C12.375 20.9897 12.5199 21.3394 12.7777 21.5973C13.0356 21.8551 13.3853 22 13.75 22H20.625C20.9897 22 21.3394 21.8551 21.5973 21.5973C21.8551 21.3394 22 20.9897 22 20.625V13.75C22 13.3853 21.8551 13.0356 21.5973 12.7777C21.3394 12.5199 20.9897 12.375 20.625 12.375H13.75Z" fill="black"/> </svg> ',
  },
  audio: {
    name: 'Audio API',
    svg:
      '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.75 1.875V18.125H16.25V1.875H3.75ZM5 3.125H15V16.875H5V3.125ZM10 6.075V10.1175C9.80021 10.0418 9.58863 10.0021 9.375 10C8.34688 10 7.5 10.8469 7.5 11.875C7.5 12.9031 8.34688 13.75 9.375 13.75C10.4031 13.75 11.25 12.9031 11.25 11.875V7.675L12.9688 8.10625L13.2812 6.89375L10.7812 6.26875L10 6.075V6.075ZM9.375 11.25C9.7275 11.25 10 11.5225 10 11.875C10 12.2275 9.7275 12.5 9.375 12.5C9.0225 12.5 8.75 12.2275 8.75 11.875C8.75 11.5225 9.0225 11.25 9.375 11.25Z" fill="black"/> </svg> ',
  },
  speechtext: {
    name: 'Speech API',
    svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8 7C8.53043 7 9.03914 7.21071 9.41421 7.58579C9.78929 7.96086 10 8.46957 10 9V14C10 14.5304 9.78929 15.0391 9.41421 15.4142C9.03914 15.7893 8.53043 16 8 16C7.46957 16 6.96086 15.7893 6.58579 15.4142C6.21071 15.0391 6 14.5304 6 14V9C6 8.46957 6.21071 7.96086 6.58579 7.58579C6.96086 7.21071 7.46957 7 8 7V7ZM14 14C14 16.97 11.84 19.44 9 19.92V22H7V19.92C4.16 19.44 2 16.97 2 14H4C4 15.0609 4.42143 16.0783 5.17157 16.8284C5.92172 17.5786 6.93913 18 8 18C9.06087 18 10.0783 17.5786 10.8284 16.8284C11.5786 16.0783 12 15.0609 12 14H14ZM21.41 9.41L17.17 13.66L18.18 10H14C13.4696 10 12.9609 9.78929 12.5858 9.41421C12.2107 9.03914 12 8.53043 12 8V4C12 3.46957 12.2107 2.96086 12.5858 2.58579C12.9609 2.21071 13.4696 2 14 2H20C20.5304 2 21.0391 2.21071 21.4142 2.58579C21.7893 2.96086 22 3.46957 22 4V8C22 8.55 21.78 9.05 21.41 9.41Z" fill="black"/> </svg>',
  },
  darkmode: {
    name: 'Light/Dark Mode',
    svg:
      '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9 0.25C6.67936 0.25 4.45376 1.17187 2.81282 2.81282C1.17187 4.45376 0.25 6.67936 0.25 9C0.25 11.3206 1.17187 13.5462 2.81282 15.1872C4.45376 16.8281 6.67936 17.75 9 17.75C11.3206 17.75 13.5462 16.8281 15.1872 15.1872C16.8281 13.5462 17.75 11.3206 17.75 9C17.75 6.67936 16.8281 4.45376 15.1872 2.81282C13.5462 1.17187 11.3206 0.25 9 0.25V0.25ZM9 16.5V1.5C9.98491 1.5 10.9602 1.69399 11.8701 2.0709C12.7801 2.44781 13.6069 3.00026 14.3033 3.6967C14.9997 4.39314 15.5522 5.21993 15.9291 6.12987C16.306 7.03982 16.5 8.01509 16.5 9C16.5 9.98491 16.306 10.9602 15.9291 11.8701C15.5522 12.7801 14.9997 13.6069 14.3033 14.3033C13.6069 14.9997 12.7801 15.5522 11.8701 15.9291C10.9602 16.306 9.98491 16.5 9 16.5V16.5Z" fill="black"/> </svg> ',
  },
  canvas: {
    name: ' HTML5 Canvas API',
    svg:
      '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20.6237 16.4839H17.0608L19.0569 19.9395C19.2572 20.2686 19.3073 20.612 19.2072 20.9698C19.107 21.3275 18.8924 21.6029 18.5632 21.7961C18.2341 21.9893 17.8872 22.0358 17.5223 21.9356C17.1574 21.8354 16.8819 21.6208 16.6959 21.2917L13.8842 16.4839H12.3818V20.6049C12.3818 20.9769 12.2459 21.2989 11.974 21.5707C11.7021 21.8426 11.3766 21.9785 10.9974 21.9785C10.6182 21.9785 10.2963 21.8426 10.0315 21.5707C9.76683 21.2989 9.63447 20.9769 9.63447 20.6049V16.4839H8.13203L5.32032 21.2917C5.13431 21.6208 4.85886 21.8354 4.49398 21.9356C4.1291 22.0358 3.78211 21.9893 3.45301 21.7961C3.1239 21.6029 2.90927 21.3275 2.8091 20.9698C2.70894 20.612 2.75902 20.2686 2.95935 19.9395L4.95544 16.4839H1.39252C1.02049 16.4839 0.698535 16.3515 0.426665 16.0868C0.154795 15.8221 0.0188599 15.4966 0.0188599 15.1102V2.74732C0.0188599 2.37528 0.154795 2.05333 0.426665 1.78146C0.698535 1.50959 1.02049 1.37366 1.39252 1.37366H9.63447C9.63447 1.00163 9.7704 0.679675 10.0423 0.407805C10.3141 0.135935 10.6361 0 11.0081 0C11.3802 0 11.7021 0.135935 11.974 0.407805C12.2459 0.679675 12.3818 1.00163 12.3818 1.37366H20.6237C20.9958 1.37366 21.3177 1.50959 21.5896 1.78146C21.8615 2.05333 21.9974 2.37528 21.9974 2.74732V15.1102C21.9974 15.4966 21.8615 15.8221 21.5896 16.0868C21.3177 16.3515 20.9958 16.4839 20.6237 16.4839Z" fill="black"/> </svg> ',
  },
  time: {
    name: 'Time',
    svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22.1484 9.65625H16.1484C16.0453 9.65625 15.9609 9.74062 15.9609 9.84375V10.9688C15.9609 11.0719 16.0453 11.1562 16.1484 11.1562H22.1484C22.2516 11.1562 22.3359 11.0719 22.3359 10.9688V9.84375C22.3359 9.74062 22.2516 9.65625 22.1484 9.65625ZM19.0078 12.8438H16.1484C16.0453 12.8438 15.9609 12.9281 15.9609 13.0312V14.1562C15.9609 14.2594 16.0453 14.3438 16.1484 14.3438H19.0078C19.1109 14.3438 19.1953 14.2594 19.1953 14.1562V13.0312C19.1953 12.9281 19.1109 12.8438 19.0078 12.8438ZM11.1867 7.55859H10.1719C10.0266 7.55859 9.90936 7.67578 9.90936 7.82109V13.6336C9.90936 13.718 9.94921 13.7953 10.0172 13.8445L13.507 16.3898C13.6242 16.4742 13.7883 16.4508 13.8726 16.3336L14.475 15.5109V15.5086C14.5594 15.3914 14.5336 15.2273 14.4164 15.143L11.4469 12.9961V7.82109C11.4492 7.67578 11.3297 7.55859 11.1867 7.55859V7.55859Z" fill="black"/> <path d="M18.8625 15.7945H17.5078C17.3766 15.7945 17.2524 15.8625 17.182 15.975C16.8844 16.4461 16.5375 16.882 16.1391 17.2805C15.4524 17.9672 14.6531 18.5063 13.7649 18.8813C12.8438 19.2703 11.8664 19.4672 10.8586 19.4672C9.84845 19.4672 8.87111 19.2703 7.95236 18.8813C7.06408 18.5063 6.26486 17.9672 5.57814 17.2805C4.89142 16.5938 4.35236 15.7945 3.97736 14.9063C3.5883 13.9875 3.39142 13.0102 3.39142 12C3.39142 10.9898 3.5883 10.0148 3.97736 9.09375C4.35236 8.20547 4.89142 7.40625 5.57814 6.71954C6.26486 6.03282 7.06408 5.49375 7.95236 5.11875C8.87111 4.72969 9.8508 4.53282 10.8586 4.53282C11.8688 4.53282 12.8461 4.72969 13.7649 5.11875C14.6531 5.49375 15.4524 6.03282 16.1391 6.71954C16.5375 7.11797 16.8844 7.55391 17.182 8.025C17.2524 8.1375 17.3766 8.20547 17.5078 8.20547H18.8625C19.0242 8.20547 19.1274 8.03672 19.0547 7.89375C17.5266 4.85391 14.4281 2.87813 10.9688 2.83829C5.90392 2.775 1.69689 6.9211 1.68752 11.9813C1.67814 17.0508 5.78673 21.1641 10.8563 21.1641C14.3602 21.1641 17.5102 19.1813 19.0547 16.1063C19.1274 15.9633 19.0219 15.7945 18.8625 15.7945V15.7945Z" fill="black"/> </svg> ',
  },
  drag: {
    name: 'Drag & Drop API',
    svg:
      '<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M25.8334 11.625H5.16669V14.2083H25.8334V11.625ZM5.16669 19.375H25.8334V16.7917H5.16669V19.375Z" fill="black"/> </svg> ',
  },
  speechrecognition: {
    name: 'Speech Recognition API',
    svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14Z" fill="black"/> <path d="M17 11C17 13.76 14.76 16 12 16C9.24 16 7 13.76 7 11H5C5 14.53 7.61 17.43 11 17.92V21H13V17.92C16.39 17.43 19 14.53 19 11H17Z" fill="black"/> </svg> ',
  },
};
// https://www.textfixer.com/tools/remove-line-breaks.php
const projects = [
  {
    path: 'form-validator',
    header: 'Form <span>Validator</span>',
    photos: [
      { id: 1, title: 'Form Validator: Main Site', path: 'form-validator' },
      { id: 2, title: 'Form Validator: Registation Form', path: 'form-validator' },
      { id: 3, title: 'Form Validator: Login Form', path: 'form-validator' },
    ],
    tags: ['localstorage', 'ui', 'dom'],
  },
  {
    path: 'movie-seat-booking',
    header: '<span>Movie Seat</span> Booking',
    photos: [
      { id: 1, title: 'Movie Seat Booking: Main Site', path: 'movie-seat-booking' },
      { id: 2, title: 'Movie Seat Booking: Film and seats selected', path: 'movie-seat-booking' },
    ],
    tags: ['localstorage', 'ui', 'dom'],
  },
  {
    path: 'video-player',
    header: 'Custom <span>Video Player</span>',
    photos: [
      { id: 1, title: 'Custom Video Player: Main Site', path: 'custom-video-player' },
      { id: 2, title: 'Custom Video Player: Video Playing', path: 'custom-video-player' },
    ],
    tags: ['localstorage', 'video', 'volume'],
  },
  {
    path: 'exchange-calculator',
    header: '<span>Exchange Rate</span> Calculator',
    photos: [
      { id: 1, title: 'Exchange Rate Calculator: Main Site', path: 'exchange-rate-calculator' },
      { id: 2, title: 'Exchange Rate Calculator: Money exchange', path: 'exchange-rate-calculator' },
    ],
    tags: ['ui', 'api', 'async'],
  },
  {
    path: 'dom-array-methods',
    header: 'DOM <span>Array Methods</span>',
    photos: [
      { id: 1, title: 'DOM Array Methods: Main Site', path: 'dom-array-methods' },
      { id: 2, title: 'DOM Array Methods: Money Doubled', path: 'dom-array-methods' },
      { id: 3, title: 'DOM Array Methods: Calculated Wealth', path: 'dom-array-methods' },
    ],
    tags: ['dom', 'api', 'async', , 'array'],
  },
  {
    path: 'landing-page',
    header: 'Landing Page with <span>Modal and Navbar</span>',
    photos: [
      { id: 1, title: 'Landing Page: Main Site', path: 'landing-page' },
      { id: 2, title: 'Landing Page: Modal Open', path: 'landing-page' },
      { id: 3, title: 'Landing Page: Navigation Bar Open', path: 'landing-page' },
    ],
    tags: ['ui', 'animation'],
  },
  {
    path: 'hangman-game',
    header: '<span>Hangman</span> Game',
    photos: [
      { id: 1, title: 'Hangman Game: Main Page', path: 'hangman-game' },
      { id: 2, title: 'Hangman Game: Letter Guessing', path: 'hangman-game' },
      { id: 3, title: 'Hangman Game: Lose Modal', path: 'hangman-game' },
      { id: 4, title: 'Hangman Game: Win Modal', path: 'hangman-game' },
    ],
    tags: ['ui', 'localstorage', 'dom', 'svg'],
  },
  {
    path: 'meal-finder',
    header: '<span>Meal</span> Finder',
    photos: [
      { id: 1, title: 'Meal Finger: Main Page', path: 'meal-finder' },
      { id: 2, title: 'Meal Finger: Meal Searched', path: 'meal-finder' },
      { id: 3, title: 'Meal Finger: Meal Info', path: 'meal-finder' },
    ],
    tags: ['ui', 'api', 'async', 'grid'],
  },
  {
    path: 'expense-tracker',
    header: '<span>Expense</span> Tracker',
    photos: [
      { id: 1, title: 'Expense Tracker: Main Site', path: 'expense-tracker' },
      { id: 2, title: 'Expense Tracker: Data added', path: 'expense-tracker' },
    ],
    tags: ['localstorage', 'array', 'dom'],
  },
  {
    path: 'music-player',
    header: 'Music <span>Player</span>',
    photos: [
      { id: 1, title: 'Music Player: Main Site', path: 'music-player' },
      { id: 2, title: 'Music Player: Popup Open', path: 'music-player' },
      { id: 3, title: 'Music Player: Songs Liked', path: 'music-player' },
    ],
    tags: ['localstorage', 'ui', 'volume', 'animation', 'audio'],
  },
  {
    path: 'infinite-scroll',
    header: '<span>Infinite</span> Scroll',
    photos: [
      { id: 1, title: 'Infinite Scroll: Main Site', path: 'infinite-scroll' },
      { id: 2, title: 'Infinite Scroll: News Loading', path: 'infinite-scroll' },
      { id: 3, title: 'Infinite Scroll: Searching', path: 'infinite-scroll' },
    ],
    tags: ['ui', 'api', 'async'],
  },
  {
    path: 'typing-game',
    header: '<span>Typing</span> Game',
    photos: [
      { id: 1, title: 'Typig Game: Main Site', path: 'typing-game' },
      { id: 2, title: 'Typig Game: Lose', path: 'typing-game' },
      { id: 3, title: 'Typig Game: Scoreboard', path: 'typing-game' },
    ],
    tags: ['localstorage', 'dom', 'async', 'api'],
  },
  {
    path: 'speech-text-reader',
    header: 'Speech <span>Text Reader</span>',
    photos: [
      { id: 1, title: 'Speech Text Reader: Main Site', path: 'speech-text-reader' },
      { id: 2, title: 'Speech Text Reader: Text Reader', path: 'speech-text-reader' },
      { id: 3, title: 'Speech Text Reader: Custom Card Adding', path: 'speech-text-reader' },
    ],
    tags: ['speechtext', 'localstorage', 'ui', 'api', 'async'],
  },
  {
    path: 'memory-cards',
    header: '<span>Memory</span> Cards',
    photos: [
      { id: 1, title: 'Memory Cards: Main Site', path: 'memory-cards' },
      { id: 2, title: 'Memory Cards: Add New Card Modal', path: 'memory-cards' },
      { id: 3, title: 'Memory Cards: Dark Theme', path: 'memory-cards' },
    ],
    tags: ['localstorage', 'ui', 'animation', 'darkmode'],
  },
  {
    path: 'lyrics-search',
    header: 'Lyrics <span>Search</span>',
    photos: [
      { id: 1, title: 'Lyrics Search: Main Site', path: 'lyrics-search' },
      { id: 2, title: 'Lyrics Search: Search Result', path: 'lyrics-search' },
      { id: 3, title: 'Lyrics Search: Song Lyrics', path: 'lyrics-search' },
    ],
    tags: ['localstorage', 'ui', 'api', 'async', 'audio'],
  },
  {
    path: 'relaxer-app',
    header: '<span>Relaxer</span> App',
    photos: [
      { id: 1, title: 'Relaxer App: Main Site', path: 'relaxer-app' },
      { id: 2, title: 'Relaxer App: Diffrent Background and Sound', path: 'relaxer-app' },
    ],
    tags: ['animation', 'ui', 'audio', 'volume'],
  },
  {
    path: 'breakout-game',
    header: '<span>Breakout</span> Game',
    photos: [
      { id: 1, title: 'Breakout Game: Main Site', path: 'breakout-game' },
      { id: 2, title: 'Breakout Game: Lose Modal', path: 'breakout-game' },
      { id: 3, title: 'Breakout Game: Win Modal', path: 'breakout-game' },
    ],
    tags: ['canvas', 'audio', 'localstorage'],
  },
  {
    path: 'new-year-countdown',
    header: 'New Year <span>Countdown</span>',
    photos: [{ id: 1, title: 'New Year Countdown', path: 'new-year-countdown' }],
    tags: ['dom', 'time'],
  },
  {
    path: 'sortable-list',
    header: '<span>Sortable</span> List',
    photos: [
      { id: 1, title: 'Sortable List: Main Site', path: 'sortable-list' },
      { id: 2, title: 'Sortable List: List Sorted', path: 'sortable-list' },
    ],
    tags: ['drag'],
  },
  {
    path: 'number-quessing-game',
    header: '<span>Number Guessing</span> Game',
    photos: [
      { id: 1, title: 'Number Guessing Game: Main Site', path: 'number-quessing-game' },
      { id: 2, title: 'Number Guessing Game: Lower/Higer Information', path: 'number-quessing-game' },
      { id: 3, title: 'Number Guessing Game: Number Guessed', path: 'number-quessing-game' },
    ],
    tags: ['speechrecognition'],
  },
];

// Initalize website with DOM elements

const init = () => {
  // Add all projects to DOM
  projects.forEach((project, index) => {
    const el = document.createElement('section');
    el.classList = `${index % 2 ? 'project left' : 'project'}`;

    const elPhotos = project.photos.map((photo) => `<li class="splide__slide"><img src="public/img/${photo.path}/${photo.id}.png" alt="${photo.title}" title="${photo.title}" /></li>`).join('');
    const elTags = project.tags.map((tag) => `<div class="tag">${tags[tag].svg} ${tags[tag].name}</div>`).join('');

    el.innerHTML = ` 
      <div class="slider">
        <div id="splide" class="splide">
          <div class="splide__track">
            <ul class="splide__list">
              ${elPhotos}
            </ul>
          </div>
        </div>
        <span class="box bottom"></span>
        <span class="box top"></span>
      </div>
      <section class="project-info">
        <span class="number">#${index + 1 < 10 ? '0' + (index + 1) : index + 1}</span>
        <h2>${project.header}</h2>
        <div class="tags">
          ${elTags}
        </div>
        <div class="buttons-container">
          <a href="https://github.com/Ptasi0r/javascript-projects/tree/master/${project.path}" target="_blank" class="github button">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.8598 3.17627C9.76203 3.17627 3.19885 9.73945 3.19885 17.8372C3.19885 24.3137 7.39841 29.8097 13.2252 31.75C13.9586 31.8823 14.2232 31.431 14.2232 31.043C14.2232 30.6946 14.2115 29.7715 14.2071 28.55C10.128 29.4349 9.26667 26.5832 9.26667 26.5832C8.60227 24.8899 7.63947 24.4386 7.63947 24.4386C6.3092 23.5287 7.7409 23.5493 7.7409 23.5493C9.21375 23.6522 9.98546 25.0604 9.98546 25.0604C11.2937 27.3006 13.4192 26.6538 14.2512 26.279C14.3849 25.3309 14.7671 24.6841 15.1846 24.3181C11.9302 23.9491 8.50819 22.6909 8.50819 17.0714C8.50819 15.4736 9.07999 14.1624 10.0134 13.1394C9.86493 12.7675 9.35781 11.2755 10.1589 9.25879C10.1589 9.25879 11.3892 8.86338 14.1894 10.7596C15.3853 10.4342 16.619 10.2682 17.8583 10.2657C19.0977 10.2677 20.3314 10.4338 21.5272 10.7596C24.3289 8.86191 25.5578 9.25879 25.5578 9.25879C26.3589 11.2755 25.8562 12.7675 25.7033 13.1394C26.644 14.1624 27.2085 15.4721 27.2085 17.0714C27.2085 22.7056 23.7836 23.9433 20.5174 24.3063C21.0392 24.7591 21.5096 25.6528 21.5096 27.0198C21.5096 28.9807 21.492 30.5623 21.492 31.043C21.492 31.4354 21.7536 31.8911 22.5018 31.747C28.3256 29.8038 32.5208 24.3122 32.5208 17.8372C32.5208 9.73945 25.9576 3.17627 17.8598 3.17627Z"
                fill="white"
              />
            </svg>
      
            GitHub</a
          >
          <a href="${project.path}/index.html" target="_blank" class="preview button">
            <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.6957 12.3277C17.6957 13.0074 17.4257 13.6593 16.945 14.14C16.4644 14.6206 15.8125 14.8906 15.1328 14.8906C14.453 14.8906 13.8011 14.6206 13.3205 14.14C12.8398 13.6593 12.5698 13.0074 12.5698 12.3277C12.5698 11.648 12.8398 10.9961 13.3205 10.5154C13.8011 10.0348 14.453 9.76477 15.1328 9.76477C15.8125 9.76477 16.4644 10.0348 16.945 10.5154C17.4257 10.9961 17.6957 11.648 17.6957 12.3277Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.1328 0.794556C7.9668 0.794556 1.94648 5.69488 0.239563 12.3278C1.94648 18.9606 7.9668 23.8609 15.1328 23.8609C22.2974 23.8609 28.319 18.9606 30.026 12.3278C28.319 5.69488 22.2987 0.794556 15.1328 0.794556ZM20.2586 12.3278C20.2586 13.6872 19.7186 14.991 18.7573 15.9523C17.796 16.9136 16.4922 17.4536 15.1328 17.4536C13.7733 17.4536 12.4695 16.9136 11.5082 15.9523C10.5469 14.991 10.0069 13.6872 10.0069 12.3278C10.0069 10.9683 10.5469 9.6645 11.5082 8.70322C12.4695 7.74193 13.7733 7.20189 15.1328 7.20189C16.4922 7.20189 17.796 7.74193 18.7573 8.70322C19.7186 9.6645 20.2586 10.9683 20.2586 12.3278Z"
                fill="black"
              />
            </svg>
            Live Preview</a
          >
        </div>
      </section>
    `;

    projectsContainer.appendChild(el);
  });

  // Get all sliders container and creater from them the sliders
  const sliders = document.querySelectorAll('.splide');

  sliders.forEach((slider) => {
    new Splide(slider, {
      type: 'fade',
      rewind: true,
    }).mount();
  });
};

init();
