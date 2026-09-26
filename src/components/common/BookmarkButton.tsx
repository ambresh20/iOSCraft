import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks, type Bookmark as BookmarkType } from '../../hooks/useBookmarks';

interface BookmarkButtonProps {
  item: Omit<BookmarkType, 'bookmarkedAt'>;
  showLabel?: boolean;
  size?: number;
}

export function BookmarkButton({ item, showLabel = false, size = 16 }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(item.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(item);
      }}
      className={`
        inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm
        transition-all duration-200 focus-ring
        ${bookmarked
          ? 'text-brand-orange bg-brand-orange/10 hover:bg-brand-orange/20'
          : 'text-[var(--text-muted)] hover:text-brand-orange hover:bg-brand-orange/10'
        }
      `}
      title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      aria-label={bookmarked ? `Remove ${item.title} from bookmarks` : `Bookmark ${item.title}`}
      aria-pressed={bookmarked}
    >
      {bookmarked ? (
        <BookmarkCheck size={size} />
      ) : (
        <Bookmark size={size} />
      )}
      {showLabel && (
        <span className="text-xs font-medium">
          {bookmarked ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
}
