const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
  .then((res) => res.json())
  .then((data) => displayCategories(data.categories))
  .catch((error) => console.error(error))
};

const displayCategories = (item) => {
  const categoryContainer = document.getElementById("category-section");
  item.forEach( (items) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button onclick="petSelector('${items.category}')" class="btn btn-xl rounded-lg px-20"><img class="h-8" src="${items.category_icon}" alt="" /> ${items.category}</button>
    `;

    categoryContainer.append(div);
  })
};

const petSelector = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
  .then((res) => res.json())
  .then((data) => petData(data.data))
  .catch((error) => console.error(error))
};

const petData = (kit) => {
  kit.forEach((kits) => {
    console.log(kits)
  })
}


const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
  .then((res) => res.json())
  .then((data) => displayData(data.pets))
  .catch((error) => console.error(error))
};

const displayData = (animal) => {
  const dataContainer = document.getElementById("cards");
  animal.forEach((animals) => {
    const div = document.createElement("div");
    
    div.innerHTML = `
    
    <div class="card bg-base-100 shadow-sm">
  <figure class="px-5 pt-5 ">
    <img
      src="${animals.image}"
      alt="Shoes"
      class="rounded-xl w-full h-[200px] object-cover" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${animals.pet_name}</h2>
    <p class = "flex gap-2"><img class="h-5 items-center" src="https://img.icons8.com/?size=100&id=mluT7pyF3sD3&format=png&color=000000" />Breed: ${animals.breed}</p>
    <p class = "flex gap-2"><img class="h-5 items-center" src="https://img.icons8.com/?size=100&id=GlEOr5x0aJpH&format=png&color=000000" />Birth: ${animals.date_of_birth}</p>
    <p class = "flex gap-2"><img class="h-5 items-center" src="https://img.icons8.com/?size=100&id=1665&format=png&color=000000" />Gender: ${animals.gender}</p>
    <p class = "flex gap-2"><img class="h-5 items-center" src="https://img.icons8.com/?size=100&id=7172&format=png&color=000000" />Price: ${animals.price}</p>
    

    <div class="card-actions">
      <button onclick = "pushImage('${animals.image}') " class="btn "><img class="h-6" src="https://img.icons8.com/?size=100&id=24816&format=png&color=000000" alt="like" /></button>
      <button class="btn rounded-lg hover:bg-[#0E7A81] hover:text-white  text-[#0E7A81] font-bold">Adopt</button>
      <button class="btn rounded-lg hover:bg-[#0E7A81] hover:text-white  text-[#0E7A81] font-bold">Details</button>
    </div>
  </div>
</div>
    `;
    dataContainer.append(div);
  })
};


const pushImage = (image) => {
  const box = document.getElementById("storeData");
  const div = document.createElement("div");
  div.innerHTML =`
  <img
      src="${image}"
      alt="pet"
      class="rounded-xl w-full h-[200px] object-cover p-4" />
  `;
  box.appendChild(div);

};



loadData();
loadCategories();
petSelector();