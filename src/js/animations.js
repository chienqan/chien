import { animate, inView } from "motion";

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate sticky profile card
    const profileCard = document.querySelector('.sticky-profile-card');
    if (profileCard) {
        inView(profileCard, () => {
            animate(
                profileCard,
                { 
                    opacity: [0, 1],
                    y: [-20, 0],
                },
                { 
                    ease: "easeInOut",
                    duration: 0.8
                }
            );
        }, { margin: "-50px" });
    }

    // Animate sections with section-animation class
    const sections = document.querySelectorAll('.section-animation');
    sections.forEach((section, index) => {
        inView(section, () => {
            animate(
                section,
                { 
                    opacity: [0, 1],
                    y: [-20, 0],
                },
                { 
                    duration: 0.4,
                    ease: "easeInOut",
                    delay: index * 0.1
                }
            );
        }, { margin: "-30px" });
    });
}); 