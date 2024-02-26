import { useState, useEffect } from 'react'
import { findUsers } from '../atoms/findUsers'
import { useRecoilValue } from 'recoil'
import axios from 'axios';
import { useNavigate } from "react-router-dom";



function useFetchUsers(filter) {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([])

    useEffect(() => {
        const prevTimeout = setTimeout(() => {
            axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
                .then(response => {
                    setUsers(response.data.user)
                    setLoading(false)
                })
                .catch(rej => { console.log(rej) })
        }, 5000)


        return () => { clearTimeout(prevTimeout) }  //Another usecase of useEffect hook in unmounting(before executing the useEffect again, prev will be unmounted with this return statement) 
    }, [filter]) //if dependency array of useEffect is kept void then function inside will run only once at first mounting or invoking

    /* alternate way
    function getUsers() {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
        .then(res => {
            setTodos(res.data.todos);
            setLoading(false);
        })
    }
    useEffect(()=>{
        const prevTimeout= setTimeout(getUsers,5000);
        return () => { clearTimeout(prevTimeout)}
    },[filter])
    */

    return { users, loading }
}

export default function Users() {
    const filter = useRecoilValue(findUsers);
    const { users, loading } = useFetchUsers(filter) //custom hook to fetch user details from database
    
    if(filter.length==0){
        return(
            <div>hey there</div>
        )
    }
    if (filter.length>0 && loading) {
        return <div>fetching users...</div>
    }
    return (
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    )
}

function User({ user }) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}