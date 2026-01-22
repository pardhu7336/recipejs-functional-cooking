const recipes = [
  {
    id: 1,
    title: "Spaghetti",
    time: 25,
    difficulty: "easy",
    description: "Simple pasta dish",
    category: "pasta",
    ingredients: ["pasta", "tomato", "cheese"],
  },
  {
    id: 2,
    title: "Pizza",
    time: 60,
    difficulty: "medium",
    description: "Cheesy pizza",
    category: "pizza",
    ingredients: ["dough", "cheese", "tomato sauce"],
  },
  {
    id: 3,
    title: "Beef Stew",
    time: 120,
    difficulty: "hard",
    description: "Hearty stew with beef and vegetables",
    category: "stew",
    ingredients: ["beef", "carrot", "potato", "onion"],
  },
   {
    id: 1,
    title: "Spaghetti",
    time: 25,
    difficulty: "easy",
    description: "Simple pasta dish",
    category: "pasta",
    ingredients: ["pasta", "tomato", "cheese"],
  },
  {
    id: 2,
    title: "Pizza",
    time: 60,
    difficulty: "medium",
    description: "Cheesy pizza",
    category: "pizza",
    ingredients: ["dough", "cheese", "tomato sauce"],
  },
  {
    id: 3,
    title: "Beef Stew",
    time: 120,
    difficulty: "hard",
    description: "Hearty stew with beef and vegetables",
    category: "stew",
    ingredients: ["beef", "carrot", "potato", "onion"],
  },
  
   {
    id: 1,
    title: "Spaghetti",
    time: 25,
    difficulty: "easy",
    description: "Simple pasta dish",
    category: "pasta",
    ingredients: ["pasta", "tomato", "cheese"],
  },
  {
    id: 2,
    title: "Pizza",
    time: 60,
    difficulty: "medium",
    description: "Cheesy pizza",
    category: "pizza",
    ingredients: ["dough", "cheese", "tomato sauce"],
  },
  
  
  
  // Add more recipes here if you want
];

// State variables
let searchQuery = "";
let favorites = JSON.parse(localStorage.getItem("recipeFavorites")) || [];
let showFavoritesOnly = false;

// DOM references
const recipeContainer = document.querySelector("#recipe-container");
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search");
const favoritesFilterBtn = document.getElementById("favorites-filter");
const recipeCounter = document.getElementById("recipe-counter");

// Create a recipe card with favorite button
const createRecipeCard = (recipe) => {
  const isFavorited = favorites.includes(recipe.id);
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
      <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
      <button class="favorite-btn" data-recipe-id="${recipe.id}">
        ${isFavorited ? "❤️" : "🤍"}
      </button>
    </div>
  `;
};

// Render recipes
const renderRecipes = (recipes) => {
  if (recipes.length === 0) {
    recipeContainer.innerHTML = `<p>No recipes found.</p>`;
    return;
  }
  recipeContainer.innerHTML = recipes.map(createRecipeCard).join("");
};

// Filter recipes by search query
const filterBySearch = (recipes) => {
  const query = searchQuery.toLowerCase().trim();
  if (!query) return recipes;

  return recipes.filter((recipe) => {
    const titleMatch = recipe.title.toLowerCase().includes(query);
    const ingredientMatch = recipe.ingredients.some((ing) =>
      ing.toLowerCase().includes(query)
    );
    return titleMatch || ingredientMatch;
  });
};

// Filter recipes by favorites only
const filterByFavorites = (recipes) => {
  if (!showFavoritesOnly) return recipes;
  return recipes.filter((recipe) => favorites.includes(recipe.id));
};

// Update recipe counter text
const updateRecipeCounter = (visibleCount, totalCount) => {
  recipeCounter.textContent = `Showing ${visibleCount} of ${totalCount} recipes`;
};

// Toggle favorite for a recipe id
const toggleFavorite = (id) => {
  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("recipeFavorites", JSON.stringify(favorites));
  updateDisplay();
};

// Main update display function (filter + render + counter)
const updateDisplay = () => {
  let filteredRecipes = filterBySearch(recipes);
  filteredRecipes = filterByFavorites(filteredRecipes);

  renderRecipes(filteredRecipes);
  updateRecipeCounter(filteredRecipes.length, recipes.length);
};

// Debounce helper for search input
let debounceTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    searchQuery = searchInput.value;
    updateDisplay();
    clearSearchBtn.hidden = !searchQuery;
  }, 300);
});

// Clear search button event
clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchQuery = "";
  clearSearchBtn.hidden = true;
  updateDisplay();
});

// Favorites filter toggle button
favoritesFilterBtn.addEventListener("click", () => {
  showFavoritesOnly = !showFavoritesOnly;
  favoritesFilterBtn.classList.toggle("active", showFavoritesOnly);
  updateDisplay();
});

// Listen for favorite button clicks on recipe cards
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("favorite-btn")) {
    const id = parseInt(e.target.dataset.recipeId);
    toggleFavorite(id);
  }
});

// Initialize app
const init = () => {
  favorites = JSON.parse(localStorage.getItem("recipeFavorites")) || [];
  updateDisplay();
  console.log("RecipeJS app initialized.");
};

init();
