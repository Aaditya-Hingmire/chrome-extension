document.addEventListener('DOMContentLoaded', () => {
    // 1. Update all statistics from local storage
    chrome.storage.local.get(['stats'], (result) => {
        // Initialize stats if they don't exist
        const stats = result.stats || { total: 0, types: {} };

        // Update the main leak counter
        const totalCount = stats.total || 0;
        if (document.getElementById('leakCount')) {
            document.getElementById('leakCount').innerText = totalCount;
        }

        // Update specific leak type breakdowns
        if (document.getElementById('api-keys-blocked')) {
            document.getElementById('api-keys-blocked').innerText = stats.types.awsKey || 0;
        }
        if (document.getElementById('pii-blocked')) {
            document.getElementById('pii-blocked').innerText = stats.types.email || 0;
        }

        // Update the Security Rank
        if (document.getElementById('guard-rank')) {
            let rank = "Beginner Guardian";
            if (totalCount > 10) rank = "Vigilant Protector"; // Lowered for demo visibility
            if (totalCount > 50) rank = "Advanced Sentinel";
            document.getElementById('guard-rank').innerText = rank;
        }
    });

    // 2. Functionalize the 'View Detailed Logs' button
    const logsBtn = document.getElementById('viewLogs');
    if (logsBtn) {
        logsBtn.addEventListener('click', () => {
            // This opens logs.html in a new browser tab
            chrome.tabs.create({ url: 'logs.html' });
        });
    }
});
