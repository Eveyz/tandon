require "application_system_test_case"

class DatabasesTest < ApplicationSystemTestCase
  setup do
    @database = databases(:one)
  end

  test "visiting the index" do
    visit databases_url
    assert_selector "h1", text: "Databases"
  end

  test "creating a Database" do
    visit databases_url
    click_on "New Database"

    click_on "Create Database"

    assert_text "Database was successfully created"
    click_on "Back"
  end

  test "updating a Database" do
    visit databases_url
    click_on "Edit", match: :first

    click_on "Update Database"

    assert_text "Database was successfully updated"
    click_on "Back"
  end

  test "destroying a Database" do
    visit databases_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Database was successfully destroyed"
  end
end
