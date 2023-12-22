import React from 'react'
import './homeScreen.css'
import { useNavigate} from 'react-router-dom';

function HomeScreen() {
    const navigate = useNavigate()
    React.useEffect(() => {
        navigate('/login')
    }, [])  
    return (
        <div>HomeScreen</div>
    )
}

export default HomeScreen