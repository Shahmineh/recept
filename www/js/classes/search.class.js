class Search{
    constructor(recipes, ingredients){
        this.recipes = recipes;
        this.ingredients = ingredients;
        this.filter = new Filter(this.ingredients, this.recipes);
        this.eventHandler();
    }
    eventHandler(){
        let that = this;
        $(document).on('click', '#search-button', function(){
            let val = $('#search-input').val();
           // console.log(that.filterRecipes(val));
            //that.filterRecipes(val);
        });
        $(document).on('keydown', '#search-input', function(event){
            let val = $('#search-input').val();
            if(event.keyCode === 13){
                event.preventDefault();
                let searchResult = that.filter.filterRecipes(val).length ? that.filter.filterRecipes(val) : that.filter.filterIngredientsById(val).map(item=>{
                    return that.filter.filterRecipes(item)
                }).filter(item=>item.length).flat();

                console.log('search result',searchResult);

                $('#search-input').val('');
            }
        });
    }
}
