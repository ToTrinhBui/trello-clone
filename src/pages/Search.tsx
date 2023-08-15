import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarUser from "../components/NavbarUser";
import Sidebar from "../components/Sidebar";

import '../styles/index.css';
import '../styles/dashboard.css';
import Boards from "../components/dashboard/Boards";
import Title from "../components/dashboard/Title";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import NotFound from "./NotFound";
import { useLocation } from "react-router-dom";

interface Board {
  id: string,
  name: string,
  background: string,
}
interface Background {
  [key: string]: string
}
const Search = () => {
  const sidebarStyles: React.CSSProperties & { "--color": string } = {
    backgroundColor: "#fff",
    color: '#172B4D',
    "--color": "#626f86",
  };

  const navbarStyles: React.CSSProperties & { "--nav-color": string; "--filter-logo": string; "--svg-fill": string } = {
    backgroundColor: "#fff",
    "--nav-color": "#44546f",
    "--filter-logo": 'brightness(0) saturate(100%) invert(30%) sepia(53%) saturate(323%) hue-rotate(179deg) brightness(91%) contrast(88%)',
    "--svg-fill": '#626f86',
  };
  
  const [data, setData] = useState<Board[]>([]);
  const [backgrounds, setBacgrounds] = useState<Background>({});
  const user_redux = useSelector(selectUser).user;
  const queryParams = useLocation().search.slice(1)

  useEffect(() => {
    fetchData();
  }, [queryParams])

  async function fetchData() {
    try {
      const response = await axios.get(`http://localhost:3001/boards?user_id=${user_redux.id}`);
      const filterBoards: Board[] = [];
      for (const board of response.data) {
        if (board.name.toLowerCase().includes(queryParams.toLowerCase())) {
          filterBoards.push(board);
        }
      }
      setData(filterBoards);
      const response2 = await axios.get(`http://localhost:3001/backgrounds`);
      setBacgrounds(response2.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (user_redux) {
    return (
      <>
        <div>
          <NavbarUser style={navbarStyles} />
          <div className="flex">
            <Sidebar style={sidebarStyles} />
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