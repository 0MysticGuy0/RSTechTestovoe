import { useEffect, useState } from "react";
import DeleteDialog from "../components/DeleteDialog";
import Popup from "../components/Popup";
import ProductItem from "../components/ProductItem";
import CategoryItem from "../components/CategoryItem";
import CategoryEditor from "../components/CategoryEditor";
import { useFetching } from "../hooks/useFetching";
import APIcontroller from "../API/ApiController";

function Categories(){

    const [deleteCategoryDialogVisible, setDeleteCategoryDialogVisible] = useState(false)
    const [editCategoryDialogVisible, setEditCategoryDialogVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null)
    const [pageData, setPageData] = useState({size:10, number:1, maxPage:10})


    const apiControler = new APIcontroller();
    const [fetchedCategories, setFetchedCategories] = useState([])
    const [fetchCategories, isLoadingcategories, fetchingCategoriesError] = useFetching(async() => {
        const resBody = (await apiControler.getAllCategories(pageData)).body
        setPageData({...pageData, maxPage: resBody.totalPages})
        setFetchedCategories(resBody.content)
    })

    useEffect(()=> {
        fetchCategories()
    }, [pageData.size, pageData.number])

    async function deleteCategory(category){
        await apiControler.deleteCategoryById(category?.id)
        fetchCategories()
    }


    return (
        <div className="page page-categories">
        <Popup active={deleteCategoryDialogVisible} setActive={setDeleteCategoryDialogVisible}>
            <DeleteDialog deletedName={currentCategory?.name} onCancel={x => setDeleteCategoryDialogVisible(false)}
                onAccept={x => {
                    deleteCategory(currentCategory)
                    setDeleteCategoryDialogVisible(false)
                }}/>
        </Popup>

        <Popup active ={editCategoryDialogVisible} setActive={setEditCategoryDialogVisible}>
            <CategoryEditor category={currentCategory}  apiController={apiControler}
                onSaved={() => {
                    setEditCategoryDialogVisible(false)
                    fetchCategories()
                }}/>
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

                {isLoadingcategories && <div className="loader"/>}
                {fetchingCategoriesError}
                    {
                        fetchedCategories.map(cat => (
                            <CategoryItem key={cat.id} category={cat}
                            onDelete={() => {
                                setCurrentCategory(cat)
                                setDeleteCategoryDialogVisible(true)
                            }}
                            onEdit={() => {
                            setCurrentCategory(cat)
                            setEditCategoryDialogVisible(true)
                            }}/> )
                        )
                    }
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
                        
                    <span className="text bold">/ {pageData.maxPage}</span>
                </div>
            </div>
        </div>
    </div>)
}

export default Categories;