const {gql} = require('apollo-server');

module.exports = gql`
    type Comment{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
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
    }
    type Comic{
        id: ID!
        title: String!
        author: String!
        authorID: String!
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
    type Query{
        getComments: [Comment]
        getUsers: [User]
        getUser(id: ID!): User
        getComics: [Comic]
        getComic(id: ID!): Comic
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createComic(author: String!, authorID: String!): Comic!
        deleteComic(id: ID!): String!
        publishComic(id: ID!): String!
        updateComic(id: ID!, title: String!, author: String!, authorID: String!,
            publishDate: String!, likes: Int!, comments: [Comment], canvas: [String]!,
            xpos:[Int]!, ypos:[Int]!, textFonts: [String]!
            textSizes: [Int]!
            comicText: [String]!
            textColor: [String]!
            backgroundColor: String!): Comic!
    }
`