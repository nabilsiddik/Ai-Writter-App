// "use client";

// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useTransition } from "react";

// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// interface TablePaginationProps {
//   currentPage: number;
//   totalPages: number;
// }

// const TablePagination = ({ currentPage, totalPages }: TablePaginationProps) => {

//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   const searchParams = useSearchParams();

//   const navigateToPage = (newPage: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", newPage.toString());

//     startTransition(() => {
//       router.push(`?${params.toString()}`);
//     });
//   };

//   const changeLimit = (newLimit: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("limit", newLimit);
//     params.set("page", "1")

//     startTransition(() => {
//       router.push(`?${params.toString()}`);
//     });
//   };

//   const currentLimit = searchParams.get("limit") || "10";

//   return (
//     <div className="flex items-center justify-center gap-2">
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => navigateToPage(currentPage - 1)}
//         disabled={currentPage <= 1 || isPending}
//       >
//         <ChevronLeft className="h-4 w-4 mr-1" />
//         Previous
//       </Button>

//       <div className="flex items-center gap-1">
//         {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
//           let pageNumber;

//           if (totalPages <= 5) {
//             pageNumber = index + 1;
//           } else if (currentPage <= 3) {
//             pageNumber = index + 1;
//           } else if (currentPage >= totalPages - 2) {
//             pageNumber = totalPages - 4 + index;
//           } else {
//             pageNumber = currentPage - 2 + index;
//           }

//           return (
//             <Button
//               key={pageNumber}
//               variant={pageNumber === currentPage ? "default" : "outline"}
//               size="sm"
//               onClick={() => navigateToPage(pageNumber)}
//               disabled={isPending}
//               className="w-10"
//             >
//               {pageNumber}
//             </Button>
//           );
//         })}
//       </div>

//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => navigateToPage(currentPage + 1)}
//         disabled={currentPage === totalPages || isPending}
//       >
//         Next
//         <ChevronRight className="h-4 w-4 ml-1" />
//       </Button>

//       <span className="text-sm text-muted-foreground ml-2">
//         {/* Page 9 of 20 */}
//         Page {currentPage} of {totalPages}
//       </span>

//       {/* Items per page selector */}
//       <div className="flex items-center gap-2">
//         <span className="text-sm text-muted-foreground">Items per page:</span>
//         <Select
//           value={currentLimit}
//           onValueChange={changeLimit}
//           disabled={isPending}
//         >
//           <SelectTrigger className="w-[70px] h-8">
//             <SelectValue />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="1">1</SelectItem>
//             <SelectItem value="5">5</SelectItem>
//             <SelectItem value="10">10</SelectItem>
//             <SelectItem value="20">20</SelectItem>
//             <SelectItem value="50">50</SelectItem>
//             <SelectItem value="100">100</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   );
// };

// export default TablePagination;

"use client";

import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function TablePagination({ meta }: { meta: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { page, limit, total } = meta || { page: 1, limit: 10, total: 0 };
  const totalPages = Math.ceil(total / limit);

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const updateLimit = (newLimit: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-12 bg-slate-50 p-8 rounded-[30px] border border-slate-100">
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold text-slate-500 uppercase tracking-tight">
          Show
        </span>
        <select
          value={limit}
          onChange={(e) => updateLimit(e.target.value)}
          className="bg-white border border-slate-200 px-4 py-2 rounded-xl font-black text-black focus:outline-none cursor-pointer"
        >
          {[10, 25, 50, 100].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <span className="text-lg font-bold text-slate-500 uppercase tracking-tight">
          per page
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          disabled={page <= 1}
          onClick={() => updatePage(page - 1)}
          className="p-3 bg-primary border border-slate-200 rounded-xl hover:bg-primary hover:text-white transition-all disabled:opacity-30 cursor-pointer shadow-sm"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => updatePage(p)}
              className={`w-12 h-12 rounded-xl text-lg font-black transition-all cursor-pointer ${
                page === p
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          disabled={page >= totalPages}
          onClick={() => updatePage(page + 1)}
          className="p-3 border bg-primary border-slate-200 rounded-xl hover:bg-primary hover:text-white transition-all disabled:opacity-30 cursor-pointer shadow-sm"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="text-lg font-bold text-slate-400">
        Total <span className="text-black">{total}</span> records found
      </div>
    </div>
  );
}
