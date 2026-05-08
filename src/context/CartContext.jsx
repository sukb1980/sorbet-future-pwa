import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  storeId: null
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIdx = state.items.findIndex(i => i.id === action.payload.id && i.type === action.payload.type);
      if (existingIdx > -1) {
        const newItems = [...state.items];
        newItems[existingIdx].quantity += (action.payload.quantity || 1);
        return { ...state, items: newItems };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
    case 'UPDATE_QUANTITY': {
      const newItems = [...state.items];
      const idx = newItems.findIndex(i => i.id === action.payload.id);
      if(idx > -1) {
        newItems[idx].quantity = action.payload.quantity;
      }
      return { ...state, items: newItems };
    }
    case 'CLEAR_CART':
      return { ...initialState };
    case 'SET_STORE':
      return { ...state, storeId: action.payload };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const setStore = (storeId) => dispatch({ type: 'SET_STORE', payload: storeId });
  
  const totalItems = cartState.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartState,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      setStore,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
