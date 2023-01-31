import React, { Component } from 'react'
import {Redirect,Route ,Switch} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';


import Home from '../home'
import Lesson from '../lesson'
import MyLesson from '../mylesson'
import MyArticle from '../myarticle'
import Question from '../question'
import Article from '../article'
import Member from '../member'
import Role from '../role'
import storageUtils from '../../utils/storageUtils';


const {Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  
  render() {
    const user = memoryUtils.user;

    if(!user || !user._id){
      //如果沒登入，自動跳轉到登入頁面
      return <Redirect to='/login' />
    }
    
    return (
      <Layout style={{minHeight:'100%'}}>
      <Sider>
        <LeftNav/>
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content style={{margin:20,backgroundColor:'#fff'}}>
          <Switch>
            <Route path='/home' component={Home}/>
            <Route path='/lesson' component={Lesson}/>
            <Route path='/mylesson' component={MyLesson}/>
            <Route path='/question' component={Question}/>
            <Route path='/article' component={Article}/>
            <Route path='/myarticle' component={MyArticle}/>
            <Route path='/member' component={Member}/>
            <Route path='/role' component={Role}/>
            <Redirect to='/home' />
          </Switch>
        </Content>
        <Footer style={{textAlign : 'center',color:'gray'}}>CopyRight&copy;股票實驗室</Footer>
      </Layout>
    </Layout>
    )
  }
}
