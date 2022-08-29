import React from "react";
import Link from "next/link";
import s from "./scss.module.scss";
function Card({ name, href }) {
  return (
    <div>
      <div>
        {name}
      </div>
      <Link href={href}>heki</Link>
    </div>
  );
}

export default Card;
