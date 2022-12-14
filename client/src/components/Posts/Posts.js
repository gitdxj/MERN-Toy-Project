import React from 'react';
import {useSelector} from 'react-redux';
import {Grid, CircularProgress} from '@material-ui/core';
import Post from './Post/Post.js';
import useStyle from './styles';
const Posts = ({setCurrentId}) => {
    const classes = useStyle();
    const { isLoading, posts } = useSelector((state) => state.posts);

    // console.log(posts);
    if(!posts.length && !isLoading){
        return "No Posts";
    }

    return (
        isLoading ? <CircularProgress/> : (
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3} >
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;