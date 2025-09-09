// console.log("Js file is connected");

//categories get

const loadCate = () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    showLoader();
    fetch(url)
        .then(res => res.json())
        .then(value => {
            hideLoader()
            displayCate(value.categories)
        });
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
    getCategoriesTree(id);
    // console.log(tr.innerText);
}
const allT = (id) => {
    removeSelect();
    const tr = document.getElementById(id);
    tr.classList.add("setColor");
    allPlants();
    // console.log(tr.innerText);
}

//Get all tree
const allPlants = () => {
    const allUrl = "https://openapi.programming-hero.com/api/plants";
    showLoader();
    fetch(allUrl)
        .then(resAll => resAll.json())
        .then(allData => {
            hideLoader()
            displayAllPlants(allData.plants)
        });
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
        <img class="w-full h-44 object-cover rounded-lg" src="${element.image}" alt="">
        <p onclick="getModal(${element.id})">${element.name}</p>
        <p onclick="getModal(${element.id})" class="text-xs font-light">${element.description}</p>
        <div class="flex justify-between mt-4">
        <p onclick="getModal(${element.id})" class="rounded-full p-2 bg-green-400 text-center text-green-800 text-sm">${element.category}</p> 
        <p class="text-center"> ${element.price}</p> 
        </div>
        <button class="w-full bg-green-700 hover:bg-green-400 text-white text-center
         place-items-end font-normal rounded-full py-3 px-5 mt-6"  onclick = "addCard('${element.name}',${element.price})" >Add to Cart</button>
        `

        parentTree.appendChild(childTree);
    })
}
// Get tree by there Categories

const getCategoriesTree = (id) => {
    url = `https://openapi.programming-hero.com/api/category/${id}`
    showLoader()
    fetch(url)
        .then(res => res.json())
        .then(data => {
            hideLoader()
            displayCateItem(data.plants)
        });
}

const displayCateItem = (catePlant) => {
    // console.log("hello to get categories");
    // console.log(catePlant);
    const parentTree = document.getElementById("treeInfo")
    parentTree.innerHTML = "";
    catePlant.forEach(element => {
        // console.log(element);
        const childTree = document.createElement("div");
        childTree.classList.add("allTreeInfo")

        childTree.innerHTML =
            `
        <img class="w-full h-44 object-cover rounded-lg" src="${element.image}" alt="">
        <p onclick="getModal(${element.id})>${element.name}</p>
        <p onclick="getModal(${element.id}) class="text-xs font-light">${element.description}</p>
        <div class="flex justify-between mt-4">
        <p onclick="getModal(${element.id}) class="rounded-full p-2 bg-green-400 text-center text-green-800 text-sm">${element.category}</p> 
        <p class="text-center"> ${element.price}</p> 
        </div>
        <button class="w-full bg-green-700 hover:bg-green-400 text-white text-center
         place-items-end font-normal rounded-full py-3 px-5 mt-6"  onclick = "addCard('${element.name}',${element.price})" >Add to Cart</button>
        `

        parentTree.appendChild(childTree);
    })
}


//call all plants
allPlants();

//Your card

const card = document.getElementById("card");
let total = 0; // running total

const addCard = (name, price) => {
    // Create card item
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("cardCss");
    cardDiv.innerHTML = `
        <div>
            <p>${name}</p> 
            <p>${price}</p>
        </div>
        <p class="removeBtn"><i class="fa-solid fa-xmark"></i></p>
    `;

    cardDiv.querySelector(".removeBtn").addEventListener("click", () => {
        total = total - price;
        updateTotal();
        cardDiv.remove();
    });

    total = total + price;
    updateTotal();
    card.appendChild(cardDiv);
};

const pricePart = document.getElementById("addPrice");
const totalPrice = document.createElement("div");
totalPrice.classList.add("totalCss");
totalPrice.innerHTML = `
    <p>Total:</p>
    <p id="totalValue">0</p>
`;
pricePart.appendChild(totalPrice);

function updateTotal() {
    document.getElementById("totalValue").innerText = total;
}

//Modal information
const findModalInfo = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayModalInfo(data.plants))
}

const displayModalInfo = (catePlant) => {

    // console.log(catePlant)
    const childTree = document.getElementById("setModelInfo");
    childTree.innerHTML =
        `
        <img class="w-full h-52 object-cover rounded-lg" src="${catePlant.image}" alt="">
        <p >${catePlant.name}</p>
        <div class="flex justify-between mt-4">
        <p class="rounded-full p-2 bg-green-400 text-center text-green-800 text-sm">${catePlant.category}</p> 
        <p class="text-center"> ${catePlant.price}</p> 
        </div>
        <p class="text-xl font-light">${catePlant.description}</p>
        `
    document.getElementById("my_modal_5").showModal();
}

const getModal = (id) => {
    findModalInfo(id);
}

//Make loading function
function showLoader() {
    const parentTree = document.getElementById("treeInfo");
    parentTree.innerHTML = `
        <div class="col-span-3 text-center">
        <span class="loading loading-dots loading-sm"></span>
        <span class="loading loading-dots loading-md"></span>
        </div>
    `;
}

function hideLoader() {
    const parentTree = document.getElementById("treeInfo");
    parentTree.innerHTML = "";
}
