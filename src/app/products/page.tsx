"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Package, Plus, ChevronLeft, ChevronRight, RefreshCw, Inbox, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast, ToastViewport } from "@/components/ui/Toast";
import { ProductFormDialog } from "@/components/products/ProductFormDialog";
import { ProductViewDialog } from "@/components/products/ProductViewDialog";
import { ConfirmDialog } from "@/components/products/ConfirmDialog";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductsTable, SortField, SortDirection } from "@/components/products/ProductsTable";
import { typeLabel } from "@/components/products/productDisplay";
import { productService } from "@/services/productService";
import { Product, ProductType } from "@/lib/mockData";
import { ProductFormValues } from "@/lib/productValidation";
import { cn } from "@/lib/utils";

type LoadState = "loading" | "error" | "ready";

const PAGE_SIZE = 8;

export default function ProductsPage() {
  const { toasts, toast, dismiss } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<Product | null>(null);
  const [isToggling, setIsToggling] = useState(false);

  const requestToken = useRef(0);

  const loadProducts = useCallback(() => {
    const token = ++requestToken.current;
    setLoadState((prev) => (prev === "ready" ? "ready" : "loading"));
    productService
      .search({
        query: search,
        productType: (typeFilter as ProductType) || "All",
        category: categoryFilter,
        status: (statusFilter as Product["status"]) || "All",
      })
      .then((data) => {
        if (token !== requestToken.current) return;
        setProducts(data);
        setLoadState("ready");
      })
      .catch(() => {
        if (token !== requestToken.current) return;
        setLoadState("error");
      });
  }, [search, typeFilter, categoryFilter, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(loadProducts, 250);
    return () => clearTimeout(timer);
  }, [loadProducts]);

  const sorted = useMemo(() => {
    const copy = [...products];
    copy.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "name": cmp = a.name.localeCompare(b.name); break;
        case "productType": cmp = typeLabel(a.productType).localeCompare(typeLabel(b.productType)); break;
        case "category": cmp = a.category.localeCompare(b.category); break;
        case "sellingPrice": cmp = a.sellingPrice - b.sellingPrice; break;
        case "currentStock": cmp = a.currentStock - b.currentStock; break;
        case "status": cmp = a.status.localeCompare(b.status); break;
      }
      return sortDirection === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [products, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const stats = useMemo(
    () => ({
      total: products.length,
      active: products.filter((p) => p.status === "active").length,
      lowStock: products.filter((p) => p.currentStock <= p.reorderLevel).length,
    }),
    [products]
  );

  const toggleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleEdit = (p: Product) => {
    setViewOpen(false);
    setEditingProduct(p);
    setFormOpen(true);
  };

  const handleView = (p: Product) => {
    setViewingProduct(p);
    setViewOpen(true);
  };

  const handleFormSubmit = async (values: ProductFormValues) => {
    try {
      if (editingProduct) {
        await productService.update(editingProduct.id, values);
        toast({ title: "Product updated", description: `${values.name} was saved successfully.`, variant: "success" });
      } else {
        await productService.create(values);
        toast({ title: "Product added", description: `${values.name} was added to the catalog.`, variant: "success" });
      }
      setFormOpen(false);
      loadProducts();
    } catch {
      toast({ title: "Something went wrong", description: "Could not save the product. Please try again.", variant: "error" });
    }
  };

  const handleToggleStatusConfirm = async () => {
    if (!confirmTarget) return;
    setIsToggling(true);
    try {
      if (confirmTarget.status === "active") {
        await productService.deactivate(confirmTarget.id);
        toast({ title: "Product deactivated", description: `${confirmTarget.name} is now inactive.`, variant: "info" });
      } else {
        await productService.activate(confirmTarget.id);
        toast({ title: "Product activated", description: `${confirmTarget.name} is now active.`, variant: "success" });
      }
      setConfirmTarget(null);
      loadProducts();
    } catch {
      toast({ title: "Something went wrong", description: "Could not update product status.", variant: "error" });
    } finally {
      setIsToggling(false);
    }
  };

  const hasActiveFilters = search !== "" || typeFilter !== "All" || categoryFilter !== "All" || statusFilter !== "All";

  // Every filter/search change jumps back to page 1, set explicitly in each
  // handler (rather than via an effect) so it happens as part of the same
  // user-initiated update.
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
    setPage(1);
  };
  const handleCategoryFilterChange = (value: string) => {
    setCategoryFilter(value);
    setPage(1);
  };
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };
  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setCategoryFilter("All");
    setStatusFilter("All");
    setPage(1);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Products</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">
            {stats.total} products &middot; {stats.active} active &middot;{" "}
            <span className={stats.lowStock > 0 ? "text-amber-600 font-semibold" : ""}>{stats.lowStock} low stock</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="md" onClick={loadProducts} title="Refresh">
            <RefreshCw className={cn("w-3.5 h-3.5", loadState === "loading" && "animate-spin")} />
          </Button>
          <Button onClick={handleAdd} className="gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Add Product
          </Button>
        </div>
      </div>

      <ProductFilters
        search={search}
        onSearchChange={handleSearchChange}
        typeFilter={typeFilter}
        onTypeFilterChange={handleTypeFilterChange}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={handleCategoryFilterChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
        resultCount={sorted.length}
        totalCount={products.length}
      />

      {/* Loading state */}
      {loadState === "loading" && (
        <Card>
          <CardContent className="p-16 flex flex-col items-center justify-center text-center gap-3">
            <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
            <p className="text-sm font-semibold text-slate-600">Loading products…</p>
          </CardContent>
        </Card>
      )}

      {/* Error state */}
      {loadState === "error" && (
        <Card>
          <CardContent className="p-16 flex flex-col items-center justify-center text-center gap-3">
            <XCircle className="w-8 h-8 text-rose-500" />
            <p className="text-sm font-bold text-slate-800">Couldn&apos;t load products</p>
            <p className="text-xs text-slate-500 max-w-sm">Something went wrong while fetching the catalog. Please try again.</p>
            <Button variant="outline" size="sm" onClick={loadProducts} className="gap-1.5 mt-1">
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {loadState === "ready" && sorted.length === 0 && (
        <Card>
          <CardContent className="p-16 flex flex-col items-center justify-center text-center gap-3">
            <Inbox className="w-8 h-8 text-slate-300" />
            <p className="text-sm font-bold text-slate-800">
              {hasActiveFilters ? "No products match your filters" : "No products yet"}
            </p>
            <p className="text-xs text-slate-500 max-w-sm">
              {hasActiveFilters
                ? "Try adjusting your search or filters to find what you're looking for."
                : "Get started by adding your first product to the catalog."}
            </p>
            {hasActiveFilters ? (
              <Button variant="outline" size="sm" onClick={clearFilters}>Clear filters</Button>
            ) : (
              <Button size="sm" onClick={handleAdd} className="gap-1.5"><Plus className="w-3.5 h-3.5" /> Add Product</Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Data: table (sm+) / cards (mobile) */}
      {loadState === "ready" && sorted.length > 0 && (
        <>
          <ProductsTable
            products={paginated}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={toggleSort}
            onView={handleView}
            onEdit={handleEdit}
            onToggleStatus={(p) => setConfirmTarget(p)}
          />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
            <p className="text-[11px] text-slate-500">
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, sorted.length)} of {sorted.length} products
            </p>
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="sm" disabled={currentPage <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                <ChevronLeft className="w-3.5 h-3.5" />
              </Button>
              <span className="text-xs font-semibold text-slate-600 px-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button variant="outline" size="sm" disabled={currentPage >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Dialogs */}
      <ProductFormDialog open={formOpen} onOpenChange={setFormOpen} product={editingProduct} onSubmit={handleFormSubmit} />
      <ProductViewDialog open={viewOpen} onOpenChange={setViewOpen} product={viewingProduct} onEdit={handleEdit} />
      <ConfirmDialog
        open={Boolean(confirmTarget)}
        onOpenChange={(open) => !open && setConfirmTarget(null)}
        title={confirmTarget?.status === "active" ? "Deactivate product?" : "Activate product?"}
        description={
          confirmTarget?.status === "active"
            ? `${confirmTarget?.name} will be marked inactive and hidden from sales. It won't be deleted and can be reactivated anytime.`
            : `${confirmTarget?.name} will be marked active and available again.`
        }
        confirmLabel={confirmTarget?.status === "active" ? "Deactivate" : "Activate"}
        confirmVariant={confirmTarget?.status === "active" ? "destructive" : "accent"}
        isLoading={isToggling}
        onConfirm={handleToggleStatusConfirm}
      />

      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
