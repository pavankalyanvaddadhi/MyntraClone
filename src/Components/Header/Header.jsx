import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchTerm, selectCategory } from '../../store/reducers';
import { ShoppingCart } from 'lucide-react';
import CustomButton from "../ReusuableComponents/CustomButton";

const Header = () => {
  const [searchData, updateSearchData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (event) => {
    const value = event.target.value;
    updateSearchData(value);
    dispatch(updateSearchTerm(value));
  };

  const handleCategoryClick = (category) => {
    dispatch(selectCategory(category));
  };

  const handleLogin = () => navigate("/Login");
  const handleHome = () => navigate("/");
  const handleCart = () => navigate("/cart");

  return (
    <div className="header" style={{ 
      position: "sticky", 
      top: "0", 
      backgroundColor: "white", 
      zIndex: 1000,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <div className="subheader" style={{ 
        display: "flex", 
        alignItems: "center",
        padding: "10px 20px"
      }}>
        <img
          src={"https://images.indianexpress.com/2021/01/myntra.png"}
          style={{ width: "100px", cursor: "pointer" }}
          alt="Logo"
          onClick={handleHome}
        />
        <div className="navbuttons" style={{ 
          display: "flex", 
          gap: "10px",
          margin: "0 20px"
        }}>
          <CustomButton 
            text="All" 
            variant="text" 
            backgroundColor={searchData === "" ? "#e72744" : "#f5f5f5"}
            color={searchData === "" ? "white" : "black"}
            onClick={() => handleCategoryClick("")} 
          />
          <CustomButton 
            text="Mens" 
            variant="text" 
            backgroundColor={searchData === "men's clothing" ? "#e72744" : "#f5f5f5"}
            color={searchData === "men's clothing" ? "white" : "black"}
            onClick={() => handleCategoryClick("men's clothing")} 
          />
          <CustomButton 
            text="Women" 
            variant="text" 
            backgroundColor={searchData === "women's clothing" ? "#e72744" : "#f5f5f5"}
            color={searchData === "women's clothing" ? "white" : "black"}
            onClick={() => handleCategoryClick("women's clothing")} 
          />
          <CustomButton 
            text="Jewellery" 
            variant="text" 
            backgroundColor={searchData === "jewelery" ? "#e72744" : "#f5f5f5"}
            color={searchData === "jewelery" ? "white" : "black"}
            onClick={() => handleCategoryClick("jewelery")} 
          />
          <CustomButton 
            text="Electronics" 
            variant="text" 
            backgroundColor={searchData === "electronics" ? "#e72744" : "#f5f5f5"}
            color={searchData === "electronics" ? "white" : "black"}
            onClick={() => handleCategoryClick("electronics")} 
          />
        </div>
        <div className="headerinside" style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          flexGrow: 1 
        }}>
          <input
            type="search"
            placeholder="Search for Products, Brands and more"
            style={{ 
              width: "400px", 
              height: "40px", 
              padding: "0 15px",
              border: "1px solid #ddd",
              borderRadius: "4px"
            }}
            onChange={handleSearch}
            value={searchData}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div onClick={handleCart} style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            cursor: "pointer",
            position: "relative"
          }}>
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                background: "#e72744",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px"
              }}>
                {cartItemCount}
              </span>
            )}
            <p style={{ marginTop: "4px", fontSize: "14px" }}>Cart</p>
          </div>
          <div onClick={handleLogin} style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            cursor: "pointer"
          }}>
            <img
              src="https://thumbs.dreamstime.com/b/person-icon-flat-style-man-symbol-person-icon-flat-style-man-symbol-isolated-white-background-simple-people-abstract-icon-118611127.jpg"
              style={{ width: "30px", height: "30px" }}
              alt="Profile"
            />
            <p style={{ marginTop: "4px", fontSize: "14px" }}>Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;