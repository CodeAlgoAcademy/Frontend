import type { NextPage } from 'next';
import Navbar from '../components/Navbar/Navbar';

const styles = {
  container: 'relative bg-home h-[500px] bg-center w-screen md:bg-right bg-cover bg-no-repeat',
  gradientContainer: 'absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-tl md:bg-gradient-to-r from-orange-400',
  textContainer: 'py-20 md:py-32 relative px-2 md:px-20 text-white space-y-5'
}

const Home: NextPage = () => {
  return (
    <div className=''>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.gradientContainer}></div>
        <div className={styles.textContainer}>
          <p className='capitalize text-5xl font-extrabold leading-[60px] md:w-[600px]'>Coding for kids and Teens made easy</p>
          <p className='md:w-[550px] text-sm'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Labore quaerat deleniti libero, harum dolorem tenetur numquam 
            facilis omnis neque itaque consequatur rerum minus at, dolorum 
            excepturi. Illo voluptatem enim consectetur.
          </p>
          <button className='bg-blue-400 p-3 rounded-lg'>Get Started for free</button>
        </div>
      </div>
    </div>
  );
};

export default Home;