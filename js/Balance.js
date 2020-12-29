class Balance{ 
    constructor(selector, data){

    this.selector = selector;
    this.data = data;

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
        HTML += `<div class="table-row">
                    <div class="cell">${i+1}</div>
                    <div class="cell">${rowsData[i].month}</div>
                    <div class="cell">${rowsData[i].income} Eur</div>
                    <div class="cell">${rowsData[i].expense} Eur</div>
                    <div class="cell">150.00 Eur</div>
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
        const HTML = `<div class="cell"></div>
            <div class="cell"></div>
            <div class="cell">${totalIncome.toFixed(2)} Eur</div>
            <div class="cell">${totalExpenses.toFixed(2)} Eur</div>
            <div class="cell">150.00 Eur</div>`
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