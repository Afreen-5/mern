import React from "react";

interface StatCardProps {
    title: string;
    value: number;
}

const StatCard: React.FC<StatCardProps> = ({title, value}) => {
    return(
        <div>
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    )
}

export default StatCard;