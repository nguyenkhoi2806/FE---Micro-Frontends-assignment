import { mountRemoteComponent } from "@/utils/loadComponent";
import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryMemu = () => {
  const onMenuClick = () => {
    $(".hero__categories ul").slideToggle(400);
  };

  const navigate = useNavigate();

  return (
    <div className="hero__categories">
      <div className="hero__categories__all" onClick={onMenuClick}>
        <i className="fa fa-bars" />
        <span>All Departments</span>
      </div>
      {mountRemoteComponent({
        module: "product",
        component: "MenuCategory",
        props: {
          navigate,
        },
      })}
    </div>
  );
};

export default CategoryMemu;
