    window.onscroll = function() {changeStickyNavbar()};

    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;

    function changeStickyNavbar() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("fixed-top");
        navbar.classList.add("fixed-nav");
      } else {
        navbar.classList.remove("fixed-top");
        navbar.classList.remove("fixed-nav");
      }
    }