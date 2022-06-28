import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Signup, { IndexSignup } from './signup'
import './index.css'
import SignupIndividual from './signupIndividual'
import { useEffect } from 'react'
import SignupBusiness from './signupBusiness'

export default function App() {
    return (
        <Routes>
            <Route path='signupsuccess' element={<SignupSuccess />} />
            <Route path='signin' element={<Signin />} />
            <Route path='signup' element={<Signup />}>
                <Route index element={<IndexSignup />} />
                <Route path='individual' element={<SignupIndividual />} />
                <Route path='business' element={<SignupBusiness />} />
            </Route>
            <Route path='*' element={<WildCardPage />} />
        </Routes>
    )
}

function WildCardPage() {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => navigate('/signup', { replace: true }), 2000)
    }, [])
    return (
        <div className='flex h-screen justify-center items-center flex-col'>
            <h1>This is WildCard Page (Not Implemented)</h1>
            <h2>Redirecting to SignUp Page (main)</h2>
        </div>
    )
}

function SignupSuccess() {
    const location = useLocation()
    const username = location.state.username
    return (
        <div className='flex h-screen justify-center items-center flex-col'>
            <h2>Successfully Signed Up User</h2>
            <h1>with Name "{username}"</h1>
            <Link to='/signup' className='text-blue-700 hover:text-blue-500 cursor-pointer'>
                Go to main Sign Up Page
            </Link>
        </div>
    )
}

function Signin() {
    return (
        <div className='flex h-screen justify-center items-center flex-col'>
            <h1>This is Signin Page (Not Implemented)</h1>
            <Link to='/signup' className='text-blue-700 hover:text-blue-500 cursor-pointer'>
                Go to main Sign Up Page
            </Link>
        </div>
    )
}
