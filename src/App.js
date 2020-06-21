import React, { Component } from 'react';

import './App.css';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min"
import "@mdi/font/css/materialdesignicons.css"




class App extends Component {
  state = {

    Users: [
      { id: 1, code: "101", name: "مسعود ابراهیمی", isLogin: false, isOut: true, css: "btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4" },
      { id: 2, code: "102", name: "پدارم تهرانچی", isLogin: false, isOut: true, css: "btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4" },
      { id: 3, code: "103", name: "مجید شاه آبادی", isLogin: false, isOut: true, css: "btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4" },
      // { id: 4, code: 104, name: "مسعود ابراهیمی", isLogin: false }
      // { id: 5, code: 105, name: "مسعود ابراهیمی", isLogin: false }
    ],
    titleName: "",
    TypeOperation: "",
    Time: new Date().toLocaleTimeString("fa-IR"),
    date: new Date().toLocaleDateString("fa-IR")
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
    this.setState({ time: new Date() })
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

    console.log(Time);
    console.log(TypeOperation);
    console.log(date);
    console.log(titleName);
    if (e.target.value === 200) {
      this.setState({ exit: "", enter: "", titleName: "" })
    }


  }
  Exit = () => {
    const { Users, titleName } = this.state
    console.log(Users);
    const user = [...Users]
    user.forEach((node, index) => {
      if (titleName === node.name) {
        node.isOut = false
        node.isLogin = true
      }
    })
    console.log(user);
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
  // userOutCss = () => {
  //   const { Users, titleName } = this.state
  //   const user = [...Users]
  //   const res = user.find((node, index) => {
  //     if (node.name === titleName) {
  //       return node.isLogin === true ? "btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4" : "btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4 disabled "
  //     }
  //   })
  //   return res === undefined ? "btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4" : res

  // }
  // userEnterCss = () => {
  //   const { Users, titleName } = this.state
  //   const user = [...Users]
  //   const res = user.find((node, index) => {
  //     if ((titleName !== "") && (node.name === titleName)) {
  //       return node.isLogin === true ? "btn btn-outline-success col-xl-4 col-md-4 col-sm-4 m-4" : " btn btn-outline-success col-xl-4 col-md-4 col-sm-4 m-4 disabled"
  //     }
  //   })
  //   return res === undefined ? "btn btn-outline-success col-xl-4 col-md-4 col-sm-4 m-4" : res

  // }
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
        <div class="row">
          <div class="col-lg-3 col-md-2"></div>
          <div class="col-lg-6 col-md-8 login-box">
            <div class="col-lg-10 login-title  mx-auto">
              <input type="text" onChange={this.CreatetitleName} class=" form-control-lg text-center no-outline col-7" style={{ fontSize: "45px" }} />
              <label class="form-control-label col-4">:کد کاربری</label>
            </div>
            <span className="text-light" style={{ fontSize: "25px" }}>{titleName}</span>
            <div class="col-lg-12 login-form mt-2">
              <div class="col-lg-12 login-form ">
                <form onSubmit={this.Login}>
                  <div class="form-group mx-auto col-12 text-center mt-4 ">
                    <button id="exitbtn" type="submit"
                      onClick={this.Exit}
                      class="btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4"
                      // {this.userOutCss()}
                      //   titleName !== "" ? Users.map((node, index) => {
                      //   if (node.name === titleName) {
                      //     return node.isLogin === true ? "disabled btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4" : " btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4"
                      //   }
                      // }) : "btn btn-outline-danger col-xl-4 col-md-4 col-sm-4 m-4"}
                      style={{ fontSize: "35px" }}>
                      خروج
                        </button>
                    <button id="enterbtn" type="submit"
                      onClick={this.Enter}
                      class="btn btn-outline-success col-xl-4 col-md-4 col-sm-4 m-4"
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