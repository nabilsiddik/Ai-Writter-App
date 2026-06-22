'use client'
import { easeInOut, motion, Variants } from 'motion/react'

const SlideUp = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {

    const slideUp: Variants = {
        hidden: {
            opacity: 0,
            y: 50,
        },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: easeInOut }
        }
    }

    return (
        <motion.div className={className} variants={slideUp} initial='hidden' whileInView="show">
            {children}
        </motion.div>
    )
}

export default SlideUp