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
    const loraPredDisplay = document.getElementById("lora-prediction");

    // ----------------------------------------------------
    // Qualitative Examples Database
    // ----------------------------------------------------
    const examples = [
        {
            videoId: "media/benchmarks/carebench/v_00014063_0.mp4",
            question: "Describe the video in as much useful visual detail as possible. Include the main activity, visible people or objects, scene context, appearance, and any important visual details that help explain what is happening.",
            reference: "This video depicts a scene of a man lighting a pipe with a lighter. The man in the video is smoking a pipe held in his mouth, supported by his left hand, while his right hand grips the lighter. His right forearm features a large black tattoo. He has short, thick hair that is a deep brown color and is dressed in a loose-fitting black tank top. He is seated next to a window, which has a wooden frame and blue curtains, with a brick wall behind him and a wooden door on the right. The door has a square pattern, adorned with silver hinges and a doorknob. In the video, he first ignites the lighter with his right hand and then brings the flame to the pipe, holding it in that position for several seconds. Throughout this time, his left hand remains steady on the pipe, and his gaze is fixed intently on it, ensuring that the pipe is fully lit before setting the lighter down. He then continues to hold the pipe with his left hand and begins to smoke. The video is shot from the front, clearly illustrating how relaxed he is while smoking at home.",
            basePrediction: "A young man with tattoos on his arms is sitting in a room with a brick wall and a wooden door. He is holding a lighter and a piece of paper. He is blowing on the paper and then putting it in his mouth.",
            baseEm: 0,
            baseF1: "0.3200",
            loraPrediction: "A person is smoking a cigarette in a room with a brick wall and a wooden door. The person is wearing a black tank top and has tattoos on their arms. They are holding the cigarette in their right hand and using their left hand to light it with a lighter.",
            loraEm: 0,
            loraF1: "0.5600",
            source: "CaReBench: Caption"
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
            videoId: "media/benchmarks/plm/f522598789220c70_122_155.mp4",
            question: "Does this look like the same posture she's holding?",
            reference: "Yes, it appears you're mirroring the same posture. Your alignment, knee bend, and spine position match the demonstration, indicating proper form and engagement of the targeted muscle groups for optimal effectiveness and safety.",
            basePrediction: "Yes.",
            baseEm: 1,
            baseF1: "1.0000",
            loraPrediction: "Yes, the woman is holding the same posture in the video.",
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
        
        loraPredDisplay.textContent = item.loraPrediction;

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
