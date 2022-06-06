import ingredientsFactory from './ingredientsFactory.js';
export default class recipeCardFactory {

  /**@property {array of recepies} data */
  constructor(data) {
    this._data = data;

  }
  /* creer le dom des recette*/
  /**@param {object array} ingredientTab */

  getIngredients(ingredientTab) {

    let ingredientsList = document.createElement('ul');
    ingredientsList.classList.add('.ingredients-list');
    for (let i = 0; i < ingredientTab.length; i++) {
      const ingredientF = new ingredientsFactory(ingredientTab[i]);
      ingredientsList.appendChild(ingredientF.getIngredientsLi());

    }

    return ingredientsList.innerHTML;

  }

  getrecipeDom() {

    // eslint-disable-next-line no-unused-vars
    const { id, name, ingredients, time, description, appliance, ustensils } = this._data;///--->nouveau;
    const card = document.createElement('div');
    card.classList.add('card', 'col-lg-3', 'col-md-9', 'recipe', 'col-xs-12');
    card.innerHTML = `
      <div class="card-image-div">
      <img class="card-image" src="./images/cardimage.png" alt="${name}">
      </div>
      <div class="card-body">
        <h5 class="d-flex flex-row bd-highlight mb-2 justify-content-between card-title ">${name} 
        <div class="time"><i class="fa fa-clock"></i>${time} <span><strong> min</strong><span></div></h5>
        <div class="recipe-content">
          <div class="card-text ingredients">
           <ul class="ingredients-list"> ${this.getIngredients(ingredients)}</ul>
          </div>
          <p class="card-text description">${description}</p>
        </div>
      </div>
        `;

    return card;


  }
}
