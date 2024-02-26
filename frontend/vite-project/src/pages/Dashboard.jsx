import Heading from "../components/Heading"
import Input from "../components/Input"
import { useSetRecoilState,useRecoilValue } from 'recoil'
import { findUsers } from '../atoms/findUsers'
import Users from './Users'


export default function Dashboard({ User, Balance }) {
    const setUsers = useSetRecoilState(findUsers);
    // const users = useRecoilValue(findUsers);

    return (
        <div className="bg-slate-400 min-h-[100vh]">
            <div className="flex bg-lime-900/[0.3] px-3 h-20 py-4 justify-between">
                <Heading label={"Paytm"}></Heading>
                <div className="h-[48px] flex ">
                    <img className="rounded-full" src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="" />
                    <p className="pl-[3px] py-[5px]">Hello, Aniket</p>
                </div>
            </div>
            <div className="px-3">
                <p className="my-6 text-[1.2rem]">Your Balance: $4000</p>
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