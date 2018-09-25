class Recipe extends Base {
  constructor(filter, filterString){
    super();
    this.recipe = filter.filterRecipes(filterString)[0];
  }

  ingredientList(){
    let that = this;
    this.recipe.ingredients.map( ingredient => {
      console.log(ingredient);
      return $(".ingredient-control").append(`<li class="ingredient-layout">${ingredient.amount} ${ingredient.unit} ${ingredient.number}</li>`);
    });
    
    

  }

  instructionList(){
    let that = this;
    Object.values(this.recipe.steps).map( instruction => {
      return $(".recipe").append(`<li class="recipe-layout">${instruction}</li>`);
    });
  }


}