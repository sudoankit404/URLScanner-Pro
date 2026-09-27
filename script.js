// URLScanner-Pro - Main JavaScript

// Theme Management
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    htmlElement.classList.add('dark');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    const isDark = htmlElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Scanning Logic
const scanForm = document.getElementById('scanForm');
const urlInput = document.getElementById('urlInput');
const scanButton = document.getElementById('scanButton');
const resultContainer = document.getElementById('resultContainer');

let screenshotAttempt = 0;
const maxAttempts = 5;

// Screenshot services
function getScreenshotServices(url) {
    const encoded = encodeURIComponent(url);
    return [
        `https://image.thum.io/get/width/1200/crop/900/${url}`,
        `https://free.pagepeeker.com/v2/thumbs.php?size=x&url=${encoded}`,
        `https://api.screenshotmachine.com/?key=demo&url=${encoded}&dimension=1200x800`,
        `https://api.apiflash.com/v1/urltoimage?access_key=demo&url=${encoded}&width=1200&height=800`,
        `https://webthumb.bluga.net/easythumb.php?url=${encoded}&size=large`
    ];
}

// Validate URL
function validateUrl(input) {
    try {
        let urlToValidate = input.trim();
        if (!urlToValidate.startsWith('http://') && !urlToValidate.startsWith('https://')) {
            urlToValidate = 'https://' + urlToValidate;
        }
        const urlObj = new URL(urlToValidate);
        return urlObj.href;
    } catch {
        return null;
    }
}

// Get status icon
function getStatusIcon(status) {
    switch (status) {
        case 'safe': return '✓';
        case 'malicious': return '✕';
        case 'suspicious': return '⚠';
        case 'scanning': return '⟳';
        default: return '!';
    }
}

// Analyze URL
function analyzeUrl(urlString) {
    const threatTypes = [];
    let riskPoints = 0;

    const MALICIOUS_PATTERNS = [
        /bit\.ly|tinyurl|goo\.gl|ow\.ly|is\.gd|buff\.ly/i,
        /paypal.*verify|paypal.*update|paypal.*secure/i,
        /account.*suspend|account.*verify|account.*update/i,
        /urgent.*action|immediate.*action|verify.*identity/i,
        /\.tk$|\.ml$|\.ga$|\.cf$|\.gq$/i,
        /login.*here|click.*here.*login|secure.*login.*required/i,
    ];

    const SUSPICIOUS_KEYWORDS = [
        'free', 'win', 'prize', 'congratulations', 'claim', 'urgent',
        'verify', 'suspended', 'locked', 'unusual', 'confirm', 'update',
        'security', 'alert', 'limited', 'expires', 'act now'
    ];

    const KNOWN_SAFE_DOMAINS = [
        'google.com', 'youtube.com', 'facebook.com', 'twitter.com', 'x.com',
        'instagram.com', 'linkedin.com', 'github.com', 'microsoft.com',
        'apple.com', 'amazon.com', 'wikipedia.org', 'reddit.com', 'stackoverflow.com'
    ];

    try {
        const url = new URL(urlString);
        const domain = url.hostname.toLowerCase();
        const protocol = url.protocol;

        // Check HTTPS
        const isHttps = protocol === 'https:';
        if (!isHttps) {
            riskPoints += 30;
            threatTypes.push('Unencrypted Connection');
        }

        // Check known safe domains
        const isKnownSafe = KNOWN_SAFE_DOMAINS.some(safeDomain => 
            domain === safeDomain || domain.endsWith('.' + safeDomain)
        );
        if (isKnownSafe) {
            riskPoints = Math.max(0, riskPoints - 50);
        }

        // Check malicious patterns
        const urlLower = urlString.toLowerCase();
        for (const pattern of MALICIOUS_PATTERNS) {
            if (pattern.test(urlLower)) {
                riskPoints += 40;
                threatTypes.push('Suspicious URL Pattern');
                break;
            }
        }

        // Check suspicious keywords
        let suspiciousKeywordCount = 0;
        for (const keyword of SUSPICIOUS_KEYWORDS) {
            if (urlLower.includes(keyword)) {
                suspiciousKeywordCount++;
            }
        }

        if (suspiciousKeywordCount >= 3) {
            riskPoints += 35;
            threatTypes.push('Multiple Suspicious Keywords');
        } else if (suspiciousKeywordCount >= 2) {
            riskPoints += 20;
            threatTypes.push('Suspicious Keywords');
        }

        // Check for IP address
        if (/^(\d{1,3}\.){3}\d{1,3}$/.test(domain)) {
            riskPoints += 25;
            threatTypes.push('IP Address Used Instead of Domain');
        }

        // Check subdomain count
        const subdomainCount = domain.split('.').length - 2;
        if (subdomainCount > 3) {
            riskPoints += 20;
            threatTypes.push('Excessive Subdomains');
        }

        // Check for homograph attacks
        if (/[а-яА-Я]/.test(domain) || /[\u0400-\u04FF]/.test(domain)) {
            riskPoints += 45;
            threatTypes.push('Possible Homograph Attack');
        }

        // Check domain length
        if (domain.length > 50) {
            riskPoints += 15;
            threatTypes.push('Unusually Long Domain');
        }

        // Check for @ symbol
        if (urlString.includes('@')) {
            riskPoints += 40;
            threatTypes.push('URL Obfuscation Attempt');
        }

        // Determine status
        let status = 'safe';
        let riskScore = 'Low';

        if (riskPoints >= 60) {
            status = 'malicious';
            riskScore = 'High';
        } else if (riskPoints >= 30) {
            status = 'suspicious';
            riskScore = 'Medium';
        }

        const details = {
            domain: domain,
            protocol: protocol.replace(':', ''),
            isHttps: isHttps,
            phishingCheck: riskPoints >= 40 ? 'High Risk' : riskPoints >= 20 ? 'Medium Risk' : 'Low Risk',
            malwareCheck: threatTypes.length > 0 ? 'Threats Detected' : 'No Threats',
            reputation: isKnownSafe ? 'Trusted Domain' : 'Unknown',
            ssl: isHttps ? 'Valid' : 'Not Available',
            redirects: 0,
        };

        return { status, riskScore, threatTypes, details };
    } catch (error) {
        throw new Error('Invalid URL format');
    }
}

// Display result
function displayResult(result) {
    resultContainer.style.display = 'block';
    resultContainer.scrollIntoView({ behavior: 'smooth' });

    // Status badge
    const statusBadge = document.getElementById('statusBadge');
    statusBadge.className = `status-badge ${result.status}`;
    statusBadge.innerHTML = `
        <span style="font-size: 1.5rem">${getStatusIcon(result.status)}</span>
        <span>${result.status.toUpperCase()}</span>
        ${result.riskScore ? `<span class="risk-score">Risk: ${result.riskScore}</span>` : ''}
    `;

    // URL
    document.getElementById('scannedUrl').textContent = result.url;

    // Error
    const errorMessage = document.getElementById('errorMessage');
    if (result.error) {
        errorMessage.textContent = result.error;
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
    }

    // Threats
    const threatsContainer = document.getElementById('threatsContainer');
    const threatsList = document.getElementById('threatsList');
    if (result.threatTypes && result.threatTypes.length > 0) {
        threatsContainer.style.display = 'block';
        threatsList.innerHTML = result.threatTypes.map(threat => 
            `<span class="threat-tag">${threat}</span>`
        ).join('');
    } else {
        threatsContainer.style.display = 'none';
    }

    // Details
    const detailsGrid = document.getElementById('detailsGrid');
    if (result.details) {
        detailsGrid.innerHTML = '';
        
        Object.entries(result.details).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                const detailCard = document.createElement('div');
                detailCard.className = 'detail-card';
                
                let valueClass = 'detail-value';
                let displayValue = value;
                
                if (key === 'isHttps') {
                    valueClass += value ? ' https-yes' : ' https-no';
                    displayValue = value ? 'Yes ✓' : 'No ✕';
                }
                
                detailCard.innerHTML = `
                    <p class="detail-label">${label}</p>
                    <p class="${valueClass}">${displayValue}</p>
                `;
                detailsGrid.appendChild(detailCard);
            }
        });
    }

    // Screenshot
    const screenshotContainer = document.getElementById('screenshotContainer');
    const maliciousWarning = document.getElementById('maliciousWarning');
    
    if (result.status === 'malicious') {
        screenshotContainer.style.display = 'none';
        maliciousWarning.style.display = 'flex';
    } else if (result.screenshotUrl) {
        screenshotContainer.style.display = 'block';
        maliciousWarning.style.display = 'none';
        loadScreenshot(result.screenshotUrl, result.url);
    } else {
        screenshotContainer.style.display = 'none';
        maliciousWarning.style.display = 'none';
    }

    // Timestamp
    const timestamp = document.getElementById('timestamp');
    timestamp.textContent = `Scanned at: ${new Date().toLocaleString()}`;
}

// Load screenshot with fallback
function loadScreenshot(initialUrl, originalUrl) {
    screenshotAttempt = 0;
    const screenshotLoader = document.getElementById('screenshotLoader');
    const screenshotImage = document.getElementById('screenshotImage');
    const screenshotError = document.getElementById('screenshotError');
    const retryText = document.getElementById('retryText');

    screenshotLoader.style.display = 'flex';
    screenshotImage.style.display = 'none';
    screenshotError.style.display = 'none';
    screenshotImage.classList.remove('loaded');

    const services = getScreenshotServices(originalUrl);
    
    function tryLoadScreenshot(attempt) {
        if (attempt >= maxAttempts) {
            screenshotLoader.style.display = 'none';
            screenshotError.style.display = 'flex';
            document.getElementById('attemptCount').textContent = `Tried ${attempt} different services`;
            return;
        }

        if (attempt > 0) {
            retryText.style.display = 'block';
        }

        const img = new Image();
        img.onload = function() {
            screenshotLoader.style.display = 'none';
            screenshotImage.src = services[attempt];
            screenshotImage.style.display = 'block';
            setTimeout(() => screenshotImage.classList.add('loaded'), 10);
        };
        
        img.onerror = function() {
            tryLoadScreenshot(attempt + 1);
        };
        
        img.src = services[attempt];
    }

    tryLoadScreenshot(0);
}

// Handle form submission
scanForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const url = urlInput.value.trim();
    if (!url) return;

    const validatedUrl = validateUrl(url);
    if (!validatedUrl) {
        displayResult({
            url: url,
            status: 'error',
            error: 'Please enter a valid URL'
        });
        return;
    }

    // Show scanning state
    scanButton.textContent = 'Scanning...';
    scanButton.disabled = true;
    urlInput.disabled = true;

    try {
        // Analyze URL
        const analysis = analyzeUrl(validatedUrl);
        
        // Get screenshot URL
        const screenshotUrl = analysis.status !== 'malicious' ? getScreenshotServices(validatedUrl)[0] : null;

        // Display result
        displayResult({
            url: validatedUrl,
            status: analysis.status,
            riskScore: analysis.riskScore,
            threatTypes: analysis.threatTypes,
            screenshotUrl: screenshotUrl,
            details: analysis.details,
            scannedAt: new Date().toISOString()
        });

    } catch (error) {
        displayResult({
            url: validatedUrl,
            status: 'error',
            error: error.message || 'Scan failed. Please try again.'
        });
    } finally {
        scanButton.textContent = 'Scan Link';
        scanButton.disabled = false;
        urlInput.disabled = false;
    }
});
