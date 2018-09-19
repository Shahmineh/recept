class AutoComplete{
    constructor(livsmedelData){
        this.livsmedelData = livsmedelData;
    }

    filterAndSort(str) {
        if(str.length  < 3){
            return new Error("Write more than 3 char");
        }
        str = str.toLowerCase();
        return this.livsmedelData
        .filter(item => item.Namn.toLowerCase().includes(str))
        .map(x => x.Namn)
        .sort((a,b)=>{
            let posA = a.toLowerCase().indexOf(str);
            let posB = b.toLowerCase().indexOf(str);
            return posA < posB ? -1 : 1;
        });
    }
}