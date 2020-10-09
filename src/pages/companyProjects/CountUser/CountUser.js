import React from 'react';
import './CountUser.css';
import male from '../../../assets/images/male.png';
import female from '../../../assets/images/female.png';

class CountUser extends React.Component {
    
    render() {
        var {ele, index, amount, rowStatus} = this.props;
        if(rowStatus) {
            if(index > 1) {
                return <div key={index} className = "count_user"> {`+${amount-2}`} </div>
            } else {
                return <div>
                            <img key={index} alt="" src = {ele.gender ? male : female} />
                        </div>
            }
        } else {
            return <div className = "count_user_item">
                        <img key={index} alt="" src = {ele.gender ? male : female} />
                        <div className = "count_user_item__name">
                            {ele.name}
                        </div>
                    </div>
        }
        
    }
}

export default CountUser;