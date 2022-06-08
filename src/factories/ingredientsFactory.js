export default class ingredientsFactory {


    constructor(ingredientsTab) {
        this._ingredientsTab = ingredientsTab;

    }
    /*lister les ingredients d'une recette*/
    getIngredientsLi() {

        const { ingredient, quantity, unit } = this._ingredientsTab;
        let liIngredients = document.createElement('li');
        if ('unit' in this._ingredientsTab) {
            liIngredients.innerHTML = `<strong>${ingredient}: </strong><span>  ${quantity}${unit}</span>`;
        } else {
            liIngredients.innerHTML = `<strong>${ingredient}: </strong>  <span>${quantity}</span>`;

        }

        return liIngredients;


    }
}
