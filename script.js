var link = document.getElementById('back-to-top');
var amountScrolled = 250;

window.addEventListener('scroll', function (e) {
  if (window.pageYOffset > amountScrolled) {
    link.classList.add('show');
  } else {
    link.className = 'back-to-top';
  }
});

// Scrolls to Top
// link.addEventListener('click', function (e) {
//   e.preventDefault();

//   var distance = 0 - window.pageYOffset;
//   var increments = distance / (500 / 16);
//   function animateScroll() {
//     window.scrollBy(0, increments);
//     if (window.pageYOffset <= document.body.offsetTop) {
//       clearInterval(runAnimation);
//     }
//   }
// Loop the animation function
//   var runAnimation = setInterval(animateScroll, 16);
// });

//Close Collapse Menu onClick

$(function () {
  var navMain = $('.navbar-collapse'); // avoid dependency on #id
  // "a:not([data-toggle])" - to avoid issues caused
  // when you have dropdown inside navbar
  navMain.on('click', 'a:not([data-toggle])', null, function () {
    navMain.collapse('hide');
  });
});
