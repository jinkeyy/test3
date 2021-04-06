import { Component } from "react";
import axios from "axios"
class Form extends Component{
    constructor(props) {
        super(props)
        this.state = {
            email:"",
            pass:"",
        }
    }
    onChangeEmail =(e)=>{
        this.setState({
            email: e.target.value,
     })
    }
    onChangePass = (e)=>{
        this.setState({
            pass: e.target.value,
     })
    }
    login = ()=>{
        console.log(this.state.email+""+this.state.pass)
        let datas = {
            email:this.state.email,
            password:this.state.pass,
        }
        axios({
            method: 'post',
            url: "http://localhost:3030/login",
            data: datas,        
        }).then(res=>{
            console.log(res.data)
        })
    }
    render(){
        return(
            <div>
                <div><label>Email:</label><input onChange={this.onChangeEmail}></input></div>
                <div><label>Password:</label><input type="password" onChange={this.onChangePass}></input></div>
                <div><button onClick={this.login}>Login</button></div>
            </div>
        )
    }
}
export default Form