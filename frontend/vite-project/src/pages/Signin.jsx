import { useState } from 'react'
import Heading from '../components/Heading'
import Input from '../components/Input'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'


export default function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate= useNavigate();

    return (
        <div className='bg-[#000b1db3] min-h-[100vh]' style={{
            display: 'flex', justifyContent: "center", alignItems: "center"
        }}>
            <div className='rounded-xl border-solid border-2 border-slate-900 py-5 px-5 '>
                <div className='text-center bg-lime-950/[0.3]  pb-3 mb-2'>
                    <Heading label={"Sign-In"} ></Heading>
                </div>
                <form action="">
                    <Input label={"Enter your registered email id"} eventFunction={setUsername} placeholder={"abc@gmail.com"} id={"email"}></Input><br /><br />
                    <Input label={"Enter your password"} eventFunction={setPassword} placeholder={""} id={"password"}></Input><br /><br />
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username,
                            password
                        });
                        console.log("signin    "+response.data.token)
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard",{state:{User:response.data.firstname, Balance:response.data.balance}})
                    }} label={"Sign in"}></Button>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} ></BottomWarning>
                </form>
            </div>
        </div>
    )
}