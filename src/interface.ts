export interface Task {
    id: string;
    Task: string;
    Due_Date: Date;
    status: string;
    members_task: string[];
    jobs: {
        [key: string]: Job;
    },
    labels: {
        [key: string]: Label;
    },
    description: string;
}

export interface Member {
    user_id: string,
    email: string,
}

export interface Job {
    name: string,
    done: number
}

export interface Label {
    color: string,
    title: string,
    check: number
}
