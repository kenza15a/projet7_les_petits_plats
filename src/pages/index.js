/*une page piur gerer le js de la page accueil*/
import recipeSearch from "../utils/recipeSearch.js";
import recipeCardFactory from "../factories/recipeCardFactory.js";

export default class index {
    constructor() {
        this.searchResult = [];
        this.recipeInstance = new recipeSearch();
    }
    /* La fonction principale de la recherche  */
    getResults() {
        //intialiser les tableaux des resultats sortants de chaque fornction de recherche 
        let recipeInstance = this.recipeInstance;
        var resultByIngredients = [];
        var resultsByName = [];
        var resulatsByDescription = [];
        var tabResults = [];
        /*Recupereer les elements dom boutons et sections*/
        let searchButton = document.querySelector("#search-btn");
        let searchField = document.getElementById('search-input');
        const recipiesSection = document.querySelector('.cards');
        let keyWords = "";
        searchField.addEventListener('input', () => {
            //recuperer le contenu du champs de recherchrche principale 
            keyWords = searchField.value;
            if (keyWords.length >= 3) {

                console.log(keyWords);
                resultByIngredients = recipeInstance.searchInIngredients(keyWords, recipeInstance.recipes);
                resultsByName = recipeInstance.searchInName(keyWords, recipeInstance.recipes);

                //conctenation
                tabResults = recipeInstance.concatener(resultByIngredients, resultsByName);
                resulatsByDescription = recipeInstance.searchInDescription(keyWords, recipeInstance.recipes);
                /*on fait la oncatenation des tab resulats*/
                tabResults = recipeInstance.concatener(tabResults, resulatsByDescription);

                if (tabResults.length > 0) {

                    //vider la section avant de la remplir de nouveau
                    recipiesSection.innerHTML = '';
                    document.querySelector("#generatedTags").innerHTML = '';
                    this.displayRecipies(tabResults);
                }
                else {//si aucun resultat trouvé
                    recipiesSection.innerHTML = `<p class="not-found"s>« Aucune recette ne correspond à votre critère… <span class="keyword">${keyWords}!</span> </br>vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
                }

            } else {// si le chanmp contient moins de 3 caractères 
                if (keyWords.length != 0) {
                    recipiesSection.innerHTML = `<p class="not-found">votre mot clé doit contenir au moins 3 caractères</p>`;
                } else {//si le champ est vide 
                    //afficher toutes les recetes d'abord
                    this.displayRecipies(this.recipeInstance.recipes);
                    //vider la liste des tags cliqué
                    document.querySelector("#generatedTags").innerHTML = '';



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
            /*tester les filtres
            let filteredTab = recipeInstance.searchByAppliance(tabResults, "cocotte");
            console.log("tableau filtré par tag appareil");
            console.log(filteredTab);
            /*ustensils*/
            /*  let filteredTabUst = recipeInstance.searchByUstensils(tabResults, "casserolle");
              console.log("tableau filtré par tag ustensil");
              console.log(filteredTabUst);
              /*ingredients*/
            /*let filteredTabIng = recipeInstance.searchByIngredients(tabResults, "poulet");
            console.log("tableau filtré par tag ingredient");
            console.log(filteredTabIng);*/

            this.searchResult = tabResults;
        });
        return tabResults;
    }
    /*Afficher les resultats sous forme de cartes en utilisant la factory recipeCardFactory */
    /**
     * 
     * @param {Array} tabRecipie 
     
     */

    displayRecipies(tabRecipie) {

        const recipiesSection = document.querySelector('.cards');
        recipiesSection.innerHTML = '';
        for (let i = 0; i < tabRecipie.length; i++) {
            const recipeCrd = new recipeCardFactory(tabRecipie[i]);
            const newCard = recipeCrd.getrecipeDom();
            // recipiesSconstection.removeChild(recipiesSection.firstChild);

            recipiesSection.appendChild(newCard);
        }
        return recipiesSection;
    }
    //generer les  filtres dropdown


    /**
     * 
     * @param {Array} ingredientsList 
     * @param {String} keywordField 
     * @returns 
     */
    generateFilterIngredient(ingredientsList, keywordField) {
        let IngredientsDropdown = document.querySelector('#ingredientDropdown');
        //pour verifier ql type de tag est cliqué 
        let tagType = "ingredients";
        IngredientsDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Ingredients_search">';

        if (keywordField.length >= 3) {
            for (let i = 0; i < ingredientsList.length; i++) {
                let newItem = document.createElement("a");
                newItem.innerText = `${ingredientsList[i]}`;
                //ajouter un acion lister au a href
                // newItem.addEventListener("click",this.recipeInstance.searchByIngredients(this.searchResult,newItem.innerText));
                IngredientsDropdown.appendChild(newItem);
            }

            /*gestion des tags*/
            let aList = IngredientsDropdown.getElementsByTagName("a");
            this.generateTags(aList, tagType);
        }

        return IngredientsDropdown;
    }
    generateFilterappliances(appliacesList, keywordField) {
        //pour verifier ql type de tag est cliqué 
        let tagType = "Appareils";
        let appliancesDropdown = document.querySelector('#appliancesDropdown');
        appliancesDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Appareils_options">';
        if (keywordField.length >= 3) {
            for (let i = 0; i < appliacesList.length; i++) {
                let newItem = document.createElement("a");
                newItem.innerText = `${appliacesList[i]}`;
                appliancesDropdown.appendChild(newItem);
            }
            /*gestion des tags*/
            let aList = appliancesDropdown.getElementsByTagName("a");
            this.generateTags(aList, tagType);

        }
        return appliancesDropdown;
    }
    generateFilterUstensilles(ustensillesList, keywordField) {
        let tagType = "ustensis";
        let ustensillesDropdown = document.querySelector('#ustensilsDropdown');
        ustensillesDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Ustensils_options">';
        if (keywordField.length >= 3) {
            for (let i = 0; i < ustensillesList.length; i++) {
                let newItem = document.createElement("a");
                newItem.innerText = `${ustensillesList[i]}`;
                ustensillesDropdown.appendChild(newItem);
            }
            /*gestion des tags*/
            let aList = ustensillesDropdown.getElementsByTagName("a");
            this.generateTags(aList, tagType);
        }
        return ustensillesDropdown;
    }
    /*faire la mise à jour des tags selon les résultats*/
    /**
     * 
     * @param {Array} tabResults 
     */
    updateTaglists(tabResults) {
        let keyWords = document.getElementById("search-input").value;
        let appliancesList = this.recipeInstance.getListOfAppliance(tabResults);
        this.generateFilterappliances(appliancesList, keyWords);
        /*ustensils*/

        let ustensilsList = this.recipeInstance.getListOfUstensils(tabResults);
        this.generateFilterUstensilles(ustensilsList, keyWords);
        /*ingredients*/

        let ingList = this.recipeInstance.getListOfIngredients(tabResults);
        this.generateFilterIngredient(ingList, keyWords);
    }

    /*generer les tag a partir des listes de filtres*/

    /**@param {Array <links>} aList*/
    generateTags(aList, tagType) {
        let tagsSection = document.querySelector("#generatedTags");
        for (let i = 0; i < aList.length; i++) {
            aList[i].addEventListener("click", () => {
                //creation du tag
                let newTag = document.createElement("button");
                newTag.setAttribute("type", "button");
                newTag.classList.add("btn", "btn-primary", "tag-button");
                newTag.innerText = `${aList[i].innerText}`;
                //add span close 
                let close = document.createElement("i");
                close.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
                newTag.append(close);
                //selectionner la fonction de filtre a utiliser 
                let filteredTab = [];
                if (tagType == "ingredients") {

                    //ajouter une classe personnalisée
                    newTag.classList.add("ingrediant-tag");
                    tagsSection.appendChild(newTag);
                    filteredTab = this.recipeInstance.searchByIngredients(this.searchResult, aList[i].innerText);
                    this.searchResult = filteredTab;
                    this.updateTaglists(filteredTab);
                } else if (tagType == "Appareils") {
                    //ajouter une classe personnalisée
                    newTag.classList.add("appliance-tag");
                    tagsSection.appendChild(newTag);
                    filteredTab = this.recipeInstance.searchByAppliance(this.searchResult, aList[i].innerText);
                    this.searchResult = filteredTab;
                    this.updateTaglists(filteredTab);
                } else {

                    //ajouter une classe personnalisée
                    newTag.classList.add("ustensil-tag");
                    tagsSection.appendChild(newTag);
                    filteredTab = this.recipeInstance.searchByUstensils(this.searchResult, aList[i].innerText);
                    this.searchResult = filteredTab;
                    this.updateTaglists(filteredTab);
                }
                //vider le contenu de la section 
                let recipiesSection = document.querySelector('.cards');
                recipiesSection.innerHTML = '';
                this.displayRecipies(filteredTab);
            });
        }



        return tagsSection;
    }
    /*show dropdown ajouter la classe show a la liste des filtres*/
    /**
     * 
     * @param {String} buttonId 
     * @param {String} dropdownId 
     */
    showDropdown(buttonId, dropdownId) {
        let filterButton = document.querySelector(buttonId);
        filterButton.addEventListener("click", () => {
            document.getElementById(dropdownId).classList.toggle("show");

        });

    }
    filterIngredients() {
        //alert("search ingredient clicked");
        var input, filter, a, i;
        input = document.getElementById("Ingredients_search");
        filter = input.value.toUpperCase();
        let div = document.getElementById("ingredientDropdown");
        a = div.getElementsByTagName("a");
        for (i = 0; i < a.length; i++) {
            let txtValue = a[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "";
            } else {
                a[i].style.display = "none";
            }
        }
    }
    deleteTag(tag) {
        tag.classList.add("delete")


    }
    /*initialiser la liste des filtres*/
    initFilters() {
        /*initilaliser les dropdown*/
        /*1----ingredients*/
        let ingList = this.recipeInstance.getListOfIngredients(this.recipeInstance.recipes);
        this.generateFilterIngredient(ingList, 'test');
        /*2-appareils*/
        let apList = this.recipeInstance.getListOfAppliance(this.recipeInstance.recipes);
        this.generateFilterappliances(apList, 'test');
        /*3-ustensils*/
        let ustList = this.recipeInstance.getListOfUstensils(this.recipeInstance.recipes);
        this.generateFilterUstensilles(ustList, 'test');
    }

    renderPage() {
        //pour faire fonctionner la recherche par tags sans mot clé on initialise tab resultat
        //dans searchResult 
        //this.searchResult = this.recipeInstance.recipes;
        /*initilaliser les dropdown*/
        this.initFilters();
        /*afficher toutes les recettes*/
        this.displayRecipies(this.recipeInstance.recipes);


        /*traiter la recherche*/
        let tabResults = this.getResults();

        /*afficher tous les tags par deaut avant la recherche*/
        /*ajouter la classe show au differents filtres dropdown"*/
        this.showDropdown("#ingredient", "ingredientDropdown");
        this.showDropdown("#Appareils", "appliancesDropdown");
        this.showDropdown("#ustensils", "ustensilsDropdown");
        /* let searchInput=document.querySelector('#Ingredients_search');
         searchInput.addEventListener("keyup", this.filterIngredients());*/

    }


}

let newPage = new index();
newPage.renderPage();



