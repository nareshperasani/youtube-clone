import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../redux/actions/auth.action';
import "./LoginScreen.scss";

function LoginScreen() {
    const dispatch = useDispatch();

    const accessToken = useSelector(state => state.auth.accessToken);
    
    const handleLogin = () => {
        dispatch(login())
    }

    const history = useHistory();
    useEffect(()=>{
        if(accessToken){
            history.push('/s');
        }
    },[accessToken, history]);
    return (
        <div className="login">
            <div className="login_container">
                <img src="http://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="" />
                <button onClick={handleLogin}>Login with google</button>
                <p>This Project is made using YOUTUBE DATA API</p>
            </div>
        </div>
    )
}

export default LoginScreen
