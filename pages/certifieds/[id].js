import * as React from "react";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import { Typography } from "@mui/material";
import { QRCode } from "react-qrcode-logo";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import moment from "moment/moment";

export default function Cert({ user }) {
  const date = new Date(user.timestamp);
  console.log(moment(date).format("DD MMMM of YYYY"));
  //change this value in production
  const qrVaule = `http://localhost:3000/certifieds/${user.id}`;
  return (
    <Paper sx={{ height: 650, with: 1020, m: 5 }} elevation={6}>
      <Grid container padding={5} sx={{ justifyContent: "center" }}>
        <Grid xs={2}>
          <Image
            src="/img/vrin_logo.png"
            alt="Picture of the author"
            width={180}
            height={180}
          />
        </Grid>
        <Grid xs={8}>
          <Grid>
            <Typography variant="h3" align="center">
              UNIVERSIDAD NACIONAL MICAELA BASTIDAS DE APURIMAC
            </Typography>
            <br />
            <Typography variant="h4" color="GrayText" align="center">
              Vicerrectorado de investigacion
            </Typography>
          </Grid>
          <Grid></Grid>
        </Grid>
        <Grid bg xs={2}>
          <Image
            src="/img/logo_unamba.png"
            alt="Picture of the author"
            width={180}
            height={200}
          />
        </Grid>
        <Grid xs={8}>
          <Typography
            variant="h4"
            align="center"
            p={5}
            sx={{ textDecoration: "" }}
          >
            {user.name}
          </Typography>
        </Grid>

        <Grid xs={12} p={5}>
          <Typography variant="h5" align="center">
            A sido participe en el evento {user.event} llevado acabo en el{" "}
            {moment(date).format("DD MMM YYYY")}
          </Typography>
        </Grid>

        <Grid xs={3}></Grid>
        <Grid xs={3} px={1}>
          <Image
            src="/img/firma_vicerrector.png"
            alt="Picture of the author"
            width={300}
            height={150}
          />
        </Grid>
        <Grid xs={3}>
          <Image
            src="/img/firma_rector.png"
            alt="Picture of the author"
            width={1020}
            height={520}
          />
        </Grid>
        <Grid xs={1}></Grid>
        <Grid xs={1}>
          <QRCode
            value={qrVaule}
            size={150}
            logoHeight={100}
            logoImage="/img/vrin_logo.png"
            logoWidth={100}
            logoOpacity={0.5}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
export async function getStaticPaths() {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  const paths = querySnapshot.docs.map((doc) => ({
    params: {
      id: doc.id,
    },
  }));
  // const paths = [{ params: { id: "1" } }];
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  const userData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const user = userData.find((element) => element.id == params.id);
  console.log(user);
  // const user = JSON.stringify(userC);
  // console.log(user);
  // Pass post data to the page via props
  return { props: { user } };
}
