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
        return this.recipes.find(selectedRecipe => selectedRecipe.name == recipeName).
            ingredients.map(ingredient => {
                return this.livsmedelDataIdHash[ingredient.number].Naringsvarden.Naringsvarde
                .filter(x => desiredNutritionNames.includes(x.Namn));
            });
    }

    // calculateNutricional
}