CREATE DATABASE IF NOT EXISTS MACNews;
USE MACNews;

CREATE TABLE IF NOT EXISTS User (
    UserID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    UserFirstName VARCHAR(100) NOT NULL,
    UserLastName VARCHAR(100) NOT NULL,
    UserEmail VARCHAR(100) UNIQUE NOT NULL,
    UserPassword VARCHAR(255) NOT NULL,
    UserImageURL VARCHAR(255) DEFAULT NULL,
    UserType ENUM('Reader', 'Journalist', 'Administrator') NOT NULL
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