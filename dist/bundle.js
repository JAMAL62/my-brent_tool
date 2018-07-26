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
var greetingMessage="Hello Gopi"
console.log(greetingMessage)
var greetingMessage="Hello Jhon!"
console.log(greetingMessage);
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
