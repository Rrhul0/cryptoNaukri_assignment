import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignupIndividual() {
    const [step, setStep] = useState(1)
    const [data, setData] = useState({ user_type: 'individual' })
    const [emailWarning, setEmailWarning] = useState(false)
    const navigate = useNavigate()

    const stepName = ['Personal Info.', 'Residency Info.', 'Bank Verification']

    function onClickBack() {
        if (step === 1) {
            navigate('/signup', { replace: true })
            return
        } else if (step === 2 || step === 3) setStep(step => step - 1)
    }

    const apiHost = import.meta.env.VITE_API_HOST || 'http://localhost:5000' //will change when it get deployed
    const signupApiEndpoint = `${apiHost}/signup`
    const checkEmailApiEndpoint = `${apiHost}/check-email`

    function onSubmitPage(e) {
        e.preventDefault()
        const stepData = new FormData(e.target)
        if (step === 1) {
            const username = stepData.get('username')
            const email = stepData.get('email')
            const password = stepData.get('password')
            //check everything is filled
            if (!username || !email || !password) return

            if (email) {
                fetch(checkEmailApiEndpoint, {
                    method: 'POST',
                    body: JSON.stringify({ email }),
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(res => {
                        if (res.status === 200) {
                            if (stepData.get('terms') !== 'on') {
                                //check for terms
                                //add warning here for accept terms
                                return
                            }
                            setData(oldData => ({ ...oldData, username, email, password }))
                            setStep(step => step + 1)
                        } else {
                            setEmailWarning(true)
                            return
                        }
                    })
                    .catch(() => {
                        return
                    })
            }
        } else if (step === 2) {
            const phone_number = stepData.get('phone_number')
            const country_code = stepData.get('country_code')
            const address = stepData.get('address')
            const country = stepData.get('country')
            console.log(country)
            if (!phone_number || !address || !country || !country_code) return
            setData(oldData => ({ ...oldData, phone_number, country_code, address, country }))
            setStep(step => step + 1)
        } else if (step === 3) {
            const bvn = stepData.get('bvn')
            if (!bvn) return
            setData(oldData => ({ ...oldData, bvn }))
            //send data to server and redirect to success page
            fetch(signupApiEndpoint, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => {
                    if (res.status === 200) {
                        navigate('/signupsuccess', { state: { username: data.username } })
                    } else console.log('error not 200 status')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <>
            <div className='flex justify-between items-start mr-12 mt-10 text-[#8692A6] px-14'>
                <div className='back flex items-center gap-3 hover:text-stone-600 cursor-pointer' onClick={onClickBack}>
                    <svg width='8' height='16' viewBox='0 0 8 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M9.86251 2.225L8.37918 0.75L0.137512 9L8.38751 17.25L9.86251 15.775L3.08751 9L9.86251 2.225Z'
                            className='fill-[#8692A6]'
                        />
                    </svg>
                    Back
                </div>
                <div className='text-end text-sm'>
                    <div className='text-[#BDBDBD] text-xs'>STEP 0{step}/03</div>
                    <div>{stepName[step - 1]}</div>
                </div>
            </div>
            {step === 1 ? (
                <div className='w-1/2 ml-24 mt-8'>
                    <div>
                        <div className='font-extrabold text-2xl leading-10'>Register Individual Account!</div>
                        <div className='text-[#8692A6] text-sm'>
                            For the purpose of industry regulation, your details are required.
                        </div>
                        <form className='mt-6' onSubmit={onSubmitPage}>
                            <Input name='username' placeholder='Enter Username' type='text' heading='Your fullname*' />
                            <InputEmail warning={emailWarning} setEmailWarning={setEmailWarning} />
                            <Input
                                name='password'
                                placeholder='Enter password'
                                type='password'
                                heading='Create password*'
                            />
                            <div className=' text-[#696F79]'>
                                <label>
                                    <input type='checkbox' className='mr-2 ' name='terms' />I agree to terms &
                                    conditions
                                </label>
                            </div>
                            <button className='bg-[#1565D8] text-white rounded-md w-full py-3 mt-4'>
                                Register Account
                            </button>
                        </form>
                        <div className='flex items-center'>
                            <div className='w-1/2 h-[1px] bg-[#F5F5F5]'></div>
                            <div>Or</div>
                            <div className='w-1/2 h-[1px] bg-[#F5F5F5]'></div>
                        </div>
                        <button className='flex border border-gray-100 rounded-md w-full pl-4 gap-24 py-3 drop-shadow-sm'>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z'
                                    fill='#FFC107'
                                />
                                <path
                                    d='M3.15302 7.3455L6.43851 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z'
                                    fill='#FF3D00'
                                />
                                <path
                                    d='M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5717 17.5742 13.3037 18.0011 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z'
                                    fill='#4CAF50'
                                />
                                <path
                                    d='M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z'
                                    fill='#1976D2'
                                />
                            </svg>
                            <div>Register with Google</div>
                        </button>
                    </div>
                </div>
            ) : (
                <div className='w-1/2 ml-24 mt-8'>
                    <div className='font-extrabold text-2xl leading-10'>Complete Your Profile!</div>
                    <div className='text-[#8692A6] text-sm'>
                        For the purpose of industry regulation, your details are required.
                    </div>
                    <form className='mt-6' onSubmit={onSubmitPage}>
                        {step === 2 && (
                            <div>
                                <PhoneNumberInput />
                                <Input
                                    name='address'
                                    placeholder='Please enter address'
                                    type='text'
                                    heading='Your address'
                                />
                                <CountrySelect />
                            </div>
                        )}
                        {step === 3 && (
                            <div>
                                <Input
                                    name='bvn'
                                    placeholder='Please enter Bank verification number'
                                    type='text'
                                    heading='Bank verification number (BVN)'
                                />
                            </div>
                        )}
                        <button className='bg-[#1565D8] text-white rounded-md w-full py-3 mt-12'>
                            Save & Continue
                        </button>
                    </form>
                    <div className='flex justify-center items-center gap-2 mt-6'>
                        <svg width='10' height='14' viewBox='0 0 10 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M7.91665 4.95833H8.49998C9.14165 4.95833 9.66665 5.48333 9.66665 6.125V11.9583C9.66665 12.6 9.14165 13.125 8.49998 13.125H1.49998C0.858313 13.125 0.333313 12.6 0.333313 11.9583V6.125C0.333313 5.48333 0.858313 4.95833 1.49998 4.95833H2.08331V3.79167C2.08331 2.18167 3.38998 0.875 4.99998 0.875C6.60998 0.875 7.91665 2.18167 7.91665 3.79167V4.95833ZM4.99998 2.04167C4.03165 2.04167 3.24998 2.82333 3.24998 3.79167V4.95833H6.74998V3.79167C6.74998 2.82333 5.96831 2.04167 4.99998 2.04167ZM1.49998 11.9583V6.125H8.49998V11.9583H1.49998ZM6.16665 9.04167C6.16665 9.68333 5.64165 10.2083 4.99998 10.2083C4.35831 10.2083 3.83331 9.68333 3.83331 9.04167C3.83331 8.4 4.35831 7.875 4.99998 7.875C5.64165 7.875 6.16665 8.4 6.16665 9.04167Z'
                                fill='#8692A6'
                            />
                        </svg>
                        <p className='text-xs text-[#8692A6]'>Your Info is safely secured</p>
                    </div>
                </div>
            )}
        </>
    )
}

function Input({ name, placeholder, type, heading }) {
    return (
        <div>
            <label className='text-[#696F79] relative'>
                {heading}

                <input
                    placeholder={placeholder}
                    required
                    type={type}
                    name={name}
                    className='border border-[#8692A6] rounded-md h-12 w-full pl-4 mt-2 mb-3 placeholder:text-[#8692A6] outline-none focus-within:drop-shadow focus-within:border-[#1565D8]'
                />
                {type === 'password' && (
                    <div
                        className='absolute -bottom-1 right-3 text-black hover:text-stone-700'
                        onClick={e => {
                            if (e.currentTarget.previousSibling.type === 'password') {
                                e.currentTarget.previousSibling.type = 'text'
                                e.currentTarget.textContent = 'Hide'
                            } else {
                                e.currentTarget.previousSibling.type = 'password'
                                e.currentTarget.textContent = 'Show'
                            }
                        }}>
                        Show
                    </div>
                )}
            </label>
        </div>
    )
}

function PhoneNumberInput() {
    const [selectedCountry, setSelectedCountry] = useState('india')
    const codes = {
        india: { code: '+91', flag: '/india.png' },
        usa: { code: '+1', flag: '/usa.png' },
        uk: { code: '+44', flag: '/uk.png' },
        china: { code: '+86', flag: '/china.png' },
        australia: { code: '+61', flag: '/australia.png' },
    }

    return (
        <div className='relative'>
            <label>
                Phone number
                <input
                    className='border border-[#8692A6] rounded-md h-12 w-full pl-[6.5rem] mt-2 mb-3 placeholder:text-[#8692A6] outline-none focus-within:drop-shadow focus-within:border-[#1565D8]'
                    type='text'
                    name='phone_number'
                    // value={value}
                    placeholder='Enter Phone Number'
                    // onChange={() => {}}
                    // onKeyDown={() => {}}
                />
            </label>
            <div
                className='absolute top-[39%] left-0 w-fit z-20'
                onClick={e => {
                    if (e.currentTarget.querySelector('#selector').style.display === 'none') {
                        e.currentTarget.querySelector('#selector').style.display = 'block'
                    } else e.currentTarget.querySelector('#selector').style.display = 'none'
                }}>
                <div className='flex items-center gap-2 px-2'>
                    <img id='showSelectedFlag' width='40' height='35' src={codes[selectedCountry].flag} />
                    <input value={codes[selectedCountry].code} type='button' onClick={() => {}} />
                    <input type='hidden' name='country_code' value={codes[selectedCountry].code} />
                    <svg width='7' height='5' viewBox='0 0 7 5' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M3.1937 4.25224L0.117307 0.834025C-0.0564437 0.640969 0.0805642 0.333336 0.340296 0.333336H6.49308C6.75281 0.333336 6.88982 0.640968 6.71607 0.834025L3.63967 4.25224C3.5205 4.38465 3.31287 4.38465 3.1937 4.25224Z'
                            fill='black'
                        />
                    </svg>
                </div>

                <ul id='selector' className='hidden bg-white border rounded my-2 '>
                    {Object.keys(codes).map(country => (
                        <li
                            key={codes[country].code}
                            className='flex items-center gap-2 border-b px-2 hover:bg-stone-100'
                            onClick={e => setSelectedCountry(e.currentTarget.querySelector('p').textContent)}>
                            <img width='40' height='35' src={codes[country].flag} />
                            <p className='hidden'>{country}</p>
                            {codes[country].code}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function CountrySelect() {
    const [selectedCountry, setSelectedCountry] = useState('India')
    const countries = ['India', 'USA', 'UK', 'China', 'Australia']

    return (
        <div className='relative'>
            <label>
                Country of residence
                <input type='hidden' name='country' value={selectedCountry} />
                <input
                    className='border border-[#8692A6] rounded-md h-12 w-full text-start pl-4 mt-2 mb-2 placeholder:text-[#8692A6] outline-none focus-within:drop-shadow focus-within:border-[#1565D8]'
                    type='button'
                    value={selectedCountry}
                    onClick={e => {
                        console.log(e.currentTarget.nextElementSibling.style.display)
                        if (e.currentTarget.nextElementSibling.style.display === 'block') {
                            e.currentTarget.nextElementSibling.style.display = 'none'
                        } else e.currentTarget.nextElementSibling.style.display = 'block'
                    }}
                />
                <ul id='selector' className='hidden absolute z-50 bg-white border rounded w-full'>
                    {countries.map(country => (
                        <li
                            className='border-b pl-4 py-1 text-lg hover:bg-stone-100'
                            key={country}
                            onClick={e => setSelectedCountry(e.currentTarget.textContent)}>
                            {country}
                        </li>
                    ))}
                </ul>
                <svg
                    className='absolute right-4 bottom-7'
                    width='7'
                    height='5'
                    viewBox='0 0 7 5'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M3.1937 4.25224L0.117307 0.834025C-0.0564437 0.640969 0.0805642 0.333336 0.340296 0.333336H6.49308C6.75281 0.333336 6.88982 0.640968 6.71607 0.834025L3.63967 4.25224C3.5205 4.38465 3.31287 4.38465 3.1937 4.25224Z'
                        fill='black'
                    />
                </svg>
            </label>
        </div>
    )
}

function InputEmail({ warning, setEmailWarning }) {
    return (
        <div className='mb-2'>
            <label className='text-[#696F79] relative'>
                Email Address*
                <input
                    placeholder='Enter Email address'
                    required
                    type='email'
                    name='email'
                    onFocus={() => setEmailWarning(false)}
                    className='border border-[#8692A6] rounded-md h-12 w-full pl-4 mt-2 placeholder:text-[#8692A6] outline-none focus-within:drop-shadow focus-within:border-[#1565D8]'
                />
                {warning && <p className='text-red-500'>Email Address already used</p>}
            </label>
        </div>
    )
}
