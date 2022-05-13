/* eslint-disable no-unused-vars */
export default class api{
    constructor(url){

        this._url = url;
    }
    async getAllRecipies(){
        let response = await fetch(this._url);
        const recipies = await response.json(); //recuperer les data dans un array
        console.log('le tableau de recttes:' + recipies);
      
        return {
            recipies
        }
    }

}




