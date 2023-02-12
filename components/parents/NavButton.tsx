import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Props {
  image?: string;
  title: string;
  notification?: number;
  name: string;
  isIcon?: boolean;
}
const NavButton = ({ image, title, notification, name, isIcon }: Props) => {
  const [active, setActive] = useState(false);
  const [detailsDisplay, setDetailsDisplay] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setActive(() => `/parents${name ? '/' + name : ''}` === router.pathname);
  }, [router.pathname, name]);

  return (
    <Link href={`/parents/${name}`}>
      <button
        className="py-[14px] px-7 flex relative items-center justify-center gap-5 w-full hover:bg-slate-50 rounded-3xl"
        style={{
          backgroundColor: active ? '#2073fa' : '',
          padding: !isIcon ? '14px 28px' : '12px',
          borderRadius: !isIcon ? '24px' : '6px',
          justifyContent: !isIcon ? 'left' : 'center',
        }}
        onMouseEnter={() => setDetailsDisplay(() => true)}
        onMouseLeave={() => setDetailsDisplay(() => false)}
      >
        <Image
          src={`/assets/${image}`}
          alt={title}
          width={20}
          height={20}
          className={active ? '' : 'blue-svg'}
        />
        {!isIcon && (
          <>
            <p className="font-medium select-none" style={{ color: active ? '#fff' : '' }}>
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
