// POS System JavaScript
class ThirstyPOS {
    constructor() {
        this.products = [];
        this.cart = [];
        this.currentOrder = null;
        this.orderHistory = [];
        this.selectedPaymentMethod = null;
        this.taxRate = 0.085; // 8.5% tax
        
        this.initializeProducts();
        this.loadData();
        this.renderProducts();
        this.updateCartDisplay();
        this.loadOrderHistory();
    }

    initializeProducts() {
        this.products = [
            // Sodas
            { id: 1, name: 'Coca Cola', price: 2.50, category: 'sodas', icon: '🥤' },
            { id: 2, name: 'Pepsi', price: 2.50, category: 'sodas', icon: '🥤' },
            { id: 3, name: 'Sprite', price: 2.25, category: 'sodas', icon: '🥤' },
            { id: 4, name: 'Orange Crush', price: 2.75, category: 'sodas', icon: '🍊' },
            { id: 5, name: 'Root Beer', price: 2.50, category: 'sodas', icon: '🥤' },
            { id: 6, name: 'Dr Pepper', price: 2.50, category: 'sodas', icon: '🥤' },
            { id: 7, name: 'Mountain Dew', price: 2.75, category: 'sodas', icon: '🥤' },
            { id: 8, name: 'Ginger Ale', price: 2.25, category: 'sodas', icon: '🥤' },
            
            // Juices
            { id: 9, name: 'Orange Juice', price: 3.50, category: 'juices', icon: '🍊' },
            { id: 10, name: 'Apple Juice', price: 3.25, category: 'juices', icon: '🍎' },
            { id: 11, name: 'Cranberry Juice', price: 3.75, category: 'juices', icon: '🫐' },
            { id: 12, name: 'Grape Juice', price: 3.50, category: 'juices', icon: '🍇' },
            { id: 13, name: 'Pineapple Juice', price: 3.75, category: 'juices', icon: '🍍' },
            { id: 14, name: 'Lemonade', price: 3.00, category: 'juices', icon: '🍋' },
            
            // Water
            { id: 15, name: 'Bottled Water', price: 1.50, category: 'water', icon: '💧' },
            { id: 16, name: 'Sparkling Water', price: 2.00, category: 'water', icon: '💧' },
            { id: 17, name: 'Flavored Water', price: 2.25, category: 'water', icon: '💧' },
            { id: 18, name: 'Coconut Water', price: 3.50, category: 'water', icon: '🥥' },
            
            // Snacks
            { id: 19, name: 'Potato Chips', price: 2.00, category: 'snacks', icon: '🍟' },
            { id: 20, name: 'Pretzels', price: 1.75, category: 'snacks', icon: '🥨' },
            { id: 21, name: 'Candy Bar', price: 1.50, category: 'snacks', icon: '🍫' },
            { id: 22, name: 'Gummies', price: 2.25, category: 'snacks', icon: '🍬' },
            { id: 23, name: 'Nuts', price: 3.00, category: 'snacks', icon: '🥜' },
            { id: 24, name: 'Crackers', price: 1.75, category: 'snacks', icon: '🍘' }
        ];
    }

    loadData() {
        const savedCart = localStorage.getItem('thirsty_cart');
        const savedOrderHistory = localStorage.getItem('thirsty_order_history');
        
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
        
        if (savedOrderHistory) {
            this.orderHistory = JSON.parse(savedOrderHistory);
        }
    }

    saveData() {
        localStorage.setItem('thirsty_cart', JSON.stringify(this.cart));
        localStorage.setItem('thirsty_order_history', JSON.stringify(this.orderHistory));
    }

    renderProducts(category = 'all') {
        const productsGrid = document.getElementById('productsGrid');
        const filteredProducts = category === 'all' 
            ? this.products 
            : this.products.filter(product => product.category === category);

        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" onclick="pos.addToCart(${product.id})">
                <div class="product-image">${product.icon}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-category">${product.category}</div>
            </div>
        `).join('');
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        this.updateCartDisplay();
        this.saveData();
        this.showNotification(`${product.name} added to cart!`);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartDisplay();
        this.saveData();
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeFromCart(productId);
        } else {
            this.updateCartDisplay();
            this.saveData();
        }
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const subtotalEl = document.getElementById('subtotal');
        const taxEl = document.getElementById('tax');
        const totalEl = document.getElementById('total');
        const checkoutBtn = document.getElementById('checkoutBtn');

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Cart is empty</p>
                </div>
            `;
            checkoutBtn.disabled = true;
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div class="item-info">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price">$${item.price.toFixed(2)} each</div>
                    </div>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="pos.updateQuantity(${item.id}, -1)">-</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn" onclick="pos.updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="pos.removeFromCart(${item.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');
            checkoutBtn.disabled = false;
        }

        // Calculate totals
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * this.taxRate;
        const total = subtotal + tax;

        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        taxEl.textContent = `$${tax.toFixed(2)}`;
        totalEl.textContent = `$${total.toFixed(2)}`;
    }

    clearCart() {
        if (this.cart.length === 0) return;
        
        if (confirm('Are you sure you want to clear the cart?')) {
            this.cart = [];
            this.updateCartDisplay();
            this.saveData();
            this.showNotification('Cart cleared!');
        }
    }

    processPayment(method) {
        if (this.cart.length === 0) {
            this.showNotification('Cart is empty!', 'error');
            return;
        }

        this.selectedPaymentMethod = method;
        
        // Update payment button states
        document.querySelectorAll('.payment-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        event.target.classList.add('selected');

        if (method === 'cash') {
            this.openCashPaymentModal();
        } else if (method === 'card') {
            // For demo purposes, we'll process card payments immediately
            this.completeOrder('card');
        }
    }

    openCashPaymentModal() {
        const modal = document.getElementById('cashPaymentModal');
        const total = this.calculateTotal();
        
        document.getElementById('cashTotal').textContent = `$${total.toFixed(2)}`;
        document.getElementById('cashReceived').value = '';
        document.getElementById('changeAmount').textContent = '$0.00';
        document.getElementById('completeCashBtn').disabled = true;
        
        modal.style.display = 'block';
    }

    calculateChange() {
        const total = this.calculateTotal();
        const cashReceived = parseFloat(document.getElementById('cashReceived').value) || 0;
        const change = cashReceived - total;
        
        document.getElementById('changeAmount').textContent = `$${Math.max(0, change).toFixed(2)}`;
        document.getElementById('completeCashBtn').disabled = change < 0;
    }

    setCashAmount(amount) {
        document.getElementById('cashReceived').value = amount.toFixed(2);
        this.calculateChange();
    }

    setExactAmount() {
        const total = this.calculateTotal();
        document.getElementById('cashReceived').value = total.toFixed(2);
        this.calculateChange();
    }

    completeCashPayment() {
        const cashReceived = parseFloat(document.getElementById('cashReceived').value);
        const total = this.calculateTotal();
        
        if (cashReceived >= total) {
            this.closeModal('cashPaymentModal');
            this.completeOrder('cash', cashReceived);
        }
    }

    calculateTotal() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return subtotal + (subtotal * this.taxRate);
    }

    processOrder() {
        if (!this.selectedPaymentMethod) {
            this.showNotification('Please select a payment method!', 'error');
            return;
        }

        if (this.selectedPaymentMethod === 'cash') {
            this.openCashPaymentModal();
        } else {
            this.completeOrder(this.selectedPaymentMethod);
        }
    }

    completeOrder(paymentMethod, cashReceived = null) {
        const order = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: [...this.cart],
            subtotal: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            tax: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * this.taxRate,
            total: this.calculateTotal(),
            paymentMethod: paymentMethod,
            cashReceived: cashReceived,
            change: cashReceived ? Math.max(0, cashReceived - this.calculateTotal()) : 0
        };

        this.orderHistory.unshift(order);
        this.currentOrder = order;
        
        // Clear cart
        this.cart = [];
        this.selectedPaymentMethod = null;
        
        // Update display
        this.updateCartDisplay();
        this.saveData();
        
        // Reset payment buttons
        document.querySelectorAll('.payment-btn').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Show receipt
        this.showReceipt(order);
        this.showNotification('Order completed successfully!', 'success');
    }

    showReceipt(order) {
        const modal = document.getElementById('receiptModal');
        const receiptContent = document.getElementById('receiptContent');
        
        const receiptHTML = `
            <div class="receipt-header">
                <h3>THIRSTY SODA SHOP</h3>
                <p>123 Main Street</p>
                <p>Anytown, USA 12345</p>
                <p>Tel: (555) 123-4567</p>
                <hr>
                <p>Order #: ${order.id}</p>
                <p>Date: ${new Date(order.date).toLocaleString()}</p>
                <p>Cashier: Admin</p>
            </div>
            
            <div class="receipt-items">
                ${order.items.map(item => `
                    <div class="receipt-item">
                        <span>${item.name} (x${item.quantity})</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="receipt-total">
                <div class="receipt-item">
                    <span>Subtotal:</span>
                    <span>$${order.subtotal.toFixed(2)}</span>
                </div>
                <div class="receipt-item">
                    <span>Tax (8.5%):</span>
                    <span>$${order.tax.toFixed(2)}</span>
                </div>
                <div class="receipt-item">
                    <strong>Total: $${order.total.toFixed(2)}</strong>
                </div>
                ${order.paymentMethod === 'cash' ? `
                    <div class="receipt-item">
                        <span>Cash Received:</span>
                        <span>$${order.cashReceived.toFixed(2)}</span>
                    </div>
                    <div class="receipt-item">
                        <span>Change:</span>
                        <span>$${order.change.toFixed(2)}</span>
                    </div>
                ` : ''}
                <div class="receipt-item">
                    <span>Payment:</span>
                    <span>${order.paymentMethod.toUpperCase()}</span>
                </div>
            </div>
            
            <div class="receipt-footer">
                <p>Thank you for your business!</p>
                <p>Have a refreshing day!</p>
            </div>
        `;
        
        receiptContent.innerHTML = receiptHTML;
        modal.style.display = 'block';
    }

    printReceipt() {
        const receiptContent = document.getElementById('receiptContent').innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Receipt</title>
                    <style>
                        body { font-family: 'Courier New', monospace; margin: 20px; }
                        .receipt { max-width: 300px; }
                        .receipt-item { display: flex; justify-content: space-between; }
                        hr { border: 1px dashed #ccc; }
                    </style>
                </head>
                <body>
                    <div class="receipt">${receiptContent}</div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }

    openOrderHistory() {
        const modal = document.getElementById('orderHistoryModal');
        this.loadOrderHistory();
        modal.style.display = 'block';
    }

    loadOrderHistory() {
        const orderHistoryContent = document.getElementById('orderHistoryContent');
        
        if (this.orderHistory.length === 0) {
            orderHistoryContent.innerHTML = '<p>No orders found.</p>';
            return;
        }

        orderHistoryContent.innerHTML = this.orderHistory.map(order => `
            <div class="order-item">
                <div class="order-header">
                    <span class="order-id">Order #${order.id}</span>
                    <span class="order-date">${new Date(order.date).toLocaleDateString()}</span>
                    <span class="order-total">$${order.total.toFixed(2)}</span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
                </div>
            </div>
        `).join('');
    }

    openSettings() {
        this.showNotification('Settings feature coming soon!', 'info');
    }

    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('.notification-styles')) {
            const style = document.createElement('style');
            style.className = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    min-width: 250px;
                    animation: slideInRight 0.3s ease;
                }
                .notification-info { background: #667eea; }
                .notification-success { background: #28a745; }
                .notification-error { background: #dc3545; }
                .notification button {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 0;
                    line-height: 1;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }
}

// Global functions for HTML onclick events
function filterCategory(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter products
    pos.renderProducts(category);
}

function clearCart() {
    pos.clearCart();
}

function processPayment(method) {
    pos.processPayment(method);
}

function processOrder() {
    pos.processOrder();
}

function openOrderHistory() {
    pos.openOrderHistory();
}

function openSettings() {
    pos.openSettings();
}

function closeModal(modalId) {
    pos.closeModal(modalId);
}

function printReceipt() {
    pos.printReceipt();
}

function calculateChange() {
    pos.calculateChange();
}

function setCashAmount(amount) {
    pos.setCashAmount(amount);
}

function setExactAmount() {
    pos.setExactAmount();
}

function completeCashPayment() {
    pos.completeCashPayment();
}

// Initialize POS system when DOM is loaded
let pos;
document.addEventListener('DOMContentLoaded', function() {
    pos = new ThirstyPOS();
});

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}