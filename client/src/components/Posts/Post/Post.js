import React from 'react';
import {useDispatch} from 'react-redux';

import moment from 'moment';

import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import useStyle from './styles';

import {deletePost, likePost} from '../../../actions/posts';


const Post = ({post, setCurrentId}) => {

    // console.log(post);
    // console.log(post.creator);

    const classes = useStyle();

    const dispatch = useDispatch();

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} component='img' src={post.selectedFile} title={post.title}/>
            {/* <CardMedia
                style={{ height: 100, width: 100 }}
                image="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iTXVpU3ZnSWNvbi1yb290IiBmb2N1c2FibGU9ImZhbHNlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgYXJpYS1oaWRkZW49InRydWUiID48cGF0aCBkPSJNMTUgM2wyLjMgMi4zLTIuODkgMi44NyAxLjQyIDEuNDJMMTguNyA2LjcgMjEgOVYzaC02ek0zIDlsMi4zLTIuMyAyLjg3IDIuODkgMS40Mi0xLjQyTDYuNyA1LjMgOSAzSDN2NnptNiAxMmwtMi4zLTIuMyAyLjg5LTIuODctMS40Mi0xLjQyTDUuMyAxNy4zIDMgMTV2Nmg2em0xMi02bC0yLjMgMi4zLTIuODctMi44OS0xLjQyIDEuNDIgMi44OSAyLjg3TDE1IDIxaDZ2LTZ6Ij48L3BhdGg+PC9zdmc+"
            /> */}
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size='small' onClick={() => {setCurrentId(post._id)}}>
                    <MoreHorizIcon fontSize='medium'/>
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((t) => `#${t} `)}</Typography>
            </div>
            <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize='small'/>
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button size='small' color='secondary' onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize='small'/>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default Post;