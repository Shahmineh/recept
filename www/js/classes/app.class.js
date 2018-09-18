class App {
    constructor(){
        // Read data to our globals from json files
        this.livsmedelData;
        this.livsmedelDataIdHash = {};
        this.recipes;
        $.getJSON("/json/livsmedel.json", (data) => {
                this.livsmedelData = data;
                this.createIdHashForLivsmedelData();
                $.getJSON('/json/recept.json', (data) => {
                    this.recipes = data;
                    this.runTest();
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
        const test = new NutritionalValues(this.livsmedelDataIdHash, this.recipes).getNutricionalValues('Omlett - Enkelt recept');
        console.log(test);
        const auto = new AutoComplete(this.livsmedelData).filterAndSort('ägg');
        console.log(auto);
    }

    
}