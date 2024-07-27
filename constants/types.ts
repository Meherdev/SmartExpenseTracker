export enum ExpenseFilter {
    Week = "Week",
    Month = "Month",
    Year = "Year"
}

export interface ExpenseType {
    id: string
    userId: string
    vendor: string
    amount: number
    category: string,
    currency: string,
    tax: string
    items: [Item]
  }
  
  export interface Item {
    item: string
    price: string
  }