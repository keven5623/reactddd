import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import './login.css'
import logo from '../../assets/imgs/logo.png'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';


class Login extends Component {

  
  handleSubmit = (event)=>{
    event.preventDefault();

    this.props.form.validateFields(async(err, values) => {
      if(!err){
        const {username,password} = values;
        const result = await reqLogin(username,password)
        if(result.status === 0){//登入成功
            message.success('登入成功')

            const user = result.data;
            memoryUtils.user = user; //保存到內存中
            storageUtils.saveUser(user); //保存到local中
            //跳轉到管理介面
            this.props.history.replace('/')
        }else{
          message.error(result.msg)
        }
      }else{
        console.log('檢驗失敗')
      }
    });

    

  }

  render() {
    //如果用戶已經登入，自動跳轉到管理介面
    const user = memoryUtils.user;
    if(user && user._id){
      return <Redirect to='/' />
    }
    const form = this.props.form;
    const { getFieldDecorator } = form;
    return (
      <div className='login'>
        <div className='login-header'>
          <img src={logo} alt="logo" />
          <h1>後臺管理系統</h1>
        </div>
        <div className='login-content'>
          <h2>用戶登入</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
                {
                  getFieldDecorator('username',{
                    rules: [
                      { required: true,whitespace:true, message: '請輸入用戶名' },
                      { min: 4, message: '用戶名至少4位' },
                      { max: 12, message: '用戶名最多12位' },
                      { pattern: /^[a-zA-Z0-9_]+$/, message: '用戶名必須是英文，數字，或下划線' }
                    ],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="帳號"
                    />
                  )
                }
            </Form.Item>
            <Form.Item>
            {
                  getFieldDecorator('password',{
                    rules: [
                      { required: true,whitespace:true, message: '請輸入密碼' },
                      { min: 4, message: '密碼至少4位' },
                      { max: 12, message: '密碼最多12位' },
                      { pattern: /^[a-zA-Z0-9_]+$/, message: '密碼必須是英文，數字，或下划線' }
                    ],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="密碼"
                    />
                  )
                }
                
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登入
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrapLogin = Form.create()(Login)
export default WrapLogin
