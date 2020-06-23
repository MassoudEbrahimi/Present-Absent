import React, { Component } from 'react';

import './App.css';
import $ from 'jquery'
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
      titleName: "",
      TypeOperation: "",
      inputCode: "",
      time: new Date(),
      date: new Date().toLocaleDateString("fa-IR"),
      lastPersonStatus: "",
      lastTimeChecked: "",

    }
  }
  async componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000)
    let stdate = new Date().toLocaleDateString("fa-IR")
    const res = await getData({ stdate })
    debugger
    $("input[type=text]").focus()
    this.setState({ Users: res.data });
  }
  componentWillMount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({ time: new Date() })
  }
  CreatetitleName = (e) => {

    const { Users } = this.state
    let res, code, status, time
    Users.forEach((node, index) => {
      if (node.code === e.target.value) {
        res = node.name
        code = node.code
        status = node.laststatus
        time = node.Lasttime
      }
    })
    console.log(res)
    this.setState({ titleName: res ? res : null, inputCode: code ? code : null, lastPersonStatus: status, lastTimeChecked: time })
    console.log(res ? res : null)
  }
  Login = async (e) => {
    e.preventDefault()
    const { Users, TypeOperation, titleName, inputCode } = this.state
    let Single;
    Users.forEach((node, index) => {
      if (node.name === titleName) {
        if (node.laststatus === true) {
          Single = {
            id: node.id,
            code: node.code,
            // name: node.name,
            time: new Date().toLocaleTimeString("fa-IR"),
            date: new Date().toLocaleDateString("fa-IR"),
            LastStatus: true
            // Timeto: new Date().toLocaleTimeString("fa-IR"),
            // strdate: new Date().toLocaleDateString("fa-IR"),
            // isLogin: node.isLogin,
            // isOut: node.isOut
          }
        }
        if (node.laststatus === false) {
          Single = {
            id: node.id,
            code: node.code,
            // name: node.name,
            time: new Date().toLocaleTimeString("fa-IR"),
            date: new Date().toLocaleDateString("fa-IR"),
            LastStatus: false
            // Timeto: null,
            // strdate: new Date().toLocaleDateString("fa-IR"),
            // isLogin: node.isLogin,
            // isOut: node.isOut
          }
        }
      }
    })
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
      if (inputCode === null) {
        Notification.fire(
          {
            icon: 'warning',
            title: 'کد پرسنلی اشتباه'
          }
        )
      }
      else {
        try {
          debugger
          const res = await InsertWork(Single)
          if (res.status === 200) {
            Notification.fire(
              {
                icon: "success",
                title: 'ثبت ساعت کاری با موفقیت انجام شد'
              }
            )
            setTimeout(function () {
              window.location.reload();  //Refresh page
            }, 1000);
            this.setState({ titleName: "", inputCode: "", lastTimeChecked: "" })
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
        node.laststatus = !node.laststatus
      }
    })
    this.setState({ TypeOperation: "خروج" })
  }
  Enter = () => {
    const { Users, titleName } = this.state
    const user = [...Users]
    user.forEach((node, index) => {
      if (titleName === node.name) {
        node.laststatus = true
      }
    })
    this.setState({ TypeOperation: "ورود" })
  }
  btnCss = () => {
    const { Users, titleName } = this.state
    let res
    const user = [...Users]
    user.forEach((node, index) => {
      if (node.name === titleName) {
        return res = node.laststatus === false ? "btn btn-outline-success col-8 col-xl-5 col-md-5 col-sm-5 m-4" : " btn btn-outline-danger col-8 col-xl-5 col-md-5 col-sm-510 m-4"
      }
    })
    return res === undefined ? "btn btn-outline-primary col-8 col-xl-5 col-md-5 col-sm-5 m-4" : res
  }
  render() {
    const { titleName, Users, lastTimeChecked, lastPersonStatus, inputCode } = this.state
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
          <div className="col-lg-3 col-md-2 col-0">
          </div>
          <div className="col-lg-6 col-md-6 login-box col-12">
            <div className="col-lg-10 login-title  mx-auto">
              <input id="inputField" autoComplete="off" maxLength={6} minLength={2} value={inputCode} id="input" type="text" onChange={this.CreatetitleName} className="input form-control-lg text-center no-outline col-7" style={{ fontSize: "45px" }} />
              <label className="form-control-label col-4" >:کد کاربری</label>
            </div>
            <span className="text-light" style={{ fontSize: "25px" }}>{titleName}</span>
            <div className="col-lg-12 login-form mt-2">
              <div className="col-lg-12 login-form ">
                <form onSubmit={this.Login} method="get" action="" id="myFormID">
                  <div className="form-group mx-auto col-12 text-center  mt-4 ">

                    <input
                      id="myInputID"
                      aria-disabled="true"
                      type="submit"
                      onClick={this.Exit}
                      className={this.btnCss()}
                      style={{ fontSize: "35px" }}
                      value={(titleName === "" || titleName === null) ? 'ورود / خروج' : lastPersonStatus === false ? "ورود" : "خروج"} />

                    {/* <button
                      aria-disabled="true"
                      type="submit"
                      onClick={this.Enter}
                      className={this.btnCss()}
                      style={{ fontSize: "35px" }}>
                      ورود
                    </button> */}
                    <p className="text-light" style={{ fontSize: "20px" }} dir="rtl"> آخرین ثبت ساعت  :<span style={{ fontSize: "20px" }} className="ml-2 mr-2">{lastTimeChecked}</span></p>
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