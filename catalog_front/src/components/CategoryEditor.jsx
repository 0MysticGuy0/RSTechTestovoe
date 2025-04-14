import { useEffect, useState } from "react";

function CategoryEditor({category, onSaved, apiController}){

    const [editedCategory, setEditedCategory] = useState({...category})

    useEffect(()=> {
            setEditedCategory(category ? {...category} : {name:"", description:""})
    }, [category])

    

    return (
            <div className="category-editor">

                <h4 className="category-editor__title">
                    {category?"Редактирование":"Создание"} категории
                </h4>

                <div className="category-editor__content">
                
                        <div className="fields">
                            <span className="text bold">Имя:</span>
                            <input className="text" type="text" placeholder="имя категории" value={editedCategory.name} 
                                onChange={v => setEditedCategory({...editedCategory, name: v.target.value})}/>
                        </div>
                        <hr />
                        <div className="fields">
                            <span className="text bold">Описание:</span>
                            <textarea className="text" rows={3} placeholder="описание категории" value={editedCategory.description} 
                                onChange={v => setEditedCategory({...editedCategory, description: v.target.value})}/>
                        </div>
                </div>

                <button disabled={!editedCategory || editedCategory.name?.length <= 0} className="category-editor__saveBtn"
                    onClick={async(x) => {
                        if(category)
                            await apiController.editCategory(editedCategory)
                        else{
                            delete editedCategory.id
                            await apiController.createCategory(editedCategory)
                        }
                        setEditedCategory(category ? {...category} : {name:"", description:""})
                        onSaved()
                    }}>Сохранить</button>

            </div>
    )
}

export default CategoryEditor;