// Collections Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeCollections();
});

function initializeCollections() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productsGrid = document.getElementById('products-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    let currentFilter = 'all';
    let currentPage = 1;
    let allProducts = generateSampleProducts();
    
    // Initialize filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            currentFilter = this.dataset.filter;
            currentPage = 1;
            loadProducts(true);
        });
    });
    
    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            loadProducts(false);
        });
    }
    
    // Initial load
    loadProducts(true);
    
    function loadProducts(clearGrid = false) {
        if (clearGrid) {
            productsGrid.innerHTML = '';
        }
        
        const filteredProducts = filterProducts(allProducts, currentFilter);
        const productsPerPage = 12;
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = filteredProducts.slice(startIndex, endIndex);
        
        if (productsToShow.length === 0 && currentPage === 1) {
            showEmptyState();
            return;
        }
        
        productsToShow.forEach(product => {
            const productElement = createProductCard(product);
            productsGrid.appendChild(productElement);
        });
        
        // Show/hide load more button
        const hasMoreProducts = endIndex < filteredProducts.length;
        if (loadMoreBtn) {
            loadMoreBtn.style.display = hasMoreProducts ? 'inline-flex' : 'none';
        }
        
        // Update filter tab counts
        updateFilterCounts();
    }
    
    function filterProducts(products, filter) {
        switch (filter) {
            case 'featured':
                return products.filter(p => p.featured);
            case 'sale':
                return products.filter(p => p.onSale);
            case 'nfl':
                return products.filter(p => p.categories.includes('nfl'));
            case 'ncaa':
                return products.filter(p => p.categories.includes('ncaa'));
            case 'hats':
                return products.filter(p => p.categories.includes('hats'));
            case 'jerseys':
                return products.filter(p => p.categories.includes('jerseys'));
            case 'accessories':
                return products.filter(p => p.categories.includes('accessories'));
            default:
                return products;
        }
    }
    
    function updateFilterCounts() {
        filterTabs.forEach(tab => {
            const filter = tab.dataset.filter;
            const count = filterProducts(allProducts, filter).length;
            
            // Remove existing count badge
            const existingBadge = tab.querySelector('.count-badge');
            if (existingBadge) {
                existingBadge.remove();
            }
            
            // Add new count badge
            if (count > 0) {
                const badge = document.createElement('span');
                badge.className = 'count-badge';
                badge.textContent = count;
                badge.style.cssText = `
                    background: rgba(255, 255, 255, 0.2);
                    color: inherit;
                    padding: 0.125rem 0.375rem;
                    border-radius: 0.75rem;
                    font-size: 0.75rem;
                    margin-left: 0.5rem;
                `;
                tab.appendChild(badge);
            }
        });
    }
    
    function createProductCard(product) {
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
        
        const badgeColor = product.featured ? 'var(--electric-blue)' : 
                          product.onSale ? '#EF4444' : 
                          product.rating > 4.7 ? '#F97316' : '';
        
        const badgeText = product.featured ? 'Featured' : 
                         product.onSale ? 'Sale' : 
                         product.rating > 4.7 ? 'Popular' : '';
        
        productDiv.innerHTML = `
            <div style="position: relative; aspect-ratio: 1; overflow: hidden; background: var(--muted);">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
                ${badgeText ? `<div style="position: absolute; top: 0.5rem; left: 0.5rem; background: ${badgeColor}; color: white; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 500;">${badgeText}</div>` : ''}
                <button style="position: absolute; top: 0.5rem; right: 0.5rem; width: 2rem; height: 2rem; border: none; border-radius: 0.25rem; background: white; cursor: pointer; opacity: 0; transition: opacity 0.3s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <svg style="width: 1rem; height: 1rem; stroke: currentColor; fill: none; stroke-width: 2;" viewBox="0 0 24 24">
                        <path d="m19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
                    </svg>
                </button>
            </div>
            <div style="padding: 1rem;">
                <h3 style="font-weight: 600; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${product.name}</h3>
                <div style="display: flex; align-items: center; gap: 0.25rem; margin-bottom: 0.5rem;">
                    <svg style="width: 1rem; height: 1rem; fill: #EAB308;" viewBox="0 0 24 24">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                    <span style="font-size: 0.875rem; font-weight: 500;">${product.rating}</span>
                    <span style="font-size: 0.875rem; color: var(--muted-foreground);">(${product.reviews})</span>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.125rem; font-weight: 700; color: var(--electric-blue);">$${product.price}</span>
                        ${product.originalPrice && product.originalPrice > product.price ? 
                            `<span style="font-size: 0.875rem; color: var(--muted-foreground); text-decoration: line-through;">$${product.originalPrice}</span>` : ''}
                    </div>
                    <button style="background: var(--electric-blue); color: white; border: none; padding: 0.375rem; border-radius: 0.25rem; cursor: pointer; transition: background 0.2s ease;" onmouseover="this.style.background='#0284C7'" onmouseout="this.style.background='var(--electric-blue)'">
                        <svg style="width: 1rem; height: 1rem; fill: currentColor;" viewBox="0 0 24 24">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                        </svg>
                    </button>
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
        productDiv.addEventListener('click', function(e) {
            // Don't redirect if clicking on buttons
            if (e.target.closest('button')) {
                e.stopPropagation();
                if (e.target.closest('button').querySelector('svg[viewBox="0 0 24 24"]').querySelector('path[d^="M6 2"]')) {
                    // Shop button clicked
                    window.open('https://fanwaves.fun/shop/', '_blank');
                }
                return;
            }
            window.open('https://fanwaves.fun/shop/', '_blank');
        });
        
        return productDiv;
    }
    
    function showEmptyState() {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--muted); border-radius: 0.75rem;">
                <svg style="width: 3rem; height: 3rem; color: var(--muted-foreground); margin: 0 auto 1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/>
                    <rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
                </svg>
                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">No products found</h3>
                <p style="color: var(--muted-foreground); margin-bottom: 1rem;">
                    ${currentFilter === 'all' 
                        ? 'Add products to your WooCommerce store to see them here'
                        : `No products found in the ${currentFilter} category`
                    }
                </p>
                <a href="https://fanwaves.fun/shop/wp-admin/" target="_blank" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--electric-blue); color: white; text-decoration: none; border-radius: 0.375rem; font-size: 0.875rem;">
                    <svg style="width: 1rem; height: 1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/>
                    </svg>
                    Manage Products
                </a>
            </div>
        `;
    }
}

function generateSampleProducts() {
    const teams = ['Chiefs', 'Cowboys', 'Patriots', 'Packers', 'Steelers', 'Bears', 'Alabama', 'Ohio State', 'LSU', 'Georgia'];
    const productTypes = ['Hat', 'Jersey', 'T-Shirt', 'Hoodie', 'Chain', 'Towel', 'Flag', 'Keychain'];
    const products = [];
    
    for (let i = 1; i <= 50; i++) {
        const team = teams[Math.floor(Math.random() * teams.length)];
        const type = productTypes[Math.floor(Math.random() * productTypes.length)];
        const isNFL = ['Chiefs', 'Cowboys', 'Patriots', 'Packers', 'Steelers', 'Bears'].includes(team);
        const basePrice = Math.floor(Math.random() * 80) + 20;
        const onSale = Math.random() > 0.7;
        const salePrice = onSale ? basePrice * 0.8 : basePrice;
        
        const categories = [];
        if (isNFL) categories.push('nfl');
        else categories.push('ncaa');
        
        if (type.includes('Hat')) categories.push('hats');
        if (type.includes('Jersey')) categories.push('jerseys');
        if (['Chain', 'Towel', 'Flag', 'Keychain'].includes(type)) categories.push('accessories');
        
        products.push({
            id: i,
            name: `${team} ${type}${type.includes('Hat') ? '' : ' Pro'}`,
            price: salePrice.toFixed(2),
            originalPrice: onSale ? basePrice.toFixed(2) : null,
            image: "https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2Fad6f2c397bda47a88accb39f279bf142",
            rating: (Math.random() * 1.5 + 3.5).toFixed(1),
            reviews: Math.floor(Math.random() * 200) + 20,
            featured: Math.random() > 0.8,
            onSale: onSale,
            categories: categories
        });
    }
    
    return products;
}
