class CategoryPage extends Base {
  constructor(selectedTag, ingredients, recipes){
    super();
    console.log('selectedTag', selectedTag);
    this.filter = new Filter(ingredients, recipes);
    console.log('ingredients',ingredients);
    this.filterResult = this.filter.filterRecipesByTags(selectedTag);
    console.log('recipes', recipes);
    // this.eventHandlers();
  } 

  renderRecipes(selectedTag){
    let that = this;
    this.filterResult.length ? this.filterResult.map( recipe => {
        return $(".category-container").append(`
            <div class="col-3 p-0 m-0">
                <div class="menu">
                    <img class="responsiveImage img-thumbnail menu-img" src="/imgs/${recipe.imagePath}" alt="breakfast">
                    <div class="breakfast-text">
                        <h2 class="little-box-text">${recipe.name}</h2>
                        <h4 class="col-12">${recipe.description}</h4>
                    <div>
                        <a href="/recept" type="button" class="btn btn-light mt-3 nav-btn">Se Recept</a>
                    </div>
                    </div>
                </div>
            </div>
        `);
    }): $(".category-container").append(`<h1>Sorry no recipe found</h1>`);
  }

  

}