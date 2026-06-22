import { easeInOut, Variants } from "motion/react";

export const fadeIn: Variants = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {duration: 0.8, ease: easeInOut}
    }
}