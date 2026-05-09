/* ============================================================
   CartContext — Shopping Cart State
   Handles services, retail products, vouchers (mixed cart)
   ============================================================ */
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [loyaltyPointsToRedeem, setLoyaltyPointsToRedeem] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup'); // pickup | click-collect | same-day | shipping
  const [selectedPickupStore, setSelectedPickupStore] = useState(null);

  /* ---- Item Management ---- */
  const addItem = useCallback((item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.type === item.type);
      if (existing) {
        return prev.map((i) => i.id === item.id && i.type === item.type
          ? { ...i, quantity: i.quantity + (item.quantity || 1) }
          : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  }, []);

  const removeItem = useCallback((id, type) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.type === type)));
  }, []);

  const updateQuantity = useCallback((id, type, quantity) => {
    if (quantity <= 0) {
      removeItem(id, type);
      return;
    }
    setItems((prev) => prev.map((i) => i.id === id && i.type === type ? { ...i, quantity } : i));
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    setPromoCode('');
    setPromoDiscount(0);
    setLoyaltyPointsToRedeem(0);
  }, []);

  /* ---- Promo Code ---- */
  const applyPromoCode = useCallback((code) => {
    // Simulate: code 'SORBET10' gives 10%, 'GLOW20' gives 20%
    const codes = { 'SORBET10': 0.10, 'GLOW20': 0.20, 'BIRTHDAY50': 0.50, 'AUTUMN15': 0.15 };
    if (codes[code.toUpperCase()]) {
      setPromoCode(code.toUpperCase());
      setPromoDiscount(codes[code.toUpperCase()]);
      return { success: true, discount: codes[code.toUpperCase()], message: `Promo code applied! ${codes[code.toUpperCase()] * 100}% off.` };
    }
    return { success: false, message: 'Invalid promo code. Please check and try again.' };
  }, []);

  const removePromoCode = useCallback(() => {
    setPromoCode('');
    setPromoDiscount(0);
  }, []);

  /* ---- Loyalty Points ---- */
  const applyLoyaltyPoints = useCallback((points) => {
    setLoyaltyPointsToRedeem(points);
  }, []);

  /* ---- Computed Values ---- */
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    return Math.round(subtotal * promoDiscount);
  }, [subtotal, promoDiscount]);

  // 100 points = R10 (ZAR)
  const loyaltyDiscount = useMemo(() => {
    return Math.floor(loyaltyPointsToRedeem / 100) * 10;
  }, [loyaltyPointsToRedeem]);

  const deliveryFee = useMemo(() => {
    if (deliveryMethod === 'shipping') return 99;
    if (deliveryMethod === 'same-day') return 59;
    return 0; // pickup and click-collect free
  }, [deliveryMethod]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discountAmount - loyaltyDiscount + deliveryFee);
  }, [subtotal, discountAmount, loyaltyDiscount, deliveryFee]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, i) => sum + i.quantity, 0);
  }, [items]);

  const hasServices = useMemo(() => items.some((i) => i.type === 'service'), [items]);
  const hasProducts = useMemo(() => items.some((i) => i.type === 'product'), [items]);
  const hasVouchers = useMemo(() => items.some((i) => i.type === 'voucher'), [items]);

  const value = useMemo(() => ({
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    promoCode,
    promoDiscount,
    applyPromoCode,
    removePromoCode,
    loyaltyPointsToRedeem,
    applyLoyaltyPoints,
    deliveryMethod,
    setDeliveryMethod,
    selectedPickupStore,
    setSelectedPickupStore,
    subtotal,
    discountAmount,
    loyaltyDiscount,
    deliveryFee,
    total,
    itemCount,
    hasServices,
    hasProducts,
    hasVouchers,
  }), [
    items, promoCode, promoDiscount, loyaltyPointsToRedeem,
    deliveryMethod, selectedPickupStore,
    subtotal, discountAmount, loyaltyDiscount, deliveryFee, total, itemCount,
    hasServices, hasProducts, hasVouchers,
    addItem, removeItem, updateQuantity, clearCart,
    applyPromoCode, removePromoCode, applyLoyaltyPoints,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
