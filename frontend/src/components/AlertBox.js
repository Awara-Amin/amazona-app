import React, { useEffect, useState } from 'react';


// export default function LoadingBox() {
//     return (
//         <div className='loading'>
//             <li className="fa fa-spinner fa-spin"></li> Loading ...
//         </div>
//     )
// }

export default function AlertBox () {
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => { setMessage(true) }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
            <div className='loading'>
                <li className="fa fa-spinner fa-spin">{message}</li> 
            </div>
        )
}

