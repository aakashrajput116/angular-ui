"use strict";
$(document).ready(function() {
  $('#main-menu').smartmenus();
  $('#sub-menu').smartmenus()
});

if ($(window).width() > '1200') {
  $('#hover-cls').hover(
    function () {
      $('.sm').addClass('hover-unset');
    }
  )

}
