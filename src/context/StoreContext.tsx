"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Role, Order, Product, Farmer, Driver, Customer, CartItem, OrderStatus } from "../types";
import { mockProducts, mockFarmers, mockDrivers, mockCustomers, initialOrders } from "../data/mockData";

interface StoreContextType {
  role: Role;
  setRole: (role: Role) => void;
  products: Product[];
  farmers: Farmer[];
  orders: Order[];
  drivers: Driver[];
  customers: Customer[];
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  placeOrder: (address: string) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  resetDemoData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("CUSTOMER");
  const [products, setProducts] = useState<Product[]>([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("melody_role") as Role;
    if (savedRole) setRoleState(savedRole);
    
    const savedOrders = localStorage.getItem("melody_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders(initialOrders);
      localStorage.setItem("melody_orders", JSON.stringify(initialOrders));
    }

    const savedCart = localStorage.getItem("melody_cart");
    if (savedCart) setCart(JSON.parse(savedCart));

    setProducts(mockProducts);
    setFarmers(mockFarmers);
    setDrivers(mockDrivers);
    setCustomers(mockCustomers);
    
    setIsLoaded(true);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "melody_orders" && e.newValue) setOrders(JSON.parse(e.newValue));
      if (e.key === "melody_cart" && e.newValue) setCart(JSON.parse(e.newValue));
      if (e.key === "melody_role" && e.newValue) setRoleState(e.newValue as Role);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem("melody_role", newRole);
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      let newCart;
      if (existing) {
        newCart = prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        newCart = [...prev, { product, quantity }];
      }
      localStorage.setItem("melody_cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.product.id !== productId);
      localStorage.setItem("melody_cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("melody_cart");
  };

  const placeOrder = (address: string) => {
    if (cart.length === 0) return null;

    const farmerId = cart[0].product.farmerId;
    const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: customers[0].id,
      farmerId: farmerId,
      items: [...cart],
      totalAmount,
      status: "PLACED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deliveryAddress: address || customers[0].address,
    };

    setOrders((prev) => {
      const newOrders = [newOrder, ...prev];
      localStorage.setItem("melody_orders", JSON.stringify(newOrders));
      return newOrders;
    });

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => {
      const newOrders = prev.map((order) => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, status, updatedAt: new Date().toISOString() };
          if (status === "READY_FOR_PICKUP" && !order.driverId) {
            updatedOrder.driverId = drivers[0].id;
          }
          return updatedOrder;
        }
        return order;
      });
      localStorage.setItem("melody_orders", JSON.stringify(newOrders));
      return newOrders;
    });
  };

  const resetDemoData = () => {
    localStorage.setItem("melody_orders", JSON.stringify(initialOrders));
    localStorage.removeItem("melody_cart");
    setOrders(initialOrders);
    setCart([]);
  };

  if (!isLoaded) return null;

  return (
    <StoreContext.Provider
      value={{
        role,
        setRole,
        products,
        farmers,
        orders,
        drivers,
        customers,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        placeOrder,
        updateOrderStatus,
        resetDemoData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
