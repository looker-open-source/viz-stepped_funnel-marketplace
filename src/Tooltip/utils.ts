/**
 * Computes the tooltip position, given the mouse position, tooltip width and
 * window width. It will offset the tooltip down and to the right where it can.
 * If it's going to go past the right edge of the window, it places the tooltip
 * down and to the left.
 *
 * @param rawX The x position of the mouse cursor.
 * @param rawY The y position of the mouse cursor.
 * @param tooltipWidth The width of the tooltip.
 * @param tooltipHeight The height of the tooltip.
 * @param windowWidth The window width.
 * @param windowHeight The window height.
 */
export const computeTooltipPosition = (
    rawX: number,
    rawY: number,
    tooltipWidth: number,
    tooltipHeight: number,
    windowWidth: number,
    windowHeight: number,
  ) => {
    const TOOLTIP_OFFSET = 8
  
    // If mouse on left side of screen, draw tooltip right and vice versa
    const tooltipX =
      rawX > (windowWidth/2)
        ? rawX - TOOLTIP_OFFSET - tooltipWidth
        : rawX + TOOLTIP_OFFSET
    // debugger;
    // Much less likely to run off the bottom of the page, so ignore for now.
    const tooltipY = rawY > (windowHeight - tooltipHeight)
      ? rawY - TOOLTIP_OFFSET - tooltipHeight
      : rawY + TOOLTIP_OFFSET
  
    return {
      x: tooltipX,
      y: tooltipY,
    }
  }
  