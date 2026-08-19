import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-xs text-slate-500 py-2.5 overflow-x-auto whitespace-nowrap", className)}
    >
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-primary transition-colors text-slate-600"
      >
        <Home className="h-3.5 w-3.5" />
        <span>Ana Sayfa</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-3.5 w-3.5 mx-1.5 text-slate-300 shrink-0" />
            {isLast || !item.href ? (
              <span className="font-medium text-slate-900 truncate max-w-[200px] sm:max-w-[350px]">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors text-slate-600 truncate"
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
