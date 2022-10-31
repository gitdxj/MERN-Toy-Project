import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';

import {Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import useStyle from './styles';

import {deletePost, likePost} from '../../../actions/posts';


const Post = ({post, setCurrentId}) => {

    // console.log("components/Post");
    // console.log(post);
    // console.log(post.creator);

    const classes = useStyle();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if(user && post && post.likes && (post.likes.length>0)){
            if (post.likes.find((like) => like===(user.result.googleId || user.result._id))){
               return (<><ThumbUpAltIcon fontSize="small"/> &nbsp; {post.likes.length > 2 ? `You and ${post.likes.length-1} others` : `${post.likes.length} like${post.likes.length>1?'s':''} `} </>);
            } else {
                return (<><ThumbUpAltOutlined fontSize="small"/> &nbsp; {post.likes.length} {post.likes.length === 1 ? 'likes': 'like'} </>);
            }
        }
        return <><ThumbUpAltOutlined fontSize="small"/> &nbsp; like </>
    }
    
    const openPost = () => navigate(`/posts/${post._id}`);

    return (
        <Card className={classes.card} raised elevation={6}>
        <ButtonBase className={classes.cardActions} onClick={openPost}>
            <CardMedia className={classes.media} component='img' src={post.selectedFile} title={post.title}/>
            {/* <CardMedia
                style={{ height: 100, width: 100 }}
                image="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iTXVpU3ZnSWNvbi1yb290IiBmb2N1c2FibGU9ImZhbHNlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgYXJpYS1oaWRkZW49InRydWUiID48cGF0aCBkPSJNMTUgM2wyLjMgMi4zLTIuODkgMi44NyAxLjQyIDEuNDJMMTguNyA2LjcgMjEgOVYzaC02ek0zIDlsMi4zLTIuMyAyLjg3IDIuODkgMS40Mi0xLjQyTDYuNyA1LjMgOSAzSDN2NnptNiAxMmwtMi4zLTIuMyAyLjg5LTIuODctMS40Mi0xLjQyTDUuMyAxNy4zIDMgMTV2Nmg2em0xMi02bC0yLjMgMi4zLTIuODctMi44OS0xLjQyIDEuNDIgMi44OSAyLjg3TDE1IDIxaDZ2LTZ6Ij48L3BhdGg+PC9zdmc+"
            /> */}
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {/* Edit button */}
            {user && (user.result._id===post.creator || user.result.googleId===post.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size='small' onClick={() => {setCurrentId(post._id)}}>
                        <MoreHorizIcon fontSize='medium'/>
                    </Button>
                </div>
            )}
        </ButtonBase>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((t) => `#${t} `)}</Typography>
            </div>
            <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
        
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {/* Delete button */}
                {user && (user.result._id===post.creator || user.result.googleId===post.creator) && (
                    <Button size='small' color='secondary' onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize='small'/>
                        Delete
                    </Button>
                )}

            </CardActions>
        </Card>
    );
};

export default Post;