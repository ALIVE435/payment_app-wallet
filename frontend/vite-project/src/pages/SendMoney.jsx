import Heading from "../components/Heading"
import Input from '../components/Input'
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

export default function SendMoney() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);


    return (
        <div className='bg-[#000b1db3] min-h-[100vh]' style={{
            height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"
        }}>
            <div className='rounded-xl border-solid border-2 border-slate-900 py-5 px-5 min-w-[300px]'>
                <div className='text-center rounded-md bg-lime-950/[0.3]  pb-3 mb-2'>
                    <Heading label={"Send Money"} ></Heading>
                </div>
                <form action="">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                        </div>
                        <h3 className="text-2xl font-semibold">{name}</h3>
                    </div>
                    <Input placeholder={`Enter Amount`} eventFunction={setAmount} label={"Amount in \u20B9"} id={"amount"}></Input>
                    <button onClick={() => {
                        console.log(amount)
                        axios.post("http://localhost:3000/api/v1/account/transfer", {
                            to: id,
                            amount
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                    }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white block my-2">Initiate Transfer</button>
                </form>
            </div>
        </div>
    )
}