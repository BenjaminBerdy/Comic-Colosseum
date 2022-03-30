const {gql} = require('apollo-server');

module.exports = gql`
    type Comment{
        id: ID!
        body: String!
        user: User!
        comicId: String!
        createdAt: String!
        comicId: String!
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
        profileImageURL: String!
        likedComics: [Comic]!,
        likedStories: [Story]!,
        followedCreators: [User]!
    }
    type Comic{
        id: ID!
        title: String!
        author: 
        publishDate: String!
        likes: Int!
        comments: [Comment],
        canvas: [String]!
        xpos:[Int]!
        ypos:[Int]!
        textFonts: [String]!
        textSizes: [Int]!
        comicText: [String]!
        textColor: [String]!
        backgroundColor: String!
    }
    type Search{
        body: String!
        users: [User]
    }
    type Query{
<<<<<<< HEAD
        getComments(comicId: String!): [Comment]
=======
        getComments(comicId: ID!): [Comment]
>>>>>>> 687e6b9a46bbdfb3537aeebff06cbe8c6a199671
        getUsers: [User]
        getUser(id: ID!): User
        getComics: [Comic]
        getComic(id: ID!): Comic
        getUserSearch(body: String!): [User]
        getComicSearch(body: String!): [Comic]
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createComic(author: String!, authorID: String!): Comic!
        deleteComic(id: ID!): String!
        publishComic(id: ID!): String!
        updateComic(id: ID!, title: String!, author: String!, authorID: String!,
            publishDate: String!, likes: Int!, canvas: [String]!,
            xpos:[Int]!, ypos:[Int]!, textFonts: [String]!
            textSizes: [Int]!
            comicText: [String]!
            textColor: [String]!
            backgroundColor: String!): Comic!
    }
`