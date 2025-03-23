import React from "react"

const DivContainer = ({ children, className }: {
    children: React.ReactNode,
    className?: string
}) => {
    return (
        <div className={`w-full min-h-5 bg-white p-4 shadow-lg ${className}}`}>{children}</div>
    )
}

export default DivContainer