import { useState } from "react";
import Popup from "../components/Popup";
import ProductItem from "../components/ProductItem";
import DeleteDialog from "../components/DeleteDialog";
import ProductEditor from "../components/ProductEditor";

function Main(){

    const [deleteProductDialogVisible, setDeleteProductDialogVisible] = useState(false)
    const [editProductDialogVisible, setEditProductDialogVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null)
    const [filter, setFilter] = useState({name:"", minPrice:null, maxPrice:null, category:{id:null}})
    const [pageData, setPageData] = useState({size:10, number:1, maxPage:10})

    function getCategoriesF(){
        return [{id:null, name:"all"},{id:1, name:"a"}, {id:2, name:"b"}]
    }

    return (
    <div className="page page-main">
        <Popup active={deleteProductDialogVisible} setActive={setDeleteProductDialogVisible}>
            <DeleteDialog deletedName={currentProduct?.name} onCancel={x => setDeleteProductDialogVisible(false)}/>
        </Popup>

        <Popup active ={editProductDialogVisible} setActive={setEditProductDialogVisible}>
            <ProductEditor product={currentProduct}/>
        </Popup>

        <div className="page-main__products">
            <div className="page-main__products__header">
                <h2>Продукты</h2>

                <button className="char-button"
                    onClick={x => {
                        setCurrentProduct(null)
                        setEditProductDialogVisible(true)
                    }}>+</button>
            </div>
            
            <div className="page-main__products__search">
                
                
                <div className="fields">
                    <span className="text">Категрия:</span>
                    <select className="text" value={filter.category.id}
                                onChange={v => setFilter({...filter, category:{id:v.target.value}})}>
                                {
                                    getCategoriesF().map(c => (
                                        <option value={c.id}>{c.name}</option>
                                    ))
                                }
                            </select>
                </div>

                <div className="fields">
                    <span className="text">Цена  От</span>
                    <input type="number"  value={filter.minPrice}
                        onChange={v => setFilter({...filter, minPrice:v.target.value})}/>
                    <span className="text"> до </span>
                    <input type="number"  value={filter.maxPrice}
                        onChange={v => setFilter({...filter, maxPrice:v.target.value})}/>
                </div>

                <input type="text" className="text search" placeholder="введите тексат для поиска..." value={filter.name}
                        onChange={v => setFilter({...filter, name:v.target.value})}/>
                <button className="search-btn"/>
            </div>

            <div className="page-main__products__list">
                <ProductItem onDelete={() => {
                    setCurrentProduct({name: "alala"})
                    setDeleteProductDialogVisible(true)
                    }}
                    onEdit={() => {
                    setCurrentProduct({name: "alala"})
                    setEditProductDialogVisible(true)
                    }}/>
                <ProductItem onDelete={() => {
                        setCurrentProduct({name: "ololo"})
                        setDeleteProductDialogVisible(true)
                        }}
                        onEdit={() => {
                        setCurrentProduct({name: "ololo"})
                        setEditProductDialogVisible(true)
                        }}/>   
            </div>

            <div className="page-main__products__page-settings">
                <div className="page-main__products__page-settings__size">
                    <span className="text">Объектов на странице:</span>
                    <input className="text bold" type="number" value={pageData.size} min={1} defaultValue={10}
                        onChange={v => setPageData({...pageData, size:v.target.value})}/>
                </div>

                <div className="page-main__products__page-settings__number">
                    <span className="text">Страница:</span>
                    <input className="text bold page-num" value={pageData.number} type="number" min={1} max={pageData.maxPage} defaultValue={1}
                        onChange={v => setPageData({...pageData, number: v.target.value})}/>
                        
                    <span className="text bold">/ 10</span>
                </div>
            </div>
        </div>
    </div>)
}

export default Main;