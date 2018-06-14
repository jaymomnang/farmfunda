(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.carousel.carousel-slider').carousel({
      fullWidth: true
    });
    $('.slider').slider({
      indicators: false
    });
    $('ul.tabs').tabs();
    $('select').material_select();
    $('.modal').modal();

  }); // end of document ready
})(jQuery); // end of jQuery name space