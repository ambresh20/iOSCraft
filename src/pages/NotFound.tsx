import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
      <Helmet>
        <title>Page Not Found | iOSCraft</title>
      </Helmet>

      <div className="text-9xl font-extrabold text-[var(--border-color)] mb-4">
        404
      </div>
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
        Page not found
      </h1>
      <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link to="/" className="btn-primary flex items-center gap-2">
          <Home size={18} />
          Back to Home
        </Link>
        <button 
          onClick={() => {
            // Dispatch a custom event to open the search modal
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
          }}
          className="btn-secondary flex items-center gap-2"
        >
          <Search size={18} />
          Search iOSCraft
        </button>
      </div>
    </div>
  );
}
