import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import EditTask from './EditTask';
import { Member, Task } from '../../interface';

interface TaskCardProps {
    item: Task;
    index: number;
    members: Member[];
    status_title: string;
    refresh: Function;
}

const TaskInformation = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 0 10px;
min-height: 45px;
border-radius: 8px;
max-width: 230px;
background: white;
margin-top: 10px;
font-size: 13px;
box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

.secondary-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 12px;
  font-weight: 400px;
  color: #7d7d7d;
`;

const TaskCard: React.FC<TaskCardProps> = ({ item, index, members, status_title, refresh }) => {
    return (
        <EditTask item={item} members={members} status_title={status_title} refresh={refresh}>
            <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <TaskInformation>
                            <p>{item.Task}</p>
                            <div className="secondary-details">
                                <p>
                                    <span>
                                        {new Date(item.Due_Date).toLocaleDateString("en-GB")}
                                    </span>
                                </p>
                            </div>
                        </TaskInformation>
                    </div>
                )}
            </Draggable>
        </EditTask>
    );
};

export default TaskCard;
