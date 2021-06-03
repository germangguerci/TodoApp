import React from 'react';

interface addTodoModalProps {
    openAdd: Boolean
    setOpenAdd: Function
}

export const AddTodoModal: React.FC<addTodoModalProps> = () => {
    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close">&times;</span>
                <p>Some text in the Modal..</p>
            </div>
        </div>
  )
}