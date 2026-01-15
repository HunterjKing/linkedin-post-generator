// API Backend URL
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://dry-cloud-e506.contact-74b.workers.dev';

// Check API Status
async function checkAPIStatus() {
    const statusEl = document.getElementById('api-status');
    const statusDot = document.getElementById('status-dot');
    statusEl.textContent = 'Kontrollerar...';
    statusEl.className = 'status-message';
    statusDot.className = 'status-dot';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        const data = await response.json();
        
        if (response.ok) {
            statusEl.textContent = 'Ansluten och redo!';
            statusEl.className = 'status-message success';
            statusDot.className = 'status-dot connected';
        } else {
            statusEl.textContent = 'API-fel';
            statusEl.className = 'status-message error';
            statusDot.className = 'status-dot error';
        }
    } catch (error) {
        console.error('API Status Error:', error);
        statusEl.textContent = 'Kan inte nå API-servern';
        statusEl.className = 'status-message error';
        statusDot.className = 'status-dot error';
    }
    
    setTimeout(() => {
        statusEl.textContent = '';
        statusEl.className = 'status-message';
    }, 5000);
}

// LinkedIn Post Generation
async function generatePost() {
    const topic = document.getElementById('post-topic').value.trim();
    
    if (!topic) {
        alert('Vänligen skriv ett ämne för ditt LinkedIn-inlägg.');
        return;
    }
    
    const button = document.getElementById('generate-post-btn');
    const outputBox = document.getElementById('post-output');
    const postContent = document.getElementById('post-content');
    
    // Disable button and show loading
    button.disabled = true;
    button.textContent = 'Genererar...';
    outputBox.classList.remove('hidden');
    postContent.innerHTML = '<div class="spinner"></div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/generate-post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topic })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to generate post');
        }
        
        const data = await response.json();
        postContent.textContent = data.post;
        
    } catch (error) {
        console.error('Error generating post:', error);
        postContent.innerHTML = `<p style="color: #d32f2f;">Fel: ${error.message}</p><p style="color: #666; font-size: 0.9em;">Kontrollera att backend-servern körs.</p>`;
    } finally {
        button.disabled = false;
        button.textContent = 'Generera Inlägg';
    }
}

function copyPost() {
    const postContent = document.getElementById('post-content').textContent;
    
    if (!postContent || postContent.includes('Fel:')) {
        alert('Inget inlägg att kopiera.');
        return;
    }
    
    // Use the modern Clipboard API
    navigator.clipboard.writeText(postContent).then(() => {
        const copyBtn = event.target;
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Kopierat!';
        copyBtn.style.background = '#2196F3';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '#4CAF50';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = postContent;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            alert('Inlägg kopierat!');
        } catch (err) {
            alert('Kunde inte kopiera. Vänligen kopiera manuellt.');
        }
        document.body.removeChild(textArea);
    });
}

// Image Generation
let generatedImageUrl = '';

async function generateImage() {
    const prompt = document.getElementById('image-prompt').value.trim();
    
    if (!prompt) {
        alert('Vänligen beskriv bilden du vill generera.');
        return;
    }
    
    const button = document.getElementById('generate-image-btn');
    const outputBox = document.getElementById('image-output');
    const imageContainer = document.getElementById('image-container');
    
    // Disable button and show loading
    button.disabled = true;
    button.textContent = 'Genererar...';
    outputBox.classList.remove('hidden');
    imageContainer.innerHTML = '<div class="spinner"></div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/generate-image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to generate image');
        }
        
        const data = await response.json();
        generatedImageUrl = data.imageUrl;
        
        imageContainer.innerHTML = `<img src="${generatedImageUrl}" alt="Genererad LinkedIn-bild">`;
        
    } catch (error) {
        console.error('Error generating image:', error);
        imageContainer.innerHTML = `<p style="color: #d32f2f;">Fel: ${error.message}</p><p style="color: #666; font-size: 0.9em;">Kontrollera att backend-servern körs.</p>`;
    } finally {
        button.disabled = false;
        button.textContent = 'Generera Bild';
    }
}

async function downloadImage() {
    if (!generatedImageUrl) {
        alert('Ingen bild att ladda ner.');
        return;
    }
    
    try {
        const response = await fetch(generatedImageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `linkedin-bild-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        const downloadBtn = event.target;
        const originalText = downloadBtn.textContent;
        downloadBtn.textContent = '✅ Nedladdad!';
        
        setTimeout(() => {
            downloadBtn.textContent = originalText;
        }, 2000);
    } catch (error) {
        console.error('Error downloading image:', error);
        alert('Kunde inte ladda ner bilden. Vänligen högerklicka och spara manuellt.');
    }
}

// Check API status on page load
window.addEventListener('DOMContentLoaded', () => {
    checkAPIStatus();
});
