import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function SkeletonVideo() {
    return (
        <div style={{width:"100%", margin:"1rem 0"}}>
            <SkeletonTheme color="#d1c8c8" highlightColor="#d1c8c8" >
                <Skeleton height={180}/>
            </SkeletonTheme>
            <div>
                <Skeleton style={{margin:"0.5rem"}} circle height={40} width={40} />
                <Skeleton height={40} width="75%" />
            </div>
        </div>
    )
}

export default SkeletonVideo
