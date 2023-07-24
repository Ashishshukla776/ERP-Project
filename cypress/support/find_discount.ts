
  function findDiscount(data){
      
    let discoutRate =data.discount_rate;
    data.variants.forEach((item)=>{
        item.discount = ( item.price/100)*discoutRate
        
    })
}

export default function findDiscountOfOrder(lines){
 
    for(let data of lines ){
        findDiscount(data)
    }
    return lines
}

