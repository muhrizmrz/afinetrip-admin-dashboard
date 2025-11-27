import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import AgentList from "../pages/AgentList";
import AddAgent from "../pages/AddAgent";
import AddClass from "../pages/AddClass";
import AgClassList from "../pages/AgClassList";
import LoginPage from "../pages/LoginPage";
import AgentDepositRequestList from "../pages/AgentDepReqList";
import SupplierListPage from "../pages/SupplierListPage";
import FlightBookingListPage from "../pages/FlightBookingListPage";
import B2CFlightMarkupPage from "../pages/B2CFlightMarkupPage";
import AddBlogCategoryFormPage from "../pages/AddBlogCategoryFormPage";
import AddBlogFormPage from "../pages/AddBlogPage";
import AddNewCustomerFormPage from "../pages/AddNewCustomerPage";
import SystemSettingsPage from "../pages/SystemSettingsPage";
import Guest from './authComponents/Guest';
import Protected from './authComponents/Protected';
import MainWallet from '../pages/MainWallet';
import AdminLayout from './admin/AdminLayout/AdminLayout';
import AddAgentPage from '../pages/agents/AddAgentPage';
import EditAgentPage from '../pages/agents/EditAgentPage';

function RoutesList() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={
                    <Guest>
                        <LoginPage />
                    </Guest>
                } />
                <Route path="/" element={
                    <Protected route={true} roles={['admin']}>
                        <AdminDashboard />
                    </Protected>
                } />
                <Route path="/agentlist" element={
                    <Protected route={true} roles={['admin']}>
                        <AgentList />
                    </Protected>
                } />
                <Route path="/topup" element={
                    <Protected route={true} roles={['admin']}>
                        <AdminLayout children={<MainWallet />} />
                    </Protected>
                } />
                <Route path="/add-agent" element={
                    <Protected route={true} roles={['admin']}>
                        <AdminLayout children={<AddAgentPage />} />
                    </Protected>
                } />
                <Route path="/edit-agent/:id" element={
                    <Protected route={true} roles={['admin']}>
                        <AdminLayout children={<EditAgentPage />} />
                    </Protected>
                } />
                <Route path="/addclass" element={
                    <Protected route={true} roles={['admin']}>
                        <AddClass />
                    </Protected>
                } />
                <Route path="/classlist" element={
                    <Protected route={true} roles={['admin']}>
                        <AgClassList />
                    </Protected>
                } />
                <Route path="/depreqlist" element={
                    <Protected route={true} roles={['admin']}>
                        <AgentDepositRequestList />
                    </Protected>
                } />
                <Route path="/supplierlist" element={
                    <Protected route={true} roles={['admin']}>
                        <SupplierListPage />
                    </Protected>
                } />
                <Route path="/flightbookinglist" element={
                    <Protected route={true} roles={['admin']}>
                        <FlightBookingListPage />
                    </Protected>
                } />
                <Route path="/addb2cflightmarkup" element={
                    <Protected route={true} roles={['admin']}>
                        <B2CFlightMarkupPage />
                    </Protected>
                } />
                <Route path="/addblogcategory" element={
                    <Protected route={true} roles={['admin']}>
                        <AddBlogCategoryFormPage />
                    </Protected>
                } />
                <Route path="/addblog" element={
                    <Protected route={true} roles={['admin']}>
                        <AddBlogFormPage />
                    </Protected>
                } />
                <Route path="/addnewcustomer" element={
                    <Protected route={true} roles={['admin']}>
                        <AddNewCustomerFormPage />
                    </Protected>
                } />
                <Route path="/systemsettings" element={
                    <Protected route={true} roles={['admin']}>
                        <SystemSettingsPage />
                    </Protected>
                } />
            </Routes>
        </Router>
    )
}

export default RoutesList