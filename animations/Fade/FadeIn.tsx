'use client'
import { easeInOut, motion, Variants } from 'motion/react'

const FadeIn = ({ children }: { children: React.ReactNode }) => {

    const fadeIn: Variants = {
        hidden: {
            opacity: 0,
        },
        show: {
            opacity: 1,
            transition: { duration: 0.8, ease: easeInOut }
        }
    }

    return (
        <motion.div variants={fadeIn} initial='hidden' whileInView="show">
            {children}
        </motion.div>
    )
}

export default FadeIn