
const Card = ({ children }:{
    children: React.ReactNode
}) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">{children}</div>
    )
}

export default Card