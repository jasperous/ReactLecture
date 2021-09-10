import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Nav, Alert } from 'react-bootstrap';
import './Detail.css';
import { CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';

let DetailContext = React.createContext();

function Detail(props) {
    let history = useHistory();
    let { id } = useParams();
    let [showAlert, toggleAlert] = useState(true);
    let [transition, toggleTransition] = useState(false);

    let dispatch = useDispatch();

    useEffect(() => {
        let timer = setTimeout(() => {
            toggleAlert(false);
        }, 2000);
        toggleTransition(true);
        return () => { clearTimeout(timer) }
    }, [])
    return (
        <div className="container">
            {
                showAlert ? <AlertMessage /> : null
            }
            <DetailContext.Provider value={props.shoeList}>
                <DetailTabs transition={transition} toggleTransition={toggleTransition}></DetailTabs>
            </DetailContext.Provider>
            <CSSTransition in={transition} classNames="details" timeout={1000}>
                <div className="row">
                    <div className="col-md-6">
                        <img src={props.shoeList[id].imgSrc} width="100%" />
                    </div>
                    <div className="col-md-6 mt-4">
                        <h4 className="pt-5">{props.shoeList[id].title}</h4>
                        <p>{props.shoeList[id].content}</p>
                        <p>{props.shoeList[id].price}</p>
                        <p>Stock Left : {props.shoeStock[id]}</p>
                        <button className="btn btn-danger">Order</button>
                        &nbsp;
                        <button className="btn btn-warning" onClick={() => { history.goBack() }}>Back</button>
                        &nbsp;
                        <button className="btn btn-success" onClick={() => { history.push("/cart"); dispatch({ type: "add", payload: props.shoeList[id] }) }}>Add to Cart</button >
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
};

function AlertMessage() {
    return (
        <div>
            OUT OF STOCK!
        </div>
    )
}

function DetailTabs(props) {
    let shoeList = useContext(DetailContext);
    return (
        <div className="DetailTabs">
            <Nav defaultActiveKey="/home" as="ul">
                {
                    shoeList.map((content, index) => {
                        return (
                            <Nav.Item as="li" key={index} onClick={() => { props.toggleTransition(false) }}>
                                <Nav.Link href={"/detail/" + index}>{index}</Nav.Link>
                            </Nav.Item>
                        )
                    })
                }
            </Nav>
        </div>
    )
}

export default Detail;