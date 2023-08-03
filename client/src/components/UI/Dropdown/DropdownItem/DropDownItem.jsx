import React from 'react';
import {Link} from "react-router-dom";
import './DropdownItem.css'
const DropDownItem = ({icon, to, children}) => {
    return (
        <div className='container__dropDownItem'>
            <div className='icon__dropDownItem'>{icon}</div>
            <Link className='link__dropDownItem' to={to}>{children}</Link>
        </div>
    );
};

export default DropDownItem;