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
        profileImageURL: String!
        followedCreators: [String]!
        likedComics: [String]!
    }
    type Comic{
        id: ID!
        title: String!
        author: String!
        authorId: String!
        publishDate: String!
        likes: Int!
        backgroundColor: String!
        points: [Int]!
        strokeWidth: [Int]!
        stroke: [String]!
        fontFamily: [String]!
        fontSize: [Int]!
        text: [String]!
        x: [Int]!
        y: [Int]!
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
        x: [Int]!
        y: [Int]!
    }
    type Query{
        getComments(comicOrStoryId: String!): [Comment]!
        getUsers: [User]!
        getUser(id: ID!): User!
        getComics: [Comic]!
        getComic(id: ID!): Comic!
        getStories: [Story]!
        getStory(id: ID!): Story!
        searchComicTitle(title: String!): [Comic]!
        searchComicName(author: String!): [Comic]!
        searchStoryTitle(title: String!): [Story]!
        searchStoryName(author: String!): [Story]!
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        changePassword(id:ID!,username:String!, password: String!, newpassword: String!):User!
        follow(id: ID!, followedCreators: [String]!): User!
        createComic(author: String!, authorId: String!): Comic!
        deleteComic(id: ID!): String!
        publishComic(id: ID!): String!
        likeComic(id: ID!, likes: Int): Comic!
        updateComic(id: ID!, title: String!, author: String!, authorId: String!,
            publishDate: String!, likes: Int!, backgroundColor: String!,
            points: [Int]!, strokeWidth: [Int]!, stroke: [String]!, fontFamily: [String]!,
            fontSize: [Int]!, text: [String]!, x: [Int]!, y: [Int]!): Comic!
        likedComicsListUpdate(id: ID!, likedComics: [String]!): User!
        createStory(author: String!, authorId: String!): Story!
        deleteStory(id: ID!): String!
        publishStory(id: ID!): String!
        likeStory(id: ID!, likes: Int): Story!
        updateStory(id: ID!, title: String!, author: String!, authorId: String!,
            publishDate: String!, likes: Int!, backgroundColor: String!, fontFamily: [String]!, 
            fontSize: [Int]!, text: [String]!, x: [Int]!, y: [Int]!): Story!
        likedStoriesListUpdate(id: ID!, likedComics: [String]!): User!
        createComment(body: String!, username: String!, comicOrStoryId: String!, userId: String!): Comment!
        deleteComment(id: ID!): String!
    }
`