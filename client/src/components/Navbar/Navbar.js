import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { AppBar, Toolbar, Typography, Avatar, Button } from '@material-ui/core';

import useStyles from './styles';
import memoriesText from '../../images/memories-Text.png';
import memoriesLogo from '../../images/memories-Logo.png';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // console.log(user);
    useEffect(() => {
        // logout when user token expires
        if(user && user.token){
            const token = user.token;
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()){
                logout();
            }
        }
        
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        navigate("/");
        setUser(null);
    };

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to="/" className={classes.brandContainer}>
                {/* <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt='memories' height='60' /> */}
                <img src={memoriesText} alt="icon" height="45px" />
                <img src={memoriesLogo} alt="icon" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar> 
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography> 
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                ) }
            </Toolbar>  
        </AppBar>
    );
}

export default Navbar;