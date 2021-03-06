const {gql} = require('apollo-server');

module.exports = gql`
    type Comment{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
        comicOrStoryId: String!
        userId: String!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        followedCreators: [String]!
        followers: [String]!
        likedComics: [String]!
        likedStories: [String]!
        totallikes: Int!
        totalfollowers: Int!
    }
    type Comic{
        id: ID!
        title: String!
        author: String!
        authorId: String!
        publishDate: String!
        likes: Int!
        likers: [String]!
        backgroundColor: String!
        linex: [Int]!
        liney: [Int]!
        points: [[Float]]!
        strokeWidth: [Int]!
        stroke: [String]!
        fontFamily: [String]!
        fontSize: [Int]!
        text: [String]!
        textcolor: [String]!
        textx: [Int]!
        texty: [Int]!
    }
    type Story{
        id: ID!
        title: String!
        author: String!
        authorId: String!
        publishDate: String!
        likes: Int!
        likers: [String]!
        backgroundColor: String!
        fontFamily: [String]!
        fontStyle: [String]!
        textDecoration: [String]!
        fontSize: [Int]!
        textColor: [String]!
        text: [String]!
        textx: [Int]!
        texty: [Int]!
    }
    type Query{
        getUsers: [User]!
        getUser(id: ID!): User!
        getComics: [Comic]!
        getComic(id: ID!): Comic!
        getStories: [Story]!
        getStory(id: ID!): Story!
        getComments(comicOrStoryId: String!): [Comment]!
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        changePassword(id:ID!,username:String!, password: String!, newpassword: String!):User!
        forgotPassword(email:String!): String!
        resetPassword(token: String! id:ID!, newpassword:String!,confirmpassword:String!): User!

        follow(id: ID!, followeduserid: ID!): User!
        likeComic(id: ID!, likedComicId: ID!): User!
        likeStory(id: ID!, likedStoryId: ID!): User!
        deleteUser(id: ID!): String!

        createComic(author: String!, authorId: String!): Comic!
        updateComic(id: ID!, title: String!, backgroundColor: String!, linex: [Int]!, liney: [Int]!,
            points: [[Float]]!, strokeWidth: [Int]!, stroke: [String]!, fontFamily: [String]!,
            fontSize: [Int]!, text: [String]!, textcolor: [String]!, textx: [Int]!, texty: [Int]!): Comic!
        publishComic(id: ID!): Comic!
        deleteComic(id: ID!, authorId: ID!): String!

        createStory(author: String!, authorId: String!): Story!
        updateStory(id: ID!, title: String!, backgroundColor: String!, fontFamily: [String]!, fontStyle: [String]!, textDecoration: [String]!,
            textColor:[String]!, fontSize: [Int]!, text: [String]!, textx: [Int]!, texty: [Int]!): Story!
        publishStory(id: ID!): Story!
        deleteStory(id: ID!, authorId: ID!): String!

        createComment(body: String!, username: String!, comicOrStoryId: String!, userId: String!): Comment!
        deleteComment(id: ID!, username: String!): String!
    }
`