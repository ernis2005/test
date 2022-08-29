import styles from "../styles/Home.module.scss";
import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

import axios from "axios";
import Card from "../boc_card";
import { Box } from "@mui/material";
import Link from "next/link";
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
        <Stack>
          <Autocomplete
            id={oldest.id}
            getOptionLabel={(oldest) => `${oldest.name} `}
            options={oldest}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            renderOption={(props, oldest) => (
              <Box component="li" {...props}>
                <div>
                <Link href={`/modal/${oldest.id}`}>
                  <h1>
                   {oldest.name}
                  </h1>
                  </Link>
                </div>
              </Box>
            )}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </Stack>

        {oldest.map((res) => {
          return (
            <div key={res.id}>
              <Card 
              name={res.name}
              href={`/modal/${res.id}`}
              />
               
            </div>
          );
        })}
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
