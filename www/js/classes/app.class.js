class App extends Base {
    constructor() {
        super();
        // Read data to our globals from json files
        this.loaderRender();
        this.livsmedelData;
        this.ingredientsIdHash = {};
        this.recipes;
        this.renderNav();
        // this.firstLoadStartPage()
        this.eventHandlers();
        $.getJSON("/json/livsmedel.json", (data) => {
            this.livsmedelData = data;
            this.createIdHashForLivsmedelData();
            $.getJSON('/json/recipe.json', (data) => {
                this.recipes = data;
                this.search = new Search(this.recipes, this.livsmedelData);
                this.filter = new Filter(this.ingredientsIdHash, this.recipes);
                this.navigation();
            })
        }
        );
    }

    // re-writes livesmedeldata for easier filtering
    createIdHashForLivsmedelData() {
        for (let livsmedel of this.livsmedelData) {
            this.ingredientsIdHash[livsmedel.Nummer] = livsmedel;
        }
    }
    
    firstLoadStartPage() {
        let startsidan = new Startsidan(this);
        $('main').empty();
        startsidan.render('main');
    }

    loaderRender(){
        !this.recipes ? $('main').html(`
            <div class="loader">
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        `) : null;

    }

    navigation() {
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
        if (url.startsWith('/recept')) {
            let [, , theRecipeId] = url.split('/');
            let recipe = new Recipe(theRecipeId, this.ingredientsIdHash, this.recipes);
            $('main').empty();
            recipe.render('main');
            recipe.ingredientList();
            recipe.instructionList();
            recipe.nutritionValuesList();
        }
        if (url == '/huvudkategori/kott') {
            let categoryPage = new CategoryPage('kött', this.ingredientsIdHash, this.recipes);
            $('main').empty();
            categoryPage.render('main');
            categoryPage.renderRecipes();
        }
        if (url == '/huvudkategori/fisk') {
            let categoryPage = new CategoryPage('fisk', this.ingredientsIdHash, this.recipes);
            $('main').empty();
            categoryPage.render('main');
            categoryPage.renderRecipes();
        }
        if (url == '/huvudkategori/kyckling') {
            let categoryPage = new CategoryPage('kyckling', this.ingredientsIdHash, this.recipes);
            $('main').empty();
            categoryPage.render('main');
            categoryPage.renderRecipes();
        }
        if (url == '/maltid/frukost') {
            let categoryPage = new CategoryPage('frukost', this.ingredientsIdHash, this.recipes);
            $('main').empty();
            categoryPage.render('main');
            categoryPage.renderRecipes();
        }
        if (url == '/maltid/mellamal') {
            let categoryPage = new CategoryPage('mellanmål', this.ingredientsIdHash, this.recipes);
            $('main').empty();
            categoryPage.render('main');
            categoryPage.renderRecipes();
        }
        if (url == '/maltid/forrrat') {
            let categoryPage = new CategoryPage('förrätt', this.ingredientsIdHash, this.recipes);
            $('main').empty();
            categoryPage.render('main');
            categoryPage.renderRecipes();
        }
        if (url == '/maltid/huvudratt') {
            let categoryPage = new CategoryPage('huvudrätt', this.ingredientsIdHash, this.recipes);
            $('main').empty();
            categoryPage.render('main');
            categoryPage.renderRecipes();
        }
        if (url == '/maltid/efterratt') {
            let categoryPage = new CategoryPage('efterrätt', this.ingredientsIdHash, this.recipes);
            $('main').empty();
            categoryPage.render('main');
            categoryPage.renderRecipes();
        }
        if (url == '/specialkost/veg') {
            let categoryPage = new CategoryPage('veg', this.ingredientsIdHash, this.recipes);
            $('main').empty();
            categoryPage.render('main');
            categoryPage.renderRecipes();
        }
        if (url == '/specialkost/laktosfri') {
            let categoryPage = new CategoryPage('laktosfri', this.ingredientsIdHash, this.recipes);
            $('main').empty();
            categoryPage.render('main');
            categoryPage.renderRecipes();
        }
        if (url == '/specialkost/glutenfri') {
            let categoryPage = new CategoryPage('glutenfri', this.ingredientsIdHash, this.recipes);
            $('main').empty();
            categoryPage.render('main');
            categoryPage.renderRecipes();
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



    eventHandlers() {
        let that = this;
        //Navigation
        $(document).on('click', 'a.nav-btn', function (e) {
            //Create a push state preventDefault
            let href = $(this).attr('href');
            history.pushState(null, null, href);
            //Call the change page function
            that.navigation();
            //Stop the browers from starting a page reload
            e.preventDefault();
        });

        $(document).on('click', 'main', function (e) {
          if (e.target.getAttribute('type') != 'radio') {
            let s = $('[type="radio"]:checked')
            if (s.length) {
              s.prop('checked', false);
              e.stopImmediatePropagation();
            }
          }
        });
    }

    renderNav() {
        let navbar = new Navbar();
        $('header').empty();
        navbar.render('header');
        window.addEventListener('popstate', this.navigation.bind(this));
    }

}