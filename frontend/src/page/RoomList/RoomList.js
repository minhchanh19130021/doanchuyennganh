import Card from '~/components/Card/Card';
import { useEffect, useState } from 'react';

function RoomList() {

    const [stateJoin, setStateJoin]= useState();
    const [idRoom, setIdRoom] = useState('');
    const [codeJoin, setCodeJoin] =useState('');

    
    
    return (
        <div className="max-w-full">
            <div className="mx-auto max-w-[1200px]">
                <p className="py-2 text-3xl font-bold text-gray-900 dark:text-white">Danh sách phòng thi</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div className="border-[#333] hover:-translate-y-1 cursor-pointer transition-all">
                        <Card nameRoom="Phòng Thi 01" idRoom="2314" time="120 phút" numberQuestion="20 câu">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Mã tham gia
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
                                    placeholder="Nhập mã tham gia"
                                    required
                                />
                            </div>
                            <button
                                to="#"
                                className="mt-2 inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Tham Gia
                                <svg
                                    aria-hidden="true"
                                    className="-mr-1 ml-2 h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </Card>
                    </div>
                    <div className="border-[#333] hover:-translate-y-1 cursor-pointer transition-all">
                        <Card nameRoom="Phòng Thi 01" idRoom="2314" time="120 phút" numberQuestion="20 câu">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Mã tham gia
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
                                    placeholder="Nhập mã tham gia"
                                    required
                                    onChange ={(e)=>{
                                        setCodeJoin(e.target.value)
                                    }}
                                />
                            </div>
                            <button
                                to="#"
                                className="mt-2 inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Tham Gia
                                <svg
                                    aria-hidden="true"
                                    className="-mr-1 ml-2 h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </Card>
                    </div>
                    <div className="border-[#333] hover:-translate-y-1 cursor-pointer transition-all">
                        <Card nameRoom="Phòng Thi 01" idRoom="2314" time="120 phút" numberQuestion="20 câu">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Mã tham gia
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
                                    placeholder="Nhập mã tham gia"
                                    required
                                />
                            </div>
                            <button
                                to="#"
                                className="mt-2 inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Tham Gia
                                <svg
                                    aria-hidden="true"
                                    className="-mr-1 ml-2 h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </Card>
                    </div>
                    <div className="border-[#333] hover:-translate-y-1 cursor-pointer transition-all">
                        <Card nameRoom="Phòng Thi 01" idRoom="2314" time="120 phút" numberQuestion="20 câu">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Mã tham gia
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
                                    placeholder="Nhập mã tham gia"
                                    required
                                />
                            </div>
                            <button
                                to="#"
                                className="mt-2 inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Tham Gia
                                <svg
                                    aria-hidden="true"
                                    className="-mr-1 ml-2 h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </Card>
                    </div>
                    <div className="border-[#333] hover:-translate-y-1 cursor-pointer transition-all">
                        <Card nameRoom="Phòng Thi 01" idRoom="2314" time="120 phút" numberQuestion="20 câu">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Mã tham gia
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
                                    placeholder="Nhập mã tham gia"
                                    required
                                />
                            </div>
                            <button
                                to="#"
                                className="mt-2 inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Tham Gia
                                <svg
                                    aria-hidden="true"
                                    className="-mr-1 ml-2 h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </Card>
                    </div>
                    <div className="border-[#333] hover:-translate-y-1 cursor-pointer transition-all">
                        <Card nameRoom="Phòng Thi 01" idRoom="2314" time="120 phút" numberQuestion="20 câu">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Mã tham gia
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
                                    placeholder="Nhập mã tham gia"
                                    required
                                />
                            </div>
                            <button
                                to="#"
                                className="mt-2 inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Tham Gia
                                <svg
                                    aria-hidden="true"
                                    className="-mr-1 ml-2 h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </Card>
                    </div>
                    <div className="border-[#333] hover:-translate-y-1 cursor-pointer transition-all">
                        <Card nameRoom="Phòng Thi 01" idRoom="2314" time="120 phút" numberQuestion="20 câu">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Mã tham gia
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
                                    placeholder="Nhập mã tham gia"
                                    required
                                />
                            </div>
                            <button
                                to="#"
                                className="mt-2 inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Tham Gia
                                <svg
                                    aria-hidden="true"
                                    className="-mr-1 ml-2 h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </Card>
                    </div>
                    <div className="border-[#333] hover:-translate-y-1 cursor-pointer transition-all">
                        <Card nameRoom="Phòng Thi 01" idRoom="2314" time="120 phút" numberQuestion="20 câu">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Mã tham gia
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
                                    placeholder="Nhập mã tham gia"
                                    required
                                />
                            </div>
                            <button
                                to="#"
                                className="mt-2 inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Tham Gia
                                <svg
                                    aria-hidden="true"
                                    className="-mr-1 ml-2 h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomList;
