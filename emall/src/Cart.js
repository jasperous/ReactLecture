import { Button } from 'react-bootstrap'
import React, { memo, useEffect } from 'react'
import { Table, Card } from 'react-bootstrap'
import { connect, useDispatch, useSelector } from 'react-redux'

function Cart(props) {
    let cartData = useSelector((state) => state.reducer);
    let notification = useSelector((state) => state.reducer2);
    let dispatch = useDispatch()
    console.log(cartData);
    return (
        <div>
            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Content</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartData.map((content, index) => {
                            return (
                                <tr key={index}>
                                    <td>{cartData[index].id}</td>
                                    <td>{cartData[index].title}</td>
                                    <td>{cartData[index].content}</td>
                                    <td>{cartData[index].price}</td>
                                    <td>
                                        <button onClick={() => { dispatch({ type: "desc", payload: index }) }}>-</button>
                                        &nbsp;
                                        {cartData[index].quantity}
                                        &nbsp;
                                        <button onClick={() => { dispatch({ type: "inc", payload: index }) }}>+</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            {
                notification ?
                    <Card>
                        <Card.Body>Currently 20% OFF!
                            <br />
                            <Button className="btn btn-primary" onClick={() => { dispatch({ type: "close" }) }}>Close</Button>
                        </Card.Body>
                    </Card> : null
            }
            <Parent name="Jasepr" age="26"></Parent>
        </div >
    )
}

function Parent(props){
    return(
        <div>
            <Child1 name={props.name}></Child1>
            <Child2 age={props.age}></Child2>
        </div>
    )
}
function Child1(){
    useEffect(()=>{console.log("Rendered 1")});
    return(
        <div>
            1111
        </div>
    )
}
let Child2 = memo(()=>{
    useEffect(()=>{console.log("Rendered 2");})
    return(
        <div>
            2222
        </div>
    )
})
export default Cart;