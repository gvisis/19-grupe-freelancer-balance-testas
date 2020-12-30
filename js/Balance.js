import { account } from "./data.js"

class Balance{ 
    constructor(selector, data, months){

    this.selector = selector;
    this.data = data;
    this.months = months;

    this.init();
    }

    init(){
        this.renderHTML();
        this.yearSummary();
    }

    generateRow(){
        let HTML = '';
        
        // Sorted month numbers as the list
        const monthsNumSorted = [...Object.values(this.data)].map(x => x.month).sort((a,b) => a - b);

        let monthsBalance = 0;
        for (let i = 0; i < this.data.length; i++){
            const items = this.data[i];
            
            items.income = items.income ? items.income : 0;
            items.expense = items.expense ? items.expense : 0;
            monthsBalance += items.income - items.expense;
            
            HTML += `<div class="table-row">
                        <div class="cell">${monthsNumSorted[i]}</div>
                        <div class="cell">${this.months[items.month - 1]}</div>
                        <div class="cell">${items.income} Eur</div>
                        <div class="cell">${items.expense} Eur</div>
                        <div class="cell">${monthsBalance} Eur</div>
                    </div>`
            }
        return HTML;
    }

    generateTotal(){
        let totalIncome = 0;
        let totalExpenses = 0;

        //Calculates total income and expenses
        totalIncome = Math.max(...Object.values(account).map(x => totalIncome += x.income ? x.income : 0));
        totalExpenses = Math.max(...Object.values(account).map(x => totalExpenses += x.expense ? x.expense : 0));
        
        const totalBalance = totalIncome - totalExpenses;
            
        const HTML = `<div class="cell"></div>
            <div class="cell"></div>
            <div class="cell">${totalIncome} Eur</div>
            <div class="cell">${totalExpenses} Eur</div>
            <div class="cell">${totalBalance} Eur</div>`
        return HTML;
    }

    yearSummary(){
        let minIncome = 0;
        let maxIncome = 0;
        let minExpense = 0;
        let maxExpense = 0;
        
        const minIncomeDOM = document.querySelector('#minIncome');
        const maxIncomeDOM = document.querySelector('#maxIncome');
        const minExpenseDOM = document.querySelector('#minExpense');
        const maxExpenseDOM = document.querySelector('#maxExpense');
        
        // Finds the max and min Incomes
        maxIncome = Math.max.apply(0, account.map(x => x.income)); 
        minIncome = Math.min.apply(0, account.filter(x => x.income > 0).map(x => x.income)); 

        // Finds the max and min expenses
        maxExpense = Math.max.apply(0, account.map(x => x.expense )); 
        minExpense = Math.min.apply(0, account.filter(x => x.expense > 0).map(x => x.expense )); 

        // When max and min values are found, they are checked with the months index and printed to the selected places;
        for (let {month, income, expense} of this.data){
            if (income === minIncome) minIncomeDOM.innerText = this.months[month -1]; 
            if (income === maxIncome) maxIncomeDOM.innerText = this.months[month -1]; 
            if (expense === minExpense) minExpenseDOM.innerText = this.months[month -1]; 
            if (expense === maxExpense) maxExpenseDOM.innerText = this.months[month -1]; 
        }
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