import { motion } from 'motion/react';


export function UserOrderDetailsModal({ order, onClose }: any) {

  const address = order.shippingAddress;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-xl bg-white rounded-[40px] p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-black mb-6">অর্ডারের বিস্তারিত</h3>
        
        <div className="space-y-4 mb-8">
          {order.orderItems.map((item: any) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-3xl">
              <img src={item.product.thumbnail} className="w-12 h-12 rounded-xl object-cover" alt="" />
              <div className="flex-1">
                <p className="text-sm font-black text-slate-800">{item.product.name}</p>
                <p className="text-xs text-slate-400 font-bold uppercase">৳{item.price} x {item.quantity}</p>
              </div>
              <p className="font-black text-slate-900 text-sm">৳{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="p-6 border border-slate-100 rounded-3xl space-y-3 mb-8">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">শিপিং অ্যাড্রেস</p>
           <p className="text-sm font-bold text-slate-700">{address.fullName}</p>
           <p className="text-xs text-slate-500">{address.streetAddress}, {address.thana}, {address.district}</p>
           <p className="text-xs font-bold text-slate-900">ফোন: {address.phone}</p>
        </div>

        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between text-xs font-bold text-slate-500"><span>সাবটোটাল</span><span>৳{order.totalAmount}</span></div>
          <div className="flex justify-between text-xs font-bold text-slate-500"><span>শিপিং চার্জ</span><span>৳{order.shippingFee}</span></div>
          <div className="flex justify-between text-xl font-black text-slate-900 pt-2"><span>সর্বমোট</span><span className="text-brand-orange">৳{order.payableAmount}</span></div>
        </div>
      </motion.div>
    </div>
  );
}