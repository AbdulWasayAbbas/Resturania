"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  quantity:number
};

type CartContextType = {
  cartItems: Product[];
  incrementItem: (product: Product) => void;
  decrementItem: (product: Product) => void;
  clearCart: () => void;
  total: number;
  totalItems:number;
  isOpen: boolean;
  toggleCart: () => void;
};

// type CartItem = Product & { quantity: number };


const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const LOCAL_STORAGE_KEY = "my_cart";
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);
  const toggleCart = () => setIsOpen((prev) => !prev);

  // const addToCart = (product: Product) => {
  //   setCartItems((prev) => [...prev, product]);
  // };
  const incrementItem = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { 
            id: product.id,
            name: product.name,
            price: product.price,
           quantity: 1 }];
      }
    });
};

const decrementItem = (product: Product) => {
  setCartItems((prev) => {
    return prev
      .map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // Remove item if quantity becomes 0
  });
};

const clearCart = () => {
    setCartItems([]);
  }


  const total = cartItems.reduce((sum, item) => sum + item.price*item.quantity, 0);

  const totalItems = cartItems.length;

  const value: CartContextType = {
    cartItems,
    incrementItem,
    decrementItem,
    clearCart,
    total,
    totalItems,
    isOpen,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
