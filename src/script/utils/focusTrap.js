//Focus trapping:
const focusableSelectors =
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

export default function trapFocus(element) {
    const focusableEls = element.querySelectorAll(focusableSelectors);
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    function handleKeyDown(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        }
    }

    element.addEventListener('keydown', handleKeyDown);
    setTimeout(() => {
        element.focus();
    }, 400);
    element.dataset.trapFocus = 'true';

    // Cleanup
    return () => element.removeEventListener('keydown', handleKeyDown);
}
