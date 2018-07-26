var numbers=[3,2,6];
var total=1;
function productOfNumbers(arrayOfNumbers)
{
    for(var i=0; i<arrayOfNumbers.length;i++)
    {
        total = total * arrayOfNumbers[i];
    }
    return total
}
console.log( productOfNumbers(numbers));