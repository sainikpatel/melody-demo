"use client";

import { useStore } from "@/context/StoreContext";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Minus, Plus, ShieldCheck, Truck, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function ProductDetailPage() {
  const { products, farmers, addToCart } = useStore();
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === productId);
  if (!product) {
    return <div className="text-center py-20 text-slate-500">Product not found.</div>;
  }
  
  const farmer = farmers.find(f => f.id === product.farmerId);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    router.push("/customer/cart");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2 relative h-80 md:h-auto min-h-[400px]">
            <Image 
              src={product.imageUrl} 
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.isOrganic && (
              <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide shadow-md">
                Organic Certified
              </div>
            )}
          </div>
          
          {/* Details */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
            <div className="mb-2 text-sm font-medium text-emerald-600 uppercase tracking-wider">
              {product.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-6 text-slate-600">
              <span className="text-sm">Harvested by</span>
              <div className="flex items-center gap-1 font-medium text-slate-900 bg-slate-100 px-3 py-1 rounded-full text-sm">
                {farmer?.name} 
                {farmer?.isVerified && <ShieldCheck size={16} className="text-emerald-500" />}
              </div>
            </div>
            
            <div className="mb-8">
              <div className="text-4xl font-bold text-slate-900">₹{product.price}</div>
              <div className="text-slate-500 mt-1">per {product.unit}</div>
            </div>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Truck className="text-emerald-500" />
                <div>
                  <div className="font-semibold text-slate-900 text-sm">Fast Delivery</div>
                  <div className="text-xs text-slate-500">Direct from farm</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <ShieldCheck className="text-emerald-500" />
                <div>
                  <div className="font-semibold text-slate-900 text-sm">Quality Checked</div>
                  <div className="text-xs text-slate-500">Freshness guaranteed</div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto flex items-center gap-4">
              <div className="flex items-center border-2 border-slate-200 rounded-xl bg-white h-14">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:bg-slate-50 rounded-l-xl transition-colors"
                >
                  <Minus size={20} />
                </button>
                <div className="w-12 text-center font-bold text-lg text-slate-900">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:bg-slate-50 rounded-r-xl transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
