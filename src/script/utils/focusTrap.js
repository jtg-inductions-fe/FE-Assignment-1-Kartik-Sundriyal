const focusableSelectors = 'a, button, input, [tabindex]:not([tabindex="-1"])';

const trapFocus = (element, callback, returnFocusEl) => {
    const focusableEls = element.querySelectorAll(focusableSelectors);

    if (focusableEls.length == 0) {
        return () => {};
    }

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
        } else if (e.key === 'Escape') {
            callback();
            returnFocusEl.focus();
        }
    }

    element.addEventListener('keydown', handleKeyDown);

    setTimeout(() => {
        element.focus();
    }, 400);

    element.dataset.trapFocus = 'true';

    // Cleanup
    return () => element.removeEventListener('keydown', handleKeyDown);
};

export default trapFocus;
