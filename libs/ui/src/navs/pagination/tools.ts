import type { IPaginationJumpAvailability } from "./_types";

export function calculateTotalPages(
    totalItems: number,
    itemsPerPage: number
): number {
    return Math.ceil(totalItems / itemsPerPage);
}

export function getVisiblePages(
    totalPages: number,
    currentPage: number,
    visiblePagesLimit: number
): Array<number> {
    const halfLimit = Math.floor(visiblePagesLimit / 2);

    let startPage = Math.max(currentPage - halfLimit, 1);
    const endPage = Math.min(startPage + visiblePagesLimit - 1, totalPages);

    startPage = Math.max(endPage - visiblePagesLimit + 1, 1);

    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
    }

    return visiblePages;
}

export function getAvailablePaginationActions(
    currentPage: number,
    totalPages: number,
    pagesToJump: number
): IPaginationJumpAvailability {
    const canJumpPrev = currentPage - pagesToJump >= 1;
    const canJumpNext = currentPage + pagesToJump <= totalPages;

    return { canJumpPrev, canJumpNext };
}
