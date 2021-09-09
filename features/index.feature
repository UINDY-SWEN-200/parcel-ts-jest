Feature: Submitting Event

    Scenario: Submitting a good Event
        Given I desire to create an event
        When I enter valid data
        Then The event should be created and added to the db

    Scenario: Submitting a bad Event
        Given I desire to create an event
        When I enter invalid data
        Then The event should fail to be be created
