import React, { useState } from 'react';
import axios from 'axios';

const RecipeFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${searchTerm}&app_id=6ad3753e&app_key=02d6b085ea81f54ecf746b40b4bc8034`
      );
      setRecipes(response.data.hits);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRecipeClick = (recipe) => {
    console.log('Selected Recipe:', recipe);
    setSelectedRecipe(recipe);
  };

  const handleBackToResults = () => {
    setSelectedRecipe(null);
  };

  return (
    <div>
    <input
      type="text"
      placeholder="Enter ingredients"
      value={searchTerm}
      onChange={handleChange}
    />
    <button onClick={handleSearch}>Search</button>
    <div className="recipe-list">
      {selectedRecipe ? (
        <div>
          <button onClick={handleBackToResults}>Back to Results</button>
          <h2>{selectedRecipe.recipe.label}</h2>
          <img src={selectedRecipe.recipe.image} alt={selectedRecipe.recipe.label} />
          <h3>Ingredients:</h3>
          <ul>
            {selectedRecipe.recipe.ingredientLines ? (
              selectedRecipe.recipe.ingredientLines.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))
            ) : (
              <p>No ingredient information available.</p>
            )}
          </ul>
          <h3>Cooking Steps:</h3>
          <ol>
            {selectedRecipe.recipe.cookingSteps ? (
              selectedRecipe.recipe.cookingSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))
            ) : (
              <p>No cooking steps available.</p>
            )}
          </ol>
        </div>
      ) : (
        recipes.map((recipe) => (
          <div
            key={recipe.recipe.label}
            className="recipe-card"
            onClick={() => handleRecipeClick(recipe)}
          >
            <h2>{recipe.recipe.label}</h2>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
          </div>
        ))
      )}
    </div>
  </div>
  );
};

export default RecipeFinder;
