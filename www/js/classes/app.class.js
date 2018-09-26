class App extends Base{
    constructor(){
        super();
        // Read data to our globals from json files
        this.livsmedelData;
        this.ingredientsIdHash = {};
        this.recipes;
        this.start();
        this.eventHandlers();
        $.getJSON("/json/livsmedel.json", (data) => {
                this.livsmedelData = data;
                this.createIdHashForLivsmedelData();
                $.getJSON('/json/recipe.json', (data) => {
                    this.recipes = data;
                    this.search = new Search(this.recipes, this.livsmedelData);
                    this.filter = new Filter(this.ingredientsIdHash, this.recipes);
                    // this.getNutritionValues = new NutritionValues(this.ingredientsIdHash, this.recipes);
                    this.navigation();
                    // console.log(this.filter.filterIngredients('korv'));
                    // console.log(this.filter.filterRecipesByName('Korv'));
                })
            }
        );
    }

    // re-writes livesmedeldata for easier filtering
     createIdHashForLivsmedelData(){
        for(let livsmedel of this.livsmedelData){
            this.ingredientsIdHash[livsmedel.Nummer] = livsmedel;
        }
    }

    start(){
        let navbar = new Navbar();
        $('header').empty();
        navbar.render('header');
    }

    navigation(){
        let navbar = new Navbar();
        $('header').empty();
        navbar.render('header');
        // get the current url
        let url = location.pathname;
        
        if (url == '/') {
            let startsidan = new Startsidan(this);
            $('main').empty();
            startsidan.render('main');
        }
        if (url == '/recept') {
            let recipe = new Recipe('Korv Stroganoff', this.ingredientsIdHash, this.recipes);
            $('main').empty();
            recipe.render('main');
            recipe.ingredientList();
            recipe.instructionList();
            recipe.nutritionValuesList();
        }
        if (url == '/huvudkategori') {
            $('main').empty();
            $('main').html(
                `<h1>${url}</h1>
                <h2>HTML/Render method here</h2>`
            );
        }
        if (url == '/maltid') {
            $('main').empty();
            $('main').html(
                `<h1>${url}</h1>
                <h2>HTML/Render method here</h2>`
            );
        }
        if (url == '/ingrediens') {
            $('main').empty();
            $('main').html(
                `<h1>${url}</h1>
                <h2>HTML/Render method here</h2>`
            );            
        }
        if (url == '/specialkost') {
            $('main').empty();
            $('main').html(
                `<h1>${url}</h1>
                <h2>HTML/Render method here</h2>`
            );            
        }
        if (url == '/varldens-mat') {
            $('main').empty();
            $('main').html(
                `<h1>${url}</h1>
                <h2>HTML/Render method here</h2>`
            );            
        }
        if (url == '/lagg-recept') {
            let addRecipe = new AddRecipe(this.recipes, this.ingredientsIdHash);
            $('main').empty();
            addRecipe.reset();
            addRecipe.render('main');
            addRecipe.addIngredient(); 
            addRecipe.addInstruction(); 
        }
    }

    eventHandlers(){
        let that = this;
        //Navigation
        $(document).on('click','a.nav-btn',function(e){
            //Create a push state preventDefault
            let href = $(this).attr('href');
            history.pushState(null, null, href);
            //Call the change page function
            that.navigation();
            //Stop the browers from starting a page reload
            e.preventDefault();
        });
    }    
}