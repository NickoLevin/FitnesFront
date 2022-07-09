import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { apiState } from "../../apiState";
import { useRecoilState } from "recoil";
import { useSnackbar } from "notistack";

export const Form = ({ refetch }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [state] = useRecoilState(apiState);
  const { enqueueSnackbar } = useSnackbar();

  const validateYears = (value) => {
    return isNaN(Number(value)) || Number(value) < 16 || Number(value) > 120;
  };

  const validateRequired = (value) => {
    return !value.length;
  };

  const handleChangeInput = (e) => {
    switch (e.target.name) {
      case "years":
        setErrors({
          ...errors,
          [e.target.name]: validateYears(e.target.value),
        });
        break;
      default:
        setErrors({
          ...errors,
          [e.target.name]: validateRequired(e.target.value),
        });
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await state.createTrainer({
        age: formData.years,
        name: formData.name,
        surname: formData.surname,
        achivments: formData.achievments,
      });
      enqueueSnackbar("Тренер успешно создан", { variant: "success" });
      refetch();
    } catch {
      enqueueSnackbar("Ошибка создания тренера", { variant: "error" });
    }
  };

  return (
    <form style={{ margin: "40px auto 0", width: "80%" }}>
      <Grid container rowSpacing={2}>
        <Grid item style={{ textAlign: "center", width: "100%" }}>
          <Typography variant="h5">Добавить тренера</Typography>
        </Grid>
        <Grid item container direction="column" rowSpacing={2}>
          <Grid item style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              id="standard-basic"
              label="Имя"
              name="name"
              variant="standard"
              style={{ width: "max(80%, 200px)" }}
              onChange={handleChangeInput}
              error={errors.name}
              placeholder="Имя тренера"
            />
          </Grid>

          <Grid item style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              id="standard-basic"
              label="Фамилия"
              name="surname"
              variant="standard"
              onChange={handleChangeInput}
              style={{ width: "max(80%, 200px)" }}
              error={errors.surname}
              placeholder="Фамилия тренера"
            />
          </Grid>

          <Grid item style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              id="standard-basic"
              label="Возраст"
              name="years"
              variant="standard"
              placeholder="16-120"
              onChange={handleChangeInput}
              style={{ width: "max(80%, 200px)" }}
              error={errors.years}
            />
          </Grid>
          <Grid item style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              label="Достижения"
              variant="filled"
              multiline
              name="achievments"
              rows={2}
              maxRows={3}
              onChange={handleChangeInput}
              placeholder="Достижения тренера"
              style={{ width: "max(80%, 200px)" }}
              error={errors.achievments}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item>
            <Button
              disabled={!Object.values(errors).every((el) => !el)}
              onClick={handleSubmit}
            >
              Создать
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
