const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/user')
const router = Router()

router.post('/register',
    [
        check('email', 'Email not valid').isEmail(),
        check('password', 'Minimal length password 6 symbols').isLength({min: 6})
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

        const {email, password} = req.body
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

router.get('/login',[
    check('email', 'Email not valid').normalizeEmail().isEmail,
    check('password', 'Password empty').exists()
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect data"
            })
        }

        const {email, password} = req.body
        const hashPassword = await bcrypt.hash(password, 'test')
        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message: 'Email or password is invalid'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'Email or password is invalid'})
        }

        const token = jsonwebtoken.sign(
            {
                userID: user.id
            },
            config.get('jwtSecret'),
            {expiresIn: '1h'})

        res.status(200).json({data: {token: token, userID: user.id}})
    } catch (e) {
        res.status(500).json('Something wrong')
    }
})

module.exports = router
