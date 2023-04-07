import React from 'react'

export default function PrivatePolicy() {
    return (
        <div className='flex flex-col sm:pl-20 sm:pr-20 pl-5 pr-5 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40  pt-10 pb-10 bg-gray-100'>
            <div className='bg-white px-5 py-2 border rounded-md'>
                <h1 className='flex pt-5 font-extrabold text-2xl'>Privacy Policy Agreement</h1>
                <h1 className='flex pt-5 font-bold text-gray-900'>1. Introduction: This privacy policy sets out our application data and cookies policy. </h1>
                <h1 className='flex pt-5 font-bold text-gray-900'>2. Collection of Prompts: Our generative AI application may save mathematics-based prompts from users in order to train future models. We will only collect prompts for the sole purpose of training future models.</h1>
                <h1 className='flex pt-5 font-bold text-gray-900'>3. Personal Data: Users sign in with an authentication method to enter the application. We use this data solely to regulate and mitigate usage, spam, and abuse. We do not record any additional personal data about our users.</h1>
                <h1 className='flex pt-5 font-bold text-gray-900'>4. Use of Cookies: We do not use cookies.</h1>
                <h1 className='flex pt-5 font-bold text-gray-900'>5. Third Parties: We do not share user input prompts or application data with third parties.</h1>
                <h1 className='flex pt-5 font-bold text-gray-900'>6. Changes to the Privacy Policy: 
We reserve the right to change this privacy policy at any time. Users will be notified of any changes to the privacy policy and will have the option to opt-out of any future use of their prompts.</h1>
                <h1 className='flex pt-5 font-bold text-gray-900 pb-5'>By using our generative AI application, you agree to this privacy policy agreement. If you do not agree with this policy, please do not use our application.</h1>
            </div>
            <div className='absolute top-0 left-0 w-full h-screen bg-gray-100 z-[-1]'></div>
        </div>
    )
}