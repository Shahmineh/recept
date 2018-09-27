const app = new App();

// app.navigation();
//Call changePage when click back and forward
// window.addEventListener('popstate', app.navigation)

$(document).on('click', '*', function(e) {
  if (e.target.getAttribute('type') != 'radio') {
    let s = $('[type="radio"]:checked')
    if (s.length) {
      s.prop('checked', false);
      e.stopImmediatePropagation();
    }
  }
})

