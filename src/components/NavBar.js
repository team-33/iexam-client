import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import * as actions from '../actions';
import {Avatar} from "@material-ui/core";

class NavBar extends React.Component {

    constructor(props){
        super(props);
        this.props.getUser();
    }

  signOut = () => {
    this.props.history.push('/');
    this.props.signOut();
  }

  toggleDrawer = state => () => {
    if(this.props.isAuth)
      this.props.toggleDrawer(state);
  };

    render() {
        return (
            <div style={{flexGrow:1}}>
              <AppBar position='fixed'>
                <Toolbar>
                  <IconButton color='inherit' aria-label="Menu" style={{marginLeft: -20,marginRight: 0}} onClick={this.toggleDrawer(true)}>
                    <MenuIcon/>
                  </IconButton>
                  <Typography  color='inherit' variant="h5" style={{flexGrow:1}}>
                    <Link className="navbar-brand"  to="/" style={{color:'white', textDecoration: 'none' }}>
                      iExamr
                    </Link>
                    </Typography>

                    { !this.props.isAuth ?
                    <Link className="nav-link" to="/signup" style={{color:'white', textDecoration: 'none' }}>
                      <Button color='inherit'>
                      Sign up
                      </Button>
                    </Link>
                    : null }

                    { !this.props.isAuth ?
                    <Link className="nav-link" to="/signin" style={{color:'white', textDecoration: 'none' }}>
                      <Button color='inherit'>
                      Sign in
                      </Button>
                    </Link>
                    : null }

                    { this.props.isAuth ?
                        <Avatar src={this.props.user.photo}/>
                        : null }

                </Toolbar>
              </AppBar>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, actions)(withRouter(NavBar));
