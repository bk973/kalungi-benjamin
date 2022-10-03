import {Routes, Route, Navigate} from "react-router-dom";
import Category from "./Category";
import React, {Component} from 'react';
import MainLayout from "../Layouts/MainLayout/MainLayout";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";

export default class AppRoutes extends Component
{
    render()
    {
        return (
            <MainLayout>
                <Routes>
                    <Route index element={<Navigate to='/categories/all' />} />
                    <Route path="categories/:name" element={<Category />} />
                    <Route path="product/:id" element={<ProductPage />} />
                    <Route path="cart" element={<CartPage />} />
                </Routes>
            </MainLayout>
        );
    }
}
