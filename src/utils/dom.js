export const scrollToEl = href => {
    const $el = document.querySelector(href);

    if (!$el) {
        return;
    }

    $el.scrollIntoView({ behavior: 'smooth' });
};
