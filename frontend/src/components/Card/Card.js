import { NavLink } from 'react-router-dom';

function Card({nameRoom,idRoom,time,numberQuestion,children}) {
    return (
        <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            <NavLink to="#">
                <img
                    className="rounded-t-lg"
                    src="/docs/images/blog/image-1.jpg"
                    alt=""
                />
            </NavLink>
            <div className="p-5">
                <NavLink to="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                        {nameRoom}
                    </h5>
                </NavLink>
                <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <p >Mã phòng: {idRoom}</p>
                </div>
                <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex item-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

                    <p className="px-2">{time}</p>
                </div>
                <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <p >Số câu: {numberQuestion}</p>
                </div>
             
                {children}
                
            </div>
        </div>
    );
}

export default Card;
