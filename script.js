
let loggedFoods = [];

const foodForm = document.getElementById('food-form');
const foodNameInput = document.getElementById('food-name');
const foodCaloriesInput = document.getElementById('food-calories');
const foodList = document.getElementById('food-list');
const totalCaloriesDisplay = document.getElementById('total-calories');
const emptyState = document.getElementById('empty-state');

document.addEventListener('DOMContentLoaded', () => {
    renderApp();
});


function renderApp() {
    foodList.innerHTML = '';
    let totalCalories = 0;

    if (loggedFoods.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        
        loggedFoods.forEach(item => {
            totalCalories += item.calories;
            
            const li = document.createElement('li');
            li.className = "py-3 flex justify-between items-center group hover:bg-gray-50 px-2 rounded-lg transition duration-150";
            li.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-green-500"></span>
                    <span class="font-medium text-gray-700">${item.name}</span>
                </div>
                <div class="flex items-center gap-4">
                    <span class="font-semibold text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full text-sm">${item.calories} kcal</span>
                    <button onclick="removeFoodItem('${item.id}')" class="text-gray-400 hover:text-red-500 transition duration-150" title="Delete entry">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
            foodList.appendChild(li);
        });
    }
    
    totalCaloriesDisplay.textContent = totalCalories;
}

foodForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = foodNameInput.value.trim();
    const calories = parseInt(foodCaloriesInput.value, 10);
    
    if (!name || isNaN(calories) || calories <= 0) return;

    const newFood = {
        id: Date.now().toString(),
        name: name,
        calories: calories
    };

    loggedFoods.push(newFood);
    renderApp();
    
    foodForm.reset();
    foodNameInput.focus();
}); 
