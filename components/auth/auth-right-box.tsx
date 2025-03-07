import React from 'react'

const AuthRightBox = () => {
    return (
        <>
            <div className="ml-auto">
                <h2 className="text-2xl font-bold text-white">
                    Welcome to <span className="text-teal-300">NMSE Prep</span>
                </h2>
            </div>
            <div className="space-y-6 text-center">
                <h2 className="text-4xl font-bold text-white lg:text-5xl">
                    Prepare for Your <br />
                    <span className="text-teal-300">Medical Exams</span> with Confidence
                </h2>
                <p className="max-w-lg text-base text-gray-100 lg:text-lg mx-auto">
                    Access high-quality medical practice questions and detailed explanations to excel in your exams.
                </p>
            </div>
            <div className="text-center">
                <p className="text-sm text-teal-100">&rdquo;MedExamPro helped me pass my board exams on my first try!&rdquo; - Dr. Jane Doe</p>
            </div>
        </>
    )
}

export default AuthRightBox