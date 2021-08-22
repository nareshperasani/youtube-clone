import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getPopularVideos, getVideoByCategory } from '../../redux/actions/videos.action';
import "./CategoriesBar.scss";

const keywords = [
    'All',
    'React js',
    'Angular js',
    'React Native',
    'use of API',
    'Redux',
    'Music',
    'Algorithm Art ',
    'Guitar',
    'Bengali Songs',
    'Coding',
    'Cricket',
    'Football',
    'Real Madrid',
    'Gatsby',
    'Poor Coder'
 ]
function CategoriesBar() {

    const [activeElement, setActiveElement] = useState("All");

    const dispatch = useDispatch();
    
    const handleClick = (value)=>{
        setActiveElement(value)
        if(value === 'All'){
            dispatch(getPopularVideos())
        } else{
        dispatch(getVideoByCategory(value))
        }
    }
    return (
        <div className="categoriesBar">
            {
                keywords.map((value, i)=>(
                    <span onClick={()=>handleClick(value)} key={i} className={activeElement === value ? 'active': ''} >{value}</span>
                ))
            }
        </div>
    )
}

export default CategoriesBar;
