/*une page piur gerer le js de la page accueil*/
import recipe from "./recipe.js";

export default class index {
    constructor() {
        // alert("i,m index");

    }


    /**
     * 
     * @param {string} searchText 
     */
    getTags(searchText) {
        /*find tag according to text*/
        let tagsSection = document.querySelector(".tags-section");
        let tagButton = document.createElement("button");
        tag.classList.add("btn", "btn-primary", "position-relative", "tag");
        tagsSection.appendChild(tagButton);

    }
    getResults() {
        let keyWords = "sucre";
        let recipeInstance = new recipe();
        var tab = [];


        /*recupereer le bouton search*/
        let searchButton = document.querySelector("#search-btn");
        searchButton.addEventListener("click", function (e) {
            e.preventDefault();
            //console.log(keyWords);
            console.log(recipeInstance.recipes);
            // let tabRecipe = this.recipeObj;
            tab = recipeInstance.searchInIngredients(keyWords, recipeInstance.recipes);

            //console.log(tab);
        });

        //sconsole.log(tab);
    }




}

let newPage = new index();
newPage.getResults();
newPage.getTags;