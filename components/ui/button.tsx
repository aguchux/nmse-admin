
const Button = ({ children, onClick, className }:{
    children: React.ReactNode,
    onClick: () => void,
    className?: string
}) => (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

export default Button