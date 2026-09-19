import React from 'react'
import { Oval } from 'react-loader-spinner';


const LoaderOval = ({ showLoader }) => {
    

    return showLoader ? (

        <div className="fixed inset-0 flex items-center justify-center bg-white/40 z-50">
            <Oval height={80}
                width={80}
                color="#4c5135"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#9FA96C"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    ) : <></>
}

export default LoaderOval
