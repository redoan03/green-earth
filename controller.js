// console.log("Js file is connected");

//categories Calling

const loadCate = () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
        .then(res => res.json())
        .then(value => displayCate(value.categories));
}

const displayCate = (data) => {
    // console.log(data);
    const cateParent = document.getElementById("categories");
    cateParent.innerHTML =
        `  <p>Categories</p>
     <p id ="all" class="mt-1 allTree max-w-48 rounded-lg p-2 hover:bg-green-400" onclick =allT("all") >All tree</p>
    `;
    data.forEach(element => {
        const cateChild = document.createElement('div');

        cateChild.innerHTML =
            `    
        <p class="mt-1 allTree max-w-48 rounded-lg p-2 hover:bg-green-400" id="treeId${element.id}"
         onclick =nameClick(${element.id}) > ${element.category_name}</p>
        `
        cateParent.appendChild(cateChild);

    });
}

//Categories call
loadCate()

const removeSelect = () => {
    const selectOption = document.querySelectorAll(".allTree");
    // console.log(selectOption);
    selectOption.forEach((btn) => btn.classList.remove("setColor"));
};

//Tree name click control
const nameClick = (id) => {
    removeSelect();
    const tr = document.getElementById(`treeId${id}`);
    tr.classList.add("setColor");
    // console.log(tr.innerText);
}
const allT = (id) => {
    removeSelect();
    const tr = document.getElementById(id);
    tr.classList.add("setColor");
    // console.log(tr.innerText);
}

//Trees Info

//get all plants

/*
category
: 
"Fruit Tree"
description
: 
"A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals."
id
: 
1
image
: 
"https://i.ibb.co.com/cSQdg7tf/mango-min.jpg"
name
: 
"Mango Tree"
price
: 
500 
*/

const allPlants = () => {
    const allUrl = "https://openapi.programming-hero.com/api/plants";

    fetch(allUrl)
        .then(resAll => resAll.json())
        .then(allData => displayAllPlants(allData.plants));
}

// displayAll Plants

const displayAllPlants = (plants) => {
    const parentTree = document.getElementById("treeInfo")
    // console.log(parentTree.innerText)
    parentTree.innerHTML = "";

    plants.forEach(element => {
        // console.log(element);
        const childTree = document.createElement("div");
        childTree.classList.add("allTreeInfo")

        childTree.innerHTML =
            `
        <img class="w-full max-h-44 rounded-lg" src="${element.image}" alt="">
        <p>${element.name}</p>
        <p class="text-xs font-light">${element.description}</p>
        <div class="flex justify-between gap-2 mt-4">
        <p class="rounded-full py-2 px-4 bg-green-400 text-center text-green-800">${element.category}</p> 
        <p class="text-center mt-1"> ${element.price}</p> 
        </div>
        <button class="w-full bg-green-700 hover:bg-green-400 text-white text-center place-items-end font-normal rounded-full py-3 px-5 mt-6">Add to Cart</button>
        `

        parentTree.appendChild(childTree);
    })
}

//call all plants
allPlants();




