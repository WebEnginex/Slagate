import React from "react";

interface LastModifiedProps {
  date: string;
}

const LastModified: React.FC<LastModifiedProps> = ({ date }) => {
  return (
    <div className="text-sm text-gray-400 mb-4">
      Dernières modifications : <span className="font-medium">{date}</span>
    </div>
  );
};

export default LastModified;