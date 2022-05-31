/* When the user clicks on the button,
/*toggle between hiding and showing the dropdown content */
let filterButtonIngredients=document.querySelector("#ingredient");
let filterButtonApp=document.querySelector("#Appareils");
let filterButtonUst=document.querySelector("#ustensils");

let ingredientSearch=document.querySelector("#Ingredients_search");
let appareilsSearch=document.querySelector("#Appareils_options");
let ustSearch=document.querySelector("#Ustensils_options");


filterButtonIngredients.addEventListener("click",()=>{
  document.getElementById("ingredientDropdown").classList.toggle("show");
  
});
filterButtonApp.addEventListener("click",()=>{
  document.getElementById("appliancesDropdown").classList.toggle("show");
  
});
filterButtonUst.addEventListener("click",()=>{
  document.getElementById("ustensilsDropdown").classList.toggle("show");
  
});

ingredientSearch.addEventListener("keyup",filterIngredients());
appareilsSearch.addEventListener("keyup",filterAppareils());

function filterIngredients(){
  var input, filter,a, i;
  input = document.getElementById("Ingredients_search");
  filter = input.value.toUpperCase();
  div = document.getElementById("ingredientDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function filterAppareils(){
  var input, filter, a, i;
  input = document.getElementById("Appareils_options");
  filter = input.value.toUpperCase();
  div = document.getElementById("appliancesDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}




//export default {myFunction,filterFunction};