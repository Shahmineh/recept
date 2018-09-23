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
        $(document).on('keydown', '#search-input', function(event){
            let val = $('#search-input').val();
            val.length ? that.searchEngine(val) : null;
            //console.log(that.searchResult);
            if(event.keyCode === 13){
                event.preventDefault();
                $('#search-input').val('');
                console.log('search result', that.searchResult);
            }
        });

        $(document).on('click', '#search-button', function(){
            let val = $('#search-input').val();
           // console.log(that.filterRecipes(val));
            //that.filterRecipes(val);
        });
        
    }

    autoCompleteSearch(){
        const that = this;
        $(document).on('keydown', '#search-input', function(){
            $('.search-autocomplete').empty();
            that.searchResult ? that.searchResult.map(item=>{
                console.log('woop');
                return $('.search-autocomplete').append(`<button>${item.name}</button>`)
            }) : null;
            
            console.log(that.searchResult);
        });
    }
}
