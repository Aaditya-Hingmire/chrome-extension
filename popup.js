document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch data from local storage
    chrome.storage.local.get(['stats'], (result) => {
        const stats = result.stats || { total: 0, types: {} };
        
        // 2. Update the UI elements
        document.getElementById('total-leaks').innerText = stats.total;
        document.getElementById('api-keys-blocked').innerText = stats.types.awsKey || 0;
        document.getElementById('pii-blocked').innerText = stats.types.email || 0;
        
        // 3. Optional: Add a 'Security Level' rank
        let rank = "Beginner Guardian";
        if (stats.total > 50) rank = "Advanced Sentinel";
        document.getElementById('guard-rank').innerText = rank;
    });
});