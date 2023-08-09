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
        const newWs = new WebSocket('ws://localhost:8080');

        newWs.addEventListener('open', () => {
            console.log('Connected to WebSocket server');
            if (boardID)
                newWs.send(boardID);
        });

        newWs.addEventListener('message', async (event) => {
            const response = JSON.parse(event.data);
            const data_db: Data = {
                columns: { ...response.columns },
                tasks: [...response.tasks],
            };
            setData(data_db);
            setNameBoard(response.name);
            setOwnerBoard(response.user_id);
            setBackgroundLink(response.background);

            // Fetch members asynchronously and update state
            const memberFilter: Member[] = response.members;
            const updatedMembers = await Promise.all(memberFilter.map(async (member) => {
                try {
                    const member_response = await axios.get(`http://localhost:3001/users?id=${member.user_id}`);
                    const memberWithEmail = {
                        ...member,
                        email: member_response.data?.[0].user.email,
                        color: member_response.data?.[0].user.color,
                    };
                    return memberWithEmail;
                } catch (error) {
                    console.error(`Error fetching user with id ${member.user_id}:`, error);
                    return null; // You can choose how to handle errors here
                }
            }));

            // Cast the array to the correct type before passing to setMembers
            setMembers(updatedMembers.filter((member): member is Member => member !== null));
            setLoading(false);
        });

        return () => {
            newWs.close();
        };
    }, [boardID]);

    const check = user_redux && members.filter(member => member.user_id === user_redux.id).length > 0;

    if (loading) {
        return <Loading />;
    }

    if (check) {
        return (
            <div style={{ 'backgroundImage': `url(${background_link})`, 'backgroundPosition': "center", 'backgroundSize': 'cover', 'backgroundRepeat': 'no-repeat', 'backgroundAttachment': 'fixed' }}>
                <NavbarUser />
                <div className="flex">
                    <Sidebar />
                    <div className="charts">
                        <Heading members={members} nameBoard={nameBoard} ownerBoard={ownerBoard} />
                        <BoardChart data={data} members={members} />
                    </div>
                </div>
            </div>
        )
    }
    return <NotFound />;
}
export default Charts;