document.addEventListener("DOMContentLoaded", function () {

    // =========================================================
    // ELEMENTS
    // =========================================================

    const cards = document.querySelectorAll(".style-card");
    const searchInput = document.getElementById("searchInput");
    const clearSearch = document.getElementById("clearSearch");

    const filterOptions = document.querySelectorAll(".filter-option");
    const colorFilters = document.querySelectorAll(".color-filter");

    const categoryButtons = document.querySelectorAll(".category");

    const resetButton = document.getElementById("resetButton");
    const noResultsReset = document.getElementById("noResultsReset");

    const noResults = document.getElementById("noResults");
    const braidCount = document.getElementById("braidCount");

    const themeBtn = document.getElementById("themeBtn");
    const headerFavorite = document.getElementById("headerFavorite");
    const mobileFavorite = document.getElementById("mobileFavorite");

    const menuBtn = document.getElementById("menuBtn");
    const filterSidebar = document.getElementById("filterSidebar");


    // =========================================================
    // FILTER STATE
    // =========================================================

    let filters = {
        length: "all",
        type: "all",
        face: "all",
        color: "all",
        category: "all"
    };


    // =========================================================
    // FAVORITES
    // =========================================================

    let favorites = JSON.parse(
        localStorage.getItem("styleMyHairFavorites") || "[]"
    );


    // =========================================================
    // APPLY FILTERS
    // =========================================================

    function applyFilters() {

        const searchText = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        let visibleCount = 0;

        cards.forEach(card => {

            const name = (card.dataset.name || "").toLowerCase();
            const length = (card.dataset.length || "").toLowerCase();
            const type = (card.dataset.type || "").toLowerCase();
            const face = (card.dataset.face || "").toLowerCase();
            const color = (card.dataset.color || "").toLowerCase();
            const category = (card.dataset.category || "").toLowerCase();
            const keywords = (card.dataset.keywords || "").toLowerCase();

            // Search
            const matchesSearch =
                searchText === "" ||
                name.includes(searchText) ||
                keywords.includes(searchText) ||
                length.includes(searchText) ||
                type.includes(searchText) ||
                category.includes(searchText);

            // Hair length
            const matchesLength =
                filters.length === "all" ||
                length.includes(filters.length);

            // Hair type
            const matchesType =
                filters.type === "all" ||
                type.includes(filters.type);

            // Face shape
            const matchesFace =
                filters.face === "all" ||
                face.includes(filters.face);

            // Hair color
            const matchesColor =
                filters.color === "all" ||
                color.includes(filters.color);

            // Category
            const matchesCategory =
                filters.category === "all" ||
                category === filters.category;

            const show =
                matchesSearch &&
                matchesLength &&
                matchesType &&
                matchesFace &&
                matchesColor &&
                matchesCategory;

            if (show) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });


        // =====================================================
        // RESULT COUNT
        // =====================================================

        if (braidCount) {
            braidCount.textContent =
                visibleCount + (visibleCount === 1 ? " style" : " styles");
        }


        // =====================================================
        // NO RESULTS
        // =====================================================

        if (noResults) {
            noResults.style.display =
                visibleCount === 0 ? "block" : "none";
        }
    }


    // =========================================================
    // FILTER BUTTONS
    // =========================================================

    filterOptions.forEach(button => {

        button.addEventListener("click", function () {

            const filterType = this.dataset.filter;
            const value = this.dataset.value;

            filters[filterType] = value;

            // Remove active from same filter group
            filterOptions.forEach(option => {

                if (option.dataset.filter === filterType) {
                    option.classList.remove("active");
                }

            });

            this.classList.add("active");

            applyFilters();
        });

    });


    // =========================================================
    // COLOR FILTER
    // =========================================================

    colorFilters.forEach(button => {

        button.addEventListener("click", function () {

            const color = this.dataset.color;

            filters.color = color;

            colorFilters.forEach(option => {
                option.classList.remove("active");
            });

            this.classList.add("active");

            applyFilters();
        });

    });


    // =========================================================
    // CATEGORY FILTER
    // =========================================================

    categoryButtons.forEach(button => {

        button.addEventListener("click", function () {

            const category = this.dataset.category;

            filters.category = category;

            categoryButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            applyFilters();
        });

    });


    // =========================================================
    // SEARCH
    // =========================================================

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            if (clearSearch) {
                clearSearch.style.display =
                    this.value.trim() !== "" ? "block" : "none";
            }

            applyFilters();
        });

    }


    // =========================================================
    // CLEAR SEARCH
    // =========================================================

    if (clearSearch) {

        clearSearch.addEventListener("click", function () {

            searchInput.value = "";

            clearSearch.style.display = "none";

            searchInput.focus();

            applyFilters();
        });

    }


    // =========================================================
    // RESET FILTERS
    // =========================================================

    function resetFilters() {

        filters = {
            length: "all",
            type: "all",
            face: "all",
            color: "all",
            category: "all"
        };


        // Reset filter buttons
        filterOptions.forEach(button => {

            if (button.dataset.value === "all") {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }

        });


        // Reset colors
        colorFilters.forEach(button => {

            if (button.dataset.color === "all") {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }

        });


        // Reset category
        categoryButtons.forEach(button => {

            if (button.dataset.category === "all") {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }

        });


        // Clear search
        if (searchInput) {
            searchInput.value = "";
        }

        if (clearSearch) {
            clearSearch.style.display = "none";
        }


        applyFilters();
    }


    if (resetButton) {
        resetButton.addEventListener("click", resetFilters);
    }

    if (noResultsReset) {
        noResultsReset.addEventListener("click", resetFilters);
    }


    // =========================================================
    // FAVORITE BUTTONS
    // =========================================================

    const favoriteButtons = document.querySelectorAll(".favorite");

    function updateFavoriteButtons() {

        favoriteButtons.forEach(button => {

            const card = button.closest(".style-card");

            if (!card) return;

            const styleId = card.dataset.name;

            if (favorites.includes(styleId)) {

                button.classList.add("liked");
                button.textContent = "♥";

            } else {

                button.classList.remove("liked");
                button.textContent = "♡";

            }

        });

    }


    favoriteButtons.forEach(button => {

        button.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const card = this.closest(".style-card");

            if (!card) return;

            const styleId = card.dataset.name;

            if (favorites.includes(styleId)) {

                favorites = favorites.filter(
                    item => item !== styleId
                );

            } else {

                favorites.push(styleId);

            }

            localStorage.setItem(
                "styleMyHairFavorites",
                JSON.stringify(favorites)
            );

            updateFavoriteButtons();

        });

    });


    // Header favorite
    if (headerFavorite) {

        headerFavorite.addEventListener("click", function () {

            const likedCards = Array.from(cards).filter(card =>
                favorites.includes(card.dataset.name)
            );

            if (likedCards.length === 0) {

                alert("You have no favorite hairstyles yet.");

                return;
            }

            cards.forEach(card => {
                card.style.display = "none";
            });

            likedCards.forEach(card => {
                card.style.display = "";
            });

            if (braidCount) {
                braidCount.textContent =
                    likedCards.length +
                    (likedCards.length === 1 ? " favorite" : " favorites");
            }

            if (noResults) {
                noResults.style.display = "none";
            }

        });

    }


    // Mobile favorite
    if (mobileFavorite) {

        mobileFavorite.addEventListener("click", function () {

            if (headerFavorite) {
                headerFavorite.click();
            }

        });

    }


    // =========================================================
    // THEME BUTTON
    // =========================================================

    if (themeBtn) {

        themeBtn.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            const darkMode =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "styleMyHairDarkMode",
                darkMode ? "true" : "false"
            );

        });

    }


    // Load saved theme
    const savedTheme =
        localStorage.getItem("styleMyHairDarkMode");

    if (savedTheme === "true") {
        document.body.classList.add("dark-mode");
    }


    // =========================================================
    // TRY ON BUTTON
    // =========================================================

    const tryButtons = document.querySelectorAll(".try-button");

    tryButtons.forEach(button => {

        button.addEventListener("click", function () {

            const style = this.dataset.style;

            if (!style) {
                window.location.href = "/female/try-on";
                return;
            }

            window.location.href =
                "/female/try-on?style=" +
                encodeURIComponent(style);

        });

    });


    // =========================================================
    // CARD CLICK
    // =========================================================

    cards.forEach(card => {

        card.addEventListener("click", function (event) {

            // Don't trigger when clicking buttons
            if (
                event.target.closest(".favorite") ||
                event.target.closest(".try-button")
            ) {
                return;
            }

            const style = this.dataset.name;

            console.log("Selected hairstyle:", style);

        });

    });


    // =========================================================
    // MOBILE FILTER MENU
    // =========================================================

    if (menuBtn && filterSidebar) {

        menuBtn.addEventListener("click", function () {

            filterSidebar.classList.toggle("open");

        });

    }


    // Close mobile sidebar when selecting a filter
    filterOptions.forEach(button => {

        button.addEventListener("click", function () {

            if (window.innerWidth <= 800) {
                filterSidebar.classList.remove("open");
            }

        });

    });

    colorFilters.forEach(button => {

        button.addEventListener("click", function () {

            if (window.innerWidth <= 800) {
                filterSidebar.classList.remove("open");
            }

        });

    });


    // =========================================================
    // PROFILE BUTTON
    // =========================================================

    const profileBtn = document.getElementById("profileBtn");

    if (profileBtn) {

        profileBtn.addEventListener("click", function () {

            alert("Profile feature coming soon.");

        });

    }


    // =========================================================
    // INITIALIZE
    // =========================================================

    updateFavoriteButtons();
    applyFilters();

});