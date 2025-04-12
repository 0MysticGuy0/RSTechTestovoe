
function CategoryItem({onDelete, onEdit,
    category = {id:0, name:"Category", description:"description description"}
}){
    return (


        
        <div className="category-item">
            <div className="category-item__content">
                    <h4 className="title">{category.name}</h4>
                    <hr />
                    <span className="text">{category.description}</span>
            </div>

            <div className="category-item__buttons">
                <button className="edit-btn text--big"
                    onClick={onEdit}>Редактировать</button>

                <button className="delete-btn text--big"
                    onClick={onDelete}>
                        Удалить</button>
            </div>
        </div>
    )
}

export default CategoryItem;