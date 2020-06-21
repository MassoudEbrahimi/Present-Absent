import React, { Component } from 'react';

import './App.css';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min"
import "@mdi/font/css/materialdesignicons.css"
import { Notification } from './Utils/swal'




class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

      Users: [
        { id: 1, code: "101", name: "مسعود ابراهیمی", isLogin: true, isOut: false, },
        { id: 2, code: "102", name: "پدارم تهرانچی", isLogin: true, isOut: false, },
        { id: 3, code: "103", name: "مجید شاه آبادی", isLogin: true, isOut: false, },
        // { id: 4, code: 104, name: "مسعود ابراهیمی", isLogin: false }
        // { id: 5, code: 105, name: "مسعود ابراهیمی", isLogin: false }
      ],
      titleName: "",
      TypeOperation: "",
      Time: new Date(),
      date: new Date().toLocaleDateString("fa-IR")
    }
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000)
  }
  componentWillMount() {
    clearInterval(this.timerID)
  }
  tick() {
    this.setState({ Time: new Date() })
  }
  CreatetitleName = (e) => {
    const { Users } = this.state
    let res
    Users.forEach((node, index) => {
      if (node.code === e.target.value)
        return res = node.name
    })
    this.setState({ titleName: res })
  }
  Login = (e) => {
    const { Users, Time, TypeOperation, titleName, date } = this.state
    e.preventDefault()
    if (titleName === "") {
      Notification.fire(
        {
          icon: 'warning',
          title: 'کد پرسنلی را وارد کنید'
        }
      )
    }
    else {
      Notification.fire(
        {
          icon: "success",
          title: 'ثبت ساعت کاری با موفقیت انجام شد'
        }
      )
      // try {
      //     const res = await 
      // }
      // catch (ex) {

      // }
    }
    console.log(Users);
    console.log(Time.toLocaleTimeString('fa-IR'));
    console.log(TypeOperation);
    console.log(date);
    console.log(titleName);
    if (e.target.value === 200) {
      this.setState({ exit: "", enter: "", titleName: "" })
    }


  }
  Exit = () => {
    const { Users, titleName } = this.state
    const user = [...Users]
    user.forEach((node, index) => {
      if (titleName === node.name) {
        node.isOut = false
        node.isLogin = true
      }
    })
    this.setState({ TypeOperation: "خروج" })
  }
  Enter = () => {
    const { Users, titleName } = this.state
    const user = [...Users]
    const res = user.forEach((node, index) => {
      if (titleName === node.name) {
        node.isOut = true
        node.isLogin = false
      }
    })
    this.setState({ TypeOperation: "ورود" })
  }
  // Enter = () => {

  //   const { Users, titleName } = this.state
  //   const user = [...Users]
  //   const res = user.forEach((node, index) => {
  //     if (titleName === node.name) {
  //       node.isOut = !node.isOut
  //       node.isLogin = !node.isLogin
  //     }
  //   })
  //   this.setState({ Users: res })
  // }
  userOutCss = () => {
    const { Users, titleName } = this.state
    let res
    const user = [...Users]
    user.forEach((node, index) => {
      if (node.name === titleName) {
        return res = node.isLogin === true ? "btn disabled cursor-none d-none  btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4" : "btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4 "
      }
    })
    return res === undefined ? "btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4" : res

  }
  userEnterCss = () => {
    const { Users, titleName } = this.state
    let res
    const user = [...Users]
    user.forEach((node, index) => {
      if (node.name === titleName) {
        return res = node.isLogin === true ? "btn  btn-outline-success col-xl-4 col-md-4 col-sm-4 m-4" : " btn cursor-none disabled d-none btn-outline-success col-xl-4 col-md-4 col-sm-4 m-4"
      }
    })
    return res === undefined ? "btn btn-outline-success col-xl-4 col-md-4 col-sm-4 m-4" : res

  }
  render() {
    const { titleName, Users } = this.state
    return (
      <div>
        <div className="login-header col-lg-8 col-md-8 col-xl-8 col-xs-12 col-sm-12 mx-sm-auto">
          <strong className="first-text-head">B</strong>
          <strong className="second-text-head">arsam</strong>
          <strong className="first-text-head">R</strong>
          <strong className="second-text-head">ayan</strong>
        </div>
        <div className="login-header col-lg-8 col-md-8 col-xl-8 col-xs-12 col-sm-12 mx-sm-auto">
          <strong style={{ fontSize: "34px" }}>حضور و غیاب پرسنل</strong>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-2">
          </div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="col-lg-10 login-title  mx-auto">
              <input type="text" onChange={this.CreatetitleName} className=" form-control-lg text-center no-outline col-7" style={{ fontSize: "45px" }} />
              <label className="form-control-label col-4">:کد کاربری</label>
            </div>
            <span className="text-light" style={{ fontSize: "25px" }}>{titleName}</span>
            <div className="col-lg-12 login-form mt-2">
              <div className="col-lg-12 login-form ">
                <form onSubmit={this.Login}>
                  <div className="form-group mx-auto col-12 text-center  mt-4 ">
                    <button
                      aria-disabled="true"
                      type="submit"
                      onClick={this.Exit}
                      className={this.userOutCss()}
                      // "btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4"
                      // {this.userOutCss()}
                      //   titleName !== "" ? Users.map((node, index) => {
                      //   if (node.name === titleName) {
                      //     return node.isLogin === true ? "disabled btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4" : " btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4"
                      //   }
                      // }) : "btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4"}
                      style={{ fontSize: "35px" }}>
                      خروج
                        </button>
                    <button
                      aria-disabled="true"
                      type="submit"
                      onClick={this.Enter}
                      className={this.userEnterCss()}
                      // class="btn disabled btn-outline-success col-xl-4 col-md-4 col-sm-4 m-4"
                      // {this.userEnterCss()}
                      //   titleName !== "" ? Users.map((node, index) => {
                      //     if (node.name === titleName) {
                      //       return node.isLogin === true ? "disabled btn btn-outline-success col-xl-4 col-md-4 col-sm-4 m-4" : " btn btn-outline-success col-xl-4 col-md-4 col-sm-4 m-4"
                      //     }
                      //   }) : "btn btn-outline-success col-xl-4 col-md-4 col-sm-4 m-4"
                      // }
                      style={{ fontSize: "35px" }}>
                      ورود
                       </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;