class CategoryPage extends Base {
  constructor(selectedTag, ingredients, recipes){
    super();
    this.filter = new Filter(ingredients, recipes);
    this.filterResult = this.filter.filterRecipesByTags(selectedTag);
    console.log(this.filterResult);
    // this.eventHandlers();
  } 

  renderRecipes(){
    let that = this;
    this.filterResult.length ? this.filterResult.map( recipe => {
        return $(".category-container").append(`
            <div class="col">
                <div class="menu">
                    <img class="menu-img" src="/imgs/${recipe.imagePath}" alt="breakfast">
                    <div class="breakfast-text">
                        <h2 class="little-box-text">${recipe.name}</h2>
                        <h4>${recipe.description}</h4>
                    <div>
                        <a href="/recept" type="button" class="btn btn-light mt-3 nav-btn">Se Recept</a>
                    </div>
                    </div>
                </div>
            </div>
        `);
    }): $(".category-container").append(`
        <div>
            <h1>Sorry no recipes found</h1>
        </div>
    `);;
  }

  

}