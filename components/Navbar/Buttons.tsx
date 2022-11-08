import React from 'react'

const styles = {
    lgBtn: 'uppercase p-3 text-white hover:bg-opacity-50 rounded'
}

const Buttons = () => {
    return (
        <>
            <div className='hidden md:flex space-x-2'>
                <button className={`bg-orange-500 ${styles.lgBtn}`}>
                    Login
                </button>
                <button className={`bg-amber-500 ${styles.lgBtn}`}>
                    Signup
                </button>
            </div>

            {/* mobile devices */}
            <div className='grid gap-3 md:hidden'>
                <button className={`bg-orange-500 ${styles.lgBtn}`}>
                    Login
                </button>
                <button className={`bg-amber-500 ${styles.lgBtn}`}>
                    Signup
                </button>
            </div>
        </>
    )
}

export default Buttons