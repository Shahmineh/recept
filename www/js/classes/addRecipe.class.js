class AddRecipe extends Base {
  constructor(){
    super();
    this.addRecipe();
    this.ingredientCounter = 1;
    this.instructionCounter = 1;
  }

  addRecipe(){
    let that = this;
    $(document).on('click', "#add-ingredient-btn", function() {
        $( ".ingredients-outer" ).append(`
        <div class="ingredients d-flex">
          <i class="fas fa-times" id="remove-ingredient-btn"></i>
          <input type="text" class="form-control mr-2 ravara-input" id="ravara-input-${that.ingredientCounter++}" placeholder="Råvara">
          <input type="text" class="form-control mr-2" id="amount-input" placeholder="Mängd">
          <select class="select-button custom-select" id="amount-select" required>
            <option selected>Mängd:</option>
            <option value="1">styck</option>
            <option value="2">liter</option>
            <option value="3">deciliter</option>
            <option value="3">matsked</option>
            <option value="3">tesked</option>
            <option value="3">kryddmått</option>
          </select>
          <input type="text" class="form-control ml-2" id="gram-input" placeholder="Gram">
        </div>
          `);
      });   

      $(document).on('click',  "#add-howto-btn" , function() {
        appendHowTo();
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

    $(document).on('keyup', '.ravara-input', function() {
        let val = $(this).val();
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
        else {
          $(this).removeClass('is-valid');
      }
    });

    $(document).on('keyup', '.ravara-input', function(){
      let val = $(this).val();
      if(val.length > 0){
        $('#amount-input').addClass('is-invalid');
      }
      else{
        $('#amount-input').removeClass('is-invalid');
      }

    })

    $(document).on('keyup', '.amount-input', function() {
        let val = $(this).val();
      if(val.length > 0){
        $(this).removeClass('is-invalid').addClass('is-valid');
      }
        else {
          $(this).removeClass('is-valid');    
      }
    });


    //Remove div
    $(document).on('click', '#remove-ingredient-btn', function(){
      $(this).parent('div.ingredients').remove();
    })

    $(document).on('click', '#remove-howto-btn', function(){
      $(this).parent('div.how-to').remove();
    })



      //Submit
      $(document).on('click', '#submit-btn', function(){
      let recipeName = $('#recipe-name').val();
      let portion = $('#portions-select').val();
      let time = $('#time-input').val();
      let text = $('#instructions-text-1').val();

      console.log(recipeName);
    })
  }
}

