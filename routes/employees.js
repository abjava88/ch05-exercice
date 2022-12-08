const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')

// Getting all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find()
    res.json(employees)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One Employee
router.get('/:id', getEmployee, (req, res) => {
  res.status(200).json(res.employee)
})

// Creating one employee
router.post('/', async (req, res) => {
  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate
  })
  try {
    const newEmployee = await employee.save()
    res.status(201).json(newEmployee)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.post('/:id', async (req, res) => {
  try {
    const modifiedEmployee = await Employee.findByIdAndUpdate(req.params.id, {firstName: req.body.firstName, lastName: req.body.lastName, birthDate: req.body.birthDate})
    res.json(modifiedEmployee)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getEmployee, async (req, res) => {
  try {
    await res.employee.remove()
    res.json({ message: 'Deleted employee' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getEmployee(req, res, next) {
  let employee
  try {
    employee = await Employee.findById(req.params.id)
    if (employee == null) {
      return res.status(404).json({ message: 'Cannot find employee' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.employee = employee
  next()
}

module.exports = router