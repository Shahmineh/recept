const app = new App();
app.navigation();
//Call changePage when click back and forward
window.addEventListener('popstate',app.navigation);


