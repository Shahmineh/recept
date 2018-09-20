const app = new App();
app.navigation();
//Call changePage when click back and forward
window.addEventListener('popstate',app.navigation);


const categories = $.getJSON("/json/categories.json",
    function (data) {
        const categoryList = Object.keys(data).map(category => {
            //Create sub category list
            const subCategories = data[category].map(subCategory => {
                return `
                    <li class="nav-item">
                        <a class="nav-link active btn-category" href="#">${subCategory}</a>
                    </li>`;
            }).join('');



// const categories = $.getJSON("/json/categories.json",
//     function (data) {
//         const categoryList = Object.keys(data).map(category => {
//             //Create sub category list
//             const subCategories = data[category].map(subCategory => {
//                 return `
//                     <li class="nav-item">
//                         <a class="nav-link active btn-category" href="#">${subCategory}</a>
//                     </li>`;
//             }).join('');





