class Filter{
    constructor(livsmedelData, recipes){
        this.livsmedelData = livsmedelData;
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
        if(inputToFilter.length  < 3){
            return new Error("Write more than 3 char");
        }
        inputToFilter = inputToFilter.toLowerCase();

        let result = this.livsmedelData
        .filter(item => item.Namn.toLowerCase().includes(inputToFilter))
        .map(x => x.Nummer)
        .sort((a,b)=>{
            let posA = a.toLowerCase().indexOf(inputToFilter);
            let posB = b.toLowerCase().indexOf(inputToFilter);
            return posA < posB ? -1 : 1;
        });
        // console.log('ingredient filter');
        return result;
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
        // console.log('recipe filter');
        return result;
    }
}