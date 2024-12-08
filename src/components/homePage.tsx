import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
    const [userData ,setData] = useState<string>('')
  
    useEffect(()=>{
        const data = localStorage.getItem('user details')
        setData(JSON.stringify(data))
    },[])
    return (
        <>
            <div className='flex flex-col items-center text-xl pt-20'>                
                <h1>hello  {userData}</h1>                                     
                <Link to={'/'} className=''> Back to Login page</Link>
            </div>
        </>
  )
}
export default HomePage
