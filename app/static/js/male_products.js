document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const productsGrid = document.getElementById("productsGrid");
    const recommendationGrid = document.getElementById("recommendationGrid");
    const noProducts = document.getElementById("noProducts");

    const categoryButtons = document.querySelectorAll(".category-btn");
    const hairTypeButtons = document.querySelectorAll(".hair-type-btn");
    const concernButtons = document.querySelectorAll(".concern-btn");

    const searchInput = document.getElementById("productSearch");
    const resetBtn = document.getElementById("resetFilters");
    const seeAllBtn = document.getElementById("seeAllProducts");

    const themeButtons = document.querySelectorAll(".theme-btn");
    const darkModeToggle = document.getElementById("darkModeToggle");

    const mobileMenu = document.getElementById("mobileMenu");
    const maleSidebar = document.getElementById("maleSidebar");


    /* =========================
       FILTER STATE
    ========================= */

    let selectedCategory = "all";
    let selectedHairType = "all";
    let selectedConcern = "all";
    let searchTerm = "";


    /* =========================
       THEME
    ========================= */

    themeButtons.forEach(button => {
        button.addEventListener("click", () => {

            const theme = button.dataset.theme;

            document.documentElement.setAttribute("data-theme", theme);

            localStorage.setItem("maleProductsTheme", theme);

            themeButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");
        });
    });

    const savedTheme = localStorage.getItem("maleProductsTheme");

    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);

        themeButtons.forEach(button => {
            if (button.dataset.theme === savedTheme) {
                button.classList.add("active");
            }
        });
    }


    /* =========================
       DARK MODE
    ========================= */

    if (darkModeToggle) {

        darkModeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            localStorage.setItem(
                "maleProductsDarkMode",
                document.body.classList.contains("dark-mode")
            );

        });

        const savedDarkMode =
            localStorage.getItem("maleProductsDarkMode") === "true";

        if (savedDarkMode) {
            document.body.classList.add("dark-mode");
        }
    }


    /* =========================
       MOBILE SIDEBAR
    ========================= */

    if (mobileMenu && maleSidebar) {

        mobileMenu.addEventListener("click", () => {

            maleSidebar.classList.toggle("open");

        });
    }


    /* =========================
       PRODUCTS
    ========================= */

    const products = [

        {
            id: 1,
            name: "Head & Shoulders Anti-Dandruff Shampoo",
            brand: "Head & Shoulders",
            category: "shampoo",
            hairType: ["straight", "wavy", "curly", "oily"],
            concerns: ["dandruff", "oily", "hairfall"],
            price: "₹499",
            rating: 4.4,
            image: "/static/images/head-and-shoulders-shampoo.jpg",
            buy: "https://www.amazon.in/s?k=Head+%26+Shoulders+Anti+Dandruff+Shampoo"
        },

        {
            id: 2,
            name: "L'Oréal Paris Total Repair 5 Conditioner",
            brand: "L'Oréal Paris",
            category: "conditioner",
            hairType: ["straight", "wavy", "dry", "damaged"],
            concerns: ["dry", "damaged", "weak"],
            price: "₹399",
            rating: 4.3,
            image: "/static/images/loreal-conditioner.jpg",
            buy: "https://www.amazon.in/s?k=L%27Oreal+Paris+Total+Repair+5+Conditioner"
        },

        {
            id: 3,
            name: "The Man Company Hair Serum",
            brand: "The Man Company",
            category: "serum",
            hairType: ["straight", "wavy", "curly"],
            concerns: ["frizzy", "damaged", "dry"],
            price: "₹599",
            rating: 4.2,
            image: "/static/images/man-company-serum.jpg",
            buy: "https://www.amazon.in/s?k=The+Man+Company+Hair+Serum"
        },

        {
            id: 4,
            name: "Beardo Hair Wax",
            brand: "Beardo",
            category: "styling",
            hairType: ["straight", "wavy", "thick"],
            concerns: ["frizzy", "damaged"],
            price: "₹349",
            rating: 4.1,
            image: "/static/images/beardo-hair-wax.jpg",
            buy: "https://www.amazon.in/s?k=Beardo+Hair+Wax"
        },

        {
            id: 5,
            name: "WOW Rosemary Hair Oil",
            brand: "WOW Skin Science",
            category: "oil",
            hairType: ["straight", "wavy", "curly", "dry"],
            concerns: ["hairfall", "dry", "growth", "weak"],
            price: "₹549",
            rating: 4.2,
            image: "/static/images/wow-rosemary-oil.jpg",
            buy: "https://www.amazon.in/s?k=WOW+Rosemary+Hair+Oil"
        },

        {
            id: 6,
            name: "L'Oréal Men Expert Hair Mask",
            brand: "L'Oréal Men Expert",
            category: "mask",
            hairType: ["straight", "wavy", "curly", "damaged"],
            concerns: ["dry", "damaged", "weak"],
            price: "₹699",
            rating: 4.3,
            image: "/static/images/loreal-men-hair-mask.jpg",
            buy: "https://www.amazon.in/s?k=L%27Oreal+Men+Expert+Hair+Mask"
        },

        {
            id: 7,
            name: "Ustraa Hair Growth Veda Hair Serum",
            brand: "Ustraa",
            category: "treatment",
            hairType: ["straight", "wavy", "curly"],
            concerns: ["hairfall", "growth", "weak"],
            price: "₹599",
            rating: 4.1,
            image: "/static/images/ustraa-hair-serum.jpg",
            buy: "https://www.amazon.in/s?k=Ustraa+Hair+Growth+Serum"
        },

        {
            id: 8,
            name: "Mamaearth Anti-Dandruff Shampoo",
            brand: "Mamaearth",
            category: "shampoo",
            hairType: ["straight", "wavy", "curly", "oily"],
            concerns: ["dandruff", "oily", "hairfall"],
            price: "₹449",
            rating: 4.2,
            image: "/static/images/mamaearth-shampoo.jpg",
            buy: "https://www.amazon.in/s?k=Mamaearth+Anti+Dandruff+Shampoo"
        },

        {
            id: 9,
            name: "Beardo Hair Serum",
            brand: "Beardo",
            category: "serum",
            hairType: ["straight", "wavy", "curly"],
            concerns: ["frizzy", "dry", "damaged"],
            price: "₹499",
            rating: 4.1,
            image: "/static/images/beardo-hair-serum.jpg",
            buy: "https://www.amazon.in/s?k=Beardo+Hair+Serum"
        },

        {
            id: 10,
            name: "The Man Company Hair Clay",
            brand: "The Man Company",
            category: "styling",
            hairType: ["straight", "wavy", "thick"],
            concerns: ["frizzy", "damaged"],
            price: "₹399",
            rating: 4.2,
            image: "/static/images/man-company-hair-clay.jpg",
            buy: "https://www.amazon.in/s?k=The+Man+Company+Hair+Clay"
        },

        {
            id: 11,
            name: "Mamaearth Rosemary Hair Tonic",
            brand: "Mamaearth",
            category: "leave-in",
            hairType: ["straight", "wavy", "curly", "dry"],
            concerns: ["hairfall", "growth", "weak"],
            price: "₹599",
            rating: 4.2,
            image: "/static/images/mamaearth-rosemary-tonic.jpg",
            buy: "https://www.amazon.in/s?k=Mamaearth+Rosemary+Hair+Tonic"
        },

        {
            id: 12,
            name: "Biolage Smoothproof Serum",
            brand: "Biolage",
            category: "serum",
            hairType: ["straight", "wavy", "curly", "frizzy"],
            concerns: ["frizzy", "dry", "damaged"],
            price: "₹650",
            rating: 4.4,
            image: "/static/images/biolage-smoothproof-serum.jpg",
            buy: "https://www.amazon.in/s?k=Biolage+Smoothproof+Serum"
        }

    ];


    /* =========================
       CREATE PRODUCT CARD
    ========================= */

    function createProductCard(product) {

        return `
            <div class="product-card">

                <div class="product-image">

                    <img 
                        src="${product.image}" 
                        alt="${product.name}"
                        onerror="this.src='/static/images/default-product.jpg'"
                    >

                    <button 
                        class="favorite-btn"
                        data-product="${product.id}"
                        title="Add to favorites"
                    >
                        ♡
                    </button>

                </div>

                <div class="product-info">

                    <span class="product-brand">
                        ${product.brand}
                    </span>

                    <h3>
                        ${product.name}
                    </h3>

                    <div class="product-rating">
                        ⭐ ${product.rating}
                    </div>

                    <div class="product-price">
                        ${product.price}
                    </div>

                    <a 
                        href="${product.buy}" 
                        target="_blank"
                        rel="noopener noreferrer"
                        class="buy-btn"
                    >
                        Buy Now
                    </a>

                </div>

            </div>
        `;
    }


    /* =========================
       RENDER PRODUCTS
    ========================= */

    function renderProducts() {

        let filteredProducts = products.filter(product => {

            const categoryMatch =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            const hairTypeMatch =
                selectedHairType === "all" ||
                product.hairType.includes(selectedHairType);

            const concernMatch =
                selectedConcern === "all" ||
                product.concerns.includes(selectedConcern);

            const searchMatch =
                searchTerm === "" ||
                product.name.toLowerCase().includes(searchTerm) ||
                product.brand.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm);

            return (
                categoryMatch &&
                hairTypeMatch &&
                concernMatch &&
                searchMatch
            );

        });


        productsGrid.innerHTML = "";


        if (filteredProducts.length === 0) {

            noProducts.style.display = "block";

        } else {

            noProducts.style.display = "none";

            filteredProducts.forEach(product => {

                productsGrid.innerHTML +=
                    createProductCard(product);

            });

        }

    }


    /* =========================
       CATEGORY FILTER
    ========================= */

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            selectedCategory = button.dataset.category;

            categoryButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            renderProducts();

        });

    });


    /* =========================
       HAIR TYPE FILTER
    ========================= */

    hairTypeButtons.forEach(button => {

        button.addEventListener("click", () => {

            selectedHairType = button.dataset.hair;

            hairTypeButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            renderProducts();

        });

    });


    /* =========================
       CONCERN FILTER
    ========================= */

    concernButtons.forEach(button => {

        button.addEventListener("click", () => {

            selectedConcern = button.dataset.concern;

            concernButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            renderProducts();

        });

    });


    /* =========================
       SEARCH
    ========================= */

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            searchTerm =
                searchInput.value
                    .toLowerCase()
                    .trim();

            renderProducts();

        });

    }


    /* =========================
       RESET FILTERS
    ========================= */

    if (resetBtn) {

        resetBtn.addEventListener("click", () => {

            selectedCategory = "all";
            selectedHairType = "all";
            selectedConcern = "all";
            searchTerm = "";

            if (searchInput) {
                searchInput.value = "";
            }

            categoryButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            hairTypeButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            concernButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            const allCategory =
                document.querySelector(
                    '.category-btn[data-category="all"]'
                );

            const allHair =
                document.querySelector(
                    '.hair-type-btn[data-hair="all"]'
                );

            const allConcern =
                document.querySelector(
                    '.concern-btn[data-concern="all"]'
                );

            if (allCategory) {
                allCategory.classList.add("active");
            }

            if (allHair) {
                allHair.classList.add("active");
            }

            if (allConcern) {
                allConcern.classList.add("active");
            }

            renderProducts();

        });

    }


    /* =========================
       SEE ALL PRODUCTS
    ========================= */

    if (seeAllBtn) {

        seeAllBtn.addEventListener("click", () => {

            selectedCategory = "all";
            selectedHairType = "all";
            selectedConcern = "all";
            searchTerm = "";

            if (searchInput) {
                searchInput.value = "";
            }

            categoryButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            hairTypeButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            concernButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            const allCategory =
                document.querySelector(
                    '.category-btn[data-category="all"]'
                );

            const allHair =
                document.querySelector(
                    '.hair-type-btn[data-hair="all"]'
                );

            const allConcern =
                document.querySelector(
                    '.concern-btn[data-concern="all"]'
                );

            if (allCategory) {
                allCategory.classList.add("active");
            }

            if (allHair) {
                allHair.classList.add("active");
            }

            if (allConcern) {
                allConcern.classList.add("active");
            }

            renderProducts();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================
       INITIAL RENDER
    ========================= */

    renderProducts();

});