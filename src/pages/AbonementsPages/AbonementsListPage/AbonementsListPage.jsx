import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
} from "@mui/material";
import Loader from "../../../components/Loader/Loader";
import AbonementCard from "../../../components/AbonementCard/AbonementCard";
import { apiState } from "../../../apiState";
import { useRecoilState } from "recoil";

const AbonementsListPage = () => {
  const [abonements, setAbonements] = useState();
  const [state] = useRecoilState(apiState);
  const [sort, setSort] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const response = await state.getAbonements();
      setAbonements(response?.data);
    }
    getData();
  }, []);

  if (!abonements?.results) {
    return <Loader />;
  }
  console.log(abonements);
  return (
    <Container sx={{ pb: 8 }} maxWidth="md">
      <Grid container direction="column" alignItems="center" sx={{ mb: 2 }}>
        <Typography gutterBottom variant="h3">
          Наши фитнес-тренеры
        </Typography>
      </Grid>
    </Container>
  );
};

export default AbonementsListPage;
