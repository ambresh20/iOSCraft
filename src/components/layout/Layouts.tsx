import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

// ============================================================
// MARKETING LAYOUT — Homepage, About, Blog list, etc.
// ============================================================
export function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// ============================================================
// DASHBOARD LAYOUT — Bookmarks, Search, etc.
// ============================================================
export function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />
      <main className="flex-1 container-content py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
