$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 50,
      nav: false, // Set to false to remove navigation arrows
      autoplay: true,
      autoplayTimeout: 5000, // thời gian chờ giữa các lần chuyển động tự động (5 giây)
      autoplaySpeed: 1000, // tốc độ chuyển động khi autoplay (1 giây)
      autoplayHoverPause: true,
      smartSpeed: 1000, // tốc độ chuyển động của carousel (1 giây)
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 4
        }
      }
    });
  });