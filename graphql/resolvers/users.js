const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
const {UserInputError} = require('apollo-server');


const {validateRegisterInput, validateLoginInput, validatePasswordInput} = require('../../util/validators')
const {SECRET_KEY} = require('../../config');
const User = require('../../models/User');
const Comic = require('../../models/Comic');
const Story = require('../../models/Story');
const Comment = require('../../models/Comment');

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
        async follow(_, { id, followeduserid}) {
            try {
                var user = await User.findById(id);
                var otheruser = await User.findById(followeduserid);
                if(user.followedCreators.includes(followeduserid)){
                    var followedCreators = user.followedCreators.filter(function(e) { return e !== followeduserid })
                    var followers = otheruser.followers.filter(function(e) {return e !== id})
                    user = await User.findByIdAndUpdate(id, {followedCreators: followedCreators});
                    otheruser = await User.findByIdAndUpdate(followeduserid, {totalfollowers: otheruser.totalfollowers - 1, 
                        followers: followers})
                }else{
                    user = await User.findByIdAndUpdate(id, {followedCreators: [...user.followedCreators, followeduserid]});
                    otheruser = await User.findByIdAndUpdate(followeduserid, {totalfollowers: otheruser.totalfollowers + 1, 
                        followers: [...otheruser.followers, id]})
                }
                return user;
            } catch (err) {
                throw new Error(err);
            }
        },
        async likeComic(_, { id, likedComicId }) {
            try {
                var user = await User.findById(id);
                var comic = await Comic.findById(likedComicId);
                var otheruser = await User.findById(comic.authorId);
                if(user.likedComics.includes(likedComicId)){
                    var likedcomics = user.likedComics.filter(function(e) { return e !== likedComicId })
                    var likers = comic.likers.filter(function(e) { return e !== id })
                    user = await User.findByIdAndUpdate(id, {likedComics: likedcomics});
                    comic = await Comic.findByIdAndUpdate(likedComicId, {likes: comic.likes - 1, likers: likers})
                    otheruser = await User.findByIdAndUpdate(comic.authorId, {totallikes: otheruser.totallikes - 1})
                }else{
                    user = await User.findByIdAndUpdate(id, {likedComics: [...user.likedComics, likedComicId]});
                    comic = await Comic.findByIdAndUpdate(likedComicId, {likes: comic.likes + 1, likers: [...comic.likers, id]})
                    otheruser = await User.findByIdAndUpdate(comic.authorId, {totallikes: otheruser.totallikes + 1})
                }
                return user;
            } catch (err) {
                throw new Error(err);
            }
        },
        async likeStory(_, { id, likedStoryId }) {

            try {
                var user = await User.findById(id);
                var story = await Story.findById(likedStoryId);
                var otheruser = await User.findById(story.authorId);
                if(user.likedStories.includes(likedStoryId)){
                    var likedstories = user.likedStories.filter(function(e) { return e !== likedStoryId })
                    var likers = story.likers.filter(function(e) { return e !== id })
                    user = await User.findByIdAndUpdate(id, {likedStories: likedstories});
                    story = await Story.findByIdAndUpdate(likedStoryId, {likes: story.likes - 1, likers: likers})
                    otheruser = await User.findByIdAndUpdate(story.authorId, {totallikes: otheruser.totallikes - 1})
                }else{
                    user = await User.findByIdAndUpdate(id, {likedStories: [...user.likedStories, likedStoryId]});
                    story = await Story.findByIdAndUpdate(likedStoryId, {likes: story.likes + 1, likers: [...story.likers, id]})
                    otheruser = await User.findByIdAndUpdate(story.authorId, {totallikes: otheruser.totallikes + 1})
                }
                return user;
            } catch (err) {
                throw new Error(err);
            }
        },
        async deleteUser(_,{id}){
            let {errors} = ""

            var user = await User.findById(id);
            if(!user){
                errors.general = 'User not found'
                throw new UserInputError('User not found',{errors});
            }
            for(let i = 0; i < user.followedCreators.length; i++){
                var otheruser = await User.findById(user.followedCreators[i]);
                if(otheruser){
                    var followers = otheruser.followers.filter(function(e) {return e !== id})
                    otheruser = await User.findByIdAndUpdate(user.followers[i], {totalfollowers: otheruser.totalfollowers - 1, followers: followers}) 
                }
            }

            for(let i = 0; i < user.followers.length; i++){
                var otheruser = await User.findById(user.followers[i]);
                if(otheruser){
                    var followedCreators = otheruser.followedCreators.filter(function(e) {return e !== id})
                    otheruser = await User.findByIdAndUpdate(user.followers[i], {followedCreators: followedCreators}) 
                }
            }

            for(let i = 0; i < user.likedComics.length; i++){
                var comic = await Comic.findById(user.likedComics[i]);
                if(comic){
                    var otheruser = await User.findById(comic.authorId)
                    var likers = comic.likers.filter(function(e) {return e !== id})
                    comic = await Comic.findByIdAndUpdate(user.likedComics[i], {likes: comic.likes - 1, likers: likers})
                    otheruser = await User.findByIdAndUpdate(comic.authorId, {totallikes: otheruser.totallikes - 1}) 
                }
            }

            for(let i = 0; i < user.likedStories.length; i++){
                var story = await Story.findById(user.likedStories[i]);
                if(story){
                    var otheruser = await User.findById(story.authorId)
                    var likers = story.likers.filter(function(e) {return e !== id})
                    story = await Story.findByIdAndUpdate(user.likedStories[i], {likes: story.likes - 1, likers: likers})
                    otheruser = await User.findByIdAndUpdate(story.authorId, {totallikes: otheruser.totallikes - 1}) 
 
                }
            }

            const comics = await Comic.find()
            for(let i = 0; i < comics.length; i++){
                if(comics[i].authorId === id){
                    for(let j = 0; j < comics[i].likers.length; j++){
                        var otheruser = await User.findById(comics[i].likers[j])
                        likedComics = otheruser.likedComics.filter(function(e) {return e !== comics[i].id})
                        otheruser = await User.findByIdAndUpdate(comics[i].likers[j], {likedComics: likedComics})
                    }

                    var comments = await Comment.find()
                    for(let j = 0; j < comments.length; j++){
                        if(comments[j].id === comics[i].id){
                            await comments[j].delete();
                        }
                    }

                    await comics[i].delete();
                }
            }

            const stories = await Story.find()
            for(let i = 0; i < stories.length; i++){
                if(stories[i].authorId === id){
                    for(let j = 0; j < stories[i].likers.length; j++){
                        var otheruser = await User.findById(stories[i].likers[j])
                        likedStories = otheruser.likedStories.filter(function(e) {return e !== stories[i].id})
                        otheruser = await User.findByIdAndUpdate(stories[i].likers[j], {likedStories: likedStories})
                    }

                    var comments = await Comment.find()
                    for(let j = 0; j < comments.length; j++){
                        if(comments[j].id === stories[i].id){
                            await comments.delete();
                        }
                    }
                    await stories[i].delete();
                }
            }


            await User.findByIdAndDelete(user.id);
            return 'User Deleted Successfully';
        }
    }
}