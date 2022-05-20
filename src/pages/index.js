/*une page piur gerer le js de la page accueil*/
import recipeSearch from "../utils/recipeSearch.js";
import recipeCardFactory from "../factories/recipeCardFactory.js";

export default class index {
    constructor() {
    }

    getResults() {

        let recipeInstance = new recipeSearch();
        var resultByIngredients = [];
        var resultsByName = [];
        var resulatsByDescription = [];
        var tabResults = [];
        /*recupereer le bouton search*/
        let searchButton = document.querySelector("#search-btn");
        let searchField = document.getElementById('search-input');
        const recipiesSection = document.querySelector('.cards');
        let keyWords = "";
        searchButton.addEventListener('click', () => {

            keyWords = searchField.value;
            console.log(keyWords);
            resultByIngredients = recipeInstance.searchInIngredients(keyWords, recipeInstance.recipes);
            resultsByName = recipeInstance.searchInName(keyWords, recipeInstance.recipes);
            //console.log(resultByIngredients);
            //conctenation
            tabResults = recipeInstance.concatener(resultByIngredients, resultsByName);
            resulatsByDescription = recipeInstance.searchInDescription(keyWords, recipeInstance.recipes);
            /*on fait la oncatenation des tab resulats*/
            tabResults = recipeInstance.concatener(tabResults, resulatsByDescription);

            if (tabResults.length > 0) {
                recipiesSection.innerHTML = '';
                this.displayRecipies(tabResults);
            }
            else {
                recipiesSection.innerHTML = `<p class="not-found"s>« Aucune recette ne correspond à votre critère… <span class="keyword">${keyWords}!</span> </br>vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
            }
            console.log('Resultats de recherche par titre description et ingrédients pour:' + keyWords);
            console.log(tabResults);
        });

        //afficher les ingredients selon le resultat apres une recherche keyword
        let ingredientsButton = document.querySelector(".dropbtn");
        ingredientsButton.addEventListener("click", () => {
            let ingList = recipeInstance.getListOfIngredients(tabResults);
            console.log(ingList);

        });
        let ustensilsButton = document.querySelector("#ustensils");
        ustensilsButton.addEventListener("click", () => {
            let ingList = recipeInstance.getListOfUstensils(tabResults);
            console.log(ingList);

        });
        let applianceButton = document.querySelector("#Appareils");
        applianceButton.addEventListener("click", () => {
            let ingList = recipeInstance.getListOfAppliance(tabResults);
            console.log(ingList);

        });

        //Appareils
        return tabResults;
    }

    displayRecipies(tabRecipie) {

        const recipiesSection = document.querySelector('.cards');
        for (let i = 0; i < tabRecipie.length; i++) {
            const recipeCrd = new recipeCardFactory(tabRecipie[i]);
            const newCard = recipeCrd.getrecipeDom();
            // recipiesSconstection.removeChild(recipiesSection.firstChild);

            recipiesSection.appendChild(newCard);
        }
        return recipiesSection;
    }


    /*display filters ingredients*/
    diplayIngredients() {
        //appel la factory des igredients

    }

    renderPage() {
        let tabResults = this.getResults();



    }


}

let newPage = new index();
newPage.renderPage();



