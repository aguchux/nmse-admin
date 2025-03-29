import React from "react"

const DivContainer = ({ children, className, width }: {
    children: React.ReactNode,
    className?: string,
    width?: string
}) => {
    return (
        <div className={`w-full md:w-1/2 min-h-5 bg-white p-4 shadow-lg ${className}}`}>{children}</div>
    )
}

export default DivContainer