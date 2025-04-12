
function DeleteDialog({deletedName, onAccept, onCancel}){
    return(
        <div className="delete-dialog">
            <h4 className="delete-dialog__title">Удалить {deletedName}?</h4>

            <div className="delete-dialog__content">
                <button className="acceptBtn" onClick={onAccept}>Да</button>
                <button className="cancelBtn" onClick={onCancel}>Нет</button>
            </div>
        </div>
    )
}

export default DeleteDialog;