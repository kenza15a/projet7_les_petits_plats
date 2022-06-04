import recipes from '../../data/recipes.js'
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

        //teste de performance
        console.log('temps d\'execution searchbyname basic')
        console.time('for');
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

        }
        console.timeEnd('for')
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
    // Vérifier qu'un élément existe déjà dans un tableau
    elementInTab(elt, tab) {
        let result = false;
        if (tab.length != 0) {
            for (let i = 0; i <= tab.length; i++) {
                if (tab[i] == elt) {
                    result = true;
                    break;
                }
            }
        }
        return result;

    }

    /*lister les filtres selon le mot clé rechrché*/
    getListOfIngredients(tabRecipe) {
        let recipeResult = [];
        for (let i = 0; i < tabRecipe.length; i++) {
            for (let j = 0; j < tabRecipe[i].ingredients.length; j++) {
                if (!this.elementInTab(tabRecipe[i].ingredients[j].ingredient.toLowerCase(), recipeResult)) {
                    recipeResult.push(tabRecipe[i].ingredients[j].ingredient);
                }
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
                // On vérifie que l'élément n'est pas dans le tableau et s'il ne l'aest pas on le push
                if (!this.elementInTab(tabRecipe[i].ustensils[j].toLowerCase(), recipeResult)) {
                    recipeResult.push(tabRecipe[i].ustensils[j].toLowerCase());
                }

            }
        }
        /*
                for (let i = 0; i < recipeResult.length; i++) {
                    for (let j = i + 1; j < recipeResult.length; j++) {
                        if (recipeResult[i] == recipeResult[j]) {
                            recipeResult.splice(j, 1);
                        }
                    }
                }
        */

        return recipeResult;
    }





    getListOfAppliance(tabRecipe) {
        let recipeResult = [];
        for (let i = 0; i < tabRecipe.length; i++) {
            // On vérifie que l'élément n'est pas dans le tableau et s'il ne l'aest pas on le push
            if (!this.elementInTab(tabRecipe[i].appliance, recipeResult)) {
                recipeResult.push(tabRecipe[i].appliance);
            }
        }
        /*
                for (let i = 0; i < recipeResult.length; i++) {
                    for (let j = i + 1; j < recipeResult.length; j++) {
                        if (recipeResult[i] == recipeResult[j]) {
                            recipeResult.splice(j, 1);
                        }
                    }
                }*/
        /* if (recipeResult[recipeResult.length - 2] == recipeResult[recipeResult.length - 1]) {
             recipeResult.splice(recipeResult.length - 1, 1);
         }*/
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

    /*filtrer  par tags*/
    /**
     * 
     * @param {Array  <recipies>} recipieTab 
     * @param {String} applianceTag 
     */
    searchByAppliance(recipieTab, applianceTag) {
        let filteredTab = [];
        for (let i = 0; i < recipieTab.length; i++) {
            if (recipieTab[i].appliance.toLowerCase() == applianceTag.toLowerCase()) {
                filteredTab.push(recipieTab[i]);
            }

        }
        return filteredTab;


    }
    searchByUstensils(recipieTab, ustensilTag) {
        let filteredTab = [];
        for (let i = 0; i < recipieTab.length; i++) {
            for (let j = 0; j < recipieTab[i].ustensils.length; j++) {
                if (recipieTab[i].ustensils[j].toLowerCase() == ustensilTag.toLowerCase()) {
                    filteredTab.push(recipieTab[i]);
                }

            }
        }
        return filteredTab;




    }
    searchByIngredients(recipieTab, ingredientTag) {
        let filteredTab = [];
        for (let i = 0; i < recipieTab.length; i++) {
            for (let j = 0; j < recipieTab[i].ingredients.length; j++) {
                if (recipieTab[i].ingredients[j].ingredient.toLowerCase() == ingredientTag.toLowerCase()) {
                    filteredTab.push(recipieTab[i]);
                }

            }
        }
        //sorter et spprimer les doublants
        /*const byValue = (a, b) => a - b;
        filteredTab = filteredTab.sort(byValue);
        console.log("apres sort" + filteredTab);*/
        
        return filteredTab;

    }




}

