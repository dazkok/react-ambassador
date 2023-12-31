import React, {Dispatch, SyntheticEvent, useState} from 'react';
import {connect} from "react-redux";
import {User} from "../models/user";
import {Link, Navigate, NavLink} from "react-router-dom";
import axios from "axios";
import {setUser} from "../redux/actions/setUserAction";

const Nav = (props: any) => {
    const logout = async () => {
        await axios.post('logout');
        props.setUser(null);
    }

    let menu;

    if (props.user?.id) {
        menu = (
            <div className="col-md-3 text-end">
                <Link to={'/stats'} className={'btn me-2'}>Stats</Link>
                <Link to={'/rankings'} className={'btn me-2'}>Rankings</Link>

                <a href={'#'} className={'btn btn-outline-primary me-2'}
                   onClick={logout}
                >Logout</a>
                <Link to={'/profile'}
                      className={'btn btn-primary'}>{props.user.first_name} {props.user.last_name}</Link>
            </div>
        )
    } else {
        menu = (
            <div>
                <Link to={'/login'} className="btn btn-outline-primary me-2">Login</Link>
                <Link to={'/register'} className="btn btn-primary">Sign-up</Link>
            </div>
        )
    }

    return (
        <div className="container">
            <header
                className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                    <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                        Ambassador logo
                    </a>
                </div>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <NavLink to='/' caseSensitive
                                 className="nav-link px-2 link-secondary">Frontend</NavLink>
                    </li>
                    <li>
                        <NavLink to='/backend' caseSensitive
                                 className="nav-link px-2 link-secondary">Backend</NavLink>
                    </li>
                </ul>

                {menu}
            </header>
        </div>
    );
};

export default connect(
    (state: { user: User }) => ({
        user: state.user
    }),
    (dispatch: Dispatch<any>) => ({
        setUser: (user: User) => dispatch(setUser(user))
    })
)(Nav);
