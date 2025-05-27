
interface Option {
    value: string | number;
    label: string;
    disabled?: boolean;
  }
const  generateDriversAges=()=>{

    let numbers:Option[]=[]

    for (let index = 18; index <= 25; index++) {
const option:Option={label:index===25 ? `+${index}`: index.toString(),value:index}  
numbers.push(option)      
    }
    return numbers
}

export default generateDriversAges