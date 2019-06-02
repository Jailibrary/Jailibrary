console.log('GitHub: https://github.com/jailibrary/jailibrary.github.io')

var myDate = new Date();
var hrs = myDate.getHours();

var greet;

if (hrs < 12)
  greet = '<i class="fas fa-sun" style="color: #FDB813;"></i> Good Morning';
else if (hrs >= 12 && hrs <= 17)
  greet = '<i class="fas fa-sun" style="color: #f0c420;"></i> Good Afternoon';
else if (hrs >= 17 && hrs <= 24)
  greet = '<i class="fas fa-moon" style="color: #ffffff;"></i> Good Evening';

$('#tod').html(greet)

$(function () {
  var isOnMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
  if (isOnMobile) {
    $('.display-2').removeClass('display-2').addClass('display-4').css({ 'overflow': 'hidden' })
    $('#is-on-mobile-alert').show()
  }
});

var stylesheet = $('link[name="default_stylesheet"]');

if (localStorage.getItem("theme") === "light") {
  stylesheet.attr('href', 'https://bootswatch.com/4/materia/bootstrap.min.css')
  $('#light-click').removeClass('btn-secondary').addClass('btn-primary')
  $('#dark-click').removeClass('btn-primary').addClass('btn-secondary')
  $('.navbar').removeClass('navbar-dark').addClass('navbar-light')
  
} else if (localStorage.getItem("theme") === "dark") {
  stylesheet.attr('href', 'https://bootswatch.com/4/darkly/bootstrap.min.css')
  $('#dark-click').removeClass('btn-secondary').addClass('btn-primary')
  $('#light-click').removeClass('btn-primary').addClass('btn-secondary')
}

$('#light-click').on('click', function () {
  stylesheet.attr('href', 'https://bootswatch.com/4/materia/bootstrap.min.css')
  $(this).removeClass('btn-secondary').addClass('btn-primary')
  $('#dark-click').removeClass('btn-primary').addClass('btn-secondary')
  $('.navbar').removeClass('navbar-dark').addClass('navbar-light')

  localStorage.setItem("theme", "light");
});

$('#dark-click').on('click', function () {
  stylesheet.attr('href', 'https://bootswatch.com/4/darkly/bootstrap.min.css')
  $(this).removeClass('btn-secondary').addClass('btn-primary')
  $('#light-click').removeClass('btn-primary').addClass('btn-secondary')
  if ($('.navbar').hasClass('navbar-dark')) {
  } else {
    $('.navbar').addClass('navbar-dark')
    $('.navbar').removeClass('navbar-light')
  }

  localStorage.setItem("theme", "dark");
});