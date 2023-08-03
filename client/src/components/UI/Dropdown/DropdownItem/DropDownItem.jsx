import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import './DropdownItem.css'
const DropDownItem = ({icon, to, children}) => {
    const navigate = useNavigate();
    return (
        <div onClick={e => navigate(to)} className='container__dropDownItem'>
            <div className='icon__dropDownItem'>{icon}</div>
            <p className='link__dropDownItem'>{children}</p>
        </div>
    );
};

export default DropDownItem;