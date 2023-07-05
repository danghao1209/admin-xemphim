"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  createTheme,
  NextUIProvider,
  Navbar,
  Button,
  Link,
  Text,
} from "@nextui-org/react";
import Layout from "./layout";
import Content from "./content";

const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("token");
};
interface CountResponse {
  userCount: number;
  filmCount: number;
  dataUser: any;
  dataPhim: any;
}
const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
  },
});

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<CountResponse>();
  useEffect(() => {
    (async () => {
      try {
        const token = getTokenFromLocalStorage();
        if (!token) {
          router.push("/login");
        } else {
          const response = await axios.post<CountResponse>(
            "http://localhost:1209/api/admin/count",
            {},
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const { userCount, filmCount, dataUser, dataPhim } = response.data;
          setData({ userCount, filmCount, dataUser, dataPhim });
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <NextUIProvider theme={darkTheme}>
      <Layout>
        <Navbar isCompact isBordered variant="sticky">
          <Navbar.Brand>
            {/* <AcmeLogo /> */}
            <Text b color="inherit" hideIn="xs">
              ADMIN
            </Text>
          </Navbar.Brand>
          <Navbar.Content hideIn="xs" variant="underline">
            <Navbar.Link href="/">Home</Navbar.Link>
            <Navbar.Link href="/films">Films</Navbar.Link>
            <Navbar.Link href="/users">Users</Navbar.Link>
          </Navbar.Content>
          <Navbar.Content>
            <Navbar.Item>
              <Button auto flat as={Link} href="#">
                Đăng Xuất
              </Button>
            </Navbar.Item>
          </Navbar.Content>
        </Navbar>
        <Content data={data}></Content>
      </Layout>
    </NextUIProvider>
  );
}
