import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard.tsx';
import AddTask from './AddTask.tsx';
import { useParams } from 'react-router-dom';
import AddColumn from './AddColumn.tsx';
import EditColumn from './EditColumn.tsx';
import { URL_API } from '../../api.js';
const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  max-height: calc(100vh - 180px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: #f1f2f4;
  min-width: 250px;
  border-radius: 12px;
  padding: 10px 10px;
`;

const TaskColumnStyles = styled.div`
  margin: 20px;
  display: flex;
  gap: 20px;
  width: 100%;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
  min-height: 20px;
`;

const Board = (props) => {
    const [columns, setColumns] = useState('');
    const { boardID } = useParams();

    useEffect(() => {
        setColumns(props.data.columns);
        // setColumns(columnsFromBackend)
    }, [props.data]);

    const updateTaskStatus = async (taskId, newStatus, updatedColumns) => {
        try {
            const response = await axios.put(`${URL_API}/task/update`, {
                board_id: boardID,
                task_id: taskId,
                status: newStatus,
            });
            const updatedTask = response.data;
            console.log('Task updated successfully:', updatedTask);
            setColumns(updatedColumns);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            const updatedColumns = {
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            };
            setColumns(updatedColumns); // Update the columns state before calling updateTaskStatus
            updateTaskStatus(removed.id, destination.droppableId, updatedColumns);
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            const updatedColumns = {
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            };
            setColumns(updatedColumns);
            // updateTaskStatus(removed.id, source.droppableId);
        }
    };

    return (
        <>
            {props ? (
                <div className='board'>
                    <DragDropContext
                        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
                    >
                        <Container>
                            <TaskColumnStyles>
                                {Object.entries(columns)?.map(([columnId, column], index) => {
                                    return (
                                        <Droppable key={index} droppableId={columnId}>
                                            {(provided, snapshot) => (
                                                <TaskList
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                >
                                                    <div className='task-list-header'>
                                                        <Title>{column.title}</Title>
                                                        <EditColumn columnId={columnId} title={column.title} />
                                                    </div>
                                                    {column.items?.map((item, index) => (
                                                        <TaskCard key={index} item={item} index={index} members={props.members} status_title={column.title} />
                                                    ))}
                                                    {provided.placeholder}
                                                    <AddTask statusID={columnId} />
                                                </TaskList >
                                            )}
                                        </Droppable>
                                    );
                                })}
                                <AddColumn />
                            </TaskColumnStyles>
                        </Container>
                    </DragDropContext>
                </div>
            ) :
                <div>Loading</div>}
        </>
    );
};

export default Board;
