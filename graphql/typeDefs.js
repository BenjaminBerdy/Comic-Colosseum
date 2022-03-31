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
        likedComics: [String]!
        likedStories: [String]!
    }
    type Comic{
        id: ID!
        title: String!
        author: String!
        authorId: String!
        publishDate: String!
        likes: Int!
        backgroundColor: String!
        points: [[Int]]!
        strokeWidth: [Int]!
        stroke: [String]!
        fontFamily: [String]!
        fontSize: [Int]!
        text: [String]!
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
        backgroundColor: String!
        fontFamily: [String]!
        fontSize: [Int]!
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
        searchComicTitle(title: String!): [Comic]!
        searchComicAuthor(author: String!): [Comic]!
        searchStoryTitle(title: String!): [Story]!
        searchStoryAuthor(author: String!): [Story]!
        getComments(comicOrStoryId: String!): [Comment]!
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        changePassword(id:ID!,username:String!, password: String!, newpassword: String!):User!
        forgotPassword(email:String!): String!
        resetPassword(token: String! id:ID!, newpassword:String!,confirmpassword:String!): User!
        follow(id: ID!, followedCreators: [String]!): User!
        likedComicsListUpdate(id: ID!, likedComics: [String]!): User!
        likedStoriesListUpdate(id: ID!, likedStories: [String]!): User!
        deleteUser(username: String!, password: String!): String!

        createComic(author: String!, authorId: String!): Comic!
        updateComic(id: ID!, title: String!, backgroundColor: String!,
            points: [[Int]]!, strokeWidth: [Int]!, stroke: [String]!, fontFamily: [String]!,
            fontSize: [Int]!, text: [String]!, textx: [Int]!, texty: [Int]!): Comic!
        publishComic(id: ID!): String!
        likeComic(id: ID!, likes: Int): Comic!
        deleteComic(id: ID!, userId: ID!): String!

        createStory(author: String!, authorId: String!): Story!
        updateStory(id: ID!, title: String!, author: String!, authorId: String!,
            publishDate: String!, likes: Int!, backgroundColor: String!, fontFamily: [String]!, 
            fontSize: [Int]!, text: [String]!, textx: [Int]!, texty: [Int]!): Story!
        publishStory(id: ID!): String!
        likeStory(id: ID!, likes: Int): Story!
        deleteStory(id: ID!, userId: ID!): String!

        createComment(body: String!, username: String!, comicOrStoryId: String!, userId: String!): Comment!
        deleteComment(id: ID!, userId: ID!): String!
    }
`