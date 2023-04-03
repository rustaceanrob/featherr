import React from 'react'

export default function PrivatePolicy() {
    return (
        <div className='flex flex-col sm:pl-20 sm:pr-20 pl-5 pr-5 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40  pt-10 pb-10 bg-gray-100'>
            <div className='bg-white px-5 py-2 border rounded-md'>
                <h1 className='flex pt-5 font-extrabold text-2xl'>Privacy Policy Agreement</h1>
                <h1 className='flex pt-5 font-bold text-gray-900'>1. Introduction: This privacy policy sets out how we will use any prompts provided by users to train future models, while ensuring that we respect the privacy of our users. We are committed to protecting the privacy of our users and we will not collect any personal data or use cookies. </h1>
                <h1 className='flex pt-5 font-bold text-gray-900'>2. Collection of Prompts: Our generative AI application may require prompts from users in order to train future models. We will only collect prompts that users choose to provide and use them solely for the purpose of training future models.</h1>
                <h1 className='flex pt-5 font-bold text-gray-900'>3. Personal Data: Users provide an authentication method to sign into the application. We do not use this data outside of authentication, nor do we record any additional personal data about our users.</h1>
                <h1 className='flex pt-5 font-bold text-gray-900'>4. Use of Cookies: We do not use cookies.</h1>
                <h1 className='flex pt-5 font-bold text-gray-900'>5. Third Parties: We do not share prompts or application data with third parties.</h1>
                <h1 className='flex pt-5 font-bold text-gray-900'>6. Changes to the Privacy Policy: 
We reserve the right to change this privacy policy at any time. Users will be notified of any changes to the privacy policy and will have the option to opt-out of any future use of their prompts.</h1>
                <h1 className='flex pt-5 font-bold text-gray-900 pb-5'>By using our generative AI application, you agree to this privacy policy agreement. If you do not agree with this policy, please do not use our application.</h1>
            </div>
            <div className='absolute top-0 left-0 w-full h-screen bg-gray-100 z-[-1]'></div>
        </div>
    )
}