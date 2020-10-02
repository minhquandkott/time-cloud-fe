import React from 'react';
import './CountUser.css';

class CountUser extends React.Component {
    
    render() {
        var {ele, index, amount} = this.props;
        if(index > 1) {
            return <div key={index} className = "count_user"> {`+${amount-2}`} </div>
        } else {
            return <img key={index} alt="" src = {ele.avatar ? ele.avatar : "https://lh3.googleusercontent.com/Z0wGo46-ppzUrcTZzz8VS5kKxIPgJGH74gzpCdLmcKbDbSz2BxaD64EuWADpGpbLGDBN=w720-h310-rw"} />
        }
    }
}

export default CountUser;