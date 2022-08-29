import styles from "../styles/Home.module.scss";
import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

import axios from "axios";
import Card from "../boc_card";
import { Box } from "@mui/material";
import Link from "next/link";
import Cards from "../boc_card";
export default function Home({ data }) {
  const oldest = data.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <div className={styles.container}>
      
      <div>
        <Stack className={styles.Stack}>
          <Autocomplete
            id={oldest.id}
            getOptionLabel={(oldest) => `${oldest.name} `}
            options={oldest}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            renderOption={(props, oldest) => (
              <Box component="li" {...props}>
                <div>
                  <Link href={`/modal/${oldest.id}`}>
                    <h1 className={styles.Autocomplete_h1}>{oldest.name}</h1>
                  </Link>
                </div>
              </Box>
            )}
            renderInput={(params) => <TextField {...params} label="поиск" />}
          />
        </Stack>
        <div className={styles.map_card}>
          {oldest.map((res) => {
            return (
              <div key={res.id}>
                <Cards
                  name={res.name}
                  href={`/modal/${res.id}`}
                  username={res.username}
                  address={res.address}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await axios.get(
    "https://jsonplaceholder.typicode.com/users?populate=*"
  );

  let data = res.data;

  return {
    props: {
      data,
    },
    revalidate: 200,
  };
}
