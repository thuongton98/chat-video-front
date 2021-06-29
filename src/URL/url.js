import React from 'react'
import { Switch,Route } from 'react-router'
import home from '../components/page/home'
import p404 from '../components/page/p404'
import test from '../components/page/testform'
import testvideo from '../components/page/testvideo'
import firebase from '../components/page/testfirebase'

function URL(){

    return(
        <Switch>
            <Route exact path='/' component={home}/>
            <Route path='/testform' component={test}/>
            <Route path='/testvideo' component={testvideo}/>
            <Route path='/firebasechat' component={firebase}/>

            <Route component={p404}/>
            
        </Switch>
    )
}


export default URL