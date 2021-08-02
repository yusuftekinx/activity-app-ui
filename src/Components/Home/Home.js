import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setName, setPhone } from '../../Redux/actions/action';
import '../../Stylesheet/Home/Home.css'
import AllMenu from './LeftMenu/AllMenu';
function Home(props) {
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        props.action[0](setPhone(user.phone))
        props.action[1](setName(user.name))

    })
    return (
        <div className = "home-component">
            <AllMenu />
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        action:bindActionCreators([setPhone,setName],dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);