class Recipe extends Base {
  constructor(filter, filterString, nutritionList){
    super();
    this.recipe = filter.filterRecipes(filterString)[0];
    this.nutritionValue = nutritionList.getNutritionValues(this.recipe.name);
    this.filter = filter;
  }

  ingredientList(){
    let that = this;
    this.recipe.ingredients.map( ingredient => {
      return $(".ingredient-control").append(`<li class="ingredient-layout">${ingredient.amount} ${ingredient.unit} ${this.filter.getIngredientName(ingredient.number)}</li>`);
    });
  }

  instructionList(){
    let that = this;
    Object.values(this.recipe.steps).map( instruction => {
      return $(".recipe").append(`<li class="recipe-layout">${instruction}</li>`);
    });
  }

  nutritionValues(){
    let that = this;
    Object.keys(this.nutritionValue).map( key => {
      return $(".nutrition-control").append(`<li class="ingredient-layout"><span>${key}: </span><span>${that.nutritionValue[key]}</span></li>`);
    });
  }


}