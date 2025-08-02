# Thirsty Soda Shop - POS System

A modern, feature-rich Point of Sale (POS) system designed specifically for "Thirsty" the soda shop. Built with vanilla HTML, CSS, and JavaScript for simplicity and ease of deployment.

## 🥤 Features

### Core POS Functionality
- **Product Management**: Pre-loaded with sodas, juices, water, and snacks
- **Shopping Cart**: Add, remove, and modify quantities with real-time updates
- **Category Filtering**: Easy navigation through product categories
- **Tax Calculation**: Automatic 8.5% tax calculation
- **Payment Processing**: Support for cash and card payments
- **Receipt Generation**: Professional receipts with print functionality

### Advanced Features
- **Cash Payment Modal**: Detailed cash handling with change calculation
- **Quick Payment Buttons**: Fast payment amount selection
- **Order History**: Complete transaction history with local storage
- **Real-time Notifications**: User feedback for all actions
- **Local Storage**: Persistent cart and order data
- **Responsive Design**: Works on desktop, tablets, and mobile devices

### User Interface
- **Modern Design**: Vibrant gradient backgrounds and smooth animations
- **Intuitive Layout**: Two-panel design with products and cart
- **Touch-Friendly**: Large buttons optimized for touch screens
- **Visual Feedback**: Hover effects and interactive elements
- **Professional Receipts**: Thermal printer-style receipt layout

## 🚀 Getting Started

### Installation
1. Clone or download the project files
2. Ensure you have the following files:
   - `pos.html` (main application)
   - `pos-styles.css` (styling)
   - `pos-script.js` (functionality)
3. Open `pos.html` in a web browser

### No Dependencies Required
This POS system uses only vanilla web technologies:
- HTML5
- CSS3 (with Flexbox and Grid)
- JavaScript (ES6+)
- Font Awesome (CDN)
- Google Fonts (CDN)

## 💼 Usage Guide

### Starting a Sale
1. Click on products to add them to the cart
2. Use category filters to find products quickly
3. Adjust quantities using +/- buttons in the cart
4. Remove items using the × button

### Processing Payment
1. Select payment method (Cash or Card)
2. For cash payments:
   - Enter amount received or use quick amount buttons
   - System calculates change automatically
   - Complete payment when sufficient cash received
3. For card payments:
   - Payment processes immediately (demo mode)

### Receipt Management
- Receipt automatically displays after payment
- Print option available for physical receipts
- All receipts saved in order history

### Order History
- View all completed transactions
- Search through past orders
- Complete order details including items and totals

## 📦 Product Catalog

### Sodas ($2.25 - $2.75)
- Coca Cola, Pepsi, Sprite, Orange Crush
- Root Beer, Dr Pepper, Mountain Dew, Ginger Ale

### Juices ($3.00 - $3.75)
- Orange, Apple, Cranberry, Grape
- Pineapple, Lemonade

### Water ($1.50 - $3.50)
- Bottled Water, Sparkling Water
- Flavored Water, Coconut Water

### Snacks ($1.50 - $3.00)
- Potato Chips, Pretzels, Candy Bar
- Gummies, Nuts, Crackers

## 🎨 Customization

### Adding New Products
Edit the `initializeProducts()` method in `pos-script.js`:
```javascript
{ id: 25, name: 'New Product', price: 2.99, category: 'sodas', icon: '🥤' }
```

### Modifying Tax Rate
Change the tax rate in the constructor:
```javascript
this.taxRate = 0.085; // 8.5% tax
```

### Styling Customization
Modify `pos-styles.css` to change:
- Color schemes
- Layout dimensions
- Animation effects
- Typography

## 📱 Responsive Design

The POS system automatically adapts to different screen sizes:

### Desktop (1024px+)
- Two-column layout (products + cart)
- Full feature set enabled
- Optimized for mouse interaction

### Tablet (768px - 1024px)
- Single column layout
- Touch-optimized buttons
- Simplified navigation

### Mobile (480px - 768px)
- Compact product grid
- Streamlined interface
- One-handed operation support

### Small Mobile (<480px)
- Minimal product cards
- Simplified layouts
- Essential features only

## 💾 Data Storage

### Local Storage
- Cart contents persist between sessions
- Order history saved locally
- No server required for basic operation

### Data Structure
```javascript
// Cart items
{
  id: number,
  name: string,
  price: number,
  quantity: number
}

// Order history
{
  id: timestamp,
  date: ISO string,
  items: array,
  subtotal: number,
  tax: number,
  total: number,
  paymentMethod: string,
  cashReceived?: number,
  change?: number
}
```

## 🔧 Technical Specifications

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance
- Lightweight: ~20KB total file size
- Fast loading: No external dependencies
- Smooth animations: CSS transitions and transforms
- Efficient rendering: Minimal DOM manipulation

### Security
- No sensitive data transmission
- Local storage only
- No external API calls
- Client-side only operation

## 🎯 Future Enhancements

Potential features for future versions:
- Barcode scanning support
- Multi-user cashier system
- Sales reporting and analytics
- Inventory management
- Customer loyalty program
- Cloud data synchronization
- Multiple payment gateways
- Multi-language support

## 🛠 Troubleshooting

### Common Issues
1. **Products not loading**: Check JavaScript console for errors
2. **Cart not persisting**: Ensure localStorage is enabled
3. **Responsive issues**: Clear browser cache and reload
4. **Print not working**: Check browser popup settings

### Browser Support
If you experience issues, ensure your browser supports:
- ES6 JavaScript features
- CSS Grid and Flexbox
- Local Storage API
- Modern CSS features

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the Thirsty POS system.

---

**Thirsty Soda Shop POS** - Refreshing your retail experience! 🥤✨