// Globals for livsmedelsdata and recipes
let livsmedelData;
let livsmedelDataIdHash = {};
let recipes;

// Read data to our globals from json files
$.getJSON("/json/livsmedel.json", (data) => {
        livsmedelData = data;
        createIdHashForLivsmedelData();
        $.getJSON('/json/recept.json', (data) => {
            recipes = data;
            test();
        })
    }
);

// Test som experimental functions we are working on
function test(){
  //console.log(autoComplete("peppar"));
  console.log(getNutricionalValues('Omlett - Enkelt recept'));
}

function createIdHashForLivsmedelData(){
    for(let livsmedel of livsmedelData){
        livsmedelDataIdHash[livsmedel.Nummer] =livsmedel;
    }
}


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

function getNutricionalValues(recipeName){
    const desiredNutritionNames = [
        'Kolhydrater',
        'Protein',
        'Salt',
        'Fett',
        'Summa mättade fettsyror',
        'Summa enkelomättade fettsyror',
        'Summa fleromättade fettsyror'
    ];
    return recipes.find(selectedRecipe => selectedRecipe.name == recipeName).
        ingredients.map(ingredient => {
            return livsmedelDataIdHash[ingredient.ingredientNumber].Naringsvarden.Naringsvarde
            .filter(x => desiredNutritionNames.includes(x.Namn));
        });
}





