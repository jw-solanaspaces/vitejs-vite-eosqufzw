import React, { useState, useEffect } from 'react';
import { Heart, X, Flame, Trash2, RotateCcw, BarChart3 } from 'lucide-react';

// Sample product data - easily replaceable
const SAMPLE_PRODUCTS = [
  { id: 1, name: "Vintage Graphic Tee", brand: "RetroWear", category: "tshirt", image: "https://picsum.photos/seed/tee1/400/500" },
  { id: 2, name: "Oversized Hoodie", brand: "UrbanStyle", category: "hoodie", image: "https://picsum.photos/seed/hoodie1/400/500" },
  { id: 3, name: "Denim Shorts", brand: "SummerVibes", category: "shorts", image: "https://picsum.photos/seed/shorts1/400/500" },
  { id: 4, name: "Snapback Cap", brand: "HeadGame", category: "hat", image: "https://picsum.photos/seed/hat1/400/500" },
  { id: 5, name: "Enamel Keychain", brand: "TinyTreasures", category: "keychain", image: "https://picsum.photos/seed/keychain1/400/500" },
  { id: 6, name: "Street Art Book", brand: "CulturePress", category: "book", image: "https://picsum.photos/seed/book1/400/500" },
  { id: 7, name: "Canvas Print", brand: "WallArt Co", category: "art", image: "https://picsum.photos/seed/art1/400/500" },
  { id: 8, name: "Bomber Jacket", brand: "StreetLux", category: "jacket", image: "https://picsum.photos/seed/jacket1/400/500" },
  { id: 9, name: "Logo Beanie", brand: "WinterFresh", category: "hat", image: "https://picsum.photos/seed/beanie1/400/500" },
  { id: 10, name: "Graphic Crewneck", brand: "RetroWear", category: "tshirt", image: "https://picsum.photos/seed/crew1/400/500" },
  { id: 11, name: "Tech Fleece Joggers", brand: "UrbanStyle", category: "pants", image: "https://picsum.photos/seed/joggers1/400/500" },
  { id: 12, name: "Tote Bag", brand: "EcoCarry", category: "bag", image: "https://picsum.photos/seed/tote1/400/500" },
  { id: 13, name: "Enamel Pin Set", brand: "TinyTreasures", category: "accessories", image: "https://picsum.photos/seed/pins1/400/500" },
  { id: 14, name: "Windbreaker", brand: "OutdoorCo", category: "jacket", image: "https://picsum.photos/seed/windbreaker1/400/500" },
  { id: 15, name: "Bucket Hat", brand: "SummerVibes", category: "hat", image: "https://picsum.photos/seed/bucket1/400/500" },
  { id: 16, name: "Poster Print", brand: "WallArt Co", category: "art", image: "https://picsum.photos/seed/poster1/400/500" },
  { id: 17, name: "Cargo Shorts", brand: "StreetLux", category: "shorts", image: "https://picsum.photos/seed/cargo1/400/500" },
  { id: 18, name: "Zip Hoodie", brand: "UrbanStyle", category: "hoodie", image: "https://picsum.photos/seed/ziphoodie1/400/500" },
  { id: 19, name: "Leather Keychain", brand: "TinyTreasures", category: "keychain", image: "https://picsum.photos/seed/leather1/400/500" },
  { id: 20, name: "Photography Book", brand: "CulturePress", category: "book", image: "https://picsum.photos/seed/photobook1/400/500" },
  { id: 21, name: "Long Sleeve Tee", brand: "RetroWear", category: "tshirt", image: "https://picsum.photos/seed/longtee1/400/500" },
  { id: 22, name: "Crossbody Bag", brand: "EcoCarry", category: "bag", image: "https://picsum.photos/seed/crossbody1/400/500" },
  { id: 23, name: "Track Pants", brand: "StreetLux", category: "pants", image: "https://picsum.photos/seed/track1/400/500" },
  { id: 24, name: "Dad Hat", brand: "HeadGame", category: "hat", image: "https://picsum.photos/seed/dadhat1/400/500" },
  { id: 25, name: "Framed Art", brand: "WallArt Co", category: "art", image: "https://picsum.photos/seed/framed1/400/500" }
];

export default function ProductSwiper() {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [lastSwipeDirection, setLastSwipeDirection] = useState(null);
  const [adminView, setAdminView] = useState('analytics'); // 'analytics' or 'products'
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    category: '',
    image: ''
  });

  const currentProduct = products[currentIndex];
  const isComplete = currentIndex >= products.length;

  const handleSwipe = (direction) => {
    if (isComplete) return;

    const swipe = {
      productId: currentProduct.id,
      product: currentProduct,
      direction,
      timestamp: new Date().toISOString()
    };

    setLastSwipeDirection(direction);
    
    // Animate card off screen
    const distance = 1000;
    if (direction === 'left') setDragOffset({ x: -distance, y: 0 });
    if (direction === 'right') setDragOffset({ x: distance, y: 0 });
    if (direction === 'up') setDragOffset({ x: 0, y: -distance });
    if (direction === 'down') setDragOffset({ x: 0, y: distance });
    
    setSwipeHistory([...swipeHistory, swipe]);
    
    // Delay the card change to show the animation
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setDragOffset({ x: 0, y: 0 });
      setRotation(0);
      setLastSwipeDirection(null);

      if (currentIndex + 1 >= products.length) {
        setShowEmailCapture(true);
      }
    }, 300);
  };

  const handleUndo = () => {
    if (swipeHistory.length === 0) return;
    
    setLastSwipeDirection(null);
    const newHistory = [...swipeHistory];
    newHistory.pop();
    setSwipeHistory(newHistory);
    setCurrentIndex(Math.max(0, currentIndex - 1));
    setShowEmailCapture(false);
  };

  const handleMouseDown = (e) => {
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleTouchStart = (e) => {
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleMouseMove = (e) => {
    if (!dragStart) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setDragOffset({ x: dx, y: dy });
    setRotation(dx * 0.1);
  };

  const handleTouchMove = (e) => {
    if (!dragStart) return;
    const dx = e.touches[0].clientX - dragStart.x;
    const dy = e.touches[0].clientY - dragStart.y;
    setDragOffset({ x: dx, y: dy });
    setRotation(dx * 0.1);
  };

  const handleMouseUp = () => {
    if (!dragStart) return;
    
    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      handleSwipe(dragOffset.x > 0 ? 'right' : 'left');
    } else if (Math.abs(dragOffset.y) > threshold) {
      handleSwipe(dragOffset.y < 0 ? 'up' : 'down');
    } else {
      setDragOffset({ x: 0, y: 0 });
      setRotation(0);
    }
    
    setDragStart(null);
  };

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setAdminView('analytics');
    } else {
      alert('Incorrect password');
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.brand || !newProduct.category) {
      alert('Please fill in all required fields');
      return;
    }

    const product = {
      id: Math.max(...products.map(p => p.id)) + 1,
      ...newProduct,
      image: newProduct.image || `https://picsum.photos/seed/${newProduct.name}/400/500`
    };

    setProducts([...products, product]);
    setNewProduct({ name: '', brand: '', category: '', image: '' });
    alert('Product added successfully!');
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleUpdateProduct = () => {
    if (!editingProduct.name || !editingProduct.brand || !editingProduct.category) {
      alert('Please fill in all required fields');
      return;
    }

    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
    alert('Product updated successfully!');
  };

  const getSwipeStats = () => {
    const stats = {
      total: swipeHistory.length,
      like: swipeHistory.filter(s => s.direction === 'right').length,
      pass: swipeHistory.filter(s => s.direction === 'left').length,
      love: swipeHistory.filter(s => s.direction === 'up').length,
      never: swipeHistory.filter(s => s.direction === 'down').length,
      byCategory: {},
      byProduct: {}
    };

    swipeHistory.forEach(swipe => {
      const cat = swipe.product.category;
      if (!stats.byCategory[cat]) {
        stats.byCategory[cat] = { like: 0, pass: 0, love: 0, never: 0 };
      }
      stats.byCategory[cat][swipe.direction === 'right' ? 'like' : 
                            swipe.direction === 'left' ? 'pass' :
                            swipe.direction === 'up' ? 'love' : 'never']++;

      const prodName = swipe.product.name;
      if (!stats.byProduct[prodName]) {
        stats.byProduct[prodName] = { like: 0, pass: 0, love: 0, never: 0 };
      }
      stats.byProduct[prodName][swipe.direction === 'right' ? 'like' : 
                                 swipe.direction === 'left' ? 'pass' :
                                 swipe.direction === 'up' ? 'love' : 'never']++;
    });

    return stats;
  };

  if (showAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-purple-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-4 text-purple-900">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4"
            onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
          />
          <button
            onClick={handleAdminLogin}
            className="w-full bg-purple-900 text-white p-3 rounded font-semibold hover:bg-purple-800"
          >
            Login
          </button>
          <button
            onClick={() => setShowAdmin(false)}
            className="w-full mt-2 text-purple-900 p-3 rounded font-semibold hover:bg-gray-100"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    const stats = getSwipeStats();
    return (
      <div className="min-h-screen bg-purple-900 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button
              onClick={() => { setIsAdmin(false); setShowAdmin(false); setAdminPassword(''); }}
              className="bg-white text-purple-900 px-4 py-2 rounded font-semibold hover:bg-gray-100"
            >
              Logout
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setAdminView('analytics')}
              className={`px-6 py-3 rounded font-semibold ${
                adminView === 'analytics' 
                  ? 'bg-white text-purple-900' 
                  : 'bg-purple-800 text-white hover:bg-purple-700'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setAdminView('products')}
              className={`px-6 py-3 rounded font-semibold ${
                adminView === 'products' 
                  ? 'bg-white text-purple-900' 
                  : 'bg-purple-800 text-white hover:bg-purple-700'
              }`}
            >
              Manage Products ({products.length})
            </button>
          </div>

          {/* Analytics View */}
          {adminView === 'analytics' && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-purple-800 p-6 rounded-lg">
                  <div className="text-3xl font-bold">{stats.total}</div>
                  <div className="text-purple-200">Total Swipes</div>
                </div>
                <div className="bg-green-600 p-6 rounded-lg">
                  <div className="text-3xl font-bold">{stats.like}</div>
                  <div className="text-green-100">Likes</div>
                </div>
                <div className="bg-red-600 p-6 rounded-lg">
                  <div className="text-3xl font-bold">{stats.love}</div>
                  <div className="text-red-100">Loves</div>
                </div>
                <div className="bg-gray-600 p-6 rounded-lg">
                  <div className="text-3xl font-bold">{stats.pass}</div>
                  <div className="text-gray-100">Passes</div>
                </div>
              </div>

              <div className="bg-white text-purple-900 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Swipes by Category</h2>
                {Object.entries(stats.byCategory).map(([category, counts]) => (
                  <div key={category} className="mb-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="font-semibold capitalize mb-2">{category}</div>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div>Like: {counts.like}</div>
                      <div>Pass: {counts.pass}</div>
                      <div>Love: {counts.love}</div>
                      <div>Never: {counts.never}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white text-purple-900 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Top Products</h2>
                {Object.entries(stats.byProduct)
                  .sort((a, b) => (b[1].like + b[1].love) - (a[1].like + a[1].love))
                  .slice(0, 10)
                  .map(([product, counts]) => (
                    <div key={product} className="mb-3 pb-3 border-b border-gray-200 last:border-0">
                      <div className="font-semibold mb-1">{product}</div>
                      <div className="grid grid-cols-4 gap-2 text-sm text-gray-600">
                        <div>Like: {counts.like}</div>
                        <div>Pass: {counts.pass}</div>
                        <div>Love: {counts.love}</div>
                        <div>Never: {counts.never}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}

          {/* Products View */}
          {adminView === 'products' && (
            <>
              {/* Add New Product */}
              <div className="bg-white text-purple-900 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Product Name *"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="p-3 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Brand Name *"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                    className="p-3 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Category (e.g., tshirt, hoodie) *"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value.toLowerCase()})}
                    className="p-3 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Image URL (optional)"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    className="p-3 border border-gray-300 rounded"
                  />
                </div>
                <button
                  onClick={handleAddProduct}
                  className="mt-4 bg-purple-900 text-white px-6 py-3 rounded font-semibold hover:bg-purple-800"
                >
                  Add Product
                </button>
              </div>

              {/* Product List */}
              <div className="bg-white text-purple-900 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">All Products</h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {products.map(product => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                      {editingProduct?.id === product.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                          <input
                            type="text"
                            value={editingProduct.brand}
                            onChange={(e) => setEditingProduct({...editingProduct, brand: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                          <input
                            type="text"
                            value={editingProduct.category}
                            onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                          <input
                            type="text"
                            value={editingProduct.image}
                            onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Image URL"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleUpdateProduct}
                              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingProduct(null)}
                              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="font-semibold">{product.name}</div>
                            <div className="text-sm text-gray-600">
                              {product.brand} • <span className="capitalize">{product.category}</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">ID: {product.id}</div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (showEmailCapture) {
    const liked = swipeHistory.filter(s => s.direction === 'right' || s.direction === 'up');
    
    return (
      <div className="min-h-screen bg-purple-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold mb-6 text-center">You've seen everything! 🎉</h1>
          <div className="bg-purple-800 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Your Liked Products ({liked.length})</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {liked.map(swipe => (
                <div key={swipe.productId} className="flex items-center gap-3 bg-purple-700 p-3 rounded">
                  <img src={swipe.product.image} alt={swipe.product.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{swipe.product.name}</div>
                    <div className="text-sm text-purple-200">{swipe.product.brand}</div>
                  </div>
                  {swipe.direction === 'up' && <Flame className="text-red-400" size={20} />}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-purple-900">
            <h3 className="text-xl font-bold mb-3">Get 15% off your first order!</h3>
            <p className="mb-4 text-sm">Enter your email to receive your discount code and product updates.</p>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mb-3"
            />
            <button
              onClick={() => {
                if (email) {
                  alert(`Thanks! Code sent to ${email}`);
                  setEmail('');
                }
              }}
              className="w-full bg-purple-900 text-white p-3 rounded font-semibold hover:bg-purple-800"
            >
              Get My Code
            </button>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSwipeHistory([]);
                setShowEmailCapture(false);
              }}
              className="w-full mt-2 text-purple-900 p-3 rounded font-semibold hover:bg-gray-100"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-900 text-white relative">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Swiper</h1>
        <button
          onClick={() => setShowAdmin(true)}
          className="p-2 hover:bg-purple-800 rounded"
        >
          <BarChart3 size={24} />
        </button>
      </div>

      {/* Progress */}
      <div className="px-4 mb-4">
        <div className="bg-purple-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-white h-full transition-all duration-300"
            style={{ width: `${(currentIndex / SAMPLE_PRODUCTS.length) * 100}%` }}
          />
        </div>
        <div className="text-center mt-2 text-purple-200">
          {currentIndex} / {products.length}
        </div>
      </div>

      {/* Card Stack */}
      <div className="flex justify-center items-center px-4 mb-8" style={{ height: 'calc(100vh - 280px)' }}>
        <div className="relative w-full max-w-sm" style={{ height: '600px' }}>
          {!isComplete && currentProduct ? (
            <div
              className="bg-white rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
              style={{
                transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
                transition: dragStart ? 'none' : 'all 0.3s ease',
                height: '100%',
                position: 'relative'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              <div 
                className="w-full flex items-center justify-center text-white text-6xl font-bold"
                style={{ 
                  backgroundColor: `hsl(${currentProduct.id * 15}, 70%, 50%)`,
                  height: '400px'
                }}
              >
                {currentProduct.category.toUpperCase()}
              </div>
              <div className="p-6 text-purple-900">
                <h2 className="text-2xl font-bold mb-1">{currentProduct.name}</h2>
                <p className="text-lg text-purple-600 mb-2">{currentProduct.brand}</p>
                <span className="inline-block bg-purple-100 text-purple-900 px-3 py-1 rounded-full text-sm capitalize">
                  {currentProduct.category}
                </span>
              </div>

              {/* Swipe indicators */}
              {(dragOffset.x > 50 || lastSwipeDirection === 'right') && (
                <div className="absolute top-1/2 left-8 transform -translate-y-1/2 -rotate-12">
                  <div className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-2xl border-4 border-green-500">
                    LIKE
                  </div>
                </div>
              )}
              {(dragOffset.x < -50 || lastSwipeDirection === 'left') && (
                <div className="absolute top-1/2 right-8 transform -translate-y-1/2 rotate-12">
                  <div className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-2xl border-4 border-red-500">
                    PASS
                  </div>
                </div>
              )}
              {(dragOffset.y < -50 || lastSwipeDirection === 'up') && (
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-500 text-white px-6 py-3 rounded-lg font-bold text-2xl border-4 border-purple-500">
                    LOVE
                  </div>
                </div>
              )}
              {(dragOffset.y > 50 || lastSwipeDirection === 'down') && (
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gray-500 text-white px-6 py-3 rounded-lg font-bold text-2xl border-4 border-gray-500">
                    NEVER
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center text-purple-900">
              <p className="text-2xl font-bold">No products to show</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-purple-900 p-4">
        <div className="max-w-sm mx-auto flex justify-center items-center gap-4">
          <button
            onClick={() => handleSwipe('down')}
            className="bg-gray-600 hover:bg-gray-700 p-4 rounded-full transition-all disabled:opacity-50"
            disabled={isComplete}
          >
            <Trash2 size={24} />
          </button>
          <button
            onClick={() => handleSwipe('left')}
            className="bg-red-500 hover:bg-red-600 p-5 rounded-full transition-all disabled:opacity-50"
            disabled={isComplete}
          >
            <X size={28} />
          </button>
          <button
            onClick={handleUndo}
            className="bg-yellow-500 hover:bg-yellow-600 p-4 rounded-full transition-all disabled:opacity-50"
            disabled={swipeHistory.length === 0}
          >
            <RotateCcw size={24} />
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="bg-green-500 hover:bg-green-600 p-5 rounded-full transition-all disabled:opacity-50"
            disabled={isComplete}
          >
            <Heart size={28} />
          </button>
          <button
            onClick={() => handleSwipe('up')}
            className="bg-purple-500 hover:bg-purple-600 p-4 rounded-full transition-all disabled:opacity-50"
            disabled={isComplete}
          >
            <Flame size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}