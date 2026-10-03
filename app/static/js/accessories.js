document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const html = document.documentElement;

    const searchInput =
        document.getElementById("accessorySearch");

    const globalSearch =
        document.getElementById("globalSearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const featuredGrid =
        document.getElementById("featuredGrid");

    const noResults =
        document.getElementById("noResults");

    const categoryButtons =
        Array.from(
            document.querySelectorAll(".category-card")
        );

    const hairButtons =
        Array.from(
            document.querySelectorAll(".hair-match")
        );

    const occasionButtons =
        Array.from(
            document.querySelectorAll(
                ".occasion-buttons button"
            )
        );

    const colorButtons =
        Array.from(
            document.querySelectorAll(
                ".color-options button"
            )
        );

    const themeButtons =
        document.querySelectorAll(
            ".header-colors button"
        );

    const darkMode =
        document.getElementById("darkMode");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("overlay");

    const profileButton =
        document.getElementById("profileButton");


    /* =====================================================
       ACTIVE FILTERS
    ===================================================== */

    let activeType = "all";
    let activeHair = "all";
    let activeOccasion = "all";
    let activeColor = "all";


    /* =====================================================
       MEESHO LINKS
    ===================================================== */

    const buyLinks = {

        bows:
            "https://www.meesho.com/elegent-hair-bows-ties-for-girls-women-french-bow-hair-clip-5pcs-hair-clip-multicolor/p/4ccm2c",

        clips:
            "https://www.meesho.com/queen-stlye-3-pcs-large-pearl-hair-claw-clip-new-elegant-pearl-hair-cluture/p/8ww5ve",

        pins:
            "https://www.meesho.com/royal-fashion-fancy-bun-hair-pin-use-for-girls-women-pack-of-12-white-color-metal-juttu-clipu-jada-clipu-juttu-kliplu-jada-klipu-juttu-pinu-jada-pinu-jada-billa-muti-kilippukal-muti-pinkal-mudi-clippukalum-mudi-pinnukalum-hair-klipgalu-mattu-hair-pingalu-hair-klipgalu-mattu-hair-pingalu-ideal-for-women-girls/p/41kimo",

        scrunchies:
            "https://www.meesho.com/premium-satin-scrunchies-pack-of-6-rubber-band-black/p/7xdq92",

        headbands:
            "https://www.meesho.com/s-and-p-multifunctional-activities-polyester-spandex-elastic-non-slip-unisex-breathable-headband/p/5tsagd",

        tiaras:
            "https://www.meesho.com/unique-creations-birthday-girl-pink-sash-with-beautiful-rhinstone-tiara-crown-set-with-safety-pin-for-womens-girls-heart-design/p/33zwwg",

        bands:
            "https://www.meesho.com/satin-hairbands-for-women-girls-pack-of-3-soft-stretchable-headbands-gold-maroon-nude-beige/p/8vedns",

        jewellery:
            "https://www.meesho.com/artificial-flower-for-hair-veni-gajra-brooch-bridal-accessories-set/p/801z1i"

    };


    /* =====================================================
       32 NEW ACCESSORIES
    ===================================================== */

    const extraAccessories = [

        /* ================= BOWS ================= */

        {
            name: "Velvet Bow",
            type: "bows",
            image: "bows-1.jpg",
            hair: "long wavy",
            occasion: "party festival",
            color: "red"
        },

        {
            name: "Satin Bow",
            type: "bows",
            image: "bows-2.jpg",
            hair: "long straight",
            occasion: "casual college",
            color: "pink"
        },

        {
            name: "Mini Bow",
            type: "bows",
            image: "bows-3.jpg",
            hair: "short curly",
            occasion: "casual college",
            color: "blue"
        },

        {
            name: "Pearl Bow",
            type: "bows",
            image: "bows-4.jpg",
            hair: "bun wedding",
            occasion: "wedding",
            color: "white pearl"
        },


        /* ================= HAIR CLIPS ================= */

        {
            name: "Crystal Hair Clip",
            type: "clips",
            image: "clips-1.jpg",
            hair: "long wavy",
            occasion: "wedding party",
            color: "silver"
        },

        {
            name: "Butterfly Hair Clip",
            type: "clips",
            image: "clips-2.jpg",
            hair: "short curly",
            occasion: "casual college",
            color: "pink blue"
        },

        {
            name: "Gold Claw Clip",
            type: "clips",
            image: "clips-3.jpg",
            hair: "long straight bun",
            occasion: "office party",
            color: "gold"
        },

        {
            name: "Floral Hair Clip",
            type: "clips",
            image: "clips-4.jpg",
            hair: "wavy braids",
            occasion: "festival wedding",
            color: "pink white"
        },


        /* ================= HAIR PINS ================= */

        {
            name: "Rhinestone Hair Pins",
            type: "pins",
            image: "pins-1.jpg",
            hair: "bun wedding",
            occasion: "wedding party",
            color: "silver"
        },

        {
            name: "Star Hair Pins",
            type: "pins",
            image: "pins-2.jpg",
            hair: "long straight",
            occasion: "party festival",
            color: "gold"
        },

        {
            name: "Floral Hair Pins",
            type: "pins",
            image: "pins-3.jpg",
            hair: "braids wavy",
            occasion: "wedding festival",
            color: "pink"
        },

        {
            name: "Minimal Hair Pins",
            type: "pins",
            image: "pins-4.jpg",
            hair: "short straight",
            occasion: "office college",
            color: "black silver"
        },


        /* ================= SCRUNCHIES ================= */

        {
            name: "Silk Scrunchie",
            type: "scrunchies",
            image: "scrunchies-1.jpg",
            hair: "long curly",
            occasion: "casual party",
            color: "pink"
        },

        {
            name: "Velvet Scrunchie",
            type: "scrunchies",
            image: "scrunchies-2.jpg",
            hair: "long wavy",
            occasion: "party festival",
            color: "red"
        },

        {
            name: "Blue Satin Scrunchie",
            type: "scrunchies",
            image: "scrunchies-3.jpg",
            hair: "short straight",
            occasion: "college casual",
            color: "blue"
        },

        {
            name: "Brown Scrunchie",
            type: "scrunchies",
            image: "scrunchies-4.jpg",
            hair: "bun braids",
            occasion: "office casual",
            color: "brown"
        },


        /* ================= HEADBANDS ================= */

        {
            name: "Pearl Headband",
            type: "headbands",
            image: "headbands-1.jpg",
            hair: "long wavy",
            occasion: "wedding party",
            color: "white pearl"
        },

        {
            name: "Knot Headband",
            type: "headbands",
            image: "headbands-2.jpg",
            hair: "short straight",
            occasion: "office college",
            color: "black"
        },

        {
            name: "Floral Pink Headband",
            type: "headbands",
            image: "headbands-3.jpg",
            hair: "long curly",
            occasion: "festival wedding",
            color: "pink"
        },

        {
            name: "Padded Headband",
            type: "headbands",
            image: "headbands-4.jpg",
            hair: "short wavy",
            occasion: "casual party",
            color: "blue"
        },


        /* ================= TIARAS ================= */

        {
            name: "Crystal Tiara",
            type: "tiaras",
            image: "tiaras-1.jpg",
            hair: "bun wedding",
            occasion: "wedding",
            color: "silver pearl"
        },

        {
            name: "Gold Tiara",
            type: "tiaras",
            image: "tiaras-2.jpg",
            hair: "long wavy",
            occasion: "wedding party",
            color: "gold"
        },

        {
            name: "Floral Tiara",
            type: "tiaras",
            image: "tiaras-3.jpg",
            hair: "braids long",
            occasion: "festival wedding",
            color: "pink white"
        },

        {
            name: "Mini Tiara",
            type: "tiaras",
            image: "tiaras-4.jpg",
            hair: "short curly",
            occasion: "party wedding",
            color: "silver"
        },


        /* ================= HAIR BANDS ================= */

        {
            name: "Black Hair Band",
            type: "bands",
            image: "bands-1.jpg",
            hair: "short straight",
            occasion: "office college",
            color: "black"
        },

        {
            name: "White Hair Band",
            type: "bands",
            image: "bands-2.jpg",
            hair: "long wavy",
            occasion: "casual office",
            color: "white"
        },

        {
            name: "Red Hair Band",
            type: "bands",
            image: "bands-3.jpg",
            hair: "curly bun",
            occasion: "party festival",
            color: "red"
        },

        {
            name: "Blue Hair Band",
            type: "bands",
            image: "bands-4.jpg",
            hair: "short braids",
            occasion: "college casual",
            color: "blue"
        },


        /* ================= HAIR JEWELLERY ================= */

        {
            name: "Gold Hair Chain",
            type: "jewellery",
            image: "jewellery-1.jpg",
            hair: "long bun",
            occasion: "wedding",
            color: "gold"
        },

        {
            name: "Pearl Hair Chain",
            type: "jewellery",
            image: "jewellery-2.jpg",
            hair: "long wavy",
            occasion: "wedding festival",
            color: "pearl white"
        },

        {
            name: "Floral Hair Jewellery",
            type: "jewellery",
            image: "jewellery-3.jpg",
            hair: "braids bun",
            occasion: "wedding festival",
            color: "pink"
        },

        {
            name: "Silver Hair Jewellery",
            type: "jewellery",
            image: "jewellery-4.jpg",
            hair: "straight wavy",
            occasion: "party wedding",
            color: "silver"
        }

    ];


    /* =====================================================
       CREATE ACCESSORY CARD
    ===================================================== */

    function createAccessoryCard(item) {

        const article =
            document.createElement("article");

        article.className =
            "accessory-card";

        article.dataset.name =
            item.name.toLowerCase();

        article.dataset.type =
            item.type;

        article.dataset.hair =
            item.hair;

        article.dataset.occasion =
            item.occasion;

        article.dataset.color =
            item.color;


        /* -------------------------------------------------
           BUY LINK
           EACH CATEGORY OPENS ITS OWN MEESHO PRODUCT
        ------------------------------------------------- */

        const buyLink =
            buyLinks[item.type] ||
            "#";

        const buyTarget =
            buyLinks[item.type]
                ? 'target="_blank" rel="noopener noreferrer"'
                : "";


        article.innerHTML = `

            <div class="card-image">

                <img
                    src="/static/images/${item.image}"
                    alt="${item.name}"
                >

                <button
                    class="card-favorite"
                    type="button"
                    aria-label="Add ${item.name} to favorites"
                >
                    ♡
                </button>

            </div>


            <div class="card-body">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Stylish ${item.type} for your hairstyle.
                </p>

                <small>
                    ${item.hair} &nbsp;•&nbsp; ${item.occasion}
                </small>

                <div class="card-buttons">

                    <button
                        type="button"
                        class="favorite-small"
                    >
                        ♡ Favorite
                    </button>

                    <a
                        href="${buyLink}"
                        ${buyTarget}
                        class="try-small"
                    >
                        Buy Now
                    </a>

                </div>

            </div>

        `;

        return article;
    }


    /* =====================================================
       ADD 32 NEW CARDS
    ===================================================== */

    if (featuredGrid) {

        extraAccessories.forEach(function (item) {

            const card =
                createAccessoryCard(item);

            card.dataset.generated =
                "true";

            featuredGrid.appendChild(card);

        });

    }


    /* =====================================================
       UPDATE ORIGINAL HTML BUY NOW BUTTONS
    ===================================================== */

    if (featuredGrid) {

        const originalCards =
            featuredGrid.querySelectorAll(
                ".accessory-card:not([data-generated='true'])"
            );

        originalCards.forEach(function (card) {

            const type =
                card.dataset.type || "";

            let buyType = type;

            if (type.includes("headbands")) {
                buyType = "headbands";
            } else if (type.includes("jewellery")) {
                buyType = "jewellery";
            } else if (type.includes("pins")) {
                buyType = "pins";
            } else if (type.includes("scrunchies")) {
                buyType = "scrunchies";
            } else if (type.includes("clips")) {
                buyType = "clips";
            } else if (type.includes("bows")) {
                buyType = "bows";
            } else if (type.includes("tiaras")) {
                buyType = "tiaras";
            } else if (type.includes("bands")) {
                buyType = "bands";
            }

            const link =
                buyLinks[buyType];

            const buyButton =
                card.querySelector(".try-small");

            if (buyButton && link) {

                buyButton.href =
                    link;

                buyButton.target =
                    "_blank";

                buyButton.rel =
                    "noopener noreferrer";

            }

        });

    }


    /* =====================================================
       CREATE / FIND YOU MAY ALSO LIKE
    ===================================================== */

    let suggestionGrid =
        document.getElementById(
            "suggestionGrid"
        );


    if (!suggestionGrid && featuredGrid) {

        const featuredSection =
            featuredGrid.closest(".section");


        if (featuredSection) {

            const suggestionSection =
                document.createElement("section");

            suggestionSection.className =
                "section";

            suggestionSection.innerHTML = `

                <div class="section-title">

                    <h2>
                        ♡ You May Also Like
                    </h2>

                </div>

                <div
                    class="featured-grid"
                    id="suggestionGrid"
                ></div>

            `;

            featuredSection.parentNode.insertBefore(
                suggestionSection,
                featuredSection.nextSibling
            );

            suggestionGrid =
                document.getElementById(
                    "suggestionGrid"
                );

        }

    }


    /* =====================================================
       GET ALL ACCESSORY CARDS
    ===================================================== */

    function getCards() {

        if (!featuredGrid) {
            return [];
        }

        return Array.from(
            featuredGrid.querySelectorAll(
                ".accessory-card"
            )
        );

    }


    /* =====================================================
       HELPER
       Check if a data attribute contains a value
    ===================================================== */

    function containsValue(value, selected) {

        if (!selected || selected === "all") {
            return true;
        }

        if (!value) {
            return false;
        }

        const values =
            value
                .toLowerCase()
                .split(/\s+/)
                .filter(Boolean);

        return values.includes(
            selected.toLowerCase()
        );
    }


    /* =====================================================
       THEME
    ===================================================== */

    themeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const theme =
                    button.dataset.theme;

                html.dataset.theme =
                    theme;

                localStorage.setItem(
                    "stylemyhair-theme",
                    theme
                );

            }
        );

    });


    const savedTheme =
        localStorage.getItem(
            "stylemyhair-theme"
        );

    if (savedTheme) {

        html.dataset.theme =
            savedTheme;

    }


    /* =====================================================
       DARK MODE
    ===================================================== */

    if (darkMode) {

        darkMode.addEventListener(
            "click",
            function () {

                if (
                    html.dataset.theme ===
                    "midnight"
                ) {

                    html.dataset.theme =
                        "rose";

                    localStorage.setItem(
                        "stylemyhair-theme",
                        "rose"
                    );

                    darkMode.textContent =
                        "☼";

                } else {

                    html.dataset.theme =
                        "midnight";

                    localStorage.setItem(
                        "stylemyhair-theme",
                        "midnight"
                    );

                    darkMode.textContent =
                        "☾";

                }

            }
        );

    }


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    if (
        mobileMenu &&
        sidebar &&
        overlay
    ) {

        mobileMenu.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle(
                    "open"
                );

                overlay.classList.toggle(
                    "show"
                );

            }
        );


        overlay.addEventListener(
            "click",
            function () {

                sidebar.classList.remove(
                    "open"
                );

                overlay.classList.remove(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       UPDATE YOU MAY ALSO LIKE
    ===================================================== */

    function updateSuggestions(
        visibleCards
    ) {

        if (!suggestionGrid) {
            return;
        }


        suggestionGrid.innerHTML = "";


        const visibleTypes =
            new Set(
                visibleCards.map(
                    function (card) {
                        return card.dataset.type;
                    }
                )
            );


        let suggestions =
            extraAccessories.filter(
                function (item) {

                    return !visibleTypes.has(
                        item.type
                    );

                }
            );


        if (
            suggestions.length === 0
        ) {

            suggestions =
                extraAccessories.slice(
                    0,
                    4
                );

        }


        suggestions
            .slice(0, 4)
            .forEach(function (item) {

                const card =
                    createAccessoryCard(
                        item
                    );

                card.dataset.suggestion =
                    "true";

                suggestionGrid.appendChild(
                    card
                );

            });


        attachFavoriteButtons(
            suggestionGrid
        );

    }


    /* =====================================================
       FILTER CARDS
    ===================================================== */

    function filterCards() {

        const cards =
            getCards();


        const search =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        let visibleCards = [];


        cards.forEach(function (card) {

            const name =
                (
                    card.dataset.name ||
                    ""
                ).toLowerCase();

            const type =
                (
                    card.dataset.type ||
                    ""
                ).toLowerCase();

            const hair =
                (
                    card.dataset.hair ||
                    ""
                ).toLowerCase();

            const occasion =
                (
                    card.dataset.occasion ||
                    ""
                ).toLowerCase();

            const color =
                (
                    card.dataset.color ||
                    ""
                ).toLowerCase();


            const searchableText =
                [
                    name,
                    type,
                    hair,
                    occasion,
                    color
                ].join(" ");


            const matchesSearch =
                !search ||
                searchableText.includes(
                    search
                );


            const matchesType =
                containsValue(
                    type,
                    activeType
                );


            const matchesHair =
                activeHair === "all" ||
                hair.includes("all") ||
                containsValue(
                    hair,
                    activeHair
                );


            const matchesOccasion =
                containsValue(
                    occasion,
                    activeOccasion
                );


            const matchesColor =
                containsValue(
                    color,
                    activeColor
                );


            const show =
                matchesSearch &&
                matchesType &&
                matchesHair &&
                matchesOccasion &&
                matchesColor;


            if (show) {

                card.style.display =
                    "";

                visibleCards.push(
                    card
                );

            } else {

                card.style.display =
                    "none";

            }

        });


        if (noResults) {

            noResults.classList.toggle(
                "show",
                visibleCards.length === 0
            );

        }


        updateSuggestions(
            visibleCards
        );

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterCards
        );

    }


    if (
        globalSearch &&
        searchInput
    ) {

        globalSearch.addEventListener(
            "input",
            function () {

                searchInput.value =
                    globalSearch.value;

                filterCards();

            }
        );

    }


    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            function () {

                if (searchInput) {
                    searchInput.value = "";
                }

                if (globalSearch) {
                    globalSearch.value = "";
                }

                filterCards();

                if (searchInput) {
                    searchInput.focus();
                }

            }
        );

    }


    /* =====================================================
       CATEGORY FILTER
    ===================================================== */

    categoryButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedType =
                    button.dataset.type;


                if (
                    activeType ===
                    selectedType
                ) {

                    activeType =
                        "all";

                    button.classList.remove(
                        "selected"
                    );

                } else {

                    activeType =
                        selectedType;


                    categoryButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );


                    button.classList.add(
                        "selected"
                    );

                }


                filterCards();

            }
        );

    });


    /* =====================================================
       HAIRSTYLE FILTER
    ===================================================== */

    hairButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedHair =
                    button.dataset.hair;


                if (
                    activeHair ===
                    selectedHair
                ) {

                    activeHair =
                        "all";

                    button.classList.remove(
                        "active"
                    );

                } else {

                    activeHair =
                        selectedHair;


                    hairButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );

                }


                filterCards();

            }
        );

    });


    /* =====================================================
       OCCASION FILTER
    ===================================================== */

    occasionButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedOccasion =
                    button.dataset.occasion;


                if (
                    activeOccasion ===
                    selectedOccasion
                ) {

                    activeOccasion =
                        "all";

                    button.classList.remove(
                        "active"
                    );

                } else {

                    activeOccasion =
                        selectedOccasion;


                    occasionButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );

                }


                filterCards();

            }
        );

    });


    /* =====================================================
       COLOR FILTER
    ===================================================== */

    colorButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedColor =
                    button.dataset.color;


                if (
                    activeColor ===
                    selectedColor
                ) {

                    activeColor =
                        "all";

                    button.style.outline =
                        "none";

                } else {

                    activeColor =
                        selectedColor;


                    colorButtons.forEach(
                        function (item) {

                            item.style.outline =
                                "none";

                        }
                    );


                    button.style.outline =
                        "2px solid var(--pink)";

                }


                filterCards();

            }
        );

    });


    /* =====================================================
       RESET ALL FILTERS
    ===================================================== */

    function resetFilters() {

        activeType = "all";
        activeHair = "all";
        activeOccasion = "all";
        activeColor = "all";


        if (searchInput) {
            searchInput.value = "";
        }

        if (globalSearch) {
            globalSearch.value = "";
        }


        categoryButtons.forEach(
            function (button) {

                button.classList.remove(
                    "selected"
                );

            }
        );


        hairButtons.forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );

            }
        );


        occasionButtons.forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );

            }
        );


        colorButtons.forEach(
            function (button) {

                button.style.outline =
                    "none";

            }
        );


        filterCards();

    }


    /* =====================================================
       SEE ALL BUTTONS
    ===================================================== */

    const showAllCategories =
        document.getElementById(
            "showAllCategories"
        );

    const showAllHair =
        document.getElementById(
            "showAllHair"
        );

    const showAllOccasions =
        document.getElementById(
            "showAllOccasions"
        );

    const showAllColors =
        document.getElementById(
            "showAllColors"
        );


    if (showAllCategories) {

        showAllCategories.addEventListener(
            "click",
            resetFilters
        );

    }


    if (showAllHair) {

        showAllHair.addEventListener(
            "click",
            resetFilters
        );

    }


    if (showAllOccasions) {

        showAllOccasions.addEventListener(
            "click",
            resetFilters
        );

    }


    if (showAllColors) {

        showAllColors.addEventListener(
            "click",
            resetFilters
        );

    }


    /* =====================================================
       FAVORITES
    ===================================================== */

    function attachFavoriteButtons(
        container
    ) {

        if (!container) {
            return;
        }


        container
            .querySelectorAll(
                ".card-favorite, .favorite-small"
            )
            .forEach(function (button) {

                if (
                    button.dataset.favoriteReady ===
                    "true"
                ) {
                    return;
                }


                button.dataset.favoriteReady =
                    "true";


                button.addEventListener(
                    "click",
                    function () {

                        button.classList.toggle(
                            "saved"
                        );


                        if (
                            button.classList.contains(
                                "saved"
                            )
                        ) {

                            if (
                                button.classList.contains(
                                    "card-favorite"
                                )
                            ) {

                                button.textContent =
                                    "♥";

                            } else {

                                button.textContent =
                                    "♥ Saved";

                            }

                        } else {

                            if (
                                button.classList.contains(
                                    "card-favorite"
                                )
                            ) {

                                button.textContent =
                                    "♡";

                            } else {

                                button.textContent =
                                    "♡ Favorite";

                            }

                        }

                    }
                );

            });

    }


    /* Add favorite listeners to
       your original 4 cards */

    if (featuredGrid) {

        attachFavoriteButtons(
            featuredGrid
        );

    }


    /* =====================================================
       PROFILE
    ===================================================== */

    if (profileButton) {

        profileButton.addEventListener(
            "click",
            function () {

                alert(
                    "StyleMyHair Profile\n\nYour saved accessories and hairstyles will appear here."
                );

            }
        );

    }


    /* =====================================================
       INITIAL DISPLAY
    ===================================================== */

    filterCards();

});