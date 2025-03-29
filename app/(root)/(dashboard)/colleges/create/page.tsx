import DivContainer from '@/components/ui/container'

const CollegeCreatePage = () => {
    return (
        <DivContainer className="w-1/2">
            <div className="flex flex-col">
                <label htmlFor="collegeName">College Name</label>
                <input type="text" id="collegeName" placeholder="Enter college name" className="border p-2" />
            </div>
            <div className="flex flex-col mt-4">
                <label htmlFor="collegeDescription">College Description</label>
                <textarea id="collegeDescription" placeholder="Enter college description" className="border p-2"></textarea>
            </div>
            <div className="flex flex-col mt-4">
                <label htmlFor="collegeLogo">College Logo</label>
                <input type="file" id="collegeLogo" className="border p-2" />
            </div>
        </DivContainer>
    )
}

export default CollegeCreatePage