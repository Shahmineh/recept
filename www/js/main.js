const app = new App();
app.navigation();
//Call changePage when click back and forward
window.addEventListener('popstate',app.navigation);




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

//             //Create category list
//             const listItem = `
//             <li class="nav-item">
//                 <a class="btn dropdown-toggle btn-category" data-toggle="collapse" href="#${category}" aria-expanded="false" aria-controls="${category}">${category}</a>
//             </li>
//             <div class="row mt-1">
//               <div class="col">
//                 <div class="collapse multi-collapse" id="${category}">
//                   <div class="card card-body border-0 sub-categories-card">
//                     <ul class="nav flex-column sub-categories">
//                         ${subCategories}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             `
//             return listItem;
//         });

//         //Writes all the list
//         $('.side-menu').html(categoryList)
//     }

// );

// $( "#add-ingredient-btn" ).click(function() {
//     $( ".ingredients-out" ).append(`
//     <div class="ingredients d-flex">
//       <i class="fas fa-times" id="remove-ingredient-btn"></i>
//       <input type="text" class="form-control mr-2" id="ravara-input" placeholder="Råvara">
//       <input type="text" class="form-control mr-2" id="amount-input" placeholder="Gram">
//       <input disabled type="text" class="form-control mr-2" id="amount-disabled" placeholder="Mängd">
//       <select class="select-button custom-select" id="amount-select" required>
//         <option selected>Mängd:</option>
//         <option value="1">styck</option>
//         <option value="2">liter</option>
//         <option value="3">deciliter</option>
//         <option value="3">matsked</option>
//         <option value="3">tesked</option>
//         <option value="3">kryddmått</option>
//       </select>
//     </div>
//       `);
//   });   

//   $( "#add-howto-btn" ).click(function() {
//     $( ".how" ).append(`
//       <div class="how-to d-flex">
//         <i class="fas fa-times" id="remove-howto-btn"></i> 
//         <p class="textnumber mr-2"></p>
//         <div class="text-input">
//           <textarea class="form-control-text" aria-label="With textarea"></textarea>
//         </div>
//       </div>
//     `);
//   });   

// $(document).on('keyup', '#recipe-name', function() {
//    let val = $(this).val();
//    if(val.length > 0){
//      $(this).removeClass('is-invalid').addClass('is-valid');
//    }
//     else {
//       $(this).addClass('is-invalid').removeClass('is-valid');    
//    }
// }); 

// $(document).on('keyup', '#ravara-input', function() {
//     let val = $(this).val();
//    if(val.length > 0){
//      $(this).removeClass('is-invalid').addClass('is-valid');
//    }
//     else {
//       $(this).removeClass('is-valid');
//    }
// });

// $(document).on('keyup', '#ravara-input', function(){
//   let val = $(this).val();
//   if(val.length > 0){
//     $('#amount-input').addClass('is-invalid');
//   }
//   else{
//     $('#amount-input').removeClass('is-invalid');
//   }

// })

// $(document).on('keyup', '#amount-input', function() {
//     let val = $(this).val();
//    if(val.length > 0){
//      $(this).removeClass('is-invalid').addClass('is-valid');
//    }
//     else {
//       $(this).removeClass('is-valid');    
//    }
// });


// //Remove div
// $(document).on('click', '#remove-ingredient-btn', function(){
//   $(this).parent('div.ingredients').remove();
// })

// $(document).on('click', '#remove-howto-btn', function(){
//   $(this).parent('div.how-to').remove();
// })



