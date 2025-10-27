import React from "react";
import Header from '../components/admin/AdminLayout/Header';
import Footer from '../components/Layout/Footer';
import Dashboard from '../components/admin/Dashboard'
import Sidebar from '../components/admin/Sidebar'
import footerImage from '/images/footer_image.svg'

function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen gradient-bg">
      <Header />
      <div className="flex-grow container mx-auto grid grid-cols-12 gap-4 mt-40 w-full">
        {/* Sidebar */}
        <div className="col-span-2 rounded-xl md:rounded-none ">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <div className="col-span-10">
          <Dashboard />
        </div>
      </div>
      <div className="container mx-auto mt-40">
         <img src={footerImage} alt="Footer Image" className="w-full h-auto" />
      </div>
    
      <Footer />
    </div>
  );
}

export default AdminDashboard
