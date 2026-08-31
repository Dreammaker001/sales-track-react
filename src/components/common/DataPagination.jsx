import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '../ui/pagination'
import { cn } from '@/lib/utils'

export function DataPagination({ current, total, perPage, onPageChange }) {
  const totalPages = Math.ceil(total / perPage)

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (current > 3) {
        pages.push('...')
      }

      const start = Math.max(2, current - 1)
      const end = Math.min(totalPages - 1, current + 1)

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i)
        }
      }

      if (current < totalPages - 2) {
        pages.push('...')
      }

      pages.push(totalPages)
    }

    return pages
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            aria-label="Go to previous page"
            size="default"
            className="pl-1.5!"
            onClick={() => handlePageChange(current - 1)}
            disabled={current === 1}
          >
            <ChevronLeftIcon
              data-icon="inline-start"
              color={current === 1 ? '#99a1af' : '#5a6478'}
            />
            <span className={cn('hidden sm:block', current === 1 ? 'text-gray-400' : 'text-ink-1')}>
              Previous
            </span>
          </PaginationLink>
        </PaginationItem>

        {getPageNumbers().map((page, index) => (
          <PaginationItem
            key={index}
            className={cn(
              'rounded-sm',
              page == current ? 'border bg-primary border-primary' : 'bg-surface',
            )}
          >
            {page === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => handlePageChange(page)}
                // isActive={page === current}
                className={page == current ? 'text-white' : 'text-ink-1 hover:bg-surface p-2'}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            aria-label="Go to next page"
            size="default"
            className="pr-1.5!"
            onClick={() => handlePageChange(current + 1)}
            disabled={current === totalPages}
          >
            <span
              className={cn(
                'hidden sm:block',
                current === totalPages ? 'text-gray-400' : 'text-ink-1',
              )}
            >
              Next
            </span>
            <ChevronRightIcon
              data-icon="inline-end"
              color={current === totalPages ? '#99a1af' : '#5a6478'}
            />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
