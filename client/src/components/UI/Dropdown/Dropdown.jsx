import React, {useState} from 'react';
import classes from './Dropdown.module.css'

const Dropdown = ({parent, children}) => {
    const [open, setOpen] = useState(false)

    document.addEventListener('mouseup', (e)=>{
        const array = ['enter__button',
            classes.dropdown__content,
            'container__dropDownItem',
            'icon__dropDownItem',
            'link__dropDownItem',
            'logout__button']
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
                    {children}
                </div>
                : ''}
        </div>
    );
};

export default Dropdown;