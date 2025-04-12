import { useState } from "react";
import DeleteDialog from "../components/DeleteDialog";
import Popup from "../components/Popup";
import ProductItem from "../components/ProductItem";
import CategoryItem from "../components/CategoryItem";
import CategoryEditor from "../components/CategoryEditor";

function Categories(){

    const [deleteCategoryDialogVisible, setDeleteCategoryDialogVisible] = useState(false)
    const [editCategoryDialogVisible, setEditCategoryDialogVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null)
    const [pageData, setPageData] = useState({size:10, number:1, maxPage:10})


    return (
        <div className="page page-categories">
        <Popup active={deleteCategoryDialogVisible} setActive={setDeleteCategoryDialogVisible}>
            <DeleteDialog deletedName={currentCategory?.name} onCancel={x => setDeleteCategoryDialogVisible(false)}/>
        </Popup>

        <Popup active ={editCategoryDialogVisible} setActive={setEditCategoryDialogVisible}>
            <CategoryEditor category={currentCategory} />
        </Popup>

        <div className="page-categories__products">
            <div className="page-categories__products__header">
                <h2>Категории</h2>

                <button className="char-button"
                    onClick={x => {
                        setCurrentCategory(null)
                        setEditCategoryDialogVisible(true)
                    }}>+</button>
            </div>
            

            <div className="page-categories__products__list">
                <CategoryItem onDelete={() => {
                    setCurrentCategory({name: "alala"})
                    setDeleteCategoryDialogVisible(true)
                    }}
                    onEdit={() => {
                    setCurrentCategory({name: "alala"})
                    setEditCategoryDialogVisible(true)
                    }}/> 
                    <CategoryItem onDelete={() => {
                    setCurrentCategory({name: "wawaw"})
                    setDeleteCategoryDialogVisible(true)
                    }}
                    onEdit={() => {
                    setCurrentCategory({name: "wawaw"})
                    setEditCategoryDialogVisible(true)
                    }}/> 
            </div>

            <div className="page-categories__products__page-settings">
                <div className="page-categories__products__page-settings__size">
                    <span className="text">Объектов на странице:</span>
                    <input className="text bold" type="number" value={pageData.size} min={1} defaultValue={10}
                        onChange={v => setPageData({...pageData, size:v.target.value})}/>
                </div>

                <div className="page-categories__products__page-settings__number">
                    <span className="text">Страница:</span>
                    <input className="text bold page-num" value={pageData.number} type="number" min={1} max={pageData.maxPage} defaultValue={1}
                        onChange={v => setPageData({...pageData, number: v.target.value})}/>
                        
                    <span className="text bold">/ 10</span>
                </div>
            </div>
        </div>
    </div>)
}

export default Categories;