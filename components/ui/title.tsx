import React from 'react'

export const TitleText = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <h1 className="w-full text-2xl mt-5 font-bold text-gray-500 mb-4 border-b-2 border-b-gray-300 pb-1">{children}</h1>
    )
}
