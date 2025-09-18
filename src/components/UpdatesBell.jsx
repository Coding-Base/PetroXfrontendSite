import React, {useEffect, useState} from 'react'
import { Bell } from 'lucide-react'
import axios from 'axios'


export default function UpdatesBell({onOpen}){
const [count, setCount] = useState(0)


const fetchCount = async ()=>{
try{
const res = await axios.get('/api/updates/unread_count/')
setCount(res.data.unread_count || 0)
}catch(e){
// ignore
}
}


useEffect(()=>{
fetchCount()
const id = setInterval(fetchCount, 60000) // poll every 60s
return ()=> clearInterval(id)
},[])


return (
<button className="relative" onClick={onOpen} aria-label="Updates">
<Bell size={20} />
{count > 0 && (
<span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full px-1">{count}</span>
)}
</button>
)
}