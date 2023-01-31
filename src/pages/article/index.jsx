import React, { Component } from 'react'
import {Switch,Route ,Redirect} from 'react-router-dom'

import ArticleHome from './home'
import ArticleAdd from './article-add'
import ArticleDetail from './detail'
import './article.css'



export default class Article extends Component {
  render() {
    return (
      <Switch>
        <Route path='/article' component={ArticleHome} exact></Route>
        <Route path='/article/addupdate' component={ArticleAdd}></Route>
        <Route path='/article/detail' component={ArticleDetail}></Route>
        <Redirect to= '/article'></Redirect>
      </Switch>
    )
  }
}
