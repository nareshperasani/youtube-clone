import React from 'react';
import "./Sidebar.scss";
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import HistoryIcon from '@material-ui/icons/History';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from 'react-redux';
import { log_out } from '../../redux/actions/auth.action';
import { NavLink } from 'react-router-dom';

function Sidebar({sidebar, handleToggleSidebar}) {

    const dispatch = useDispatch();

    const logOutHandler = () => {
        dispatch(log_out())
    }
    return (
        <nav className={sidebar ? "sidebar open": "sidebar"} onClick={()=>handleToggleSidebar(false)}>
            <li>
                
                <NavLink exact className="nav_links" activeClassName="active" to="/home">
                <HomeIcon/>
                <span>Home</span>
                </NavLink>
                
            </li>
            <li>
            <NavLink className="nav_links" activeClassName="active" to="/explore">
                <ExploreIcon/>
                <span>Explore</span>    
            </NavLink> 
            </li>
            <li>
            <NavLink className="nav_links" activeClassName="active" to="/subscriptions">
                <SubscriptionsIcon/>
                <span>Subscriptions</span>
            </NavLink>
            </li>
            <hr />
            <li>
            <NavLink className="nav_links" activeClassName="active" to="/library">
                <VideoLibraryIcon/>
                <span>Library</span>
            </NavLink>    
            </li>
            <li>
            <NavLink className="nav_links" activeClassName="active" to="/history">
                <HistoryIcon/>
                <span>History</span>
            </NavLink>    
            </li>
            <li>
            <NavLink className="nav_links" activeClassName="active" to="/watchLater">
                <WatchLaterIcon className="nav_icons"/>
                <span>Watch later</span>
            </NavLink>    
            </li>
            <li>
            <NavLink className="nav_links" activeClassName="active" to="/likedVideos">
                <ThumbUpIcon className="nav_icons"/>
                <span>Liked videos</span>
                </NavLink>    
            </li>
            <hr/>
            <li onClick={logOutHandler}>
                <ExitToAppIcon className="nav_icons"/>
                <span>Sign out</span>
            </li>
            <hr />
        </nav>
    )
}

export default Sidebar
