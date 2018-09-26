class Search{

    constructor(recipes, ingredients){
        this.recipes = recipes;
        this.ingredients = ingredients;
        this.filter = new Filter(this.ingredients, this.recipes);
        this.searchResult;
        this.eventHandler();
        this.autoCompleteSearch();
    }

    searchEngine(val){
        let searchRecipe = this.filter.filterRecipesByName(val);
        let searchIngredient = this.filter.filterRecipesByIngredients(val);
        let searchTag = this.filter.filterRecipesByTags(val);
        
        let searchResult = [];
        searchResult = searchResult.concat(searchRecipe, searchIngredient, searchTag);
        this.searchResult = [... new Set(searchResult)];
        console.log(this.searchResult);
        return this.searchResult;
    }

    eventHandler(){
        const that = this;
        $(document).on('keyup', '#search-input', function(event){
            let val = $('#search-input').val();
            val.length ? that.searchEngine(val) : null;
            //console.log(that.searchResult);
            
        });
        $(document).on('keydown', '#search-input', function(event){
            if(event.keyCode === 13){
                event.preventDefault();
                $('#search-input').val('');
                console.log('search result', that.searchResult);
            }
        })
        $(document).on('click', '#search-button', function(){
            let val = $('#search-input').val();
        });
        
    }

    autoCompleteSearch(){
        const that = this;
        $(document).on('keyup', '#search-input', function(){
            $('.search-autocomplete').empty();
            that.searchResult &&  $('#search-input').val().length ? that.searchResult.map(item=>{
                return $('.search-autocomplete').append(`<button class="d-block">${item.name}</button>`)
            }) : $('.search-autocomplete').empty();
        });
    }
}
