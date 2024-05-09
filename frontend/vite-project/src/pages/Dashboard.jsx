import Heading from "../components/Heading"
import Input from "../components/Input"
import { useSetRecoilState,useRecoilValue } from 'recoil'
import { findUsers } from '../atoms/findUsers'
import Users from '../components/Users'
import { useLocation,useNavigate } from "react-router-dom"
import { useEffect,useState } from "react"

export default function Dashboard() {
    const setUsers = useSetRecoilState(findUsers);
    // const users = useRecoilValue(findUsers);
    const location=useLocation();
    const navigate=useNavigate();
    const [User,setUser]=useState(null)
    const [Balance,setBalance]=useState(null)

    useEffect(()=>{
        const token=window.localStorage.getItem("token");
        if(!token){
            return navigate("/signin")
        }
        else{
            console.log("dashboard     "+token)
            setUser(location.state.User)
            setBalance(location.state.Balance)
        }
    },[])
    
    
    return (
        <div className="bg-slate-400 min-h-[100vh]">
            <div className="flex bg-lime-900/[0.3] px-3 h-20 py-4 justify-between">
                <Heading label={"Paytm"}></Heading>
                <div className="h-[48px] flex ">
                    <img className="rounded-full" src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="" />
                    <p className="pl-[3px] py-[5px]">Hello, {User?User:""}</p>
                </div>
            </div>
            <div className="px-3">
                <p className="my-6 text-[1.2rem]">Your Balance:$ {Balance?Balance:""}</p>
                <p className="border-2"></p>
                <div className="py-3">  
                    <Input label={"Users"} id={"user"} placeholder={"search users..."} eventFunction={setUsers}></Input>
                </div>
                <hr />
                <Users></Users>
            </div>
        </div>
    )
}