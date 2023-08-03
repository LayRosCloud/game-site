import React, {useState} from 'react';
import classes from './Dropdown.module.css'
import DropDownItem from "./DropdownItem/DropDownItem";
const Dropdown = ({parent}) => {
    const [open, setOpen] = useState(false)

    document.addEventListener('mouseup', (e)=>{
        const array = ['enter__button', classes.dropdown__content, 'container__dropDownItem', 'icon__dropDownItem', 'link__dropDownItem']
        let hasClass = false
        array.map(className => {
            if(e.target.className === className){
                hasClass = true;
            }
        })
        if(hasClass === false){
            setOpen(hasClass)
        }
    })

    return (
        <div className={classes.dropdown}>
            <span onClick={()=> setOpen(!open)}>{parent}</span>
            {open
                ? <div className={classes.dropdown__content}>
                    <DropDownItem icon={'😀'} to='/'>профиль</DropDownItem>
                    <DropDownItem icon={'😀'} to='/'>dev panel</DropDownItem>
                    <DropDownItem icon={'😀'} to='/'>admin panel</DropDownItem>
                </div>
                : ''}
        </div>
    );
};

export default Dropdown;