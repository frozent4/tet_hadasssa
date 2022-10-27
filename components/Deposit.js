import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import moment from "moment/moment";
import { Box } from "@mui/material";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({ total }) {
  return (
    <React.Fragment>
      <Title>TOTAL</Title>
      <Typography component="p" variant="h2">
        {total}
      </Typography>
      <Typography color="primary" component="p" variant="h6">
        Certificados
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {moment().format("DD MMM, YYYY")}
      </Typography>
      <Box alignItems={"center"}>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </Box>
    </React.Fragment>
  );
}
