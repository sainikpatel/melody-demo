"use client";

import { useStore } from "@/context/StoreContext";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useStore();
  const router = useRouter();

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = cart.length > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-2xl p-12 max-w-lg mx-auto shadow-sm border border-slate-100">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCartIcon />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
          <p className="text-slate-500 mb-8">Looks like you haven't added any fresh farm products yet.</p>
          <Link href="/customer/products" className="inline-flex bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-full transition-colors">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <ul className="divide-y divide-slate-100">
              {cart.map((item) => (
                <li key={item.product.id} className="p-6 flex flex-col sm:flex-row gap-6">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-50">
                    <Image 
                      src={item.product.imageUrl} 
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">{item.product.name}</h3>
                        <p className="text-sm text-slate-500">₹{item.product.price} / {item.product.unit}</p>
                      </div>
                      <span className="font-bold text-lg text-slate-900">₹{item.product.price * item.quantity}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button 
                          onClick={() => item.quantity > 1 ? addToCart(item.product, -1) : removeFromCart(item.product.id)}
                          className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-medium text-slate-700">{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item.product, 1)}
                          className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-2"
                        title="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span className="font-medium text-slate-900">₹{deliveryFee}</span>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between">
                <span className="font-bold text-lg text-slate-900">Total</span>
                <span className="font-bold text-xl text-emerald-600">₹{total}</span>
              </div>
            </div>
            
            <button 
              onClick={() => router.push("/customer/checkout")}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingCartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
      <circle cx="8" cy="21" r="1"/>
      <circle cx="19" cy="21" r="1"/>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
  );
}
