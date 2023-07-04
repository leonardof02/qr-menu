import { useEffect, useRef, useState } from "react";

interface AlertProps {
    errors: { [key: string]: string };
}

export const Alert = ({ errors }: AlertProps) => {

    const element = useRef(null);

    useEffect( () => {
        setRender(true);
        if(element.current)
            (element.current as HTMLElement).classList.add("opacity-0");
        setTimeout( () => {
            setRender(false);
            if(element.current)
                (element.current as HTMLElement).classList.remove("opacity-0");
        }, 5000 )
    }, [ errors ] )

    const errorMsgs: string[] = Object.keys(errors).map((key) => errors[key])
    const [ render, setRender ] = useState<boolean>( true );

    return (
        (errorMsgs.length !== 0 && render ) && (
            <div ref={ element } className="flex justify-between max-w-xl p-3 mx-10 my-3 font-bold text-red-700 transition-opacity bg-red-600 border border-red-600 rounded-md md:mx-auto bg-opacity-30">
                <div>
                    <ul className="p-2">
                        {errorMsgs.map((msg, index) => (
                            <li key={index}>{msg}</li>
                        ))}
                    </ul>
                </div>
                <button className="w-6 p-1 text-sm text-white bg-red-600 rounded-md hover:brightness-110 h-fit" onClick={ () => setRender(false) }>
                    X
                </button>
            </div>
        )
    );
};
export default Alert
