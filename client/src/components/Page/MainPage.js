import React from 'react' 
import {Switch, Route} from 'react-router-dom' 
import Products from './products/Products'
import Register from './auth/Register'
import Login from './auth/Login'
import Cart from './cart/Cart'
import DetailProduct from './detailproduct/DetailProduct'
import OderDetail from './history/OderDetail'
import OderHistory from './history/OderHistory'
import Category from '../category/Category'
import CreateProduct from './createProducts/CreateProduct'
function Pages(){
    return (
        <Switch>          

            <Route path ="/" exact component = {Products} />
            <Route path ="/detail/:id" exact component = {DetailProduct} />
            <Route path ="/login" exact component = {Login} /> 
            <Route path ="/register" exact component = {Register}/>         
            <Route path ="/cart" exact component = {Cart} />       
            <Route path ="/history" exact component = {OderHistory} />      
            <Route path ="/history/:id" exact component = {OderDetail} />       
            <Route path = "/create_product" exact component = {CreateProduct} />
            <Route path ="/category" exact component = {Category} />   
            <Route path ="/edit_product/:id" exact component = {CreateProduct} />       


        </Switch>
    )
}
export default Pages