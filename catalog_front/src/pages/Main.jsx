import { useEffect, useState } from "react";
import Popup from "../components/Popup";
import ProductItem from "../components/ProductItem";
import DeleteDialog from "../components/DeleteDialog";
import ProductEditor from "../components/ProductEditor";
import APIcontroller from "../API/ApiController";
import { useFetching } from "../hooks/useFetching";

function Main(){

    const [deleteProductDialogVisible, setDeleteProductDialogVisible] = useState(false)
    const [editProductDialogVisible, setEditProductDialogVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null)
    const [filter, setFilter] = useState({name:"", minPrice:null, maxPrice:null, categoryId: null})
    const [pageData, setPageData] = useState({size:10, number:1, maxPage:10})


    const apiControler = new APIcontroller();
        const [fetchedCategories, setFetchedCategories] = useState([])
        const [fetchCategories, isLoadingcategories, fetchingCategoriesError] = useFetching(async() => {
            const resBody = (await apiControler.getAllCategories(pageData)).body
            setFetchedCategories([{id:-1, name:""},...resBody.content])
        })

        const [fetchedProducts, setFetchedProducts] = useState([])
        const [fetchProducts, isLoadingProducts, fetchingProductsError] = useFetching(async() => {
            const resBody = (await apiControler.getAllProducts(pageData, filter)).body
            setPageData({...pageData, maxPage: resBody.totalPages})
            setFetchedProducts(resBody.content)
        })
    
        useEffect(()=> {
            fetchCategories()
            fetchProducts()
        }, [pageData.size, pageData.number, filter])

    
        async function deleteProduct(product){
            await apiControler.deleteProductById(product?.id)
            fetchProducts()
        }
    


    return (
    <div className="page page-main">
        <Popup active={deleteProductDialogVisible} setActive={setDeleteProductDialogVisible}>
            <DeleteDialog deletedName={currentProduct?.name} onCancel={x => setDeleteProductDialogVisible(false)}
                onAccept={x => {
                    deleteProduct(currentProduct)
                    setDeleteProductDialogVisible(false)
                }}/>
        </Popup>

        <Popup active ={editProductDialogVisible} setActive={setEditProductDialogVisible}>
            <ProductEditor product={currentProduct}   apiController={apiControler} categories={fetchedCategories}
                onSaved={() => {
                    setEditProductDialogVisible(false)
                    fetchProducts()
                }}/>
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
                    <select className="text" value={filter.categoryId}
                                onChange={v => setFilter({...filter, categoryId: v.target.value})}>
                                {
                                    fetchedCategories.map(c => (
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
                {isLoadingcategories && <div className="loader"/>}
                {fetchingProductsError}
                {
                    fetchedProducts.map(p => (
                        <ProductItem key={p.id} product={p} apiController={apiControler}
                        onDelete={() => {
                            setCurrentProduct(p)
                            setDeleteProductDialogVisible(true)
                            }}
                            onEdit={() => {
                            setCurrentProduct(p)
                            setEditProductDialogVisible(true)
                            }}/> 
                    ))
                }
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
                        
                    <span className="text bold">/ {pageData.maxPage}</span>
                </div>
            </div>
        </div>
    </div>)
}

export default Main;