class App {
    constructor(){
        // Read data to our globals from json files
        this.livsmedelData;
        this.livsmedelDataIdHash = {};
        this.recipes;
        this.start();
        
        $.getJSON("/json/livsmedel.json", (data) => {
                this.livsmedelData = data;
                //filter the entire data to a smaller version
               
                // const nutritionNames = [
                //     'Kolhydrater',
                //     'Protein',
                //     'Salt',
                //     'Fett',
                //     'Summa mättade fettsyror',
                //     'Summa enkelomättade fettsyror',
                //     'Summa fleromättade fettsyror'
                // ];
                // const hashMap = data.reduce((acc, curr) => {
                //     console.log(curr.Naringsvarden.Naringsvarde.filter(el => nutritionNames.includes(el.Namn)));
                //     // return {
                //     //     ...acc,
                //     //     [curr.Nummer]: {
                //     //         id: curr.Nummer,
                //     //         facts: curr.Naringsvarden.Naringsvarde
                //     //             .filter()
                //     //             .map()
                //     //     },
                //     // }
                // }, {});
                // console.log(hashMap);

                this.createIdHashForLivsmedelData();
                $.getJSON('/json/recipe.json', (data) => {
                    this.recipes = data;
                    this.runTest();
                    let addRecipe = new AddRecipe(this.recipes);    
                })
            }
        );
        
    }

    // re-writes livesmedeldata for easier filtering
    createIdHashForLivsmedelData(){
        for(let livsmedel of this.livsmedelData){
            this.livsmedelDataIdHash[livsmedel.Nummer] = livsmedel;
        }
    }
    
    runTest(){

        const test = new NutritionValues(this.livsmedelDataIdHash, this.recipes);
        // console.log(test.getNutritionValues('Omlett - Enkelt recept'));
        // console.log(test.getNutritionValues('Pam'));
        // test.getNutritionValues('Pamlet');
        // console.log(test.getNutritionValues('Omlett - Enkelt recept'));
    }

    start(){
        let navbar = new Navbar();
        // let recipe = new Recipe();
        $('header').empty();
        navbar.render('header');
        // recipe.render('header');
        //addRecipe.render('main');
    }

    
}