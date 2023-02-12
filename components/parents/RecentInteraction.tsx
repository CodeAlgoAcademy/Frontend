import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Props {}

const recents = [
  {
    image: '3DAvatar3.png',
    name: 'elitrevor',
    id: '1',
  },
  {
    image: '3DAvatar2.png',
    name: 'hannah12',
    id: '2',
  },
  {
    image: '3DAvatar1.png',
    name: 'ilovemydog',
    id: '3',
  },
  {
    image: '3DAvatar2.png',
    name: 'hannah12',
    id: '4',
  },
  {
    image: '3DAvatar2.png',
    name: 'hannah12',
    id: '5',
  },
];

const RecentInteraction = ({}: Props) => {
  const [recentIndex, setRecentIndex] = useState(0);
  const [sliceStart, setSliceStart] = useState(recentIndex * 3);
  const [sliceEnd, setSliceEnd] = useState(recentIndex * 3 + 3);
  const maxIndex = Math.ceil(recents.length / 3);
  useEffect(() => {
    setSliceStart(() => recentIndex * 3);
    setSliceEnd(() => recentIndex * 3 + 3);
  }, [recentIndex]);
  return (
    <>
      <p className="mt-14 text-sm font-light">Recent interactions (last 30 days)</p>
      <ul className="flex gap-3 mt-5 w-[320px] overflow-hidden">
        {recents.slice(sliceStart, sliceEnd).map(({ image, name, id }) => (
          <li className="min-w-[100px] flex flex-col gap-1 text-center items-center" key={id}>
            <Image src={`/assets/${image}`} alt={image} height={100} width={100} />
            <p className="text-[#2073FA] text-sm">{name}</p>
            <Image
              src="/assets/message.svg"
              alt="messages"
              width={18}
              height={18}
              className="blue-svg"
            />
          </li>
        ))}
      </ul>
      <p className="text-[#A8ABB0] absolute text-sm bottom-5 text-center left-0 opacity-80 w-full">
        All mail communication will go to the user’s parent account.{' '}
      </p>
      {recentIndex !== maxIndex - 1 && (
        <svg
          width="12"
          height="22"
          viewBox="0 0 12 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute hover:scale-x-125 hover:opacity-100 opacity-80 right-6 top-[50%] translate-y-[-50%]"
          onClick={() => {
            setRecentIndex(() => recentIndex + 1);
          }}
        >
          <path
            d="M0.748372 22C0.558522 22 0.364234 21.9262 0.21854 21.7829C-0.0728468 21.4962 -0.0728468 21.0272 0.21854 20.7405L10.1921 10.9251L0.364234 1.25736C0.072847 0.970698 0.072847 0.501622 0.364234 0.214981C0.655622 -0.0716603 1.13244 -0.0716603 1.42383 0.214981L11.7815 10.4039C12.0728 10.6905 12.0728 11.1596 11.7815 11.4462L1.27814 21.7828C1.13244 21.9261 0.9382 22 0.74835 22L0.748372 22Z"
            fill="#2073FA"
          />
        </svg>
      )}
      {recentIndex !== 0 && (
        <svg
          width="12"
          height="22"
          viewBox="0 0 12 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute hover:scale-x-125 hover:opacity-100 opacity-80 rotate-180 left-6 top-[50%] translate-y-[-50%]"
          onClick={() => {
            setRecentIndex(() => recentIndex - 1);
          }}
        >
          <path
            d="M0.748372 22C0.558522 22 0.364234 21.9262 0.21854 21.7829C-0.0728468 21.4962 -0.0728468 21.0272 0.21854 20.7405L10.1921 10.9251L0.364234 1.25736C0.072847 0.970698 0.072847 0.501622 0.364234 0.214981C0.655622 -0.0716603 1.13244 -0.0716603 1.42383 0.214981L11.7815 10.4039C12.0728 10.6905 12.0728 11.1596 11.7815 11.4462L1.27814 21.7828C1.13244 21.9261 0.9382 22 0.74835 22L0.748372 22Z"
            fill="#2073FA"
          />
        </svg>
      )}
    </>
  );
};

export default RecentInteraction;
