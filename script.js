// Video2LoRA Project Website Javascript Controller

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // Tabbed Results Switcher
    // ----------------------------------------------------
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetTab = button.getAttribute("data-tab");
            
            // Remove active class from buttons
            tabButtons.forEach(btn => btn.classList.remove("active"));
            // Add active class to clicked button
            button.classList.add("active");

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove("active"));
            // Show target tab content
            document.getElementById(targetTab).classList.add("active");
        });
    });

    // ----------------------------------------------------
    // Qualitative Examples State & DOM elements
    // ----------------------------------------------------
    let currentExampleIndex = 0;
    const prevBtn = document.getElementById("prev-example");
    const nextBtn = document.getElementById("next-example");
    const exIndexDisplay = document.getElementById("example-index-display");
    const exSourceDisplay = document.getElementById("example-source");
    const exQuestionDisplay = document.getElementById("example-question");
    const exReferenceDisplay = document.getElementById("example-reference");
    const basePredDisplay = document.getElementById("base-prediction");
    const baseEmDisplay = document.getElementById("base-em");
    const baseF1Display = document.getElementById("base-f1");
    const loraPredDisplay = document.getElementById("lora-prediction");
    const loraEmDisplay = document.getElementById("lora-em");
    const loraF1Display = document.getElementById("lora-f1");

    // ----------------------------------------------------
    // Qualitative Examples Database
    // ----------------------------------------------------
    const examples = [
        {
            videoId: "media/benchmarks/carebench/v_00016582_0.mp4",
            question: "Describe the key visible events in chronological order. Include all important actions and changes you can observe, with enough detail to distinguish each event clearly.",
            reference: "Man waters plants in garden; Man maintains consistent posture; Man waters pot of flowers; Man turns off nozzle; Man looks at the camera; Man prepares to bend down.",
            basePrediction: "A man wearing a white shirt and red shorts is watering plants in a garden. He is using a hose to water the plants. The garden has a lot of plants and flowers.",
            baseEm: 0,
            baseF1: "0.8500",
            loraPrediction: "A man is watering plants in a garden. He is wearing a white shirt and red shorts. He is using a hose to water the plants.",
            loraEm: 0,
            loraF1: "0.9000",
            source: "CaReBench: Events"
        },
        {
            videoId: "media/benchmarks/carebench/v_00003192_0.mp4",
            question: "Describe the important visible objects and entities in the video in as much useful detail as possible. Include their appearance, location, and role in the scene when visible.",
            reference: "There is a young boy; There is a red and blue checkered shirt; There are red shorts; There is a staircase with wooden steps; There are white railings; There is a blue sneaker; There is a right sneaker.",
            basePrediction: "A young boy is sitting on a wooden staircase, tying his blue sneakers. He is wearing a plaid shirt and red shorts. The boy is focused on tying the laces of his sneakers.",
            baseEm: 0,
            baseF1: "0.8800",
            loraPrediction: "A young boy is sitting on a wooden staircase, wearing a plaid shirt and blue shorts. He is tying his shoelaces.",
            loraEm: 0,
            loraF1: "0.8500",
            source: "CaReBench: Objects"
        },
        {
            videoId: "media/benchmarks/plm/97732532ef49f985_422_454.mp4",
            question: "Are they playing ticket ball? ?",
            reference: "No, they're playing Table Tennis (Ping Pong), not \"Ticket Ball\"!",
            basePrediction: "No.",
            baseEm: 1,
            baseF1: "1.0000",
            loraPrediction: "No, they are not playing ticket ball.",
            loraEm: 1,
            loraF1: "1.0000",
            source: "PLM-SGQA"
        },
        {
            videoId: "media/benchmarks/plm/b5bdb7f254cb1727_369_400.mp4",
            question: "Is he trying to tug?",
            reference: "Yes, your dog is likely inviting a tug-of-war game. Holding the toy in his mouth and possibly looking at you or wagging his tail indicates he's ready to engage in a playful tug.",
            basePrediction: "Yes.",
            baseEm: 1,
            baseF1: "1.0000",
            loraPrediction: "Yes, he is trying to tug.",
            loraEm: 1,
            loraF1: "1.0000",
            source: "PLM-SGQA"
        },
        {
            videoId: "media/benchmarks/vidcapbench/132065802449.mp4",
            question: "What is the weather like in the scene? Answer only the question, in one sentence.",
            reference: "Rainy day.",
            basePrediction: "It is raining.",
            baseEm: 0,
            baseF1: "0.8500",
            loraPrediction: "The video shows a rainy day with a wet path and trees.",
            loraEm: 0,
            loraF1: "0.8000",
            source: "VidCapBench"
        },
        {
            videoId: "media/benchmarks/vidcapbench/Tarsier_20.mp4",
            question: "Which parts of the creature are highlighted in the video? Answer only the question, in one sentence.",
            reference: "A close-up of its face, eyes, and hair.",
            basePrediction: "The creature's eyes, nose, mouth, and fur.",
            baseEm: 0,
            baseF1: "0.9000",
            loraPrediction: "The creature's eyes, mouth, and fur are highlighted in the video.",
            loraEm: 0,
            loraF1: "0.9200",
            source: "VidCapBench"
        }
    ];

    function updateExampleView() {
        const item = examples[currentExampleIndex];
        
        exIndexDisplay.textContent = `Example ${currentExampleIndex + 1} of ${examples.length}`;
        exSourceDisplay.textContent = item.source;
        exQuestionDisplay.textContent = item.question;
        exReferenceDisplay.textContent = item.reference;
        
        basePredDisplay.textContent = item.basePrediction;
        baseEmDisplay.textContent = `EM: ${item.baseEm}`;
        baseF1Display.textContent = `F1: ${item.baseF1}`;
        
        loraPredDisplay.textContent = item.loraPrediction;
        loraEmDisplay.textContent = `EM: ${item.loraEm}`;
        loraF1Display.textContent = `F1: ${item.loraF1}`;

        const videoPlayer = document.getElementById("video-preview-local");
        if (videoPlayer) {
            videoPlayer.src = item.videoId;
            videoPlayer.play().catch(err => console.log("Auto-play prevented:", err));
        }
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            currentExampleIndex = (currentExampleIndex - 1 + examples.length) % examples.length;
            updateExampleView();
        });

        nextBtn.addEventListener("click", () => {
            currentExampleIndex = (currentExampleIndex + 1) % examples.length;
            updateExampleView();
        });

        // Initialize the first example view
        updateExampleView();
    }

    // ----------------------------------------------------
    // Copy BibTeX Clipboard Utility
    // ----------------------------------------------------
    const copyBtn = document.getElementById("copy-bibtex");
    const bibtexCode = document.getElementById("bibtex-raw");

    if (copyBtn && bibtexCode) {
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(bibtexCode.textContent.trim()).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = "Copied!";
                copyBtn.style.background = "#10B981";
                copyBtn.style.color = "#FFFFFF";
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.background = "";
                    copyBtn.style.color = "";
                }, 2000);
            }).catch(err => {
                console.error("Failed to copy text: ", err);
            });
        });
    }

    // ----------------------------------------------------
    // Navigation Link Highlighter on Scroll
    // ----------------------------------------------------
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let currentSection = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });
});
