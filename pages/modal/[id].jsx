import React from "react";
import axios from "axios";
import { SiGmail } from "react-icons/si";
import { GoLocation } from "react-icons/go";
import { BsTelephoneFill } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


import { Pagination } from "swiper";

import s from "./scss.module.scss";
import Button from "@mui/material/Button";

import Link from "next/link";
import Cards from "../../boc_card";
function Modal({ data, data2 }) {
  console.log(data);
  return (
    <>
      <Link href={`/`}>
        <Button size="small">Назать</Button>
      </Link>
      <div className={s.block}>
        <div>
          <p>{data.name}</p>
          <p>{data.username}</p>
          <div className={s.address}>
            <p>
              <GoLocation /> {data.address.street}
            </p>
            <p>
              <SiGmail /> {data.email}
            </p>
            <p>
              <CgWebsite />
              {data.website}
            </p>
            <p>company {data.company.name}</p>
          </div>
        </div>

      </div>
      <h1 className={s.info}>Похожие книги</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          360:{
            width: 360,
            slidesPerView: 1,
          },
          532: {
            width: 640,
            slidesPerView: 1,
            
          },
          768: {
            width: 768,
            slidesPerView: 2,
          },
        }} 
        modules={[Pagination]}
        className={s.mySwiper}
      >
          {data2.map((res) => {
            return (
              <SwiperSlide key={res.id}>
                <div >
                <Cards name={res.name} href={`/modal/${res.id}`}  username={res.username} address={res.address.street} />
              </div>
              </SwiperSlide>
              
            );
          })}
      </Swiper>
    </>
  );
}

export default Modal;
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
export async function getStaticProps({ params: { id } }) {
  const res2 = await axios.get(
    "https://jsonplaceholder.typicode.com/users?populate=*"
  );
  let data2 = res2.data;

  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}?populate=*`
  );
  let data = res.data;
  return {
    props: {
      data,
      data2,
    },
    revalidate: 200,
  };
}
