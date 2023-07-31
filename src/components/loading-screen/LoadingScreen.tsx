import { LinearProgress } from "@mui/material";
import Iconify from "../iconify";

const icons = [
  <Iconify icon="eva:google-fill" color="#DF3E30" />,
  <Iconify icon="eva:google-fill" color="#DF3E30" />,
  <Iconify icon="eva:google-fill" color="#DF3E30" />,
  <Iconify icon="eva:google-fill" color="#DF3E30" />,
  <Iconify icon="eva:google-fill" color="#DF3E30" />,
  <Iconify icon="eva:google-fill" color="#DF3E30" />,
  <Iconify icon="eva:google-fill" color="#DF3E30" />,
  <Iconify icon="eva:google-fill" color="#DF3E30" />,
  <Iconify icon="eva:google-fill" color="#DF3E30" />,
  <Iconify icon="eva:google-fill" color="#DF3E30" />,
];

export default function LoadingScreen() {
  return <LinearProgress />;
}
