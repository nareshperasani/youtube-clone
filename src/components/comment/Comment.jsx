import moment from 'moment';
import React from 'react';
import './Comment.scss';

function Comment({comment}) {

    const {authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay} = comment;
    return (
        <div className="comment p-2 d-flex">
            <img src={authorProfileImageUrl} alt="" className="rounded-circle mr-3" />
            <div className="comment_body">
                <p className="comment_header mb-1">
                    <span className="comment_name">{authorDisplayName}</span> {moment(publishedAt).fromNow()}
                </p>
                <p className="mb-0">{textDisplay}</p>
            </div>
        </div>
    )
}

export default Comment
