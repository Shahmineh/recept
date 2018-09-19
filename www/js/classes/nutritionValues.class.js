class NutritionValues {
    constructor(livsmedelDataIdHash, recipes){
        this.livsmedelDataIdHash = livsmedelDataIdHash;
        this.recipes = recipes;
    }

    getNutritionValues(recipeName){
        const desiredNutritionNames = [
            'Kolhydrater',
            'Protein',
            'Salt',
            'Fett',
            'Summa mättade fettsyror',
            'Summa enkelomättade fettsyror',
            'Summa fleromättade fettsyror'
        ];

        const selectedRecipe = this.recipes.find(recipe => recipe.name === recipeName);

        const nutritionValues = selectedRecipe.
        ingredients.map(ingredient => {
            return this.livsmedelDataIdHash[ingredient.number].Naringsvarden.Naringsvarde
            .filter(el => desiredNutritionNames.includes(el.Namn))
            .reduce((acc, el) => {
                const categoryName = el.Namn;
                const categoryQuantity = parseFloat(el.Varde.replace(',','.'))*ingredient.weight/100;
                return {
                    ...acc, 
                    [categoryName]: categoryQuantity
                }
            }, {});
        });
        return this.calculateNutritionValues(nutritionValues, desiredNutritionNames, selectedRecipe);
    }

    calculateNutritionValues(nutritionValues, nutritionNames, selectedRecipe){
        // console.log(nutritionNames);
        // console.log(nutritionValues);
        // console.log(selectedRecipe.portions);
        const result = nutritionNames.reduce((acc, nutritionCategory) =>{
            let sum = nutritionValues.reduce((acc, elSum) =>{
                return acc + elSum[nutritionCategory]
            },0);
            return {
                ...acc,
                [nutritionCategory]: sum.toFixed(2)*selectedRecipe.portions + 'g'
            }
        },{})
        return result;
    }
}