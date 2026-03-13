function logLeakPrevented(type) {
    chrome.storage.local.get(['stats'], (result) => {
        let stats = result.stats || { total: 0, types: {} };
        stats.total++;
        stats.types[type] = (stats.types[type] || 0) + 1;
        
        chrome.storage.local.set({ stats: stats });
    });
}