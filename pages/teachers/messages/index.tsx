import Messages from '@/components/Teachers/messages/Messages'
import React from 'react'
import { GeneralNav, Sidebar } from '../../../components'

const index = () => {
    return (
        <>
            <GeneralNav />
            <div>
                <Sidebar />
                <Messages />
            </div>
        </>
    )
}

export default index;