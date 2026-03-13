/**
 * SentinelGate: content.js
 * Final Hackathon-Ready Version
 */

// 1. Defined Sensitive Patterns (Regex) - Must be at the top
const SENSITIVE_PATTERNS = {
    creditCard: /\b(?:\d[ -]*?){13,16}\b/g,
    awsKey: /AKIA[0-9A-Z]{16}/g,
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    ipv4: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
    proprietaryMarkers: /(INTERNAL_ONLY|CONFIDENTIAL|PROPERTY_OF_ACME|DO_NOT_DISTRIBUTE)/gi,
    dbConnection: /(mongodb\+srv|postgres|mysql):\/\/[^\s]+/gi,
    highEntropySecret: /['"][a-zA-Z0-9]{32,128}['"]/g
};

// 2. The Redaction Engine
function scanAndRedact(text) {
    let matchesFound = [];
    let redactedText = text;

    for (let type in SENSITIVE_PATTERNS) {
        // Reset regex index for global flags
        SENSITIVE_PATTERNS[type].lastIndex = 0; 
        
        if (SENSITIVE_PATTERNS[type].test(text)) {
            matchesFound.push(type);
            redactedText = redactedText.replace(SENSITIVE_PATTERNS[type], `[REDACTED_${type.toUpperCase()}]`);
        }
    }
    return { isSafe: matchesFound.length === 0, redactedText, matchesFound };
}

// 3. The Modern UI Overlay Logic
function showModernWarning(analysis, targetElement) {
    // Remove existing overlay if present
    const existing = document.getElementById('sentinel-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'sentinel-overlay';
    overlay.className = 'sentinel-warning-overlay'; // Uses your styles.css
    
    // Inline styles as backup for hackathon stability
    overlay.setAttribute('style', `
        position: fixed; top: 20px; right: 20px; background: #1e293b; color: white; 
        padding: 20px; border-radius: 12px; border: 2px solid #ef4444; z-index: 100000; 
        width: 320px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); font-family: sans-serif;
    `);

    overlay.innerHTML = `
        <strong style="display:block; color: #ef4444; margin-bottom: 8px;">🚨 PRIVACY VIOLATION</strong>
        <p style="font-size: 13px; margin: 0 0 15px 0;">We detected: <b>${analysis.matchesFound.join(', ')}</b>. Exfiltration paused.</p>
        <button id="sendRedacted" style="background: #ef4444; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; width: 100%; font-weight: bold;">Send Redacted Version</button>
        <button id="cancelSend" style="background: transparent; color: #94a3b8; border: none; margin-top: 10px; cursor: pointer; width: 100%; font-size: 12px;">Cancel and Edit</button>
    `;
    
    document.body.appendChild(overlay);

    // Handle Redaction Choice
    document.getElementById('sendRedacted').onclick = () => {
        if (targetElement.tagName === 'TEXTAREA' || targetElement.tagName === 'INPUT') {
            targetElement.value = analysis.redactedText;
        } else {
            targetElement.innerText = analysis.redactedText;
        }
        overlay.remove();
        alert("Text sanitized. You can now press Enter again to send safely.");
    };

    document.getElementById('cancelSend').onclick = () => overlay.remove();
}

// 4. Main Event Interceptor
// 4. Main Event Interceptor
window.addEventListener('keydown', (event) => {
    const isTextArea = event.target.tagName === 'TEXTAREA' || 
                       event.target.role === 'textbox' || 
                       event.target.contentEditable === 'true';
    
    if (isTextArea && event.key === 'Enter' && !event.shiftKey) {
        const userInput = event.target.innerText || event.target.value;
        const analysis = scanAndRedact(userInput);

        if (!analysis.isSafe) {
            event.preventDefault();
            event.stopPropagation();

            showModernWarning(analysis, event.target);
            
            // --- UPDATED LOGGING LOGIC ---
            // --- UPDATED LOGGING LOGIC ---
    try {
    if (chrome.runtime && chrome.runtime.id) {
        chrome.storage.local.get(['stats', 'detailedLogs'], (result) => {
            if (chrome.runtime.lastError) return; // Exit if context is lost

            let stats = result.stats || { total: 0, types: {} };
            let logs = result.detailedLogs || [];

            stats.total++;
            analysis.matchesFound.forEach(type => {
                stats.types[type] = (stats.types[type] || 0) + 1;
            });

            const newLog = {
                time: new Date().toLocaleString(),
                type: analysis.matchesFound.join(', '),
                platform: window.location.hostname.replace('www.', ''),
                status: "Blocked & Redacted"
            };
            logs.push(newLog);

            chrome.storage.local.set({ stats: stats, detailedLogs: logs });
        });
    }
    } catch (e) {
    console.log("SentinelGate: Extension context invalidated. Please refresh the page.");
}
        }
    }
}, true);
