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
                //let recipeResult=this.recipies.filter(recipe=>recipe.name.toLowerCase().includes(keyWordsArray[i].toLowerCase()) || (recipe.description.toLowerCase().includes(keyWordsArray[i].toLowerCase())) || this.searchInIngredients(keyWordsArray[i], recipe.ingredients));
                tabRecepies.forEach(recipe => {
                    /*try to use filter*/
                    if (recipe.name.toLowerCase().includes(keyWordsArray[i].toLowerCase()) || (recipe.description.toLowerCase().includes(keyWordsArray[i].toLowerCase())) || this.searchInIngredients(keyWordsArray[i], recipe.ingredients))
                        recipeResult.push(recipe);

                });

            }
        }
        // console.log(recipeResult)
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
                if (ingredient.ingredient.toLowerCase() == ingredientTag.toLowerCase()) { // a remplacer par un array.filter
                    filteredTab.push(recipie);
                }
            });

        });
        return filteredTab;

    }

    searchByAppliance(recipieTab, applianceTag) {
        let filteredTab = [];
        recipieTab.forEach(recipe => {
            if (recipe.appliance.toLowerCase() == applianceTag.toLowerCase()) {//a remplacer par array.filter
                filteredTab.push(recipe);
            }

        });

        return filteredTab;
    }
    searchByUstensils(recipieTab, ustensilTag) {
        let filteredTab = [];
        recipieTab.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                if (ustensil.toLowerCase() == ustensilTag.toLowerCase()) { //a remplacer par array.filter
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

        //recipeResult = recipeResult.filter((value, index) => recipeResult.indexOf(value) === index);
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

        recipeResult = [...new Set(recipeResult)];//Sets are a new object type with ES6 (ES2015) that allows you to create collections of unique values.

        return recipeResult;
    }
    getListOfAppliance(tabRecipe) {
        let recipeResult = [];
        tabRecipe.forEach(recipie => {
            recipeResult.push(recipie.appliance);

        });

        /**eleminer les doublants*/

        //recipeResult = recipeResult.filter((value, index) => recipeResult.indexOf(value) === index);
        recipeResult = [...new Set(recipeResult)];//Sets are a new object type with ES6 (ES2015) that allows you to create collections of unique values.
        //console.log('new recipie result after set appliance');
        // console.log(recipeResult);
        return recipeResult;
    }


    displayRecipies(tabRecipie) {

        const recipiesSection = document.querySelector('.cards');
        tabRecipie.forEach(recipe => {
            const recipeCrd = new recipeCardFactory(recipe);
            const newCard = recipeCrd.getrecipeDom();
            // recipiesSconstection.removeChild(recipiesSection.firstChild);
            recipiesSection.appendChild(newCard);

        });



        return recipiesSection;
    }

    /*generer les dropdowns listes des differents filtres */
    generateFilterIngredient(ingredientsList) {
        let IngredientsDropdown = document.querySelector('#ingredientDropdown');
        //pour verifier ql type de tag est cliqué 
        let tagType = 'ingredients';
        IngredientsDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Ingredients_search">';
        let ingSearch = document.getElementById('Ingredients_search');
        ingSearch.addEventListener('keyup', () => {
            this.searhInFilter('Ingredients_search', 'ingredientDropdown')
        });
        ingredientsList.forEach(ingredient => {
            let newItem = document.createElement('a');
            newItem.innerText = `${ingredient}`;
            IngredientsDropdown.appendChild(newItem);
        }
        );
        /*gestion des tags*/
        let aList = IngredientsDropdown.getElementsByTagName('a');
        this.generateTags(aList, tagType);


        return IngredientsDropdown;
    }
    generateFilterappliances(appliacesList) {//, keywordField) {
        //pour verifier ql type de tag est cliqué 
        let tagType = 'Appareils';
        let appliancesDropdown = document.querySelector('#appliancesDropdown');
        appliancesDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Appareils_options">';
        //ajouter la recherche dans dropdown ingredients
        let appSearch = document.getElementById('Appareils_options');
        appSearch.addEventListener('keyup', () => {
            this.searhInFilter('Appareils_options', 'appliancesDropdown')
        });
        appliacesList.forEach(appliance => {
            let newItem = document.createElement('a');
            newItem.innerText = `${appliance}`;
            appliancesDropdown.appendChild(newItem);
        });
        /*
    
        /*gestion des tags*/
        let aList = appliancesDropdown.getElementsByTagName('a');
        this.generateTags(aList, tagType);


        return appliancesDropdown;
    }
    generateFilterUstensilles(ustensillesList) {//, keywordField) {
        let tagType = 'ustensis';
        let ustensillesDropdown = document.querySelector('#ustensilsDropdown');
        ustensillesDropdown.innerHTML = ' <input type="search" placeholder="Rechercher.." id="Ustensils_options">';
        //ajouter la recherche dans dropdown ingredients
        let ustSearch = document.getElementById('Ustensils_options');
        ustSearch.addEventListener('keyup', () => {
            this.searhInFilter('Ustensils_options', 'ustensilsDropdown')
        });
        ustensillesList.forEach(ustensilElement => {
            let newItem = document.createElement('a');
            newItem.innerText = `${ustensilElement}`;
            ustensillesDropdown.appendChild(newItem);
        })

        /*gestion des tags*/
        let aList = ustensillesDropdown.getElementsByTagName('a');
        this.generateTags(aList, tagType);

        return ustensillesDropdown;
    }

    /*faire la mise à jour des tags selon les résultats*/
    /**
     * 
     * @param {Array} tabResults 
     */
    updateTaglists(tabResults, tagType, Tag) {
        /*  this.selectedTags.appliance = this.selectedTags.appliance.filter((item) => ![tagId].includes(item))
                        this.Tags.appliance.push(tagId);
        */
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
     
        this.Tags.ingredients =  this.Tags.ingredients.filter((item) => !this.selectedTags.ingredients.includes(item));
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



        this.generateFilterappliances(this.Tags.appliance);//, keyWords);
        this.generateFilterUstensilles(this.Tags.ustensils);//, keyWords);
        this.generateFilterIngredient(this.Tags.ingredients);//, keyWords);

        console.log('selected tags are');
        console.log(this.selectedTags);

    }
    /*Action de suppression suite au clique sur le tag  dans la liste (dropdown ) */
    removeTag(TabTags, Tag, TagType) {
        switch (TagType) {
            //supprimr le tag du tableau des tags selon son type 
            case 'ingredients':
                /* this.selectedTags.appliance = this.selectedTags.appliance.filter((item) => ![tagId].includes(item))*/

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
        filterButton.addEventListener('click', () => {
            document.getElementById(dropdownId).classList.toggle('show');

        });


    }
    generateAllTags(tabResults) {
        /*remplissage des filtres*/

        /*ingredients*/
        this.Tags.ingredients = this.getListOfIngredients(tabResults);
        this.Tags.ingredients = this.Tags.ingredients.filter((item) => !this.selectedTags.ingredients.includes(item));
        this.Tags.ingredients.sort();
        console.log(this.Tags.ingredients);
        this.generateFilterIngredient(this.Tags.ingredients);


        /**appliances */

        this.Tags.appliance = this.getListOfAppliance(tabResults);
        this.Tags.appliance = this.Tags.appliance.filter((item) => !this.selectedTags.appliance.includes(item));
        this.Tags.appliance.sort();
        console.log(this.Tags.appliance);

        this.generateFilterappliances(this.Tags.appliance);
        /*ustensils*/

        this.Tags.ustensils = this.getListOfUstensils(tabResults);
        this.Tags.ustensils = this.Tags.ustensils.filter((item) => !this.selectedTags.ustensils.includes(item));
        this.Tags.ustensils.sort();
        console.log(this.Tags.ustensils);
        this.generateFilterUstensilles(this.Tags.ustensils);

    }

    /*generer les boutons tags*/
    generateTags(aList, tagType) {
        let tagsSection = document.querySelector('#generatedTags');
        let filteredTab = [];
        let close = document.createElement('i');
        //else si le mot clé a plus de 3 caracteres 
        Array.from(aList).forEach(a => {
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
                    console.log('ingredient filtered tab');
                    console.log(filteredTab);
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
                    //recuperer le champs de recherche pour savoir si c'est vide

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
        // alert(document.getElementById(tagId).classList);//.contains("ingrediant-tag")) ;
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
        this.searchResult = recipes;
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




    }
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

        //let searchButton = document.querySelector("#search-btn");
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
                    recipiesSection.innerHTML ='';
                    this.searchResult = recipes;
                    this.displayRecipies(this.searchResult);
                    this.generateAllTags(this.searchResult);
                    document.querySelector('#generatedTags').innerHTML = '';

                }
            }
            /*Remplir les dropdown des filtres*/
            /*ingredients*/

            /*generateAlltags*/
            /*  let ingList = this.getListOfIngredients(this.searchResult);
              let appliacesList=this.getListOfAppliance(this.searchResult);
              console.log(ingList);
              this.generateFilterIngredient(ingList, keyWords);
              this.generateFilterappliances(appliacesList, keyWords);*/
        });

        /*ajouter la classe show au differents filtres dropdown"*/
        this.showDropdown('#ingredient', 'ingredientDropdown');
        this.showDropdown('#Appareils', 'appliancesDropdown');
        this.showDropdown('#ustensils', 'ustensilsDropdown');
        /* let searchInput=document.querySelector('#Ingredients_search');
         searchInput.addEventListener("keyup", this.filterIngredients());*/

    }



}
let newPage = new index();
newPage.renderPage();



