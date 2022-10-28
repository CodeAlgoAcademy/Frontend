import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div className=''>
    	<Header />
      <Sidebar />
    </div>
  );
};

export default Home;
