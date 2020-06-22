import React, { Component } from 'react';

import './App.css';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min"
import "@mdi/font/css/materialdesignicons.css"
import { Notification } from './Utils/swal'
import { getData, InsertWork } from './Utils/axiosMethod';




class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

      Users: [],
      // { id: 1, code: "101", name: "مسعود ابراهیمی", isLogin: true, isOut: false, },
      // { id: 2, code: "102", name: "پدارم تهرانچی", isLogin: true, isOut: false, },
      // { id: 3, code: "103", name: "مجید شاه آبادی", isLogin: true, isOut: false, },
      titleName: "",
      TypeOperation: "",
      code: "",
      time: new Date(),
      date: new Date().toLocaleDateString("fa-IR"),
      lastTime: "",
      // defaultLogin: false
    }
  }
  // CreateUsers = async () => {
  //   let stdate = new Date().toLocaleDateString("fa-IR")
  //   const res = await getData({ stdate })
  //   return  res.data
  // }

  async componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000)
    let stdate = new Date().toLocaleDateString("fa-IR")
    debugger
    const res = await getData({ stdate })
    this.setState({ Users: res.data })
  }
  componentWillMount() {
    clearInterval(this.timerID)
  }
  tick() {
    this.setState({ time: new Date() })
  }
  CreatetitleName = (e) => {
    const { Users } = this.state
    let res
    let time
    let code
    Users.forEach((node, index) => {
      if (node.code === e.target.value) {
        res = node.name
        time = node.Time
        code = node.code
      }
    })
    this.setState({ titleName: res, lastTime: time, code: code ? code : null })
  }
  Login = async (e) => {
    const { Users, TypeOperation, titleName, code } = this.state
    let Single;
    Users.forEach((node, index) => {
      if (node.name === titleName)
        if (node.isLogin === true)
          Single = {
            personelRef: node.id,
            code: node.code,
            name: node.name,
            Time: null,
            Timeto: new Date().toLocaleTimeString("fa-IR"),
            strdate: new Date().toLocaleDateString("fa-IR"),
            isLogin: node.isLogin,
            isOut: node.isOut
          }
      if (node.isOut === true)
        Single = {
          personelRef: node.id,
          code: node.code,
          name: node.name,
          Time: new Date().toLocaleTimeString("fa-IR"),
          Timeto: null,
          strdate: new Date().toLocaleDateString("fa-IR"),
          isLogin: node.isLogin,
          isOut: node.isOut
        }
    })
    e.preventDefault()
    debugger
    if (titleName === "") {
      Notification.fire(
        {
          icon: 'warning',
          title: 'کد پرسنلی را وارد کنید'
        }
      )
    }
    else
      if (code === null) {
        Notification.fire(
          {
            icon: 'warning',
            title: 'کد پرسنلی اشتباه'
          }
        )
      }
      else {

        try {
          const res = await InsertWork([Single])
          if (res.status === 200) {
            Notification.fire(
              {
                icon: "success",
                title: 'ثبت ساعت کاری با موفقیت انجام شد'
              }
            )
            this.setState({ titleName: "", code: "" })
          }
        }
        catch (ex) {
          Notification.fire(
            {
              icon: "warning",
              title: "خطایی در روند ثبت ساعت صورت گرفته است"
            }
          )
        }
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
    user.forEach((node, index) => {
      if (titleName === node.name) {
        node.isOut = false
        node.isLogin = true
      }
    })
    this.setState({ TypeOperation: "ورود" })
  }
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
    const { titleName, Users, lastTime } = this.state
    if (Users === null) return ''
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
          <div className="col-lg-6 col-md-6 login-box">
            <div className="col-lg-10 login-title  mx-auto">
              <input autoComplete="off" value={this.state.code} id="input" type="text" onChange={this.CreatetitleName} className="input form-control-lg text-center no-outline col-7" style={{ fontSize: "45px" }} />
              <label className="form-control-label col-4" >:کد کاربری</label>
            </div>
            <span className="text-light" style={{ fontSize: "25px" }}>{titleName}</span>
            <div className="col-lg-12 login-form mt-2">
              <div className="col-lg-12 login-form ">
                <form onSubmit={this.Login} method="get" action="">
                  <div className="form-group mx-auto col-12 text-center  mt-4 ">

                    <button
                      aria-disabled="true"
                      type="submit"
                      onClick={this.Exit}
                      className={this.userOutCss()}
                      style={{ fontSize: "35px" }}>
                      خروج
                       </button>
                    <button
                      aria-disabled="true"
                      type="submit"
                      onClick={this.Enter}
                      className={this.userEnterCss()}
                      style={{ fontSize: "35px" }}>
                      ورود
                    </button>

                    <p className="text-light" style={{ fontSize: "20px" }} dir="rtl"> آخرین ثبت ساعت  :<span style={{ fontSize: "20px" }} className="ml-2 mr-2">{lastTime}</span></p>
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