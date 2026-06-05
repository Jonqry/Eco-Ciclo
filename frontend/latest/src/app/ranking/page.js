"use client";

import { useEffect, useState } from "react";

export default function RankingPage(){

const [users,setUsers]=useState([]);

useEffect(()=>{

fetch("http://localhost:8080/rewards")
.then(res=>res.json())
.then(data=>{

const fakeRanking = data.map((item,index)=>({

nome:`Usuário ${index+1}`,
streak:(index+1)*10

}));

setUsers(fakeRanking);

})

},[]);

return(

<div>

<h1 className="text-3xl font-bold mb-6">

Ranking da Comunidade

</h1>

<div className="space-y-4">

{

users.map((user,index)=>(

<div
key={index}
className="p-4 rounded shadow bg-white flex justify-between"
>

<span>{user.nome}</span>

<span>

🔥 {user.streak}

</span>

</div>

))

}

</div>

</div>

)

}