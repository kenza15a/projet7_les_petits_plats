/*une page piur gerer le js de la page accueil*/
import recipes from '../../data/recipes.js'
import recipeCardFactory from '../factories/recipeCardFactory.js';
import recipieAdvancedSearch from '../utils/recipieAdvancedSearch.js';

export default class index {
    constructor() {
        this.recipies = recipes;
        this.searchResult = [];
        //this.recipieInstance = new recipieAdvancedSearch();
    }
    /*recuperer les listes des ingredients ,ustensils,appareils selon le mot clé saisie*/

    /*fonctions de recherche*/

    searchBasic(keyWords) {
        let keyWordsArray = keyWords.split(' ');
        let recipeResult = [];
        for (let i = 0; i < keyWordsArray.length; i++) {
            if (keyWordsArray[i].length >= 3) {


    //let recipeResult=this.recipies.filter(recipe=>recipe.name.toLowerCase().includes(keyWordsArray[i].toLowerCase()) || (recipe.description.toLowerCase().includes(keyWordsArray[i].toLowerCase())) || this.searchInIngredients(keyWordsArray[i], recipe.ingredients));
                this.recipies.forEach(recipe => {
                    /*try to use filter*/
                    if (recipe.name.toLowerCase().includes(keyWordsArray[i].toLowerCase()) || (recipe.description.toLowerCase().includes(keyWordsArray[i].toLowerCase())) || this.searchInIngredients(keyWordsArray[i], recipe.ingredients))
                        recipeResult.push(recipe);

                });

            }
        }
        console.log(recipeResult)

        return recipeResult;

    }


    /*rechrcher dans les ingredients*/
    searchInIngredients(keyWord, ingredientsTab) {
        let exist = false;
        ingredientsTab.forEach(ingredient => {
            if (ingredient.ingredient.toLowerCase().includes(keyWord.toLowerCase())) {
                exist = true;
            }

        });
        return exist;


    }

    /*lister les filtres selon le mot clé rechrché*/

    getListOfIngredients(tabRecipe) {
        let recipeResult = [];
        tabRecipe.forEach(recipie => {
            recipie.ingredients.forEach(ingredient => {
                recipeResult.push(ingredient.ingredient);
            });

        });
      
        /**eleminer les doublants*/

        //recipeResult = recipeResult.filter((value, index) => recipeResult.indexOf(value) === index);
       recipeResult=[...new Set(recipeResult)];//Sets are a new object type with ES6 (ES2015) that allows you to create collections of unique values.
        console.log('new recipie result after set ingrendients');
        console.log(recipeResult);
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

    generateTags(aList, tagType) {
        let tagsSection = document.querySelector('#generatedTags');
        for (let i = 0; i < aList.length; i++) {
            aList[i].addEventListener('click', () => {
                //creation du tag
                let newTag = document.createElement('button');
                newTag.setAttribute('type', 'button');
                newTag.classList.add('btn', 'btn-primary', 'tag-button');
                newTag.innerText = `${aList[i].innerText}`;
                //add span close 
                let close = document.createElement('i');
                close.innerHTML = '<i class="fa-light fa-circle-xmark"></i>';
                /*<i class="fa-solid fa-x"></i>*/
                newTag.append(close);
                tagsSection.appendChild(newTag);
                //selectionner la fonction de filtre a utiliser 
                let filteredTab = [];
                if (tagType == 'ingredients') {
                    alert('ingredient clciked');
                    filteredTab = this.searchByIngredients(this.searchResult, aList[i].innerText);
                    this.searchResult = filteredTab;
                    this.updateTaglists(filteredTab);
                } else if (tagType == 'Appareils') {
                    alert('appareil is  clciked');
                    filteredTab = this.recipeInstance.searchByAppliance(this.searchResult, aList[i].innerText);
                    this.searchResult = filteredTab;
                    this.updateTaglists(filteredTab);
                } else {

                    alert('ustensils is  clciked');
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
    }

    /**
     * 
     * @param {Array} ingredientsList 
     * @param {String} keywordField 
     * @returns 
     */


    /*generer les dropdowns listes des differents filtres */
    generateFilterIngredient(ingredientsList, keywordField) {
        let IngredientsDropdown = document.querySelector('#ingredientDropdown');
        //pour verifier ql type de tag est cliqué 
        let tagType = 'ingredients';
        IngredientsDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Ingredients_search">';
        if (keywordField.length >= 3) {
            ingredientsList.forEach(ingredient => {
                let newItem = document.createElement('a');
                newItem.innerText = `${ingredient}`;
                IngredientsDropdown.appendChild(newItem);
            }
            );
            /*gestion des tags*/
            let aList = IngredientsDropdown.getElementsByTagName('a');
            this.generateTags(aList, tagType);
        }

        return IngredientsDropdown;
    }

    /*show dropdown ajouter la classe show a la liste des filtres*/
    /**
     * 
     * @param {String} buttonId 
     * @param {String} dropdownId 
     */
    showDropdown(buttonId, dropdownId) {
        let filterButton = document.querySelector(buttonId);
        filterButton.addEventListener('click', () => {
            document.getElementById(dropdownId).classList.toggle('show');

        });

    }
    getResults() {
        var tabResults = [];
        /*recupereer le bouton search*/
        //let searchButton = document.querySelector("#search-btn");
        let searchField = document.getElementById('search-input');
        const recipiesSection = document.querySelector('.cards');
        let keyWords = '';
        console.log('the keywords' + keyWords);

        searchField.addEventListener('input', () => {


            keyWords = searchField.value;
            if (keyWords.length >= 3) {
                console.log(keyWords);
                tabResults = this.searchBasic(keyWords);
                if (tabResults.length > 0) {
                    recipiesSection.innerHTML = '';
                    this.displayRecipies(tabResults);
                }
                else {
                    recipiesSection.innerHTML = `<p class="not-found">« Aucune recette ne correspond à votre critère… <span class="keyword">${keyWords}!</span> </br>vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
                }
            } else {// si le chanmp contient moins de 3 caractères 
                if (keyWords.length != 0) {
                    recipiesSection.innerHTML = '<p class="not-found">votre mot clé doit contenir au moins 3 caractères</p>';
                } else {//si le champ est vide 
                    recipiesSection.innerHTML = '';
                    document.querySelector('#generatedTags').innerHTML = ''
                }
            }
            /*Remplir les dropdown des filtres*/
            /*ingredients*/
            let ingList = this.getListOfIngredients(tabResults);
            console.log(ingList);
            this.generateFilterIngredient(ingList, keyWords);

            this.searchResult = tabResults;
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

    renderPage() {
        let tabResults = this.getResults();
        /*ajouter la classe show au differents filtres dropdown"*/
        this.showDropdown('#ingredient', 'ingredientDropdown');
        this.showDropdown('#Appareils', 'appliancesDropdown');
        this.showDropdown('#ustensils', 'ustensilsDropdown');
        /* let searchInput=document.querySelector('#Ingredients_search');
         searchInput.addEventListener("keyup", this.filterIngredients());*/

    }

    /*renderPage() {
        // alert("new index");
        let tabResults = this.getResults();
        let titres = this.recipies.map(recipie => recipie.name);
        let ingredientsArray = this.recipies.map(recipie => recipie.ingredients);
        console.log(titres);
        //on veut recuperer les ingredients selon le mot clé 
        let searched = "coco";
        let titlesResult = titres.filter(titre => titre.toLowerCase().includes(searched.toLowerCase()));
        console.log("les bons titres");
        console.log(titlesResult);


        //sort titles
        /*
        console.log ('sorted by name');
        console.log(titres);*/

    //}*/


}

let newPage = new index();
newPage.renderPage();



