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
        let searchRecipe = this.filter.filterRecipes(val);
        let searchIngredient = this.filter.filterIngredientsById(val).map(item=>{
            return this.filter.filterRecipes(item)
        }).filter(item=>item.length).flat();


        let test = searchRecipe.length ? searchRecipe : null 
            && searchIngredient.length ?  searchIngredient : null;

        console.log('searchIngredient', searchIngredient);
        console.log('searchRecipe', searchRecipe);

        let searchSplit = this.filter.filterRecipes(val).length  ? this.filter.filterRecipes(val) : this.filter.filterIngredientsById(val).map(item=>{
            return this.filter.filterRecipes(item)
        }).filter(item=>item.length).flat();

        let searchRefine = searchSplit.reduce((acc, curr)=>{
            return {
                ...acc,
                [curr.name]: curr
            }
        }, {});
        this.searchResult = Object.keys(searchRefine).map(item=>searchRefine[item]);
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
                return $('.search-autocomplete').append(`<button>${item.name}</button>`)
            }) : $('.search-autocomplete').empty();
        });
    }
}
