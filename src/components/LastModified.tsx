import React from "react";

interface LastModifiedProps {
  date: string;
}

const LastModified: React.FC<LastModifiedProps> = ({ date }) => {
  return (

    <span className="text-sm text-yellow-500 mb-4 font-medium">
      Dernières modifications : {date}
    </span>

  );
};

export default LastModified;