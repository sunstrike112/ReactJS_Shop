import { HttpService, Injectable } from '@nestjs/common';
import { SILICON_LENS_URL } from '../../constants/silicon-lens-api.constant';
import { map } from 'rxjs/operators';
import { prepareURI } from '@helpers/prepare-uri.helper';
import { SearchVehicleManualDto, SearchVehicleRegoDto } from './dto/vehicles.dto';
import { flatten } from 'lodash';

@Injectable()
export class VehiclesService {
  constructor(
    private httpService: HttpService,
  ) {}

  async searchVehiclesByRego(body: SearchVehicleRegoDto) {
    let url = prepareURI(SILICON_LENS_URL.vehicleSpecs, { ...body });
    if (body.includeAgeRegistrationStatus) url += `&includeAgeRegistrationStatus=${body.includeAgeRegistrationStatus}`;
    if (body.includeNDVIN) url += `&includeNDVIN=${body.includeNDVIN}`;
    if (body.includeNDVehData) url += `&includeNDVehData=${body.includeNDVehData}`;
    if (body.includeNDAge) url += `&includeNDAge=${body.includeNDAge}`;
    if (body.includeNDRegistrationStatus) url += `&includeNDRegistrationStatus=${body.includeNDRegistrationStatus}`;
    if (body.includeVIN) url += `&includeVIN=${body.includeVIN}`;
    if (body.includeExtendedData) url += `&includeExtendedData=${body.includeExtendedData}`;

    const vehicles = await this.getDataFromUrl(url);

    const resPromises = vehicles.map(async (vehicle) => {
      const vehicleSpecsByIdUrl = prepareURI(
        SILICON_LENS_URL.vehicleSpecsById,
        { id: vehicle.id },
      );
      const vehicleSpecsById = await this.getDataFromUrl(vehicleSpecsByIdUrl);
      
      return {
        slId: vehicle.id,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.manufacturedYear,
        color: vehicle.colour,
        transmission: vehicleSpecsById.transmission,
        cylinder: vehicleSpecsById.numberOfCylinder,
      };
    });

    const res = await Promise.all(resPromises);

    const data = this.changeArrayResponse(flatten(res));
    return data;
  } 

  async searchColorsByRego(body: SearchVehicleRegoDto) {
    const url = prepareURI(
      SILICON_LENS_URL.vehicleSpecs + `&includeExtendedData=true`,
      { ...body },
    );
    const vehicles = await this.getDataFromUrl(url);

    const res = vehicles?.map((vehicle) => {
      return vehicle?.colour;
    });

    const data = this.changeArrayResponse(res);
    return data;
  } 

  async getVehicleMakes() {
    const res = await this.getDataFromUrl(SILICON_LENS_URL.vehicleMakes);
    const data = this.changeArrayResponse(res);

    return data;
  }

  async getVehicleModels(query) {
    const url = prepareURI(SILICON_LENS_URL.vehicleModels, { ...query });
    const res = await this.getDataFromUrl(url);
    const data = this.changeArrayResponse(res);

    return data;
  }

  async getVehicleVariants(query) {
    const url = prepareURI(SILICON_LENS_URL.vehicleVariants, { ...query });
    const res = await this.getDataFromUrl(url);
    const data = this.changeArrayResponse(res);

    return data;
  }

  async getVehicleYears(query) {
    const url = prepareURI(SILICON_LENS_URL.vehicleYears, { ...query });
    const res = await this.getDataFromUrl(url);
    const data = this.changeArrayResponse(res);

    return data;
  }

  async searchVehiclesManual(body: SearchVehicleManualDto) {
    const url = prepareURI(SILICON_LENS_URL.vehicles, { ...body });
    const vehicles = await this.getDataFromUrl(url);
    const resPromise = vehicles.map(async (vehicle) => {
      return await this.getVehicle(vehicle.id);
    })

    const res = await Promise.all(resPromise).then((values: any) => {
      return values.map((value) => {
        return {
          slId: value.id,
          make: value.make,
          model: value.family,
          variant: value.variant,
          year: value.year,
          transmission: value.transmission,
          cylinder: value.cylinder,
        }
      })
    });

    const data = this.changeArrayResponse(res);

    return data;
  }

  async getVehicle(id: string) {
    const url = prepareURI(SILICON_LENS_URL.vehicleDetail, { id });
    const data = await this.getDataFromUrl(url);

    return data
  }

  getAuthorize() {
    const data = {
      SystemCode: process.env.SYSTEM_CODE,
      Customer: process.env.CUSTOMER,
      Reference: process.env.REFERENCE,
      ApiKey: process.env.API_KEY
    }

    return this.httpService.post(SILICON_LENS_URL.authorise, data).pipe(map(res => res.data.data)).toPromise();
  }

  async getDataFromUrl(url: string) {
    const token = await this.getAuthorize();
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    return this.httpService.get(url, { headers }).pipe(map(res => res.data.data)).toPromise();
  }

  changeArrayResponse(data) {
    return {
      items: data
    }
  }
}
