document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['detailedLogs'], (result) => {
        const logs = result.detailedLogs || [];
        const logBody = document.getElementById('logBody');

        if (logs.length === 0) {
            logBody.innerHTML = '<tr><td colspan="4" class="no-logs">No security threats detected yet. Stay safe!</td></tr>';
            return;
        }

        // Show latest logs first
        logs.reverse().forEach(log => {
            const row = `
                <tr>
                    <td>${log.time}</td>
                    <td><span class="type-badge">${log.type.toUpperCase()}</span></td>
                    <td>${log.platform}</td>
                    <td style="color: #22c55e;">Blocked & Redacted</td>
                </tr>
            `;
            logBody.innerHTML += row;
        });
    });
});