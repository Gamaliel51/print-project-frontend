import React from "react";

const History = (props) => {

  const history = props.history
  const matric = props.matric

  const returnData = () =>{
    
    const data = history.map((item) => {

      let name = item
      let desc = ''

      if(name.includes('docx') || name.includes('doc')){
        name = name.replace(matric, '').replace('docx', '').replace('doc', '')
        desc = "Word Document"
      }
      if(name.includes('pdf')){
        name = name.replace(matric, '').replace('pdf', '')
        desc = "PDF Document"
      }

      return {title: name, description: desc}
    })

    return data
  }
  
  const data = returnData()

  return (
    <div className="text-[#E6EDF3] h-[45rem] w-4/5 mx-auto">
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
