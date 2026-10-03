/* =========================================================
   STYLEMYHAIR
   HAIR PRODUCTS JAVASCRIPT
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =====================================================
           ELEMENTS
        ===================================================== */

        const html =
            document.documentElement;

        const body =
            document.body;

        const sidebar =
            document.getElementById(
                "femaleSidebar"
            );

        const overlay =
            document.getElementById(
                "sidebarOverlay"
            );

        const mobileMenuButton =
            document.getElementById(
                "mobileMenuButton"
            );

        const darkModeButton =
            document.getElementById(
                "darkModeButton"
            );

        const themeButtons =
            document.querySelectorAll(
                ".theme-color"
            );

        const selectedThemeName =
            document.getElementById(
                "selectedThemeName"
            );

        const productSearch =
            document.getElementById(
                "productSearch"
            );

        const clearProductSearch =
            document.getElementById(
                "clearProductSearch"
            );

        const productsGrid =
            document.getElementById(
                "productsGrid"
            );

        const recommendationGrid =
            document.getElementById(
                "recommendationGrid"
            );

        const noProducts =
            document.getElementById(
                "noProducts"
            );

        const resultCount =
            document.getElementById(
                "productResultCount"
            );

        const categoryButtons =
            document.querySelectorAll(
                ".product-category-card"
            );

        const hairTypeButtons =
            document.querySelectorAll(
                ".hair-type-card"
            );

        const resetProducts =
            document.getElementById(
                "resetProducts"
            );

        const showAllCategories =
            document.getElementById(
                "showAllCategories"
            );

        const showAllHairTypes =
            document.getElementById(
                "showAllHairTypes"
            );


        /* =====================================================
           FILTER STATE
        ===================================================== */

        let selectedCategory =
            "all";

        let selectedHair =
            "all";


        /* =====================================================
           THEME NAMES
        ===================================================== */

        const themeNames = {

            rose:
                "Rose",

            lavender:
                "Lavender",

            peach:
                "Peach",

            sky:
                "Sky Blue",

            mint:
                "Mint",

            sage:
                "Sage",

            butter:
                "Butter",

            coral:
                "Coral",

            plum:
                "Plum",

            ocean:
                "Ocean",

            cocoa:
                "Cocoa",

            midnight:
                "Midnight"

        };


        /* =====================================================
           LOAD SAVED THEME
        ===================================================== */

        const savedTheme =
            localStorage.getItem(
                "stylemyhair-female-theme"
            );

        if (
            savedTheme &&
            themeNames[savedTheme]
        ) {

            html.setAttribute(
                "data-theme",
                savedTheme
            );

        }


        function updateThemeUI() {

            const currentTheme =
                html.getAttribute(
                    "data-theme"
                ) || "rose";


            themeButtons.forEach(
                function (button) {

                    button.classList.toggle(
                        "active",
                        button.dataset.theme ===
                        currentTheme
                    );

                }
            );


            if (selectedThemeName) {

                selectedThemeName.textContent =
                    themeNames[currentTheme] ||
                    "Rose";

            }

        }


        updateThemeUI();


        /* =====================================================
           THEME BUTTONS
        ===================================================== */

        themeButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const selectedTheme =
                            this.dataset.theme;


                        if (
                            !themeNames[
                                selectedTheme
                            ]
                        ) {
                            return;
                        }


                        html.setAttribute(
                            "data-theme",
                            selectedTheme
                        );


                        localStorage.setItem(
                            "stylemyhair-female-theme",
                            selectedTheme
                        );


                        updateThemeUI();

                    }
                );

            }
        );


        /* =====================================================
           DARK MODE
        ===================================================== */

        const savedDarkMode =
            localStorage.getItem(
                "stylemyhair-dark-mode"
            );


        if (
            savedDarkMode === "true"
        ) {

            body.classList.add(
                "dark-mode"
            );

        }


        function updateDarkModeIcon() {

            if (!darkModeButton) {
                return;
            }


            const isDark =
                body.classList.contains(
                    "dark-mode"
                );


            darkModeButton.textContent =
                isDark
                    ? "☾"
                    : "☼";

        }


        updateDarkModeIcon();


        if (darkModeButton) {

            darkModeButton.addEventListener(
                "click",
                function () {

                    body.classList.toggle(
                        "dark-mode"
                    );


                    const isDark =
                        body.classList.contains(
                            "dark-mode"
                        );


                    localStorage.setItem(
                        "stylemyhair-dark-mode",
                        String(isDark)
                    );


                    updateDarkModeIcon();

                }
            );

        }


        /* =====================================================
           MOBILE SIDEBAR
        ===================================================== */

        function openSidebar() {

            if (sidebar) {

                sidebar.classList.add(
                    "mobile-open"
                );

            }


            if (overlay) {

                overlay.classList.add(
                    "show"
                );

            }


            if (mobileMenuButton) {

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }


            body.classList.add(
                "sidebar-open"
            );

        }


        function closeSidebar() {

            if (sidebar) {

                sidebar.classList.remove(
                    "mobile-open"
                );

            }


            if (overlay) {

                overlay.classList.remove(
                    "show"
                );

            }


            if (mobileMenuButton) {

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            body.classList.remove(
                "sidebar-open"
            );

        }


        if (mobileMenuButton) {

            mobileMenuButton.addEventListener(
                "click",
                function () {

                    if (
                        sidebar &&
                        sidebar.classList.contains(
                            "mobile-open"
                        )
                    ) {

                        closeSidebar();

                    } else {

                        openSidebar();

                    }

                }
            );

        }


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeSidebar
            );

        }


        /* =====================================================
           HEADER SEARCH BUTTON
        ===================================================== */

        const headerSearchButton =
            document.getElementById(
                "headerSearchButton"
            );


        if (headerSearchButton) {

            headerSearchButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    if (!productSearch) {
                        return;
                    }


                    productSearch.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });


                    setTimeout(
                        function () {

                            productSearch.focus();

                            productSearch.click();

                        },
                        400
                    );

                }
            );

        }


        /* =====================================================
           PRODUCT DATA

           Replace image filenames whenever you add
           your own images.
        ===================================================== */

        const products = [

            {
                id: 1,

                name:
                    "L'Oréal Paris Extraordinary Oil Hair Serum",

                description:
                    "Anti-frizz serum with shine and smooth finish.",

                category:
                    "serum",

                hair:
                    [
                        "all",
                        "frizzy",
                        "dry"
                    ],

                hairLabel:
                    "All Hair Types",

                price:
                    "₹547",

                image:
                    "loreal-serum.jpg",

                nykaa:
                    "https://www.nykaa.com/l-oreal-paris-elseve-extraordinary-oil-serum/p/1133168"

            },


            {
                id: 2,

                name:
                    "L'Oréal Paris Hyaluron Moisture Shampoo",

                description:
                    "Moisture-focused shampoo for smoother hair.",

                category:
                    "shampoo",

                hair:
                    [
                        "dry",
                        "frizzy"
                    ],

                hairLabel:
                    "Dry Hair",

                price:
                    "₹789",

                image:
                    "loreal-shampoo.jpg",

                nykaa:
                    "https://www.nykaa.com/search/result/?q=L%27Oreal%20Paris%20Hyaluron%20Moisture%20Shampoo"

            },


            {
                id: 3,

                name:
                    "L'Oréal Paris Hyaluron Moisture Conditioner",

                description:
                    "Conditioner for soft, hydrated-looking hair.",

                category:
                    "conditioner",

                hair:
                    [
                        "dry",
                        "frizzy",
                        "damaged"
                    ],

                hairLabel:
                    "Dry & Damaged",

                price:
                    "₹461",

                image:
                    "loreal-conditioner.jpg",

                nykaa:
                    "https://www.nykaa.com/search/result/?q=L%27Oreal%20Paris%20Hyaluron%20Moisture%20Conditioner"

            },


            {
                id: 4,

                name:
                    "Biolage Smoothproof 6-in-1 Hair Serum",

                description:
                    "Smoothening serum for frizzy hair.",

                category:
                    "serum",

                hair:
                    [
                        "frizzy",
                        "dry"
                    ],

                hairLabel:
                    "Frizzy Hair",

                price:
                    "₹327",

                image:
                    "biolage-serum.jpg",

                nykaa:
                    "https://www.nykaa.com/search/result/?q=Biolage%20Smoothproof%206-in-1%20Hair%20Serum"

            },


            {
                id: 5,

                name:
                    "Dove 10-in-1 Deep Repair Hair Mask",

                description:
                    "Deep repair treatment for dry and frizzy hair.",

                category:
                    "mask",

                hair:
                    [
                        "dry",
                        "damaged",
                        "frizzy"
                    ],

                hairLabel:
                    "Damaged Hair",

                price:
                    "₹487",

                image:
                    "dove-mask.jpg",

                nykaa:
                    "https://www.nykaa.com/search/result/?q=Dove%2010%20in%201%20Deep%20Repair%20Treatment%20Hair%20Mask"

            },


            {
                id: 6,

                name:
                    "Wishcare Hair Growth Serum",

                description:
                    "Hair serum with Redensyl and Rosemary.",

                category:
                    "treatment",

                hair:
                    [
                        "all",
                        "damaged"
                    ],

                hairLabel:
                    "All Hair Types",

                price:
                    "₹699",

                image:
                    "wishcare-serum.jpg",

                nykaa:
                    "https://www.nykaa.com/search/result/?q=Wishcare%20Hair%20Growth%20Serum"

            },


            {
                id: 7,

                name:
                    "Brillare Rosemary Hair Oil",

                description:
                    "Rosemary-based hair oil for regular hair care.",

                category:
                    "oil",

                hair:
                    [
                        "dry",
                        "damaged"
                    ],

                hairLabel:
                    "Dry Hair",

                price:
                    "₹716",

                image:
                    "brillare-oil.jpg",

                nykaa:
                    "https://www.nykaa.com/search/result/?q=Brillare%20Rosemary%20Hair%20Oil"

            },


            {
                id: 8,

                name:
                    "L'Oréal Professionnel Liss Unlimited Leave-In",

                description:
                    "Leave-in care for smoother, frizz-controlled hair.",

                category:
                    "leave-in",

                hair:
                    [
                        "frizzy",
                        "wavy",
                        "curly"
                    ],

                hairLabel:
                    "Frizzy Hair",

                price:
                    "₹1200",

                image:
                    "loreal-leavein.jpg",

                nykaa:
                    "https://www.nykaa.com/search/result/?q=L%27Oreal%20Professionnel%20Liss%20Unlimited%20Leave-In"

            },


            {
                id: 9,

                name:
                    "Streax Professional Hair Serum",

                description:
                    "Smoothening serum for dry and frizzy hair.",

                category:
                    "serum",

                hair:
                    [
                        "dry",
                        "frizzy"
                    ],

                hairLabel:
                    "Dry & Frizzy",

                price:
                    "₹356",

                image:
                    "streax-serum.jpg",

                nykaa:
                    "https://www.nykaa.com/search/result/?q=Streax%20Hair%20Serum"

            },


            {
                id: 10,

                name:
                    "Wella Professionals Fusion Hair Mask",

                description:
                    "Repair-focused hair mask for damaged hair.",

                category:
                    "mask",

                hair:
                    [
                        "damaged",
                        "dry"
                    ],

                hairLabel:
                    "Damaged Hair",

                price:
                    "₹1080",

                image:
                    "wella-mask.jpg",

                nykaa:
                    "https://www.nykaa.com/search/result/?q=Wella%20Professionals%20Fusion%20Hair%20Mask"

            },


            {
                id: 11,

                name:
                    "Schwarzkopf Professional Hair Masque",

                description:
                    "Deep conditioning care for dry hair.",

                category:
                    "treatment",

                hair:
                    [
                        "dry",
                        "damaged"
                    ],

                hairLabel:
                    "Dry Hair",

                price:
                    "₹623",

                image:
                    "schwarzkopf-mask.jpg",

                nykaa:
                    "https://www.nykaa.com/search/result/?q=Schwarzkopf%20Professional%20Hair%20Masque"

            },


            {
                id: 12,

                name:
                    "Olaplex No.7 Bonding Hair Oil",

                description:
                    "Hair oil for shine and frizz control.",

                category:
                    "oil",

                hair:
                    [
                        "dry",
                        "frizzy",
                        "damaged"
                    ],

                hairLabel:
                    "Dry & Frizzy",

                price:
                    "₹2950",

                image:
                    "olaplex-oil.jpg",

                nykaa:
                    "https://www.nykaa.com/search/result/?q=Olaplex%20No.%207%20Bonding%20Hair%20Oil"

            }

        ];


        /* =====================================================
           CREATE PRODUCT CARD
        ===================================================== */

        function createProductCard(product) {

            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "product-card";


            article.dataset.category =
                product.category;


            article.dataset.hair =
                product.hair.join(" ");


            article.dataset.search =
                (
                    product.name +
                    " " +
                    product.description +
                    " " +
                    product.category +
                    " " +
                    product.hair.join(" ")
                ).toLowerCase();


            article.innerHTML = `

                <div class="product-image-wrap">

                    <img
                        src="/static/images/hair-products/${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                    <button
                        type="button"
                        class="product-favorite"
                        aria-label="Add to favorites"
                    >
                        ♡
                    </button>

                </div>


                <div class="product-card-body">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.description}
                    </p>

                    <span class="product-hair-tag">
                        ${product.hairLabel}
                    </span>


                    <div class="product-price">
                        ${product.price}
                    </div>


                    <div class="product-actions">

                        <button
                            type="button"
                            class="product-fav-button"
                        >
                            ♡ Favorite
                        </button>


                        <a
                            href="${product.nykaa}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="product-buy-button"
                        >
                            Buy Now
                        </a>

                    </div>

                </div>

            `;


            const favoriteButton =
                article.querySelector(
                    ".product-favorite"
                );


            const favoriteSmall =
                article.querySelector(
                    ".product-fav-button"
                );


            function toggleFavorite() {

                favoriteButton.classList.toggle(
                    "active"
                );


                favoriteButton.textContent =
                    favoriteButton.classList.contains(
                        "active"
                    )
                        ? "♥"
                        : "♡";


                favoriteSmall.textContent =
                    favoriteButton.classList.contains(
                        "active"
                    )
                        ? "♥ Saved"
                        : "♡ Favorite";

            }


            favoriteButton.addEventListener(
                "click",
                toggleFavorite
            );


            favoriteSmall.addEventListener(
                "click",
                toggleFavorite
            );


            return article;

        }


        /* =====================================================
           DISPLAY PRODUCTS
        ===================================================== */

        function renderProducts(
            filteredProducts
        ) {

            productsGrid.innerHTML = "";

            recommendationGrid.innerHTML = "";


            if (
                filteredProducts.length === 0
            ) {

                noProducts.classList.add(
                    "show"
                );

                resultCount.textContent =
                    "No products found";

                return;

            }


            noProducts.classList.remove(
                "show"
            );


            resultCount.textContent =
                `Showing ${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"}`;


            filteredProducts.forEach(
                function (product) {

                    productsGrid.appendChild(
                        createProductCard(
                            product
                        )
                    );

                }
            );


            /* RECOMMENDATIONS */

            const recommendations =
                products
                    .filter(
                        function (product) {

                            return !filteredProducts.includes(
                                product
                            );

                        }
                    )
                    .slice(0, 4);


            recommendations.forEach(
                function (product) {

                    recommendationGrid.appendChild(
                        createProductCard(
                            product
                        )
                    );

                }
            );

        }


        /* =====================================================
           FILTER PRODUCTS
        ===================================================== */

        function filterProducts() {

            const searchValue =
                productSearch
                    ? productSearch.value
                        .trim()
                        .toLowerCase()
                    : "";


            const filtered =
                products.filter(
                    function (product) {


                        const categoryMatch =
                            selectedCategory ===
                            "all" ||
                            product.category ===
                            selectedCategory;


                        const hairMatch =
                            selectedHair ===
                            "all" ||
                            product.hair.includes(
                                "all"
                            ) ||
                            product.hair.includes(
                                selectedHair
                            );


                        const searchMatch =
                            searchValue === "" ||
                            (
                                product.name +
                                " " +
                                product.description +
                                " " +
                                product.category +
                                " " +
                                product.hair.join(" ")
                            )
                                .toLowerCase()
                                .includes(
                                    searchValue
                                );


                        return (
                            categoryMatch &&
                            hairMatch &&
                            searchMatch
                        );

                    }
                );


            renderProducts(
                filtered
            );

        }


        /* =====================================================
           CATEGORY BUTTONS
        ===================================================== */

        categoryButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        selectedCategory =
                            this.dataset.category ||
                            "all";


                        categoryButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        this.classList.add(
                            "active"
                        );


                        filterProducts();

                    }
                );

            }
        );


        /* =====================================================
           HAIR TYPE BUTTONS
        ===================================================== */

        hairTypeButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const value =
                            this.dataset.hair;


                        if (
                            selectedHair === value
                        ) {

                            selectedHair =
                                "all";

                            this.classList.remove(
                                "active"
                            );

                        } else {

                            selectedHair =
                                value;


                            hairTypeButtons.forEach(
                                function (item) {

                                    item.classList.remove(
                                        "active"
                                    );

                                }
                            );


                            this.classList.add(
                                "active"
                            );

                        }


                        filterProducts();

                    }
                );

            }
        );


        /* =====================================================
           SEARCH
        ===================================================== */

        if (productSearch) {

            productSearch.addEventListener(
                "input",
                filterProducts
            );

        }


        if (clearProductSearch) {

            clearProductSearch.addEventListener(
                "click",
                function () {

                    if (productSearch) {

                        productSearch.value =
                            "";

                        productSearch.focus();

                    }


                    filterProducts();

                }
            );

        }


        /* =====================================================
           RESET
        ===================================================== */

        function resetAllFilters() {

            selectedCategory =
                "all";

            selectedHair =
                "all";


            if (productSearch) {

                productSearch.value =
                    "";

            }


            categoryButtons.forEach(
                function (button) {

                    button.classList.toggle(
                        "active",
                        button.dataset.category ===
                        "all"
                    );

                }
            );


            hairTypeButtons.forEach(
                function (button) {

                    button.classList.remove(
                        "active"
                    );

                }
            );


            filterProducts();

        }


        if (resetProducts) {

            resetProducts.addEventListener(
                "click",
                resetAllFilters
            );

        }


        if (showAllCategories) {

            showAllCategories.addEventListener(
                "click",
                function () {

                    selectedCategory =
                        "all";


                    categoryButtons.forEach(
                        function (button) {

                            button.classList.toggle(
                                "active",
                                button.dataset.category ===
                                "all"
                            );

                        }
                    );


                    filterProducts();

                }
            );

        }


        if (showAllHairTypes) {

            showAllHairTypes.addEventListener(
                "click",
                function () {

                    selectedHair =
                        "all";


                    hairTypeButtons.forEach(
                        function (button) {

                            button.classList.remove(
                                "active"
                            );

                        }
                    );


                    filterProducts();

                }
            );

        }


        /* =====================================================
           BEST FOR YOU
        ===================================================== */

        const bestForCards =
            document.querySelectorAll(
                ".best-for-card"
            );


        bestForCards.forEach(
            function (card) {

                card.addEventListener(
                    "click",
                    function () {

                        const hair =
                            this.dataset.hair;


                        selectedHair =
                            hair;


                        hairTypeButtons.forEach(
                            function (button) {

                                button.classList.toggle(
                                    "active",
                                    button.dataset.hair ===
                                    hair
                                );

                            }
                        );


                        filterProducts();


                        const featuredSection =
                            productsGrid.closest(
                                ".product-section"
                            );


                        if (
                            featuredSection
                        ) {

                            featuredSection.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }

                    }
                );

            }
        );


        /* =====================================================
           BACK BUTTON
        ===================================================== */

        const pageBackButton =
            document.getElementById(
                "pageBackButton"
            );


        if (pageBackButton) {

            pageBackButton.addEventListener(
                "click",
                function () {

                    if (
                        window.history.length > 1
                    ) {

                        window.history.back();

                    } else {

                        window.location.href =
                            "{{ url_for('main.female') }}";

                    }

                }
            );

        }


        /* =====================================================
           INITIAL DISPLAY
        ===================================================== */

        renderProducts(
            products
        );

    }
);