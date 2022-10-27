import Link from "next/link";
import Example from "./Table";

function Indexpage() {
  return (
    <div>
      please redirect to 
      <Link href="/dashboard"> Dashboard</Link>
    </div>
  );
}

export default Indexpage;
