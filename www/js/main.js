const categories = $.getJSON("../categories.json",
    function (data) {
        const categoryList = Object.keys(data).map(category => {
            //Create sub category list
            const subCategories = data[category].map(subCategory => {
                return `
                    <li class="nav-item">
                        <a class="nav-link active btn-category" href="#">${subCategory}</a>
                    </li>`;
            }).join('');

            //Create category list
            const listItem = `
            <li class="nav-item">
                <a class="btn dropdown-toggle btn-category" data-toggle="collapse" href="#${category}" aria-expanded="false" aria-controls="${category}">${category}</a>
            </li>
            <div class="row mt-1">
              <div class="col">
                <div class="collapse multi-collapse" id="${category}">
                  <div class="card card-body border-0 sub-categories-card">
                    <ul class="nav flex-column sub-categories">
                        ${subCategories}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            `
            return listItem;
        });

        //Writes all the list
        $('.side-menu').html(categoryList)
    }

);

$( "#add-ingredients-btn" ).click(function() {
    $( ".ingredients-out" ).append(`
    <div class="ingredients">
        <input type="text" class="form-control mr-2" id="ravara-input" placeholder="Råvara">
        <input type="text" class="form-control" id="amount-input" placeholder="">
        <select class="select-button custom-select" id="amount-select" required>
            <option selected>Mängd:</option>
            <option value="1">styck</option>
            <option value="2">liter</option>
            <option value="3">deciliter</option>
            <option value="3">matsked</option>
            <option value="3">tesked</option>
            <option value="3">kryddmått</option>
        </select>
    </div>
              `);
  });   

  $( "#howto-btn" ).click(function() {
    $( ".how-to" ).append(`
        <div class="text-input">
        <textarea class="form-control-text" aria-label="With textarea"></textarea>
        </div>
      `);
  });   

$(document).on('keyup', '#recipe-name', function() {
   let val = $(this).val();
   if(val.length > 0){
     $(this).removeClass('is-invalid').addClass('is-valid');
   }
    else {
      $(this).addClass('is-invalid').removeClass('is-valid');    
   }
}); 

$(document).on('click', '#ravara-input', function() {
    $(this).addClass('is-invalid');
});

$(document).on('keyup', '#ravara-input', function() {
    let val = $(this).val();
   if(val.length > 0){
     $(this).removeClass('is-invalid').addClass('is-valid');
   }
    else {
      $(this).addClass('is-invalid').removeClass('is-valid');    
   }
});

$(document).on('keyup', '#ravara-input', function(){
    $('#gram-input').addClass('is-invalid');
})

$(document).on('keyup', '#gram-input', function() {
    let val = $(this).val();
   if(val.length > 0){
     $(this).removeClass('is-invalid').addClass('is-valid');
   }
    else {
      $(this).addClass('is-invalid').removeClass('is-valid');    
   }
});




