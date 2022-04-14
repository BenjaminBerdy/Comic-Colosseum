const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
const {UserInputError} = require('apollo-server');

const {validateRegisterInput, validateLoginInput, validatePasswordInput} = require('../../util/validators')
const {SECRET_KEY} = require('../../config');
const User = require('../../models/User');

function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    },SECRET_KEY,{expiresIn: '1h'});
}

module.exports = {
    Query:{
        async getUsers(){
            try{
                const user = await User.find();
                return user;
            }catch(err){
                throw new Error(err);
            }
        },
        async getUser(_,{id}){
            try{
                const user = await User.findById(id);
                return user;
            }catch(err){
                throw new Error(err);
            } 
        }
    },
    Mutation: {
        async register(
            _,
            {
                registerInput:{ username,email,password,confirmPassword}
            }){
            //TODO validate user data
            const {valid,errors} = validateRegisterInput(username,email,password,confirmPassword);
            if(!valid){
                throw new UserInputError('Errors', { errors });
            }
            //TODO Make sure user doesnt already exist
            var user = await User.findOne({username})
            if(user){
                throw new UserInputError('Username is taken',{
                    errors:{
                        username: 'This username is taken'
                    }})
            }
            user = await User.findOne({email})
            if(user){
                throw new UserInputError('Email is taken',{
                    errors:{
                        email: 'This email is already being used'
                    }})
            }
            //TODO hash password and create auth token
            password = await bcrypt.hash(password,12);
            const newUser = new User({
                email,
                username,
                password,
                totallikes: 0,
                totalfollowers: 0
            });
            const res = await newUser.save();
            const token = generateToken(res);

            return{
                ...res._doc,
                id: res._id,
                token
            };
        },
        async login(_,{username,password}){
            const {errors,valid} = validateLoginInput(username,password);
            if(!valid){
                throw new UserInputError('Errors',{errors});
            }

            const user = await User.findOne({username});
            if(!user){
                errors.general = 'User not found'
                throw new UserInputError('User not found',{errors});
            }
            const match = await bcrypt.compare(password,user.password);
            if(!match){ 
                errors.general = 'Incorrect username or password'
                throw new UserInputError('Incorrect username or password',{errors});
            }

            const token = generateToken(user)

            return{
                ...user._doc,
                id: user._id,
                token
            };

        },
        async changePassword(_, {id, username, password, newpassword}){
            const {errors,valid} = validateLoginInput(username,password);
            if(!valid){
                throw new UserInputError('Errors',{errors});
            }

            var user = await User.findOne({username});
            if(!user){
                errors.general = 'User not found'
                throw new UserInputError('User not found',{errors});
            }
            const match = await bcrypt.compare(password,user.password);
            if(!match){ 
                errors.general = 'Incorrect username or password'
                throw new UserInputError('Incorrect username or password',{errors});
            }

            newpassword = await bcrypt.hash(newpassword,12);

            user = await User.findByIdAndUpdate(id,{password: newpassword});
            const token = generateToken(user)
            return{
                ...user._doc,
                id: user._id,
                token
            };

        },
        async forgotPassword(_,{email}){
            const errors = {}
            const user = await User.findOne({email});
            if(!user){
                errors.general = 'No account with this email exists'
                throw new UserInputError('No account with this email exists',{errors});
            }
            const secret = SECRET_KEY + user.password;
            const token = jwt.sign({
                id: user.id,
                email: user.email,
            },secret,{expiresIn: '15m'});

            const link = `https://cute-pavlova-b06b1e.netlify.app/resetpassword/${user.id}/${token}`;
            return link;

        },
        async resetPassword(_,{token,id,newpassword,confirmpassword}){
            const {errors,valid} = validatePasswordInput(newpassword,confirmpassword);
            if(!valid){
                throw new UserInputError('Errors',{errors});
            }
            var user = await User.findById(id);
            if(!user){
                errors.general = 'Invalid ID'
                throw new UserInputError('Invalid ID',{errors});
            }
            const secret = SECRET_KEY + user.password;
            try{
                const payload = jwt.verify(token,secret)
                if (newpassword !== confirmpassword){
                    errors.general = 'New password doesnt match'
                    throw new UserInputError('New password doesnt match',{errors});
                }
                newpassword = await bcrypt.hash(newpassword,12);
                user = await User.findByIdAndUpdate(id,{password: newpassword});
                return user;
            }catch(err){
                throw new Error(err)
            }

        },
        async follow(_, { id, followedCreators }) {

            try {
                const user = await User.findByIdAndUpdate(id, {followedCreators: followedCreators});
                return user;
            } catch (err) {
                throw new Error(err);
            }
        },
        async likedComicsListUpdate(_, { id, likedComics }) {

            try {
                const user = await User.findByIdAndUpdate(id, {likedComics: likedComics});
                return user;
            } catch (err) {
                throw new Error(err);
            }
        },
        async likedStoriesListUpdate(_, { id, likedStories }) {

            try {
                const user = await User.findByIdAndUpdate(id, {likedStories: likedStories});
                return user;
            } catch (err) {
                throw new Error(err);
            }
        },
        async deleteUser(_,{username,password}){
            const {errors,valid} = validateLoginInput(username,password);
            if(!valid){
                throw new UserInputError('Errors',{errors});
            }

            var user = await User.findOne({username});
            if(!user){
                errors.general = 'User not found'
                throw new UserInputError('User not found',{errors});
            }
            const match = await bcrypt.compare(password,user.password);
            if(!match){ 
                errors.general = 'Incorrect username or password'
                throw new UserInputError('Incorrect username or password',{errors});
            }
            await User.findByIdAndDelete(user.id);
            return 'Comment Deleted Successfully';
        }
    }
}