import React from "react";

const History = () => {
  const data = [
    {
      title: "Previous Document",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste nihil accusantium deleniti, architecto ut quisquam in id adipisci inventore ex.",
    },
    {
      title: "Previous Document",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste nihil accusantium deleniti, architecto ut quisquam in id adipisci inventore ex.",
    },
    {
      title: "Previous Document",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste nihil accusantium deleniti, architecto ut quisquam in id adipisci inventore ex.",
    },
    {
      title: "Previous Document",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste nihil accusantium deleniti, architecto ut quisquam in id adipisci inventore ex.",
    },
  ];
  return (
    <div className="text-[#E6EDF3] h-[45rem]  w-full">
      {data.map((data, index) => (
        <div className="w-4/5 mx-auto flex flex-row items-center">
          <img src="/assets/doc-icon.png" alt="icon" className='h-16 w-16'/>
          <div key={index} className="px-[1rem] py-[5px] my-3">
            <h3 className="font-[500] text-[18px] mb-[5px]">{data.title}</h3>
            <p>{data.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
