let livsmedelData;

function autoComplete(str) {
    if(str.length  < 3){
        return new Error("Write more than 3 char");
    }
    str = str.toLowerCase();
    return livsmedelData
    .filter(item => item.Namn.toLowerCase().includes(str))
    .map(x => x.Namn)
    .sort((a,b)=>{
        let posA = a.toLowerCase().indexOf(str);
        let posB = b.toLowerCase().indexOf(str);
        return posA < posB ? -1 : 1;
    });
}

function test(){
    //console.log(autoComplete("peppar"));
}

const getNutricionalValues = (recipe) => {
    $.getJSON("../json/recept.json",
        function(recipes){
            const selectedIngredients = recipes.find(selectedRecipe => selectedRecipe.name == recipe).ingredients.map(ingredient => ingredient.ingredientNumber);
            console.log(selectedIngredients);
            // selectedIngredients = recipes.find(el=> el.name === recipe)
            // .ingredients.map(ingredient=>{
            //     livsmedelData.find(el => el.Nummer == ingredient.ingredientNumber);
            //     //console.log(livsmedelData.find(el => el.Nummer == ingredient.ingredientNumber));
            // });

        }
    );
}



$.getJSON("../json/livsmedel.json",
    function(data){
        livsmedelData = data;
        test();
        getNutricionalValues("Omlett - Enkelt recept")
    }
);

