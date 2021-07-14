import * as React from 'react';

const DEFAULT_LABEL = '重新请求';
interface IError {
    bReload: boolean;
    reloadLabel?: string;
    content?: React.ReactChild;
    onReload?: () => any;
}
function Error(props: IError) {
    function onReload() {
        if (typeof props.onReload === 'function') {
            props.onReload();
        }
    }
    const bReload = Boolean(props.bReload);

    return (
        <div>
            {
                props.content ? props.content : '404'
            }
            {
                bReload ?
                    <button onClick={onReload}>
                        {
                            props.reloadLabel || DEFAULT_LABEL
                        }
                    </button>
                    : null
            }
        </div>
    )
}

export default Error;