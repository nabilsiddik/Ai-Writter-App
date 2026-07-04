"use client";

import { Search, X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface FilterOption {
  label: string;
  value: string;
}

interface TableToolbarProps {
  placeholder: string;
  filterOptions?: {
    key: string;
    label: string;
    options: FilterOption[];
  }[];
}

export default function TableToolbar({
  placeholder,
  filterOptions,
}: TableToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => router.push(pathname);

  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-10 items-center justify-between">
      <div className="relative w-full lg:w-96 group">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 transition-colors"
          size={22}
        />
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={searchParams.get("searchTerm") || ""}
          onChange={(e) => updateQuery("searchTerm", e.target.value)}
          className="w-full pl-14 pr-6 py-4 bg-white text-black border-2 border-slate-100 rounded-2xl text-lg focus:outline-none focus:border-primary transition-all shadow-sm"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
        {filterOptions?.map((filter) => (
          <select
            key={filter.key}
            value={searchParams.get(filter.key) || ""}
            onChange={(e) => updateQuery(filter.key, e.target.value)}
            className="bg-white border-2 border-slate-100 px-6 py-4 rounded-2xl text-lg font-bold text-slate-600 focus:outline-none focus:border-primary cursor-pointer shadow-sm"
          >
            <option value="">{filter.label}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}

        {searchParams.toString() !== "" && (
          <button
            onClick={clearFilters}
            className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
