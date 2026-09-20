"use client";

import { useStore } from "@/context/StoreContext";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function FarmerProductsPage() {
  const { products } = useStore();
  const myProducts = products.filter(p => p.farmerId === "f1");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-slate-500 mt-1">Manage your products, prices, and stock levels.</p>
        </div>
        
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Plus size={20} /> Add New Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myProducts.map(product => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={product.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                      <div>
                        <div className="font-semibold text-slate-900">{product.name}</div>
                        {product.isOrganic && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold uppercase tracking-wide">Organic</span>}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 text-sm">{product.category}</td>
                  <td className="p-4 text-slate-900 font-medium">₹{product.price} <span className="text-slate-400 text-sm font-normal">/{product.unit}</span></td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stock > 30 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} {product.unit} left
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
