class App extends Base{
    constructor(){
        super();
        // Read data to our globals from json files
        this.livsmedelData;
        this.livsmedelDataIdHash = {};
        this.recipes;
        this.start();
        this.clickEvents();
        $.getJSON("/json/livsmedel.json", (data) => {
                this.livsmedelData = data;
                this.createIdHashForLivsmedelData();
                $.getJSON('/json/recipe.json', (data) => {
                    this.recipes = data;
                    this.runTest();
                    this.addRecipe = new AddRecipe(this.recipes, this.livsmedelDataIdHash);
                    this.search = new Search(this.recipes, this.livsmedelData);
                    this.filter = new Filter(this.livsmedelData, this.recipes);
                    this.navigation();
                })
            }
        );
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
            let recipe = new Recipe(this.filter, 'Korv Stroganoff');
            $('main').empty();
            recipe.render('main');
            recipe.ingredientList();
            recipe.instructionList();
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
            $('main').empty();
            this.addRecipe.reset();
            this.addRecipe.render('main');
            this.addRecipe.addIngredient(); 
            this.addRecipe.addInstruction(); 
        }
    }

    clickEvents(){
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
        $('header').empty();
        navbar.render('header');
    }

    
}