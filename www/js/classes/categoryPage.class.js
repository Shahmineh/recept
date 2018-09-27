class CategoryPage extends Base {
    constructor(selectedTag, ingredients, recipes) {
        super();
        this.filter = new Filter(ingredients, recipes);
        this.filterResult = this.filter.filterRecipesByTags(selectedTag);
        // this.eventHandlers();
    }

    renderRecipes(selectedTag) {
        let that = this;
        this.filterResult.length ? this.filterResult.map(recipe => {
            return $(".category-container").append(`
            <div class="col-lg-3">
                <div class="card">
                    <img class="card-img-top" src="/imgs/${recipe.imagePath}" alt="Card image cap">
                        <div class="card-body">
                            <p class="lead">${recipe.name}</p>
                            <p>${recipe.description}</p>
                        </div>
                        <a href="/recept" class="btn btn-primary" role="button" aria-pressed="true">Se Recept</a>
                </div>
            </div>
`);
        }) : $(".category-container").append(`<h1>Sorry no recipe found</h1>`);
    }

}