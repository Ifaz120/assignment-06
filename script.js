let allPets = [];
// formation of data to avoid the parts where the info wont be available 
const formatData = (data) => {
  return data === null || data === undefined || data === "" ? "No Information" : data ;
};

document.getElementById("sort-btn").addEventListener("click", function(){

  const sortedPets = [...allPets].sort((a,b) => {
    return parseFloat(b.price) - parseFloat(a.price);
  });
  displayData(sortedPets);
});

document.getElementById("view-more-button").addEventListener("click", function () {
  const target = document.getElementById("adopt-title");
  target.scrollIntoView({behavior : "smooth"})
});

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
    <button id="btn-${items.category}" onclick="petSelector('${items.category}')" class="btn btn-xl py-6 px-20 category-btn "><img class="h-8 w-8"  src="${items.category_icon}" alt="" /> ${items.category}</button>
    `;

    categoryContainer.append(div);
  })
};

const removeActiveBtn = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for( let btns of buttons) {
    btns.classList.remove("bg-[#c0e5e9]","border-cyan-500" ,"bg-opacity-10", "rounded-full");
  }
};

const petSelector = (id) => {
  const spinnerContainer = document.getElementById("card-loading");
  const dataContainer = document.getElementById("cards");
  const box = document.getElementById("storeData");
      spinnerContainer.classList.remove("hidden");
      dataContainer.classList.add("hidden");
      box.classList.add("hidden");

  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
  .then((res) => res.json())
  .then((data) => {
    removeActiveBtn();
    const activeBtn = document.getElementById(`btn-${id}`);
    activeBtn.classList.add("bg-[#c0e5e9]","bg-opacity-10" , "border-cyan-500", "rounded-full");
    allPets = data.data;
    setTimeout(()=> {
      spinnerContainer.classList.add("hidden");
      dataContainer.classList.remove("hidden");
      box.classList.remove("hidden");
    },2000);
    displayData(allPets);
  })
  .catch((error) => console.error(error))
  
};

const petData = (kit) => {
  kit.forEach((kits) => {
    console.log(kits)
  })
};


const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
  .then((res) => res.json())
  .then((data) => {
    allPets = data.pets;
    displayData(allPets)
  })
  .catch((error) => console.error(error))
};

const loadDetails = async (petId) => {
  console.log(petId);
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.petData);
};

const congratsDetails = (newCongrats) => {
  const congratsContainer = document.getElementById("congrats-content");
  document.getElementById("congratsModal").showModal();
  ;
  let seconds = 4;
  const changer = document.getElementById("countdown");
  
  const interval = setInterval(() =>{
   seconds--;
   changer.textContent = seconds;
  
   if(seconds === 1){
     clearInterval(interval);
     document.getElementById("congratsModal").close();
    }
    
  },1000 );
  changer.textContent = 3;
}


const displayDetails = (fullDetails) => {
  console.log(fullDetails);
  const detailsContainer = document.getElementById("details-content");
  document.getElementById("customModal").showModal();
  detailsContainer.innerHTML = `
  <div class="card bg-base-100">
  <img
    src="${fullDetails.image}"
    alt="pet"
    class="rounded-xl" />
  </figure>
  <h2 class=" my-4 font-bold text-xl">${formatData(fullDetails.pet_name)}</h2>
  <div class=" grid grid-cols-2 gap-2">
    <p class = "flex gap-2 text-sm"><img text-gray class="h-5 items-center" src="https://img.icons8.com/?size=100&id=mluT7pyF3sD3&format=png&color=000000" />Breed: ${formatData(fullDetails.breed)}</p>
    <p class = "flex gap-2 text-sm"><img class="h-5 items-center" src="https://img.icons8.com/?size=100&id=GlEOr5x0aJpH&format=png&color=000000" />Birth: ${formatData(fullDetails.date_of_birth)}</p>
    <p class = "flex gap-2 text-sm"><img class="h-5 items-center" src="https://img.icons8.com/?size=100&id=1665&format=png&color=000000" />Gender: ${formatData(fullDetails.gender)}</p>
    <p class = "flex gap-2 text-sm"><img class="h-5 items-center" src="https://img.icons8.com/?size=100&id=7172&format=png&color=000000" />Price: ${formatData(fullDetails.price)}</p>
    <p class = "flex gap-2 text-sm"><img class="h-5 items-center" src="https://img.icons8.com/?size=100&id=1665&format=png&color=000000" />Vaccinated Status: ${formatData(fullDetails.vaccinated_status)}</p>
  </div>
  <hr class="my-4 text-slate-400">
  <div>
  <h3 class="font-bold text-lg">Details Information</h3>
  <p class="text-sm">${formatData(fullDetails.pet_details)}</p>
  </div>

</div>
  `;
}

const displayData = (animal) => {
  const dataContainer = document.getElementById("cards");
  dataContainer.innerHTML = "";

  if(animal.length == 0 ){
    dataContainer.classList.remove("grid");
    dataContainer.innerHTML= `
    <div class="bg-base-300 flex flex-col gap-5 justify-center items-center p-8 rounded-xl">
    <img src ="images/error.webp" alt="no info" />
    <h3 class="text-3xl font-bold">No Information Available</h3>
    <p class="text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
    its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    `;
    return;
  }
  else{
    dataContainer.classList.add("grid");
  };
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
    <h2 class="card-title">${formatData(animals.pet_name)}</h2>
    <p class = "flex gap-2"><img class="h-5 items-center" src="https://img.icons8.com/?size=100&id=mluT7pyF3sD3&format=png&color=000000" />Breed: ${formatData(animals.breed)}</p>
    <p class = "flex gap-2"><img class="h-5 items-center" src="https://img.icons8.com/?size=100&id=GlEOr5x0aJpH&format=png&color=000000" />Birth: ${formatData(animals.date_of_birth)}</p>
    <p class = "flex gap-2"><img class="h-5 items-center" src="https://img.icons8.com/?size=100&id=1665&format=png&color=000000" />Gender: ${formatData(animals.gender)}</p>
    <p class = "flex gap-2"><img class="h-5 items-center" src="https://img.icons8.com/?size=100&id=7172&format=png&color=000000" />Price: ${formatData(animals.price)}</p>
    

    <div class="card-actions">
      <button onclick = "pushImage('${animals.image}') " class="btn "><img class="h-6" src="https://img.icons8.com/?size=100&id=24816&format=png&color=000000" alt="like" /></button>
      <button onclick="congratsDetails()" class="btn rounded-lg hover:bg-[#0E7A81] hover:text-white  text-[#0E7A81] font-bold">Adopt</button>
      <button onclick="loadDetails(${animals.petId})" class="btn rounded-lg hover:bg-[#0E7A81] hover:text-white  text-[#0E7A81] font-bold">Details</button>
      
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
