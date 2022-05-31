export default class recipieAdvancedSearch {
    constructor() {

    }


    /*fonctions de recherche*/
    /**
     * 
     * @param {un ou plusieurs mots} keyWords 
     */
    searchInName(keyWords, tabRecipe) {
        let keyWordsArray = keyWords.split(' ');
        let recipeResult = [];
        // let titres = tabRecipe.map(recipie => recipie.name);
        keyWordsArray.forEach(keyword => {
            if (keyword.length >= 3) {
                tabRecipe.forEach(recipe => {
                    if (recipe.name.toLowerCase().includes(keyword.toLowerCase())) {
                        recipeResult.push(recipe);
                    }
                });
            }
        });
        return recipeResult;

    }

    searchInDescription(keyWords, tabRecipe) {
      //  tabRecipe = this.recipes;
        let keyWordsArray = keyWords.split(' ');
        let recipeResult = [];
        keyWordsArray.forEach(keyword => {

            if (keyword.length >= 3) {
                tabRecipe.forEach(recipe => {
                
                    if (recipe.description.toLowerCase().includeskeyword.toLowerCase()) {
                        recipeResult.push(recipe);
                    }
                });
            }
        });

        return recipeResult;


    /*rechercher dans la description*/

}
}