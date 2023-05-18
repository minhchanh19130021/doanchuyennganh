import { useState } from 'react';
import AddExam from './AddExam';
import DeleteExam from './DeleteExam';
import EditExam from './EditExam';
import FullExam from './FullExam';
import ListRoom from './ListRoom';

function Tab() {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    return (
        <>
            <ul className="grid gap-4 rounded-2xl border border-[#d8e0e8]  bg-[#edf2f8]  px-1 py-1  cs:grid-cols-1 xs:grid-cols-1  sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5">
                <li
                    onClick={() => toggleTab(1)}
                    className={
                        toggleState === 1
                            ? 'w-full cursor-pointer  select-none rounded-xl bg-[#072d94] px-3 py-[6px] text-center text-[#fff]'
                            : 'w-full cursor-pointer  select-none rounded-xl bg-transparent px-3 py-[6px] text-center text-[#52637a]'
                    }
                >
                    Tất cả đề thi
                </li>
                <li
                    onClick={() => toggleTab(2)}
                    className={
                        toggleState === 2
                            ? 'w-full cursor-pointer  select-none rounded-xl bg-[#072d94] px-3 py-[6px] text-center text-[#fff]'
                            : 'w-full cursor-pointer  select-none rounded-xl bg-transparent px-3 py-[6px] text-center text-[#52637a]'
                    }
                >
                    Thêm đề thi
                </li>
                <li
                    onClick={() => toggleTab(3)}
                    className={
                        toggleState === 3
                            ? 'w-full cursor-pointer  select-none rounded-xl bg-[#072d94] px-3 py-[6px] text-center text-[#fff]'
                            : 'w-full cursor-pointer  select-none rounded-xl bg-transparent px-3 py-[6px] text-center text-[#52637a]'
                    }
                >
                    Sửa đề thi
                </li>
                <li
                    onClick={() => toggleTab(4)}
                    className={
                        toggleState === 4
                            ? 'w-full cursor-pointer  select-none rounded-xl bg-[#072d94] px-3 py-[6px] text-center text-[#fff]'
                            : 'w-full cursor-pointer  select-none rounded-xl bg-transparent px-3 py-[6px] text-center text-[#52637a]'
                    }
                >
                    Xóa đề thi
                </li>
                <li
                    onClick={() => toggleTab(5)}
                    className={
                        toggleState === 5
                            ? 'w-full cursor-pointer  select-none rounded-xl bg-[#072d94] px-3 py-[6px] text-center text-[#fff]'
                            : 'w-full cursor-pointer  select-none rounded-xl bg-transparent px-3 py-[6px] text-center text-[#52637a]'
                    }
                >
                    Danh sách phòng
                </li>
            </ul>
            <div className="tab-content">
                <div
                    className={
                        toggleState === 1
                            ? 'animate-fadeBottomMobile flex flex-col items-center justify-center pb-10 pt-16'
                            : 'hidden'
                    }
                >
                  <FullExam/>
                </div>
                <div
                    className={
                        toggleState === 2
                            ? 'animate-fadeBottomMobile flex flex-col items-center justify-center pb-10 pt-16'
                            : 'hidden'
                    }
                >
                    <AddExam/>
                </div>
                <div
                    className={
                        toggleState === 3
                            ? 'animate-fadeBottomMobile flex flex-col items-center justify-center pb-10 pt-16'
                            : 'hidden'
                    }
                >
                   <EditExam/>
                </div>
                <div
                    className={
                        toggleState === 4
                            ? 'animate-fadeBottomMobile flex flex-col items-center justify-center pb-10 pt-16'
                            : 'hidden'
                    }
                >
                     <DeleteExam/>
                </div>
                <div
                    className={
                        toggleState === 5
                            ? 'animate-fadeBottomMobile flex flex-col items-center justify-center pb-10 pt-16'
                            : 'hidden'
                    }
                >                 
                   <ListRoom></ListRoom>
                </div>
            </div>
        </>
    );
}

export default Tab;
