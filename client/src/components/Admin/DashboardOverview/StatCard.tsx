import React from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value}) => {
  return (
    <div className={`bg-gray-500 text-white p-6 rounded-lg shadow-md`}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

export default StatsCard;
