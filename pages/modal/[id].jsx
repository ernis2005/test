import React from 'react'
import axios from "axios";



function Modal({data}) {
    console.log(data);
  return (
    <div>
        <div >
    
      <p>
         {data.name}
      </p>
    <p>
        {data.username}
    </p>
    
    
    </div>
    </div>
  )
}

export default Modal
export async function getStaticPaths() {

    const res = await axios.get(
        "https://jsonplaceholder.typicode.com/users?populate=*"
    );
    let paths = res.data.map((res) => {
      return {
        params: { id: String(res.id) },
      };
    });
    return {
      paths,
      fallback: false,
    };
  }
  export async function getStaticProps({ params:{ id }}) {
  
  
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}?populate=*`
    );
    let data = res.data;
    return {
      props: {

        data,
      },
      revalidate: 200,
    };
  }