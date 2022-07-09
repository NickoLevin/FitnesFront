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
      <Grid
        sx={{ mb: 2 }}
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <ToggleButtonGroup
            color="primary"
            value={sort}
            exclusive
            onChange={() => setSort(!sort)}
          >
            <ToggleButton value={true}>Сначала больше</ToggleButton>
            <ToggleButton value={false}>Сначала меньше</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <Grid container spacing={4} direction="column">
        {abonements?.results
          .sort((a, b) => {
            if (!sort) return b.price - a.price;
            return a.price - b.price;
          })
          .map((abonement) => (
            <Grid item key={abonement.id}>
              <AbonementCard abonement={abonement} key={abonement.id} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default AbonementsListPage;
