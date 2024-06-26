import Heading from '../components/Heading'
import Input from '../components/Input'
import { BottomWarning } from '../components/BottomWarning'
import Button from '../components/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Signup() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err,setErr] = useState(null);
    const navigate= useNavigate();

    return (
        <div className='bg-[#000b1db3]' style={{
            minHeight: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"
        }}>
            <div className='rounded-xl border-solid border-2 border-slate-900 py-5 px-5 '>
                <div className='text-center bg-lime-950/[0.3]  pb-3 mb-2'>
                    <Heading label={"Sign-up"} ></Heading>
                </div>
                <form action="">
                    <Input label={"Enter your email-id"} eventFunction={setUsername} placeholder={"abc@gmail.com"} id={"email"}></Input><br />
                    <br />
                    <Input label={"Enter your first name"} eventFunction={setFirstname} placeholder={"Aniket"} id={"fname"}></Input><br /><br />
                    <Input label={"Enter your last name"} eventFunction={setLastname} placeholder={"Singh"} id={"lname"}></Input><br /><br />
                    <Input label={"Create your password"} eventFunction={setPassword} placeholder={""} id={"password"}></Input><br /><br />
                    <Button onClick={async () => {
                        axios({
                            method: "POST",
                            url: "http://localhost:3000/api/v1/user/signup",
                            data: {
                                username,
                                password,
                                firstname,
                                lastname
                            }
                        }).then((response)=>{
                            localStorage.setItem("token", response.data.token)
                            //console.log(response.status, response.headers, response.data)
                            navigate("/dashboard",{state:{User:response.data.firstname, Balance:response.data.balance}})
                        }).catch((error)=>{
                            //console.log(error)
                            setErr(error.response.data.message)
                            console.log(error.response.data.message)
                            //console.log(error.toJSON().message);
                        })
                    }} label={"Sign up"}></Button>
                    {err? <div className='text-wrap max-w-[250px]'>{err}</div>:""}
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
                </form>
            </div>
        </div>
    )
}