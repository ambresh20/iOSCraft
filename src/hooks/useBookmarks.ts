import { useLocalStorage } from './useLocalStorage';

// ============================================================
// BOOKMARK TYPES
// ============================================================

export interface Bookmark {
  id: string;
  type: 'lesson' | 'interview' | 'dsa' | 'blog' | 'project';
  title: string;
  slug: string;
  url: string;
  category: string;
  difficulty?: string;
  bookmarkedAt: string;
}

const BOOKMARKS_KEY = 'ioscraft_bookmarks';

// ============================================================
// useBookmarks HOOK
// ============================================================

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>(BOOKMARKS_KEY, []);

  const isBookmarked = (id: string): boolean => {
    return bookmarks.some(b => b.id === id);
  };

  const addBookmark = (bookmark: Omit<Bookmark, 'bookmarkedAt'>) => {
    if (isBookmarked(bookmark.id)) return;
    setBookmarks(prev => [
      ...prev,
      { ...bookmark, bookmarkedAt: new Date().toISOString() },
    ]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const toggleBookmark = (bookmark: Omit<Bookmark, 'bookmarkedAt'>) => {
    if (isBookmarked(bookmark.id)) {
      removeBookmark(bookmark.id);
    } else {
      addBookmark(bookmark);
    }
  };

  const clearBookmarks = () => {
    setBookmarks([]);
  };

  const getBookmarksByType = (type: Bookmark['type']): Bookmark[] => {
    return bookmarks.filter(b => b.type === type);
  };

  return {
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    clearBookmarks,
    getBookmarksByType,
    totalCount: bookmarks.length,
  };
}
