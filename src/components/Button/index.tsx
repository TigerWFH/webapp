import * as React from 'react';

interface IProps {
    className?: string;
    disabled?: boolean;
    label?: string;
}

function Button(props: IProps) {
    return (
        <button className={''}>
        </button>
    )
}

export default Button;