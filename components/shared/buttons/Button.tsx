'use client'
import { easeInOut, motion } from 'motion/react'
import Link from 'next/link'

type ButtonProps = {
    children: React.ReactNode,
    type?: "button" | "submit" | "reset",
    disabled?: boolean,
    classNames?: string,
    size?: 'md' | 'lg' | 'xl',
    link?: string,
    onClick?: () => void
}

const Button = ({ children, type = 'button', classNames, link = '', disabled = false, onClick }: ButtonProps) => {
    return (
        <>
            {link ?
                <Link href={link || ''}>
                    <motion.button
                        disabled={disabled}
                        type={type}
                        onClick={onClick}
                        initial={false}
                        whileHover={{
                            y: -2,
                        }}
                        whileTap={{
                            scale: 0.8,
                            y: -5,
                        }}
                        className={`rounded py-1 px-5 font-bold cursor-pointer relative bg-primary text-white ${classNames && classNames}`}>
                        <span className='pointer-events-none'>
                            {children}
                        </span>
                    </motion.button>
                </Link>

                :

                <motion.button
                    disabled={disabled}
                    type={type}
                    onClick={onClick}
                    initial={false}
                    whileHover={{
                        y: -2,
                    }}
                    whileTap={{
                        scale: 0.8,
                        y: -5,
                    }}
                    className={`rounded py-1 px-5 font-bold cursor-pointer relative bg-primary text-white ${classNames && classNames}`}>
                    <span className='pointer-events-none'>
                        {children}
                    </span>
                </motion.button>

            }
        </>
    )
}

export default Button
