export const SILICON_LENS_BASE_URL = {
  url: 'https://api-staging.siliconlens.com.au/v1/',
  authUrl: 'https://auth-staging.siliconlens.com.au/v1/'
}

export const SILICON_LENS_URL = {
  authorise: SILICON_LENS_BASE_URL.authUrl + "Authorise",
  vehicleSpecs: SILICON_LENS_BASE_URL.url + "VehicleSpecs?rego={rego}&state={state}",
  vehicleSpecsById: SILICON_LENS_BASE_URL.url + "VehicleSpecs/{id}",
  vehicleMakes: SILICON_LENS_BASE_URL.url + "GlassGuide/Makes",
  vehicleModels: SILICON_LENS_BASE_URL.url + "GlassGuide/Families?make={make}",
  vehicleVariants: SILICON_LENS_BASE_URL.url + "GlassGuide/Variants?make={make}&family={family}",
  vehicleYears: SILICON_LENS_BASE_URL.url + "GlassGuide/ReleasedYears?make={make}&family={family}&variant={variant}",
  vehicles: SILICON_LENS_BASE_URL.url + "GlassGuide/Vehicles?make={make}&family={family}&variant={variant}&year={year}",
  vehicleDetail: SILICON_LENS_BASE_URL.url + "GlassGuide/Vehicles/{id}" 
}