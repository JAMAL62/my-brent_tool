var numbers=[20,34,56,798];
var total=0;
function sumOfNumbers(arrayOfNumbers)
{
    for(var i=0; i<arrayOfNumbers.length;i++)
    {
        total=total+arrayOfNumbers[i];
    }
    return total
}
console.log(sumOfNumbers(numbers));