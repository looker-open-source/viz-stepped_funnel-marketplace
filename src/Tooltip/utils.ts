/**
 * Computes the tooltip position, given the mouse position, tooltip width and
 * window width. It will offset the tooltip down and to the right where it can.
 * If it's going to go past the right edge of the window, it places the tooltip
 * down and to the left.
 *
 * @param rawX The x position of the mouse cursor.
 * @param rawY The y position of the mouse cursor.
 * @param tooltipWidth The width of the tooltip.
 * @param windowWidth The window width.
 */
export const computeTooltipPosition = (
    rawX: number,
    rawY: number,
    tooltipWidth: number,
    windowWidth: number
  ) => {
    const TOOLTIP_OFFSET = 5
  
    // If the tooltip goes beyond the right edge of the window, render it to the left of the mouse position.
    const tooltipX =
      rawX + TOOLTIP_OFFSET + tooltipWidth > windowWidth
        ? rawX - TOOLTIP_OFFSET - tooltipWidth
        : rawX + TOOLTIP_OFFSET
  
    // Much less likely to run off the bottom of the page, so ignore for now.
    const tooltipY = rawY + TOOLTIP_OFFSET
  
    return {
      x: tooltipX,
      y: tooltipY,
    }
  }
  