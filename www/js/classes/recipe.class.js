class Recipe extends Base {
  constructor(selectedRecipe, ingredients, recipes){
    super();
    this.filter = new Filter(ingredients, recipes);
    this.selectedRecipe = this.filter.findRecipeId(selectedRecipe);
    this.nutrition = new NutritionValues(ingredients, recipes);
    this.localPortion = this.selectedRecipe.portions;
    this.ratio = 1;
    
    this.eventHandlers();
    this.renderMainPicture();
  } 

  eventHandlers(){
    let that = this;
    $(document).on('click', "#recipe-remove", function() {
      that.localPortion > 1 ? that.localPortion-- : null;
      that.recalculateValues();
    });
    $(document).on('click', "#recipe-add", function() {
      that.localPortion++;
      that.recalculateValues();
    });
  }

  recalculateValues(){
    let that = this;
    that.ratio = that.localPortion/that.selectedRecipe.portions;
    $('main').empty();
    that.render('main');
    that.ingredientList();
    that.instructionList();
    that.nutritionValuesList();
  }

  renderMainPicture(){

    let imagePath;
    if(this.selectedRecipe.tags.main && this.selectedRecipe.tags.main[0] === "Kött"){
      this.imagePath = 'kott-main.jpg'
    }
    if(this.selectedRecipe.tags.main && this.selectedRecipe.tags.main[0] === "Fisk"){
      this.imagePath = 'fisk-main.jpeg'
    }
    if(this.selectedRecipe.tags.main && this.selectedRecipe.tags.main[0] === "Kyckling"){
      this.imagePath = 'kyckling-main.jpg'
    }
    if(this.selectedRecipe.tags.meal && this.selectedRecipe.tags.meal[0] === "Frukost"){
      this.imagePath = 'frukost-main.jpg'
    }
    if(this.selectedRecipe.tags.meal && this.selectedRecipe.tags.meal[0] === "Mellanmål"){
      this.imagePath = 'mellanmal-main.jpg'
    }
    if(this.selectedRecipe.tags.meal && this.selectedRecipe.tags.meal[0] === "Förrätt"){
      this.imagePath = 'forratt-main.jpg'
    }
    if(this.selectedRecipe.tags.meal && this.selectedRecipe.tags.meal[0] === "Huvudrätt"){
      this.imagePath = 'huvudratt-main.jpg'
    }
    if(this.selectedRecipe.tags.meal && this.selectedRecipe.tags.meal[0] === "Efterrätt"){
      this.imagePath = 'efterratt-main.jpg'
    }
    if(this.selectedRecipe.tags.special && this.selectedRecipe.tags.special[0] === "Vegetarisk/vegansk"){
      this.imagePath = 'veg-main.jpg'
    }
    if(this.selectedRecipe.tags.special && this.selectedRecipe.tags.special[0] === "Laktosfri"){
      this.imagePath = 'laktosfri-main.jpg'
    }
    if(this.selectedRecipe.tags.special && this.selectedRecipe.tags.special[0] === "Glutenfri"){
      this.imagePath = 'glutenfri-main.png'
    }
  }


  ingredientList(){
    let that = this;
    this.selectedRecipe.ingredients.map( ingredient => {
      return $(".ingredient-control").append(`<li class="ingredient-layout"><b>${
        ingredient.unit == "st" ||  ingredient.unit == "msk" || ingredient.unit == "tsk" || ingredient.unit == "krm" ? ((ingredient.amount*that.ratio).toFixed() == 0 ? 1 :(ingredient.amount*that.ratio).toFixed()) : ingredient.amount*that.ratio.toFixed(2)
      } ${ingredient.unit}</b> ${this.filter.getIngredientName(ingredient.number)}</li>`);
    });
  }

  instructionList(){
    let that = this;
    Object.values(this.selectedRecipe.steps).map( instruction => {
      return $(".recipe").append(`<li class="recipe-layout">${instruction}</li>`);
    });
  }

  nutritionValuesList(){
    let that = this;
    let nutritionValues = this.nutrition.getNutritionValues(this.selectedRecipe.name);
    Object.keys(nutritionValues).map( key => {
      return $(".nutrition-control").append(`<li class="ingredient-layout"><span>${key}: </span><b>${(nutritionValues[key].split('g')[0]*that.ratio).toFixed(1)}g</b></li>`);
    });
  }
  
}