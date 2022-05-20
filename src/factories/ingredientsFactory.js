export default class ingredientsFactory {


    constructor(ingredientsTab) {
        this._ingredientsTab = ingredientsTab;

    }
    getIngredientsLi() {

        const { ingredient, quantity, unit } = this._ingredientsTab;
        let liIngredients = document.createElement("li");
        if ('unit' in this._ingredientsTab) 
        {
            liIngredients.innerHTML = `<strong>${ingredient}: </strong> ${quantity}${unit}`;
        }else{
            liIngredients.innerHTML = `<strong>${ingredient}: </strong> ${quantity}`;

        }

        return liIngredients;


    }
}