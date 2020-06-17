import React from 'react';
// import './styles/style.css';

export default function CellComponent({value, onChange, type}: any) {
    return <input {...{
        type: type,
        value: value,
        onChange,
    }}/>
}