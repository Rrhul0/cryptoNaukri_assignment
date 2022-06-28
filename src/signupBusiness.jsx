import { Link } from 'react-router-dom'

export default function SignupBusiness() {
    return (
        <div className='h-[calc(100%-2.5rem-1.5rem)] flex justify-center items-center flex-col'>
            <h1>This is Business Signup Page (Not Implemented)</h1>
            <Link to='/signup' className='text-blue-700 hover:text-blue-500 cursor-pointer'>
                Go to main Sign Up Page
            </Link>
        </div>
    )
}
