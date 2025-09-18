import React, {useEffect, useState} from 'react'
import axios from 'axios'
import UpdateCard from '../components/UpdateCard'


export default function UpdatesTab(){
const [updates, setUpdates] = useState([])
const [loading, setLoading] = useState(true)


useEffect(()=>{
let mounted=true
axios.get('/api/updates/').then(r=>{ if(mounted) setUpdates(r.data.results || r.data) })
.catch(()=>{})
.finally(()=> mounted && setLoading(false))


// mark as read when tab opened
axios.post('/api/updates/mark_all_read/').catch(()=>{})


return ()=> mounted=false
},[])


if(loading) return <div>Loading updates...</div>


return (
<div className="space-y-4">
{updates.length === 0 && <div className="text-center text-gray-500">No updates yet.</div>}
{updates.map(u=> <UpdateCard key={u.id} update={u} />)}
</div>
)
}