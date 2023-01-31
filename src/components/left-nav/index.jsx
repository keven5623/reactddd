import React, { Component } from 'react'
import {Link , withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';

import menuList from '../../config/menuConfig'
import logo from '../../assets/imgs/logoIcon.png'
import './index.css'

const { SubMenu } = Menu;
class LeftNav extends Component {

  getMenuNodes =(menuList)=>{
    const path = this.props.location.pathname;
     return menuList.map(item =>{
      if(!item.children){
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} /> 
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }else{
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if (cItem) {
          this.openKey = item.key
        }
        return(
      <SubMenu
        key={item.key}
        title={
          <span>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </span>
        }
      >
        {this.getMenuNodes(item.children)}
      </SubMenu>
        )
      }
     })
  }
  /*
  在第一次render()之前执行一次
  为第一个render()准备数据(必须同步的)
   */
  componentWillMount () {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {

    let path = this.props.location.pathname;
    if(path.indexOf('/article')===0){
      path = '/article'
    }
    const openKey = this.openKey
    return (
      <div>
        <div className='left-nav'>
            <Link to='/' className='left-nav-header'>
              <img src={logo} alt="logo" />
              <h1>股票實驗室</h1>
            </Link>
      </div>
      <Menu
      selectedKeys={[path]}
      mode="inline"
      theme="dark"
      defaultOpenKeys={[openKey]}
    >
      {
            this.menuNodes
      }
      
    </Menu>
      </div>
      
    )
  }
}

export default withRouter(LeftNav)
