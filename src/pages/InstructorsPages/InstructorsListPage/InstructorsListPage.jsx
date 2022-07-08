import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";

const InstructorListPage = () => {
  const [instructors, setInstructors] = useState();
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/trainers/?limit=999`)
      .then((res) => {
        if (res.status === 200) {
          setInstructors(res.data);
          setTimeout(() => {
            setLoading(false);
          }, 700);
          console.log(res.data);
        }
      });
  }, [refetch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container sx={{ pb: 8 }} maxWidth="md">
      <Grid container direction="column" alignItems="center" sx={{ mb: 2 }}>
        <Typography gutterBottom variant="h3">
          Наши фитнес-тренеры
        </Typography>
      </Grid>
      <Grid container spacing={4}>
        {instructors?.results.map((instructor) => (
          <Grid key={instructor.id} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {instructor.name} {instructor.surname} <br />
                  Возраст {instructor.age}
                </Typography>
                <Typography style={{ wordBreak: "break-all" }}>
                  Достижения: {instructor.achivments}
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default InstructorListPage;
