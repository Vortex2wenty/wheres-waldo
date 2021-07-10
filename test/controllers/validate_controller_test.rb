require "test_helper"

class ValidateControllerTest < ActionDispatch::IntegrationTest
  test "should get validate" do
    get validate_validate_url
    assert_response :success
  end
end
