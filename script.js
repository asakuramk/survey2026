function checkAuth() {
    const pass = document.getElementById('auth-password').value;
    if (pass === 'kitajima2026') {
        document.getElementById('auth-overlay').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
    } else {
        document.getElementById('auth-error').classList.remove('hidden');
    }
}

// Allow Enter key for auth
document.getElementById('auth-password').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkAuth();
    }
});

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.form-section').forEach(sec => {
        sec.classList.add('hidden-section');
        sec.classList.remove('active-section');
    });
    
    // Show selected
    const target = document.getElementById('section-' + sectionId);
    target.classList.remove('hidden-section');
    target.classList.add('active-section');
    
    // Update nav UI
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.getAttribute('data-section') === sectionId) {
            btn.classList.add('bg-blue-100', 'text-blue-800');
        } else {
            btn.classList.remove('bg-blue-100', 'text-blue-800');
        }
    });
}

function exportData() {
    const form = document.getElementById('survey-form');
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Add timestamp
    data.export_timestamp = new Date().toISOString();
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `kitajima_survey_${data.dept_name || 'export'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('回答データをJSON形式で保存しました。このファイルを事務長へお送りください。\n\n※本フォームは静的サイトのため、サーバーへの送信は行っていません。');
}

// Initialize first section
window.onload = () => {
    showSection('basic');
};
