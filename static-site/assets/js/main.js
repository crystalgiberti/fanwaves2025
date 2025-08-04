// Fan Waves - Main JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeChatbot();
    initializeSearch();
    initializeCart();
    loadFeaturedProducts();
});

// Navigation
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('open');
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
            });
        });
    }
}

// Chatbot
function initializeChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const messagesContainer = document.getElementById('chatbot-messages');
    
    let isListening = false;
    
    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener('click', function() {
            chatbotWindow.style.display = chatbotWindow.style.display === 'none' ? 'flex' : 'none';
        });
    }
    
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotWindow.style.display = 'none';
        });
    }
    
    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', function() {
            sendMessage();
        });
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    if (voiceBtn) {
        voiceBtn.addEventListener('click', function() {
            if (!isListening) {
                startVoiceRecognition();
            }
        });
    }
    
    // Handle suggestion clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('suggestion-btn')) {
            const suggestion = e.target.textContent;
            chatInput.value = suggestion;
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate Riff's response
        setTimeout(() => {
            const response = generateRiffResponse(message.toLowerCase());
            addMessage(response.content, 'bot', response.suggestions);
        }, 1000);
    }
    
    function addMessage(content, sender, suggestions = []) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="message-content" style="background: var(--electric-blue); color: white; padding: 0.75rem; border-radius: 0.75rem; margin-left: 1rem; text-align: right;">
                    <p>${content}</p>
                </div>
            `;
        } else {
            const suggestionsHTML = suggestions.length > 0 ? `
                <div class="message-suggestions">
                    ${suggestions.map(s => `<button class="suggestion-btn">${s}</button>`).join('')}
                </div>
            ` : '';
            
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${content}</p>
                    ${suggestionsHTML}
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function generateRiffResponse(message) {
        const responses = {
            nfl: {
                content: "Oh man, you're talking my language! 🔥 NFL gear is absolutely FIRE right now! Chiefs gear is flying off the shelves after that championship run, and Cowboys fans are going crazy for the new vintage collections. What team are you repping?",
                suggestions: ["Show me Chiefs gear", "Cowboys merchandise", "Browse all NFL teams"]
            },
            ncaa: {
                content: "College ball, baby! 🏟️ Alabama crimson is always classic, but Ohio State is trending HARD with their throwback designs. Plus, March Madness gear is already heating up. Which school has your heart?",
                suggestions: ["Alabama gear", "Ohio State products", "Browse NCAA teams"]
            },
            custom: {
                content: "Now THIS is where the magic happens! ✨ Our custom gear designer is next level - you can create jerseys, hats, accessories with ANY team colors and fonts. Want me to walk you through it?",
                suggestions: ["Open custom designer", "Show me fonts", "Design examples"]
            },
            trending: {
                content: "Yo, let me drop some knowledge! 📈 Right now it's all about vintage-style snapbacks, oversized jerseys for that throwback vibe, and custom fan chains are HUGE! Fans are mixing classic with modern - it's beautiful!",
                suggestions: ["Show trending items", "Hats collection", "Latest arrivals"]
            },
            help: {
                content: "I got you covered! 🙌 I can help you find specific teams, explain our custom designer, show you what's trending, or just chat sports. What do you need, my friend?",
                suggestions: ["Site tour", "How to order", "Custom gear help"]
            }
        };
        
        if (message.includes('nfl') || message.includes('football')) {
            return responses.nfl;
        } else if (message.includes('ncaa') || message.includes('college')) {
            return responses.ncaa;
        } else if (message.includes('custom') || message.includes('design')) {
            return responses.custom;
        } else if (message.includes('trend') || message.includes('hot') || message.includes('popular')) {
            return responses.trending;
        } else if (message.includes('help') || message.includes('guide')) {
            return responses.help;
        }
        
        return {
            content: "That's interesting! 🤔 I'm here to help you find the perfect fan gear and give you the latest sports scoop. Want to explore some teams, check out custom options, or hear about what's trending?",
            suggestions: ["Browse teams", "Custom gear", "What's trending?"]
        };
    }
    
    function startVoiceRecognition() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            
            recognition.onstart = function() {
                isListening = true;
                voiceBtn.style.color = '#EF4444';
            };
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                chatInput.value = transcript;
                isListening = false;
                voiceBtn.style.color = '';
            };
            
            recognition.onerror = function() {
                isListening = false;
                voiceBtn.style.color = '';
            };
            
            recognition.onend = function() {
                isListening = false;
                voiceBtn.style.color = '';
            };
            
            recognition.start();
        } else {
            alert('Voice recognition not supported in this browser');
        }
    }
}

// Search
function initializeSearch() {
    const searchBtn = document.getElementById('search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            // For now, redirect to collections page
            window.location.href = 'collections.html';
        });
    }
}

// Cart
function initializeCart() {
    const cartBtn = document.getElementById('cart-btn');
    const cartCount = cartBtn.querySelector('.cart-count');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            // For now, redirect to WooCommerce store
            window.open('https://fanwaves.fun/shop/', '_blank');
        });
    }
    
    // Update cart count (this would normally come from your cart system)
    updateCartCount(0);
    
    function updateCartCount(count) {
        if (cartCount) {
            if (count > 0) {
                cartCount.textContent = count;
                cartCount.style.display = 'flex';
            } else {
                cartCount.style.display = 'none';
            }
        }
    }
}

// Featured Products
function loadFeaturedProducts() {
    const productsContainer = document.getElementById('featured-products');
    
    if (!productsContainer) return;
    
    // Sample products (in a real implementation, this would fetch from your API)
    const sampleProducts = [
        {
            id: 1,
            name: "Championship Hat",
            price: 29.99,
            originalPrice: 39.99,
            image: "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142",
            badge: "Bestseller",
            rating: 4.8,
            reviews: 124
        },
        {
            id: 2,
            name: "Team Jersey Pro",
            price: 89.99,
            originalPrice: 109.99,
            image: "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142",
            badge: "New",
            rating: 4.9,
            reviews: 89
        },
        {
            id: 3,
            name: "Fan Chain Deluxe",
            price: 19.99,
            originalPrice: 24.99,
            image: "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142",
            badge: "Hot",
            rating: 4.7,
            reviews: 156
        },
        {
            id: 4,
            name: "Terrible Towel Set",
            price: 15.99,
            originalPrice: 19.99,
            image: "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142",
            badge: "Sale",
            rating: 4.6,
            reviews: 203
        }
    ];
    
    // Try to fetch real products first (this would connect to your WooCommerce API)
    // For now, use sample products
    renderProducts(sampleProducts);
    
    function renderProducts(products) {
        const placeholderElement = productsContainer.querySelector('.product-placeholder');
        if (placeholderElement) {
            placeholderElement.remove();
        }
        
        products.forEach(product => {
            const productElement = createProductElement(product);
            productsContainer.appendChild(productElement);
        });
    }
    
    function createProductElement(product) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.style.cssText = `
            border: 1px solid var(--border);
            border-radius: 0.75rem;
            overflow: hidden;
            transition: all 0.3s ease;
            cursor: pointer;
            background: white;
        `;
        
        productDiv.innerHTML = `
            <div style="position: relative; aspect-ratio: 1; overflow: hidden; background: var(--muted);">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
                ${product.badge ? `<div style="position: absolute; top: 0.5rem; left: 0.5rem; background: var(--electric-blue); color: white; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 500;">${product.badge}</div>` : ''}
                <button style="position: absolute; top: 0.5rem; right: 0.5rem; width: 2rem; height: 2rem; border: none; border-radius: 0.25rem; background: white; cursor: pointer; opacity: 0; transition: opacity 0.3s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <svg style="width: 1rem; height: 1rem; stroke: currentColor; fill: none; stroke-width: 2;" viewBox="0 0 24 24">
                        <path d="m19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
                    </svg>
                </button>
            </div>
            <div style="padding: 1rem;">
                <h3 style="font-weight: 600; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.4;">${product.name}</h3>
                <div style="display: flex; align-items: center; gap: 0.25rem; margin-bottom: 0.5rem;">
                    <svg style="width: 1rem; height: 1rem; fill: #EAB308;" viewBox="0 0 24 24">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                    <span style="font-size: 0.875rem; font-weight: 500;">${product.rating}</span>
                    <span style="font-size: 0.875rem; color: var(--muted-foreground);">(${product.reviews})</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.125rem; font-weight: 700; color: var(--electric-blue);">$${product.price}</span>
                    ${product.originalPrice && product.originalPrice > product.price ? 
                        `<span style="font-size: 0.875rem; color: var(--muted-foreground); text-decoration: line-through;">$${product.originalPrice}</span>` : ''}
                </div>
            </div>
        `;
        
        // Add hover effects
        productDiv.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            const img = this.querySelector('img');
            const heartBtn = this.querySelector('button');
            if (img) img.style.transform = 'scale(1.05)';
            if (heartBtn) heartBtn.style.opacity = '1';
        });
        
        productDiv.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            const img = this.querySelector('img');
            const heartBtn = this.querySelector('button');
            if (img) img.style.transform = 'scale(1)';
            if (heartBtn) heartBtn.style.opacity = '0';
        });
        
        // Add click handler to redirect to store
        productDiv.addEventListener('click', function() {
            window.open('https://fanwaves.fun/shop/', '_blank');
        });
        
        return productDiv;
    }
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading states
function showLoading(element) {
    element.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--muted-foreground);">Loading...</div>';
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other scripts
window.FanWaves = {
    initializeNavigation,
    initializeChatbot,
    initializeSearch,
    initializeCart,
    loadFeaturedProducts,
    showLoading,
    formatPrice,
    debounce
};
