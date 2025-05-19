-- Active: 1731890710743@@127.0.0.1@4000
CREATE DATABASE IF NOT EXISTS MACNews;
USE MACNews;

CREATE TABLE IF NOT EXISTS User (
    UserID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    UserFirstName VARCHAR(100) NOT NULL,
    UserLastName VARCHAR(100) NOT NULL,
    UserEmail VARCHAR(100) NOT NULL,
    UserImageURL VARCHAR(255) DEFAULT NULL,
    IsActive BOOLEAN DEFAULT TRUE, 
    RegistrationDate DATE DEFAULT (NOW())
);

CREATE TABLE IF NOT EXISTS UserRecommendations (
    RecommendationID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    UserID CHAR(36) NOT NULL,
    NewsArticleIDs JSON NOT NULL,
    GeneratedAt DATETIME DEFAULT (NOW()), 
    IsActive BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Passwords (
    PasswordID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    UserID CHAR(36) NOT NULL UNIQUE,
    PasswordUser VARCHAR(255) NOT NULL,
    DateCreated DATE DEFAULT (NOW()),
    DateLastChanged DATE DEFAULT (NOW()),
    CONSTRAINT FK_Password_User FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Roles (
    RolID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    UserID CHAR(36) NOT NULL UNIQUE,
    RoleAssigned ENUM('Reader', 'Administrator') DEFAULT 'Reader',
    DateAssigned DATE DEFAULT (NOW()),
    LastChangeDate DATE DEFAULT (NOW()),
    CONSTRAINT FK_Role_User FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS ApplicationForm (
   ApplicationFormID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    UserID CHAR(36) NOT NULL ,
    BirthDate DATE NOT NULL,
    CardNumber VARCHAR(50) NOT NULL,
    Reason TEXT NOT NULL,
    ImageCertificateURL VARCHAR(255),
    VerificationStatus ENUM('Checking', 'Rejected', 'Approved') NOT NULL,
    ApplicationDate DATE DEFAULT (NOW()),

    CONSTRAINT FK_ApplicationForm_User FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Journalist (
    JournalistID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    UserID CHAR(36) NOT NULL UNIQUE,
    Specialty TEXT NOT NULL,
    JournalisticExperience TEXT NOT NULL,
    IsActive BOOLEAN DEFAULT TRUE, 
    DateCreated DATE DEFAULT (NOW()),
    CONSTRAINT FK_Journalist_User FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Channel (
    ChannelID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    JournalistID CHAR(36) NOT NULL,
    ChannelName VARCHAR(255) NOT NULL,
    DescriptionChannel TEXT NOT NULL,
    Specialties ENUM('Investigative', 'Interview', 'Opinion', 'Interpretive', 'Data', 'Social', 'Political', 'Scientific', 'Entertainment', 'Business') NOT NULL,
    ChannelImageURL VARCHAR(255) DEFAULT NULL,
    CONSTRAINT FK_Channel_Journalist FOREIGN KEY (JournalistID) REFERENCES Journalist(JournalistID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS News (
    NewsId CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    ChannelID CHAR(36) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    ShortDescription VARCHAR(255) NOT NULL,
    Content TEXT NOT NULL,
    PublicationDate DATE NOT NULL,
    NewsStatus ENUM('Checking', 'Approved', 'Rejected') NOT NULL,
    NewsImageURL VARCHAR(255) DEFAULT NULL,
    Categories ENUM('Politics', 'Economy', 'Sports', 'Entertainment', 'Technology', 'Health', 'Science', 'International', 'Society', 'Security') NOT NULL,
    CONSTRAINT FK_News_Channel FOREIGN KEY (ChannelID) REFERENCES Channel(ChannelID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS FollowChannel (
    FollowChannelID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    UserID CHAR(36) NOT NULL,
    ChannelID CHAR(36) NOT NULL,
    IsFollow BOOLEAN DEFAULT TRUE,
    FollowDate DATE DEFAULT (NOW()),

    CONSTRAINT FK_FollowChannel_User FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    CONSTRAINT FK_FollowChannel_Channel FOREIGN KEY (ChannelID) REFERENCES Channel(ChannelID) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS CommentPost (
    CommentPostID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    UserID CHAR(36) NOT NULL,
    ChannelID CHAR(36) NOT NULL,
    CommentParent CHAR(36) DEFAULT NULL,
    TextComment TEXT NOT NULL,
    DateComment DATE DEFAULT (NOW()),
    CONSTRAINT FK_CommentPost_User FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    CONSTRAINT FK_CommentPost_Channel FOREIGN KEY (ChannelID) REFERENCES Channel(ChannelID) ON DELETE CASCADE,
    CONSTRAINT FK_CommentPost_Parent FOREIGN KEY (CommentParent) REFERENCES CommentPost(CommentPostID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SearchHistory (
    SearchHistoryID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    UserID CHAR(36) NOT NULL,
    SearchWord VARCHAR(255) NOT NULL,
    SearchDate DATETIME DEFAULT CURRENT_TIMESTAMP, 
    CONSTRAINT FK_SearchHistory_User FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Visits (
    VisitsID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    NewsID CHAR(36) NOT NULL,
    UserID CHAR(36) NOT NULL,
    DateVisit DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_Visits_News FOREIGN KEY (NewsID) REFERENCES News(NewsID) ON DELETE CASCADE,
    CONSTRAINT FK_Visits_User FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

