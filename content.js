// 1. Define what "Sensitive Data" looks like (Regex)
const SENSITIVE_PATTERNS = {
    creditCard: /\b(?:\d[ -]*?){13,16}\b/g,
    awsKey: /AKIA[0-9A-Z]{16}/g,
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
};

// 2. Function to scan the text
function scanText(text) {
    for (let key in SENSITIVE_PATTERNS) {
        if (SENSITIVE_PATTERNS[key].test(text)) {
            return { found: true, type: key };
        }
    }
    return { found: false };
}

// 3. Intercept the "Send" action
// Note: AI sites change their button IDs often. We look for 'Enter' key as a generic start.
window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        const activeElement = document.activeElement;
        const userInput = activeElement.innerText || activeElement.value;

        const result = scanText(userInput);
        
        if (result.found) {
            event.preventDefault(); // STOP the message from sending
            event.stopPropagation();
            alert(`⚠️ SECURITY ALERT: We detected a ${result.type} in your prompt. Please remove it before sending.`);
        }
    }
}, true); // The 'true' ensures we catch the event before the website does