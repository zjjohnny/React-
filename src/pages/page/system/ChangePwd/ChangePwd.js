import React, { Component } from 'react';
import { Button, notification } from 'antd';
import { server } from '../../../../api/api';
import { Route, Routes, useNavigate } from "react-router-dom";
import './Changpwd.scss'
export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

class ChangePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pwd: '',
    }
    this.ChangePwds = this.ChangePwds.bind(this)
  }

  ChangePwds = async () => {
    try {
      console.log('%c ======>>>>>>>>', 'color:orange;', this.state.name, this.state.pwd);
      const res = await server.updatePwd({
        name: this.state.name,
        pwd: this.state.pwd
      })
      if (res.code == 200) {
        // 跳转到登录页面
        notification.info({
          placement: 'top',
          message: '修改成功',
        });
        // 加1秒延时不然弹窗还没出来你就跑到登录页面去了
        setTimeout(() => {
          this.props.navigate('/')
        }, 1000)

      }
    }
    catch (err) {
      console.log('%c ======>>>>>>>>', 'color:orange;', err)
    }
  }
  Layout = () => {
    console.log(this.props);
    // 跳转登录页面
    console.log('%c ======>>>>>>>>', 'color:orange;', '退出了');
    /**
     * this 指向的当前的class中的实例
     * 当然你的class中没有history
     * 退回去看看this指向
    */
    //  清除token
    localStorage.removeItem('token')
    this.props.navigate('/')
    // this.history.navigate('/')
  }
  // updatePwd
  render() {
    return (
      <div className='contentBOx'>
        <h1 className='Titles'>修改密码</h1>
        <div className='Titles-item'>
          <div>
            <p>用户名：</p> <input type="text" placeholder='请输入用户名' onChange={(e) => {
              this.setState({
                name: e.target.value
              })
            }} />
          </div>
          <div>
            <p>密码：</p> <input type="password" placeholder='请输入修改的密码' onChange={(e) => {
              this.setState({
                pwd: e.target.value
              })
            }} />
          </div>
          <Button type="primary" onClick={this.ChangePwds.bind(this)} >确定修改</Button>
        </div>
      </div>
    );
  }
}

export default withNavigation(ChangePwd);;

