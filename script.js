// --- ToyCar Constructor ---
function ToyCar(id, name, brand, scale, color, material, price, weight, dimensions, year, stock, engineType, country, isLimitedEdition, image) {
  this.id = id;
  this.name = name;
  this.brand = brand;
  this.scale = scale;
  this.color = color;
  this.material = material;
  this.price = price;
  this.weight = weight;
  this.dimensions = dimensions;
  this.year = year;
  this.stock = stock;
  this.engineType = engineType;
  this.country = country;
  this.isLimitedEdition = isLimitedEdition;
  this.image = image;

  this.updateColor = function(newColor) {
    this.color = newColor;
  };
}

// --- Database of 5 Cars ---
const toyCarsDB = [
  new ToyCar(
    1, "Ferrari F8 Tributo", "ModelToyCars", "1:18", "Red", "Diecast Metal",
    89.99, "1.2kg", {length: "25cm", width: "11cm", height: "7cm"},
    2023, 15, "V8 Twin Turbo", "Italy", true,
    "images/f8-modelcar.webp"
  ),
  new ToyCar(
    2, "Lamborghini Aventador SVJ", "ModelToyCars", "1:24", "Yellow", "Resin",
    74.99, "900g", {length: "22cm", width: "10cm", height: "6cm"},
    2022, 20, "V12", "Italy", true,
    "images/Svj-modelcar.jpg"
  ),
  new ToyCar(
    3, "Porsche 911 GT3 RS", "ModelToyCars", "1:18", "Blue", "Diecast Metal",
    95.00, "1.3kg", {length: "26cm", width: "12cm", height: "7cm"},
    2024, 10, "Flat-6", "Germany", true,
    "images/911-GT3RS-modelcar.jpg"
  ),
  new ToyCar(
    4, "Ford Mustang GT", "ModelToyCars", "1:24", "Black", "Plastic",
    59.99, "800g", {length: "23cm", width: "9cm", height: "6cm"},
    2021, 25, "V8", "USA", false,
    "images/mustang-gt-modelcar.jpeg"
  ),
  new ToyCar(
    5, "Nissan GT-R R35", "ModelToyCars", "1:18", "Silver", "Diecast Metal",
    82.50, "1.1kg", {length: "25cm", width: "11cm", height: "7cm"},
    2023, 12, "V6 Twin Turbo", "Japan", true,
    "images/R35-model car.jpeg"
  )
];

// --- DOM Elements ---
const carImage = document.getElementById('carImage');
const carName = document.getElementById('carName');
const carSpecs = document.getElementById('carSpecs');
const colorOverlay = document.getElementById('colorOverlay');
const dropdownButton = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');

// --- Populate Custom Dropdown with Images ---
toyCarsDB.forEach(car => {
  const carOption = document.createElement('div');
  carOption.innerHTML = `<img src="${car.image}" alt="${car.name}"> ${car.name}`;
  carOption.addEventListener('click', () => {
    displayCarDetails(car);
    dropdownButton.textContent = car.name;
    dropdownMenu.style.display = "none";
  });
  dropdownMenu.appendChild(carOption);
});

// --- Dropdown Toggle ---
dropdownButton.addEventListener('click', () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});

// --- Close dropdown when clicking outside ---
window.addEventListener('click', (e) => {
  if (!e.target.closest('.custom-dropdown')) {
    dropdownMenu.style.display = "none";
  }
});

// --- Display Car Info ---
function displayCarDetails(car) {
  carImage.src = car.image;
  carName.textContent = car.name;
  carSpecs.innerHTML = `
    <li><strong>Brand:</strong> ${car.brand}</li>
    <li><strong>Scale:</strong> ${car.scale}</li>
    <li><strong>Color:</strong> ${car.color}</li>
    <li><strong>Material:</strong> ${car.material}</li>
    <li><strong>Price:</strong> $${car.price}</li>
    <li><strong>Weight:</strong> ${car.weight}</li>
    <li><strong>Dimensions:</strong> ${car.dimensions.length} × ${car.dimensions.width} × ${car.dimensions.height}</li>
    <li><strong>Year:</strong> ${car.year}</li>
    <li><strong>Stock:</strong> ${car.stock} units</li>
    <li><strong>Engine Type:</strong> ${car.engineType}</li>
    <li><strong>Country:</strong> ${car.country}</li>
    <li><strong>Limited Edition:</strong> ${car.isLimitedEdition ? "Yes" : "No"}</li>
  `;

  // Apply image tint based on car color
  colorOverlay.style.backgroundColor = car.color.toLowerCase();
}

// --- Handle Color Update ---
document.getElementById('updateColor').addEventListener('click', () => {
  const newColor = document.getElementById('colorInput').value.trim();
  const currentCar = toyCarsDB.find(car => car.name === dropdownButton.textContent);

  if (currentCar && newColor) {
    currentCar.updateColor(newColor);
    displayCarDetails(currentCar);
    alert(`${currentCar.name} color updated to ${newColor}!`);
  }
});

// --- Initialize with First Car ---
displayCarDetails(toyCarsDB[0]);
dropdownButton.textContent = toyCarsDB[0].name;