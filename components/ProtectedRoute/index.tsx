import {cookies} from 'next/headers'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'

function ProtectedRoute({
    children
}:{
    children:React.ReactNode | React.JSX.Element
}){
    const cookieStore=cookies()
    const authToken=cookieStore.get('token')
    if(authToken== undefined){
        redirect('/auth/login')
    }
    return(
        <Fragment>
            {children}
        </Fragment>
    )
}

export default ProtectedRoute