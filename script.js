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
            videoId: "media/benchmarks/carebench/v_00016568_0.mp4",
            question: "Describe the video in as much useful visual detail as possible. Include the main activity, visible people or objects, scene context, appearance, and any important visual details that help explain what is happening.",
            reference: "The video depicts a man outdoors, watering plants in his garden. He is dressed in a light blue T-shirt and checkered shorts, bent over as he holds a black watering can, gently pouring water into a potted plant by the wall. The surrounding environment is a quintessential garden, featuring a red wooden fence adorned with climbing vines. The lush greenery of the grass adds to the inviting atmosphere, and in the background, a hanging tire sways gently in the air. The man maintains his bent posture, grasping the handle of the watering can with his left hand, while the other side of the can is also held by another hand. From a glimpse of clothing and feet visible in the video, it appears that a small child is standing to the left of the man, helping him with the watering task. They begin by slightly tilting the watering can to minimize the flow of water, then they water the edges of the plant in the pot in a circular motion. Afterward, they adjust the angle of the can to increase the flow, directing water onto the plants beside the pot. Finally, the man raises the can, preparing to straighten up and move away.The camera angle captures the scene from slightly behind and to the left of the man, providing a clear view of his watering actions and the state of the plants. The overall ambiance is vibrant and full of life, showcasing a tranquil moment of tending to the garden that evokes a sense of nature and relaxation.",
            basePrediction: "A man wearing a blue shirt and plaid shorts is watering plants in a garden. He is using a black watering can to pour water onto the plants. The garden is surrounded by a red fence and there are other plants and trees in the background.",
            baseEm: 0,
            baseF1: "0.6500",
            loraPrediction: "A man wearing a light blue shirt and plaid shorts is watering a plant in a garden. He is using a black watering can to pour water onto the plant. The garden is surrounded by a red fence and there are other plants in the background.",
            loraEm: 0,
            loraF1: "0.7800",
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
