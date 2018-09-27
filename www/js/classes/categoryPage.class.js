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
            <div class="card-group pl-1">
                <div class="card">
                    <img class="card-img-top" src="/imgs/${recipe.imagePath}" alt="${recipe.tags.meal}">
                        <div class="card-body">
                            <p class="lead">${recipe.name}</p>
                            <p>${recipe.description}</p>
                        </div>
                        <a href="/recept/${recipe.recipeId}" class="btn nav-btn category-btn" role="button" aria-pressed="true">Se Recept</a>
                </div>
            </div>
`);
        }) : $(".category-container").append(`
            <div class="w-100 d-flex flex-column justify-content-center align-items-center h-100">
                <img src="/imgs/loupe.png" class="menu-icon" alt="menu icon">
                <h1>Inga resultat. Testa en annan kategori.</h1>
            </div>
        `);
    }

}