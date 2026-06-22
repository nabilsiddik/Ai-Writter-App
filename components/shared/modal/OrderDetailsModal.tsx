'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Phone, User, Package, CreditCard, Truck, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const statusColors: any = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  PROCESSING: "bg-blue-100 text-blue-700 border-blue-200",
  SHIPPED: "bg-purple-100 text-purple-700 border-purple-200",
  DELIVERED: "bg-emerald-100 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-rose-100 text-rose-700 border-rose-200",
};

export function OrderDetailsModal({ order, onClose, onStatusUpdate, setOrderInfo }: any) {
  if (!order) return null;

  const address = typeof order.shippingAddress === 'string' 
    ? JSON.parse(order.shippingAddress) 
    : order.shippingAddress;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">অর্ডার ডিটেইলস</h2>
            <p className="text-brand-orange font-bold  uppercase tracking-[0.2em] mt-1">
              {order.orderNumber || `#ORD-${order.id.slice(-8).toUpperCase()}`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              defaultValue={order.status}
              onChange={(e) => setOrderInfo({
                orderId: order?.id,
                status: e.target?.value
              })}
              className={cn(
                "px-4 py-2 rounded-xl font-black uppercase outline-none border-2 transition-all cursor-pointer",
                statusColors[order.status]
              )}
            >
              {["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto space-y-8 flex-1 custom-scrollbar">
          {/* Customer & Shipping Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-3xl space-y-4 border border-slate-100">
              <h4 className="font-black text-slate-400 uppercase flex items-center gap-2">
                <User /> কাস্টমার তথ্য
              </h4>
              <div>
                <p className="font-black text-slate-900 text-lg">{order.user?.fullName || address?.fullName}</p>
                <p className="text-sm font-bold text-slate-500 flex items-center gap-2 mt-1">
                  <Phone className="w-3 h-3" /> {order.contactNumber}
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl space-y-4 border border-slate-100">
              <h4 className="font-black text-slate-400 uppercase flex items-center gap-2">
                <MapPin /> শিপিং ঠিকানা
              </h4>
              <div>
                <p className="text-sm font-black text-slate-900">{address?.streetAddress}</p>
                <p className="font-bold text-slate-500 mt-1">{address?.thana}, {address?.district}</p>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="space-y-4">
            <h4 className="font-black text-slate-400 uppercase flex items-center gap-2 px-2">
              <Package/> পন্যের তালিকা
            </h4>
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden divide-y divide-slate-50">
              {order.orderItems?.map((item: any) => (
                <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-slate-100">
                    <img src={item.product?.thumbnail} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-slate-900 truncate">{item.product?.name}</p>
                    <p className="font-bold text-slate-400 uppercase mt-0.5">
                      ৳{item.price} × {item.quantity} {item.product?.unit}
                    </p>
                  </div>
                  <p className="font-black text-slate-900 text-base">৳{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-8 bg-slate-900 rounded-[32px] text-white space-y-4 shadow-xl">
            <div className="flex justify-between font-bold text-slate-400 uppercase tracking-widest">
              <span>সাবটোটাল</span>
              <span>৳{order.totalAmount}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-400 uppercase tracking-widest">
              <span>শিপিং চার্জ</span>
              <span>৳{order.shippingFee}</span>
            </div>
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                <span className="font-black uppercase text-slate-400">Payment: {order.paymentMethod}</span>
              </div>
              <div className="text-right">
                <p className="font-black text-brand-orange uppercase mb-1">সর্বমোট পরিশোধযোগ্য</p>
                <p className="text-3xl font-black tracking-tighter text-white">৳{order.payableAmount}</p>
              </div>
            </div>
          </div>
          <div>
            <Button onClick={onStatusUpdate} className="w-full rounded-2xl py-7 text-lg cursor-pointer">
              Update Order Status
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}