import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Modal } from 'antd';

import LinkButton from '../link-button'
import menuList from '../../config/menuConfig'
import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import './index.css'

class Header extends Component {

  state = {
    currentTime:formateDate(Date.now()),
    locationName:'',
    temp:'',
    des:''
  }

  getTime = ()=>{
    this.timer =setInterval(()=>{
      const currentTime = formateDate(Date.now());
      this.setState({currentTime})
    },1000)
  }

  getWeather=async()=>{
    const {locationName,temp,des}= await reqWeather('南屯區');
    this.setState({locationName,temp,des})
  }

  getTitle=()=>{
    const path = this.props.location.pathname
    let title = '';
    menuList.forEach(item =>{
      if(item.key === path){
        title=item.title
      }else if(item.children){
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0);
        if(cItem){
          title=cItem.title;
        }
      }
    })

    return title;
  }

  logout = ()=>{
    Modal.confirm({
      content: '確定退出嗎',
      onOk:()=> {
        //刪除user數據
        storageUtils.removeUser();
        storageUtils.removeWatch();
        memoryUtils.user = {};
        //跳轉到login
        this.props.history.replace('/login')
      }
    })
  }

  componentDidMount(){
    //獲取當前時間
    this.getTime();
    //獲取當前天氣
    this.getWeather();
  }

  componentWillUnmount(){
    clearInterval(this.timer)
  }

  render() {
    
    const {currentTime,locationName,temp,des} = this.state;
    const user = memoryUtils.user.username;
    //得到當前面的title
    const title = this.getTitle()
    return (
      <div className='header'>
        <div className='header-top'>
          <span>歡迎,{user}</span>
          <LinkButton onClick={this.logout}>登出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
          <div className='header-bottom-right'>
            
            <span>地點:{locationName}</span>&nbsp;
            <span>氣溫:{temp}度</span>&nbsp;
            <span>天氣: {des}</span>&nbsp;
            <span>{currentTime}</span>

          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)