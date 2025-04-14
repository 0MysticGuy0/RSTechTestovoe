import { useEffect, useRef, useState } from "react";

function ProductEditor({product, onSaved, apiController, categories}){

    const [editedProduct, setEditedProduct] = useState({...product})
    const [selectedImage, setSelectedImage] = useState(null)
    let fileSelector = useRef(null)

    useEffect(()=> {
            setEditedProduct(product ? {...product} : {name:"", price:0, description:"",category:{id:-1}})
            setSelectedImage(null)
            fileSelector.value = null
    }, [product])


    return (
            <div className="product-editor">

                <h4 className="product-editor__title">
                    {product?"Редактирование":"Создание"} продукта
                </h4>

                <div className="product-editor__content">
                    <div className="left">
                        {product && <img src={apiController.getProductImageUrl(product.imagePath)} alt="изображение" />}
                        <input type="file" className="loadImage"  accept="image/*" ref={r => fileSelector=r}
                            onChange={v => {
                                console.log(v.target.files[0])
                                if(v.target.files.length > 0){
                                    setSelectedImage(v.target.files[0])
                                }
                            }}/>
                    </div>

                    <div className="right">
                        <div className="fields">
                            <span className="text bold">Имя:</span>
                            <input className="text" type="text" placeholder="имя продукта" value={editedProduct.name} 
                                onChange={v => setEditedProduct({...editedProduct, name: v.target.value})}/>
                        </div>
                        <hr />
                        <div className="fields">
                            <span className="text bold">Цена:</span>
                            <input type="number" className="text"  placeholder="Цена продукта" value={editedProduct.price} 
                                onChange={v => setEditedProduct({...editedProduct, price: v.target.value})}/>
                        </div>
                        <hr />
                        {product && 
                        <div className="fields">
                            <span className="text bold">Дата создания:</span>
                            <span className="text">{product.creationDate}</span>
                        </div>}
                        <hr />
                        <div className="fields">
                            <span className="text bold">Категория:</span>
                            <select value={editedProduct?.category?.id} className="text" required={false}
                                onChange={v => setEditedProduct({...editedProduct, category:{id:v.target.value}})}>
                                {
                                    categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <hr />
                        {product && 
                        <div className="fields">
                            <span className="text bold">Статус:</span>
                            <span className="text">{product.status}</span>
                        </div>}
                        <hr />
                        <div className="fields">
                            <span className="text bold">Описание:</span>
                            <textarea className="text" rows={3} placeholder="описание продукта" value={editedProduct.description} 
                                onChange={v => setEditedProduct({...editedProduct, description: v.target.value})}/>
                        </div>

                    </div>
                </div>

                <button disabled={(editedProduct.category?.id < 0 && !product) || editedProduct.name?.length == 0} className="product-editor__saveBtn"
                    onClick={async(x) => {
                        if(product)
                            await apiController.editProduct(editedProduct, selectedImage)
                        else{
                            delete editedProduct.id
                            delete editedProduct.imagePath
                            delete editedProduct.creationDate
                            await apiController.createProduct(editedProduct, selectedImage)
                        }
                        setEditedProduct(product ? {...product} : {name:"", price:0, description:"",category:{id:-1}})
                        setSelectedImage(null)
                        fileSelector.value = null
                        onSaved()
                    }}>Сохранить</button>

            </div>
    )
}

export default ProductEditor;