import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Upload, Plus, Minus, Eye, Check, Settings, List, FileSpreadsheet, Star, Menu, Heart, Sparkles } from 'lucide-react';

const CakeCustomizerApp = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [language, setLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [orders, setOrders] = useState([]);
  const [adminData, setAdminData] = useState({
    shapes: [
      { id: 1, name: 'Classic Round', nameAr: 'دائري كلاسيكي', price: 45, description: 'Traditional elegance', descriptionAr: 'أناقة تقليدية' },
      { id: 2, name: 'Modern Square', nameAr: 'مربع عصري', price: 55, description: 'Contemporary design', descriptionAr: 'تصميم عصري' },
      { id: 3, name: 'Artistic Triangle', nameAr: 'مثلث فني', price: 65, description: 'Unique statement piece', descriptionAr: 'قطعة فنية فريدة' }
    ],
    flavors: [
      { id: 1, name: 'Belgian Dark Chocolate', nameAr: 'شوكولاتة بلجيكية داكنة', price: 0, description: 'Rich & intense', descriptionAr: 'غني ومكثف' },
      { id: 2, name: 'Madagascar Vanilla Bean', nameAr: 'فانيليا مدغشقر', price: 8, description: 'Pure & aromatic', descriptionAr: 'نقي وعطري' },
      { id: 3, name: 'Salted Caramel Dream', nameAr: 'كراميل مملح أحلام', price: 12, description: 'Sweet meets savory', descriptionAr: 'حلو يلتقي بالمالح' },
      { id: 4, name: 'Premium Red Velvet', nameAr: 'الكيك الأحمر المخملي المميز', price: 15, description: 'Luxuriously smooth', descriptionAr: 'ناعم فاخر' }
    ],
    decorations: [
      { id: 1, name: 'Gold Leaf Accents', nameAr: 'لمسات أوراق الذهب', price: 25, description: 'Edible luxury', descriptionAr: 'ترف صالح للأكل' },
      { id: 2, name: 'Artisan Chocolate Drip', nameAr: 'قطرات الشوكولاتة الحرفية', price: 18, description: 'Signature finish', descriptionAr: 'لمسة أخيرة مميزة' },
      { id: 3, name: 'Fresh Berry Crown', nameAr: 'تاج التوت الطازج', price: 22, description: 'Natural elegance', descriptionAr: 'أناقة طبيعية' },
      { id: 4, name: 'Crystallized Flowers', nameAr: 'زهور متبلورة', price: 30, description: 'Handcrafted beauty', descriptionAr: 'جمال مصنوع يدوياً' },
      { id: 5, name: 'Chocolate Sculptures', nameAr: 'منحوتات الشوكولاتة', price: 35, description: 'Edible art pieces', descriptionAr: 'قطع فنية صالحة للأكل' }
    ]
  });

  const [orderData, setOrderData] = useState({
    shape: null,
    flavor: null,
    decorations: [],
    customText: '',
    uploadedImage: null,
    customerName: '',
    pickupTime: ''
  });

  const [colors] = useState([
    { id: 1, name: 'Rich Chocolate', nameAr: 'شوكولاتة غنية', value: '#3D2914', price: 0 },
    { id: 2, name: 'Elegant Black', nameAr: 'أسود أنيق', value: '#1a1a1a', price: 5 },
    { id: 3, name: 'Cream Dream', nameAr: 'حلم الكريمة', value: '#F5F5DC', price: 3 },
    { id: 4, name: 'Rose Gold', nameAr: 'ذهبي وردي', value: '#E8B4B8', price: 8 },
    { id: 5, name: 'Deep Burgundy', nameAr: 'عنابي عميق', value: '#722F37', price: 6 },
    { id: 6, name: 'Royal Purple', nameAr: 'بنفسجي ملكي', value: '#663399', price: 7 }
  ]);

  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const texts = {
    en: {
      title: 'Artisan Confectionery',
      subtitle: 'Celebrate Life\'s Sweet Moments with the Perfect Cake',
      description: 'Choose from our luxury curated selection or pour your heart into a cake that\'s as unique as you. Our master confectioners bring your vision to life with joy and perfection.',
      startButton: 'Create Your Cake',
      back: 'Back',
      next: 'Continue',
      step1: 'Select Your Foundation',
      step1Desc: 'Choose the perfect shape for your masterpiece',
      step2: 'Choose Color & Flavor Profile',
      step2Desc: 'Craft your perfect color and flavor combination',
      step3: 'Artisan Enhancements',
      step3Desc: 'Add premium touches to make it uniquely yours',
      step4: 'Preview Your Masterpiece',
      step4Desc: 'Review your exquisite creation',
      step5: 'Complete Your Order',
      step5Desc: 'Final details for your masterpiece',
      shape: 'Cake Style',
      color: 'Color Palette',
      flavor: 'Flavor Experience',
      decorations: 'Premium Decorations',
      customText: 'Personal Message',
      uploadImage: 'Custom Design',
      customerName: 'Your Name',
      pickupTime: 'Collection Time',
      totalPrice: 'Investment',
      makeOrder: 'Confirm Your Creation',
      admin: 'Management',
      kitchen: 'Production',
      orders: 'Orders',
      export: 'Export Records',
      crafting: 'Crafting with Love',
      ready: 'Ready for Collection'
    },
    ar: {
      title: 'حلويات الحرفيين',
      subtitle: 'احتفل بلحظات الحياة الحلوة مع الكعكة المثالية',
      description: 'اختر من مجموعتنا الفاخرة المنسقة أو اسكب قلبك في كعكة فريدة مثلك. يحول حرفيونا المتقنون رؤيتك إلى واقع بفرح وإتقان.',
      startButton: 'اصنع كعكتك',
      back: 'رجوع',
      next: 'متابعة',
      step1: 'اختر الأساس الخاص بك',
      step1Desc: 'اختر الشكل المثالي لتحفتك الفنية',
      step2: 'اختر اللون وملف النكهة',
      step2Desc: 'اصنع مزيج اللون والنكهة المثالي',
      step3: 'التحسينات الحرفية',
      step3Desc: 'أضف اللمسات المميزة لتجعلها فريدة',
      step4: 'معاينة تحفتك الفنية',
      step4Desc: 'راجع إبداعك الرائع',
      step5: 'أكمل طلبك',
      step5Desc: 'التفاصيل الأخيرة لتحفتك الفنية',
      shape: 'نمط الكعكة',
      color: 'لوحة الألوان',
      flavor: 'تجربة النكهة',
      decorations: 'الزينة المميزة',
      customText: 'رسالة شخصية',
      uploadImage: 'تصميم مخصص',
      customerName: 'اسمك',
      pickupTime: 'وقت الاستلام',
      totalPrice: 'الاستثمار',
      makeOrder: 'أكد إبداعك',
      admin: 'الإدارة',
      kitchen: 'الإنتاج',
      orders: 'الطلبات',
      export: 'تصدير السجلات',
      crafting: 'يُصنع بحب',
      ready: 'جاهز للاستلام'
    }
  };

  const t = texts[language];
  const isRTL = language === 'ar';

  // Load Cairo font for Arabic
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Apply font family based on language
    document.body.style.fontFamily = isRTL ? "'Cairo', sans-serif" : "'Inter', 'Segoe UI', sans-serif";
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    return () => {
      document.head.removeChild(link);
    };
  }, [isRTL]);

  const calculateTotal = () => {
    let total = 0;
    if (orderData.shape) total += adminData.shapes.find(s => s.id === orderData.shape)?.price || 0;
    if (orderData.flavor) total += adminData.flavors.find(f => f.id === orderData.flavor)?.price || 0;
    if (selectedColor) total += selectedColor.price;
    orderData.decorations.forEach(decId => {
      const decoration = adminData.decorations.find(d => d.id === decId);
      if (decoration) total += decoration.price;
    });
    return total;
  };

  const generateOrderId = () => {
    return 'AC-' + Date.now().toString(36).toUpperCase();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOrderData(prev => ({ ...prev, uploadedImage: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const submitOrder = () => {
    const newOrder = {
      id: generateOrderId(),
      customerName: orderData.customerName || 'Valued Customer',
      shape: adminData.shapes.find(s => s.id === orderData.shape),
      flavor: adminData.flavors.find(f => f.id === orderData.flavor),
      color: selectedColor,
      decorations: orderData.decorations.map(id => adminData.decorations.find(d => d.id === id)),
      customText: orderData.customText,
      uploadedImage: orderData.uploadedImage,
      pickupTime: orderData.pickupTime,
      totalPrice: calculateTotal(),
      orderTime: new Date().toLocaleString(),
      status: 'crafting'
    };
    
    setOrders(prev => [...prev, newOrder]);
    
    setOrderData({
      shape: null,
      flavor: null,
      decorations: [],
      customText: '',
      uploadedImage: null,
      customerName: '',
      pickupTime: ''
    });
    setSelectedColor(colors[0]);
    setCurrentStep(1);
    setCurrentView('landing');
    
    alert('🎂 Your masterpiece is being crafted with love!');
  };

  const renderCakePreview = () => {
    if (!orderData.shape) return null;
    
    return (
      <div className="flex justify-center mb-8 sm:mb-12">
        <div className="relative transform hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full blur-xl opacity-30 animate-pulse"></div>
          <div 
            className="relative w-48 h-48 sm:w-64 sm:h-64 border-4 sm:border-8 border-gradient-to-r from-amber-400 to-orange-500 rounded-2xl shadow-2xl"
            style={{ backgroundColor: selectedColor?.value || '#3D2914' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
            
            {orderData.customText && (
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <span className="text-lg sm:text-2xl font-bold text-white text-center drop-shadow-lg break-words">
                  {orderData.customText}
                </span>
              </div>
            )}
            
            {orderData.uploadedImage && (
              <img 
                src={orderData.uploadedImage} 
                alt="Custom Design" 
                className="absolute inset-4 sm:inset-6 w-40 h-40 sm:w-52 sm:h-52 object-cover rounded-xl opacity-80"
              />
            )}
            
            {orderData.decorations.length > 0 && (
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm sm:text-lg font-bold">{orderData.decorations.length}</span>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-t from-black/20 to-transparent rounded-b-xl"></div>
          </div>
        </div>
      </div>
    );
  };

  const renderLanding = () => (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-900 to-stone-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-32 h-32 sm:w-48 sm:h-48 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-amber-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className={`relative z-10 flex justify-between items-center p-4 sm:p-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="flex items-center space-x-2">
          <div className="text-xl sm:text-2xl font-bold text-amber-400">AC</div>
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 animate-pulse" />
        </div>
        <button className="text-amber-400 hover:text-amber-300 transition-colors p-2">
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </nav>

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 sm:px-8 py-8 sm:py-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
        {/* Content Section */}
        <div className={`w-full lg:w-1/2 text-center mb-8 lg:mb-0 ${isRTL ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pr-8'}`}>
          <div className="mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {t.title}
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-amber-300 font-light mb-4 sm:mb-8 leading-relaxed">
              {t.subtitle}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-stone-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.description}
            </p>
          </div>

          <button 
            onClick={() => setCurrentView('customizer')}
            className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-lg sm:text-xl lg:text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 overflow-hidden w-full sm:w-auto mb-6 sm:mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className={`relative flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 mx-2 sm:mx-3 group-hover:scale-110 transition-transform text-pink-200" />
              {t.startButton}
              <ChevronRight className={`w-5 h-5 sm:w-6 sm:h-6 mx-2 sm:mx-3 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
            </span>
          </button>

          {/* Navigation Buttons */}
          <div className={`flex flex-wrap justify-center gap-3 sm:gap-4 ${isRTL ? 'lg:justify-end' : 'lg:justify-start'}`}>
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-stone-800/50 border border-amber-400/30 text-amber-300 rounded-xl font-semibold hover:bg-stone-700/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
            <button 
              onClick={() => setCurrentView('admin')}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-stone-800/50 border border-amber-400/30 text-amber-300 rounded-xl font-semibold hover:bg-stone-700/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
              {t.admin}
            </button>
            <button 
              onClick={() => setCurrentView('kitchen')}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-stone-800/50 border border-amber-400/30 text-amber-300 rounded-xl font-semibold hover:bg-stone-700/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
            >
              <List className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
              {t.kitchen}
            </button>
          </div>
        </div>

        {/* Hero Cake Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-3xl scale-150 animate-pulse"></div>
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-stone-800 to-amber-900 rounded-full flex items-center justify-center shadow-2xl">
              <div className="text-6xl sm:text-7xl lg:text-9xl animate-bounce">🎂</div>
            </div>
            {/* Floating decorations */}
            <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-12 h-12 sm:w-16 sm:h-16 bg-amber-400/20 rounded-full blur-lg animate-pulse"></div>
            <div className="absolute -bottom-3 sm:-bottom-6 -left-3 sm:-left-6 w-8 h-8 sm:w-12 sm:h-12 bg-orange-500/20 rounded-full blur-lg animate-pulse delay-700"></div>
            <div className="absolute top-1/4 -left-6 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 bg-pink-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">{t.step1}</h2>
        <p className="text-base sm:text-lg lg:text-xl text-stone-300">{t.step1Desc}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {adminData.shapes.map(shape => (
          <button
            key={shape.id}
            onClick={() => setOrderData(prev => ({ ...prev, shape: shape.id }))}
            className={`group relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border-2 transition-all duration-500 transform hover:scale-105 ${
              orderData.shape === shape.id 
                ? 'border-amber-400 bg-gradient-to-br from-amber-500/20 to-orange-600/20 shadow-2xl shadow-amber-500/25' 
                : 'border-stone-600 bg-stone-800/50 hover:border-amber-400/50 hover:bg-stone-700/50'
            } backdrop-blur-sm`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl sm:rounded-3xl"></div>
            <div className="relative">
              <div className="text-4xl sm:text-6xl lg:text-8xl mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                {shape.id === 1 ? '⭕' : shape.id === 2 ? '⬜' : '🔺'}
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">
                {isRTL ? shape.nameAr : shape.name}
              </h3>
              <p className="text-sm sm:text-base text-stone-400 mb-2 sm:mb-4">
                {isRTL ? shape.descriptionAr : shape.description}
              </p>
              <div className="flex items-center justify-center">
                <span className="text-xl sm:text-2xl text-amber-400 font-bold">${shape.price}</span>
              </div>
              {orderData.shape === shape.id && (
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">{t.step2}</h2>
        <p className="text-base sm:text-lg lg:text-xl text-stone-300">{t.step2Desc}</p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12">
        {/* Color Selection */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-amber-300 mb-6 sm:mb-8 text-center">{t.color}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {colors.map(color => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={`group relative p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-500 transform hover:scale-110 ${
                  selectedColor?.id === color.id 
                    ? 'border-amber-400 shadow-2xl shadow-amber-500/25' 
                    : 'border-stone-600 hover:border-amber-400/50'
                } backdrop-blur-sm`}
                style={{ backgroundColor: color.value + '40' }}
              >
                <div 
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl mx-auto mb-2 sm:mb-4 border-4 border-white/20 shadow-lg"
                  style={{ backgroundColor: color.value }}
                ></div>
                <p className="text-white font-semibold text-xs sm:text-sm text-center mb-1 sm:mb-2">
                  {isRTL ? color.nameAr : color.name}
                </p>
                <p className="text-amber-400 font-bold text-center text-xs sm:text-sm">
                  {color.price > 0 ? `+$${color.price}` : 'Included'}
                </p>
                {selectedColor?.id === color.id && (
                  <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-amber-400 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Flavor Selection */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-amber-300 mb-6 sm:mb-8 text-center">{t.flavor}</h3>
          <div className="space-y-3 sm:space-y-4">
            {adminData.flavors.map(flavor => (
              <button
                key={flavor.id}
                onClick={() => setOrderData(prev => ({ ...prev, flavor: flavor.id }))}
                className={`group w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-500 text-left transform hover:scale-105 relative ${
                  orderData.flavor === flavor.id 
                    ? 'border-amber-400 bg-gradient-to-r from-amber-500/20 to-orange-600/20 shadow-2xl shadow-amber-500/25' 
                    : 'border-stone-600 bg-stone-800/50 hover:border-amber-400/50 hover:bg-stone-700/50'
                } backdrop-blur-sm ${isRTL ? 'text-right' : ''}`}
              >
                <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
                      {isRTL ? flavor.nameAr : flavor.name}
                    </h4>
                    <p className="text-stone-400 text-sm sm:text-base">
                      {isRTL ? flavor.descriptionAr : flavor.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg sm:text-xl text-amber-400 font-bold">
                      {flavor.price > 0 ? `+${flavor.price}` : 'Included'}
                    </span>
                  </div>
                </div>
                {orderData.flavor === flavor.id && (
                  <div className="absolute top-4 right-4">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-amber-400 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">{t.step3}</h2>
        <p className="text-base sm:text-lg lg:text-xl text-stone-300">{t.step3Desc}</p>
      </div>
      
      <div>
        <h3 className="text-2xl sm:text-3xl font-semibold text-amber-300 mb-6 sm:mb-8 text-center">{t.decorations}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {adminData.decorations.map(decoration => (
            <button
              key={decoration.id}
              onClick={() => {
                setOrderData(prev => ({
                  ...prev,
                  decorations: prev.decorations.includes(decoration.id)
                    ? prev.decorations.filter(id => id !== decoration.id)
                    : [...prev.decorations, decoration.id]
                }));
              }}
              className={`group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 ${
                orderData.decorations.includes(decoration.id)
                  ? 'border-amber-400 bg-gradient-to-br from-amber-500/20 to-orange-600/20 shadow-2xl shadow-amber-500/25' 
                  : 'border-stone-600 bg-stone-800/50 hover:border-amber-400/50 hover:bg-stone-700/50'
              } backdrop-blur-sm`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl sm:rounded-2xl"></div>
              <div className="relative">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">✨</div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">
                  {isRTL ? decoration.nameAr : decoration.name}
                </h4>
                <p className="text-stone-400 text-xs sm:text-sm mb-2 sm:mb-3">
                  {isRTL ? decoration.descriptionAr : decoration.description}
                </p>
                <span className="text-base sm:text-lg text-amber-400 font-bold">+${decoration.price}</span>
                {orderData.decorations.includes(decoration.id) && (
                  <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-amber-400 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-stone-800/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-stone-600">
          <label className="text-xl sm:text-2xl font-semibold text-amber-300 block mb-4 sm:mb-6">{t.customText}</label>
          <textarea
            value={orderData.customText}
            onChange={(e) => setOrderData(prev => ({ ...prev, customText: e.target.value }))}
            className="w-full p-3 sm:p-4 border border-stone-600 rounded-lg sm:rounded-xl text-base sm:text-lg bg-stone-900/50 text-white placeholder-stone-400 focus:border-amber-400 focus:outline-none transition-colors backdrop-blur-sm resize-none"
            rows={4}
            placeholder="Happy Birthday, Congratulations, etc..."
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>

        <div className="bg-stone-800/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-stone-600">
          <label className="text-xl sm:text-2xl font-semibold text-amber-300 block mb-4 sm:mb-6">{t.uploadImage}</label>
          <div className="border-2 border-dashed border-stone-600 rounded-lg sm:rounded-xl p-6 sm:p-8 text-center hover:border-amber-400/50 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              {orderData.uploadedImage ? (
                <img src={orderData.uploadedImage} alt="Uploaded" className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mx-auto mb-3 sm:mb-4" />
              ) : (
                <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-stone-400 mx-auto mb-3 sm:mb-4" />
              )}
              <p className="text-base sm:text-lg text-stone-400">Tap to upload your design</p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">{t.step4}</h2>
        <p className="text-base sm:text-lg lg:text-xl text-stone-300">{t.step4Desc}</p>
      </div>
      
      {renderCakePreview()}
      
      <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-sm border border-amber-400/20">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-amber-300">Artisan Summary</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex justify-between items-center border-b border-stone-600 pb-3 sm:pb-4">
              <span className="text-base sm:text-lg text-stone-300">{t.shape}:</span>
              <div className={`text-right ${isRTL ? 'text-left' : ''}`}>
                <div className="text-white font-semibold text-sm sm:text-base">
                  {orderData.shape ? adminData.shapes.find(s => s.id === orderData.shape)?.[isRTL ? 'nameAr' : 'name'] : '-'}
                </div>
                <div className="text-amber-400 font-bold text-sm sm:text-base">
                  ${orderData.shape ? adminData.shapes.find(s => s.id === orderData.shape)?.price : 0}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-b border-stone-600 pb-3 sm:pb-4">
              <span className="text-base sm:text-lg text-stone-300">{t.color}:</span>
              <div className={`text-right ${isRTL ? 'text-left' : ''}`}>
                <div className="text-white font-semibold text-sm sm:text-base">
                  {selectedColor?.[isRTL ? 'nameAr' : 'name']}
                </div>
                <div className="text-amber-400 font-bold text-sm sm:text-base">
                  {selectedColor?.price > 0 ? `+${selectedColor.price}` : 'Included'}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-b border-stone-600 pb-3 sm:pb-4">
              <span className="text-base sm:text-lg text-stone-300">{t.flavor}:</span>
              <div className={`text-right ${isRTL ? 'text-left' : ''}`}>
                <div className="text-white font-semibold text-sm sm:text-base">
                  {orderData.flavor ? adminData.flavors.find(f => f.id === orderData.flavor)?.[isRTL ? 'nameAr' : 'name'] : '-'}
                </div>
                <div className="text-amber-400 font-bold text-sm sm:text-base">
                  {orderData.flavor && adminData.flavors.find(f => f.id === orderData.flavor)?.price > 0 ? 
                    `+${adminData.flavors.find(f => f.id === orderData.flavor)?.price}` : 'Included'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {orderData.decorations.length > 0 && (
              <div className="border-b border-stone-600 pb-3 sm:pb-4">
                <span className="text-base sm:text-lg text-stone-300 block mb-2 sm:mb-3">{t.decorations}:</span>
                <div className="space-y-1 sm:space-y-2">
                  {orderData.decorations.map(id => {
                    const decoration = adminData.decorations.find(d => d.id === id);
                    return (
                      <div key={id} className="flex justify-between items-center">
                        <span className="text-white text-xs sm:text-sm">
                          {decoration?.[isRTL ? 'nameAr' : 'name']}
                        </span>
                        <span className="text-amber-400 font-bold text-xs sm:text-sm">
                          +${decoration?.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {orderData.customText && (
              <div className="border-b border-stone-600 pb-3 sm:pb-4">
                <span className="text-base sm:text-lg text-stone-300">Personal Message:</span>
                <div className="text-white mt-2 italic text-sm sm:text-base" dir={isRTL ? 'rtl' : 'ltr'}>
                  "{orderData.customText}"
                </div>
              </div>
            )}
            
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 rounded-xl p-4 sm:p-6 border border-amber-400/30">
              <div className="flex justify-between items-center">
                <span className="text-xl sm:text-2xl font-bold text-amber-300">{t.totalPrice}:</span>
                <span className="text-2xl sm:text-3xl font-bold text-amber-400">${calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">{t.step5}</h2>
        <p className="text-base sm:text-lg lg:text-xl text-stone-300">{t.step5Desc}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-stone-800/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-stone-600">
          <label className="text-xl sm:text-2xl font-semibold text-amber-300 block mb-4 sm:mb-6">{t.customerName}</label>
          <input
            type="text"
            value={orderData.customerName}
            onChange={(e) => setOrderData(prev => ({ ...prev, customerName: e.target.value }))}
            className="w-full p-3 sm:p-4 border border-stone-600 rounded-lg sm:rounded-xl text-base sm:text-lg bg-stone-900/50 text-white placeholder-stone-400 focus:border-amber-400 focus:outline-none transition-colors backdrop-blur-sm"
            placeholder="Enter your name"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>
        
        <div className="bg-stone-800/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-stone-600">
          <label className="text-xl sm:text-2xl font-semibold text-amber-300 block mb-4 sm:mb-6">{t.pickupTime}</label>
          <input
            type="datetime-local"
            value={orderData.pickupTime}
            onChange={(e) => setOrderData(prev => ({ ...prev, pickupTime: e.target.value }))}
            className="w-full p-3 sm:p-4 border border-stone-600 rounded-lg sm:rounded-xl text-base sm:text-lg bg-stone-900/50 text-white placeholder-stone-400 focus:border-amber-400 focus:outline-none transition-colors backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="text-center">
        <div className="mb-6 sm:mb-8">
          <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">
            {t.totalPrice}: ${calculateTotal()}
          </div>
          <p className="text-base sm:text-lg text-stone-300">Crafted with passion, delivered with care</p>
        </div>
        
        <button 
          onClick={submitOrder}
          disabled={!orderData.shape || !orderData.flavor}
          className="group relative px-12 sm:px-16 py-4 sm:py-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xl sm:text-2xl lg:text-3xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden w-full sm:w-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className={`relative flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Check className="w-6 h-6 sm:w-8 sm:h-8 mx-2 sm:mx-3" />
            {t.makeOrder}
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 mx-2 sm:mx-3 group-hover:rotate-12 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );

  const renderCustomizer = () => {
    const steps = [renderStep1, renderStep2, renderStep3, renderStep4, renderStep5];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-900 to-stone-800" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="relative">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-32 h-32 sm:w-48 sm:h-48 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-8">
            <div className="bg-stone-900/80 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 backdrop-blur-sm border border-amber-400/20">
              
              {/* Header */}
              <div className={`flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <button 
                  onClick={() => {
                    if (currentStep === 1) {
                      setCurrentView('landing');
                    } else {
                      setCurrentStep(prev => prev - 1);
                    }
                  }}
                  className={`flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-stone-800/50 border border-stone-600 text-amber-300 rounded-lg sm:rounded-xl font-semibold hover:bg-stone-700/50 hover:border-amber-400/50 transition-all duration-300 text-base sm:text-xl backdrop-blur-sm w-full sm:w-auto ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <ChevronLeft className={`w-5 h-5 sm:w-6 sm:h-6 mx-1 sm:mx-2 ${isRTL ? 'rotate-180' : ''}`} />
                  {t.back}
                </button>

                <div className="text-lg sm:text-2xl font-bold text-amber-300">
                  Step {currentStep} of 5
                </div>

                <button 
                  onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-stone-800/50 border border-stone-600 text-amber-300 rounded-lg sm:rounded-xl font-semibold hover:bg-stone-700/50 hover:border-amber-400/50 transition-all duration-300 text-base sm:text-xl backdrop-blur-sm w-full sm:w-auto"
                >
                  {language === 'en' ? 'العربية' : 'English'}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-8 sm:mb-12">
                <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {[1, 2, 3, 4, 5].map(step => (
                    <div key={step} className={`flex items-center ${step < 5 ? 'flex-1' : ''} ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`relative w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-xl font-bold border-2 transition-all duration-500 ${
                        step <= currentStep 
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white border-amber-400 shadow-lg shadow-amber-500/30' 
                          : 'bg-stone-800 text-stone-400 border-stone-600'
                      }`}>
                        {step < currentStep ? <Check className="w-4 h-4 sm:w-6 sm:h-6" /> : step}
                        {step <= currentStep && (
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      {step < 5 && (
                        <div className={`h-1 flex-1 mx-2 sm:mx-4 rounded transition-all duration-500 ${
                          step < currentStep 
                            ? 'bg-gradient-to-r from-amber-400 to-orange-500' 
                            : 'bg-stone-700'
                        } ${isRTL ? 'order-first' : ''}`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <div className="min-h-[400px] sm:min-h-[600px]">
                {steps[currentStep - 1]()}
              </div>

              {/* Next Button */}
              {currentStep < 5 && (
                <div className={`flex mt-8 sm:mt-12 ${isRTL ? 'justify-start' : 'justify-end'}`}>
                  <button 
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    disabled={
                      (currentStep === 1 && !orderData.shape) ||
                      (currentStep === 2 && !orderData.flavor)
                    }
                    className="group flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-500 text-base sm:text-xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className={`relative flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {t.next}
                      <ChevronRight className={`w-5 h-5 sm:w-6 sm:h-6 mx-1 sm:mx-2 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderKitchenDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-900 to-stone-800 p-4 sm:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-stone-900/80 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 backdrop-blur-sm border border-amber-400/20">
          
          <div className={`flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-300">Production Dashboard</h2>
            <button 
              onClick={() => setCurrentView('landing')}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-stone-800/50 border border-stone-600 text-amber-300 rounded-lg sm:rounded-xl font-semibold hover:bg-stone-700/50 hover:border-amber-400/50 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
            >
              Back to Home
            </button>
          </div>

          <div className="grid gap-4 sm:gap-6">
            {orders.filter(order => order.status === 'crafting').map(order => (
              <div key={order.id} className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 border-2 border-amber-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                <div className={`flex flex-col lg:flex-row justify-between items-start mb-4 sm:mb-6 gap-4 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-amber-300">Order #{order.id}</h3>
                    <p className="text-base sm:text-lg text-white">Artisan for: {order.customerName}</p>
                    <p className="text-xs sm:text-sm text-stone-400">Commissioned: {order.orderTime}</p>
                    {order.pickupTime && (
                      <p className="text-xs sm:text-sm text-stone-400">Collection: {new Date(order.pickupTime).toLocaleString()}</p>
                    )}
                  </div>
                  <div className={`text-center sm:text-right w-full lg:w-auto ${isRTL ? 'sm:text-left' : ''}`}>
                    <p className="text-2xl sm:text-3xl font-bold text-amber-400 mb-2">${order.totalPrice}</p>
                    <button 
                      onClick={() => {
                        setOrders(prev => prev.map(o => 
                          o.id === order.id ? { ...o, status: 'ready' } : o
                        ));
                      }}
                      className="px-4 sm:px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 w-full lg:w-auto"
                    >
                      Mark Ready
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="bg-stone-800/50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                    <h4 className="font-semibold mb-3 sm:mb-4 text-amber-300 text-base sm:text-lg">Specifications:</h4>
                    <ul className="space-y-1 sm:space-y-2 text-stone-200 text-sm sm:text-base">
                      <li><span className="text-stone-400">Foundation:</span> {order.shape?.name}</li>
                      <li><span className="text-stone-400">Palette:</span> {order.color?.name}</li>
                      <li><span className="text-stone-400">Flavor Profile:</span> {order.flavor?.name}</li>
                      {order.decorations?.length > 0 && (
                        <li><span className="text-stone-400">Artisan Touches:</span> {order.decorations.map(d => d.name).join(', ')}</li>
                      )}
                      {order.customText && <li><span className="text-stone-400">Personal Message:</span> "{order.customText}"</li>}
                    </ul>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative">
                      <div 
                        className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-amber-400 rounded-xl sm:rounded-2xl shadow-xl"
                        style={{ backgroundColor: order.color?.value || '#3D2914' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg sm:rounded-xl"></div>
                        {order.customText && (
                          <div className="absolute inset-0 flex items-center justify-center p-2">
                            <span className="text-xs sm:text-sm font-bold text-white text-center break-words">
                              {order.customText}
                            </span>
                          </div>
                        )}
                        {order.uploadedImage && (
                          <img 
                            src={order.uploadedImage} 
                            alt="Custom" 
                            className="absolute inset-2 sm:inset-3 w-28 h-28 sm:w-34 sm:h-34 object-cover rounded-lg opacity-80"
                          />
                        )}
                      </div>
                      {order.decorations?.length > 0 && (
                        <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-xs sm:text-sm font-bold">{order.decorations.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {orders.filter(order => order.status === 'crafting').length === 0 && (
              <div className="text-center py-12 sm:py-16">
                <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🎂</div>
                <p className="text-2xl sm:text-3xl text-stone-400">No orders in production</p>
                <p className="text-lg sm:text-xl text-stone-500 mt-2">Ready to craft something beautiful</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdminPanel = () => (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-900 to-stone-800 p-4 sm:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-stone-900/80 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 backdrop-blur-sm border border-amber-400/20">
          
          <div className={`flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-300">Management Console</h2>
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <button 
                onClick={() => {
                  const csvContent = orders.map(order => 
                    [
                      order.id,
                      order.customerName,
                      order.orderTime,
                      order.pickupTime || 'Not specified',
                      order.shape?.name || '',
                      order.color?.name || '',
                      order.flavor?.name || '',
                      order.decorations?.map(d => d.name).join('; ') || '',
                      order.customText || '',
                      order.totalPrice,
                      order.status
                    ].join(',')
                  );
                  
                  const header = 'Order ID,Customer Name,Order Time,Pickup Time,Shape,Color,Flavor,Decorations,Custom Text,Total Price,Status';
                  const csv = [header, ...csvContent].join('\n');
                  
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `artisan_orders_${new Date().toISOString().split('T')[0]}.csv`;
                  a.click();
                  window.URL.revokeObjectURL(url);
                }}
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
              >
                <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                {t.export}
              </button>
              <button 
                onClick={() => setCurrentView('landing')}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-stone-800/50 border border-stone-600 text-amber-300 rounded-lg sm:rounded-xl font-semibold hover:bg-stone-700/50 hover:border-amber-400/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base w-full sm:w-auto"
              >
                Back to Home
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            {/* Analytics Overview */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-amber-400/30">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-amber-300">Business Analytics</h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-stone-800/50 p-4 sm:p-6 rounded-lg sm:rounded-xl text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-amber-400">{orders.length}</div>
                  <div className="text-stone-300 text-xs sm:text-sm">Total Creations</div>
                </div>
                
                <div className="bg-stone-800/50 p-4 sm:p-6 rounded-lg sm:rounded-xl text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-orange-400">
                    {orders.filter(o => o.status === 'crafting').length}
                  </div>
                  <div className="text-stone-300 text-xs sm:text-sm">In Production</div>
                </div>
                
                <div className="bg-stone-800/50 p-4 sm:p-6 rounded-lg sm:rounded-xl text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-green-400">
                    ${orders.reduce((sum, order) => sum + order.totalPrice, 0)}
                  </div>
                  <div className="text-stone-300 text-xs sm:text-sm">Total Revenue</div>
                </div>

                <div className="bg-stone-800/50 p-4 sm:p-6 rounded-lg sm:rounded-xl text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-blue-400">
                    ${orders.length > 0 ? Math.round(orders.reduce((sum, order) => sum + order.totalPrice, 0) / orders.length) : 0}
                  </div>
                  <div className="text-stone-300 text-xs sm:text-sm">Average Order</div>
                </div>
              </div>
              
              {orders.length > 0 && (
                <div className="mt-4 sm:mt-6 bg-stone-800/50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                  <div className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-amber-300">Recent Commissions:</div>
                  <div className="space-y-1 sm:space-y-2">
                    {orders.slice(-5).reverse().map(order => (
                      <div key={order.id} className={`flex justify-between text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-white">#{order.id} - {order.customerName}</span>
                        <span className="text-amber-400 font-semibold">${order.totalPrice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Management */}
            <div className="space-y-4 sm:space-y-6">
              {/* Shapes */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-400/30">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-300">Foundation Styles</h3>
                <div className="space-y-2 sm:space-y-3">
                  {adminData.shapes.map(shape => (
                    <div key={shape.id} className={`flex items-center justify-between bg-stone-800/50 p-2 sm:p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-white font-medium text-sm sm:text-base">{shape.name}</span>
                      <div className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-amber-400 font-bold text-sm sm:text-base">${shape.price}</span>
                        <button 
                          onClick={() => {
                            const newPrice = prompt('Update price:', shape.price);
                            if (newPrice && !isNaN(newPrice)) {
                              setAdminData(prev => ({
                                ...prev,
                                shapes: prev.shapes.map(s => 
                                  s.id === shape.id ? { ...s, price: parseInt(newPrice) } : s
                                )
                              }));
                            }
                          }}
                          className="px-2 sm:px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded hover:bg-blue-500/30 transition-colors text-xs sm:text-sm"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flavors */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-400/30">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-purple-300">Flavor Profiles</h3>
                <div className="space-y-2 sm:space-y-3">
                  {adminData.flavors.slice(0, 3).map(flavor => (
                    <div key={flavor.id} className={`flex items-center justify-between bg-stone-800/50 p-2 sm:p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-white font-medium text-xs sm:text-sm">{flavor.name}</span>
                      <div className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-amber-400 font-bold text-xs sm:text-sm">
                          {flavor.price > 0 ? `+${flavor.price}` : 'Base'}
                        </span>
                        <button 
                          onClick={() => {
                            const newPrice = prompt('Update price:', flavor.price);
                            if (newPrice !== null && !isNaN(newPrice)) {
                              setAdminData(prev => ({
                                ...prev,
                                flavors: prev.flavors.map(f => 
                                  f.id === flavor.id ? { ...f, price: parseInt(newPrice) } : f
                                )
                              }));
                            }
                          }}
                          className="px-2 sm:px-3 py-1 bg-purple-500/20 border border-purple-400/30 text-purple-300 rounded hover:bg-purple-500/30 transition-colors text-xs sm:text-sm"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-400/30">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-emerald-300">Today's Performance</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-stone-800/50 p-3 rounded-lg text-center">
                    <div className="text-lg sm:text-2xl font-bold text-emerald-400">
                      {orders.filter(o => new Date(o.orderTime).toDateString() === new Date().toDateString()).length}
                    </div>
                    <div className="text-stone-300 text-xs">Today's Orders</div>
                  </div>
                  <div className="bg-stone-800/50 p-3 rounded-lg text-center">
                    <div className="text-lg sm:text-2xl font-bold text-teal-400">
                      ${orders.filter(o => new Date(o.orderTime).toDateString() === new Date().toDateString())
                        .reduce((sum, order) => sum + order.totalPrice, 0)}
                    </div>
                    <div className="text-stone-300 text-xs">Today's Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render logic
  switch (currentView) {
    case 'landing':
      return renderLanding();
    case 'customizer':
      return renderCustomizer();
    case 'kitchen':
      return renderKitchenDashboard();
    case 'admin':
      return renderAdminPanel();
    default:
      return renderLanding();
  }
};

export default CakeCustomizerApp;