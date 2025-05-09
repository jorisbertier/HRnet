import { createContext, useState, useContext } from "react"
import EmployeeList from '../datas/employees.json'

const EmployeeContext = createContext()

export const EmployeeProvider = ({ children }) => {

    // const employeeList =  JSON.stringify(EmployeeList)
    // console.log(employeeList)
    const [employees, setEmployees] = useState(EmployeeList)

    const addEmployee = (employee) => {
        setEmployees((prev) => [...prev, employee])
    }

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee }}>
        {children}
        </EmployeeContext.Provider>
    )
}

export const useEmployees = () => useContext(EmployeeContext)
