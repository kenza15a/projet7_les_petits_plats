
import recipes from "../../data/recipes";
export default class advancedSearch{


    constructor() {
        this.recipes = recipes;
        //sconsole.log(this.recipes);

    }
    /**@param {string garray}  keywords*/
    /**@param {object aray} tabRecipe */

    getBasicResults(keywords,tabRecipe){
        let keyWordsArray = keywords.split(' ');
        let recipeResult = [];
        tabRecipe.forEach(recipe =>{
            console.log(recipe);
        });



    }



}
let keywords="";

let searchadv=new advancedSearch(recipes);
searchadv.getBasicResults(keywords,recipes)