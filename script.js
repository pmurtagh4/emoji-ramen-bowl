const ingredientsInBowl = document.getElementById('ingredients-in-bowl');
const ingredientsDiv = document.getElementById('ingredients');
const finishButton = document.getElementById('finish');
const resetButton = document.getElementById('reset');
const resultDiv = document.getElementById('result');
const pastRamensDiv = document.getElementById('past-ramens');
const ingredients = [
    {emoji: '🥚', name: 'Egg', flavor: 'Rich'},
    {emoji: '🍤', name: 'Shrimp', flavor: 'Seafood'},
    {emoji: '🥓', name: 'Chashu', flavor: 'Savory'},
    {emoji: '🌽', name: 'Corn', flavor: 'Sweet'},
    {emoji: '🍄', name: 'Mushroom', flavor: 'Earthy'},
    {emoji: '🥕', name: 'Carrot', flavor: 'Fresh'},
    {emoji: '🧄', name: 'Garlic', flavor: 'Aromatic'}
];
let bowlContents = [];
let isFinished = false;

ingredients.forEach(ingredient => {
    const button = document.createElement('button');
    button.textContent = ingredient.emoji;
    button.onclick = () => addIngredient(ingredient);
    ingredientsDiv.appendChild(button);
});

function addIngredient(ingredient) {
    if (!isFinished) {
        bowlContents.push(ingredient);
        updateBowl();
        animateIngredient(ingredient);
    }
}

function updateBowl() {
    ingredientsInBowl.innerHTML = bowlContents.map(item => `<span class="ingredient">${item.emoji}</span>`).join('');
}

function animateIngredient(ingredient) {
    const ingredients = ingredientsInBowl.getElementsByClassName('ingredient');
    const lastIngredient = ingredients[ingredients.length - 1];
    lastIngredient.classList.add('ingredient-animation');
    setTimeout(() => {
        lastIngredient.classList.remove('ingredient-animation');
    }, 500);
}

finishButton.onclick = finishRamen;
resetButton.onclick = resetBowl;

function finishRamen() {
    if (bowlContents.length === 0) {
        resultDiv.textContent = "Please add some ingredients to your ramen first!";
        return;
    }

    isFinished = true;
    ingredientsDiv.classList.add('disabled');
    
    const ramenName = generateRamenName();
    resultDiv.textContent = `Your creation: ${ramenName}`;

    addToHistory(ramenName, bowlContents);
}

function generateRamenName() {
    const flavors = bowlContents.map(item => item.flavor);
    const uniqueFlavors = [...new Set(flavors)];
    
    let adjective = uniqueFlavors[Math.floor(Math.random() * uniqueFlavors.length)];
    const mainIngredient = bowlContents[Math.floor(Math.random() * bowlContents.length)].name;
    
    const styles = ['Shoyu', 'Miso', 'Tonkotsu', 'Shio'];
    const style = styles[Math.floor(Math.random() * styles.length)];

    return `${adjective} ${mainIngredient} ${style} Ramen`;
}

function resetBowl() {
    bowlContents = [];
    updateBowl();
    resultDiv.textContent = '';
    isFinished = false;
    ingredientsDiv.classList.remove('disabled');
}

function addToHistory(name, ingredients) {
    const historyEntry = document.createElement('div');
    historyEntry.innerHTML = `<strong>${name}</strong>: ${ingredients.map(item => item.emoji).join(' ')}`;
    pastRamensDiv.appendChild(historyEntry);
}