import recipes from "../../data/recipes.js"
export default class recipeSearch {
    constructor() {
        this.recipes = recipes;
        //sconsole.log(this.recipes);

    }

    /*fonctions de recherche*/
    /**
     * 
     * @param {un ou plusieurs mots} keyWords 
     */
    searchInName(keyWords, tabRecipe) {
        let keyWordsArray = keyWords.split(' ');
        let recipeResult = [];
        for (let i = 0; i < keyWordsArray.length; i++) {
            if (keyWordsArray[i].length >= 3) {
                for (let j = 0; j < tabRecipe.length; j++) {
                    if (tabRecipe[j].name.toLowerCase().includes(keyWordsArray[i].toLowerCase())) {
                        recipeResult.push(tabRecipe[j]);
                    }
                }
            }
            else{

                //insere une errerur sous le champs
                /*let searchField = document.getElementById('search-input');
                searchField.style.border="solid red";
                document.querySelector(".search-error").innerText="vous devez saisir plus de 3 caratères"*/
                
                        }
        }
        return recipeResult;

    }

    searchInDescription(keyWords, tabRecipe) {
        tabRecipe = this.recipes;
        let keyWordsArray = keyWords.split(' ');
        let recipeResult = [];
        for (let i = 0; i < keyWordsArray.length; i++) {

            if (keyWordsArray[i].length >= 3) {

                for (let j = 0; j < tabRecipe.length; j++) {
                    if (tabRecipe[j].description.toLowerCase().includes(keyWordsArray[i].toLowerCase())) {
                        recipeResult.push(tabRecipe[j]);
                    }
                }
            }
        }

        return recipeResult;

    }

    searchInIngredients(keyWords, tabRecipe) {
        tabRecipe = this.recipes;
        let keyWordsArray = keyWords.split(' ');
        let recipeResult = [];
        for (let i = 0; i < keyWordsArray.length; i++) {

            if (keyWordsArray[i].length >= 3) {

                for (let j = 0; j < tabRecipe.length; j++) {
                    for (let k = 0; k < tabRecipe[j].ingredients.length; k++) {
                        if (tabRecipe[j].ingredients[k].ingredient.toLowerCase().includes(keyWordsArray[i].toLowerCase())) {
                            recipeResult.push(tabRecipe[j]);
                        }
                    }
                }
            }
        }
        //console.log("resultat par ingredient");
        //console.log(recipeResult);
        return recipeResult;

    }

    getListOfIngredients(tabRecipe) {
        let recipeResult = [];
        for (let i = 0; i < tabRecipe.length; i++) {
            for (let j = 0; j < tabRecipe[i].ingredients.length; j++) {
                recipeResult.push(tabRecipe[i].ingredients[j].ingredient);
            }
        }

        for (let i = 0; i < recipeResult.length; i++) {
            for (let j = i + 1; j < recipeResult.length; j++) {
                if (recipeResult[i] == recipeResult[j]) {
                    recipeResult.splice(j, 1);
                }
            }
        }


        return recipeResult;
    }

    getListOfUstensils(tabRecipe) {
        let recipeResult = [];
        for (let i = 0; i < tabRecipe.length; i++) {
            for (let j = 0; j < tabRecipe[i].ustensils.length; j++) {
                recipeResult.push(tabRecipe[i].ustensils[j]);
            }
        }

        for (let i = 0; i < recipeResult.length; i++) {
            for (let j = i + 1; j < recipeResult.length; j++) {
                if (recipeResult[i] == recipeResult[j]) {
                    recipeResult.splice(j, 1);
                }
            }
        }


        return recipeResult;
    }
    getListOfAppliance(tabRecipe) {
        let recipeResult = [];
        for (let i = 0; i < tabRecipe.length; i++) {
            recipeResult.push(tabRecipe[i].appliance);
        }

        for (let i = 0; i < recipeResult.length; i++) {
            for (let j = i + 1; j < recipeResult.length; j++) {
                if (recipeResult[i] == recipeResult[j]) {
                    recipeResult.splice(j, 1);
                }
            }
        }


        return recipeResult;
    }
    // A revérifier si on ne loupe des éléments 
    concatener(tab1, tab2) {
        let resultat = [];
        let temptab = tab1;
        for (let i = 0; i < tab1.length; i++) {
            resultat.push(tab1[i]);
        }
        for (let i = 0; i < tab2.length; i++) {
            let testvar = false;
            resultat.push(tab2[i]);
        }



        for (let i = 0; i < resultat.length; i++) {
            for (let j = i + 1; j < resultat.length; j++) {
                if (resultat[i].id == resultat[j].id) {
                    resultat.splice(j, 1);
                }
            }
        }


        return resultat;


    }
}
    /*
concatener(tab1, tab2) {
let resultat = [];
let temptab = tab1;
 
let testvar = false;
for (let j = 0; j < temptab.length; j++) {
    if (tab1[i].id == temptab[j].id) {
        testvar = true;
    }
}
if(!testvar){
    resultat.push(tab1[i]);
}
 
}           

for (let i = 0; i < tab2.length; i++) {
let testvar = false;
for (let j = 0; j < tab1.length; j++) {
    if (tab2[i].id == tab1[j].id) {
        testvar = true;
    }
}
if(!testvar){
    resultat.push(tab2[i]);
}
}
return resultat;

}
*/
