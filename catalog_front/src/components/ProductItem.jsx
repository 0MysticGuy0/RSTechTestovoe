
function ProductItem({onDelete, onEdit, apiController,
    product = {id:0, name:"Product", description:"description description", price: 0.0, imagePath:"/logo.png", category:{name:"category"}, creationDate:"2020-05-04", status:"Active"}
}){
    return (


        
        <div className="product-item">
            <div className="product-item__content">
                <div className="left">
                    <img src={apiController.getProductImageUrl(product.imagePath)} alt="изображение" />
                </div>

                <div className="right">
                    <div className="right__header">
                        <h4 className="title">{product.name}</h4>
                        <h4 className="price">{product.price}р.</h4>
                    </div>
                    <hr />
                    <div className="right__category-info">
                        <span className="text--big">{product.category?.name}</span>
                        <span className="text--big">{product.status}</span>
                    </div>
                    <div className="right__date">
                        <span className="date text--big">{product.creationDate}</span>
                    </div>
                    <hr />
                    <div className="right__description">
                        <span className="text">{product.description}</span>
                    </div>
                </div>
            </div>

            <div className="product-item__buttons">
                <button className="edit-btn text--big"
                    onClick={onEdit}>Редактировать</button>

                <button className="delete-btn text--big"
                    onClick={onDelete}>
                        Удалить</button>
            </div>
        </div>
    )
}

export default ProductItem;