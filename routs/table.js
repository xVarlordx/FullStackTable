const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/user')
const router = Router()

router.post('/add',
    [
        check('name', 'Email not valid').isString(),
        check('power', 'Minimal length password 6 symbols').isNumeric(),
        check('status', 'Minimal length password 6 symbols').isBoolean()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect data"
            })
        }

        const {name, power, status} = req.body
        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({message: 'This email is exist'})
        }
        const hashPassword = await bcrypt.hash(password, 'test')
        const newUser = new User({email, password: hashPassword})
        await newUser.save()

        res.status(200).json({message: 'User was created'})

    } catch (e) {
        res.status(500).json('Something wrong')
    }
})

module.exports = router
