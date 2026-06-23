export function StatsSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-12 bg-indigo-600 rounded-[40px] shadow-2xl shadow-indigo-500/20">
        {[
          { label: "Generations", val: "50k+" },
          { label: "Accuracy", val: "99.2%" },
          { label: "Universities", val: "120+" },
          { label: "Time Saved", val: "10h/wk" },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <h4 className="text-4xl font-black text-white mb-1">{s.val}</h4>
            <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
