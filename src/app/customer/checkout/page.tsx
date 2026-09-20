"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { useRouter } from "next/navigation";
import { MapPin, CheckCircle2 } from "lucide-react";

export default function CheckoutPage() {
  const { cart, customers, placeOrder } = useStore();
  const router = useRouter();
  
  const customer = customers[0];
  const [address, setAddress] = useState(customer.address);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = cart.length > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    router.push("/customer/cart");
    return null;
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = placeOrder(address);
      if (order) {
        router.push(`/customer/orders/${order.id}?success=true`);
      }
    }, 1500); // Simulate processing
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          
          {/* Delivery Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin className="text-emerald-500" /> Delivery Address
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" defaultValue={customer.name} className="w-full border border-slate-200 rounded-lg p-3 bg-slate-50 text-slate-500" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Address</label>
                <textarea 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                />
              </div>
            </div>
          </div>
          
          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Payment Method (Demo)</h2>
            <div className="space-y-3">
              <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "cod" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-slate-300"}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500" 
                />
                <div className="ml-3">
                  <span className="block font-medium text-slate-900">Cash on Delivery</span>
                  <span className="block text-sm text-slate-500">Pay when your order arrives</span>
                </div>
                {paymentMethod === "cod" && <CheckCircle2 className="ml-auto text-emerald-500" />}
              </label>
              
              <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "online" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-slate-300"}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500" 
                />
                <div className="ml-3">
                  <span className="block font-medium text-slate-900">Demo Online Payment</span>
                  <span className="block text-sm text-slate-500">Skip payment gateway for demo</span>
                </div>
                {paymentMethod === "online" && <CheckCircle2 className="ml-auto text-emerald-500" />}
              </label>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Summary</h2>
            
            <div className="flex items-center gap-2 mb-6 p-3 bg-slate-50 rounded-lg">
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded">
                {cart.length}
              </span>
              <span className="text-sm font-medium text-slate-700">Items in cart</span>
            </div>
            
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Items Total</span>
                <span className="font-medium text-slate-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span className="font-medium text-slate-900">₹{deliveryFee}</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between text-base">
                <span className="font-bold text-slate-900">Total to Pay</span>
                <span className="font-bold text-emerald-600">₹{total}</span>
              </div>
            </div>
            
            <button 
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className={`w-full font-medium py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                isProcessing 
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30"
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                `Place Order • ₹${total}`
              )}
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">
              By placing this order, you agree to our Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
