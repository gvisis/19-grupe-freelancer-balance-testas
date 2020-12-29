import { account } from "./data.js"
import { Balance } from "./Balance.js"

const balance = new Balance('.table', account)
balance.renderHTML();