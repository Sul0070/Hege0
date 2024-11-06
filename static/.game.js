let playerHealth = 100;
let opponentHealth = 100;

const playerHealthBar = document.getElementById('player-health');
const opponentHealthBar = document.getElementById('opponent-health');
const actionLabel = document.getElementById('action-label');
const attackButtons = document.querySelectorAll('.attack-btn');
const playerImage = document.getElementById('player-image');
const opponentImage = document.getElementById('opponent-image');

// Set initial health bars
updateHealthBars();

function updateHealthBars() {
    playerHealthBar.style.width = `${playerHealth}%`;
    opponentHealthBar.style.width = `${opponentHealth}%`;
}

function playerAttack(attackType) {
    // Lock buttons and disable attacks for a while
    lockAttackButtons(true);

    if (playerHealth <= 0 || opponentHealth <= 0) return;

    let damage = calculateDamage(attackType);
    opponentHealth -= damage;

    actionLabel.textContent = `You attacked with ${attackType} and dealt ${damage} damage!`;

    // Move player character
    playerImage.classList.add('attack-move');
    setTimeout(() => playerImage.classList.remove('attack-move'), 500); // Reset move after animation

    updateHealthBars();

    if (opponentHealth <= 0) {
        actionLabel.textContent = 'You win!';
        lockAttackButtons(false); // Enable buttons after game over
        return;
    }

    // Opponent attacks after a short delay
    setTimeout(opponentAttack, 1000);
}

function calculateDamage(attackType) {
    let minDamage, maxDamage;

    switch (attackType) {
        case 'Punch':
            minDamage = 8;
            maxDamage = 15;
            break;
        case 'Kick':
            minDamage = 12;
            maxDamage = 18;
            break;
        case 'Hammer':
            minDamage = 15;
            maxDamage = 25;
            break;
        case 'Chainsaw':
            minDamage = 20;
            maxDamage = 30;
            break;
        default:
            minDamage = 10;
            maxDamage = 20;
            break;
    }

    // Modify damage to give opponent a better chance of winning (making player damage lower)
    return Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
}

function opponentAttack() {
    // Lock buttons while opponent attacks
    lockAttackButtons(true);

    if (playerHealth <= 0 || opponentHealth <= 0) return;

    const attackTypes = ['Punch', 'Kick', 'Hammer', 'Chainsaw'];
    const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];

    let damage = calculateDamage(attackType);
    playerHealth -= damage;

    actionLabel.textContent = `Opponent attacked with ${attackType} and dealt ${damage} damage!`;

    // Move opponent character to the left during attack
    opponentImage.classList.add('attack-move-left');
    setTimeout(() => opponentImage.classList.remove('attack-move-left'), 500); // Reset move after animation

    updateHealthBars();

    if (playerHealth <= 0) {
        actionLabel.textContent = 'You lose!';
        lockAttackButtons(false); // Enable buttons after game over
    } else {
        // Re-enable attack buttons after opponent attack
        setTimeout(() => lockAttackButtons(false), 500); // Re-enable buttons after a short delay
    }
}

// Disable or enable attack buttons
function lockAttackButtons(lock) {
    attackButtons.forEach(button => {
        button.disabled = lock;
    });
}
function changeCharacter(imagePath) {
    playerImage.src = imagePath;
}
