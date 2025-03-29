

//new college 
const AddCollege = () => {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className='flex flex-col justify-start text-sm font-semibold items-start w-full clear-both mt-5'>
                <label htmlFor="name">College Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="mb-5"
                />
            </div>
            <div className='flex flex-col justify-start text-sm font-semibold items-start w-full clear-both'>
                <label htmlFor="code">College Code</label>
                <input
                    type="text"
                    id="code"
                    name="code"
                    className="w-full text-gray-700 h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 mb-5"
                />
            </div>
            <button className='btn'>Add College</button>
        </div>
    )
}

export default AddCollege