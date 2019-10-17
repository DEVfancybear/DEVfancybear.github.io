
class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [
                {
                    id: 1,
                    thumbnail: 'https://colorlib.com/etc/fashe/images/item-10.jpg',
                    name: 'Men Tshirt',
                    price: 1000000,
                    quantity: 1,
                    rating:4
                },
                {
                    id: 2,
                    thumbnail: 'https://colorlib.com/etc/fashe/images/item-05.jpg',
                    name: 'Mug Adventure',
                    price: 500000,
                    quantity: 1,
                    rating:3
                }
            ]
        };
    }
    nhapSoluong(index,value){
        const newProduct=this.state.products;
        newProduct[index].quantity=value;
        this.setState({
           quantity: newProduct
       })
      
       
    }
    // <input defulfValue=>value>
     tangSoluong(index){
         const newProduct=this.state.products;
         newProduct[index].quantity++;
         this.setState({
             quantity: newProduct
         })
     }
     giamSoluong(index){
        const newProduct=this.state.products;
        newProduct[index].quantity--;
        this.setState({
            quantity: newProduct
        })
     }
     xoaSanpham(index){
       const newProduct=this.state.products;
       newProduct.splice(index,1);
       this.setState({
        products: newProduct
     })
     }
     
    render() {
        const products = this.state.products;
        let cartItems = [];
        let totalPrice = 0;

        for (let i = 0; i < products.length; i++) {
            const product = products[i];

            totalPrice += product.price * product.quantity

            cartItems.push(
                <tr className="table-row" key={product.id}>
                    <td className="column-1">
                        <div className="cart-img-product b-rad-4 o-f-hidden">
                            <img src={product.thumbnail} alt="IMG-PRODUCT" />
                        </div>
                    </td>
                    <td className="column-2">
                    {product.name}
                    <br/>
                    <br/>
                    <Rating value={product.rating}/>
                    <br/>
                    <br/>
                    <button><i className="fa fa-2x fa-trash" onClick={() => this.xoaSanpham(i)}></i></button>
                    </td>
                    
                    <td className="column-3">VND{product.price}</td>
                    <td className="column-4">
                        <div className="flex-w bo5 of-hidden w-size17">
                            <button className="btn-num-product-down color1 flex-c-m size7 bg8 eff2"onClick={()=>this.giamSoluong(i)}>
                                <i className="fs-12 fa fa-minus" aria-hidden="true" />
                            </button>
                            <input className="size8 m-text18 t-center num-product" type="number" name="num-product1" value={product.quantity} onChange={() => this.nhapSoluong(i,event.target.value)} />
                            <button className="btn-num-product-up color1 flex-c-m size7 bg8 eff2"onClick={()=>this.tangSoluong(i)}>
                                <i className="fs-12 fa fa-plus" aria-hidden="true" />
                            </button>
                        </div>
                    </td>
                    <td className="column-5">${product.price * product.quantity}</td>
                </tr>
            )
        }

        return (
            <div>
                <section className="bg-title-page p-t-40 p-b-50 flex-col-c-m" style={{ backgroundImage: 'url(https://colorlib.com/etc/fashe/images/heading-pages-01.jpg)' }}>
                    <h2 className="l-text2 t-center">
                        Cart
                    </h2>
                </section>
                {/* Cart */}
                <section className="cart bgwhite p-t-70 p-b-100">
                    <div className="container">
                        {/* Cart item */}
                        <div className="container-table-cart pos-relative">
                            <div className="wrap-table-shopping-cart bgwhite">
                                <table className="table-shopping-cart">
                                    <tbody>
                                        <tr className="table-head">
                                            <th className="column-1" />
                                            <th className="column-2">Product</th>
                                            <th className="column-3">Price</th>
                                            <th className="column-4 p-l-70">Quantity</th>
                                            <th className="column-5">Total</th>
                                        </tr>

                                        {/* Danh sach san pham */}
                                        {cartItems}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex-w flex-sb-m p-t-25 p-b-25 bo8 p-l-35 p-r-60 p-lr-15-sm">
                            <div className="flex-w flex-m w-full-sm">
                                <div className="size11 bo4 m-r-10">
                                    <input className="sizefull s-text7 p-l-22 p-r-22" type="text" name="coupon-code" placeholder="Coupon Code" />
                                </div>
                                <div className="size12 trans-0-4 m-t-10 m-b-10 m-r-10">
                                    {/* Button */}
                                    <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
                                        Apply coupon
                                    </button>
                                </div>
                            </div>
                            <div className="size10 trans-0-4 m-t-10 m-b-10">
                                {/* Button */}
                                <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
                                    Update Cart
                                </button>
                            </div>
                        </div>
                        {/* Total */}
                        <Tonghop value={totalPrice}/>
                    </div>
                </section>
            </div>

        )
    }

}
