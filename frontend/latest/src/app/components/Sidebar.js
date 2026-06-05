import Link from "next/link";

export default function Sidebar(){

return(

<div className="w-56 bg-green-100 min-h-screen p-4">

<ul className="space-y-4">

<li>
<Link href="/">
Dashboard
</Link>
</li>

<li>
<Link href="/ranking">
Ranking
</Link>
</li>

<li>
<Link href="/historico">
Histórico
</Link>
</li>

<li>
<Link href="/rewards">
Recompensas
</Link>
</li>

</ul>

</div>

)

}