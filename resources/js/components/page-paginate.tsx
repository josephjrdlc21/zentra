import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { PaginationProps } from "@/types/pagination";

export default function PagePagination({ links }: PaginationProps) {
  if (!links || links.length === 0) return null

  return (
        <Pagination className="py-3 justify-center overflow-y-auto">
            <PaginationContent>
                {links.map((link, index) => {
                const isPrev = index === 0
                const isNext = index === links.length - 1

                const label = link.label
                    .replace("&laquo;", "«")
                    .replace("&raquo;", "»")
                    .trim()

                // Disabled state (no URL)
                if (!link.url) {
                    return (
                    <PaginationItem key={index}>
                        {isPrev ? (
                        <PaginationPrevious className="opacity-50 pointer-events-none" />
                        ) : isNext ? (
                        <PaginationNext className="opacity-50 pointer-events-none" />
                        ) : (
                        <PaginationEllipsis />
                        )}
                    </PaginationItem>
                    )
                }

                // Active/inactive numeric links
                if (!isPrev && !isNext) {
                    return (
                    <PaginationItem key={index}>
                        <PaginationLink
                        href={link.url}
                        isActive={link.active}
                        dangerouslySetInnerHTML={{ __html: label }}
                        />
                    </PaginationItem>
                    )
                }

                // Previous and Next buttons
                if (isPrev) {
                    return (
                    <PaginationItem key={index}>
                        <PaginationPrevious href={link.url} />
                    </PaginationItem>
                    )
                }

                if (isNext) {
                    return (
                    <PaginationItem key={index}>
                        <PaginationNext href={link.url} />
                    </PaginationItem>
                    )
                }

                return null
                })}
            </PaginationContent>
        </Pagination>
    )
}