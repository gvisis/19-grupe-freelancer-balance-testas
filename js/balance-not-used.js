class Balance{ 
    constructor(selector, data){

    this.selector = selector;
    this.data = data;
    
    this.init();
    }

    init(){
        this.renderHTML();
    }

    generateRow(){
        let HTML = '';
        const dataLength = this.data.length
        const rowsData = this.data;
        for (let i = 0; i < dataLength; i++){
            if (typeof rowsData[i].income === 'undefined' ){
                rowsData[i].income = 0;
            }
            if (typeof rowsData[i].expense === 'undefined' ){
                rowsData[i].expense = 0;
            }
            const balance = rowsData[i].income - rowsData[i].expense;
        HTML += `<div class="table-row">
                    <div class="cell">${i+1}</div>
                    <div class="cell">${rowsData[i].month}</div>
                    <div class="cell">${rowsData[i].income} Eur</div>
                    <div class="cell">${rowsData[i].expense} Eur</div>
                    <div class="cell">${balance} Eur</div>
                </div>`
        }
        return HTML;
    }

    generateTotal(){
        let totalIncome = 0;
        let totalExpenses = 0;
        
        for (let {income, expense} of this.data){
            totalIncome += income
            totalExpenses += expense;
        }
        const totalBalance = totalIncome - totalExpenses;
        
        const HTML = `<div class="cell"></div>
            <div class="cell"></div>
            <div class="cell">${totalIncome.toFixed(2)} Eur</div>
            <div class="cell">${totalExpenses.toFixed(2)} Eur</div>
            <div class="cell">${totalBalance.toFixed(2)} Eur</div>`
        return HTML;
    }

    renderHTML(){
        let HTML = '';
        this.renderHTML = document.querySelector(this.selector);
        HTML += `<div class="table-content">
                    ${this.generateRow()}
                </div>
                <div class="table-footer">
                    ${this.generateTotal()}
                </div>`

        return this.renderHTML.innerHTML += HTML;
    }

}

export { Balance }

// Total income and expenses
// Object.values(account) takes the values of the object 
// map function adds all the needed values to get the number
// Math.max uses an array , thats why ... was used to make it an array. At the end it gets the highest value of the array.

let totalIncome = 0;
let totalExpenses = 0;
totalIncome = Math.max(...Object.values(account).map(x => totalIncome += x.income ? x.income : 0));
totalExpenses = Math.max(...Object.values(account).map(x => totalExpenses += x.expense ? x.expense : 0));
const totalBalance = totalIncome - totalExpenses;

// accountEntries.forEach(([, value]) => {
//     monthsNum.push(value.month)
//   });
// console.log(monthsNum.sort((a,b) => a - b));
  
// export { account, months }