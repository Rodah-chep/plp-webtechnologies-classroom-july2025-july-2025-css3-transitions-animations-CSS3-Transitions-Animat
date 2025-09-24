// ===== PART 2: JAVASCRIPT FUNCTIONS - SCOPE, PARAMETERS & RETURN VALUES =====

// Global variables to demonstrate scope
let globalCounter = 0;
const globalMessage = "This is a global variable";

/**
 * Function demonstrating parameters and return values
 * Takes two numbers and an operation, returns the result
 */
function calculate(num1, num2, operation) {
    // Local variables - demonstrating local scope
    let result;
    const localMessage = "Calculation performed locally";
    
    switch(operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
            break;
        default:
            result = 'Invalid operation';
    }
    
    // Return an object with multiple values
    return {
        result: result,
        operation: operation,
        message: localMessage,
        timestamp: new Date().toLocaleTimeString()
    };
}

/**
 * Function to perform calculation from UI inputs
 * Demonstrates function reusability and DOM manipulation
 */
function performCalculation() {
    // Get values from input fields
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    // Validate inputs
    if (isNaN(num1) || isNaN(num2)) {
        displayResult('calc-result', 'Please enter valid numbers', 'error');
        return;
    }
    
    // Perform multiple calculations to show function reusability
    const addResult = calculate(num1, num2, 'add');
    const subtractResult = calculate(num1, num2, 'subtract');
    const multiplyResult = calculate(num1, num2, 'multiply');
    const divideResult = calculate(num1, num2, 'divide');
    
    // Format and display results
    const resultHTML = `
        <h4>Calculation Results:</h4>
        <p><strong>Addition:</strong> ${num1} + ${num2} = ${addResult.result}</p>
        <p><strong>Subtraction:</strong> ${num1} - ${num2} = ${subtractResult.result}</p>
        <p><strong>Multiplication:</strong> ${num1} × ${num2} = ${multiplyResult.result}</p>
        <p><strong>Division:</strong> ${num1} ÷ ${num2} = ${divideResult.result}</p>
        <p><em>Calculated at: ${addResult.timestamp}</em></p>
    `;
    
    displayResult('calc-result', resultHTML, 'success');
}

/**
 * Function demonstrating scope concepts
 * Shows global vs local variable access
 */
function demonstrateScope() {
    // Local variable with same name as global
    let localCounter = 10;
    const localMessage = "This is a local variable";
    
    // Function within function (closure) - demonstrates nested scope
    function innerFunction() {
        let innerVariable = "I'm inside the inner function";
        globalCounter++; // Can access global variable
        
        return {
            canAccessGlobal: globalMessage,
            canAccessLocal: localMessage,
            canAccessInner: innerVariable,
            globalCounterValue: globalCounter,
            localCounterValue: localCounter
        };
    }
    
    const scopeResults = innerFunction();
    
    // Display scope demonstration
    const resultHTML = `
        <h4>Scope Demonstration:</h4>
        <p><strong>Global Message:</strong> "${scopeResults.canAccessGlobal}"</p>
        <p><strong>Local Message:</strong> "${scopeResults.canAccessLocal}"</p>
        <p><strong>Inner Variable:</strong> "${scopeResults.canAccessInner}"</p>
        <p><strong>Global Counter:</strong> ${scopeResults.globalCounterValue}</p>
        <p><strong>Local Counter:</strong> ${scopeResults.localCounterValue}</p>
        <p><em>Note: Inner function can access all outer scopes!</em></p>
    `;
    
    displayResult('scope-result', resultHTML, 'info');
}

/**
 * Utility function for displaying results
 * Demonstrates function reusability and parameters
 */
function displayResult(elementId, content, type = 'info') {
    const element = document.getElementById(elementId);
    element.innerHTML = content;
    
    // Remove existing type classes
    element.classList.remove('success', 'error', 'info');
    element.classList.add(type);
    
    // Add some CSS for different result types
    switch(type) {
        case 'success':
            element.style.borderLeftColor = '#28a745';
            element.style.backgroundColor = '#d4edda';
            break;
        case 'error':
            element.style.borderLeftColor = '#dc3545';
            element.style.backgroundColor = '#f8d7da';
            break;
        default:
            element.style.borderLeftColor = '#667eea';
            element.style.backgroundColor = '#e7f3ff';
    }
}

// ===== PART 3: COMBINING CSS ANIMATIONS WITH JAVASCRIPT =====

/**
 * Function to flip card animation
 * Demonstrates CSS class manipulation for animations
 */
function flipCard(cardElement) {
    // Toggle the 'flipped' class to trigger CSS animation
    cardElement.classList.toggle('flipped');
    
    // Optional: Add some feedback
    const isFlipped = cardElement.classList.contains('flipped');
    console.log(`Card is now ${isFlipped ? 'flipped' : 'normal'}`);
}

/**
 * Function to animate box with different effects
 * Demonstrates dynamic CSS class addition/removal
 */
function animateBox(animationType) {
    const box = document.getElementById('animatedBox');
    
    // Remove any existing animation classes
    box.classList.remove('bounce', 'shake', 'glow');
    
    // Add the requested animation class
    box.classList.add(animationType);
    
    // Remove animation class after animation completes (except for glow which is infinite)
    if (animationType !== 'glow') {
        setTimeout(() => {
            box.classList.remove(animationType);
        }, 1000);
    }
    
    // Update box content to show current animation
    const originalText = box.textContent;
    box.textContent = `${animationType.charAt(0).toUpperCase() + animationType.slice(1)}ing...`;
    
    setTimeout(() => {
        if (animationType !== 'glow') {
            box.textContent = originalText;
        }
    }, 1000);
}

/**
 * Function to reset animated box
 * Demonstrates cleanup and state management
 */
function resetBox() {
    const box = document.getElementById('animatedBox');
    box.classList.remove('bounce', 'shake', 'glow');
    box.textContent = 'Animated Box';
    box.style.transform = '';
    box.style.boxShadow = '';
}

/**
 * Modal system functions
 * Demonstrates event handling and dynamic content
 */
function openModal(type) {
    const overlay = document.getElementById('modalOverlay');
    const title = document.getElementById('modalTitle');
    const message = document.getElementById('modalMessage');
    
    // Set content based on modal type
    const modalContent = getModalContent(type);
    title.textContent = modalContent.title;
    message.textContent = modalContent.message;
    
    // Add active class to trigger CSS animations
    overlay.classList.add('active');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

/**
 * Function to get modal content based on type
 * Demonstrates return values and object manipulation
 */
function getModalContent(type) {
    const contentMap = {
        success: {
            title: 'Success!',
            message: 'Operation completed successfully. This modal slides in smoothly using CSS transitions triggered by JavaScript.'
        },
        warning: {
            title: 'Warning',
            message: 'Please be careful! This is a warning message displayed in a beautifully animated modal.'
        },
        info: {
            title: 'Information',
            message: 'Here is some important information. Notice how the modal scales in and the overlay fades in simultaneously.'
        }
    };
    
    return contentMap[type] || contentMap.info;
}

/**
 * Function to close modal
 * Demonstrates cleanup and animation reversal
 */
function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

/**
 * Loading animation controller
 * Demonstrates state management and CSS class toggling
 */
let isLoading = false;

function toggleLoading() {
    const loadingContainer = document.getElementById('loadingContainer');
    const button = event.target;
    
    isLoading = !isLoading;
    
    if (isLoading) {
        // Start loading animation
        loadingContainer.classList.add('active');
        button.textContent = 'Stop Loading';
        button.style.background = '#dc3545';
        
        // Simulate some async operation
        simulateAsyncOperation();
    } else {
        // Stop loading animation
        loadingContainer.classList.remove('active');
        button.textContent = 'Toggle Loading';
        button.style.background = '#667eea';
    }
}

/**
 * Simulate an asynchronous operation
 * Demonstrates setTimeout and callback functions
 */
function simulateAsyncOperation() {
    if (!isLoading) return;
    
    // Simulate random completion time between 2-5 seconds
    const completionTime = Math.random() * 3000 + 2000;
    
    setTimeout(() => {
        if (isLoading) {
            // Auto-stop loading after simulation
            toggleLoading();
            
            // Show completion message
            setTimeout(() => {
                openModal('success');
            }, 300);
        }
    }, completionTime);
}

// ===== EVENT LISTENERS AND INITIALIZATION =====

/**
 * Initialize the application when DOM is loaded
 * Demonstrates event listeners and initialization patterns
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Interactive Experience Loaded!');
    console.log('Global counter initialized:', globalCounter);
    
    // Add keyboard event listener for modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    
    // Add some interactive feedback to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('All event listeners initialized!');
});

// ===== UTILITY FUNCTIONS =====

/**
 * Utility function to generate random colors
 * Demonstrates pure functions and return values
 */
function getRandomColor() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Utility function to add temporary visual feedback
 * Demonstrates DOM manipulation and timing functions
 */
function addTemporaryEffect(element, effectClass, duration = 1000) {
    element.classList.add(effectClass);
    setTimeout(() => {
        element.classList.remove(effectClass);
    }, duration);
}

// Export functions for potential module use (if needed)
// This demonstrates modern JavaScript practices
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculate,
        getModalContent,
        getRandomColor,
        addTemporaryEffect
    };
}
