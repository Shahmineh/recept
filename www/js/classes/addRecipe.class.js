class AddRecipe extends Base {
  constructor(recipes, ingredients){
    super();
    this.ingredientCounter;
    this.instructionCounter;
    this.recipes = recipes;
    this.ingredients = ingredients;
    this.imagePath;
    this.tags = Object.values(this.ingredients).map(item=>item.Namn);
    this.filter = new Filter(this.ingredients, this.recipes);
    this.eventHandler();
    this.tagArrayMain, this.tagArraySpecial, this.tagArrayMeal = [];
  }

  reset(){
    this.ingredientCounter = 0;
    this.instructionCounter = 0;
  }

  addIngredient(){
    let that = this;
    $( ".ingredients-outer" ).append(`
      <div class="ingredients d-flex">
        <div class="d-inline-flex flex-wrap">
          <i class="fas fa-times" id="remove-ingredient-btn" aria-label="ta bort ingrediens"></i>
          <div class="flex-column">
            <label class="sr-only" for="ravara-input-${that.ingredientCounter}">Råvara</label>
            <input type="text" class="form-control ravara-input mr-2" id="ravara-input-${that.ingredientCounter}" autocomplete="off" placeholder="Råvara" aria-label="råvara" required>
            <div class="invalid-feedback">Fyll i här</div>
          </div>
          <div class="d-inline-flex respo-amount">
            <div class="flex-column">
              <label class="sr-only" for="amount-input-${that.ingredientCounter}">Mängd</label>
              <input type="number" step="any" class="form-control mr-2 amount-input" id="amount-input-${that.ingredientCounter}" placeholder="Mängd" aria-label="mängd" required>
              <div class="invalid-feedback">Fyll i här</div>
            </div>
            <div class="flex-column">
              <label class="sr-only" for="amount-select-${that.ingredientCounter}">Välj enhet</label>
              <select class="custom-select mr-2 amount-select" id="amount-select-${that.ingredientCounter}" required>
                <option selected value="">Enhet</option>
                <option value="st">styck</option>
                <option value="l">liter</option>
                <option value="dl">deciliter</option>
                <option value="ml">milliliter</option>
                <option value="msk">matsked</option>
                <option value="tsk">tesked</option>
                <option value="krm">kryddmått</option>
                <option value="kg">kilogram</option>
                <option value="hg">hektogram</option>
                <option value="g">gram</option>
              </select>
              <div class="invalid-feedback">Fyll i här</div>
            </div>
            <div class="flex-column">
              <label class="sr-only" for="gram-input-${that.ingredientCounter}">Gram</label>
              <input type="number" class="form-control gram-input" id="gram-input-${that.ingredientCounter}" placeholder="Gram" aria-label="Gram" required>
              <div class="invalid-feedback gram-input">Fyll i här</div>
            </div>
          </div>
        </div>
        <div class="ravara-list" id="data-ravara-input-${that.ingredientCounter}"></div>
      </div>
      
    `);
    
    // Object.values(that.ingredients).map(item=>{
    //   return $(`#data-ravara-input-${that.ingredientCounter}`).append(`<option value="${item.Namn}"></option>`);
    // });

    that.ingredientCounter++;
  }

  addInstruction(){
    let that = this;
    $( ".how" ).append(`
      <div class="how-to">
        <i class="fas fa-times" id="remove-howto-btn" aria-label="ta bort instruktion"></i> 
        <p class="textnumber mr-2">${that.instructionCounter +1}</p>
        <div class="text-input flex-column">
          <label class="sr-only" for="instructions-text-${that.instructionCounter}">Instruktioner</label>
          <textarea class="form-control form-control-text" aria-label="instruktions text" id="instructions-text-${that.instructionCounter}" required></textarea>
          <div class="invalid-feedback">Skriv instruktioner här.</div> 
        </div>
        
      </div>
    `);
    that.instructionCounter++;
  }

  formValidation(recipe) {
    let that = this;
    const forms = document.getElementsByClassName('needs-validation');
    let validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        if(form.checkValidity() === true){
          event.preventDefault();
          event.stopPropagation();
          JSON._save('recipe.json', [...Object.values(that.recipes), recipe]);
          $.getJSON('/json/recipe.json', (data) => {
              that.recipes = data;
          });
          $('.max-100').animate({ scrollTop: 0 }, "fast");
          that.reset();
          window.location.href = `/recept/${recipe.recipeId}`;
          new App();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }

  eventHandler(){
    let that = this;
    // let arr = [];
    //Add ingredient
    $(document).on('click', "#add-ingredient-btn", function() {
      that.addIngredient();
    });   
    //Remove ingredient
    $(document).on('click', '#remove-ingredient-btn', function(){
      $(this).parents('div.ingredients').remove();
      that.ingredientCounter--;
    });
    //add instruction
    $(document).on('click',  "#add-howto-btn" , function() {
      that.addInstruction();
    });   
    //Remove instruction
    $(document).on('click', '#remove-howto-btn', function(){
      $(this).parents('div.how-to').remove();
      that.instructionCounter--;
    });

    $(document).on('click', 'main', function(e) {
        let s = $('.ravara-list');
        if (!s.is(e.target) && s.has(e.target).length === 0){
          $(s).empty();
        }
    })
  
    //  ALL VALIDATIONS NEED A BIT OF IMPROVEMENT, SPECIALLY VALIDATING BY DATA TYPE
    //Validation name
    $(document).on('keyup', '.recipe-name', function() {
      let val = $(this).val();
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
        else {
          $(this).addClass('is-invalid').removeClass('is-valid');    
      }
    }); 
    //Validation name-description
    $(document).on('keyup', '.recipe-description', function() {
      let val = $(this).val();
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
        else {
          $(this).addClass('is-invalid').removeClass('is-valid');    
      }
    });

    

    $(document).ready( function() {
      $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
          label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
      });

      $('.btn-file :file').on('fileselect', function(event, label) {

          var input = $(this).parents('.input-group').find(':text'),
              log = label;

          if( input.length ) {
              input.val(log);
          } else {
              if( log ) alert(log);
          }

      });
      function readURL(input) {
          if (input.files && input.files[0]) {
              var reader = new FileReader();

              reader.onload = function (e) {
                  $('#img-upload').attr('src', e.target.result);
              }

              reader.readAsDataURL(input.files[0]);
          }
      }
      $("#imgInp").change(function(){
        readURL(this);
      }); 	
    });

    //Validation portions
    $(document).on('change', '.portions-select', function() {
      let val = $(this).val();
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
        else {
          $(this).addClass('is-invalid').removeClass('is-valid');    
      }
    }); 
    //Validation time
    $(document).on('keyup', '.time-input', function() {
      let val = $(this).val();
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
        else {
          $(this).addClass('is-invalid').removeClass('is-valid');    
      }
    }); 
    //Validation ingredient
    $(document).on('keyup', '.ravara-input', function(event) {
      let val = $(this).val();
      let inputHits = that.filter.filterIngredients(val);
      $(`#data-ravara-input-${that.ingredientCounter-1}`).empty();
      val.length > 2 ? inputHits.map((item,index)=>{
        return index < 10 ? $(`#data-ravara-input-${that.ingredientCounter-1}`).append(`
          <ul class="list-ul">
          <li class="button-data-ravara-input" id="button-data-ravara-input-${that.ingredientCounter-1}-${item.Nummer}" type="button" data-id="${item.Nummer}">
            ${item.Namn}
          </li>
          </ul>
        `) : null;
      }) : null;
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');

      }
      else {
        $(this).removeClass('is-valid').addClass('is-invalid');
      }
    });


    $(document).on('click', '.button-data-ravara-input', function(event){
      let name = $(this).text().trim();
      $(`#ravara-input-${that.ingredientCounter-1}`).val(name);
      $(`#data-ravara-input-${that.ingredientCounter-1}`).empty();
    });

    //Validation amount
    $(document).on('keyup', '.amount-input', function(){
      let val = $(this).val();
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
      else{
        $(this).removeClass('is-valid').addClass('is-invalid');
      }
    });
    //Validation unit
    $(document).on('change', '.amount-select', function() {
      let val = $(this).val();
      if(val !== 'null'){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
      else {
        $(this).removeClass('is-valid').addClass('is-invalid');        
      }
    });

    $(document).on('change', '.amount-select', function() {
      let val = $(this).val();
      let id = $(this).attr('id').split('amount-select-')[1]; console.log(id)
      if(val == 'g'){
          $(`#gram-input-${id}`).hide();
      }
      else{
        $(`#gram-input-${id}`).show();
      }
        }); 

    //Validation weight
    $(document).on('keyup', '.gram-input', function(){
      let val = $(this).val();
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
      else{
        $(this).removeClass('is-valid').addClass('is-invalid');
      }
    });
    //Validation instrcutions
    $(document).on('keyup', '.form-control-text', function(){
      let val = $(this).val();
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
      else{
        $(this).removeClass('is-valid').addClass('is-invalid');
      }
    });
    //Validation tags
    $(document).on("click",".form-check-input-main", function(){ 
      let arr = [];
      $(".form-check-input-main:checked").each(function(){
        arr.push($(this).val());
      });
      that.tagArrayMain = arr;
    });
    $(document).on("click",".form-check-input-special", function(){ 
      let arr = [];
      $(".form-check-input-special:checked").each(function(){
        arr.push($(this).val());
      });
      that.tagArraySpecial = arr;
    });
    $(document).on("click",".form-check-input-meal", function(){ 
      let arr = [];
      $(".form-check-input-meal:checked").each(function(){
        arr.push($(this).val());
      });
      that.tagArrayMeal = arr;
    });

    //Submit
    $(document).on('click', '#submit-btn', function(){
      let ingredients = Array(that.ingredientCounter)
        .fill({})
        .reduce((acc, curr, index)=>{
          return [
            ...acc,
            {
              number: that.filter.filterIngredients($(`#ravara-input-${index}`).val())[0].Nummer,
              amount: $(`#amount-input-${index}`).val(),
              unit: $(`#amount-select-${index}`).val(),
              weight: $(`#gram-input-${index}`).val(),
            }
          ]
        },[]);

      let steps = Array(that.instructionCounter)
      .fill({})
      .reduce((acc, curr, index)=>{
        return {
          ...acc,
          [index]: $(`#instructions-text-${index}`).val(),
        }
      },{});

      let imagePath = $('#imgInp').val().split("\\")[2];

      let recipe = {
        recipeId: (that.recipes.length + 1).toString(),
        name: $('#recipe-name').val(),
        time: $('#time-input').val(),
        portions: $('#portions-select').val(),
        description: $('#recipe-description').val(),
        ingredients: ingredients,
        steps: steps,
        imagePath: imagePath,
        tags: {
          main: that.tagArrayMain,
          special: that.tagArraySpecial,
          meal: that.tagArrayMeal
        }
      };
      that.tagArrayMain, that.tagArraySpecial, that.tagArrayMeal = [];
      that.formValidation(recipe);  
    }); 
  }
}

