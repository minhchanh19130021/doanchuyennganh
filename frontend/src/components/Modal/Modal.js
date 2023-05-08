import { useState } from 'react';

function Modal({ children }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="flex h-60 items-center justify-center">
                <button
                    className="rounded-md bg-purple-600 px-6 py-3 text-purple-100"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Open Modal
                </button>
            </div>
            {showModal ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 h-full w-full bg-black opacity-40"
                            onClick={() => setShowModal(false)}
                        ></div>
                        <div className="flex min-h-screen items-center px-4 py-8">
                            <div className="relative mx-auto  w-full rounded-md bg-white p-4 shadow-lg">
                                {children}
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}

export default Modal;
