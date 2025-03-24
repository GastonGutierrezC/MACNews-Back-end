CREATE DATABASE IF NOT EXISTS MACNews;
USE MACNews;

CREATE TABLE IF NOT EXISTS User (
    UserID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    UserFirstName VARCHAR(100) NOT NULL,
    UserLastName VARCHAR(100) NOT NULL,
    UserEmail VARCHAR(100) UNIQUE NOT NULL,
    UserImageURL VARCHAR(255) DEFAULT NULL,
    IsActive BOOLEAN DEFAULT TRUE, 
    RegistrationDate DATE DEFAULT (NOW())
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


CREATE TABLE IF NOT EXISTS Journalist (
    JournalistID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    UserID CHAR(36) NOT NULL UNIQUE,
    BirthDate DATE NOT NULL,
    CardNumber VARCHAR(50) NOT NULL,
    Reason TEXT NOT NULL,
    ImageCertificateURL VARCHAR(255),
    VerificationStatus ENUM('Checking', 'Rejected', 'Approved') NOT NULL,

    CONSTRAINT FK_Journalist_User FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Channel (
    ChannelID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    JournalistID CHAR(36) NOT NULL,
    ChannelName VARCHAR(255) NOT NULL,
    DescriptionChannel TEXT NOT NULL,
    Categories ENUM('Politics', 'Economy', 'Sports', 'Entertainment', 'Technology', 'Health', 'Science', 'International', 'Society', 'Security') NOT NULL,
    ChannelImageURL VARCHAR(255) DEFAULT NULL,

    CONSTRAINT FK_Channel_Journalist FOREIGN KEY (JournalistID) REFERENCES Journalist(JournalistID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS News (
    NewsId CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    ChannelID CHAR(36) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Content TEXT NOT NULL,
    PublicationDate DATE NOT NULL,
    NewsStatus ENUM('Checking', 'Approved', 'Rejected') NOT NULL,
    NewsImageURL VARCHAR(255) DEFAULT NULL,
    NumberOfViews INT DEFAULT 0,

    CONSTRAINT FK_News_Channel FOREIGN KEY (ChannelID) REFERENCES Channel(ChannelID) ON DELETE CASCADE
);