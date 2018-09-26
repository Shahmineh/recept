class Filter{

    constructor(ingredients, recipes){
        this.ingredients = ingredients;
        this.recipes = recipes;
        this.eventHandler();
    }

    eventHandler(){
        let that = this;
        $(document).on('click', '#search-button', function(){
            let val = $('#search-input').val();

        });
    }

    filterIngredients(inputToFilter) {
        inputToFilter = inputToFilter.toLowerCase();
        let result = Object.values(this.ingredients)
        .filter(item => item.Namn.toLowerCase().includes(inputToFilter))
        .sort((a,b)=>{
            let posA = a.Namn.toLowerCase().indexOf(inputToFilter);
            let posB = b.Namn.toLowerCase().indexOf(inputToFilter);
            return posA < posB ? -1 : 1;
        });
        return result;
    }

    filterRecipesByName(inputToFilter) {
        inputToFilter = inputToFilter.toLowerCase();
        let result = Object.values(this.recipes)
        .filter(item => item.name.toLowerCase().includes(inputToFilter)).sort((a,b)=>{
            let posA = a.name.toLowerCase().indexOf(inputToFilter);
            let posB = b.name.toLowerCase().indexOf(inputToFilter);
            return posA < posB ? -1 : 1;
        });
        return result;
    }

    findRecipe(inputToFilter){
        inputToFilter = inputToFilter.toLowerCase();
        let result = Object.values(this.recipes).find(recipe => recipe.name.toLowerCase() === inputToFilter);
        return result
    }

    filterRecipesByIngredients(inputToFilter){
        inputToFilter = inputToFilter.toLowerCase();
        let ingredientsFromInput = this.filterIngredients(inputToFilter).map(ing => ing.Nummer);
        let result = Object.values(this.recipes).reduce((acc, curr)=>{
            let recipeIngredients = curr.ingredients.map(ingredient=>ingredient.number);
            return [
                ...acc,
                ingredientsFromInput.some(item=> recipeIngredients.indexOf(item) >= 0) ? curr : null
            ];
        },[]).filter(item=>item)
        return result        
    }

    filterRecipesByTags(inputToFilter){
        inputToFilter = inputToFilter.toLowerCase();
        let result = Object.values(this.recipes).reduce((acc, curr)=>{
            let recipeTags = Object.values(curr.tags).flat().map(item=>item.toLowerCase());
            return [
                ...acc,
                recipeTags.filter(item=>item.includes(inputToFilter)).length ? curr : null
            ];
        },[]).filter(item=>item)
        return result        
    }

    getIngredientName(inputToFilter){
        inputToFilter = inputToFilter.toLowerCase();
        return Object.values(this.ingredients).find(item => item.Nummer === inputToFilter).Namn;
    }

}