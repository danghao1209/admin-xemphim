"use client";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Text, Button, Grid, Row } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import ToastMessage, { success, error, warning } from "../../Toast";

const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("token");
};

export const DeleteUser = ({ filmId }: { filmId: string }) => {
  const router = useRouter();

  const handleDeleteFilm = async () => {
    try {
      const token = getTokenFromLocalStorage();
      if (!token) {
        router.push("/login");
        return;
      }
      const response: AxiosResponse = await axios.post(
        "http://localhost:6945/api/admin/delete/film",
        {
          _id: filmId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response.data);
      success("Xoá phim thành công");
      router.push("/films");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid.Container
      css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}
    >
      <Row justify="center" align="center">
        <Text b>Xác nhận</Text>
      </Row>
      <Row>
        <Text>Bạn có muốn xoá bộ phim này không?</Text>
      </Row>
      <Grid.Container justify="space-between" alignContent="center">
        <Grid>
          <Button size="sm" light>
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button size="sm" shadow color="error" onPress={handleDeleteFilm}>
            Delete
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};
