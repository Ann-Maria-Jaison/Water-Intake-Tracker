// Constants
const DAILY_GOAL = 2000; // 2000ml or 2 liters
const GLASS_SIZE = 250; // 250ml per glass

// DOM Elements
const waterElement = document.getElementById('water');
const waterDropElement = document.getElementById('water-drop');
const progressTextElement = document.getElementById('progress-text');
const addWaterButton = document.getElementById('add-water');
const resetButton = document.getElementById('reset-progress');
const hydrationTipElement = document.getElementById('hydration-tip');
const tooltipElement = document.getElementById('tooltip');
const celebrationElement = document.getElementById('celebration');
const waterSplashElement = document.getElementById('water-splash');
const trophyElement = document.getElementById('trophy');
const goalReachedTextElement = document.getElementById('goal-reached-text');

// Hydration facts
const hydrationFacts = [
  "Drinking water can boost your brain's performance by up to 30%!",
  "Even mild dehydration can affect your mood and concentration.",
  "Water helps regulate your body temperature and flush out toxins.",
  "About 60% of your body is made up of water!",
  "Staying hydrated can help prevent headaches and fatigue.",
  "For most adults, 2-3 liters of water per day is recommended.",
  "Water helps transport nutrients to your cells and oxygen to your brain.",
  "Dehydration is a common cause of daytime fatigue.",
  "Drinking water before meals can help reduce overall calorie intake.",
  "Hydration improves skin complexion and moisture."
];

// State variables
let currentIntake = 0;
let goalReached = false;

// Load saved data from localStorage
function loadData() {
  const savedIntake = localStorage.getItem('waterIntake');
  const lastUpdated = localStorage.getItem('lastUpdated');
  
  // Check if it's a new day and reset if needed
  const today = new Date().toDateString();
  if (lastUpdated !== today) {
    resetProgress();
    return;
  }
  
  if (savedIntake) {
    currentIntake = parseInt(savedIntake);
    updateUI();
  }
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('waterIntake', currentIntake);
  localStorage.setItem('lastUpdated', new Date().toDateString());
}

// Update UI based on current intake
function updateUI() {
  const percentage = Math.min(100, Math.round((currentIntake / DAILY_GOAL) * 100));
  waterElement.style.height = `${percentage}%`;
  progressTextElement.textContent = `${percentage}% of daily goal (${currentIntake}ml / ${DAILY_GOAL}ml)`;
  
  // Check if goal reached for the first time
  if (percentage >= 100 && !goalReached) {
    celebrateGoalReached();
    goalReached = true;
  }
}

// Add water to the tracker
function addWater() {
  currentIntake += GLASS_SIZE;
  
  // Create ripple effect
  createRippleEffect(addWaterButton);
  
  // Update UI with animation
  updateUI();
  saveData();
}

// Reset progress
function resetProgress() {
  currentIntake = 0;
  goalReached = false;
  updateUI();
  saveData();
}

// Create ripple effect on button click
function createRippleEffect(button) {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  
  const buttonRect = button.getBoundingClientRect();
  const size = Math.max(buttonRect.width, buttonRect.height);
  
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - buttonRect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - buttonRect.top - size / 2}px`;
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 800);
}

// Show hydration fact in tooltip
function showHydrationFact(event) {
  // Get a random fact
  const randomFact = hydrationFacts[Math.floor(Math.random() * hydrationFacts.length)];
  
  // Set the tooltip text
  tooltipElement.textContent = randomFact;
  
  // Create a ripple effect on the tip element
  createRippleEffect(hydrationTipElement);
  
  // Show the tooltip
  tooltipElement.classList.add('show');
  
  // Hide the tooltip after some time
  setTimeout(() => {
    tooltipElement.classList.remove('show');
  }, 5000);
}

// Create a confetti particle
function createConfetti() {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  
  // More vibrant colors
  const colors = ['#29B6F6', '#26C6DA', '#0D47A1', '#4FC3F7', '#81D4FA', '#FFC107', '#FF5722', '#4CAF50'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  // Random shapes for confetti
  const shapes = ['circle', 'square', 'triangle'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  
  confetti.style.backgroundColor = color;
  confetti.style.left = Math.random() * 100 + 'vw';
  
  // Make some confetti larger
  const size = Math.random() * 10 + 5;
  confetti.style.width = `${size}px`;
  confetti.style.height = `${size}px`;
  
  // Add different shapes
  if (shape === 'circle') {
    confetti.style.borderRadius = '50%';
  } else if (shape === 'triangle') {
    confetti.style.width = '0';
    confetti.style.height = '0';
    confetti.style.backgroundColor = 'transparent';
    confetti.style.borderLeft = `${size/2}px solid transparent`;
    confetti.style.borderRight = `${size/2}px solid transparent`;
    confetti.style.borderBottom = `${size}px solid ${color}`;
  }
  
  confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
  confetti.style.animationDelay = Math.random() * 0.5 + 's';
  
  celebrationElement.appendChild(confetti);
  confetti.style.animation = 'confetti-fall 3s ease-in forwards';
  
  setTimeout(() => {
    confetti.remove();
  }, 5000);
}

// Create floating water droplets
function createFloatingDroplets() {
  for (let i = 0; i < 20; i++) {
    const droplet = document.createElement('div');
    droplet.classList.add('droplet');
    
    const size = Math.random() * 30 + 10;
    droplet.style.width = `${size}px`;
    droplet.style.height = `${size}px`;
    
    droplet.style.left = `${Math.random() * 100}vw`;
    droplet.style.bottom = `${Math.random() * 20}vh`;
    
    droplet.style.animation = `float-up ${Math.random() * 4 + 3}s ease-out forwards`;
    droplet.style.animationDelay = `${Math.random() * 2}s`;
    
    document.body.appendChild(droplet);
    
    setTimeout(() => {
      droplet.remove();
    }, 7000);
  }
}

// Create star effect
function createStars() {
  const colors = ['#29B6F6', '#26C6DA', '#FFC107', '#FFEB3B'];
  
  for (let i = 0; i < 20; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.innerHTML = '★';
    star.style.color = colors[Math.floor(Math.random() * colors.length)];
    star.style.fontSize = `${Math.random() * 30 + 20}px`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.animation = `star-animation ${Math.random() * 2 + 1}s ease-out forwards`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    
    document.body.appendChild(star);
    
    setTimeout(() => {
      star.remove();
    }, 5000);
  }
}

// Enhanced celebration when goal is reached
function celebrateGoalReached() {
  // Activate all celebration elements
  celebrationElement.classList.add('active');
  waterSplashElement.classList.add('active');
  trophyElement.classList.add('active');
  goalReachedTextElement.classList.add('active');
  
  // Animate the water drop
  waterDropElement.classList.add('celebrating');
  
  // Create lots of confetti
  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      createConfetti();
    }, Math.random() * 2000);
  }
  
  // Create floating water droplets
  createFloatingDroplets();
  
  // Create stars effect
  createStars();
  
  // Play achievement sound effect (if supported)
  try {
    const audio = new Audio();
    audio.src = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAkJCQkJCQkJCQkJCQkJCQwMDAwMDAwMDAwMDAwMDAwMD/////////////////////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQDgAAAAAAAAAGw5MmHJwAAAAAAAAAAAAAAAAAAAP/jOMAAAAAAAAAAAABJbmZvAAAADwAAAAMAAAGwAJCQkJCQkJCQkJCQkJCQkMDAwMDAwMDAwMDAwMDAwMDA/////////////////////////////////////////wAAAABMYXZjNTguMTMAAAAAAAAAAAAAACADgAAAAAAAAAGw5MmHJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/jOMAAAAAAAAAAAABJbmZvAAAADwAAAAMAAAGwAJCQkJCQkJCQkJCQkJCQkMDAwMDAwMDAwMDAwMDAwMDA/////////////////////////////////////////wAAAABMYXZjNTguMTMAAAAAAAAAAAAAACADIAAAAAAAAAGw5MmHJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4zjEAANnALCUAMAEAF8Yigc7PB7/FxdY9lB+IH5QPofB9D4Ph/8QfD6JgiAIDgPoPg+/8QfB8HwfQe+ccEZOc5znOcYNKgKBgYEAAAAAAACUpVFB0pFAAAAAAABgDAYDAYDAYAAAAAABIAxmAwGAAAAAAAwgDAYDAAAAAABJAGAwGAwAAAAACYBgMBgMAAAAAARIAxmAwGAAAAAAAWBYFgWYFgAAAAAAAIADAYDAYDAYAAAAA";
    audio.play();
  } catch (e) {
    console.log("Audio playback not supported");
  }
  
  // Create water splash wave animation
  setTimeout(() => {
    waterSplashElement.classList.remove('active');
  }, 3000);
  
  // Clean up celebration after animation completes
  setTimeout(() => {
    celebrationElement.classList.remove('active');
    waterDropElement.classList.remove('celebrating');
  }, 7000);
}

// Event Listeners
addWaterButton.addEventListener('click', addWater);
resetButton.addEventListener('click', resetProgress);

// Fixed hydration tip click handler
hydrationTipElement.addEventListener('click', showHydrationFact);

// Show a random fact automatically when the page loads
setTimeout(() => {
  showHydrationFact();
}, 2000);

// Initialize the app
loadData();

// Check midnight reset (every minute)
setInterval(() => {
  const today = new Date().toDateString();
  const lastUpdated = localStorage.getItem('lastUpdated');
  
  if (lastUpdated !== today) {
    resetProgress();
  }
}, 60000); // Check every minute
