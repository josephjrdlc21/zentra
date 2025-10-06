export interface PaginationLinkData {
    url: string | null
    label: string
    page: number | null
    active: boolean
}

export interface PaginationProps {
    links: PaginationLinkData[]
}