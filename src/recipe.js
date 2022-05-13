import recipes from "../data/recipes.js"
export default class recipe {
    constructor() {
        this.recipes = recipes;
        console.log(this.recipes);

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
        }
        return recipeResult;

    }

    searchInDescription(keyWords, tabRecipe) {
        console.log("I'm Innnn")
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
        console.log(recipeResult);
        return recipeResult;

    }
}