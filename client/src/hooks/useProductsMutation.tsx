import { ProductsTypes } from '@/interface/data'
import { createProducts, deleteProductsById, updateProducts } from '@/services/product'
import { schema } from '@/services/validation'
import { joiResolver } from '@hookform/resolvers/joi'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
type ActionType = {
    action: 'CREATE' | 'UPDATE' | 'DELETE',
}

const   useProductsMutation = ({action} : ActionType) => {
    const queryClinet = useQueryClient()
    const navigate = useNavigate()
    const form = useForm({
        // resolver: joiResolver(schema),
        defaultValues: {
            name : "",
            category : "",
            price : 0,
            image : "",
            description : "",
            featured : false,
            gallery : [""],
            discount : 0,
            countInStock : 0
        }
    })
    const {mutate} = useMutation({
        mutationFn : async (product: ProductsTypes)=>{
            console.log(product);
            
            switch (action) {
                case 'CREATE':
                    return await createProducts(product) 
                case 'UPDATE':
                    return await updateProducts(product)
                case 'DELETE':
                    return await window.confirm('Are you sure you want to delete this item?') && deleteProductsById(product._id!)
                default:
                    break;
            }
        },
        onSuccess: () =>{
            queryClinet.invalidateQueries({
                queryKey : ['PRODUCTS_KEY']
            })
        },
        onError: (error) =>{
            console.log(error);
            
        }
    })
    const onSubmit =  async(data :any)=>{
        //  console.log(data);
        //  const newGallery = Array.from(data?.gallery)
        //  console.log(newGallery);
         
        // mutate(data)
        // navigate('/admin/products')
    }
  return {mutate,onSubmit,form}
}

export default useProductsMutation