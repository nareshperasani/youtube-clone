import React, { useState } from 'react';
import './Header.scss';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';

function Header({handleToggleSidebar}) {

    const [input, setInput] = useState("");
    const history = useHistory();

    const handleHeader = ()=>{
        history.push('/');
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        history.push(`search/${input}`)
    }
    return (
        <div className="header">
            <div className="header_left">
                <MenuIcon className="menu-icon" onClick={()=>handleToggleSidebar()} />
                <img className="header_logo" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg" alt="" onClick={handleHeader} />
            </div>    
                <div className="header_input">
                <input type="text" placeholder="Search" value={input} onChange={e=>setInput(e.target.value)} />
                <button className="normal-button" onClick={handleSubmit}  >
                <SearchIcon className="search_icon" />
                </button>
                </div>
                <div className="header_icons">
                    <VideoCallIcon className="header_icon" />
                    <AppsIcon className="header_icon" />
                    <NotificationsIcon className="header_icon" />
                    <Avatar className="header_icon" alt="Nares Chowdary" src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" />
                </div>
        </div>
    )
}

export default Header;
