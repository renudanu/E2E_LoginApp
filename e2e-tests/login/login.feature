#features/test.feature
Feature: Login

  Scenario: User login with valid credentials functionality

  Given User is on login page
  When User entered username as uw and password as uw
  Then User should be able to login successfully