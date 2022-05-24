/*une page piur gerer le js de la page accueil*/
import recipes from "../../data/recipes.js"
import recipeCardFactory from "../factories/recipeCardFactory.js";

export default class index {
    constructor() {
        this.recipies = recipes;
    }


    getListOfIngredients(tabRecipe) {
        let recipeResult = [];
        for (let i = 0; i < tabRecipe.length; i++) {
            for (let j = 0; j < tabRecipe[i].ingredients.length; j++) {
                recipeResult.push(tabRecipe[i].ingredients[j].ingredient);
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
    searchBasic(keyWords) {
        let keyWordsArray = keyWords.split(' ');
        let recipeResult = [];
        for (let i = 0; i < keyWordsArray.length; i++) {
            if (keyWordsArray[i].length >= 3) {
                this.recipies.forEach(recipe => {
                    let currentIngredients = [];
                    if (recipe.name.toLowerCase().includes(keyWordsArray[i].toLowerCase()) || (recipe.description.toLowerCase().includes(keyWordsArray[i].toLowerCase()))||this.searchInIngredients(keyWordsArray[i],recipe.ingredients))
                        recipeResult.push(recipe);

                });

                /*search in ingredients*/


            }
        }
        console.log(recipeResult)

        return recipeResult;

    }


    /*rechrcher dans les ingredients*/
    searchInIngredients(keyWord,ingredientsTab) {
        let exist=false;
        ingredientsTab.forEach(ingredient=>{
        if(ingredient.ingredient.toLowerCase().includes(keyWord.toLowerCase())){
            exist=true;
        }

        });
        return exist;


    }
       /* let tabRecipe = this.recipes;
        let keyWordsArray = keyWords.split(' ');
        let ingredientTab = [];
        recipe.ingredients.forEach(ingredient=>
                   {  
                        if (ingredient.toLowerCase().includes(keyWordsArray[i].toLowerCase())) {
                            recipeResult.push(ingredientTab);
                        }
                    });
          

        return recipeResult;

    }*/
    getResults() {
        var tabResults = [];
        /*recupereer le bouton search*/
        //let searchButton = document.querySelector("#search-btn");
        let searchField = document.getElementById('search-input');
        const recipiesSection = document.querySelector('.cards');
        let keyWords = "";
        console.log("the keywords" + keyWords);
        searchField.addEventListener('input', () => {

            keyWords = searchField.value;
            console.log(keyWords);
            tabResults = this.searchBasic(keyWords);

            if (tabResults.length > 0) {
                recipiesSection.innerHTML = '';
                this.displayRecipies(tabResults);
            }
            else {
                recipiesSection.innerHTML = `<p class="not-found">« Aucune recette ne correspond à votre critère… <span class="keyword">${keyWords}!</span> </br>vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
            }
            //console.log('Resultats de recherche par titre description et ingrédients pour:' + keyWords);
            //console.log(tabResults);
        });

        //afficher les ingredients selon le resultat apres une recherche keyword
        let ingredientsButton = document.querySelector(".dropbtn");
        ingredientsButton.addEventListener("click", () => {
            let ingList = this.getListOfIngredients(tabResults);
            console.log(ingList);

        });
        /*
        let ustensilsButton = document.querySelector("#ustensils");
        ustensilsButton.addEventListener("click", () => {
            let ingList = recipeInstance.getListOfUstensils(tabResults);
            console.log(ingList);

        });
        let applianceButton = document.querySelector("#Appareils");
        applianceButton.addEventListener("click", () => {
            let ingList = recipeInstance.getListOfAppliance(tabResults);
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



    renderPage() {
        // alert("new index");
        let tabResults = this.getResults();
        let titres = this.recipies.map(recipie => recipie.name);
        let ingredientsArray = this.recipies.map(recipie => recipie.ingredients);
        console.log(titres);
        //on veut recuperer les ingredients selon le mot clé 
        let searched = "coco";
       let titlesResult=titres.filter(titre=> titre.toLowerCase().includes(searched.toLowerCase()));
       console.log("les bons titres");
       console.log(titlesResult);


        //sort titles
        /*
        console.log ('sorted by name');
        console.log(titres);*/

    }


}

let newPage = new index();
newPage.renderPage();



