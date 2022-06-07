/*une page piur gerer le js de la page accueil*/
import recipeSearch from '../utils/recipeSearch.js';
import recipeCardFactory from '../factories/recipeCardFactory.js';

export default class index {
    constructor() {

        this.recipeInstance = new recipeSearch();
        this.searchResult = this.recipeInstance.recipes;
        //liste des tags selectionnés
        this.Tags = {
            ingredients: this.recipeInstance.getListOfIngredients(this.searchResult),
            ustensils: this.recipeInstance.getListOfUstensils(this.searchResult),
            appliance: this.recipeInstance.getListOfAppliance(this.searchResult)
        };

        // obj des tableaux des tags selectionnés
        this.selectedTags = {
            ingredients: [],
            ustensils: [],
            appliance: []
        }
    }


    /* La fonction principale de la recherche  */

    /**
     * 
     * @param {Array} tabRecipie 
     * @param {Array Strings} keyWords
     
     */
    getResults(keyWords, tabRecipes) {
        //intialiser les tableaux des resultats sortants de chaque fornction de recherche 
        //let recipeInstance = this.recipeInstance;
        var tabResults = [];
        let resultByIngredients = this.recipeInstance.searchInIngredients(keyWords, tabRecipes);
        let resultsByName = this.recipeInstance.searchInName(keyWords, tabRecipes);

        //conctenation
        tabResults = this.recipeInstance.concatener(resultByIngredients, resultsByName);
        let resulatsByDescription = this.recipeInstance.searchInDescription(keyWords, tabRecipes);
        /*on fait la oncatenation des tab resulats*/
        tabResults = this.recipeInstance.concatener(tabResults, resulatsByDescription);


        this.generateAllTags(tabResults);
        console.log('Resultats de recherche par titre description et ingrédients pour:' + keyWords);
        console.log(tabResults);
        //this.searchResult = tabResults;
        return tabResults;
    }
    // Génération des filtres de tous les dropdowns selon le mot clé dans le champs de rechrche

    generateAllTags(tabResults) {
        /*remplissage des filtres*/

        /*ingredients*/
        this.Tags.ingredients = this.recipeInstance.getListOfIngredients(tabResults);
        this.Tags.ingredients = this.Tags.ingredients.filter((item) => !this.selectedTags.ingredients.includes(item));
        this.Tags.ingredients.sort();
        this.generateFilterIngredient(this.Tags.ingredients);


        /**appliances */

        this.Tags.appliance = this.recipeInstance.getListOfAppliance(tabResults);
        this.Tags.appliance = this.Tags.appliance.filter((item) => !this.selectedTags.appliance.includes(item));
        this.Tags.appliance.sort();

        this.generateFilterappliances(this.Tags.appliance);
        /*ustensils*/

        this.Tags.ustensils = this.recipeInstance.getListOfUstensils(tabResults);
        this.Tags.ustensils = this.Tags.ustensils.filter((item) => !this.selectedTags.ustensils.includes(item));
        this.Tags.ustensils.sort();
        this.generateFilterUstensilles(this.Tags.ustensils);

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
    generateFilterIngredient(ingredientsList) {//, keywordField) {
        let IngredientsDropdown = document.querySelector('#ingredientDropdown');
        //pour verifier ql type de tag est cliqué 
        let tagType = 'ingredients';
        let ingredientsListDiv=document.createElement('div');
        ingredientsListDiv.setAttribute('id', 'ingredientDropdown-list');
        IngredientsDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Ingredients_search">';
        IngredientsDropdown.appendChild(ingredientsListDiv);
        //ajouter la recherche dans dropdown ingredients
        let ingSearch = document.getElementById('Ingredients_search');
        ingSearch.addEventListener('keyup', () => {
            this.searhInFilter('Ingredients_search', 'ingredientDropdown')
        });

        for (let i = 0; i < ingredientsList.length; i++) {
            let newItem = document.createElement('a');
            newItem.innerText = `${ingredientsList[i]}`;
            //ajouter un acion lister au a href
            ingredientsListDiv.appendChild(newItem);
        }

        /*gestion des tags*/
        let aList = ingredientsListDiv.getElementsByTagName('a');
        this.generateTags(aList, tagType);


        return IngredientsDropdown;
    }
    generateFilterappliances(appliacesList) {//, keywordField) {
        //pour verifier ql type de tag est cliqué 
        let tagType = 'Appareils';
        let appliancesDropdown = document.querySelector('#appliancesDropdown');
        let applianceListDiv=document.createElement('div');
        applianceListDiv.setAttribute('id', 'applianceDropdown-list');
        appliancesDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Appareils_options">';
        appliancesDropdown.appendChild(applianceListDiv);
        //ajouter la recherche dans dropdown ingredients
        let appSearch = document.getElementById('Appareils_options');
        appSearch.addEventListener('keyup', () => {
            this.searhInFilter('Appareils_options', 'appliancesDropdown')
        });
        for (let i = 0; i < appliacesList.length; i++) {
            let newItem = document.createElement('a');
            newItem.innerText = `${appliacesList[i]}`;
            applianceListDiv.appendChild(newItem);
        }
        /*gestion des tags*/
        let aList = applianceListDiv.getElementsByTagName('a');
        this.generateTags(aList, tagType);

        return appliancesDropdown;
    }
    generateFilterUstensilles(ustensillesList) {//, keywordField) {
        let tagType = 'ustensis';
        let ustensillesDropdown = document.querySelector('#ustensilsDropdown');
        let ustensillesListDiv=document.createElement('div');
        ustensillesListDiv.setAttribute('id', 'ustensillesDropdown-list');
        ustensillesDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Ustensils_options">';
        ustensillesDropdown.appendChild(ustensillesListDiv);
        //ajouter la recherche dans dropdown ingredients
        let ustSearch = document.getElementById('Ustensils_options');
        ustSearch.addEventListener('keyup', () => {
            this.searhInFilter('Ustensils_options', 'ustensilsDropdown')
        });
        for (let i = 0; i < ustensillesList.length; i++) {
            let newItem = document.createElement('a');
            newItem.innerText = `${ustensillesList[i]}`;
            ustensillesListDiv.appendChild(newItem);
        }
        /*gestion des tags*/
        let aList = ustensillesListDiv.getElementsByTagName('a');
        this.generateTags(aList, tagType);

        return ustensillesDropdown;
    }
    /*faire la mise à jour des tags selon les résultats*/
    /**
     * 
     * @param {Array} tabResults 
     */
    updateTaglists(tabResults, tagType, Tag) {

        this.Tags.appliance = this.recipeInstance.getListOfAppliance(tabResults);
        for (let i = 0; i < this.Tags.appliance.length; i++) {
            for (let j = 0; j < this.selectedTags.appliance.length; j++) {
                if (this.Tags.appliance[i] == this.selectedTags.appliance[j]) {
                    this.Tags.appliance.splice(i, 1);

                }

            }
        }
        /*ustensils*/
        this.Tags.ustensils = this.recipeInstance.getListOfUstensils(tabResults);
        for (let i = 0; i < this.Tags.ustensils.length; i++) {
            for (let j = 0; j < this.selectedTags.ustensils.length; j++) {
                if (this.Tags.ustensils[i] == this.selectedTags.ustensils[j]) {
                    this.Tags.ustensils.splice(i, 1);

                }

            }
        }
        /*ingredients*/
        this.Tags.ingredients = this.recipeInstance.getListOfIngredients(tabResults);
        for (let i = 0; i < this.Tags.ingredients.length; i++) {
            for (let j = 0; j < this.selectedTags.ingredients.length; j++) {
                if (this.Tags.ingredients[i] == this.selectedTags.ingredients[j]) {
                    this.Tags.ingredients.splice(i, 1);

                }

            }
        }
        this.removeTag(this.Tags, Tag, tagType);
        switch (tagType) {
            case 'ingredients':
                this.selectedTags.ingredients.push(Tag);
                break;
            case 'Appareils':
                this.selectedTags.appliance.push(Tag);
                break;
            default:
                this.selectedTags.ustensils.push(Tag);

        }



        this.generateFilterappliances(this.Tags.appliance);//, keyWords);
        this.generateFilterUstensilles(this.Tags.ustensils);//, keyWords);
        this.generateFilterIngredient(this.Tags.ingredients);//, keyWords);

    }

    /*initialiser la liste des filtres*/
    initFilters() {
        let ingList = this.recipeInstance.getListOfIngredients(this.recipeInstance.recipes);
        this.generateFilterIngredient(ingList, 'test');

        let apList = this.recipeInstance.getListOfAppliance(this.recipeInstance.recipes);
        this.generateFilterappliances(apList, 'test');

        let ustList = this.recipeInstance.getListOfUstensils(this.recipeInstance.recipes);
        this.generateFilterUstensilles(ustList, 'test');
    }


    /** supprimer les tags de la liste dropdowns
     * 
     * @param {Array :tableau des tags  dans le constructeur} TabTags 
     * @param {String :le tag a supprimer} Tag 
     * @param {String: le type du tag} TagType 
     */

    removeTag(TabTags, Tag, TagType) {
        switch (TagType) {
            case 'ingredients':
                for (let i = 0; i < TabTags.ingredients.length; i++) {
                    if (TabTags.ingredients[i] == Tag) {
                        TabTags.ingredients.splice(i, 1);
                    }
                }
                break;
            case 'Appareils':
                for (let i = 0; i < TabTags.appliance.length; i++) {
                    if (TabTags.appliance[i] == Tag) {
                        TabTags.appliance.splice(i, 1);
                    }
                }
                break;
            default:
                for (let i = 0; i < TabTags.ustensils.length; i++) {
                    if (TabTags.ustensils[i] == Tag) {
                        TabTags.ustensils.splice(i, 1);
                    }
                }
        }

    }
    /*generer les tag a partir des listes de filtres*/

    /**@param {Array <links>} aList*/
    generateTags(aList, tagType) {
        let tagsSection = document.querySelector('#generatedTags');
        let filteredTab = [];
        let close = document.createElement('i');
        //else si le mot clé a plus de 3 caracteres 
        for (let i = 0; i < aList.length; i++) {

            aList[i].addEventListener('click', () => {

                //creation du tag
                let newTag = document.createElement('button');
                newTag.setAttribute('type', 'button');
                newTag.classList.add('btn', 'btn-primary', 'tag-button');
                //ajouter un id au tag
                let tagId = aList[i].innerText;
                newTag.setAttribute('id', tagId);
                newTag.innerText = `${aList[i].innerText}`;
                //add span close 

                close.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
                newTag.append(close);
                //add a delete function to tags
                close.addEventListener('click', () => {
                    this.deleteTag(tagId);
                });
                /* selectionner la fonction de filtre a utiliser */

                if (tagType == 'ingredients') {
                    //ajouter une classe personnalisée
                    newTag.classList.add('ingrediant-tag');
                    tagsSection.appendChild(newTag);
                    filteredTab = this.recipeInstance.searchByIngredients(this.searchResult, aList[i].innerText);
                    //mettre a jour le tableau resultats
                    this.searchResult = filteredTab;
                    console.log('ingredient filtered tab');
                    console.log(filteredTab);
                    //mettre a jour le reste des listes 
                    this.updateTaglists(this.searchResult, tagType, newTag.innerText);
                } else if (tagType == 'Appareils') {
                    //ajouter une classe personnalisée
                    newTag.classList.add('appliance-tag');
                    tagsSection.appendChild(newTag);
                    filteredTab = this.recipeInstance.searchByAppliance(this.searchResult, aList[i].innerText);
                    this.searchResult = filteredTab;
                    this.updateTaglists(this.searchResult, tagType, newTag.innerText);

                } else {


                    //ajouter une classe personnalisée
                    newTag.classList.add('ustensil-tag');
                    tagsSection.appendChild(newTag);
                    filteredTab = this.recipeInstance.searchByUstensils(this.searchResult, aList[i].innerText);
                    this.searchResult = filteredTab;
                    this.updateTaglists(this.searchResult, tagType, newTag.innerText);

                }
                //Suppression du tag 

                //vider le contenu de la section 
                let recipiesSection = document.querySelector('.cards');
                recipiesSection.innerHTML = '';
                this.displayRecipies(filteredTab);

            });

        }
        return tagsSection;
    }

    /*suppression des tag de la section generatedTags*/
    /**
     * @param {String} tagText
     * @param {Dom} tagsSection
     */
    deleteTag(tagId) {
        let tagClasslist = document.getElementById(tagId).classList;

        if (tagClasslist.contains('ingrediant-tag')) {
            this.selectedTags.ingredients = this.selectedTags.ingredients.filter((item) => ![tagId].includes(item))
            this.Tags.ingredients.push(tagId);
        } else {
            if (tagClasslist.contains('appliance-tag')) {

                this.selectedTags.appliance = this.selectedTags.appliance.filter((item) => ![tagId].includes(item))
                this.Tags.appliance.push(tagId);

            } else {
                this.selectedTags.ustensils = this.selectedTags.ustensils.filter((item) => ![tagId].includes(item))
                this.Tags.ustensils.push(tagId);

            }
        }

        document.getElementById(tagId).remove();
        this.searchResult = this.recipeInstance.recipes;
        /*mise a jour des listes dropdown selon le tag supprimé*/
        for (let i = 0; i < this.selectedTags.ingredients.length; i++) {
            this.searchResult = this.recipeInstance.searchByIngredients(this.searchResult, this.selectedTags.ingredients[i]);
        }
        for (let i = 0; i < this.selectedTags.appliance.length; i++) {
            this.searchResult = this.recipeInstance.searchByAppliance(this.searchResult, this.selectedTags.appliance[i]);
        }
        for (let i = 0; i < this.selectedTags.ustensils.length; i++) {
            this.searchResult = this.recipeInstance.searchByUstensils(this.searchResult, this.selectedTags.ustensils[i]);
        }

        // this.updateTaglists(this.searchResult, '', '');
        this.generateAllTags(this.searchResult);
        this.displayRecipies(this.searchResult);




    }
    /*show dropdown ajouter la classe show a la liste des filtres*/
    /**
     * 
     * @param {String} buttonId 
     * @param {String} dropdownId 
     */
    showDropdown(buttonId, dropdownId) {
        let filterButton = document.querySelector(buttonId);
        // let arrow=document.querySelector("#arrow");
        filterButton.addEventListener('click', () => {
            document.getElementById(dropdownId).classList.toggle('show');
            document.getElementById(dropdownId).classList.toggle('prior');
        });
    }


    //pour faire une recherche sur tags---------------->not working
    /**
     * 
     * @param {String search filed Id} searchFiledId 
     * @param {String Dropdown id} dropdownId 
     */
    searhInFilter(searchFiledId, dropdownId) {
        var keyword = document.getElementById(searchFiledId);
        let filter = keyword.value.toUpperCase();
        let dropdown = document.getElementById(dropdownId);
        let aList = dropdown.getElementsByTagName('a');
        for (let i = 0; i < aList.length; i++) {
            let txtValue = aList[i].textContent || aList[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                aList[i].style.display = '';
            } else {
                aList[i].style.display = 'none';
            }
        }

    }


    renderPage() {
        /*Recupereer les elements dom boutons et sections*/
        let searchField = document.getElementById('search-input');
        const recipiesSection = document.querySelector('.cards');
        let keyWords = '';
        /*initialiser le contenu de la page*/
        this.displayRecipies(this.searchResult);

        //initialiser les filtres
        this.generateAllTags(this.searchResult);
        searchField.addEventListener('input', () => {
            //recuperer le contenu du champs de recherchrche principale 
            keyWords = searchField.value;
            if (keyWords.length >= 3) {
                this.searchResult = this.getResults(keyWords, this.searchResult);
                console.log(this.searchResult);
                if (this.searchResult.length > 0) {

                    //vider la section avant de la remplir de nouveau
                    recipiesSection.innerHTML = '';
                    document.querySelector('#generatedTags').innerHTML = '';
                    this.displayRecipies(this.searchResult);
                }
                else {//si aucun resultat trouvé
                    recipiesSection.innerHTML = `<p class="not-found"s>« Aucune recette ne correspond à votre critère… <span class="keyword">${keyWords}!</span> </br>vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
                }

            } else {// si le chanmp contient moins de 3 caractères 
                if (keyWords.length != 0) {
                    recipiesSection.innerHTML = '<p class="not-found">votre mot clé doit contenir au moins 3 caractères</p>';
                } else {//si le champ est vide 
                    //afficher toutes les recetes d'abord à condiotion que les tags soit vides

                    this.searchResult = this.recipeInstance.recipes;
                    this.displayRecipies(this.searchResult);
                    // this.updateTaglists(this.searchResult);
                    //init
                    this.initFilters();
                    //vider la liste des tags cliqué
                    document.querySelector('#generatedTags').innerHTML = '';

                }
            }
        });

        /*afficher tous les tags par deaut avant la recherche*/
        /*ajouter la classe show au differents filtres dropdown"*/
        this.showDropdown('#ingredient', 'ingredientDropdown');
        this.showDropdown('#Appareils', 'appliancesDropdown');
        this.showDropdown('#ustensils', 'ustensilsDropdown');

    }
}

let newPage = new index();
newPage.renderPage();



