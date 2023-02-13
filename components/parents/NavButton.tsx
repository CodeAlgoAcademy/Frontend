import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React,{useEffect,useState} from 'react';

interface Props {
  image?: string | JSX.Element;
  title: string;
  notification?: number;
  url: string;
  isIcon?: boolean;
}
const NavButton = ({image,title,notification,url,isIcon}: Props) => {
  const [active,setActive] = useState(false);
  const [detailsDisplay,setDetailsDisplay] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setActive(() => url === router.pathname);
  },[router.pathname,url]);

  return (
    <Link href={`${url}`}>
      <button
        className="py-[14px] px-7 flex relative text-[26px] items-center justify-center gap-5 text-white w-full hover:bg-slate-50 rounded-3xl"
        style={{
          backgroundColor: active ? '#2073fa' : '',
          padding: !isIcon ? '14px 28px' : '12px',
          borderRadius: !isIcon ? '24px' : '6px',
          justifyContent: !isIcon ? 'left' : 'center',
        }}
        onMouseEnter={() => setDetailsDisplay(() => true)}
        onMouseLeave={() => setDetailsDisplay(() => false)}
      >
        {typeof (image) === "string"
          ?
          <Image
            src={`/assets/${image}`}
            alt={title}
            width={20}
            height={20}
            className={active ? '' : 'blue-svg'}
          />
          :
          <span className={active ? '' : 'blue-svg' + ""}>
            {image}
          </span>
        }
        {!isIcon && (
          <>
            <p className="font-medium select-none capitalize" style={{color: active ? '#fff' : ''}}>
              {title}
            </p>
            {notification && (
              <span className="w-5 h-5 rounded-full text-sm text-white bg-[#FB4DAB]">{`${notification}`}</span>
            )}
          </>
        )}
        {isIcon && detailsDisplay && (
          <div className=" bg-white border detail-card border-slate-200 min-w-[80px] text-xs font-medium py-2 px-4 rounded-xl absolute top-0 left-[120%] float-right">
            {title}
          </div>
        )}
      </button>
    </Link>
  );
};

export default NavButton;
