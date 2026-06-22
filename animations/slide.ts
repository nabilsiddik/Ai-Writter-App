import {easeInOut, Variants} from 'motion/react'

export const slideUp: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.8, ease: easeInOut}
    }
}