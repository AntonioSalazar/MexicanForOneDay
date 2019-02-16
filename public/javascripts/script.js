

window.onload = ()=>{
  $( document ).ready(function() {
    $('.heart').click(function(){
      $(this).addClass('on');
      $(this).prevAll().addClass('on');
    });
  });

}

