import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const PrivacyPolicy = () => {
    return (
        <div>
            <Navbar />
            <div className='flex flex-col items-center'>
                <div className='lg:w-3/4 flex flex-col gap-[20px] px-[20px] py-[30px]'>
                    <p className='font-bold text-4xl'>
                        Privacy Policy
                    </p>
                    <p>
                        {process.env.NEXT_PUBLIC_COMPANY_NAME} operates the {process.env.NEXT_PUBLIC_WEBSITE_URL}. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                    </p>
                    <p>
                        We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from {process.env.NEXT_PUBLIC_WEBSITE_URL}.
                    </p>

                    {/*.... INFORMATION COLLECTION AND USE....*/}
                    <div className='flex flex-col gap-[10px]'>
                        <p className='font-bold text-xl'>
                            Information Collection and Use
                        </p>
                        <p>
                            We collect several different types of information for various purposes to provide and improve our Service to you.
                        </p>
                        {/*...TYPES OF DATA COLLECTED....*/}
                        <div>
                            <p>
                                1. Personal Data: While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:
                            </p>
                            <ul>
                                <li>
                                    Email address
                                </li>
                                <li>
                                    First name and last name
                                </li>
                                <li>
                                    Phone number
                                </li>
                            </ul>

                            <p>
                                2. Usage Data: We may also collect information on how the Service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                            </p>
                        </div>
                        {/*....Use of Data..*/}
                        <div>
                            <p className='font-bold text-xl'>
                                Use of Data
                            </p>
                            <p>
                                We use the collected data for various purposes:
                            </p>
                            <ul>
                                <li>
                                    To provide and maintain the Service
                                </li>
                                <li>
                                    To notify you about changes to our Service
                                </li>
                                <li>
                                    To allow you to participate in interactive features of our Service when you choose to do so
                                </li>
                                <li>
                                    To provide customer care and support
                                </li>
                                <li>
                                    To provide analysis or valuable information so that we can improve the Service
                                </li>
                                <li>
                                    To detect, prevent and address technical issues
                                </li>
                            </ul>
                        </div>
                        {/*....Disclosure of Data...*/}
                        <div>
                            <p className='font-bold text-xl'>
                                Disclosure of Data
                            </p>
                            <p>
                                We do not disclose your Personal Data to third parties without your explicit consent or as required by law.
                            </p>
                        </div>
                        {/*....Security of Data....*/}
                        <div>
                            <p className='font-bold text-xl'>
                                Security of Data
                            </p>
                            <p>
                                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                            </p>
                        </div>
                        {/*...Service Providers....*/}
                        <div>
                            <p className='font-bold text-xl'>
                                Service Providers
                            </p>
                            <p>
                                We may employ third party companies and individuals to facilitate our Service, provide the Service on our behalf, perform Service-related services or assist us in analyzing how our Service is used.
                            </p>
                            <p>
                                These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                            </p>
                        </div>
                        {/*.... Links to Other Sites....*/}
                        <div>
                            <p className='font-bold text-xl'>
                                Links to Other Websites
                            </p>
                            <p>
                                Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PrivacyPolicy