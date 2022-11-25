import React from 'react';

type dataType = {
    name: string;
        progress: string;
        bar: number;
        Quiz: string;
        Status: string;
}


type progressDataType = {
        name: string;
        progress: string;
        bar: number;
        Quiz: string;
        Status: string;
    }[];

export default function StudentProgress({progressData}: {progressData:progressDataType}) {

  return (
    
    <div className='px-[2rem]'>
        <div className='px-[2rem] border-t-2'>
            <div className='sm:text-[12px]  lg:text-[18px] grid grid-cols-4 auto-cols-max justify-items-center gap-y-4 mt-[2rem]'>
                <p className=' font-bold px-4'>Assigned To</p>
                <p className=' font-bold pl-4 pr-6 whitespace-nowrap'>Lesson Progress</p>
                <p className=' font-bold px-4'>Quiz</p>
                <p className=' font-bold px-4'>Status</p>
                {progressData.map((data) => {
                    return (
                        <>
                            <div>{data.name}</div>
                            <div>{data.progress}</div>
                            <div>{data.bar}</div>
                            <div>{data.Quiz}</div>
                        </>
                    )
                })}
            </div>
       </div>
    </div>
  );
}
