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
        searchField.addEventListener('input', () => {

            keyWords = searchField.value;
            if (keyWords.length >= 3) {
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

            } else {
                if (keyWords.length != 0) {
                    recipiesSection.innerHTML = `<p class="not-found">votre mot clé doit contenir au moins 3 caractères</p>`;
                } else {
                    recipiesSection.innerHTML = '';

                }
            }

            console.log('Resultats de recherche par titre description et ingrédients pour:' + keyWords);
            console.log(tabResults);

            /*remplissage des filtres*/

            /*ingredients*/
            let ingList = recipeInstance.getListOfIngredients(tabResults);
            console.log(ingList);
            this.generateFilterIngredient(ingList, keyWords);


            /**appliances */

            let appliancesList = recipeInstance.getListOfAppliance(tabResults);
            console.log(appliancesList);
            this.generateFilterappliances(appliancesList, keyWords);
            /*ustensils*/

            let ustensilsList = recipeInstance.getListOfUstensils(tabResults);
            console.log(ustensilsList);
            this.generateFilterUstensilles(ustensilsList, keyWords);
            /*tester les filtres*/
            let filteredTab = recipeInstance.searchByAppliance(tabResults, "cocotte");
            console.log("tableau filtré par tag appareil");
            console.log(filteredTab);
            /*ustensils*/
            let filteredTabUst = recipeInstance.searchByUstensils(tabResults, "casserolle");
            console.log("tableau filtré par tag ustensil");
            console.log(filteredTabUst);
            /*ingredients*/
            let filteredTabIng = recipeInstance.searchByIngredients(tabResults, "poulet");
            console.log("tableau filtré par tag ingredient");
            console.log(filteredTabIng);


        });


        //afficher les ingredients selon le resultat apres une recherche keyword
        /* let ingredientsButton = document.querySelector(".dropbtn");
         ingredientsButton.addEventListener("click", () => {
             let ingList = recipeInstance.getListOfIngredients(tabResults);
             console.log(ingList);
             this.generateFilterIngredient(ingList);
 
         });*/
        /*let ustensilsButton = document.querySelector("#ustensils");
        ustensilsButton.addEventListener("click", () => {
            let ingList = recipeInstance.getListOfUstensils(tabResults);
            console.log(ingList);

        });*/


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
    //les filtres dropdown
    generateFilterIngredient(ingredientsList, keywordField) {
        let IngredientsDropdown = document.querySelector('#ingredientDropdown');

        IngredientsDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Ingredients_search">';
        if (keywordField.length >= 3) {
            for (let i = 0; i < ingredientsList.length; i++) {
                let newItem = document.createElement("a");
                newItem.innerText = `${ingredientsList[i]}`;
                IngredientsDropdown.appendChild(newItem);
            }
        }


        return IngredientsDropdown;
    }
    generateFilterappliances(appliacesList, keywordField) {
        let appliancesDropdown = document.querySelector('#appliancesDropdown');
        appliancesDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Appareils_options">';
        if (keywordField.length >= 3) {
            for (let i = 0; i < appliacesList.length; i++) {
                let newItem = document.createElement("a");
                newItem.innerText = `${appliacesList[i]}`;
                appliancesDropdown.appendChild(newItem);
            }
        }
        return appliancesDropdown;
    }
    generateFilterUstensilles(ustensillesList, keywordField) {
        let ustensillesDropdown = document.querySelector('#ustensilsDropdown');
        ustensillesDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Ustensils_options">';
        if (keywordField.length >= 3) {
            for (let i = 0; i < ustensillesList.length; i++) {
                let newItem = document.createElement("a");
                newItem.innerText = `${ustensillesList[i]}`;
                ustensillesDropdown.appendChild(newItem);
            }
        }
        return ustensillesDropdown;
    }
    /**@param {link value} aValue*/
    generateTags(aValue) {


        let tagsSection = document.querySelector("#generatedTags");


    }


    renderPage() {
        let tabResults = this.getResults();



    }


}

let newPage = new index();
newPage.renderPage();



