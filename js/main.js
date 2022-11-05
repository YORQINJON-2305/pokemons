const weaknesses = [];

const elCardItem = document.querySelector(".card-list");

// get control form
const elForm = document.querySelector(".control-form");
const elSearchInput = elForm.querySelector(".search-input");
const elSearchSelect = elForm.querySelector(".sort-select");
const elWeaknessesSelect = elForm.querySelector(".weaknesses-select");
const elFromCandyInput = elForm.querySelector(".from-candy-input");
const elToCandyInput = elForm.querySelector(".to-candy-input");


const slicePokemon = pokemons.slice(0, 148);
const tempFragment = document.querySelector(".frag-temp").content;
const pokeFragment = document.createDocumentFragment();

function renderPokemon(pokemon, regex = ""){
    elCardItem.innerHTML = ""
    pokemon.forEach(item => {
        const tempFragmentClone = tempFragment.cloneNode(true);

        tempFragmentClone.querySelector(".badge").textContent = item.num;
        if(regex.source != "(?:)" && regex){
          tempFragmentClone.querySelector(".title").innerHTML = item.name.replace(regex, `<mark class="bg-warning">${regex.source.toLowerCase()}</mark>`);
        }  else {
          tempFragmentClone.querySelector(".title").textContent = item.name;
        }
        tempFragmentClone.querySelector(".poke-img").src = item.img;
        tempFragmentClone.querySelector(".poke-img").alt = item.name;
        tempFragmentClone.querySelector(".time-wrap").textContent = item.spawn_time;
        tempFragmentClone.querySelector(".subtitle").textContent = item.candy;
        tempFragmentClone.querySelector(".candy-text").textContent = item.candy_count;
        tempFragmentClone.querySelector(".weight-text").textContent = item.weight;
        tempFragmentClone.querySelector(".weaknesses-text").textContent = item.weaknesses.join(", ");

        pokeFragment.appendChild(tempFragmentClone);
    });

    elCardItem.appendChild(pokeFragment);
}

elForm.addEventListener("submit", searchPokemon);

function searchPokemon(evt){
    evt.preventDefault();
    const searchInputValue = elSearchInput.value.trim();
    const regex = new RegExp(searchInputValue, "gi");

    const sortSelectValue = elSearchSelect.value;
    sortFunction(pokemons, sortSelectValue);

    const searchPokemon = pokemons.filter(item => item.name.match(regex) && (elWeaknessesSelect.value === "all" || item.weaknesses.includes(elWeaknessesSelect.value)) && (elFromCandyInput.value == "" || item.candy_count >= Number(elFromCandyInput.value)) && (elToCandyInput.value == "" || item.candy_count <= Number(elToCandyInput.value)));
          if(searchPokemon.length > 0){
              renderPokemon(searchPokemon, regex);
          } else {
              elCardItem.innerHTML = "Not found !!!"
          }
}

function getUniqueWeakness(){
    pokemons.forEach(item => {
        item.weaknesses.forEach(weak => {
           if(!weaknesses.includes(weak)){
               weaknesses.push(weak);
           }
        })
    })
};

function renderWeakness(){
    const newFragment = new DocumentFragment();
    weaknesses.forEach(item => {
    const newOption = document.createElement("option");
    newOption.textContent = item;
    newOption.value = item;

    newFragment.appendChild(newOption);
    });
    elWeaknessesSelect.appendChild(newFragment)
}


function sortFunction(elements, select){
    if(select === "a-z"){
        elements.sort((a, b) => {
            if(a.name > b.name){
                return 1
            }  else if(a.name < b.name){
                return -1;
            } else {
                return 0;
            }

        });
    }
    if(select === "z-a"){
        elements.sort((a, b) => {
            if(a.name > b.name){
                return -1
            }  else if(a.name < b.name){
                return 1;
            } else {
                return 0;
            }

        });
    }
    if(select === "light") {
        elements.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight))
    }
    if(select === "weight") {
        elements.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight))
    }
}


getUniqueWeakness();
renderWeakness();
renderPokemon(slicePokemon);