import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';

import { getPostBySearch } from '../../actions/posts';

import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const query = useQuery();
    const page = query.get('page') || 1;  // query url and see if we have as page parameter
    const searchQuery =  query.get('searchQuery');

    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [currentId, dispatch]);  // once currentId is changed to null the frontend automatically run getPost

    const searchPost = () => {
        if(search.trim() || tags){
            const searchQuery = { search, tags: tags.join(',')};
            dispatch(getPostBySearch(searchQuery));
            const searchPage = `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`;
            navigate(searchPage);
        } else {
            navigate("/");
        }
    }

    // const handleKeyDown = (e) => {
    //     if (e.keyCode === 13){  // ENTER Key
    //         // search post
    //         searchPost();
    //     }
    // }

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag!==tagToDelete)); 

    return (
    <Grow in>
        <Container maxWidth="xl">
            <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
                {/* Posts */}
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    {/* Search */}
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField 
                            name="search" 
                            variant="outlined" 
                            label="Search Posts" 
                            // onKeyDown={handleKeyDown} 
                            fullWidth 
                            value={search} 
                            onChange={(e) => {setSearch(e.target.value)}} 
                        />
                        <ChipInput 
                            style={{margin: '10px 0'}}
                            value={tags}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                            label="Search Tags"
                            variant="outlined"
                        />
                        <Button onClick={searchPost} variant="contained" color="primary">Search</Button>
                    </AppBar>
                    {/* Form */}
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    {/* Pagination */}
                    {(!searchQuery && !tags.length) && (
                        <Paper elevation={6}>
                            <Pagination page={page} />
                        </Paper>
                    )}
                </Grid>

            </Grid>
        </Container>
    </Grow>
    );
}

export default Home;