import { useEffect, useState } from 'react';

function Button(props) {
    const [trueButton, setTrueButton] = useState(false);
    useEffect(() => {
        setTrueButton(false);
    }, [props?.question]);

    return (
        <button
            onClick={() => {
                if (props?.type === 'chọn') {
                    if (!trueButton) {
                        props?.setAddQuestions([...props?.addQuestions, props?.question]);
                    } else {
                        let tmp = props?.addQuestions;
                        tmp = tmp?.filter((q) => q?.id != props?.question?.id);
                        props?.setAddQuestions([...tmp]);
                    }
                    setTrueButton(!trueButton);
                } else {
                    if (trueButton) {
                        let tmp = props?.deleteQuestions;
                        tmp = tmp?.filter((q) => q?.id !== props?.question?.id);
                        props?.setDeleteQuestions([...tmp]);
                    } else {
                        props?.setDeleteQuestions([...props?.deleteQuestions, props?.question]);
                    }
                    setTrueButton(!trueButton);
                }
            }}
            className="whitespace-nowrap rounded-full bg-red-400 px-6 py-2 text-white hover:bg-red-400 hover:text-red-200"
        >
            {trueButton ? (props?.type === 'chọn' ? 'bỏ chọn' : 'bỏ xóa') : props?.type}
        </button>
    );
}

export default Button;
