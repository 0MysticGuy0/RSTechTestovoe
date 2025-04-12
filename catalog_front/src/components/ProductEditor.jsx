import { useEffect, useState } from "react";

function ProductEditor({product}){

    const [editedProduct, setEditedProduct] = useState({...product})

    useEffect(()=> {
            setEditedProduct(product ? {...product} : {name:"", price:0, description:"",category:null})
    }, [product])

    

    function getCategories(){
        return [{id:1, name:"a"}, {id:2, name:"b"}]
    }

    return (
            <div className="product-editor">

                <h4 className="product-editor__title">
                    {product?"Редактирование":"Создание"} продукта
                </h4>

                <div className="product-editor__content">
                    <div className="left">
                        {product && <img src={product.imagePath} alt="изображение" />}
                        <input type="file" className="loadImage"  accept="image/*"/>
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
                            <select value={editedProduct?.category?.id} className="text" 
                                onChange={v => setEditedProduct({...editedProduct, category:{id:v.target.value}})}>
                                {
                                    getCategories().map(c => (
                                        <option value={c.id}>{c.name}</option>
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

                <button disabled={!editedProduct.category} className="product-editor__saveBtn">Сохранить</button>

            </div>
    )
}

export default ProductEditor;