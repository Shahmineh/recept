class Recipe extends Base {
  constructor(selectedRecipe, ingredients, recipes){
    super();
    this.filter = new Filter(ingredients, recipes);
    this.selectedRecipe = this.filter.findRecipe(selectedRecipe);
    this.nutrition = new NutritionValues(ingredients, recipes);
  }

  ingredientList(){
    this.selectedRecipe.ingredients.map( ingredient => {
      return $(".ingredient-control").append(`<li class="ingredient-layout">${ingredient.amount} ${ingredient.unit} ${this.filter.getIngredientName(ingredient.number)}</li>`);
    });
  }

  instructionList(){
    Object.values(this.selectedRecipe.steps).map( instruction => {
      return $(".recipe").append(`<li class="recipe-layout">${instruction}</li>`);
    });
  }

  nutritionValuesList(){
    let nutritionValues = this.nutrition.getNutritionValues(this.selectedRecipe.name);
    Object.keys(nutritionValues).map( key => {
      return $(".nutrition-control").append(`<li class="ingredient-layout"><span>${key}: </span><span>${nutritionValues[key]}</span></li>`);
    });
  }
  
}