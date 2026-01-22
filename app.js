const recipes = [
    {
        id: 1,
        title: "Spaghetti",
        time: 25,
        difficulty: "easy",
        description: "Simple pasta dish",
        category: "pasta",
    },
    {
        id: 2,
        title: "Pizza",
        time: 60,
        difficulty: "medium",
        description: "Cheesy pizza",
        category: "pizza",
    },
];

const recipeContainer = document.querySelector("#recipe-container");

const createRecipeCard = (recipe) => {
    return `
        <div class="recipe-card">
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
            <span class="difficulty ${recipe.difficulty}">
                ${recipe.difficulty}
            </span>
        </div>
    `;
};

const renderRecipes = (recipes) => {
    recipeContainer.innerHTML = recipes.map(createRecipeCard).join("");
};

renderRecipes(recipes);
