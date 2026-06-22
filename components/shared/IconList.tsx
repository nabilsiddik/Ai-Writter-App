import React from 'react'

const IconList = ({icon, text, className = '', iconClass = '', textClass = ''}: {icon: React.ReactNode, text: string, className?: string, iconClass?: string, textClass?: string}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
        <span className={`${iconClass}`}>{icon}</span> 
        <span className={`font-medium ${textClass}`}>{text}</span>
    </div>
  )
}

export default IconList