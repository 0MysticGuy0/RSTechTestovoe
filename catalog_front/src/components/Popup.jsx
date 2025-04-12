import { Children, useEffect } from "react";

function Popup({children, active=false, setActive}){

    function getPopupStyle(){
        return active?"popup active":"popup";
    }


    useEffect(() => {
        active && (document.body.style.overflow = 'hidden');
        !active && (document.body.style.overflow = 'unset');
     }, [active ]);

    return (
        <div className={getPopupStyle()}
            onClick={x => setActive(false)}
        >
            <div className="content"
                onClick={v => {v.stopPropagation();}}>
                {children}
            </div>
        </div>
    )
}

export default Popup;