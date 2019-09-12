function Rating(props){
    let arr=[];
    for(let i=0;i<props.value;i++){
        arr.push(<i key={i} className="fa fa-star"></i>)
    }
    return arr;
}