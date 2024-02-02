import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {Row, Col, Button, Form} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {login} from '../actions/userActions'


const LoginScreen = () => {
    
    return(
        <h1>Sign In</h1>
    )
}

export default LoginScreen
