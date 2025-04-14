import axios from "axios"

export default class APIcontroller{
    #API_ADDRESS = process.env.REACT_APP_API_URL
    #API_CATEGORY_ADDRESS = this.#API_ADDRESS+"category/"
    #API_PRODUCT_ADDRESS = this.#API_ADDRESS+"product/"
    #API_IMAGE_ADDRESS = this.#API_ADDRESS+"product-image/"

    async getAllCategories(pageData = {size:10, number:1, maxPage:10}){
        const responce = await axios.get(this.#API_CATEGORY_ADDRESS, {
            params:{
                page_num: pageData.number,
                page_size: pageData.size
            }
        })
        return responce.data
    }

    async deleteCategoryById(id){
        const responce = await axios.delete(this.#API_CATEGORY_ADDRESS + id)
        return responce.data
    }

    async editCategory(category){
        const responce = await axios.put(this.#API_CATEGORY_ADDRESS, {...category})
        return responce.data
    }
    async createCategory(category){
        const responce = await axios.post(this.#API_CATEGORY_ADDRESS, {...category})
        return responce.data
    }


    async getAllProducts(pageData = {size:10, number:1, maxPage:10}, filter = {name:"", minPrice:null, maxPrice:null, categoryId: null}){
        const responce = await axios.get(this.#API_PRODUCT_ADDRESS, {
            params:{
                page_num: pageData.number,
                page_size: pageData.size,
                ...filter
            }
        })
        return responce.data
    }
    async deleteProductById(id){
        const responce = await axios.delete(this.#API_PRODUCT_ADDRESS + id)
        return responce.data
    }
    async editProduct(product, image){
        let formData = new FormData()
        formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }))
        formData.append("image", image)

        const responce = await axios.put(this.#API_PRODUCT_ADDRESS, formData, {
            headers: {'Content-Type': 'multipart/mixed'}
        })
        return responce.data
    }
    async createProduct(product, image){
        let formData = new FormData()
        formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }))
        formData.append("image", image)

        const responce = await axios.post(this.#API_PRODUCT_ADDRESS,formData)
        return responce.data
    }


    getProductImageUrl(filePath){
        return this.#API_IMAGE_ADDRESS+"?imagePath=" + filePath
    }
}