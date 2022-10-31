import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts'; 
import useStyles from './styles';

const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles(); 
    const dispatch = useDispatch();
    const commentRef = useRef();
    const [comments, setComments] = useState(post.comments);
    const [comment, setComment] = useState("");

    const handleClick = async () => {
        if(user){
            const finalComment = `${user.result.name}: ${comment}`;
            const newComments = await dispatch(commentPost(post._id, finalComment));
            setComments(newComments);
            setComment("");

            commentRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start"
              });
        }
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography> 
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(':')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentRef} />
                </div>
            </div>
            <div style={{width: '70%'}}>
                <Typography gutterBottom variant="h6">Write your Comment</Typography> 
                <TextField 
                    fullWidth
                    minRows={3}
                    variant="outlined"
                    label="Comment"
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button style={{marginTop: '10px'}} fullWidth disabled={!comment || !user} variant="contained" color="primary" onClick={handleClick} >
                    {user ? 'Publish':'Log in to comment'}
                </Button>
            </div>
        </div>
    );

}


export default CommentSection;