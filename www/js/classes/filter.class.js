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

    filterIngredientsByName(inputToFilter) {
        // if(inputToFilter.length  < 3){
        //     return new Error("Write more than 3 char");
        // }
        inputToFilter = inputToFilter.toLowerCase();
        let result = Object.values(this.ingredients)
        .filter(item => item.Namn.toLowerCase().includes(inputToFilter))
        .map(x => x.Namn)
        return this.filterSort(result, inputToFilter);
    }

    filterIngredientsById(inputToFilter) {
        // if(inputToFilter.length  < 3){
        //     return new Error("Write more than 3 char");
        // }
        inputToFilter = inputToFilter.toLowerCase();
        let result = Object.values(this.ingredients)
        .filter(item => item.Namn.toLowerCase().includes(inputToFilter))
        .map(x => x.Nummer)
        return this.filterSort(result, inputToFilter);
    }

    getIngredientName(inputToFilter){
        inputToFilter = inputToFilter.toLowerCase();
        console.log(inputToFilter)
        /* let result = Object.values(this.ingredients)
        .filter(item => item.Namn.toLowerCase().find(input => {
            input.Namn === inputToFilter;
        }))

        return result;     */
    }

    filterRecipes(inputToFilter) {
        // if(inputToFilter.length  < 3){
        //     return new Error("Write more than 3 char");
        // }
        inputToFilter = inputToFilter.toLowerCase();
        let a = [];
        let result = this.recipes
        .filter(item => {
            return item.name.toLowerCase().includes(inputToFilter) || item.description.toLowerCase().includes(inputToFilter) || item.ingredients.find(item=>item.number==inputToFilter);
        })
        .map(hit => hit)
        .sort((a,b)=>{
            let posA = a.name.toLowerCase().indexOf(inputToFilter);
            let posB = b.name.toLowerCase().indexOf(inputToFilter);
            return posA < posB ? -1 : 1;
        });
        return result;
    }

    filterSort(dataToSort, inputToFilter){
        return dataToSort.sort((a,b)=>{
            let posA = a.toLowerCase().indexOf(inputToFilter);
            let posB = b.toLowerCase().indexOf(inputToFilter);
            return posA < posB ? -1 : 1;
        });
    }
}