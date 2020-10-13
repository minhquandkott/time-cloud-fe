import React from 'react';
import history from '../../../history/index';
import {Route, Link} from 'react-router-dom';
import './MenuProjectDetail.css';

const MenuLink = ({label, to, activeOnlyWhenExact}) => {
    return (
        
        <Route path={to} exact ={activeOnlyWhenExact} children = {({match}) => {
            var active = match ? 'active' : '';
            return (
                <li className = {`my-li ${active}`}>
                    <Link to ={to} className="my-link">
                        {label}
                    </Link>
                </li>
            )
        }}
        />
    )
}

class MenuProjectDetail extends React.Component {

    showMenu = (menu) => {
        var result = null;
        result = menu.map((item, index) => {
            return (
                <MenuLink key={index} label={item.label} to={item.to} activeOnlyWhenExact={item.exact} />
            )
        });
        return result;
    }

    render() {
        var pathname = history.location.pathname;
        var menu = [
            {
                label : 'Task',
                to : `${pathname}/task`,
                exact : false
            },
            {
                label : 'Team',
                to : `${pathname}/team`,
                exact : false
            },
            {
                label : 'Discussion',
                to : `${pathname}/discussion`,
                exact : false
            }
        ]
        return (
            <div className = "menu_project_detail">
                {this.showMenu(menu)}
            </div>
        )
    }
} 

export default MenuProjectDetail;