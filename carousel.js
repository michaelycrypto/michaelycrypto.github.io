document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const container = document.querySelector('.carousel-container');

    const items = track.children;
    const totalItems = items.length;
    let itemsPerPage = 5;
    let currentPage = 0;
    const pageGutter = 48;

    function updateItemsPerPage() {
        const containerWidth = container.offsetWidth;
        if (containerWidth < 600) {
            itemsPerPage = 1;
        } else if (containerWidth < 900) {
            itemsPerPage = 2;
        } else if (containerWidth < 1200) {
            itemsPerPage = 3;
        } else if (containerWidth < 1500) {
            itemsPerPage = 4;
        } else {
            itemsPerPage = 5;
        }
        return Math.ceil(totalItems / itemsPerPage);
    }

    function updateArrowVisibility() {
        const totalPages = updateItemsPerPage();
        leftArrow.style.display = currentPage > 0 ? 'block' : 'none';
        rightArrow.style.display = currentPage < totalPages - 1 ? 'block' : 'none';
    }

    function scrollCarousel(direction) {
        const totalPages = updateItemsPerPage();
        currentPage += direction;
        currentPage = Math.max(0, Math.min(currentPage, totalPages - 1));

        const scrollAmount = (container.offsetWidth + pageGutter) * currentPage;
        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });

        updateArrowVisibility();
    }

    function resizeCarousel() {
        const containerWidth = container.offsetWidth;
        const totalPages = updateItemsPerPage();
        const itemWidth = (containerWidth - (itemsPerPage - 1) * 16) / itemsPerPage;

        track.style.width = `${(containerWidth * totalPages) + (pageGutter * (totalPages - 1))}px`;

        Array.from(items).forEach((item, index) => {
            item.style.width = `${itemWidth}px`;
            item.style.marginRight = (index + 1) % itemsPerPage === 0 ? `${pageGutter}px` : '16px';
        });

        container.scrollTo({
            left: (containerWidth + pageGutter) * currentPage,
            behavior: 'auto'
        });

        updateArrowVisibility();
    }

    leftArrow.addEventListener('click', () => scrollCarousel(-1));
    rightArrow.addEventListener('click', () => scrollCarousel(1));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') scrollCarousel(-1);
        if (e.key === 'ArrowRight') scrollCarousel(1);
    });

    resizeCarousel();

    window.addEventListener('resize', resizeCarousel);
});