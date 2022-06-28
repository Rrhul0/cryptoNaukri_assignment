import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Signup from './signup'
import './index.css'

export default function App() {
    return (
        <Routes>
            <Route path='signupsuccess' element={<SignupSuccess />} />
            <Route path='signin' element={<Signin />} />
            <Route path='*' element={<Signup />} />
        </Routes>
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
