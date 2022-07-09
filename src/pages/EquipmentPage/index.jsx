import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  Pagination,
  PaginationItem,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { apiState } from "../../apiState";
import { useRecoilState } from "recoil";

const EquipmentPage = () => {
  let params = useParams();
  const [state] = useRecoilState(apiState);
  const [instructor, setInstructor] = useState();
  const [equipment, setEquipment] = useState();
  const [page, setPage] = useState();

  useEffect(() => {
    async function getData() {
      const response = await state.getEquipment();
      setEquipment(response.data);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const response = await state.getEquipment(
        "/api/eqipments/?offset=" + (page - 1) * 4
      );
      setEquipment(response.data);
    }
    getData();
  }, [page]);

  if (!equipment) {
    return <Loader />;
  }

  if (!equipment?.count)
    return (
      <Container sx={{ pb: 8 }} maxWidth="md">
        Элементов нет
      </Container>
    );

  return (
    <Container
      sx={{ pb: 8 }}
      maxWidth="md"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      {equipment.results.map((el) => (
        <Card style={{ padding: "20px", minHeight: "50px" }}>
          <Typography gutterBottom variant="h5">
            {el.equip}
          </Typography>
          <Typography gutterBottom>В количестве {el.amount}</Typography>
        </Card>
      ))}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(equipment?.count / 4)}
          color="secondary"
          renderItem={(item, idx) => (
            <PaginationItem
              key={idx}
              component={Button}
              {...item}
              onClick={(e) => {
                item.onClick(e);
                setPage(item.page);
              }}
            />
          )}
        />
      </div>
    </Container>
  );
};

export default EquipmentPage;
