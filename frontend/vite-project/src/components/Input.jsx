export default function Input({ placeholder, label,id,eventFunction}) {
    if(!eventFunction){
        eventFunction=(x)=>{}
    }
    function eventListener(e){
        // console.log(e.target.value)
        // console.log(eventFunction)
        eventFunction(e.target.value)
    }

    return (
        <>
            <label htmlFor={id} >{label}</label><br />
            <input type="text" id={id} placeholder={placeholder} style={{border:'2px solid black',width:'250px'}} className="rounded-md pl-2" onChange={eventListener} />
        </>
    )
}