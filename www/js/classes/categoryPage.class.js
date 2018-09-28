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
            <div class="card-group pl-1 pb-2">

            <a href="${recipe.recipeId}">
                <div class="card">
                    <img class="card-img-top" src="/imgs/${recipe.imagePath}" alt="${recipe.tags.meal}">
                        <div class="card-body recipe-details">
                            <p class="lead">${recipe.name}</p>
                        </div>
                </div>
                </a>
            </div>
`);
        }) : $(".category-container").append(`
            <div class="w-100 d-flex flex-column justify-content-center align-items-center no-result-wrapper">
                <img src="/imgs/loupe.png" class="menu-icon" alt="menu icon">
                <h1>Inga resultat. Testa en annan kategori.</h1>
            </div>
        `);
    }

}