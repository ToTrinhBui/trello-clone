import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import NavbarUser from "../components/NavbarUser";
import Heading from "../components/Heading";
import Sidebar from "../components/Sidebar";
import BoardChart from "../components/charts/BoardChart";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import NotFound from "./NotFound";
import { Member, Task } from "../interface";
import Loading from "../components/Loading";

import "../styles/index.css";
import "../styles/charts.css";

interface Data {
    columns: Columns;
    tasks: Task[];
}
interface Columns {
    [key: string]: {
        title: string;
    };
}
const Charts = () => {
    const [data, setData] = useState<Data>({
        columns: {},
        tasks: [],
    });
    const [members, setMembers] = useState<Member[]>([]);
    const [nameBoard, setNameBoard] = useState<string>('Name board');
    const [ownerBoard, setOwnerBoard] = useState<string>('');
    const [background_link, setBackgroundLink] = useState<string>('');
    const { boardID } = useParams<{ boardID?: string }>();
    const user_redux = useSelector(selectUser).user;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then(() => setLoading(false));
    }, [boardID]);

    if (loading) {
        return <Loading/>;
    }
    
    async function fetchData() {
        try {
            const response = await axios.get(`http://localhost:3001/boards?id=${boardID}`);
            const data_db: Data = {
                columns: { ...response.data?.[0].columns },
                tasks: [...response.data?.[0].tasks],
            };
            setData(data_db);
            setNameBoard(response.data?.[0].name);
            setOwnerBoard(response.data?.[0].user_id);
            setBackgroundLink(response.data?.[0].background);
            const memberFilter = response.data?.[0].members;
            const updatedMembers = [];
            for (const member of memberFilter) {
                try {
                    const member_response = await axios.get(`http://localhost:3001/users?id=${member.user_id}`);
                    const memberWithEmail = {
                        ...member,
                        email: member_response.data?.[0].user.email,
                        color: member_response.data?.[0].user.color,
                    };
                    updatedMembers.push(memberWithEmail);
                } catch (error) {
                    console.error(`Error fetching user with id ${member.user_id}:`, error);
                }
            }
            setMembers(updatedMembers);
        } catch (error) {
            console.error(error);
        }
    }

    const check = members.filter(member => member.user_id === user_redux.id).length > 0;

    if (user_redux && check) {
        return (
            <div style={{ 'backgroundImage': `url(${background_link})`, 'backgroundPosition': "center", 'backgroundSize': 'cover', 'backgroundRepeat': 'no-repeat', 'backgroundAttachment': 'fixed' }}>
                <NavbarUser />
                <div className="flex">
                    <Sidebar />
                    <div className="charts">
                        <Heading members={members} fetchData={fetchData} nameBoard={nameBoard} ownerBoard={ownerBoard} />
                        <BoardChart data={data} members={members} />
                    </div>
                </div>
            </div>
        )
    }
    return <NotFound />;
}
export default Charts;