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
        `  
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




