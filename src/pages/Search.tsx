import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarUser from "../components/NavbarUser";
import Sidebar from "../components/Sidebar";
import { URL_API } from "../api";
import '../styles/index.css';
import '../styles/dashboard.css';
import Boards from "../components/dashboard/Boards";
import Title from "../components/dashboard/Title";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import NotFound from "./NotFound";
import { useLocation } from "react-router-dom";
import { useTheme } from "../theme/ThemeProvider";

interface Board {
  id: string,
  name: string,
  background: string,
}
interface Background {
  [key: string]: string
}
const Search = () => {
  const { theme } = useTheme();
  
  const [data, setData] = useState<Board[]>([]);
  const [backgrounds, setBacgrounds] = useState<Background>({});
  const user_redux = useSelector(selectUser).user;
  const queryParams = useLocation().search.slice(1)

  useEffect(() => {
    fetchData();
  }, [queryParams])

  async function fetchData() {
    try {
      const response = await axios.get(`${URL_API}/boards?user_id=${user_redux.id}`);
      const filterBoards: Board[] = [];
      for (const board of response.data) {
        if (board.name.toLowerCase().includes(queryParams.toLowerCase())) {
          filterBoards.push(board);
        }
      }
      setData(filterBoards);
      const response2 = await axios.get(`${URL_API}/backgrounds`);
      setBacgrounds(response2.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (user_redux) {
    return (
      <>
        <div id={theme}>
          <NavbarUser />
          <div className="flex">
            <Sidebar />
            <div className="dashboard">
              <div className="dashboard-inner">
                <Title />
                <Boards props={data} backgrounds={backgrounds} search={true} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <NotFound />;
}

export default Search