require 'test_helper'

class AddressesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @address = addresses(:one)
  end

  test 'should get index' do
    get addresses_url, as: :json
    assert_response :success
  end

  test 'should create address' do
    assert_difference('Address.count') do
      post addresses_url,
           params: { address: { cep: @address.cep, city: @address.city, complement: @address.complement, county_id: @address.county_id, ibge_code: @address.ibge_code, neighborhood: @address.neighborhood, street: @address.street, uf: @address.uf } }, as: :json
    end

    assert_response :created
  end

  test 'should show address' do
    get address_url(@address), as: :json
    assert_response :success
  end

  test 'should update address' do
    patch address_url(@address),
          params: { address: { cep: @address.cep, city: @address.city, complement: @address.complement, county_id: @address.county_id, ibge_code: @address.ibge_code, neighborhood: @address.neighborhood, street: @address.street, uf: @address.uf } }, as: :json
    assert_response :success
  end

  test 'should destroy address' do
    assert_difference('Address.count', -1) do
      delete address_url(@address), as: :json
    end

    assert_response :no_content
  end
end
