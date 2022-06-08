import recipes from '../../data/recipes.js'
import recipeCardFactory from '../factories/recipeCardFactory.js';
export default class index {
    constructor() {


        this.searchResult = recipes;
        console.log(this.searchResult);
        //liste des tags selectionnés
        this.Tags = {
            ingredients: this.getListOfIngredients(this.searchResult),
            ustensils: this.getListOfUstensils(this.searchResult),
            appliance: this.getListOfAppliance(this.searchResult)
        };

        // obj des tableaux des tags selectionnés
        this.selectedTags = {
            ingredients: [],
            ustensils: [],
            appliance: []
        }
    }
    /*fonctions de recherche*/

    searchBasic(keyWords, tabRecepies) {
        let keyWordsArray = keyWords.split(' ');
        let recipeResult = [];
        for (let i = 0; i < keyWordsArray.length; i++) {
            if (keyWordsArray[i].length >= 3) {
                tabRecepies.forEach(recipe => {
                    /*try to use filter*/
                    if (recipe.name.toLowerCase().includes(keyWordsArray[i].toLowerCase()) || (recipe.description.toLowerCase().includes(keyWordsArray[i].toLowerCase())) || this.searchInIngredients(keyWordsArray[i], recipe.ingredients))
                        recipeResult.push(recipe);

                });

            }
        }
        this.generateAllTags(recipeResult);

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
    /*filtrer  par tags*/
    /**
     * 
     * @param {Array  <recipies>} recipieTab 
     * @param {String} applianceTag 
     */
    searchByIngredients(recipieTab, ingredientTag) {
        let filteredTab = [];

        recipieTab.forEach(recipie => {

            recipie.ingredients.forEach(ingredient => {
                if (ingredient.ingredient.toLowerCase() == ingredientTag.toLowerCase()) {
                    filteredTab.push(recipie);
                }
            });

        });
        return filteredTab;

    }

    searchByAppliance(recipieTab, applianceTag) {
        let filteredTab = [];
        recipieTab.forEach(recipe => {
            if (recipe.appliance.toLowerCase() == applianceTag.toLowerCase()) {
                filteredTab.push(recipe);
            }

        });

        return filteredTab;
    }
    searchByUstensils(recipieTab, ustensilTag) {
        let filteredTab = [];
        recipieTab.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                if (ustensil.toLowerCase() == ustensilTag.toLowerCase()) {
                    filteredTab.push(recipe);
                }

            });

        });
        return filteredTab;

    }


    /*getters*/
    /*lister les filtres selon le mot clé rechrché*/
    /*lister les filtres selon le mot clé rechrché*/

    getListOfIngredients(tabRecipe) {
        let recipeResult = [];
        tabRecipe.forEach(recipie => {
            recipie.ingredients.forEach(ingredient => {
                recipeResult.push(ingredient.ingredient);
            });

        });

        /**eleminer les doublants*/

        //utilisation de l'objet set dans un array pour traité les doublant et le tri du tableau a la fois
        recipeResult = [...new Set(recipeResult)];//Sets are a new object type with ES6 (ES2015) that allows you to create collections of unique values.

        return recipeResult;
    }
    getListOfUstensils(tabRecipe) {
        let recipeResult = [];
        tabRecipe.forEach(recipie => {
            recipie.ustensils.forEach(ustensil => {
                recipeResult.push(ustensil);
            });

        });

        /**eleminer les doublants*/

        recipeResult = [...new Set(recipeResult)]; //Sets are a new object type with ES6 (ES2015) that allows you to create collections of unique values.

        return recipeResult;
    }
    getListOfAppliance(tabRecipe) {
        let recipeResult = [];
        tabRecipe.forEach(recipie => {
            recipeResult.push(recipie.appliance);

        });
        /**eleminer les doublants*/
        recipeResult = [...new Set(recipeResult)];//Sets are a new object type with ES6 (ES2015) that allows you to create collections of unique values.

        return recipeResult;
    }


    displayRecipies(tabRecipie) {

        const recipiesSection = document.querySelector('.cards');
        recipiesSection.innerHTML = '';
        tabRecipie.forEach(recipe => {
            const recipeCrd = new recipeCardFactory(recipe);
            const newCard = recipeCrd.getrecipeDom();
            recipiesSection.appendChild(newCard);

        });



        return recipiesSection;
    }
    /*generer les dropdowns listes des differents filtres */
    generateFilterIngredient(ingredientsList) {
        let IngredientsDropdown = document.querySelector('#ingredientDropdown');
        let ingredientsListDiv = document.createElement('div');
        ingredientsListDiv.setAttribute('id', 'ingredientDropdown-list');
        //let ingredientsListDiv=document.querySelector('#ingredientDropdown-list'); //nouveau
        //pour verifier ql type de tag est cliqué 
        let tagType = 'ingredients';
        IngredientsDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Ingredients_search"> ';
        IngredientsDropdown.appendChild(ingredientsListDiv);
        let ingSearch = document.getElementById('Ingredients_search');
        //recherche dans la liste dropdown 
        ingSearch.addEventListener('keyup', () => {
            this.searhInFilter('Ingredients_search', 'ingredientDropdown')
        });
        ingredientsList.forEach(ingredient => {
            let newItem = document.createElement('a');
            newItem.innerText = `${ingredient}`;
            ingredientsListDiv.appendChild(newItem);
        }
        );
        /*gestion des tags*/
        let aList = ingredientsListDiv.getElementsByTagName('a');//nouveau
        this.generateTags(aList, tagType);


        return IngredientsDropdown;
    }
    generateFilterappliances(appliacesList) {//, keywordField) {
        //pour verifier ql type de tag est cliqué 
        let tagType = 'Appareils';
        let appliancesDropdown = document.querySelector('#appliancesDropdown');
        let applianceListDiv = document.createElement('div');
        applianceListDiv.setAttribute('id', 'applianceDropdown-list');
        appliancesDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Appareils_options">';
        appliancesDropdown.appendChild(applianceListDiv);
        //ajouter la recherche dans dropdown ingredients
        let appSearch = document.getElementById('Appareils_options');
        //recherche dans la liste dropdown 
        appSearch.addEventListener('keyup', () => {
            this.searhInFilter('Appareils_options', 'appliancesDropdown')
        });
        appliacesList.forEach(appliance => {
            let newItem = document.createElement('a');
            newItem.innerText = `${appliance}`;
            applianceListDiv.appendChild(newItem);
        });
        /*
    
        /*gestion des tags*/
        let aList = applianceListDiv.getElementsByTagName('a');
        this.generateTags(aList, tagType);


        return appliancesDropdown;
    }
    generateFilterUstensilles(ustensillesList) {//, keywordField) {
        let tagType = 'ustensis';
        let ustensillesDropdown = document.querySelector('#ustensilsDropdown');
        let ustensillesListDiv = document.createElement('div');
        ustensillesListDiv.setAttribute('id', 'ustensillesDropdown-list');
        ustensillesDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Ustensils_options">';
        ustensillesDropdown.appendChild(ustensillesListDiv);
        //ajouter la recherche dans dropdown ingredients
        let ustSearch = document.getElementById('Ustensils_options');
        //recherche dans la liste dropdown 
        ustSearch.addEventListener('keyup', () => {
            this.searhInFilter('Ustensils_options', 'ustensilsDropdown')
        });
        ustensillesList.forEach(ustensilElement => {
            let newItem = document.createElement('a');
            newItem.innerText = `${ustensilElement}`;
            ustensillesListDiv.appendChild(newItem);
        })

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
        this.Tags.appliance = this.getListOfAppliance(tabResults);
        this.Tags.appliance = this.Tags.appliance.filter((item) => !this.selectedTags.appliance.includes(item));
        console.log('tags.appliance');
        console.log(this.Tags.appliance);
        /*ustensils*/
        this.Tags.ustensils = this.getListOfUstensils(tabResults);
        this.Tags.ustensils = this.Tags.ustensils.filter((item) => !this.selectedTags.ustensils.includes(item));
        console.log('tags.ustensils');
        console.log(this.Tags.ustensils);
        /*ingredients*/
        this.Tags.ingredients = this.getListOfIngredients(tabResults);

        this.Tags.ingredients = this.Tags.ingredients.filter((item) => !this.selectedTags.ingredients.includes(item));
        console.log('tags ingredients');
        console.log(this.Tags.ingredients);
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


        /*mise a jour des listes dropdown*/
        this.generateFilterappliances(this.Tags.appliance);
        this.generateFilterUstensilles(this.Tags.ustensils);
        this.generateFilterIngredient(this.Tags.ingredients);


    }
    /*Action de suppression suite au clique sur le tag  dans la liste (dropdown ) */
    removeTag(TabTags, Tag, TagType) {
        switch (TagType) {
            //supprimr le tag du tableau des tags selon son type 
            case 'ingredients':
                //supprime le tag de la liste correspendante a son type et laisser que  les elements qui sont different du tag
                TabTags.ingredients = TabTags.ingredients.filter((item) => ![Tag].includes(item));
                break;
            case 'Appareils':
                TabTags.appliance = TabTags.appliance.filter((item) => ![Tag].includes(item));
                break;
            default:
                TabTags.ustensils = TabTags.ustensils.filter((item) => ![Tag].includes(item));
        }

    }
    /*show dropdown ajouter la classe show a la liste des filtres*/
    /**
     * 
     * @param {String} buttonId 
     * @param {String} dropdownId 
     */
    showDropdown(buttonId, dropdownId) {
        let filterButton = document.querySelector(buttonId);
        //let arrowId=dropdownId+'id';

        filterButton.addEventListener('click', () => {
            /*this.showDropdown('#ingredient', 'ingredientDropdown');
      this.showDropdown('#Appareils', 'appliancesDropdown');
      this.showDropdown('#ustensils', 'ustensilsDropdown');*/
            switch (dropdownId) {
                case 'ingredientDropdown':
                    if (document.getElementById('appliancesDropdown').classList.contains('show')) 
                    { document.getElementById('appliancesDropdown').classList.replace('show', 'hide'); }
                    if (document.getElementById('ustensilsDropdown').classList.contains('show'))
                     { document.getElementById('ustensilsDropdown').classList.replace('show', 'hide'); }

                    break;
                case 'appliancesDropdown':
                    if (document.getElementById('ingredientDropdown').classList.contains('show'))
                     { document.getElementById('ingredientDropdown').classList.replace('show', 'hide'); }
                    if (document.getElementById('ustensilsDropdown').classList.contains('show'))
                     { document.getElementById('ustensilsDropdown').classList.replace('show', 'hide'); }

                    break;
                default:
                    if (document.getElementById('ingredientDropdown').classList.contains('show')) 
                    { document.getElementById('ingredientDropdown').classList.replace('show', 'hide');}
                    if (document.getElementById('appliancesDropdown').classList.contains('show'))
                     { document.getElementById('appliancesDropdown').classList.replace('show', 'hide'); }

            }
            if (document.getElementById(dropdownId).classList.contains('hide')) {
                document.getElementById(dropdownId).classList.replace('hide', 'show');
                console.log('hide');
            }
            else {
                //document.getElementById(dropdownId).classList.replace('hide', 'show');
                document.getElementById(dropdownId).classList.toggle('show');
                console.log('show');
            }
            //l'elemnt devient prioritaire
            document.getElementById(dropdownId).classList.add('prior');


        });


    }
    generateAllTags(tabResults) {
        /*remplissage des filtres*/

        /*ingredients*/
        this.Tags.ingredients = this.getListOfIngredients(tabResults);
        this.Tags.ingredients = this.Tags.ingredients.filter((item) => !this.selectedTags.ingredients.includes(item));
        this.Tags.ingredients.sort();
        //  console.log(this.Tags.ingredients);
        this.generateFilterIngredient(this.Tags.ingredients);


        /**appliances */

        this.Tags.appliance = this.getListOfAppliance(tabResults);
        this.Tags.appliance = this.Tags.appliance.filter((item) => !this.selectedTags.appliance.includes(item));
        this.Tags.appliance.sort();
        // console.log(this.Tags.appliance);

        this.generateFilterappliances(this.Tags.appliance);
        /*ustensils*/

        this.Tags.ustensils = this.getListOfUstensils(tabResults);
        this.Tags.ustensils = this.Tags.ustensils.filter((item) => !this.selectedTags.ustensils.includes(item));
        this.Tags.ustensils.sort();
        // console.log(this.Tags.ustensils);
        this.generateFilterUstensilles(this.Tags.ustensils);

    }

    /*generer les boutons tags*/
    generateTags(aList, tagType) {
        let tagsSection = document.querySelector('#generatedTags');
        let filteredTab = [];
        let close = document.createElement('i');
        //else si le mot clé a plus de 3 caracteres 
        Array.from(aList).forEach(a => { //on transforme la nodelist a un array 
            a.addEventListener('click', () => {

                //creation du tag
                let newTag = document.createElement('button');
                newTag.setAttribute('type', 'button');
                newTag.classList.add('btn', 'btn-primary', 'tag-button');
                //ajouter un id au tag
                let tagId = a.innerText;
                newTag.setAttribute('id', tagId);
                newTag.innerText = `${a.innerText}`;
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
                    filteredTab = this.searchByIngredients(this.searchResult, a.innerText);
                    //mettre a jour le tableau resultats
                    this.searchResult = filteredTab;
                    /*console.log('ingredient filtered tab');
                    console.log(filteredTab);*/
                    //mettre a jour le reste des listes 
                    this.updateTaglists(this.searchResult, tagType, newTag.innerText);
                } else if (tagType == 'Appareils') {
                    //recuperer le champs de recherche pour savoir si c'est vide

                    //ajouter une classe personnalisée
                    newTag.classList.add('appliance-tag');
                    tagsSection.appendChild(newTag);
                    filteredTab = this.searchByAppliance(this.searchResult, a.innerText);
                    this.searchResult = filteredTab;
                    this.updateTaglists(this.searchResult, tagType, newTag.innerText);

                } else {
                    //ajouter une classe personnalisée
                    newTag.classList.add('ustensil-tag');
                    tagsSection.appendChild(newTag);
                    filteredTab = this.searchByUstensils(this.searchResult, a.innerText);
                    this.searchResult = filteredTab;
                    this.updateTaglists(this.searchResult, tagType, newTag.innerText);

                }

                //Suppression du tag 

                //vider le contenu de la section 
                let recipiesSection = document.querySelector('.cards');
                recipiesSection.innerHTML = '';
                this.displayRecipies(filteredTab);

            });

        });
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

            console.log('je mets à jours après suppression');
            console.log(this.selectedTags);
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
         //mise a jour de la liste des recettes apres suppression de tous les tags
         let keyWords = document.getElementById('search-input').value;
         if(keyWords.length>=3){
            this.searchResult=this.searchBasic(keyWords, recipes);
         }else{
            this.searchResult=recipes;
         }
        
        //mise a jour du tableau de recettes en fonction des tags restants apres suppression
        this.selectedTags.ingredients.forEach(tagIngredient => {
            this.searchResult = this.searchByIngredients(this.searchResult, tagIngredient);
        });

        this.selectedTags.appliance.forEach(tagAppliance => {
            this.searchResult = this.searchByAppliance(this.searchResult, tagAppliance);
        });

        this.selectedTags.ustensils.forEach(tagUstensil => {
            this.searchResult = this.searchByUstensils(this.searchResult, tagUstensil);
        });

        //mise a jour
        this.generateAllTags(this.searchResult);
        this.displayRecipies(this.searchResult);
        console.log(this.searchResult);

    }
    /*lancer une recherche par clavier dans la liste des filtres*/
    searhInFilter(searchFiledId, dropdownId) {
        var keyword = document.getElementById(searchFiledId);
        let filter = keyword.value.toUpperCase();
        let dropdown = document.getElementById(dropdownId);
        let aList = dropdown.getElementsByTagName('a');
        Array.from(aList).forEach(a => {
            let txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                a.style.display = '';
            } else {
                a.style.display = 'none';
            }
        });

    }

    renderPage() {
        let searchField = document.getElementById('search-input');
        const recipiesSection = document.querySelector('.cards');
        let keyWords = '';

        /*initialiser le contenu de la page*/
        this.displayRecipies(this.searchResult);
        this.generateAllTags(this.searchResult);
        // this.searchResult = this.searchBasic(keyWords, this.searchResult);
        searchField.addEventListener('input', () => {
            keyWords = searchField.value;
            //console.log('the keywords' + keyWords);
            if (keyWords.length >= 3) {

                this.searchResult = this.searchBasic(keyWords, this.searchResult);
                if (this.searchResult.length > 0) {
                    recipiesSection.innerHTML = '';
                    this.displayRecipies(this.searchResult);
                }
                else {
                    recipiesSection.innerHTML = `<p class="not-found">« Aucune recette ne correspond à votre critère… <span class="keyword">${keyWords}!</span> </br>vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
                }
            } else {// si le chanmp contient moins de 3 caractères 
                if (keyWords.length != 0) {
                    recipiesSection.innerHTML = '<p class="not-found">votre mot clé doit contenir au moins 3 caractères</p>';
                } else {//si le champ est vide 
                    recipiesSection.innerHTML = '';
                    this.searchResult = recipes;
                    this.displayRecipies(this.searchResult);
                    this.generateAllTags(this.searchResult);
                    document.querySelector('#generatedTags').innerHTML = '';

                }
            }


        });

        /*ajouter la classe show au differents filtres dropdown"*/
        this.showDropdown('#ingredient', 'ingredientDropdown');
        this.showDropdown('#Appareils', 'appliancesDropdown');
        this.showDropdown('#ustensils', 'ustensilsDropdown');


    }
}
let newPage = new index();
newPage.renderPage();



