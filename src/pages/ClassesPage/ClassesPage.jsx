import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import Loader from "../../components/Loader/Loader";

import axios from "axios";

const ClassesPage = () => {
  const [classes, setClasses] = useState();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/grouptraining/`)
      .then((res) => {
        if (res.status === 200) {
          setClasses(res.data);
          setTimeout(() => {
            setLoading(false);
          }, 700);
          console.log(res.data);
        }
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container sx={{ pb: 8 }} maxWidth="md">
      <Grid container direction="column" alignItems="center" sx={{ mb: 2 }}>
        <Typography gutterBottom variant="h3">
          Занятия
        </Typography>
      </Grid>
      <Grid container sx={{ mb: 2 }}>
        <Grid item>
          <Button
            onClick={() => {
              setFilter(!filter);
              console.log(filter);
            }}
            variant="contained"
          >
            {filter ? "Показать только актуальные" : "Показать все"}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {classes.results
          .filter((el) => {
            if (!filter) return new Date(el.datetime) > new Date();
            return true;
          })
          .map((classe) => (
            <Grid key={classe.id} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    "https://medaboutme.ru/upload/iblock/a2b/shutterstock_578554774.jpg"
                  }
                  alt={classe.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h1">
                    {classe?.grouptraining}
                  </Typography>
                  <Typography variant="h6">{classe.gr_description}</Typography>
                  <Typography gutterBottom component="h3">
                    Дата: {new Date(classe.datetime).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ClassesPage;
