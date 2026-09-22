document.addEventListener("DOMContentLoaded", function () {

    // =========================================================
    // SETTINGS
    // =========================================================

    const TOTAL_REELS = 500;

    const reelsContainer =
        document.getElementById("reelsContainer");

    const searchBox =
        document.getElementById("searchBox");

    const reelSearch =
        document.getElementById("reelSearch");

    const openSearch =
        document.getElementById("openSearch");

    const closeSearch =
        document.getElementById("closeSearch");

    const commentsOverlay =
        document.getElementById("commentsOverlay");

    const commentsList =
        document.getElementById("commentsList");

    const commentInput =
        document.getElementById("commentInput");

    const commentForm =
        document.getElementById("commentForm");

    const closeComments =
        document.getElementById("closeComments");

    const toast =
        document.getElementById("toast");


    // =========================================================
    // STORAGE
    // =========================================================

    let savedReels =
        JSON.parse(
            localStorage.getItem("stylemyhair-saved-reels") || "[]"
        );

    let likedReels =
        JSON.parse(
            localStorage.getItem("stylemyhair-liked-reels") || "[]"
        );

    let comments =
        JSON.parse(
            localStorage.getItem("stylemyhair-comments") || "{}"
        );


    // =========================================================
    // CURRENT REEL
    // =========================================================

    let currentReelNumber = 1;

    let currentCommentReel = null;


    // =========================================================
    // HAIRSTYLE DATA
    // =========================================================

    const hairstyles = [
        {
            title: "Elegant Long Layers",
            description: "Soft layered hairstyle for a stylish everyday look.",
            hashtags: "#LongHair #Layers #Hairstyle"
        },
        {
            title: "Modern Bob",
            description: "A clean modern bob hairstyle with an elegant finish.",
            hashtags: "#Bob #BobCut #WomensHair"
        },
        {
            title: "Elegant Braids",
            description: "Beautiful braided hairstyle for a graceful look.",
            hashtags: "#Braids #BraidedHair #Hairstyle"
        },
        {
            title: "Soft Curls",
            description: "Soft curls for a beautiful and natural appearance.",
            hashtags: "#Curls #CurlyHair #HairStyle"
        },
        {
            title: "Classic Ponytail",
            description: "A simple and stylish ponytail for everyday looks.",
            hashtags: "#Ponytail #LongHair #Style"
        },
        {
            title: "Beach Waves",
            description: "Relaxed beach waves with a soft modern finish.",
            hashtags: "#BeachWaves #Waves #Hair"
        },
        {
            title: "Layered Bob",
            description: "A stylish layered bob with a modern appearance.",
            hashtags: "#LayeredBob #Bob #HairStyle"
        },
        {
            title: "French Braid",
            description: "A classic French braid for an elegant hairstyle.",
            hashtags: "#FrenchBraid #Braids #Hair"
        }
    ];


    // =========================================================
    // GET STYLE DATA
    // =========================================================

    function getStyleData(number) {

        const index =
            (number - 1) % hairstyles.length;

        return hairstyles[index];
    }


    // =========================================================
    // CREATE REEL
    // =========================================================

    function createReel(number) {

        const style =
            getStyleData(number);

        const reel =
            document.createElement("article");

        reel.className = "reel";

        reel.dataset.reelId =
            `reel-${number}`;

        reel.dataset.reelNumber =
            number;

        reel.dataset.title =
            style.title;

        reel.dataset.description =
            style.description;

        reel.dataset.hashtags =
            style.hashtags;


        reel.innerHTML = `

            <video
                class="reel-video"
                src="/static/videos/reel${number}.mp4"
                loop
                muted
                playsinline
                preload="metadata"
            ></video>

            <div class="video-dark"></div>

            <button
                type="button"
                class="mute-button"
            >
                🔇
            </button>


            <div class="reel-info">

                <h2>${style.title}</h2>

                <p>
                    ${style.description}
                </p>

                <strong>
                    ${style.hashtags}
                </strong>

            </div>


            <div class="reel-actions">

                <button
                    type="button"
                    class="reel-action like-button"
                >
                    <span class="action-icon like-icon">♡</span>
                    <small>Like</small>
                </button>


                <button
                    type="button"
                    class="reel-action comment-button"
                >
                    <span class="action-icon">💬</span>
                    <small>Comment</small>
                </button>


                <button
                    type="button"
                    class="reel-action share-button"
                >
                    <span class="action-icon">↗</span>
                    <small>Share</small>
                </button>


                <button
                    type="button"
                    class="reel-action save-button"
                >
                    <span class="action-icon save-icon">🔖</span>
                    <small>Save</small>
                </button>

            </div>
        `;


        updateReelButtons(reel);

        return reel;
    }


    // =========================================================
    // UPDATE LIKE / SAVE BUTTONS
    // =========================================================

    function updateReelButtons(reel) {

        const reelNumber =
            Number(reel.dataset.reelNumber);

        const likeIcon =
            reel.querySelector(".like-icon");

        const saveIcon =
            reel.querySelector(".save-icon");


        if (likedReels.includes(reelNumber)) {

            likeIcon.textContent = "♥";

            reel.classList.add("liked");

        } else {

            likeIcon.textContent = "♡";

            reel.classList.remove("liked");
        }


        if (savedReels.includes(reelNumber)) {

            saveIcon.textContent = "🔖";

            reel.classList.add("saved");

        } else {

            saveIcon.textContent = "🔖";

            reel.classList.remove("saved");
        }
    }


    // =========================================================
    // CREATE THE FIRST 3 REELS
    // =========================================================

    const existingReels =
        reelsContainer.querySelectorAll(".reel");


    // Existing HTML reels are Reel 1, 2 and 3

    existingReels.forEach(function (reel, index) {

        const number =
            index + 1;

        reel.dataset.reelNumber =
            number;

        updateReelButtons(reel);
    });


    // =========================================================
    // ADD REELS 4 TO 500
    // =========================================================

    for (
        let number = existingReels.length + 1;
        number <= TOTAL_REELS;
        number++
    ) {

        const reel =
            createReel(number);

        reelsContainer.appendChild(reel);
    }


    // =========================================================
    // AUTOPLAY OBSERVER
    // =========================================================

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    const video =
                        entry.target.querySelector(".reel-video");

                    if (!video) {
                        return;
                    }


                    if (entry.isIntersecting) {

                        currentReelNumber =
                            Number(
                                entry.target.dataset.reelNumber
                            );


                        // Pause every other video

                        document
                            .querySelectorAll(".reel-video")
                            .forEach(function (otherVideo) {

                                if (otherVideo !== video) {
                                    otherVideo.pause();
                                }

                            });


                        video.play().catch(function () {});


                    } else {

                        video.pause();

                    }

                });

            },
            {
                threshold: 0.7
            }
        );


    document
        .querySelectorAll(".reel")
        .forEach(function (reel) {

            observer.observe(reel);

        });


    // =========================================================
    // LOOP: REEL 500 → REEL 1
    // =========================================================

    let isJumping = false;


    reelsContainer.addEventListener(
        "scroll",
        function () {

            if (isJumping) {
                return;
            }


            const reels =
                reelsContainer.querySelectorAll(".reel");

            if (!reels.length) {
                return;
            }


            const lastReel =
                reels[reels.length - 1];


            const rect =
                lastReel.getBoundingClientRect();


            const containerRect =
                reelsContainer.getBoundingClientRect();


            // User has reached Reel 500

            if (
                rect.top <= containerRect.top + 20 &&
                Math.abs(
                    rect.top - containerRect.top
                ) < 100
            ) {

                isJumping = true;


                setTimeout(function () {

                    const firstReel =
                        reelsContainer.querySelector(
                            ".reel[data-reel-number='1']"
                        );


                    if (firstReel) {

                        firstReel.scrollIntoView({
                            behavior: "auto",
                            block: "start"
                        });


                        currentReelNumber = 1;

                    }


                    setTimeout(function () {

                        isJumping = false;

                    }, 300);

                }, 100);

            }

        },
        {
            passive: true
        }
    );


    // =========================================================
    // LIKE
    // =========================================================

    reelsContainer.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(".like-button");

            if (!button) {
                return;
            }


            const reel =
                button.closest(".reel");

            if (!reel) {
                return;
            }


            const number =
                Number(reel.dataset.reelNumber);


            if (likedReels.includes(number)) {

                likedReels =
                    likedReels.filter(
                        id => id !== number
                    );

            } else {

                likedReels.push(number);

            }


            localStorage.setItem(
                "stylemyhair-liked-reels",
                JSON.stringify(likedReels)
            );


            updateReelButtons(reel);

        }
    );


    // =========================================================
    // SAVE
    // =========================================================

    reelsContainer.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(".save-button");

            if (!button) {
                return;
            }


            const reel =
                button.closest(".reel");

            if (!reel) {
                return;
            }


            const number =
                Number(reel.dataset.reelNumber);


            if (savedReels.includes(number)) {

                savedReels =
                    savedReels.filter(
                        id => id !== number
                    );

                showToast("Removed from saved");

            } else {

                savedReels.push(number);

                showToast("Reel saved");

            }


            localStorage.setItem(
                "stylemyhair-saved-reels",
                JSON.stringify(savedReels)
            );


            updateReelButtons(reel);

        }
    );


    // =========================================================
    // MUTE / UNMUTE
    // =========================================================

    reelsContainer.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(".mute-button");

            if (!button) {
                return;
            }


            const reel =
                button.closest(".reel");

            const video =
                reel.querySelector(".reel-video");


            video.muted =
                !video.muted;


            button.textContent =
                video.muted ? "🔇" : "🔊";

        }
    );


    // =========================================================
    // TAP VIDEO → PLAY / PAUSE
    // =========================================================

    reelsContainer.addEventListener(
        "click",
        function (event) {

            if (
                event.target.closest(".reel-action") ||
                event.target.closest(".mute-button")
            ) {
                return;
            }


            const video =
                event.target.closest(".reel-video");

            if (!video) {
                return;
            }


            if (video.paused) {

                video.play().catch(function () {});

            } else {

                video.pause();

            }

        }
    );


    // =========================================================
    // COMMENTS
    // =========================================================

    reelsContainer.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(".comment-button");

            if (!button) {
                return;
            }


            const reel =
                button.closest(".reel");

            currentCommentReel =
                Number(reel.dataset.reelNumber);


            openComments(currentCommentReel);

        }
    );


    function openComments(number) {

        commentsOverlay.classList.add("active");

        renderComments(number);

        setTimeout(function () {

            commentInput.focus();

        }, 100);

    }


    function renderComments(number) {

        commentsList.innerHTML = "";


        const reelComments =
            comments[number] || [];


        if (reelComments.length === 0) {

            commentsList.innerHTML =
                `
                <p class="no-comments">
                    No comments yet. Be the first!
                </p>
                `;

            return;
        }


        reelComments.forEach(function (comment) {

            const item =
                document.createElement("div");

            item.className =
                "comment-item";

            item.textContent =
                comment;

            commentsList.appendChild(item);

        });

    }


    // =========================================================
    // POST COMMENT
    // =========================================================

    commentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const text =
                commentInput.value.trim();


            if (!text || currentCommentReel === null) {
                return;
            }


            if (!comments[currentCommentReel]) {

                comments[currentCommentReel] = [];

            }


            comments[currentCommentReel].push(text);


            localStorage.setItem(
                "stylemyhair-comments",
                JSON.stringify(comments)
            );


            commentInput.value = "";


            renderComments(
                currentCommentReel
            );

        }
    );


    // =========================================================
    // CLOSE COMMENTS
    // =========================================================

    closeComments.addEventListener(
        "click",
        function () {

            commentsOverlay.classList.remove(
                "active"
            );

        }
    );


    commentsOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target === commentsOverlay
            ) {

                commentsOverlay.classList.remove(
                    "active"
                );

            }

        }
    );


    // =========================================================
    // SHARE
    // =========================================================

    reelsContainer.addEventListener(
        "click",
        async function (event) {

            const button =
                event.target.closest(".share-button");

            if (!button) {
                return;
            }


            const reel =
                button.closest(".reel");


            const title =
                reel.dataset.title;


            const url =
                window.location.href;


            try {

                if (
                    navigator.share
                ) {

                    await navigator.share({
                        title:
                            `StyleMyHair - ${title}`,
                        text:
                            `Check out this hairstyle reel on StyleMyHair!`,
                        url: url
                    });

                } else {

                    await navigator.clipboard.writeText(
                        url
                    );

                    showToast(
                        "Reel link copied!"
                    );

                }

            } catch (error) {

                // User cancelled share

            }

        }
    );


    // =========================================================
    // SEARCH OPEN
    // =========================================================

    openSearch.addEventListener(
        "click",
        function () {

            searchBox.classList.add(
                "active"
            );

            reelSearch.focus();

        }
    );


    // =========================================================
    // SEARCH CLOSE
    // =========================================================

    closeSearch.addEventListener(
        "click",
        function () {

            searchBox.classList.remove(
                "active"
            );

            reelSearch.value = "";

            showAllReels();

        }
    );


    // =========================================================
    // SEARCH
    // =========================================================

    reelSearch.addEventListener(
        "input",
        function () {

            const query =
                reelSearch.value
                    .trim()
                    .toLowerCase();


            const reels =
                reelsContainer.querySelectorAll(".reel");


            reels.forEach(function (reel) {

                const title =
                    reel.dataset.title
                        .toLowerCase();

                const description =
                    reel.dataset.description
                        .toLowerCase();

                const hashtags =
                    reel.dataset.hashtags
                        .toLowerCase();


                const matches =
                    title.includes(query) ||
                    description.includes(query) ||
                    hashtags.includes(query);


                reel.style.display =
                    matches ? "" : "none";

            });

        }
    );


    function showAllReels() {

        reelsContainer
            .querySelectorAll(".reel")
            .forEach(function (reel) {

                reel.style.display = "";

            });

    }


    // =========================================================
    // TOAST
    // =========================================================

    function showToast(message) {

        toast.textContent =
            message;

        toast.classList.add(
            "show"
        );


        setTimeout(function () {

            toast.classList.remove(
                "show"
            );

        }, 2000);

    }


    // =========================================================
    // START FROM REEL 1
    // =========================================================

    const firstReel =
        reelsContainer.querySelector(
            ".reel[data-reel-number='1']"
        );


    if (firstReel) {

        firstReel.scrollIntoView({
            behavior: "auto",
            block: "start"
        });

    }

});