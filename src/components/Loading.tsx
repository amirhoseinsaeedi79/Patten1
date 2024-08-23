import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-ownPurple-500 border-t-4 border-solid rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default Loading;