import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Job, Task } from '../../interface';
import JobsTask from './JobsTask';
interface CardProps {
    item: Task;
}
const JobsDialog: React.FC<CardProps> = ({ item }) => {
    const [isOpen, setOpen] = useState(false);
    const { boardID } = useParams<{ boardID?: string }>();

    const toggle = () => {
        setOpen((prev) => !prev);
    };

    const toggleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (isOpen) {
            setOpen(false);
        }
    };

    const process = (): number => {
        const value = Object.values(item.jobs);
        let processCount: number = 0;
        for (const item of value) {
            if (item.done === 1) processCount += 1;
        }
        const totalJobs = Object.keys(item.jobs).length;
        const percentage = (processCount / totalJobs) * 100;

        if (processCount === 0) return 0;
        else return Number(percentage.toFixed(2));
    }

    const editTask = async (jobs: { [key: string]: Job }) => {
        try {
            const response = await axios.put(`http://localhost:3001/task/edit`, {
                board_id: boardID,
                task: {
                    id: item.id,
                    Task: item.Task,
                    Due_Date: item.Due_Date,
                    status: item.status,
                    members_task: item.members_task,
                    jobs: jobs,
                    description: item.description,
                    labels: item.labels,
                }
            })
            const editedTask = response.data;
            console.log('Task updated successfully:', editedTask);
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    const done = (jobId: string) => {
        var clone = Object.assign({}, item.jobs);
        clone[jobId].done = 1;
        editTask(clone);
    };

    const unDone = (jobId: string) => {
        var clone = Object.assign({}, item.jobs);
        clone[jobId].done = 0; // Replace the existing label with the newLabel using the same id
        editTask(clone);
    };

    const processPercent: number = process();
    if (Object.keys(item.jobs).length > 0) {
        return (
            <div>
                <div className="description">
                    <div className="des-icon">
                        <svg width="30px" height="18px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#44546f"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-219.000000, -400.000000)" fill="#44546f"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M181.9,258 L165.1,258 L165.1,242 L173.5,242 L173.5,240 L163,240 L163,260 L184,260 L184,250 L181.9,250 L181.9,258 Z M170.58205,245.121 L173.86015,248.243 L182.5153,240 L184,241.414 L173.86015,251.071 L173.86015,251.071 L173.8591,251.071 L169.09735,246.536 L170.58205,245.121 Z" id="done-[#44546f]"> </path> </g> </g> </g> </g></svg>
                    </div>
                    <h3>Việc cần làm</h3>
                </div>
                <div className='job'>
                    <p>{processPercent}%</p>
                    <div className='full-process'>
                        <div className='process' style={{ width: processPercent + "%" }}></div>
                    </div>
                </div>
                <div className='job-popup'>
                    <JobsTask trigger={isOpen} close={toggleClose} item={item} />
                </div>
                <div className='list-jobs'>
                    {Object.entries(item.jobs).map(([jobId, job], index) => (
                        job.done === 1 ? (
                            <div className='job' key={jobId}>
                                <div className='tick-box btn' onClick={() => unDone(jobId)} style={{ background: "#0c66e4" }}>
                                    <svg fill="#ffffff" width="16px" height="16px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z"></path></g></svg>
                                </div>
                                <p style={{ textDecoration: "line-through" }}>{job.name}</p>
                            </div>
                        ) : (
                            <div className='job' key={jobId}>
                                <div className='tick-box btn' onClick={() => done(jobId)} style={{ background: 'transparent' }}></div>
                                <p>{job.name}</p>
                            </div>
                        )
                    ))}
                    <div className='job-add btn' onClick={toggle}>Thêm một mục</div>
                </div>
            </div>
        )
    }
    return <></>;
}

export default JobsDialog