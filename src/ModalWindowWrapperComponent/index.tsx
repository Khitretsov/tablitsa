import React from 'react'
import ReactDOM from 'react-dom';
import './styles/style.css';

const appRoot = document.getElementById('root');

export default function ModalWindowWrapperComponent({children, onCancel, title}: any) {
    return <>
        {  
            appRoot && ReactDOM.createPortal(
                <div {...{ // Надо добавить закрытие модального окна но нажатию кнопки Esc
                    className: 'modal-window-background',
                    // onClick: () => { onCancel() }
                    onClick: (e) => {
                        if (e.target === e.currentTarget) onCancel()
                    }
                }}>
                    <div className="modal-window-content">
                        <h3> { title } </h3>
                        { children }
                    </div>
                </div>,
                appRoot
            )
        }
    </>
}
