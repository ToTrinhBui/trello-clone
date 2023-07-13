import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { columnsFromBackend } from './KanbanData';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  max-height: 100%;
  display: flex;
  flex-direction: column;
  background: #f1f2f4;
  min-width: 250px;
  border-radius: 12px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 20px;
  display: flex;
  width: 100%;
  min-height: 80px;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
  min-height: 20px;
`;

// interface BoardProps {
//     item: {
//         [key: string]: any;
//         title: string;
//         items: any[];
//     };
// }

const Board = (props) => {
    const [columns, setColumns] = useState('');
    useEffect(() => {
        setColumns(props.data.columns);
        // setColumns(columnsFromBackend)
    }, [props.data]);
    console.log(columns)
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
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    };
    return (
        <>
            {props ? (

                <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
                >
                    <Container>
                        <TaskColumnStyles>
                            {Object.entries(columns)?.map(([columnId, column], index) => {
                                return (
                                    <Droppable key={columnId} droppableId={columnId}>
                                        {(provided, snapshot) => (
                                            <TaskList
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                <Title>{column.title}</Title>
                                                {column.items?.map((item, index) => (
                                                    <TaskCard key={item} item={item} index={index} />
                                                ))}
                                                {provided.placeholder}
                                            </TaskList>
                                        )}
                                    </Droppable>
                                );
                            })}
                        </TaskColumnStyles>
                    </Container>
                </DragDropContext>
            ) :
                <div>Loading</div>}
        </>
    );
};

export default Board;
